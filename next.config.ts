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
  async headers() {
    return [{ source: "/((?!p/).*)", headers: securityHeaders }];
  },
};

export default nextConfig;
