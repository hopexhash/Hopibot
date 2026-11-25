import "../guard";
import { and, desc, eq } from "drizzle-orm";
import { siteSpecSchema } from "@/lib/site-spec";
import { db, schema } from "../db";
import { AgentError } from "../integrations/anthropic";
import { continuePipeline } from "../orchestrator/pipeline";
import { notify } from "../orchestrator/tasks";
import type { AgentHandler } from "../orchestrator/types";
import { runQc } from "../qc/run-qc";
import { contentIntegrityIssues } from "../website/service";

export const qualityControl: AgentHandler = async (ctx) => {
  const input = ctx.task.input as { versionId: string; next?: string[]; iteration?: number };
  const [version] = await db()
    .select()
    .from(schema.websiteVersions)
    .where(and(eq(schema.websiteVersions.id, input.versionId), eq(schema.websiteVersions.organizationId, ctx.organizationId)));
  if (!version) throw new Error("Version not found");
  const [project] = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, version.projectId));
  const files = await db().select().from(schema.websiteFiles).where(eq(schema.websiteFiles.versionId, version.id));
  const spec = siteSpecSchema.parse(version.spec);

  // Claims are allowed only if they appear in verified research facts.
  const [research] = await db()
    .select({ profile: schema.businessResearch.profile })
    .from(schema.businessResearch)
    .where(eq(schema.businessResearch.businessId, project.businessId))
    .orderBy(desc(schema.businessResearch.createdAt))
    .limit(1);
  const verifiedFacts = ((research?.profile as { verifiedFacts?: { fact: string }[] } | undefined)?.verifiedFacts ?? []).map((f) => f.fact).join("\n");
  const integrity = contentIntegrityIssues(spec, verifiedFacts);

  await ctx.log("info", `Testing version ${version.versionNo} on desktop, tablet and mobile…`);
  await ctx.heartbeat();
  const report = await runQc({ files, integrityIssues: integrity, expectDemoBanner: true });
  await ctx.heartbeat();
  const screenshots = report.screenshots;
  const reportForDb = { ...report, screenshots: undefined };

  await db()
    .update(schema.websiteVersions)
    .set({ qcScore: report.score, qcReport: reportForDb as unknown as Record<string, unknown> })
    .where(eq(schema.websiteVersions.id, version.id));
  // Screenshots stored as files of the version (not deployed).
  for (const [name, dataUri] of Object.entries(screenshots)) {
    await db()
      .insert(schema.websiteFiles)
      .values({ organizationId: ctx.organizationId, versionId: version.id, path: `_qc/${name}.jpg`, content: dataUri, contentType: "image/jpeg;base64", sha1: "", size: dataUri.length })
      .onConflictDoUpdate({ target: [schema.websiteFiles.versionId, schema.websiteFiles.path], set: { content: dataUri, size: dataUri.length } });
  }
  await ctx.log(report.passed ? "info" : "warn", `QC score ${report.score}/100 — ${report.issues.length} issue(s)${report.passed ? " — passed" : ""}`, {
    issues: report.issues.slice(0, 10).map((i) => `${i.severity}: ${i.message}`),
  });

  // Only the project's current version decides the project status.
  const isCurrent = project.currentVersionId === version.id;
  const maxRetries = ctx.settings.qcMaxRetries;
  if (report.passed) {
    if (isCurrent) {
      await db()
        .update(schema.websiteProjects)
        .set({ status: "ready", qualityScore: report.score, previewUrl: `/p/${project.slug}`, updatedAt: new Date() })
        .where(eq(schema.websiteProjects.id, project.id));
    }
    await continuePipeline(ctx, { businessId: project.businessId, projectId: project.id, next: input.next ?? [] });
    return { status: "completed", output: { score: report.score, passed: true, issues: report.issues.length } };
  }

  if (version.qcAttempts < maxRetries) {
    // Send issues back to the builder; the fixed version gets re-tested automatically.
    await db().update(schema.websiteProjects).set({ status: "needs_fixes", qualityScore: report.score, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
    // The fix version inherits the attempt counter (+1) — set before the builder can run.
    await db().update(schema.websiteVersions).set({ qcAttempts: version.qcAttempts + 1 }).where(eq(schema.websiteVersions.id, version.id));
    const runKey = ctx.task.runId ?? `adhoc-${ctx.task.id}`;
    await ctx.spawn({
      agentKey: "website_builder",
      type: "fix_issues",
      businessId: project.businessId,
      projectId: project.id,
      input: {
        issues: report.issues.map((i) => ({ code: i.code, message: i.message, detail: i.detail })),
        next: input.next ?? [],
        iteration: (input.iteration ?? 0) + 1,
      },
      idempotencyKey: `${runKey}:fix:${project.id}:${version.id}`,
    });
    await ctx.log("info", `Score below threshold — requested corrections (attempt ${version.qcAttempts + 1}/${maxRetries}).`);
    return { status: "completed", output: { score: report.score, passed: false, retry: version.qcAttempts + 1 } };
  }

  // Out of retries: never mark a failed website as ready.
  await db().update(schema.websiteProjects).set({ status: "failed", qualityScore: report.score, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
  await notify(ctx.organizationId, "A website failed quality control", `Score ${report.score}/100 after ${maxRetries} correction attempts.`, `/websites/${project.id}`);
  throw new AgentError(`Website failed QC with score ${report.score} after ${maxRetries} correction attempts.`, "QC_FAILED", false);
};
