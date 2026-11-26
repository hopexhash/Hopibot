import { Manrope } from "next/font/google";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "800"], display: "swap" });

/** The customer-facing purchase experience has its own light, Manrope-based identity. */
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <div className={manrope.variable}>{children}</div>;
}
