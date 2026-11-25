import { and, count, desc, eq, inArray } from "drizzle-orm";
import { Bot, CircleDollarSign, Euro, Globe, Megaphone, Target, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import { AgentMonitor } from "@/components/app/agent-monitor";
import { ApprovalList } from "@/components/app/approval-list";
import { ChartCard, FunnelCard } from "@/components/app/charts";
import { ObjectiveDialog } from "@/components/app/objective-dialog";
import { Section, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { SystemHealth } from "@/components/app/system-health";
import { Terminal } from "@/components/app/terminal";
import { WorkflowNetwork } from "@/components/app/workflow-network";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { formatEur, formatNumber, formatUsd, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { systemHealth } from "@/server/health";
import { getCommandCenterState, getLogs } from "@/server/queries/command-center";
import { getAgentStats, getDailySeries, getFunnel, getKpis, getMonthlyRevenue, getUnitEconomics } from "@/server/queries/metrics";

export const metadata = { title: "Command Center" };

export default async function CommandCenterPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const orgId = auth.org.id;
  const [kpis, unit, daily, monthly, stats, funnel, cc, logs, health, approvals, runs, [activeRuns], [scheduled]] = await Promise.all([
    getKpis(orgId, auth.org.settings.minLeadScore),
    getUnitEconomics(orgId),
    getDailySeries(orgId, 30),
    getMonthlyRevenue(orgId, 12),
    getAgentStats(orgId, 30),
    getFunnel(orgId),
    getCommandCenterState(orgId),
    getLogs(orgId, { limit: 80 }),
    systemHealth(orgId),
    db().select().from(schema.approvals).where(and(eq(schema.approvals.organizationId, orgId), eq(schema.approvals.status, "pending"))).orderBy(desc(schema.approvals.createdAt)).limit(6),
    db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.organizationId, orgId)).orderBy(desc(schema.workflowRuns.createdAt)).limit(5),
    db().select({ n: count() }).from(schema.workflowRuns).where(and(eq(schema.workflowRuns.organizationId, orgId), inArray(schema.workflowRuns.status, ["RUNNING", "WAITING_FOR_APPROVAL"]))),
    db().select({ n: count() }).from(schema.workflows).where(and(eq(schema.workflows.organizationId, orgId), eq(schema.workflows.enabled, true))),
  ]);
  const totals = Object.values(stats).reduce((a, s) => ({ done: a.done + s.completed, failed: a.failed + s.failed }), { done: 0, failed: 0 });
  const successRate = totals.done + totals.failed ? `${((totals.done / (totals.done + totals.failed)) * 100).toFixed(1)}%` : "—";
  const profit = unit.revenue - unit.totalCost;

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="hud-label text-accent/80">AGENCYOS AI {"//"} COMMAND CENTER</div>
          <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight sm:text-[30px]">
            Welcome back, <span className="text-accent glow-text">{auth.user.name?.split(" ")[0] ?? "operator"}</span>
          </h1>
          <p className="mono mt-1.5 text-[12px] text-muted">
            {cc.activeAgents}/7 agents executing · {cc.workers.online}/7 online · {kpis.approvalsPending} awaiting your approval
          </p>
        </div>
        <ObjectiveDialog key={sp.objective ?? "closed"} />
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        <StatCard label="Total leads" value={formatNumber(kpis.businesses)} sub={kpis.mockBusinesses ? `+${kpis.mockBusinesses} mock excluded` : `${kpis.qualified} qualified`} icon={<Target />} />
        <StatCard label="Websites generated" value={formatNumber(kpis.websites)} sub={`${kpis.deployments} deployed`} icon={<Globe />} />
        <StatCard label="Active campaigns" value={formatNumber(activeRuns.n)} sub={`${scheduled.n} automation${scheduled.n === 1 ? "" : "s"} enabled`} icon={<Megaphone />} />
        <StatCard label="Customers acquired" value={formatNumber(kpis.customers)} sub={`${kpis.emailsSent} emails sent`} icon={<Trophy />} />
        <StatCard label="Total revenue" value={formatEur(kpis.revenueCents)} sub={`MRR ${formatEur(kpis.mrrCents)}`} icon={<Euro />} />
        <StatCard label="AI API spend (month)" value={formatUsd(kpis.costMonth)} sub={`${formatUsd(kpis.costToday)} today`} icon={<CircleDollarSign />} tone="warning" />
        <StatCard label="Profit" value={`€${Math.round(profit).toLocaleString("nl-NL")}`} sub="Revenue − API costs (nominal)" icon={<TrendingUp />} tone={profit < 0 ? "danger" : "accent"} />
        <StatCard label="Agent success rate" value={successRate} sub={`${totals.done} done · ${totals.failed} failed (30d)`} icon={<Bot />} />
      </div>

      <Section className="mt-8" title="Live agent monitor" description="Seven autonomous agents. Status reflects confirmed execution on a live worker.">
        <AgentMonitor initial={cc} />
      </Section>

      <div className="mb-8 grid gap-3 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <Terminal initial={logs} height={360} />
        </div>
        <SystemHealth initial={{ checks: health.checks, checkedAt: new Date().toISOString() }} />
      </div>

      <Section title="Workflow network" description="Tap an agent to open it. Lines animate when work flows to that agent.">
        <WorkflowNetwork initial={cc} />
      </Section>

      <Section title="Intelligence" description="Real data only — mock records are excluded.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <ChartCard className="md:col-span-2" title="Leads discovered" description="Per day, last 30 days" data={daily} xKey="label" series={[{ key: "leads", label: "Leads" }]} kind="area" empty="No leads yet" />
          <FunnelCard title="Conversion" description="Discovery → customer" steps={funnel} />
          <ChartCard title="Websites generated" data={daily} xKey="label" series={[{ key: "websites", label: "Websites" }]} kind="bar" empty="No websites yet" />
          <ChartCard title="AI API expenditure" description="USD / day" data={daily} xKey="label" series={[{ key: "cost", label: "Spend" }]} kind="bar" format="usd" empty="No spend recorded" />
          <ChartCard title="Revenue" description="EUR / month" data={monthly} xKey="label" series={[{ key: "revenue", label: "Revenue" }]} kind="line" format="eur" empty="No payments yet" />
        </div>
      </Section>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Awaiting approval</CardTitle>
          </CardHeader>
          <CardContent>
            <ApprovalList approvals={approvals.map((a) => ({ id: a.id, kind: a.kind, summary: a.summary, subjectType: a.subjectType, subjectId: a.subjectId, createdAt: a.createdAt.toISOString() }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent operations</CardTitle>
            <Link href="/automations" className="mono text-[10.5px] tracking-[0.1em] text-accent hover:underline">
              ALL RUNS →
            </Link>
          </CardHeader>
          <CardContent className="space-y-1">
            {runs.length === 0 && <p className="mono py-4 text-center text-[11px] text-subtle">No operations yet — issue a new objective.</p>}
            {runs.map((r) => (
              <Link key={r.id} href={`/automations/runs/${r.id}`} className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-accent-soft">
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium">{r.objective ?? (r.plan as { summary?: string }).summary}</p>
                  <p className="mono text-[10.5px] text-subtle">{timeAgo(r.createdAt)}</p>
                </div>
                <StatusBadge status={r.status} />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
