import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityFeed } from "@/components/app/activity-feed";
import { PageHeader, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { formatDuration, formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { SUPPORTED_MODELS } from "@/server/costs/pricing";
import { db, schema } from "@/server/db";
import { getAgentStats } from "@/server/queries/metrics";
import { AgentConfigForm, AgentToggle, TaskActions, TestAgentButton } from "./agent-controls";

const LLM_AGENTS: AgentKey[] = ["research", "website_builder", "sales"];

export default async function AgentPage({ params, searchParams }: { params: Promise<{ key: string }>; searchParams: Promise<{ task?: string }> }) {
  const auth = await requireAuth();
  const { key } = await params;
  const { task: taskId } = await searchParams;
  if (!AGENT_KEYS.includes(key as AgentKey)) notFound();
  const k = key as AgentKey;
  const [row] = await db()
    .select({ agent: schema.agents, config: schema.agentConfigurations })
    .from(schema.agents)
    .innerJoin(schema.agentConfigurations, eq(schema.agentConfigurations.agentId, schema.agents.id))
    .where(and(eq(schema.agents.organizationId, auth.org.id), eq(schema.agents.key, k)));
  if (!row) notFound();
  const [stats, tasks, logs] = await Promise.all([
    getAgentStats(auth.org.id, 30),
    db()
      .select({ task: schema.agentTasks, business: schema.businesses.name })
      .from(schema.agentTasks)
      .leftJoin(schema.businesses, eq(schema.businesses.id, schema.agentTasks.businessId))
      .where(and(eq(schema.agentTasks.organizationId, auth.org.id), eq(schema.agentTasks.agentKey, k)))
      .orderBy(desc(schema.agentTasks.createdAt))
      .limit(50),
    db()
      .select()
      .from(schema.agentLogs)
      .where(and(eq(schema.agentLogs.organizationId, auth.org.id), taskId && /^[0-9a-f-]{36}$/.test(taskId) ? eq(schema.agentLogs.taskId, taskId) : eq(schema.agentLogs.agentKey, k)))
      .orderBy(desc(schema.agentLogs.id))
      .limit(60),
  ]);
  const s = stats[k] ?? { completed: 0, failed: 0, running: 0, pending: 0, waiting: 0, avgMs: null, cost: 0 };
  const total = s.completed + s.failed;
  const meta = AGENT_META[k];
  const canAdmin = hasRole(auth.role, "admin");
  const cfg = row.config;

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/agents" className="hover:text-foreground">← AI Agents</Link>}
        title={meta.name}
        description={meta.description}
        actions={
          <>
            <AgentToggle agentKey={k} enabled={row.agent.enabled} canAdmin={canAdmin} />
            <TestAgentButton agentKey={k} />
          </>
        }
      />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Status" value={!row.agent.enabled ? "Disabled" : s.running ? "Working" : "Idle"} sub={`${s.pending} queued · ${s.waiting} waiting`} />
        <StatCard label="Tasks completed" value={s.completed} sub="Last 30 days" tone="success" />
        <StatCard label="Tasks failed" value={s.failed} tone="danger" />
        <StatCard label="Success rate" value={total ? `${Math.round((s.completed / total) * 100)}%` : "—"} />
        <StatCard label="Avg. execution time" value={formatDuration(s.avgMs)} />
        <StatCard label="API expenditure" value={formatUsd(s.cost)} tone="warning" />
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_420px]">
        <div className="min-w-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution history</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table className="rounded-none border-0 shadow-none">
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
                    <TR>
                      <TD colSpan={8} className="py-8 text-center text-xs text-muted">
                        No tasks yet.
                      </TD>
                    </TR>
                  )}
                  {tasks.map(({ task: t, business }) => (
                    <TR key={t.id} className={t.id === taskId ? "bg-accent-soft/40" : undefined}>
                      <TD>
                        <Link href={`/agents/${k}?task=${t.id}`} className="font-medium hover:text-accent">
                          {t.type.replace(/_/g, " ")}
                        </Link>
                        {(t.error?.message || t.waitingReason) && <p className="max-w-xs truncate text-[11px] text-danger">{t.waitingReason ?? t.error?.message}</p>}
                      </TD>
                      <TD className="max-w-[160px] truncate text-muted">{business ?? "—"}</TD>
                      <TD>
                        <StatusBadge status={t.status} />
                      </TD>
                      <TD className="tabular text-right">
                        {t.attempts}/{t.maxAttempts}
                      </TD>
                      <TD className="tabular text-right text-muted">{t.startedAt && t.completedAt ? formatDuration(t.completedAt.getTime() - t.startedAt.getTime()) : "—"}</TD>
                      <TD className="tabular text-right text-muted">{formatUsd(t.costUsd)}</TD>
                      <TD className="whitespace-nowrap text-muted">{timeAgo(t.startedAt ?? t.createdAt)}</TD>
                      <TD>
                        <TaskActions taskId={t.id} status={t.status} />
                      </TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{taskId ? "Task log" : "Execution console"}</CardTitle>
              {taskId && (
                <Link href={`/agents/${k}`} className="text-xs text-accent hover:underline">
                  Show all
                </Link>
              )}
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto rounded-lg bg-[#0d0d12] p-3 font-mono text-[11.5px] leading-relaxed text-[#c9c9d4]">
                {logs.length === 0 && <p className="text-[#6c6c78]">No log entries.</p>}
                {logs.map((l) => (
                  <div key={l.id} className="flex gap-2">
                    <span className="shrink-0 text-[#6c6c78]">{l.createdAt.toISOString().slice(11, 19)}</span>
                    <span className={l.level === "error" ? "text-[#f2626f]" : l.level === "warn" ? "text-[#f0b04a]" : l.level === "debug" ? "text-[#6c6c78]" : "text-[#3ccf7e]"}>{l.level.toUpperCase().padEnd(5)}</span>
                    <span className="min-w-0 whitespace-pre-wrap break-words">
                      {l.message}
                      {l.data ? <span className="text-[#6c6c78]"> {JSON.stringify(l.data).slice(0, 300)}</span> : null}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <span className="text-[11px] text-muted">v{cfg.version}</span>
            </CardHeader>
            <CardContent>
              <AgentConfigForm
                agentKey={k}
                canAdmin={canAdmin}
                usesLlm={LLM_AGENTS.includes(k)}
                models={[...SUPPORTED_MODELS]}
                config={{
                  instructions: cfg.instructions,
                  model: cfg.model ?? "claude-opus-5-5",
                  effort: cfg.effort,
                  temperature: cfg.temperature,
                  concurrency: cfg.concurrency,
                  maxTasksPerRun: cfg.maxTasksPerRun,
                  dailySpendLimitUsd: cfg.dailySpendLimitUsd,
                  maxRetries: cfg.maxRetries,
                }}
              />
            </CardContent>
          </Card>
          <Card className="p-5">
            <ActivityFeed initial={[]} agent={k} height={260} />
          </Card>
        </div>
      </div>
    </>
  );
}
