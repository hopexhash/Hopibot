import "../guard";
import { Queue } from "bullmq";
import { AGENT_KEYS, RUNTIME_KEYS, type RuntimeKey } from "@/lib/constants";
import { redis, withTimeout } from "../redis";

export type TaskJob = { taskId: string; organizationId: string };

export const queueName = (agent: RuntimeKey) => `agent-${agent}`;

const g = globalThis as unknown as { __agencyosQueues?: Map<RuntimeKey, Queue<TaskJob>> };

export function getQueue(agent: RuntimeKey): Queue<TaskJob> {
  if (!g.__agencyosQueues) g.__agencyosQueues = new Map();
  let q = g.__agencyosQueues.get(agent);
  if (!q) {
    q = new Queue<TaskJob>(queueName(agent), {
      connection: redis(),
      defaultJobOptions: {
        // Retries are owned by the orchestrator's state machine (stored in Postgres),
        // so BullMQ makes exactly one delivery attempt per job id.
        attempts: 1,
        removeOnComplete: { age: 24 * 3600, count: 5000 },
        removeOnFail: { age: 7 * 24 * 3600 },
      },
    });
    g.__agencyosQueues.set(agent, q);
  }
  return q;
}

export async function enqueue(task: {
  id: string;
  organizationId: string;
  agentKey: string;
  attempts: number;
  priority: number;
  scheduledAt: Date;
}) {
  const agent = task.agentKey as RuntimeKey;
  if (!RUNTIME_KEYS.includes(agent)) throw new Error(`Unknown agent ${task.agentKey}`);
  const delay = Math.max(0, task.scheduledAt.getTime() - Date.now());
  // Deterministic job id: re-enqueueing the same scheduling of a task is a no-op.
  const jobId = `${task.id}_${task.attempts}_${task.scheduledAt.getTime()}`;
  await withTimeout(getQueue(agent).add(agent, { taskId: task.id, organizationId: task.organizationId }, { jobId, delay, priority: task.priority }), 5000, "Queue");
}

export async function queueCounts() {
  const out: Record<string, Record<string, number>> = {};
  for (const a of AGENT_KEYS) {
    out[a] = await getQueue(a).getJobCounts("waiting", "active", "delayed", "failed", "completed");
  }
  return out;
}
