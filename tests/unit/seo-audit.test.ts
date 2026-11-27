import { generateKeyPairSync, createVerify } from "node:crypto";
import { describe, expect, it } from "vitest";
import { checkPage, parsePage, scoreOf } from "@/server/seo/audit";
import { parseServiceAccount, signedAssertion } from "@/server/integrations/google-search";

const page = (head: string, body: string) => `<!DOCTYPE html><html lang="nl"><head>${head}</head><body>${body}</body></html>`;
const GOOD_HEAD =
  '<title>Website laten maken voor je restaurant | HOPI</title><meta name="description" content="Een restaurantwebsite met menukaart, reserveren en openingstijden, gemaakt voor de telefoon. Eerst gratis een ontwerp zien."/>' +
  '<link rel="canonical" href="https://wearehopi.nl/x"/><meta name="robots" content="index, follow"/><meta property="og:title" content="T"/><meta property="og:image" content="https://wearehopi.nl/og.jpg"/>' +
  '<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":"a"},{"@type":"BreadcrumbList","itemListElement":[{"position":1}]}]}</script>';
const words = (n: number) => Array.from({ length: n }, () => "woord").join(" ");

describe("SEO audit: reading a page", () => {
  it("finds title, description, canonical, headings, structured data, images and links", () => {
    const p = parsePage(page(GOOD_HEAD, `<h1>Kop</h1><h2>A</h2><h4>B</h4><img src="a.webp" alt="x" width="1" height="1"><img src="b.webp"><a href="/prijzen">Prijzen</a><p>${words(10)}</p>`));
    expect(p.title).toBe("Website laten maken voor je restaurant | HOPI");
    expect(p.canonical).toBe("https://wearehopi.nl/x");
    expect(p.h1).toBe(1);
    expect(p.skips).toBe(1);
    expect(p.schema).toEqual(["WebPage", "BreadcrumbList"]);
    expect(p.schemaErrors).toBe(0);
    expect(p.imagesNoAlt).toBe(1);
    expect(p.imagesNoSize).toBe(1);
    expect(p.links).toContain("/prijzen");
  });

  it("flags invalid or incomplete structured data", () => {
    const p = parsePage(page('<script type="application/ld+json">{oops</script><script type="application/ld+json">{"@type":"FAQPage","mainEntity":[]}</script>', "<h1>x</h1>"));
    expect(p.schemaErrors).toBe(2);
  });
});

describe("SEO audit: checks", () => {
  it("passes a healthy page", () => {
    const p = parsePage(page(GOOD_HEAD, `<h1>Kop</h1><p>${words(400)}</p>`));
    expect(checkPage("/x", "https://wearehopi.nl/x", 200, "", p)).toEqual([]);
  });

  it("catches what matters for search", () => {
    const p = parsePage(page('<title>Kort</title><meta name="robots" content="noindex"/>', "<h1>a</h1><h1>b</h1>"));
    const codes = checkPage("/x", "https://wearehopi.nl/x", 200, "", p).map((i) => i.code);
    for (const c of ["noindex", "title_short", "description_missing", "canonical_missing", "h1_multiple", "schema_missing", "thin"]) expect(codes).toContain(c);
    expect(checkPage("/x", "https://wearehopi.nl/x", 404, "", null).map((i) => i.code)).toEqual(["status"]);
  });

  it("scores problems as an internal diagnostic between 0 and 100", () => {
    expect(scoreOf([], 10)).toBe(100);
    expect(scoreOf([{ code: "a", severity: "error", message: "" }], 10)).toBeLessThan(100);
    expect(scoreOf(Array.from({ length: 500 }, () => ({ code: "a", severity: "error" as const, message: "" })), 1)).toBe(0);
  });
});

describe("Google Search Console connection", () => {
  it("only accepts a service-account key", () => {
    expect(() => parseServiceAccount("not json")).toThrow(/not valid JSON/);
    expect(() => parseServiceAccount(JSON.stringify({ type: "authorized_user" }))).toThrow(/service-account/);
  });

  it("signs the OAuth assertion with the account's private key (RS256)", () => {
    const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const sa = parseServiceAccount(JSON.stringify({ type: "service_account", client_email: "seo@x.iam.gserviceaccount.com", private_key: privateKey.export({ type: "pkcs8", format: "pem" }) }));
    const jwt = signedAssertion(sa, ["https://www.googleapis.com/auth/webmasters.readonly"], 1_800_000_000);
    const [h, c, sig] = jwt.split(".");
    const claims = JSON.parse(Buffer.from(c, "base64url").toString());
    expect(JSON.parse(Buffer.from(h, "base64url").toString())).toEqual({ alg: "RS256", typ: "JWT" });
    expect(claims).toMatchObject({ iss: "seo@x.iam.gserviceaccount.com", scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: 1_800_000_000, exp: 1_800_003_600 });
    const v = createVerify("RSA-SHA256");
    v.update(`${h}.${c}`);
    expect(v.verify(publicKey, Buffer.from(sig, "base64url"))).toBe(true);
  });
});
