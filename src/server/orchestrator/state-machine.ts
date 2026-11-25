import "../guard";
import { and, eq, inArray, sql } from "drizzle-orm";
import type { TaskStatus } from "@/lib/constants";
import { db, schema } from "../db";

/** Allowed task transitions. Anything else is a programming error. */
export const TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  PENDING: ["RUNNING", "WAITING_FOR_APPROVAL", "CANCELLED"],
  RUNNING: ["COMPLETED", "FAILED", "WAITING_FOR_APPROVAL", "PENDING", "CANCELLED"],
  WAITING_FOR_APPROVAL: ["PENDING", "CANCELLED", "COMPLETED"],
  FAILED: ["PENDING", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

export function canTransition(from: TaskStatus, to: TaskStatus) {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

export const TERMINAL: TaskStatus[] = ["COMPLETED", "FAILED", "CANCELLED"];

type TaskRow = typeof schema.agentTasks.$inferSelect;
type Patch = Partial<Omit<TaskRow, "id" | "organizationId" | "status">>;

/**
 * Compare-and-set transition: only succeeds if the task is currently in one of `from`.
 * Returns the updated row, or null if another worker changed it first.
 */
export async function transitionTask(taskId: string, from: TaskStatus | TaskStatus[], to: TaskStatus, patch: Patch = {}) {
  const fromList = Array.isArray(from) ? from : [from];
  for (const f of fromList) {
    if (!canTransition(f, to)) throw new Error(`Illegal task transition ${f} → ${to}`);
  }
  const [row] = await db()
    .update(schema.agentTasks)
    .set({ ...patch, status: to })
    .where(and(eq(schema.agentTasks.id, taskId), inArray(schema.agentTasks.status, fromList)))
    .returning();
  return row ?? null;
}

/** PENDING → RUNNING, incrementing attempts atomically. */
export async function claimTask(taskId: string) {
  const now = new Date();
  const [row] = await db()
    .update(schema.agentTasks)
    .set({
      status: "RUNNING",
      attempts: sql`${schema.agentTasks.attempts} + 1`,
      startedAt: now,
      heartbeatAt: now,
      error: null,
      waitingReason: null,
    })
    .where(and(eq(schema.agentTasks.id, taskId), eq(schema.agentTasks.status, "PENDING")))
    .returning();
  return row ?? null;
}

export function backoffMs(attempt: number) {
  // 15s, 60s, 4m, 16m … capped at 1h, with ±20% jitter.
  const base = Math.min(15_000 * 4 ** Math.max(0, attempt - 1), 3_600_000);
  return Math.round(base * (0.8 + Math.random() * 0.4));
}
