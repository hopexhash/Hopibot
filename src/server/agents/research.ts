import "../guard";
import { stageEvent, stageLabel } from "@/lib/website-stages";
import { and, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { categoryLabel } from "@/lib/constants";
import { db, schema } from "../db";
import { claudeStructured, untrusted } from "../integrations/anthropic";
import { IntegrationUnavailableError } from "../integrations/credentials";
import { safeFetch } from "../net/safe-fetch";
import { continuePipeline } from "../orchestrator/pipeline";
import { advanceStage } from "../orchestrator/tasks";
import type { AgentHandler } from "../orchestrator/types";

export const researchSchema = z.object({
  profile: z.object({
    name: z.string(),
    category: z.string(),
    language: z.enum(["nl", "en", "de", "fr"]).describe("Language the business communicates in"),
    description: z.string().describe("2-3 neutral sentences based only on verified information"),
    services: z.array(z.object({ name: z.string(), verified: z.boolean(), source: z.string().nullable() })),
    location: z.object({ address: z.string().nullable(), city: z.string().nullable(), verified: z.boolean() }),
    openingHours: z.object({ lines: z.array(z.string()).nullable(), verified: z.boolean() }),
    phone: z.object({ value: z.string().nullable(), verified: z.boolean() }),
    brandIdentity: z.object({
      tone: z.string(),
      styleKeywords: z.array(z.string()),
      existingColors: z.array(z.string()).describe("Hex colours seen on the existing site, empty if unknown"),
    }),
    existingWebsite: z.object({
      url: z.string().nullable(),
      summary: z.string().nullable(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
    }),
    competitors: z.array(z.object({ name: z.string(), note: z.string() })),
    targetAudience: z.array(z.string()),
    improvements: z.array(z.string()).describe("Concrete website improvements for this business"),
    verifiedFacts: z.array(z.object({ fact: z.string(), source: z.string() })),
    assumptions: z.array(z.object({ assumption: z.string(), rationale: z.string() })),
    missingInformation: z.array(z.string()),
  }),
  brief: z.object({
    goals: z.array(z.string()),
    primaryCta: z.string(),
    secondaryCta: z.string().nullable(),
    recommendedSections: z.array(z.string()),
    tone: z.string(),
    keyMessages: z.array(z.string()),
    seoKeywords: z.array(z.string()),
    designDirection: z.string(),
    mustNotInclude: z.array(z.string()),
  }),
});
export type ResearchOutput = z.infer<typeof researchSchema>;

export function htmlToText(html: string, max = 8000) {
  return html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>|<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<(br|\/p|\/div|\/h\d|\/li)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .trim()
    .slice(0, max);
}

async function gatherWebsiteText(url: string, contactPage?: string | null) {
  const pages: { url: string; text: string }[] = [];
  for (const u of [url, contactPage].filter(Boolean) as string[]) {
    try {
      const r = await safeFetch(u, { timeoutMs: 12000, maxBytes: 1_500_000 });
      if (r.status < 400) pages.push({ url: r.url, text: htmlToText(r.body, 7000) });
    } catch {
      // A failed fetch simply means less evidence; the model is told what is missing.
    }
  }
  return pages;
}

function mockResearch(b: typeof schema.businesses.$inferSelect): ResearchOutput {
  const label = categoryLabel(b.category);
  return {
    profile: {
      name: b.name,
      category: label,
      language: "nl",
      description: `${b.name} is a ${label.toLowerCase().replace(/s$/, "")} in ${b.city ?? "the area"}. (MOCK research — generated without Claude.)`,
      services: [{ name: label, verified: false, source: null }],
      location: { address: b.address, city: b.city, verified: Boolean(b.address) },
      openingHours: { lines: b.openingHours ?? null, verified: Boolean(b.openingHours?.length) },
      phone: { value: b.phone, verified: Boolean(b.phone) },
      brandIdentity: { tone: "warm and professional", styleKeywords: ["modern", "local", "trustworthy"], existingColors: [] },
      existingWebsite: { url: b.websiteUrl, summary: null, strengths: [], weaknesses: b.websiteUrl ? ["Mock audit only"] : ["No website found"] },
      competitors: [],
      targetAudience: ["Local residents", "Visitors to the city"],
      improvements: ["Mobile-first layout", "Clear call to action", "Visible opening hours and contact details"],
      verifiedFacts: [
        { fact: `Business name: ${b.name}`, source: "Google Places listing (mock)" },
        ...(b.address ? [{ fact: `Address: ${b.address}`, source: "Google Places listing (mock)" }] : []),
      ],
      assumptions: [{ assumption: "Customers are mostly local", rationale: "Typical for this category (mock)" }],
      missingInformation: ["Service list", "Brand colours", "Photos the business owns"],
    },
    brief: {
      goals: ["Make it easy to contact or book", "Present the business professionally on mobile"],
      primaryCta: b.category === "restaurant" ? "Reserve a table" : "Contact us",
      secondaryCta: b.phone ? "Call now" : null,
      recommendedSections: ["hero", "about", "services", "hours", "contact"],
      tone: "Warm, clear and professional",
      keyMessages: [`Local ${label.toLowerCase()} in ${b.city ?? "your area"}`],
      seoKeywords: [`${label.toLowerCase()} ${b.city ?? ""}`.trim()],
      designDirection: "Clean, modern and photo-led",
      mustNotInclude: ["Invented reviews", "Invented prices", "Invented awards"],
    },
  };
}

export const research: AgentHandler = async (ctx) => {
  const businessId = ctx.task.businessId;
  if (!businessId) throw new Error("Research task has no business");
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, ctx.organizationId)));
  if (!b) throw new Error("Business not found");
  await db().update(schema.businesses).set({ researchStatus: "in_progress" }).where(eq(schema.businesses.id, b.id));
  await ctx.log("info", `${stageLabel(1)}: reading the listing and the current website of ${b.name}`, stageEvent(1, "running"));

  const mode = await ctx.mode("anthropic");
  if (mode === "unavailable") throw new IntegrationUnavailableError("anthropic");
  let result: ResearchOutput;
  let model: string | null = null;
  const sources: string[] = [];
  if (b.googleMapsUrl) sources.push(b.googleMapsUrl);

  if (mode === "mock") {
    await ctx.log("warn", "Anthropic not configured — generating MOCK research.");
    result = mockResearch(b);
  } else {
    const audit = b.websiteAudit as { contactPageUrl?: string | null } | null;
    const pages = b.websiteUrl && b.websiteStatus === "has_website" && !b.isMock ? await gatherWebsiteText(b.websiteUrl, audit?.contactPageUrl) : [];
    sources.push(...pages.map((p) => p.url));
    const competitors = await db()
      .select({ name: schema.businesses.name, rating: schema.businesses.rating, website: schema.businesses.websiteUrl })
      .from(schema.businesses)
      .where(and(eq(schema.businesses.organizationId, ctx.organizationId), eq(schema.businesses.category, b.category), eq(schema.businesses.city, b.city ?? ""), ne(schema.businesses.id, b.id)))
      .limit(5);
    const listing = {
      name: b.name,
      category: categoryLabel(b.category),
      address: b.address,
      city: b.city,
      country: b.country,
      phone: b.phone,
      website: b.websiteUrl,
      websiteStatus: b.websiteStatus,
      googleRating: b.rating,
      googleReviewCount: b.reviewCount,
      openingHours: b.openingHours,
      websiteAudit: b.websiteAudit,
    };
    await ctx.heartbeat();
    const res = await claudeStructured({
      ctx: ctx.usage,
      operation: "business_research",
      schema: researchSchema,
      model: ctx.config.model,
      effort: (ctx.config.effort as "medium") ?? "medium",
      maxTokens: 16000,
      system: `You are the Business Research Agent of a website agency. You build a structured, factual business profile and a website brief.
Rules:
- A fact is "verified" only if it appears in the Google Places listing or on the business's own website pages provided below. Cite the source (e.g. "Google Places listing" or the page URL).
- Anything inferred is an assumption: list it under assumptions with a rationale.
- Never invent reviews, awards, certifications, prices, opening hours, addresses, phone numbers or claims. If unknown, add it to missingInformation.
- Competitors: only use the competitor list supplied (businesses already in our database). Do not invent competitors.
- The brief's mustNotInclude must always list invented reviews/testimonials, invented prices and invented awards.
Agency instructions from the operator: ${ctx.config.instructions || "(none)"}`,
      prompt: [
        "Google Places listing (trusted structured data):",
        JSON.stringify(listing, null, 2),
        "",
        "Nearby businesses in the same category (from our database):",
        JSON.stringify(competitors, null, 2),
        "",
        pages.length ? "Content of the business's own website:" : "No website content is available (no website found or it could not be fetched).",
        ...pages.map((p) => untrusted(p.url, p.text)),
        "",
        "Produce the profile and website brief.",
      ].join("\n"),
    });
    result = res.data;
    model = res.model;
  }

  await db().insert(schema.businessResearch).values({
    organizationId: ctx.organizationId,
    businessId: b.id,
    profile: result.profile as unknown as Record<string, unknown>,
    brief: result.brief as unknown as Record<string, unknown>,
    sources,
    model,
    isMock: mode === "mock",
  });
  await db().update(schema.businesses).set({ researchStatus: "done", updatedAt: new Date() }).where(eq(schema.businesses.id, b.id));
  await advanceStage(b.id, "ANALYSED", ctx.organizationId);
  await ctx.log("info", `${stageLabel(1)}: profile and website brief written`, stageEvent(1, "completed"));
  await ctx.log("info", `Research complete: ${result.profile.verifiedFacts.length} verified facts, ${result.profile.assumptions.length} assumptions, ${result.profile.missingInformation.length} gaps.`);

  await continuePipeline(ctx, { businessId: b.id, next: (ctx.task.input.next as string[]) ?? [] });
  return { status: "completed", output: { verifiedFacts: result.profile.verifiedFacts.length, missing: result.profile.missingInformation, mock: mode === "mock" } };
};
