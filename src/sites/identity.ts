import { z } from "zod";
import { FONT_FAMILIES, type FontFamily } from "./fonts";

/**
 * Brand identity: the visual system of ONE website, decided per business by the creative
 * direction stage. It replaces "one fixed design per industry": direction, colours, type
 * and the composition of every part of the page are chosen for the business itself, then
 * sanitised here (valid fonts and variants, readable contrast) before anything is rendered.
 */

export const NAV = ["bar", "stacked", "pill", "block", "minimal"] as const;
export const HERO = ["cinema", "split", "centered", "editorial", "poster", "frame", "minimal", "panel", "card", "wordmark", "collage", "stack", "offset"] as const;
export const HEAD = ["left", "center", "ornament", "number", "tape"] as const;
export const SERVICES = ["cards", "pricelist", "rows", "tiles", "index", "bento"] as const;
export const MENU = ["list", "cards", "board", "rows", "courses"] as const;
export const GALLERY = ["mosaic", "strip", "grid", "polaroid", "scroller", "bento"] as const;
export const ABOUT = ["split", "overlap", "centered", "statement"] as const;
export const CTA = ["band", "full", "card"] as const;
export const FOOTER = ["columns", "centered", "big"] as const;
export const BUTTON = ["solid", "outline", "hard", "pill", "underline"] as const;

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

export const DIRECTIONS = [
  { key: "luxury-editorial", label: "Luxury Editorial", traits: "Magazine-like pacing, a refined serif, generous margins, restrained colour and one precise accent." },
  { key: "modern-minimal", label: "Modern Minimalism", traits: "Very few elements, a single neutral sans, large quiet areas, hairlines instead of boxes." },
  { key: "bold-brutalist", label: "Bold Brutalist", traits: "Oversized condensed type, hard edges, thick rules, flat high-contrast colour, no decoration." },
  { key: "swiss", label: "Swiss Design", traits: "Strict grid, numbered sections, grotesque sans, asymmetric alignment, one signal colour." },
  { key: "contemporary-corporate", label: "Contemporary Corporate", traits: "Clear and trustworthy, calm blues or greens, structured cards, plain language." },
  { key: "premium-dark", label: "Premium Dark", traits: "Deep dark surfaces, luminous accent, dramatic photography, elegant thin type." },
  { key: "warm-organic", label: "Warm Organic", traits: "Earthy tones, soft shapes, friendly rounded serif or sans, natural textures." },
  { key: "scandinavian", label: "Scandinavian", traits: "Light, airy, pale wood and stone tones, humble sans, calm and practical." },
  { key: "modern-commerce", label: "Modern E-commerce", traits: "Product-first tiles, clear prices and actions, compact rhythm, crisp sans." },
  { key: "creative-studio", label: "Creative Studio", traits: "Expressive display type, unexpected colour pairings, asymmetric collage compositions." },
  { key: "industrial", label: "Industrial", traits: "Steel greys with a safety colour, condensed uppercase type, technical labels and rules." },
  { key: "playful", label: "Playful Contemporary", traits: "Saturated colour, rounded shapes, bouncy geometric type, stickers and tilted elements." },
  { key: "architectural", label: "Architectural Minimalism", traits: "Monochrome, precise thin lines, large numerals, wide tracking, sculptural whitespace." },
  { key: "hospitality", label: "High-End Hospitality", traits: "Atmospheric full-bleed photography, warm neutrals, graceful serif, slow elegant rhythm." },
  { key: "future-tech", label: "Futuristic Technology", traits: "Dark or electric palette, geometric sans, glowing accents, crisp panels." },
] as const;
export type DirectionKey = (typeof DIRECTIONS)[number]["key"];
export const DIRECTION_KEYS = DIRECTIONS.map((d) => d.key) as [DirectionKey, ...DirectionKey[]];

export const identitySchema = z.object({
  direction: z.enum(DIRECTION_KEYS),
  /** The brand's personality in a few words ("calm, precise, quietly confident"). */
  personality: z.string().trim().max(160),
  /** Decorative detailing set (a design key from the library) or "plain" for none. */
  skin: z.string().max(40),
  colors: z.object({ background: hex, surface: hex, ink: hex, primary: hex, accent: hex }),
  fonts: z.object({
    display: z.string().max(40),
    body: z.string().max(40),
    weight: z.number().int().min(100).max(900),
    italic: z.boolean(),
    uppercase: z.boolean(),
    tracking: z.enum(["tight", "normal", "wide"]),
  }),
  radius: z.enum(["sharp", "soft", "round"]),
  density: z.enum(["airy", "balanced", "compact"]),
  layout: z.object({
    nav: z.enum(NAV),
    hero: z.enum(HERO),
    head: z.enum(HEAD),
    services: z.enum(SERVICES),
    menu: z.enum(MENU),
    gallery: z.enum(GALLERY),
    about: z.enum(ABOUT),
    cta: z.enum(CTA),
    footer: z.enum(FOOTER),
    button: z.enum(BUTTON),
  }),
});
export type Identity = z.infer<typeof identitySchema>;

/* ─────────── Presets: what each direction typically reaches for ─────────── */

type Pal = [bg: string, surface: string, ink: string, primary: string, accent: string];
type Preset = {
  heroes: Identity["layout"]["hero"][];
  navs: Identity["layout"]["nav"][];
  heads: Identity["layout"]["head"][];
  buttons: Identity["layout"]["button"][];
  services: Identity["layout"]["services"][];
  galleries: Identity["layout"]["gallery"][];
  abouts: Identity["layout"]["about"][];
  fonts: [display: FontFamily, body: FontFamily, weight: number, italic: boolean, upper: boolean, tracking: Identity["fonts"]["tracking"]][];
  palettes: Pal[];
  radius: Identity["radius"];
  density: Identity["density"];
};

export const PRESETS: Record<DirectionKey, Preset> = {
  "luxury-editorial": {
    heroes: ["editorial", "offset", "wordmark", "stack"], navs: ["stacked", "minimal"], heads: ["number", "ornament"], buttons: ["underline", "outline"], services: ["index", "rows"], galleries: ["scroller", "mosaic"], abouts: ["statement", "overlap"],
    fonts: [["Instrument Serif", "DM Sans", 400, false, false, "tight"], ["Fraunces", "Jost", 300, true, false, "tight"], ["Playfair Display", "Manrope", 500, true, false, "tight"]],
    palettes: [["#f3efe8", "#fbf9f4", "#1c1a17", "#2d3a33", "#8a4b2a"], ["#efe9e4", "#f8f4f0", "#231b22", "#4b2a3f", "#b0562f"], ["#eef0ea", "#f8f9f5", "#16201b", "#1f3d33", "#b98b2f"]],
    radius: "sharp", density: "airy",
  },
  "modern-minimal": {
    heroes: ["minimal", "stack", "centered", "split"], navs: ["minimal", "bar"], heads: ["left", "number"], buttons: ["underline", "solid"], services: ["index", "rows"], galleries: ["grid", "scroller"], abouts: ["statement", "split"],
    fonts: [["Inter", "Inter", 500, false, false, "tight"], ["Manrope", "Manrope", 600, false, false, "tight"], ["DM Sans", "DM Sans", 500, false, false, "tight"]],
    palettes: [["#ffffff", "#f6f6f4", "#111213", "#111213", "#2f5bff"], ["#fafaf8", "#ffffff", "#17181a", "#17181a", "#d9480f"], ["#f7f8f8", "#ffffff", "#0f1a1a", "#0f1a1a", "#0c8a6a"]],
    radius: "soft", density: "airy",
  },
  "bold-brutalist": {
    heroes: ["poster", "wordmark", "stack", "panel"], navs: ["block", "bar"], heads: ["tape", "left"], buttons: ["hard", "solid"], services: ["index", "pricelist"], galleries: ["bento", "grid"], abouts: ["statement", "split"],
    fonts: [["Anton", "Archivo", 400, false, true, "normal"], ["Big Shoulders Display", "Inter", 800, false, true, "normal"], ["Archivo", "Archivo", 800, false, true, "tight"]],
    palettes: [["#f2f0e6", "#ffffff", "#0d0d0d", "#0d0d0d", "#ff3d00"], ["#e9ff4d", "#ffffff", "#101010", "#101010", "#2a2aff"], ["#111111", "#1b1b1b", "#f4f1e8", "#f4f1e8", "#ffd400"]],
    radius: "sharp", density: "compact",
  },
  swiss: {
    heroes: ["stack", "minimal", "offset", "split"], navs: ["bar", "minimal"], heads: ["number", "left"], buttons: ["solid", "underline"], services: ["index", "rows"], galleries: ["grid", "bento"], abouts: ["split", "statement"],
    fonts: [["Space Grotesk", "Inter", 500, false, false, "tight"], ["Archivo", "Archivo", 600, false, false, "tight"], ["Sora", "Sora", 500, false, false, "tight"]],
    palettes: [["#f4f4f1", "#ffffff", "#141414", "#141414", "#e2231a"], ["#ffffff", "#f3f5f7", "#0e1b2c", "#0e1b2c", "#0057ff"], ["#f2f1ec", "#ffffff", "#1a1a1a", "#1a1a1a", "#008060"]],
    radius: "sharp", density: "balanced",
  },
  "contemporary-corporate": {
    heroes: ["split", "card", "panel", "offset"], navs: ["bar", "block", "pill"], heads: ["left", "center"], buttons: ["solid", "pill"], services: ["cards", "bento"], galleries: ["grid", "mosaic"], abouts: ["split", "overlap"],
    fonts: [["Plus Jakarta Sans", "Inter", 700, false, false, "tight"], ["Manrope", "Inter", 700, false, false, "tight"], ["Outfit", "DM Sans", 600, false, false, "tight"]],
    palettes: [["#ffffff", "#f3f7fb", "#0f2238", "#12407a", "#0e9f6e"], ["#fbfcfd", "#ffffff", "#182230", "#1f4b46", "#e07a1f"], ["#ffffff", "#f5f4fb", "#1b1936", "#322e85", "#ef5b3c"]],
    radius: "soft", density: "balanced",
  },
  "premium-dark": {
    heroes: ["cinema", "offset", "wordmark", "collage"], navs: ["minimal", "stacked"], heads: ["ornament", "left"], buttons: ["outline", "underline"], services: ["rows", "index"], galleries: ["scroller", "strip"], abouts: ["overlap", "statement"],
    fonts: [["Cormorant", "Jost", 400, true, false, "normal"], ["Syne", "Manrope", 600, false, false, "tight"], ["Instrument Serif", "Inter", 400, false, false, "normal"]],
    palettes: [["#0d0e10", "#16181b", "#f1ede4", "#16181b", "#c9a45c"], ["#0b1412", "#12201c", "#e9f1ea", "#12201c", "#7fd3a6"], ["#120d14", "#1c1520", "#f3e9ee", "#1c1520", "#e07a9a"]],
    radius: "sharp", density: "airy",
  },
  "warm-organic": {
    heroes: ["frame", "collage", "editorial", "split"], navs: ["bar", "stacked"], heads: ["ornament", "center"], buttons: ["pill", "solid"], services: ["tiles", "cards"], galleries: ["mosaic", "polaroid"], abouts: ["overlap", "split"],
    fonts: [["Fraunces", "DM Sans", 500, false, false, "tight"], ["Lora", "Manrope", 500, false, false, "normal"], ["DM Serif Display", "Outfit", 400, false, false, "normal"]],
    palettes: [["#f6efe3", "#fcf8f0", "#2b2118", "#5a6b3b", "#c2602d"], ["#f1ece2", "#faf7f0", "#27302a", "#2f4a3a", "#d08a2b"], ["#f8ece4", "#fdf7f2", "#33211c", "#7a3b2e", "#3f7a6a"]],
    radius: "round", density: "balanced",
  },
  scandinavian: {
    heroes: ["split", "minimal", "frame", "stack"], navs: ["minimal", "bar"], heads: ["left", "center"], buttons: ["solid", "underline"], services: ["rows", "cards"], galleries: ["grid", "scroller"], abouts: ["split", "centered"],
    fonts: [["Jost", "Jost", 500, false, false, "normal"], ["DM Sans", "DM Sans", 500, false, false, "tight"], ["Outfit", "Outfit", 400, false, false, "normal"]],
    palettes: [["#f5f3ee", "#ffffff", "#22262a", "#3b4a52", "#b5693a"], ["#f2f5f4", "#ffffff", "#1f2a2c", "#31504c", "#c08a3e"], ["#f7f5f2", "#ffffff", "#2a2623", "#5b5148", "#4a7c8c"]],
    radius: "soft", density: "airy",
  },
  "modern-commerce": {
    heroes: ["card", "split", "panel", "collage"], navs: ["bar", "pill"], heads: ["left", "tape"], buttons: ["solid", "pill"], services: ["bento", "pricelist", "tiles"], galleries: ["bento", "grid"], abouts: ["split", "centered"],
    fonts: [["Outfit", "Inter", 700, false, false, "tight"], ["Plus Jakarta Sans", "Plus Jakarta Sans", 700, false, false, "tight"], ["Rubik", "Inter", 700, false, false, "tight"]],
    palettes: [["#ffffff", "#f5f5f2", "#151515", "#151515", "#ff5a1f"], ["#fdfcf8", "#ffffff", "#1a1f2b", "#1a1f2b", "#3b6cff"], ["#f6fbf7", "#ffffff", "#13241b", "#17603f", "#f2a900"]],
    radius: "round", density: "compact",
  },
  "creative-studio": {
    heroes: ["collage", "wordmark", "offset", "poster"], navs: ["minimal", "pill"], heads: ["number", "tape"], buttons: ["pill", "hard"], services: ["bento", "index"], galleries: ["bento", "polaroid", "scroller"], abouts: ["statement", "overlap"],
    fonts: [["Syne", "DM Sans", 700, false, false, "tight"], ["Unbounded", "Inter", 600, false, false, "tight"], ["Fraunces", "Space Grotesk", 600, true, false, "tight"]],
    palettes: [["#f4efff", "#ffffff", "#1b1140", "#3a1fd1", "#ff5c8a"], ["#fff4e8", "#ffffff", "#22150c", "#e2470f", "#1f6f6a"], ["#12122a", "#1c1c3a", "#f3f0ff", "#1c1c3a", "#c6ff3d"]],
    radius: "round", density: "balanced",
  },
  industrial: {
    heroes: ["panel", "poster", "split", "stack"], navs: ["block", "bar"], heads: ["tape", "left"], buttons: ["hard", "solid"], services: ["pricelist", "index", "cards"], galleries: ["grid", "bento"], abouts: ["split", "statement"],
    fonts: [["Barlow Condensed", "Inter", 700, false, true, "normal"], ["Oswald", "Archivo", 600, false, true, "normal"], ["Big Shoulders Display", "Manrope", 800, false, true, "normal"]],
    palettes: [["#eeeeea", "#ffffff", "#15181b", "#23282d", "#f2a900"], ["#14171a", "#1d2125", "#eef0f1", "#1d2125", "#ff6a13"], ["#f1f3f4", "#ffffff", "#101820", "#1f3a5f", "#e23a2e"]],
    radius: "sharp", density: "compact",
  },
  playful: {
    heroes: ["poster", "collage", "card", "split"], navs: ["pill", "block"], heads: ["tape", "center"], buttons: ["hard", "pill"], services: ["bento", "tiles", "cards"], galleries: ["polaroid", "bento"], abouts: ["overlap", "split"],
    fonts: [["Rubik", "Rubik", 800, false, false, "tight"], ["Outfit", "Outfit", 800, false, false, "tight"], ["Alfa Slab One", "DM Sans", 400, false, false, "normal"]],
    palettes: [["#fff7d6", "#ffffff", "#1d1a2b", "#3b2bd6", "#ff5a36"], ["#e8f8ff", "#ffffff", "#10243a", "#0a6cff", "#ff7a00"], ["#fdeef2", "#ffffff", "#2b1020", "#d6246e", "#12a37d"]],
    radius: "round", density: "balanced",
  },
  architectural: {
    heroes: ["stack", "minimal", "offset", "wordmark"], navs: ["minimal", "bar"], heads: ["number", "left"], buttons: ["underline", "outline"], services: ["index", "rows"], galleries: ["scroller", "grid"], abouts: ["statement", "split"],
    fonts: [["Jost", "Jost", 300, false, true, "wide"], ["Italiana", "Manrope", 400, false, false, "wide"], ["Sora", "Sora", 300, false, false, "tight"]],
    palettes: [["#f5f5f3", "#ffffff", "#161616", "#161616", "#8c8577"], ["#ecebe7", "#f7f6f3", "#1d1d1b", "#1d1d1b", "#9b5b3f"], ["#101112", "#191a1c", "#ececea", "#191a1c", "#b7b2a6"]],
    radius: "sharp", density: "airy",
  },
  hospitality: {
    heroes: ["cinema", "frame", "offset", "editorial"], navs: ["stacked", "bar"], heads: ["ornament", "center"], buttons: ["outline", "solid"], services: ["tiles", "rows"], galleries: ["strip", "scroller", "mosaic"], abouts: ["overlap", "statement"],
    fonts: [["Marcellus", "Manrope", 400, false, false, "normal"], ["Cormorant", "DM Sans", 500, false, false, "normal"], ["Playfair Display", "Jost", 400, false, false, "normal"]],
    palettes: [["#f4ede2", "#fbf7f0", "#2a211b", "#3d2f26", "#a6692e"], ["#ecefe9", "#f8f9f5", "#1e2a26", "#24443c", "#b3873a"], ["#16110e", "#211a15", "#f2e9dc", "#211a15", "#d2a25a"]],
    radius: "soft", density: "airy",
  },
  "future-tech": {
    heroes: ["centered", "panel", "offset", "card"], navs: ["pill", "minimal"], heads: ["left", "number"], buttons: ["solid", "pill"], services: ["bento", "cards"], galleries: ["bento", "grid"], abouts: ["split", "statement"],
    fonts: [["Space Grotesk", "Inter", 600, false, false, "tight"], ["Sora", "Inter", 600, false, false, "tight"], ["Unbounded", "Manrope", 500, false, false, "tight"]],
    palettes: [["#0a0d14", "#121723", "#eaf0ff", "#121723", "#5b8cff"], ["#07110f", "#0e1c19", "#e6fff6", "#0e1c19", "#2ee6a6"], ["#f5f7ff", "#ffffff", "#0f1430", "#1c2466", "#6a3dff"]],
    radius: "soft", density: "balanced",
  },
};

const isFont = (f: string): f is FontFamily => (FONT_FAMILIES as string[]).includes(f);

/** Stable hash → index, so the same business always gets the same fallback identity. */
function pick<T>(list: readonly T[], seed: number, salt: number, avoid: readonly T[] = []): T {
  const free = list.filter((x) => !avoid.includes(x));
  const pool = free.length ? free : list;
  return pool[Math.abs(seed + salt * 7919) % pool.length];
}
export function seedOf(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return Math.abs(h | 0);
}

/** What makes one generated site recognisably different from another. */
export type Fingerprint = { direction: string; hero: string; display: string; dark: boolean; category?: string };

export function fingerprintOf(identity: Identity, category?: string): Fingerprint {
  return { direction: identity.direction, hero: identity.layout.hero, display: identity.fonts.display, dark: isDark(identity.colors.background), category };
}

const lum = (h: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const isDark = (bg: string) => lum(bg) < 0.4;

/**
 * A complete identity built from a direction's presets, without any AI: used in mock
 * mode, as a fallback, and to repair choices. `recent` steers it away from what the last
 * sites used, so consecutive sites differ by design rather than by chance.
 */
export function presetIdentity(direction: DirectionKey, seed: number, skin: string, recent: Fingerprint[] = [], opts: { photos?: boolean } = {}): Identity {
  const p = PRESETS[direction];
  const heroes = p.heroes;
  const f = pick(p.fonts, seed, 1, p.fonts.filter((x) => recent.slice(0, 4).some((r) => r.display === x[0])));
  const c = pick(p.palettes, seed, 2);
  return {
    direction,
    personality: DIRECTIONS.find((d) => d.key === direction)!.traits,
    skin,
    colors: { background: c[0], surface: c[1], ink: c[2], primary: c[3], accent: c[4] },
    fonts: { display: f[0], body: f[1], weight: f[2], italic: f[3], uppercase: f[4], tracking: f[5] },
    radius: p.radius,
    density: p.density,
    layout: {
      nav: pick(p.navs, seed, 3),
      hero: pick(heroes, seed, 4, recent.slice(0, 3).map((r) => r.hero) as Identity["layout"]["hero"][]),
      head: pick(p.heads, seed, 5),
      services: pick(p.services, seed, 6),
      menu: pick(MENU, seed, 7),
      gallery: pick(p.galleries, seed, 8),
      about: pick(p.abouts, seed, 9),
      cta: pick(CTA, seed, 10),
      footer: pick(FOOTER, seed, 11),
      button: pick(p.buttons, seed, 12),
    },
  };
}

/** Chooses a direction that fits the industry and that the most recent sites did not use. */
export function pickDirection(candidates: DirectionKey[], seed: number, recent: Fingerprint[] = []): DirectionKey {
  const list = candidates.length ? candidates : DIRECTION_KEYS;
  return pick(list, seed, 0, recent.slice(0, 3).map((r) => r.direction) as DirectionKey[]);
}

/**
 * Makes an identity safe to render and distinct from recent work:
 * unknown fonts fall back to the direction's own pairing, and a composition that repeats the
 * previous site of the same industry (same hero, or the same display face three times
 * running) is moved to the next option the direction offers.
 */
export function finalizeIdentity(raw: Identity, seed: number, recent: Fingerprint[] = [], opts: { photos?: boolean; category?: string } = {}): Identity {
  const p = PRESETS[raw.direction];
  const id: Identity = JSON.parse(JSON.stringify(raw));
  const fallbackFont = p.fonts[seed % p.fonts.length];
  if (!isFont(id.fonts.display)) id.fonts.display = fallbackFont[0];
  if (!isFont(id.fonts.body)) id.fonts.body = fallbackFont[1];
  const sameIndustry = recent.filter((r) => !opts.category || r.category === opts.category);
  const last = sameIndustry[0];
  if (last && last.hero === id.layout.hero) id.layout.hero = pick(p.heroes, seed, 4, [last.hero, ...recent.slice(0, 2).map((r) => r.hero)] as Identity["layout"]["hero"][]);
  if (recent.slice(0, 2).length === 2 && recent.slice(0, 2).every((r) => r.display === id.fonts.display)) {
    const alt = p.fonts.find((x) => x[0] !== id.fonts.display);
    if (alt) id.fonts = { display: alt[0], body: alt[1], weight: alt[2], italic: alt[3], uppercase: alt[4], tracking: alt[5] };
  }
  if (opts.photos === false) {
    // Without photographs nothing may depend on imagery: no image tiles, no full-bleed image bands.
    if (id.layout.services === "tiles" || id.layout.services === "bento") id.layout.services = "index";
    if (id.layout.cta === "full") id.layout.cta = "band";
    if (id.layout.about === "overlap" || id.layout.about === "split") id.layout.about = "statement";
  }
  return id;
}
