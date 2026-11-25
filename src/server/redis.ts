import "./guard";
import IORedis, { type Redis } from "ioredis";

const g = globalThis as unknown as { __agencyosRedis?: Redis };

/** BullMQ requires maxRetriesPerRequest: null on connections used by workers. */
export function createRedis(opts: { forWorker?: boolean } = {}): Redis {
  const url = process.env.REDIS_URL ?? "redis://localhost:6379";
  return new IORedis(url, {
    maxRetriesPerRequest: opts.forWorker ? null : 1,
    enableReadyCheck: true,
    lazyConnect: false,
    connectTimeout: 5000,
  });
}

/**
 * Shared connection for the web process (rate limiting, queue producer, health).
 * Never retries forever: an unreachable Redis must fail fast instead of hanging a page
 * render until the serverless function is killed.
 */
export function redis(): Redis {
  if (!g.__agencyosRedis) {
    g.__agencyosRedis = createRedis({ forWorker: false });
    // Errors are surfaced through health checks and the integrations page;
    // without a listener ioredis would log unhandled error events.
    g.__agencyosRedis.on("error", () => {});
  }
  return g.__agencyosRedis;
}

export async function redisHealthy(): Promise<{ ok: boolean; error?: string; latencyMs?: number }> {
  const started = Date.now();
  try {
    const pong = await Promise.race([
      redis().ping(),
      new Promise<string>((_, rej) => setTimeout(() => rej(new Error("Redis ping timed out")), 2000)),
    ]);
    return { ok: pong === "PONG", latencyMs: Date.now() - started };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/** Rejects if a Redis call has not settled within `ms` (web requests must never hang on Redis). */
export function withTimeout<T>(p: Promise<T>, ms = 2000, label = "Redis"): Promise<T> {
  let t: ReturnType<typeof setTimeout>;
  return Promise.race([
    p.finally(() => clearTimeout(t)),
    new Promise<T>((_, rej) => {
      t = setTimeout(() => rej(new Error(`${label} timed out after ${ms} ms`)), ms);
    }),
  ]);
}
