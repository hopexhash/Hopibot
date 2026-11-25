import { and, desc, eq } from "drizzle-orm";
import {
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Clock4,
  Globe,
  Inbox,
  Mail,
  MessageSquareReply,
  Rocket,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { ActivityFeed } from "@/components/app/activity-feed";
import { ApprovalList } from "@/components/app/approval-list";
import { ChartCard, FunnelCard } from "@/components/app/charts";
import { ObjectiveDialog } from "@/components/app/objective-dialog";
import { PageHeader, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { AGENT_KEYS, AGENT_META } from "@/lib/constants";
import { formatEur, formatNumber, formatUsd, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getActivity, getAgentStats, getDailySeries, getFunnel, getKpis, getMonthlyRevenue } from "@/server/queries/metrics";

export const metadata = { title: "Overview" };

export default async function OverviewPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const orgId = auth.org.id;
  const [kpis, daily, monthly, agentStats, funnel, activity, approvals, runs] = await Promise.all([
    getKpis(orgId, auth.org.settings.minLeadScore),
    getDailySeries(orgId, 30),
    getMonthlyRevenue(orgId, 12),
    getAgentStats(orgId, 30),
    getFunnel(orgId),
    getActivity(orgId, 40),
    db()
      .select()
      .from(schema.approvals)
      .where(and(eq(schema.approvals.organizationId, orgId), eq(schema.approvals.status, "pending")))
      .orderBy(desc(schema.approvals.createdAt))
      .limit(6),
    db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.organizationId, orgId)).orderBy(desc(schema.workflowRuns.createdAt)).limit(5),
  ]);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const showMock = kpis.mockBusinesses > 0;
  const agentPerf = AGENT_KEYS.map((k) => ({ label: AGENT_META[k].short, completed: agentStats[k]?.completed ?? 0, failed: agentStats[k]?.failed ?? 0 }));
  const conversion = funnel[0].value ? ((funnel[5].value / funnel[0].value) * 100).toFixed(1) : "0.0";

  return (
    <>
      <PageHeader
        eyebrow={`${greeting}, ${auth.user.name?.split(" ")[0] ?? "there"}`}
        title="Agency overview"
        description={`${kpis.tasksRunning} agent task${kpis.tasksRunning === 1 ? "" : "s"} running · ${kpis.approvalsPending} item${kpis.approvalsPending === 1 ? "" : "s"} waiting for your approval`}
        actions={<ObjectiveDialog key={sp.objective ?? "closed"} />}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        <StatCard label="Businesses discovered" value={formatNumber(kpis.businesses)} sub={showMock ? `+${kpis.mockBusinesses} mock (excluded)` : "All time"} icon={<Building2 />} />
        <StatCard label="Qualified leads" value={formatNumber(kpis.qualified)} sub={`Score ≥ ${auth.org.settings.minLeadScore}`} icon={<Target />} />
        <StatCard label="Websites generated" value={formatNumber(kpis.websites)} sub={`${kpis.websitesAwaiting} awaiting approval`} icon={<Globe />} />
        <StatCard label="Successful deployments" value={formatNumber(kpis.deployments)} icon={<Rocket />} tone="success" />
        <StatCard label="Emails awaiting approval" value={formatNumber(kpis.emailsAwaiting)} sub={kpis.mockEmailsAwaiting ? `+${kpis.mockEmailsAwaiting} mock` : "Review in Email Campaigns"} icon={<Inbox />} tone="warning" />
        <StatCard label="Emails sent" value={formatNumber(kpis.emailsSent)} icon={<Mail />} />
        <StatCard label="Replies received" value={formatNumber(kpis.replies)} icon={<MessageSquareReply />} />
        <StatCard label="Customers acquired" value={formatNumber(kpis.customers)} sub={`${conversion}% of discovered`} icon={<Trophy />} tone="success" />
        <StatCard label="Revenue generated" value={formatEur(kpis.revenueCents)} sub="Recorded payments" icon={<TrendingUp />} tone="success" />
        <StatCard label="Monthly recurring revenue" value={formatEur(kpis.mrrCents)} sub="Active subscriptions" icon={<CheckCircle2 />} tone="success" />
        <StatCard label="AI operating cost (month)" value={formatUsd(kpis.costMonth)} sub={`${formatUsd(kpis.costToday)} today · limit ${formatUsd(auth.org.settings.monthlySpendLimitUsd, 0)}`} icon={<CircleDollarSign />} tone="danger" />
        <StatCard label="Waiting for approval" value={formatNumber(kpis.approvalsPending)} sub="Budget, publishing, outreach" icon={<Clock4 />} tone="warning" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="grid gap-4 xl:col-span-2 md:grid-cols-2">
          <ChartCard className="md:col-span-2" title="Leads discovered" description="New businesses per day, last 30 days (mock data excluded)" data={daily} xKey="label" series={[{ key: "leads", label: "Leads" }]} empty="No leads discovered yet" />
          <ChartCard title="Websites generated" description="First versions per day" data={daily} xKey="label" series={[{ key: "websites", label: "Websites" }]} kind="bar" empty="No websites yet" />
          <ChartCard title="AI API expenditure" description="USD per day" data={daily} xKey="label" series={[{ key: "cost", label: "Spend" }]} kind="bar" format="usd" empty="No spend recorded" />
          <ChartCard title="Revenue" description="Recorded payments per month (EUR)" data={monthly} xKey="label" series={[{ key: "revenue", label: "Revenue" }]} kind="bar" format="eur" empty="No payments recorded yet" />
          <FunnelCard title="Conversion" description="From discovery to customer, with step-to-step rates" steps={funnel} />
          <ChartCard className="md:col-span-2" title="Agent performance" description="Tasks completed and failed per agent, last 30 days" data={agentPerf} xKey="label" series={[{ key: "completed", label: "Completed" }, { key: "failed", label: "Failed" }]} kind="bar" empty="No agent tasks yet" />
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <ActivityFeed initial={activity} />
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Waiting for approval</CardTitle>
            </CardHeader>
            <CardContent>
              <ApprovalList approvals={approvals.map((a) => ({ id: a.id, kind: a.kind, summary: a.summary, subjectType: a.subjectType, subjectId: a.subjectId, createdAt: a.createdAt.toISOString() }))} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent runs</CardTitle>
              <Link href="/automations" className="text-xs text-accent hover:underline">
                All runs
              </Link>
            </CardHeader>
            <CardContent className="space-y-1">
              {runs.length === 0 && <p className="py-4 text-center text-xs text-muted">No runs yet. Give the agency an objective to start.</p>}
              {runs.map((r) => (
                <Link key={r.id} href={`/automations/runs/${r.id}`} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium">{r.objective ?? (r.plan as { summary?: string }).summary}</p>
                    <p className="text-[11px] text-muted">{timeAgo(r.createdAt)}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
