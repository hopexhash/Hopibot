import { ChartCard } from "@/components/app/charts";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { Card, CardContent, CardHeader, CardTitle, Progress } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { formatNumber, formatUsd } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { checkBudget, startOfUtcMonth } from "@/server/costs/usage";
import { MODEL_PRICING, UNIT_PRICING } from "@/server/costs/pricing";
import { getCostBreakdown, getDailySeries, getUnitEconomics } from "@/server/queries/metrics";
import { LimitsForm } from "./limits-form";

export const metadata = { title: "Costs & Usage" };

export default async function CostsPage() {
  const auth = await requireAuth();
  const [budget, breakdown, daily, unit] = await Promise.all([
    checkBudget(auth.org.id),
    getCostBreakdown(auth.org.id, startOfUtcMonth()),
    getDailySeries(auth.org.id, 30),
    getUnitEconomics(auth.org.id),
  ]);
  const usd = (v: number | null) => (v == null ? "—" : formatUsd(v));
  const dailyPct = budget.daily.limit ? (budget.daily.spent / budget.daily.limit) * 100 : 0;
  const monthPct = budget.monthly.limit ? (budget.monthly.spent / budget.monthly.limit) * 100 : 0;
  const tone = (p: number) => (p >= 100 ? "danger" : p >= 80 ? "warning" : "accent") as "danger" | "warning" | "accent";
  const tokens = breakdown.byProvider.filter((p) => p.provider === "anthropic").reduce((a, p) => ({ in: a.in + p.inputTokens, out: a.out + p.outputTokens, cache: a.cache + p.cacheTokens }), { in: 0, out: 0, cache: 0 });

  return (
    <>
      <PageHeader title="Costs & Usage" description="Every paid API call is metered. When a limit is reached, paid agents pause and ask for approval instead of spending." />
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
          <LimitsForm daily={auth.org.settings.dailySpendLimitUsd} monthly={auth.org.settings.monthlySpendLimitUsd} canAdmin={hasRole(auth.role, "admin")} />
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
        <p className="mt-2 text-[11px] text-muted">Revenue is recorded in EUR and API costs in USD; margin uses the nominal values without currency conversion.</p>
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
                <TD className="font-medium">{p.provider}</TD>
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
