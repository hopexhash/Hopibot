import { AddLeadButton } from "@/components/app/add-lead";
import { BusinessTable } from "@/components/app/business-table";
import { FilterBar } from "@/components/app/filter-bar";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader } from "@/components/app/page";
import { BUSINESS_CATEGORIES, PIPELINE_STAGES, WEBSITE_STATUS_LABEL } from "@/lib/constants";
import { hasRole, requireAuth } from "@/server/auth";
import Link from "next/link";
import { and, eq, isNull, sql } from "drizzle-orm";
import { REJECTED_QUALIFICATIONS } from "@/lib/qualification";
import { db, schema } from "@/server/db";
import { distinctCities, listBusinesses, parseBusinessFilters } from "@/server/queries/businesses";

export const metadata = { title: "All leads" };

export default async function BusinessesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const auth = await requireAuth();
  const filters = parseBusinessFilters(await searchParams);
  const b = schema.businesses;
  const [{ rows, total }, cities, counts] = await Promise.all([
    listBusinesses(auth.org.id, filters),
    distinctCities(auth.org.id),
    db().select({ q: b.qualification, n: sql<number>`count(*)::int` }).from(b).where(and(eq(b.organizationId, auth.org.id), isNull(b.erasedAt), eq(b.isMock, false))).groupBy(b.qualification),
  ]);
  const count = (keys: string[]) => counts.filter((c) => c.q && keys.includes(c.q)).reduce((n, c) => n + c.n, 0);
  const checked = counts.reduce((n, c) => n + c.n, 0);
  const goodSites = count(["excellent", "good", "average", "rejected"]);
  const rejected = count(REJECTED_QUALIFICATIONS);
  return (
    <>
      <SubNav section="/pipeline" />
      <PageHeader eyebrow="Business" title="All leads" description="Businesses whose website genuinely needs a redesign. Websites that already look good are rejected and kept out of this list." actions={<AddLeadButton />} />
      <FilterBar
        searchPlaceholder="Search name, address or website…"
        filters={[
          {
            key: "view",
            label: "Leads only",
            options: [
              { value: "high_priority", label: "High-priority leads" },
              { value: "qualified", label: "Qualified leads" },
              { value: "review", label: "Needs review" },
              { value: "rejected", label: "Rejected websites" },
              { value: "all", label: "Everything" },
            ],
          },
          { key: "category", label: "All categories", options: BUSINESS_CATEGORIES.map((c) => ({ value: c.key, label: c.label })) },
          { key: "city", label: "All cities", options: cities.map((c) => ({ value: c, label: c })) },
          { key: "stage", label: "All stages", options: PIPELINE_STAGES.map((s) => ({ value: s.key, label: s.label })) },
          { key: "minScore", label: "Any score", options: [40, 60, 75, 90].map((n) => ({ value: String(n), label: `Score ≥ ${n}` })) },
          { key: "website", label: "Any website status", options: Object.entries(WEBSITE_STATUS_LABEL).map(([value, label]) => ({ value, label })) },
          { key: "research", label: "Any research status", options: ["not_started", "in_progress", "done", "failed"].map((v) => ({ value: v, label: v.replace("_", " ") })) },
          { key: "mock", label: "Real + mock", options: [{ value: "exclude", label: "Real data only" }, { value: "only", label: "Mock only" }] },
        ]}
      />
      {filters.view === "leads" && checked > 0 && (
        <p className="mb-4 rounded-xl border border-border bg-[rgba(3,8,6,0.5)] px-4 py-3 text-[13.5px] leading-relaxed text-muted">
          <b className="font-semibold text-foreground">{checked}</b> businesses checked so far: <b className="font-semibold text-foreground">{count(["qualified", "high_priority", "website_down"])}</b> qualified,{" "}
          <b className="font-semibold text-foreground">{count(["review"])}</b> need your review, <b className="font-semibold text-foreground">{goodSites}</b> turned down because their website is already good,{" "}
          <b className="font-semibold text-foreground">{count(["no_email"])}</b> without a public email.{" "}
          {rejected > 0 && (
            <Link href="/businesses?view=rejected" className="font-medium text-accent hover:underline">
              See what was turned down and why →
            </Link>
          )}
        </p>
      )}
      <BusinessTable rows={rows} total={total} page={filters.page} pageSize={filters.pageSize} canAdmin={hasRole(auth.role, "admin")} />
    </>
  );
}
