import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { JsonLd, PullGuy } from "@/components/site/parts";
import { Fx } from "@/components/site/fx";
import { Reveal, SiteAnalytics, StickyCta } from "@/components/site/site-client";
import { OG_IMAGE, organizationLd, SITE_URL, websiteLd } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";
import "./site.css";
import "./v3.css";

// The small technical labels are Geist Mono everywhere. The text typeface is chosen per
// page (Geist on the homepage, Poppins on all others) and arrives as --font-ui.
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });

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

export const viewport: Viewport = { themeColor: "#0c0c0d", colorScheme: "light", width: "device-width", initialScale: 1 };

/** Root layout of the public website (the control room has its own, see src/app/(app)). */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  return (
    // data-scroll-behavior: the stylesheet scrolls smoothly to in-page anchors; this tells the
    // router to jump straight to the top when another page opens instead.
    <html lang="nl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`hopi v3 ${mono.variable}`}>
        {/* Before the first paint: mark the page as scripted (text that animates in is never shown and
            then hidden) and record the screen height once (phones: see --vh0 in the stylesheets). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('fx');document.documentElement.style.setProperty('--vh0',innerHeight+'px')" }} />
        <PullGuy />
        {/* The page is one opaque sheet: whatever lies behind it only shows when it is pulled away. */}
        <div className="pg">{children}</div>
        <Fx />
        <StickyCta from={data.fromCents !== null ? data.prices.from : null} whatsapp={data.whatsapp} />
        <Reveal />
        <SiteAnalytics gaId={data.site.gaId} gtmId={data.site.gtmId} />
        <JsonLd data={organizationLd({ name: data.name, email: data.email, phone: data.phone, address: data.address, kvk: data.kvk, googleBusinessUrl: data.site.googleBusinessUrl, fromCents: data.fromCents })} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
