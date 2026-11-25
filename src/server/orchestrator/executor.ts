import "../guard";
import { and, count, eq } from "drizzle-orm";
import { AGENT_META, type AgentKey, type RuntimeKey } from "@/lib/constants";
import { AgentError } from "../integrations/anthropic";
import { IntegrationUnavailableError, integrationMode } from "../integrations/credentials";
import { checkBudget } from "../costs/usage";
import { db, schema } from "../db";
import { getOrgSettings } from "../org";
import { backoffMs, claimTask, transitionTask } from "./state-machine";
import { createTask, notify, promoteDependents, safeEnqueue, writeLog } from "./tasks";
import { refreshRunStatus } from "./runs";
import { createApproval, resumeTask } from "./control";
import { AGENT_PAID, type AgentContext, type AgentHandler, type TaskRow } from "./types";

let handlers: Record<RuntimeKey, AgentHandler> | null = null;
async function getHandler(agent: RuntimeKey): Promise<AgentHandler> {
  if (!handlers) handlers = (await import("../agents")).AGENT_HANDLERS;
  return handlers[agent];
}

async function loadAgent(organizationId: string, agentKey: string) {
  const [row] = await db()
    .select({ agent: schema.agents, config: schema.agentConfigurations })
    .from(schema.agents)
    .innerJoin(schema.agentConfigurations, eq(schema.agentConfigurations.agentId, schema.agents.id))
    .where(and(eq(schema.agents.organizationId, organizationId), eq(schema.agents.key, agentKey)));
  return row ?? null;
}

async function park(task: TaskRow, reason: string, message: string, approval?: Parameters<typeof createApproval>[1]) {
  await transitionTask(task.id, ["PENDING", "RUNNING"], "WAITING_FOR_APPROVAL", { waitingReason: reason });
  await writeLog(task.organizationId, { taskId: task.id, runId: task.runId, agentKey: task.agentKey, level: "warn", message });
  if (approval) await createApproval(task, approval);
  if (task.runId) await refreshRunStatus(task.runId);
}

/**
 * Executes a single task. Safe to call more than once for the same task id: only the
 * caller that wins the PENDING → RUNNING compare-and-set actually runs the agent.
 */
export async function executeTask(taskId: string): Promise<"ran" | "skipped" | "deferred"> {
  const [task] = await db().select().from(schema.agentTasks).where(eq(schema.agentTasks.id, taskId));
  if (!task || task.status !== "PENDING") return "skipped";
  if (task.scheduledAt.getTime() > Date.now() + 1000) return "deferred";
  const agentKey = task.agentKey as RuntimeKey;

  const loaded = await loadAgent(task.organizationId, agentKey);
  if (!loaded) {
    await transitionTask(task.id, "PENDING", "CANCELLED", { error: { message: "Agent not configured for organisation" } });
    return "skipped";
  }
  if (!loaded.agent.enabled) {
    await park(task, "AGENT_DISABLED", `${loaded.agent.name} is disabled; task will resume when it is enabled.`);
    return "deferred";
  }

  // Per-organisation concurrency for this agent.
  const [{ n: running }] = await db()
    .select({ n: count() })
    .from(schema.agentTasks)
    .where(and(eq(schema.agentTasks.organizationId, task.organizationId), eq(schema.agentTasks.agentKey, agentKey), eq(schema.agentTasks.status, "RUNNING")));
  if (running >= loaded.config.concurrency) {
    const [rescheduled] = await db()
      .update(schema.agentTasks)
      .set({ scheduledAt: new Date(Date.now() + 5000 + Math.random() * 5000) })
      .where(and(eq(schema.agentTasks.id, task.id), eq(schema.agentTasks.status, "PENDING")))
      .returning();
    if (rescheduled) await safeEnqueue(rescheduled);
    return "deferred";
  }

  if (AGENT_PAID[agentKey]) {
    const budget = await checkBudget(task.organizationId, agentKey);
    if (!budget.ok) {
      await park(task, "BUDGET_EXCEEDED", `Paused: ${budget.reason}`, {
        kind: "budget_override",
        subjectType: "agent_task",
        subjectId: task.id,
        summary: `${loaded.agent.name} paused: ${budget.reason}`,
        payload: { budget },
      });
      return "deferred";
    }
  }

  const claimed = await claimTask(task.id);
  if (!claimed) return "skipped";

  const settings = await getOrgSettings(task.organizationId);
  const log: AgentContext["log"] = (level, message, data) =>
    writeLog(task.organizationId, { taskId: task.id, runId: task.runId, agentKey, level, message, data });

  const heartbeat = async () => {
    await db().update(schema.agentTasks).set({ heartbeatAt: new Date() }).where(eq(schema.agentTasks.id, task.id));
  };
  const hb = setInterval(() => void heartbeat().catch(() => {}), 15_000);

  const ctx: AgentContext = {
    task: claimed,
    organizationId: task.organizationId,
    settings,
    config: loaded.config,
    usage: { organizationId: task.organizationId, agentKey, taskId: task.id, businessId: task.businessId, projectId: task.projectId },
    log,
    heartbeat,
    mode: (provider) => integrationMode(task.organizationId, provider),
    spawn: async (spec) => {
      if (task.runId) {
        const [run] = await db().select({ status: schema.workflowRuns.status }).from(schema.workflowRuns).where(eq(schema.workflowRuns.id, task.runId));
        if (run?.status === "CANCELLED") {
          await log("info", `Run cancelled; not starting ${spec.agentKey}.`);
          return null;
        }
        const [cfg] = await db()
          .select({ limit: schema.agentConfigurations.maxTasksPerRun })
          .from(schema.agentConfigurations)
          .innerJoin(schema.agents, eq(schema.agents.id, schema.agentConfigurations.agentId))
          .where(and(eq(schema.agents.organizationId, task.organizationId), eq(schema.agents.key, spec.agentKey)));
        const [{ n }] = await db()
          .select({ n: count() })
          .from(schema.agentTasks)
          .where(and(eq(schema.agentTasks.runId, task.runId), eq(schema.agentTasks.agentKey, spec.agentKey)));
        if (cfg && n >= cfg.limit) {
          await log("warn", `Execution limit reached: ${spec.agentKey} already has ${n}/${cfg.limit} tasks in this run.`);
          return null;
        }
      }
      const { task: created, created: isNew } = await createTask(task.organizationId, task.runId, spec);
      if (isNew) await log("debug", `Scheduled ${spec.agentKey} → ${spec.type}`, { taskId: created.id });
      return created;
    },
  };

  const started = Date.now();
  await log("info", `Started ${claimed.type} (attempt ${claimed.attempts}/${claimed.maxAttempts})`);
  try {
    const handler = await getHandler(agentKey);
    const result = await handler(ctx);
    if (result.status === "waiting_for_approval") {
      await transitionTask(task.id, "RUNNING", "WAITING_FOR_APPROVAL", { output: result.output ?? null, waitingReason: result.reason });
      if (result.approval) await createApproval(claimed, result.approval);
      await log("info", `Waiting for approval: ${result.reason}`);
    } else {
      const done = await transitionTask(task.id, "RUNNING", "COMPLETED", { output: result.output, completedAt: new Date() });
      await log("info", `Completed in ${((Date.now() - started) / 1000).toFixed(1)}s`);
      if (done) await promoteDependents(done);
    }
  } catch (err) {
    const e = err as Error;
    const retryable =
      err instanceof AgentError ? err.retryable : err instanceof IntegrationUnavailableError ? false : !(e as { code?: string }).code?.startsWith("SSRF");
    const code = (err as { code?: string }).code ?? "ERROR";
    const canRetry = retryable && claimed.attempts < claimed.maxAttempts;
    await log(canRetry ? "warn" : "error", `${canRetry ? "Attempt failed, will retry" : "Failed"}: ${e.message}`, { code });
    if (canRetry) {
      const next = await transitionTask(task.id, "RUNNING", "PENDING", {
        error: { message: e.message, code, retryable },
        scheduledAt: new Date(Date.now() + backoffMs(claimed.attempts)),
      });
      if (next) await safeEnqueue(next);
    } else {
      await transitionTask(task.id, "RUNNING", "FAILED", { error: { message: e.message, code, retryable }, completedAt: new Date() });
      await onTaskFailed(claimed, e.message);
    }
  } finally {
    clearInterval(hb);
  }
  if (task.runId) await refreshRunStatus(task.runId);
  return "ran";
}

async function onTaskFailed(task: TaskRow, message: string) {
  if (task.agentKey === "research" && task.businessId) {
    await db().update(schema.businesses).set({ researchStatus: "failed" }).where(eq(schema.businesses.id, task.businessId));
  }
  if (task.projectId && ["website_builder", "quality_control"].includes(task.agentKey)) {
    await db().update(schema.websiteProjects).set({ status: "failed", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, task.projectId));
  }
  const name = AGENT_META[task.agentKey as AgentKey]?.name ?? (task.agentKey === "custom" ? String((task.input as { customAgentName?: string }).customAgentName ?? "Custom agent") : task.agentKey);
  await notify(task.organizationId, `${name} failed`, `${task.type.replace(/_/g, " ")}: ${message}`, "/tasks?status=FAILED", "error");
}

export { createTask, createApproval, resumeTask };
