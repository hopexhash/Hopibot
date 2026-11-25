import { sql } from "drizzle-orm";
import { db } from "@/server/db";
import { redisHealthy } from "@/server/redis";

export const dynamic = "force-dynamic";

/** Liveness/readiness probe for load balancers and uptime monitoring. */
export async function GET() {
  const started = Date.now();
  let database = { ok: false, error: undefined as string | undefined };
  try {
    await db().execute(sql`select 1`);
    database = { ok: true, error: undefined };
  } catch (err) {
    database = { ok: false, error: (err as Error).message };
  }
  const redis = await redisHealthy();
  const ok = database.ok && redis.ok;
  return Response.json({ ok, database, redis, latencyMs: Date.now() - started }, { status: ok ? 200 : 503, headers: { "Cache-Control": "no-store" } });
}
