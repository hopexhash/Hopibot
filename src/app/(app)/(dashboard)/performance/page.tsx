import { Activity, FileWarning, FlaskConical, Gauge, LayoutTemplate, MousePointerClick, Timer } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section, StatCard } from "@/components/app/page";
import { Badge, Card, EmptyState } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { SITE_URL } from "@/lib/site/seo";
import { hasRole, requireAuth } from "@/server/auth";
import { getCredential } from "@/server/integrations/credentials";
import { getOrgSettings } from "@/server/org";
import type { LabResult } from "@/server/performance/pagespeed";
import { fieldReport, MIN_SAMPLES, rate, THRESHOLDS, type FieldReport, type Issue, type VitalName } from "@/server/performance/vitals";
import { publicPages } from "@/server/seo/pages";
import { getSiteOrg } from "@/server/site";
import { LabTestForm } from "./performance-client";

export const metadata = { title: "Performance" };
// A lab test waits for Google to run Lighthouse on the live page.
export const maxDuration = 60;

const TONE = { good: "success", "needs-improvement": "warning", poor: "danger" } as const;
const LABEL = { good: "good", "needs-improvement": "needs work", poor: "poor" } as const;

function fmt(name: VitalName, v: number | null) {
  if (v === null) return "—";
  if (name === "CLS") return v.toFixed(2);
  return v >= 1000 ? `${(v / 1000).toFixed(2)} s` : `${Math.round(v)} ms`;
}
const kb = (b: number) => (b >= 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`);

function Cell({ name, v }: { name: VitalName; v: number | null }) {
  if (v === null) return <span className="text-muted">—</span>;
  const r = rate(name, v);
  return <span className={r === "good" ? "text-success" : r === "poor" ? "text-danger" : "text-warning"}>{fmt(name, v)}</span>;
}

/** What to do about a problem the measurements actually show (only shown for detected problems). */
const ADVICE: Record<Issue["kind"], string> = {
  LCP: "The main content appears late. If the largest element (see “Largest element on slow pages”) is an image: serve a smaller version for phones (srcset) and load it with priority. If it is text: keep render-blocking CSS and preloaded fonts small, and make sure it is never hidden until scripts have run.",
  INP: "A tap or click kept the page busy before it could respond. Look at what runs when that element is used; split long work into smaller pieces or move it out of the way of the next frame.",
  CLS: "Something moves after it has appeared. Give images, videos and embeds fixed dimensions (width/height or aspect-ratio) and reserve space for content that arrives later.",
  FCP: "The first content appears late: render-blocking CSS, fonts or a slow server response hold up the first paint.",
  TTFB: "The server answers slowly. Check that the page is served from the cache (it is rebuilt every few minutes, not on every visit) and look at the database queries behind it.",
  ASSET: "Make this file smaller: images in WebP or AVIF and no larger than they are shown, with a smaller copy for phones.",
};

export default async function PerformancePage({ searchParams }: { searchParams: Promise<{ device?: string; days?: string }> }) {
  const auth = await requireAuth();
  const canAdmin = hasRole(auth.role, "admin");
  const sp = await searchParams;
  const device: FieldReport["device"] = sp.device === "mobile" || sp.device === "desktop" ? sp.device : "all";
  const days = sp.days === "7" ? 7 : sp.days === "90" ? 90 : 28;
  const site = await getSiteOrg();
  const isSite = site?.id === auth.org.id;
  const [report, settings, cred, pages] = await Promise.all([
    fieldReport(auth.org.id, days, device),
    getOrgSettings(auth.org.id),
    getCredential(auth.org.id, "pagespeed"),
    isSite ? publicPages() : Promise.resolve([]),
  ]);
  const lab = (Array.isArray(settings.perfLab) ? (settings.perfLab as LabResult[]) : []).slice(0, 20);
  const latest = { mobile: lab.find((l) => l.strategy === "mobile"), desktop: lab.find((l) => l.strategy === "desktop") };
  const m = Object.fromEntries(report.metrics.map((x) => [x.name, x])) as Record<VitalName, FieldReport["metrics"][number]>;
  const enough = (name: VitalName) => m[name].samples >= MIN_SAMPLES;
  const link = (q: Record<string, string>) => {
    const p = new URLSearchParams({ ...(device !== "all" ? { device } : {}), ...(days !== 28 ? { days: String(days) } : {}), ...q });
    for (const [k, v] of [...p]) if (v === "all" || (k === "days" && v === "28")) p.delete(k);
    return `/performance${p.size ? `?${p}` : ""}`;
  };
  const vital = (name: VitalName, label: string, icon: React.ReactNode, help: string) => {
    const x = m[name];
    const r = x.p75 !== null ? rate(name, x.p75) : null;
    return (
      <StatCard
        label={label}
        value={enough(name) ? fmt(name, x.p75) : "—"}
        tone={!enough(name) || !r ? "neutral" : TONE[r]}
        icon={icon}
        sub={enough(name) ? `${Math.round(x.good * 100)}% good · ${x.samples} measurements` : `${x.samples} of ${MIN_SAMPLES} measurements needed`}
        help={help}
      />
    );
  };
  const issues = report.issues;
  const kinds = [...new Set(issues.map((i) => i.kind))];

  return (
    <>
      <PageHeader
        title="Performance"
        description={`How fast ${SITE_URL.replace("https://", "")} is. Field data comes from real visits (anonymous Core Web Vitals, 75th percentile, as Google judges it); lab data from tests Google runs on request.`}
      />
      {!isSite && <Card className="mb-6 p-4 text-[13px] text-muted">The public website belongs to another workspace. Its measurements are collected there.</Card>}

      <div className="mb-4 flex flex-wrap items-center gap-2 text-[13px]">
        {(["all", "mobile", "desktop"] as const).map((d) => (
          <Link key={d} href={link({ device: d })} className={`rounded-md border px-2.5 py-1 ${device === d ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-fg"}`}>
            {d === "all" ? "All devices" : d === "mobile" ? "Phones" : "Desktop"}
          </Link>
        ))}
        <span className="mx-1 text-muted">·</span>
        {([7, 28, 90] as const).map((d) => (
          <Link key={d} href={link({ days: String(d) })} className={`rounded-md border px-2.5 py-1 ${days === d ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-fg"}`}>
            {d} days
          </Link>
        ))}
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Core Web Vitals (field)"
          value={report.assessment === "passed" ? "Passed" : report.assessment === "failed" ? "Failed" : "—"}
          tone={report.assessment === "passed" ? "success" : report.assessment === "failed" ? "danger" : "neutral"}
          icon={<Gauge />}
          sub={report.assessment === "not-enough-data" ? `collecting; ${report.views} page views measured` : `${report.views} page views measured, last ${days} days`}
          help="Passed when, for 3 in 4 visits, the main content appears within 2.5 s (LCP), the page responds within 200 ms (INP) and nothing jumps (CLS ≤ 0.1). Judged only with enough measurements."
        />
        {vital("LCP", "Largest Contentful Paint", <Timer />, "When the main content (largest image or text block) appears. Good: at most 2.5 s.")}
        {vital("INP", "Interaction to Next Paint", <MousePointerClick />, "How quickly the page responds to taps, clicks and keys. Good: at most 200 ms. Only measured when visitors interact.")}
        {vital("CLS", "Cumulative Layout Shift", <LayoutTemplate />, "How much content jumps while the page loads. Good: at most 0.1.")}
      </div>
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {vital("FCP", "First Contentful Paint", <Activity />, "When the first text or image appears. Good: at most 1.8 s.")}
        {vital("TTFB", "Server response (TTFB)", <Activity />, "Time until the first byte of the page arrives. Good: at most 0.8 s.")}
        <StatCard
          label="Lab score, phone"
          value={latest.mobile ? latest.mobile.score : "—"}
          tone={!latest.mobile ? "neutral" : latest.mobile.score >= 90 ? "success" : latest.mobile.score >= 50 ? "warning" : "danger"}
          icon={<FlaskConical />}
          sub={latest.mobile ? `${latest.mobile.path} · ${new Date(latest.mobile.at).toLocaleDateString("nl-NL")}` : "no lab test yet"}
          help="Lighthouse performance score (0–100) from the last PageSpeed Insights test on a simulated mid-range phone with slow 4G. A lab result, not what real visitors experience."
        />
        <StatCard
          label="Lab score, desktop"
          value={latest.desktop ? latest.desktop.score : "—"}
          tone={!latest.desktop ? "neutral" : latest.desktop.score >= 90 ? "success" : latest.desktop.score >= 50 ? "warning" : "danger"}
          icon={<FlaskConical />}
          sub={latest.desktop ? `${latest.desktop.path} · ${new Date(latest.desktop.at).toLocaleDateString("nl-NL")}` : "no lab test yet"}
        />
      </div>

      <Section title="Slowest pages" description="Per page, the value 3 in 4 visits stay under (75th percentile). Sorted by LCP. Pages with only a few visits move around a lot.">
        {report.pages.length === 0 ? (
          <EmptyState
            icon={<Gauge />}
            title="No measurements yet"
            description="Every visit to the public website sends its Core Web Vitals here (anonymously: no cookie, no IP address, no identifier). Robots and test tools are left out. The first numbers appear after the first real visits."
          />
        ) : (
          <Card className="overflow-x-auto">
            <Table>
              <THead>
                <TR>
                  <TH>Page</TH>
                  <TH className="text-right">Views</TH>
                  <TH className="text-right">LCP</TH>
                  <TH className="text-right">INP</TH>
                  <TH className="text-right">CLS</TH>
                  <TH className="text-right">FCP</TH>
                  <TH className="text-right">TTFB</TH>
                </TR>
              </THead>
              <tbody>
                {report.pages.slice(0, 25).map((p) => (
                  <TR key={p.path}>
                    <TD className="max-w-[280px] truncate">
                      <a href={`${SITE_URL}${p.path}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {p.path}
                      </a>
                    </TD>
                    <TD className="tabular text-right">{p.views}</TD>
                    <TD className="tabular text-right">
                      <Cell name="LCP" v={p.lcp} />
                    </TD>
                    <TD className="tabular text-right">
                      <Cell name="INP" v={p.inp} />
                    </TD>
                    <TD className="tabular text-right">
                      <Cell name="CLS" v={p.cls} />
                    </TD>
                    <TD className="tabular text-right">
                      <Cell name="FCP" v={p.fcp} />
                    </TD>
                    <TD className="tabular text-right">
                      <Cell name="TTFB" v={p.ttfb} />
                    </TD>
                  </TR>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
      </Section>

      <Section title="Problems found" description="Derived from the field data above: every page or file that misses Google's “good” threshold. Recommendations are listed only for problems that were actually measured.">
        {issues.length === 0 ? (
          <Card className="p-4 text-[13px] text-muted">{report.pages.length ? "No page misses a threshold in this period." : "Nothing to judge yet."}</Card>
        ) : (
          <div className="grid gap-4">
            <Card className="overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>Severity</TH>
                    <TH>Where</TH>
                    <TH>Problem</TH>
                  </TR>
                </THead>
                <tbody>
                  {issues.slice(0, 40).map((i, n) => (
                    <TR key={n}>
                      <TD>
                        <Badge tone={i.severity === "poor" ? "danger" : "warning"}>{LABEL[i.severity]}</Badge>
                      </TD>
                      <TD className="max-w-[260px] truncate">{i.path}</TD>
                      <TD>
                        {i.kind !== "ASSET" && <b className="mr-1">{i.kind}</b>}
                        {i.message}
                        {i.samples ? <span className="text-muted"> ({i.samples} measurements)</span> : null}
                      </TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </Card>
            <Card className="grid gap-3 p-4 text-[13px]">
              <h3 className="text-[14px] font-semibold">Recommendations</h3>
              {kinds.map((k) => (
                <p key={k}>
                  <b>{k === "ASSET" ? "Large files" : k}:</b> {ADVICE[k]}
                </p>
              ))}
            </Card>
          </div>
        )}
      </Section>

      <div className="grid gap-6 xl:grid-cols-2">
        <Section title="Largest element on slow pages" description="The element the browser reported as the main content (LCP), with how long it took for 3 in 4 visits.">
          {report.lcpElements.length === 0 ? (
            <Card className="p-4 text-[13px] text-muted">No LCP measurements yet.</Card>
          ) : (
            <Card className="overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>Page</TH>
                    <TH>Element</TH>
                    <TH className="text-right">LCP</TH>
                  </TR>
                </THead>
                <tbody>
                  {report.lcpElements.map((e, n) => (
                    <TR key={n}>
                      <TD className="max-w-[160px] truncate">{e.path}</TD>
                      <TD className="max-w-[260px] truncate font-mono text-[12px]" title={e.url ?? undefined}>
                        {e.el}
                        {e.url ? <span className="text-muted"> · {e.url.split("/").pop()}</span> : null}
                      </TD>
                      <TD className="tabular text-right">
                        <Cell name="LCP" v={e.p75} />
                      </TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </Section>
        <Section title="Largest files" description="The biggest files of this website that visitors' browsers loaded, as reported by those browsers.">
          {report.assets.length === 0 ? (
            <Card className="p-4 text-[13px] text-muted">No file sizes reported yet.</Card>
          ) : (
            <Card className="overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>File</TH>
                    <TH>Type</TH>
                    <TH className="text-right">Size</TH>
                    <TH className="text-right">Pages</TH>
                  </TR>
                </THead>
                <tbody>
                  {report.assets.map((a) => (
                    <TR key={a.url}>
                      <TD className="max-w-[260px] truncate font-mono text-[12px]" title={a.url}>
                        {a.url}
                      </TD>
                      <TD>{a.kind}</TD>
                      <TD className={`tabular text-right ${a.size > 300 * 1024 && a.kind !== "script" ? "text-warning" : ""}`}>{kb(a.size)}</TD>
                      <TD className="tabular text-right">{a.pages}</TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </Card>
          )}
        </Section>
      </div>

      {report.daily.length > 1 && (
        <Section title="Day by day" description="75th percentile per day, all pages together.">
          <Card className="overflow-x-auto">
            <Table>
              <THead>
                <TR>
                  <TH>Day</TH>
                  <TH className="text-right">Views</TH>
                  <TH className="text-right">LCP</TH>
                  <TH className="text-right">INP</TH>
                  <TH className="text-right">CLS</TH>
                </TR>
              </THead>
              <tbody>
                {[...report.daily].reverse().slice(0, 30).map((d) => (
                  <TR key={d.day}>
                    <TD>{new Date(d.day).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" })}</TD>
                    <TD className="tabular text-right">{d.views}</TD>
                    <TD className="tabular text-right">
                      <Cell name="LCP" v={d.lcp} />
                    </TD>
                    <TD className="tabular text-right">
                      <Cell name="INP" v={d.inp} />
                    </TD>
                    <TD className="tabular text-right">
                      <Cell name="CLS" v={d.cls} />
                    </TD>
                  </TR>
                ))}
              </tbody>
            </Table>
          </Card>
        </Section>
      )}

      <Section
        title="Lab tests"
        description="Google runs Lighthouse on the live page from its own servers (PageSpeed Insights). Good for comparing versions and finding causes; the score depends on the simulated device and varies a few points between runs."
      >
        <Card className="mb-4 grid gap-3 p-4">
          {!cred.secret && (
            <p className="text-[13px] text-muted">
              Needs a free PageSpeed Insights API key (Google Cloud → APIs &amp; Services → enable “PageSpeed Insights API” → Credentials → API key). Add it under{" "}
              <Link href="/integrations" className="text-accent hover:underline">
                Integrations
              </Link>
              .
            </p>
          )}
          {isSite && <LabTestForm pages={pages.filter((p) => p.inSitemap).map((p) => ({ path: p.path, label: p.label }))} canAdmin={canAdmin} connected={Boolean(cred.secret)} />}
        </Card>
        {lab.length > 0 && (
          <div className="grid gap-4">
            <Card className="overflow-x-auto">
              <Table>
                <THead>
                  <TR>
                    <TH>When</TH>
                    <TH>Page</TH>
                    <TH>Device</TH>
                    <TH className="text-right">Score</TH>
                    <TH className="text-right">LCP</TH>
                    <TH className="text-right">FCP</TH>
                    <TH className="text-right">TBT</TH>
                    <TH className="text-right">CLS</TH>
                  </TR>
                </THead>
                <tbody>
                  {lab.map((l, n) => (
                    <TR key={n}>
                      <TD className="whitespace-nowrap">{new Date(l.at).toLocaleString("nl-NL", { dateStyle: "short", timeStyle: "short" })}</TD>
                      <TD className="max-w-[200px] truncate">{l.path}</TD>
                      <TD>{l.strategy === "mobile" ? "phone" : "desktop"}</TD>
                      <TD className={`tabular text-right font-semibold ${l.score >= 90 ? "text-success" : l.score >= 50 ? "text-warning" : "text-danger"}`}>{l.score}</TD>
                      <TD className="tabular text-right">{fmt("LCP", l.lcp)}</TD>
                      <TD className="tabular text-right">{fmt("FCP", l.fcp)}</TD>
                      <TD className="tabular text-right">{Math.round(l.tbt)} ms</TD>
                      <TD className="tabular text-right">{l.cls.toFixed(2)}</TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </Card>
            {lab[0] && (
              <Card className="grid gap-2 p-4 text-[13px]">
                <h3 className="text-[14px] font-semibold">
                  Last test: {lab[0].path} on {lab[0].strategy === "mobile" ? "a phone" : "desktop"}
                </h3>
                {lab[0].lcpElement && (
                  <p>
                    Largest element: <code className="font-mono text-[12px]">{lab[0].lcpElement}</code>
                  </p>
                )}
                {lab[0].opportunities.length ? (
                  <ul className="grid gap-1">
                    {lab[0].opportunities.map((o) => (
                      <li key={o.title}>
                        <FileWarning className="mr-1 inline h-3.5 w-3.5 text-warning" />
                        {o.title}
                        <span className="text-muted">
                          {o.savingsMs ? ` · about ${o.savingsMs} ms` : ""}
                          {o.savingsBytes ? ` · ${kb(o.savingsBytes)}` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">Lighthouse found no opportunities worth more than 50 ms or 10 KB.</p>
                )}
                {lab[0].field && (
                  <p className="text-muted">
                    Google’s own field data for this page (Chrome UX Report, last 28 days): LCP {fmt("LCP", lab[0].field.lcp)}, INP {fmt("INP", lab[0].field.inp)}, CLS {fmt("CLS", lab[0].field.cls)}.
                  </p>
                )}
              </Card>
            )}
          </div>
        )}
      </Section>

      <Section title="Automatic protection" description="Every build checks the public website against performance budgets (scripts/perf-budget.mjs).">
        <Card className="p-4 text-[13px] text-muted">
          Budgets per page: at most 185 KB of compressed JavaScript (framework included), 30 KB of render-blocking CSS and 3 preloaded fonts; at most 450 KB per image. A build that exceeds one prints a warning in the build log; the CI pipeline fails on it. Thresholds used here for “good”:{" "}
          {(Object.keys(THRESHOLDS) as VitalName[]).map((k, i) => (
            <span key={k}>
              {i ? ", " : ""}
              {k} ≤ {fmt(k, THRESHOLDS[k][0])}
            </span>
          ))}
          .
        </Card>
      </Section>
    </>
  );
}
