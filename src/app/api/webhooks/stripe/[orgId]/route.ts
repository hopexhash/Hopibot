import { and, eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db, schema } from "@/server/db";
import { constructStripeEvent } from "@/server/integrations/stripe";

export const dynamic = "force-dynamic";

/** Stripe → payments / subscriptions (revenue & MRR). Signature-verified and idempotent. */
export async function POST(req: Request, ctx: { params: Promise<{ orgId: string }> }) {
  const { orgId } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/.test(orgId)) return new Response("Not found", { status: 404 });
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new Response("Missing signature", { status: 400 });
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await constructStripeEvent(orgId, body, sig);
  } catch (err) {
    return new Response(`Webhook error: ${(err as Error).message}`, { status: 400 });
  }

  const businessIdFrom = async (md?: Stripe.Metadata | null) => {
    const id = md?.businessId;
    if (!id || md?.organizationId !== orgId) return null;
    const [b] = await db().select({ id: schema.businesses.id }).from(schema.businesses).where(and(eq(schema.businesses.id, id), eq(schema.businesses.organizationId, orgId)));
    return b?.id ?? null;
  };

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object;
      if (s.mode === "payment" && s.payment_status === "paid" && s.amount_total) {
        const businessId = await businessIdFrom(s.metadata);
        await db()
          .insert(schema.payments)
          .values({ organizationId: orgId, businessId, stripeId: s.id, amountCents: s.amount_total, currency: s.currency ?? "eur", status: "paid", source: "stripe", description: "Stripe checkout", paidAt: new Date() })
          .onConflictDoNothing();
        if (businessId) await db().insert(schema.crmActivities).values({ organizationId: orgId, businessId, type: "system", content: `Payment received via Stripe: €${(s.amount_total / 100).toFixed(2)}` });
      }
      break;
    }
    case "invoice.paid": {
      const inv = event.data.object;
      const md = inv.parent?.subscription_details?.metadata ?? inv.metadata;
      const businessId = await businessIdFrom(md);
      await db()
        .insert(schema.payments)
        .values({ organizationId: orgId, businessId, stripeId: inv.id ?? null, amountCents: inv.amount_paid, currency: inv.currency, status: "paid", source: "stripe", description: "Subscription invoice", paidAt: new Date() })
        .onConflictDoNothing();
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const item = sub.items.data[0];
      const businessId = await businessIdFrom(sub.metadata);
      const values = {
        organizationId: orgId,
        businessId,
        stripeSubscriptionId: sub.id,
        stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        status: sub.status,
        plan: item?.price.nickname ?? item?.price.id ?? null,
        amountCents: item?.price.unit_amount ?? 0,
        currency: item?.price.currency ?? "eur",
        interval: item?.price.recurring?.interval ?? "month",
        startedAt: new Date(sub.start_date * 1000),
        canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      };
      await db().insert(schema.subscriptions).values(values).onConflictDoUpdate({ target: schema.subscriptions.stripeSubscriptionId, set: values });
      break;
    }
  }
  return new Response("OK", { status: 200 });
}
