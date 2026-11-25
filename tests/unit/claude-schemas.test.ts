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

describe("guided JSON output", () => {
  it("reads JSON with fences or surrounding text", async () => {
    const { extractJson } = await import("@/server/integrations/anthropic");
    expect(extractJson('```json\n{"a":1}\n```')).toEqual({ a: 1 });
    expect(extractJson('Here you go: {"a":{"b":2}} — done')).toEqual({ a: { b: 2 } });
    expect(extractJson("no json here")).toBeUndefined();
  });

  it("trims over-long texts and lists to the schema limits instead of failing", async () => {
    const { trimToLimits } = await import("@/server/integrations/anthropic");
    const { z } = await import("zod");
    const schema = z.object({ title: z.string().max(20), tags: z.array(z.string()).max(2), nested: z.object({ note: z.string().max(10) }) });
    const doc = { title: "A headline that is clearly much too long", tags: ["a", "b", "c", "d"], nested: { note: "this is far too long" } };
    const first = schema.safeParse(doc);
    expect(first.success).toBe(false);
    if (!first.success) expect(trimToLimits(doc, first.error.issues)).toBe(true);
    const second = schema.safeParse(doc);
    expect(second.success).toBe(true);
    expect(doc.title.length).toBeLessThanOrEqual(20);
    expect(doc.tags).toHaveLength(2);
  });
});
