import "../guard";
import { designReadyEmail } from "@/lib/email/templates";
import { INQUIRY_SOURCE, inquirySendBlocker } from "@/lib/inquiry-email";
import { assessOutreach } from "@/lib/outreach-compliance";
import { buildEmailHtml, demoUrl, emailContext } from "../sales/email-html";
import { and, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { categoryLabel } from "@/lib/constants";
import type { OrgSettings } from "@/lib/settings";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { AgentError, claudeStructured } from "../integrations/anthropic";
import { IntegrationUnavailableError } from "../integrations/credentials";
import { sendEmail } from "../integrations/resend";
import { advanceStage, notify } from "../orchestrator/tasks";
import type { AgentContext, AgentHandler } from "../orchestrator/types";
import { createApproval } from "../orchestrator/control";
import { isSuppressed } from "../suppression";

const draftSchema = z.object({
  subject: z.string().max(120).describe("Honest, specific subject. No clickbait, no fake urgency, no 'Re:'/'Fwd:'."),
  body: z.string().max(3000).describe("Plain-text email body WITHOUT signature, opt-out or legal footer (added by the system). Use the placeholder [PREVIEW_URL] exactly once."),
  previewDescription: z.string().max(400),
  followUpSubject: z.string().max(120),
  followUpBody: z.string().max(2000).describe("Short, polite follow-up, sent only if there is no reply. Contains [PREVIEW_URL]."),
  proposal: z.object({
    summary: z.string().max(600),
    includes: z.array(z.string().max(120)).max(10),
    setupFeeEur: z.number().min(0).max(100000),
    monthlyFeeEur: z.number().min(0).max(10000),
    rationale: z.string().max(400),
  }),
  crmNotes: z.string().max(800),
});

export function complianceFooter(lang: string, s: OrgSettings, unsubscribeUrl: string) {
  const id = [s.agencyName, s.agencyAddress, s.kvkNumber ? `KvK ${s.kvkNumber}` : null, s.agencyWebsite].filter(Boolean).join(" · ");
  return lang === "nl"
    ? `\n\n--\n${s.senderName || s.agencyName}\n${id}\n\nJe ontvangt dit eenmalige bericht omdat de contactgegevens van je bedrijf openbaar vermeld staan. Wil je geen berichten meer van ons ontvangen? Meld je direct af: ${unsubscribeUrl}\nHet websiteconcept is een demonstratie en niet gepubliceerd als je officiële website.`
    : `\n\n--\n${s.senderName || s.agencyName}\n${id}\n\nYou are receiving this one-off message because your business contact details are publicly listed. To stop receiving messages from us, unsubscribe instantly: ${unsubscribeUrl}\nThe website concept is a demonstration and has not been published as your official website.`;
}

export function unsubscribeUrl(token: string) {
  return `${process.env.APP_URL ?? "http://localhost:3000"}/u/${token}`;
}

async function draftIntro(ctx: AgentContext) {
  const businessId = ctx.task.businessId!;
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, ctx.organizationId)));
  if (!b) throw new Error("Business not found");
  if (b.erasedAt) return { status: "completed" as const, output: { skipped: "business erased (GDPR)" } };

  const [project] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.businessId, b.id), eq(schema.websiteProjects.status, "ready")))
    .orderBy(desc(schema.websiteProjects.updatedAt))
    .limit(1);
  if (!project) throw new AgentError("No QC-approved website preview exists for this business yet.", "NO_PREVIEW", false);
  const [dep] = await db()
    .select()
    .from(schema.deployments)
    .where(and(eq(schema.deployments.projectId, project.id), eq(schema.deployments.status, "ready"), eq(schema.deployments.environment, "preview")))
    .orderBy(desc(schema.deployments.createdAt))
    .limit(1);
  // Emails link to the demo page (preview, opportunity report, pricing and ordering in one place).
  void dep;
  const previewUrl = demoUrl(project.slug);

  // Pick the best lawful contact: verified, generic business addresses first.
  const contacts = await db()
    .select()
    .from(schema.businessContacts)
    .where(and(eq(schema.businessContacts.businessId, b.id), eq(schema.businessContacts.type, "email"), ne(schema.businessContacts.verificationStatus, "invalid")));
  const rank = (c: (typeof contacts)[number]) => (c.verificationStatus === "valid" ? 0 : c.verificationStatus === "accept_all" ? 1 : 2) + (c.isGeneric ? 0 : 3);
  const contact = contacts.sort((a, z2) => rank(a) - rank(z2))[0] ?? null;
  if (contact && (await isSuppressed(ctx.organizationId, contact.value))) {
    await ctx.log("info", `${contact.value} is suppressed — no email drafted.`);
    return { status: "completed" as const, output: { skipped: "suppressed" } };
  }

  const [research] = await db()
    .select()
    .from(schema.businessResearch)
    .where(eq(schema.businessResearch.businessId, b.id))
    .orderBy(desc(schema.businessResearch.createdAt))
    .limit(1);
  const profile = (research?.profile ?? {}) as { language?: string; improvements?: string[]; existingWebsite?: { weaknesses?: string[] } };
  const lang = profile.language ?? "nl";
  const s = ctx.settings;
  const mode = await ctx.mode("anthropic");
  if (mode === "unavailable") throw new IntegrationUnavailableError("anthropic");
  let draft: z.infer<typeof draftSchema>;

  if (mode === "mock") {
    draft = {
      subject: lang === "nl" ? `Een websiteconcept voor ${b.name}` : `A website concept for ${b.name}`,
      body:
        lang === "nl"
          ? `Hoi,\n\nIk kwam ${b.name} tegen en zag een kans om je bedrijf online sterker neer te zetten. Daarom heb ik, zonder dat je erom vroeg, een websiteconcept voor je gemaakt. Zo zie je meteen hoe een moderne website voor jouw bedrijf eruit kan zien.\n\nJe bekijkt het concept hier:\n[PREVIEW_URL]\n\nBevalt het ontwerp? Dan bespreken we graag of we er je officiële website van maken.\n\nGroet,`
          : `Hello,\n\nI came across ${b.name} and noticed an opportunity to improve your online presence. I created a website concept specifically for your business so you can see what a more modern website could look like.\n\nYou can preview the concept here:\n[PREVIEW_URL]\n\nIf you like the design, we can discuss turning it into your official website.\n\nKind regards,`,
      previewDescription: "Mobile-friendly concept with clear contact options. (MOCK draft)",
      followUpSubject: lang === "nl" ? `Nog even over het websiteconcept voor ${b.name}` : `Following up on the website concept for ${b.name}`,
      followUpBody: lang === "nl" ? `Hoi,\n\nIk wilde even nagaan of je het websiteconcept voor ${b.name} al hebt kunnen bekijken: [PREVIEW_URL]\n\nGroet,` : `Hello,\n\nJust checking whether you had a chance to look at the concept: [PREVIEW_URL]\n\nKind regards,`,
      proposal: {
        summary: "Turn the concept into the official website, including hosting and small content updates.",
        includes: ["Final design and copy review with you", "Domain connection", "Hosting & SSL", "Monthly small updates"],
        setupFeeEur: s.defaultPricing.setupFeeEur,
        monthlyFeeEur: s.defaultPricing.monthlyFeeEur,
        rationale: "Default agency pricing (MOCK).",
      },
      crmNotes: "MOCK draft — generated without Claude.",
    };
  } else {
    const res = await claudeStructured({
      ctx: ctx.usage,
      operation: "draft_sales_email",
      schema: draftSchema,
      model: ctx.config.model,
      effort: (ctx.config.effort as "medium") ?? "medium",
      maxTokens: 8000,
      system: `You are the Sales Agent of a small web design agency writing a first, personal outreach email to a local business.
Rules:
- Write in ${lang === "nl" ? "Dutch, addressing the reader with 'je' (never 'u'): friendly, confident and professional, flawless spelling and grammar" : "the business's language"}. Short (90–160 words), warm, specific to this business, human.
- Start with a short greeting line ("Hoi," in Dutch, or with the contact's first name when it is given). End with a short closing line such as "Groet," (the name is added by the system).
- Honest: say plainly that you made an unsolicited website concept. Mention 1–2 concrete improvements from the research. No exaggeration, no guarantees, no invented facts, no fake urgency or scarcity, no deceptive subject lines.
- Include [PREVIEW_URL] exactly once. Do not include a signature block, opt-out text or legal footer — the system appends them.
- Pricing suggestion: base it on the agency's default pricing (setup €${s.defaultPricing.setupFeeEur}, €${s.defaultPricing.monthlyFeeEur}/month), adjusted only if the scope clearly differs; explain the rationale.
Operator instructions: ${ctx.config.instructions || "(none)"}`,
      prompt: JSON.stringify(
        {
          business: { name: b.name, category: categoryLabel(b.category), city: b.city, hasWebsite: b.websiteStatus === "has_website" },
          research: { improvements: profile.improvements ?? [], weaknesses: profile.existingWebsite?.weaknesses ?? [] },
          agency: { name: s.agencyName, sender: s.senderName },
        },
        null,
        2,
      ),
    });
    draft = res.data;
  }

  const token = randomToken(24);
  const unsub = unsubscribeUrl(token);
  const footer = complianceFooter(lang, s, unsub);
  const body = draft.body.replaceAll("[PREVIEW_URL]", previewUrl) + footer;
  // Permission-based outreach: without a recorded lawful basis the draft waits for a person.
  const assessment = assessOutreach({ country: b.country, permission: b.contactPermission, contact: contact ? { isGeneric: contact.isGeneric, source: contact.source } : null });
  const blockedReason = !contact
    ? "No published or verified business email address found. Add one manually before approving."
    : contact.isMock
      ? "Mock contact address — cannot be sent."
      : assessment.decision !== "send"
        ? `Permission needed — ${assessment.reason} ${assessment.action}`
        : null;

  const [email] = await db()
    .insert(schema.salesEmails)
    .values({
      organizationId: ctx.organizationId,
      businessId: b.id,
      projectId: project.id,
      contactId: contact?.id ?? null,
      kind: "intro",
      subject: draft.subject,
      bodyText: body,
      toEmail: contact?.value ?? null,
      proposal: { ...draft.proposal, previewDescription: draft.previewDescription, lang } as Record<string, unknown>,
      crmNotes: draft.crmNotes,
      status: "awaiting_approval",
      blockedReason,
      unsubscribeToken: token,
      isMock: mode === "mock",
    })
    .returning();
  // Follow-up draft (not queued for approval until the operator decides to use it).
  const fuToken = randomToken(24);
  await db()
    .insert(schema.salesEmails)
    .values({
      organizationId: ctx.organizationId,
      businessId: b.id,
      projectId: project.id,
      contactId: contact?.id ?? null,
      kind: "follow_up",
      subject: draft.followUpSubject,
      bodyText: draft.followUpBody.replaceAll("[PREVIEW_URL]", previewUrl) + complianceFooter(lang, s, unsubscribeUrl(fuToken)),
      toEmail: contact?.value ?? null,
      status: "draft",
      unsubscribeToken: fuToken,
      isMock: mode === "mock",
    });
  await createApproval(ctx.task, {
    kind: "send_email",
    subjectType: "sales_email",
    subjectId: email.id,
    summary: `Send intro email to ${b.name}${contact ? ` (${contact.value})` : ""}`,
    payload: { subject: draft.subject },
  });
  await db()
    .insert(schema.crmActivities)
    .values({ organizationId: ctx.organizationId, businessId: b.id, type: "system", content: `Sales email drafted and awaiting approval. ${draft.crmNotes}`.slice(0, 1000) });
  await advanceStage(b.id, contact && !contact.isMock && assessment.decision !== "send" ? "CONTACT_PERMISSION_REQUIRED" : "CONTACT_READY", ctx.organizationId);
  await notify(ctx.organizationId, "An email is waiting for your approval", `Intro email to ${b.name}`, `/emails/${email.id}`, "approval");
  await ctx.log("info", `Drafted intro email for ${b.name}${blockedReason ? ` (blocked: ${blockedReason})` : ""}.`);
  return { status: "completed" as const, output: { emailId: email.id, blocked: Boolean(blockedReason), mock: mode === "mock" } };
}

/** Sends one approved email. Re-checks approval, suppression and recipient at send time. */
async function sendApproved(ctx: AgentContext) {
  const emailId = String(ctx.task.input.emailId ?? "");
  const [email] = await db()
    .select()
    .from(schema.salesEmails)
    .where(and(eq(schema.salesEmails.id, emailId), eq(schema.salesEmails.organizationId, ctx.organizationId)));
  if (!email) throw new AgentError("Email not found.", "NOT_FOUND", false);
  if (email.status === "sent") return { status: "completed" as const, output: { alreadySent: true } };
  if (email.status !== "approved" && email.status !== "sending") throw new AgentError(`Email is not approved (status ${email.status}).`, "NOT_APPROVED", false);
  if (!email.approvedBy || !email.approvedAt) throw new AgentError("Email has no recorded approver.", "NOT_APPROVED", false);
  if (!email.toEmail) throw new AgentError("Email has no recipient.", "NO_RECIPIENT", false);
  const block = async (reason: string) => {
    await db().update(schema.salesEmails).set({ status: "blocked", blockedReason: reason, updatedAt: new Date() }).where(eq(schema.salesEmails.id, email.id));
    throw new AgentError(reason, "BLOCKED", false);
  };
  if (await isSuppressed(ctx.organizationId, email.toEmail)) await block("Recipient is on the suppression list.");
  const [biz] = await db().select({ erasedAt: schema.businesses.erasedAt, country: schema.businesses.country, permission: schema.businesses.contactPermission }).from(schema.businesses).where(eq(schema.businesses.id, email.businessId));
  if (biz?.erasedAt) await block("Business data was erased on request.");
  // The lawful basis is re-checked at send time: approval alone is not permission to contact.
  if (!email.isMock) {
    const [contact] = email.contactId ? await db().select().from(schema.businessContacts).where(eq(schema.businessContacts.id, email.contactId)) : [];
    const verdict = assessOutreach({ country: biz?.country ?? null, permission: biz?.permission ?? "unknown", contact: { isGeneric: contact?.isGeneric ?? false, source: contact?.source ?? "manual" } });
    if (verdict.decision !== "send") await block(`Permission needed — ${verdict.reason} ${verdict.action}`);
  }
  const s = ctx.settings;
  if (!s.senderEmail || !s.agencyName) await block("Set the agency name and sender email in Settings before sending.");

  const mode = await ctx.mode("resend");
  await db().update(schema.salesEmails).set({ status: "sending", updatedAt: new Date() }).where(eq(schema.salesEmails.id, email.id));
  let providerMessageId: string | null = null;
  const isMock = mode !== "live" || email.isMock || email.toEmail.endsWith(".invalid");
  if (mode === "unavailable") throw new IntegrationUnavailableError("resend");
  if (!isMock) {
    const res = await sendEmail(ctx.usage, {
      from: `${s.senderName || s.agencyName} <${s.senderEmail}>`,
      to: email.toEmail,
      replyTo: s.replyToEmail || s.senderEmail,
      subject: email.subject,
      text: email.bodyText,
      html: (await buildEmailHtml(email)) ?? undefined,
      // Header uses the RFC 8058 one-click endpoint; the body links to the confirmation page.
      unsubscribeUrl: `${process.env.APP_URL ?? "http://localhost:3000"}/api/unsubscribe/${email.unsubscribeToken}`,
      unsubscribeMailto: s.replyToEmail || s.senderEmail,
      tags: { email_id: email.id, kind: email.kind },
    });
    providerMessageId = res.id;
  } else {
    await ctx.log("warn", "MOCK send: Resend is not configured or the address is a mock — no email was actually sent.");
  }
  await db()
    .update(schema.salesEmails)
    .set({ status: "sent", sentAt: new Date(), providerMessageId, isMock: isMock || email.isMock, updatedAt: new Date() })
    .where(eq(schema.salesEmails.id, email.id));
  await db().insert(schema.emailEvents).values({ organizationId: ctx.organizationId, emailId: email.id, type: isMock ? "simulated_send" : "sent", payload: { providerMessageId } });
  await db()
    .insert(schema.crmActivities)
    .values({ organizationId: ctx.organizationId, businessId: email.businessId, type: "email", content: `${isMock ? "[MOCK — not sent] " : ""}Email sent: ${email.subject}`, metadata: { emailId: email.id } });
  if (!isMock) await advanceStage(email.businessId, "CONTACTED", ctx.organizationId);
  return { status: "completed" as const, output: { sent: !isMock, mock: isMock, providerMessageId } };
}

/**
 * The owner approved the design of someone who asked for it through the website: write them
 * the fixed "your design is ready" email and, when sending is really possible, send it on
 * that approval. When it is not, the email waits in the Email Centre and the owner is told
 * why; it is never marked as sent.
 */
async function inquiryPreview(ctx: AgentContext) {
  const businessId = ctx.task.businessId!;
  const approverId = String(ctx.task.input.approvedBy ?? "");
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, ctx.organizationId)));
  if (!b) throw new AgentError("Business not found.", "NOT_FOUND", false);
  if (b.erasedAt) return { status: "completed" as const, output: { skipped: "business erased (GDPR)" } };
  if (b.source !== INQUIRY_SOURCE) throw new AgentError("This business did not ask for a design through the website.", "NOT_AN_ENQUIRY", false);
  const [project] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.id, ctx.task.projectId ?? ""), eq(schema.websiteProjects.businessId, b.id)));
  if (!project || project.status !== "ready" || project.approvalStatus !== "approved") throw new AgentError("The design is not approved, so nothing is sent.", "NOT_APPROVED", false);
  const [already] = await db()
    .select({ id: schema.salesEmails.id })
    .from(schema.salesEmails)
    .where(and(eq(schema.salesEmails.businessId, b.id), eq(schema.salesEmails.kind, "intro"), ne(schema.salesEmails.status, "cancelled")))
    .limit(1);
  if (already) return { status: "completed" as const, output: { skipped: "an email for this design already exists", emailId: already.id } };
  const [contact] = await db()
    .select()
    .from(schema.businessContacts)
    .where(and(eq(schema.businessContacts.businessId, b.id), eq(schema.businessContacts.type, "email"), eq(schema.businessContacts.source, "inquiry")))
    .orderBy(desc(schema.businessContacts.createdAt))
    .limit(1);
  if (!contact) {
    await notify(ctx.organizationId, "Design approved, but there is no address to send it to", b.name, `/businesses/${b.id}`, "warning");
    return { status: "completed" as const, output: { skipped: "no enquiry address" } };
  }
  if (await isSuppressed(ctx.organizationId, contact.value)) {
    await ctx.log("info", `${contact.value} is suppressed: no email written.`);
    return { status: "completed" as const, output: { skipped: "suppressed" } };
  }

  const s = ctx.settings;
  // The language of the page the request came from (English site: English email).
  const lang = b.sourceData?.language === "en" ? "en" : "nl";
  const token = randomToken(24);
  const contactName = typeof b.sourceData?.contactName === "string" ? b.sourceData.contactName : null;
  // The fixed "your design is ready" email (src/lib/email/templates.ts); its HTML is built
  // from the same data at send time.
  const text = designReadyEmail({ ctx: emailContext(s, lang), contactName, company: b.name, previewUrl: demoUrl(project.slug), unsubscribeUrl: unsubscribeUrl(token) });
  const verdict = assessOutreach({ country: b.country, permission: b.contactPermission, contact: { isGeneric: contact.isGeneric, source: contact.source } });
  const blocker =
    inquirySendBlocker({ resendLive: (await ctx.mode("resend")) === "live", agencyName: s.agencyName, senderEmail: s.senderEmail, agencyAddress: s.agencyAddress }) ??
    (contact.isMock ? "The address is a test address." : verdict.decision !== "send" ? verdict.reason : !approverId ? "No approver was recorded." : null);
  const [email] = await db()
    .insert(schema.salesEmails)
    .values({
      organizationId: ctx.organizationId,
      businessId: b.id,
      projectId: project.id,
      contactId: contact.id,
      kind: "intro",
      subject: text.subject,
      bodyText: text.text,
      toEmail: contact.value,
      proposal: { lang, template: "design_ready", contactName, previewDescription: "Requested through the website form." } as Record<string, unknown>,
      crmNotes: blocker ? `Reply to a website enquiry. Not sent yet: ${blocker}` : "Reply to a website enquiry, sent on approval of the design.",
      status: blocker ? "awaiting_approval" : "approved",
      approvedBy: blocker ? null : approverId,
      approvedAt: blocker ? null : new Date(),
      unsubscribeToken: token,
      isMock: false,
    })
    .returning();
  if (blocker) {
    await createApproval(ctx.task, { kind: "send_email", subjectType: "sales_email", subjectId: email.id, summary: `Send the design to ${b.name} (${contact.value})`, payload: { subject: text.subject } });
    await db().insert(schema.crmActivities).values({ organizationId: ctx.organizationId, businessId: b.id, type: "system", content: `Design approved. The email with the preview is written but NOT sent: ${blocker}`.slice(0, 1000) });
    await notify(ctx.organizationId, "Design approved, but the email was not sent", `${b.name}: ${blocker} The email is waiting in the Email Centre.`, `/emails/${email.id}`, "warning");
    await ctx.log("warn", `Preview email for ${b.name} written but not sent: ${blocker}`);
    return { status: "completed" as const, output: { emailId: email.id, sent: false, reason: blocker } };
  }
  await db().insert(schema.crmActivities).values({ organizationId: ctx.organizationId, businessId: b.id, type: "system", content: `Design approved; the email with the preview is being sent to ${contact.value}.` });
  await ctx.spawn({ agentKey: "sales", type: "send_email", businessId: b.id, input: { emailId: email.id }, idempotencyKey: `send:${email.id}`, priority: 1, maxAttempts: 3 });
  await ctx.log("info", `Preview email for ${b.name} queued for sending to ${contact.value}.`);
  return { status: "completed" as const, output: { emailId: email.id, sent: "queued" } };
}

export const sales: AgentHandler = async (ctx) => {
  if (ctx.task.type === "send_email") return sendApproved(ctx);
  if (ctx.task.type === "send_inquiry_preview") return inquiryPreview(ctx);
  return draftIntro(ctx);
};
