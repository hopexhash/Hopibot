import "../guard";
import sitemap from "@/app/sitemap";
import { ARTICLES } from "@/lib/site/blog";
import { ARTICLES_EN } from "@/lib/site/blog.en";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { ALL_LANDINGS_EN } from "@/lib/site/landing.en";
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
    const l = [...ALL_LANDINGS, ...ALL_LANDINGS_EN].find((x) => x.path === path);
    const a = ARTICLES.find((x) => `/blog/${x.slug}` === path) ?? ARTICLES_EN.find((x) => `/en/blog/${x.slug}` === path);
    const p = PROJECTS.find((x) => `/werk/${x.key}` === path || `/en/work/${x.key}` === path);
    return {
      path,
      kind: path === "/" || path === "/en" ? "home" : l ? "landing" : a ? "article" : p ? "project" : "page",
      label: l?.label ?? a?.title ?? (p ? `${path.startsWith("/en/") ? "Work" : "Werk"}: ${p.key}` : path === "/" ? "Homepage" : path === "/en" ? "Homepage (English)" : path),
      inSitemap: inMap.has(path),
      keyword: l?.keywords.primary ?? a?.keyword,
    };
  });
}
