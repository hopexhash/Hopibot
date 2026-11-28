import type { Family } from "./kit";
import { aerden } from "./aerden";
import { ambacht } from "./ambacht";
import { antipode } from "./antipode";
import { brasa } from "./brasa";
import { forge } from "./forge";
import { helder } from "./helder";
import { kade } from "./kade";
import { lune } from "./lune";
import { meridiaan } from "./meridiaan";
import { noord } from "./noord";
import { obsidian } from "./obsidian";
import { ostara } from "./ostara";
import { sage } from "./sage";
import { veldwerk } from "./veldwerk";
import { zondag } from "./zondag";
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
  obsidian,
  forge,
  aerden,
  lune,
  helder,
  ostara,
  veldwerk,
  antipode,
  brasa,
  noord,
  ambacht,
  zondag,
};

export const familyOf = (designKey: string | undefined): Family | undefined => (designKey ? FAMILIES[designKey] : undefined);
