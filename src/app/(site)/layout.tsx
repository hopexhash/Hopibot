import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/site/parts";
import { Reveal, SiteAnalytics, StickyCta } from "@/components/site/site-client";
import { OG_IMAGE, organizationLd, SITE_URL, websiteLd } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";
import "./site.css";

// One family for headlines and running text: Plus Jakarta Sans, a geometric sans that stays
// friendly at large sizes and readable at small ones. (site.css points --font-display at it.)
const sans = Plus_Jakarta_Sans({ variable: "--font-text", subsets: ["latin"], display: "swap" });

// Public pages are prerendered and refreshed in the background, so a visitor never waits
// for the database. Prices and company details follow Settings within a few minutes
// (saving Settings refreshes them at once).
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: "HOPI | Website laten maken: eerst zien, dan betalen", template: "%s | HOPI" },
    description: "HOPI ontwerpt en bouwt websites voor ondernemers in Nederland en België. Je ziet eerst gratis een ontwerp van je eigen website en betaalt pas als het bevalt.",
    applicationName: "HOPI",
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: { type: "website", locale: "nl_NL", siteName: "HOPI", images: [{ url: OG_IMAGE, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image" },
    formatDetection: { telephone: false },
    ...(data.site.googleVerification ? { verification: { google: data.site.googleVerification } } : {}),
  };
}

export const viewport: Viewport = { themeColor: "#f7f8f6", colorScheme: "light", width: "device-width", initialScale: 1 };

/** Root layout of the public website (the control room has its own, see src/app/(app)). */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  return (
    // data-scroll-behavior: the stylesheet scrolls smoothly to in-page anchors; this tells the
    // router to jump straight to the top when another page opens instead.
    <html lang="nl" data-scroll-behavior="smooth">
      <body className={`hopi ${sans.variable}`}>
        {children}
        <StickyCta from={data.fromCents !== null ? data.prices.from : null} whatsapp={data.whatsapp} />
        <Reveal />
        <SiteAnalytics gaId={data.site.gaId} gtmId={data.site.gtmId} />
        <JsonLd data={organizationLd({ name: data.name, email: data.email, phone: data.phone, address: data.address, kvk: data.kvk, googleBusinessUrl: data.site.googleBusinessUrl, fromCents: data.fromCents })} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
