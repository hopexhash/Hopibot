import { and, count, desc, eq, inArray } from "drizzle-orm";
import { Bot, CircleDollarSign, Euro, Globe, MailCheck, MailOpen, Megaphone, Repeat, Rocket, ShieldCheck, Target, TrendingUp, Trophy, UserCheck } from "lucide-react";
import Link from "next/link";
import { LiveOperations } from "@/components/app/live-operations";
import { ApprovalList } from "@/components/app/approval-list";
import { AutonomyPanel } from "@/components/app/autonomy-panel";
import { getAutonomyStatus } from "@/server/orchestrator/autopilot";
import { ObjectiveDialog } from "@/components/app/objective-dialog";
import { Onboarding, type OnboardingStep } from "@/components/app/onboarding";
import { makeDelta, Section, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { SystemHealth } from "@/components/app/system-health";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { cn, formatEur, formatNumber, formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { systemHealth } from "@/server/health";
import { getCommandCenterState } from "@/server/queries/command-center";
import { getActivity, getKpis, getPeriodComparison } from "@/server/queries/metrics";

export const metadata = { title: "Command Center" };

function Chip({ value, label, tone = "muted", pulse }: { value: React.ReactNode; label: string; tone?: "accent" | "warning" | "danger" | "muted"; pulse?: boolean }) {
  const dot = { accent: "bg-accent text-accent", warning: "bg-warning text-warning", danger: "bg-danger text-danger", muted: "bg-subtle text-subtle" }[tone];
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-border bg-[rgba(3,8,6,0.55)] px-3 py-2">
      <span className={cn("h-2 w-2 shrink-0 rounded-full", dot, pulse && "animate-pulse-dot")} />
      <span className="tabular text-[15px] font-semibold leading-none">{value}</span>
      <span className="text-[12px] leading-tight text-muted">{label}</span>
    </div>
  );
}

export default async function CommandCenterPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const orgId = auth.org.id;
  const [kpis, period, cc, autonomy, activity, health, approvals, runs, [activeRuns], [enabledFlows], [runCount]] = await Promise.all([
    getKpis(orgId, auth.org.settings.minLeadScore),
    getPeriodComparison(orgId, auth.org.settings.minLeadScore, 30),
    getCommandCenterState(orgId),
    getAutonomyStatus(orgId, auth.org.settings),
    getActivity(orgId, 50),
    systemHealth(orgId),
    db().select().from(schema.approvals).where(and(eq(schema.approvals.organizationId, orgId), eq(schema.approvals.status, "pending"))).orderBy(desc(schema.approvals.createdAt)).limit(5),
    db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.organizationId, orgId)).orderBy(desc(schema.workflowRuns.createdAt)).limit(5),
    db().select({ n: count() }).from(schema.workflowRuns).where(and(eq(schema.workflowRuns.organizationId, orgId), inArray(schema.workflowRuns.status, ["RUNNING", "WAITING_FOR_APPROVAL"]))),
    db().select({ n: count() }).from(schema.workflows).where(and(eq(schema.workflows.organizationId, orgId), eq(schema.workflows.enabled, true))),
    db().select({ n: count() }).from(schema.workflowRuns).where(eq(schema.workflowRuns.organizationId, orgId)),
  ]);
  const { current: cur, previous: prev } = period;
  const firstName = (auth.user.name?.split(" ")[0] ?? "operator").toUpperCase();

  // Real system state for the hero line.
  const infra = health.checks.filter((c) => ["api", "database", "redis"].includes(c.key));
  const infraOk = infra.every((c) => c.state === "operational" || c.state === "connected");
  const state = (key: string) => health.checks.find((c) => c.key === key)?.state;
  const claudeReady = state("anthropic") === "connected";
  const placesReady = state("google_maps") === "connected";
  const workersOnline = cc.workers.online;
  const steps: OnboardingStep[] = [
    { key: "claude", title: "Connect Claude (the AI)", text: "Lets agents research businesses, write websites and draft emails.", done: claudeReady, href: "/integrations", cta: "Connect" },
    { key: "places", title: "Connect Google Places", text: "Lets the Lead Discovery agent find real local businesses.", done: placesReady, href: "/integrations", cta: "Connect" },
    { key: "worker", title: "Start the agent worker", text: "The worker is the machine that actually runs your agents.", done: workersOnline > 0, href: "/health", cta: "How to" },
    { key: "objective", title: "Set the autonomous scope", text: "Choose cities, industries and daily limits. The agency then works by itself.", done: runCount.n > 0, href: "/settings?tab=autopilot", cta: "Open" },
  ];

  const tasks = cur.tasksDone + cur.tasksFailed;
  const prevTasks = prev.tasksDone + prev.tasksFailed;
  const success = tasks ? (cur.tasksDone / tasks) * 100 : null;
  const prevSuccess = prevTasks ? (prev.tasksDone / prevTasks) * 100 : null;
  const openRate = cur.emailsSent ? (cur.emailsOpened / cur.emailsSent) * 100 : null;
  const prevOpenRate = prev.emailsSent ? (prev.emailsOpened / prev.emailsSent) * 100 : null;
  const rate = auth.org.settings.usdToEurRate;
  const profit = cur.revenueCents / 100 - cur.cost * rate;
  const prevProfit = prev.revenueCents / 100 - prev.cost * rate;
  const eur = (v: number) => `${v < 0 ? "−" : ""}€${Math.abs(Math.round(v)).toLocaleString("nl-NL")}`;
  const new30 = (n: number) => `${n > 0 ? "+" : ""}${formatNumber(n)} in 30 days`;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="hud-label text-accent/80">Command Center</p>
          <h1 className="mt-1.5 text-[24px] font-semibold leading-[1.15] tracking-tight sm:text-[30px]">
            WELCOME BACK, <span className="text-accent glow-text">{firstName}</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip value={infraOk ? "Online" : "Issue"} label="system" tone={infraOk ? "accent" : "danger"} pulse={infraOk} />
          <Chip value={cc.enabledAgents} label="agents configured" tone="muted" />
          <Chip value={`${workersOnline}/${cc.workers.total}`} label="agents online" tone={workersOnline === cc.workers.total ? "accent" : workersOnline ? "warning" : "danger"} />
          <Chip value={cc.activeAgents} label="executing" tone={cc.activeAgents ? "accent" : "muted"} pulse={cc.activeAgents > 0} />
        </div>
      </div>

      {/* The agency runs by itself; a manual objective is the secondary action. */}
      <AutonomyPanel status={autonomy} canAdmin={hasRole(auth.role, "admin")}>
        <ObjectiveDialog key={sp.objective ?? "closed"} label="Manual objective" variant="secondary" />
      </AutonomyPanel>

      {/* What every agent is doing right now: real events only. */}
      <LiveOperations initial={activity} initialState={cc} />

      <Onboarding steps={steps} />

      {kpis.approvalsPending > 0 && (
        <Card className="mb-5 border-[rgba(255,191,71,0.25)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-warning" /> Waiting for your approval
            </CardTitle>
            <Link href="/approvals" className="text-[12.5px] font-medium text-accent hover:underline">
              Open approval queue →
            </Link>
          </CardHeader>
          <CardContent>
            <ApprovalList approvals={approvals.map((a) => ({ id: a.id, kind: a.kind, summary: a.summary, subjectType: a.subjectType, subjectId: a.subjectId, createdAt: a.createdAt.toISOString() }))} />
          </CardContent>
        </Card>
      )}

      {/* KPIs: all from database records; mock data is excluded */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-4">
        <StatCard label="Total leads" value={formatNumber(kpis.businesses)} icon={<Target />} href="/businesses" delta={makeDelta(cur.leads, prev.leads)} sub={new30(cur.leads)} help="Every business your agents have found and saved. Test (mock) records are not counted." />
        <StatCard label="Qualified leads" value={formatNumber(kpis.qualified)} icon={<UserCheck />} href="/businesses" delta={makeDelta(cur.qualified, prev.qualified)} sub={new30(cur.qualified)} help="Businesses whose current website genuinely needs a redesign (inspected in a real browser and verified), and that have a public email address." />
        <StatCard label="Websites generated" value={formatNumber(kpis.websites)} icon={<Globe />} href="/websites" delta={makeDelta(cur.websites, prev.websites)} sub={new30(cur.websites)} help="Websites your agents have designed and written for leads." />
        <StatCard label="Websites deployed" value={formatNumber(kpis.deployments)} icon={<Rocket />} href="/previews" delta={makeDelta(cur.deployments, prev.deployments)} sub={new30(cur.deployments)} help="Websites that are online at a preview link. A site only counts once the deployment is confirmed." />
        <StatCard label="Active campaigns" value={formatNumber(activeRuns.n)} icon={<Megaphone />} href="/automations" sub={`${enabledFlows.n} automation${enabledFlows.n === 1 ? "" : "s"} switched on`} help="Objectives that are running or waiting for you right now." />
        <StatCard label="Customers acquired" value={formatNumber(kpis.customers)} icon={<Trophy />} href="/pipeline" delta={makeDelta(cur.customers, prev.customers)} sub={new30(cur.customers)} help="Leads you marked as Won in the CRM." />
        <StatCard label="Emails sent" value={formatNumber(kpis.emailsSent)} icon={<MailCheck />} href="/emails" delta={makeDelta(cur.emailsSent, prev.emailsSent)} sub={new30(cur.emailsSent)} help="Outreach emails that were approved by you and accepted by the email provider." />
        <StatCard
          label="Email open rate"
          value={openRate == null ? "—" : `${openRate.toFixed(0)}%`}
          icon={<MailOpen />}
          href="/emails"
          tone="neutral"
          delta={openRate != null && prevOpenRate != null ? makeDelta(openRate, prevOpenRate) : undefined}
          sub={openRate == null ? "No emails sent in 30 days" : `${cur.emailsOpened} of ${cur.emailsSent} opened`}
          help="Share of emails sent in the last 30 days that were opened. Needs the Resend webhook to be connected; opens are an estimate because some mail apps block tracking."
        />
        <StatCard label="Total revenue" value={formatEur(kpis.revenueCents)} icon={<Euro />} href="/revenue" tone="success" delta={makeDelta(cur.revenueCents, prev.revenueCents)} sub={`${formatEur(cur.revenueCents)} in 30 days`} help="Payments received (from Stripe or entered by hand)." />
        <StatCard label="Monthly recurring revenue" value={formatEur(kpis.mrrCents)} icon={<Repeat />} href="/revenue" tone="success" sub="Active subscriptions" help="What your active subscriptions bring in each month. Yearly plans are divided by 12." />
        <StatCard label="AI API spend (30 days)" value={formatUsd(cur.cost)} icon={<CircleDollarSign />} href="/costs" tone="warning" delta={makeDelta(cur.cost, prev.cost, { higherIsBetter: false })} sub={`${formatUsd(kpis.costToday)} today`} help="What the AI and data services charged for your agents' work, recorded per call. You can set daily and monthly limits in Analytics → AI costs." />
        <StatCard label="Profit (30 days)" value={eur(profit)} icon={<TrendingUp />} href="/analytics" tone={profit < 0 ? "danger" : "success"} delta={makeDelta(profit, prevProfit)} sub="Revenue − API costs" help={`Revenue minus API costs over the last 30 days. Costs are billed in US dollars and converted at ${rate} €/$ (change it in Settings). Other business expenses are not included.`} />
        <StatCard
          label="Agent success rate"
          value={success == null ? "—" : `${success.toFixed(1)}%`}
          icon={<Bot />}
          href="/tasks"
          tone="neutral"
          delta={success != null && prevSuccess != null ? makeDelta(success, prevSuccess) : undefined}
          sub={tasks ? `${cur.tasksDone} done · ${cur.tasksFailed} failed` : "No finished tasks in 30 days"}
          help="Share of agent tasks in the last 30 days that finished successfully."
        />
      </div>
      {kpis.mockBusinesses > 0 && <p className="mt-2 text-[12px] text-subtle">{kpis.mockBusinesses} test (mock) record(s) exist in this workspace and are left out of every number above.</p>}

      <div className="mb-8 mt-8">
        <SystemHealth initial={{ checks: health.checks, checkedAt: new Date().toISOString() }} />
      </div>

      <Section title="Recent objectives" actions={<Link href="/automations" className="text-[12.5px] font-medium text-accent hover:underline">All runs →</Link>}>
        <Card className="divide-y divide-[rgba(0,255,120,0.06)]">
          {runs.length === 0 && <p className="px-4 py-8 text-center text-[13px] text-muted">No objectives yet. Press “New objective” to give your agency its first job.</p>}
          {runs.map((r) => (
            <Link key={r.id} href={`/automations/runs/${r.id}`} className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[rgba(0,255,120,0.035)]">
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-medium">{r.objective ?? (r.plan as { summary?: string }).summary}</p>
                <p className="mt-0.5 text-[12px] text-subtle">{timeAgo(r.createdAt)}</p>
              </div>
              <StatusBadge status={r.status} />
            </Link>
          ))}
        </Card>
      </Section>
    </>
  );
}
