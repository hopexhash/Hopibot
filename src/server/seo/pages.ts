import "../guard";
import sitemap from "@/app/sitemap";
import { ARTICLES } from "@/lib/site/blog";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { PROJECTS } from "@/lib/site/projects";
import { getSiteData } from "../site";

export type PublicPage = { path: string; kind: "home" | "landing" | "article" | "project" | "page"; label: string; inSitemap: boolean; keyword?: string };

/**
 * Every public page the SEO control center manages: the sitemap, plus pages an editor has
 * set to noindex (they left the sitemap but can still be edited back).
 */
export async function publicPages(): Promise<PublicPage[]> {
  const entries = await sitemap();
  const inMap = new Set(entries.map((e) => new URL(e.url).pathname || "/"));
  const overridden = Object.keys((await getSiteData()).seo.pages);
  const paths = [...new Set([...inMap, ...overridden])];
  return paths.map((path) => {
    const l = ALL_LANDINGS.find((x) => x.path === path);
    const a = ARTICLES.find((x) => `/blog/${x.slug}` === path);
    const p = PROJECTS.find((x) => `/werk/${x.key}` === path);
    return {
      path,
      kind: path === "/" ? "home" : l ? "landing" : a ? "article" : p ? "project" : "page",
      label: l?.label ?? a?.title ?? (p ? `Werk: ${p.key}` : path === "/" ? "Homepage" : path),
      inSitemap: inMap.has(path),
      keyword: l?.keywords.primary ?? a?.keyword,
    };
  });
}
