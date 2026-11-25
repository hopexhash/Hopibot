/**
 * Redesign qualification: decides whether a business's existing website is a genuine
 * redesign opportunity. The score is "how badly does this site need a redesign" (0–100),
 * NOT how good the site is. Pure functions, shared by the worker and the dashboard.
 */

export const REDESIGN_WEIGHTS = { mobile: 25, visual: 25, structure: 15, freshness: 10, technical: 10, conversion: 10, performance: 5 } as const;
export type RedesignArea = keyof typeof REDESIGN_WEIGHTS;
export const REDESIGN_AREAS = Object.keys(REDESIGN_WEIGHTS) as RedesignArea[];
export const AREA_LABEL: Record<RedesignArea, string> = {
  mobile: "Mobile responsiveness",
  visual: "Visual design",
  structure: "Structure & UX",
  freshness: "Content freshness",
  technical: "Technical problems",
  conversion: "Conversion & navigation",
  performance: "Performance",
};

/** Fixed thresholds. They are deliberately not configurable: quality over quantity. */
export const THRESHOLDS = { excellentBelow: 25, goodBelow: 40, averageBelow: 55, qualifiedFrom: 70, highPriorityFrom: 85 } as const;

export const QUALIFICATIONS = ["excellent", "good", "average", "rejected", "review", "qualified", "high_priority", "no_email", "not_inspected"] as const;
export type Qualification = (typeof QUALIFICATIONS)[number];

export const QUALIFICATION_META: Record<Qualification, { badge: string; tone: "danger" | "warning" | "accent" | "success" | "muted"; help: string }> = {
  excellent: { badge: "EXCELLENT WEBSITE – REJECTED", tone: "muted", help: "The current website is professionally designed. Never approached." },
  good: { badge: "GOOD WEBSITE – REJECTED", tone: "muted", help: "The current website is good enough. Skipped." },
  average: { badge: "AVERAGE WEBSITE – NOT QUALIFIED", tone: "muted", help: "An average website without obvious problems. Not qualified automatically." },
  rejected: { badge: "REJECTED BY VERIFICATION", tone: "muted", help: "The second, independent check found no convincing reason to offer a redesign." },
  review: { badge: "NEEDS REVIEW", tone: "warning", help: "A possible redesign lead. Look at the screenshots and decide yourself." },
  qualified: { badge: "QUALIFIED LEAD", tone: "accent", help: "A strong redesign prospect with concrete, visible problems." },
  high_priority: { badge: "HIGH-PRIORITY LEAD", tone: "success", help: "An excellent redesign prospect: the website has serious, visible problems." },
  no_email: { badge: "NO EMAIL – NOT INSPECTED", tone: "muted", help: "No public email address, so the website was not inspected." },
  not_inspected: { badge: "NOT INSPECTED", tone: "muted", help: "The website could not be inspected." },
};

/** What the main leads list shows by default. */
export const LEAD_QUALIFICATIONS: Qualification[] = ["review", "qualified", "high_priority"];
export const REJECTED_QUALIFICATIONS: Qualification[] = ["excellent", "good", "average", "rejected", "no_email", "not_inspected"];
export const isQualifiedLead = (q: string | null | undefined) => q === "qualified" || q === "high_priority";

/** What the browser measured. Every field is an observation, never a guess. */
export type Measured = {
  finalUrl: string;
  https: boolean;
  status: number;
  /** Mobile (390px) */
  hasViewportMeta: boolean;
  mobileOverflowPx: number;
  smallTextRatio: number;
  smallTapTargetRatio: number;
  overflowingElements: number;
  menuToggle: "none" | "works" | "no_effect";
  mobileLoadMs: number | null;
  /** Desktop */
  loadMs: number | null;
  transferKb: number | null;
  requestCount: number;
  consoleErrors: number;
  failedRequests: number;
  imageCount: number;
  brokenImages: number;
  textLength: number;
  loremIpsum: boolean;
  copyrightYear: number | null;
  currentYear: number;
  fonts: string[];
  onlySystemFonts: boolean;
  legacyMarkup: string[];
  oldSlider: string | null;
  generator: string | null;
  h1Count: number;
  title: string | null;
  navLinksChecked: number;
  brokenNavLinks: string[];
  hasTelLink: boolean;
  hasMailLink: boolean;
  hasContactLink: boolean;
  hasForm: boolean;
  ctaCount: number;
  hasBookingLink: boolean;
};

export type AiVerdict = "excellent" | "modern" | "average" | "dated" | "broken";
/** The visual assessment: 0 = no problem at all, 10 = severe problem, per area. */
export type AiAssessment = {
  verdict: AiVerdict;
  ratings: Record<Exclude<RedesignArea, "performance">, number>;
  problems: { area: RedesignArea; problem: string; evidence: string }[];
  summary: string;
  opportunities: string[];
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/** Measured "need" per area, 0 (fine) … 1 (severe), each with the observations behind it. */
export function measuredNeeds(m: Measured): Record<Exclude<RedesignArea, "visual" | "structure">, { need: number; findings: string[] }> {
  const mobileF: string[] = [];
  let mobile = 0;
  if (!m.hasViewportMeta) {
    mobile += 0.6;
    mobileF.push("No mobile viewport: the desktop layout is squeezed onto phone screens");
  }
  if (m.mobileOverflowPx > 8) {
    mobile += m.mobileOverflowPx > 80 ? 0.6 : 0.35;
    mobileF.push(`The page scrolls sideways on a phone (${Math.round(m.mobileOverflowPx)}px wider than the screen)`);
  }
  if (m.overflowingElements > 0) {
    mobile += 0.15;
    mobileF.push(`${m.overflowingElements} image(s) or block(s) stick out of the phone screen`);
  }
  if (m.smallTextRatio > 0.25) {
    mobile += 0.25;
    mobileF.push(`${Math.round(m.smallTextRatio * 100)}% of the text is smaller than 12px on a phone`);
  }
  if (m.smallTapTargetRatio > 0.5) {
    mobile += 0.1;
    mobileF.push("Most links and buttons are too small to tap comfortably");
  }
  if (m.menuToggle === "no_effect") {
    mobile += 0.2;
    mobileF.push("Tapping the mobile menu button does not open a menu");
  }

  const freshF: string[] = [];
  let fresh = 0;
  if (m.copyrightYear && m.copyrightYear < m.currentYear - 1) {
    const age = m.currentYear - m.copyrightYear;
    fresh += age >= 4 ? 0.7 : age >= 2 ? 0.5 : 0.25;
    freshF.push(`The footer still shows copyright ${m.copyrightYear}`);
  }
  if (m.loremIpsum) {
    fresh += 0.5;
    freshF.push("Placeholder text (lorem ipsum) is visible on the page");
  }
  if (m.brokenImages > 0) {
    fresh += Math.min(0.4, 0.15 * m.brokenImages);
    freshF.push(`${m.brokenImages} image(s) fail to load`);
  }
  if (m.textLength < 250) {
    fresh += 0.2;
    freshF.push("The homepage has almost no text content");
  }

  const techF: string[] = [];
  let tech = 0;
  if (!m.https) {
    tech += 0.5;
    techF.push("No HTTPS: browsers mark the site as not secure");
  }
  if (m.brokenNavLinks.length) {
    tech += Math.min(0.5, 0.25 * m.brokenNavLinks.length);
    techF.push(`${m.brokenNavLinks.length} of ${m.navLinksChecked} navigation link(s) lead to an error page`);
  }
  if (m.legacyMarkup.length) {
    tech += Math.min(0.4, 0.2 * m.legacyMarkup.length);
    techF.push(`Obsolete technology: ${m.legacyMarkup.join(", ")}`);
  }
  if (m.consoleErrors >= 5) {
    tech += 0.1;
    techF.push(`${m.consoleErrors} script errors while loading`);
  }

  const convF: string[] = [];
  let conv = 0;
  if (!m.hasTelLink && !m.hasMailLink && !m.hasForm && !m.hasContactLink) {
    conv += 0.7;
    convF.push("No way to get in touch from the homepage: no phone link, email link, form or contact page");
  } else if (!m.hasContactLink && !m.hasForm) {
    conv += 0.25;
    convF.push("No contact page or contact form linked from the homepage");
  }
  if (m.ctaCount === 0) {
    conv += 0.3;
    convF.push("No clear call-to-action button (book, reserve, call, request a quote)");
  }

  const perfF: string[] = [];
  let perf = 0;
  const load = m.mobileLoadMs ?? m.loadMs;
  if (load != null && load > 4000) {
    perf += load > 8000 ? 1 : 0.6;
    perfF.push(`Slow: the page takes ${(load / 1000).toFixed(1)}s to load on a phone`);
  }
  if (m.transferKb != null && m.transferKb > 6000) {
    perf += 0.4;
    perfF.push(`Heavy page: ${(m.transferKb / 1024).toFixed(1)} MB to download`);
  }

  return {
    mobile: { need: clamp01(mobile), findings: mobileF },
    freshness: { need: clamp01(fresh), findings: freshF },
    technical: { need: clamp01(tech), findings: techF },
    conversion: { need: clamp01(conv), findings: convF },
    performance: { need: clamp01(perf), findings: perfF },
  };
}

/** How much the visual assessment counts next to the measurements, per area. */
const AI_SHARE: Record<RedesignArea, number> = { mobile: 0.5, visual: 1, structure: 1, freshness: 0.4, technical: 0.3, conversion: 0.5, performance: 0 };

export type RedesignScore = {
  score: number;
  /** Points per area (0 … the area's weight). Higher = bigger problem. */
  areas: Record<RedesignArea, number>;
  /** Set when the hard exclusion applied: a professional-looking site is never a lead. */
  exclusion: string | null;
  findings: string[];
};

export function mobileMeasurablyBroken(m: Measured) {
  return !m.hasViewportMeta || m.mobileOverflowPx > 24;
}

/**
 * Combines measurements and the visual assessment into the 0–100 redesign score.
 * Hard exclusion: when the site looks professional and its mobile layout is not measurably
 * broken, the score is capped so technical findings can never turn it into a lead.
 */
export function computeRedesignScore(m: Measured, ai: AiAssessment): RedesignScore {
  const needs = measuredNeeds(m);
  const areas = {} as Record<RedesignArea, number>;
  for (const area of REDESIGN_AREAS) {
    const measured = area in needs ? needs[area as keyof typeof needs].need : 0;
    const rated = area === "performance" ? 0 : clamp01((ai.ratings[area] ?? 0) / 10);
    const share = AI_SHARE[area];
    areas[area] = Math.round(REDESIGN_WEIGHTS[area] * (share * rated + (1 - share) * measured));
  }
  let score = REDESIGN_AREAS.reduce((s, a) => s + areas[a], 0);
  let exclusion: string | null = null;
  const professional = ai.verdict === "excellent" || ai.verdict === "modern";
  if (professional && !mobileMeasurablyBroken(m)) {
    const cap = ai.verdict === "excellent" ? THRESHOLDS.excellentBelow - 1 : THRESHOLDS.goodBelow - 1;
    if (score > cap) score = cap;
    exclusion = ai.verdict === "excellent" ? "The website already looks professionally designed and works well on mobile." : "The website looks modern and well organised, with no significant visible problems.";
  }
  const findings = Object.values(needs).flatMap((n) => n.findings);
  return { score: Math.max(0, Math.min(100, score)), areas, exclusion, findings };
}

export type Verification = { approach: boolean; problems: string[]; reasoning: string };

const GENERIC =
  /\b(could (look|be|benefit|use)|more modern|moderner|uses? wordpress|wordpress|older cms|animations?|not (identical|in line) (to|with) (modern|current) (design )?trends|basic website|theoretically|slightly better|a refresh)\b/i;

/** A problem counts only when it is concrete and observable, not a generic opinion. */
export function isConcreteProblem(p: string) {
  const t = p.trim();
  return t.length >= 25 && !GENERIC.test(t);
}

/**
 * Final decision. A site needs at least 70 points AND an independent verification with two
 * concrete problems to qualify automatically; 55–69 is never more than "needs review".
 */
export function classify(score: number, verification: Verification | null): { qualification: Qualification; reason: string } {
  if (score < THRESHOLDS.excellentBelow) return { qualification: "excellent", reason: `Redesign score ${score}: excellent website, never a lead.` };
  if (score < THRESHOLDS.goodBelow) return { qualification: "good", reason: `Redesign score ${score}: good website, skipped.` };
  if (score < THRESHOLDS.averageBelow) return { qualification: "average", reason: `Redesign score ${score}: average website, not qualified automatically.` };
  if (!verification) return { qualification: "review", reason: `Redesign score ${score}, but the independent verification could not run.` };
  const concrete = verification.problems.filter(isConcreteProblem);
  if (!verification.approach || concrete.length < 2) {
    return {
      qualification: "rejected",
      reason: `Redesign score ${score}, but the independent verification rejected it: ${!verification.approach ? verification.reasoning : "fewer than two concrete, observable problems."}`,
    };
  }
  if (score < THRESHOLDS.qualifiedFrom) return { qualification: "review", reason: `Redesign score ${score}: a possible lead, verified, but below the automatic threshold of ${THRESHOLDS.qualifiedFrom}.` };
  if (score < THRESHOLDS.highPriorityFrom) return { qualification: "qualified", reason: `Redesign score ${score}: strong redesign prospect, confirmed by the independent verification.` };
  return { qualification: "high_priority", reason: `Redesign score ${score}: excellent redesign prospect, confirmed by the independent verification.` };
}

/** Owner feedback on a website; used as calibration examples for future assessments. */
export const FEEDBACK_OPTIONS = [
  { key: "excellent", label: "Website looks excellent", qualification: "excellent" },
  { key: "modern", label: "Website is modern", qualification: "good" },
  { key: "average", label: "Website is average", qualification: "average" },
  { key: "needs_redesign", label: "Website genuinely needs redesign", qualification: "qualified" },
] as const satisfies readonly { key: string; label: string; qualification: Qualification }[];
export type FeedbackKey = (typeof FEEDBACK_OPTIONS)[number]["key"];

/** The owner's own reference examples of sites that must never become leads. */
export const REFERENCE_GOOD_SITES = ["weareedn.com", "nightkitchenamsterdam.com", "luckyduckamsterdam.com"];
