import "./guard";
import { eq } from "drizzle-orm";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { orgSettingsSchema, parseOrgSettings, type OrgSettings } from "@/lib/settings";
import { slugify } from "@/lib/utils";
import { randomToken } from "./crypto";
import { db, schema, type Database } from "./db";

export const DEFAULT_AGENT_INSTRUCTIONS: Record<AgentKey, string> = {
  lead_finder:
    "Prefer independent local businesses. Skip permanently closed businesses and national chains. Verify website status before scoring.",
  research:
    "Be factual and conservative. Only treat information as verified when it comes from the business's own listing or website. List anything you could not verify under missing information.",
  contact_research:
    "Only record contact details that are publicly published by the business or returned by a verification provider. Never construct or guess addresses.",
  website_builder:
    "Design premium, modern, mobile-first websites. Use only verified business facts. Never invent reviews, awards, certifications, prices or opening hours.",
  quality_control: "Treat any console error, broken link, missing image or horizontal overflow on mobile as a defect.",
  deployment: "Deploy previews only. Never connect a customer domain without an approved request.",
  sales:
    "Write short, honest, personal emails in the business's language (Dutch for Dutch businesses unless told otherwise). No fake urgency, no exaggerated claims, always identify the agency and include the opt-out line.",
};

const DEFAULT_AGENT_LIMITS: Partial<Record<AgentKey, { concurrency: number; maxTasksPerRun: number; dailySpendLimitUsd: number }>> = {
  lead_finder: { concurrency: 2, maxTasksPerRun: 20, dailySpendLimitUsd: 5 },
  research: { concurrency: 4, maxTasksPerRun: 200, dailySpendLimitUsd: 10 },
  contact_research: { concurrency: 4, maxTasksPerRun: 200, dailySpendLimitUsd: 5 },
  website_builder: { concurrency: 2, maxTasksPerRun: 50, dailySpendLimitUsd: 10 },
  quality_control: { concurrency: 2, maxTasksPerRun: 100, dailySpendLimitUsd: 1 },
  deployment: { concurrency: 2, maxTasksPerRun: 50, dailySpendLimitUsd: 2 },
  sales: { concurrency: 4, maxTasksPerRun: 100, dailySpendLimitUsd: 5 },
};

/**
 * The custom-agent runtime is one internal "agent" row that every custom agent's tasks run
 * under (queue, concurrency, retries). Created on demand for workspaces that predate it.
 */
export async function ensureCustomRuntime(organizationId: string, tx: Database = db()) {
  const [agent] = await tx
    .insert(schema.agents)
    .values({ organizationId, key: "custom", name: "Custom agents", description: "Runs the agents you create in the Agent Builder." })
    .onConflictDoUpdate({ target: [schema.agents.organizationId, schema.agents.key], set: { name: "Custom agents" } })
    .returning({ id: schema.agents.id });
  await tx.insert(schema.agentConfigurations).values({ organizationId, agentId: agent.id, instructions: "", concurrency: 2, maxTasksPerRun: 100, maxRetries: 1 }).onConflictDoNothing();
}

/** Idempotently ensures the seven agents and their configuration rows exist. */
export async function ensureAgents(organizationId: string, tx: Database = db()) {
  for (const key of AGENT_KEYS) {
    const meta = AGENT_META[key];
    const [agent] = await tx
      .insert(schema.agents)
      .values({ organizationId, key, name: meta.name, description: meta.description })
      .onConflictDoUpdate({
        target: [schema.agents.organizationId, schema.agents.key],
        set: { name: meta.name, description: meta.description },
      })
      .returning({ id: schema.agents.id });
    const limits = DEFAULT_AGENT_LIMITS[key];
    await tx
      .insert(schema.agentConfigurations)
      .values({
        organizationId,
        agentId: agent.id,
        instructions: DEFAULT_AGENT_INSTRUCTIONS[key],
        model: ["research", "website_builder", "sales"].includes(key) ? "claude-opus-5-5" : null,
        effort: key === "website_builder" ? "high" : key === "research" || key === "sales" ? "medium" : null,
        concurrency: limits?.concurrency ?? 2,
        maxTasksPerRun: limits?.maxTasksPerRun ?? 100,
        dailySpendLimitUsd: limits?.dailySpendLimitUsd ?? null,
      })
      .onConflictDoNothing();
  }
}

export async function createOrganization(name: string, ownerUserId: string, tx: Database = db()) {
  const base = slugify(name) || "agency";
  const slug = `${base}-${randomToken(4).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5)}`;
  const settings = orgSettingsSchema.parse({ agencyName: name });
  const [org] = await tx.insert(schema.organizations).values({ name, slug, settings }).returning();
  await tx.insert(schema.organizationMembers).values({ organizationId: org.id, userId: ownerUserId, role: "owner" });
  await ensureAgents(org.id, tx);

  // A default, disabled automation mirroring the brief, so users can switch it on.
  const [wf] = await tx
    .insert(schema.workflows)
    .values({
      organizationId: org.id,
      name: "Qualified lead → preview → draft email",
      description: "When a qualified lead is discovered: research, find contacts, build and test a website, deploy a preview and draft an email for approval.",
      triggerType: "new_qualified_lead",
      enabled: false,
    })
    .returning();
  const steps = ["research", "contacts", "generate_website", "qc", "deploy", "sales_email", "notify"];
  await tx.insert(schema.workflowSteps).values(
    steps.map((action, i) => ({ organizationId: org.id, workflowId: wf.id, position: i, action })),
  );
  return org;
}

export async function getOrgSettings(organizationId: string): Promise<OrgSettings> {
  const [row] = await db()
    .select({ settings: schema.organizations.settings })
    .from(schema.organizations)
    .where(eq(schema.organizations.id, organizationId));
  return parseOrgSettings(row?.settings);
}
