import { selectDesign } from "@/lib/design-select";
import { buildBlueprintSpec, type BlueprintBusiness } from "@/lib/site-blueprints";
import type { SiteSpec } from "@/lib/site-spec";

/** The design a business gets by default (category + name signals). */
export function designFor(b: { category: string; name: string }): string {
  return selectDesign(b).design.key;
}

/** Deterministic, fact-safe SiteSpec used in mock mode and as the base Claude personalises. */
export function buildMockSpec(b: BlueprintBusiness, designKey?: string): SiteSpec {
  return buildBlueprintSpec(b, designKey ?? designFor(b));
}
