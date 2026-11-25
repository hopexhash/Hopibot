import { describe, expect, it } from "vitest";
import { DEFAULT_SCORING_WEIGHTS } from "@/lib/constants";
import { analyseHtml } from "@/server/audit/website-audit";
import { dedupeKey, domainOf, scoreLead } from "@/server/scoring/lead-score";

const W = { ...DEFAULT_SCORING_WEIGHTS };

describe("scoreLead", () => {
  it("gives full no-website points only when verified", () => {
    const verified = scoreLead({ websiteStatus: "verified_none", audit: null, phone: "+31", openingHours: ["x"], address: "a" }, W);
    const unverified = scoreLead({ websiteStatus: "none_found", audit: null, phone: "+31", openingHours: ["x"], address: "a" }, W);
    expect(verified.score).toBe(35);
    expect(unverified.score).toBeLessThan(verified.score);
    expect(unverified.breakdown[0].reason).toMatch(/not verified/);
  });

  it("scores an outdated, non-mobile website with missing info", () => {
    const audit = analyseHtml("<html><head><title>Home</title></head><body><center><font>© 2015</font></center><table></table></body></html>", {
      url: "http://x.nl",
      finalUrl: "http://x.nl",
      status: 200,
      responseMs: 500,
      bytes: 100,
    });
    const r = scoreLead({ websiteStatus: "has_website", audit, phone: null, openingHours: null, address: null }, W);
    const factors = r.breakdown.map((b) => b.factor);
    expect(factors).toEqual(expect.arrayContaining(["outdatedWebsite", "poorMobile", "missingContactForm", "poorSeo", "incompleteInfo"]));
    expect(r.score).toBeGreaterThanOrEqual(60);
    expect(r.score).toBeLessThanOrEqual(100);
  });

  it("is configurable and normalises weights above 100", () => {
    const heavy = { noWebsite: 100, outdatedWebsite: 100, poorMobile: 100, missingContactForm: 100, poorSeo: 100, incompleteInfo: 100 };
    const r = scoreLead({ websiteStatus: "verified_none", audit: null, phone: "1", openingHours: ["x"], address: "a" }, heavy);
    expect(r.score).toBe(Math.round((100 / 600) * 100));
  });

  it("gives a modern, complete website a low score", () => {
    const html = `<html lang="nl"><head><title>Bakkerij de Zon — vers brood in Delft</title><meta name="description" content="Ambachtelijke bakker in Delft sinds jaar en dag, met vers brood en gebak."><meta name="viewport" content="width=device-width, initial-scale=1"><script type="application/ld+json">{}</script></head><body><main><h1>Bakkerij</h1><form><input type="email"><textarea></textarea></form></main><footer>© ${new Date().getFullYear()}</footer></body></html>`;
    const audit = analyseHtml(html, { url: "https://x.nl", finalUrl: "https://x.nl", status: 200, responseMs: 300, bytes: html.length });
    const r = scoreLead({ websiteStatus: "has_website", audit, phone: "1", openingHours: ["x"], address: "a" }, W);
    expect(audit.qualityScore).toBeGreaterThanOrEqual(90);
    expect(r.score).toBe(0);
  });
});

describe("dedupeKey", () => {
  it("matches the same business written differently", () => {
    expect(dedupeKey("Restaurant De Haven B.V.", "Kade 1, 3011 AB Rotterdam", "Rotterdam")).toBe(dedupeKey("de haven", "Kade 1, 3011AB Rotterdam", "rotterdam"));
  });
  it("keeps different businesses apart", () => {
    expect(dedupeKey("De Haven", "Kade 1, 3011 AB Rotterdam")).not.toBe(dedupeKey("De Haven", "Kade 9, 3012 CD Rotterdam"));
  });
  it("extracts domains", () => {
    expect(domainOf("https://www.Example.nl/contact")).toBe("example.nl");
    expect(domainOf("example.nl")).toBe("example.nl");
    expect(domainOf(null)).toBeNull();
  });
});
