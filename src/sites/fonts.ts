/**
 * Self-hosted font catalogue (no third-party requests; GDPR-friendly).
 * Files live in public/site-assets/fonts and are copied into exported sites on demand:
 * a site only declares and ships the families its design actually uses.
 */

type FontDef = {
  slug: string;
  /** Variable font (one file per subset covering all weights) or fixed weights. */
  weights: "variable" | number[];
  italic?: boolean;
  /** Family ships a latin subset only. */
  latinOnly?: boolean;
  fallback: string;
};

const SERIF = 'Georgia, "Times New Roman", serif';
const SANS = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const DISPLAY = '"Arial Narrow", Impact, sans-serif';
const HAND = '"Comic Sans MS", cursive';

export const FONTS = {
  Poppins: { slug: "poppins", weights: [400, 500, 600, 700], fallback: SANS },
  Inter: { slug: "inter", weights: [400, 500, 600, 700], fallback: SANS },
  "Playfair Display": { slug: "playfair-display", weights: "variable", italic: true, fallback: SERIF },
  Cormorant: { slug: "cormorant", weights: "variable", italic: true, fallback: SERIF },
  Fraunces: { slug: "fraunces", weights: "variable", italic: true, fallback: SERIF },
  Lora: { slug: "lora", weights: "variable", italic: true, fallback: SERIF },
  "DM Serif Display": { slug: "dm-serif-display", weights: [400], fallback: SERIF },
  Marcellus: { slug: "marcellus", weights: [400], fallback: SERIF },
  Italiana: { slug: "italiana", weights: [400], latinOnly: true, fallback: SERIF },
  "Alfa Slab One": { slug: "alfa-slab-one", weights: [400], fallback: SERIF },
  "DM Sans": { slug: "dm-sans", weights: "variable", fallback: SANS },
  Manrope: { slug: "manrope", weights: "variable", fallback: SANS },
  Outfit: { slug: "outfit", weights: "variable", fallback: SANS },
  Sora: { slug: "sora", weights: "variable", fallback: SANS },
  Jost: { slug: "jost", weights: "variable", fallback: SANS },
  Syne: { slug: "syne", weights: "variable", fallback: SANS },
  Rubik: { slug: "rubik", weights: "variable", fallback: SANS },
  Archivo: { slug: "archivo", weights: "variable", fallback: SANS },
  "Space Grotesk": { slug: "space-grotesk", weights: "variable", fallback: SANS },
  "Plus Jakarta Sans": { slug: "plus-jakarta-sans", weights: "variable", fallback: SANS },
  Unbounded: { slug: "unbounded", weights: "variable", fallback: SANS },
  Oswald: { slug: "oswald", weights: "variable", fallback: DISPLAY },
  "Big Shoulders Display": { slug: "big-shoulders-display", weights: "variable", fallback: DISPLAY },
  "Barlow Condensed": { slug: "barlow-condensed", weights: [500, 600, 700], fallback: DISPLAY },
  "Bebas Neue": { slug: "bebas-neue", weights: [400], fallback: DISPLAY },
  Anton: { slug: "anton", weights: [400], fallback: DISPLAY },
  Caveat: { slug: "caveat", weights: "variable", fallback: HAND },
  "Permanent Marker": { slug: "permanent-marker", weights: [400], latinOnly: true, fallback: HAND },
} satisfies Record<string, FontDef>;

export type FontFamily = keyof typeof FONTS;
export const FONT_FAMILIES = Object.keys(FONTS) as FontFamily[];

const RANGES = {
  latin: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  "latin-ext": "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF",
} as const;

export function fontStack(family: FontFamily) {
  return `"${family}", ${FONTS[family].fallback}`;
}

function filesOf(family: FontFamily): { file: string; weight: string; style: string; subset: keyof typeof RANGES }[] {
  const f: FontDef = FONTS[family];
  const out: { file: string; weight: string; style: string; subset: keyof typeof RANGES }[] = [];
  for (const subset of f.latinOnly ? (["latin"] as const) : (["latin", "latin-ext"] as const)) {
    if (f.weights === "variable") {
      out.push({ file: `${f.slug}-${subset}-wght-normal.woff2`, weight: "100 900", style: "normal", subset });
      if (f.italic) out.push({ file: `${f.slug}-${subset}-wght-italic.woff2`, weight: "100 900", style: "italic", subset });
    } else {
      for (const w of f.weights) out.push({ file: `${f.slug}-${subset}-${w}-normal.woff2`, weight: String(w), style: "normal", subset });
    }
  }
  return out;
}

/** @font-face rules for the given families. Latin-ext is only downloaded when a page needs it. */
export function fontFaces(assetBase: string, families: FontFamily[]) {
  return [...new Set(families)]
    .flatMap((family) =>
      filesOf(family).map(
        (x) =>
          `@font-face{font-family:"${family}";font-style:${x.style};font-weight:${x.weight};font-display:swap;src:url("${assetBase}fonts/${x.file}") format("woff2");unicode-range:${RANGES[x.subset]}}`,
      ),
    )
    .join("");
}

export function fontFiles(families: FontFamily[]) {
  return [...new Set(families)].flatMap((f) => filesOf(f).map((x) => x.file));
}

/** Font files referenced by rendered HTML (used when exporting a site). */
export function fontFilesInHtml(html: string) {
  return [...new Set([...html.matchAll(/fonts\/([a-z0-9-]+\.woff2)/g)].map((m) => m[1]))];
}
