import { describe, expect, it } from "vitest";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { LOOKS_OF_CATEGORY, selectDesign, selectLook, type UsedLook } from "@/lib/design-select";
import { buildBlueprintSpec } from "@/lib/site-blueprints";
import { COLORWAYS, colorwayCount, colorwayOf, recolor, shiftHex } from "@/sites/colorways";
import { FAMILIES } from "@/sites/families";
import { renderSite } from "@/sites/render";

const biz = (name: string, category = "restaurant", city = "Rotterdam") => ({ name, category, city, text: "" });

/** Builds websites one after another, each seeing the ones before it. */
function run(businesses: ReturnType<typeof biz>[]) {
  const used: UsedLook[] = [];
  return businesses.map((b) => {
    const look = selectLook(b, used);
    used.push({ family: look.design.key, variation: look.variation, category: b.category, city: b.city });
    return `${look.design.key}:${look.variation}`;
  });
}

describe("colourways", () => {
  it("every family has two colourways, and every design list names real families", () => {
    for (const key of Object.keys(FAMILIES)) expect(COLORWAYS[key]?.length, key).toBe(2);
    for (const [cat, list] of Object.entries(LOOKS_OF_CATEGORY)) for (const f of list) expect(FAMILIES[f], `${cat} → ${f}`).toBeDefined();
  });

  it("every business category has more than one design", () => {
    for (const c of BUSINESS_CATEGORIES) expect((LOOKS_OF_CATEGORY[c.key] ?? []).length, c.key).toBeGreaterThan(1);
  });

  it("moves colours but leaves greys, white and black alone", () => {
    const cw = colorwayOf("forge", 1)!;
    expect(shiftHex("#d7ff3e", cw)).not.toBe("#d7ff3e");
    expect(shiftHex("#0b0b0b", cw)).toBe("#0b0b0b");
    expect(recolor("color:#fff;background:rgba(255,255,255,.2)", cw)).toBe("color:#fff;background:rgba(255,255,255,.2)");
    expect(recolor("a{color:rgba(215,255,62,0.4)}", cw)).not.toContain("215,255,62");
    expect(recolor("a{color:#d7ff3e}", null)).toBe("a{color:#d7ff3e}");
  });

  it("renders each colourway differently, and the original exactly as before", () => {
    for (const key of Object.keys(FAMILIES)) {
      const spec = buildBlueprintSpec({ name: "Voorbeeld", category: "restaurant", city: "Rotterdam", phone: null, address: null, openingHours: null, googleMapsUrl: null }, key);
      const html = [0, 1, 2].map((v) => renderSite({ ...spec, theme: { ...spec.theme, variation: v } }, { agencyName: "HOPI", seedKey: key, assetBase: "/a/" })[0].content);
      expect(new Set(html).size, key).toBe(3);
      expect(renderSite(spec, { agencyName: "HOPI", seedKey: key, assetBase: "/a/" })[0].content).toBe(html[0]);
    }
  });
});

describe("look selection", () => {
  it("gives the first business of a kind the design it always got, in its original colours", () => {
    for (const c of BUSINESS_CATEGORIES) {
      const b = biz(`Zaak ${c.key}`, c.key);
      const look = selectLook(b, []);
      expect(look.design.key, c.key).toBe(selectDesign(b).design.key);
      expect(look.variation).toBe(0);
    }
  });

  it("never repeats a look for businesses of the same kind until every look is used", () => {
    const n = LOOKS_OF_CATEGORY.restaurant.reduce((s, f) => s + colorwayCount(f), 0);
    const looks = run(Array.from({ length: n }, (_, i) => biz(`Restaurant ${i}`)));
    expect(new Set(looks).size).toBe(n);
  });

  it("gives the second business in the same city another design, not only other colours", () => {
    const [a, b] = run([biz("Trattoria Uno"), biz("Bistro Due")]);
    expect(a.split(":")[0]).not.toBe(b.split(":")[0]);
  });

  it("is not affected by other kinds of business", () => {
    const used: UsedLook[] = [{ family: "vesper", variation: 0, category: "lawyer", city: "Rotterdam" }];
    expect(selectLook(biz("Restaurant Eén"), used).design.key).toBe("vesper");
  });

  it("is deterministic", () => {
    const seq = [biz("A"), biz("B"), biz("C", "restaurant", "Utrecht"), biz("D")];
    expect(run(seq)).toEqual(run(seq));
  });
});
