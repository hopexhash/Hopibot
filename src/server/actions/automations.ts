"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { CronExpressionParser } from "cron-parser";
import { db, schema } from "../db";
import { nextCronRun, underDailyRunLimit } from "../orchestrator/recovery";
import { discoveryParamsSchema, startRun, type RunPlan } from "../orchestrator/runs";
import { action, UserError } from "./_util";

const stepAction = z.enum(["research", "contacts", "generate_website", "qc", "deploy", "sales_email", "notify"]);

const workflowSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    description: z.string().trim().max(500).optional().default(""),
    triggerType: z.enum(["manual", "new_qualified_lead", "schedule"]),
    cron: z.string().trim().max(100).optional().default(""),
    discovery: discoveryParamsSchema.nullable().optional(),
    topN: z.number().int().min(0).max(200).default(10),
    maxRunsPerDay: z.number().int().min(1).max(500),
    enabled: z.boolean(),
    steps: z.array(z.object({ action: stepAction, enabled: z.boolean() })).min(1).max(10),
  })
  .superRefine((w, ctx) => {
    if (w.triggerType === "schedule") {
      try {
        CronExpressionParser.parse(w.cron || "");
      } catch {
        ctx.addIssue({ code: "custom", path: ["cron"], message: "Enter a valid cron expression, e.g. 0 8 * * 1 (Mondays 08:00)" });
      }
      if (!w.discovery) ctx.addIssue({ code: "custom", path: ["discovery"], message: "Scheduled campaigns need discovery settings." });
      else {
        // Guard against accidental runaway schedules: at most hourly.
        try {
          const it = CronExpressionParser.parse(w.cron || "0 8 * * 1");
          const a = it.next().toDate().getTime();
          const b = it.next().toDate().getTime();
          if (b - a < 3600_000) ctx.addIssue({ code: "custom", path: ["cron"], message: "Schedules can run at most once per hour." });
        } catch {
          /* reported above */
        }
      }
    }
  });

async function saveSteps(orgId: string, workflowId: string, steps: z.infer<typeof workflowSchema>["steps"]) {
  await db().delete(schema.workflowSteps).where(eq(schema.workflowSteps.workflowId, workflowId));
  await db()
    .insert(schema.workflowSteps)
    .values(steps.map((s, i) => ({ organizationId: orgId, workflowId, position: i, action: s.action, enabled: s.enabled })));
}

export async function saveWorkflowAction(id: string | null, input: unknown) {
  return action({ name: id ? "workflow.update" : "workflow.create", role: "admin", revalidate: ["/automations"] }, async (auth) => {
    const w = workflowSchema.parse(input);
    const values = {
      name: w.name,
      description: w.description,
      triggerType: w.triggerType,
      triggerConfig: { cron: w.cron, discovery: w.discovery ?? null, topN: w.topN },
      maxRunsPerDay: w.maxRunsPerDay,
      enabled: w.enabled,
      nextRunAt: w.triggerType === "schedule" && w.enabled ? nextCronRun(w.cron) : null,
      updatedAt: new Date(),
    };
    let workflowId = id;
    if (id) {
      const [existing] = await db().select({ id: schema.workflows.id }).from(schema.workflows).where(and(eq(schema.workflows.id, z.string().uuid().parse(id)), eq(schema.workflows.organizationId, auth.org.id)));
      if (!existing) throw new UserError("Workflow not found.");
      await db().update(schema.workflows).set(values).where(eq(schema.workflows.id, id));
    } else {
      const [created] = await db().insert(schema.workflows).values({ organizationId: auth.org.id, ...values }).returning({ id: schema.workflows.id });
      workflowId = created.id;
    }
    await saveSteps(auth.org.id, workflowId!, w.steps);
    return { id: workflowId! };
  });
}

export async function toggleWorkflowAction(id: string, enabled: boolean) {
  return action({ name: "workflow.toggle", role: "admin", revalidate: ["/automations"] }, async (auth) => {
    const [wf] = await db().select().from(schema.workflows).where(and(eq(schema.workflows.id, z.string().uuid().parse(id)), eq(schema.workflows.organizationId, auth.org.id)));
    if (!wf) throw new UserError("Workflow not found.");
    const cron = (wf.triggerConfig as { cron?: string }).cron;
    await db()
      .update(schema.workflows)
      .set({ enabled, nextRunAt: enabled && wf.triggerType === "schedule" && cron ? nextCronRun(cron) : null, updatedAt: new Date() })
      .where(eq(schema.workflows.id, wf.id));
    return null;
  });
}

export async function deleteWorkflowAction(id: string) {
  return action({ name: "workflow.delete", role: "admin", revalidate: ["/automations"] }, async (auth) => {
    await db().delete(schema.workflows).where(and(eq(schema.workflows.id, z.string().uuid().parse(id)), eq(schema.workflows.organizationId, auth.org.id)));
    return null;
  });
}

export async function runWorkflowNowAction(id: string) {
  return action({ name: "workflow.run_now", revalidate: ["/automations"], limit: 10 }, async (auth) => {
    const [wf] = await db().select().from(schema.workflows).where(and(eq(schema.workflows.id, z.string().uuid().parse(id)), eq(schema.workflows.organizationId, auth.org.id)));
    if (!wf) throw new UserError("Workflow not found.");
    if (!(await underDailyRunLimit(wf.id, wf.maxRunsPerDay))) throw new UserError(`Daily limit of ${wf.maxRunsPerDay} runs reached for this workflow.`);
    const cfg = wf.triggerConfig as { discovery?: unknown; topN?: number };
    const discovery = discoveryParamsSchema.safeParse(cfg.discovery);
    if (!discovery.success) throw new UserError("This workflow has no discovery settings. To run it on specific businesses, select them in Businesses → Run agents.");
    const steps = await db().select().from(schema.workflowSteps).where(and(eq(schema.workflowSteps.workflowId, wf.id), eq(schema.workflowSteps.enabled, true))).orderBy(schema.workflowSteps.position);
    const run = await startRun({
      organizationId: auth.org.id,
      workflowId: wf.id,
      objective: `Workflow: ${wf.name}`,
      createdBy: auth.user.id,
      plan: { summary: `${wf.name} (manual run)`, discovery: discovery.data, topN: cfg.topN ?? 10, actions: steps.map((s) => s.action) as RunPlan["actions"] },
    });
    await db().update(schema.workflows).set({ lastRunAt: new Date() }).where(eq(schema.workflows.id, wf.id));
    return { runId: run.id };
  });
}
