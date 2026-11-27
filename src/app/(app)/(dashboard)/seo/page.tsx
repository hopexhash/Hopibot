import { AlertTriangle, ExternalLink, FileSearch, Link2, MousePointerClick, Search } from "lucide-react";
import Link from "next/link";
import { SubNav } from "@/components/app/sidebar";
import { makeDelta, PageHeader, Section, StatCard } from "@/components/app/page";
import { Badge, Card, EmptyState } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { SITE_URL } from "@/lib/site/seo";
import { hasRole, requireAuth } from "@/server/auth";
import { getSearchReport } from "@/server/seo/search";
import type { AuditReport, Severity } from "@/server/seo/audit";
import { getOrgSettings } from "@/server/org";
import { getSiteOrg } from "@/server/site";
import { BingForm, RunAuditButton } from "./seo-client";

export const metadata = { title: "SEO" };
// The audit reads every page of the live website; give it time.
export const maxDuration = 60;

const TONE: Record<Severity, "danger" | "warning" | "neutral"> = { error: "danger", warning: "warning", notice: "neutral" };
const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

/**
 * SEO control center: the health of the public website (an internal audit), its performance
 * in Google (Search Console and GA4, once connected), and verification for search engines.
 */
export default async function SeoPage() {
  const auth = await requireAuth();
  const canAdmin = hasRole(auth.role, "admin");
  const site = await getSiteOrg();
  const isSite = site?.id === auth.org.id;
  const settings = await getOrgSettings(auth.org.id);
  const audit = settings.seoAudit as AuditReport | undefined;
  const search = isSite ? await getSearchReport(auth.org.id) : { state: "off" as const };
  const issues = audit ? [...audit.siteIssues, ...audit.pages.flatMap((p) => p.issues)] : [];
  const order: Severity[] = ["error", "warning", "notice"];
  issues.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));

  return (
    <>
      <SubNav section="/seo" />
      <PageHeader
        title="SEO"
        description={`How ${SITE_URL.replace("https://", "")} is doing in search: technical health from our own audit, and real search data from Google once it is connected.`}
        actions={isSite ? <RunAuditButton canAdmin={canAdmin} /> : undefined}
      />
      {!isSite && <Card className="mb-6 p-4 text-[13px] text-muted">The public website belongs to another workspace. Its SEO is managed there.</Card>}

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Site health (internal)"
          value={audit ? audit.score : "—"}
          sub={audit ? `audit of ${new Date(audit.at).toLocaleString("nl-NL", { dateStyle: "short", timeStyle: "short" })}` : "no audit yet"}
          tone={!audit ? "neutral" : audit.score >= 90 ? "success" : audit.score >= 70 ? "warning" : "danger"}
          icon={<FileSearch />}
          help="Our own diagnostic score out of 100, from the problems the audit found (errors weigh most). It is NOT a Google score and says nothing about rankings."
        />
        <StatCard label="Errors" value={audit?.counts.error ?? "—"} tone={audit?.counts.error ? "danger" : "neutral"} icon={<AlertTriangle />} sub={audit ? `${audit.counts.warning} warnings · ${audit.counts.notice} notices` : undefined} />
        <StatCard label="Pages in the sitemap" value={audit?.pages.length ?? "—"} tone="neutral" icon={<Link2 />} sub={audit ? `${audit.brokenLinks.length} broken internal links` : undefined} href="/seo/pages" />
        {search.state === "ok" ? (
          <StatCard
            label="Clicks from Google (28 days)"
            value={search.report.totals.clicks}
            tone="accent"
            icon={<MousePointerClick />}
            delta={makeDelta(search.report.totals.clicks, search.report.previous.clicks, { label: "vs previous 28 days" })}
          />
        ) : (
          <StatCard label="Clicks from Google" value="—" tone="neutral" icon={<MousePointerClick />} sub={search.state === "error" ? "Search Console error" : "not connected"} href="/integrations" />
        )}
      </div>

      <Section title="Google Search" description="Real data from Search Console (and organic traffic from GA4). Positions are averages over all searches in which a page appeared.">
        {search.state === "off" ? (
          <EmptyState
            icon={<Search />}
            title="Search Console is not connected"
            description="Connect a Google service account under Integrations → Google Search Console & Analytics: create a service account in Google Cloud, enable the Search Console API (and the Analytics Data API for GA4), add the account's e-mail address as a user of the wearehopi.nl property in Search Console (and as Viewer in GA4), then paste its JSON key. Until then no search data is shown here."
            action={
              <Link href="/integrations" className="text-[13px] font-medium text-accent hover:underline">
                Open Integrations →
              </Link>
            }
          />
        ) : search.state === "error" ? (
          <Card className="p-4 text-[13px] text-danger">Search Console could not be read: {search.error}</Card>
        ) : (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard label="Impressions" value={search.report.totals.impressions} tone="neutral" delta={makeDelta(search.report.totals.impressions, search.report.previous.impressions)} />
              <StatCard label="Click-through rate" value={pct(search.report.totals.ctr)} tone="neutral" sub={`was ${pct(search.report.previous.ctr)}`} />
              <StatCard label="Average position" value={search.report.totals.position ? search.report.totals.position.toFixed(1) : "—"} tone="neutral" delta={makeDelta(search.report.totals.position, search.report.previous.position, { higherIsBetter: false })} />
              <StatCard
                label="Organic sessions (GA4)"
                value={search.report.organic ? search.report.organic.sessions : "—"}
                tone="neutral"
                sub={search.report.organic ? `${search.report.organic.keyEvents} key events (e.g. requests)` : "add a GA4 property ID"}
              />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <Card className="overflow-x-auto">
                <Table>
                  <THead>
                    <TR>
                      <TH>Search query</TH>
                      <TH className="text-right">Clicks</TH>
                      <TH className="text-right">Impr.</TH>
                      <TH className="text-right">Pos.</TH>
                    </TR>
                  </THead>
                  <tbody>
                    {search.report.queries.map((q) => (
                      <TR key={q.key}>
                        <TD>{q.key}</TD>
                        <TD className="tabular text-right">{q.clicks}</TD>
                        <TD className="tabular text-right">{q.impressions}</TD>
                        <TD className="tabular text-right">{q.position.toFixed(1)}</TD>
                      </TR>
                    ))}
                  </tbody>
                </Table>
                {!search.report.queries.length && <p className="p-4 text-[13px] text-muted">No search queries yet in this period.</p>}
              </Card>
              <Card className="overflow-x-auto">
                <Table>
                  <THead>
                    <TR>
                      <TH>Page</TH>
                      <TH className="text-right">Clicks</TH>
                      <TH className="text-right">Impr.</TH>
                      <TH className="text-right">Pos.</TH>
                    </TR>
                  </THead>
                  <tbody>
                    {search.report.pages.map((p) => (
                      <TR key={p.key}>
                        <TD className="max-w-[260px] truncate">{p.key.replace(SITE_URL, "") || "/"}</TD>
                        <TD className="tabular text-right">{p.clicks}</TD>
                        <TD className="tabular text-right">{p.impressions}</TD>
                        <TD className="tabular text-right">{p.position.toFixed(1)}</TD>
                      </TR>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </div>
            {search.report.declining.length > 0 && (
              <Card className="p-4">
                <h3 className="mb-2 text-[14px] font-semibold">Pages losing clicks</h3>
                <ul className="grid gap-1 text-[13px]">
                  {search.report.declining.map((p) => (
                    <li key={p.key}>
                      {p.key.replace(SITE_URL, "") || "/"}: {p.previousClicks} → {p.clicks} clicks
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            <Card className="p-4 text-[13px]">
              <h3 className="mb-2 text-[14px] font-semibold">Sitemaps in Search Console</h3>
              {search.report.sitemaps.length ? (
                <ul className="grid gap-1">
                  {search.report.sitemaps.map((m) => (
                    <li key={m.path}>
                      {m.path}: {m.submitted} URLs submitted{m.lastDownloaded ? `, last read ${new Date(m.lastDownloaded).toLocaleDateString("nl-NL")}` : ""}
                      {m.errors ? `, ${m.errors} errors` : ""}
                      {m.warnings ? `, ${m.warnings} warnings` : ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No sitemap submitted yet. Submit {SITE_URL}/sitemap.xml in Search Console → Sitemaps.</p>
              )}
            </Card>
          </div>
        )}
      </Section>

      <Section
        title="Problems found"
        description="From the last audit, most serious first. The audit reads the live website like a search engine: the sitemap, the HTML of every page, structured data and every internal link."
      >
        {!audit ? (
          <EmptyState icon={<FileSearch />} title="No audit yet" description="Run the audit to check every page of the website." action={isSite ? <RunAuditButton canAdmin={canAdmin} label="Run the first audit" /> : undefined} />
        ) : issues.length === 0 ? (
          <Card className="p-4 text-[13px] text-muted">No problems found in the last audit.</Card>
        ) : (
          <Card className="overflow-x-auto">
            <Table>
              <THead>
                <TR>
                  <TH>Severity</TH>
                  <TH>Page</TH>
                  <TH>Problem</TH>
                </TR>
              </THead>
              <tbody>
                {issues.slice(0, 80).map((i, n) => (
                  <TR key={n}>
                    <TD>
                      <Badge tone={TONE[i.severity]}>{i.severity}</Badge>
                    </TD>
                    <TD className="whitespace-nowrap">
                      {i.path ? (
                        <Link href={`/seo/pages?path=${encodeURIComponent(i.path)}`} className="text-accent hover:underline">
                          {i.path}
                        </Link>
                      ) : (
                        "whole site"
                      )}
                    </TD>
                    <TD>{i.message}</TD>
                  </TR>
                ))}
              </tbody>
            </Table>
            {issues.length > 80 && <p className="p-3 text-xs text-muted">{issues.length - 80} more; fix the ones above first.</p>}
          </Card>
        )}
      </Section>

      <Section title="Search engines" description="Verification proves to Google and Bing that you own the website. Google's code is under Settings → Website.">
        <Card className="grid gap-4 p-4">
          <p className="text-[13px] text-muted">
            Google Search Console: {settings.site.googleVerification ? "verification code set." : "no verification code yet."}{" "}
            <Link href="/settings" className="text-accent hover:underline">
              Settings → Website
            </Link>
            . Sitemap to submit: {SITE_URL}/sitemap.xml{" "}
            <a href={`${SITE_URL}/sitemap.xml`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
              open <ExternalLink className="h-3 w-3" />
            </a>
          </p>
          {isSite && <BingForm value={settings.seo.bingVerification} canAdmin={canAdmin} />}
        </Card>
      </Section>
    </>
  );
}
