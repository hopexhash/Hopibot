"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db";
import { integrationMode } from "../integrations/credentials";
import { capture } from "../integrations/posthog";
import { sendEmail } from "../integrations/resend";
import { createApproval } from "../orchestrator/control";
import { createTask } from "../orchestrator/tasks";
import { isSuppressed } from "../suppression";
import { action, UserError } from "./_util";
import { CLOSED_STAGES } from "@/lib/constants";
import { publishedAddressReview } from "../sales/outreach-review";
import { sampleEmails } from "@/lib/email/samples";
import { buildEmailHtml, emailContext } from "../sales/email-html";

async function ownedEmail(orgId: string, id: string) {
  const [e] = await db()
    .select()
    .from(schema.salesEmails)
    .where(and(eq(schema.salesEmails.id, z.string().uuid().parse(id)), eq(schema.salesEmails.organizationId, orgId)));
  if (!e) throw new UserError("Email not found.");
  return e;
}

const editSchema = z.object({
  subject: z.string().trim().min(3).max(150),
  bodyText: z.string().trim().min(20).max(10000),
  toEmail: z.string().trim().toLowerCase().email("Enter a valid recipient").nullable(),
});

export async function updateEmailAction(id: string, input: z.input<typeof editSchema>) {
  return action({ name: "email.update", revalidate: ["/emails"] }, async (auth) => {
    const e = await ownedEmail(auth.org.id, id);
    if (!["draft", "awaiting_approval", "blocked"].includes(e.status)) throw new UserError(`A ${e.status} email can no longer be edited.`);
    const p = editSchema.parse(input);
    if (!p.bodyText.includes(e.unsubscribeToken)) throw new UserError("The opt-out link must stay in the email. Restore the footer before saving.");
    if (/\b(urgent|last chance|act now|laatste kans|alleen vandaag)\b/i.test(p.subject)) throw new UserError("Avoid urgency or pressure in the subject line.");
    if (/^(re|fw|fwd):/i.test(p.subject)) throw new UserError("Don't use reply/forward prefixes — they misrepresent the conversation.");
    let blockedReason = e.blockedReason;
    if (p.toEmail && p.toEmail !== e.toEmail) {
      if (await isSuppressed(auth.org.id, p.toEmail)) throw new UserError("This address is on the suppression list.");
      blockedReason = p.toEmail.endsWith(".invalid") ? "Mock contact address — cannot be sent." : null;
    }
    await db()
      .update(schema.salesEmails)
      .set({ subject: p.subject, bodyText: p.bodyText, toEmail: p.toEmail, blockedReason, status: e.status === "blocked" ? "awaiting_approval" : e.status, updatedAt: new Date() })
      .where(eq(schema.salesEmails.id, e.id));
    return null;
  });
}

const approveSchema = z.object({
  lawfulBasisConfirmed: z.literal(true, { message: "Confirm the lawful basis for contacting this business." }),
  recipientIsBusiness: z.literal(true, { message: "Confirm the recipient is a business address, not a private individual." }),
  /** The operator checked that the business itself published this general address for being contacted. */
  publishedAddressConfirmed: z.boolean().optional(),
});

export async function approveAndSendAction(id: string, confirmations: z.input<typeof approveSchema>) {
  return action({ name: "email.approve_send", role: "admin", revalidate: ["/emails", "/command"], auditTarget: () => ({ type: "sales_email", id, metadata: confirmations }) }, async (auth) => {
    const conf = approveSchema.parse(confirmations);
    let e = await ownedEmail(auth.org.id, id);
    if (e.status !== "awaiting_approval") throw new UserError(`Only emails awaiting approval can be sent (this one is ${e.status}).`);
    const toEmail = e.toEmail;
    if (!toEmail) throw new UserError("Add a recipient address first.");
    if (e.blockedReason) {
      const review = await publishedAddressReview(e);
      if (!review || !conf.publishedAddressConfirmed || review.contact.value !== toEmail) throw new UserError(e.blockedReason);
      // Record the basis on the business, with where the address was found and who checked it.
      await db()
        .update(schema.businesses)
        .set({
          contactPermission: "legitimate_interest",
          permissionSource: `General address ${review.contact.value} published by the business on ${review.sourceUrl}; checked by ${auth.user.email} when approving the first email.`.slice(0, 300),
          permissionAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(schema.businesses.id, e.businessId));
      await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: e.businessId, userId: auth.user.id, type: "system", content: `Contact permission recorded: published general address (${review.sourceUrl})`, metadata: { permission: "legitimate_interest", source: review.sourceUrl } });
      await db().update(schema.salesEmails).set({ blockedReason: null, updatedAt: new Date() }).where(eq(schema.salesEmails.id, e.id));
      e = { ...e, blockedReason: null };
    }
    if (await isSuppressed(auth.org.id, toEmail)) throw new UserError("The recipient is on the suppression list.");
    const s = auth.org.settings;
    if (!s.agencyName || !s.senderEmail || !s.agencyAddress) throw new UserError("Complete your agency name, address and sender email in Settings — they are required in every outreach email.");
    if (!e.bodyText.includes(e.unsubscribeToken)) throw new UserError("The opt-out link is missing from the email.");
    await db()
      .update(schema.salesEmails)
      .set({ status: "approved", approvedBy: auth.user.id, approvedAt: new Date(), updatedAt: new Date() })
      .where(and(eq(schema.salesEmails.id, e.id), eq(schema.salesEmails.status, "awaiting_approval")));
    await db()
      .update(schema.approvals)
      .set({ status: "approved", decidedBy: auth.user.id, decidedAt: new Date() })
      .where(and(eq(schema.approvals.subjectId, e.id), eq(schema.approvals.kind, "send_email"), eq(schema.approvals.status, "pending")));
    await createTask(auth.org.id, null, {
      agentKey: "sales",
      type: "send_email",
      businessId: e.businessId,
      input: { emailId: e.id },
      idempotencyKey: `send:${e.id}`,
      priority: 1,
      maxAttempts: 3,
    });
    await capture(auth.org.id, auth.user.id, "email_approved", { emailId: e.id });
    return null;
  });
}

/** Sends this exact email to the signed-in user's own address so they can see it in a real inbox. */
export async function sendEmailTestAction(id: string) {
  return action({ name: "email.send_test", limit: 5, auditTarget: () => ({ type: "sales_email", id }) }, async (auth) => {
    const e = await ownedEmail(auth.org.id, id);
    const s = auth.org.settings;
    if (!s.agencyName || !s.senderEmail) throw new UserError("Add your agency name and sender email in Settings first.");
    if ((await integrationMode(auth.org.id, "resend")) !== "live") throw new UserError("Resend is not connected, so no test email can be sent. Connect it in Integrations.");
    await sendEmail(
      { organizationId: auth.org.id },
      {
        from: `${s.senderName || s.agencyName} <${s.senderEmail}>`,
        to: auth.user.email,
        replyTo: s.replyToEmail || s.senderEmail,
        subject: `[TEST] ${e.subject}`,
        // The real unsubscribe link is replaced so a test click can never unsubscribe the business.
        text: `This is a test copy sent only to you. The real recipient would be: ${e.toEmail ?? "(none yet)"}\n\n${e.bodyText.replaceAll(e.unsubscribeToken, "test-link-disabled")}`,
        // The same design the recipient gets, with a test banner and a dead unsubscribe link.
        html: (await buildEmailHtml(e, { test: { to: e.toEmail ?? "—" } })) ?? undefined,
        unsubscribeUrl: `mailto:${s.replyToEmail || s.senderEmail}?subject=unsubscribe`,
        tags: { kind: "email_test" },
      },
    );
    return { to: auth.user.email };
  });
}

export async function rejectEmailAction(id: string) {
  return action({ name: "email.reject", revalidate: ["/emails", "/command"], auditTarget: () => ({ type: "sales_email", id }) }, async (auth) => {
    const e = await ownedEmail(auth.org.id, id);
    if (["sent", "sending"].includes(e.status)) throw new UserError("This email was already sent.");
    await db().update(schema.salesEmails).set({ status: "cancelled", updatedAt: new Date() }).where(eq(schema.salesEmails.id, e.id));
    await db()
      .update(schema.approvals)
      .set({ status: "rejected", decidedBy: auth.user.id, decidedAt: new Date() })
      .where(and(eq(schema.approvals.subjectId, e.id), eq(schema.approvals.status, "pending")));
    return null;
  });
}

export async function queueFollowUpAction(id: string) {
  return action({ name: "email.queue_follow_up", revalidate: ["/emails"] }, async (auth) => {
    const e = await ownedEmail(auth.org.id, id);
    if (e.kind !== "follow_up" || e.status !== "draft") throw new UserError("Only follow-up drafts can be queued.");
    const [intro] = await db()
      .select({ id: schema.salesEmails.id })
      .from(schema.salesEmails)
      .where(and(eq(schema.salesEmails.businessId, e.businessId), eq(schema.salesEmails.kind, "intro"), eq(schema.salesEmails.status, "sent")));
    if (!intro) throw new UserError("Send the introduction email before a follow-up.");
    const [b] = await db().select({ stage: schema.businesses.pipelineStage, name: schema.businesses.name }).from(schema.businesses).where(eq(schema.businesses.id, e.businessId));
    if (CLOSED_STAGES.includes(b.stage)) throw new UserError("This business already replied — follow-ups are not needed.");
    await db().update(schema.salesEmails).set({ status: "awaiting_approval", updatedAt: new Date() }).where(eq(schema.salesEmails.id, e.id));
    await createApproval(null, { kind: "send_email", subjectType: "sales_email", subjectId: e.id, summary: `Send follow-up to ${b.name}` }, auth.org.id);
    return null;
  });
}

export async function addSuppressionAction(value: string, reason: string) {
  return action({ name: "suppression.add", revalidate: ["/emails"] }, async (auth) => {
    const v = z.string().trim().toLowerCase().min(3).max(200).parse(value);
    const isEmail = v.includes("@");
    if (isEmail) z.string().email().parse(v);
    else z.string().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, "Enter an email address or a domain").parse(v);
    await db()
      .insert(schema.suppressionList)
      .values({ organizationId: auth.org.id, email: isEmail ? v : null, domain: isEmail ? null : v, reason: z.enum(["opt_out", "manual", "bounce", "complaint", "gdpr_erasure"]).parse(reason), source: "manual" })
      .onConflictDoNothing();
    return null;
  });
}

export async function removeSuppressionAction(id: string) {
  return action({ name: "suppression.remove", role: "admin", revalidate: ["/emails"], auditTarget: () => ({ type: "suppression", id }) }, async (auth) => {
    const [row] = await db().select().from(schema.suppressionList).where(and(eq(schema.suppressionList.id, z.string().uuid().parse(id)), eq(schema.suppressionList.organizationId, auth.org.id)));
    if (!row) throw new UserError("Entry not found.");
    if (["opt_out", "gdpr_erasure", "complaint"].includes(row.reason)) throw new UserError("Opt-outs, complaints and erasure requests cannot be removed from the suppression list.");
    await db().delete(schema.suppressionList).where(eq(schema.suppressionList.id, row.id));
    return null;
  });
}

/**
 * Sends one of the email designs, with sample customer data and the real company details,
 * to the signed-in user's own address (never to anyone else), so it can be checked in a
 * real inbox.
 */
export async function sendDesignTestAction(key: string, lang: "nl" | "en") {
  return action({ name: "email.design_test", limit: 6 }, async (auth) => {
    const s = auth.org.settings;
    if (!s.agencyName || !s.senderEmail) throw new UserError("Add your agency name and sender email in Settings first.");
    if ((await integrationMode(auth.org.id, "resend")) !== "live") throw new UserError("Resend is not connected, so no test email can be sent. Connect it in Integrations.");
    const l = lang === "en" ? "en" : "nl";
    const sample = sampleEmails(emailContext(s, l), l, { to: auth.user.email }).find((e) => e.key === key);
    if (!sample) throw new UserError("Unknown email design.");
    await sendEmail(
      { organizationId: auth.org.id },
      {
        from: `${s.senderName || s.agencyName} <${s.senderEmail}>`,
        to: auth.user.email,
        replyTo: s.replyToEmail || s.senderEmail,
        subject: `[TEST] ${sample.subject}`,
        text: sample.text,
        html: sample.html,
        unsubscribeUrl: `mailto:${s.replyToEmail || s.senderEmail}?subject=unsubscribe`,
        tags: { kind: "email_design_test", template: key },
      },
    );
    return { to: auth.user.email };
  });
}
