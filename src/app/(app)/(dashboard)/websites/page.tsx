import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { FilterBar } from "@/components/app/filter-bar";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, EmptyState, MockBadge, ScoreRing } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { designName, FAMILY_DESIGNS } from "@/sites/designs";
import { timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { GenerateForm } from "./generate-form";

export const metadata = { title: "Websites" };

export default async function WebsitesPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const p = schema.websiteProjects;
  const conds = [eq(p.organizationId, auth.org.id), isNull(p.deletedAt)];
  if (sp.status) conds.push(eq(p.status, sp.status));
  if (sp.approval) conds.push(eq(p.approvalStatus, sp.approval));
  if (sp.q) conds.push(sql`${schema.businesses.name} ILIKE ${`%${sp.q}%`}`);
  const rows = await db()
    .select({
      project: p,
      business: { id: schema.businesses.id, name: schema.businesses.name, city: schema.businesses.city, isMock: schema.businesses.isMock },
      versions: sql<number>`(SELECT count(*) FROM website_versions v WHERE v.project_id = ${p.id})`,
    })
    .from(p)
    .innerJoin(schema.businesses, eq(schema.businesses.id, p.businessId))
    .where(and(...conds))
    .orderBy(desc(p.updatedAt))
    .limit(200);
  const candidates = await db()
    .select({ id: schema.businesses.id, name: schema.businesses.name, city: schema.businesses.city, score: schema.businesses.leadScore, research: schema.businesses.researchStatus })
    .from(schema.businesses)
    .where(and(eq(schema.businesses.organizationId, auth.org.id), isNull(schema.businesses.erasedAt), sql`NOT EXISTS (SELECT 1 FROM website_projects wp WHERE wp.business_id = ${schema.businesses.id} AND wp.deleted_at IS NULL)`))
    .orderBy(sql`${schema.businesses.leadScore} DESC NULLS LAST`)
    .limit(200);

  // Overview from real project and deployment rows (test records excluded).
  const [o] = (await db().execute(sql`
    SELECT
      count(*) FILTER (WHERE p.current_version_id IS NOT NULL) AS generated,
      count(*) FILTER (WHERE p.status IN ('generating', 'testing', 'needs_fixes')) AS in_progress,
      count(*) FILTER (WHERE p.status = 'ready' AND p.approval_status = 'pending') AS awaiting,
      count(*) FILTER (WHERE p.status = 'failed') AS failed,
      count(*) FILTER (WHERE EXISTS (SELECT 1 FROM deployments d WHERE d.project_id = p.id AND d.status = 'ready' AND NOT d.is_mock)) AS deployed
    FROM website_projects p JOIN businesses b ON b.id = p.business_id
    WHERE p.organization_id = ${auth.org.id} AND p.deleted_at IS NULL AND NOT b.is_mock`)) as unknown as Record<string, string>[];
  const n = (k: string) => Number(o?.[k] ?? 0);

  return (
    <>
      <SubNav section="/websites" />
      <PageHeader eyebrow="Business" title="Websites" description="Websites your agents built for leads. Each one is tested on phone, tablet and desktop, and only marked ready when it scores 85 or more." />
      <div className="mb-5 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-5">
        <StatCard label="Generated" value={n("generated")} tone="neutral" href="/websites" />
        <StatCard label="In progress" value={n("in_progress")} tone="neutral" help="Being written, tested or fixed right now." />
        <StatCard label="Waiting for your review" value={n("awaiting")} tone={n("awaiting") ? "warning" : "neutral"} href="/websites?status=ready&approval=pending" />
        <StatCard label="Deployed" value={n("deployed")} tone="success" href="/previews" help="Online at a preview link. Only counted after the deployment is confirmed." />
        <StatCard label="Failed" value={n("failed")} tone={n("failed") ? "danger" : "neutral"} href="/websites?status=failed" />
      </div>
      <Card className="mb-6 p-5">
        <GenerateForm businesses={candidates.map((c) => ({ ...c, city: c.city ?? "" }))} />
      </Card>
      <Section
        title="Template library"
        description={`${FAMILY_DESIGNS.length} designs: the demo websites of the portfolio. The right one is chosen automatically per business.`}
        actions={
          <Link href="/websites/templates" className="text-[13px] font-medium text-accent hover:underline">
            Open the library →
          </Link>
        }
      >
        <div className="flex gap-2.5 overflow-x-auto pb-2">
          {FAMILY_DESIGNS.map((t) => (
            <Link key={t.key} href={`/websites/templates#${t.key}`} className="w-40 flex-none overflow-hidden rounded-xl border border-border bg-surface transition hover:border-border-strong">
              <div className="flex h-16 items-end gap-1 p-2" style={{ background: t.palette.bg }}>
                <span className="h-4 w-4 rounded-full" style={{ background: t.palette.accent }} />
                <span className="h-4 w-4 rounded-full" style={{ background: t.palette.primary, outline: "1px solid rgba(128,128,128,.4)" }} />
                <span className="ml-auto text-[11px] font-semibold" style={{ color: t.palette.ink }}>
                  {t.name}
                </span>
              </div>
              <p className="truncate px-2.5 py-2 text-xs text-muted">{t.industry}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section title="Projects">
        <FilterBar
          searchPlaceholder="Search business…"
          filters={[
            { key: "status", label: "Any status", options: ["generating", "testing", "needs_fixes", "ready", "failed"].map((s) => ({ value: s, label: s.replace("_", " ") })) },
            { key: "approval", label: "Any approval", options: ["pending", "approved", "rejected"].map((s) => ({ value: s, label: s })) },
          ]}
        />
        {rows.length === 0 ? (
          <Card>
            <EmptyState icon={<Sparkles />} title="No websites yet" description="Pick a business above or run an objective — generated websites appear here." />
          </Card>
        ) : (
          <Table>
            <THead>
              <tr>
                <TH>Business</TH>
                <TH>Design system</TH>
                <TH>Status</TH>
                <TH className="text-center">Quality</TH>
                <TH>Approval</TH>
                <TH className="text-right">Versions</TH>
                <TH>Updated</TH>
              </tr>
            </THead>
            <tbody>
              {rows.map(({ project: pr, business, versions }) => (
                <TR key={pr.id}>
                  <TD>
                    <Link href={`/websites/${pr.id}`} className="flex items-center gap-2 font-medium hover:text-accent">
                      {business.name} {business.isMock && <MockBadge />}
                    </Link>
                    <span className="text-xs text-muted">{business.city}</span>
                  </TD>
                  <TD className="text-muted">{designName(pr.templateKey)}</TD>
                  <TD>
                    <StatusBadge status={pr.status} />
                  </TD>
                  <TD className="text-center">
                    <ScoreRing score={pr.qualityScore} />
                  </TD>
                  <TD>
                    <StatusBadge status={pr.approvalStatus} />
                  </TD>
                  <TD className="tabular text-right">{Number(versions)}</TD>
                  <TD className="text-muted">{timeAgo(pr.updatedAt)}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        )}
      </Section>
    </>
  );
}
