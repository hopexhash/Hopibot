import { eq } from "drizzle-orm";
import { PageHeader, Section } from "@/components/app/page";
import { Badge } from "@/components/ui";
import { INTEGRATIONS } from "@/lib/integrations-meta";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getCredential, mockModeAllowed } from "@/server/integrations/credentials";
import { redisHealthy } from "@/server/redis";
import { IntegrationCard } from "./integration-card";

const PLANNED = [
  { name: "OpenAI", note: "All AI work runs on Anthropic Claude. Other AI providers cannot be connected." },
  { name: "Gmail", note: "Email is sent through Resend. Sending from a Gmail mailbox and reading replies automatically are not supported; log replies on the lead's page." },
  { name: "Cloudflare", note: "Previews are hosted by HOPI Bot or deployed to Vercel. Cloudflare Pages and DNS automation are not supported." },
];

export const metadata = { title: "Integrations" };

export default async function IntegrationsPage() {
  const auth = await requireAuth();
  const rows = await db().select().from(schema.integrationCredentials).where(eq(schema.integrationCredentials.organizationId, auth.org.id));
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  // Infrastructure is verified live: this page only renders if the database answered, and Redis is pinged now.
  const redisOk = (await redisHealthy()).ok;
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
        state: (infra
          ? meta.key === "supabase" || redisOk
            ? "connected"
            : "failed"
          : configured
            ? row?.status === "connected"
              ? "connected"
              : row?.status === "error"
                ? "failed"
                : "untested"
            : mockModeAllowed()
              ? "mock"
              : "none") as "connected" | "failed" | "untested" | "mock" | "none",
        webhookUrl: meta.key === "resend" ? `${appUrl}/api/webhooks/resend/${auth.org.id}` : meta.key === "stripe" ? `${appUrl}/api/webhooks/stripe/${auth.org.id}` : null,
      };
    }),
  );
  const canAdmin = hasRole(auth.role, "admin");
  const groups = [
    { title: "Needs attention", description: "A key is saved but the connection is not verified.", items: cards.filter((c) => c.state === "failed" || c.state === "untested") },
    { title: "Connected", description: "Verified with a real request.", items: cards.filter((c) => c.state === "connected") },
    { title: "Not connected", description: "Add a key to switch these on.", items: cards.filter((c) => c.state === "none" || c.state === "mock") },
  ].filter((g) => g.items.length);
  const connected = cards.filter((c) => c.state === "connected").length;

  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Integrations"
        description={`The outside services your agents use. ${connected} of ${cards.length} are connected. A service only shows “Connected” after a real test request succeeded. Keys are encrypted and never shown again.`}
      />
      {groups.map((g) => (
        <Section key={g.title} title={g.title} description={g.description}>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {g.items.map((c) => (
              <IntegrationCard key={c.key} card={c} canAdmin={canAdmin} />
            ))}
          </div>
        </Section>
      ))}
      <Section title="Not available yet" description="Services HOPI Bot cannot use today. They are listed so you know they are not hidden somewhere.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PLANNED.map((p) => (
            <div key={p.name} className="rounded-[14px] border border-dashed border-border p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[15px] font-semibold text-muted">{p.name}</p>
                <Badge tone="outline">Not supported</Badge>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-subtle">{p.note}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
