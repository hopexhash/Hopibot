import "../guard";
import { and, count, countDistinct, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { db, schema } from "../db";
import { createTask, notify, writeLog } from "./tasks";
import { MARKET_NAMES } from "@/lib/markets";

export const discoveryParamsSchema = z.object({
  country: z.enum(MARKET_NAMES).default("Netherlands"),
  city: z.string().trim().min(1).max(80),
  category: z.enum(BUSINESS_CATEGORIES.map((c) => c.key) as [string, ...string[]]),
  radiusKm: z.number().min(1).max(50).default(10),
  limit: z.number().int().min(1).max(200).default(20),
  minScore: z.number().int().min(0).max(100).default(60),
  keywords: z.string().trim().max(120).optional().default(""),
  businessName: z.string().trim().max(120).optional().default(""),
  websiteStatus: z.enum(["any", "no_website", "has_website"]).default("any"),
});
export type DiscoveryParams = z.infer<typeof discoveryParamsSchema>;

export const planSchema = z.object({
  summary: z.string().max(500),
  discovery: discoveryParamsSchema.nullable(),
  topN: z.number().int().min(0).max(200).default(10),
  actions: z.array(z.enum(["research", "contacts", "generate_website", "qc", "deploy", "sales_email", "notify"])).default([]),
  businessIds: z.array(z.string().uuid()).optional(),
});
export type RunPlan = z.infer<typeof planSchema>;

/** Starts a run: either discovery-first, or a pipeline over explicit businesses. */
export async function startRun(opts: {
  organizationId: string;
  plan: RunPlan;
  objective?: string | null;
  workflowId?: string | null;
  createdBy?: string | null;
  campaignId?: string | null;
  isMock?: boolean;
}) {
  const plan = planSchema.parse(opts.plan);
  const [run] = await db()
    .insert(schema.workflowRuns)
    .values({
      organizationId: opts.organizationId,
      workflowId: opts.workflowId ?? null,
      objective: opts.objective ?? null,
      plan,
      status: "RUNNING",
      startedAt: new Date(),
      createdBy: opts.createdBy ?? null,
      isMock: opts.isMock ?? false,
    })
    .returning();
  await writeLog(opts.organizationId, { runId: run.id, agentKey: "orchestrator", message: `Run started: ${plan.summary}` });

  if (plan.discovery) {
    await createTask(opts.organizationId, run.id, {
      agentKey: "lead_finder",
      type: "discover_leads",
      input: { params: plan.discovery, topN: plan.topN, actions: plan.actions, campaignId: opts.campaignId ?? null },
      idempotencyKey: `${run.id}:discover`,
      priority: 3,
    });
  } else if (plan.businessIds?.length && plan.actions.length) {
    const { ACTION_TASK } = await import("./pipeline");
    const [first, ...rest] = plan.actions.filter((a) => a !== "notify");
    const mapping = ACTION_TASK[first as keyof typeof ACTION_TASK];
    for (const businessId of plan.businessIds) {
      await createTask(opts.organizationId, run.id, {
        agentKey: mapping.agentKey,
        type: mapping.type,
        businessId,
        input: { next: [...rest, ...(plan.actions.includes("notify") ? ["notify"] : [])] },
        idempotencyKey: `${run.id}:${first}:${businessId}:0`,
      });
    }
  }
  return run;
}

/** Recomputes a run's status after any of its tasks changes; writes the final report. */
export async function refreshRunStatus(runId: string) {
  const rows = await db()
    .select({ status: schema.agentTasks.status, agentKey: schema.agentTasks.agentKey, n: count(), cost: sql<string>`coalesce(sum(${schema.agentTasks.costUsd}),0)` })
    .from(schema.agentTasks)
    .where(eq(schema.agentTasks.runId, runId))
    .groupBy(schema.agentTasks.status, schema.agentTasks.agentKey);
  const [run] = await db().select().from(schema.workflowRuns).where(eq(schema.workflowRuns.id, runId));
  if (!run || run.status === "CANCELLED") return;

  const by = (s: string) => rows.filter((r) => r.status === s).reduce((a, r) => a + r.n, 0);
  const active = by("PENDING") + by("RUNNING");
  const waiting = by("WAITING_FOR_APPROVAL");
  if (active > 0) {
    if (run.status !== "RUNNING") await db().update(schema.workflowRuns).set({ status: "RUNNING" }).where(eq(schema.workflowRuns.id, runId));
    return;
  }
  const perAgent: Record<string, Record<string, number>> = {};
  for (const r of rows) {
    perAgent[r.agentKey] ??= {};
    perAgent[r.agentKey][r.status] = (perAgent[r.agentKey][r.status] ?? 0) + r.n;
  }
  const totalCost = rows.reduce((a, r) => a + Number(r.cost), 0);
  const [websites] = await db()
    .select({ n: countDistinct(schema.websiteProjects.id) })
    .from(schema.websiteProjects)
    .innerJoin(schema.agentTasks, eq(schema.agentTasks.projectId, schema.websiteProjects.id))
    .where(and(eq(schema.agentTasks.runId, runId), eq(schema.websiteProjects.status, "ready")));
  const report = {
    tasks: { completed: by("COMPLETED"), failed: by("FAILED"), waitingForApproval: waiting, cancelled: by("CANCELLED") },
    perAgent,
    websitesReady: websites?.n ?? 0,
    totalCostUsd: Number(totalCost.toFixed(4)),
    finishedAt: new Date().toISOString(),
  };
  const status = waiting > 0 ? "WAITING_FOR_APPROVAL" : by("COMPLETED") === 0 && by("FAILED") > 0 ? "FAILED" : "COMPLETED";
  const changed = run.status !== status;
  await db()
    .update(schema.workflowRuns)
    .set({ status, report, completedAt: status === "WAITING_FOR_APPROVAL" ? null : new Date() })
    .where(eq(schema.workflowRuns.id, runId));
  if (changed && status !== "WAITING_FOR_APPROVAL") {
    await writeLog(run.organizationId, { runId, agentKey: "orchestrator", message: `Run ${status.toLowerCase()}`, data: report });
    await notify(
      run.organizationId,
      status === "COMPLETED" ? "An objective finished" : "An objective failed",
      `${run.objective ? `${run.objective.slice(0, 120)} — ` : ""}${report.tasks.completed} tasks completed, ${report.tasks.failed} failed · $${report.totalCostUsd.toFixed(2)}`,
      `/automations/runs/${runId}`,
      status === "COMPLETED" ? "success" : "error",
    );
  }
}

export async function cancelRun(organizationId: string, runId: string) {
  await db()
    .update(schema.agentTasks)
    .set({ status: "CANCELLED", completedAt: new Date() })
    .where(
      and(
        eq(schema.agentTasks.organizationId, organizationId),
        eq(schema.agentTasks.runId, runId),
        inArray(schema.agentTasks.status, ["PENDING", "WAITING_FOR_APPROVAL", "FAILED"]),
      ),
    );
  await db()
    .update(schema.workflowRuns)
    .set({ status: "CANCELLED", completedAt: new Date() })
    .where(and(eq(schema.workflowRuns.id, runId), eq(schema.workflowRuns.organizationId, organizationId)));
}
