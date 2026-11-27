import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

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
      ...Object.entries(moved).flatMap(([from, to]) => [
      { source: `/werk/${from}`, destination: `/werk/${to}`, permanent: true },
      { source: `/site/demo/${from}.html`, destination: `/demos/${to}`, permanent: true },
    ])];
  },
  async headers() {
    return [
      { source: "/((?!p/).*)", headers: securityHeaders },
      // Demo websites of fictional businesses: viewable, never indexed.
      { source: "/demos/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }] },
    ];
  },
};

export default nextConfig;
