import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site/seo";

/**
 * Crawlers may read the public website. Customer previews (/p, /d), unsubscribe links (/u)
 * and APIs are kept out; the live demo designs of fictional businesses carry noindex
 * themselves and stay crawlable so that directive can be seen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/p/", "/d/", "/u/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
