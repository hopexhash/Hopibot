import "../guard";
import { UNIT_PRICING } from "../costs/pricing";
import { recordUsage, type UsageContext } from "../costs/usage";
import { AgentError } from "./anthropic";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

const BASE = "https://api.hunter.io/v2";

export type HunterEmail = {
  value: string;
  type: "generic" | "personal";
  confidence: number;
  sources: { uri: string; extracted_on?: string }[];
  verification?: { date: string | null; status: string | null };
};

async function get<T>(path: string, params: Record<string, string>, apiKey: string): Promise<T> {
  const qs = new URLSearchParams({ ...params, api_key: apiKey });
  const res = await fetch(`${BASE}${path}?${qs}`, { signal: AbortSignal.timeout(20000) });
  const json = (await res.json().catch(() => ({}))) as { data?: T; errors?: { details: string }[] };
  if (!res.ok) {
    const msg = json.errors?.[0]?.details ?? `HTTP ${res.status}`;
    throw new AgentError(`Hunter.io error: ${msg}`, res.status === 429 ? "RATE_LIMIT" : "HUNTER_ERROR", res.status === 429 || res.status >= 500);
  }
  return json.data as T;
}

export async function hunterDomainSearch(ctx: UsageContext, domain: string): Promise<HunterEmail[]> {
  const cred = await getCredential(ctx.organizationId, "hunter");
  if (!cred.secret) throw new IntegrationUnavailableError("hunter");
  const data = await get<{ emails: HunterEmail[] }>("/domain-search", { domain, limit: "10" }, cred.secret);
  await recordUsage(ctx, { provider: "hunter", operation: "domain_search", costUsd: UNIT_PRICING.hunter_domain_search });
  void touchIntegrationSuccess(ctx.organizationId, "hunter");
  return data.emails ?? [];
}

export type HunterVerification = { status: string; result: string | null; score: number | null };

export async function hunterVerify(ctx: UsageContext, email: string): Promise<HunterVerification> {
  const cred = await getCredential(ctx.organizationId, "hunter");
  if (!cred.secret) throw new IntegrationUnavailableError("hunter");
  const data = await get<{ status: string; result: string | null; score: number | null }>("/email-verifier", { email }, cred.secret);
  await recordUsage(ctx, { provider: "hunter", operation: "email_verifier", costUsd: UNIT_PRICING.hunter_email_verifier });
  return { status: data.status, result: data.result, score: data.score };
}

export async function testHunter(apiKey: string) {
  const data = await get<{ email: string; requests?: { searches?: { used: number; available: number } } }>("/account", {}, apiKey);
  const s = data.requests?.searches;
  return `Connected as ${data.email}${s ? ` · ${s.used}/${s.available} searches used` : ""}.`;
}

/** Maps Hunter's verifier status onto our verification vocabulary. */
export function mapVerification(status: string): "valid" | "invalid" | "accept_all" | "unknown" {
  if (status === "valid") return "valid";
  if (status === "invalid" || status === "disposable") return "invalid";
  if (status === "accept_all") return "accept_all";
  return "unknown";
}
