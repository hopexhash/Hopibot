import "./guard";
import { randomUUID } from "node:crypto";
import os from "node:os";
import { sql } from "drizzle-orm";
import type { Redis } from "ioredis";
import { AGENT_KEYS, type AgentKey, type RuntimeKey } from "@/lib/constants";
import { INTEGRATIONS, type IntegrationKey } from "@/lib/integrations-meta";
import { db, schema } from "./db";
import { getCredential, mockModeAllowed } from "./integrations/credentials";
import { redis, withTimeout } from "./redis";
import { eq } from "drizzle-orm";

export const WORKER_ID = `${os.hostname()}-${process.pid}-${randomUUID().slice(0, 6)}`;
const HEARTBEAT_TTL = 45;

export type WorkerBeat = { id: string; host: string; agents: RuntimeKey[]; startedAt: string; at: string };

export async function publishHeartbeat(r: Redis, info: { agents: RuntimeKey[]; startedAt: string }) {
  const beat: WorkerBeat = { id: WORKER_ID, host: os.hostname(), agents: info.agents, startedAt: info.startedAt, at: new Date().toISOString() };
  await r.set(`agencyos:worker:${WORKER_ID}`, JSON.stringify(beat), "EX", HEARTBEAT_TTL);
}

/** Live workers = heartbeats that have not expired (published every 15 s, TTL 45 s). */
export async function liveWorkers(): Promise<{ ok: boolean; workers: WorkerBeat[]; covered: AgentKey[]; error?: string }> {
  try {
    const r = redis();
    const keys: string[] = [];
    let cursor = "0";
    do {
      const [next, batch] = await withTimeout(r.scan(cursor, "MATCH", "agencyos:worker:*", "COUNT", 100));
      cursor = next;
      keys.push(...batch);
    } while (cursor !== "0" && keys.length < 500);
    const raw = keys.length ? await withTimeout(r.mget(...keys)) : [];
    const workers = raw.filter(Boolean).map((v) => JSON.parse(v!) as WorkerBeat);
    const covered = AGENT_KEYS.filter((a) => workers.some((w) => w.agents.includes(a)));
    return { ok: true, workers, covered };
  } catch (err) {
    return { ok: false, workers: [], covered: [], error: (err as Error).message };
  }
}

async function timed<T>(fn: () => Promise<T>, timeoutMs = 3000): Promise<{ ok: boolean; ms: number; error?: string }> {
  const started = Date.now();
  try {
    await Promise.race([fn(), new Promise((_, rej) => setTimeout(() => rej(new Error("timed out")), timeoutMs))]);
    return { ok: true, ms: Date.now() - started };
  } catch (err) {
    return { ok: false, ms: Date.now() - started, error: (err as Error).message };
  }
}

export type HealthState = "operational" | "connected" | "degraded" | "offline" | "error" | "untested" | "mock" | "not_configured";
export type HealthCheck = { key: string; label: string; state: HealthState; detail: string; latencyMs?: number };

/**
 * Real health checks. Infrastructure is pinged live; third-party APIs report their last
 * real connection test (re-run them from Integrations) — they are never assumed healthy.
 */
export async function systemHealth(organizationId: string): Promise<{ checks: HealthCheck[]; workers: Awaited<ReturnType<typeof liveWorkers>> }> {
  const [database, cache, workers] = await Promise.all([timed(() => db().execute(sql`select 1`)), timed(() => redis().ping()), liveWorkers()]);
  const checks: HealthCheck[] = [
    { key: "api", label: "Backend API", state: "operational", detail: "Responding" },
    { key: "database", label: "Database", state: database.ok ? "connected" : "error", detail: database.ok ? `${database.ms} ms` : (database.error ?? "Unreachable"), latencyMs: database.ms },
    { key: "redis", label: "Redis", state: cache.ok ? "connected" : "error", detail: cache.ok ? `${cache.ms} ms` : (cache.error ?? "Unreachable"), latencyMs: cache.ms },
    {
      key: "workers",
      label: "Workers",
      state: !workers.ok ? "error" : workers.covered.length === AGENT_KEYS.length ? "operational" : workers.covered.length ? "degraded" : "offline",
      detail: `${workers.covered.length}/${AGENT_KEYS.length} agents online · ${workers.workers.length} process${workers.workers.length === 1 ? "" : "es"}`,
    },
  ];
  const rows = await db().select().from(schema.integrationCredentials).where(eq(schema.integrationCredentials.organizationId, organizationId));
  const show: IntegrationKey[] = ["anthropic", "google_maps", "hunter", "pexels", "unsplash", "vercel", "github", "resend", "stripe"];
  for (const key of show) {
    const meta = INTEGRATIONS.find((i) => i.key === key)!;
    const cred = await getCredential(organizationId, key);
    const row = rows.find((r) => r.provider === key);
    let state: HealthState;
    let detail: string;
    if (!cred.secret) {
      state = mockModeAllowed() ? "mock" : "not_configured";
      detail = mockModeAllowed() ? "Mock mode (development)" : "Not configured";
    } else if (row?.status === "connected") {
      state = "connected";
      detail = row.lastSuccessAt ? `Last success ${row.lastSuccessAt.toISOString().slice(0, 16).replace("T", " ")}` : "Connected";
    } else if (row?.status === "error") {
      state = "error";
      detail = row.lastError ?? "Last test failed";
    } else {
      state = "untested";
      detail = "Key saved — run a connection test";
    }
    checks.push({ key, label: meta.name.replace("Google Maps Places", "Google Places").replace("Anthropic Claude", "Claude API"), state, detail });
  }
  return { checks, workers };
}
