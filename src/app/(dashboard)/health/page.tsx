import { count, eq } from "drizzle-orm";
import { PageHeader, Section } from "@/components/app/page";
import { SystemHealth } from "@/components/app/system-health";
import { Card } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_KEYS, AGENT_META } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { systemHealth } from "@/server/health";

export const metadata = { title: "System Health" };

export default async function HealthPage() {
  const auth = await requireAuth();
  const t = schema.agentTasks;
  const [health, counts] = await Promise.all([
    systemHealth(auth.org.id),
    db().select({ status: t.status, n: count() }).from(t).where(eq(t.organizationId, auth.org.id)).groupBy(t.status),
  ]);
  const q = Object.fromEntries(counts.map((c) => [c.status, c.n]));
  const { workers } = health;
  return (
    <>
      <PageHeader eyebrow="INTELLIGENCE // SYSTEM HEALTH" title="System Health" description="Live checks of the API, database, Redis, worker processes and each external integration. Refreshes every 20 seconds." />
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <SystemHealth initial={{ checks: health.checks, checkedAt: new Date().toISOString() }} detailed />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-4">
            <h3 className="mono mb-3 text-[11.5px] font-semibold uppercase tracking-[0.16em]">
              <span className="text-accent">›</span> Task queue
            </h3>
            <dl className="mono grid grid-cols-2 gap-2 text-[11px]">
              {[
                ["QUEUED", q.PENDING ?? 0, "text-foreground"],
                ["RUNNING", q.RUNNING ?? 0, "text-accent"],
                ["WAITING", q.WAITING_FOR_APPROVAL ?? 0, "text-warning"],
                ["FAILED", q.FAILED ?? 0, "text-danger"],
              ].map(([k, v, c]) => (
                <div key={k as string} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                  <dt className="text-[9.5px] tracking-[0.14em] text-subtle">{k}</dt>
                  <dd className={`tabular mt-0.5 text-[18px] font-semibold ${c}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card className="p-4">
            <h3 className="mono mb-3 text-[11.5px] font-semibold uppercase tracking-[0.16em]">
              <span className="text-accent">›</span> Agent coverage
            </h3>
            <ul className="mono grid grid-cols-1 gap-1.5 text-[11px] sm:grid-cols-2 lg:grid-cols-1">
              {AGENT_KEYS.map((k) => {
                const on = workers.covered.includes(k);
                return (
                  <li key={k} className="flex items-center justify-between gap-2">
                    <span className="uppercase tracking-[0.08em] text-foreground/85">{AGENT_META[k].name}</span>
                    <span className={on ? "text-accent" : "text-danger"}>{on ? "ONLINE" : "NO WORKER"}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
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
                <td colSpan={5} className="mono px-4 py-8 text-center text-[11px] text-warning">
                  {workers.ok ? "No worker connected. Start one with `npm run worker` (see docs/DEPLOYMENT.md)." : `Redis unreachable: ${workers.error ?? "unknown error"}`}
                </td>
              </tr>
            )}
            {workers.workers.map((w) => (
              <TR key={w.id}>
                <TD className="mono text-[11px]">{w.id}</TD>
                <TD className="mono text-[11px] text-muted">{w.host}</TD>
                <TD className="mono text-[11px]">{w.agents.length}/7</TD>
                <TD className="mono text-[11px] text-subtle">{timeAgo(w.startedAt)}</TD>
                <TD className="mono text-[11px] text-accent">{timeAgo(w.at)}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Section>
    </>
  );
}
