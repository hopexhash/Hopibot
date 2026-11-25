import "../guard";
import { and, eq } from "drizzle-orm";
import { classify, computeRedesignScore, QUALIFICATION_META, REFERENCE_GOOD_SITES, THRESHOLDS, type AiAssessment, type Measured, type Qualification, type Verification } from "@/lib/qualification";
import type { UsageContext } from "../costs/usage";
import { db, schema } from "../db";
import { domainOf } from "../scoring/lead-score";
import { assessVisually, calibrationExamples, verifyIndependently } from "./assess";
import { inspectSite, type SiteInspection } from "./inspect-site";

export type QualifyResult = { qualification: Qualification; score: number; reason: string; costUsd: number; inspected: boolean };

type Deps = {
  organizationId: string;
  usage: UsageContext;
  /** Development mock mode: no browser, no AI; results are labelled as mock. */
  mock: boolean;
  log: (level: "info" | "warn", message: string, data?: Record<string, unknown>) => Promise<void>;
};

/** Deterministic stand-in used only in development mock mode. */
export function mockInspection(url: string, seed: number): { measured: Measured; assessment: AiAssessment; verification: Verification } {
  // 0 excellent, 1 modern, 2 dated, 3 broken. Most mock sites are bad so the demo pipeline has work to do.
  const kind = seed % 7 === 0 ? 0 : seed % 7 === 6 ? 1 : seed % 2 ? 3 : 2;
  const bad = kind >= 2;
  const measured: Measured = {
    finalUrl: url, https: kind !== 3, status: 200, hasViewportMeta: !bad, mobileOverflowPx: kind === 3 ? 240 : 0, smallTextRatio: bad ? 0.4 : 0, smallTapTargetRatio: bad ? 0.6 : 0.1, overflowingElements: kind === 3 ? 2 : 0,
    menuToggle: bad ? "none" : "works", mobileLoadMs: bad ? 5200 : 1400, loadMs: bad ? 4100 : 1100, transferKb: 1800, requestCount: 40, consoleErrors: 0, failedRequests: 0, imageCount: 12, brokenImages: kind === 3 ? 2 : 0,
    textLength: 1800, loremIpsum: false, copyrightYear: bad ? new Date().getFullYear() - 6 : new Date().getFullYear(), currentYear: new Date().getFullYear(), fonts: bad ? ["Arial"] : ["Inter"], onlySystemFonts: bad,
    legacyMarkup: kind === 3 ? ["table-based layout"] : [], oldSlider: bad ? "flexslider" : null, generator: null, h1Count: 1, title: "Home", navLinksChecked: 4, brokenNavLinks: [], hasTelLink: !bad, hasMailLink: true, hasContactLink: !bad, hasForm: !bad, ctaCount: bad ? 0 : 2, hasBookingLink: !bad,
  };
  const r = bad ? (kind === 3 ? 9 : 8) : kind;
  const assessment: AiAssessment = {
    verdict: (["excellent", "modern", "dated", "broken"] as const)[kind],
    ratings: { mobile: r, visual: r, structure: r, freshness: r, technical: bad ? 6 : 0, conversion: bad ? 7 : 1 },
    problems: bad ? [{ area: "visual", problem: "[MOCK] Old-fashioned layout with default fonts and a dated image slider", evidence: "[MOCK] homepage hero" }, { area: "freshness", problem: `[MOCK] The footer still shows copyright ${measured.copyrightYear}`, evidence: "[MOCK] footer" }] : [],
    summary: `[MOCK] ${bad ? "A visibly dated website with mobile problems." : "A clean, professional website."}`,
    opportunities: bad ? ["[MOCK] A mobile-first layout with a clear booking button"] : [],
  };
  const verification: Verification = { approach: bad, problems: assessment.problems.map((p) => p.problem), reasoning: `[MOCK] ${bad ? "Concrete, visible problems." : "Nothing a business owner would recognise as a problem."}` };
  return { measured, assessment, verification };
}

async function save(deps: Deps, businessId: string, url: string, row: { qualification: Qualification; score: number; areas: Record<string, number>; measured: Measured | null; assessment: AiAssessment | null; verification: Verification | null; explanation: string; shots?: SiteInspection["shots"]; costUsd: number }) {
  await db().insert(schema.websiteInspections).values({
    organizationId: deps.organizationId,
    businessId,
    url,
    qualification: row.qualification,
    redesignScore: row.score,
    areaScores: row.areas,
    measured: (row.measured ?? {}) as unknown as Record<string, unknown>,
    problems: row.assessment?.problems ?? [],
    opportunities: row.assessment?.opportunities ?? [],
    explanation: row.explanation,
    summary: row.assessment?.summary ?? null,
    verdict: row.assessment?.verdict ?? null,
    verification: row.verification,
    desktopShot: row.shots?.desktopTop.toString("base64") ?? null,
    mobileShot: row.shots?.mobileTop.toString("base64") ?? null,
    costUsd: row.costUsd,
    isMock: deps.mock,
  });
  await db()
    .update(schema.businesses)
    .set({ qualification: row.qualification, redesignScore: row.score, inspectedAt: new Date(), updatedAt: new Date() })
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, deps.organizationId)));
}

/**
 * Inspects one business's website and decides whether it is a genuine redesign lead.
 * Order matters for cost: the owner's own judgements first (free), then the browser visit
 * (free), then one visual assessment, and the stronger verification only for sites that
 * score high enough to possibly qualify.
 */
export async function qualifyWebsite(deps: Deps, b: { id: string; name: string; category: string; url: string; mockSeed?: number }): Promise<QualifyResult> {
  const domain = domainOf(b.url);
  const done = async (q: Qualification, score: number, reason: string, extra: Partial<Parameters<typeof save>[3]> = {}, inspected = true): Promise<QualifyResult> => {
    await save(deps, b.id, b.url, { qualification: q, score, areas: {}, measured: null, assessment: null, verification: null, explanation: reason, costUsd: 0, ...extra });
    await deps.log("info", `${b.name} — ${QUALIFICATION_META[q].badge} (redesign score ${score}). ${reason}`, { businessId: b.id, qualification: q, redesignScore: score, url: b.url });
    return { qualification: q, score, reason, costUsd: extra.costUsd ?? 0, inspected };
  };

  // 1. The owner already judged this website: no inspection, no AI call.
  if (domain) {
    const [fb] = await db().select().from(schema.websiteFeedback).where(and(eq(schema.websiteFeedback.organizationId, deps.organizationId), eq(schema.websiteFeedback.domain, domain))).limit(1);
    if (fb?.classification === "excellent" || (!fb && REFERENCE_GOOD_SITES.includes(domain))) return done("excellent", 0, "You marked this website as looking excellent. It is never approached.", {}, false);
    if (fb?.classification === "modern") return done("good", 30, "You marked this website as modern. It is skipped.", {}, false);
    if (fb?.classification === "average") return done("average", 45, "You marked this website as average. It is not qualified.", {}, false);
  }

  if (deps.mock) {
    const m = mockInspection(b.url, b.mockSeed ?? 0);
    const s = computeRedesignScore(m.measured, m.assessment);
    const v = s.score >= THRESHOLDS.averageBelow ? m.verification : null;
    const c = classify(s.score, v);
    return done(c.qualification, s.score, `[MOCK] ${s.exclusion ?? c.reason}`, { areas: s.areas, measured: m.measured, assessment: m.assessment, verification: v });
  }

  // 2. Real browser visit: desktop and phone, with screenshots.
  let inspection: SiteInspection;
  try {
    inspection = await inspectSite(b.url);
  } catch (err) {
    return done("not_inspected", 0, `The website could not be opened in the browser (${(err as Error).message.slice(0, 140)}).`, {}, false);
  }
  if (inspection.measured.status >= 400) return done("not_inspected", 0, `The website answered with an error (HTTP ${inspection.measured.status}).`, { measured: inspection.measured, shots: inspection.shots }, false);

  // 3. Visual assessment of the screenshots.
  const calibration = await calibrationExamples(deps.organizationId);
  const subject = { name: b.name, category: b.category, url: b.url, inspection, calibration };
  let cost = 0;
  let assessment: AiAssessment;
  try {
    const a = await assessVisually(deps.usage, subject);
    assessment = a.assessment;
    cost += a.costUsd;
  } catch (err) {
    return done("not_inspected", 0, `The visual assessment could not run (${(err as Error).message.slice(0, 140)}).`, { measured: inspection.measured, shots: inspection.shots }, false);
  }
  const s = computeRedesignScore(inspection.measured, assessment);

  // 4. Independent verification, only for sites that could become a lead.
  let verification: Verification | null = null;
  if (s.score >= THRESHOLDS.averageBelow) {
    try {
      const v = await verifyIndependently(deps.usage, subject);
      verification = v.verification;
      cost += v.costUsd;
    } catch (err) {
      await deps.log("warn", `Verification could not run for ${b.name}: ${(err as Error).message.slice(0, 140)}`);
    }
  }
  const c = classify(s.score, verification);
  const reason = [s.exclusion ?? c.reason, assessment.summary, verification?.approach && verification.problems.length ? `Problems: ${verification.problems.slice(0, 3).join(" | ")}` : ""].filter(Boolean).join(" ");
  return done(c.qualification, s.score, reason, { areas: s.areas, measured: inspection.measured, assessment, verification, shots: inspection.shots, costUsd: cost });
}
