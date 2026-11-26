import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./site.css";

const display = Instrument_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });
const sans = Inter_Tight({ variable: "--font-text", subsets: ["latin"], display: "swap" });

const url = process.env.APP_URL ?? "https://hopibot.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "HOPI | Websites voor ondernemers in Nederland en België", template: "%s | HOPI" },
  description: "HOPI ontwerpt en bouwt moderne websites voor ondernemers. U ziet eerst gratis een ontwerp van uw eigen website; pas als het u bevalt, gaan we verder.",
  // The public website may be found; the control room keeps the root layout's noindex.
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "nl_NL", siteName: "HOPI", title: "HOPI | Websites die klanten opleveren", description: "Eerst gratis een ontwerp van uw eigen website. Vaste prijzen, gemaakt voor mobiel.", images: ["/site/work/garage-jansen-d.jpg"] },
  appleWebApp: { capable: false, title: "HOPI" },
};

export const viewport: Viewport = { themeColor: "#f4f1ea", colorScheme: "light" };

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="nl" className={`hopi ${display.variable} ${sans.variable}`}>
      {children}
    </div>
  );
}
