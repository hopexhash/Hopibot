import type { Viewport } from "next";
import { SiteRoot, siteMetadata } from "@/components/site/site-root";
import "./site.css";
import "./v3.css";

// Public pages are prerendered and refreshed in the background, so a visitor never waits
// for the database. Prices and company details follow Settings within a few minutes
// (saving Settings refreshes them at once).
export const revalidate = 300;

export const generateMetadata = () => siteMetadata("nl");

export const viewport: Viewport = { themeColor: "#0c0c0d", colorScheme: "light", width: "device-width", initialScale: 1 };

/** Root layout of the Dutch public website (English: src/app/(en); control room: src/app/(app)). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteRoot lang="nl">{children}</SiteRoot>;
}
