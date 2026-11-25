import "../guard";
import { readFile } from "node:fs/promises";
import path from "node:path";
import dns from "node:dns";
import type { Browser, Page } from "playwright";
import { isBlockedIp, validateUrl } from "../net/safe-fetch";
import { QC_PASS_SCORE } from "@/lib/constants";

export type QcIssue = {
  code: string;
  severity: "critical" | "major" | "minor";
  message: string;
  viewport?: string;
  detail?: string;
};

export type QcReport = {
  score: number;
  passed: boolean;
  issues: QcIssue[];
  checks: { name: string; passed: boolean; detail?: string }[];
  metrics: Record<string, number>;
  screenshots: Record<string, string>;
  testedAt: string;
  durationMs: number;
};

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, isMobile: false },
  { name: "tablet", width: 834, height: 1112, isMobile: true },
  { name: "mobile", width: 390, height: 844, isMobile: true },
] as const;

const ORIGIN = "https://qc-preview.agencyos.local";
const PENALTY = { critical: 25, major: 8, minor: 3 } as const;

let browserPromise: Promise<Browser> | null = null;
async function browser() {
  if (!browserPromise) {
    browserPromise = import("playwright").then(({ chromium }) =>
      chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined, args: ["--no-sandbox"] }),
    );
  }
  return browserPromise;
}
export async function closeQcBrowser() {
  if (browserPromise) (await browserPromise).close().catch(() => {});
  browserPromise = null;
}

const FONT_DIR = path.join(process.cwd(), "public", "site-assets", "fonts");

async function serveFiles(page: Page, files: Map<string, { content: string; contentType: string }>, failed: string[]) {
  // Transpilers (esbuild keepNames) may wrap functions passed to page.evaluate in __name().
  await page.addInitScript("globalThis.__name = globalThis.__name || ((fn) => fn);");
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === ORIGIN) {
      const p = url.pathname.replace(/^\//, "") || "index.html";
      const f = files.get(p);
      if (f) return route.fulfill({ status: 200, contentType: f.contentType, body: f.content });
      if (p.startsWith("assets/fonts/")) {
        try {
          const body = await readFile(path.join(FONT_DIR, path.basename(p)));
          return route.fulfill({ status: 200, contentType: "font/woff2", body });
        } catch {
          failed.push(p);
          return route.fulfill({ status: 404, body: "" });
        }
      }
      failed.push(p);
      return route.fulfill({ status: 404, body: "not found" });
    }
    if (url.protocol === "data:") return route.continue();
    // External resources (authorised HTTPS images only). The worker must not become an
    // SSRF proxy, so the same rules as safeFetch apply: https/public hosts only.
    try {
      if (url.protocol !== "https:") throw new Error("non-https");
      validateUrl(url.toString());
      const addrs = await dns.promises.lookup(url.hostname, { all: true });
      if (!addrs.length || addrs.some((a) => isBlockedIp(a.address))) throw new Error("blocked address");
      return route.continue();
    } catch {
      failed.push(`blocked external request ${url.hostname}`);
      return route.abort("blockedbyclient");
    }
  });
}

export async function runQc(input: {
  files: { path: string; content: string; contentType: string }[];
  integrityIssues: { label: string; excerpt: string }[];
  expectDemoBanner: boolean;
}): Promise<QcReport> {
  const started = Date.now();
  const files = new Map(input.files.map((f) => [f.path, f]));
  const issues: QcIssue[] = [];
  const checks: QcReport["checks"] = [];
  const metrics: Record<string, number> = {};
  const screenshots: Record<string, string> = {};
  const add = (i: QcIssue) => {
    if (!issues.some((x) => x.code === i.code && x.viewport === i.viewport && x.detail === i.detail)) issues.push(i);
  };
  const check = (name: string, passed: boolean, detail?: string) => checks.push({ name, passed, detail });

  const html = files.get("index.html")?.content ?? "";
  metrics.htmlKb = Math.round(Buffer.byteLength(html) / 1024);
  if (!html) {
    return { score: 0, passed: false, issues: [{ code: "no_index", severity: "critical", message: "index.html is missing" }], checks, metrics, screenshots, testedAt: new Date().toISOString(), durationMs: 0 };
  }

  const b = await browser();
  for (const vp of VIEWPORTS) {
    const context = await b.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.isMobile, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await context.newPage();
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failed: string[] = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => pageErrors.push(e.message.slice(0, 200)));
    page.on("requestfailed", (r) => failed.push(r.url().slice(0, 150)));
    page.on("response", (r) => r.status() >= 400 && failed.push(`${r.status()} ${r.url().slice(0, 150)}`));
    await serveFiles(page, files, failed);
    try {
      const t0 = Date.now();
      await page.goto(`${ORIGIN}/index.html`, { waitUntil: "load", timeout: 30000 });
      metrics[`${vp.name}LoadMs`] = Date.now() - t0;
      await page.waitForTimeout(250);
      // Below-the-fold images are lazy: load them all before judging whether any is broken.
      await page.evaluate(async () => {
        const imgs = Array.from(document.images);
        for (const i of imgs) i.loading = "eager";
        await Promise.race([
          Promise.all(imgs.map((i) => (i.complete ? null : new Promise((res) => ((i.onload = res), (i.onerror = res)))))),
          new Promise((res) => setTimeout(res, 8000)),
        ]);
      });

      // Structural/layout checks.
      const layout = await page.evaluate(() => {
        const doc = document.documentElement;
        const imgs = Array.from(document.images);
        const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
        const btns = Array.from(document.querySelectorAll<HTMLElement>(".btn, button, .menu-btn"));
        const visible = (el: Element) => {
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
        };
        return {
          overflow: doc.scrollWidth - window.innerWidth,
          imagesBroken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src.slice(0, 80)),
          imagesNoAlt: imgs.filter((i) => !i.getAttribute("alt")?.trim()).length,
          imageCount: imgs.length,
          brokenAnchors: anchors.map((a) => a.getAttribute("href")!).filter((h) => h.length > 1 && !document.getElementById(h.slice(1))),
          smallTargets: btns.filter((b) => visible(b) && b.getBoundingClientRect().height < 40).map((b) => (b.textContent ?? "").trim().slice(0, 30)),
          unnamedButtons: btns.filter((b) => visible(b) && !(b.textContent?.trim() || b.getAttribute("aria-label"))).length,
          demoBanner: Boolean(document.querySelector(".demo-bar")) && visible(document.querySelector(".demo-bar")!),
          navVisible: (() => {
            const n = document.querySelector(".nav");
            return n ? visible(n) : false;
          })(),
          menuBtnVisible: (() => {
            const m = document.querySelector(".menu-btn");
            return m ? visible(m) : false;
          })(),
        };
      });
      if (layout.overflow > 2) add({ code: "horizontal_overflow", severity: vp.name === "mobile" ? "critical" : "major", message: `Page is ${layout.overflow}px wider than the ${vp.name} viewport`, viewport: vp.name });
      for (const src of layout.imagesBroken) add({ code: "image_broken", severity: "major", message: "Image failed to load", viewport: vp.name, detail: src });
      if (layout.imagesNoAlt) add({ code: "image_alt", severity: "major", message: `${layout.imagesNoAlt} image(s) without alt text` });
      for (const a of layout.brokenAnchors) add({ code: "broken_link", severity: "major", message: `In-page link ${a} has no target`, detail: a });
      if (vp.isMobile && layout.smallTargets.length) add({ code: "tap_targets", severity: "minor", message: `Tap targets smaller than 40px: ${layout.smallTargets.slice(0, 3).join(", ")}`, viewport: vp.name });
      if (layout.unnamedButtons) add({ code: "button_name", severity: "major", message: `${layout.unnamedButtons} button(s) without an accessible name` });
      if (input.expectDemoBanner && !layout.demoBanner) add({ code: "demo_banner", severity: "critical", message: "Demonstration notice is missing or hidden", viewport: vp.name });
      check(`${vp.name}: no horizontal overflow`, layout.overflow <= 2);
      check(`${vp.name}: all images loaded`, layout.imagesBroken.length === 0, `${layout.imageCount} images`);

      // Navigation: desktop shows nav; mobile menu must open and close.
      if (vp.name === "desktop") {
        check("desktop: navigation visible", layout.navVisible);
        if (!layout.navVisible) add({ code: "nav_hidden", severity: "major", message: "Main navigation is not visible on desktop", viewport: vp.name });
      } else if (layout.menuBtnVisible) {
        await page.click(".menu-btn");
        await page.waitForTimeout(150);
        const opened = await page.evaluate(() => {
          const n = document.querySelector(".nav");
          return n ? getComputedStyle(n).display !== "none" : false;
        });
        check(`${vp.name}: mobile menu opens`, opened);
        if (!opened) add({ code: "mobile_nav", severity: "major", message: "Mobile menu does not open", viewport: vp.name });
        else {
          const link = page.locator(".nav a[href^='#']").first();
          if (await link.count()) {
            await link.click();
            await page.waitForTimeout(200);
            const closed = await page.evaluate(() => getComputedStyle(document.querySelector(".nav")!).display === "none");
            check(`${vp.name}: menu closes after navigating`, closed);
            if (!closed) add({ code: "mobile_nav_close", severity: "minor", message: "Mobile menu stays open after choosing a link", viewport: vp.name });
          }
        }
      } else if (!layout.navVisible) {
        add({ code: "mobile_nav", severity: "major", message: "No navigation available on this viewport", viewport: vp.name });
      }

      // Buttons: every in-page CTA must lead somewhere.
      const ctas = await page.$$eval("a.btn", (as) => as.map((a) => a.getAttribute("href") ?? ""));
      const deadCtas = ctas.filter((h) => !h || h === "#");
      if (deadCtas.length) add({ code: "dead_cta", severity: "major", message: `${deadCtas.length} button(s) without a destination` });
      check(`${vp.name}: buttons have destinations`, deadCtas.length === 0, `${ctas.length} buttons`);

      // Form: labels + demo submission feedback (desktop only — same markup elsewhere).
      if (vp.name === "desktop") {
        const form = await page.$("form[data-demo-form]");
        if (form) {
          const unlabeled = await page.$$eval("form input, form textarea, form select", (els) => els.filter((e) => !document.querySelector(`label[for="${e.id}"]`)).length);
          if (unlabeled) add({ code: "form_labels", severity: "major", message: `${unlabeled} form field(s) without a label` });
          // Fill whatever fields this form has (contact, booking, quote and order forms differ).
          await form.evaluate((f) => {
            for (const el of Array.from(f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select"))) {
              if (el instanceof HTMLSelectElement) el.selectedIndex = Math.min(1, el.options.length - 1);
              else if (el.type === "email") el.value = "qc@example.com";
              else if (el.type === "date") el.value = "2030-01-15";
              else if (el.type === "time") el.value = "18:30";
              else if (el.type === "tel") el.value = "+31101234567";
              else el.value = "Automated quality-control test";
            }
          });
          await form.evaluate((f) => (f as HTMLFormElement).requestSubmit());
          await page.waitForTimeout(150);
          const feedback = await form.$eval(".form-status", (el) => el.classList.contains("show"));
          check("form: shows demonstration feedback on submit", feedback);
          if (!feedback) add({ code: "form_submit", severity: "major", message: "Contact form gives no feedback on submit" });
        }
      }

      if (consoleErrors.length) add({ code: "console_errors", severity: "major", message: `${consoleErrors.length} console error(s)`, viewport: vp.name, detail: consoleErrors[0] });
      if (pageErrors.length) add({ code: "page_errors", severity: "critical", message: `JavaScript error: ${pageErrors[0]}`, viewport: vp.name });
      const missing = failed.filter((f) => !f.includes("favicon"));
      if (missing.length) add({ code: "missing_assets", severity: "major", message: `${missing.length} request(s) failed`, viewport: vp.name, detail: missing[0] });
      check(`${vp.name}: no console or page errors`, consoleErrors.length + pageErrors.length === 0);

      await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")));
      const shot = await page.screenshot({ type: "jpeg", quality: 55, fullPage: false });
      screenshots[vp.name] = `data:image/jpeg;base64,${shot.toString("base64")}`;
      // The visual review judges the whole page, not only the first screen: a long capture of
      // the desktop and the phone layout (height capped so the image stays reviewable).
      if (vp.name !== "tablet") {
        // Captured as consecutive parts: one very tall image would be scaled down until the text is unreadable.
        const h = await page.evaluate(() => document.documentElement.scrollHeight);
        const part = vp.name === "desktop" ? 1500 : 1400;
        for (let k = 0; k < 3 && k * part < h; k++) {
          const piece = await page.screenshot({ type: "jpeg", quality: 50, fullPage: true, clip: { x: 0, y: k * part, width: vp.width, height: Math.min(part, h - k * part) } });
          screenshots[`${vp.name}_part${k + 1}`] = `data:image/jpeg;base64,${piece.toString("base64")}`;
        }
      }
    } catch (err) {
      add({ code: "load_failed", severity: "critical", message: `Page failed to load: ${(err as Error).message.slice(0, 160)}`, viewport: vp.name });
    } finally {
      await context.close();
    }
  }

  // Layout must hold at every common width, not only the three main ones.
  {
    const context = await b.newContext({ viewport: { width: 375, height: 800 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await context.newPage();
    await serveFiles(page, files, []);
    try {
      await page.goto(`${ORIGIN}/index.html`, { waitUntil: "load", timeout: 30000 });
      for (const width of [375, 430, 768, 1024, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        await page.waitForTimeout(120);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        if (over > 2) add({ code: "horizontal_overflow", severity: width < 800 ? "critical" : "major", message: `Page is ${over}px wider than a ${width}px screen`, viewport: `${width}px` });
        check(`${width}px: no horizontal overflow`, over <= 2);
      }
    } catch {
      // The main viewport pass already reports a page that cannot load.
    } finally {
      await context.close();
    }
  }

  // SEO & accessibility basics from the document itself.
  const seo = await (async () => {
    const context = await b.newContext();
    const page = await context.newPage();
    await serveFiles(page, files, []);
    await page.goto(`${ORIGIN}/index.html`, { waitUntil: "domcontentloaded" });
    const r = await page.evaluate(() => {
      const meta = (n: string) => document.querySelector(`meta[name="${n}"]`)?.getAttribute("content") ?? "";
      const headings = Array.from(document.querySelectorAll("h1,h2,h3,h4")).map((h) => Number(h.tagName[1]));
      let skipped = 0;
      for (let i = 1; i < headings.length; i++) if (headings[i] - headings[i - 1] > 1) skipped++;
      let jsonLdValid = true;
      document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
        try {
          JSON.parse(s.textContent ?? "");
        } catch {
          jsonLdValid = false;
        }
      });
      const body = getComputedStyle(document.body);
      return {
        title: document.title,
        description: meta("description"),
        viewport: meta("viewport"),
        lang: document.documentElement.lang,
        h1: document.querySelectorAll("h1").length,
        skipped,
        jsonLdValid,
        hasSkipLink: Boolean(document.querySelector("a.skip")),
        hasMain: Boolean(document.querySelector("main")),
        textColor: body.color,
        bgColor: body.backgroundColor,
      };
    });
    await context.close();
    return r;
  })();
  if (seo.title.length < 10 || seo.title.length > 70) add({ code: "meta_title", severity: "minor", message: `Title length ${seo.title.length} (aim for 10–70)` });
  if (seo.description.length < 50 || seo.description.length > 170) add({ code: "meta_description", severity: "minor", message: `Meta description length ${seo.description.length} (aim for 50–170)` });
  if (!seo.viewport.includes("width=device-width")) add({ code: "viewport_meta", severity: "critical", message: "Missing responsive viewport meta tag" });
  if (!seo.lang) add({ code: "html_lang", severity: "major", message: "Missing lang attribute" });
  if (seo.h1 !== 1) add({ code: "h1_count", severity: "major", message: `Expected exactly one H1, found ${seo.h1}` });
  if (seo.skipped) add({ code: "heading_order", severity: "minor", message: `${seo.skipped} skipped heading level(s)` });
  if (!seo.jsonLdValid) add({ code: "structured_data", severity: "minor", message: "Invalid JSON-LD" });
  if (!seo.hasSkipLink || !seo.hasMain) add({ code: "landmarks", severity: "minor", message: "Missing skip link or main landmark" });
  check("SEO: title and description", seo.title.length >= 10 && seo.description.length >= 50);
  check("Accessibility: one H1, lang, landmarks", seo.h1 === 1 && Boolean(seo.lang) && seo.hasMain);

  // Performance budget.
  if (metrics.htmlKb > 450) add({ code: "page_weight", severity: "minor", message: `HTML is ${metrics.htmlKb} KB (budget 450 KB)` });
  if ((metrics.mobileLoadMs ?? 0) > 4000) add({ code: "slow_load", severity: "major", message: `Mobile load took ${metrics.mobileLoadMs} ms` });
  check("Performance: within page-weight budget", metrics.htmlKb <= 450, `${metrics.htmlKb} KB`);

  // Content integrity (invented reviews, awards, prices…).
  for (const i of input.integrityIssues) add({ code: "content_integrity", severity: "major", message: `Possible unverified ${i.label}`, detail: i.excerpt });
  check("Content: no unverified claims", input.integrityIssues.length === 0);
  check("Demonstration notice present", !issues.some((i) => i.code === "demo_banner"));

  // Repeated issues across viewports count once per code+viewport; cap minor penalties.
  let score = 100;
  let minor = 0;
  for (const i of issues) {
    if (i.severity === "minor") {
      if (minor < 15) score -= PENALTY.minor;
      minor += PENALTY.minor;
    } else score -= PENALTY[i.severity];
  }
  score = Math.max(0, Math.min(100, score));
  const hasCritical = issues.some((i) => i.severity === "critical");
  return {
    score,
    passed: score >= QC_PASS_SCORE && !hasCritical,
    issues,
    checks,
    metrics,
    screenshots,
    testedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
  };
}
