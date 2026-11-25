import "../guard";
import { safeFetch } from "../net/safe-fetch";

export type WebsiteAudit = {
  url: string;
  finalUrl: string;
  status: number;
  https: boolean;
  responseMs: number;
  bytes: number;
  title: string | null;
  metaDescription: string | null;
  hasViewport: boolean;
  h1Count: number;
  imagesWithoutAlt: number;
  imageCount: number;
  hasContactForm: boolean;
  hasContactPage: boolean;
  contactPageUrl: string | null;
  hasStructuredData: boolean;
  hasOpenGraph: boolean;
  copyrightYear: number | null;
  generator: string | null;
  outdatedSignals: string[];
  seoIssues: string[];
  emails: string[];
  phones: string[];
  qualityScore: number;
  flags: { outdated: boolean; poorMobile: boolean; missingContactForm: boolean; poorSeo: boolean };
  auditedAt: string;
};

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}/gi;

function textOf(html: string, re: RegExp) {
  const m = html.match(re);
  return m?.[1]?.replace(/\s+/g, " ").trim().slice(0, 300) || null;
}

/** Extracts publicly listed emails from HTML (mailto links and visible text). Filters assets. */
export function extractEmails(rawHtml: string): string[] {
  // Many sites write their address with character codes (&#105;&#110;&#102;&#111;&#64;…) to slow down scrapers.
  const html = rawHtml.replace(/&#(x[0-9a-f]+|\d+);/gi, (m, code: string) => {
    const n = code[0] === "x" || code[0] === "X" ? parseInt(code.slice(1), 16) : parseInt(code, 10);
    return n > 31 && n < 127 ? String.fromCharCode(n) : m;
  });
  const found = new Set<string>();
  for (const m of html.matchAll(/mailto:([^"'?>\s]+)/gi)) found.add(decodeURIComponent(m[1]).toLowerCase());
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ");
  for (const m of text.matchAll(EMAIL_RE)) found.add(m[0].toLowerCase());
  return [...found].filter(
    (e) => /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}$/.test(e) && !/\.(png|jpe?g|gif|svg|webp|css|js)$/i.test(e) && !/(example\.(com|org)|sentry|wixpress|godaddy|domain\.com|yourdomain)/i.test(e) && e.length < 120,
  );
}

export function extractPhones(html: string): string[] {
  const out = new Set<string>();
  for (const m of html.matchAll(/tel:([+\d\s()-]{8,20})/gi)) out.add(m[1].replace(/[^\d+]/g, ""));
  return [...out].slice(0, 5);
}

/** Pure HTML analysis — separated from fetching so it can be unit-tested. */
export function analyseHtml(html: string, meta: { url: string; finalUrl: string; status: number; responseMs: number; bytes: number }): WebsiteAudit {
  const lower = html.toLowerCase();
  const title = textOf(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription = textOf(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ??
    textOf(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*width=device-width/i.test(html);
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const imgs = html.match(/<img\b[^>]*>/gi) ?? [];
  const imagesWithoutAlt = imgs.filter((t) => !/\balt=["'][^"']+["']/i.test(t)).length;
  const forms = html.match(/<form[\s\S]*?<\/form>/gi) ?? [];
  const hasContactForm = forms.some((f) => /type=["']email["']|<textarea|name=["'][^"']*(email|bericht|message)/i.test(f));
  const contactLink = html.match(/<a[^>]+href=["']([^"'#]*(contact|contacteer|kontakt|reserveren|afspraak)[^"']*)["']/i);
  let contactPageUrl: string | null = null;
  if (contactLink) {
    try {
      contactPageUrl = new URL(contactLink[1], meta.finalUrl).toString();
    } catch {
      contactPageUrl = null;
    }
  }
  const years = [...html.matchAll(/(?:©|&copy;|copyright)\s*(?:\d{4}\s*[-–]\s*)?(\d{4})/gi)].map((m) => Number(m[1]));
  const copyrightYear = years.length ? Math.max(...years) : null;
  const generator = textOf(html, /<meta[^>]+name=["']generator["'][^>]+content=["']([^"']*)["']/i);
  const now = new Date().getFullYear();

  const outdatedSignals: string[] = [];
  if (copyrightYear && copyrightYear < now - 2) outdatedSignals.push(`copyright ${copyrightYear}`);
  if (/jquery[.-]?1\.\d/i.test(html)) outdatedSignals.push("jQuery 1.x");
  if (/<font[\s>]|<center>|<marquee/i.test(html)) outdatedSignals.push("legacy HTML tags");
  if (/\.swf|shockwave-flash/i.test(lower)) outdatedSignals.push("Flash content");
  if ((html.match(/<table/gi) ?? []).length > 6 && !/<(main|section|article|nav)[\s>]/i.test(html)) outdatedSignals.push("table-based layout");
  if (/wordpress [1-4]\./i.test(generator ?? "")) outdatedSignals.push(`old ${generator}`);
  if (!meta.finalUrl.startsWith("https://")) outdatedSignals.push("no HTTPS");
  if (/frameset|<frame\s/i.test(html)) outdatedSignals.push("frames");

  const seoIssues: string[] = [];
  if (!title) seoIssues.push("missing title");
  else if (title.length < 10 || title.length > 70) seoIssues.push("title length");
  if (!metaDescription) seoIssues.push("missing meta description");
  if (h1Count === 0) seoIssues.push("no H1");
  if (h1Count > 1) seoIssues.push("multiple H1s");
  if (imgs.length && imagesWithoutAlt / imgs.length > 0.5) seoIssues.push("images without alt text");
  const hasStructuredData = /application\/ld\+json/i.test(html);
  const hasOpenGraph = /property=["']og:/i.test(html);
  if (!hasStructuredData) seoIssues.push("no structured data");

  const flags = {
    outdated: outdatedSignals.length >= 2 || outdatedSignals.some((s) => /Flash|frames|legacy/.test(s)),
    poorMobile: !hasViewport,
    missingContactForm: !hasContactForm,
    poorSeo: seoIssues.length >= 2,
  };

  let q = 100;
  q -= Math.min(30, outdatedSignals.length * 10);
  q -= hasViewport ? 0 : 25;
  q -= hasContactForm ? 0 : 10;
  q -= Math.min(20, seoIssues.length * 4);
  q -= meta.responseMs > 4000 ? 10 : meta.responseMs > 2000 ? 5 : 0;
  q -= meta.finalUrl.startsWith("https://") ? 0 : 5;

  return {
    url: meta.url,
    finalUrl: meta.finalUrl,
    status: meta.status,
    https: meta.finalUrl.startsWith("https://"),
    responseMs: meta.responseMs,
    bytes: meta.bytes,
    title,
    metaDescription,
    hasViewport,
    h1Count,
    imagesWithoutAlt,
    imageCount: imgs.length,
    hasContactForm,
    hasContactPage: Boolean(contactPageUrl),
    contactPageUrl,
    hasStructuredData,
    hasOpenGraph,
    copyrightYear,
    generator,
    outdatedSignals,
    seoIssues,
    emails: extractEmails(html),
    phones: extractPhones(html),
    qualityScore: Math.max(0, Math.min(100, q)),
    flags,
    auditedAt: new Date().toISOString(),
  };
}

export async function auditWebsite(url: string): Promise<{ ok: true; audit: WebsiteAudit; html: string } | { ok: false; error: string }> {
  const normalised = url.startsWith("http") ? url : `https://${url}`;
  try {
    const res = await safeFetch(normalised, { timeoutMs: 15000, maxBytes: 2_000_000 });
    if (res.status >= 400) return { ok: false, error: `HTTP ${res.status}` };
    const audit = analyseHtml(res.body, { url: normalised, finalUrl: res.url, status: res.status, responseMs: res.timingMs, bytes: res.bytes });
    return { ok: true, audit, html: res.body };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/** Mock audit used only in development mock mode. Deterministic per URL. */
export function mockAudit(url: string, seed: number): WebsiteAudit {
  const outdated = seed % 3 !== 0;
  const html = `<html><head><title>${outdated ? "Home" : "Welcome to our business in the city centre"}</title>${seed % 2 ? "" : '<meta name="viewport" content="width=device-width">'}</head><body>${outdated ? "<center><font>© 2016</font></center><table></table>" : "<main><h1>Welcome</h1></main>"}</body></html>`;
  return analyseHtml(html, { url, finalUrl: url, status: 200, responseMs: 600 + (seed % 5) * 700, bytes: html.length });
}
