import { describe, expect, it } from "vitest";
import { DEFAULT_CATALOG, priceOrder, recommendedAddons } from "@/lib/catalog";
import { renderEmailHtml } from "@/lib/email-html";
import { isSupportedCountry, languageFor, marketCountry, resolveMarket } from "@/lib/markets";
import { opportunityScore } from "@/lib/opportunity";
import { assessOutreach } from "@/lib/outreach-compliance";
import { nextBatch, withinWorkingHours } from "@/server/orchestrator/autopilot";
import { parseObjectiveHeuristically } from "@/server/orchestrator/planner";

describe("market restriction (Netherlands and Belgium only)", () => {
  it("accepts every spelling of the two markets and nothing else", () => {
    for (const c of ["Netherlands", "Nederland", "nl", "België", "Belgique", "Belgium"]) expect(isSupportedCountry(c), c).toBe(true);
    for (const c of ["Germany", "Duitsland", "France", "United Kingdom", "", null]) expect(isSupportedCountry(c), String(c)).toBe(false);
    expect(marketCountry.parse("belgië")).toBe("Belgium");
    expect(() => marketCountry.parse("Germany")).toThrow(/outside the supported markets/);
    expect(resolveMarket("Nederland")?.code).toBe("NL");
  });

  it("never plans discovery outside the supported markets", () => {
    expect(parseObjectiveHeuristically("Find 20 restaurants in Berlin, Germany").discovery!.country).toBe("Netherlands");
    expect(parseObjectiveHeuristically("Find 20 bakeries in Antwerp, Belgium").discovery!.country).toBe("Belgium");
  });

  it("chooses the language from the location", () => {
    expect(languageFor({ country: "Netherlands", city: "Rotterdam" })).toBe("nl");
    expect(languageFor({ country: "Belgium", city: "Antwerpen", postalCode: "2000" })).toBe("nl");
    expect(languageFor({ country: "Belgium", city: "Liège", postalCode: "4000" })).toBe("fr");
    expect(languageFor({ country: "Belgium", city: "Charleroi" })).toBe("fr");
    expect(languageFor({ country: "Belgium", city: "Bruxelles", postalCode: "1000" })).toBe("fr");
    expect(languageFor({ country: "Belgium", city: "Brussel", postalCode: "1000", ownText: "Welkom bij onze zaak — openingsuren" })).toBe("nl");
  });
});

describe("autopilot limits", () => {
  const base = { enabled: true, startHour: 8, endHour: 20, days: [1, 2, 3, 4, 5], country: "Netherlands" as const, cities: ["Rotterdam", "Utrecht"], categories: ["restaurant", "barbershop"], dailyDiscoveryLimit: 12, dailyWebsiteLimit: 3 };
  it("never plans beyond the daily allowance and rotates cities and industries", () => {
    expect(nextBatch(base, { discovered: 0, websites: 0 }, 0)).toEqual({ city: "Rotterdam", category: "restaurant", limit: 10, topN: 2 });
    expect(nextBatch(base, { discovered: 10, websites: 2 }, 1)).toEqual({ city: "Utrecht", category: "restaurant", limit: 2, topN: 1 });
    expect(nextBatch(base, { discovered: 4, websites: 3 }, 2)).toMatchObject({ city: "Rotterdam", category: "barbershop", topN: 0 });
    expect(nextBatch(base, { discovered: 12, websites: 0 }, 3)).toBeNull();
    expect(nextBatch({ ...base, enabled: false }, { discovered: 0, websites: 0 }, 0)).toBeNull();
    expect(nextBatch({ ...base, cities: [] }, { discovered: 0, websites: 0 }, 0)).toBeNull();
  });
  it("only works inside the configured hours (Amsterdam time)", () => {
    expect(withinWorkingHours(base, new Date("2026-11-25T10:00:00Z"))).toBe(true); // Wednesday 11:00
    expect(withinWorkingHours(base, new Date("2026-11-25T21:30:00Z"))).toBe(false); // 22:30
    expect(withinWorkingHours(base, new Date("2026-11-28T10:00:00Z"))).toBe(false); // Saturday
  });
});

describe("price catalogue", () => {
  it("ships the agreed default prices", () => {
    const price = (list: { key: string; priceCents: number | null }[], k: string) => list.find((x) => x.key === k)?.priceCents;
    expect([price(DEFAULT_CATALOG.packages, "starter"), price(DEFAULT_CATALOG.packages, "business"), price(DEFAULT_CATALOG.packages, "premium")]).toEqual([29900, 49900, 79900]);
    expect([price(DEFAULT_CATALOG.plans, "hosting"), price(DEFAULT_CATALOG.plans, "care"), price(DEFAULT_CATALOG.plans, "growth")]).toEqual([4900, 7900, 14900]);
    expect(price(DEFAULT_CATALOG.addons, "ordering")).toBeNull();
  });

  it("prices orders on the server and keeps one-time and monthly apart", () => {
    const r = priceOrder(DEFAULT_CATALOG, { packageKey: "business", planKey: "care", addons: { pages: 3, logo: 1, ordering: 1, unknown: 2 } });
    if ("error" in r) throw new Error(r.error);
    expect(r.oneTimeCents).toBe(49900 + 3 * 3900 + 9900);
    expect(r.monthlyCents).toBe(7900);
    expect(r.onRequest).toHaveLength(1);
    expect(r.lines.some((l) => l.key === "unknown")).toBe(false);
  });

  it("rejects unknown or disabled packages", () => {
    expect("error" in priceOrder(DEFAULT_CATALOG, { packageKey: "nope" })).toBe(true);
    const off = { ...DEFAULT_CATALOG, packages: DEFAULT_CATALOG.packages.map((p) => ({ ...p, enabled: p.key !== "starter" })) };
    expect("error" in priceOrder(off, { packageKey: "starter" })).toBe(true);
  });

  it("recommends add-ons that fit the industry", () => {
    expect(recommendedAddons(DEFAULT_CATALOG, ["booking", "menu", "nope"]).map((a) => a.key)).toEqual(["booking", "menu"]);
  });
});

describe("opportunity score", () => {
  it("is highest without a website and low for a healthy one", () => {
    expect(opportunityScore({ websiteStatus: "verified_none", audit: null }).score).toBeGreaterThanOrEqual(90);
    const good = opportunityScore({ websiteStatus: "has_website", audit: { https: true, responseMs: 400, bytes: 90000, hasViewport: true, h1Count: 1, hasContactForm: true, hasContactPage: true, hasStructuredData: true, hasOpenGraph: true, outdatedSignals: [], seoIssues: [], phones: ["+31"] } });
    expect(good.score).toBeLessThan(15);
    const bad = opportunityScore({ websiteStatus: "has_website", lang: "nl", audit: { https: false, responseMs: 5200, hasViewport: false, h1Count: 0, hasContactForm: false, hasContactPage: false, hasStructuredData: false, hasOpenGraph: false, outdatedSignals: ["legacy HTML tags", "no HTTPS"], seoIssues: ["missing meta description", "no H1"], phones: [] } });
    expect(bad.score).toBeGreaterThan(65);
    expect(bad.areas).toHaveLength(7);
    // Findings are observations in the prospect's language — never revenue or customer-loss estimates.
    const text = bad.areas.flatMap((a) => a.findings).join(" ");
    expect(text).toMatch(/telefoons/);
    expect(text).not.toMatch(/€|omzet|revenue|klanten verliest|lost customers/i);
  });
});

describe("permission-based outreach", () => {
  const generic = { isGeneric: true, source: "website" };
  it("needs a recorded basis before anything can be sent", () => {
    expect(assessOutreach({ country: "Netherlands", permission: "unknown", contact: generic }).decision).toBe("review");
    expect(assessOutreach({ country: "Netherlands", permission: "legitimate_interest", contact: generic }).decision).toBe("send");
    expect(assessOutreach({ country: "Belgium", permission: "consent", contact: { isGeneric: false, source: "manual" } }).decision).toBe("send");
    expect(assessOutreach({ country: "Netherlands", permission: "legitimate_interest", contact: { isGeneric: false, source: "hunter" } }).decision).toBe("review");
  });
  it("blocks opt-outs, missing addresses and unsupported countries", () => {
    expect(assessOutreach({ country: "Netherlands", permission: "opted_out", contact: generic }).decision).toBe("blocked");
    expect(assessOutreach({ country: "Netherlands", permission: "consent", contact: null }).decision).toBe("blocked");
    expect(assessOutreach({ country: "Germany", permission: "unknown", contact: generic }).decision).toBe("blocked");
  });
});

describe("HTML email", () => {
  it("contains the three calls to action, the opt-out and escapes content", () => {
    const html = renderEmailHtml({
      lang: "nl", paragraphs: ["Beste <b>team</b>,", "Ik maakte een concept."], footer: "--\nAgency\nAfmelden: https://app.example/u/tok", businessName: "Bakkerij & Zn", agencyName: "Agency",
      demoUrl: "https://app.example/d/bakkerij", unsubscribeUrl: "https://app.example/u/tok", design: { name: "Crumb", bg: "#fbeee6", ink: "#3b1e24", accent: "#b8455b", onAccent: "#ffffff", displayFont: "Georgia" }, fromPriceEur: 299, benefits: ["Snel"],
    });
    for (const s of ["Bekijk uw nieuwe website", "Bestel deze website", "Pas uw website aan", "https://app.example/u/tok", "vanaf €299"]) expect(html).toContain(s);
    expect(html).toContain("Bakkerij &amp; Zn");
    expect(html).not.toContain("<b>team</b>");
    expect(html).not.toMatch(/<script|<img/i);
  });
});
