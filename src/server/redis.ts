import "./guard";
import IORedis, { type Redis } from "ioredis";

const g = globalThis as unknown as { __agencyosRedis?: Redis };

/** BullMQ requires maxRetriesPerRequest: null on connections used by workers. */
export function createRedis(opts: { forWorker?: boolean } = {}): Redis {
  const url = process.env.REDIS_URL ?? "redis://localhost:6379";
  return new IORedis(url, {
    maxRetriesPerRequest: opts.forWorker ? null : 2,
    enableReadyCheck: true,
    lazyConnect: false,
    connectTimeout: 5000,
  });
}

/** Shared connection for the web process (rate limiting, queue producer). */
export function redis(): Redis {
  if (!g.__agencyosRedis) {
    g.__agencyosRedis = createRedis({ forWorker: true });
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
