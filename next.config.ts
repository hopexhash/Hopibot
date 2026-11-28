import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const ASSET_CACHE = [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }];
const FONT_CACHE = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=31536000" }];

const nextConfig: NextConfig = {
  // Every dashboard route is authenticated and organisation-specific, so there is no
  // static shell to prerender; see docs/ARCHITECTURE.md §9.
  cacheComponents: false,
  poweredByHeader: false,
  // The public website and the control room have separate root layouts; unmatched URLs get
  // one neutral 404 page (src/app/global-not-found.tsx).
  experimental: { globalNotFound: true },
  // Worker-only dependencies must never be bundled into the web server.
  serverExternalPackages: ["playwright", "playwright-core", "bullmq", "ioredis", "postgres"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The first portfolio (nine small concept sites) was replaced by twelve complete demo
  // websites. Old addresses lead to the demo that took their place.
  async redirects() {
    const moved: Record<string, string> = {
      "de-gouden-lepel": "restaurant",
      "koffiebar-noord": "restaurant",
      "beauty-by-noor": "beauty-salon",
      "barbershop-the-gents": "beauty-salon",
      "garage-jansen": "automotive",
      "bouwbedrijf-de-vries": "construction",
      "loodgieter-bakker": "construction",
      "tandartspraktijk-centrum": "dental",
      "makelaardij-maas": "real-estate",
    };
    return [
      { source: "/demos", destination: "/werk", permanent: false },
      // Pages that were taken off the site: visitors and search engines land on the closest page.
      { source: "/ai-website-laten-maken", destination: "/website-laten-maken", permanent: true },
      { source: "/blog/hoe-werkt-een-ai-website-builder", destination: "/blog/website-laten-maken-of-zelf-bouwen", permanent: true },
      // Addresses people type or other sites link to: one hop to the page that answers them.
      { source: "/webshop-laten-maken", destination: "/website-laten-maken/webshop", permanent: true },
      { source: "/webdesign-bureau", destination: "/webdesign", permanent: true },
      { source: "/gratis-website-ontwerp", destination: "/gratis-websiteontwerp", permanent: true },
      { source: "/website-laten-maken/zzper", destination: "/website-laten-maken/zzp", permanent: true },
      ...Object.entries(moved).flatMap(([from, to]) => [
      { source: `/werk/${from}`, destination: `/werk/${to}`, permanent: true },
      { source: `/site/demo/${from}.html`, destination: `/demos/${to}`, permanent: true },
    ])];
  },
  // Short public address for a template's sample build: /voorbeeld/<template>(-<colourway>).
  async rewrites() {
    return [{ source: "/voorbeeld/:key([a-z0-9-]+)", destination: "/site-assets/templates/:key.html" }];
  },
  async headers() {
    return [
      { source: "/((?!p/).*)", headers: securityHeaders },
      // Demo websites of fictional businesses: viewable, never indexed.
      { source: "/demos/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/voorbeeld/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      { source: "/site-assets/templates/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
      // Public images and fonts. Their names carry no content hash (a screenshot can be shot
      // again under the same name), so they are not "immutable": browsers keep them a week
      // and may use a stale copy while fetching a new one. Nothing here is private.
      { source: "/demos/:slug/:file([^/]+\\.(?:webp|avif|jpg|jpeg|png|svg))", headers: ASSET_CACHE },
      { source: "/site/:file((?:work/)?[^/]+\\.(?:webp|avif|jpg|jpeg|png|svg))", headers: ASSET_CACHE },
      { source: "/site-assets/fonts/:file*", headers: FONT_CACHE },
    ];
  },
};

export default nextConfig;
