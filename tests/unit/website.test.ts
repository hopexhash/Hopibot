import { describe, expect, it } from "vitest";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { siteSpecSchema } from "@/lib/site-spec";
import { renderSite } from "@/sites/render";
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
      expect(contrast(v["--accent-text"], v["--surface"])).toBeGreaterThanOrEqual(4.5);
      expect(contrast(v["--muted"], v["--surface"])).toBeGreaterThanOrEqual(4.5);
    }
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
