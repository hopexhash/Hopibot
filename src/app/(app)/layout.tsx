import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/app/providers";
import { FONT_VARIABLES } from "@/lib/site/fonts";
import "../globals.css";

// Neutral on purpose: error pages and customer-facing pages (/d, /u) render inside this
// layout, so nothing here may mention the control room.
export const metadata: Metadata = {
  title: { default: "HOPI", template: "%s · HOPI" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f2eee6",
  colorScheme: "light",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

/** The typefaces of wearehopi.nl (Space Grotesk, General Sans, IBM Plex Mono), self-hosted. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${FONT_VARIABLES} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
