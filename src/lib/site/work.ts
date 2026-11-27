import { DEMOS } from "@/demos/catalog";

/**
 * Portfolio of the public website. Every entry is a DEMO: a complete website HOPI designed
 * and built for a business that does not exist (see src/demos/catalog.ts), labelled as a demo
 * wherever it is shown. Real customer projects get `demo: false` and their own case study.
 */
export type Work = {
  key: string;
  name: string;
  type: string;
  /** Slug of the matching /website-laten-maken/<industry> page ("" when there is none). */
  industry: string;
  /** One line on what makes this design its own. */
  note: string;
  demo: true;
};

export const WORK: Work[] = DEMOS.map((d) => ({ key: d.slug, name: d.name, type: d.category, industry: d.industry ?? "", note: d.line, demo: true }));

export const workByKey = (key: string) => WORK.find((w) => w.key === key);
/** The live demo website. */
export const demoHref = (key: string) => `/demos/${key}`;
/** Portfolio screenshots made by scripts/shoot-demos.mjs. */
export const shot = (key: string, name: "d-1440" | "d-720" | "m-780" | "m-390" | "tall-960" | "scroll-720" | "mtall-390") => `/site/work/${key}-${name}.webp`;
