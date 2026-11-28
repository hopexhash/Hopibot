"use server";

import { and, desc, eq, isNull, ne } from "drizzle-orm";
import { z } from "zod";
import { siteSpecSchema } from "@/lib/site-spec";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { capture } from "../integrations/posthog";
import { createApproval } from "../orchestrator/control";
import { createTask } from "../orchestrator/tasks";
import { action, UserError } from "./_util";
import { isCustomerStage } from "@/lib/constants";
import { INQUIRY_SOURCE, inquirySendBlocker } from "@/lib/inquiry-email";
import { integrationMode } from "../integrations/credentials";
import { colorwayCount, colorwayName } from "@/sites/colorways";
import { familyOf } from "@/sites/families";
import { designName } from "@/sites/designs";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { marketCountry } from "@/lib/markets";
import { saveLead } from "../leads/save";
import { slugify } from "@/lib/utils";

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
    { name: approve ? "website.approve" : "website.reject", revalidate: ["/websites", "/previews", "/command"], auditTarget: () => ({ type: "website_project", id: projectId }) },
    async (auth) => {
      const p = await ownedProject(auth.org.id, projectId);
      if (approve && p.status !== "ready") throw new UserError("Only websites that passed quality control can be approved.");
      await db().update(schema.websiteProjects).set({ approvalStatus: approve ? "approved" : "rejected", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, p.id));
      await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: p.businessId, userId: auth.user.id, type: "system", content: `Website preview ${approve ? "approved" : "rejected"}` });
      if (approve) {
        await capture(auth.org.id, auth.user.id, "website_approved", { projectId: p.id });
        // Someone who asked for this design through the website gets it by email on this
        // approval. The sales agent re-checks everything and only sends when it really can.
        const [biz] = await db().select({ source: schema.businesses.source }).from(schema.businesses).where(eq(schema.businesses.id, p.businessId));
        if (biz?.source === INQUIRY_SOURCE) {
          await createTask(auth.org.id, null, {
            agentKey: "sales",
            type: "send_inquiry_preview",
            businessId: p.businessId,
            projectId: p.id,
            input: { approvedBy: auth.user.id },
            idempotencyKey: `inquiry-preview:${p.id}`,
            priority: 1,
          });
          const st = auth.org.settings;
          return { inquiry: true as const, blocker: inquirySendBlocker({ resendLive: (await integrationMode(auth.org.id, "resend")) === "live", agencyName: st.agencyName, senderEmail: st.senderEmail, agencyAddress: st.agencyAddress }) };
        }
        // Next step: the sales agent writes the introduction email. It only drafts; sending
        // still waits for a person to approve that email.
        const [existing] = await db()
          .select({ id: schema.salesEmails.id })
          .from(schema.salesEmails)
          .where(and(eq(schema.salesEmails.businessId, p.businessId), eq(schema.salesEmails.kind, "intro"), ne(schema.salesEmails.status, "cancelled")))
          .limit(1);
        if (!existing) {
          await createTask(auth.org.id, null, {
            agentKey: "sales",
            type: "draft_intro_email",
            businessId: p.businessId,
            projectId: p.id,
            input: { next: [] },
            idempotencyKey: `draft-intro:${p.id}:${p.currentVersionId}`,
            priority: 2,
          });
        }
      }
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
  return action({ name: "website.request_publish", revalidate: ["/websites", "/command"] }, async (auth) => {
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

/**
 * "Use this template": rebuild a website in another design and colourway, keeping its content.
 * The current version's content is re-applied; the builder renders it in the chosen design, runs
 * quality control and saves it as a new version (the old one stays restorable).
 */
export async function applyTemplateAction(projectId: string, designKey: string, variation = 0) {
  return action({ name: "website.apply_template", revalidate: ["/websites", "/websites/templates"] }, async (auth) => {
    const p = await ownedProject(auth.org.id, projectId);
    const key = z.string().max(40).parse(designKey);
    if (!familyOf(key)) throw new UserError("Unknown template.");
    const v = z.number().int().min(0).max(colorwayCount(key) - 1).parse(variation);
    if (!p.currentVersionId) throw new UserError("This website has no version yet. Generate it first, then switch the template.");
    const [cur] = await db().select().from(schema.websiteVersions).where(eq(schema.websiteVersions.id, p.currentVersionId));
    const parsed = siteSpecSchema.safeParse(cur?.spec);
    if (!parsed.success) throw new UserError("The current version cannot be read; regenerate the website first.");
    const spec = { ...parsed.data, theme: { ...parsed.data.theme, design: key, variation: v } };
    await db().update(schema.websiteProjects).set({ templateKey: key, updatedAt: new Date() }).where(eq(schema.websiteProjects.id, p.id));
    await builderTask(auth.org.id, p, "apply_edit", { spec, variation: v, summary: `Template switched to ${designName(key)}${v ? ` (${colorwayName(key, v)})` : ""}.` });
    return { projectId: p.id };
  });
}

const fromTemplateSchema = z.object({
  designKey: z.string().max(40),
  variation: z.number().int().min(0).max(5).default(0),
  websiteUrl: z
    .string()
    .trim()
    .max(300)
    .transform((u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`))
    .pipe(z.string().url("Enter the customer's current website, for example bakkerijdevries.nl")),
  name: z.string().trim().min(2, "Enter the business name").max(160),
  category: z.enum(BUSINESS_CATEGORIES.map((c) => c.key) as [string, ...string[]]),
  city: z.string().trim().min(1, "Enter the city").max(80),
  country: marketCountry,
});

/**
 * "Create with this template": a customer picked a template. HOPI adds the business (or finds it),
 * researches its current website and builds a new website from that content in the chosen
 * template and colourway. Nothing is sent to anyone; the result waits for approval as usual.
 */
export async function createFromTemplateAction(input: z.input<typeof fromTemplateSchema>) {
  return action({ name: "website.create_from_template", revalidate: ["/websites", "/websites/templates", "/businesses"], limit: 20 }, async (auth) => {
    const p = fromTemplateSchema.parse(input);
    if (!familyOf(p.designKey)) throw new UserError("Unknown template.");
    const variation = Math.min(p.variation, colorwayCount(p.designKey) - 1);
    const saved = await saveLead(
      auth.org.id,
      { name: p.name, category: p.category, city: p.city, country: p.country, address: null, phone: null, websiteUrl: p.websiteUrl, source: "manual" },
      { weights: auth.org.settings.scoringWeights, minScore: auth.org.settings.minLeadScore },
    );
    const [b] = await db().select().from(schema.businesses).where(and(eq(schema.businesses.id, saved.id), eq(schema.businesses.organizationId, auth.org.id)));
    if (!b) throw new UserError("The business could not be saved.");
    if (b.erasedAt) throw new UserError("This business's data was erased at its request.");
    // An existing record without a website gets the one the customer gave.
    if (!b.websiteUrl) await db().update(schema.businesses).set({ websiteUrl: p.websiteUrl, updatedAt: new Date() }).where(eq(schema.businesses.id, b.id));
    // The business's website project (one per business), now in the chosen template.
    const [existingProject] = await db()
      .select()
      .from(schema.websiteProjects)
      .where(and(eq(schema.websiteProjects.organizationId, auth.org.id), eq(schema.websiteProjects.businessId, b.id), isNull(schema.websiteProjects.deletedAt)))
      .orderBy(desc(schema.websiteProjects.createdAt))
      .limit(1);
    const project =
      existingProject ??
      (
        await db()
          .insert(schema.websiteProjects)
          .values({ organizationId: auth.org.id, businessId: b.id, templateKey: p.designKey, slug: `${slugify(b.name, 36) || "site"}-${randomToken(4).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5)}`, status: "generating" })
          .returning()
      )[0];
    await db().update(schema.websiteProjects).set({ templateKey: p.designKey, status: "generating", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
    // Research first (it reads the current website), then build in the chosen template; the colourway travels along.
    const { task } = await createTask(auth.org.id, null, {
      agentKey: "research",
      type: "research_business",
      businessId: b.id,
      projectId: project.id,
      input: { next: ["generate_website", "qc"], variation },
      idempotencyKey: `from-template:${b.id}:${randomToken(6)}`,
      priority: 2,
    });
    return { projectId: project.id, taskId: task.id, existing: saved.status === "duplicate" };
  });
}
