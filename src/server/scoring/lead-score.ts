import type { ScoringWeights } from "@/lib/constants";
import type { WebsiteAudit } from "../audit/website-audit";

export type ScoreInput = {
  websiteStatus: string; // none_found | verified_none | has_website | unreachable | unknown
  audit: WebsiteAudit | null;
  phone: string | null;
  openingHours: string[] | null;
  address: string | null;
  businessStatus?: string | null;
};

export type ScoreResult = {
  score: number;
  breakdown: { factor: string; points: number; reason: string }[];
};

/**
 * Configurable 0–100 lead score. Each factor contributes up to its weight; the sum is
 * normalised to 100 when weights add up to more than 100.
 */
export function scoreLead(input: ScoreInput, weights: ScoringWeights): ScoreResult {
  const b: ScoreResult["breakdown"] = [];
  const add = (factor: keyof ScoringWeights, ratio: number, reason: string) => {
    const pts = Math.round(weights[factor] * Math.max(0, Math.min(1, ratio)));
    if (pts > 0) b.push({ factor, points: pts, reason });
  };

  if (input.websiteStatus === "verified_none") {
    add("noWebsite", 1, "No website (verified)");
  } else if (input.websiteStatus === "none_found") {
    // Not verified: a website may exist that we could not discover. Score slightly lower.
    add("noWebsite", 0.85, "No website found (not verified — a site may exist elsewhere)");
  } else if (input.websiteStatus === "unreachable") {
    add("noWebsite", 0.6, "Listed website is unreachable");
  } else if (input.audit) {
    const a = input.audit;
    if (a.flags.outdated) add("outdatedWebsite", 1, `Website looks outdated (${a.outdatedSignals.slice(0, 2).join(", ")})`);
    if (a.flags.poorMobile) add("poorMobile", 1, a.hasViewport ? "Layout not mobile-friendly" : "No responsive viewport meta tag");
    if (a.flags.missingContactForm) add("missingContactForm", 1, "No contact form found");
    if (a.flags.poorSeo) add("poorSeo", Math.min(1, a.seoIssues.length / 3), `SEO issues: ${a.seoIssues.slice(0, 3).join(", ")}`);
  }

  const missing: string[] = [];
  if (!input.phone) missing.push("phone");
  if (!input.openingHours?.length) missing.push("opening hours");
  if (!input.address) missing.push("address");
  if (missing.length) add("incompleteInfo", missing.length / 3, `Missing ${missing.join(", ")}`);

  const total = b.reduce((s, x) => s + x.points, 0);
  const maxPossible = Object.values(weights).reduce((s, v) => s + v, 0);
  const normalised = maxPossible > 100 ? Math.round((total / maxPossible) * 100) : total;
  return { score: Math.max(0, Math.min(100, normalised)), breakdown: b };
}

/** Normalisation used for duplicate detection across sources. */
export function dedupeKey(name: string, address: string | null | undefined, city?: string | null) {
  const norm = (s: string) =>
    s
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/\b(b\.?v\.?|v\.?o\.?f\.?|restaurant|eetcafe|de|het|the)\b/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, "-");
  const postcode = address?.match(/\b\d{4}\s?[A-Z]{2}\b/i)?.[0]?.replace(/\s/g, "").toLowerCase();
  const street = address ? norm(address.split(",")[0] ?? "") : "";
  return [norm(name), postcode ?? street ?? "", city ? norm(city) : ""].filter(Boolean).join("|");
}

export function domainOf(url: string | null | undefined) {
  if (!url) return null;
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}
