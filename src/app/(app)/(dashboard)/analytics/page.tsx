import { sql } from "drizzle-orm";
import { ChartCard, FunnelCard } from "@/components/app/charts";
import { SubNav } from "@/components/app/sidebar";
import { makeDelta, PageHeader, RangePicker, Section, StatCard } from "@/components/app/page";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_KEYS, AGENT_META, categoryLabel } from "@/lib/constants";
import { parseRange, previousRange, rangeQuery } from "@/lib/range";
import { formatDuration, formatEur, formatNumber } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db } from "@/server/db";
import { getAgentStats, getFinancials, getFunnel, getKpis, getRangeSeries, getRangeTotals } from "@/server/queries/metrics";

export const metadata = { title: "Analytics" };

type Row = Record<string, unknown>;

export default async function AnalyticsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const range = parseRange(await searchParams);
  const prevRange = previousRange(range);
  const minScore = auth.org.settings.minLeadScore;
  const from = range.from.toISOString();
  const to = range.to.toISOString();
  const [cur, prev, series, fin, prevFin, kpis, funnel, agentStats, byCategory, qc, email] = await Promise.all([
    getRangeTotals(orgId, minScore, range.from, range.to),
    getRangeTotals(orgId, minScore, prevRange.from, prevRange.to),
    getRangeSeries(orgId, range.from, range.to),
    getFinancials(orgId, range.from, range.to),
    getFinancials(orgId, prevRange.from, prevRange.to),
    getKpis(orgId, minScore),
    getFunnel(orgId),
    getAgentStats(orgId, Math.min(365, range.days)),
    db().execute(sql`
      SELECT category, count(*) AS discovered,
        count(*) FILTER (WHERE lead_score >= ${minScore}) AS qualified,
        count(*) FILTER (WHERE pipeline_stage IN ('CONTACTED','REPLIED','NEGOTIATION','WON','LOST')) AS contacted,
        count(*) FILTER (WHERE pipeline_stage IN ('REPLIED','NEGOTIATION','WON')) AS replied,
        count(*) FILTER (WHERE pipeline_stage = 'WON') AS won,
        coalesce(sum(sales_value_cents) FILTER (WHERE pipeline_stage = 'WON'), 0) AS won_value,
        round(avg(lead_score)) AS avg_score
      FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND erased_at IS NULL
        AND created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz
      GROUP BY category ORDER BY discovered DESC`) as unknown as Promise<Row[]>,
    db().execute(sql`
      SELECT count(*) AS versions,
        count(*) FILTER (WHERE qc_score >= 85) AS passed,
        round(avg(qc_score)) AS avg_score
      FROM website_versions WHERE organization_id = ${orgId} AND qc_score IS NOT NULL AND NOT is_mock
        AND created_at >= ${from}::timestamptz AND created_at < ${to}::timestamptz`) as unknown as Promise<Row[]>,
    db().execute(sql`
      SELECT
        count(DISTINCT e.id) FILTER (WHERE e.status = 'sent' AND NOT e.is_mock) AS sent,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type = 'delivered') AS delivered,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type IN ('bounced','complained')) AS bounced,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type = 'unsubscribed') AS unsubscribed
      FROM sales_emails e LEFT JOIN email_events ev ON ev.email_id = e.id
      WHERE e.organization_id = ${orgId} AND e.sent_at >= ${from}::timestamptz AND e.sent_at < ${to}::timestamptz`) as unknown as Promise<Row[]>,
  ]);
  const n = (v: unknown) => Number(v ?? 0);
  const q = qc[0] ?? {};
  const em = email[0] ?? {};
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");
  const vs = "vs the period before";
  const rate = auth.org.settings.usdToEurRate;
  const eur = (v: number) => `${v < 0 ? "−" : ""}€${Math.abs(Math.round(v)).toLocaleString("nl-NL")}`;
  const apiEur = (f: typeof fin) => (f.aiUsd + f.emailUsd + f.otherApiUsd) * rate;
  const profit = fin.revenueEur - apiEur(fin) - fin.expensesEur;
  const prevProfit = prevFin.revenueEur - apiEur(prevFin) - prevFin.expensesEur;
  const agentRows = AGENT_KEYS.map((k) => ({ key: k, ...(agentStats[k] ?? { completed: 0, failed: 0, running: 0, pending: 0, waiting: 0, avgMs: null, cost: 0 }) }));

  return (
    <>
      <SubNav section="/analytics" />
      <PageHeader eyebrow="Intelligence" title="Analytics" description={`How your agency performed in ${range.label}, compared with the period before. Test (mock) records are never counted.`} />
      <RangePicker path="/analytics" current={range.key} from={range.from.toISOString().slice(0, 10)} to={range.to.toISOString().slice(0, 10)} />
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Leads found" value={formatNumber(cur.leads)} delta={makeDelta(cur.leads, prev.leads, { label: vs })} tone="neutral" href="/businesses" />
        <StatCard label="Qualified leads" value={formatNumber(cur.qualified)} delta={makeDelta(cur.qualified, prev.qualified, { label: vs })} tone="neutral" help={`Leads scoring ${minScore} or higher.`} />
        <StatCard label="Websites generated" value={formatNumber(cur.websites)} delta={makeDelta(cur.websites, prev.websites, { label: vs })} tone="neutral" href="/websites" />
        <StatCard label="Websites deployed" value={formatNumber(cur.deployments)} delta={makeDelta(cur.deployments, prev.deployments, { label: vs })} tone="neutral" href="/previews" />
        <StatCard label="Emails sent" value={formatNumber(cur.emailsSent)} delta={makeDelta(cur.emailsSent, prev.emailsSent, { label: vs })} tone="neutral" href="/emails" sub={`${pct(n(em.delivered), n(em.sent))} delivered`} />
        <StatCard label="Customers won" value={formatNumber(cur.customers)} delta={makeDelta(cur.customers, prev.customers, { label: vs })} tone="success" href="/pipeline" />
        <StatCard label="Conversion rate" value={pct(cur.customers, cur.leads)} tone="neutral" sub="Customers ÷ leads found" help="Customers won in this period divided by leads found in this period. With few leads this number jumps around a lot." />
        <StatCard label="Revenue" value={eur(fin.revenueEur)} delta={makeDelta(fin.revenueEur, prevFin.revenueEur, { label: vs })} tone="success" href="/revenue" />
        <StatCard label="Monthly recurring revenue" value={formatEur(kpis.mrrCents)} tone="success" sub="Right now" href="/revenue" />
        <StatCard label="Profit" value={eur(profit)} delta={makeDelta(profit, prevProfit, { label: vs })} tone={profit < 0 ? "danger" : "success"} href={`/revenue?${rangeQuery(range)}`} sub="After API costs and expenses" help={`Revenue minus API costs (converted at ${rate} €/$) minus the expenses you entered on the Revenue page.`} />
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Leads and websites" description={`Per ${range.days > 120 ? "week" : "day"}, ${range.label}`} data={series} xKey="label" series={[{ key: "leads", label: "Leads" }, { key: "websites", label: "Websites" }]} kind="line" empty="Nothing in this period yet" />
        <FunnelCard title="Conversion funnel" description="All time" steps={funnel} />
        <ChartCard title="Revenue" description="EUR" data={series} xKey="label" series={[{ key: "revenue", label: "Revenue" }]} kind="bar" format="eur" empty="No payments in this period" />
        <ChartCard title="API spend" description="USD" data={series} xKey="label" series={[{ key: "cost", label: "Spend" }]} kind="bar" format="usd" empty="No spend in this period" />
        <ChartCard title="Emails sent" data={series} xKey="label" series={[{ key: "emails", label: "Emails" }]} kind="bar" empty="No emails in this period" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        <StatCard label="Quality check pass rate" value={pct(n(q.passed), n(q.versions))} sub={`${n(q.versions)} version(s) tested`} tone="neutral" help="Share of generated website versions that scored 85 or higher on the automatic test." />
        <StatCard label="Average quality score" value={q.avg_score != null ? n(q.avg_score) : "—"} sub="Out of 100" tone="neutral" />
        <StatCard label="Bounced or complained" value={pct(n(em.bounced), n(em.sent))} sub={`${n(em.unsubscribed)} unsubscribed`} tone={n(em.bounced) ? "warning" : "neutral"} />
        <StatCard label="Agent success rate" value={pct(cur.tasksDone, cur.tasksDone + cur.tasksFailed)} sub={`${cur.tasksDone} done · ${cur.tasksFailed} failed`} tone="neutral" href="/tasks" />
      </div>
      <Section className="mt-8" title="By type of business" description={`Leads found in ${range.label}, and how far they got.`}>
        <Table>
          <THead>
            <tr>
              <TH>Category</TH>
              <TH className="text-right">Discovered</TH>
              <TH className="text-right">Qualified</TH>
              <TH className="text-right">Contacted</TH>
              <TH className="text-right">Reply rate</TH>
              <TH className="text-right">Won</TH>
              <TH className="text-right">Won value</TH>
              <TH className="text-right">Avg score</TH>
            </tr>
          </THead>
          <tbody>
            {byCategory.length === 0 && (
              <TR>
                <TD colSpan={8} className="py-8 text-center text-xs text-muted">
                  No leads found in this period.
                </TD>
              </TR>
            )}
            {byCategory.map((r) => (
              <TR key={String(r.category)}>
                <TD className="font-medium">{categoryLabel(String(r.category))}</TD>
                <TD className="tabular text-right">{n(r.discovered)}</TD>
                <TD className="tabular text-right">{n(r.qualified)}</TD>
                <TD className="tabular text-right">{n(r.contacted)}</TD>
                <TD className="tabular text-right">{pct(n(r.replied), n(r.contacted))}</TD>
                <TD className="tabular text-right">{n(r.won)}</TD>
                <TD className="tabular text-right">{formatEur(n(r.won_value))}</TD>
                <TD className="tabular text-right">{r.avg_score != null ? n(r.avg_score) : "—"}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Section>
      <Section title="Agent performance" description={`Tasks in ${range.label}.`}>
        <Table>
          <THead>
            <tr>
              <TH>Agent</TH>
              <TH className="text-right">Completed</TH>
              <TH className="text-right">Failed</TH>
              <TH className="text-right">Success rate</TH>
              <TH className="text-right">Avg time</TH>
              <TH className="text-right">Cost</TH>
            </tr>
          </THead>
          <tbody>
            {agentRows.map((a) => (
              <TR key={a.key}>
                <TD className="font-medium">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: AGENT_META[a.key].color }} />
                  {AGENT_META[a.key].name}
                </TD>
                <TD className="tabular text-right">{a.completed}</TD>
                <TD className="tabular text-right">{a.failed}</TD>
                <TD className="tabular text-right">{pct(a.completed, a.completed + a.failed)}</TD>
                <TD className="tabular text-right">{formatDuration(a.avgMs)}</TD>
                <TD className="tabular text-right">${a.cost.toFixed(2)}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </Section>
    </>
  );
}
