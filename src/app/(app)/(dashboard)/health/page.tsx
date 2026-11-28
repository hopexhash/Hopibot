import { and, count, desc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { SystemHealth } from "@/components/app/system-health";
import { Card } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_KEYS, AGENT_META } from "@/lib/constants";
import { cn, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { systemHealth } from "@/server/health";

export const metadata = { title: "System Health" };

/** Uptime of the longest-running worker, from its real heartbeat ("3h 12m"). */
function workers0(list: { startedAt: string }[]) {
  if (!list.length) return null;
  const ms = Date.now() - Math.min(...list.map((w) => new Date(w.startedAt).getTime()));
  const m = Math.floor(ms / 60000);
  return m < 60 ? `${m}m` : m < 1440 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${Math.floor(m / 1440)}d ${Math.floor((m % 1440) / 60)}h`;
}

export default async function HealthPage() {
  const auth = await requireAuth();
  const t = schema.agentTasks;
  const orgId = auth.org.id;
  const [health, counts, [rates], incidents, failed] = await Promise.all([
    systemHealth(orgId),
    db().select({ status: t.status, n: count() }).from(t).where(eq(t.organizationId, orgId)).groupBy(t.status),
    db().execute(sql`
      SELECT count(*) FILTER (WHERE status = 'COMPLETED') AS done, count(*) FILTER (WHERE status = 'FAILED') AS failed
      FROM agent_tasks WHERE organization_id = ${orgId} AND completed_at > now() - interval '24 hours'`) as unknown as Promise<Record<string, string>[]>,
    // Incidents = server errors recorded by the app and error-level agent log lines (last 7 days).
    db().execute(sql`
      (SELECT 'server' AS kind, created_at, coalesce(metadata->>'path', '') AS source, split_part(coalesce(metadata->>'message', 'Server error'), E'\n', 1) AS message
         FROM audit_logs WHERE action = 'system.error' AND created_at > now() - interval '7 days' AND (organization_id = ${orgId} OR organization_id IS NULL))
      UNION ALL
      (SELECT 'agent', created_at, agent_key, message FROM agent_logs WHERE organization_id = ${orgId} AND level = 'error' AND created_at > now() - interval '7 days')
      ORDER BY created_at DESC LIMIT 15`) as unknown as Promise<Record<string, unknown>[]>,
    db()
      .select({ id: t.id, agentKey: t.agentKey, type: t.type, error: t.error, completedAt: t.completedAt })
      .from(t)
      .where(and(eq(t.organizationId, orgId), eq(t.status, "FAILED")))
      .orderBy(desc(t.completedAt))
      .limit(8),
  ]);
  const core = health.checks.filter((c) => ["api", "database", "redis"].includes(c.key));
  const coreDown = core.filter((c) => c.state === "error" || c.state === "offline");
  const workersCheck = health.checks.find((c) => c.key === "workers");
  const integrationErrors = health.checks.filter((c) => !["api", "database", "redis", "workers"].includes(c.key) && c.state === "error");
  const overall: { tone: "green" | "yellow" | "red"; title: string; text: string } = coreDown.length
    ? { tone: "red", title: "Offline", text: `${coreDown.map((c) => c.label).join(" and ")} cannot be reached. Agents cannot work until this is fixed.` }
    : workersCheck?.state !== "operational" || integrationErrors.length
      ? {
          tone: "yellow",
          title: "Degraded",
          text: [workersCheck?.state === "offline" ? "No agent worker is connected, so tasks wait in the queue." : workersCheck?.state !== "operational" ? "Some agents have no live worker." : null, integrationErrors.length ? `${integrationErrors.map((c) => c.label).join(", ")} failed its last connection test.` : null].filter(Boolean).join(" "),
        }
      : { tone: "green", title: "Operational", text: "The app, database, queue and all agents are running." };
  const done24 = Number(rates?.done ?? 0);
  const failed24 = Number(rates?.failed ?? 0);
  const errorRate = done24 + failed24 ? (failed24 / (done24 + failed24)) * 100 : null;
  const oldest = workers0(health.workers.workers);
  const q = Object.fromEntries(counts.map((c) => [c.status, c.n]));
  const { workers } = health;
  return (
    <>
      <PageHeader eyebrow="Intelligence" title="System Health" description="Is everything running? These are live checks of the app, the database, the task queue, your agent workers and each connected service. Refreshes every 20 seconds." />
      <div
        className={cn(
          "mb-4 flex items-start gap-3.5 rounded-xl border p-4 sm:p-5",
          overall.tone === "green" ? "border-[color-mix(in_srgb,var(--success)_30%,transparent)] bg-success-soft" : overall.tone === "yellow" ? "border-[rgba(196,128,0,0.3)] bg-warning-soft" : "border-[rgba(180,42,37,0.3)] bg-danger-soft",
        )}
        role="status"
      >
        <span className={cn("mt-1 h-3.5 w-3.5 shrink-0 rounded-full", overall.tone === "green" ? "bg-success text-success status-live" : overall.tone === "yellow" ? "bg-warning" : "bg-danger")} />
        <div>
          <p className={cn("text-[17px] font-semibold", overall.tone === "green" ? "text-success" : overall.tone === "yellow" ? "text-warning" : "text-danger")}>{overall.title}</p>
          <p className="mt-0.5 text-[13.5px] leading-relaxed text-foreground/90">{overall.text}</p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        {core.filter((c) => c.key !== "api").map((c) => (
          <StatCard key={c.key} label={`${c.label} response`} value={c.latencyMs != null ? `${c.latencyMs} ms` : c.state === "operational" ? "OK" : "—"} sub={c.state === "error" ? c.detail : "Measured just now"} tone={c.state === "error" ? "danger" : "neutral"} />
        ))}
        <StatCard label="Task error rate (24h)" value={errorRate == null ? "—" : `${errorRate.toFixed(1)}%`} sub={errorRate == null ? "No finished tasks" : `${failed24} failed of ${done24 + failed24}`} tone={errorRate != null && errorRate > 10 ? "danger" : "neutral"} href="/tasks?status=FAILED" />
        <StatCard label="Worker uptime" value={oldest ?? "—"} sub={oldest ? "Longest-running worker" : "No worker connected"} tone={oldest ? "neutral" : "warning"} help="How long the agent worker has been running without a restart. The web app itself runs on demand and has no uptime of its own." />
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SystemHealth initial={{ checks: health.checks, checkedAt: new Date().toISOString() }} detailed />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-4">
            <h3 className="mb-3 text-[14px] font-semibold">
              Task queue
            </h3>
            <dl className="grid grid-cols-2 gap-2 text-[12px]">
              {[
                ["Queued", q.PENDING ?? 0, "text-foreground"],
                ["Running", q.RUNNING ?? 0, "text-accent"],
                ["Waiting for you", q.WAITING_FOR_APPROVAL ?? 0, "text-warning"],
                ["Failed", q.FAILED ?? 0, "text-danger"],
              ].map(([k, v, c]) => (
                <div key={k as string} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                  <dt className="text-subtle">{k}</dt>
                  <dd className={`tabular mt-0.5 text-[18px] font-semibold ${c}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card className="p-4">
            <h3 className="mb-3 text-[14px] font-semibold">
              Agent coverage
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2 lg:grid-cols-1">
              {AGENT_KEYS.map((k) => {
                const on = workers.covered.includes(k);
                return (
                  <li key={k} className="flex items-center justify-between gap-2">
                    <span className="text-foreground/90">{AGENT_META[k].name}</span>
                    <span className={on ? "text-accent" : "text-danger"}>{on ? "Online" : "No worker"}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
      <div className="mt-8 grid gap-4 xl:grid-cols-2">
        <Section title="Recent incidents" description="Errors recorded in the last 7 days." className="mb-0">
          <Card className="divide-y divide-border">
            {incidents.length === 0 && <p className="px-4 py-8 text-center text-[13px] text-accent">No incidents in the last 7 days.</p>}
            {incidents.map((i, idx) => (
              <div key={idx} className="px-4 py-2.5">
                <p className="line-clamp-2 text-[13px] text-danger">{String(i.message)}</p>
                <p className="mt-0.5 text-[12px] text-subtle">
                  {i.kind === "server" ? `App error${i.source ? ` on ${String(i.source)}` : ""}` : `${AGENT_META[String(i.source) as (typeof AGENT_KEYS)[number]]?.name ?? String(i.source)} agent`} · {timeAgo(new Date(i.created_at as string))}
                </p>
              </div>
            ))}
          </Card>
        </Section>
        <Section title="Failed executions" description="Tasks that need a retry." className="mb-0" actions={<Link href="/tasks?status=FAILED" className="text-[12.5px] font-medium text-accent hover:underline">Open task queue →</Link>}>
          <Card className="divide-y divide-border">
            {failed.length === 0 && <p className="px-4 py-8 text-center text-[13px] text-accent">No failed tasks.</p>}
            {failed.map((f) => (
              <div key={f.id} className="px-4 py-2.5">
                <p className="text-[13.5px] font-medium">
                  {AGENT_META[f.agentKey as (typeof AGENT_KEYS)[number]]?.name ?? f.agentKey} <span className="font-normal text-muted">· {f.type.replace(/_/g, " ")}</span>
                </p>
                <p className="mt-0.5 line-clamp-1 text-[12.5px] text-danger">{f.error?.message ?? "Failed"}</p>
                <p className="text-[12px] text-subtle">{timeAgo(f.completedAt)}</p>
              </div>
            ))}
          </Card>
        </Section>
      </div>
      <Section className="mt-8" title="Worker processes" description="Each worker publishes a heartbeat every 15s; entries expire after 45s without one.">
        <Table>
          <THead>
            <tr>
              <TH>Worker</TH>
              <TH>Host</TH>
              <TH>Agents</TH>
              <TH>Up since</TH>
              <TH>Last beat</TH>
            </tr>
          </THead>
          <tbody>
            {workers.workers.length === 0 && (
              <tr>
                <td colSpan={5} className="mono px-4 py-8 text-center text-[12px] text-warning">
                  {workers.ok ? "No worker is connected. The worker is a separate program that runs your agents; it needs to be hosted (for example on Railway or Render) and started with “npm run worker”. See docs/DEPLOYMENT.md." : `Redis unreachable: ${workers.error ?? "unknown error"}`}
                </td>
              </tr>
            )}
            {workers.workers.map((w) => (
              <TR key={w.id}>
                <TD className="mono text-[12px]">{w.id}</TD>
                <TD className="mono text-[12px] text-muted">{w.host}</TD>
                <TD className="mono text-[12px]">{w.agents.length}/7</TD>
                <TD className="mono text-[12px] text-subtle">{timeAgo(w.startedAt)}</TD>
                <TD className="mono text-[12px] text-accent">{timeAgo(w.at)}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Section>
    </>
  );
}
