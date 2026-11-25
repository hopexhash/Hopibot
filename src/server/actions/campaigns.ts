"use server";

import { and, desc, eq, gte, ilike, inArray, isNull, notInArray } from "drizzle-orm";
import { z } from "zod";
import { BUSINESS_CATEGORIES, PIPELINE_STAGES } from "@/lib/constants";
import { renderTemplate, TEMPLATE_VARIABLES } from "@/lib/campaign-template";
import { complianceFooter } from "../agents/sales";
import { addRecipients, senderProblems, templateProblems, varsFor } from "../campaigns/service";
import { db, schema } from "../db";
import { integrationMode } from "../integrations/credentials";
import { sendEmail } from "../integrations/resend";
import { createApproval } from "../orchestrator/control";
import { action, UserError } from "./_util";

const campaignSchema = z.object({
  name: z.string().trim().min(2, "Give the campaign a name").max(80),
  subjectTemplate: z.string().trim().min(3, "Write a subject").max(150),
  bodyTemplate: z.string().trim().min(40, "Write the email (at least a few sentences)").max(5000),
  followUpEnabled: z.boolean(),
  followUpAfterDays: z.number().int().min(2).max(30),
  followUpSubject: z.string().trim().max(150).nullable(),
  followUpBody: z.string().trim().max(3000).nullable(),
  dailyLimit: z.number().int().min(1).max(200),
  startAt: z.string().datetime().nullable(),
});
export type CampaignInput = z.infer<typeof campaignSchema>;

async function owned(orgId: string, id: string) {
  const [c] = await db().select().from(schema.emailCampaigns).where(and(eq(schema.emailCampaigns.id, z.string().uuid().parse(id)), eq(schema.emailCampaigns.organizationId, orgId)));
  if (!c) throw new UserError("Campaign not found.");
  return c;
}
const EDITABLE = ["draft", "paused"];

export async function saveCampaignAction(id: string | null, input: unknown) {
  return action({ name: id ? "campaign.update" : "campaign.create", revalidate: ["/campaigns"], auditTarget: (r: { id: string }) => ({ type: "email_campaign", id: r.id }) }, async (auth) => {
    const c = campaignSchema.parse(input);
    const values = { ...c, startAt: c.startAt ? new Date(c.startAt) : null, updatedAt: new Date() };
    const problems = templateProblems(values);
    if (problems.length) throw new UserError(problems[0]);
    if (!id) {
      const [row] = await db().insert(schema.emailCampaigns).values({ ...values, organizationId: auth.org.id, createdBy: auth.user.id }).returning({ id: schema.emailCampaigns.id });
      return { id: row.id };
    }
    const cur = await owned(auth.org.id, id);
    if (!EDITABLE.includes(cur.status)) throw new UserError(`A campaign that is ${cur.status.replace(/_/g, " ")} cannot be edited. Pause it first.`);
    // Editing the text of an approved (paused) campaign voids the approval: it must be approved again.
    const textChanged = cur.subjectTemplate !== c.subjectTemplate || cur.bodyTemplate !== c.bodyTemplate || (cur.followUpSubject ?? "") !== (c.followUpSubject ?? "") || (cur.followUpBody ?? "") !== (c.followUpBody ?? "");
    await db()
      .update(schema.emailCampaigns)
      .set({ ...values, ...(textChanged ? { status: "draft", approvedBy: null, approvedAt: null } : {}) })
      .where(eq(schema.emailCampaigns.id, cur.id));
    return { id: cur.id };
  });
}

const audienceSchema = z.object({
  stage: z.enum(PIPELINE_STAGES.map((s) => s.key) as [string, ...string[]]).optional(),
  category: z.enum(BUSINESS_CATEGORIES.map((c) => c.key) as [string, ...string[]]).optional(),
  city: z.string().trim().max(80).optional(),
  minScore: z.number().int().min(0).max(100).optional(),
});

/** Adds every lead matching the filter (up to 500). Uncontactable leads are stored as skipped with a reason. */
export async function addAudienceAction(id: string, filter: unknown) {
  return action({ name: "campaign.add_recipients", revalidate: ["/campaigns"], limit: 20 }, async (auth) => {
    const c = await owned(auth.org.id, id);
    if (!EDITABLE.includes(c.status)) throw new UserError("Recipients can only be changed while the campaign is a draft or paused.");
    const f = audienceSchema.parse(filter);
    const b = schema.businesses;
    const conds = [eq(b.organizationId, auth.org.id), isNull(b.erasedAt), eq(b.isMock, false), notInArray(b.pipelineStage, ["REPLIED", "NEGOTIATION", "WON", "LOST"])];
    if (f.stage) conds.push(eq(b.pipelineStage, f.stage));
    if (f.category) conds.push(eq(b.category, f.category));
    if (f.city) conds.push(ilike(b.city, f.city.replace(/[\\%_]/g, "\\$&")));
    if (f.minScore != null) conds.push(gte(b.leadScore, f.minScore));
    const rows = await db().select({ id: b.id }).from(b).where(and(...conds)).orderBy(desc(b.leadScore)).limit(500);
    if (!rows.length) throw new UserError("No leads match this filter.");
    return addRecipients(auth.org.id, c, rows.map((r) => r.id));
  });
}

export async function removeRecipientAction(id: string, recipientId: string) {
  return action({ name: "campaign.remove_recipient", revalidate: ["/campaigns"] }, async (auth) => {
    const c = await owned(auth.org.id, id);
    if (!EDITABLE.includes(c.status)) throw new UserError("Pause the campaign before removing recipients.");
    await db()
      .delete(schema.campaignRecipients)
      .where(and(eq(schema.campaignRecipients.id, z.string().uuid().parse(recipientId)), eq(schema.campaignRecipients.campaignId, c.id), inArray(schema.campaignRecipients.status, ["pending", "skipped"])));
    return null;
  });
}

/** Renders the campaign for its first real recipients, exactly as it would be sent (footer included). */
export async function previewCampaignAction(id: string) {
  return action({ name: "campaign.preview", limit: 30 }, async (auth) => {
    const c = await owned(auth.org.id, id);
    const recs = await db()
      .select({ r: schema.campaignRecipients, b: schema.businesses })
      .from(schema.campaignRecipients)
      .innerJoin(schema.businesses, eq(schema.businesses.id, schema.campaignRecipients.businessId))
      .where(and(eq(schema.campaignRecipients.campaignId, c.id), eq(schema.campaignRecipients.status, "pending")))
      .limit(3);
    const s = auth.org.settings;
    const footer = complianceFooter("en", s, "https://…/u/unsubscribe-link");
    if (!recs.length) {
      const sample = Object.fromEntries(TEMPLATE_VARIABLES.map((v) => [v.key, v.sample]));
      return { sample: true, previews: [{ to: "example@business.example", business: "Sample business", subject: renderTemplate(c.subjectTemplate, sample).text, body: renderTemplate(c.bodyTemplate, sample).text + footer, missing: [] as string[] }] };
    }
    const previews = [];
    for (const { r, b } of recs) {
      const { vars } = await varsFor(b, s);
      const subject = renderTemplate(c.subjectTemplate, vars);
      const body = renderTemplate(c.bodyTemplate, vars);
      previews.push({ to: r.toEmail ?? "", business: b.name, subject: subject.text, body: body.text + footer, missing: [...new Set([...subject.missing, ...body.missing])] });
    }
    return { sample: false, previews };
  });
}

/** Sends one real test email to the signed-in user's own address (sample values, clearly marked). */
export async function sendCampaignTestAction(id: string) {
  return action({ name: "campaign.send_test", limit: 5, auditTarget: () => ({ type: "email_campaign", id }) }, async (auth) => {
    const c = await owned(auth.org.id, id);
    const s = auth.org.settings;
    const sender = senderProblems(s);
    if (sender) throw new UserError(sender);
    if ((await integrationMode(auth.org.id, "resend")) !== "live") throw new UserError("Resend is not connected, so no test email can be sent. Connect it in Integrations.");
    const sample: Record<string, string> = Object.fromEntries(TEMPLATE_VARIABLES.map((v) => [v.key, v.sample]));
    sample.agency_name = s.agencyName;
    sample.sender_name = s.senderName || s.agencyName;
    await sendEmail(
      { organizationId: auth.org.id },
      {
        from: `${s.senderName || s.agencyName} <${s.senderEmail}>`,
        to: auth.user.email,
        replyTo: s.replyToEmail || s.senderEmail,
        subject: `[TEST] ${renderTemplate(c.subjectTemplate, sample).text}`,
        text: `This is a test of the campaign “${c.name}” with sample values. It was sent only to you.\n\n${renderTemplate(c.bodyTemplate, sample).text}${complianceFooter("en", s, "https://example.invalid/unsubscribe-link-appears-here")}`,
        // A test goes only to the operator; the header still needs a valid target.
        unsubscribeUrl: `mailto:${s.replyToEmail || s.senderEmail}?subject=unsubscribe`,
        tags: { kind: "campaign_test" },
      },
    );
    return { to: auth.user.email };
  });
}

export async function submitCampaignAction(id: string) {
  return action({ name: "campaign.submit", revalidate: ["/campaigns", "/approvals"], auditTarget: () => ({ type: "email_campaign", id }) }, async (auth) => {
    const c = await owned(auth.org.id, id);
    if (c.status !== "draft") throw new UserError("Only draft campaigns can be submitted.");
    const problems = [...templateProblems(c), senderProblems(auth.org.settings)].filter(Boolean) as string[];
    if (problems.length) throw new UserError(problems[0]);
    const [pending] = await db().select({ id: schema.campaignRecipients.id }).from(schema.campaignRecipients).where(and(eq(schema.campaignRecipients.campaignId, c.id), eq(schema.campaignRecipients.status, "pending"))).limit(1);
    if (!pending) throw new UserError("Add at least one contactable recipient first.");
    await db().update(schema.emailCampaigns).set({ status: "awaiting_approval", updatedAt: new Date() }).where(eq(schema.emailCampaigns.id, c.id));
    await createApproval(null, { kind: "launch_campaign", subjectType: "email_campaign", subjectId: c.id, summary: `Launch campaign “${c.name}”`, payload: { dailyLimit: c.dailyLimit } }, auth.org.id);
    return null;
  });
}

const approveSchema = z.object({
  lawfulBasisConfirmed: z.literal(true, { message: "Confirm the lawful basis for contacting these businesses." }),
  recipientsAreBusinesses: z.literal(true, { message: "Confirm the recipients are business addresses, not private individuals." }),
  reviewedPreview: z.literal(true, { message: "Confirm you have read the email preview." }),
});

/** Approves a campaign as a whole. From here the scheduler may send within the daily limit. */
export async function decideCampaignAction(id: string, approve: boolean, confirmations?: unknown) {
  return action({ name: approve ? "campaign.approve" : "campaign.reject", role: "admin", revalidate: ["/campaigns", "/approvals", "/"], auditTarget: () => ({ type: "email_campaign", id, metadata: (confirmations ?? {}) as Record<string, unknown> }) }, async (auth) => {
    const c = await owned(auth.org.id, id);
    if (c.status !== "awaiting_approval") throw new UserError("This campaign is not waiting for approval.");
    if (approve) {
      approveSchema.parse(confirmations);
      const problems = [...templateProblems(c), senderProblems(auth.org.settings)].filter(Boolean) as string[];
      if (problems.length) throw new UserError(problems[0]);
    }
    const now = new Date();
    await db()
      .update(schema.emailCampaigns)
      .set(approve ? { status: "active", approvedBy: auth.user.id, approvedAt: now, updatedAt: now } : { status: "draft", updatedAt: now })
      .where(and(eq(schema.emailCampaigns.id, c.id), eq(schema.emailCampaigns.status, "awaiting_approval")));
    await db()
      .update(schema.approvals)
      .set({ status: approve ? "approved" : "rejected", decidedBy: auth.user.id, decidedAt: now })
      .where(and(eq(schema.approvals.subjectId, c.id), eq(schema.approvals.kind, "launch_campaign"), eq(schema.approvals.status, "pending")));
    return null;
  });
}

export async function setCampaignStateAction(id: string, to: "paused" | "active" | "cancelled") {
  return action({ name: `campaign.${to === "active" ? "resume" : to === "paused" ? "pause" : "cancel"}`, role: "admin", revalidate: ["/campaigns"], auditTarget: () => ({ type: "email_campaign", id }) }, async (auth) => {
    const c = await owned(auth.org.id, id);
    if (to === "paused" && c.status !== "active") throw new UserError("Only an active campaign can be paused.");
    if (to === "active") {
      if (c.status !== "paused") throw new UserError("Only a paused campaign can be resumed.");
      if (!c.approvedBy) throw new UserError("The email text changed after approval. Submit the campaign for approval again.");
    }
    if (to === "cancelled" && ["completed", "cancelled"].includes(c.status)) throw new UserError("This campaign is already finished.");
    await db().update(schema.emailCampaigns).set({ status: to, updatedAt: new Date(), ...(to === "cancelled" ? { completedAt: new Date() } : {}) }).where(eq(schema.emailCampaigns.id, c.id));
    if (to === "cancelled") {
      await db().update(schema.approvals).set({ status: "rejected", decidedBy: auth.user.id, decidedAt: new Date(), reason: "Campaign cancelled" }).where(and(eq(schema.approvals.subjectId, c.id), eq(schema.approvals.status, "pending")));
    }
    return null;
  });
}
