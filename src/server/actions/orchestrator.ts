"use server";

import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "../db";
import { mockModeAllowed } from "../integrations/credentials";
import { resumeTask } from "../orchestrator/control";
import { planObjective } from "../orchestrator/planner";
import { cancelRun, discoveryParamsSchema, planSchema, startRun, type RunPlan } from "../orchestrator/runs";
import { transitionTask } from "../orchestrator/state-machine";
import { refreshRunStatus } from "../orchestrator/runs";
import { action, UserError } from "./_util";

export async function planObjectiveAction(objective: string) {
  return action({ name: "orchestrator.plan", limit: 20 }, async (auth) => {
    const text = z.string().trim().min(8, "Describe the objective in a sentence.").max(2000).parse(objective);
    return planObjective(auth.org.id, text);
  });
}

export async function startObjectiveAction(objective: string, plan: RunPlan) {
  return action(
    { name: "orchestrator.start_run", revalidate: ["/"], auditTarget: (r: { runId: string }) => ({ type: "workflow_run", id: r.runId }) },
    async (auth) => {
      const parsed = planSchema.parse(plan);
      const run = await startRun({ organizationId: auth.org.id, plan: parsed, objective: objective.slice(0, 2000), createdBy: auth.user.id, isMock: mockModeAllowed() });
      return { runId: run.id };
    },
  );
}

export async function startDiscoveryAction(input: unknown) {
  return action(
    { name: "discovery.start", revalidate: ["/discovery"], limit: 10, auditTarget: (r: { campaignId: string; runId: string }) => ({ type: "discovery_campaign", id: r.campaignId }) },
    async (auth) => {
      const params = discoveryParamsSchema.parse(input);
      const [campaign] = await db()
        .insert(schema.discoveryCampaigns)
        .values({
          organizationId: auth.org.id,
          name: `${params.category} · ${params.city}`,
          params,
          status: "RUNNING",
          createdBy: auth.user.id,
        })
        .returning();
      const run = await startRun({
        organizationId: auth.org.id,
        plan: { summary: `Discover ${params.limit} ${params.category} in ${params.city}`, discovery: params, topN: 0, actions: [] },
        objective: `Lead discovery: ${params.category} in ${params.city}`,
        createdBy: auth.user.id,
        campaignId: campaign.id,
      });
      await db().update(schema.discoveryCampaigns).set({ runId: run.id }).where(eq(schema.discoveryCampaigns.id, campaign.id));
      return { campaignId: campaign.id, runId: run.id };
    },
  );
}

const pipelineActions = z.array(z.enum(["research", "contacts", "generate_website", "qc", "deploy", "sales_email", "notify"])).min(1);

/** Runs selected pipeline steps for selected businesses (from the Businesses table). */
export async function runPipelineAction(businessIds: string[], actions: string[]) {
  return action({ name: "pipeline.run", revalidate: ["/businesses"], limit: 20 }, async (auth) => {
    const ids = z.array(z.string().uuid()).min(1).max(500).parse(businessIds);
    const steps = pipelineActions.parse(actions);
    const owned = await db()
      .select({ id: schema.businesses.id })
      .from(schema.businesses)
      .where(and(eq(schema.businesses.organizationId, auth.org.id), inArray(schema.businesses.id, ids)));
    const allowed = new Set(owned.map((o) => o.id));
    const valid = ids.filter((i) => allowed.has(i));
    if (!valid.length) throw new UserError("No matching businesses.");
    const run = await startRun({
      organizationId: auth.org.id,
      plan: { summary: `${steps.join(" → ")} for ${valid.length} business(es)`, discovery: null, topN: valid.length, actions: steps, businessIds: valid },
      objective: `Manual pipeline: ${steps.join(", ")}`,
      createdBy: auth.user.id,
    });
    return { runId: run.id, count: valid.length };
  });
}

export async function cancelRunAction(runId: string) {
  return action({ name: "orchestrator.cancel_run", role: "admin", revalidate: ["/automations"] }, async (auth) => {
    await cancelRun(auth.org.id, z.string().uuid().parse(runId));
    return null;
  });
}

export async function retryTaskAction(taskId: string) {
  return action({ name: "task.retry", auditTarget: () => ({ type: "agent_task", id: taskId }) }, async (auth) => {
    const t = await resumeTask(auth.org.id, z.string().uuid().parse(taskId));
    if (!t) throw new UserError("Only failed or paused tasks can be retried.");
    return null;
  });
}

export async function cancelTaskAction(taskId: string) {
  return action({ name: "task.cancel", auditTarget: () => ({ type: "agent_task", id: taskId }) }, async (auth) => {
    const id = z.string().uuid().parse(taskId);
    const [t] = await db().select().from(schema.agentTasks).where(and(eq(schema.agentTasks.id, id), eq(schema.agentTasks.organizationId, auth.org.id)));
    if (!t) throw new UserError("Task not found.");
    const done = await transitionTask(id, ["PENDING", "WAITING_FOR_APPROVAL", "FAILED"], "CANCELLED", { completedAt: new Date() });
    if (!done) throw new UserError("Running or finished tasks cannot be cancelled.");
    if (t.runId) await refreshRunStatus(t.runId);
    return null;
  });
}
