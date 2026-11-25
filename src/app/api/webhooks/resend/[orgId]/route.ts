import { eq } from "drizzle-orm";
import { db, schema } from "@/server/db";
import { getCredential } from "@/server/integrations/credentials";
import { verifySvixSignature } from "@/server/integrations/resend";

export const dynamic = "force-dynamic";

const TYPE_MAP: Record<string, string> = {
  "email.sent": "provider_sent",
  "email.delivered": "delivered",
  "email.delivery_delayed": "delivery_delayed",
  "email.bounced": "bounced",
  "email.complained": "complained",
  "email.opened": "opened",
  "email.clicked": "clicked",
};

/** Resend delivery events → email_events. Bounces and complaints are suppressed automatically. */
export async function POST(req: Request, ctx: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/.test(orgId)) return new Response("Not found", { status: 404 });
  const body = await req.text();
  const cred = await getCredential(orgId, "resend");
  const secret = cred.config.webhookSecret || process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook secret not configured", { status: 503 });
  const ok = verifySvixSignature(secret, { id: req.headers.get("svix-id"), timestamp: req.headers.get("svix-timestamp"), signature: req.headers.get("svix-signature") }, body);
  if (!ok) return new Response("Invalid signature", { status: 401 });

  const event = JSON.parse(body) as { type: string; created_at?: string; data?: { email_id?: string; to?: string[] } };
  const type = TYPE_MAP[event.type];
  if (!type || !event.data?.email_id) return new Response("Ignored", { status: 200 });
  const [email] = await db().select().from(schema.salesEmails).where(eq(schema.salesEmails.providerMessageId, event.data.email_id));
  if (!email || email.organizationId !== orgId) return new Response("Unknown email", { status: 200 });

  const inserted = await db()
    .insert(schema.emailEvents)
    .values({ organizationId: orgId, emailId: email.id, type, providerEventId: req.headers.get("svix-id"), payload: event as unknown as Record<string, unknown>, occurredAt: event.created_at ? new Date(event.created_at) : new Date() })
    .onConflictDoNothing()
    .returning({ id: schema.emailEvents.id });
  if (!inserted.length) return new Response("Duplicate", { status: 200 });

  if ((type === "bounced" || type === "complained") && email.toEmail) {
    await db()
      .insert(schema.suppressionList)
      .values({ organizationId: orgId, email: email.toEmail.toLowerCase(), reason: type === "bounced" ? "bounce" : "complaint", source: "resend_webhook" })
      .onConflictDoNothing();
    await db()
      .insert(schema.crmActivities)
      .values({ organizationId: orgId, businessId: email.businessId, type: "system", content: `Email ${type} — ${email.toEmail} added to the suppression list.` });
  }
  return new Response("OK", { status: 200 });
}
