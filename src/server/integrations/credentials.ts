import "../guard";
import { and, eq } from "drizzle-orm";
import { INTEGRATIONS, type IntegrationKey, type IntegrationMode } from "@/lib/integrations-meta";
import { decryptSecret } from "../crypto";
import { db, schema } from "../db";

export type ResolvedCredential = {
  secret: string | null;
  config: Record<string, string>;
  source: "database" | "environment" | "none";
};

const ENV_CONFIG: Partial<Record<IntegrationKey, Record<string, string | undefined>>> = {
  vercel: { teamId: process.env.VERCEL_TEAM_ID },
  github: { owner: process.env.AGENCYOS_GITHUB_OWNER },
  resend: { webhookSecret: process.env.RESEND_WEBHOOK_SECRET },
  stripe: { webhookSecret: process.env.STRIPE_WEBHOOK_SECRET },
  posthog: { host: process.env.POSTHOG_HOST },
};

/** Organisation credential (encrypted in DB) takes precedence over the environment. */
export async function getCredential(organizationId: string, provider: IntegrationKey): Promise<ResolvedCredential> {
  const [row] = await db()
    .select()
    .from(schema.integrationCredentials)
    .where(
      and(eq(schema.integrationCredentials.organizationId, organizationId), eq(schema.integrationCredentials.provider, provider)),
    )
    .limit(1);
  const envConfig = Object.fromEntries(
    Object.entries(ENV_CONFIG[provider] ?? {}).filter(([, v]) => typeof v === "string" && v.length > 0),
  ) as Record<string, string>;
  if (row?.encryptedSecret) {
    return { secret: decryptSecret(row.encryptedSecret), config: { ...envConfig, ...row.config }, source: "database" };
  }
  const meta = INTEGRATIONS.find((i) => i.key === provider);
  const envSecret = meta ? process.env[meta.envVar] : undefined;
  if (envSecret) return { secret: envSecret, config: { ...envConfig, ...(row?.config ?? {}) }, source: "environment" };
  return { secret: null, config: { ...envConfig, ...(row?.config ?? {}) }, source: "none" };
}

export function mockModeAllowed() {
  return process.env.ALLOW_MOCK_MODE === "true" && process.env.NODE_ENV !== "production";
}

export async function integrationMode(organizationId: string, provider: IntegrationKey): Promise<IntegrationMode> {
  const cred = await getCredential(organizationId, provider);
  if (cred.secret) return "live";
  return mockModeAllowed() ? "mock" : "unavailable";
}

export class IntegrationUnavailableError extends Error {
  code = "INTEGRATION_UNAVAILABLE";
  constructor(public provider: IntegrationKey) {
    super(
      `${INTEGRATIONS.find((i) => i.key === provider)?.name ?? provider} is not configured. Add credentials on the Integrations page.`,
    );
  }
}

export async function markIntegrationResult(organizationId: string, provider: IntegrationKey, ok: boolean, error?: string) {
  const now = new Date();
  await db()
    .insert(schema.integrationCredentials)
    .values({
      organizationId,
      provider,
      status: ok ? "connected" : "error",
      lastTestedAt: now,
      lastSuccessAt: ok ? now : null,
      lastError: ok ? null : (error ?? "Unknown error").slice(0, 500),
    })
    .onConflictDoUpdate({
      target: [schema.integrationCredentials.organizationId, schema.integrationCredentials.provider],
      set: ok
        ? { status: "connected", lastTestedAt: now, lastSuccessAt: now, lastError: null }
        : { status: "error", lastTestedAt: now, lastError: (error ?? "Unknown error").slice(0, 500) },
    });
}

/** Records a successful live call without changing a stored error state needlessly. */
export async function touchIntegrationSuccess(organizationId: string, provider: IntegrationKey) {
  try {
    await markIntegrationResult(organizationId, provider, true);
  } catch {
    // best effort
  }
}
