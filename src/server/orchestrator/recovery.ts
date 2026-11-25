import "../guard";
import { CronExpressionParser } from "cron-parser";
import { and, count, eq, gte, inArray, lt, lte, sql } from "drizzle-orm";
import { db, schema } from "../db";
import { startRun, discoveryParamsSchema, type RunPlan } from "./runs";
import { safeEnqueue, writeLog } from "./tasks";

const STALE_MS = 2 * 60_000;

/**
 * Makes workflows survive restarts. Postgres holds the truth; this re-derives the queue:
 *  1. RUNNING tasks whose heartbeat stopped (worker crashed) go back to PENDING, or FAILED
 *     when out of attempts.
 *  2. PENDING tasks that are due and whose dependencies are met are (re-)enqueued. Job ids
 *     are deterministic, so tasks that are already queued are not duplicated.
 */
export async function recoverTasks() {
  const staleBefore = new Date(Date.now() - STALE_MS);
  const stale = await db()
    .select()
    .from(schema.agentTasks)
    .where(and(eq(schema.agentTasks.status, "RUNNING"), lt(schema.agentTasks.heartbeatAt, staleBefore)))
    .limit(500);
  for (const t of stale) {
    const exhausted = t.attempts >= t.maxAttempts;
    const [row] = await db()
      .update(schema.agentTasks)
      .set(
        exhausted
          ? { status: "FAILED", completedAt: new Date(), error: { message: "Worker stopped while running the task (no heartbeat).", code: "STALE", retryable: false } }
          : { status: "PENDING", scheduledAt: new Date(), error: { message: "Recovered after worker restart.", code: "STALE", retryable: true } },
      )
      .where(and(eq(schema.agentTasks.id, t.id), eq(schema.agentTasks.status, "RUNNING"), lt(schema.agentTasks.heartbeatAt, staleBefore)))
      .returning();
    if (!row) continue;
    await writeLog(t.organizationId, {
      taskId: t.id,
      runId: t.runId,
      agentKey: t.agentKey,
      level: "warn",
      message: exhausted ? "Task failed: worker stopped and attempts are exhausted." : "Task recovered after worker interruption and re-queued.",
    });
  }

  const due = await db()
    .select()
    .from(schema.agentTasks)
    .where(
      and(
        eq(schema.agentTasks.status, "PENDING"),
        lte(schema.agentTasks.scheduledAt, new Date(Date.now() + 60_000)),
        sql`NOT EXISTS (
          SELECT 1 FROM agent_tasks d
          WHERE d.id = ANY(${schema.agentTasks.dependsOn}) AND d.status <> 'COMPLETED'
        )`,
      ),
    )
    .orderBy(schema.agentTasks.priority, schema.agentTasks.scheduledAt)
    .limit(2000);
  for (const t of due) await safeEnqueue(t);
  return { recovered: stale.length, enqueued: due.length };
}

/** Fires due scheduled workflows (scheduled discovery campaigns). */
export async function runScheduler() {
  const now = new Date();
  const due = await db()
    .select()
    .from(schema.workflows)
    .where(and(eq(schema.workflows.enabled, true), eq(schema.workflows.triggerType, "schedule"), lte(schema.workflows.nextRunAt, now)));
  for (const wf of due) {
    const cfg = wf.triggerConfig as { cron?: string; discovery?: unknown; topN?: number };
    const next = nextCronRun(cfg.cron ?? "0 8 * * 1");
    // Claim this firing atomically so two schedulers cannot both start it.
    const [claimed] = await db()
      .update(schema.workflows)
      .set({ nextRunAt: next, lastRunAt: now })
      .where(and(eq(schema.workflows.id, wf.id), lte(schema.workflows.nextRunAt, now)))
      .returning();
    if (!claimed) continue;
    if (!(await underDailyRunLimit(wf.id, wf.maxRunsPerDay))) {
      await writeLog(wf.organizationId, { agentKey: "orchestrator", level: "warn", message: `Workflow "${wf.name}" skipped: daily run limit reached.` });
      continue;
    }
    const discovery = discoveryParamsSchema.safeParse(cfg.discovery);
    if (!discovery.success) {
      await writeLog(wf.organizationId, { agentKey: "orchestrator", level: "error", message: `Workflow "${wf.name}" has invalid discovery settings.` });
      continue;
    }
    const steps = await workflowActions(wf.id);
    const plan: RunPlan = {
      summary: `Scheduled: ${wf.name}`,
      discovery: discovery.data,
      topN: cfg.topN ?? 10,
      actions: steps as RunPlan["actions"],
    };
    await startRun({ organizationId: wf.organizationId, plan, workflowId: wf.id, objective: `Scheduled workflow: ${wf.name}` });
  }
}

export function nextCronRun(expr: string, from = new Date()) {
  return CronExpressionParser.parse(expr, { currentDate: from, tz: "Europe/Amsterdam" }).next().toDate();
}

export async function workflowActions(workflowId: string) {
  const steps = await db()
    .select()
    .from(schema.workflowSteps)
    .where(and(eq(schema.workflowSteps.workflowId, workflowId), eq(schema.workflowSteps.enabled, true)))
    .orderBy(schema.workflowSteps.position);
  return steps.map((s) => s.action);
}

export async function underDailyRunLimit(workflowId: string, max: number) {
  const since = new Date(Date.now() - 86400_000);
  const [{ n }] = await db()
    .select({ n: count() })
    .from(schema.workflowRuns)
    .where(and(eq(schema.workflowRuns.workflowId, workflowId), gte(schema.workflowRuns.createdAt, since)));
  return n < max;
}

/** Fires "new qualified lead" workflows for a set of newly qualified businesses. */
export async function triggerQualifiedLeadWorkflows(organizationId: string, businessIds: string[]) {
  if (!businessIds.length) return 0;
  const wfs = await db()
    .select()
    .from(schema.workflows)
    .where(
      and(
        eq(schema.workflows.organizationId, organizationId),
        eq(schema.workflows.enabled, true),
        inArray(schema.workflows.triggerType, ["new_qualified_lead"]),
      ),
    );
  let started = 0;
  for (const wf of wfs) {
    if (!(await underDailyRunLimit(wf.id, wf.maxRunsPerDay))) continue;
    const actions = (await workflowActions(wf.id)) as RunPlan["actions"];
    if (!actions.length) continue;
    await startRun({
      organizationId,
      workflowId: wf.id,
      objective: `Automation: ${wf.name}`,
      plan: { summary: `${wf.name} for ${businessIds.length} qualified lead(s)`, discovery: null, topN: businessIds.length, actions, businessIds },
    });
    await db().update(schema.workflows).set({ lastRunAt: new Date() }).where(eq(schema.workflows.id, wf.id));
    started++;
  }
  return started;
}
