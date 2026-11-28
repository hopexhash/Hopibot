import type { Metadata } from "next";
import { getSiteData } from "@/server/site";
import { abs, pageMeta, SITE_URL } from "./seo";

/**
 * Metadata of a public page with the overrides from the SEO control center applied: an
 * edited title or description, another canonical URL, or noindex. Without overrides this is
 * exactly pageMeta().
 */
export async function seoMeta(p: Parameters<typeof pageMeta>[0]): Promise<Metadata> {
  const base = pageMeta(p);
  let o: { title: string; description: string; canonical: string; noindex: boolean } | undefined;
  try {
    o = (await getSiteData()).seo.pages[p.path];
  } catch {
    o = undefined;
  }
  if (!o) return base;
  const title = o.title.trim() || p.title;
  const description = o.description.trim() || p.description;
  const canonical = canonicalOf(o.canonical, p.path);
  return {
    ...base,
    title: { absolute: title },
    description,
    alternates: { ...base.alternates, canonical },
    openGraph: { ...base.openGraph, title, description, url: canonical },
    twitter: { ...base.twitter, title, description },
    ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** An override canonical: a path on this site or a full URL on this site's domain; anything else falls back to the page itself. */
export function canonicalOf(value: string, path: string) {
  const v = value.trim();
  if (!v) return path;
  if (v.startsWith("/")) return v;
  try {
    const u = new URL(v);
    return u.origin === new URL(SITE_URL).origin ? u.pathname + u.search : path;
  } catch {
    return path;
  }
}

/** Paths an editor switched to noindex: they leave the sitemap as well. */
export async function noindexPaths(): Promise<Set<string>> {
  try {
    const pages = (await getSiteData()).seo.pages;
    return new Set(Object.entries(pages).filter(([, v]) => v.noindex).map(([k]) => k));
  } catch {
    return new Set();
  }
}

export { abs };
