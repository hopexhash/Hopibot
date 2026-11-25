import { AddLeadButton } from "@/components/app/add-lead";
import { BusinessTable } from "@/components/app/business-table";
import { FilterBar } from "@/components/app/filter-bar";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader } from "@/components/app/page";
import { BUSINESS_CATEGORIES, PIPELINE_STAGES, WEBSITE_STATUS_LABEL } from "@/lib/constants";
import { hasRole, requireAuth } from "@/server/auth";
import { distinctCities, listBusinesses, parseBusinessFilters } from "@/server/queries/businesses";

export const metadata = { title: "All leads" };

export default async function BusinessesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const auth = await requireAuth();
  const filters = parseBusinessFilters(await searchParams);
  const [{ rows, total }, cities] = await Promise.all([listBusinesses(auth.org.id, filters), distinctCities(auth.org.id)]);
  return (
    <>
      <SubNav section="/pipeline" />
      <PageHeader eyebrow="Business" title="All leads" description="Every business in your CRM as a sortable list. Tick rows to run agents on several leads at once." actions={<AddLeadButton />} />
      <FilterBar
        searchPlaceholder="Search name, address or website…"
        filters={[
          { key: "category", label: "All categories", options: BUSINESS_CATEGORIES.map((c) => ({ value: c.key, label: c.label })) },
          { key: "city", label: "All cities", options: cities.map((c) => ({ value: c, label: c })) },
          { key: "stage", label: "All stages", options: PIPELINE_STAGES.map((s) => ({ value: s.key, label: s.label })) },
          { key: "minScore", label: "Any score", options: [40, 60, 75, 90].map((n) => ({ value: String(n), label: `Score ≥ ${n}` })) },
          { key: "website", label: "Any website status", options: Object.entries(WEBSITE_STATUS_LABEL).map(([value, label]) => ({ value, label })) },
          { key: "research", label: "Any research status", options: ["not_started", "in_progress", "done", "failed"].map((v) => ({ value: v, label: v.replace("_", " ") })) },
          { key: "mock", label: "Real + mock", options: [{ value: "exclude", label: "Real data only" }, { value: "only", label: "Mock only" }] },
        ]}
      />
      <BusinessTable rows={rows} total={total} page={filters.page} pageSize={filters.pageSize} canAdmin={hasRole(auth.role, "admin")} />
    </>
  );
}
