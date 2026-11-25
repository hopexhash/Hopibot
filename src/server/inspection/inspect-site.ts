import "../guard";
import dns from "node:dns";
import type { Browser, BrowserContext, Page } from "playwright";
import type { Measured } from "@/lib/qualification";
import { isBlockedIp, safeFetch, validateUrl } from "../net/safe-fetch";

/**
 * Visits a website in a real browser, at desktop size and at phone size (390px), and
 * returns what was actually measured plus screenshots. Nothing here is an opinion: the
 * visual judgement happens afterwards, on the screenshots.
 */
export type SiteInspection = {
  measured: Measured;
  shots: { desktopTop: Buffer; desktopBottom: Buffer; mobileTop: Buffer; mobileMid: Buffer };
  /** Visible text of the page (trimmed), for content checks. */
  text: string;
  durationMs: number;
};

const DESKTOP = { width: 1440, height: 900 };
const MOBILE = { width: 390, height: 844 };
const MOBILE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

/** Test hook: lets the automated tests inspect pages served from this machine. Never active in production. */
const ALLOW_LOCAL = process.env.NODE_ENV !== "production" && process.env.INSPECT_ALLOW_LOCAL === "1";

let browserPromise: Promise<Browser> | null = null;
async function browser() {
  if (!browserPromise) {
    browserPromise = import("playwright").then(({ chromium }) => chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined, args: ["--no-sandbox"] }));
  }
  return browserPromise;
}
export async function closeInspectionBrowser() {
  if (browserPromise) (await browserPromise).close().catch(() => {});
  browserPromise = null;
}

/** The worker must not become an SSRF proxy: only public http(s) hosts are ever requested. */
async function guard(ctx: BrowserContext, counters: { failed: number }) {
  const verdicts = new Map<string, boolean>();
  await ctx.addInitScript("globalThis.__name = globalThis.__name || ((fn) => fn);");
  await ctx.route("**/*", async (route) => {
    const raw = route.request().url();
    if (raw.startsWith("data:") || raw.startsWith("blob:") || ALLOW_LOCAL) return route.continue();
    try {
      const url = validateUrl(raw);
      let ok = verdicts.get(url.hostname);
      if (ok === undefined) {
        const addrs = await dns.promises.lookup(url.hostname, { all: true });
        ok = addrs.length > 0 && !addrs.some((a) => isBlockedIp(a.address));
        verdicts.set(url.hostname, ok);
      }
      if (!ok) throw new Error("blocked");
      return route.continue();
    } catch {
      counters.failed++;
      return route.abort("blockedbyclient");
    }
  });
}

/** Cookie walls hide the design. Decline when possible, otherwise accept, otherwise leave it. */
async function dismissCookieBanner(page: Page) {
  const labels = [/^(alles )?(weigeren|afwijzen)$/i, /^(alleen )?noodzakelijk(e cookies)?$/i, /^(reject|decline)( all)?$/i, /^(tout )?refuser$/i, /^(alles |alle cookies )?(accepteren|toestaan|akkoord)$/i, /^(accept|allow)( all)?( cookies)?$/i, /^(tout )?accepter$/i, /^(ok|oké|begrepen|got it|i agree|ik ga akkoord)$/i];
  for (const name of labels) {
    try {
      const btn = page.getByRole("button", { name }).first();
      if (await btn.isVisible({ timeout: 300 })) {
        await btn.click({ timeout: 1500 });
        await page.waitForTimeout(400);
        return;
      }
    } catch {
      // No such button, or it could not be clicked: keep looking.
    }
  }
}

async function open(ctx: BrowserContext, url: string, onPage?: (page: Page) => void) {
  const page = await ctx.newPage();
  onPage?.(page);
  const started = Date.now();
  const res = await page.goto(url, { waitUntil: "load", timeout: 30000 });
  const loadMs = Date.now() - started;
  await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  await dismissCookieBanner(page);
  return { page, status: res?.status() ?? 0, loadMs };
}

const shot = (page: Page) => page.screenshot({ type: "jpeg", quality: 62, fullPage: false, timeout: 15000 });

type DesktopFacts = Pick<
  Measured,
  "imageCount" | "brokenImages" | "textLength" | "loremIpsum" | "copyrightYear" | "fonts" | "onlySystemFonts" | "legacyMarkup" | "oldSlider" | "generator" | "h1Count" | "title" | "hasTelLink" | "hasMailLink" | "hasContactLink" | "hasForm" | "ctaCount" | "hasBookingLink" | "transferKb" | "requestCount"
> & { text: string; navLinks: string[] };

function desktopFacts(): DesktopFacts {
  const text = (document.body?.innerText ?? "").replace(/\s+/g, " ").trim();
  const html = document.documentElement.outerHTML;
  const imgs = [...document.images];
  const years = [...text.matchAll(/(?:©|\(c\)|copyright)\s*(?:\d{4}\s*[-–]\s*)?((?:19|20)\d{2})/gi)].map((m) => Number(m[1]));
  const families = new Set<string>();
  for (const sel of ["body", "h1", "h2", "p", "nav a", "button"]) {
    const el = document.querySelector(sel);
    if (el) families.add((getComputedStyle(el).fontFamily.split(",")[0] ?? "").replace(/["']/g, "").trim());
  }
  const fonts = [...families].filter(Boolean);
  const SYSTEM = /^(arial|helvetica|times new roman|times|verdana|tahoma|georgia|trebuchet ms|comic sans ms|courier new|serif|sans-serif|ms sans serif|geneva)$/i;
  const legacy: string[] = [];
  if (document.querySelector("font, center, marquee")) legacy.push("<font>/<center> tags");
  if (document.querySelector("frameset, frame")) legacy.push("frames");
  if (/\.swf|shockwave-flash/i.test(html)) legacy.push("Flash");
  if (document.querySelectorAll("table").length > 6 && !document.querySelector("main, section, article, nav, header")) legacy.push("table-based layout");
  const jq = (window as unknown as { jQuery?: { fn?: { jquery?: string } } }).jQuery?.fn?.jquery;
  if (jq && /^1\./.test(jq)) legacy.push(`jQuery ${jq}`);
  const slider = ["flexslider", "nivoSlider", "bxslider", "rev_slider", "cycle-slideshow", "camera_wrap"].find((c) => html.includes(c)) ?? null;
  const links = [...document.querySelectorAll<HTMLAnchorElement>("a[href]")];
  const label = (a: Element) => `${a.textContent ?? ""} ${a.getAttribute("aria-label") ?? ""}`.toLowerCase();
  const CTA = /(reserve|reserveer|book|boek|afspraak|appointment|offerte|quote|bestel|order|bel ons|call us|contact|aanvragen|plan|inschrijven|devis|réserver|commander)/i;
  const BOOK = /(reserve|reserveer|book|boek|afspraak|appointment|réserver|rendez-vous)/i;
  const visible = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const buttons = [...document.querySelectorAll("a, button")].filter(visible);
  const nav = [...document.querySelectorAll<HTMLAnchorElement>("nav a[href], header a[href]")]
    .map((a) => a.href)
    .filter((h) => {
      try {
        const u = new URL(h);
        return u.origin === location.origin && u.pathname !== location.pathname && !/\.(pdf|jpg|png|zip)$/i.test(u.pathname);
      } catch {
        return false;
      }
    });
  const res = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
  const transfer = res.reduce((s, r) => s + (r.transferSize || 0), 0);
  return {
    text: text.slice(0, 6000),
    navLinks: [...new Set(nav.map((h) => h.split("#")[0]))].slice(0, 6),
    imageCount: imgs.length,
    brokenImages: imgs.filter((i) => i.complete && i.naturalWidth === 0 && Boolean(i.currentSrc || i.src)).length,
    textLength: text.length,
    loremIpsum: /lorem ipsum|dolor sit amet/i.test(text),
    copyrightYear: years.length ? Math.max(...years) : null,
    fonts,
    onlySystemFonts: fonts.length > 0 && fonts.every((f) => SYSTEM.test(f)),
    legacyMarkup: legacy,
    oldSlider: slider,
    generator: document.querySelector('meta[name="generator"]')?.getAttribute("content")?.slice(0, 60) ?? null,
    h1Count: document.querySelectorAll("h1").length,
    title: document.title ? document.title.slice(0, 140) : null,
    hasTelLink: links.some((a) => a.href.startsWith("tel:")),
    hasMailLink: links.some((a) => a.href.startsWith("mailto:")),
    hasContactLink: links.some((a) => /contact|kontakt/i.test(a.getAttribute("href") ?? "") || /contact/i.test(label(a))),
    hasForm: [...document.forms].some((f) => f.querySelector("textarea, input[type=email], input[type=tel]")),
    ctaCount: buttons.filter((b) => CTA.test(label(b))).length,
    hasBookingLink: buttons.some((b) => BOOK.test(label(b))),
    transferKb: transfer ? Math.round(transfer / 1024) : null,
    requestCount: res.length,
  };
}

type MobileFacts = Pick<Measured, "hasViewportMeta" | "mobileOverflowPx" | "smallTextRatio" | "smallTapTargetRatio" | "overflowingElements">;

function mobileFacts(): MobileFacts {
  const vw = window.innerWidth;
  const doc = document.documentElement;
  const visible = (el: Element) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none";
  };
  let chars = 0;
  let small = 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n = 0;
  while (walker.nextNode() && n < 4000) {
    n++;
    const node = walker.currentNode;
    const len = (node.textContent ?? "").trim().length;
    const el = node.parentElement;
    if (!len || !el || !visible(el)) continue;
    chars += len;
    if (parseFloat(getComputedStyle(el).fontSize) < 12) small += len;
  }
  const taps = [...document.querySelectorAll("a[href], button")].filter(visible).slice(0, 300);
  const tiny = taps.filter((t) => {
    const r = t.getBoundingClientRect();
    return r.width < 32 && r.height < 32;
  }).length;
  const wide = [...document.querySelectorAll("img, table, iframe, video, pre")].filter((el) => visible(el) && el.getBoundingClientRect().right > vw + 8 && el.getBoundingClientRect().left < vw).length;
  return {
    hasViewportMeta: /width\s*=\s*device-width/i.test(document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? ""),
    mobileOverflowPx: Math.max(0, Math.max(doc.scrollWidth, document.body?.scrollWidth ?? 0) - vw),
    smallTextRatio: chars ? small / chars : 0,
    smallTapTargetRatio: taps.length ? tiny / taps.length : 0,
    overflowingElements: wide,
  };
}

/** Taps the mobile menu button (when there is one) and reports whether anything opened. */
async function testMenuToggle(page: Page): Promise<Measured["menuToggle"]> {
  try {
    const toggle = page.locator('button[aria-label*="menu" i], [aria-controls][aria-expanded], .navbar-toggler, .hamburger, [class*="burger"], [class*="menu-toggle"], [class*="nav-toggle"], [class*="mobile-menu-button"]').first();
    if (!(await toggle.isVisible({ timeout: 500 }))) return "none";
    const countLinks = () => page.evaluate(() => [...document.querySelectorAll("a[href]")].filter((a) => { const r = a.getBoundingClientRect(); const cs = getComputedStyle(a); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0; }).length);
    const before = await countLinks();
    await toggle.click({ timeout: 2000 });
    await page.waitForTimeout(700);
    const after = await countLinks();
    const expanded = await toggle.getAttribute("aria-expanded").catch(() => null);
    // Close it again so the screenshot shows the page, not the menu.
    if (after > before || expanded === "true") {
      await toggle.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(400);
      return "works";
    }
    return "no_effect";
  } catch {
    return "none";
  }
}

async function checkNavLinks(links: string[]): Promise<string[]> {
  if (ALLOW_LOCAL) return [];
  const results = await Promise.allSettled(links.map((l) => safeFetch(l, { timeoutMs: 8000, maxBytes: 20_000 })));
  // Only a clear "page not found / server error" counts; timeouts and blocked bots do not.
  return links.filter((_, i) => {
    const r = results[i];
    return r.status === "fulfilled" && (r.value.status === 404 || r.value.status === 410 || r.value.status >= 500);
  });
}

export async function inspectSite(rawUrl: string): Promise<SiteInspection> {
  const started = Date.now();
  const withScheme = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const url = ALLOW_LOCAL ? withScheme : validateUrl(withScheme).toString();
  const b = await browser();
  const counters = { failed: 0 };
  let consoleErrors = 0;
  const desktop = await b.newContext({ viewport: DESKTOP, locale: "nl-NL" });
  const mobile = await b.newContext({ viewport: MOBILE, userAgent: MOBILE_UA, isMobile: true, hasTouch: true, deviceScaleFactor: 1, locale: "nl-NL" });
  try {
    await guard(desktop, counters);
    await guard(mobile, { failed: 0 });

    const d = await open(desktop, url, (page) => {
      page.on("pageerror", () => consoleErrors++);
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors++;
      });
    });
    const desktopTop = await shot(d.page);
    const facts = await d.page.evaluate(desktopFacts);
    await d.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await d.page.waitForTimeout(600);
    const desktopBottom = await shot(d.page);
    const finalUrl = d.page.url();

    const m = await open(mobile, url);
    const mobileTop = await shot(m.page);
    const mFacts = await m.page.evaluate(mobileFacts);
    const menuToggle = await testMenuToggle(m.page);
    await m.page.evaluate(() => window.scrollTo(0, Math.min(window.innerHeight * 1.6, document.documentElement.scrollHeight)));
    await m.page.waitForTimeout(600);
    const mobileMid = await shot(m.page);

    const brokenNavLinks = await checkNavLinks(facts.navLinks);
    const { text, navLinks, ...rest } = facts;
    return {
      measured: {
        ...rest,
        ...mFacts,
        menuToggle,
        finalUrl,
        https: finalUrl.startsWith("https://"),
        status: d.status,
        loadMs: d.loadMs,
        mobileLoadMs: m.loadMs,
        consoleErrors,
        failedRequests: counters.failed,
        currentYear: new Date().getFullYear(),
        navLinksChecked: navLinks.length,
        brokenNavLinks,
      },
      shots: { desktopTop, desktopBottom, mobileTop, mobileMid },
      text,
      durationMs: Date.now() - started,
    };
  } finally {
    await desktop.close().catch(() => {});
    await mobile.close().catch(() => {});
  }
}
