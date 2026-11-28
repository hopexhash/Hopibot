import { describe, expect, it } from "vitest";
import { counterpart } from "@/lib/site/i18n";
import { DEFAULT_CATALOG, eur } from "@/lib/catalog";
import { ARTICLES } from "@/lib/site/blog";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { articleLd, breadcrumbLd, faqLd, organizationLd, plain, serviceLd } from "@/lib/site/seo";
import { informal } from "@/lib/site/text";
import { HOME, HOME_FAQ, PROCESS, SERVICES } from "@/lib/site/home";
import { PROJECTS, projectPath, selectedProjects } from "@/lib/site/projects";
import { WORK, workByKey } from "@/lib/site/work";
import { existsSync, readFileSync } from "node:fs";
import { ALL_DEMOS, DEMOS } from "@/demos/catalog";
import { IMAGES } from "@/demos/images";
import sitemap from "@/app/sitemap";

const VARS = { starter: eur(29900), business: eur(49900), premium: eur(79900), from: eur(29900), hosting: eur(4900), care: eur(7900), growth: eur(14900), vat: "21%" };
const STATIC = ["/", "/werk", "/prijzen", "/blog", "/privacy", "/cookies", "/algemene-voorwaarden", "/over-ons", "/contact"];
const PATHS = new Set([...STATIC, ...ALL_LANDINGS.map((l) => l.path), ...ARTICLES.map((a) => `/blog/${a.slug}`), ...PROJECTS.map((p) => projectPath(p.key))]);
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
    // A landing page may name a demo that is still being built; it then shows no example yet.
    const workKeys = new Set(ALL_DEMOS.map((d) => d.slug as string));
    for (const l of ALL_LANDINGS) {
      for (const k of l.addons ?? []) expect(addonKeys.has(k), `${l.path}: add-on ${k}`).toBe(true);
      if (l.work) expect(workKeys.has(l.work), `${l.path}: demo ${l.work}`).toBe(true);
    }
    // Every demo is labelled as a demo and points at an industry page that exists.
    for (const w of WORK) {
      expect(w.demo).toBe(true);
      if (w.industry) expect(PATHS.has(`/website-laten-maken/${w.industry}`), w.key).toBe(true);
    }
  });

  it("shows only concept work whose files exist, and says that it is concept work", () => {
    expect(selectedProjects()).toHaveLength(6);
    expect(PROJECTS).toHaveLength(DEMOS.length);
    expect(DEMOS.length).toBeGreaterThanOrEqual(7);
    for (const p of PROJECTS) {
      const w = workByKey(p.key);
      expect(w?.demo, p.key).toBe(true);
      expect(p.concept).toBe(true);
      expect(p.idea.length, p.key).toBeGreaterThan(80);
      expect(p.sections.length, p.key).toBeGreaterThanOrEqual(6);
      for (const f of ["d-1440", "d-720", "m-780", "m-390", "tall-960", "scroll-720", "mtall-390"]) expect(existsSync(`public/site/work/${p.key}-${f}.webp`), `${p.key}-${f}`).toBe(true);
    }
    expect(new Set(PROJECTS.map((p) => p.key)).size).toBe(PROJECTS.length);
    expect(HOME.work.note).toMatch(/fictieve bedrijven/);
    expect(HOME.work.note).toMatch(/geen klantprojecten/);
  });

  it("builds every demo website as a real page that says it is a demo and sends nothing", () => {
    for (const d of DEMOS) {
      const dir = `src/app/(demos)/demos/${d.slug}`;
      for (const f of ["page.tsx", "ui.tsx", "style.css"]) expect(existsSync(`${dir}/${f}`), `${d.slug}/${f}`).toBe(true);
      const page = readFileSync(`${dir}/page.tsx`, "utf8");
      const source = page + readFileSync(`${dir}/ui.tsx`, "utf8");
      // It is wrapped in the shell that adds the HOPI bar, and its own footer says what it is.
      expect(page, d.slug).toContain(`<DemoShell slug="${d.slug}"`);
      expect(page, d.slug).toContain(`demoMeta("${d.slug}")`);
      expect(source, d.slug).toMatch(/Demo-ontwerp van HOPI/);
      expect(source, d.slug).toMatch(/fictie[fv]/);
      // No form posts, no requests, no third-party embeds: forms go through DemoForm only.
      expect(source, d.slug).not.toMatch(/<form[\s>]|fetch\(|<iframe|XMLHttpRequest|https?:\/\/(?!www\.w3\.org)/);
      // Example contact details can never reach a real person.
      for (const mail of source.match(/[\w.+-]+@[\w-]+\.[\w.]+/g) ?? []) expect(mail, d.slug).toMatch(/\.example$/);
    }
    // Every photo the demos refer to exists in both sizes.
    for (const [slug, images] of Object.entries(IMAGES)) for (const name of Object.keys(images)) for (const size of ["l", "s"]) expect(existsSync(`public/demos/${slug}/${name}-${size}.webp`), `${slug}/${name}-${size}`).toBe(true);
  });

  it("builds the homepage from pages and prices that exist", () => {
    expect(SERVICES).toHaveLength(5);
    expect(PROCESS).toHaveLength(4);
    for (const s of SERVICES) expect(PATHS.has(s.href) || s.href === "/#contact", s.href).toBe(true);
    // No amounts in the copy: prices come from Settings through placeholders.
    const copy = JSON.stringify([HOME, SERVICES, PROCESS, HOME_FAQ]);
    expect(copy).not.toMatch(/€\s?\d/);
    const texts = [...HOME_FAQ.map((f) => f.a), ...HOME.why.items.map((i) => i.text)];
    for (const t of texts) for (const href of linksIn(t)) expect(PATHS.has(href), href).toBe(true);
    // The Dutch H1 says what HOPI is.
    expect(HOME.h1).toMatch(/[Ww]ebdesign bureau/);
  });

  it("lists exactly the indexable pages in the sitemap", async () => {
    const urls = (await sitemap()).map((e) => new URL(e.url).pathname || "/");
    expect(new Set(urls).size).toBe(urls.length);
    // Every Dutch page, plus its English counterpart under /en.
    expect(new Set(urls)).toEqual(new Set([...PATHS].flatMap((p) => [p, counterpart(p, "en")])));
    expect(urls.filter((u) => u === "/en" || u.startsWith("/en/"))).toHaveLength(PATHS.size);
    expect(urls.some((u) => /^\/(command|login|api|p|d|u)(\/|$)/.test(u))).toBe(false);
  });
});

describe("public website: structured data", () => {
  it("publishes only company facts that are filled in, and never ratings or reviews", () => {
    const bare = organizationLd({ name: "HOPI", email: "", phone: "", address: "", kvk: "", googleBusinessUrl: "", fromCents: 29900 });
    // No public business address: an Organization, not a LocalBusiness.
    expect(bare["@type"]).toBe("Organization");
    for (const k of ["email", "telephone", "address", "identifier", "sameAs", "contactPoint", "aggregateRating", "review", "priceRange"]) expect(bare).not.toHaveProperty(k);
    const full = organizationLd({ name: "HOPI", email: "a@b.nl", phone: "+31 6 1", address: "Straat 1", kvk: "123", googleBusinessUrl: "https://g.page/x", fromCents: null });
    expect(full).toMatchObject({ email: "a@b.nl", telephone: "+31 6 1", address: "Straat 1", sameAs: ["https://g.page/x"], contactPoint: { email: "a@b.nl" } });
  });

  it("builds breadcrumbs, services, FAQs and articles in the expected shape", () => {
    const graph = breadcrumbLd([{ name: "Website laten maken", path: "/website-laten-maken" }])["@graph"];
    const page = graph[0] as { "@type": string; "@id": string; isPartOf: { "@id": string }; breadcrumb: { "@id": string } };
    const trail = graph[1] as { "@id": string; itemListElement: { position: number; name: string }[] };
    expect(page["@type"]).toBe("WebPage");
    expect(page["@id"]).toMatch(/\/website-laten-maken#webpage$/);
    expect(page.isPartOf["@id"]).toMatch(/#website$/);
    expect(page.breadcrumb["@id"]).toBe(trail["@id"]);
    expect(trail.itemListElement.map((i) => i.position)).toEqual([1, 2]);
    expect(trail.itemListElement[0].name).toBe("Home");
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

describe("website enquiry: the email with the design", () => {
  /** What a reader sees: no styles, no Outlook comments, no tags. */
  const visible = (html: string) => html.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;|&middot;/g, " ");
  const ctx = (lang: "nl" | "en", over: Record<string, string> = {}) => ({
    lang,
    siteUrl: "https://wearehopi.nl",
    company: { name: "HOPI", address: "Straat 1, 1000 AA Amsterdam", kvk: "12345678", website: "wearehopi.nl", email: "hallo@example.test", phone: "", ...over },
    senderName: "Umut",
    replyTo: "hallo@example.test",
    fromPrice: "€ 299",
    vat: "21%",
  });

  it("writes a fixed, personal text with the preview link, in je-form", async () => {
    const { designReadyEmail } = await import("@/lib/email/templates");
    const e = designReadyEmail({ ctx: ctx("nl"), contactName: "Sanne de Boer", company: "Bakkerij De Boer", previewUrl: "https://example.test/d/bakkerij-de-boer", unsubscribeUrl: "https://x.test/u/t" });
    expect(e.subject).toBe("Je websiteconcept voor Bakkerij De Boer is klaar");
    expect(e.text.startsWith("Hoi Sanne,")).toBe(true);
    expect(e.text).toMatch(/Je zit nergens aan vast/);
    expect(e.text).toMatch(/Groet,\nUmut/);
    expect(e.text).toMatch(/€ 299 eenmalig, exclusief 21% btw/);
    // Formal "u/uw" never appears in the Dutch copy (links stripped first).
    const words = (x: string) => visible(x).replace(/https?:\/\/\S+/g, "");
    expect(words(e.text)).not.toMatch(/\b(u|uw)\b/i);
    expect(words(e.html)).not.toMatch(/\b(u|uw)\b/i);
    // No name given: still a normal greeting.
    const anon = designReadyEmail({ ctx: ctx("nl"), contactName: null, company: "X", previewUrl: "https://x.test/d/x", unsubscribeUrl: "https://x.test/u/t" });
    expect(anon.text.startsWith("Hoi,")).toBe(true);
  });

  it("says why they get it (they asked), in their language, never that their details were public", async () => {
    const { designReadyEmail } = await import("@/lib/email/templates");
    const nl = designReadyEmail({ ctx: ctx("nl"), contactName: "Sanne", company: "Bakkerij", previewUrl: "https://x.test/d/b", unsubscribeUrl: "https://x.test/u/t" });
    expect(nl.text).toMatch(/via onze website een gratis websiteontwerp hebt aangevraagd/);
    expect(nl.text).toMatch(/KvK 12345678/);
    expect(nl.text).toMatch(/https:\/\/x\.test\/u\/t/);
    expect(nl.text + nl.html).not.toMatch(/openbaar/);
    const en = designReadyEmail({ ctx: ctx("en"), contactName: "Sam Jones", company: "Jones Bakery", previewUrl: "https://x.test/d/j", unsubscribeUrl: "https://x.test/u/t" });
    expect(en.subject).toBe("Your website concept for Jones Bakery is ready");
    expect(en.text.startsWith("Hi Sam,")).toBe(true);
    expect(en.text).toMatch(/you requested a free website design/);
    expect(en.text + en.html).not.toMatch(/publicly listed/);
  });

  it("never shows a placeholder or an empty detail when company details are missing", async () => {
    const { designReadyEmail } = await import("@/lib/email/templates");
    const e = designReadyEmail({ ctx: ctx("nl", { address: "", kvk: "", email: "" }), contactName: "Sanne", company: "Bakkerij", previewUrl: "https://x.test/d/b", unsubscribeUrl: "https://x.test/u/t" });
    expect(visible(e.html) + e.text).not.toMatch(/\[[^\]]*\]|undefined|null|KvK\s*(·|$)/);
    expect(e.html).toMatch(/hopi-logo-ink\.png/);
    expect(e.html).toMatch(/alt="HOPI"/);
    // Every link is absolute (email clients have no base address).
    for (const m of e.html.matchAll(/(?:href|src)="([^"]+)"/g)) expect(m[1]).toMatch(/^(https:\/\/|mailto:)/);
  });

  it("only allows sending when email is really connected and the sender is known", async () => {
    const { inquirySendBlocker } = await import("@/lib/inquiry-email");
    const ok = { resendLive: true, agencyName: "HOPI", senderEmail: "hallo@example.test", agencyAddress: "Straat 1" };
    expect(inquirySendBlocker(ok)).toBeNull();
    expect(inquirySendBlocker({ ...ok, resendLive: false })).toMatch(/not connected/);
    expect(inquirySendBlocker({ ...ok, agencyAddress: "" })).toMatch(/agency address/);
    expect(inquirySendBlocker({ ...ok, senderEmail: "", agencyName: "" })).toMatch(/agency name, sender email/);
  });
});
