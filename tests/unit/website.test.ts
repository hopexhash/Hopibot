import { describe, expect, it } from "vitest";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { siteSpecSchema } from "@/lib/site-spec";
import { renderSite } from "@/sites/render";
import { selectDesign } from "@/lib/design-select";
import { buildBlueprintSpec } from "@/lib/site-blueprints";
import { designForSpec, DESIGNS, variationCount } from "@/sites/designs";
import { fontFilesInHtml } from "@/sites/fonts";
import { existsSync } from "node:fs";
import { contrast } from "@/sites/theme";
import { themeVars } from "@/sites/theme";
import { autoFix } from "@/server/agents/website-builder";
import { buildMockSpec } from "@/server/website/mock-spec";
import { contentIntegrityIssues, enforceSpec } from "@/server/website/service";
import type { schema } from "@/server/db";

const biz = (over: Partial<typeof schema.businesses.$inferSelect> = {}) =>
  ({
    id: "00000000-0000-0000-0000-000000000001",
    name: "Bistro Test",
    category: "restaurant",
    city: "Rotterdam",
    address: "Kade 1, 3011 AB Rotterdam",
    phone: "+31 10 123 4567",
    openingHours: ["Monday: 10:00 – 22:00"],
    googleMapsUrl: "https://maps.google.com/?cid=1",
    ...over,
  }) as typeof schema.businesses.$inferSelect;

describe("SiteSpec templates", () => {
  it("builds a valid spec and renders every design system", () => {
    for (const c of BUSINESS_CATEGORIES) {
      const spec = buildMockSpec({ ...biz(), category: c.key });
      expect(() => siteSpecSchema.parse(spec)).not.toThrow();
      const files = renderSite(spec, { agencyName: "Agency", seedKey: c.key, assetBase: "assets/" });
      const html = files.find((f) => f.path === "index.html")!.content;
      expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
      expect(html).toContain('class="demo-bar"');
      expect(html).toContain("noindex");
      expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic/);
      expect((html.match(/<h1[\s>]/g) ?? []).length).toBe(1);
    }
  });

  it("keeps text colours readable (WCAG AA) in every theme", () => {
    for (const c of BUSINESS_CATEGORIES) {
      const spec = buildMockSpec({ ...biz(), category: c.key });
      const v = themeVars(spec.theme);
      expect(contrast(v["--accent-text"], v["--bg-alt"])).toBeGreaterThanOrEqual(4.5);
      expect(contrast(v["--muted"], v["--bg-alt"])).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("template library", () => {
  const sample = { name: "Voorbeeld", category: "local_service", city: "Rotterdam", phone: "+31 10 123 4567", address: "Kade 1", openingHours: ["Maandag: 10:00 – 18:00"], googleMapsUrl: "https://maps.google.com/?cid=1" };

  it("has at least 20 designs, each with its own identity", () => {
    expect(DESIGNS.length).toBeGreaterThanOrEqual(20);
    expect(new Set(DESIGNS.map((d) => d.key)).size).toBe(DESIGNS.length);
    // No two designs share the same combination of typeface, palette and page structure.
    const identity = DESIGNS.map((d) => `${d.fonts.display}|${d.palette.bg}|${d.palette.accent}|${d.v.hero}|${d.v.nav}`);
    expect(new Set(identity).size).toBe(DESIGNS.length);
    const required = ["luxury-restaurant", "modern-italian", "turkish-restaurant", "sushi", "burger", "pizzeria", "coffee-shop", "bakery", "street-food", "fine-dining", "asian-fusion", "food-truck", "barbershop", "hair-salon", "beauty-salon", "car-detailing", "garage", "construction", "cleaning", "landscaping"];
    for (const k of required) expect(DESIGNS.some((d) => d.key === k)).toBe(true);
  });

  it("renders every design to a valid, self-contained page with readable colours", () => {
    for (const d of DESIGNS) {
      const spec = buildBlueprintSpec(sample, d.key);
      expect(() => siteSpecSchema.parse(spec)).not.toThrow();
      const html = renderSite(spec, { agencyName: "Agency", seedKey: d.key, assetBase: "assets/" })[0].content;
      expect(html).toContain(`d-${d.key}`);
      expect(html).toContain('class="demo-bar"');
      expect((html.match(/<h1[\s>]/g) ?? []).length).toBe(1);
      expect(html).not.toMatch(/fonts\.googleapis|fonts\.gstatic|https?:\/\/[^"']*\.(js|css)/);
      // Every referenced font file is shipped with the app.
      const fonts = fontFilesInHtml(html);
      expect(fonts.length).toBeGreaterThan(0);
      for (const f of fonts) expect(existsSync(`public/site-assets/fonts/${f}`), `${d.key}: ${f}`).toBe(true);
      // Ids are unique (forms can appear twice on a page).
      const ids = [...html.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]);
      expect(new Set(ids).size, d.key).toBe(ids.length);
      const v = themeVars(spec.theme);
      expect(contrast(v["--accent-text"], v["--bg-alt"]), d.key).toBeGreaterThanOrEqual(4.5);
      expect(contrast(v["--muted"], v["--bg-alt"]), d.key).toBeGreaterThanOrEqual(4.5);
      expect(contrast(v["--text"], v["--bg"]), d.key).toBeGreaterThanOrEqual(4.5);
      expect(contrast(v["--on-accent"], v["--accent"]), d.key).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("offers several layouts per industry and renders each one", () => {
    const industry = DESIGNS.filter((d) => d.group !== "general");
    for (const d of industry) {
      expect(variationCount(d), d.key).toBeGreaterThanOrEqual(3);
      const heroes = new Set<string>();
      for (let v = 0; v < variationCount(d); v++) {
        const spec = buildBlueprintSpec(sample, d.key, v);
        heroes.add(designForSpec(spec.theme).v.hero);
        const html = renderSite(spec, { agencyName: "Agency", seedKey: d.key, assetBase: "assets/" })[0].content;
        expect((html.match(/<h1[\s>]/g) ?? []).length, `${d.key}#${v}`).toBe(1);
      }
      // Variations are different page structures, not recolours.
      expect(heroes.size, d.key).toBe(variationCount(d));
    }
  });

  it("blueprints never contain prices, ratings or award claims", () => {
    for (const d of DESIGNS) expect(contentIntegrityIssues(buildBlueprintSpec(sample, d.key), ""), d.key).toHaveLength(0);
  });

  it("selects a design from the category and refines it with name signals", () => {
    expect(selectDesign({ category: "restaurant", name: "Sushi Hana" }).design.key).toBe("sushi");
    expect(selectDesign({ category: "restaurant", name: "Pizzeria Da Marco" }).design.key).toBe("pizzeria");
    expect(selectDesign({ category: "restaurant", name: "De Gouden Lepel" }).design.key).toBe("luxury-restaurant");
    expect(selectDesign({ category: "hair_salon", name: "The Gents Barbershop" }).design.key).toBe("barbershop");
    expect(selectDesign({ category: "car_repair", name: "Garage Jansen" }).design.key).toBe("garage");
    // A name signal never moves a business to another sector.
    expect(selectDesign({ category: "car_repair", name: "Pizza Auto Service" }).design.key).toBe("garage");
    expect(selectDesign({ category: "local_service", name: "Hoveniersbedrijf Groen" }).design.key).toBe("landscaping");
  });

  it("drops testimonials that are not verbatim in verified research", () => {
    const spec = buildMockSpec(biz());
    spec.sections.push({ type: "testimonials", id: "reviews", title: "Reviews", items: [
      { quote: "Heerlijk gegeten, we komen zeker terug!", author: "Anna", source: "Website", sourceUrl: "https://example.com/reviews" },
      { quote: "Dit citaat is door niemand geschreven.", author: "Niemand", source: "Website", sourceUrl: "https://example.com/reviews" },
    ] });
    const kept = enforceSpec(spec, biz(), null, "… Heerlijk gegeten,  we komen zeker terug! …");
    const t = kept.sections.find((s) => s.type === "testimonials");
    expect(t && t.type === "testimonials" ? t.items.map((i) => i.author) : []).toEqual(["Anna"]);
    expect(enforceSpec(spec, biz(), null, "").sections.some((s) => s.type === "testimonials")).toBe(false);
  });
});

describe("guardrails", () => {
  it("restores verified facts and strips unsafe links", () => {
    const spec = buildMockSpec(biz());
    spec.business.phone = "+31 6 99999999";
    spec.business.address = "Invented street 9";
    spec.hero.primaryCta.href = "javascript:alert(1)";
    spec.hero.secondaryCta = { label: "Call", href: "tel:+31699999999" };
    spec.images.push({ key: "x", src: "http://insecure.example/x.jpg", alt: "x", license: "authorised", credit: null });
    const safe = enforceSpec(spec, biz(), null);
    expect(safe.business.phone).toBe("+31 10 123 4567");
    expect(safe.business.address).toBe("Kade 1, 3011 AB Rotterdam");
    expect(safe.hero.primaryCta.href).toBe("#contact");
    expect(safe.hero.secondaryCta!.href).toBe("tel:+31101234567");
    expect(safe.images).toHaveLength(0);
  });

  it("removes phone links when no verified phone exists", () => {
    const spec = buildMockSpec(biz());
    const safe = enforceSpec(spec, biz({ phone: null }), null);
    expect(safe.hero.secondaryCta?.href ?? "#contact").not.toMatch(/^tel:/);
  });

  it("flags invented reviews, awards and prices unless verified", () => {
    const spec = buildMockSpec(biz());
    spec.hero.subheadline = "Award-winning kitchen rated ★★★★★ — menu from €12,50";
    const issues = contentIntegrityIssues(spec, "");
    expect(issues.map((i) => i.label)).toEqual(expect.arrayContaining(["award claim", "star rating claim", "price"]));
    expect(contentIntegrityIssues(spec, "award-winning ★★★★★ €12")).toHaveLength(0);
  });

  it("auto-fixes mechanical QC issues and removes unverified claims", () => {
    const spec = buildMockSpec(biz());
    spec.meta.title = "Hi";
    const about = spec.sections.find((s) => s.type === "about")!;
    if (about.type === "about") about.paragraphs = ["We are great. We won an award-winning prize in 2020. Visit us."];
    const { spec: fixed, fixed: what } = autoFix(spec, [
      { code: "meta_title" },
      { code: "content_integrity", detail: "We won an award-winning prize in 2020." },
    ]);
    expect(fixed.meta.title.length).toBeGreaterThanOrEqual(10);
    const a = fixed.sections.find((s) => s.type === "about")!;
    expect(a.type === "about" && a.paragraphs.join(" ")).not.toMatch(/award/);
    expect(what).toEqual(expect.arrayContaining(["meta title", "removed unverified claim"]));
  });
});

import { fitPhotos } from "@/server/website/photos";

describe("stock photo fit", () => {
  const photo = (id: number, alt: string) => ({ id, alt, src: "https://x/y", srcSmall: "https://x/y", photographer: "A", pageUrl: "https://x", width: 1, height: 1, source: "Unsplash" as const });
  it("drops photos that do not show a restaurant for a restaurant hero", () => {
    const list = [photo(1, "A hotel lobby with dark seating areas"), photo(2, "Restaurant dining tables with plants"), photo(3, "Cozy bistro interior at night"), photo(4, "A dark kitchen with a window and a sink")];
    expect(fitPhotos(list, "finedining", "hero").map((p) => p.id)).toEqual([2, 3]);
  });
  it("leaves other industries untouched", () => {
    const list = [photo(1, "A hotel lobby"), photo(2, "Barber cutting hair")];
    expect(fitPhotos(list, "barber", "hero")).toHaveLength(2);
  });
});

import { applyIdentity, getDesign } from "@/sites/designs";
import { DIRECTION_KEYS, finalizeIdentity, fingerprintOf, presetIdentity, seedOf, type Fingerprint } from "@/sites/identity";
import { industryProfile } from "@/lib/industry-intel";

describe("brand identity engine", () => {
  it("builds a readable design from every direction's presets", () => {
    for (const direction of DIRECTION_KEYS) {
      for (const seed of [1, 7, 23]) {
        const d = applyIdentity(getDesign("garage"), presetIdentity(direction, seed, "plain"));
        expect(contrast(d.palette.text, d.palette.bg), `${direction} text`).toBeGreaterThanOrEqual(6.9);
        expect(contrast(d.palette.ink, d.palette.bg), `${direction} headings`).toBeGreaterThanOrEqual(7);
        expect(d.skin).toBe("plain");
      }
    }
  });

  it("repairs unknown fonts and unreadable colours instead of rendering them", () => {
    const raw = presetIdentity("swiss", 3, "plain");
    raw.fonts.display = "Comic Papyrus";
    raw.colors.ink = "#f0f0f0";
    raw.colors.background = "#ffffff";
    const id = finalizeIdentity(raw, 3);
    const d = applyIdentity(getDesign("clinic"), id);
    expect(id.fonts.display).not.toBe("Comic Papyrus");
    expect(contrast(d.palette.ink, d.palette.bg)).toBeGreaterThanOrEqual(7);
  });

  it("does not repeat the previous site's opening for the same industry", () => {
    const recent: Fingerprint[] = [];
    const heroes: string[] = [];
    for (const name of ["Barber One", "Barber Two", "Barber Three", "Barber Four"]) {
      const seed = seedOf(name);
      const id = finalizeIdentity(presetIdentity("swiss", seed, "plain", recent), seed, recent, { category: "barbershop" });
      heroes.push(id.layout.hero);
      recent.unshift(fingerprintOf(id, "barbershop"));
    }
    for (let i = 1; i < heroes.length; i++) expect(heroes[i]).not.toBe(heroes[i - 1]);
  });

  it("plans no image-dependent layouts when there are no photographs", () => {
    for (const direction of DIRECTION_KEYS) {
      const id = finalizeIdentity(presetIdentity(direction, 5, "plain"), 5, [], { photos: false });
      expect(["tiles", "bento"]).not.toContain(id.layout.services);
      expect(id.layout.cta).not.toBe("full");
    }
  });

  it("knows every business category and offers several directions for each", () => {
    for (const c of BUSINESS_CATEGORIES) {
      const p = industryProfile(c.key);
      expect(p.directions.length, c.key).toBeGreaterThanOrEqual(5);
      expect(p.essentials.length).toBeGreaterThan(0);
    }
  });
});
