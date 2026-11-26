import { describe, expect, it } from "vitest";
import { DEFAULT_CATALOG, eur } from "@/lib/catalog";
import { ARTICLES } from "@/lib/site/blog";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { articleLd, breadcrumbLd, faqLd, organizationLd, plain, serviceLd } from "@/lib/site/seo";
import { informal } from "@/lib/site/text";
import { WORK } from "@/lib/site/work";
import sitemap from "@/app/sitemap";

const VARS = { starter: eur(29900), business: eur(49900), premium: eur(79900), from: eur(29900), hosting: eur(4900), care: eur(7900), growth: eur(14900), vat: "21%" };
const STATIC = ["/", "/prijzen", "/blog", "/privacy", "/cookies", "/algemene-voorwaarden"];
const PATHS = new Set([...STATIC, ...ALL_LANDINGS.map((l) => l.path), ...ARTICLES.map((a) => `/blog/${a.slug}`)]);
const linksIn = (text: string) => [...text.matchAll(/\]\((\/[^)#]*)/g)].map((m) => m[1]);

describe("public website: SEO content", () => {
  it("gives every landing page its own keyword, title and description within search-result lengths", () => {
    const primaries = ALL_LANDINGS.map((l) => l.keywords.primary);
    expect(new Set(primaries).size).toBe(primaries.length);
    // No page targets, as a secondary keyword, the primary keyword of another page (cannibalisation).
    for (const l of ALL_LANDINGS) for (const k of l.keywords.secondary) expect(primaries.filter((p) => p === k)).toEqual([]);
    const titles = new Set<string>();
    for (const l of ALL_LANDINGS) {
      const title = plain(l.title, VARS);
      const description = plain(l.description, VARS);
      expect(title.length, l.path).toBeLessThanOrEqual(62);
      expect(description.length, l.path).toBeGreaterThanOrEqual(110);
      expect(description.length, l.path).toBeLessThanOrEqual(160);
      expect(titles.has(title), `duplicate title ${title}`).toBe(false);
      titles.add(title);
      // One emphasised phrase at most in the H1, and every page has real questions answered.
      expect(l.h1.split("*").length, l.path).toBeLessThanOrEqual(3);
      expect(l.faq.length, l.path).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps article metadata within limits and dates valid", () => {
    const slugs = new Set(ARTICLES.map((a) => a.slug));
    expect(slugs.size).toBe(ARTICLES.length);
    for (const a of ARTICLES) {
      expect(a.seoTitle.length, a.slug).toBeLessThanOrEqual(62);
      expect(a.description.length, a.slug).toBeLessThanOrEqual(160);
      expect(a.published).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.modified >= a.published).toBe(true);
      // A useful article, not a stub.
      expect(a.body.split(/\s+/).length, a.slug).toBeGreaterThan(450);
      expect(a.body.match(/^## /gm)?.length ?? 0, a.slug).toBeGreaterThanOrEqual(4);
    }
  });

  it("only links to pages that exist, and every page is linked from somewhere", () => {
    const linked = new Set<string>();
    const check = (from: string, targets: string[]) => {
      for (const t of targets) {
        expect(PATHS.has(t), `${from} links to missing page ${t}`).toBe(true);
        linked.add(t);
      }
    };
    for (const l of ALL_LANDINGS) check(l.path, [...l.related, ...linksIn(JSON.stringify(l))]);
    for (const a of ARTICLES) check(a.slug, [...a.related, ...linksIn(a.body)]);
    // Landing pages and articles must be reachable through in-content links, not only the menu.
    for (const l of ALL_LANDINGS) if (l.kind !== "industry") expect(linked.has(l.path), `${l.path} is never linked`).toBe(true);
    for (const a of ARTICLES) expect(linked.has(`/blog/${a.slug}`), `${a.slug} is never linked`).toBe(true);
  });

  it("never hardcodes an amount in copy: prices come from the catalogue", () => {
    const copy = JSON.stringify(ALL_LANDINGS) + ARTICLES.map((a) => a.body + a.description).join(" ");
    expect(copy).not.toMatch(/€\s?\d/);
    const used = new Set([...copy.matchAll(/\{(\w+)\}/g)].map((m) => m[1]));
    for (const k of used) expect(Object.keys(VARS), `unknown placeholder {${k}}`).toContain(k);
    expect(plain("Vanaf {starter}, [prijzen](/prijzen) en *nadruk*", VARS)).toBe(`Vanaf ${eur(29900)}, prijzen en nadruk`);
  });

  it("uses catalogue add-ons and portfolio demos that exist", () => {
    const addonKeys = new Set(DEFAULT_CATALOG.addons.map((a) => a.key));
    const workKeys = new Set(WORK.map((w) => w.key));
    for (const l of ALL_LANDINGS) {
      for (const k of l.addons ?? []) expect(addonKeys.has(k), `${l.path}: add-on ${k}`).toBe(true);
      if (l.work) expect(workKeys.has(l.work), `${l.path}: demo ${l.work}`).toBe(true);
    }
    // Every demo is labelled as a demo and points at an industry page that exists.
    for (const w of WORK) {
      expect(w.demo).toBe(true);
      expect(PATHS.has(`/website-laten-maken/${w.industry}`), w.key).toBe(true);
    }
  });

  it("lists exactly the indexable pages in the sitemap", () => {
    const urls = sitemap().map((e) => new URL(e.url).pathname || "/");
    expect(new Set(urls).size).toBe(urls.length);
    expect(new Set(urls)).toEqual(PATHS);
    expect(urls.some((u) => /^\/(command|login|api|p|d|u)(\/|$)/.test(u))).toBe(false);
  });
});

describe("public website: structured data", () => {
  it("publishes only company facts that are filled in, and never ratings or reviews", () => {
    const bare = organizationLd({ name: "HOPI", email: "", phone: "", address: "", kvk: "", googleBusinessUrl: "", fromCents: 29900 });
    expect(bare["@type"]).toBe("ProfessionalService");
    for (const k of ["email", "telephone", "address", "identifier", "sameAs", "aggregateRating", "review"]) expect(bare).not.toHaveProperty(k);
    expect(bare.priceRange).toBe("Vanaf €299");
    const full = organizationLd({ name: "HOPI", email: "a@b.nl", phone: "+31 6 1", address: "Straat 1", kvk: "123", googleBusinessUrl: "https://g.page/x", fromCents: null });
    expect(full).toMatchObject({ email: "a@b.nl", telephone: "+31 6 1", address: "Straat 1", sameAs: ["https://g.page/x"] });
    expect(full).not.toHaveProperty("priceRange");
  });

  it("builds breadcrumbs, services, FAQs and articles in the expected shape", () => {
    const crumbs = breadcrumbLd([{ name: "Website laten maken", path: "/website-laten-maken" }]);
    expect(crumbs.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(crumbs.itemListElement[0].name).toBe("Home");
    const svc = serviceLd({ name: "X", description: "Y", path: "/prijzen", serviceType: "website laten maken", offers: [{ name: "Starter", priceCents: 29900 }] });
    expect(svc.offers?.[0]).toMatchObject({ "@type": "Offer", price: "299.00", priceCurrency: "EUR" });
    expect(serviceLd({ name: "X", description: "Y", path: "/x", serviceType: "z" })).not.toHaveProperty("offers");
    expect(faqLd([{ q: "Vraag?", a: "Antwoord." }]).mainEntity[0]).toMatchObject({ "@type": "Question", name: "Vraag?", acceptedAnswer: { text: "Antwoord." } });
    expect(articleLd({ title: "T", description: "D", path: "/blog/t", published: "2026-11-26", modified: "2026-11-26" })).toMatchObject({ "@type": "BlogPosting", headline: "T", datePublished: "2026-11-26" });
  });

  it("turns the formal catalogue texts into the informal form used on the website", () => {
    expect(informal("Uw website online, snel en veilig.")).toBe("Je website online, snel en veilig.");
    expect(informal("Wij houden uw inhoud voor u up-to-date.")).toBe("Wij houden je inhoud voor je up-to-date.");
    expect(informal("Menu of diensten bijwerken")).toBe("Menu of diensten bijwerken");
  });
});

describe("public website: WhatsApp link", () => {
  it("builds a chat link only for a full international number", async () => {
    const { whatsappLink } = await import("@/server/site");
    expect(whatsappLink("+31 6 1234 5678")).toBe(`https://wa.me/31612345678?text=${encodeURIComponent("Hallo HOPI, ik heb een vraag over een nieuwe website.")}`);
    expect(whatsappLink("")).toBeNull();
    expect(whatsappLink("0612345678")).toBeNull();
    expect(whatsappLink("+31")).toBeNull();
  });
});
