import { sql } from "drizzle-orm";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { ChartCard } from "@/components/app/charts";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { Card, CardContent, CardHeader, CardTitle, Progress } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_META, type AgentKey, isCustomerStage } from "@/lib/constants";
import { cn, formatNumber, formatUsd } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { checkBudget, startOfUtcMonth } from "@/server/costs/usage";
import { MODEL_PRICING, UNIT_PRICING } from "@/server/costs/pricing";
import { db } from "@/server/db";
import { getCostBreakdown, getDailySeries, getUnitEconomics } from "@/server/queries/metrics";
import { LimitsForm } from "./limits-form";

export const metadata = { title: "AI costs" };

export default async function CostsPage() {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const [budget, breakdown, daily, unit, topRuns, topSites, topCustomers] = await Promise.all([
    checkBudget(orgId),
    getCostBreakdown(orgId, startOfUtcMonth()),
    getDailySeries(orgId, 30),
    getUnitEconomics(orgId),
    // The most expensive individual executions, websites and customers (real spend only).
    db().execute(sql`
      SELECT t.id, t.agent_key, t.type, t.cost_usd, t.created_at, b.name AS business, t.input->>'customAgentName' AS custom
      FROM agent_tasks t LEFT JOIN businesses b ON b.id = t.business_id
      WHERE t.organization_id = ${orgId} AND t.cost_usd > 0 AND t.created_at > now() - interval '30 days'
      ORDER BY t.cost_usd DESC LIMIT 8`) as unknown as Promise<Record<string, unknown>[]>,
    db().execute(sql`
      SELECT p.id, b.name, coalesce(sum(u.cost_usd), 0) AS cost, count(u.id) AS calls
      FROM website_projects p JOIN businesses b ON b.id = p.business_id
      JOIN api_usage u ON u.project_id = p.id AND NOT u.is_mock
      WHERE p.organization_id = ${orgId} GROUP BY p.id, b.name ORDER BY cost DESC LIMIT 8`) as unknown as Promise<Record<string, unknown>[]>,
    db().execute(sql`
      SELECT b.id, b.name, b.pipeline_stage, coalesce(sum(u.cost_usd), 0) AS cost
      FROM businesses b JOIN api_usage u ON u.business_id = b.id AND NOT u.is_mock
      WHERE b.organization_id = ${orgId} AND b.erased_at IS NULL GROUP BY b.id, b.name, b.pipeline_stage ORDER BY cost DESC LIMIT 8`) as unknown as Promise<Record<string, unknown>[]>,
  ]);
  const warn = auth.org.settings.budgetWarnPct;
  const usd = (v: number | null) => (v == null ? "—" : formatUsd(v));
  const dailyPct = budget.daily.limit ? (budget.daily.spent / budget.daily.limit) * 100 : 0;
  const monthPct = budget.monthly.limit ? (budget.monthly.spent / budget.monthly.limit) * 100 : 0;
  const tone = (p: number) => (p >= 100 ? "danger" : p >= warn ? "warning" : "accent") as "danger" | "warning" | "accent";
  const worst = Math.max(dailyPct, monthPct);
  const tokens = breakdown.byProvider.filter((p) => p.provider === "anthropic").reduce((a, p) => ({ in: a.in + p.inputTokens, out: a.out + p.outputTokens, cache: a.cache + p.cacheTokens }), { in: 0, out: 0, cache: 0 });

  return (
    <>
      <SubNav section="/analytics" />
      <PageHeader eyebrow="Intelligence" title="AI costs" description="Every paid call your agents make is recorded here. When a limit is reached, agents stop spending and ask you first, so the bill can never run away." />
      {worst >= warn && (
        <div className={cn("mb-4 flex items-start gap-3 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed", worst >= 100 ? "border-[rgba(180,42,37,0.3)] bg-danger-soft text-danger" : "border-[rgba(196,128,0,0.3)] bg-warning-soft text-warning")}>
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            {worst >= 100
              ? "A spending limit is reached. Agents that cost money are paused and will ask for your approval before each task. Raise the limit below, or wait for the next day or month."
              : `You have used ${Math.floor(worst)}% of a spending limit. Agents pause automatically at 100%.`}
          </span>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-medium text-muted">Today (UTC)</p>
          <p className="tabular mt-1 text-2xl font-semibold">{formatUsd(budget.daily.spent)}</p>
          <Progress className="mt-3" value={dailyPct} tone={tone(dailyPct)} />
          <p className="mt-1.5 text-xs text-muted">of {formatUsd(budget.daily.limit, 0)} daily limit</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-medium text-muted">This month</p>
          <p className="tabular mt-1 text-2xl font-semibold">{formatUsd(budget.monthly.spent)}</p>
          <Progress className="mt-3" value={monthPct} tone={tone(monthPct)} />
          <p className="mt-1.5 text-xs text-muted">of {formatUsd(budget.monthly.limit, 0)} monthly limit</p>
        </Card>
        <Card className="p-5">
          <p className="mb-3 text-xs font-medium text-muted">Spending limits</p>
          <LimitsForm daily={auth.org.settings.dailySpendLimitUsd} monthly={auth.org.settings.monthlySpendLimitUsd} warnPct={warn} canAdmin={hasRole(auth.role, "admin")} />
        </Card>
      </div>

      <Section className="mt-8" title="Unit economics" description="All-time, real data only.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard label="Cost per lead" value={usd(unit.costPerLead)} sub={`${unit.counts.leads} leads`} />
          <StatCard label="Cost per generated website" value={usd(unit.costPerWebsite)} sub={`${unit.counts.websites} websites`} />
          <StatCard label="Cost per successful deployment" value={usd(unit.costPerDeployment)} sub={`${unit.counts.deployments} deployments`} />
          <StatCard label="Cost per acquired customer" value={usd(unit.costPerCustomer)} sub={`${unit.counts.customers} customers`} />
          <StatCard label="Revenue per customer" value={unit.revenuePerCustomer == null ? "—" : `€${unit.revenuePerCustomer.toFixed(0)}`} tone="success" />
          <StatCard label="Gross margin" value={unit.grossMargin == null ? "—" : `${(unit.grossMargin * 100).toFixed(1)}%`} sub="(Revenue − API costs) ÷ revenue" tone="success" />
          <StatCard label="Total API cost" value={formatUsd(unit.totalCost)} tone="danger" />
          <StatCard label="Claude tokens (month)" value={formatNumber(tokens.in + tokens.out)} sub={`${formatNumber(tokens.in)} in · ${formatNumber(tokens.out)} out · ${formatNumber(tokens.cache)} cached`} />
        </div>
        <p className="mt-2 text-[12.5px] leading-relaxed text-subtle">
          Claude costs are calculated from the exact token counts the API reports for each call, at published prices (confirmed usage). Google Places, Hunter and Resend are counted per call at a list price (estimates; your contract may differ). Your provider invoices are always the final word.
        </p>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Daily API spend" description="USD, last 30 days" data={daily} xKey="label" series={[{ key: "cost", label: "Spend" }]} kind="bar" format="usd" empty="No spend recorded" />
        <Card>
          <CardHeader>
            <CardTitle>Spend by agent (this month)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {breakdown.byAgent.length === 0 && <p className="text-xs text-muted">No usage this month.</p>}
            {breakdown.byAgent.map((a) => {
              const max = Math.max(...breakdown.byAgent.map((x) => x.cost), 0.0001);
              return (
                <div key={a.agentKey} title={`${a.calls} calls`}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span>{AGENT_META[a.agentKey as AgentKey]?.name ?? (a.agentKey === "other" ? "Orchestrator / other" : a.agentKey)}</span>
                    <span className="tabular font-medium">{formatUsd(a.cost)}</span>
                  </div>
                  <Progress value={(a.cost / max) * 100} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        <Section title="Most expensive runs" description="Single tasks, last 30 days." className="mb-0">
          <Card className="divide-y divide-border">
            {topRuns.length === 0 && <p className="px-4 py-6 text-center text-[13px] text-muted">No paid runs yet.</p>}
            {topRuns.map((r) => (
              <div key={String(r.id)} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[13.5px] font-medium">{r.custom ? String(r.custom) : (AGENT_META[String(r.agent_key) as AgentKey]?.name ?? String(r.agent_key))}</p>
                  <p className="truncate text-[12px] text-subtle">
                    {String(r.type).replace(/_/g, " ")}
                    {r.business ? ` · ${String(r.business)}` : ""}
                  </p>
                </div>
                <span className="tabular shrink-0 text-[13.5px] font-medium">{formatUsd(Number(r.cost_usd))}</span>
              </div>
            ))}
          </Card>
        </Section>
        <Section title="Cost per website" description="All API spend tied to one site." className="mb-0">
          <Card className="divide-y divide-border">
            {topSites.length === 0 && <p className="px-4 py-6 text-center text-[13px] text-muted">No website costs recorded yet.</p>}
            {topSites.map((r) => (
              <Link key={String(r.id)} href={`/websites/${String(r.id)}`} className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-surface-2">
                <span className="min-w-0 truncate text-[13.5px] font-medium">{String(r.name)}</span>
                <span className="tabular shrink-0 text-[13.5px] font-medium">{formatUsd(Number(r.cost))}</span>
              </Link>
            ))}
          </Card>
        </Section>
        <Section title="Cost per lead or customer" description="Everything spent on one business." className="mb-0">
          <Card className="divide-y divide-border">
            {topCustomers.length === 0 && <p className="px-4 py-6 text-center text-[13px] text-muted">No per-lead costs recorded yet.</p>}
            {topCustomers.map((r) => (
              <Link key={String(r.id)} href={`/businesses/${String(r.id)}`} className="flex items-center justify-between gap-3 px-4 py-2.5 hover:bg-surface-2">
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-medium">{String(r.name)}</span>
                  <span className="block text-[12px] text-subtle">{isCustomerStage(String(r.pipeline_stage)) ? "Customer" : "Lead"}</span>
                </span>
                <span className="tabular shrink-0 text-[13.5px] font-medium">{formatUsd(Number(r.cost))}</span>
              </Link>
            ))}
          </Card>
        </Section>
      </div>

      <Section className="mt-8" title="Usage by provider and operation" description="This month.">
        <Table>
          <THead>
            <tr>
              <TH>Provider</TH>
              <TH>Operation</TH>
              <TH>Model</TH>
              <TH className="text-right">Calls</TH>
              <TH className="text-right">Input tokens</TH>
              <TH className="text-right">Output tokens</TH>
              <TH className="text-right">Cost</TH>
            </tr>
          </THead>
          <tbody>
            {breakdown.byProvider.length === 0 && (
              <TR>
                <TD colSpan={7} className="py-8 text-center text-xs text-muted">
                  No metered usage this month.
                </TD>
              </TR>
            )}
            {breakdown.byProvider.map((p, i) => (
              <TR key={i}>
                <TD className="font-medium">
                  {p.provider}
                  <span className="ml-2 text-[11.5px] font-normal text-subtle">{p.provider === "anthropic" ? "confirmed usage" : "estimated"}</span>
                </TD>
                <TD className="text-muted">{p.operation}</TD>
                <TD className="text-muted">{p.model ?? "—"}</TD>
                <TD className="tabular text-right">{formatNumber(p.calls)}</TD>
                <TD className="tabular text-right">{p.inputTokens ? formatNumber(p.inputTokens) : "—"}</TD>
                <TD className="tabular text-right">{p.outputTokens ? formatNumber(p.outputTokens) : "—"}</TD>
                <TD className="tabular text-right">{formatUsd(p.cost)}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Section>
      <Section title="Price list" description="Used to compute costs. Claude prices are first-party API rates per million tokens; other units are estimates — check your contracts.">
        <div className="grid gap-4 md:grid-cols-2">
          <Table>
            <THead>
              <tr>
                <TH>Model</TH>
                <TH className="text-right">Input / 1M</TH>
                <TH className="text-right">Output / 1M</TH>
                <TH className="text-right">Cache read / 1M</TH>
              </tr>
            </THead>
            <tbody>
              {Object.entries(MODEL_PRICING).map(([m, p]) => (
                <TR key={m}>
                  <TD>{m}</TD>
                  <TD className="tabular text-right">${p.input}</TD>
                  <TD className="tabular text-right">${p.output}</TD>
                  <TD className="tabular text-right">${p.cacheRead}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
          <Table>
            <THead>
              <tr>
                <TH>Unit</TH>
                <TH className="text-right">Price</TH>
              </tr>
            </THead>
            <tbody>
              {Object.entries(UNIT_PRICING).map(([k, v]) => (
                <TR key={k}>
                  <TD>{k.replace(/_/g, " ")}</TD>
                  <TD className="tabular text-right">{v === 0 ? "included / self-hosted" : `$${v}`}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </div>
      </Section>
    </>
  );
}
