/**
 * Colourways of the template families: every family comes in its original colours (variation 0)
 * and two alternative colour schemes, so two businesses that get the same design still look
 * different. A colourway moves the hues of the design's own palette (backgrounds, text,
 * accents, glows and overlays alike), so every hand-picked relation between the colours of
 * the original stays intact: a dark design stays dark, a soft one stays soft.
 */

/** Moves the colours whose hue lies in [h0, h1] (wrapping past 360) and whose saturation and lightness lie in [s0, s1] and [l0, l1]. */
type Rule = { h: [number, number]; s?: [number, number]; l?: [number, number]; dh: number; ds?: number; dl?: number };
export type Colorway = { name: string; swatch: string; rules: Rule[] };

const any: [number, number] = [0, 360];

export const COLORWAYS: Record<string, Colorway[]> = {
  vesper: [
    { name: "Bordeaux", swatch: "#d39477", rules: [{ h: any, s: [0, 0.32], dh: -38, ds: 2.4, dl: 0.025 }, { h: any, s: [0.32, 1], dh: -30, ds: 1.1 }] },
    { name: "Forest", swatch: "#cbb56f", rules: [{ h: any, s: [0, 0.32], dh: 115, ds: 2, dl: 0.02 }, { h: any, s: [0.32, 1], dh: 10, ds: 1 }] },
  ],
  sage: [
    { name: "Blush", swatch: "#a8665b", rules: [{ h: [60, 120], dh: -95, ds: 2.4, dl: 0.02 }, { h: [15, 60], dh: -22, ds: 1.25 }] },
    { name: "Mist", swatch: "#4f6f79", rules: [{ h: [60, 120], dh: 100, ds: 1.4 }, { h: [15, 60], dh: 170, ds: 0.75 }] },
  ],
  kade: [
    { name: "Signal orange", swatch: "#f2621d", rules: [{ h: [30, 60], s: [0.5, 1], dh: -24, ds: 1, dl: 0.02 }] },
    { name: "Steel blue", swatch: "#5b8ef2", rules: [{ h: [30, 60], s: [0.5, 1], dh: 175, ds: 0.85, dl: 0.13 }, { h: [30, 60], s: [0, 0.5], dh: 170, ds: 0.8 }] },
  ],
  meridiaan: [
    { name: "Harbour", swatch: "#1e2a40", rules: [{ h: [110, 180], dh: 70, ds: 1.6 }] },
    { name: "Clay", swatch: "#4a2c22", rules: [{ h: [110, 180], dh: -135, ds: 1.5 }, { h: [25, 50], s: [0.3, 1], dh: -14, ds: 1.15 }] },
  ],
  forge: [
    { name: "Red", swatch: "#ff4049", rules: [{ h: [55, 90], dh: -75, ds: 1 }] },
    { name: "Electric blue", swatch: "#3da8ff", rules: [{ h: [55, 90], dh: 135, ds: 1 }] },
  ],
  obsidian: [
    { name: "Copper", swatch: "#ffb35c", rules: [{ h: [180, 240], s: [0, 0.35], dh: 185, ds: 0.8 }, { h: [180, 240], s: [0.35, 1], dh: 185, ds: 1, dl: -0.06 }] },
    { name: "Racing red", swatch: "#ff6a5e", rules: [{ h: [180, 240], s: [0, 0.35], dh: 150, ds: 0.3 }, { h: [180, 240], s: [0.35, 1], dh: 155, ds: 1, dl: -0.1 }] },
  ],
  aerden: [
    { name: "Bank green", swatch: "#17352b", rules: [{ h: [195, 235], dh: -62, ds: 1.05 }] },
    { name: "Slate", swatch: "#2a2e35", rules: [{ h: [195, 235], dh: 0, ds: 0.35 }, { h: [340, 15], s: [0.3, 1], dh: -18, ds: 1.05 }] },
  ],
  lune: [
    { name: "Olive", swatch: "#5f6a2e", rules: [{ h: [345, 25], s: [0.3, 1], dh: 62, ds: 0.9, dl: 0.03 }, { h: [25, 60], dh: 18, ds: 0.9 }] },
    { name: "Rose", swatch: "#a3344f", rules: [{ h: [345, 25], s: [0.3, 1], dh: -25, ds: 1.05, dl: 0.06 }, { h: [25, 60], dh: -32, ds: 1.4 }] },
  ],
  helder: [
    { name: "Blue", swatch: "#1b3a70", rules: [{ h: [150, 200], dh: 44, ds: 1.1 }] },
    { name: "Green", swatch: "#33451f", rules: [{ h: [150, 200], dh: -85, ds: 0.9 }] },
  ],
  veldwerk: [
    { name: "Emerald", swatch: "#4ff0a6", rules: [{ h: [180, 345], dh: -78, ds: 1 }] },
    { name: "Ember", swatch: "#ff8a5c", rules: [{ h: [180, 345], dh: 128, ds: 1 }, { h: [55, 95], dh: -38, ds: 1 }] },
  ],
  ostara: [
    { name: "Sage", swatch: "#577353", rules: [{ h: [0, 18], dh: 100, ds: 0.5 }, { h: [18, 50], dh: 52, ds: 0.75 }] },
    { name: "Coast", swatch: "#2f5c7c", rules: [{ h: [0, 18], dh: 190, ds: 0.85 }, { h: [18, 50], dh: 172, ds: 0.55 }] },
  ],
  brasa: [
    { name: "Blue plate", swatch: "#2f6fd6", rules: [{ h: [0, 22], s: [0.4, 1], dh: 207, ds: 0.85, dl: 0.02 }] },
    { name: "Berry & teal", swatch: "#c2306e", rules: [{ h: [0, 22], s: [0.4, 1], dh: -36, ds: 0.95 }, { h: [130, 170], dh: 38, ds: 1.1 }] },
  ],
  noord: [
    { name: "Sea", swatch: "#3c6f8f", rules: [{ h: [5, 40], s: [0.3, 1], l: [0, 0.8], dh: 185, ds: 0.8 }] },
    { name: "Moss", swatch: "#6a7a3a", rules: [{ h: [5, 40], s: [0.3, 1], l: [0, 0.8], dh: 52, ds: 0.75 }] },
  ],
  ambacht: [
    { name: "Forest", swatch: "#12402e", rules: [{ h: [195, 235], dh: -64, ds: 0.9 }] },
    { name: "Signal red", swatch: "#d93025", rules: [{ h: [195, 235], dh: 0, ds: 0.25 }, { h: [10, 35], s: [0.5, 1], dh: -19, ds: 0.95 }] },
  ],
  zondag: [
    { name: "Mint", swatch: "#5cc4a0", rules: [{ h: [30, 50], s: [0.4, 1], l: [0, 0.86], dh: 118, ds: 0.7 }] },
    { name: "Rose & lilac", swatch: "#e07a93", rules: [{ h: [30, 50], s: [0.4, 1], l: [0, 0.86], dh: -55, ds: 0.75 }, { h: [90, 130], dh: 160, ds: 1 }, { h: [10, 25], s: [0.4, 1], l: [0.6, 0.95], dh: -30, ds: 1 }] },
  ],
  velours: [
    { name: "Midnight", swatch: "#14233f", rules: [{ h: [140, 190], dh: 58, ds: 1.15 }] },
    { name: "Aubergine & rose gold", swatch: "#3a1838", rules: [{ h: [140, 190], dh: 140, ds: 0.85 }, { h: [330, 360], s: [0.3, 1], dh: -170, ds: 0.8 }, { h: [25, 55], s: [0.35, 1], l: [0, 0.8], dh: -22, ds: 0.85 }] },
  ],
  pulse: [
    { name: "Ultraviolet", swatch: "#6a2cff", rules: [{ h: [215, 250], dh: 32, ds: 1 }, { h: [355, 15], s: [0.5, 1], dh: 22, ds: 1 }] },
    { name: "Teal & magenta", swatch: "#0e9c8f", rules: [{ h: [215, 250], s: [0.8, 1], l: [0.3, 0.7], dh: -55, ds: 0.92, dl: -0.27 }, { h: [215, 250], dh: -55, ds: 0.8 }, { h: [355, 15], s: [0.5, 1], dh: -32, ds: 0.95 }] },
  ],
  atlas: [
    { name: "Cobalt", swatch: "#1d47e6", rules: [{ h: [345, 20], s: [0.5, 1], dh: 226, ds: 1, dl: 0.02 }] },
    { name: "Racing green", swatch: "#0f8a52", rules: [{ h: [345, 20], s: [0.5, 1], dh: 150, ds: 0.85, dl: -0.14 }] },
  ],
  puur: [
    { name: "Lilac & rose", swatch: "#9a55d4", rules: [{ h: [215, 250], l: [0, 0.6], dh: 42, ds: 0.95, dl: -0.06 }, { h: [215, 250], dh: 42, ds: 0.95 }, { h: [10, 30], s: [0.3, 1], dh: -14, ds: 1 }] },
    { name: "Sky & apricot", swatch: "#3f8fd6", rules: [{ h: [215, 250], l: [0, 0.6], dh: -26, ds: 1, dl: -0.08 }, { h: [215, 250], dh: -26, ds: 1 }, { h: [10, 30], s: [0.3, 1], dh: 14, ds: 1.05 }] },
  ],
  antipode: [
    { name: "Cobalt", swatch: "#3640f2", rules: [{ h: [0, 25], dh: 225, ds: 1 }, { h: [220, 250], dh: -225, ds: 1 }] },
    { name: "Mint", swatch: "#1fd19a", rules: [{ h: [0, 25], dh: 149, ds: 0.85, dl: -0.06 }, { h: [55, 95], dh: 247, ds: 1, dl: 0.04 }, { h: [220, 250], dh: 34, ds: 1 }] },
  ],
  flora: [
    { name: "Lavender", swatch: "#7d6a9e", rules: [{ h: [85, 175], dh: 150, ds: 0.8 }] },
    { name: "Petrol & peach", swatch: "#1f4f5e", rules: [{ h: [85, 175], dh: 46, ds: 1.1 }, { h: [0, 25], s: [0.2, 1], dh: 12, ds: 1.15 }] },
  ],
  frame: [
    { name: "Safelight", swatch: "#e5402e", rules: [{ h: [25, 50], s: [0.4, 1], dh: -30, ds: 1 }] },
    { name: "Cyan", swatch: "#3ec7d8", rules: [{ h: [25, 50], s: [0.4, 1], dh: 152, ds: 0.85 }] },
  ],
  shiro: [
    { name: "Indigo", swatch: "#27408a", rules: [{ h: [345, 25], s: [0.4, 1], l: [0, 0.75], dh: 214, ds: 0.75, dl: -0.06 }] },
    { name: "Matcha", swatch: "#5f7a2e", rules: [{ h: [345, 25], s: [0.4, 1], l: [0, 0.75], dh: 72, ds: 0.62, dl: -0.06 }] },
  ],
  torque: [
    { name: "Papaya", swatch: "#ff7a00", rules: [{ h: [38, 64], s: [0.5, 1], dh: -21, ds: 1 }] },
    { name: "Gulf blue", swatch: "#7cc4ea", rules: [{ h: [38, 64], s: [0.5, 1], dh: 150, ds: 0.68, dl: 0.12 }] },
  ],
  ledger: [
    { name: "Bottle green", swatch: "#1d6b45", rules: [{ h: [345, 15], s: [0.4, 1], dh: 152, ds: 0.75, dl: 0.02 }] },
    { name: "Ink blue", swatch: "#1f4b9c", rules: [{ h: [345, 15], s: [0.4, 1], dh: 220, ds: 0.75, dl: 0.04 }, { h: [30, 60], s: [0, 0.5], dh: 170, ds: 0.6 }] },
  ],
  kiosk: [
    { name: "Sorbet", swatch: "#ff7a45", rules: [{ h: [320, 345], s: [0.4, 1], dh: 50, ds: 1 }, { h: [150, 170], dh: 40, ds: 0.9 }] },
    { name: "Blue raspberry", swatch: "#3f8cff", rules: [{ h: [320, 345], s: [0.4, 1], dh: -115, ds: 1 }, { h: [150, 170], dh: -100, ds: 1.1 }] },
  ],
  apex: [
    { name: "Giallo", swatch: "#f2b705", rules: [{ h: [330, 20], s: [0.4, 1], dh: 52, ds: 1, dl: 0.04 }] },
    { name: "Blu", swatch: "#2f6bff", rules: [{ h: [330, 20], s: [0.4, 1], dh: -132, ds: 1, dl: 0.06 }] },
  ],
  nimbus: [
    { name: "Emerald", swatch: "#12b886", rules: [{ h: [185, 245], s: [0.3, 1], l: [0.2, 0.95], dh: -68, ds: 0.9, dl: -0.04 }] },
    { name: "Sunset", swatch: "#f0446a", rules: [{ h: [185, 245], s: [0.3, 1], l: [0.2, 0.95], dh: 122, ds: 0.95 }] },
  ],
  vigor: [
    { name: "Hyper pink", swatch: "#ff1f6c", rules: [{ h: [5, 30], s: [0.6, 1], dh: -31, ds: 1, dl: 0.02 }] },
    { name: "Signal yellow", swatch: "#ffc21a", rules: [{ h: [5, 30], s: [0.6, 1], dh: 27, ds: 1, dl: 0.04 }] },
  ],
  cutline: [
    { name: "Tobacco", swatch: "#c9a27a", rules: [{ h: [20, 50], s: [0.08, 1], l: [0.5, 1], dh: -6, ds: 2.6, dl: -0.06 }, { h: [20, 50], l: [0, 0.5], dh: -8, ds: 2.4, dl: 0.01 }] },
    { name: "Steel", swatch: "#b9c4cc", rules: [{ h: [20, 50], dh: 168, ds: 1.1 }] },
  ],
  serene: [
    { name: "Rosé", swatch: "#9a6b62", rules: [{ h: [20, 60], s: [0.2, 1], dh: -28, ds: 1.05 }, { h: [20, 60], s: [0, 0.2], dh: -22, ds: 1.2 }] },
    { name: "Celadon", swatch: "#5f7a68", rules: [{ h: [20, 60], s: [0.2, 1], dh: 105, ds: 0.75 }, { h: [20, 60], s: [0, 0.2], dh: 100, ds: 0.8 }] },
  ],
  fjord: [
    { name: "Pine", swatch: "#2f6a5a", rules: [{ h: [190, 225], dh: -45, ds: 0.9 }] },
    { name: "Dusk", swatch: "#5a4f86", rules: [{ h: [190, 225], dh: 45, ds: 0.85 }] },
  ],
  ivoor: [
    { name: "Stone", swatch: "#9aa7ad", rules: [{ h: [15, 65], s: [0, 0.3], dh: 165, ds: 0.42 }, { h: [15, 65], s: [0.3, 1], dh: 172, ds: 0.4, dl: 0.04 }] },
    { name: "Bronze", swatch: "#b5794a", rules: [{ h: [15, 65], l: [0.8, 1], dh: -6, ds: 0.85 }, { h: [15, 65], s: [0, 0.3], dh: -5, ds: 0.9 }, { h: [15, 65], s: [0.3, 1], dh: -13, ds: 1.4, dl: -0.06 }] },
  ],
  aurum: [
    { name: "Rose gold", swatch: "#b7745f", rules: [{ h: [25, 55], s: [0.3, 1], dh: -22, ds: 0.95 }, { h: [25, 55], s: [0, 0.3], dh: -18, ds: 1.2 }] },
    { name: "Platinum", swatch: "#7d8a92", rules: [{ h: [25, 55], s: [0.3, 1], dh: 170, ds: 0.22, dl: 0.02 }, { h: [25, 55], s: [0, 0.3], dh: 175, ds: 0.6 }] },
  ],
  etoile: [
    { name: "Bordeaux", swatch: "#b0586a", rules: [{ h: [30, 50], s: [0.3, 1], l: [0, 0.82], dh: -42, ds: 0.95 }, { h: [20, 50], s: [0, 0.3], l: [0, 0.3], dh: -32, ds: 1.6 }] },
    { name: "Midnight", swatch: "#8fb0d6", rules: [{ h: [20, 60], s: [0, 0.3], l: [0, 0.3], dh: 190, ds: 2.2 }, { h: [30, 50], s: [0.3, 1], l: [0, 0.82], dh: 178, ds: 0.75, dl: 0.04 }, { h: [30, 50], l: [0.82, 1], dh: 180, ds: 0.35 }] },
  ],
  skyline: [
    { name: "Ultraviolet", swatch: "#5b6cff", rules: [{ h: [300, 360], s: [0.4, 1], dh: -95, ds: 1 }, { h: [20, 45], s: [0.4, 1], dh: -60, ds: 1 }, { h: [240, 280], s: [0.4, 1], dh: -58, ds: 1 }] },
    { name: "Aqua", swatch: "#2ee6c9", rules: [{ h: [300, 360], s: [0.4, 1], dh: -170, ds: 0.95, dl: -0.04 }, { h: [20, 45], s: [0.4, 1], dh: 170, ds: 0.85 }, { h: [240, 280], s: [0.4, 1], dh: -50, ds: 1 }] },
  ],
  linnen: [
    { name: "Ink", swatch: "#33465a", rules: [{ h: [60, 140], s: [0.12, 1], dh: 128, ds: 1.05, dl: 0.01 }] },
    { name: "Terracotta", swatch: "#8a4a36", rules: [{ h: [60, 140], s: [0.12, 1], dh: -68, ds: 1.25 }, { h: [20, 45], s: [0.25, 1], l: [0, 0.8], dh: -10, ds: 1.1 }] },
  ],
  monolith: [
    { name: "Sandstone", swatch: "#4a4136", rules: [{ h: [190, 250], dh: -180, ds: 2.6 }] },
    { name: "Basalt blue", swatch: "#2b3747", rules: [{ h: [190, 250], dh: 4, ds: 3.4 }] },
  ],
  beton: [
    { name: "Signal blue", swatch: "#2443c9", rules: [{ h: [0, 30], s: [0.35, 1], dh: 218, ds: 0.85, dl: 0.02 }] },
    { name: "Site green", swatch: "#2f6b45", rules: [{ h: [0, 30], s: [0.35, 1], dh: 132, ds: 0.6, dl: -0.02 }] },
  ],
  stroom: [
    { name: "Teal & amber", swatch: "#0f8a80", rules: [{ h: [205, 235], s: [0.3, 1], dh: -48, ds: 0.8, dl: -0.13 }, { h: [5, 30], s: [0.5, 1], dh: 22, ds: 1 }] },
    { name: "Violet & coral", swatch: "#6a4cff", rules: [{ h: [205, 235], s: [0.3, 1], dh: 30, ds: 1 }, { h: [5, 30], s: [0.5, 1], dh: -12, ds: 1 }] },
  ],
  maison: [
    { name: "Bottle green", swatch: "#1f4a3a", rules: [{ h: [335, 20], s: [0.25, 1], dh: 152, ds: 0.85, dl: 0.02 }] },
    { name: "Midnight blue", swatch: "#1d2d55", rules: [{ h: [335, 20], s: [0.25, 1], dh: -132, ds: 0.95, dl: 0.03 }] },
  ],
  voyage: [
    { name: "Faded coral", swatch: "#c9775f", rules: [{ h: [160, 200], s: [0.08, 1], dh: -172, ds: 1.25, dl: -0.02 }] },
    { name: "Sun-bleached ochre", swatch: "#b8913f", rules: [{ h: [160, 200], s: [0.08, 1], dh: -144, ds: 1.35, dl: -0.03 }] },
  ],
  kinetik: [
    { name: "Azure", swatch: "#1f7bff", rules: [{ h: [250, 270], s: [0.5, 1], dh: -42, ds: 1 }, { h: [325, 345], s: [0.5, 1], dh: 34, ds: 1 }] },
    { name: "Hot tomato", swatch: "#ff3b1f", rules: [{ h: [250, 270], s: [0.5, 1], dh: 115, ds: 1, dl: 0.04 }, { h: [325, 345], s: [0.5, 1], dh: -60, ds: 1 }, { h: [40, 60], s: [0.5, 1], dh: 125, ds: 0.9, dl: -0.08 }] },
  ],
  vow: [
    { name: "Sage garden", swatch: "#5f7358", rules: [{ h: [25, 50], s: [0.15, 1], l: [0, 0.6], dh: 62, ds: 0.75 }, { h: [25, 50], s: [0.15, 1], l: [0.6, 1], dh: 50, ds: 0.6 }, { h: [190, 215], dh: -100, ds: 0.9 }] },
    { name: "Dusk blue", swatch: "#4d6178", rules: [{ h: [25, 50], s: [0.15, 1], l: [0, 0.6], dh: 178, ds: 0.6, dl: -0.02 }, { h: [25, 50], s: [0.15, 1], l: [0.6, 1], dh: 170, ds: 0.55 }] },
  ],
};

/** How many looks a family has: its original colours plus its colourways. */
export const colorwayCount = (family: string) => 1 + (COLORWAYS[family]?.length ?? 0);
/** The colourway of a variation (0 = the original colours, which have no colourway). */
export const colorwayOf = (family: string | undefined, variation: number | undefined): Colorway | null =>
  family && variation ? (COLORWAYS[family]?.[(variation - 1) % COLORWAYS[family].length] ?? null) : null;
export const colorwayName = (family: string | undefined, variation: number | undefined) => colorwayOf(family, variation)?.name ?? "Original";

/* ── colour maths ── */

function toHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}

function toRgb(h: number, s: number, l: number): [number, number, number] {
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
}

const inHue = (h: number, [a, b]: [number, number]) => (a === 0 && b === 360) || (a <= b ? h >= a && h <= b : h >= a || h <= b);
const clamp = (v: number) => Math.max(0, Math.min(1, v));

/** One colour through a colourway. Greys (no hue to speak of) never change. */
export function shiftRgb(rgb: [number, number, number], cw: Colorway): [number, number, number] {
  const [h, s, l] = toHsl(...rgb);
  if (s < 0.04) return rgb;
  const rule = cw.rules.find((r) => inHue(h, r.h) && s >= (r.s?.[0] ?? 0) && s <= (r.s?.[1] ?? 1) && l >= (r.l?.[0] ?? 0) && l <= (r.l?.[1] ?? 1));
  if (!rule) return rgb;
  return toRgb((((h + rule.dh) % 360) + 360) % 360, clamp(s * (rule.ds ?? 1)), clamp(l + (rule.dl ?? 0)));
}

const hex = (rgb: [number, number, number]) => `#${rgb.map((v) => v.toString(16).padStart(2, "0")).join("")}`;

export function shiftHex(value: string, cw: Colorway | null): string {
  if (!cw) return value;
  const m = /^#([0-9a-f]{6})$/i.exec(value);
  if (!m) return value;
  const n = parseInt(m[1], 16);
  return hex(shiftRgb([(n >> 16) & 255, (n >> 8) & 255, n & 255], cw));
}

/**
 * Recolours a stylesheet or document: every #rrggbb and every rgb()/rgba() triplet. Short hex
 * (#fff, #000) is pure white or black and stays as it is.
 */
export function recolor(text: string, cw: Colorway | null): string {
  if (!cw) return text;
  return text
    .replace(/#([0-9a-fA-F]{6})\b/g, (all) => shiftHex(all, cw))
    .replace(/(rgba?\(\s*)(\d{1,3})(\s*,\s*)(\d{1,3})(\s*,\s*)(\d{1,3})/gi, (_all, pre, r, s1, g, s2, b) => {
      const [nr, ng, nb] = shiftRgb([Number(r), Number(g), Number(b)], cw);
      return `${pre}${nr}${s1}${ng}${s2}${nb}`;
    });
}
