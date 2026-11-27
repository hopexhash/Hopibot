import type { Viewport } from "next";
import "@/demos/kit.css";

/**
 * Root layout of the demo websites (/demos/...). Each demo is a complete website for a
 * fictional business, with its own type, colours and motion; none of HOPI's own chrome is
 * loaded here. The only shared element is the floating bar that leads back to HOPI.
 */
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        {/* Before first paint: reveal-on-scroll only hides things when scripts run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('demo-js')" }} />
        {children}
      </body>
    </html>
  );
}
