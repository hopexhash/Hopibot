import "../guard";
import Stripe from "stripe";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

async function client(organizationId: string) {
  const cred = await getCredential(organizationId, "stripe");
  if (!cred.secret) throw new IntegrationUnavailableError("stripe");
  return { stripe: new Stripe(cred.secret, { maxNetworkRetries: 2, timeout: 20000 }), webhookSecret: cred.config.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET };
}

/** Creates a Stripe Payment Link for a won customer (one-off setup or monthly plan). */
export async function createPaymentLink(organizationId: string, opts: { businessId: string; businessName: string; amountCents: number; recurring: boolean; description: string }) {
  const { stripe } = await client(organizationId);
  const price = await stripe.prices.create({
    currency: "eur",
    unit_amount: opts.amountCents,
    product_data: { name: `${opts.description} — ${opts.businessName}`.slice(0, 250) },
    ...(opts.recurring ? { recurring: { interval: "month" } } : {}),
  });
  const metadata = { organizationId, businessId: opts.businessId };
  const link = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
    metadata,
    ...(opts.recurring ? { subscription_data: { metadata } } : { payment_intent_data: { metadata } }),
  });
  void touchIntegrationSuccess(organizationId, "stripe");
  return link.url;
}

/**
 * Stripe Checkout for an order placed on a demo page. One-time items and the monthly
 * care plan are charged together; amounts always come from the server-side catalogue.
 */
export async function createCheckoutSession(
  organizationId: string,
  opts: { orderId: string; businessId: string; customerEmail: string; lines: { name: string; kind: "one_time" | "monthly"; unitCents: number; quantity: number }[]; successUrl: string; cancelUrl: string },
) {
  const { stripe } = await client(organizationId);
  const metadata = { organizationId, businessId: opts.businessId, orderId: opts.orderId };
  const recurring = opts.lines.some((l) => l.kind === "monthly");
  const session = await stripe.checkout.sessions.create({
    mode: recurring ? "subscription" : "payment",
    customer_email: opts.customerEmail,
    line_items: opts.lines.map((l) => ({
      quantity: l.quantity,
      price_data: { currency: "eur", unit_amount: l.unitCents, product_data: { name: l.name.slice(0, 250) }, ...(l.kind === "monthly" ? { recurring: { interval: "month" as const } } : {}) },
    })),
    metadata,
    ...(recurring ? { subscription_data: { metadata } } : { payment_intent_data: { metadata } }),
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
  });
  void touchIntegrationSuccess(organizationId, "stripe");
  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return { id: session.id, url: session.url };
}

export async function constructStripeEvent(organizationId: string, body: string, signature: string) {
  const { stripe, webhookSecret } = await client(organizationId);
  if (!webhookSecret) throw new Error("Stripe webhook secret is not configured");
  return stripe.webhooks.constructEvent(body, signature, webhookSecret);
}

export async function testStripe(secretKey: string) {
  const stripe = new Stripe(secretKey, { timeout: 15000 });
  const acct = await stripe.accounts.retrieveCurrent();
  return `Connected to ${acct.settings?.dashboard?.display_name ?? acct.id} (${secretKey.startsWith("sk_live") ? "live" : "test"} mode).`;
}
