import "../guard";
import { SITE_URL } from "@/lib/site/seo";

/**
 * Lab tests through Google PageSpeed Insights: Google runs Lighthouse on the live page from
 * its own servers and returns the result. A lab test is one simulated visit (a mid-range
 * phone on a slow 4G connection, or a desktop); it is useful to compare versions and find
 * causes, but it is not what real visitors experience (that is the field data).
 */
export type LabResult = {
  at: string;
  path: string;
  strategy: "mobile" | "desktop";
  score: number;
  lcp: number;
  fcp: number;
  tbt: number;
  cls: number;
  si: number;
  ttfb: number | null;
  lcpElement: string | null;
  opportunities: { title: string; savingsMs: number; savingsBytes: number }[];
  /** Real-visitor data Google has for this page (Chrome UX Report), when there is enough traffic. */
  field: { lcp: number | null; inp: number | null; cls: number | null; category: string | null } | null;
};

const ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

type Audit = { numericValue?: number; displayValue?: string; title?: string; details?: { type?: string; overallSavingsMs?: number; overallSavingsBytes?: number; items?: { node?: { snippet?: string; selector?: string } }[] }; metricSavings?: { LCP?: number; FCP?: number } };

async function call(key: string, url: string, strategy: "mobile" | "desktop") {
  const q = new URLSearchParams({ url, strategy, category: "performance", key, locale: "en" });
  const res = await fetch(`${ENDPOINT}?${q}`, { signal: AbortSignal.timeout(55_000), cache: "no-store" });
  const json = (await res.json().catch(() => ({}))) as { error?: { message?: string }; lighthouseResult?: { categories: { performance: { score: number } }; audits: Record<string, Audit> }; loadingExperience?: { overall_category?: string; metrics?: Record<string, { percentile?: number }> } };
  if (!res.ok || !json.lighthouseResult) {
    // Never echo the request URL: it contains the key.
    throw new Error(json.error?.message?.replace(/key=[^&\s]+/g, "key=…") ?? `PageSpeed Insights answered ${res.status}`);
  }
  return json;
}

export async function runPageSpeed(key: string, path: string, strategy: "mobile" | "desktop"): Promise<LabResult> {
  const json = await call(key, new URL(path, SITE_URL).toString(), strategy);
  const lr = json.lighthouseResult!;
  const a = lr.audits;
  const n = (k: string) => a[k]?.numericValue ?? 0;
  const lcpEl = a["largest-contentful-paint-element"]?.details?.items?.[0];
  const opportunities = Object.values(a)
    .filter((x) => x.details?.type === "opportunity" && ((x.details.overallSavingsMs ?? 0) > 50 || (x.details.overallSavingsBytes ?? 0) > 10_000))
    .map((x) => ({ title: x.title ?? "", savingsMs: Math.round(x.details?.overallSavingsMs ?? 0), savingsBytes: Math.round(x.details?.overallSavingsBytes ?? 0) }))
    .sort((x, y) => y.savingsMs - x.savingsMs || y.savingsBytes - x.savingsBytes)
    .slice(0, 6);
  const fm = json.loadingExperience?.metrics;
  const field = fm
    ? {
        lcp: fm.LARGEST_CONTENTFUL_PAINT_MS?.percentile ?? null,
        inp: fm.INTERACTION_TO_NEXT_PAINT?.percentile ?? null,
        cls: fm.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile != null ? fm.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : null,
        category: json.loadingExperience?.overall_category ?? null,
      }
    : null;
  const node = (lcpEl as { items?: { node?: { selector?: string } }[] } | undefined)?.items?.[0]?.node ?? lcpEl?.node;
  return {
    at: new Date().toISOString(),
    path,
    strategy,
    score: Math.round((lr.categories.performance.score ?? 0) * 100),
    lcp: Math.round(n("largest-contentful-paint")),
    fcp: Math.round(n("first-contentful-paint")),
    tbt: Math.round(n("total-blocking-time")),
    cls: Math.round(n("cumulative-layout-shift") * 1000) / 1000,
    si: Math.round(n("speed-index")),
    ttfb: a["server-response-time"]?.numericValue != null ? Math.round(a["server-response-time"].numericValue) : null,
    lcpElement: node?.selector ?? null,
    opportunities,
    field,
  };
}

/** Integration test: one desktop run of the homepage (takes 10 to 40 seconds). */
export async function testPageSpeed(key: string) {
  const r = await runPageSpeed(key, "/", "desktop");
  return `PageSpeed Insights works: the homepage scores ${r.score} on desktop (lab).`;
}
