import type { SiteSpec } from "@/lib/site-spec";

const hexToRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (r: number[]) => `#${r.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;

export function mix(a: string, b: string, t: number) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return rgbToHex(x.map((v, i) => v + (y[i] - v) * t));
}

function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Darkens/lightens `fg` until it reaches the WCAG AA ratio against `bg`. */
export function ensureContrast(fg: string, bg: string, ratio = 4.5) {
  let c = fg;
  const towards = luminance(bg) > 0.4 ? "#000000" : "#ffffff";
  for (let i = 0; i < 20 && contrast(c, bg) < ratio; i++) c = mix(c, towards, 0.1);
  return c;
}

export function themeVars(theme: SiteSpec["theme"]): Record<string, string> {
  const { primary, accent, mode } = theme;
  const radius = { sharp: ["3px", "4px", "6px", "4px"], soft: ["10px", "16px", "22px", "12px"], round: ["14px", "22px", "30px", "999px"] }[theme.radius];
  const fontStack = (f: string) => `"${f}", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
  const base = {
    "--primary": primary,
    "--accent": accent,
    "--font-heading": fontStack(theme.font === "Inter" ? "Inter" : "Poppins"),
    "--font-body": fontStack("Inter"),
    "--heading-weight": "600",
    "--r-sm": radius[0],
    "--r-md": radius[1],
    "--r-lg": radius[2],
    "--r-btn": radius[3],
  };
  if (mode === "dark") {
    const bg = mix(primary, "#000000", 0.72);
    const surface = mix(bg, "#ffffff", 0.05);
    return {
      ...base,
      "--bg": bg,
      "--bg-alt": mix(bg, "#ffffff", 0.03),
      "--surface": surface,
      "--soft": mix(bg, "#ffffff", 0.07),
      "--soft-accent": mix(bg, accent, 0.16),
      "--text": "#d9d6d2",
      "--heading": "#ffffff",
      "--muted": ensureContrast("#a8a29e", surface, 4.5),
      "--line": "rgba(255,255,255,.09)",
      "--line-strong": "rgba(255,255,255,.18)",
      "--accent-text": ensureContrast(accent, surface, 4.5),
      "--accent-strong": mix(accent, "#ffffff", 0.12),
      "--on-accent": contrast("#111111", accent) >= contrast("#ffffff", accent) ? "#111111" : "#ffffff",
      "--footer-bg": mix(bg, "#000000", 0.45),
      "--footer-text": "#b8b3ad",
      "--shadow-md": "0 10px 30px -12px rgba(0,0,0,.6)",
      "--shadow-lg": "0 24px 60px -20px rgba(0,0,0,.75)",
      "--shadow-xl": "0 40px 90px -30px rgba(0,0,0,.8)",
    };
  }
  return {
    ...base,
    "--bg": "#ffffff",
    "--bg-alt": mix(primary, "#ffffff", 0.955),
    "--surface": "#ffffff",
    "--soft": mix(primary, "#ffffff", 0.94),
    "--soft-accent": mix(accent, "#ffffff", 0.86),
    "--text": "#334155",
    "--heading": mix(primary, "#0b0b10", 0.55),
    "--muted": "#5b6474",
    "--line": mix(primary, "#ffffff", 0.9),
    "--line-strong": mix(primary, "#ffffff", 0.8),
    "--accent-text": ensureContrast(accent, "#ffffff", 4.5),
    "--accent-strong": mix(accent, "#000000", 0.12),
    "--on-accent": contrast("#111111", accent) >= contrast("#ffffff", accent) ? "#111111" : "#ffffff",
    "--footer-bg": mix(primary, "#05050a", 0.6),
    "--footer-text": "#c7cad3",
    "--shadow-md": `0 10px 30px -14px ${mix(primary, "#000000", 0.4)}40`,
    "--shadow-lg": `0 24px 60px -24px ${mix(primary, "#000000", 0.4)}55`,
    "--shadow-xl": `0 40px 90px -36px ${mix(primary, "#000000", 0.4)}70`,
  };
}
