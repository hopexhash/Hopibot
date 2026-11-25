import "../guard";
import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { UNIT_PRICING } from "../costs/pricing";
import { recordUsage, type UsageContext } from "../costs/usage";
import { AgentError } from "./anthropic";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

export async function sendEmail(
  ctx: UsageContext,
  msg: { from: string; to: string; replyTo?: string; subject: string; text: string; html?: string; unsubscribeUrl: string; unsubscribeMailto?: string; tags?: Record<string, string> },
): Promise<{ id: string }> {
  const cred = await getCredential(ctx.organizationId, "resend");
  if (!cred.secret) throw new IntegrationUnavailableError("resend");
  const resend = new Resend(cred.secret);
  const listUnsub = [`<${msg.unsubscribeUrl}>`, msg.unsubscribeMailto ? `<mailto:${msg.unsubscribeMailto}?subject=unsubscribe>` : null].filter(Boolean).join(", ");
  const { data, error } = await resend.emails.send({
    from: msg.from,
    to: [msg.to],
    replyTo: msg.replyTo,
    subject: msg.subject,
    text: msg.text,
    ...(msg.html ? { html: msg.html } : {}),
    headers: { "List-Unsubscribe": listUnsub, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    tags: Object.entries(msg.tags ?? {}).map(([name, value]) => ({ name, value: value.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 256) })),
  });
  if (error || !data) {
    const name = (error as { name?: string } | null)?.name ?? "error";
    throw new AgentError(`Resend: ${error?.message ?? "send failed"}`, `RESEND_${name}`, name === "rate_limit_exceeded" || name === "internal_server_error");
  }
  await recordUsage(ctx, { provider: "resend", operation: "send_email", costUsd: UNIT_PRICING.resend_email });
  void touchIntegrationSuccess(ctx.organizationId, "resend");
  return { id: data.id };
}

export async function testResend(apiKey: string) {
  const resend = new Resend(apiKey);
  const { data, error } = await resend.domains.list();
  if (error) throw new Error(error.message);
  const domains = (data as { data?: { name: string; status: string }[] } | null)?.data ?? [];
  return `Connected. ${domains.length} sending domain(s)${domains.length ? `: ${domains.map((d) => `${d.name} (${d.status})`).join(", ")}` : " — add and verify a domain in Resend before sending"}.`;
}

/** Verifies a Svix-signed webhook (Resend uses Svix). */
export function verifySvixSignature(secret: string, headers: { id: string | null; timestamp: string | null; signature: string | null }, body: string) {
  if (!headers.id || !headers.timestamp || !headers.signature) return false;
  const ts = Number(headers.timestamp);
  if (!Number.isFinite(ts) || Math.abs(Date.now() / 1000 - ts) > 5 * 60) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key).update(`${headers.id}.${headers.timestamp}.${body}`).digest();
  return headers.signature.split(" ").some((part) => {
    const [, sig] = part.split(",");
    if (!sig) return false;
    const given = Buffer.from(sig, "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
