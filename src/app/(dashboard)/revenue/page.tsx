import { desc, eq } from "drizzle-orm";
import { Euro, Repeat, TrendingUp, Users } from "lucide-react";
import { ChartCard } from "@/components/app/charts";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { formatEur, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getKpis, getMonthlyRevenue, getUnitEconomics } from "@/server/queries/metrics";

export const metadata = { title: "Revenue" };

export default async function RevenuePage() {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const [kpis, unit, monthly, payments, subs] = await Promise.all([
    getKpis(orgId, auth.org.settings.minLeadScore),
    getUnitEconomics(orgId),
    getMonthlyRevenue(orgId, 12),
    db().select().from(schema.payments).where(eq(schema.payments.organizationId, orgId)).orderBy(desc(schema.payments.createdAt)).limit(25),
    db().select().from(schema.subscriptions).where(eq(schema.subscriptions.organizationId, orgId)).orderBy(desc(schema.subscriptions.createdAt)).limit(25),
  ]);
  const active = subs.filter((s) => s.status === "active").length;
  return (
    <>
      <SubNav section="/analytics" />
      <PageHeader eyebrow="INTELLIGENCE // REVENUE" title="Revenue" description="Payments and subscriptions recorded from Stripe webhooks or entered manually." />
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        <StatCard label="Total revenue" value={formatEur(kpis.revenueCents)} icon={<Euro />} tone="accent" />
        <StatCard label="MRR" value={formatEur(kpis.mrrCents)} icon={<Repeat />} />
        <StatCard label="Active subscriptions" value={String(active)} sub={`${subs.length} total`} icon={<Users />} />
        <StatCard label="Profit (nominal)" value={`€${Math.round(unit.revenue - unit.totalCost).toLocaleString("nl-NL")}`} sub="Revenue − API costs" icon={<TrendingUp />} tone={unit.revenue - unit.totalCost < 0 ? "danger" : undefined} />
      </div>
      <Section className="mt-8" title="Monthly revenue">
        <ChartCard title="Revenue" description="EUR / month, last 12 months" data={monthly} xKey="label" series={[{ key: "revenue", label: "Revenue" }]} kind="bar" format="eur" empty="No payments yet" />
      </Section>
      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Payments" className="mb-0">
          <Table>
            <THead>
              <tr>
                <TH>Description</TH>
                <TH>Status</TH>
                <TH className="text-right">Amount</TH>
                <TH>When</TH>
              </tr>
            </THead>
            <tbody>
              {payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="mono px-4 py-8 text-center text-[11px] text-subtle">No payments recorded.</td>
                </tr>
              )}
              {payments.map((p) => (
                <TR key={p.id}>
                  <TD className="max-w-[220px] truncate text-[13px]">{p.description ?? p.source}</TD>
                  <TD><StatusBadge status={p.status} /></TD>
                  <TD className="mono tabular text-right">{formatEur(p.amountCents)}</TD>
                  <TD className="mono whitespace-nowrap text-[11px] text-subtle">{timeAgo(p.paidAt ?? p.createdAt)}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Section>
        <Section title="Subscriptions" className="mb-0">
          <Table>
            <THead>
              <tr>
                <TH>Plan</TH>
                <TH>Status</TH>
                <TH className="text-right">Amount</TH>
                <TH>Started</TH>
              </tr>
            </THead>
            <tbody>
              {subs.length === 0 && (
                <tr>
                  <td colSpan={4} className="mono px-4 py-8 text-center text-[11px] text-subtle">No subscriptions yet.</td>
                </tr>
              )}
              {subs.map((s) => (
                <TR key={s.id}>
                  <TD className="text-[13px]">{s.plan ?? "—"}</TD>
                  <TD><StatusBadge status={s.status} /></TD>
                  <TD className="mono tabular text-right">{formatEur(s.amountCents)}/{s.interval === "year" ? "yr" : "mo"}</TD>
                  <TD className="mono whitespace-nowrap text-[11px] text-subtle">{s.startedAt ? timeAgo(s.startedAt) : "—"}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Section>
      </div>
    </>
  );
}
