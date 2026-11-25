"use server";

import { and, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { FEEDBACK_OPTIONS, type Qualification } from "@/lib/qualification";
import { db, schema } from "../db";
import { advanceStage, createTask } from "../orchestrator/tasks";
import { domainOf } from "../scoring/lead-score";
import { action, UserError } from "./_util";

const feedbackSchema = z.object({ classification: z.enum(["excellent", "modern", "average", "needs_redesign"]), note: z.string().trim().max(300).default("") });

/**
 * Your own judgement of a website. It overrides the engine's decision for this business,
 * and is shown to the AI as a calibration example in every future assessment.
 */
export async function setWebsiteFeedbackAction(businessId: string, input: z.input<typeof feedbackSchema>) {
  return action({ name: "business.website_feedback", revalidate: ["/businesses", `/businesses/${businessId}`, "/pipeline"], auditTarget: () => ({ type: "business", id: businessId, metadata: { classification: input.classification } }) }, async (auth) => {
    const p = feedbackSchema.parse(input);
    const [b] = await db().select().from(schema.businesses).where(and(eq(schema.businesses.id, z.string().uuid().parse(businessId)), eq(schema.businesses.organizationId, auth.org.id)));
    if (!b) throw new UserError("Business not found.");
    const domain = domainOf(b.websiteUrl);
    if (!domain) throw new UserError("This business has no website to judge.");
    const [last] = await db().select({ qualification: schema.websiteInspections.qualification, redesignScore: schema.websiteInspections.redesignScore, summary: schema.websiteInspections.summary }).from(schema.websiteInspections).where(eq(schema.websiteInspections.businessId, b.id)).orderBy(desc(schema.websiteInspections.createdAt)).limit(1);
    const values = { organizationId: auth.org.id, businessId: b.id, domain, businessName: b.name, classification: p.classification, aiQualification: last?.qualification ?? null, aiScore: last?.redesignScore ?? null, aiSummary: last?.summary ?? null, note: p.note || null, createdBy: auth.user.id, createdAt: new Date() };
    await db().insert(schema.websiteFeedback).values(values).onConflictDoUpdate({ target: [schema.websiteFeedback.organizationId, schema.websiteFeedback.domain], set: values });

    const option = FEEDBACK_OPTIONS.find((o) => o.key === p.classification)!;
    const qualification: Qualification = option.qualification;
    await db().update(schema.businesses).set({ qualification, updatedAt: new Date() }).where(eq(schema.businesses.id, b.id));
    const isLead = p.classification === "needs_redesign";
    await db().update(schema.leads).set({ qualified: isLead, status: isLead ? "qualified" : "rejected" }).where(eq(schema.leads.businessId, b.id));
    if (isLead) await advanceStage(b.id, "QUALIFIED", auth.org.id);
    else {
      // Work that has not started yet for a website you consider good is cancelled.
      await db().update(schema.agentTasks).set({ status: "CANCELLED", completedAt: new Date() }).where(and(eq(schema.agentTasks.businessId, b.id), eq(schema.agentTasks.organizationId, auth.org.id), eq(schema.agentTasks.status, "PENDING")));
    }
    await db().insert(schema.crmActivities).values({ organizationId: auth.org.id, businessId: b.id, userId: auth.user.id, type: "system", content: `Website judged by you: "${option.label}"${p.note ? ` — ${p.note}` : ""}` });
    return { qualification };
  });
}

/** Queues a real-browser inspection for businesses already in the CRM. Runs on the worker. */
export async function inspectWebsitesAction(businessIds: string[]) {
  return action({ name: "business.inspect_website", revalidate: ["/businesses"], limit: 20 }, async (auth) => {
    const ids = z.array(z.string().uuid()).min(1).max(100).parse(businessIds);
    const rows = await db().select({ id: schema.businesses.id, websiteStatus: schema.businesses.websiteStatus }).from(schema.businesses).where(and(eq(schema.businesses.organizationId, auth.org.id), inArray(schema.businesses.id, ids)));
    const eligible = rows.filter((r) => r.websiteStatus === "has_website" || r.websiteStatus === "unreachable");
    if (!eligible.length) throw new UserError("None of these businesses has a reachable website to inspect.");
    const stamp = Date.now().toString(36);
    for (const r of eligible) {
      await createTask(auth.org.id, null, { agentKey: "lead_finder", type: "inspect_website", businessId: r.id, input: { force: ids.length === 1 }, idempotencyKey: `inspect:${r.id}:${stamp}`, priority: 4, maxAttempts: 2 });
    }
    return { count: eligible.length };
  });
}
