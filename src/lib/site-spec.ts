import { z } from "zod";

/**
 * SiteSpec: the complete, validated description of a generated website.
 * Templates render it; Claude produces and edits it. There is intentionally no
 * testimonial/review section type, so invented reviews cannot be expressed.
 */

export const TEMPLATE_KEYS = ["restaurant", "dental", "construction", "automotive", "beauty", "realestate", "corporate", "service"] as const;
export type TemplateKey = (typeof TEMPLATE_KEYS)[number];

export const ICONS = [
  "star", "heart", "shield", "clock", "phone", "map", "leaf", "spark", "tool", "home", "car", "user", "check", "award-free", "calendar", "chat", "coffee", "utensils", "tooth", "scissors", "bolt", "drop", "key", "chart", "globe", "sun",
] as const;

const text = (max: number) => z.string().trim().max(max);
const cta = z.object({ label: text(40), href: text(300) });
const imageRef = z.string().max(80).describe("Key of an image in `images`, or 'art:<motif>' for generated artwork");

export const siteSpecSchema = z.object({
  meta: z.object({
    title: text(70),
    description: text(170),
    lang: z.enum(["nl", "en", "de", "fr"]),
    keywords: z.array(text(40)).max(12),
  }),
  theme: z.object({
    template: z.enum(TEMPLATE_KEYS),
    primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    mode: z.enum(["light", "dark"]),
    font: z.enum(["Poppins", "Inter"]),
    radius: z.enum(["sharp", "soft", "round"]),
  }),
  business: z.object({
    name: text(120),
    tagline: text(140),
    phone: text(40).nullable(),
    email: text(120).nullable(),
    address: text(200).nullable(),
    city: text(80).nullable(),
    mapsUrl: text(500).nullable(),
    openingHours: z.array(text(80)).max(10).nullable(),
  }),
  images: z
    .array(
      z.object({
        key: text(40),
        src: text(600),
        alt: text(160),
        license: z.enum(["generated", "authorised", "stock"]),
        credit: text(160).nullable(),
      }),
    )
    .max(20)
    .default([]),
  hero: z.object({
    eyebrow: text(60),
    headline: text(90),
    subheadline: text(240),
    primaryCta: cta,
    secondaryCta: cta.nullable(),
    image: imageRef,
    layout: z.enum(["split", "fullbleed", "centered"]),
  }),
  sections: z
    .array(
      z.discriminatedUnion("type", [
        z.object({ type: z.literal("about"), id: text(30), title: text(80), paragraphs: z.array(text(600)).min(1).max(4), image: imageRef, highlights: z.array(text(60)).max(4) }),
        z.object({
          type: z.literal("services"),
          id: text(30),
          title: text(80),
          intro: text(300),
          items: z.array(z.object({ title: text(60), description: text(220), icon: z.enum(ICONS) })).min(1).max(9),
        }),
        z.object({
          type: z.literal("menu"),
          id: text(30),
          title: text(80),
          intro: text(300),
          categories: z.array(z.object({ name: text(50), items: z.array(z.object({ name: text(60), description: text(160) })).max(8) })).max(5),
          note: text(200),
        }),
        z.object({
          type: z.literal("features"),
          id: text(30),
          title: text(80),
          intro: text(300),
          items: z.array(z.object({ title: text(60), description: text(220), icon: z.enum(ICONS) })).min(1).max(6),
        }),
        z.object({ type: z.literal("process"), id: text(30), title: text(80), intro: text(300), steps: z.array(z.object({ title: text(60), description: text(220) })).min(2).max(6) }),
        z.object({ type: z.literal("gallery"), id: text(30), title: text(80), images: z.array(imageRef).min(1).max(9) }),
        z.object({ type: z.literal("hours"), id: text(30), title: text(80), note: text(200) }),
        z.object({ type: z.literal("faq"), id: text(30), title: text(80), items: z.array(z.object({ q: text(140), a: text(500) })).min(1).max(8) }),
        z.object({ type: z.literal("cta"), id: text(30), title: text(90), body: text(240), cta }),
        z.object({ type: z.literal("contact"), id: text(30), title: text(80), body: text(300), showForm: z.boolean(), showMap: z.boolean() }),
      ]),
    )
    .min(2)
    .max(12),
  footer: z.object({ blurb: text(240) }),
});

export type SiteSpec = z.infer<typeof siteSpecSchema>;
export type SiteSection = SiteSpec["sections"][number];

export const TEMPLATE_INFO: Record<TemplateKey, { name: string; description: string; primary: string; accent: string; mode: "light" | "dark"; radius: "sharp" | "soft" | "round"; heroLayout: "split" | "fullbleed" | "centered" }> = {
  restaurant: { name: "Maison", description: "Dark, warm and atmospheric with gold accents — for restaurants, cafés and hotels.", primary: "#1c1917", accent: "#c8a165", mode: "dark", radius: "soft", heroLayout: "fullbleed" },
  dental: { name: "Clarity", description: "Bright, calm and reassuring with soft teal — for dental and medical practices.", primary: "#0f766e", accent: "#38bdf8", mode: "light", radius: "round", heroLayout: "split" },
  construction: { name: "Foundation", description: "Bold, solid and confident with strong contrast — for builders and renovators.", primary: "#1e293b", accent: "#f97316", mode: "light", radius: "sharp", heroLayout: "split" },
  automotive: { name: "Torque", description: "Dark, technical and precise with a racing accent — for garages and dealers.", primary: "#111827", accent: "#ef4444", mode: "dark", radius: "sharp", heroLayout: "fullbleed" },
  beauty: { name: "Bloom", description: "Airy, elegant and soft — for salons, hairdressers and beauty studios.", primary: "#7c3f58", accent: "#e8a5b8", mode: "light", radius: "round", heroLayout: "centered" },
  realestate: { name: "Estate", description: "Refined navy and gold, editorial layout — for real estate agencies.", primary: "#0f1f3d", accent: "#c9a227", mode: "light", radius: "sharp", heroLayout: "split" },
  corporate: { name: "Vector", description: "Crisp, modern gradients — for gyms, consultancies and corporate services.", primary: "#312e81", accent: "#6366f1", mode: "light", radius: "soft", heroLayout: "centered" },
  service: { name: "Trust", description: "Friendly, clear and dependable — for plumbers, electricians and local services.", primary: "#1d4ed8", accent: "#10b981", mode: "light", radius: "soft", heroLayout: "split" },
};

/** Words that suggest invented social proof or credentials. Flagged by QC content checks. */
export const INTEGRITY_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /★{3,}|\b[45](\.\d)?\s*\/\s*5\b|\b(5|five)[- ]star/i, label: "star rating claim" },
  { re: /\b(testimonial|review(s|ed)? (by|from)|klant(en)?beoordeling|recensie)/i, label: "review/testimonial" },
  { re: /\b(award[- ]?winning|bekroond|winnaar|award)\b/i, label: "award claim" },
  { re: /\b(certified|gecertificeerd|iso ?\d{3,5}|keurmerk)\b/i, label: "certification claim" },
  { re: /(€|eur|euro)\s?\d+|\d+[,.]\d{2}\s?(€|eur)/i, label: "price" },
  { re: /\b(#1|nummer 1|best(e)? (of|van) (the|de) (city|stad|netherlands|nederland))\b/i, label: "superlative ranking claim" },
];
