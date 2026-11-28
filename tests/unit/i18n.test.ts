import { describe, expect, it } from "vitest";
import { ARTICLES } from "@/lib/site/blog";
import { ARTICLES_EN } from "@/lib/site/blog.en";
import { CATALOG_EN } from "@/lib/catalog.en";
import { DEFAULT_CATALOG } from "@/lib/catalog";
import { counterpart, DUTCH_ONLY, EN_TO_NL, hasEnglish, href, localeOf, NL_TO_EN } from "@/lib/site/i18n";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { ALL_LANDINGS_EN } from "@/lib/site/landing.en";
import { HOME_EN, HOME_FAQ_EN, SERVICES_EN } from "@/lib/site/home.en";
import { informal } from "@/lib/site/text";

const enPaths = new Set(Object.values(NL_TO_EN));
const linksIn = (text: string) => [...text.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]!.split("#")[0] || "/");
const knownEn = (p: string) => enPaths.has(p) || /^\/en\/work\/[a-z0-9-]+$/.test(p) || p === "/en";

describe("English website", () => {
  it("has an English page for every Dutch landing page and article, and back", () => {
    // Except the pages that are Dutch-only on purpose, and only those.
    const landings = ALL_LANDINGS.filter((l) => !DUTCH_ONLY.has(l.path));
    const articles = ARTICLES.filter((a) => !DUTCH_ONLY.has(`/blog/${a.slug}`));
    for (const p of DUTCH_ONLY) {
      expect(NL_TO_EN[p], p).toBeUndefined();
      expect(hasEnglish(p), p).toBe(false);
      expect(ALL_LANDINGS.some((l) => l.path === p) || ARTICLES.some((a) => `/blog/${a.slug}` === p), p).toBe(true);
    }
    for (const l of landings) expect(NL_TO_EN[l.path], l.path).toBeDefined();
    for (const a of articles) expect(NL_TO_EN[`/blog/${a.slug}`], a.slug).toBeDefined();
    expect(ALL_LANDINGS_EN.map((l) => l.path).sort()).toEqual(landings.map((l) => NL_TO_EN[l.path]).sort());
    expect(ARTICLES_EN.map((a) => `/en/blog/${a.slug}`).sort()).toEqual(articles.map((a) => NL_TO_EN[`/blog/${a.slug}`]).sort());
  });

  it("maps every page to its counterpart and back", () => {
    for (const [nl, en] of Object.entries(NL_TO_EN)) {
      expect(counterpart(nl, "en")).toBe(en);
      expect(counterpart(en, "nl")).toBe(nl);
      expect(localeOf(en)).toBe("en");
      expect(localeOf(nl)).toBe("nl");
    }
    expect(Object.keys(EN_TO_NL)).toHaveLength(Object.keys(NL_TO_EN).length);
    expect(counterpart("/werk/restaurant", "en")).toBe("/en/work/restaurant");
    expect(counterpart("/en/work/restaurant", "nl")).toBe("/werk/restaurant");
    expect(counterpart("/en#contact", "nl")).toBe("/#contact");
    expect(href("/prijzen", "en")).toBe("/en/pricing");
    expect(href("/prijzen", "nl")).toBe("/prijzen");
  });

  it("links from English copy only to English pages", () => {
    const texts = [
      ...ALL_LANDINGS_EN.flatMap((l) => [l.intro, ...l.sections.flatMap((s) => [...(s.body ?? []), ...(s.items ?? []).map((i) => i.text), ...(s.list ?? [])]), ...l.faq.map((f) => f.a)]),
      ...ARTICLES_EN.map((a) => a.body),
      ...HOME_FAQ_EN.map((f) => f.a),
      ...HOME_EN.why.items.map((i) => i.text),
    ];
    for (const t of texts) for (const p of linksIn(t)) expect(knownEn(p), `${p} in "${t.slice(0, 60)}"`).toBe(true);
    for (const l of ALL_LANDINGS_EN) for (const r of l.related) expect(knownEn(r), r).toBe(true);
    for (const a of ARTICLES_EN) for (const r of a.related) expect(knownEn(r), r).toBe(true);
    for (const s of SERVICES_EN) expect(knownEn(s.href.split("#")[0] || "/en"), s.href).toBe(true);
  });

  it("never mentions AI (owner's decision) in the English content", () => {
    const all = JSON.stringify([ALL_LANDINGS_EN, ARTICLES_EN, HOME_EN, HOME_FAQ_EN, SERVICES_EN]);
    expect(all).not.toMatch(/\bAI\b|artificial intelligence/i);
  });

  it("translates every visitor-facing text of the default price catalogue", () => {
    const texts = [
      ...DEFAULT_CATALOG.packages.flatMap((p) => [p.description, ...p.features]),
      ...DEFAULT_CATALOG.plans.flatMap((p) => [p.description, ...p.features]),
      ...DEFAULT_CATALOG.addons.map((a) => a.description),
    ];
    // Words that are the same in English ("Hosting") need no entry.
    const same = new Set(["Hosting"]);
    for (const t of texts.filter((x) => !same.has(x))) expect(CATALOG_EN[informal(t)], informal(t)).toBeDefined();
  });
});
