import { desc, eq } from "drizzle-orm";
import { ExternalLink, Rocket } from "lucide-react";
import Link from "next/link";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Badge, Card, EmptyState, MockBadge } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { formatDuration, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { RedeployButton } from "./redeploy-button";

export const metadata = { title: "Deployments" };

export default async function DeploymentsPage() {
  const auth = await requireAuth();
  const rows = await db()
    .select({ d: schema.deployments, slug: schema.websiteProjects.slug, business: schema.businesses.name, isMock: schema.businesses.isMock, versionNo: schema.websiteVersions.versionNo })
    .from(schema.deployments)
    .innerJoin(schema.websiteProjects, eq(schema.websiteProjects.id, schema.deployments.projectId))
    .innerJoin(schema.businesses, eq(schema.businesses.id, schema.websiteProjects.businessId))
    .leftJoin(schema.websiteVersions, eq(schema.websiteVersions.id, schema.deployments.versionId))
    .where(eq(schema.deployments.organizationId, auth.org.id))
    .orderBy(desc(schema.deployments.createdAt))
    .limit(200);
  const ready = rows.filter((r) => r.d.status === "ready").length;
  const failed = rows.filter((r) => r.d.status === "error").length;
  const durations = rows.filter((r) => r.d.readyAt).map((r) => r.d.readyAt!.getTime() - r.d.createdAt.getTime());
  const avg = durations.length ? durations.reduce((a, b) => a + b, 0) / durations.length : null;

  return (
    <>
      <SubNav section="/websites" />
      <PageHeader title="Deployments" description="Preview deployments are demonstrations on agency-owned domains. Production publishing and customer domains require an approved request." />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Successful deployments" value={ready} tone="success" />
        <StatCard label="Failed" value={failed} tone="danger" />
        <StatCard label="Success rate" value={rows.length ? `${Math.round((ready / rows.length) * 100)}%` : "—"} />
        <StatCard label="Avg. deploy time" value={formatDuration(avg)} />
      </div>
      {rows.length === 0 ? (
        <Card>
          <EmptyState icon={<Rocket />} title="No deployments yet" description="Websites that pass quality control are deployed as preview demonstrations." />
        </Card>
      ) : (
        <Table>
          <THead>
            <tr>
              <TH>Website</TH>
              <TH>Environment</TH>
              <TH>Provider</TH>
              <TH>Status</TH>
              <TH>URL</TH>
              <TH>Version</TH>
              <TH>Created</TH>
              <TH />
            </tr>
          </THead>
          <tbody>
            {rows.map(({ d, slug, business, isMock, versionNo }) => (
              <TR key={d.id}>
                <TD>
                  <Link href={`/websites/${d.projectId}`} className="flex items-center gap-2 font-medium hover:text-accent">
                    {business} {isMock && <MockBadge />}
                  </Link>
                  <span className="text-[11px] text-muted">{slug}</span>
                </TD>
                <TD>
                  <Badge tone={d.environment === "production" ? "accent" : "outline"}>{d.environment}</Badge>
                </TD>
                <TD className="text-muted">
                  {d.provider}
                  {d.githubRepo && <span className="block text-[11px]">{d.githubRepo}</span>}
                </TD>
                <TD>
                  <StatusBadge status={d.status} />
                  {d.error && <p className="max-w-[220px] truncate text-[11px] text-danger" title={d.error}>{d.error}</p>}
                </TD>
                <TD className="max-w-[240px]">
                  {d.url ? (
                    <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-1 text-accent hover:underline">
                      <span className="truncate">{d.url.replace(/^https?:\/\//, "")}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ) : (
                    "—"
                  )}
                </TD>
                <TD className="tabular text-muted">v{versionNo ?? "?"}</TD>
                <TD className="whitespace-nowrap text-muted">{timeAgo(d.createdAt)}</TD>
                <TD className="text-right">{d.status === "error" && d.environment === "preview" && <RedeployButton projectId={d.projectId} />}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
