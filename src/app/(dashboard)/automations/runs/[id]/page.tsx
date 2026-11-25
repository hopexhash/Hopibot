import { and, asc, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Card, CardContent, CardHeader, CardTitle, MockBadge } from "@/components/ui";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { formatDateTime, formatDuration, formatUsd } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { TaskActions } from "../../../agents/[key]/agent-controls";
import { CancelRunButton, RunAutoRefresh } from "./run-controls";

export const metadata = { title: "Run" };

export default async function RunPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const [run] = await db().select().from(schema.workflowRuns).where(and(eq(schema.workflowRuns.id, id), eq(schema.workflowRuns.organizationId, auth.org.id)));
  if (!run) notFound();
  const [tasks, logs] = await Promise.all([
    db()
      .select({ task: schema.agentTasks, business: schema.businesses.name })
      .from(schema.agentTasks)
      .leftJoin(schema.businesses, eq(schema.businesses.id, schema.agentTasks.businessId))
      .where(eq(schema.agentTasks.runId, run.id))
      .orderBy(asc(schema.agentTasks.createdAt)),
    db().select().from(schema.agentLogs).where(eq(schema.agentLogs.runId, run.id)).orderBy(desc(schema.agentLogs.id)).limit(80),
  ]);
  const plan = run.plan as { summary?: string; discovery?: Record<string, unknown> | null; topN?: number; actions?: string[] };
  const byBusiness = new Map<string, { name: string; tasks: typeof tasks }>();
  const general: typeof tasks = [];
  for (const t of tasks) {
    if (!t.task.businessId || t.task.agentKey === "lead_finder") general.push(t);
    else {
      const g = byBusiness.get(t.task.businessId) ?? { name: t.business ?? "Business", tasks: [] };
      g.tasks.push(t);
      byBusiness.set(t.task.businessId, g);
    }
  }
  const cost = tasks.reduce((s, t) => s + Number(t.task.costUsd), 0);
  const active = ["RUNNING", "PENDING"].includes(run.status) || tasks.some((t) => ["RUNNING", "PENDING"].includes(t.task.status));
  const done = tasks.filter((t) => t.task.status === "COMPLETED").length;

  const TaskPill = ({ t }: { t: (typeof tasks)[number] }) => (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: AGENT_META[t.task.agentKey as AgentKey]?.color }} />
      <Link href={`/agents/${t.task.agentKey}?task=${t.task.id}`} className="text-xs font-medium hover:text-accent">
        {t.task.type.replace(/_/g, " ")}
      </Link>
      <StatusBadge status={t.task.status} />
      {t.task.status === "FAILED" && <span className="max-w-[200px] truncate text-[12px] text-danger" title={t.task.error?.message}>{t.task.error?.message}</span>}
      {t.task.waitingReason && <span className="text-[12px] text-warning">{t.task.waitingReason}</span>}
      <TaskActions taskId={t.task.id} status={t.task.status} />
    </div>
  );

  return (
    <>
      <RunAutoRefresh active={active} />
      <PageHeader
        eyebrow={<Link href="/automations" className="hover:text-foreground">← Automations</Link>}
        title={
          <span className="flex items-center gap-2">
            {run.objective ?? plan.summary} {run.isMock && <MockBadge />}
          </span>
        }
        description={plan.summary}
        actions={
          <>
            <StatusBadge status={run.status} />
            {hasRole(auth.role, "admin") && !["COMPLETED", "CANCELLED", "FAILED"].includes(run.status) && <CancelRunButton runId={run.id} />}
          </>
        }
      />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Tasks completed" value={`${done}/${tasks.length}`} />
        <StatCard label="Businesses in pipeline" value={byBusiness.size} sub={plan.topN ? `Top ${plan.topN} planned` : undefined} />
        <StatCard label="Run cost" value={formatUsd(cost)} tone="warning" />
        <StatCard label="Duration" value={formatDuration((run.completedAt ?? new Date()).getTime() - (run.startedAt ?? run.createdAt).getTime())} sub={`Started ${formatDateTime(run.startedAt ?? run.createdAt)}`} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Plan</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-xs">
              {plan.discovery && (
                <Badge tone="accent">
                  Discover {String(plan.discovery.limit)} {String(plan.discovery.category)} in {String(plan.discovery.city)} (min score {String(plan.discovery.minScore)})
                </Badge>
              )}
              {(plan.actions ?? []).map((a) => (
                <Badge key={a} tone="neutral">
                  {a.replace("_", " ")}
                </Badge>
              ))}
            </CardContent>
          </Card>
          {general.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Discovery</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {general.map((t) => (
                  <TaskPill key={t.task.id} t={t} />
                ))}
              </CardContent>
            </Card>
          )}
          {[...byBusiness.entries()].map(([bid, g]) => (
            <Card key={bid}>
              <CardHeader>
                <Link href={`/businesses/${bid}`} className="text-[13px] font-semibold hover:text-accent">
                  {g.name}
                </Link>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-2">
                {g.tasks.map((t) => (
                  <TaskPill key={t.task.id} t={t} />
                ))}
              </CardContent>
            </Card>
          ))}
          {run.report && (
            <Card>
              <CardHeader>
                <CardTitle>Final report</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-x-auto rounded-lg bg-surface-2 p-3 text-[12px]">{JSON.stringify(run.report, null, 2)}</pre>
              </CardContent>
            </Card>
          )}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Run log</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="max-h-[70vh] space-y-1.5 overflow-y-auto text-xs">
              {logs.map((l) => (
                <li key={l.id} className="flex gap-2">
                  <span className="tabular shrink-0 text-subtle">{l.createdAt.toISOString().slice(11, 19)}</span>
                  <span className={l.level === "error" ? "text-danger" : l.level === "warn" ? "text-warning" : "text-muted"}>
                    <b className="font-medium text-foreground">{AGENT_META[l.agentKey as AgentKey]?.short ?? l.agentKey}</b> {l.message}
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
