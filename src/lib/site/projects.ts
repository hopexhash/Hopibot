import { DEMOS, type Demo } from "@/demos/catalog";
import { DEMO_EN } from "@/demos/catalog.en";
import type { Locale } from "./i18n";
import { workByKey, type Work } from "./work";

/**
 * Selected work of the public website. Every entry is a CONCEPT: a complete demo website HOPI
 * made for a fictional business to show what we deliver. None of these is a client project,
 * and every place that shows them says so. A real client project gets `concept: false` and
 * its own text.
 */
export type Project = {
  key: string;
  /** Industry as shown on the site. */
  industry: string;
  city: string;
  services: string[];
  /** Dominant colour of the design, used for the accent of its panel and page. */
  tone: string;
  on: string;
  line: string;
  summary: string;
  /** The design concept: what was decided and why. */
  idea: string;
  /** What the website contains. */
  sections: string[];
  /** Typefaces of the design. */
  type: string;
  concept: true;
};

const SERVICES = ["Concept", "Webdesign", "Development", "Copy"];

const project = (d: Demo): Project => ({ key: d.slug, industry: d.category, city: d.city, services: SERVICES, tone: d.tone, on: d.on, line: d.line, summary: d.summary, idea: d.concept, sections: d.sections, type: d.type, concept: true });

export const PROJECTS: Project[] = DEMOS.map(project);

export type ProjectView = Project & { work: Work };
const view = (p: Project): ProjectView => ({ ...p, work: workByKey(p.key)! });

export const allProjects = (): ProjectView[] => PROJECTS.map(view);
/** The six shown on the homepage. */
export const selectedProjects = (): ProjectView[] => PROJECTS.slice(0, 6).map(view);
export const projectByKey = (key: string): ProjectView | undefined => {
  const p = PROJECTS.find((x) => x.key === key);
  return p ? view(p) : undefined;
};
export const projectPath = (key: string) => `/werk/${key}`;

/** A project with its texts in the given language (names, cities and typefaces stay as they are). */
export function inLang<T extends Project & { work?: Work }>(p: T, lang: Locale): T {
  if (lang === "nl") return p;
  const e = (DEMO_EN as Record<string, (typeof DEMO_EN)[keyof typeof DEMO_EN] | undefined>)[p.key];
  if (!e) return p;
  return { ...p, industry: e.category, line: e.line, summary: e.summary, idea: e.concept, sections: e.sections, ...(p.work ? { work: { ...p.work, type: e.category, note: e.line } } : {}) };
}
/** Address of a project page in the given language. */
export const projectPathIn = (key: string, lang: Locale) => (lang === "en" ? `/en/work/${key}` : `/werk/${key}`);
