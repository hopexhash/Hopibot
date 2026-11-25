import "../guard";
import { PostHog } from "posthog-node";
import { getCredential } from "./credentials";

const clients = new Map<string, PostHog>();

/** Best-effort product analytics. Never blocks or breaks the calling action. */
export async function capture(organizationId: string, distinctId: string, event: string, properties: Record<string, unknown> = {}) {
  try {
    const cred = await getCredential(organizationId, "posthog");
    if (!cred.secret) return;
    const host = cred.config.host || process.env.POSTHOG_HOST || "https://eu.i.posthog.com";
    let c = clients.get(cred.secret);
    if (!c) {
      c = new PostHog(cred.secret, { host, flushAt: 1, flushInterval: 0 });
      clients.set(cred.secret, c);
    }
    c.capture({ distinctId, event, properties: { ...properties, organizationId }, groups: { organization: organizationId } });
  } catch (err) {
    console.warn("[posthog] capture failed:", (err as Error).message);
  }
}

export async function testPosthog(apiKey: string, host?: string) {
  const base = host || "https://eu.i.posthog.com";
  const res = await fetch(`${base}/i/v0/e/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey, event: "agencyos_connection_test", distinct_id: "agencyos-integration-test", properties: {} }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`PostHog responded ${res.status}`);
  return `Test event accepted by ${base}. (PostHog accepts events for any key format; confirm it appears in your project.)`;
}
