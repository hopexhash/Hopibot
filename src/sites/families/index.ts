import type { Family } from "./kit";
import { kade } from "./kade";
import { meridiaan } from "./meridiaan";
import { sage } from "./sage";
import { vesper } from "./vesper";

/**
 * The template families: the demo websites of the portfolio, as templates the website
 * builder fills with a real business's verified content. The key of a family is the key of
 * its design (src/sites/designs.ts) and the slug of its demo (/demos/<key>).
 */
export const FAMILIES: Record<string, Family> = {
  vesper,
  sage,
  kade,
  meridiaan,
};

export const familyOf = (designKey: string | undefined): Family | undefined => (designKey ? FAMILIES[designKey] : undefined);
