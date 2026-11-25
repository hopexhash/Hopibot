"use server";

import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { siteSpecSchema } from "@/lib/site-spec";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { capture } from "../integrations/posthog";
import { createApproval } from "../orchestrator/control";
import { createTask } from "../orchestrator/tasks";
import { action, UserError } from "./_util";
import { isCustomerStage } from "@/lib/constants";

async function ownedProject(orgId: string, projectId: string) {
  const [p] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.id, z.string().uuid().parse(projectId)), eq(schema.websiteProjects.organizationId, orgId)));
  if (!p || p.deletedAt) throw new UserError("Website project not found.");
  return p;
}

async function builderTask(orgId: string, p: { id: string; businessId: string }, type: string, input: Record<string, unknown>) {
  const { task } = await createTask(orgId, null, {
    agentKey: "website_builder",
    type,
    businessId: p.businessId,
    projectId: p.id,
    input,
    idempotencyKey: `${type}:${p.id}:${randomToken(6)}`,
    priority: 2,
  });
  await db().update(schema.websiteProjects).set({ status: "generating", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, p.id));
  return task;
}

export async function generateWebsiteAction(businessId: string, opts: { withResearch?: boolean } = {}) {
  return action({ name: "website.generate", revalidate: ["/websites", "/businesses"] }, async (auth) => {
    const id = z.string().uuid().parse(businessId);
    const [b] = await db().select().from(schema.businesses).where(and(eq(schema.businesses.id, id), eq(schema.businesses.organizationId, auth.org.id)));
    if (!b) throw new UserError("Business not found.");
    if (b.erasedAt) throw new UserError("This business's data was erased.");
    const steps = opts.withResearch && b.researchStatus !== "done" ? ["research", "generate_website"] : ["generate_website"];
    const [first, ...rest] = steps;
    const { task } = await createTask(auth.org.id, null, {
      agentKey: first === "research" ? "research" : "website_builder",
      type: first === "research" ? "research_business" : "generate_website",
      businessId: b.id,
      input: { next: rest },
      idempotencyKey: `manual-generate:${b.id}:${randomToken(6)}`,
      priority: 2,
    });
    return { taskId: task.id };
  });
}

export async function regenerateWebsiteAction(projectId: string) {
  return action({ name: "website.regenerate", revalidate: ["/websites"] }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    await builderTask(auth.org.id, p, "generate_website", {});
    return null;
  });
}

export async function improveWebsiteAction(projectId: string, instruction: string) {
  return action({ name: "website.improve", revalidate: ["/websites"], limit: 20 }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    const text = z.string().trim().min(4, "Describe the change you want.").max(1000).parse(instruction);
    await builderTask(auth.org.id, p, "improve_website", { instruction: text });
    return null;
  });
}

export async function editWebsiteAction(projectId: string, spec: unknown) {
  return action({ name: "website.edit", revalidate: ["/websites"] }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    const parsed = siteSpecSchema.safeParse(spec);
    if (!parsed.success) throw new UserError(`Invalid content: ${parsed.error.issues[0]?.path.join(".")} — ${parsed.error.issues[0]?.message}`);
    for (const img of parsed.data.images) {
      if (img.license === "authorised" && !/^https:\/\//.test(img.src)) throw new UserError("Authorised images must be HTTPS URLs.");
    }
    await builderTask(auth.org.id, p, "apply_edit", { spec: parsed.data });
    return null;
  });
}

export async function restoreVersionAction(versionId: string) {
  return action({ name: "website.restore_version", revalidate: ["/websites"] }, async (auth) => {
    const [v] = await db()
      .select()
      .from(schema.websiteVersions)
      .where(and(eq(schema.websiteVersions.id, z.string().uuid().parse(versionId)), eq(schema.websiteVersions.organizationId, auth.org.id)));
    if (!v) throw new UserError("Version not found.");
    const p = await ownedProject(auth.org.id, v.projectId);
    await builderTask(auth.org.id, p, "apply_edit", { spec: v.spec, restoredFrom: v.versionNo });
    return null;
  });
}

export async function setWebsiteApprovalAction(projectId: string, approve: boolean) {
  return action(
    { name: approve ? "website.approve" : "website.reject", revalidate: ["/websites", "/previews", "/"], auditTarget: () => ({ type: "website_project", id: projectId }) },
    async (auth) => {
      const p = await ownedProject(auth.org.id, projectId);
      if (approve && p.status !== "ready") throw new UserError("Only websites that passed quality control can be approved.");
      await db().update(schema.websiteProjects).set({ approvalStatus: approve ? "approved" : "rejected", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, p.id));
      await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: p.businessId, userId: auth.user.id, type: "system", content: `Website preview ${approve ? "approved" : "rejected"}` });
      if (approve) await capture(auth.org.id, auth.user.id, "website_approved", { projectId: p.id });
      return null;
    },
  );
}

export async function deleteWebsiteAction(projectId: string) {
  return action({ name: "website.delete", role: "admin", revalidate: ["/websites", "/previews"], auditTarget: () => ({ type: "website_project", id: projectId }) }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    await db().update(schema.websiteProjects).set({ deletedAt: new Date(), previewUrl: null, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, p.id));
    return null;
  });
}

export async function deployPreviewAction(projectId: string) {
  return action({ name: "website.deploy_preview", revalidate: ["/deployments", "/websites"] }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    if (p.status !== "ready") throw new UserError("Only websites that passed quality control can be deployed.");
    await createTask(auth.org.id, null, {
      agentKey: "deployment",
      type: "deploy_preview",
      businessId: p.businessId,
      projectId: p.id,
      input: {},
      idempotencyKey: `deploy:${p.id}:${p.currentVersionId}:${randomToken(4)}`,
      priority: 2,
    });
    return null;
  });
}

const domainSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^(?!-)[a-z0-9-]{1,63}(\.[a-z0-9-]{1,63})+$/, "Enter a valid domain like example.nl");

/** Publishing the official website / connecting a customer domain always needs approval. */
export async function requestPublishAction(projectId: string, domain: string, confirmation: boolean) {
  return action({ name: "website.request_publish", revalidate: ["/websites", "/"] }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    if (!confirmation) throw new UserError("Confirm that the business has authorised publication.");
    if (p.approvalStatus !== "approved") throw new UserError("Approve the website before requesting publication.");
    const [b] = await db().select().from(schema.businesses).where(eq(schema.businesses.id, p.businessId));
    if (!isCustomerStage(b.pipelineStage)) throw new UserError("Only publish websites for businesses that became customers (stage Purchased or Customer).");
    const d = domain ? domainSchema.parse(domain) : null;
    const id = await createApproval(
      null,
      {
        kind: "publish_website",
        subjectType: "website_project",
        subjectId: p.id,
        summary: `Publish official website for ${b.name}${d ? ` on ${d}` : ""}`,
        payload: { domain: d, requestedBy: auth.user.id, authorisationConfirmed: true },
      },
      auth.org.id,
    );
    return { approvalId: id };
  });
}

export async function latestProjectForBusiness(businessId: string) {
  return action({ name: "website.latest", role: "viewer" }, async (auth) => {
    const [p] = await db()
      .select({ id: schema.websiteProjects.id })
      .from(schema.websiteProjects)
      .where(and(eq(schema.websiteProjects.businessId, businessId), eq(schema.websiteProjects.organizationId, auth.org.id)))
      .orderBy(desc(schema.websiteProjects.createdAt))
      .limit(1);
    return p?.id ?? null;
  });
}
