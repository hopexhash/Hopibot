import { and, count, desc, eq, inArray } from "drizzle-orm";
import { Bot, Check, CircleDollarSign, Euro, Globe, MailCheck, MailOpen, Megaphone, Repeat, Rocket, ShieldCheck, Target, TrendingUp, Trophy, UserCheck } from "lucide-react";
import Link from "next/link";
import { LiveAgents, LiveOperations } from "@/components/app/live-operations";
import { ApprovalList } from "@/components/app/approval-list";
import { AutonomyPanel, ObjectiveCard } from "@/components/app/autonomy-panel";
import { getAutonomyStatus } from "@/server/orchestrator/autopilot";
import { ObjectiveDialog } from "@/components/app/objective-dialog";
import { Onboarding, type OnboardingStep } from "@/components/app/onboarding";
import { CountUp } from "@/components/app/count-up";
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

/** One figure of the system overview: a mono label, a large numeral and a short caption. */
function Overview({ label, value, caption, dot }: { label: string; value: React.ReactNode; caption: string; dot?: string }) {
  return (
    <div className="min-w-0 py-4 pr-3 sm:py-5 sm:pr-6">
      <p className="label-mono !text-[10.5px]">{label}</p>
      <p className="tabular mt-2.5 flex min-w-0 items-center gap-2 font-display text-[24px] font-semibold leading-none tracking-[-0.03em] sm:gap-2.5 sm:text-[34px] xl:text-[38px]">
        {dot && <span className={cn("status-dot h-2 w-2 shrink-0 rounded-full", dot)} aria-hidden />}
        {typeof value === "string" || typeof value === "number" ? <CountUp value={value} /> : value}
      </p>
      <p className="mt-2 truncate text-[12.5px] text-muted">{caption}</p>
    </div>
  );
}

/** Morning, afternoon or evening in Amsterdam, wherever the server runs. */
function greeting(now = new Date()) {
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", hour: "numeric", hourCycle: "h23" }).format(now));
  return h < 5 ? "Good evening" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
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
  const firstName = auth.user.name?.trim().split(/\s+/)[0] || null;

  // Real system state for the hero line.
  const infra = health.checks.filter((c) => ["api", "database", "redis"].includes(c.key));
  const infraOk = infra.every((c) => c.state === "operational" || c.state === "connected");
  const state = (key: string) => health.checks.find((c) => c.key === key)?.state;
  const claudeReady = state("anthropic") === "connected";
  const placesReady = state("google_maps") === "connected";
  const workersOnline = cc.workers.online;
  const offlineAll = workersOnline === 0;
  const headline = !infraOk
    ? "Some systems need attention before your agents can work."
    : offlineAll
      ? "Your agents are offline. Start the worker to put them to work."
      : autonomy.tasks.running > 0
        ? `Your AI workforce is at work: ${autonomy.tasks.running} task${autonomy.tasks.running === 1 ? "" : "s"} executing.`
        : "Your AI workforce is ready.";
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
      {/* Welcome: who is here, and the real state of the system in one sentence. */}
      <header className="mb-8 sm:mb-10">
        <p className="label-mono flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-brand" aria-hidden />
          Command Center
          <span className="text-subtle" suppressHydrationWarning>
            · {new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", weekday: "long", day: "numeric", month: "long" }).format(new Date())}
          </span>
        </p>
        <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[52px]">
          {greeting()}
          {firstName ? `, ${firstName}` : ""}.
        </h1>
        <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted sm:text-[18px]">{headline}</p>

        <div className="mt-7 grid grid-cols-2 border-y border-border lg:grid-cols-4 [&>*:nth-child(even)]:border-l [&>*:nth-child(even)]:border-border [&>*:nth-child(even)]:pl-4 [&>*:nth-child(n+3)]:border-t [&>*:nth-child(n+3)]:border-border lg:[&>*:not(:first-child)]:border-l lg:[&>*:not(:first-child)]:pl-6 lg:[&>*:nth-child(n+3)]:border-t-0">
          <Overview label="System status" value={infraOk ? "Operational" : "Degraded"} caption={infraOk ? "API, database and queue healthy" : `${infra.filter((c) => !(c.state === "operational" || c.state === "connected")).map((c) => c.label).join(", ")} need attention`} dot={infraOk ? "bg-success text-success" : "bg-danger text-danger"} />
          <Overview label="Configured agents" value={cc.enabledAgents} caption={`of ${cc.agents.length} available`} />
          <Overview label="Online agents" value={`${workersOnline}/${cc.workers.total}`} caption={workersOnline === 0 ? "no worker connected" : workersOnline === cc.workers.total ? "all agents reachable" : "some agents unreachable"} />
          <Overview label="Executing tasks" value={autonomy.tasks.running} caption={`${autonomy.tasks.waiting} queued · ${autonomy.tasks.approval} awaiting approval`} dot={autonomy.tasks.running > 0 ? "status-live bg-brand text-brand" : undefined} />
        </div>
      </header>

      {/* Autonomous operations and the objective it is working on. */}
      <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <AutonomyPanel status={autonomy} canAdmin={hasRole(auth.role, "admin")}>
          <ObjectiveDialog key={sp.objective ?? "closed"} label="Manual objective" variant="secondary" />
        </AutonomyPanel>
        <ObjectiveCard objective={autonomy.objective} />
      </div>

      {/* What needs the owner: setup steps and approvals. Calm when there is nothing. */}
      <Section title="Needs your attention">
        <Onboarding steps={steps} />
        {kpis.approvalsPending > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-warning" /> {kpis.approvalsPending} waiting for your approval
              </CardTitle>
              <Link href="/approvals" className="text-[12.5px] font-medium text-foreground hover:text-accent">
                Open approval queue →
              </Link>
            </CardHeader>
            <CardContent>
              <ApprovalList approvals={approvals.map((a) => ({ id: a.id, kind: a.kind, summary: a.summary, subjectType: a.subjectType, subjectId: a.subjectId, createdAt: a.createdAt.toISOString() }))} />
            </CardContent>
          </Card>
        ) : (
          steps.every((x) => x.done) && (
            <p className="flex items-center gap-2.5 border-y border-border py-4 text-[14px] text-muted">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-success-soft text-success">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              Nothing needs your attention. No approvals are waiting.
            </p>
          )
        )}
      </Section>

      {/* What every agent is doing right now: real events only. */}
      <Section title="Agents at work">
        <div className="xl:grid xl:grid-cols-[minmax(0,1.25fr)_minmax(420px,1fr)] xl:items-start xl:gap-4">
          <LiveAgents initialState={cc} />
          <LiveOperations initial={activity} initialState={cc} agentCards={false} tall className="xl:sticky xl:top-20" />
        </div>
      </Section>

      <Section title="Performance" description="Last 30 days, compared with the 30 days before. Test records are left out.">
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
      </Section>

      <div className="mb-10">
        <SystemHealth initial={{ checks: health.checks, checkedAt: new Date().toISOString() }} />
      </div>

      <Section title="Recent objectives" actions={<Link href="/automations" className="text-[12.5px] font-medium text-foreground hover:text-accent">All runs →</Link>}>
        <Card className="divide-y divide-border">
          {runs.length === 0 && <p className="px-4 py-8 text-center text-[13px] text-muted">No objectives yet. Press “New objective” to give your agency its first job.</p>}
          {runs.map((r) => (
            <Link key={r.id} href={`/automations/runs/${r.id}`} className="flex min-h-14 items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-surface-2">
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
