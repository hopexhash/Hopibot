import "../guard";
import { and, count, eq, inArray, sql } from "drizzle-orm";
import { PIPELINE_STAGES, type PipelineStage } from "@/lib/constants";
import { db, schema } from "../db";
import { enqueue } from "./queue";
import type { TaskRow, TaskSpec } from "./types";

export async function writeLog(
  organizationId: string,
  entry: { taskId?: string | null; runId?: string | null; agentKey: string; level?: string; message: string; data?: Record<string, unknown> },
) {
  await db()
    .insert(schema.agentLogs)
    .values({
      organizationId,
      taskId: entry.taskId ?? null,
      runId: entry.runId ?? null,
      agentKey: entry.agentKey,
      level: entry.level ?? "info",
      message: entry.message.slice(0, 2000),
      data: entry.data ?? null,
    });
}

async function dependenciesMet(dependsOn: string[]) {
  if (dependsOn.length === 0) return true;
  const [row] = await db()
    .select({ n: count() })
    .from(schema.agentTasks)
    .where(and(inArray(schema.agentTasks.id, dependsOn), eq(schema.agentTasks.status, "COMPLETED")));
  return row.n === dependsOn.length;
}

/**
 * Idempotent task creation. If a task with the same idempotency key exists, it is returned
 * unchanged (no duplicate execution). New tasks are enqueued once their dependencies are met.
 */
export async function createTask(
  organizationId: string,
  runId: string | null,
  spec: TaskSpec,
  opts: { enqueue?: boolean } = {},
): Promise<{ task: TaskRow; created: boolean }> {
  const scheduledAt = new Date(Date.now() + (spec.delayMs ?? 0));
  // Attempts default to the agent's configured retry limit (+1 for the first attempt).
  let maxAttempts = spec.maxAttempts;
  if (maxAttempts == null) {
    const [cfg] = await db()
      .select({ maxRetries: schema.agentConfigurations.maxRetries })
      .from(schema.agentConfigurations)
      .innerJoin(schema.agents, eq(schema.agents.id, schema.agentConfigurations.agentId))
      .where(and(eq(schema.agents.organizationId, organizationId), eq(schema.agents.key, spec.agentKey)));
    maxAttempts = (cfg?.maxRetries ?? 2) + 1;
  }
  const [inserted] = await db()
    .insert(schema.agentTasks)
    .values({
      organizationId,
      runId,
      agentKey: spec.agentKey,
      type: spec.type,
      businessId: spec.businessId ?? null,
      projectId: spec.projectId ?? null,
      input: spec.input ?? {},
      dependsOn: spec.dependsOn ?? [],
      idempotencyKey: spec.idempotencyKey,
      priority: spec.priority ?? 5,
      maxAttempts,
      scheduledAt,
    })
    .onConflictDoNothing({ target: [schema.agentTasks.organizationId, schema.agentTasks.idempotencyKey] })
    .returning();
  if (!inserted) {
    const [existing] = await db()
      .select()
      .from(schema.agentTasks)
      .where(and(eq(schema.agentTasks.organizationId, organizationId), eq(schema.agentTasks.idempotencyKey, spec.idempotencyKey)));
    return { task: existing, created: false };
  }
  if (opts.enqueue !== false && (await dependenciesMet(inserted.dependsOn))) {
    await safeEnqueue(inserted);
  }
  return { task: inserted, created: true };
}

/** Enqueue failures (Redis down) are logged; the recovery sweeper re-enqueues later. */
export async function safeEnqueue(task: TaskRow) {
  try {
    await enqueue(task);
  } catch (err) {
    await writeLog(task.organizationId, {
      taskId: task.id,
      runId: task.runId,
      agentKey: task.agentKey,
      level: "warn",
      message: `Queue unavailable, task will be dispatched by the recovery sweeper: ${(err as Error).message}`,
    });
  }
}

/** After a task completes, enqueue dependents whose dependencies are now all complete. */
export async function promoteDependents(task: TaskRow) {
  const dependents = await db()
    .select()
    .from(schema.agentTasks)
    .where(and(eq(schema.agentTasks.status, "PENDING"), sql`${task.id} = ANY(${schema.agentTasks.dependsOn})`));
  for (const d of dependents) {
    if (await dependenciesMet(d.dependsOn)) await safeEnqueue(d);
  }
}

const STAGE_RANK = Object.fromEntries(PIPELINE_STAGES.map((s, i) => [s.key, i])) as Record<PipelineStage, number>;
const STICKY: PipelineStage[] = ["REPLIED", "NEGOTIATION", "WON", "LOST"];

/** Moves a business forward in the pipeline; never moves it backwards or out of a human-managed stage. */
export async function advanceStage(businessId: string, stage: PipelineStage, organizationId: string) {
  const [b] = await db()
    .select({ stage: schema.businesses.pipelineStage })
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, organizationId)));
  if (!b) return;
  const current = b.stage as PipelineStage;
  if (STICKY.includes(current) || STAGE_RANK[current] >= STAGE_RANK[stage]) return;
  await db().update(schema.businesses).set({ pipelineStage: stage, updatedAt: new Date() }).where(eq(schema.businesses.id, businessId));
  await db()
    .insert(schema.crmActivities)
    .values({
      organizationId,
      businessId,
      type: "stage_change",
      content: `Stage changed from ${current} to ${stage}`,
      metadata: { from: current, to: stage, automated: true },
    });
}

export async function notify(organizationId: string, title: string, body?: string, href?: string) {
  await db().insert(schema.notifications).values({ organizationId, title, body, href });
}
