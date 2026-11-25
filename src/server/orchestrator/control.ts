import "../guard";
import { and, eq } from "drizzle-orm";
import { db, schema } from "../db";
import { refreshRunStatus } from "./runs";
import { transitionTask } from "./state-machine";
import { safeEnqueue, writeLog } from "./tasks";
import type { TaskRow } from "./types";

// Control-plane operations used by both the web app and the worker. Deliberately free of
// agent imports so the web bundle never pulls in Playwright or agent code.

export async function createApproval(
  task: TaskRow | null,
  a: { kind: string; subjectType: string; subjectId: string; summary: string; payload?: Record<string, unknown> },
  organizationId = task?.organizationId,
) {
  if (!organizationId) throw new Error("organizationId required");
  // One pending approval per subject+kind.
  const [existing] = await db()
    .select({ id: schema.approvals.id })
    .from(schema.approvals)
    .where(
      and(
        eq(schema.approvals.organizationId, organizationId),
        eq(schema.approvals.subjectId, a.subjectId),
        eq(schema.approvals.kind, a.kind),
        eq(schema.approvals.status, "pending"),
      ),
    );
  if (existing) return existing.id;
  const [row] = await db()
    .insert(schema.approvals)
    .values({ organizationId, taskId: task?.id ?? null, ...a, payload: a.payload ?? {} })
    .returning({ id: schema.approvals.id });
  return row.id;
}

/** Resume parked tasks (after approval, budget increase or enabling an agent). */
export async function resumeTask(organizationId: string, taskId: string) {
  const resumed = await transitionTask(taskId, ["WAITING_FOR_APPROVAL", "FAILED"], "PENDING", {
    waitingReason: null,
    scheduledAt: new Date(),
  });
  if (!resumed || resumed.organizationId !== organizationId) return null;
  // A manual retry of a task that exhausted its attempts gets one more attempt.
  if (resumed.attempts >= resumed.maxAttempts) {
    await db().update(schema.agentTasks).set({ maxAttempts: resumed.attempts + 1 }).where(eq(schema.agentTasks.id, taskId));
  }
  await writeLog(organizationId, { taskId, runId: resumed.runId, agentKey: resumed.agentKey, message: "Task resumed" });
  await safeEnqueue(resumed);
  if (resumed.runId) await refreshRunStatus(resumed.runId);
  return resumed;
}

