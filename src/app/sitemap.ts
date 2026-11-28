import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/site/blog";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { PROJECTS, projectPath } from "@/lib/site/projects";
import { counterpart, hasEnglish } from "@/lib/site/i18n";
import { abs } from "@/lib/site/seo";
import { noindexPaths } from "@/lib/site/seo-meta";

/** Last substantial edit of the static pages; articles carry their own dates. */
const CONTENT_UPDATED = "2026-11-28";

/** Every indexable page of the public website, and nothing else (pages set to noindex in the SEO control center leave it). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hidden = await noindexPaths();
  const page = (path: string, priority: number, lastModified = CONTENT_UPDATED, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: abs(path), lastModified, changeFrequency, priority });
  const nl = [
    page("/", 1, CONTENT_UPDATED, "weekly"),
    ...ALL_LANDINGS.map((l) => page(l.path, l.kind === "pillar" ? 0.9 : 0.8)),
    page("/prijzen", 0.9),
    page("/werk", 0.7),
    ...PROJECTS.map((p) => page(projectPath(p.key), 0.5)),
    page("/blog", 0.6, ARTICLES.map((a) => a.modified).sort().at(-1), "weekly"),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.6, a.modified)),
    page("/over-ons", 0.5, "2026-11-28"),
    page("/contact", 0.5, "2026-11-28"),
    page("/algemene-voorwaarden", 0.2, CONTENT_UPDATED, "yearly"),
    page("/privacy", 0.2, CONTENT_UPDATED, "yearly"),
    page("/cookies", 0.2, CONTENT_UPDATED, "yearly"),
  ];
  // Every page also exists in English (/en/...); both versions are listed, each with its
  // counterpart as an alternate language, and the English one a little below the Dutch.
  const withAlternates = (e: (typeof nl)[number], path: string) => ({
    ...e,
    alternates: { languages: hasEnglish(counterpart(path, "nl")) ? { nl: abs(counterpart(path, "nl")), en: abs(counterpart(path, "en")) } : { nl: abs(path) } },
  });
  const all = nl.flatMap((e) => {
    const path = new URL(e.url).pathname || "/";
    // A Dutch-only page (such as the one for Belgium) has no English entry.
    if (!hasEnglish(path)) return [withAlternates(e, path)];
    const en = counterpart(path, "en");
    return [withAlternates(e, path), withAlternates({ ...e, url: abs(en), priority: Math.round(e.priority * 0.9 * 10) / 10 }, en)];
  });
  return all.filter((e) => !hidden.has(new URL(e.url).pathname));
}
