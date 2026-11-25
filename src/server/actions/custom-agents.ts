"use server";

import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import { CUSTOM_AGENT_TOOLS } from "@/lib/custom-agent-tools";
import { SUPPORTED_MODELS } from "../costs/pricing";
import { randomToken } from "../crypto";
import { draftAgent } from "../custom-agents/draft";
import { db, schema } from "../db";
import { describeModel } from "../integrations/anthropic";
import { integrationMode } from "../integrations/credentials";
import { createTask } from "../orchestrator/tasks";
import { ensureCustomRuntime } from "../org";
import { action, UserError } from "./_util";

const TOOL_ENUM = CUSTOM_AGENT_TOOLS.map((t) => t.name) as [string, ...string[]];
const MODEL_ENUM = SUPPORTED_MODELS.map((m) => m.id) as [string, ...string[]];

const configSchema = z.object({
  name: z.string().trim().min(2, "Give the agent a name").max(60),
  description: z.string().trim().max(300).default(""),
  instructions: z.string().trim().min(20, "Describe what the agent should do (at least a sentence or two)").max(6000),
  model: z.enum(MODEL_ENUM),
  effort: z.enum(["low", "medium", "high", "xhigh", "max"]),
  maxOutputTokens: z.number().int().min(1000).max(32000),
  tools: z.array(z.enum(TOOL_ENUM)).min(1, "Give the agent at least one tool").max(TOOL_ENUM.length),
  permissions: z.object({ writeCrm: z.boolean(), usePaidApis: z.boolean(), startAgents: z.boolean() }),
  memoryEnabled: z.boolean(),
  dailyBudgetUsd: z.number().min(0.05, "Minimum budget is $0.05").max(100),
  maxRunSeconds: z.number().int().min(30).max(1800),
  maxSteps: z.number().int().min(1).max(40),
  maxRetries: z.number().int().min(0).max(3),
});
export type CustomAgentConfig = z.infer<typeof configSchema>;

async function owned(orgId: string, id: string) {
  const [a] = await db()
    .select()
    .from(schema.customAgents)
    .where(and(eq(schema.customAgents.id, z.string().uuid().parse(id)), eq(schema.customAgents.organizationId, orgId), isNull(schema.customAgents.deletedAt)));
  if (!a) throw new UserError("Agent not found.");
  return a;
}

export async function draftCustomAgentAction(description: string) {
  return action({ name: "custom_agent.draft", limit: 10 }, async (auth) => {
    const text = z.string().trim().min(15, "Describe the agent in a sentence or two.").max(3000).parse(description);
    return draftAgent(auth.org.id, text);
  });
}

export async function saveCustomAgentAction(id: string | null, input: unknown) {
  return action({ name: id ? "custom_agent.update" : "custom_agent.create", role: "admin", revalidate: ["/builder"], auditTarget: (r: { id: string }) => ({ type: "custom_agent", id: r.id }) }, async (auth) => {
    const c = configSchema.parse(input);
    if (!id) {
      await ensureCustomRuntime(auth.org.id);
      const [row] = await db()
        .insert(schema.customAgents)
        .values({ ...c, organizationId: auth.org.id, createdBy: auth.user.id })
        .returning({ id: schema.customAgents.id });
      return { id: row.id, retest: false };
    }
    const cur = await owned(auth.org.id, id);
    // Anything that changes what the agent does or may do needs a fresh test before it runs for real again.
    const behaviourChanged =
      cur.instructions !== c.instructions ||
      cur.model !== c.model ||
      JSON.stringify([...cur.tools].sort()) !== JSON.stringify([...c.tools].sort()) ||
      JSON.stringify(cur.permissions) !== JSON.stringify(c.permissions);
    await db()
      .update(schema.customAgents)
      .set({ ...c, updatedAt: new Date(), ...(behaviourChanged ? { testedAt: null, status: "draft" } : {}) })
      .where(eq(schema.customAgents.id, cur.id));
    return { id: cur.id, retest: behaviourChanged && cur.status === "active" };
  });
}

export async function setCustomAgentStatusAction(id: string, status: "active" | "paused") {
  return action({ name: `custom_agent.${status === "active" ? "activate" : "pause"}`, role: "admin", revalidate: ["/builder"], auditTarget: () => ({ type: "custom_agent", id }) }, async (auth) => {
    const a = await owned(auth.org.id, id);
    if (status === "active" && !a.testedAt) throw new UserError("Run a successful test first. An agent can only be activated after you have seen it work.");
    await db().update(schema.customAgents).set({ status, updatedAt: new Date() }).where(eq(schema.customAgents.id, a.id));
    return null;
  });
}

export async function deleteCustomAgentAction(id: string) {
  return action({ name: "custom_agent.delete", role: "admin", revalidate: ["/builder"], auditTarget: () => ({ type: "custom_agent", id }) }, async (auth) => {
    const a = await owned(auth.org.id, id);
    await db().update(schema.customAgents).set({ deletedAt: new Date(), status: "paused" }).where(eq(schema.customAgents.id, a.id));
    return null;
  });
}

/** Starts a run. Test runs work on drafts and never write; real runs need an active agent. */
export async function runCustomAgentAction(id: string, prompt: string, test: boolean) {
  return action({ name: test ? "custom_agent.test" : "custom_agent.run", role: test ? "member" : "admin", limit: 10, revalidate: ["/builder"], auditTarget: (r: { taskId: string }) => ({ type: "custom_agent", id, metadata: { taskId: r.taskId, test } }) }, async (auth) => {
    const a = await owned(auth.org.id, id);
    if (!test && a.status !== "active") throw new UserError("Activate the agent before running it for real.");
    if ((await integrationMode(auth.org.id, "anthropic")) !== "live") throw new UserError("Claude is not connected. Add your Anthropic key in Integrations to run custom agents.");
    await ensureCustomRuntime(auth.org.id);
    const { task } = await createTask(auth.org.id, null, {
      agentKey: "custom",
      type: "custom_agent_run",
      input: { customAgentId: a.id, customAgentName: a.name, prompt: z.string().max(4000).parse(prompt ?? ""), test },
      idempotencyKey: `custom:${a.id}:${randomToken(6)}`,
      priority: 2,
      maxAttempts: test ? 1 : a.maxRetries + 1,
    });
    return { taskId: task.id };
  });
}

/** Live facts about a model for the builder (is it available to this key, how large can outputs be). */
export async function checkModelAction(model: string) {
  return action({ name: "custom_agent.check_model", limit: 30 }, async (auth) => {
    const id = z.enum(MODEL_ENUM).parse(model);
    if ((await integrationMode(auth.org.id, "anthropic")) !== "live") return { available: false as const, id, reason: "Claude is not connected, so availability cannot be checked." };
    return describeModel(auth.org.id, id);
  });
}
