import type { SiteSpec } from "@/lib/site-spec";
import { sample as fjord } from "./fjord";
import { sample as serene } from "./serene";
import { sample as cutline } from "./cutline";
import { sample as vigor } from "./vigor";
import { sample as nimbus } from "./nimbus";
import { sample as apex } from "./apex";

/**
 * Complete demo content per template family: a fictional business with realistic copy and
 * photography, shown in the template library and as a public concept demo. Families without
 * an entry use the generic sample business of scripts/render-family.tsx.
 */
export const SAMPLE_SITES: Record<string, SiteSpec> = { apex, nimbus, vigor, cutline, serene, fjord };
