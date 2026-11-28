import "../guard";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { db, schema } from "../db";
import { getSiteOrg } from "../site";

export type VitalName = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
export type Rating = "good" | "needs-improvement" | "poor";

/** Google's Core Web Vitals thresholds (good up to the first value, poor above the second). */
export const THRESHOLDS: Record<VitalName, [number, number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};
export const rate = (name: VitalName, v: number): Rating => (v <= THRESHOLDS[name][0] ? "good" : v <= THRESHOLDS[name][1] ? "needs-improvement" : "poor");

export type Beacon = {
  d: "mobile" | "desktop";
  c?: string;
  m: { n: VitalName; v: number; r: Rating; p: string; t?: string; el?: string; u?: string }[];
  a?: { u: string; s: number; k: string }[];
};

const RETENTION_DAYS = 90;

/** Stores one beacon from the public website. The rating is recomputed, never trusted. */
export async function recordVitals(b: Beacon) {
  const site = await getSiteOrg();
  if (!site) return;
  // The page's largest files ride along once, on its TTFB measurement.
  const host = b.a?.length ? b.m.findIndex((m) => m.n === "TTFB") : -1;
  const rows = b.m.map((m, i) => ({
    organizationId: site.id,
    path: m.p,
    metric: m.n,
    value: m.n === "CLS" ? Math.min(m.v, 10) : Math.round(m.v),
    rating: rate(m.n, m.v),
    device: b.d,
    navigation: m.t ?? null,
    connection: b.c ?? null,
    detail: m.el || m.u || i === host ? { el: m.el, url: m.u, assets: i === host ? b.a : undefined } : null,
  }));
  await db().insert(schema.webVitals).values(rows);
  // Old measurements are removed now and then (about one beacon in 200).
  if (Math.random() < 0.005) {
    await db()
      .delete(schema.webVitals)
      .where(and(eq(schema.webVitals.organizationId, site.id), lt(schema.webVitals.createdAt, new Date(Date.now() - RETENTION_DAYS * 86_400_000))));
  }
}

export type MetricSummary = { name: VitalName; p75: number | null; samples: number; good: number; poor: number };
export type PageRow = { path: string; views: number; lcp: number | null; inp: number | null; cls: number | null; fcp: number | null; ttfb: number | null; lcpSamples: number };
export type Issue = { severity: "poor" | "needs-improvement"; kind: VitalName | "ASSET"; path?: string; message: string; samples?: number };
export type FieldReport = {
  days: number;
  device: "all" | "mobile" | "desktop";
  views: number;
  metrics: MetricSummary[];
  /** Passed when the 75th percentile of LCP, INP and CLS are all "good" (as in Google's report). */
  assessment: "passed" | "failed" | "not-enough-data";
  pages: PageRow[];
  lcpElements: { path: string; el: string; url: string | null; count: number; p75: number }[];
  assets: { url: string; kind: string; size: number; pages: number }[];
  issues: Issue[];
  daily: { day: string; lcp: number | null; inp: number | null; cls: number | null; views: number }[];
};

/** Fewer samples than this and a 75th percentile says too little to act on. */
export const MIN_SAMPLES = 20;
const MIN_PAGE_SAMPLES = 5;

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));

/** Real-visitor performance of the public website over the last `days` days. */
export async function fieldReport(organizationId: string, days = 28, device: FieldReport["device"] = "all"): Promise<FieldReport> {
  const since = new Date(Date.now() - days * 86_400_000);
  const W = and(
    eq(schema.webVitals.organizationId, organizationId),
    gte(schema.webVitals.createdAt, since),
    device === "all" ? undefined : eq(schema.webVitals.device, device),
  );
  const v = schema.webVitals;
  const p75 = sql<number>`percentile_cont(0.75) within group (order by ${v.value})`;

  const [metricRows, pageRows, elementRows, assetRows, dailyRows] = await Promise.all([
    db()
      .select({
        name: v.metric,
        p75,
        samples: sql<number>`count(*)::int`,
        good: sql<number>`avg((${v.rating} = 'good')::int)`,
        poor: sql<number>`avg((${v.rating} = 'poor')::int)`,
      })
      .from(v)
      .where(W)
      .groupBy(v.metric),
    db()
      .select({
        path: v.path,
        views: sql<number>`count(*) filter (where ${v.metric} = 'TTFB')::int`,
        lcp: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'LCP')`,
        inp: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'INP')`,
        cls: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'CLS')`,
        fcp: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'FCP')`,
        ttfb: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'TTFB')`,
        lcpSamples: sql<number>`count(*) filter (where ${v.metric} = 'LCP')::int`,
      })
      .from(v)
      .where(W)
      .groupBy(v.path),
    db()
      .select({
        path: v.path,
        el: sql<string>`${v.detail}->>'el'`,
        url: sql<string | null>`${v.detail}->>'url'`,
        count: sql<number>`count(*)::int`,
        p75,
      })
      .from(v)
      .where(and(W, eq(v.metric, "LCP"), sql`${v.detail}->>'el' is not null`))
      .groupBy(v.path, sql`${v.detail}->>'el'`, sql`${v.detail}->>'url'`)
      .orderBy(sql`percentile_cont(0.75) within group (order by ${v.value}) desc`)
      .limit(12),
    db()
      .select({ path: v.path, assets: sql<unknown>`${v.detail}->'assets'` })
      .from(v)
      .where(and(W, eq(v.metric, "TTFB"), sql`${v.detail} ? 'assets'`))
      .orderBy(sql`${v.createdAt} desc`)
      .limit(1000),
    db()
      .select({
        day: sql<string>`to_char(date_trunc('day', ${v.createdAt} at time zone 'Europe/Amsterdam'), 'YYYY-MM-DD')`,
        lcp: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'LCP')`,
        inp: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'INP')`,
        cls: sql<number>`percentile_cont(0.75) within group (order by ${v.value}) filter (where ${v.metric} = 'CLS')`,
        views: sql<number>`count(*) filter (where ${v.metric} = 'TTFB')::int`,
      })
      .from(v)
      .where(W)
      .groupBy(sql`1`)
      .orderBy(sql`1`),
  ]);

  const order: VitalName[] = ["LCP", "INP", "CLS", "FCP", "TTFB"];
  const metrics: MetricSummary[] = order.map((name) => {
    const r = metricRows.find((m) => m.name === name);
    return { name, p75: r ? num(r.p75) : null, samples: r?.samples ?? 0, good: Number(r?.good ?? 0), poor: Number(r?.poor ?? 0) };
  });
  const core = metrics.filter((m) => m.name === "LCP" || m.name === "INP" || m.name === "CLS");
  // INP only exists after an interaction; a site where few visitors tap anything can still be judged on LCP and CLS.
  const judged = core.filter((m) => m.samples >= MIN_SAMPLES);
  const assessment: FieldReport["assessment"] =
    judged.length < 2 || !judged.some((m) => m.name === "LCP") ? "not-enough-data" : judged.every((m) => m.p75 !== null && rate(m.name, m.p75) === "good") ? "passed" : "failed";

  const pages: PageRow[] = pageRows
    .map((r) => ({ path: r.path, views: r.views, lcp: num(r.lcp), inp: num(r.inp), cls: num(r.cls), fcp: num(r.fcp), ttfb: num(r.ttfb), lcpSamples: r.lcpSamples }))
    .sort((a, b) => (b.lcp ?? -1) - (a.lcp ?? -1));

  // Largest files: the biggest size seen for each file, and on how many different pages.
  const seen = new Map<string, { url: string; kind: string; size: number; pages: Set<string> }>();
  for (const r of assetRows) {
    if (!Array.isArray(r.assets)) continue;
    for (const a of r.assets as { u?: unknown; s?: unknown; k?: unknown }[]) {
      if (typeof a.u !== "string" || typeof a.s !== "number") continue;
      const e = seen.get(a.u) ?? { url: a.u, kind: typeof a.k === "string" ? a.k : "other", size: 0, pages: new Set<string>() };
      e.size = Math.max(e.size, a.s);
      e.pages.add(r.path);
      seen.set(a.u, e);
    }
  }
  const assets = [...seen.values()]
    .sort((a, b) => b.size - a.size)
    .slice(0, 12)
    .map((a) => ({ url: a.url, kind: a.kind, size: a.size, pages: a.pages.size }));

  const issues: Issue[] = [];
  const fmt = (name: VitalName, value: number) => (name === "CLS" ? value.toFixed(2) : value >= 1000 ? `${(value / 1000).toFixed(1)} s` : `${Math.round(value)} ms`);
  for (const p of pages) {
    const checks: [VitalName, number | null, number][] = [
      ["LCP", p.lcp, p.lcpSamples],
      ["INP", p.inp, 0],
      ["CLS", p.cls, 0],
      ["TTFB", p.ttfb, p.views],
    ];
    for (const [name, value, n] of checks) {
      if (value === null) continue;
      if (n && n < MIN_PAGE_SAMPLES) continue;
      const r = rate(name, value);
      if (r === "good") continue;
      issues.push({ severity: r, kind: name, path: p.path, samples: n || undefined, message: `${name} is ${fmt(name, value)} for 3 in 4 visits (75th percentile); good is at most ${fmt(name, THRESHOLDS[name][0])}.` });
    }
  }
  for (const a of assets) {
    if (a.size > 300 * 1024 && a.kind !== "script") {
      issues.push({ severity: a.size > 600 * 1024 ? "poor" : "needs-improvement", kind: "ASSET", path: a.url, message: `${a.kind === "img" ? "Image" : "File"} of ${(a.size / 1024).toFixed(0)} KB, on ${a.pages} page${a.pages === 1 ? "" : "s"}.` });
    }
  }
  issues.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "poor" ? -1 : 1));

  const daily = dailyRows.map((d) => ({ day: d.day, lcp: num(d.lcp), inp: num(d.inp), cls: num(d.cls), views: d.views }));
  const views = metrics.find((m) => m.name === "TTFB")?.samples ?? 0;
  return {
    days,
    device,
    views,
    metrics,
    assessment,
    pages,
    lcpElements: elementRows.map((e) => ({ path: e.path, el: e.el, url: e.url, count: e.count, p75: Number(e.p75) })),
    assets,
    issues,
    daily,
  };
}
