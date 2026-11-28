import type { TemplateKey } from "@/lib/site-spec";
import { FONT_FAMILIES, type FontFamily } from "./fonts";
import { isDark, type Identity } from "./identity";
import { contrast, ensureContrast, mix } from "./color";

/**
 * The template library. A design is a complete visual identity: its own typography,
 * palette, layout variants for every part of the page, artwork and feature set.
 * Adding an industry = adding one entry here (plus a blueprint for its default content).
 */

export type NavVariant = "bar" | "stacked" | "pill" | "block" | "minimal";
export type HeroVariant = "cinema" | "split" | "centered" | "editorial" | "poster" | "frame" | "minimal" | "panel" | "card" | "wordmark" | "collage" | "stack" | "offset";
export type HeadVariant = "left" | "center" | "ornament" | "number" | "tape";
export type ServicesVariant = "cards" | "pricelist" | "rows" | "tiles" | "index" | "bento";
export type MenuVariant = "list" | "cards" | "board" | "rows" | "courses";
export type GalleryVariant = "mosaic" | "strip" | "grid" | "polaroid" | "scroller" | "bento";
export type AboutVariant = "split" | "overlap" | "centered" | "statement";
export type CtaVariant = "band" | "full" | "card";
export type FooterVariant = "columns" | "centered" | "big";
export type ButtonVariant = "solid" | "outline" | "hard" | "pill" | "underline";

export type ArtScene =
  | "finedining" | "italian" | "mezze" | "sushi" | "burger" | "pizza" | "coffee" | "bakery" | "street" | "fusion" | "truck"
  | "barber" | "hair" | "beauty" | "detailing" | "garage" | "construction" | "cleaning" | "garden"
  | "dental" | "estate" | "corporate" | "service";

export type Design = {
  key: string;
  name: string;
  industry: string;
  group: "food" | "services" | "general";
  description: string;
  legacy: TemplateKey;
  mode: "light" | "dark";
  radius: "sharp" | "soft" | "round";
  fonts: {
    display: FontFamily;
    body: FontFamily;
    accent?: FontFamily;
    weight: number;
    italic?: boolean;
    upper?: boolean;
    tracking: string;
    /** Multiplier on heading sizes: condensed faces need to be set larger. */
    scale: number;
    lineHeight: number;
  };
  palette: { bg: string; alt: string; surface: string; ink: string; text: string; muted: string; primary: string; accent: string; footer: string; footerInk: string };
  v: { nav: NavVariant; hero: HeroVariant; head: HeadVariant; services: ServicesVariant; menu: MenuVariant; gallery: GalleryVariant; about: AboutVariant; cta: CtaVariant; footer: FooterVariant; button: ButtonVariant };
  /** Alternative layouts of the same identity: each generated site picks one, so two businesses in one industry never get the same page. */
  alts?: Partial<Design["v"]>[];
  art: ArtScene;
  /** What a site built on this design can do for the business (shown on demo pages and in the factory). */
  features: string[];
  /** Add-on keys from the price catalogue that fit this industry best, most relevant first. */
  upsells: string[];
  /** Decorative detailing set used for CSS (a design key, or "plain"). Defaults to the design's own. */
  skin?: string;
  density?: "airy" | "balanced" | "compact";
  /**
   * Slug of the demo website (/demos/<slug>) this design is taken from. Such a design is a
   * template family (src/sites/families): it is rendered with the demo's own markup and
   * stylesheet, and its look is fixed (no per-business identity, no layout variants).
   */
  demo?: string;
  /**
   * An original template: designed for the template library itself, without a demo website in
   * the portfolio (`demo` then repeats the key). Its sample builds stand in for the demo.
   */
  original?: boolean;
};

const d = (x: Design) => x;

export const DESIGNS: Design[] = [
  // ── Restaurants & food ─────────────────────────────────────────────
  d({
    key: "luxury-restaurant", name: "Maison Noir", industry: "Luxury restaurant", group: "food", legacy: "restaurant",
    description: "Candle-lit black and brass, light italic serif, cinematic full-screen opening and a classic dotted menu card.",
    mode: "dark", radius: "sharp",
    fonts: { display: "Cormorant", body: "Jost", weight: 400, italic: true, tracking: "0", scale: 1.22, lineHeight: 1.02 },
    palette: { bg: "#0c0b0a", alt: "#131110", surface: "#171513", ink: "#f4ede0", text: "#cfc6b6", muted: "#9c9282", primary: "#1a1714", accent: "#c6a15b", footer: "#070605", footerInk: "#a59b8a" },
    v: { nav: "stacked", hero: "cinema", head: "ornament", services: "rows", menu: "list", gallery: "strip", about: "overlap", cta: "full", footer: "centered", button: "outline" },
    alts: [{ hero: "wordmark", nav: "minimal", gallery: "mosaic", about: "statement" }, { hero: "collage", nav: "bar", head: "number", menu: "courses" }],
    art: "finedining",
    features: ["Digital menu card", "Table reservation form", "Private dining enquiries", "Opening hours & route", "Atmosphere gallery"],
    upsells: ["booking", "menu", "copywriting", "photography", "multilingual"],
  }),
  d({
    key: "modern-italian", name: "Trattoria", industry: "Modern Italian restaurant", group: "food", legacy: "restaurant",
    description: "Cream paper, tomato red and olive, oversized italic Playfair headlines in an editorial magazine layout.",
    mode: "light", radius: "soft",
    fonts: { display: "Playfair Display", body: "DM Sans", weight: 500, italic: true, tracking: "-0.02em", scale: 1.1, lineHeight: 1.02 },
    palette: { bg: "#f6f0e4", alt: "#efe6d4", surface: "#fbf7ee", ink: "#231a14", text: "#4a3f35", muted: "#75685b", primary: "#3f4d2c", accent: "#c8402a", footer: "#231a14", footerInk: "#cbbfae" },
    v: { nav: "bar", hero: "editorial", head: "number", services: "rows", menu: "list", gallery: "mosaic", about: "statement", cta: "band", footer: "big", button: "pill" },
    alts: [{ hero: "wordmark", nav: "minimal", about: "overlap", gallery: "strip" }, { hero: "collage", head: "left", menu: "cards" }],
    art: "italian",
    features: ["Digital menu with courses", "Table reservations", "Takeaway & delivery links", "Opening hours & route", "Story of the kitchen"],
    upsells: ["menu", "booking", "ordering", "gbp", "multilingual"],
  }),
  d({
    key: "turkish-restaurant", name: "Anatolia", industry: "Turkish restaurant", group: "food", legacy: "restaurant",
    description: "Deep teal, terracotta and sand with an arched hero frame, tile-pattern borders and mezze-style menu cards.",
    mode: "light", radius: "soft",
    fonts: { display: "Marcellus", body: "Manrope", weight: 400, tracking: "0.005em", scale: 1.02, lineHeight: 1.1 },
    palette: { bg: "#f5ecdc", alt: "#ecdfc8", surface: "#fbf5ea", ink: "#0f3b3a", text: "#3d4a45", muted: "#66716b", primary: "#0f3b3a", accent: "#b04e26", footer: "#0b2a29", footerInk: "#b9cbc4" },
    v: { nav: "stacked", hero: "frame", head: "ornament", services: "tiles", menu: "cards", gallery: "mosaic", about: "split", cta: "full", footer: "columns", button: "solid" },
    alts: [{ hero: "cinema", nav: "bar", menu: "list", about: "overlap" }, { hero: "collage", services: "cards", gallery: "strip" }],
    art: "mezze",
    features: ["Digital menu by course", "Group & family reservations", "Takeaway ordering links", "Opening hours & route", "Photo gallery"],
    upsells: ["menu", "ordering", "booking", "whatsapp", "multilingual"],
  }),
  d({
    key: "sushi", name: "Kaiseki", industry: "Sushi restaurant", group: "food", legacy: "restaurant",
    description: "Rice-paper white, sumi ink and one vermilion accent. Extreme whitespace, hairlines and a numbered menu.",
    mode: "light", radius: "sharp",
    fonts: { display: "Sora", body: "Sora", weight: 300, tracking: "-0.035em", scale: 1, lineHeight: 1.08 },
    palette: { bg: "#f7f5f0", alt: "#efece4", surface: "#ffffff", ink: "#15171a", text: "#3a3d42", muted: "#6b6f76", primary: "#15171a", accent: "#d33a2c", footer: "#15171a", footerInk: "#aeb1b6" },
    v: { nav: "minimal", hero: "minimal", head: "number", services: "rows", menu: "rows", gallery: "grid", about: "statement", cta: "card", footer: "columns", button: "underline" },
    alts: [{ hero: "wordmark", gallery: "strip", menu: "list" }, { hero: "collage", about: "split", cta: "full" }],
    art: "sushi",
    features: ["Numbered digital menu", "Online ordering links", "Table reservations", "Delivery & pickup info", "Opening hours & route"],
    upsells: ["ordering", "menu", "booking", "photography", "analytics"],
  }),
  d({
    key: "burger", name: "Stack", industry: "Burger restaurant", group: "food", legacy: "restaurant",
    description: "Mustard yellow, black and ketchup red. Giant condensed type, hard-shadow buttons, a moving ticker and menu cards.",
    mode: "light", radius: "soft",
    fonts: { display: "Anton", body: "Space Grotesk", accent: "Permanent Marker", weight: 400, upper: true, tracking: "0.005em", scale: 1.32, lineHeight: 0.94 },
    palette: { bg: "#ffc629", alt: "#fff6dc", surface: "#fffdf6", ink: "#141210", text: "#2b2622", muted: "#5c544b", primary: "#141210", accent: "#e23d28", footer: "#141210", footerInk: "#d8cfbf" },
    v: { nav: "pill", hero: "poster", head: "tape", services: "cards", menu: "cards", gallery: "polaroid", about: "split", cta: "full", footer: "big", button: "hard" },
    alts: [{ hero: "cinema", nav: "bar", gallery: "grid", about: "statement" }, { hero: "collage", menu: "board", cta: "band" }],
    art: "burger",
    features: ["Menu cards with combos", "Order for pickup & delivery", "Location & opening hours", "Promotions strip", "Social photo wall"],
    upsells: ["ordering", "menu", "whatsapp", "gbp", "analytics"],
  }),
  d({
    key: "pizzeria", name: "Forno", industry: "Pizzeria", group: "food", legacy: "restaurant",
    description: "Warm white, pomodoro red and basil green with a slab-serif voice, round oven-window imagery and checkered trims.",
    mode: "light", radius: "round",
    fonts: { display: "Alfa Slab One", body: "Rubik", weight: 400, tracking: "-0.005em", scale: 0.96, lineHeight: 1.06 },
    palette: { bg: "#fff8ef", alt: "#f9ecd9", surface: "#ffffff", ink: "#2a1410", text: "#4d3b34", muted: "#786860", primary: "#1f6b45", accent: "#b3261e", footer: "#2a1410", footerInk: "#d9c9bb" },
    v: { nav: "bar", hero: "split", head: "tape", services: "cards", menu: "list", gallery: "grid", about: "split", cta: "band", footer: "columns", button: "pill" },
    alts: [{ hero: "cinema", head: "center", menu: "cards", gallery: "mosaic" }, { hero: "wordmark", nav: "minimal", about: "statement" }],
    art: "pizza",
    features: ["Pizza menu with sizes", "Order for pickup & delivery", "Delivery area & times", "Opening hours & route", "Deals section"],
    upsells: ["ordering", "menu", "whatsapp", "gbp", "seo"],
  }),
  d({
    key: "coffee-shop", name: "Roast", industry: "Coffee shop", group: "food", legacy: "restaurant",
    description: "Oat, espresso and caramel. Calm centred layout, soft serif headlines and a two-column drinks board.",
    mode: "light", radius: "soft",
    fonts: { display: "DM Serif Display", body: "DM Sans", weight: 400, tracking: "-0.01em", scale: 1.06, lineHeight: 1.06 },
    palette: { bg: "#efe6da", alt: "#e6dacb", surface: "#f8f2e9", ink: "#2b1d16", text: "#4c3c33", muted: "#74645a", primary: "#2b1d16", accent: "#a8632a", footer: "#2b1d16", footerInk: "#cdbfb2" },
    v: { nav: "pill", hero: "centered", head: "center", services: "tiles", menu: "board", gallery: "strip", about: "centered", cta: "card", footer: "centered", button: "pill" },
    alts: [{ hero: "collage", nav: "bar", head: "left", menu: "list", about: "split" }, { hero: "wordmark", nav: "minimal", gallery: "mosaic" }],
    art: "coffee",
    features: ["Drinks & food board", "Opening hours & route", "Beans and brewing story", "Workspace & wifi info", "Catering enquiries"],
    upsells: ["menu", "gbp", "photography", "logo", "analytics"],
  }),
  d({
    key: "bakery", name: "Crumb", industry: "Bakery & patisserie", group: "food", legacy: "restaurant",
    description: "Blush and raspberry with a soft wobbly serif, hand-written notes, scalloped image frames and product tiles.",
    mode: "light", radius: "round",
    fonts: { display: "Fraunces", body: "Outfit", accent: "Caveat", weight: 500, tracking: "-0.025em", scale: 1.04, lineHeight: 1.04 },
    palette: { bg: "#fbeee6", alt: "#f6e0d4", surface: "#fffaf6", ink: "#3b1e24", text: "#5a3f43", muted: "#836a6c", primary: "#3b1e24", accent: "#b8455b", footer: "#3b1e24", footerInk: "#dcc8c6" },
    v: { nav: "bar", hero: "frame", head: "center", services: "tiles", menu: "cards", gallery: "polaroid", about: "overlap", cta: "card", footer: "centered", button: "pill" },
    alts: [{ hero: "wordmark", nav: "minimal", gallery: "mosaic", about: "split" }, { hero: "split", head: "left", menu: "list", gallery: "grid" }],
    art: "bakery",
    features: ["Daily assortment", "Order cakes in advance", "Pick-up times", "Opening hours & route", "Custom cake enquiries"],
    upsells: ["ordering", "menu", "photography", "whatsapp", "gbp"],
  }),
  d({
    key: "street-food", name: "Hawker", industry: "Street food", group: "food", legacy: "restaurant",
    description: "Night-market black with neon lime and hot pink, stencil capitals, marker scribbles and a ticket-style menu board.",
    mode: "dark", radius: "sharp",
    fonts: { display: "Bebas Neue", body: "Space Grotesk", accent: "Permanent Marker", weight: 400, upper: true, tracking: "0.015em", scale: 1.42, lineHeight: 0.92 },
    palette: { bg: "#101010", alt: "#171717", surface: "#1c1c1c", ink: "#f6f6f1", text: "#cfcfc8", muted: "#9a9a92", primary: "#c6ff3d", accent: "#ff3d7f", footer: "#080808", footerInk: "#a3a39b" },
    v: { nav: "bar", hero: "poster", head: "tape", services: "cards", menu: "board", gallery: "grid", about: "statement", cta: "full", footer: "big", button: "hard" },
    alts: [{ hero: "cinema", menu: "cards", gallery: "polaroid" }, { hero: "collage", about: "split", cta: "band" }],
    art: "street",
    features: ["Menu board", "Order for pickup & delivery", "Location & opening hours", "Events & catering", "Social photo wall"],
    upsells: ["ordering", "menu", "whatsapp", "gbp", "photography"],
  }),
  d({
    key: "fine-dining", name: "Atelier", industry: "Fine dining", group: "food", legacy: "restaurant",
    description: "Ivory, charcoal and bronze. Quiet, gallery-like pages with hairline type and a centred tasting-menu of courses.",
    mode: "light", radius: "sharp",
    fonts: { display: "Italiana", body: "Jost", weight: 400, tracking: "0.01em", scale: 1.12, lineHeight: 1.06 },
    palette: { bg: "#f4f1ea", alt: "#ebe6db", surface: "#faf8f3", ink: "#1d1d1b", text: "#45433e", muted: "#716d64", primary: "#1d1d1b", accent: "#8a6d47", footer: "#1d1d1b", footerInk: "#b9b3a6" },
    v: { nav: "minimal", hero: "centered", head: "center", services: "rows", menu: "courses", gallery: "strip", about: "statement", cta: "card", footer: "centered", button: "underline" },
    alts: [{ hero: "wordmark", gallery: "grid", about: "overlap" }, { hero: "cinema", nav: "stacked", head: "ornament", menu: "list" }],
    art: "finedining",
    features: ["Tasting menu by course", "Reservation requests", "Private dining", "Wine pairing section", "Opening hours & route"],
    upsells: ["booking", "copywriting", "photography", "multilingual", "menu"],
  }),
  d({
    key: "asian-fusion", name: "Umami", industry: "Asian fusion", group: "food", legacy: "restaurant",
    description: "Midnight plum with magenta and jade glow, geometric Syne headlines, glass cards and overlapping round imagery.",
    mode: "dark", radius: "round",
    fonts: { display: "Syne", body: "Manrope", weight: 700, tracking: "-0.035em", scale: 1, lineHeight: 1.02 },
    palette: { bg: "#150d1e", alt: "#1b1227", surface: "#221733", ink: "#fbf5ff", text: "#d5c9e2", muted: "#a394b5", primary: "#2ee6a6", accent: "#ff4d8d", footer: "#0d0814", footerInk: "#a99bb9" },
    v: { nav: "pill", hero: "split", head: "left", services: "cards", menu: "cards", gallery: "mosaic", about: "split", cta: "card", footer: "columns", button: "pill" },
    alts: [{ hero: "wordmark", nav: "minimal", menu: "rows", gallery: "strip" }, { hero: "collage", head: "number", about: "statement" }],
    art: "fusion",
    features: ["Shared-plates menu", "Table reservations", "Order for pickup & delivery", "Cocktail list", "Opening hours & route"],
    upsells: ["booking", "ordering", "menu", "photography", "analytics"],
  }),
  d({
    key: "food-truck", name: "Roll", industry: "Food truck", group: "food", legacy: "restaurant",
    description: "Electric blue, white and orange with chunky rounded capitals, stickers and a 'where we are' location card.",
    mode: "light", radius: "round",
    fonts: { display: "Rubik", body: "Rubik", accent: "Permanent Marker", weight: 800, upper: true, tracking: "-0.02em", scale: 1.02, lineHeight: 0.98 },
    palette: { bg: "#f4f7ff", alt: "#e6edff", surface: "#ffffff", ink: "#0f1f5c", text: "#34406e", muted: "#626c93", primary: "#2f5bff", accent: "#ff7a1a", footer: "#0f1f5c", footerInk: "#c3ccf0" },
    v: { nav: "pill", hero: "poster", head: "tape", services: "tiles", menu: "board", gallery: "polaroid", about: "split", cta: "band", footer: "columns", button: "hard" },
    alts: [{ hero: "cinema", nav: "bar", menu: "cards", gallery: "grid" }, { hero: "collage", head: "left", cta: "full" }],
    art: "truck",
    features: ["Where to find us", "Short menu board", "Book the truck for events", "Catering quote form", "Social photo wall"],
    upsells: ["booking", "whatsapp", "gbp", "logo", "menu"],
  }),

  // ── Other industries ───────────────────────────────────────────────
  d({
    key: "barbershop", name: "Blade", industry: "Barbershop", group: "services", legacy: "beauty",
    description: "Black, cream and brass with condensed capitals, barber-pole stripes, a price list and a booking card up front.",
    mode: "dark", radius: "sharp",
    fonts: { display: "Oswald", body: "Manrope", weight: 600, upper: true, tracking: "0.02em", scale: 1.12, lineHeight: 1 },
    palette: { bg: "#0e0e0e", alt: "#151413", surface: "#1a1917", ink: "#efe8d8", text: "#c9c2b3", muted: "#989183", primary: "#efe8d8", accent: "#b08d57", footer: "#070707", footerInk: "#a19a8c" },
    v: { nav: "bar", hero: "card", head: "left", services: "pricelist", menu: "list", gallery: "grid", about: "split", cta: "full", footer: "columns", button: "solid" },
    alts: [{ hero: "cinema", nav: "minimal", head: "center", gallery: "mosaic", about: "overlap" }, { hero: "collage", head: "number", services: "cards", gallery: "strip" }],
    art: "barber",
    features: ["Services & price list", "Online appointment booking", "Barber profiles", "Opening hours & route", "Cuts gallery"],
    upsells: ["booking", "gbp", "whatsapp", "photography", "seo"],
  }),
  d({
    key: "hair-salon", name: "Lumière", industry: "Hair salon", group: "services", legacy: "beauty",
    description: "Warm white, mocha and rosewood. Tall editorial imagery, elegant light serif and a calm treatment list.",
    mode: "light", radius: "sharp",
    fonts: { display: "Cormorant", body: "Jost", weight: 500, tracking: "-0.01em", scale: 1.2, lineHeight: 1.02 },
    palette: { bg: "#faf7f4", alt: "#f1ebe5", surface: "#ffffff", ink: "#34261f", text: "#55463e", muted: "#7c6d64", primary: "#5a4636", accent: "#a8705c", footer: "#34261f", footerInk: "#cfc2b8" },
    v: { nav: "minimal", hero: "editorial", head: "left", services: "pricelist", menu: "list", gallery: "mosaic", about: "overlap", cta: "card", footer: "centered", button: "underline" },
    alts: [{ hero: "collage", nav: "bar", services: "rows", gallery: "strip" }, { hero: "wordmark", head: "center", about: "statement" }],
    art: "hair",
    features: ["Treatments & price list", "Online appointment booking", "Stylist profiles", "Opening hours & route", "Lookbook gallery"],
    upsells: ["booking", "photography", "gbp", "copywriting", "whatsapp"],
  }),
  d({
    key: "beauty-salon", name: "Bloom", industry: "Beauty salon", group: "services", legacy: "beauty",
    description: "Blush and plum with arched imagery, centred compositions, a refined serif and treatment tiles.",
    mode: "light", radius: "round",
    fonts: { display: "Playfair Display", body: "Plus Jakarta Sans", weight: 500, tracking: "-0.02em", scale: 1.02, lineHeight: 1.08 },
    palette: { bg: "#fbf3f5", alt: "#f5e6ea", surface: "#ffffff", ink: "#4a1f35", text: "#5f4250", muted: "#866b78", primary: "#6b2c4a", accent: "#c0567c", footer: "#3a1629", footerInk: "#dcc5d0" },
    v: { nav: "stacked", hero: "frame", head: "center", services: "tiles", menu: "list", gallery: "mosaic", about: "centered", cta: "card", footer: "centered", button: "pill" },
    alts: [{ hero: "collage", nav: "bar", head: "left", services: "pricelist", about: "overlap" }, { hero: "cinema", nav: "minimal", gallery: "strip" }],
    art: "beauty",
    features: ["Treatment menu", "Online appointment booking", "Gift vouchers enquiry", "Opening hours & route", "Results gallery"],
    upsells: ["booking", "photography", "gbp", "whatsapp", "copywriting"],
  }),
  d({
    key: "car-detailing", name: "Gloss", industry: "Car detailing", group: "services", legacy: "automotive",
    description: "Showroom black with electric cyan reflections, wide extended type, detailing packages and before/after sliders.",
    mode: "dark", radius: "soft",
    fonts: { display: "Unbounded", body: "Manrope", weight: 600, tracking: "-0.035em", scale: 0.8, lineHeight: 1.1 },
    palette: { bg: "#07090c", alt: "#0c1015", surface: "#11161d", ink: "#f2f6fa", text: "#c2cad4", muted: "#8e98a5", primary: "#22d3ee", accent: "#22d3ee", footer: "#040507", footerInk: "#9aa4b1" },
    v: { nav: "pill", hero: "panel", head: "left", services: "cards", menu: "list", gallery: "grid", about: "split", cta: "full", footer: "columns", button: "solid" },
    alts: [{ hero: "cinema", nav: "minimal", head: "center", gallery: "mosaic" }, { hero: "wordmark", services: "rows", head: "number", about: "statement" }],
    art: "detailing",
    features: ["Detailing packages", "Before & after gallery", "Quote request form", "Online booking", "Service area & hours"],
    upsells: ["booking", "photography", "gbp", "seo", "whatsapp"],
  }),
  d({
    key: "garage", name: "Torque", industry: "Automotive garage", group: "services", legacy: "automotive",
    description: "Workshop grey, asphalt and signal red. Bold condensed italic capitals, a phone-first header and numbered service rows.",
    mode: "light", radius: "sharp",
    fonts: { display: "Barlow Condensed", body: "Inter", weight: 700, upper: true, tracking: "0.005em", scale: 1.26, lineHeight: 0.98 },
    palette: { bg: "#f2f3f5", alt: "#e6e8ec", surface: "#ffffff", ink: "#111827", text: "#374151", muted: "#5d6675", primary: "#111827", accent: "#d9261c", footer: "#0b0f17", footerInk: "#aab2bf" },
    v: { nav: "block", hero: "panel", head: "number", services: "rows", menu: "list", gallery: "grid", about: "split", cta: "band", footer: "columns", button: "solid" },
    alts: [{ hero: "cinema", nav: "bar", services: "cards", head: "left" }, { hero: "collage", services: "tiles", about: "overlap" }],
    art: "garage",
    features: ["Service overview", "Appointment request", "MOT / inspection reminders", "Opening hours & route", "Workshop gallery"],
    upsells: ["booking", "gbp", "seo", "whatsapp", "email"],
  }),
  d({
    key: "construction", name: "Foundation", industry: "Construction", group: "services", legacy: "construction",
    description: "Concrete grey, black and safety yellow on a blueprint grid. Monumental capitals, project portfolio and quote form.",
    mode: "light", radius: "sharp",
    fonts: { display: "Big Shoulders Display", body: "Archivo", weight: 800, upper: true, tracking: "0.005em", scale: 1.3, lineHeight: 0.96 },
    palette: { bg: "#ecebe7", alt: "#e1dfd9", surface: "#f8f7f4", ink: "#171717", text: "#3b3a37", muted: "#65635d", primary: "#171717", accent: "#f5b301", footer: "#111111", footerInk: "#b5b3ab" },
    v: { nav: "block", hero: "split", head: "number", services: "tiles", menu: "list", gallery: "mosaic", about: "statement", cta: "full", footer: "big", button: "solid" },
    alts: [{ hero: "cinema", services: "rows", gallery: "grid" }, { hero: "wordmark", nav: "minimal", services: "cards", about: "overlap" }],
    art: "construction",
    features: ["Project portfolio", "Service categories", "Quote request form", "How we work", "Service area"],
    upsells: ["seo", "photography", "copywriting", "gbp", "email"],
  }),
  d({
    key: "cleaning", name: "Fresh", industry: "Cleaning company", group: "services", legacy: "service",
    description: "Bright white, sky blue and mint. Friendly rounded shapes, a quote form in the opening screen and clear steps.",
    mode: "light", radius: "round",
    fonts: { display: "Plus Jakarta Sans", body: "Plus Jakarta Sans", weight: 800, tracking: "-0.035em", scale: 0.98, lineHeight: 1.06 },
    palette: { bg: "#ffffff", alt: "#eef7fd", surface: "#ffffff", ink: "#0f2a43", text: "#3a5068", muted: "#5f748a", primary: "#0f2a43", accent: "#0b84c6", footer: "#0f2a43", footerInk: "#b9cbdc" },
    v: { nav: "bar", hero: "card", head: "center", services: "cards", menu: "list", gallery: "grid", about: "split", cta: "band", footer: "columns", button: "pill" },
    alts: [{ hero: "split", head: "left", services: "tiles", cta: "card" }, { hero: "collage", services: "rows", about: "overlap" }],
    art: "cleaning",
    features: ["Instant quote request", "Service packages", "How it works", "Service area", "Frequently asked questions"],
    upsells: ["seo", "gbp", "whatsapp", "booking", "analytics"],
  }),
  d({
    key: "landscaping", name: "Verdant", industry: "Landscaping", group: "services", legacy: "service",
    description: "Moss green and cream with organic curves, a soft serif, full-screen garden imagery and a project portfolio.",
    mode: "light", radius: "round",
    fonts: { display: "Fraunces", body: "Manrope", weight: 400, tracking: "-0.03em", scale: 1.08, lineHeight: 1.04 },
    palette: { bg: "#f2efe4", alt: "#e7e3d3", surface: "#faf8f0", ink: "#1f3527", text: "#3f5144", muted: "#677567", primary: "#1f3527", accent: "#5b8a3a", footer: "#172a1e", footerInk: "#b7c6b6" },
    v: { nav: "bar", hero: "cinema", head: "left", services: "tiles", menu: "list", gallery: "mosaic", about: "overlap", cta: "full", footer: "columns", button: "pill" },
    alts: [{ hero: "collage", head: "number", services: "rows", gallery: "strip" }, { hero: "wordmark", nav: "minimal", about: "statement", gallery: "grid" }],
    art: "garden",
    features: ["Garden portfolio", "Design & maintenance services", "Quote request form", "How we work", "Service area"],
    upsells: ["photography", "seo", "gbp", "copywriting", "whatsapp"],
  }),

  // ── General designs for other local businesses ─────────────────────
  d({
    key: "clinic", name: "Clarity", industry: "Dental & medical practice", group: "general", legacy: "dental",
    description: "Bright, calm and reassuring with soft teal and generous rounded shapes.",
    mode: "light", radius: "round",
    fonts: { display: "Outfit", body: "Inter", weight: 600, tracking: "-0.03em", scale: 1, lineHeight: 1.08 },
    palette: { bg: "#ffffff", alt: "#effaf8", surface: "#ffffff", ink: "#0d3b38", text: "#3b5553", muted: "#5d7775", primary: "#0f766e", accent: "#0e8f84", footer: "#0d3b38", footerInk: "#b7d3cf" },
    v: { nav: "bar", hero: "split", head: "center", services: "cards", menu: "list", gallery: "grid", about: "split", cta: "band", footer: "columns", button: "pill" },
    art: "dental",
    features: ["Treatments overview", "Appointment request", "New patient information", "Opening hours & route", "Frequently asked questions"],
    upsells: ["booking", "seo", "gbp", "copywriting", "email"],
  }),
  d({
    key: "estate", name: "Estate", industry: "Real estate agency", group: "general", legacy: "realestate",
    description: "Refined navy and gold with an editorial serif — for real estate agencies.",
    mode: "light", radius: "sharp",
    fonts: { display: "Lora", body: "Inter", weight: 500, tracking: "-0.02em", scale: 1.02, lineHeight: 1.08 },
    palette: { bg: "#fbfaf7", alt: "#f1efe8", surface: "#ffffff", ink: "#0f1f3d", text: "#3d4860", muted: "#646e83", primary: "#0f1f3d", accent: "#9a7a1c", footer: "#0a162c", footerInk: "#b7bfd0" },
    v: { nav: "bar", hero: "editorial", head: "left", services: "rows", menu: "list", gallery: "mosaic", about: "overlap", cta: "full", footer: "columns", button: "solid" },
    art: "estate",
    features: ["Services overview", "Valuation request form", "How we work", "Office hours & route", "Frequently asked questions"],
    upsells: ["seo", "copywriting", "photography", "gbp", "email"],
  }),
  d({
    key: "studio", name: "Vector", industry: "Gyms & professional services", group: "general", legacy: "corporate",
    description: "Crisp indigo gradients with geometric type — for gyms, studios and consultancies.",
    mode: "light", radius: "soft",
    fonts: { display: "Space Grotesk", body: "Inter", weight: 600, tracking: "-0.04em", scale: 1, lineHeight: 1.04 },
    palette: { bg: "#ffffff", alt: "#f3f3ff", surface: "#ffffff", ink: "#1a1840", text: "#454368", muted: "#68668a", primary: "#312e81", accent: "#5a54e8", footer: "#141230", footerInk: "#bdbbe0" },
    v: { nav: "pill", hero: "centered", head: "left", services: "cards", menu: "list", gallery: "grid", about: "split", cta: "card", footer: "columns", button: "solid" },
    art: "corporate",
    features: ["Services & memberships", "Trial or intake request", "How it works", "Opening hours & route", "Frequently asked questions"],
    upsells: ["booking", "seo", "analytics", "copywriting", "gbp"],
  }),
  d({
    key: "local-service", name: "Trust", industry: "Local trades & services", group: "general", legacy: "service",
    description: "Friendly, clear and dependable blue and green — for plumbers, electricians and other trades.",
    mode: "light", radius: "soft",
    fonts: { display: "Manrope", body: "Inter", weight: 800, tracking: "-0.035em", scale: 1, lineHeight: 1.06 },
    palette: { bg: "#ffffff", alt: "#f1f6ff", surface: "#ffffff", ink: "#0f2247", text: "#3b4a69", muted: "#5f6c88", primary: "#1d4ed8", accent: "#0f8a5f", footer: "#0c1a38", footerInk: "#b6c2dc" },
    v: { nav: "block", hero: "card", head: "left", services: "cards", menu: "list", gallery: "grid", about: "split", cta: "band", footer: "columns", button: "solid" },
    art: "service",
    features: ["Services overview", "Quote / call-back form", "Emergency contact strip", "Service area", "Frequently asked questions"],
    upsells: ["seo", "gbp", "whatsapp", "email", "analytics"],
  }),
];

/**
 * The demo websites of the portfolio as templates. Colours and type here mirror the demo's
 * stylesheet (they are used for e-mails and previews); the page itself is rendered by the
 * family of the same key in src/sites/families.
 */
type FamilyInput = Pick<Design, "key" | "name" | "demo" | "original" | "industry" | "group" | "description" | "legacy" | "mode" | "radius" | "art" | "features" | "upsells"> & {
  type: [display: FontFamily, body: FontFamily, weight: number];
  colors: [bg: string, alt: string, surface: string, ink: string, text: string, muted: string, primary: string, accent: string, footer: string, footerInk: string];
};
const family = ({ type, colors, ...x }: FamilyInput): Design => ({
  ...x,
  fonts: { display: type[0], body: type[1], weight: type[2], tracking: "-0.02em", scale: 1, lineHeight: 1.04 },
  palette: { bg: colors[0], alt: colors[1], surface: colors[2], ink: colors[3], text: colors[4], muted: colors[5], primary: colors[6], accent: colors[7], footer: colors[8], footerInk: colors[9] },
  v: { nav: "bar", hero: "cinema", head: "left", services: "rows", menu: "list", gallery: "mosaic", about: "split", cta: "band", footer: "columns", button: "solid" },
});

export const FAMILY_DESIGNS: Design[] = [
  family({
    key: "vesper", name: "Vesper", demo: "restaurant", industry: "Restaurants, bars & cafés", group: "food", legacy: "restaurant", mode: "dark", radius: "sharp", art: "finedining",
    description: "Dark, warm and editorial: a tall serif with italic brass accents, film-sized photography and a menu card with tabs.",
    type: ["Cormorant Garamond", "Jost", 400],
    colors: ["#0f0c0a", "#17120e", "#17120e", "#efe6d6", "#d9cfbe", "#b3a793", "#3a1512", "#c9a46c", "#0f0c0a", "#b3a793"],
    features: ["Full-screen opening", "Menu card with tabs", "Story of the kitchen", "Editorial gallery", "Reservation request", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "copywriting"],
  }),
  family({
    key: "sage", name: "Atelier Sage", demo: "beauty-salon", industry: "Beauty, hair & skin", group: "services", legacy: "beauty", mode: "light", radius: "round", art: "beauty",
    description: "Light and calm: sand tones, a soft serif, lots of air and a clear treatment menu with prices.",
    type: ["Fraunces Soft", "Figtree", 400],
    colors: ["#f5f0e8", "#e9e1d6", "#fbf8f2", "#2b2620", "#453d34", "#655b50", "#55624b", "#55624b", "#2b2620", "#cfc6b8"],
    features: ["Calm opening", "Treatment menu with prices", "Philosophy of the salon", "The space in pictures", "Appointment request", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "kade", name: "Kade Bouw", demo: "construction", industry: "Construction & trades", group: "services", legacy: "construction", mode: "light", radius: "sharp", art: "construction",
    description: "Concrete grey, black and safety yellow with wide technical type: built for builders and trades.",
    type: ["Archivo Wide", "Archivo Narrow", 700],
    colors: ["#e7e5e0", "#f4f3ef", "#ffffff", "#111111", "#333333", "#55534d", "#111111", "#f0b90b", "#111111", "#c9c6bf"],
    features: ["Bold opening", "Services with scope", "Projects in pictures", "How a job runs", "Quote request", "Service area & contact"],
    upsells: ["seo", "gbp", "photography", "whatsapp", "copywriting"],
  }),
  family({
    key: "meridiaan", name: "Meridiaan", demo: "real-estate", industry: "Real estate, interiors & gardens", group: "services", legacy: "realestate", mode: "light", radius: "sharp", art: "estate",
    description: "Deep green and parchment with a classic serif and brass details: quiet, established, precise.",
    type: ["Playfair Display", "Manrope", 400],
    colors: ["#ece7dc", "#f7f4ed", "#f7f4ed", "#1d2a24", "#3a463f", "#58625a", "#1d2a24", "#7c5e25", "#141d19", "#b3bbb0"],
    features: ["Editorial opening", "Services overview", "Portfolio in pictures", "How we work", "Valuation or intake request", "Office hours & route"],
    upsells: ["seo", "photography", "copywriting", "gbp", "email"],
  }),
  family({
    key: "forge", name: "FORGE", demo: "fitness", industry: "Gyms, trainers & studios", group: "services", legacy: "corporate", mode: "dark", radius: "sharp", art: "corporate",
    description: "Black with acid green and huge condensed capitals: energy first, everything else after.",
    type: ["Anton", "Inter Tight", 400],
    colors: ["#0b0b0b", "#141414", "#1e1e1e", "#f4f4f0", "#d0d0ca", "#a6a6a0", "#141414", "#d7ff3e", "#0b0b0b", "#a6a6a0"],
    features: ["Loud opening", "Programmes & memberships", "Coaches", "The gym in pictures", "Trial request", "Opening hours & route"],
    upsells: ["booking", "seo", "photography", "analytics", "gbp"],
  }),
  family({
    key: "obsidian", name: "Obsidian", demo: "automotive", industry: "Cars: detailing, garages & dealers", group: "services", legacy: "automotive", mode: "dark", radius: "sharp", art: "detailing",
    description: "Near-black with ice blue, wide futuristic type and chamfered panels: technical and precise.",
    type: ["Unbounded", "Inter", 400],
    colors: ["#0a0c10", "#11151c", "#151a22", "#e8edf2", "#c3ccd6", "#9ba6b2", "#11151c", "#a9dcff", "#0a0c10", "#9ba6b2"],
    features: ["Cinematic opening", "Packages & services", "Process step by step", "Work in pictures", "Appointment request", "Workshop hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "aerden", name: "Van Aerden", demo: "law-firm", industry: "Law, finance & advice", group: "general", legacy: "corporate", mode: "light", radius: "sharp", art: "corporate",
    description: "Parchment and navy with an oxblood accent and a newspaper serif: authority without stiffness.",
    type: ["Newsreader", "IBM Plex Sans", 400],
    colors: ["#ece6da", "#f6f2e9", "#f6f2e9", "#13233a", "#2f3d52", "#4a566a", "#13233a", "#7c2228", "#0d1a2c", "#c9c2b4"],
    features: ["Typographic opening", "Practice areas", "People of the firm", "How an engagement runs", "Intake request", "Office hours & route"],
    upsells: ["seo", "copywriting", "email", "analytics", "gbp"],
  }),
  family({
    key: "lune", name: "Lune Atelier", demo: "fashion", industry: "Shops & boutiques", group: "general", legacy: "service", mode: "light", radius: "sharp", art: "service",
    description: "Bone white, ink and one deep red with a high-contrast fashion serif: a lookbook that sells.",
    type: ["Bodoni Moda", "Hanken Grotesk", 400],
    colors: ["#e6e1d8", "#f4f1ea", "#f4f1ea", "#17140f", "#38332b", "#5f594f", "#17140f", "#7a2e22", "#17140f", "#cfc8bb"],
    features: ["Lookbook opening", "Collection or range", "The story of the shop", "Gallery", "Visit or order request", "Opening hours & route"],
    upsells: ["photography", "seo", "gbp", "email", "copywriting"],
  }),
  family({
    key: "helder", name: "Helder", demo: "dental", industry: "Dental, health & care", group: "general", legacy: "dental", mode: "light", radius: "round", art: "dental",
    description: "White and mint with deep teal and a warm coral accent, large rounded shapes: friendly and clear.",
    type: ["Plus Jakarta Sans", "Plus Jakarta Sans", 700],
    colors: ["#ffffff", "#dff1ee", "#f3faf8", "#0f3b3a", "#2c4f4c", "#47625f", "#0f3b3a", "#ff8a70", "#0f3b3a", "#a9cdc8"],
    features: ["Friendly opening", "Treatments overview", "The team", "First visit explained", "Appointment request", "Opening hours & route"],
    upsells: ["booking", "seo", "gbp", "copywriting", "email"],
  }),
  family({
    key: "veldwerk", name: "Veldwerk", demo: "saas", industry: "Software & IT", group: "general", legacy: "corporate", mode: "dark", radius: "soft", art: "corporate",
    description: "Midnight violet with luminous gradients and crisp panels: product-led and modern.",
    type: ["Space Grotesk", "Inter", 500],
    colors: ["#0b0a14", "#121022", "#16132b", "#e9e6ff", "#cbc7ea", "#aaa5cf", "#5d5bf5", "#9b7bff", "#0b0a14", "#aaa5cf"],
    features: ["Product-led opening", "Services & capabilities", "How it works", "Packages", "Demo or intake request", "Frequently asked questions"],
    upsells: ["seo", "analytics", "copywriting", "email", "booking"],
  }),
  family({
    key: "ostara", name: "Hotel Ostara", demo: "hotel", industry: "Hotels, cafés & bakeries", group: "food", legacy: "service", mode: "light", radius: "sharp", art: "service",
    description: "Cream, linen and terracotta with a graceful Roman capital: slow, warm and hospitable.",
    type: ["Marcellus", "Mulish", 400],
    colors: ["#f1e9dc", "#e7dccb", "#f7f1e6", "#2a2420", "#4a4038", "#6a5d52", "#1f1a17", "#9a4a30", "#1f1a17", "#cdbfae"],
    features: ["Atmospheric opening", "Rooms, menu or range", "The story of the house", "Gallery", "Booking request", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "copywriting"],
  }),
  family({
    key: "antipode", name: "Studio Antipode", demo: "creative-agency", industry: "Creative, marketing & events", group: "general", legacy: "corporate", mode: "dark", radius: "sharp", art: "corporate",
    description: "Ink black with signal red, acid and cobalt, heavy expressive type: a studio with an opinion.",
    type: ["Syne", "Instrument Sans", 800],
    colors: ["#101010", "#1a1a1a", "#f4f1ea", "#f4f1ea", "#d6d2c8", "#a7a39a", "#2a35f0", "#ff5a36", "#101010", "#a7a39a"],
    features: ["Expressive opening", "Services", "Selected work", "How we work", "Project request", "Contact"],
    upsells: ["seo", "copywriting", "photography", "analytics", "email"],
  }),
  // Original templates: built for the library from the ground up, so businesses of the same
  // kind can get a genuinely different website, not only other colours.
  family({
    key: "brasa", name: "Brasa", demo: "brasa", original: true, industry: "Pizza, burgers, street food & snacks", group: "food", legacy: "restaurant", mode: "light", radius: "round", art: "pizza",
    description: "Warm and loud: cream, tomato red and basil, a chunky slab serif, cards with a hard offset shadow and a menu board with dotted price leaders.",
    type: ["Alfa Slab One", "Rubik", 400],
    colors: ["#f7efe2", "#fffaf1", "#fffaf1", "#1d1712", "#1d1712", "#5e5349", "#1f4d36", "#d9381e", "#d9381e", "#fffaf1"],
    features: ["Playful opening with sticker", "Menu board with price leaders", "Running band of dishes", "Polaroid gallery", "Order and reservation", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "noord", name: "Noord", demo: "noord", original: true, industry: "Hair, beauty, barbers & wellness", group: "services", legacy: "beauty", mode: "light", radius: "sharp", art: "hair",
    description: "Nordic and quiet: off-white and black, a large light serif with italics, thin rules, a price list in two columns and a horizontal photo strip.",
    type: ["Instrument Serif", "Outfit", 400],
    colors: ["#f6f5f1", "#ebe8e1", "#ffffff", "#141414", "#2a2a28", "#6b6862", "#b5603c", "#b5603c", "#141414", "#bdb9b0"],
    features: ["Editorial opening", "Price list in two columns", "Photo strip", "Team portraits", "Appointment request", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "ambacht", name: "Ambacht", demo: "ambacht", original: true, industry: "Trades, repairs & local services", group: "services", legacy: "construction", mode: "light", radius: "soft", art: "construction",
    description: "Clear and dependable: navy and white with a safety-orange call to action, condensed uppercase headings, a phone line on every screen and a quote form.",
    type: ["Barlow Condensed", "DM Sans", 700],
    colors: ["#ffffff", "#eef2f6", "#ffffff", "#0e2440", "#22344d", "#5b6b80", "#0e2440", "#f26a1b", "#0b1d34", "#a9b7c9"],
    features: ["Call-first opening", "Service cards with icons", "Step-by-step process", "Quote request", "Service area & hours", "Frequently asked questions"],
    upsells: ["seo", "gbp", "photography", "whatsapp", "copywriting"],
  }),
  family({
    key: "zondag", name: "Zondag", demo: "zondag", original: true, industry: "Cafés, bakeries, lunchrooms & shops", group: "food", legacy: "service", mode: "light", radius: "round", art: "bakery",
    description: "Soft and friendly: paper, cocoa, butter and sage, an italic serif with handwritten notes, arched photographs and a menu in coloured panels.",
    type: ["Lora", "Sora", 500],
    colors: ["#fbf4ea", "#f3e7d6", "#fffdf8", "#3a2a20", "#3a2a20", "#7a6556", "#8fa889", "#e2a93b", "#3a2a20", "#f4c95d"],
    features: ["Arched opening with a handwritten note", "Menu in coloured panels", "Polaroid gallery", "Opening hours board", "Order and visit", "Route & contact"],
    upsells: ["photography", "seo", "gbp", "booking", "whatsapp"],
  }),
  family({
    key: "velours", name: "Velours", demo: "velours", original: true, industry: "Barbers, cocktail bars, clinics & upscale salons", group: "services", legacy: "beauty", mode: "dark", radius: "sharp", art: "finedining",
    description: "Art Deco lounge: bottle green, burgundy and champagne gold, a high-contrast display face, symmetrical compositions, stepped arches with gold hairlines and a price list with dotted leaders.",
    type: ["Italiana", "Jost", 400],
    colors: ["#0d2620", "#123129", "#163a31", "#f3ead6", "#e3d8bf", "#b9ad92", "#5c1a2b", "#d4b273", "#0a1d18", "#b9ad92"],
    features: ["Curtain-reveal opening", "Price list with dotted leaders", "Arched photo frames", "Gold lines that draw themselves", "Appointment or reservation request", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "gbp", "copywriting"],
  }),
  family({
    key: "pulse", name: "Pulse", demo: "pulse", original: true, industry: "Gyms, boxing, dance, yoga & trainers", group: "services", legacy: "corporate", mode: "light", radius: "soft", art: "corporate",
    description: "Light and kinetic: white with electric cobalt and hot coral, a bold condensed headline, diagonal section cuts, huge outlined numerals, a running band of classes and an energy bar that fills as you scroll.",
    type: ["Bebas Neue", "Archivo", 400],
    colors: ["#ffffff", "#f1f4ff", "#ffffff", "#0b1030", "#2a3150", "#5a6182", "#2347ff", "#ff5a4e", "#0b1030", "#b9c0e0"],
    features: ["Kinetic opening", "Class cards", "Running band of classes", "Scroll energy bar", "Trial or intake request", "Opening hours & route"],
    upsells: ["booking", "seo", "photography", "analytics", "gbp"],
  }),
  family({
    key: "atlas", name: "Atlas", demo: "atlas", original: true, industry: "Architecture, interiors & real estate", group: "services", legacy: "realestate", mode: "light", radius: "sharp", art: "estate",
    description: "Swiss and exact: paper white and black on a visible twelve-column grid, one signal-red dot, huge numerals, a project band that runs sideways and services as a listing.",
    type: ["Archivo", "Inter Tight", 700],
    colors: ["#f4f4f1", "#e8e8e3", "#ffffff", "#0c0c0c", "#2a2a28", "#666662", "#0c0c0c", "#e4251c", "#0c0c0c", "#a8a8a2"],
    features: ["Typographic opening on the grid", "Index of the page", "Project band that scrolls sideways", "Services as a listing", "Opening hours as a timetable", "Intake or valuation request"],
    upsells: ["photography", "seo", "copywriting", "gbp", "email"],
  }),
  family({
    key: "puur", name: "Puur", demo: "puur", original: true, industry: "Health, therapy & care", group: "general", legacy: "dental", mode: "light", radius: "round", art: "dental",
    description: "Soft and reassuring: white, periwinkle and peach, a friendly rounded sans with a soft serif, slow floating shapes, a visit explained along a drawn path and a calm appointment card.",
    type: ["Manrope", "Manrope", 700],
    colors: ["#ffffff", "#f3f4fe", "#ffffff", "#232a52", "#3b4266", "#646a8a", "#4f5bd5", "#f4a582", "#eef0fd", "#3b4266"],
    features: ["Calm opening with an appointment card", "Treatments with icons", "How a visit goes, step by step", "Questions answered warmly", "Appointment request", "Opening hours & route"],
    upsells: ["booking", "seo", "gbp", "copywriting", "email"],
  }),
  family({
    key: "flora", name: "Flora", demo: "flora", original: true, industry: "Florists, gardens, landscaping & weddings", group: "services", legacy: "service", mode: "light", radius: "round", art: "garden",
    description: "Botanical and romantic: linen, sage, forest green and blush, a light italic serif, photographs in slowly changing organic shapes and fine-line pressed flowers that draw themselves.",
    type: ["Cormorant", "DM Sans", 300],
    colors: ["#f5f0e6", "#ebe3d4", "#fbf8f1", "#1d3a2e", "#1c2a23", "#56645b", "#1d3a2e", "#b9776b", "#142a21", "#a3b49b"],
    features: ["Opening with a morphing photo shape", "Garland of what you offer", "Services as leaf cards", "Process that grows as a vine", "Garden collage gallery", "Herbarium sheet with opening hours"],
    upsells: ["photography", "seo", "gbp", "booking", "copywriting"],
  }),
  family({
    key: "frame", name: "Frame", demo: "frame", original: true, industry: "Photography, video, creative studios & tattoo", group: "general", legacy: "corporate", mode: "dark", radius: "sharp", art: "corporate",
    description: "Dark and cinematic: near-black, full-bleed photography that opens like a lens, film-strip counters, a cursor ring that grows over images and a full-screen lightbox.",
    type: ["Big Shoulders Display", "Archivo", 800],
    colors: ["#0b0b0c", "#141416", "#18181b", "#efede8", "#d9d6cf", "#9a968e", "#efede8", "#f2a33a", "#070708", "#9a968e"],
    features: ["Lens-opening hero", "Film-strip gallery with frame counter", "Full-screen lightbox", "Cursor ring over images", "Services as a numbered index", "Booking request"],
    upsells: ["photography", "seo", "booking", "copywriting", "analytics"],
  }),
  family({
    key: "shiro", name: "Shiro", demo: "shiro", original: true, industry: "Sushi, ramen, Asian kitchens & tea houses", group: "food", legacy: "restaurant", mode: "light", radius: "sharp", art: "sushi",
    description: "Japanese minimalism: washi paper, sumi ink and one vermilion seal, a light serif with vertical labels, brush strokes that paint themselves and photographs in tall hanging-scroll frames.",
    type: ["Cormorant", "Inter Tight", 300],
    colors: ["#f4efe6", "#ebe4d6", "#faf7f0", "#1c1b18", "#3b3934", "#6b655b", "#1c1b18", "#c73a22", "#1c1b18", "#a39c90"],
    features: ["Ink-wash opening with a hanko seal", "Menu in quiet columns", "Folding-screen gallery", "Noren curtains for ordering", "Opening hours in an ensō", "Reservation & route"],
    upsells: ["booking", "photography", "seo", "gbp", "copywriting"],
  }),
  family({
    key: "torque", name: "Torque", demo: "torque", original: true, industry: "Garages, tyres, detailing, dealers & motorbikes", group: "services", legacy: "automotive", mode: "dark", radius: "sharp", art: "garage",
    description: "Retro motorsport: black, white and racing yellow, skewed condensed type, racing stripes and chequered flags, a start-light opening, a 24-hour gauge and a pit board of services.",
    type: ["Big Shoulders Display", "Archivo", 800],
    colors: ["#0d0d0d", "#161616", "#1c1c1c", "#f2f1ec", "#d9d7d0", "#a8a59d", "#161616", "#ffd400", "#0d0d0d", "#a8a59d"],
    features: ["Start-light opening", "24-hour gauge with today's hours", "Pit board of services", "Lap-style process", "Timing screen of opening hours", "Appointment request & route"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "ledger", name: "Ledger", demo: "ledger", original: true, industry: "Accountants, lawyers, consultants & advisers", group: "general", legacy: "corporate", mode: "light", radius: "sharp", art: "corporate",
    description: "The front page of a broadsheet: newsprint cream, black ink and one deep red, a masthead with today's date, ruled columns, drop caps and a page of classified ads for contact.",
    type: ["DM Serif Display", "Lora", 400],
    colors: ["#f2ede1", "#e6dfcd", "#f8f5ed", "#16130f", "#2b2721", "#58524a", "#16130f", "#a3161b", "#16130f", "#f8f5ed"],
    features: ["Masthead with today's date", "Headline pressed in ink", "Numbered service articles", "Feature with pull quote", "Classified-ad contact page", "Coupon request form"],
    upsells: ["seo", "copywriting", "email", "analytics", "gbp"],
  }),
  family({
    key: "kiosk", name: "Kiosk", demo: "kiosk", original: true, industry: "Ice cream, bubble tea, snacks, toys & fun cafés", group: "food", legacy: "service", mode: "light", radius: "round", art: "bakery",
    description: "Retro pop: bubblegum pink, mint, sunshine yellow and grape, chunky rounded type with marker accents, a striped awning, wavy ribbons, peel-off stickers and flavour cards that wiggle.",
    type: ["Unbounded", "Poppins", 800],
    colors: ["#fff6ea", "#cff5e8", "#fffdf8", "#35185a", "#35185a", "#685781", "#6b3fa0", "#ff5fa2", "#35185a", "#ffd23f"],
    features: ["Awning opening with stickers", "Flavour cards that wiggle", "Wavy ribbons of the menu", "Hanging opening-hours sign", "Order and visit", "Route & contact"],
    upsells: ["photography", "seo", "gbp", "whatsapp", "booking"],
  }),
  family({
    key: "apex", name: "Apex", demo: "apex", original: true, industry: "Performance & exotic cars, dealers & specialists", group: "services", legacy: "automotive", mode: "dark", radius: "sharp", art: "garage",
    description: "A dark showroom: near-black, warm white and one redline accent, a tall luxury display face, a cinema-wide opening, inventory cards that tilt and specifications that draw.",
    type: ["Italiana", "Archivo", 400],
    colors: ["#0a0a0b", "#111113", "#19191c", "#f3f1ec", "#d6d3cd", "#a19e98", "#111113", "#e3122c", "#0a0a0b", "#a19e98"],
    features: ["Cinema-wide opening", "Inventory cards with specifications", "Sideways gallery", "Racing-line process", "Opening hours on an instrument dial", "Viewing or test-drive request"],
    upsells: ["photography", "booking", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "nimbus", name: "Nimbus", demo: "nimbus", original: true, industry: "Software, IT & online services", group: "general", legacy: "corporate", mode: "light", radius: "round", art: "corporate",
    description: "Daylight product page: cool white, deep ink and electric blue with a sky-to-sunrise glow, a geometric display face, a product window that builds itself and features told at night.",
    type: ["Sora", "Inter Tight", 600],
    colors: ["#f4f6fb", "#ffffff", "#ffffff", "#0b1222", "#263049", "#566079", "#0b1222", "#2e5bff", "#ffffff", "#566079"],
    features: ["Typed headline over a live product window", "Feature story with changing screens", "Bento services", "Pricing cards", "Questions answered in a chat", "Demo or intake request"],
    upsells: ["seo", "analytics", "copywriting", "email", "booking"],
  }),
  family({
    key: "vigor", name: "Vigor", demo: "vigor", original: true, industry: "Gyms, performance clubs, boxing & personal training", group: "services", legacy: "corporate", mode: "light", radius: "sharp", art: "corporate",
    description: "An athletic campaign: chalk, graphite and one hot blaze accent, monochrome photography, oversized condensed capitals, programme lanes, a class schedule from the club's own days and memberships as race bibs.",
    type: ["Big Shoulders Display", "Archivo", 900],
    colors: ["#edece8", "#f7f6f3", "#f7f6f3", "#0c0c0d", "#0c0c0d", "#55555a", "#0c0c0d", "#ff4b12", "#0c0c0d", "#a2a29f"],
    features: ["Full-screen campaign opening", "Programme lanes with photo flash", "Class schedule by weekday", "Memberships as race bibs", "Trial lesson request", "Training hours board"],
    upsells: ["booking", "photography", "seo", "analytics", "gbp"],
  }),
  family({
    key: "cutline", name: "Cutline", demo: "cutline", original: true, industry: "Barbershops, men's grooming & tattoo studios", group: "services", legacy: "beauty", mode: "dark", radius: "sharp", art: "barber",
    description: "Underground luxury: warm black and bone, a sharp display serif cut in two, editorial photography, service cards that reveal a photograph, barber profiles and a booking panel with service, day and time.",
    type: ["DM Serif Display", "Inter Tight", 400],
    colors: ["#0d0c0b", "#171614", "#171614", "#eeeae3", "#d8d3ca", "#9d978d", "#0d0c0b", "#eeeae3", "#0d0c0b", "#9d978d"],
    features: ["Opening with a cut headline", "Service cards with photo reveal", "Barber profiles", "Horizontal photo gallery", "Booking: service, day and time", "Opening hours ledger"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "serene", name: "Serene", demo: "serene", original: true, industry: "Private clinics, aesthetic & medical care", group: "services", legacy: "beauty", mode: "light", radius: "round", art: "beauty",
    description: "Medical luxury: warm stone, porcelain and a muted champagne, a fine display capital over a light sans, photographs in tall capsule frames and treatments as detail panels.",
    type: ["Italiana", "Jost", 400],
    colors: ["#ebe6de", "#f7f4ef", "#f7f4ef", "#2a2723", "#4a453e", "#6b6359", "#2a2723", "#7d6442", "#25221e", "#ece6dc"],
    features: ["Opening that opens like a door", "Treatment detail panels", "Specialists by role", "Before & after when real photos exist", "Consultation request", "Opening hours & route"],
    upsells: ["booking", "photography", "seo", "copywriting", "gbp"],
  }),
  family({
    key: "fjord", name: "Fjord", demo: "fjord", original: true, industry: "Dental, orthodontic & healthcare practices", group: "general", legacy: "dental", mode: "light", radius: "soft", art: "dental",
    description: "Scandinavian healthcare: clean white, soft cool blue and light oak, a precise grotesk with a serif italic, treatment cards with what to expect and a menu that slides up from the bottom.",
    type: ["Manrope", "Manrope", 600],
    colors: ["#ffffff", "#f2f5f7", "#ffffff", "#14212b", "#33424e", "#5a6874", "#14212b", "#2d5b80", "#14212b", "#b9c7d3"],
    features: ["Opening with window-blind reveal", "Treatment cards with what to expect", "First visit, step by step", "The team by role", "Appointment request", "Opening hours as a week timeline"],
    upsells: ["booking", "seo", "gbp", "copywriting", "email"],
  }),
  family({
    key: "ivoor", name: "Ivoor", demo: "ivoor", original: true, industry: "Luxury real estate, architects & interiors", group: "services", legacy: "realestate", mode: "dark", radius: "sharp", art: "estate",
    description: "Architectural and cinematic: warm charcoal and ivory, an oversized hairline display face in capitals, full-screen photography, a pinned property sequence and a wipe slider.",
    type: ["Italiana", "Archivo", 400],
    colors: ["#141311", "#1c1a18", "#ece4d6", "#f3ece1", "#d9d1c4", "#a69d8f", "#141311", "#c7ab82", "#0d0c0b", "#a69d8f"],
    features: ["Cinematic slit opening", "Pinned full-screen property sequence", "Wipe slider gallery", "Process with a running step number", "Viewing or valuation request", "Office hours & route"],
    upsells: ["photography", "seo", "copywriting", "gbp", "email"],
  }),
  family({
    key: "aurum", name: "Aurum", demo: "aurum", original: true, industry: "Jewellers, watchmakers, boutiques & bridal", group: "general", legacy: "service", mode: "light", radius: "sharp", art: "service",
    description: "A fashion campaign in print: cream, true black and a whisper of gold, a light Garamond serif in roman and italic, pieces told as spreads with a loupe and collections as tabs.",
    type: ["Cormorant", "Inter", 300],
    colors: ["#f3eee5", "#ebe4d7", "#faf7f1", "#0e0d0b", "#2b2822", "#6d6558", "#0e0d0b", "#a8834a", "#0e0d0b", "#d2b27c"],
    features: ["Campaign opening with a rising headline", "Pieces as spreads with a loupe", "Collections as tabs with prices", "The making of, told sideways", "Appointment request", "Salon hours & route"],
    upsells: ["photography", "seo", "gbp", "email", "copywriting"],
  }),
  family({
    key: "etoile", name: "Étoile", demo: "etoile", original: true, industry: "Fine dining, chef's tables & wine restaurants", group: "food", legacy: "restaurant", mode: "dark", radius: "sharp", art: "finedining",
    description: "An evening in acts: charcoal and ivory chapters, warm gold hairlines and a thin couture serif, a cinematic opening and a tasting menu told course by course with photographs that swap.",
    type: ["Italiana", "Manrope", 400],
    colors: ["#121110", "#f2ecdf", "#1a1816", "#f2ecdf", "#e7dfcd", "#a8a091", "#1b1915", "#c6a46a", "#121110", "#a8a091"],
    features: ["Cinematic opening", "Tasting menu as a course timeline", "Reservation tab on every screen", "Gallery with lightbox", "Elegant reservation form", "Opening hours card"],
    upsells: ["booking", "photography", "seo", "gbp", "copywriting"],
  }),
  family({
    key: "skyline", name: "Skyline", demo: "skyline", original: true, industry: "Rooftop & cocktail bars, clubs and late-night venues", group: "food", legacy: "restaurant", mode: "dark", radius: "round", art: "fusion",
    description: "Night above the city: deep blue-black, tall condensed capitals and one restrained sunset-neon gradient, a cross-fading opening under city bokeh, a weekly programme as a line-up and a glowing generated skyline.",
    type: ["Big Shoulders Display", "Archivo", 800],
    colors: ["#07080d", "#0c0e16", "#141726", "#eef0f7", "#c9cddc", "#9ba1b6", "#07080d", "#ff4d8d", "#07080d", "#9ba1b6"],
    features: ["Cinematic night opening", "Weekly programme as a line-up", "Drinks menu with tabs", "Horizontal photo story", "Table reservation", "Opening hours departure board"],
    upsells: ["booking", "photography", "seo", "gbp", "whatsapp"],
  }),
  family({
    key: "linnen", name: "Linnen", demo: "linnen", original: true, industry: "Interior design, home & living", group: "services", legacy: "realestate", mode: "light", radius: "round", art: "estate",
    description: "Calm Scandinavian warmth: oatmeal, linen, oak and one deep moss, a light sharp serif, rounded rooms, photographs that open out of a pebble shape, a material palette and a project slider you drag.",
    type: ["Fraunces Soft", "Hanken Grotesk", 300],
    colors: ["#efe9e0", "#e5dccd", "#f8f4ed", "#2a2622", "#463f38", "#73695e", "#4c583c", "#4c583c", "#3b4530", "#efe9e0"],
    features: ["Opening with a feathered headline", "Material palette of services", "Project slider to drag", "Process on a drawn thread", "Appointment request", "Opening hours card"],
    upsells: ["photography", "booking", "seo", "copywriting", "gbp"],
  }),
  family({
    key: "monolith", name: "Monolith", demo: "monolith", original: true, industry: "Architecture, building & interior architecture", group: "services", legacy: "construction", mode: "dark", radius: "sharp", art: "construction",
    description: "Strictly monochrome and cinematic: black, concrete and white, huge condensed capitals with hollow outlines, numbered sections, projects that scroll sideways and a crosshair cursor.",
    type: ["Big Shoulders Display", "IBM Plex Sans", 800],
    colors: ["#0b0c0d", "#121315", "#1a1b1e", "#eceef0", "#c3c5c9", "#8b8e94", "#0b0c0d", "#eceef0", "#0b0c0d", "#8b8e94"],
    features: ["Cinematic opening through a slot of light", "Disciplines with photographs cut open", "Projects in a horizontal sequence", "Process stacked like floors", "Project request", "Crosshair cursor with coordinates"],
    upsells: ["photography", "seo", "copywriting", "analytics", "gbp"],
  }),
  family({
    key: "beton", name: "Beton", demo: "beton", original: true, industry: "Construction, concrete & heavy trades", group: "services", legacy: "construction", mode: "light", radius: "sharp", art: "construction",
    description: "Raw and heavy: concrete grey with grain, graphite and iron-oxide red, huge tall capitals, structural grid axes, dimension lines and a Gantt chart that builds itself.",
    type: ["Big Shoulders Display", "Space Grotesk", 800],
    colors: ["#d9d6cf", "#e6e3dd", "#e6e3dd", "#141414", "#141414", "#55524c", "#1d1e1f", "#b8371a", "#141414", "#d9d6cf"],
    features: ["Slab-by-slab opening", "Service slabs that shift into line", "Project index scrolling sideways", "Gantt-chart process", "Project request on a drawing sheet", "Hours & contact title block"],
    upsells: ["seo", "photography", "gbp", "copywriting", "whatsapp"],
  }),
  family({
    key: "stroom", name: "Stroom", demo: "stroom", original: true, industry: "Plumbing, electrical, heating & installation", group: "services", legacy: "service", mode: "light", radius: "round", art: "service",
    description: "Clean and premium: white and cool grey with electric blue and a warm heat colour, a headline that charges up, a current around the photo, a process line that carries current and an on-call panel.",
    type: ["Sora", "Inter", 600],
    colors: ["#ffffff", "#f3f6f9", "#ffffff", "#0a1324", "#2b3950", "#5a6679", "#0a1324", "#1f5bff", "#0a1324", "#a7b1c2"],
    features: ["Charging headline with live open/closed", "Service cards that light up", "Process joined by a current line", "On-call panel with hours", "Transparent example rates", "Service area map & booking"],
    upsells: ["booking", "seo", "gbp", "whatsapp", "analytics"],
  }),
  family({
    key: "maison", name: "Maison", demo: "maison", original: true, industry: "Boutique hotels, B&Bs & restaurants with rooms", group: "food", legacy: "service", mode: "light", radius: "sharp", art: "service",
    description: "Intimate and characterful: warm plaster, oxblood and night ink with a brass detail, a wonky high-contrast serif, rooms that open like doors and a page that turns from morning to night as you scroll.",
    type: ["Fraunces Soft", "Hanken Grotesk", 340],
    colors: ["#f7f1e7", "#efe5d6", "#fffaf2", "#2b1e20", "#2b1e20", "#6b5753", "#5b1820", "#5b1820", "#17121a", "#d6b679"],
    features: ["Opening behind a canal-house gable", "Rooms behind numbered doors", "Day-to-night ambient shift", "Stay planner with key card", "Restaurant & bar card", "Lobby clock with opening hours"],
    upsells: ["booking", "photography", "seo", "gbp", "copywriting"],
  }),
  family({
    key: "voyage", name: "Voyage", demo: "voyage", original: true, industry: "Travel, tours, guides & storytelling brands", group: "general", legacy: "service", mode: "light", radius: "sharp", art: "service",
    description: "A glossy travel magazine: off-white paper, deep ink and one sun-faded lagoon accent, a cover with a rising masthead, spreads with chapter numbers and drop caps, and an itinerary that scrolls sideways.",
    type: ["Playfair Display", "Newsreader", 400],
    colors: ["#f3f0e9", "#e8e3d8", "#fbfaf6", "#121519", "#262b31", "#5b6066", "#121519", "#3e6a6e", "#121519", "#86aeb0"],
    features: ["Magazine cover opening", "Destination cards with coordinates", "Sideways itinerary story", "Photo essay with captions", "Reply-card consultation request", "Practical info & hours"],
    upsells: ["photography", "copywriting", "seo", "booking", "email"],
  }),
  family({
    key: "kinetik", name: "Kinetik", demo: "kinetik", original: true, industry: "Creative, marketing & event agencies", group: "general", legacy: "corporate", mode: "light", radius: "round", art: "corporate",
    description: "Electric and experimental: off-white with volt violet, hot pink and sun yellow, one variable grotesk stretched to its extremes, letters that react to the pointer and the scroll, and work that follows the cursor.",
    type: ["Archivo Wide", "Manrope", 800],
    colors: ["#f2efe6", "#fbfaf6", "#fbfaf6", "#121116", "#121116", "#57535f", "#121116", "#5b2bff", "#121116", "#fbfaf6"],
    features: ["Kinetic type opening", "Services list with cursor previews", "Running band of services", "Approach that scrolls sideways", "Stacking photo cards", "Briefing request"],
    upsells: ["seo", "copywriting", "photography", "analytics", "email"],
  }),
  family({
    key: "vow", name: "Vow", demo: "vow", original: true, industry: "Weddings, events & celebrations", group: "general", legacy: "service", mode: "light", radius: "soft", art: "service",
    description: "Romantic and composed like stationery: ivory, champagne and powder blue, a light calligraphic italic with engraved capitals, hairline ornaments that draw themselves, an oval opening and a timeline that draws on scroll.",
    type: ["Cormorant", "DM Sans", 300],
    colors: ["#f8f4ec", "#f0e8da", "#fffdf8", "#3a3330", "#3a3330", "#6c625c", "#3a3330", "#7f6239", "#f0e8da", "#6c625c"],
    features: ["Oval opening with cross-fading photographs", "Services with a photograph that follows", "Wedding timeline that draws itself", "Packages as invitation cards", "Dissolving gallery", "Enquiry with date and guest count"],
    upsells: ["photography", "copywriting", "seo", "booking", "email"],
  }),
  family({
    key: "lexis", name: "Lexis", demo: "lexis", original: true, industry: "Law, accountancy & corporate advice", group: "general", legacy: "corporate", mode: "light", radius: "sharp", art: "corporate",
    description: "Modern corporate: ivory and deep navy with one fine metallic line, a high-contrast serif against a light grotesk, an interactive practice index and a sticky case approach.",
    type: ["DM Serif Display", "Archivo", 400],
    colors: ["#f6f3ec", "#ece7db", "#fcfbf7", "#0c1a33", "#0c1a33", "#596278", "#0c1a33", "#b0935a", "#0c1a33", "#e0cc9d"],
    features: ["Masked typographic opening", "Practice areas as an index", "Sticky case approach", "Knowledge index with tabs", "Confidential intake", "Office hours & reach"],
    upsells: ["seo", "copywriting", "email", "analytics", "gbp"],
  }),
  family({
    key: "snuf", name: "Snuf", demo: "snuf", original: true, industry: "Pet shops, pet brands & pet care", group: "general", legacy: "service", mode: "light", radius: "round", art: "service",
    description: "Playful and warm: cream, apricot and deep green, a soft chunky serif, a bento opening, a product grid with filter chips and a wishlist heart, and a subscription box.",
    type: ["Fraunces Soft", "Poppins", 800],
    colors: ["#fff6ea", "#fde6d0", "#fffdf8", "#183d30", "#183d30", "#5d6f66", "#183d30", "#f28c4f", "#183d30", "#fde6d0"],
    features: ["Bento opening with a speech bubble", "Products with filter chips", "Wishlist micro-interaction", "Subscription box", "Shop hours & pickup", "Order or pickup request"],
    upsells: ["photography", "seo", "gbp", "email", "whatsapp"],
  }),
];
DESIGNS.push(...FAMILY_DESIGNS);

export const DESIGN_KEYS = DESIGNS.map((x) => x.key);
const BY_KEY = new Map(DESIGNS.map((x) => [x.key, x]));

/** Designs that older specs (which only carry a legacy template key) are rendered with. */
const LEGACY_DESIGN: Record<TemplateKey, string> = {
  restaurant: "luxury-restaurant",
  dental: "clinic",
  construction: "construction",
  automotive: "garage",
  beauty: "beauty-salon",
  realestate: "estate",
  corporate: "studio",
  service: "local-service",
};

export function getDesign(key: string | undefined | null, legacy?: TemplateKey): Design {
  return (key && BY_KEY.get(key)) || BY_KEY.get(LEGACY_DESIGN[legacy ?? "service"])!;
}

export function designForSpec(theme: { design?: string; template: TemplateKey; variation?: number; identity?: Identity }): Design {
  const base = getDesign(theme.design, theme.template);
  // A template family has one fixed look.
  if (base.demo) return base;
  if (theme.identity) return applyIdentity(base, theme.identity);
  const alt = theme.variation ? base.alts?.[(theme.variation - 1) % (base.alts.length || 1)] : undefined;
  return alt ? { ...base, v: { ...base.v, ...alt } } : base;
}

/** Optical corrections per typeface: condensed and light serif faces must be set larger and tighter. */
const FONT_METRICS: Partial<Record<FontFamily, [scale: number, lineHeight: number]>> = {
  Anton: [1.2, 0.95], "Bebas Neue": [1.3, 0.92], Oswald: [1.14, 1], "Barlow Condensed": [1.25, 0.95], "Big Shoulders Display": [1.3, 0.92],
  Cormorant: [1.22, 1.02], "Instrument Serif": [1.2, 1.02], Italiana: [1.15, 1.06], "Playfair Display": [1.08, 1.04], Fraunces: [1.04, 1.04],
  "DM Serif Display": [1.06, 1.06], Marcellus: [1.02, 1.1], "Alfa Slab One": [0.94, 1.08], Unbounded: [0.84, 1.1], Syne: [1, 1.04], Lora: [1, 1.1],
};
const TRACKING = { tight: "-0.035em", normal: "-0.012em", wide: "0.04em" } as const;

/**
 * Turns a brand identity into a renderable design. The industry base only contributes what
 * an identity does not decide (illustration set, feature list); colours, type and every
 * layout variant come from the identity. Colours are corrected for readability: the body
 * text always reaches AAA-ish contrast on the chosen background.
 */
export function applyIdentity(base: Design, id: Identity): Design {
  const c = id.colors;
  const dark = isDark(c.background);
  const ink = contrast(c.ink, c.background) >= 7 ? c.ink : dark ? "#f4f1ea" : "#141414";
  const display = (FONT_FAMILIES as string[]).includes(id.fonts.display) ? (id.fonts.display as FontFamily) : base.fonts.display;
  const body = (FONT_FAMILIES as string[]).includes(id.fonts.body) ? (id.fonts.body as FontFamily) : base.fonts.body;
  const [scale, lineHeight] = FONT_METRICS[display] ?? [1, 1.06];
  const footer = dark ? mix(c.background, "#000000", 0.45) : mix(ink, "#000000", 0.25);
  return {
    ...base,
    mode: dark ? "dark" : "light",
    radius: id.radius,
    density: id.density,
    skin: id.skin === "plain" || BY_KEY.has(id.skin) ? id.skin : base.key,
    fonts: { display, body, accent: base.fonts.accent, weight: id.fonts.weight, italic: id.fonts.italic, upper: id.fonts.uppercase, tracking: id.fonts.uppercase && id.fonts.tracking === "tight" ? TRACKING.normal : TRACKING[id.fonts.tracking], scale, lineHeight },
    palette: {
      bg: c.background,
      alt: mix(c.background, ink, dark ? 0.05 : 0.035),
      surface: c.surface,
      ink,
      text: ensureContrast(mix(ink, c.background, 0.2), c.background, 7),
      muted: ensureContrast(mix(ink, c.background, 0.42), c.background, 4.5),
      primary: c.primary,
      accent: c.accent,
      footer,
      footerInk: mix(footer, "#ffffff", 0.72),
    },
    v: { ...id.layout },
    alts: undefined,
  };
}

/** Number of distinct layouts a design offers (primary + alternatives). */
export const variationCount = (d: Design) => 1 + (d.alts?.length ?? 0);

export function designName(key: string) {
  const x = BY_KEY.get(key) ?? BY_KEY.get(LEGACY_DESIGN[key as TemplateKey] ?? "");
  return x ? x.name : key;
}

export function designFonts(x: Design): FontFamily[] {
  return [...new Set([x.fonts.display, x.fonts.body, ...(x.fonts.accent ? [x.fonts.accent] : [])])];
}
