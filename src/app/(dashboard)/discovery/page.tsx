import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { BusinessTable } from "@/components/app/business-table";
import { PageHeader, Section } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { MockBadge } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { categoryLabel } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { listBusinesses, parseBusinessFilters } from "@/server/queries/businesses";
import { DiscoveryForm } from "./discovery-form";

export const metadata = { title: "Lead Discovery" };

export default async function DiscoveryPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const campaigns = await db()
    .select()
    .from(schema.discoveryCampaigns)
    .where(eq(schema.discoveryCampaigns.organizationId, auth.org.id))
    .orderBy(desc(schema.discoveryCampaigns.createdAt))
    .limit(10);
  const selected = sp.campaign ?? campaigns[0]?.id;
  const filters = parseBusinessFilters({ ...sp, campaign: selected, sort: sp.sort ?? "score" });
  const results = selected ? await listBusinesses(auth.org.id, filters) : null;

  return (
    <>
      <PageHeader title="Lead Discovery" description="Find local businesses that could use a better website. Results are deduplicated, audited and scored automatically." />
      <DiscoveryForm defaultMinScore={auth.org.settings.minLeadScore} activeCampaignId={sp.campaign} />
      {results && (
        <Section className="mt-8" title="Discovered businesses" description="From the selected campaign, sorted by lead score.">
          <BusinessTable rows={results.rows} total={results.total} page={filters.page} pageSize={filters.pageSize} canAdmin={hasRole(auth.role, "admin")} />
        </Section>
      )}
      {campaigns.length > 0 && (
        <Section title="Recent campaigns">
          <Table>
            <THead>
              <tr>
                <TH>Campaign</TH>
                <TH>Status</TH>
                <TH className="text-right">Found</TH>
                <TH className="text-right">Qualified</TH>
                <TH className="text-right">Duplicates</TH>
                <TH>Started</TH>
              </tr>
            </THead>
            <tbody>
              {campaigns.map((c) => {
                const p = c.params as { category: string; city: string };
                return (
                  <TR key={c.id} className={c.id === selected ? "bg-accent-soft/40" : undefined}>
                    <TD>
                      <Link href={`/discovery?campaign=${c.id}`} className="inline-flex items-center gap-2 font-medium hover:text-accent">
                        {categoryLabel(p.category)} · {p.city} {c.isMock && <MockBadge />}
                      </Link>
                    </TD>
                    <TD>
                      <StatusBadge status={c.status} />
                    </TD>
                    <TD className="tabular text-right">{c.found}</TD>
                    <TD className="tabular text-right">{c.qualified}</TD>
                    <TD className="tabular text-right">{c.duplicates}</TD>
                    <TD className="text-muted">{timeAgo(c.createdAt)}</TD>
                  </TR>
                );
              })}
            </tbody>
          </Table>
        </Section>
      )}
    </>
  );
}
