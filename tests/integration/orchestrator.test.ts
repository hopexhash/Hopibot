import { and, eq } from "drizzle-orm";
import postgres from "postgres";
import { afterAll, describe, expect, it } from "vitest";
import { closeDb, db, schema } from "@/server/db";
import { executeTask } from "@/server/orchestrator/executor";
import { recoverTasks } from "@/server/orchestrator/recovery";
import { refreshRunStatus, startRun } from "@/server/orchestrator/runs";
import { claimTask } from "@/server/orchestrator/state-machine";
import { createTask } from "@/server/orchestrator/tasks";
import { closeQcBrowser } from "@/server/qc/run-qc";
import { canConnect, makeOrg } from "./helpers";

const ok = await canConnect();

/** Drains PENDING tasks of a run by executing them directly (no queue needed). */
async function drain(orgId: string, max = 80) {
  for (let i = 0; i < max; i++) {
    const pending = await db()
      .select()
      .from(schema.agentTasks)
      .where(and(eq(schema.agentTasks.organizationId, orgId), eq(schema.agentTasks.status, "PENDING")));
    if (!pending.length) return i;
    for (const t of pending) {
      await db().update(schema.agentTasks).set({ scheduledAt: new Date(0) }).where(eq(schema.agentTasks.id, t.id));
      await executeTask(t.id);
    }
  }
  throw new Error("Pipeline did not settle");
}

describe.skipIf(!ok)("orchestrator (Postgres + Redis)", () => {
  afterAll(async () => {
    await closeQcBrowser();
    await closeDb();
  });

  it("creates tasks idempotently", async () => {
    const { org } = await makeOrg();
    const spec = { agentKey: "research" as const, type: "research_business", idempotencyKey: "same-key", input: {} };
    const a = await createTask(org.id, null, spec, { enqueue: false });
    const b = await createTask(org.id, null, spec, { enqueue: false });
    expect(a.created).toBe(true);
    expect(b.created).toBe(false);
    expect(b.task.id).toBe(a.task.id);
    // maxAttempts defaults to the agent's configured retry limit + 1
    expect(a.task.maxAttempts).toBe(4);
  });

  it("lets exactly one worker claim a task (compare-and-set)", async () => {
    const { org } = await makeOrg();
    const { task } = await createTask(org.id, null, { agentKey: "research", type: "x", idempotencyKey: "race", input: {} }, { enqueue: false });
    const results = await Promise.all(Array.from({ length: 8 }, () => claimTask(task.id)));
    expect(results.filter(Boolean)).toHaveLength(1);
    const [row] = await db().select().from(schema.agentTasks).where(eq(schema.agentTasks.id, task.id));
    expect(row.status).toBe("RUNNING");
    expect(row.attempts).toBe(1);
  });

  it("recovers tasks orphaned by a crashed worker", async () => {
    const { org } = await makeOrg();
    const { task } = await createTask(org.id, null, { agentKey: "research", type: "x", idempotencyKey: "crash", input: {} }, { enqueue: false });
    await claimTask(task.id);
    await db().update(schema.agentTasks).set({ heartbeatAt: new Date(Date.now() - 10 * 60_000) }).where(eq(schema.agentTasks.id, task.id));
    await recoverTasks();
    const [row] = await db().select().from(schema.agentTasks).where(eq(schema.agentTasks.id, task.id));
    expect(row.status).toBe("PENDING");
    expect(row.error?.code).toBe("STALE");
  });

  it("pauses paid agents when the spending limit is reached", async () => {
    const { org } = await makeOrg("Budget Agency", { dailySpendLimitUsd: 1 });
    await db().insert(schema.apiUsage).values({ organizationId: org.id, provider: "anthropic", operation: "test", costUsd: 2 });
    const { task } = await createTask(org.id, null, { agentKey: "lead_finder", type: "discover_leads", idempotencyKey: "budget", input: {} }, { enqueue: false });
    await executeTask(task.id);
    const [row] = await db().select().from(schema.agentTasks).where(eq(schema.agentTasks.id, task.id));
    expect(row.status).toBe("WAITING_FOR_APPROVAL");
    expect(row.waitingReason).toBe("BUDGET_EXCEEDED");
    const approvals = await db().select().from(schema.approvals).where(eq(schema.approvals.subjectId, task.id));
    expect(approvals[0]?.kind).toBe("budget_override");
  });

  it("parks tasks for disabled agents instead of running them", async () => {
    const { org } = await makeOrg();
    await db().update(schema.agents).set({ enabled: false }).where(and(eq(schema.agents.organizationId, org.id), eq(schema.agents.key, "research")));
    const { task } = await createTask(org.id, null, { agentKey: "research", type: "research_business", idempotencyKey: "disabled", input: {} }, { enqueue: false });
    await executeTask(task.id);
    const [row] = await db().select().from(schema.agentTasks).where(eq(schema.agentTasks.id, task.id));
    expect(row.status).toBe("WAITING_FOR_APPROVAL");
    expect(row.waitingReason).toBe("AGENT_DISABLED");
  });

  it("runs the full objective pipeline end to end (mock integrations, real QC)", async () => {
    const { org } = await makeOrg("Pipeline Agency", { agencyName: "Pipeline Agency" });
    const run = await startRun({
      organizationId: org.id,
      objective: "Find 6 restaurants in Rotterdam and build previews for the best 2",
      plan: {
        summary: "test",
        discovery: { country: "Netherlands", city: "Rotterdam", category: "restaurant", radiusKm: 5, limit: 6, minScore: 30, keywords: "", businessName: "", websiteStatus: "any" },
        topN: 2,
        actions: ["research", "contacts", "generate_website", "qc", "deploy", "sales_email"],
      },
    });
    await drain(org.id);
    await refreshRunStatus(run.id);
    const [r] = await db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.id, run.id));
    expect(r.status).toBe("COMPLETED");
    const businesses = await db().select().from(schema.businesses).where(eq(schema.businesses.organizationId, org.id));
    expect(businesses.length).toBe(6);
    expect(businesses.every((b) => b.isMock)).toBe(true);
    const projects = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.organizationId, org.id));
    expect(projects).toHaveLength(2);
    expect(projects.every((p) => p.status === "ready" && (p.qualityScore ?? 0) >= 85)).toBe(true);
    const deps = await db().select().from(schema.deployments).where(eq(schema.deployments.organizationId, org.id));
    expect(deps.filter((d) => d.status === "ready")).toHaveLength(2);
    const emails = await db().select().from(schema.salesEmails).where(eq(schema.salesEmails.organizationId, org.id));
    const intros = emails.filter((e) => e.kind === "intro");
    expect(intros).toHaveLength(2);
    // Nothing was sent; mock recipients are blocked.
    expect(intros.every((e) => e.status === "awaiting_approval" && e.blockedReason)).toBe(true);
    expect(intros.every((e) => e.bodyText.includes(e.unsubscribeToken))).toBe(true);
    // Re-running the same discovery skips known businesses (it may find new ones) — never duplicates.
    await startRun({
      organizationId: org.id,
      plan: { summary: "again", discovery: { country: "Netherlands", city: "Rotterdam", category: "restaurant", radiusKm: 5, limit: 6, minScore: 30, keywords: "", businessName: "", websiteStatus: "any" }, topN: 0, actions: [] },
    });
    await drain(org.id);
    const after = await db().select().from(schema.businesses).where(eq(schema.businesses.organizationId, org.id));
    expect(new Set(after.map((x) => x.googlePlaceId)).size).toBe(after.length);
    expect(new Set(after.map((x) => x.dedupeKey)).size).toBe(after.length);
    const dupLog = await db().select().from(schema.agentTasks).where(and(eq(schema.agentTasks.organizationId, org.id), eq(schema.agentTasks.agentKey, "lead_finder")));
    expect(dupLog.some((t) => Number((t.output as { duplicates?: number } | null)?.duplicates ?? 0) >= 6)).toBe(true);
  });

  it("isolates organisations with row-level security", async () => {
    const a = await makeOrg("Org A");
    const b = await makeOrg("Org B");
    for (const o of [a, b]) {
      await db().insert(schema.businesses).values({ organizationId: o.org.id, name: `Biz of ${o.org.name}`, category: "restaurant", dedupeKey: `k-${o.org.id}` });
    }
    const sql = postgres(process.env.DATABASE_URL!, { max: 1, onnotice: () => {} });
    try {
      // Mirror Supabase: table privileges are granted broadly, then secrets are revoked (as in the RLS migration).
      await sql`GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO authenticated`;
      await sql`REVOKE ALL ON public.sessions, public.integration_credentials FROM anon, authenticated`;
      const rows = await sql.begin(async (tx) => {
        await tx`SET LOCAL ROLE authenticated`;
        await tx`SELECT set_config('request.jwt.claim.sub', ${a.user.id}, true)`;
        return tx`SELECT name, organization_id FROM businesses`;
      });
      expect(rows.length).toBeGreaterThan(0);
      expect(rows.every((r) => r.organization_id === a.org.id)).toBe(true);
      // Writing into another organisation is rejected by the policy.
      await expect(
        sql.begin(async (tx) => {
          await tx`SET LOCAL ROLE authenticated`;
          await tx`SELECT set_config('request.jwt.claim.sub', ${a.user.id}, true)`;
          await tx`INSERT INTO businesses (organization_id, name, category, dedupe_key) VALUES (${b.org.id}, 'intrusion', 'restaurant', 'x')`;
        }),
      ).rejects.toThrow(/row-level security/);
      // Secrets are never readable through the client role.
      await expect(
        sql.begin(async (tx) => {
          await tx`SET LOCAL ROLE authenticated`;
          await tx`SELECT * FROM integration_credentials`;
        }),
      ).rejects.toThrow(/permission denied/);
    } finally {
      await sql.end();
    }
  });
});
