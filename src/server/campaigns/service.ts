import "../guard";
import { CLOSED_STAGES } from "@/lib/constants";
import { and, asc, desc, eq, gte, inArray, isNull, lte, ne, sql } from "drizzle-orm";
import { categoryLabel } from "@/lib/constants";
import { renderTemplate, type TemplateVars, unknownVariables, usesVariable } from "@/lib/campaign-template";
import type { OrgSettings } from "@/lib/settings";
import { complianceFooter, unsubscribeUrl } from "../agents/sales";
import { startOfUtcDay } from "../costs/usage";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { createTask, notify, writeLog } from "../orchestrator/tasks";
import { getOrgSettings } from "../org";
import { isSuppressed } from "../suppression";

export type Campaign = typeof schema.emailCampaigns.$inferSelect;
/** Do not write to a business again if any outreach email went to it this recently. */
const RECONTACT_DAYS = 30;

/** Problems that would make a campaign template unsafe or broken to send. */
export function templateProblems(c: Pick<Campaign, "subjectTemplate" | "bodyTemplate" | "followUpEnabled" | "followUpSubject" | "followUpBody">) {
  const problems: string[] = [];
  const check = (label: string, subject: string, body: string) => {
    const unknown = [...unknownVariables(subject), ...unknownVariables(body)];
    if (unknown.length) problems.push(`${label}: unknown variable(s) ${unknown.map((u) => `{{${u}}}`).join(", ")}.`);
    if (/\b(urgent|last chance|act now|laatste kans|alleen vandaag)\b/i.test(subject)) problems.push(`${label}: avoid urgency or pressure in the subject line.`);
    if (/^(re|fw|fwd):/i.test(subject.trim())) problems.push(`${label}: reply/forward prefixes misrepresent the conversation.`);
    if (subject.trim().length < 3) problems.push(`${label}: the subject is empty.`);
    if (body.trim().length < 40) problems.push(`${label}: the message is too short.`);
  };
  check("Email", c.subjectTemplate, c.bodyTemplate);
  if (c.followUpEnabled) check("Follow-up", c.followUpSubject ?? "", c.followUpBody ?? "");
  return problems;
}

/** What must be set in Settings before any outreach can be sent lawfully. */
export function senderProblems(s: OrgSettings) {
  const missing = [!s.agencyName && "agency name", !s.senderEmail && "sender email", !s.agencyAddress && "agency address"].filter(Boolean);
  return missing.length ? `Add your ${missing.join(", ")} in Settings — they are required in every outreach email.` : null;
}

/** Best lawful email address for a business: verified, generic business addresses first. Never invalid ones. */
export async function bestContact(businessId: string) {
  const contacts = await db()
    .select()
    .from(schema.businessContacts)
    .where(and(eq(schema.businessContacts.businessId, businessId), eq(schema.businessContacts.type, "email"), ne(schema.businessContacts.verificationStatus, "invalid")));
  const rank = (c: (typeof contacts)[number]) => (c.verificationStatus === "valid" ? 0 : c.verificationStatus === "accept_all" ? 1 : 2) + (c.isGeneric ? 0 : 3);
  return contacts.sort((a, b) => rank(a) - rank(b))[0] ?? null;
}

async function previewUrlFor(businessId: string) {
  const [project] = await db()
    .select({ id: schema.websiteProjects.id, slug: schema.websiteProjects.slug })
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.businessId, businessId), eq(schema.websiteProjects.status, "ready"), isNull(schema.websiteProjects.deletedAt)))
    .orderBy(desc(schema.websiteProjects.updatedAt))
    .limit(1);
  if (!project) return null;
  const [dep] = await db()
    .select({ url: schema.deployments.url })
    .from(schema.deployments)
    .where(and(eq(schema.deployments.projectId, project.id), eq(schema.deployments.status, "ready")))
    .orderBy(desc(schema.deployments.createdAt))
    .limit(1);
  return { projectId: project.id, url: dep?.url ?? `${process.env.APP_URL ?? "http://localhost:3000"}/p/${project.slug}` };
}

export async function varsFor(business: { id: string; name: string; city: string | null; category: string }, s: OrgSettings): Promise<{ vars: TemplateVars; projectId: string | null }> {
  const preview = await previewUrlFor(business.id);
  return {
    vars: { business_name: business.name.replace(/^\[MOCK\]\s*/, ""), city: business.city ?? undefined, category: categoryLabel(business.category).toLowerCase(), preview_url: preview?.url, agency_name: s.agencyName || undefined, sender_name: s.senderName || s.agencyName || undefined },
    projectId: preview?.projectId ?? null,
  };
}

/**
 * Adds businesses to a draft campaign. Each one gets its best public business email; those
 * that cannot be contacted are stored as "skipped" with the reason, so nothing is hidden.
 */
export async function addRecipients(organizationId: string, campaign: Campaign, businessIds: string[]) {
  const rows = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.organizationId, organizationId), inArray(schema.businesses.id, businessIds), isNull(schema.businesses.erasedAt)));
  let added = 0;
  let skipped = 0;
  for (const b of rows) {
    const contact = await bestContact(b.id);
    let skipReason: string | null = null;
    if (b.isMock || contact?.isMock) skipReason = "Test (mock) record";
    else if (!contact) skipReason = "No public business email found";
    else if (await isSuppressed(organizationId, contact.value)) skipReason = "On the suppression list";
    else if (CLOSED_STAGES.includes(b.pipelineStage)) skipReason = "Already in conversation";
    const [row] = await db()
      .insert(schema.campaignRecipients)
      .values({ organizationId, campaignId: campaign.id, businessId: b.id, toEmail: contact?.value ?? null, status: skipReason ? "skipped" : "pending", skipReason })
      .onConflictDoNothing()
      .returning({ id: schema.campaignRecipients.id });
    if (row) skipReason ? skipped++ : added++;
  }
  return { added, skipped, notFound: businessIds.length - rows.length };
}

async function createCampaignEmail(opts: {
  campaign: Campaign;
  settings: OrgSettings;
  business: { id: string; name: string; city: string | null; category: string; country: string | null };
  toEmail: string;
  kind: "intro" | "follow_up";
}): Promise<{ ok: true; emailId: string } | { ok: false; reason: string }> {
  const { campaign: c, settings: s, business: b } = opts;
  const subjectTpl = opts.kind === "intro" ? c.subjectTemplate : (c.followUpSubject ?? "");
  const bodyTpl = opts.kind === "intro" ? c.bodyTemplate : (c.followUpBody ?? "");
  const { vars, projectId } = await varsFor(b, s);
  const subject = renderTemplate(subjectTpl, vars);
  const body = renderTemplate(bodyTpl, vars);
  const missing = [...new Set([...subject.missing, ...body.missing])];
  if (missing.length) return { ok: false, reason: missing.includes("preview_url") ? "No website preview exists for this business yet" : `Missing ${missing.join(", ").replace(/_/g, " ")}` };
  const token = randomToken(24);
  const lang = /nederland|netherlands|belgi/i.test(b.country ?? "") ? "nl" : "en";
  const [email] = await db()
    .insert(schema.salesEmails)
    .values({
      organizationId: c.organizationId,
      businessId: b.id,
      projectId,
      kind: opts.kind,
      subject: subject.text.trim().slice(0, 150),
      bodyText: body.text.trim() + complianceFooter(lang, s, unsubscribeUrl(token)),
      toEmail: opts.toEmail,
      // The campaign was approved as a whole by this person; each email carries that approval.
      status: "approved",
      approvedBy: c.approvedBy,
      approvedAt: c.approvedAt,
      crmNotes: `Sent by campaign “${c.name}”.`,
      unsubscribeToken: token,
    })
    .returning({ id: schema.salesEmails.id });
  await createTask(c.organizationId, null, { agentKey: "sales", type: "send_email", businessId: b.id, input: { emailId: email.id, campaignId: c.id }, idempotencyKey: `send:${email.id}`, priority: 3, maxAttempts: 3 });
  return { ok: true, emailId: email.id };
}

async function sentToday(campaignId: string) {
  const [r] = (await db().execute(sql`
    SELECT count(*) AS n FROM sales_emails e
    WHERE e.created_at >= ${startOfUtcDay().toISOString()}::timestamptz
      AND e.id IN (SELECT intro_email_id FROM campaign_recipients WHERE campaign_id = ${campaignId}
                   UNION SELECT follow_up_email_id FROM campaign_recipients WHERE campaign_id = ${campaignId})`)) as unknown as { n: string }[];
  return Number(r?.n ?? 0);
}

/**
 * One scheduler pass over every active campaign. Sends at most the campaign's daily limit,
 * re-checks suppression, conversation stage and recent contact for each recipient at send
 * time, and claims each recipient atomically so two workers can never email the same one.
 */
export async function processCampaigns(): Promise<{ queued: number }> {
  const now = new Date();
  const campaigns = await db().select().from(schema.emailCampaigns).where(eq(schema.emailCampaigns.status, "active"));
  let queued = 0;
  for (const c of campaigns) {
    if (c.startAt && c.startAt > now) continue;
    if (!c.approvedBy || !c.approvedAt) continue; // never send without a recorded approval
    const s = await getOrgSettings(c.organizationId);
    const blocker = senderProblems(s) ?? templateProblems(c)[0] ?? null;
    if (blocker) {
      await db().update(schema.emailCampaigns).set({ status: "paused", updatedAt: now }).where(and(eq(schema.emailCampaigns.id, c.id), eq(schema.emailCampaigns.status, "active")));
      await notify(c.organizationId, `Campaign “${c.name}” paused`, blocker, `/campaigns/${c.id}`);
      await writeLog(c.organizationId, { agentKey: "orchestrator", level: "warn", message: `Campaign "${c.name}" paused: ${blocker}` });
      continue;
    }
    let budget = c.dailyLimit - (await sentToday(c.id));
    const r = schema.campaignRecipients;
    const b = schema.businesses;

    const handle = async (rec: typeof r.$inferSelect, kind: "intro" | "follow_up") => {
      const from = kind === "intro" ? "pending" : "sent";
      const skip = async (reason: string) => void (await db().update(r).set({ status: "skipped", skipReason: reason }).where(and(eq(r.id, rec.id), eq(r.status, from))));
      const [biz] = await db().select().from(b).where(eq(b.id, rec.businessId));
      if (!biz || biz.erasedAt) return skip("Business data was erased");
      if (CLOSED_STAGES.includes(biz.pipelineStage)) return void (await db().update(r).set({ status: "replied", skipReason: null }).where(and(eq(r.id, rec.id), eq(r.status, from))));
      if (!rec.toEmail) return skip("No public business email found");
      if (await isSuppressed(c.organizationId, rec.toEmail)) return skip("On the suppression list");
      if (kind === "intro") {
        const [recent] = await db()
          .select({ id: schema.salesEmails.id })
          .from(schema.salesEmails)
          .where(and(eq(schema.salesEmails.businessId, biz.id), inArray(schema.salesEmails.status, ["approved", "sending", "sent"]), gte(schema.salesEmails.createdAt, new Date(now.getTime() - RECONTACT_DAYS * 86_400_000))))
          .limit(1);
        if (recent) return skip(`Already emailed in the last ${RECONTACT_DAYS} days`);
      }
      // Claim before creating the email: only one worker wins this update.
      const [claimed] = await db()
        .update(r)
        .set(kind === "intro" ? { status: "sent", introSentAt: now, followUpDueAt: c.followUpEnabled ? new Date(now.getTime() + c.followUpAfterDays * 86_400_000) : null } : { status: "follow_up_sent" })
        .where(and(eq(r.id, rec.id), eq(r.status, from)))
        .returning({ id: r.id });
      if (!claimed) return;
      const made = await createCampaignEmail({ campaign: c, settings: s, business: biz, toEmail: rec.toEmail, kind });
      if (!made.ok) {
        await db().update(r).set({ status: "skipped", skipReason: made.reason, introSentAt: kind === "intro" ? null : rec.introSentAt }).where(eq(r.id, rec.id));
        return;
      }
      await db().update(r).set(kind === "intro" ? { introEmailId: made.emailId } : { followUpEmailId: made.emailId }).where(eq(r.id, rec.id));
      budget--;
      queued++;
    };

    if (budget > 0 && c.followUpEnabled) {
      const due = await db().select().from(r).where(and(eq(r.campaignId, c.id), eq(r.status, "sent"), lte(r.followUpDueAt, now))).orderBy(asc(r.followUpDueAt)).limit(budget);
      for (const rec of due) if (budget > 0) await handle(rec, "follow_up");
    }
    if (budget > 0) {
      const pending = await db().select().from(r).where(and(eq(r.campaignId, c.id), eq(r.status, "pending"))).orderBy(asc(r.createdAt)).limit(budget * 3);
      for (const rec of pending) if (budget > 0) await handle(rec, "intro");
    }

    // Finished when nobody is waiting for an email or a follow-up any more.
    const [open] = (await db().execute(sql`
      SELECT count(*) AS n FROM campaign_recipients WHERE campaign_id = ${c.id}
        AND (status = 'pending' OR (status = 'sent' AND ${c.followUpEnabled} AND follow_up_due_at IS NOT NULL))`)) as unknown as { n: string }[];
    if (Number(open?.n ?? 0) === 0) {
      await db().update(schema.emailCampaigns).set({ status: "completed", completedAt: now, updatedAt: now }).where(and(eq(schema.emailCampaigns.id, c.id), eq(schema.emailCampaigns.status, "active")));
      await notify(c.organizationId, `Campaign “${c.name}” finished`, "Every recipient has been handled.", `/campaigns/${c.id}`);
    }
  }
  return { queued };
}

/** Delivery and engagement numbers for one campaign, from recipient rows and provider events. */
export async function campaignStats(campaignId: string) {
  const [r] = (await db().execute(sql`
    WITH ids AS (
      SELECT intro_email_id AS id FROM campaign_recipients WHERE campaign_id = ${campaignId} AND intro_email_id IS NOT NULL
      UNION SELECT follow_up_email_id FROM campaign_recipients WHERE campaign_id = ${campaignId} AND follow_up_email_id IS NOT NULL
    )
    SELECT
      (SELECT count(*) FROM campaign_recipients WHERE campaign_id = ${campaignId}) AS recipients,
      (SELECT count(*) FROM campaign_recipients WHERE campaign_id = ${campaignId} AND status = 'pending') AS pending,
      (SELECT count(*) FROM campaign_recipients WHERE campaign_id = ${campaignId} AND status = 'skipped') AS skipped,
      (SELECT count(*) FROM campaign_recipients WHERE campaign_id = ${campaignId} AND status = 'replied') AS replied,
      (SELECT count(*) FROM sales_emails e JOIN ids ON ids.id = e.id WHERE e.status = 'sent' AND NOT e.is_mock) AS sent,
      (SELECT count(*) FROM sales_emails e JOIN ids ON ids.id = e.id WHERE e.status IN ('failed', 'blocked')) AS failed,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'delivered') AS delivered,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'opened') AS opened,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'bounced') AS bounced,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'unsubscribed') AS unsubscribed`)) as unknown as Record<string, string>[];
  const n = (k: string) => Number(r?.[k] ?? 0);
  return { recipients: n("recipients"), pending: n("pending"), skipped: n("skipped"), replied: n("replied"), sent: n("sent"), failed: n("failed"), delivered: n("delivered"), opened: n("opened"), bounced: n("bounced"), unsubscribed: n("unsubscribed") };
}
