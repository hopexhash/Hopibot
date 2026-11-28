import type { Viewport } from "next";
import { SiteRoot, siteMetadata } from "@/components/site/site-root";
import "../(site)/site.css";
import "../(site)/v3.css";

// Same refresh rhythm as the Dutch website.
export const revalidate = 300;

export const generateMetadata = () => siteMetadata("en");

export const viewport: Viewport = { themeColor: "#0c0c0d", colorScheme: "light", width: "device-width", initialScale: 1 };

/** Root layout of the English public website (/en). Same look and engine as the Dutch one. */
export default function EnglishSiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteRoot lang="en">{children}</SiteRoot>;
}
