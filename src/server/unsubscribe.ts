import "./guard";
import { and, eq, isNull } from "drizzle-orm";
import { db, schema } from "./db";

/** Processes an opt-out: suppress the address, record the event, stop pending outreach. Idempotent. */
export async function processUnsubscribe(token: string): Promise<{ ok: boolean; email?: string | null }> {
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return { ok: false };
  const [email] = await db().select().from(schema.salesEmails).where(eq(schema.salesEmails.unsubscribeToken, token));
  if (!email) return { ok: false };
  const address = email.toEmail?.toLowerCase() ?? null;
  if (address) {
    await db().insert(schema.suppressionList).values({ organizationId: email.organizationId, email: address, reason: "opt_out", source: "unsubscribe_link" }).onConflictDoNothing();
  }
  await db().insert(schema.emailEvents).values({ organizationId: email.organizationId, emailId: email.id, type: "unsubscribed", payload: { via: "link" } });
  // Every not-yet-sent email to this business is cancelled.
  await db()
    .update(schema.salesEmails)
    .set({ status: "cancelled", blockedReason: "Recipient unsubscribed", updatedAt: new Date() })
    .where(and(eq(schema.salesEmails.businessId, email.businessId), isNull(schema.salesEmails.sentAt)));
  await db()
    .insert(schema.crmActivities)
    .values({ organizationId: email.organizationId, businessId: email.businessId, type: "system", content: `${address ?? "Recipient"} unsubscribed — added to the suppression list.` });
  return { ok: true, email: address };
}
