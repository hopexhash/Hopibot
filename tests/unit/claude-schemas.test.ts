import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { describe, expect, it } from "vitest";
import { siteSpecSchema } from "@/lib/site-spec";
import { researchSchema } from "@/server/agents/research";
import { planSchema } from "@/server/orchestrator/runs";

describe("schemas sent to Claude", () => {
  // Zod transforms and similar features cannot be expressed as JSON Schema; a schema that
  // fails here breaks the feature at run time, and only with a real API key.
  it.each([
    ["objective plan", planSchema],
    ["website spec", siteSpecSchema],
    ["research profile", researchSchema],
  ])("%s converts to a structured-output format", (_name, schema) => {
    expect(() => betaZodOutputFormat(schema as never)).not.toThrow();
  });

  it("the plan only accepts the supported markets", () => {
    const base = { summary: "x", discovery: { city: "Gent", category: "restaurant", radiusKm: 5, limit: 5, minScore: 40, keywords: "", businessName: "", websiteStatus: "any" }, topN: 0, actions: [] };
    expect(planSchema.safeParse({ ...base, discovery: { ...base.discovery, country: "Belgium" } }).success).toBe(true);
    expect(planSchema.safeParse({ ...base, discovery: { ...base.discovery, country: "Germany" } }).success).toBe(false);
  });
});
