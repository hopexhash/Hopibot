import { and, desc, eq, sql } from "drizzle-orm";
import { ArrowLeft, Check, ShieldCheck, SquareTerminal, X } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityFeed } from "@/components/app/activity-feed";
import { AgentMascot } from "@/components/app/agent-mascot";
import { AGENT_STATUS } from "@/components/app/agent-meta";
import { LinkTabs, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Progress } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_CAPABILITIES, AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { cn, formatDuration, formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { SUPPORTED_MODELS } from "@/server/costs/pricing";
import { db, schema } from "@/server/db";
import { getCommandCenterState } from "@/server/queries/command-center";
import { getActivity, getAgentStats } from "@/server/queries/metrics";
import { AgentConfigForm, AgentToggle, TaskActions, TestAgentButton } from "./agent-controls";

const LLM_AGENTS: AgentKey[] = ["research", "website_builder", "sales"];
const TABS = [
  { key: "overview", label: "Overview" },
  { key: "history", label: "History" },
  { key: "logs", label: "Activity log" },
  { key: "config", label: "Configuration" },
  { key: "tools", label: "Tools & permissions" },
  { key: "usage", label: "API usage" },
];

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  return { title: AGENT_META[key as AgentKey]?.name ?? "Agent" };
}

export default async function AgentPage({ params, searchParams }: { params: Promise<{ key: string }>; searchParams: Promise<{ tab?: string }> }) {
  const auth = await requireAuth();
  const { key } = await params;
  const sp = await searchParams;
  if (!AGENT_KEYS.includes(key as AgentKey)) notFound();
  const k = key as AgentKey;
  const tab = TABS.some((t) => t.key === sp.tab) ? (sp.tab as string) : "overview";
  const orgId = auth.org.id;
  const [row] = await db()
    .select({ agent: schema.agents, config: schema.agentConfigurations })
    .from(schema.agents)
    .innerJoin(schema.agentConfigurations, eq(schema.agentConfigurations.agentId, schema.agents.id))
    .where(and(eq(schema.agents.organizationId, orgId), eq(schema.agents.key, k)));
  if (!row) notFound();

  const [stats, cc] = await Promise.all([getAgentStats(orgId, 30), getCommandCenterState(orgId)]);
  const live = cc.agents.find((a) => a.key === k)!;
  const s = stats[k] ?? { completed: 0, failed: 0, running: 0, pending: 0, waiting: 0, avgMs: null, cost: 0 };
  const total = s.completed + s.failed;
  const meta = AGENT_META[k];
  const caps = AGENT_CAPABILITIES[k];
  const st = AGENT_STATUS[live.status];
  const canAdmin = hasRole(auth.role, "admin");
  const cfg = row.config;
  const t = schema.agentTasks;

  // Each tab loads only what it shows.
  const tasks =
    tab === "history" || tab === "overview"
      ? await db()
          .select({ task: t, business: schema.businesses.name })
          .from(t)
          .leftJoin(schema.businesses, eq(schema.businesses.id, t.businessId))
          .where(and(eq(t.organizationId, orgId), eq(t.agentKey, k), ...(tab === "overview" ? [eq(t.status, "RUNNING")] : [])))
          .orderBy(desc(t.createdAt))
          .limit(tab === "overview" ? 5 : 60)
      : [];
  const activity = tab === "logs" ? await getActivity(orgId, 60, undefined, { agent: k }) : [];
  const usage =
    tab === "usage"
      ? ((await db().execute(sql`
          SELECT provider, operation, model, count(*) AS calls, sum(input_tokens) AS input_tokens, sum(output_tokens) AS output_tokens, coalesce(sum(cost_usd), 0) AS cost
          FROM api_usage WHERE organization_id = ${orgId} AND agent_key = ${k} AND NOT is_mock AND created_at > now() - interval '30 days'
          GROUP BY provider, operation, model ORDER BY cost DESC`)) as unknown as { provider: string; operation: string; model: string | null; calls: string; input_tokens: string; output_tokens: string; cost: string }[])
      : [];
  const pct = live.progress ? Math.round((live.progress.done / live.progress.total) * 100) : null;

  return (
    <>
      <Link href="/agents" className="mb-3 inline-flex h-9 items-center gap-1.5 text-[13px] text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> AI Agents
      </Link>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3.5">
          <AgentMascot agent={k} status={live.status} size={84} className="-my-2" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[24px] font-semibold leading-tight tracking-tight">{meta.name}</h1>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] font-medium", st.pill)}>
                <span className={cn("h-1.5 w-1.5 rounded-full", st.dot, st.pulse && "animate-pulse-dot")} />
                {st.label}
              </span>
            </div>
            <p className="mt-1 max-w-2xl text-[13.5px] leading-relaxed text-muted">{meta.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <AgentToggle agentKey={k} enabled={row.agent.enabled} canAdmin={canAdmin} />
          <TestAgentButton agentKey={k} />
          <Button asChild>
            <Link href={`/terminal?agent=${k}`}>
              <SquareTerminal /> Logs
            </Link>
          </Button>
        </div>
      </div>

      <LinkTabs tabs={TABS} current={tab} href={(key) => `/agents/${k}${key === "overview" ? "" : `?tab=${key}`}`} />

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
            <StatCard label="Queued" value={s.pending} sub={`${s.waiting} waiting for approval`} tone="neutral" />
            <StatCard label="Completed" value={s.completed} sub="Last 30 days" tone="success" />
            <StatCard label="Failed" value={s.failed} sub="Last 30 days" tone={s.failed ? "danger" : "neutral"} />
            <StatCard label="Success rate" value={total ? `${Math.round((s.completed / total) * 100)}%` : "—"} tone="neutral" help="Completed tasks divided by all finished tasks in the last 30 days." />
            <StatCard label="Average time" value={formatDuration(s.avgMs)} sub="Per task" tone="neutral" />
            <StatCard label="API cost" value={formatUsd(live.cost30d)} sub={`${live.apiCalls30d} paid call(s), 30 days`} tone="warning" />
          </div>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Current execution</CardTitle>
                <CardDescription>{live.status === "running" ? "Confirmed by a live worker." : st.explain}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-[13.5px] text-muted">
                  Not working on anything right now.{live.operation ? ` Last activity ${timeAgo(live.operationAt)}: ${live.operation}` : ""}
                </p>
              ) : (
                tasks.map(({ task, business }) => (
                  <div key={task.id} className="rounded-xl border border-[rgba(0,255,120,0.25)] bg-accent-soft p-3">
                    <p className="text-[13.5px] font-medium">
                      {task.type.replace(/_/g, " ")}
                      {business ? ` — ${business}` : ""}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-muted">
                      Started {timeAgo(task.startedAt)} · attempt {task.attempts}/{task.maxAttempts}
                      {live.objective ? ` · objective: ${live.objective}` : ""}
                    </p>
                  </div>
                ))
              )}
              {pct != null && (
                <div>
                  <div className="mb-1.5 flex justify-between text-[12.5px]">
                    <span className="text-muted">Progress in the current run</span>
                    <span className="tabular text-accent">
                      {live.progress!.done}/{live.progress!.total} · {pct}%
                    </span>
                  </div>
                  <Progress value={pct} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "history" && (
        <Table>
          <THead>
            <tr>
              <TH>Task</TH>
              <TH>Business</TH>
              <TH>Status</TH>
              <TH className="text-right">Attempts</TH>
              <TH className="text-right">Duration</TH>
              <TH className="text-right">Cost</TH>
              <TH>Started</TH>
              <TH />
            </tr>
          </THead>
          <tbody>
            {tasks.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[13px] text-muted">
                  This agent has not run a task yet.
                </td>
              </tr>
            )}
            {tasks.map(({ task, business }) => (
              <TR key={task.id}>
                <TD>
                  <span className="font-medium">{task.type.replace(/_/g, " ")}</span>
                  {(task.error?.message || task.waitingReason) && <p className={cn("max-w-xs truncate text-[12px]", task.error ? "text-danger" : "text-warning")}>{task.error?.message ?? task.waitingReason}</p>}
                </TD>
                <TD className="max-w-[180px] truncate text-muted">{business ?? "—"}</TD>
                <TD>
                  <StatusBadge status={task.status} />
                </TD>
                <TD className="tabular text-right">
                  {task.attempts}/{task.maxAttempts}
                </TD>
                <TD className="tabular text-right text-muted">{task.startedAt && task.completedAt ? formatDuration(task.completedAt.getTime() - task.startedAt.getTime()) : "—"}</TD>
                <TD className="tabular text-right text-muted">{formatUsd(task.costUsd)}</TD>
                <TD className="whitespace-nowrap text-muted">{timeAgo(task.startedAt ?? task.createdAt)}</TD>
                <TD>
                  <TaskActions taskId={task.id} status={task.status} />
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      )}

      {tab === "logs" && <ActivityFeed initial={activity} agent={k} height={620} />}

      {tab === "config" && (
        <Card className="max-w-3xl">
          <CardHeader>
            <div>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Version {cfg.version}. Changes apply to the next task this agent starts.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AgentConfigForm
              agentKey={k}
              canAdmin={canAdmin}
              usesLlm={LLM_AGENTS.includes(k)}
              models={[...SUPPORTED_MODELS]}
              config={{ instructions: cfg.instructions, model: cfg.model ?? "claude-opus-5-5", effort: cfg.effort, temperature: cfg.temperature, concurrency: cfg.concurrency, maxTasksPerRun: cfg.maxTasksPerRun, dailySpendLimitUsd: cfg.dailySpendLimitUsd, maxRetries: cfg.maxRetries }}
            />
          </CardContent>
        </Card>
      )}

      {tab === "tools" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Tools this agent uses</CardTitle>
                <CardDescription>It cannot reach anything that is not on this list.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {caps.tools.map((x) => (
                  <li key={x.name} className="rounded-xl border border-border p-3">
                    <p className="text-[13.5px] font-medium">{x.name}</p>
                    <p className="text-[12.5px] leading-snug text-muted">{x.about}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-1.5 text-[12.5px] font-medium text-muted">Allowed</p>
                <ul className="space-y-1.5">
                  {caps.can.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-[13.5px]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1.5 text-[12.5px] font-medium text-muted">Never allowed</p>
                <ul className="space-y-1.5">
                  {caps.cannot.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-[13.5px]">
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
              {caps.approval && (
                <p className="flex items-start gap-2 rounded-xl border border-[rgba(255,191,71,0.25)] bg-warning-soft px-3 py-2.5 text-[13px] leading-relaxed text-warning">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> {caps.approval}
                </p>
              )}
              <p className="text-[12.5px] leading-relaxed text-subtle">These rules are built into the system and enforced on the server. They cannot be changed from the instructions.</p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "usage" && (
        <>
          <p className="mb-3 text-[13px] text-muted">
            Paid API calls by this agent in the last 30 days. Total: <span className="tabular font-medium text-foreground">{formatUsd(live.cost30d)}</span>
            {cfg.dailySpendLimitUsd != null && <> · daily limit {formatUsd(cfg.dailySpendLimitUsd)}</>}
          </p>
          <Table>
            <THead>
              <tr>
                <TH>Service</TH>
                <TH>Operation</TH>
                <TH>Model</TH>
                <TH className="text-right">Calls</TH>
                <TH className="text-right">Tokens in</TH>
                <TH className="text-right">Tokens out</TH>
                <TH className="text-right">Cost</TH>
              </tr>
            </THead>
            <tbody>
              {usage.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[13px] text-muted">
                    No paid API calls recorded for this agent in the last 30 days.
                  </td>
                </tr>
              )}
              {usage.map((u, i) => (
                <TR key={i}>
                  <TD>{u.provider}</TD>
                  <TD className="text-muted">{u.operation.replace(/_/g, " ")}</TD>
                  <TD className="text-muted">{u.model ?? "—"}</TD>
                  <TD className="tabular text-right">{Number(u.calls)}</TD>
                  <TD className="tabular text-right text-muted">{Number(u.input_tokens).toLocaleString("en-US")}</TD>
                  <TD className="tabular text-right text-muted">{Number(u.output_tokens).toLocaleString("en-US")}</TD>
                  <TD className="tabular text-right">{formatUsd(Number(u.cost))}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
