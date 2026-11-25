import "../guard";
import { and, eq, isNull, ne, sql } from "drizzle-orm";
import { db, schema } from "../db";
import { createTask } from "../orchestrator/tasks";

/**
 * Businesses that were saved before the qualification engine existed have a website but no
 * decision. A few of them are inspected on every worker tick until none are left. Each
 * business is queued exactly once (idempotent key), so a failed inspection is not retried
 * forever.
 */
export async function backfillInspections(limit = 3) {
  const b = schema.businesses;
  const rows = await db()
    .select({ id: b.id, organizationId: b.organizationId })
    .from(b)
    .where(
      and(
        isNull(b.qualification),
        isNull(b.erasedAt),
        eq(b.websiteStatus, "has_website"),
        eq(b.isMock, false),
        ne(b.source, "manual"),
        sql`NOT EXISTS (SELECT 1 FROM agent_tasks t WHERE t.organization_id = ${b.organizationId} AND t.idempotency_key = 'inspect:' || ${b.id}::text || ':backfill')`,
      ),
    )
    .limit(limit);
  for (const r of rows) {
    await createTask(r.organizationId, null, { agentKey: "lead_finder", type: "inspect_website", businessId: r.id, input: {}, idempotencyKey: `inspect:${r.id}:backfill`, priority: 6, maxAttempts: 2 });
  }
  return rows.length;
}
