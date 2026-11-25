import "../guard";
import { sql } from "drizzle-orm";
import { db } from "../db";
import { startOfUtcDay, startOfUtcMonth } from "../costs/usage";

type Row = Record<string, unknown>;
async function q<T extends Row>(query: ReturnType<typeof sql>): Promise<T[]> {
  return (await db().execute(query)) as unknown as T[];
}
const num = (v: unknown) => Number(v ?? 0);

export type Kpis = Awaited<ReturnType<typeof getKpis>>;

/** All KPI counts exclude mock rows; mock counts are reported separately. */
export async function getKpis(orgId: string, minScore: number) {
  const [r] = await q(sql`
    SELECT
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND erased_at IS NULL AND NOT is_mock) AS businesses,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND is_mock) AS mock_businesses,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND erased_at IS NULL AND lead_score >= ${minScore}) AS qualified,
      (SELECT count(*) FROM website_projects p JOIN businesses b ON b.id = p.business_id
        WHERE p.organization_id = ${orgId} AND p.deleted_at IS NULL AND p.current_version_id IS NOT NULL AND NOT b.is_mock) AS websites,
      (SELECT count(*) FROM website_projects p JOIN businesses b ON b.id = p.business_id
        WHERE p.organization_id = ${orgId} AND p.deleted_at IS NULL AND p.status = 'ready' AND p.approval_status = 'pending' AND NOT b.is_mock) AS websites_awaiting,
      (SELECT count(*) FROM deployments d JOIN website_projects p ON p.id = d.project_id JOIN businesses b ON b.id = p.business_id
        WHERE d.organization_id = ${orgId} AND d.status = 'ready' AND NOT d.is_mock AND NOT b.is_mock) AS deployments,
      (SELECT count(*) FROM sales_emails WHERE organization_id = ${orgId} AND status = 'awaiting_approval' AND NOT is_mock) AS emails_awaiting,
      (SELECT count(*) FROM sales_emails WHERE organization_id = ${orgId} AND status = 'awaiting_approval' AND is_mock) AS mock_emails_awaiting,
      (SELECT count(*) FROM sales_emails WHERE organization_id = ${orgId} AND status = 'sent' AND NOT is_mock) AS emails_sent,
      (SELECT count(DISTINCT business_id) FROM crm_activities WHERE organization_id = ${orgId} AND type = 'stage_change' AND metadata->>'to' = 'REPLIED') AS replies,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND pipeline_stage = 'WON' AND NOT is_mock) AS customers,
      (SELECT coalesce(sum(amount_cents), 0) FROM payments WHERE organization_id = ${orgId} AND status = 'paid') AS revenue_cents,
      (SELECT coalesce(sum(CASE WHEN interval = 'year' THEN amount_cents / 12 ELSE amount_cents END), 0) FROM subscriptions
        WHERE organization_id = ${orgId} AND status IN ('active', 'trialing')) AS mrr_cents,
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage WHERE organization_id = ${orgId} AND created_at >= ${startOfUtcMonth().toISOString()}::timestamptz) AS cost_month,
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage WHERE organization_id = ${orgId} AND created_at >= ${startOfUtcDay().toISOString()}::timestamptz) AS cost_today,
      (SELECT count(*) FROM approvals WHERE organization_id = ${orgId} AND status = 'pending') AS approvals_pending,
      (SELECT count(*) FROM agent_tasks WHERE organization_id = ${orgId} AND status = 'RUNNING') AS tasks_running
  `);
  return {
    businesses: num(r.businesses),
    mockBusinesses: num(r.mock_businesses),
    qualified: num(r.qualified),
    websites: num(r.websites),
    websitesAwaiting: num(r.websites_awaiting),
    deployments: num(r.deployments),
    emailsAwaiting: num(r.emails_awaiting),
    mockEmailsAwaiting: num(r.mock_emails_awaiting),
    emailsSent: num(r.emails_sent),
    replies: num(r.replies),
    customers: num(r.customers),
    revenueCents: num(r.revenue_cents),
    mrrCents: num(r.mrr_cents),
    costMonth: num(r.cost_month),
    costToday: num(r.cost_today),
    approvalsPending: num(r.approvals_pending),
    tasksRunning: num(r.tasks_running),
  };
}

/** Daily series for the last `days` days. Mock rows are counted in their own column. */
export async function getDailySeries(orgId: string, days = 30) {
  const rows = await q(sql`
    WITH d AS (SELECT generate_series((now() at time zone 'utc')::date - ${days - 1}::int, (now() at time zone 'utc')::date, '1 day')::date AS day)
    SELECT to_char(d.day, 'DD Mon') AS label,
      (SELECT count(*) FROM businesses b WHERE b.organization_id = ${orgId} AND NOT b.is_mock AND (b.created_at at time zone 'utc')::date = d.day) AS leads,
      (SELECT count(*) FROM businesses b WHERE b.organization_id = ${orgId} AND b.is_mock AND (b.created_at at time zone 'utc')::date = d.day) AS mock_leads,
      (SELECT count(*) FROM website_versions v WHERE v.organization_id = ${orgId} AND v.version_no = 1 AND NOT v.is_mock AND (v.created_at at time zone 'utc')::date = d.day) AS websites,
      (SELECT count(*) FROM website_versions v WHERE v.organization_id = ${orgId} AND v.version_no = 1 AND v.is_mock AND (v.created_at at time zone 'utc')::date = d.day) AS mock_websites,
      (SELECT count(*) FROM sales_emails e WHERE e.organization_id = ${orgId} AND e.status = 'sent' AND NOT e.is_mock AND (e.sent_at at time zone 'utc')::date = d.day) AS emails,
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage u WHERE u.organization_id = ${orgId} AND (u.created_at at time zone 'utc')::date = d.day) AS cost,
      (SELECT coalesce(sum(amount_cents), 0) FROM payments p WHERE p.organization_id = ${orgId} AND p.status = 'paid' AND (p.paid_at at time zone 'utc')::date = d.day) AS revenue_cents
    FROM d ORDER BY d.day
  `);
  return rows.map((r) => ({
    label: String(r.label),
    leads: num(r.leads),
    mockLeads: num(r.mock_leads),
    websites: num(r.websites),
    mockWebsites: num(r.mock_websites),
    emails: num(r.emails),
    cost: Number(num(r.cost).toFixed(4)),
    revenue: num(r.revenue_cents) / 100,
  }));
}

export async function getMonthlyRevenue(orgId: string, months = 12) {
  const rows = await q(sql`
    WITH m AS (SELECT generate_series(date_trunc('month', now()) - make_interval(months => ${months - 1}::int), date_trunc('month', now()), '1 month') AS month)
    SELECT to_char(m.month, 'Mon YY') AS label,
      (SELECT coalesce(sum(amount_cents), 0) FROM payments p WHERE p.organization_id = ${orgId} AND p.status = 'paid' AND date_trunc('month', p.paid_at) = m.month) AS revenue_cents,
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage u WHERE u.organization_id = ${orgId} AND date_trunc('month', u.created_at) = m.month) AS cost
    FROM m ORDER BY m.month
  `);
  return rows.map((r) => ({ label: String(r.label), revenue: num(r.revenue_cents) / 100, cost: Number(num(r.cost).toFixed(2)) }));
}

export async function getAgentStats(orgId: string, sinceDays = 30) {
  const rows = await q(sql`
    SELECT agent_key,
      count(*) FILTER (WHERE status = 'COMPLETED') AS completed,
      count(*) FILTER (WHERE status = 'FAILED') AS failed,
      count(*) FILTER (WHERE status = 'RUNNING') AS running,
      count(*) FILTER (WHERE status = 'PENDING') AS pending,
      count(*) FILTER (WHERE status = 'WAITING_FOR_APPROVAL') AS waiting,
      avg(extract(epoch FROM (completed_at - started_at)) * 1000) FILTER (WHERE status = 'COMPLETED' AND started_at IS NOT NULL) AS avg_ms,
      coalesce(sum(cost_usd), 0) AS cost
    FROM agent_tasks
    WHERE organization_id = ${orgId} AND created_at >= now() - make_interval(days => ${sinceDays}::int)
    GROUP BY agent_key
  `);
  return Object.fromEntries(
    rows.map((r) => [
      String(r.agent_key),
      {
        completed: num(r.completed),
        failed: num(r.failed),
        running: num(r.running),
        pending: num(r.pending),
        waiting: num(r.waiting),
        avgMs: r.avg_ms == null ? null : num(r.avg_ms),
        cost: num(r.cost),
      },
    ]),
  ) as Record<string, { completed: number; failed: number; running: number; pending: number; waiting: number; avgMs: number | null; cost: number }>;
}

export async function getFunnel(orgId: string) {
  const [r] = await q(sql`
    SELECT
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND erased_at IS NULL) AS discovered,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND research_status = 'done') AS researched,
      (SELECT count(DISTINCT p.business_id) FROM website_projects p JOIN businesses b ON b.id = p.business_id WHERE p.organization_id = ${orgId} AND NOT b.is_mock AND p.status = 'ready') AS websites,
      (SELECT count(DISTINCT business_id) FROM sales_emails WHERE organization_id = ${orgId} AND status = 'sent' AND NOT is_mock) AS contacted,
      (SELECT count(DISTINCT business_id) FROM crm_activities WHERE organization_id = ${orgId} AND type = 'stage_change' AND metadata->>'to' = 'REPLIED') AS replied,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND pipeline_stage = 'WON') AS won
  `);
  return [
    { label: "Discovered", value: num(r.discovered) },
    { label: "Researched", value: num(r.researched) },
    { label: "Website ready", value: num(r.websites) },
    { label: "Contacted", value: num(r.contacted) },
    { label: "Replied", value: num(r.replied) },
    { label: "Won", value: num(r.won) },
  ];
}

export async function getCostBreakdown(orgId: string, since: Date) {
  const byProvider = await q(sql`
    SELECT provider, operation, model, count(*) AS calls, sum(units) AS units, sum(input_tokens) AS input_tokens,
      sum(output_tokens) AS output_tokens, sum(cache_read_tokens) AS cache_tokens, coalesce(sum(cost_usd), 0) AS cost
    FROM api_usage WHERE organization_id = ${orgId} AND created_at >= ${since.toISOString()}::timestamptz
    GROUP BY provider, operation, model ORDER BY cost DESC
  `);
  const byAgent = await q(sql`
    SELECT coalesce(agent_key, 'other') AS agent_key, coalesce(sum(cost_usd), 0) AS cost, count(*) AS calls
    FROM api_usage WHERE organization_id = ${orgId} AND created_at >= ${since.toISOString()}::timestamptz
    GROUP BY agent_key ORDER BY cost DESC
  `);
  return {
    byProvider: byProvider.map((r) => ({
      provider: String(r.provider),
      operation: String(r.operation),
      model: r.model ? String(r.model) : null,
      calls: num(r.calls),
      units: num(r.units),
      inputTokens: num(r.input_tokens),
      outputTokens: num(r.output_tokens),
      cacheTokens: num(r.cache_tokens),
      cost: num(r.cost),
    })),
    byAgent: byAgent.map((r) => ({ agentKey: String(r.agent_key), cost: num(r.cost), calls: num(r.calls) })),
  };
}

/** Unit economics over all time (real data only). */
export async function getUnitEconomics(orgId: string) {
  const [r] = await q(sql`
    SELECT
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage WHERE organization_id = ${orgId}) AS total_cost,
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage WHERE organization_id = ${orgId} AND agent_key IN ('lead_finder')) AS discovery_cost,
      (SELECT coalesce(sum(cost_usd), 0) FROM api_usage WHERE organization_id = ${orgId} AND agent_key IN ('website_builder', 'quality_control')) AS website_cost,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock) AS leads,
      (SELECT count(*) FROM website_projects p JOIN businesses b ON b.id = p.business_id WHERE p.organization_id = ${orgId} AND NOT b.is_mock AND p.current_version_id IS NOT NULL) AS websites,
      (SELECT count(*) FROM deployments d JOIN website_projects p ON p.id = d.project_id JOIN businesses b ON b.id = p.business_id
        WHERE d.organization_id = ${orgId} AND d.status = 'ready' AND NOT d.is_mock AND NOT b.is_mock) AS deployments,
      (SELECT count(*) FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND pipeline_stage = 'WON') AS customers,
      (SELECT coalesce(sum(amount_cents), 0) FROM payments WHERE organization_id = ${orgId} AND status = 'paid') AS revenue_cents
  `);
  const total = num(r.total_cost);
  const per = (cost: number, n: number) => (n > 0 ? cost / n : null);
  const revenue = num(r.revenue_cents) / 100;
  return {
    totalCost: total,
    revenue,
    costPerLead: per(num(r.discovery_cost), num(r.leads)),
    costPerWebsite: per(num(r.website_cost), num(r.websites)),
    costPerDeployment: per(total, num(r.deployments)),
    costPerCustomer: per(total, num(r.customers)),
    revenuePerCustomer: per(revenue, num(r.customers)),
    grossMargin: revenue > 0 ? (revenue - total) / revenue : null,
    counts: { leads: num(r.leads), websites: num(r.websites), deployments: num(r.deployments), customers: num(r.customers) },
  };
}

export async function getActivity(orgId: string, limit = 40, afterId?: number) {
  const rows = await q(sql`
    SELECT l.id, l.agent_key, l.level, l.message, l.created_at, l.task_id, l.run_id
    FROM agent_logs l
    WHERE l.organization_id = ${orgId} AND l.level IN ('info', 'warn', 'error') ${afterId ? sql`AND l.id > ${afterId}` : sql``}
    ORDER BY l.id DESC LIMIT ${limit}
  `);
  return rows.map((r) => ({
    id: num(r.id),
    agentKey: String(r.agent_key),
    level: String(r.level),
    message: String(r.message),
    createdAt: new Date(r.created_at as string).toISOString(),
    taskId: r.task_id ? String(r.task_id) : null,
    runId: r.run_id ? String(r.run_id) : null,
  }));
}
