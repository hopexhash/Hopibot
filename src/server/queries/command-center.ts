import "../guard";
import { sql } from "drizzle-orm";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { db } from "../db";
import { liveWorkers } from "../health";

type Row = Record<string, unknown>;
const n = (v: unknown) => Number(v ?? 0);

export type AgentLiveState = {
  key: AgentKey;
  name: string;
  enabled: boolean;
  /** A worker process with this agent has sent a heartbeat in the last 45 s. */
  online: boolean;
  /** Only "running" when a task is RUNNING with a fresh heartbeat (confirmed execution). */
  status: "running" | "queued" | "waiting" | "failed" | "idle" | "disabled" | "offline";
  running: number;
  pending: number;
  waiting: number;
  completed30d: number;
  failed30d: number;
  failedLastHour: number;
  operation: string | null;
  operationAt: string | null;
  runtimeStartedAt: string | null;
  /** Share of this agent's tasks finished in the active run (real counts), or null. */
  progress: { done: number; total: number } | null;
  model: string | null;
  /** Objective of the run the agent is working on right now (null when idle). */
  objective: string | null;
  runId: string | null;
  /** The task type and the business the agent is working on right now (null when idle). */
  taskType: string | null;
  subject: { id: string; name: string; url: string | null } | null;
  /** When this agent last finished a task (completed or failed), and how it ended. */
  lastFinishedAt: string | null;
  lastOutcome: "completed" | "failed" | null;
  /** Completed ÷ (completed + failed) over 30 days; null with no finished tasks. */
  successRate: number | null;
  /** Real API spend attributed to this agent in the last 30 days (USD, mock calls excluded). */
  cost30d: number;
  apiCalls30d: number;
};

export async function getCommandCenterState(orgId: string) {
  const [agentsRows, taskRows, opRows, progressRows, workers, currentRows, lastRows, costRows] = await Promise.all([
    db().execute(sql`
      SELECT a.key, a.enabled, c.model FROM agents a JOIN agent_configurations c ON c.agent_id = a.id WHERE a.organization_id = ${orgId}`) as unknown as Promise<Row[]>,
    db().execute(sql`
      SELECT agent_key,
        count(*) FILTER (WHERE status = 'RUNNING' AND heartbeat_at > now() - interval '2 minutes') AS running,
        count(*) FILTER (WHERE status = 'PENDING') AS pending,
        count(*) FILTER (WHERE status = 'WAITING_FOR_APPROVAL') AS waiting,
        count(*) FILTER (WHERE status = 'COMPLETED' AND created_at > now() - interval '30 days') AS completed,
        count(*) FILTER (WHERE status = 'FAILED' AND created_at > now() - interval '30 days') AS failed,
        count(*) FILTER (WHERE status = 'FAILED' AND completed_at > now() - interval '1 hour') AS failed_hour,
        min(started_at) FILTER (WHERE status = 'RUNNING' AND heartbeat_at > now() - interval '2 minutes') AS runtime_started
      FROM agent_tasks WHERE organization_id = ${orgId} GROUP BY agent_key`) as unknown as Promise<Row[]>,
    // Latest real log line per agent (current operation when running, last operation when idle).
    db().execute(sql`
      SELECT DISTINCT ON (agent_key) agent_key, message, created_at FROM agent_logs
      WHERE organization_id = ${orgId} AND level IN ('info','warn','error') AND agent_key <> 'orchestrator'
        AND created_at > now() - interval '7 days'
        AND message !~ '^(Started |Completed |Scheduled )'
      ORDER BY agent_key, id DESC`) as unknown as Promise<Row[]>,
    // Progress within runs that are currently active.
    db().execute(sql`
      SELECT t.agent_key, count(*) FILTER (WHERE t.status IN ('COMPLETED','FAILED','CANCELLED')) AS done, count(*) AS total
      FROM agent_tasks t JOIN workflow_runs r ON r.id = t.run_id
      WHERE t.organization_id = ${orgId} AND r.status = 'RUNNING'
      GROUP BY t.agent_key`) as unknown as Promise<Row[]>,
    liveWorkers(),
    // What each agent is working on right now.
    db().execute(sql`
      SELECT DISTINCT ON (t.agent_key) t.agent_key, r.objective, r.id AS run_id, t.type AS task_type, t.business_id, b.name AS business_name, b.website_url
      FROM agent_tasks t LEFT JOIN workflow_runs r ON r.id = t.run_id LEFT JOIN businesses b ON b.id = t.business_id AND b.erased_at IS NULL
      WHERE t.organization_id = ${orgId} AND t.status = 'RUNNING' AND t.heartbeat_at > now() - interval '2 minutes'
      ORDER BY t.agent_key, t.started_at DESC`) as unknown as Promise<Row[]>,
    // Most recently finished task per agent.
    db().execute(sql`
      SELECT DISTINCT ON (agent_key) agent_key, status, completed_at FROM agent_tasks
      WHERE organization_id = ${orgId} AND status IN ('COMPLETED','FAILED') AND completed_at IS NOT NULL
      ORDER BY agent_key, completed_at DESC`) as unknown as Promise<Row[]>,
    db().execute(sql`
      SELECT agent_key, coalesce(sum(cost_usd), 0) AS cost, count(*) AS calls FROM api_usage
      WHERE organization_id = ${orgId} AND NOT is_mock AND agent_key IS NOT NULL AND created_at > now() - interval '30 days'
      GROUP BY agent_key`) as unknown as Promise<Row[]>,
  ]);

  const agents: AgentLiveState[] = AGENT_KEYS.map((key) => {
    const a = agentsRows.find((r) => r.key === key);
    const t = taskRows.find((r) => r.agent_key === key) ?? {};
    const op = opRows.find((r) => r.agent_key === key);
    const p = progressRows.find((r) => r.agent_key === key);
    const enabled = Boolean(a?.enabled ?? true);
    const online = workers.covered.includes(key);
    const running = n(t.running);
    const pending = n(t.pending);
    const waiting = n(t.waiting);
    const cur = currentRows.find((r) => r.agent_key === key);
    const last = lastRows.find((r) => r.agent_key === key);
    const cost = costRows.find((r) => r.agent_key === key);
    const lastOutcome = last ? (last.status === "FAILED" ? ("failed" as const) : ("completed" as const)) : null;
    const finished = n(t.completed) + n(t.failed);
    // "failed" = the agent's most recent task failed and nothing has succeeded since.
    const status: AgentLiveState["status"] = !enabled
      ? "disabled"
      : running > 0
        ? "running"
        : !online
          ? "offline"
          : waiting > 0
            ? "waiting"
            : pending > 0
              ? "queued"
              : lastOutcome === "failed"
                ? "failed"
                : "idle";
    return {
      key,
      name: AGENT_META[key].name,
      enabled,
      online,
      status,
      running,
      pending,
      waiting,
      completed30d: n(t.completed),
      failed30d: n(t.failed),
      failedLastHour: n(t.failed_hour),
      operation: op ? String(op.message) : null,
      operationAt: op ? new Date(op.created_at as string).toISOString() : null,
      runtimeStartedAt: t.runtime_started ? new Date(t.runtime_started as string).toISOString() : null,
      progress: p && n(p.total) > 0 ? { done: n(p.done), total: n(p.total) } : null,
      model: a?.model ? String(a.model) : null,
      objective: cur?.objective ? String(cur.objective) : null,
      runId: cur?.run_id ? String(cur.run_id) : null,
      taskType: cur?.task_type ? String(cur.task_type) : null,
      subject: cur?.business_id && cur.business_name ? { id: String(cur.business_id), name: String(cur.business_name), url: cur.website_url ? String(cur.website_url) : null } : null,
      lastFinishedAt: last?.completed_at ? new Date(last.completed_at as string).toISOString() : null,
      lastOutcome,
      successRate: finished > 0 ? n(t.completed) / finished : null,
      cost30d: n(cost?.cost),
      apiCalls30d: n(cost?.calls),
    };
  });

  return {
    agents,
    workers: { ok: workers.ok, processes: workers.workers.length, online: workers.covered.length, total: AGENT_KEYS.length },
    activeAgents: agents.filter((a) => a.status === "running").length,
    waitingAgents: agents.filter((a) => a.status === "waiting").length,
    enabledAgents: agents.filter((a) => a.enabled).length,
    serverTime: new Date().toISOString(),
  };
}

export type CommandCenterState = Awaited<ReturnType<typeof getCommandCenterState>>;

export async function getLogs(orgId: string, opts: { after?: number; before?: number; agent?: string; q?: string; limit?: number; levels?: string[] }) {
  const limit = Math.min(Math.max(opts.limit ?? 100, 1), 5000);
  const levels = opts.levels ?? ["info", "warn", "error"];
  const rows = (await db().execute(sql`
    SELECT id, agent_key, level, message, created_at, task_id, run_id FROM agent_logs
    WHERE organization_id = ${orgId}
      AND level IN ${sql.raw(`(${levels.map((l) => `'${l.replace(/[^a-z]/g, "")}'`).join(",")})`)}
      ${opts.after ? sql`AND id > ${opts.after}` : sql``}
      ${opts.before ? sql`AND id < ${opts.before}` : sql``}
      ${opts.agent ? sql`AND agent_key = ${opts.agent}` : sql``}
      ${opts.q ? sql`AND message ILIKE ${`%${opts.q.replace(/[%_]/g, "\\$&")}%`}` : sql``}
    ORDER BY id DESC LIMIT ${limit}`)) as unknown as Row[];
  return rows.map((r) => ({
    id: n(r.id),
    agentKey: String(r.agent_key),
    level: String(r.level),
    message: String(r.message),
    createdAt: new Date(r.created_at as string).toISOString(),
    taskId: r.task_id ? String(r.task_id) : null,
    runId: r.run_id ? String(r.run_id) : null,
  }));
}
