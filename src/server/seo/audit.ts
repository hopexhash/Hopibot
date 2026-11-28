import "../guard";

/**
 * Site audit for the SEO control center. It reads the public website the way a search engine
 * does: the sitemap first, then the HTML of every page as the server sends it (no JavaScript),
 * then every internal link it found. The result is an internal diagnosis with a score that
 * weighs the problems found. It is NOT a Google ranking or a Google score.
 */

export type Severity = "error" | "warning" | "notice";
export type AuditIssue = { code: string; severity: Severity; message: string; path?: string };

export type PageReport = {
  path: string;
  status: number;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  h1: number;
  words: number;
  schema: string[];
  inbound: number;
  issues: AuditIssue[];
};

export type AuditReport = {
  at: string;
  origin: string;
  durationMs: number;
  /** 0–100, internal diagnostic only. */
  score: number;
  counts: Record<Severity, number>;
  pages: PageReport[];
  /** Internal links that do not lead to a working page, with where they were found. */
  brokenLinks: { href: string; status: number; from: string[] }[];
  redirects: { href: string; location: string; from: string[] }[];
  siteIssues: AuditIssue[];
};

const WEIGHT: Record<Severity, number> = { error: 6, warning: 2, notice: 0.5 };
/** Pages that are short by nature: no "thin content" notice for them. */
const SHORT_OK = /^\/(?:en\/)?(contact|privacy|cookies|algemene-voorwaarden|terms|blog|werk|work)$/;
/** Legal pages are linked from every footer by design; they need no links from content. */
const LEGAL = /^\/(privacy|cookies|algemene-voorwaarden)$/;

const attr = (tag: string, name: string) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

/** Everything the audit needs from one HTML document. Pure: unit-tested with sample HTML. */
export function parsePage(html: string) {
  const metas = [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => m[0]);
  const meta = (key: string) => {
    const tag = metas.find((t) => attr(t, "name") === key || attr(t, "property") === key);
    return tag ? decode(attr(tag, "content") ?? "") : "";
  };
  const body = html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ");
  const headings = [...body.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let skips = 0;
  for (let i = 1; i < headings.length; i++) if (headings[i] > headings[i - 1] + 1) skips++;
  const schema: string[] = [];
  let schemaErrors = 0;
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      const nodes = (Array.isArray(j) ? j : j["@graph"] ?? [j]) as Record<string, unknown>[];
      for (const n of nodes) {
        const t = n["@type"];
        if (!t) schemaErrors++;
        else schema.push(...([] as string[]).concat(t as string));
        if (t === "BlogPosting" && (!n.headline || !n.datePublished)) schemaErrors++;
        if (t === "FAQPage" && !(Array.isArray(n.mainEntity) && n.mainEntity.length)) schemaErrors++;
        if (t === "BreadcrumbList" && !(Array.isArray(n.itemListElement) && n.itemListElement.length)) schemaErrors++;
      }
    } catch {
      schemaErrors++;
    }
  }
  const imgs = [...body.matchAll(/<img\s[^>]*>/g)].map((m) => m[0]);
  const linksIn = (html: string) => [...html.matchAll(/<a\s[^>]*href="([^"]*)"/g)].map((m) => decode(m[1]));
  // Links in the page's own content (inside <main>): menus and the footer link everything everywhere,
  // so only these say whether a page is really connected to the rest of the site.
  const main = body.match(/<main[\s>][\s\S]*<\/main>/)?.[0] ?? body;
  return {
    title: decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").trim(),
    description: meta("description"),
    robots: meta("robots"),
    canonical: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? "",
    ogTitle: meta("og:title"),
    ogImage: meta("og:image"),
    lang: html.match(/<html[^>]*\slang="([^"]+)"/)?.[1] ?? "",
    h1: headings.filter((h) => h === 1).length,
    skips,
    schema,
    schemaErrors,
    images: imgs.length,
    imagesNoAlt: imgs.filter((i) => attr(i, "alt") === undefined).length,
    imagesNoSize: imgs.filter((i) => !attr(i, "width") || !attr(i, "height")).length,
    links: linksIn(body),
    contentLinks: linksIn(main),
    words: body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean).length,
  };
}

/** The checks for one page. Pure. */
export function checkPage(path: string, url: string, status: number, xRobots: string, p: ReturnType<typeof parsePage> | null): AuditIssue[] {
  const out: AuditIssue[] = [];
  const add = (severity: Severity, code: string, message: string) => out.push({ severity, code, message, path });
  if (status !== 200 || !p) {
    add("error", "status", `Answers with HTTP ${status} instead of 200, but is in the sitemap.`);
    return out;
  }
  if (/noindex/i.test(p.robots) || /noindex/i.test(xRobots)) add("error", "noindex", "Is in the sitemap but tells search engines not to index it.");
  if (!p.title) add("error", "title_missing", "Has no title.");
  else if (p.title.length > 60) add("warning", "title_long", `Title is ${p.title.length} characters; Google usually shows about 60.`);
  else if (p.title.length < 25) add("notice", "title_short", `Title is only ${p.title.length} characters.`);
  if (!p.description) add("error", "description_missing", "Has no meta description.");
  else if (p.description.length > 160) add("warning", "description_long", `Description is ${p.description.length} characters; Google usually shows about 155.`);
  else if (p.description.length < 70) add("notice", "description_short", `Description is only ${p.description.length} characters.`);
  if (!p.canonical) add("error", "canonical_missing", "Has no canonical URL.");
  else if (p.canonical !== url) add("warning", "canonical_other", `Canonical points elsewhere: ${p.canonical}`);
  if (p.h1 === 0) add("error", "h1_missing", "Has no H1 heading.");
  else if (p.h1 > 1) add("warning", "h1_multiple", `Has ${p.h1} H1 headings.`);
  if (p.skips) add("notice", "heading_skip", `Skips a heading level ${p.skips}×.`);
  if (p.schemaErrors) add("error", "schema_invalid", `${p.schemaErrors} structured-data block(s) are invalid or incomplete.`);
  if (!p.schema.length) add("warning", "schema_missing", "Has no structured data.");
  if (!p.ogImage || !p.ogTitle) add("notice", "social_missing", "Misses an Open Graph title or image (link previews).");
  if (p.lang !== "nl") add("warning", "lang", `Declares language "${p.lang || "none"}" instead of nl.`);
  if (p.imagesNoAlt) add("warning", "img_alt", `${p.imagesNoAlt} image(s) without an alt attribute.`);
  if (p.imagesNoSize) add("notice", "img_size", `${p.imagesNoSize} image(s) without width and height (can shift the layout while loading).`);
  if (p.words < 300 && !SHORT_OK.test(path) && path !== "/" && path !== "/en") add("notice", "thin", `Only about ${p.words} words of text.`);
  return out;
}

export function scoreOf(issues: AuditIssue[], pages: number) {
  const penalty = issues.reduce((s, i) => s + WEIGHT[i.severity], 0);
  // Normalised per page so a bigger site is not punished for having more pages.
  return Math.max(0, Math.round(100 - (penalty / Math.max(1, pages)) * 10));
}

async function get(url: string, timeoutMs = 20000) {
  const res = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(timeoutMs), headers: { "user-agent": "HOPI-SEO-Audit/1.0 (+site self-check)" } });
  return { status: res.status, location: res.headers.get("location") ?? "", xRobots: res.headers.get("x-robots-tag") ?? "", text: res.status === 200 ? await res.text() : "" };
}

/** Runs `fn` over `items` with at most `n` at a time. */
async function pool<T, R>(items: T[], n: number, fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(n, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

/** Crawls the public website at `origin` (e.g. https://wearehopi.nl) and builds the report. */
export async function runAudit(origin: string): Promise<AuditReport> {
  const started = Date.now();
  const base = origin.replace(/\/+$/, "");
  const siteIssues: AuditIssue[] = [];
  const sm = await get(`${base}/sitemap.xml`);
  if (sm.status !== 200) siteIssues.push({ severity: "error", code: "sitemap", message: `sitemap.xml answers with HTTP ${sm.status}.` });
  const urls = [...sm.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const foreign = urls.filter((u) => !u.startsWith(base));
  if (foreign.length) siteIssues.push({ severity: "error", code: "sitemap_host", message: `${foreign.length} sitemap URL(s) are not on ${base} (first: ${foreign[0]}). Check APP_URL.` });
  const rb = await get(`${base}/robots.txt`);
  if (rb.status !== 200) siteIssues.push({ severity: "error", code: "robots", message: `robots.txt answers with HTTP ${rb.status}.` });
  else {
    if (/^\s*disallow:\s*\/\s*$/im.test(rb.text)) siteIssues.push({ severity: "error", code: "robots_block", message: "robots.txt blocks the whole website." });
    if (!/sitemap:/i.test(rb.text)) siteIssues.push({ severity: "warning", code: "robots_sitemap", message: "robots.txt does not mention the sitemap." });
  }

  const pathOf = (u: string) => {
    try {
      return new URL(u).pathname.replace(/\/+$/, "") || "/";
    } catch {
      return u;
    }
  };
  const inbound = new Map<string, Set<string>>();
  const linkSources = new Map<string, Set<string>>();
  const pages = await pool(urls, 6, async (url): Promise<PageReport> => {
    const path = pathOf(url);
    let status = 0;
    let parsed: ReturnType<typeof parsePage> | null = null;
    let xRobots = "";
    try {
      const r = await get(url);
      status = r.status;
      xRobots = r.xRobots;
      if (r.status === 200) parsed = parsePage(r.text);
    } catch {
      status = 0;
    }
    const targetOf = (href: string) => href.split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
    for (const href of parsed?.links ?? []) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const target = targetOf(href);
      if (!linkSources.has(target)) linkSources.set(target, new Set());
      linkSources.get(target)!.add(path);
    }
    for (const href of parsed?.contentLinks ?? []) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const target = targetOf(href);
      if (target === path) continue;
      if (!inbound.has(target)) inbound.set(target, new Set());
      inbound.get(target)!.add(path);
    }
    return {
      path,
      status,
      title: parsed?.title ?? "",
      description: parsed?.description ?? "",
      canonical: parsed?.canonical ?? "",
      robots: parsed?.robots ?? "",
      h1: parsed?.h1 ?? 0,
      words: parsed?.words ?? 0,
      schema: [...new Set(parsed?.schema ?? [])],
      inbound: 0,
      issues: checkPage(path, url, status, xRobots, parsed),
    };
  });

  // Duplicates and orphans need the whole site.
  const byTitle = new Map<string, string[]>();
  const byDesc = new Map<string, string[]>();
  for (const p of pages) {
    if (p.title) byTitle.set(p.title, [...(byTitle.get(p.title) ?? []), p.path]);
    if (p.description) byDesc.set(p.description, [...(byDesc.get(p.description) ?? []), p.path]);
  }
  for (const p of pages) {
    p.inbound = inbound.get(p.path)?.size ?? 0;
    if ((byTitle.get(p.title)?.length ?? 0) > 1) p.issues.push({ severity: "warning", code: "title_duplicate", message: `Same title as ${byTitle.get(p.title)!.filter((x) => x !== p.path).join(", ")}.`, path: p.path });
    if ((byDesc.get(p.description)?.length ?? 0) > 1) p.issues.push({ severity: "warning", code: "description_duplicate", message: `Same description as ${byDesc.get(p.description)!.filter((x) => x !== p.path).join(", ")}.`, path: p.path });
    if (LEGAL.test(p.path)) continue;
    if (p.path !== "/" && p.path !== "/en" && p.inbound === 0) p.issues.push({ severity: "warning", code: "orphan", message: "No other page links here from its content (only menus or the footer do).", path: p.path });
    else if (p.path !== "/" && p.path !== "/en" && p.inbound < 3) p.issues.push({ severity: "notice", code: "few_links", message: `Only ${p.inbound} other page(s) link here from their content.`, path: p.path });
  }

  // Every internal link that is not a page of the sitemap: does it work?
  const known = new Set(pages.map((p) => p.path));
  const others = [...linkSources.keys()].filter((t) => !known.has(t));
  const brokenLinks: AuditReport["brokenLinks"] = [];
  const redirects: AuditReport["redirects"] = [];
  await pool(others, 6, async (t) => {
    try {
      const r = await get(base + t);
      const from = [...(linkSources.get(t) ?? [])].slice(0, 5);
      if (r.status >= 400 || r.status === 0) brokenLinks.push({ href: t, status: r.status, from });
      else if (r.status >= 300) redirects.push({ href: t, location: r.location, from });
    } catch {
      brokenLinks.push({ href: t, status: 0, from: [...(linkSources.get(t) ?? [])].slice(0, 5) });
    }
  });
  for (const b of brokenLinks) siteIssues.push({ severity: "error", code: "broken_link", message: `${b.href} answers with HTTP ${b.status || "no response"} (linked from ${b.from.join(", ")}).` });
  for (const r of redirects) siteIssues.push({ severity: "notice", code: "redirect_link", message: `${r.href} redirects to ${r.location}; link to the final address instead (linked from ${r.from.join(", ")}).` });

  const all = [...siteIssues, ...pages.flatMap((p) => p.issues)];
  const counts = { error: 0, warning: 0, notice: 0 } as Record<Severity, number>;
  for (const i of all) counts[i.severity]++;
  return { at: new Date().toISOString(), origin: base, durationMs: Date.now() - started, score: scoreOf(all, pages.length), counts, pages, brokenLinks, redirects, siteIssues };
}
