import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { FilterBar } from "@/components/app/filter-bar";
import { PageHeader, Section } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, EmptyState, MockBadge, ScoreRing } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { TEMPLATE_INFO, type TemplateKey } from "@/lib/site-spec";
import { timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { GenerateForm } from "./generate-form";

export const metadata = { title: "Website Builder" };

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

  return (
    <>
      <PageHeader title="Website Builder" description="Every generated website is versioned, tested by the Quality Control agent and only marked ready when it scores 85 or more." />
      <Card className="mb-6 p-5">
        <GenerateForm businesses={candidates.map((c) => ({ ...c, city: c.city ?? "" }))} />
      </Card>
      <Section title="Design systems" description="Each category has its own design system. Generated sites are composed from these, never copied from competitors.">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {(Object.keys(TEMPLATE_INFO) as TemplateKey[]).map((k) => {
            const t = TEMPLATE_INFO[k];
            return (
              <div key={k} className="overflow-hidden rounded-xl border border-border bg-surface">
                <div className="h-14" style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.accent})` }} />
                <div className="p-3">
                  <p className="text-[13px] font-semibold">
                    {t.name} <span className="font-normal text-muted">· {k}</span>
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted">{t.description}</p>
                </div>
              </div>
            );
          })}
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
                  <TD className="text-muted">{TEMPLATE_INFO[pr.templateKey as TemplateKey]?.name ?? pr.templateKey}</TD>
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
