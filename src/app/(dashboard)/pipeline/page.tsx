import { and, desc, eq, ilike, isNull, sql } from "drizzle-orm";
import { FilterBar } from "@/components/app/filter-bar";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader, StatCard } from "@/components/app/page";
import { BUSINESS_CATEGORIES, PIPELINE_STAGES } from "@/lib/constants";
import { formatEur } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { Kanban } from "./kanban";

export const metadata = { title: "Sales Pipeline" };

export default async function PipelinePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const b = schema.businesses;
  const conds = [eq(b.organizationId, auth.org.id), isNull(b.erasedAt)];
  if (sp.category) conds.push(eq(b.category, sp.category));
  if (sp.q) conds.push(ilike(b.name, `%${sp.q}%`));
  if (sp.mock === "exclude") conds.push(eq(b.isMock, false));
  if (sp.followup === "due") conds.push(sql`${b.followUpAt} <= now() + interval '7 days'`);
  // Per stage, show the 150 most recently updated deals to keep the board fast at scale.
  const rows = await db()
    .select({ id: b.id, name: b.name, city: b.city, category: b.category, stage: b.pipelineStage, valueCents: b.salesValueCents, followUpAt: b.followUpAt, leadScore: b.leadScore, isMock: b.isMock, rn: sql<number>`row_number() OVER (PARTITION BY ${b.pipelineStage} ORDER BY ${b.updatedAt} DESC)` })
    .from(b)
    .where(and(...conds))
    .orderBy(desc(b.updatedAt))
    .limit(3000);
  const deals = rows.filter((r) => Number(r.rn) <= 150).map((r) => ({ ...r, followUpAt: r.followUpAt?.toISOString() ?? null }));
  const real = rows.filter((r) => !r.isMock);
  const won = real.filter((r) => r.stage === "WON");
  const lost = real.filter((r) => r.stage === "LOST");
  const open = real.filter((r) => !["WON", "LOST"].includes(r.stage));
  const winRate = won.length + lost.length ? Math.round((won.length / (won.length + lost.length)) * 100) : null;

  return (
    <>
      <SubNav section="/pipeline" />
      <PageHeader title="Sales Pipeline" description="Drag businesses between stages. Agents move deals forward automatically; human-managed stages (Replied → Won/Lost) are never overwritten." />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Open pipeline value" value={formatEur(open.reduce((s, r) => s + (r.valueCents ?? 0), 0))} sub={`${open.length} open deals`} />
        <StatCard label="Won" value={formatEur(won.reduce((s, r) => s + (r.valueCents ?? 0), 0))} sub={`${won.length} customers`} tone="success" />
        <StatCard label="Win rate" value={winRate == null ? "—" : `${winRate}%`} sub="Won ÷ (won + lost)" />
        <StatCard label="In negotiation" value={real.filter((r) => r.stage === "NEGOTIATION").length} sub={`${real.filter((r) => r.stage === "REPLIED").length} replied`} tone="warning" />
      </div>
      <FilterBar
        searchPlaceholder="Search deals…"
        filters={[
          { key: "category", label: "All categories", options: BUSINESS_CATEGORIES.map((c) => ({ value: c.key, label: c.label })) },
          { key: "followup", label: "Any follow-up", options: [{ value: "due", label: "Follow-up due within 7 days" }] },
          { key: "mock", label: "Real + mock", options: [{ value: "exclude", label: "Real data only" }] },
        ]}
      />
      <Kanban key={JSON.stringify(sp)} deals={deals} />
      <p className="mt-2 text-[11px] text-muted">{PIPELINE_STAGES.length} stages · showing up to 150 most recent deals per stage.</p>
    </>
  );
}
