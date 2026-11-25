import "../guard";
import { and, eq, gte, sql } from "drizzle-orm";
import type { RuntimeKey } from "@/lib/constants";
import { db, schema } from "../db";
import { getOrgSettings } from "../org";

export type UsageContext = {
  organizationId: string;
  agentKey?: RuntimeKey;
  taskId?: string;
  businessId?: string | null;
  projectId?: string | null;
};

export async function recordUsage(
  ctx: UsageContext,
  entry: {
    provider: string;
    operation: string;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    cacheReadTokens?: number;
    units?: number;
    costUsd: number;
    isMock?: boolean;
  },
) {
  await db()
    .insert(schema.apiUsage)
    .values({
      organizationId: ctx.organizationId,
      agentKey: ctx.agentKey,
      taskId: ctx.taskId,
      businessId: ctx.businessId ?? null,
      projectId: ctx.projectId ?? null,
      provider: entry.provider,
      operation: entry.operation,
      model: entry.model,
      inputTokens: entry.inputTokens ?? 0,
      outputTokens: entry.outputTokens ?? 0,
      cacheReadTokens: entry.cacheReadTokens ?? 0,
      units: entry.units ?? 1,
      costUsd: entry.isMock ? 0 : entry.costUsd,
      isMock: entry.isMock ?? false,
    });
  if (ctx.taskId && !entry.isMock && entry.costUsd > 0) {
    await db()
      .update(schema.agentTasks)
      .set({ costUsd: sql`${schema.agentTasks.costUsd} + ${entry.costUsd}` })
      .where(eq(schema.agentTasks.id, ctx.taskId));
  }
}

async function spendSince(organizationId: string, since: Date, agentKey?: string) {
  const conds = [eq(schema.apiUsage.organizationId, organizationId), gte(schema.apiUsage.createdAt, since)];
  if (agentKey) conds.push(eq(schema.apiUsage.agentKey, agentKey));
  const [row] = await db()
    .select({ total: sql<string>`coalesce(sum(${schema.apiUsage.costUsd}), 0)` })
    .from(schema.apiUsage)
    .where(and(...conds));
  return Number(row?.total ?? 0);
}

export function startOfUtcDay(d = new Date()) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
export function startOfUtcMonth(d = new Date()) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export type BudgetStatus = {
  ok: boolean;
  reason?: string;
  daily: { spent: number; limit: number };
  monthly: { spent: number; limit: number };
  agent?: { spent: number; limit: number | null };
};

/** Checks organisation daily/monthly limits and the agent's own daily limit. */
export async function checkBudget(organizationId: string, agentKey?: RuntimeKey, estimatedCostUsd = 0): Promise<BudgetStatus> {
  const settings = await getOrgSettings(organizationId);
  const [daily, monthly] = await Promise.all([
    spendSince(organizationId, startOfUtcDay()),
    spendSince(organizationId, startOfUtcMonth()),
  ]);
  const status: BudgetStatus = {
    ok: true,
    daily: { spent: daily, limit: settings.dailySpendLimitUsd },
    monthly: { spent: monthly, limit: settings.monthlySpendLimitUsd },
  };
  if (daily + estimatedCostUsd > settings.dailySpendLimitUsd) {
    return { ...status, ok: false, reason: `Daily spending limit of $${settings.dailySpendLimitUsd} reached ($${daily.toFixed(2)} spent).` };
  }
  if (monthly + estimatedCostUsd > settings.monthlySpendLimitUsd) {
    return { ...status, ok: false, reason: `Monthly spending limit of $${settings.monthlySpendLimitUsd} reached ($${monthly.toFixed(2)} spent).` };
  }
  if (agentKey) {
    const [cfg] = await db()
      .select({ limit: schema.agentConfigurations.dailySpendLimitUsd })
      .from(schema.agentConfigurations)
      .innerJoin(schema.agents, eq(schema.agents.id, schema.agentConfigurations.agentId))
      .where(and(eq(schema.agents.organizationId, organizationId), eq(schema.agents.key, agentKey)));
    const agentSpent = await spendSince(organizationId, startOfUtcDay(), agentKey);
    status.agent = { spent: agentSpent, limit: cfg?.limit ?? null };
    if (cfg?.limit != null && agentSpent + estimatedCostUsd > cfg.limit) {
      return { ...status, ok: false, reason: `The agent's daily limit of $${cfg.limit} is reached ($${agentSpent.toFixed(2)} spent).` };
    }
  }
  return status;
}
