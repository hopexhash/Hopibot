import type { SiteSpec } from "@/lib/site-spec";

import { contrast, ensureContrast, mix } from "./color";

export { contrast, ensureContrast, mix };

import { designForSpec } from "./designs";
import { fontStack } from "./fonts";

const onColor = (c: string) => (contrast("#111111", c) >= contrast("#ffffff", c) ? "#111111" : "#ffffff");

/** CSS custom properties for a site: the design's identity plus the brand's own primary/accent colours. */
export function themeVars(theme: SiteSpec["theme"]): Record<string, string> {
  const design = designForSpec(theme);
  const p = design.palette;
  // Specs created for a design carry a brand palette; legacy specs keep the design's own colours.
  const primary = theme.identity ? p.primary : theme.design ? theme.primary : p.primary;
  // Button colour: nudged until its label reaches WCAG AA, so brand colours can never produce unreadable buttons.
  let accent = theme.identity ? p.accent : theme.design ? theme.accent : p.accent;
  for (let i = 0; i < 12 && contrast(onColor(accent), accent) < 4.5; i++) accent = mix(accent, onColor(accent) === "#ffffff" ? "#000000" : "#ffffff", 0.06);
  const dark = design.mode === "dark";
  const radius = { sharp: ["0px", "2px", "3px", "0px"], soft: ["8px", "14px", "20px", "10px"], round: ["14px", "24px", "34px", "999px"] }[design.radius];
  const f = design.fonts;
  const shadow = dark ? "rgba(0,0,0," : `${mix(p.ink, "#000000", 0.3)}`;
  const sh = (a: number, hex: string) => (dark ? `${shadow}${a})` : `${shadow}${hex}`);
  return {
    "--bg": p.bg,
    "--bg-alt": p.alt,
    "--surface": p.surface,
    "--soft": mix(p.bg, p.ink, dark ? 0.08 : 0.05),
    "--soft-accent": mix(p.surface, accent, dark ? 0.18 : 0.12),
    "--text": p.text,
    "--heading": p.ink,
    "--muted": ensureContrast(p.muted, p.alt, 4.5),
    "--line": mix(p.bg, p.ink, dark ? 0.13 : 0.12),
    "--line-strong": mix(p.bg, p.ink, dark ? 0.26 : 0.24),
    "--primary": primary,
    "--on-primary": onColor(primary),
    "--accent": accent,
    "--accent-text": ensureContrast(accent, p.alt, 4.5),
    "--accent-strong": mix(accent, dark ? "#ffffff" : "#000000", 0.14),
    "--on-accent": onColor(accent),
    "--footer-bg": p.footer,
    "--footer-text": ensureContrast(p.footerInk, p.footer, 4.5),
    "--footer-heading": onColor(p.footer),
    "--font-heading": fontStack(f.display),
    "--font-body": fontStack(f.body),
    "--font-accent": fontStack(f.accent ?? f.display),
    "--heading-weight": String(f.weight),
    "--heading-style": f.italic ? "italic" : "normal",
    "--heading-case": f.upper ? "uppercase" : "none",
    "--heading-track": f.tracking,
    "--heading-lh": String(f.lineHeight),
    "--hs": String(f.scale),
    "--sec": { airy: "150px", balanced: "118px", compact: "88px" }[design.density ?? "balanced"],
    "--r-sm": radius[0],
    "--r-md": radius[1],
    "--r-lg": radius[2],
    "--r-btn": radius[3],
    "--shadow-md": `0 10px 30px -14px ${sh(0.6, "40")}`,
    "--shadow-lg": `0 24px 60px -24px ${sh(0.75, "55")}`,
    "--shadow-xl": `0 40px 90px -36px ${sh(0.8, "70")}`,
  };
}
