"use server";

import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { PIPELINE_STAGES } from "@/lib/constants";
import { db, schema } from "../db";
import { capture } from "../integrations/posthog";
import { saveLead } from "../leads/save";
import { action, UserError } from "./_util";
import { marketCountry } from "@/lib/markets";

const ids = z.array(z.string().uuid()).min(1).max(1000);

async function owned(orgId: string, businessId: string) {
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, orgId)));
  if (!b) throw new UserError("Business not found.");
  return b;
}

export async function deleteBusinessesAction(businessIds: string[]) {
  return action({ name: "businesses.delete", role: "admin", revalidate: ["/businesses"], auditTarget: () => ({ type: "business", metadata: { count: businessIds.length } }) }, async (auth) => {
    const list = ids.parse(businessIds);
    await db().delete(schema.businesses).where(and(eq(schema.businesses.organizationId, auth.org.id), inArray(schema.businesses.id, list)));
    return { deleted: list.length };
  });
}

/** Adds every email/domain of the businesses to the suppression list. */
export async function suppressBusinessesAction(businessIds: string[], reason: "opt_out" | "manual" = "manual") {
  return action({ name: "businesses.suppress", revalidate: ["/businesses", "/emails"] }, async (auth) => {
    const list = ids.parse(businessIds);
    const contacts = await db()
      .select({ value: schema.businessContacts.value })
      .from(schema.businessContacts)
      .where(and(eq(schema.businessContacts.organizationId, auth.org.id), inArray(schema.businessContacts.businessId, list), eq(schema.businessContacts.type, "email")));
    const biz = await db()
      .select({ websiteUrl: schema.businesses.websiteUrl })
      .from(schema.businesses)
      .where(and(eq(schema.businesses.organizationId, auth.org.id), inArray(schema.businesses.id, list)));
    const values = [
      ...contacts.map((c) => ({ organizationId: auth.org.id, email: c.value.toLowerCase(), reason, source: "dashboard" })),
      ...biz
        .map((b) => {
          try {
            return b.websiteUrl ? new URL(b.websiteUrl).hostname.replace(/^www\./, "") : null;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
        .map((domain) => ({ organizationId: auth.org.id, domain, reason, source: "dashboard" })),
    ];
    if (values.length) await db().insert(schema.suppressionList).values(values).onConflictDoNothing();
    // Pending outreach to these businesses is cancelled.
    await db()
      .update(schema.salesEmails)
      .set({ status: "cancelled", blockedReason: "Business suppressed", updatedAt: new Date() })
      .where(and(eq(schema.salesEmails.organizationId, auth.org.id), inArray(schema.salesEmails.businessId, list), inArray(schema.salesEmails.status, ["draft", "awaiting_approval", "approved"])));
    return { suppressed: values.length };
  });
}

const updateSchema = z.object({
  pipelineStage: z.enum(PIPELINE_STAGES.map((s) => s.key) as [string, ...string[]]).optional(),
  salesValueEur: z.number().min(0).max(10_000_000).nullable().optional(),
  followUpAt: z.string().datetime().nullable().optional(),
  lostReason: z.string().max(300).nullable().optional(),
  websiteStatus: z.enum(["none_found", "verified_none", "has_website", "unreachable", "unknown"]).optional(),
});

export async function updateBusinessAction(businessId: string, patch: z.input<typeof updateSchema>) {
  return action({ name: "business.update", revalidate: ["/pipeline", "/businesses"], auditTarget: () => ({ type: "business", id: businessId, metadata: patch }) }, async (auth) => {
    const p = updateSchema.parse(patch);
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    const set: Partial<typeof schema.businesses.$inferInsert> = { updatedAt: new Date() };
    if (p.pipelineStage) set.pipelineStage = p.pipelineStage;
    if (p.salesValueEur !== undefined) set.salesValueCents = p.salesValueEur == null ? null : Math.round(p.salesValueEur * 100);
    if (p.followUpAt !== undefined) set.followUpAt = p.followUpAt ? new Date(p.followUpAt) : null;
    if (p.lostReason !== undefined) set.lostReason = p.lostReason;
    if (p.websiteStatus) set.websiteStatus = p.websiteStatus;
    await db().update(schema.businesses).set(set).where(eq(schema.businesses.id, b.id));
    if (p.pipelineStage && p.pipelineStage !== b.pipelineStage) {
      await db().insert(schema.crmActivities).values({
        organizationId: auth.org.id,
        businessId: b.id,
        userId: auth.user.id,
        type: "stage_change",
        content: `Stage changed from ${b.pipelineStage} to ${p.pipelineStage}`,
        metadata: { from: b.pipelineStage, to: p.pipelineStage },
      });
      if (p.pipelineStage === "PURCHASED" && b.pipelineStage !== "PURCHASED") await capture(auth.org.id, auth.user.id, "deal_won", { businessId: b.id });
    }
    if (p.websiteStatus && p.websiteStatus !== b.websiteStatus) {
      await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type: "note", content: `Website status manually set to ${p.websiteStatus}` });
    }
    return null;
  });
}

export async function addNoteAction(businessId: string, content: string, type: "note" | "call" | "meeting" | "email" = "note") {
  return action({ name: "business.note", revalidate: ["/businesses"] }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    const text = z.string().trim().min(1, "Write a note first.").max(5000).parse(content);
    await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type, content: text });
    return null;
  });
}

export async function addContactAction(businessId: string, email: string, sourceUrl: string) {
  return action({ name: "business.add_contact", revalidate: ["/businesses"] }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    const value = z.string().trim().toLowerCase().email("Enter a valid email address").parse(email);
    const src = z.string().trim().url("Add the public page where this address is published").parse(sourceUrl);
    await db()
      .insert(schema.businessContacts)
      .values({ organizationId: auth.org.id, businessId: b.id, type: "email", value, source: "manual", sourceUrl: src, verificationStatus: "unverified", isGeneric: /^(info|contact|hallo|hello|mail|office)@/.test(value), lawfulBasis: "manually_recorded_public_source" })
      .onConflictDoNothing();
    if (b.qualification === "website_down") {
      const [project] = await db().select({ id: schema.websiteProjects.id }).from(schema.websiteProjects).where(eq(schema.websiteProjects.businessId, b.id)).limit(1);
      if (!project) {
        await db().update(schema.leads).set({ qualified: true, status: "qualified" }).where(eq(schema.leads.businessId, b.id));
        const { createTask } = await import("../orchestrator/tasks");
        await createTask(auth.org.id, null, { agentKey: "research", type: "research_business", businessId: b.id, input: { next: ["generate_website", "qc", "deploy", "sales_email"] }, idempotencyKey: `down-demo:${b.id}`, priority: 3 });
      }
    }
    return null;
  });
}

export async function markRepliedAction(businessId: string, note: string) {
  return action({ name: "business.mark_replied", revalidate: ["/pipeline", "/businesses", "/emails"] }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    await db().update(schema.businesses).set({ pipelineStage: "INTERESTED", updatedAt: new Date() }).where(eq(schema.businesses.id, b.id));
    await db().insert(schema.crmActivities).values([
      { organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type: "stage_change", content: `Stage changed from ${b.pipelineStage} to INTERESTED`, metadata: { from: b.pipelineStage, to: "INTERESTED" } },
      { organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type: "email", content: `Reply received${note ? `: ${note.slice(0, 2000)}` : ""}` },
    ]);
    const [last] = await db().select({ id: schema.salesEmails.id }).from(schema.salesEmails).where(and(eq(schema.salesEmails.businessId, b.id), eq(schema.salesEmails.status, "sent"))).limit(1);
    if (last) await db().insert(schema.emailEvents).values({ organizationId: auth.org.id, emailId: last.id, type: "replied", payload: { recordedBy: auth.user.id } });
    // Pending follow-ups are no longer appropriate once the business replied.
    await db()
      .update(schema.salesEmails)
      .set({ status: "cancelled", blockedReason: "Business replied", updatedAt: new Date() })
      .where(and(eq(schema.salesEmails.businessId, b.id), eq(schema.salesEmails.kind, "follow_up"), inArray(schema.salesEmails.status, ["draft", "awaiting_approval"])));
    return null;
  });
}

/**
 * GDPR erasure: removes personal data (contacts, research, emails, notes) and keeps a
 * tombstone plus a suppression entry so the business is never contacted again.
 */
export async function eraseBusinessAction(businessId: string) {
  return action({ name: "business.gdpr_erase", role: "admin", revalidate: ["/businesses"], auditTarget: () => ({ type: "business", id: businessId }) }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    const contacts = await db().select({ value: schema.businessContacts.value }).from(schema.businessContacts).where(and(eq(schema.businessContacts.businessId, b.id), eq(schema.businessContacts.type, "email")));
    await db().transaction(async (tx) => {
      if (contacts.length) {
        await tx.insert(schema.suppressionList).values(contacts.map((c) => ({ organizationId: auth.org.id, email: c.value.toLowerCase(), reason: "gdpr_erasure", source: "erasure_request" }))).onConflictDoNothing();
      }
      await tx.delete(schema.businessContacts).where(eq(schema.businessContacts.businessId, b.id));
      await tx.delete(schema.businessResearch).where(eq(schema.businessResearch.businessId, b.id));
      await tx.delete(schema.salesEmails).where(eq(schema.salesEmails.businessId, b.id));
      await tx.delete(schema.crmActivities).where(eq(schema.crmActivities.businessId, b.id));
      await tx.update(schema.websiteProjects).set({ deletedAt: new Date(), status: "failed" }).where(eq(schema.websiteProjects.businessId, b.id));
      await tx
        .update(schema.businesses)
        .set({ erasedAt: new Date(), phone: null, address: null, openingHours: null, websiteAudit: null, sourceData: null, lat: null, lng: null, pipelineStage: "LOST", lostReason: "GDPR erasure request" })
        .where(eq(schema.businesses.id, b.id));
    });
    return null;
  });
}

const paymentSchema = z.object({
  amountEur: z.number().positive().max(1_000_000),
  description: z.string().trim().max(200).optional(),
  recurring: z.boolean().default(false),
});

/** Manual payment / subscription record (for payments received outside Stripe). */
export async function recordPaymentAction(businessId: string, input: z.input<typeof paymentSchema>) {
  return action({ name: "business.record_payment", role: "admin", revalidate: ["/businesses", "/command"] }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    if (b.isMock) throw new UserError("Payments cannot be recorded for mock businesses.");
    const p = paymentSchema.parse(input);
    const cents = Math.round(p.amountEur * 100);
    if (p.recurring) {
      await db().insert(schema.subscriptions).values({ organizationId: auth.org.id, businessId: b.id, status: "active", plan: p.description ?? "Website care plan", amountCents: cents, interval: "month", startedAt: new Date() });
    } else {
      await db().insert(schema.payments).values({ organizationId: auth.org.id, businessId: b.id, amountCents: cents, status: "paid", source: "manual", description: p.description ?? "Website project", paidAt: new Date() });
    }
    await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type: "note", content: `${p.recurring ? "Subscription" : "Payment"} recorded: €${p.amountEur.toFixed(2)}${p.description ? ` — ${p.description}` : ""}` });
    return null;
  });
}

/** Creates a Stripe Payment Link for a customer; payment is recorded by the Stripe webhook. */
export async function createPaymentLinkAction(businessId: string, input: z.input<typeof paymentSchema>) {
  return action({ name: "business.payment_link", role: "admin", auditTarget: () => ({ type: "business", id: businessId }) }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    if (b.isMock) throw new UserError("Payment links cannot be created for mock businesses.");
    if (!["INTERESTED", "DEMO_VIEWED", "CHECKOUT_STARTED", "PURCHASED", "UPSELL_OPPORTUNITY", "CUSTOMER"].includes(b.pipelineStage)) throw new UserError("Create payment links only for businesses that showed interest or are customers.");
    const p = paymentSchema.parse(input);
    const { createPaymentLink } = await import("../integrations/stripe");
    const url = await createPaymentLink(auth.org.id, { businessId: b.id, businessName: b.name, amountCents: Math.round(p.amountEur * 100), recurring: p.recurring, description: p.description ?? "Website" });
    await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type: "note", content: `Stripe payment link created (€${p.amountEur.toFixed(2)}${p.recurring ? "/month" : ""}): ${url}` });
    return { url };
  });
}


const newLeadSchema = z.object({
  name: z.string().trim().min(2, "Enter the business name").max(160),
  category: z.enum(BUSINESS_CATEGORIES.map((c) => c.key) as [string, ...string[]]),
  city: z.string().trim().min(1, "Enter the city").max(80),
  country: marketCountry,
  address: z.string().trim().max(240).optional(),
  phone: z.string().trim().max(40).optional(),
  websiteUrl: z.union([z.literal(""), z.string().trim().url("Enter the full website address, starting with https://").max(300)]).optional(),
});

/** Adds one lead by hand. Same duplicate check, website audit and scoring as the Lead Discovery agent. */
export async function addLeadAction(input: unknown) {
  return action({ name: "business.create", revalidate: ["/pipeline", "/businesses"], limit: 30, auditTarget: (r: { id: string }) => ({ type: "business", id: r.id }) }, async (auth) => {
    const p = newLeadSchema.parse(input);
    const r = await saveLead(
      auth.org.id,
      { name: p.name, category: p.category, city: p.city, country: p.country, address: p.address || null, phone: p.phone || null, websiteUrl: p.websiteUrl || null, source: "manual" },
      { weights: auth.org.settings.scoringWeights, minScore: auth.org.settings.minLeadScore },
    );
    if (r.status === "duplicate") throw new UserError("This business is already in your CRM.");
    return { id: r.id, leadScore: r.leadScore };
  });
}

export async function addCrmTaskAction(businessId: string, title: string, dueAt: string | null) {
  return action({ name: "business.task_add", revalidate: ["/businesses"] }, async (auth) => {
    const b = await owned(auth.org.id, z.string().uuid().parse(businessId));
    await db()
      .insert(schema.crmTasks)
      .values({ organizationId: auth.org.id, businessId: b.id, title: z.string().trim().min(2, "Describe the task").max(200).parse(title), dueAt: dueAt ? new Date(z.string().datetime().parse(dueAt)) : null, createdBy: auth.user.id });
    return null;
  });
}

export async function toggleCrmTaskAction(taskId: string, done: boolean) {
  return action({ name: "business.task_toggle", revalidate: ["/businesses"] }, async (auth) => {
    await db()
      .update(schema.crmTasks)
      .set({ doneAt: done ? new Date() : null })
      .where(and(eq(schema.crmTasks.id, z.string().uuid().parse(taskId)), eq(schema.crmTasks.organizationId, auth.org.id)));
    return null;
  });
}

const permissionSchema = z.object({
  permission: z.enum(["unknown", "consent", "existing_customer", "legitimate_interest", "not_allowed", "opted_out"]),
  source: z.string().trim().max(300),
  proof: z.string().trim().max(1000),
});

/**
 * Records the lawful basis for contacting a business (who decided, when, and the proof).
 * A sendable basis requires a written source; drafts blocked only for missing permission
 * are released for approval, and opt-outs stop all drafts.
 */
export async function setContactPermissionAction(businessId: string, input: z.input<typeof permissionSchema>) {
  return action({ name: "business.contact_permission", role: "admin", revalidate: [`/businesses/${businessId}`, "/emails", "/approvals"], auditTarget: () => ({ type: "business", id: businessId, metadata: { permission: input.permission } }) }, async (auth) => {
    const p = permissionSchema.parse(input);
    const [b] = await db().select().from(schema.businesses).where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, auth.org.id)));
    if (!b) throw new UserError("Business not found.");
    const sendable = ["consent", "existing_customer", "legitimate_interest"].includes(p.permission);
    if (sendable && p.source.length < 5) throw new UserError("Write down where this permission comes from (for example: “info@ address published on their own contact page”).");
    if (p.permission === "consent" && p.proof.length < 5) throw new UserError("Consent needs proof: note who agreed, when and how (or paste a link to the evidence).");
    const stage = sendable && b.pipelineStage === "CONTACT_PERMISSION_REQUIRED" ? "CONTACT_READY" : b.pipelineStage;
    await db()
      .update(schema.businesses)
      .set({ contactPermission: p.permission, permissionSource: p.source || null, permissionProof: p.proof || null, permissionAt: new Date(), pipelineStage: stage, updatedAt: new Date() })
      .where(eq(schema.businesses.id, b.id));
    const drafts = await db().select().from(schema.salesEmails).where(and(eq(schema.salesEmails.businessId, b.id), inArray(schema.salesEmails.status, ["awaiting_approval", "draft", "blocked"])));
    for (const e of drafts) {
      if (sendable && e.blockedReason?.startsWith("Permission needed")) {
        await db().update(schema.salesEmails).set({ blockedReason: null, status: e.status === "blocked" ? "awaiting_approval" : e.status, updatedAt: new Date() }).where(eq(schema.salesEmails.id, e.id));
      } else if (!sendable && p.permission !== "unknown") {
        await db().update(schema.salesEmails).set({ status: "blocked", blockedReason: `Permission needed — this business is marked "${p.permission.replace("_", " ")}".`, updatedAt: new Date() }).where(eq(schema.salesEmails.id, e.id));
      }
    }
    await db().insert(schema.crmActivities).values({
      organizationId: auth.org.id,
      businessId: b.id,
      userId: auth.user.id,
      type: "system",
      content: `Contact permission set to "${p.permission.replace(/_/g, " ")}"${p.source ? ` — source: ${p.source}` : ""}`,
      metadata: { permission: p.permission, source: p.source, proof: p.proof },
    });
    return null;
  });
}
