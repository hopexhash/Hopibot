# Performance of the public website

How fast wearehopi.nl is, how that is measured, what was changed and what protects it.

## 1. Two kinds of measurement

| | Field data | Lab data |
| --- | --- | --- |
| Source | Real visits (Core Web Vitals sent by visitors' browsers) | One simulated visit (Lighthouse) |
| Where | Control room → Performance (top cards, tables) | Control room → Performance → Lab tests (PageSpeed Insights), or Lighthouse locally |
| Judged as | 75th percentile, Google's thresholds (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) | Score 0–100 on a mid-range phone with slow 4G |
| Use | What visitors experience; what Google uses | Comparing versions, finding causes |

Lab numbers vary a few points between runs. Lighthouse's simulation ("Lantern") also adds the
download and execution of all early JavaScript to LCP. On this site the real (unthrottled) trace
shows LCP at the same moment as the first paint (≈ 0.2 s locally, ≈ 1.1 s with 4× CPU throttling
and slow 4G), while the simulated LCP is 2.6–3.6 s. Judge the site on field data.

## 2. Field monitoring (Core Web Vitals)

- `src/components/site/web-vitals.tsx` (public layout only) collects LCP, INP, CLS, FCP and TTFB
  with `next/web-vitals` and sends them with `sendBeacon` when the page is hidden.
- `POST /api/vitals` (`src/app/api/vitals/route.ts`) validates the beacon, drops robots and test
  tools, rate-limits per hashed address and stores rows in `web_vitals` (migration 0008).
- Anonymous: no cookie, nothing stored in the browser, no IP address, user agent or identifier.
  Stored: page path (no query), metric, value, rating, phone/desktop, network class, the LCP/INP
  element description (tag, id, two classes; never text), and once per page the five largest
  same-origin files. Removed after 90 days. Disclosed on /cookies and /privacy.
- `src/server/performance/vitals.ts` builds the report: Core Web Vitals assessment, p75 per metric,
  slowest pages, LCP elements, largest files, problems (only measured ones) and recommendations.

## 3. Lab tests

Integration "Google PageSpeed Insights" (API key, Integrations page). The Performance page runs a
test on any sitemap page for phone or desktop and keeps the last 40 results (`settings.perfLab`),
including Lighthouse's opportunities and Google's own field data (CrUX) when it exists. Without a
key Google's shared quota is used up, so a key is required.

## 4. Automatic protection

`scripts/perf-budget.mjs` runs after every build (`postbuild`, warnings only) and in CI
(`npm run perf:budget`, fails). Per prerendered public page: ≤ 185 KB compressed JS, ≤ 30 KB
render-blocking CSS, ≤ 3 preloaded fonts, ≤ 80 KB per JS file; ≤ 450 KB per image in
public/site and public/demos. Today: ≈ 157 KB JS and ≈ 20 KB CSS on the heaviest page.

## 5. What was changed (November 2026)

| Change | Why |
| --- | --- |
| 404 animation loaded only on a real 404 (`not-found-lazy.tsx`, CSS moved into the stage) | Every page downloaded the 404 script (2.7 KB) and preloaded its stylesheet (3.9 KB) through the layout's not-found boundary |
| 404 fonts in their own module without preload (`fonts-404.ts`) | Next.js preloads every font of an imported font module; demo pages preloaded HOPI's two fonts before their own (5 → 3 preloads) |
| Project screenshots in 480/768/960 widths with `srcset` | `/werk/[slug]` loaded a 250–430 KB image on every phone |
| Homepage WebGL setup after `load` + idle | Shader compilation ran during hydration; the sculpture still fades in on its first frame, as before |
| Cache headers for /site, /demos images (7 days + SWR 30 days) and /site-assets/fonts (30 days + SWR 1 year) | They were served with `max-age=0`; nothing private lives there. Hashed `_next/static` files were already immutable |
| Performance page, Web Vitals collection, PageSpeed integration, budgets | Monitoring and protection (sections 2–4) |

Tried and rejected (measured, no gain): `experimental.inlineCss` (FCP unchanged in the lab, HTML
+35 KB per page and no CSS caching between pages).

Checked and left as is: all animations use transform/opacity and pause off-screen or in hidden
tabs (hero, 404 particles, scroll effects); fonts are self-hosted, subset, `display: swap`, with
only the display and body font preloaded; the public pages are prerendered (ISR, 5 minutes); the
remaining JavaScript is mostly React and the Next.js runtime (≈ 118 KB of ≈ 157 KB). The modern
browser bundle ships no legacy polyfills (the polyfill file is `noModule`).

## 6. Before and after (Lighthouse 12, mobile, simulated, local production build)

| Page | Before score · LCP · bytes | After score · LCP · bytes |
| --- | --- | --- |
| / | 90 · 3.3 s · 466 KB | 94 · 2.6 s · 465 KB |
| /website-laten-maken | 90 · 3.5 s · 381 KB | 95 · 2.7 s · 380 KB |
| /website-laten-maken/restaurant | 95 · 2.7 s · 436 KB | 90–96 · 2.7–3.4 s · 435 KB |
| /prijzen | 98 · 2.3 s · 314 KB | 94–97 · 2.4–3.0 s · 312 KB |
| /werk | 93 · 3.2 s · 427 KB | 92–94 · 3.0–3.2 s · 426 KB |
| /werk/restaurant | 81 · 4.5 s · 628 KB | 87–91 · 3.5–3.8 s · 514–522 KB |
| /blog/wat-kost-een-website-laten-maken | 93 · 3.0 s · 326 KB | 93–95 · 2.8–3.1 s · 318–324 KB |
| /demos/restaurant | 89 · 3.5 s · 365 KB | 90–94 · 2.9–3.4 s · 305 KB |

CLS is 0 everywhere, before and after. Ranges are several runs; differences of a few points on
pages without a change are run-to-run variation.
