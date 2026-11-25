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
