import { eq } from "drizzle-orm";
import { PageHeader } from "@/components/app/page";
import { INTEGRATIONS } from "@/lib/integrations-meta";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getCredential, mockModeAllowed } from "@/server/integrations/credentials";
import { IntegrationCard } from "./integration-card";

export const metadata = { title: "Integrations" };

export default async function IntegrationsPage() {
  const auth = await requireAuth();
  const rows = await db().select().from(schema.integrationCredentials).where(eq(schema.integrationCredentials.organizationId, auth.org.id));
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const cards = await Promise.all(
    INTEGRATIONS.map(async (meta) => {
      const row = rows.find((r) => r.provider === meta.key);
      const infra = !meta.secretLabel;
      const cred = infra ? null : await getCredential(auth.org.id, meta.key);
      const envSet = Boolean(process.env[meta.envVar]);
      const configured = infra ? envSet || meta.key === "redis" : Boolean(cred?.secret);
      return {
        key: meta.key,
        name: meta.name,
        description: meta.description,
        secretLabel: meta.secretLabel,
        configFields: meta.configFields.map((f) => ({ ...f })),
        envVar: meta.envVar,
        docs: meta.docs,
        usedBy: [...meta.usedBy],
        configured,
        source: infra ? (envSet ? "environment" : "default") : (cred?.source ?? "none"),
        mode: configured ? "live" : mockModeAllowed() ? "mock" : "unavailable",
        hint: row?.secretHint ?? (cred?.source === "environment" ? "set via environment" : null),
        config: Object.fromEntries(Object.entries(row?.config ?? {}).filter(([k]) => !/secret/i.test(k))),
        hasConfigSecret: Object.keys(row?.config ?? {}).some((k) => /secret/i.test(k)),
        status: row?.status ?? "untested",
        lastSuccessAt: row?.lastSuccessAt?.toISOString() ?? null,
        lastTestedAt: row?.lastTestedAt?.toISOString() ?? null,
        lastError: row?.lastError ?? null,
        webhookUrl: meta.key === "resend" ? `${appUrl}/api/webhooks/resend/${auth.org.id}` : meta.key === "stripe" ? `${appUrl}/api/webhooks/stripe/${auth.org.id}` : null,
      };
    }),
  );
  return (
    <>
      <PageHeader title="Integrations" description="Keys are encrypted at rest (AES-256-GCM) and never shown again after saving. Each card runs a real request when you test it." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((c) => (
          <IntegrationCard key={c.key} card={c} canAdmin={hasRole(auth.role, "admin")} />
        ))}
      </div>
    </>
  );
}
