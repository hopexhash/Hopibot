"use server";

import { and, count, desc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { AGENT_KEYS, type AgentKey } from "@/lib/constants";
import { randomToken } from "../crypto";
import { db, schema } from "../db";
import { resumeTask } from "../orchestrator/control";
import { refreshRunStatus } from "../orchestrator/runs";
import { createTask } from "../orchestrator/tasks";
import { SUPPORTED_MODELS } from "../costs/pricing";
import { action, UserError } from "./_util";

const agentKey = z.enum(AGENT_KEYS);

async function loadAgent(orgId: string, key: AgentKey) {
  const [a] = await db().select().from(schema.agents).where(and(eq(schema.agents.organizationId, orgId), eq(schema.agents.key, key)));
  if (!a) throw new UserError("Agent not found.");
  return a;
}

export async function toggleAgentAction(key: string, enabled: boolean) {
  return action({ name: enabled ? "agent.enable" : "agent.disable", role: "admin", revalidate: ["/agents"], auditTarget: () => ({ type: "agent", id: key }) }, async (auth) => {
    const a = await loadAgent(auth.org.id, agentKey.parse(key));
    await db().update(schema.agents).set({ enabled }).where(eq(schema.agents.id, a.id));
    let resumed = 0;
    if (enabled) {
      const parked = await db()
        .select({ id: schema.agentTasks.id })
        .from(schema.agentTasks)
        .where(and(eq(schema.agentTasks.organizationId, auth.org.id), eq(schema.agentTasks.agentKey, a.key), eq(schema.agentTasks.status, "WAITING_FOR_APPROVAL"), eq(schema.agentTasks.waitingReason, "AGENT_DISABLED")));
      for (const t of parked) if (await resumeTask(auth.org.id, t.id)) resumed++;
    }
    return { resumed };
  });
}

/**
 * Stop = pause the agent and cancel everything it has queued. A task that is already
 * executing cannot be interrupted mid-step; it finishes its current step and nothing new starts.
 */
export async function stopAgentAction(key: string) {
  return action({ name: "agent.stop", role: "admin", revalidate: ["/agents"], auditTarget: (r: { cancelled: number }) => ({ type: "agent", id: key, metadata: r }) }, async (auth) => {
    const a = await loadAgent(auth.org.id, agentKey.parse(key));
    await db().update(schema.agents).set({ enabled: false }).where(eq(schema.agents.id, a.id));
    const cancelled = await db()
      .update(schema.agentTasks)
      .set({ status: "CANCELLED", completedAt: new Date(), waitingReason: null })
      .where(and(eq(schema.agentTasks.organizationId, auth.org.id), eq(schema.agentTasks.agentKey, a.key), inArray(schema.agentTasks.status, ["PENDING", "WAITING_FOR_APPROVAL"])))
      .returning({ id: schema.agentTasks.id, runId: schema.agentTasks.runId });
    for (const runId of new Set(cancelled.map((c) => c.runId).filter((r): r is string => Boolean(r)))) await refreshRunStatus(runId);
    const [{ n: stillRunning }] = await db()
      .select({ n: count() })
      .from(schema.agentTasks)
      .where(and(eq(schema.agentTasks.organizationId, auth.org.id), eq(schema.agentTasks.agentKey, a.key), eq(schema.agentTasks.status, "RUNNING")));
    return { cancelled: cancelled.length, stillRunning };
  });
}

const configSchema = z.object({
  instructions: z.string().max(4000),
  model: z.enum(SUPPORTED_MODELS.map((m) => m.id) as [string, ...string[]]).nullable(),
  effort: z.enum(["low", "medium", "high", "xhigh", "max"]).nullable(),
  temperature: z.number().min(0).max(1).nullable(),
  concurrency: z.number().int().min(1).max(20),
  maxTasksPerRun: z.number().int().min(1).max(10000),
  dailySpendLimitUsd: z.number().min(0).max(100000).nullable(),
  maxRetries: z.number().int().min(0).max(10),
});

export async function updateAgentConfigAction(key: string, input: unknown) {
  return action({ name: "agent.configure", role: "admin", revalidate: ["/agents"], auditTarget: () => ({ type: "agent", id: key, metadata: input as Record<string, unknown> }) }, async (auth) => {
    const a = await loadAgent(auth.org.id, agentKey.parse(key));
    const c = configSchema.parse(input);
    const [cur] = await db().select().from(schema.agentConfigurations).where(eq(schema.agentConfigurations.agentId, a.id));
    await db()
      .update(schema.agentConfigurations)
      .set({ ...c, version: (cur?.version ?? 0) + 1, updatedBy: auth.user.id, updatedAt: new Date() })
      .where(eq(schema.agentConfigurations.agentId, a.id));
    return null;
  });
}

/** Runs one ad-hoc task for an agent so it can be tested in isolation. */
export async function testAgentAction(key: string, businessId?: string) {
  return action({ name: "agent.test", revalidate: ["/agents"], limit: 10 }, async (auth) => {
    const k = agentKey.parse(key);
    const orgId = auth.org.id;
    const suffix = randomToken(5);
    const pickBusiness = async () => {
      if (businessId) return z.string().uuid().parse(businessId);
      const [b] = await db().select({ id: schema.businesses.id }).from(schema.businesses).where(eq(schema.businesses.organizationId, orgId)).orderBy(desc(schema.businesses.leadScore)).limit(1);
      if (!b) throw new UserError("Discover at least one business first.");
      return b.id;
    };
    const pickProject = async (ready: boolean) => {
      const conds = [eq(schema.websiteProjects.organizationId, orgId)];
      if (ready) conds.push(eq(schema.websiteProjects.status, "ready"));
      const [p] = await db().select().from(schema.websiteProjects).where(and(...conds)).orderBy(desc(schema.websiteProjects.updatedAt)).limit(1);
      if (!p?.currentVersionId) throw new UserError(ready ? "No QC-approved website exists yet." : "Generate a website first.");
      return p;
    };
    let spec: Parameters<typeof createTask>[2];
    switch (k) {
      case "lead_finder": {
        const city = "Rotterdam";
        spec = { agentKey: k, type: "discover_leads", input: { params: { country: "Netherlands", city, category: "restaurant", radiusKm: 5, limit: 3, minScore: 40 }, actions: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      }
      case "research":
        spec = { agentKey: k, type: "research_business", businessId: await pickBusiness(), input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      case "contact_research":
        spec = { agentKey: k, type: "find_contacts", businessId: await pickBusiness(), input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      case "website_builder":
        spec = { agentKey: k, type: "generate_website", businessId: await pickBusiness(), input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      case "quality_control": {
        const p = await pickProject(false);
        spec = { agentKey: k, type: "test_website", businessId: p.businessId, projectId: p.id, input: { versionId: p.currentVersionId, next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      }
      case "deployment": {
        const p = await pickProject(true);
        spec = { agentKey: k, type: "deploy_preview", businessId: p.businessId, projectId: p.id, input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
      }
      case "sales":
        spec = { agentKey: k, type: "draft_intro_email", businessId: (await pickProject(true)).businessId, input: { next: [] }, idempotencyKey: `test:${k}:${suffix}` };
        break;
    }
    const { task } = await createTask(orgId, null, { ...spec, priority: 1, maxAttempts: 1 });
    return { taskId: task.id };
  });
}
