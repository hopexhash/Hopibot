import type { SiteSpec } from "@/lib/site-spec";
import { sample as snuf } from "./snuf";
import { sample as lexis } from "./lexis";
import { sample as vow } from "./vow";
import { sample as kinetik } from "./kinetik";
import { sample as voyage } from "./voyage";
import { sample as maison } from "./maison";
import { sample as stroom } from "./stroom";
import { sample as beton } from "./beton";
import { sample as monolith } from "./monolith";
import { sample as linnen } from "./linnen";
import { sample as skyline } from "./skyline";
import { sample as etoile } from "./etoile";
import { sample as aurum } from "./aurum";
import { sample as ivoor } from "./ivoor";
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
export const SAMPLE_SITES: Record<string, SiteSpec> = { apex, nimbus, vigor, cutline, serene, fjord, ivoor, aurum, etoile, skyline, linnen, monolith, beton, stroom, maison, voyage, kinetik, vow, lexis, snuf };
