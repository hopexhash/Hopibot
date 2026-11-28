#!/usr/bin/env node
/**
 * Performance budget for the public website, checked after `next build`.
 *
 * It reads every prerendered public page (.next/server/app/**.html), collects the scripts,
 * stylesheets and preloaded fonts the page makes the browser download, and compares their
 * compressed (gzip) size with the budgets below. It also checks the size of every image in
 * public/site and public/demos.
 *
 *   node scripts/perf-budget.mjs           report, and warn when a budget is exceeded
 *   node scripts/perf-budget.mjs --strict  exit with code 1 when a budget is exceeded (CI)
 *
 * The budgets sit a little above today's real sizes (see docs/PERFORMANCE.md), so a new
 * dependency or a forgotten large image shows up in the build instead of in the field.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const BUDGET = {
  /** Compressed JavaScript one page downloads (framework included). */
  pageJs: 185 * 1024,
  /** Compressed render-blocking CSS one page downloads. */
  pageCss: 30 * 1024,
  /** Any single JavaScript file, compressed. */
  chunk: 80 * 1024,
  /** Fonts a page preloads (each competes with the critical CSS). */
  preloadedFonts: 3,
  /** Any image in public/site or public/demos, on disk. */
  image: 450 * 1024,
};

const strict = process.argv.includes("--strict");
const root = process.cwd();
const appDir = join(root, ".next/server/app");
if (!existsSync(appDir)) {
  console.error("perf-budget: no build found (.next/server/app). Run `next build` first.");
  process.exit(strict ? 1 : 0);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const gz = new Map();
const gzSize = (urlPath) => {
  if (gz.has(urlPath)) return gz.get(urlPath);
  const file = join(root, ".next", urlPath.replace(/^\/_next\//, ""));
  const size = existsSync(file) ? gzipSync(readFileSync(file), { level: 9 }).length : 0;
  gz.set(urlPath, size);
  return size;
};

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
const problems = [];
const rows = [];

// The control room (app) is private and not part of the public budget; the not-found and
// error shells are not pages people land on.
const pages = walk(appDir).filter((f) => f.endsWith(".html") && !f.includes("(app)") && !/_global-error|_not-found/.test(f));
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const route = "/" + relative(appDir, file).replace(/\.html$/, "").replace(/\([^)]+\)\//g, "").replace(/(^|\/)index$/, "");
  const scripts = [...new Set([...html.matchAll(/<script src="(\/_next\/[^"]+\.js)"(?![^>]*noModule)/g)].map((m) => m[1]))];
  const styles = [...new Set([...html.matchAll(/<link rel="stylesheet" href="(\/_next\/[^"]+\.css)"/g)].map((m) => m[1]))];
  const fonts = [...new Set([...html.matchAll(/<link rel="preload" href="([^"]+\.woff2)" as="font"/g)].map((m) => m[1]))];
  const js = scripts.reduce((s, u) => s + gzSize(u), 0);
  const css = styles.reduce((s, u) => s + gzSize(u), 0);
  rows.push({ route, js, css, fonts: fonts.length, requests: scripts.length + styles.length });
  if (js > BUDGET.pageJs) problems.push(`${route}: ${kb(js)} JavaScript (budget ${kb(BUDGET.pageJs)})`);
  if (css > BUDGET.pageCss) problems.push(`${route}: ${kb(css)} render-blocking CSS (budget ${kb(BUDGET.pageCss)})`);
  if (fonts.length > BUDGET.preloadedFonts) problems.push(`${route}: ${fonts.length} preloaded fonts (budget ${BUDGET.preloadedFonts})`);
  for (const u of scripts) if (gzSize(u) > BUDGET.chunk) problems.push(`${route}: ${u} is ${kb(gzSize(u))} (budget per file ${kb(BUDGET.chunk)})`);
}

for (const dir of ["public/site", "public/demos"]) {
  const abs = join(root, dir);
  if (!existsSync(abs)) continue;
  for (const f of walk(abs).filter((f) => /\.(webp|avif|jpe?g|png)$/i.test(f))) {
    const size = statSync(f).size;
    if (size > BUDGET.image) problems.push(`${relative(root, f)}: ${kb(size)} (budget per image ${kb(BUDGET.image)})`);
  }
}

rows.sort((a, b) => b.js + b.css - (a.js + a.css));
const worst = rows.slice(0, 8);
console.log(`perf-budget: ${rows.length} public pages checked`);
console.log("  heaviest pages (gzip):");
for (const r of worst) console.log(`    ${r.route.padEnd(48)} js ${kb(r.js).padStart(9)}  css ${kb(r.css).padStart(8)}  fonts ${r.fonts}`);
const unique = [...new Map(problems.map((p) => [p.replace(/^[^:]+: /, ""), p])).values()];
if (!unique.length) {
  console.log("perf-budget: all budgets met");
  process.exit(0);
}
console.log(`perf-budget: ${unique.length} budget(s) exceeded`);
for (const p of unique.slice(0, 40)) console.log(`  ! ${p}`);
process.exit(strict ? 1 : 0);
