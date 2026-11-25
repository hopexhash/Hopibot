import "../guard";
import { sql } from "drizzle-orm";
import type { AgentKey } from "@/lib/constants";
import { checkBudget } from "../costs/usage";
import { claudeCost, UNIT_PRICING } from "../costs/pricing";
import { db } from "../db";
import { integrationMode } from "../integrations/credentials";
import { DEFAULT_MODEL } from "../integrations/anthropic";
import { getOrgSettings } from "../org";

export type PlanAction = "research" | "contacts" | "generate_website" | "qc" | "deploy" | "sales_email" | "notify";

/** "history" = averaged from this workspace's own completed tasks; "typical" = a rule-of-thumb. */
export type StepEstimate = { costUsd: number; seconds: number; basis: "history" | "typical" | "free" };

export type PlanEstimate = {
  /** True when the AI provider runs in development mock mode (no real calls, no cost). */
  mock: boolean;
  /** False when a required service is not connected: the plan would pause instead of run. */
  ready: { anthropic: boolean; googlePlaces: boolean };
  discovery: { costPerRequest: number; resultsPerRequest: number; secondsPerBusiness: number };
  steps: Record<PlanAction, StepEstimate>;
  budget: { dailyRemaining: number; monthlyRemaining: number; dailyLimit: number };
};

const ACTION_AGENT: Record<Exclude<PlanAction, "notify">, AgentKey> = {
  research: "research",
  contacts: "contact_research",
  generate_website: "website_builder",
  qc: "quality_control",
  deploy: "deployment",
  sales_email: "sales",
};

/** Rule-of-thumb token use per step, priced with the workspace's default model. */
const TYPICAL: Record<Exclude<PlanAction, "notify">, { input: number; output: number; extraUsd: number; seconds: number }> = {
  research: { input: 9000, output: 3500, extraUsd: 0, seconds: 45 },
  contacts: { input: 0, output: 0, extraUsd: UNIT_PRICING.hunter_domain_search + UNIT_PRICING.hunter_email_verifier, seconds: 10 },
  generate_website: { input: 10000, output: 18000, extraUsd: 0, seconds: 150 },
  qc: { input: 0, output: 0, extraUsd: 0, seconds: 40 },
  deploy: { input: 0, output: 0, extraUsd: UNIT_PRICING.vercel_deployment, seconds: 30 },
  sales_email: { input: 6000, output: 1500, extraUsd: 0, seconds: 25 },
};

/**
 * Cost and duration estimate for an objective plan. Uses this workspace's real history when
 * at least 3 paid, completed tasks exist for a step; otherwise a labelled rule-of-thumb.
 * These are estimates: confirmed costs are recorded per API call as the run executes.
 */
export async function estimatePlan(organizationId: string): Promise<PlanEstimate> {
  const [settings, anthropic, places, budget, history] = await Promise.all([
    getOrgSettings(organizationId),
    integrationMode(organizationId, "anthropic"),
    integrationMode(organizationId, "google_maps"),
    checkBudget(organizationId),
    db().execute(sql`
      SELECT agent_key, count(*) AS n, avg(cost_usd) AS cost, avg(extract(epoch FROM (completed_at - started_at))) AS seconds
      FROM agent_tasks
      WHERE organization_id = ${organizationId} AND status = 'COMPLETED' AND started_at IS NOT NULL
        AND created_at > now() - interval '90 days' AND (cost_usd > 0 OR agent_key IN ('quality_control', 'deployment'))
      GROUP BY agent_key`) as unknown as Promise<Record<string, unknown>[]>,
  ]);
  const model = settings.defaultModel || DEFAULT_MODEL;
  const steps = { notify: { costUsd: 0, seconds: 0, basis: "free" } } as Record<PlanAction, StepEstimate>;
  for (const [action, agent] of Object.entries(ACTION_AGENT) as [Exclude<PlanAction, "notify">, AgentKey][]) {
    const h = history.find((r) => r.agent_key === agent);
    const t = TYPICAL[action];
    const typicalCost = claudeCost(model, { input: t.input, output: t.output }) + t.extraUsd;
    if (h && Number(h.n) >= 3) {
      steps[action] = { costUsd: Number(h.cost ?? 0), seconds: Math.max(1, Math.round(Number(h.seconds ?? t.seconds))), basis: "history" };
    } else {
      steps[action] = { costUsd: typicalCost, seconds: t.seconds, basis: typicalCost === 0 ? "free" : "typical" };
    }
    if (anthropic === "mock" && t.input > 0) steps[action] = { ...steps[action], costUsd: 0 };
  }
  return {
    mock: anthropic === "mock",
    ready: { anthropic: anthropic !== "unavailable", googlePlaces: places !== "unavailable" },
    discovery: { costPerRequest: places === "mock" ? 0 : UNIT_PRICING.google_places_text_search, resultsPerRequest: 20, secondsPerBusiness: 3 },
    steps,
    budget: {
      dailyRemaining: Math.max(0, budget.daily.limit - budget.daily.spent),
      monthlyRemaining: Math.max(0, budget.monthly.limit - budget.monthly.spent),
      dailyLimit: budget.daily.limit,
    },
  };
}
