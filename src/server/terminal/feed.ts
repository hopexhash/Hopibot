import "../guard";
import { sql } from "drizzle-orm";
import { db } from "../db";

export const TERMINAL_TABS = ["system", "agents", "executions", "api", "errors", "security"] as const;
export type TerminalTab = (typeof TERMINAL_TABS)[number];
export type FeedLine = { key: string; at: string; tag: string; level: "info" | "warn" | "error" | "ok"; text: string };

type Row = Record<string, unknown>;
const iso = (v: unknown) => new Date(v as string).toISOString();

/**
 * Real records for one terminal tab, oldest first. `since` (ISO time) returns only newer
 * rows so the client can stream. Nothing here is synthesised: each line is one database row.
 */
export async function getFeed(orgId: string, tab: TerminalTab, opts: { since?: string; agent?: string; q?: string; limit?: number } = {}): Promise<FeedLine[]> {
  const limit = Math.min(Math.max(opts.limit ?? 150, 1), 500);
  const since = opts.since && !Number.isNaN(Date.parse(opts.since)) ? new Date(opts.since).toISOString() : null;
  const like = opts.q ? `%${opts.q.slice(0, 80).replace(/[\\%_]/g, "\\$&")}%` : null;
  const run = async (query: ReturnType<typeof sql>) => ((await db().execute(query)) as unknown as Row[]).reverse();

  if (tab === "system" || tab === "agents" || tab === "errors") {
    const rows = await run(sql`
      SELECT id, agent_key, level, message, created_at FROM agent_logs
      WHERE organization_id = ${orgId}
        AND ${tab === "errors" ? sql`level = 'error'` : sql`level IN ('info','warn','error')`}
        ${tab === "system" ? sql`AND agent_key = 'orchestrator'` : sql``}
        ${tab === "agents" ? sql`AND agent_key <> 'orchestrator'` : sql``}
        ${opts.agent && tab !== "system" ? sql`AND agent_key = ${opts.agent}` : sql``}
        ${since ? sql`AND created_at > ${since}::timestamptz` : sql``}
        ${like ? sql`AND message ILIKE ${like}` : sql``}
      ORDER BY id DESC LIMIT ${limit}`);
    return rows.map((r) => ({ key: `l${r.id}`, at: iso(r.created_at), tag: String(r.agent_key), level: r.level === "error" ? "error" : r.level === "warn" ? "warn" : "info", text: String(r.message) }));
  }

  if (tab === "executions") {
    // One line per task state change that the database records (latest change wins).
    const rows = await run(sql`
      SELECT id, agent_key, type, status, attempts, max_attempts, cost_usd, error, waiting_reason,
        coalesce(completed_at, heartbeat_at, started_at, created_at) AS at,
        extract(epoch FROM (completed_at - started_at)) AS seconds
      FROM agent_tasks
      WHERE organization_id = ${orgId}
        ${opts.agent ? sql`AND agent_key = ${opts.agent}` : sql``}
        ${since ? sql`AND coalesce(completed_at, heartbeat_at, started_at, created_at) > ${since}::timestamptz` : sql``}
        ${like ? sql`AND type ILIKE ${like}` : sql``}
      ORDER BY coalesce(completed_at, heartbeat_at, started_at, created_at) DESC LIMIT ${limit}`);
    return rows.map((r) => {
      const status = String(r.status);
      const err = (r.error as { message?: string } | null)?.message;
      const tail = status === "COMPLETED" ? `${Number(r.seconds ?? 0).toFixed(1)}s · $${Number(r.cost_usd ?? 0).toFixed(4)}` : status === "FAILED" ? (err ?? "failed") : status === "WAITING_FOR_APPROVAL" ? String(r.waiting_reason ?? "waiting") : `attempt ${r.attempts}/${r.max_attempts}`;
      return {
        key: `t${r.id}:${status}:${r.at}`,
        at: iso(r.at),
        tag: String(r.agent_key),
        level: status === "FAILED" ? "error" : status === "COMPLETED" ? "ok" : status === "WAITING_FOR_APPROVAL" ? "warn" : "info",
        text: `${String(r.type).padEnd(22)} ${status.padEnd(21)} ${tail}`,
      };
    });
  }

  if (tab === "api") {
    const rows = await run(sql`
      SELECT id, provider, operation, model, input_tokens, output_tokens, cache_read_tokens, cost_usd, agent_key, is_mock, created_at
      FROM api_usage
      WHERE organization_id = ${orgId}
        ${opts.agent ? sql`AND agent_key = ${opts.agent}` : sql``}
        ${since ? sql`AND created_at > ${since}::timestamptz` : sql``}
        ${like ? sql`AND (operation ILIKE ${like} OR provider ILIKE ${like})` : sql``}
      ORDER BY created_at DESC LIMIT ${limit}`);
    return rows.map((r) => {
      const tokens = Number(r.input_tokens) || Number(r.output_tokens) ? ` in=${r.input_tokens} out=${r.output_tokens}${Number(r.cache_read_tokens) ? ` cached=${r.cache_read_tokens}` : ""}` : "";
      return { key: `u${r.id}`, at: iso(r.created_at), tag: String(r.provider), level: "info", text: `${String(r.operation).slice(0, 40).padEnd(26)} ${r.model ? `${r.model} ` : ""}${tokens} ${r.is_mock ? "MOCK $0" : `$${Number(r.cost_usd).toFixed(4)}`}${r.agent_key ? `  (${r.agent_key})` : ""}`.replace(/\s+$/, "") };
    });
  }

  // security: the audit trail (sign-ins, approvals, configuration changes, server errors)
  const rows = await run(sql`
    SELECT a.id, a.action, a.target_type, a.target_id, a.ip, a.created_at, u.email, a.metadata->>'message' AS message
    FROM audit_logs a LEFT JOIN users u ON u.id = a.user_id
    WHERE (a.organization_id = ${orgId} OR (a.organization_id IS NULL AND a.action = 'system.error'))
      ${since ? sql`AND a.created_at > ${since}::timestamptz` : sql``}
      ${like ? sql`AND a.action ILIKE ${like}` : sql``}
    ORDER BY a.id DESC LIMIT ${limit}`);
  return rows.map((r) => {
    const action = String(r.action);
    return {
      key: `a${r.id}`,
      at: iso(r.created_at),
      tag: action.split(".")[0],
      level: /failed|error/.test(action) ? "error" : /reject|disable|stop|delete|remove/.test(action) ? "warn" : "info",
      text: `${action.padEnd(28)} ${r.email ?? "system"}${r.target_type ? `  → ${r.target_type}${r.target_id ? ` ${String(r.target_id).slice(0, 36)}` : ""}` : ""}${r.message ? `  ${String(r.message).split("\n")[0].slice(0, 120)}` : ""}${r.ip ? `  [${r.ip}]` : ""}`,
    };
  });
}
