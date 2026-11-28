import { and, desc, eq, gte, lt } from "drizzle-orm";
import { Euro, Receipt, Repeat, TrendingUp } from "lucide-react";
import { ChartCard } from "@/components/app/charts";
import { makeDelta, PageHeader, RangePicker, Section, StatCard } from "@/components/app/page";
import { SubNav } from "@/components/app/sidebar";
import { StatusBadge } from "@/components/app/status";
import { Card, HelpTip } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { parseRange, previousRange } from "@/lib/range";
import { cn, formatDate, formatEur, formatUsd, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { getFinancials, getKpis, getMonthlyRevenue } from "@/server/queries/metrics";
import { DeleteExpense, ExpenseForm } from "./expense-form";

export const metadata = { title: "Revenue" };

const CATEGORY_LABEL: Record<string, string> = { hosting: "Hosting & domains", email: "Email service", software: "Software & tools", contractor: "Freelancers", other: "Other" };
const PROVIDER_LABEL: Record<string, string> = { anthropic: "Claude (AI)", google_places: "Google Places", hunter: "Hunter.io", resend: "Resend (email)", vercel: "Vercel" };

export default async function RevenuePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const range = parseRange(await searchParams);
  const prevR = previousRange(range);
  const [kpis, fin, prevFin, monthly, payments, subs, expenses] = await Promise.all([
    getKpis(orgId, auth.org.settings.minLeadScore),
    getFinancials(orgId, range.from, range.to),
    getFinancials(orgId, prevR.from, prevR.to),
    getMonthlyRevenue(orgId, 12),
    db().select().from(schema.payments).where(eq(schema.payments.organizationId, orgId)).orderBy(desc(schema.payments.createdAt)).limit(25),
    db().select().from(schema.subscriptions).where(eq(schema.subscriptions.organizationId, orgId)).orderBy(desc(schema.subscriptions.createdAt)).limit(25),
    db()
      .select()
      .from(schema.expenses)
      .where(and(eq(schema.expenses.organizationId, orgId), gte(schema.expenses.incurredOn, range.from), lt(schema.expenses.incurredOn, range.to)))
      .orderBy(desc(schema.expenses.incurredOn))
      .limit(100),
  ]);
  const rate = auth.org.settings.usdToEurRate;
  const apiUsd = (f: typeof fin) => f.aiUsd + f.emailUsd + f.otherApiUsd;
  const profit = fin.revenueEur - apiUsd(fin) * rate - fin.expensesEur;
  const prevProfit = prevFin.revenueEur - apiUsd(prevFin) * rate - prevFin.expensesEur;
  const margin = fin.revenueEur > 0 ? (profit / fin.revenueEur) * 100 : null;
  const eur = (v: number) => `${v < 0 ? "−" : ""}€${Math.abs(v).toLocaleString("nl-NL", { maximumFractionDigits: 2, minimumFractionDigits: Math.abs(v) < 100 && v % 1 !== 0 ? 2 : 0 })}`;
  const vs = "vs the period before";
  const active = subs.filter((s) => s.status === "active").length;
  const canEdit = hasRole(auth.role, "admin");
  const lines: { label: string; value: number; note?: string; kind: "in" | "out" }[] = [
    { label: "Customer revenue", value: fin.revenueEur, kind: "in", note: "Payments received" },
    { label: "AI (Claude)", value: -fin.aiUsd * rate, kind: "out", note: `${formatUsd(fin.aiUsd)} · from real token counts` },
    { label: "Email sending", value: -fin.emailUsd * rate, kind: "out", note: `${formatUsd(fin.emailUsd)} · estimated per email` },
    { label: "Other paid services", value: -fin.otherApiUsd * rate, kind: "out", note: `${formatUsd(fin.otherApiUsd)} · estimated per call` },
    ...fin.expensesByCategoryEur.map((e) => ({ label: CATEGORY_LABEL[e.category] ?? e.category, value: -e.amount, kind: "out" as const, note: "Entered by you" })),
  ];

  return (
    <>
      <SubNav section="/analytics" />
      <PageHeader eyebrow="Intelligence" title="Revenue & profit" description={`Money in and out for ${range.label}. Revenue comes from Stripe or payments you recorded; costs come from metered API usage and the expenses you add here.`} />
      <RangePicker path="/revenue" current={range.key} from={range.from.toISOString().slice(0, 10)} to={range.to.toISOString().slice(0, 10)} />
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Revenue" value={eur(fin.revenueEur)} icon={<Euro />} tone="success" delta={makeDelta(fin.revenueEur, prevFin.revenueEur, { label: vs })} sub={`${formatEur(kpis.revenueCents)} all time`} />
        <StatCard label="Monthly recurring revenue" value={formatEur(kpis.mrrCents)} icon={<Repeat />} tone="success" sub={`${active} active subscription(s)`} help="What active subscriptions bring in per month right now. Yearly plans are divided by 12." />
        <StatCard label="Total costs" value={eur(apiUsd(fin) * rate + fin.expensesEur)} icon={<Receipt />} tone="warning" delta={makeDelta(apiUsd(fin) * rate + fin.expensesEur, apiUsd(prevFin) * rate + prevFin.expensesEur, { label: vs, higherIsBetter: false })} sub="API usage + expenses" />
        <StatCard label="Profit" value={eur(profit)} icon={<TrendingUp />} tone={profit < 0 ? "danger" : "success"} delta={makeDelta(profit, prevProfit, { label: vs })} sub="Revenue − all costs" />
        <StatCard label="Profit margin" value={margin == null ? "—" : `${margin.toFixed(0)}%`} tone="neutral" sub={margin == null ? "No revenue in this period" : "Profit ÷ revenue"} />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-5">
        <Card className="p-4 sm:p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 text-[14px] font-semibold">
            Where the money went
            <HelpTip>
              API costs are charged in US dollars and converted at {rate} €/$ (change it in Settings). “From real token counts” means the provider reported exactly how much was used; “estimated” means a published price per call was applied.
            </HelpTip>
          </h3>
          <dl className="mt-3 divide-y divide-border">
            {lines
              .filter((l) => l.kind === "in" || l.value !== 0)
              .map((l) => (
                <div key={l.label} className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="min-w-0">
                    <span className="block text-[13.5px]">{l.label}</span>
                    {l.note && <span className="block truncate text-[12px] text-subtle">{l.note}</span>}
                  </dt>
                  <dd className={cn("tabular shrink-0 text-[14px] font-medium", l.kind === "in" ? "text-accent" : "text-foreground")}>{eur(l.value)}</dd>
                </div>
              ))}
            <div className="flex items-center justify-between gap-3 py-3">
              <dt className="text-[14px] font-semibold">Profit</dt>
              <dd className={cn("tabular text-[16px] font-semibold", profit < 0 ? "text-danger" : "text-accent")}>{eur(profit)}</dd>
            </div>
          </dl>
        </Card>
        <ChartCard className="lg:col-span-3" title="Revenue and API cost" description="Per month, last 12 months (revenue in EUR, cost in USD)" data={monthly} xKey="label" series={[{ key: "revenue", label: "Revenue (€)" }, { key: "cost", label: "API cost ($)" }]} kind="bar" empty="No payments yet" />
      </div>

      <Section className="mt-8" title="Operating expenses" description="Hosting, tools and other costs the system cannot see by itself. Add them so profit is real.">
        <Card className="mb-3 p-4 sm:p-5">
          <ExpenseForm canEdit={canEdit} />
        </Card>
        {expenses.length === 0 ? (
          <p className="text-[13px] text-muted">No expenses recorded in this period.</p>
        ) : (
          <Table>
            <THead>
              <tr>
                <TH>Date</TH>
                <TH>Type</TH>
                <TH>Description</TH>
                <TH className="text-right">Amount</TH>
                <TH />
              </tr>
            </THead>
            <tbody>
              {expenses.map((e) => (
                <TR key={e.id}>
                  <TD className="whitespace-nowrap text-muted">{formatDate(e.incurredOn)}</TD>
                  <TD>{CATEGORY_LABEL[e.category] ?? e.category}</TD>
                  <TD className="max-w-[320px] truncate text-muted">{e.description}</TD>
                  <TD className="tabular text-right">{eur(e.amountCents / 100)}</TD>
                  <TD className="text-right">{canEdit && <DeleteExpense id={e.id} label={e.description} />}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        )}
      </Section>

      {fin.apiByProviderUsd.length > 0 && (
        <Section title="API spend by service" description={`Metered per call in ${range.label}.`}>
          <Table>
            <THead>
              <tr>
                <TH>Service</TH>
                <TH className="text-right">Calls</TH>
                <TH className="text-right">Cost</TH>
              </tr>
            </THead>
            <tbody>
              {fin.apiByProviderUsd.map((p) => (
                <TR key={p.provider}>
                  <TD>{PROVIDER_LABEL[p.provider] ?? p.provider}</TD>
                  <TD className="tabular text-right">{p.calls}</TD>
                  <TD className="tabular text-right">{formatUsd(p.cost)}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

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
                  <td colSpan={4} className="px-4 py-8 text-center text-[13px] text-muted">
                    No payments yet. Record one on a lead&apos;s page, or connect Stripe.
                  </td>
                </tr>
              )}
              {payments.map((p) => (
                <TR key={p.id}>
                  <TD className="max-w-[220px] truncate">{p.description ?? p.source}</TD>
                  <TD>
                    <StatusBadge status={p.status} />
                  </TD>
                  <TD className="tabular text-right">{formatEur(p.amountCents)}</TD>
                  <TD className="whitespace-nowrap text-[12.5px] text-subtle">{timeAgo(p.paidAt ?? p.createdAt)}</TD>
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
                  <td colSpan={4} className="px-4 py-8 text-center text-[13px] text-muted">
                    No subscriptions yet.
                  </td>
                </tr>
              )}
              {subs.map((s) => (
                <TR key={s.id}>
                  <TD>{s.plan ?? "—"}</TD>
                  <TD>
                    <StatusBadge status={s.status} />
                  </TD>
                  <TD className="tabular text-right">
                    {formatEur(s.amountCents)}/{s.interval === "year" ? "yr" : "mo"}
                  </TD>
                  <TD className="whitespace-nowrap text-[12.5px] text-subtle">{s.startedAt ? timeAgo(s.startedAt) : "—"}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Section>
      </div>
    </>
  );
}
