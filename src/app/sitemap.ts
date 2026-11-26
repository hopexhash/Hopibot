import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/site/blog";
import { ALL_LANDINGS } from "@/lib/site/landing";
import { PROJECTS, projectPath } from "@/lib/site/projects";
import { abs } from "@/lib/site/seo";

/** Last substantial edit of the static pages; articles carry their own dates. */
const CONTENT_UPDATED = "2026-11-26";

/** Every indexable page of the public website, and nothing else. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, lastModified = CONTENT_UPDATED, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: abs(path), lastModified, changeFrequency, priority });
  return [
    page("/", 1, CONTENT_UPDATED, "weekly"),
    ...ALL_LANDINGS.map((l) => page(l.path, l.kind === "pillar" ? 0.9 : 0.8)),
    page("/prijzen", 0.9),
    page("/werk", 0.7),
    ...PROJECTS.map((p) => page(projectPath(p.key), 0.5)),
    page("/blog", 0.6, ARTICLES.map((a) => a.modified).sort().at(-1), "weekly"),
    ...ARTICLES.map((a) => page(`/blog/${a.slug}`, 0.6, a.modified)),
    page("/algemene-voorwaarden", 0.2, CONTENT_UPDATED, "yearly"),
    page("/privacy", 0.2, CONTENT_UPDATED, "yearly"),
    page("/cookies", 0.2, CONTENT_UPDATED, "yearly"),
  ];
}
