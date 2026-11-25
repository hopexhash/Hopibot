import { sql } from "drizzle-orm";
import { ChartCard, FunnelCard } from "@/components/app/charts";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { AGENT_KEYS, AGENT_META, categoryLabel } from "@/lib/constants";
import { formatDuration, formatEur } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db } from "@/server/db";
import { getAgentStats, getDailySeries, getFunnel } from "@/server/queries/metrics";

export const metadata = { title: "Analytics" };

type Row = Record<string, unknown>;

export default async function AnalyticsPage() {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const [daily, funnel, agentStats, byCategory, qc, email] = await Promise.all([
    getDailySeries(orgId, 60),
    getFunnel(orgId),
    getAgentStats(orgId, 90),
    db().execute(sql`
      SELECT category, count(*) AS discovered,
        count(*) FILTER (WHERE lead_score >= ${auth.org.settings.minLeadScore}) AS qualified,
        count(*) FILTER (WHERE pipeline_stage IN ('CONTACTED','REPLIED','NEGOTIATION','WON','LOST')) AS contacted,
        count(*) FILTER (WHERE pipeline_stage IN ('REPLIED','NEGOTIATION','WON')) AS replied,
        count(*) FILTER (WHERE pipeline_stage = 'WON') AS won,
        coalesce(sum(sales_value_cents) FILTER (WHERE pipeline_stage = 'WON'), 0) AS won_value,
        round(avg(lead_score)) AS avg_score
      FROM businesses WHERE organization_id = ${orgId} AND NOT is_mock AND erased_at IS NULL
      GROUP BY category ORDER BY discovered DESC`) as unknown as Promise<Row[]>,
    db().execute(sql`
      SELECT count(*) AS versions,
        count(*) FILTER (WHERE qc_score >= 85) AS passed,
        round(avg(qc_score)) AS avg_score,
        (SELECT round(avg(c), 1) FROM (SELECT count(*) c FROM website_versions WHERE organization_id = ${orgId} GROUP BY project_id) x) AS avg_versions
      FROM website_versions WHERE organization_id = ${orgId} AND qc_score IS NOT NULL`) as unknown as Promise<Row[]>,
    db().execute(sql`
      SELECT
        count(DISTINCT e.id) FILTER (WHERE e.status = 'sent' AND NOT e.is_mock) AS sent,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type = 'delivered') AS delivered,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type = 'opened') AS opened,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type = 'replied') AS replied,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type IN ('bounced','complained')) AS bounced,
        count(DISTINCT ev.email_id) FILTER (WHERE ev.type = 'unsubscribed') AS unsubscribed
      FROM sales_emails e LEFT JOIN email_events ev ON ev.email_id = e.id
      WHERE e.organization_id = ${orgId}`) as unknown as Promise<Row[]>,
  ]);
  const n = (v: unknown) => Number(v ?? 0);
  const q = qc[0] ?? {};
  const em = email[0] ?? {};
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");
  const agentRows = AGENT_KEYS.map((k) => ({ key: k, ...(agentStats[k] ?? { completed: 0, failed: 0, running: 0, pending: 0, waiting: 0, avgMs: null, cost: 0 }) }));

  return (
    <>
      <SubNav section="/analytics" />
      <PageHeader title="Analytics" description="Performance of discovery, website generation, outreach and agents. Mock data is excluded." />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="QC pass rate" value={pct(n(q.passed), n(q.versions))} sub={`${n(q.versions)} versions tested`} tone="success" />
        <StatCard label="Avg QC score" value={q.avg_score != null ? n(q.avg_score) : "—"} />
        <StatCard label="Avg versions per site" value={q.avg_versions != null ? n(q.avg_versions) : "—"} />
        <StatCard label="Emails sent" value={n(em.sent)} />
        <StatCard label="Reply rate" value={pct(n(em.replied), n(em.sent))} sub={`${n(em.replied)} replies`} tone="success" />
        <StatCard label="Bounce / complaint" value={pct(n(em.bounced), n(em.sent))} sub={`${n(em.unsubscribed)} unsubscribed`} tone="danger" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Leads and websites" description="Per day, last 60 days" data={daily} xKey="label" series={[{ key: "leads", label: "Leads" }, { key: "websites", label: "Websites" }]} kind="line" empty="No activity yet" />
        <FunnelCard title="Conversion funnel" steps={funnel} />
      </div>
      <Section className="mt-8" title="By category" description="Where the agency converts best.">
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
                  No real (non-mock) businesses yet.
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
      <Section title="Agent performance" description="Last 90 days.">
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
