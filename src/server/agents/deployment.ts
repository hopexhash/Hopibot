import "../guard";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { and, eq } from "drizzle-orm";
import { QC_PASS_SCORE } from "@/lib/constants";
import { fontFilesInHtml } from "@/sites/fonts";
import { db, schema } from "../db";
import { AgentError } from "../integrations/anthropic";
import { pushSiteToGithub } from "../integrations/github";
import { vercelAddDomain, vercelDeploy, vercelGetDeployment } from "../integrations/vercel";
import { continuePipeline } from "../orchestrator/pipeline";
import { stageEvent, stageLabel } from "@/lib/website-stages";
import { advanceStage, notifyEvent } from "../orchestrator/tasks";
import type { AgentContext, AgentHandler } from "../orchestrator/types";

async function siteFiles(versionId: string) {
  const rows = await db().select().from(schema.websiteFiles).where(eq(schema.websiteFiles.versionId, versionId));
  const files = rows.filter((r) => !r.path.startsWith("_qc/")).map((r) => ({ path: r.path, content: Buffer.from(r.content, "utf8") }));
  // Ship only the font files this site's design references.
  const html = rows.find((r) => r.path === "index.html")?.content ?? "";
  for (const f of fontFilesInHtml(html)) {
    files.push({ path: `assets/fonts/${f}`, content: await readFile(path.join(process.cwd(), "public", "site-assets", "fonts", f)) });
  }
  return files;
}

async function waitForVercel(ctx: AgentContext, deploymentRowId: string, vercelId: string) {
  const deadline = Date.now() + 5 * 60_000;
  while (Date.now() < deadline) {
    await ctx.heartbeat();
    const d = await vercelGetDeployment(ctx.organizationId, vercelId);
    if (d.readyState === "READY") return d;
    if (d.readyState === "ERROR" || d.readyState === "CANCELED") {
      throw new AgentError(`Vercel deployment ${d.readyState.toLowerCase()}: ${d.errorMessage ?? "no details"}`, "DEPLOY_FAILED", true);
    }
    await db().update(schema.deployments).set({ status: "building" }).where(eq(schema.deployments.id, deploymentRowId));
    await new Promise((r) => setTimeout(r, 4000));
  }
  throw new AgentError("Vercel deployment did not become ready within 5 minutes.", "DEPLOY_TIMEOUT", true);
}

export const deployment: AgentHandler = async (ctx) => {
  const production = ctx.task.type === "publish_production";
  const [project] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.id, ctx.task.projectId!), eq(schema.websiteProjects.organizationId, ctx.organizationId)));
  if (!project?.currentVersionId) throw new AgentError("Project has no version to deploy.", "NO_VERSION", false);
  const [version] = await db().select().from(schema.websiteVersions).where(eq(schema.websiteVersions.id, project.currentVersionId));
  if (project.status !== "ready" || (version.qcScore ?? 0) < QC_PASS_SCORE) {
    throw new AgentError(`Only websites that passed quality control can be deployed (status ${project.status}, score ${version.qcScore ?? "n/a"}).`, "NOT_READY", false);
  }
  const [business] = await db().select().from(schema.businesses).where(eq(schema.businesses.id, project.businessId));

  // Publishing an official website or connecting a domain needs an approved request.
  let customDomain: string | null = null;
  if (production) {
    const approvalId = String(ctx.task.input.approvalId ?? "");
    const [approval] = await db()
      .select()
      .from(schema.approvals)
      .where(and(eq(schema.approvals.id, approvalId), eq(schema.approvals.organizationId, ctx.organizationId)));
    if (!approval || approval.kind !== "publish_website" || approval.subjectId !== project.id) {
      throw new AgentError("Publishing requires a publish_website approval for this project.", "APPROVAL_MISSING", false);
    }
    if (approval.status !== "approved") {
      return { status: "waiting_for_approval", reason: "Publishing the official website is waiting for approval." };
    }
    if (project.approvalStatus !== "approved") throw new AgentError("The website itself has not been approved.", "NOT_APPROVED", false);
    customDomain = (approval.payload as { domain?: string }).domain ?? null;
  }

  const [row] = await db()
    .insert(schema.deployments)
    .values({
      organizationId: ctx.organizationId,
      projectId: project.id,
      versionId: version.id,
      provider: "internal",
      environment: production ? "production" : "preview",
      status: "building",
      attempts: ctx.task.attempts,
    })
    .returning();

  try {
    const vercelMode = await ctx.mode("vercel");
    const githubMode = await ctx.mode("github");
    let url: string;
    let provider = "internal";
    let providerDeploymentId: string | null = null;
    let githubRepo: string | null = null;
    let githubCommit: string | null = null;

    if (vercelMode === "live" || githubMode === "live") {
      const files = await siteFiles(version.id);
      if (githubMode === "live") {
        const gh = await pushSiteToGithub(ctx.organizationId, {
          repo: `site-${project.slug}`,
          files,
          message: `Version ${version.versionNo}: ${version.changeSummary ?? "update"}`,
          description: `Website ${production ? "" : "concept (demonstration) "}for ${business.name}`,
        });
        githubRepo = gh.repo;
        githubCommit = gh.commitSha;
        await ctx.log("info", `Committed version ${version.versionNo} to ${gh.repo}`);
      }
      if (vercelMode === "live") {
        provider = "vercel";
        const projectName = `${production ? "site" : "preview"}-${project.slug}`.slice(0, 100);
        const dep = await vercelDeploy(ctx.organizationId, {
          projectName,
          files,
          target: production ? "production" : "preview",
          meta: { agencyosProject: project.id, version: String(version.versionNo), ...(githubCommit ? { githubCommitSha: githubCommit } : {}) },
        });
        providerDeploymentId = dep.id;
        await db().update(schema.deployments).set({ provider, providerDeploymentId }).where(eq(schema.deployments.id, row.id));
        const ready = await waitForVercel(ctx, row.id, dep.id);
        url = `https://${ready.url}`;
        const domain = production ? customDomain : ctx.settings.previewBaseDomain ? `${project.slug}.${ctx.settings.previewBaseDomain}` : null;
        if (domain) {
          try {
            await vercelAddDomain(ctx.organizationId, projectName, domain);
            url = `https://${domain}`;
            await ctx.log("info", `Attached domain ${domain}`);
          } catch (err) {
            await ctx.log("warn", `Could not attach ${domain}: ${(err as Error).message}`);
          }
        }
      } else {
        url = `${process.env.APP_URL ?? "http://localhost:3000"}/p/${project.slug}`;
      }
    } else {
      // No hosting provider configured: the app itself hosts the preview (fully functional, not a mock).
      url = `${process.env.APP_URL ?? "http://localhost:3000"}/p/${project.slug}`;
      await ctx.log("info", "Vercel/GitHub not configured — using the built-in hosted preview.");
    }

    await db()
      .update(schema.deployments)
      .set({ status: "ready", url, provider, providerDeploymentId, githubRepo, githubCommit, customDomain, readyAt: new Date() })
      .where(eq(schema.deployments.id, row.id));
    await db().update(schema.websiteProjects).set({ previewUrl: url, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
    if (!production) await advanceStage(project.businessId, "QUALITY_APPROVED", ctx.organizationId);
    await ctx.log("info", `${production ? "Website published" : "Deployment completed successfully"}: ${url}`, { kind: "deploy.done", status: "completed", url });
    await ctx.log("info", `${stageLabel(11)}: ${production ? "published" : "preview online"} at ${url}`, { ...stageEvent(11, "completed"), url });
    await notifyEvent(ctx.organizationId, "deployed", production ? "A website was published" : "A website preview is ready", url, `/websites/${project.id}`, "success");
    if (!production) await continuePipeline(ctx, { businessId: project.businessId, projectId: project.id, next: (ctx.task.input.next as string[]) ?? [] });
    return { status: "completed", output: { deploymentId: row.id, url, provider } };
  } catch (err) {
    await db()
      .update(schema.deployments)
      .set({ status: "error", error: (err as Error).message.slice(0, 500) })
      .where(eq(schema.deployments.id, row.id));
    throw err;
  }
};
