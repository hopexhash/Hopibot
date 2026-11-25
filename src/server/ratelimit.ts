import "./guard";
import { redis, withTimeout } from "./redis";

export class RateLimitError extends Error {
  constructor(public retryAfterSeconds: number) {
    super(`Too many requests. Try again in ${retryAfterSeconds}s.`);
  }
}

const memory = new Map<string, { count: number; resetAt: number }>();

/**
 * Fixed-window rate limiter backed by Redis, with an in-memory fallback so a Redis
 * outage degrades protection to per-process instead of failing every request.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<void> {
  const bucket = `rl:${key}:${Math.floor(Date.now() / 1000 / windowSeconds)}`;
  try {
    const r = redis();
    if (r.status !== "ready") throw new Error("redis not ready");
    const count = await withTimeout(r.incr(bucket), 1000);
    if (count === 1) void r.expire(bucket, windowSeconds).catch(() => {});
    if (count > limit) throw new RateLimitError(windowSeconds);
    return;
  } catch (err) {
    if (err instanceof RateLimitError) throw err;
  }
  const now = Date.now();
  const entry = memory.get(bucket);
  if (!entry || entry.resetAt < now) {
    memory.set(bucket, { count: 1, resetAt: now + windowSeconds * 1000 });
    return;
  }
  entry.count += 1;
  if (entry.count > limit) throw new RateLimitError(windowSeconds);
}
