import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { JsonLd, PullGuy } from "@/components/site/parts";
import { Fx } from "@/components/site/fx";
import { Reveal, SiteAnalytics, StickyCta } from "@/components/site/site-client";
import { OG_IMAGE, organizationLd, SITE_URL, websiteLd } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";
import "./site.css";
import "./v3.css";

// The three typefaces of the public website, loaded once for every page and handed to the
// stylesheets as variables (see the type tokens at the top of v3.css):
//   Space Grotesk  headings and everything set large
//   General Sans   text (a variable font, so in-between weights such as 450 exist)
//   IBM Plex Mono  small uppercase labels and numbers
const display = Space_Grotesk({ variable: "--f-display", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const body = localFont({ src: "../../fonts/GeneralSans-Variable.woff2", variable: "--f-body", weight: "200 700", style: "normal", display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--f-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });

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

const BOOT = `(function(){var d=document.documentElement;d.classList.add('fx');d.style.setProperty('--vh0',innerHeight+'px');try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'&&(location.hash||location.pathname==='/')){history.scrollRestoration='manual';if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);var top=function(){scrollTo({top:0,left:0,behavior:'instant'})};top();addEventListener('load',function(){top();setTimeout(function(){history.scrollRestoration='auto'},600)})}}catch(e){}try{if(sessionStorage.getItem('hopi-pt')){sessionStorage.removeItem('hopi-pt');d.classList.add('pt-cover','pt-boot');setTimeout(function(){d.classList.remove('pt-boot');if(d.classList.contains('pt-cover')&&!d.classList.contains('pt-reveal'))d.classList.remove('pt-cover')},6000)}}catch(e){}})()`;

export const viewport: Viewport = { themeColor: "#0c0c0d", colorScheme: "light", width: "device-width", initialScale: 1 };

/** Root layout of the public website (the control room has its own, see src/app/(app)). */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  return (
    // data-scroll-behavior: the stylesheet scrolls smoothly to in-page anchors; this tells the
    // router to jump straight to the top when another page opens instead.
    <html lang="nl" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`hopi v3 ${display.variable} ${body.variable} ${mono.variable}`}>
        {/* Before the first paint:
            - mark the page as scripted (text that animates in is never shown and then hidden) and
              record the screen height once (phones: see --vh0 in the stylesheets);
            - a reload starts the page over: the section in the address (#contact) is dropped and
              the page opens at the top, instead of jumping back to where it was. A first visit
              through a link to a section still goes to that section. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        <PullGuy />
        {/* The page is one opaque sheet: whatever lies behind it only shows when it is pulled away. */}
        <div className="pg">{children}</div>
        <Fx />
        <StickyCta from={data.fromCents !== null ? data.prices.from : null} />
        <Reveal />
        <SiteAnalytics gaId={data.site.gaId} gtmId={data.site.gtmId} />
        <JsonLd data={organizationLd({ name: data.name, email: data.email, phone: data.phone, address: data.address, kvk: data.kvk, googleBusinessUrl: data.site.googleBusinessUrl, fromCents: data.fromCents })} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  );
}
