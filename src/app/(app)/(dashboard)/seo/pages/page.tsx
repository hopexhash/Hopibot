import Link from "next/link";
import { SubNav } from "@/components/app/sidebar";
import { PageHeader } from "@/components/app/page";
import { Badge, Card } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { SITE_URL } from "@/lib/site/seo";
import { hasRole, requireAuth } from "@/server/auth";
import type { AuditReport } from "@/server/seo/audit";
import { publicPages } from "@/server/seo/pages";
import { getOrgSettings } from "@/server/org";
import { getSiteOrg } from "@/server/site";
import { PageEditor } from "../seo-client";

export const metadata = { title: "SEO · Pages" };

const KIND: Record<string, string> = { home: "Home", landing: "Landing page", article: "Article", project: "Project", page: "Page" };

/**
 * Every public page with its search data from the last audit, and an editor for the title,
 * description, canonical URL and indexing of one page (?path=/prijzen).
 */
export default async function SeoPagesPage({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const auth = await requireAuth();
  const canAdmin = hasRole(auth.role, "admin") && (await getSiteOrg())?.id === auth.org.id;
  const settings = await getOrgSettings(auth.org.id);
  const audit = settings.seoAudit as AuditReport | undefined;
  const pages = await publicPages();
  const { path } = await searchParams;
  const selected = path ? pages.find((p) => p.path === path) : undefined;
  const live = (p: string) => audit?.pages.find((x) => x.path === p);
  const titles = new Map<string, number>();
  for (const p of audit?.pages ?? []) titles.set(p.title, (titles.get(p.title) ?? 0) + 1);

  return (
    <>
      <SubNav section="/seo" />
      <PageHeader title="Pages" description="Every public page of the website. Choose a page to change how it appears in search results. Numbers come from the last audit." />
      {selected && (
        <Card className="mb-6 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-[16px] font-semibold">
              {selected.label} <span className="font-normal text-muted">{selected.path}</span>
            </h2>
            <a href={`${SITE_URL}${selected.path === "/" ? "" : selected.path}`} target="_blank" rel="noopener noreferrer" className="text-[13px] text-accent hover:underline">
              Open the live page
            </a>
          </div>
          {selected.keyword && <p className="mb-3 text-[13px] text-muted">Target search query: {selected.keyword}</p>}
          {live(selected.path)?.issues.length ? (
            <ul className="mb-4 grid gap-1 text-[13px]">
              {live(selected.path)!.issues.map((i) => (
                <li key={i.code}>
                  <Badge tone={i.severity === "error" ? "danger" : i.severity === "warning" ? "warning" : "neutral"}>{i.severity}</Badge> {i.message}
                </li>
              ))}
            </ul>
          ) : null}
          <PageEditor
            key={selected.path}
            path={selected.path}
            current={{ title: live(selected.path)?.title ?? "", description: live(selected.path)?.description ?? "" }}
            override={settings.seo.pages[selected.path]}
            canAdmin={canAdmin}
          />
        </Card>
      )}
      <Card className="overflow-x-auto">
        <Table>
          <THead>
            <TR>
              <TH>Page</TH>
              <TH>Type</TH>
              <TH>Title</TH>
              <TH className="text-right">Words</TH>
              <TH className="text-right" title="Other pages that link here from their content (menus and footer not counted)">Links in</TH>
              <TH>Structured data</TH>
              <TH className="text-right">Problems</TH>
            </TR>
          </THead>
          <tbody>
            {pages.map((p) => {
              const l = live(p.path);
              const o = settings.seo.pages[p.path];
              return (
                <TR key={p.path}>
                  <TD className="whitespace-nowrap">
                    <Link href={`/seo/pages?path=${encodeURIComponent(p.path)}`} className="text-accent hover:underline">
                      {p.path}
                    </Link>
                    {o && <Badge tone="neutral" className="ml-2">edited</Badge>}
                    {!p.inSitemap && <Badge tone="warning" className="ml-2">noindex</Badge>}
                  </TD>
                  <TD className="text-muted">{KIND[p.kind]}</TD>
                  <TD className="max-w-[340px] truncate" title={l?.title}>
                    {l ? (
                      <>
                        {l.title} <span className={l.title.length > 60 || (titles.get(l.title) ?? 0) > 1 ? "text-warning" : "text-muted"}>({l.title.length})</span>
                      </>
                    ) : (
                      <span className="text-muted">run the audit</span>
                    )}
                  </TD>
                  <TD className="tabular text-right">{l?.words ?? "—"}</TD>
                  <TD className={`tabular text-right ${l && l.inbound === 0 && p.path !== "/" ? "text-danger" : ""}`}>{l?.inbound ?? "—"}</TD>
                  <TD className="max-w-[220px] truncate text-muted">{l?.schema.join(", ") ?? "—"}</TD>
                  <TD className="tabular text-right">{l ? l.issues.length : "—"}</TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
