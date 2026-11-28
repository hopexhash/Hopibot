"use client";

import { useReportWebVitals } from "next/web-vitals";

type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];
type Item = { n: string; v: number; r: string; p: string; t?: string; el?: string; u?: string };

/**
 * Measures how fast the website really is for its visitors (Core Web Vitals) and sends the
 * numbers to /api/vitals, for the Performance page of the control room.
 *
 * Anonymous by design: no cookie, nothing stored in the browser, no identifier. What is sent
 * is the page path, the measurements, phone or desktop, the network class and, once per page,
 * the sizes of the largest files of this website it loaded. Sent in one small request when
 * the page is hidden (sendBeacon), so it never competes with the page itself.
 */
const queue: Item[] = [];
let listening = false;
let assetsSent = false;

/** "h1.hero-title" style description of an element, for finding it back; never any text content. */
const describe = (el: unknown): string | undefined => {
  if (!(el instanceof Element)) return undefined;
  const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).filter(Boolean).slice(0, 2) : [];
  return (el.tagName.toLowerCase() + (el.id ? `#${el.id}` : "") + (cls.length ? `.${cls.join(".")}` : "")).slice(0, 120);
};

/** Only addresses on this website are reported (paths, no query strings). */
const ownPath = (url: string | undefined) => {
  if (!url) return undefined;
  try {
    const u = new URL(url, location.href);
    return u.origin === location.origin ? u.pathname.slice(0, 150) : undefined;
  } catch {
    return undefined;
  }
};

const pathOf = (m: Metric) => {
  try {
    return new URL(m.navigationURL || location.href).pathname;
  } catch {
    return location.pathname;
  }
};

/** What kind of file it is, by its extension (a preloaded image is still an image). */
const kindOf = (e: PerformanceResourceTiming) => {
  const ext = (ownPath(e.name) ?? "").split(".").pop() ?? "";
  if (/^(webp|avif|jpe?g|png|gif|svg)$/.test(ext)) return "img";
  if (/^(woff2?|ttf|otf)$/.test(ext)) return "font";
  if (ext === "js") return "script";
  if (ext === "css") return "css";
  return e.initiatorType.slice(0, 16);
};

/** The five largest files of this website the page loaded (size on the wire or, if cached, on disk). */
function largestAssets() {
  return performance
    .getEntriesByType("resource")
    .map((e) => e as PerformanceResourceTiming)
    .filter((e) => e.name.startsWith(location.origin))
    .map((e) => ({ u: ownPath(e.name) ?? "", s: Math.round(e.transferSize || e.encodedBodySize || 0), k: kindOf(e) }))
    .filter((a) => a.u && a.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 5);
}

function flush() {
  if (!queue.length) return;
  const m = queue.splice(0, 12);
  const nav = navigator as Navigator & { connection?: { effectiveType?: string } };
  const body: Record<string, unknown> = { d: window.innerWidth < 768 ? "mobile" : "desktop", c: nav.connection?.effectiveType, m };
  if (!assetsSent && m.some((x) => x.n === "TTFB")) {
    assetsSent = true;
    body.a = largestAssets();
  }
  const json = JSON.stringify(body);
  if (!navigator.sendBeacon?.("/api/vitals", new Blob([json], { type: "application/json" }))) {
    void fetch("/api/vitals", { method: "POST", body: json, keepalive: true, headers: { "content-type": "application/json" } }).catch(() => {});
  }
  if (queue.length) flush();
}

function report(m: Metric) {
  const last = m.entries[m.entries.length - 1] as (PerformanceEntry & { element?: Element; url?: string; target?: Element }) | undefined;
  queue.push({
    n: m.name,
    v: m.name === "CLS" ? Math.round(m.value * 1000) / 1000 : Math.round(m.value),
    r: m.rating,
    p: pathOf(m),
    t: m.navigationType,
    el: m.name === "LCP" ? describe(last?.element) : m.name === "INP" ? describe(last?.target) : undefined,
    u: m.name === "LCP" ? ownPath(last?.url) : undefined,
  });
  if (!listening) {
    listening = true;
    addEventListener("visibilitychange", () => document.visibilityState === "hidden" && flush());
    addEventListener("pagehide", flush);
  }
}

export function WebVitals() {
  useReportWebVitals(report);
  return null;
}
