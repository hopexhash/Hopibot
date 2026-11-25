import { z } from "zod";

/**
 * SiteSpec: the complete, validated description of a generated website.
 * Designs render it; Claude produces and edits it. Testimonials can only be expressed
 * with a public source, and the server drops any that are not found in verified research.
 */

export const TEMPLATE_KEYS = ["restaurant", "dental", "construction", "automotive", "beauty", "realestate", "corporate", "service"] as const;
export type TemplateKey = (typeof TEMPLATE_KEYS)[number];

export const ICONS = [
  "star", "heart", "shield", "clock", "phone", "map", "leaf", "spark", "tool", "home", "car", "user", "check", "award-free", "calendar", "chat", "coffee", "utensils", "tooth", "scissors", "bolt", "drop", "key", "chart", "globe", "sun", "truck", "flame", "bag", "bike", "brush", "ruler", "camera", "sprout", "wine", "gift",
] as const;

const text = (max: number) => z.string().trim().max(max);
const cta = z.object({ label: text(40), href: text(300) });
/** Prices are only ever shown when they come from the business's own verified material. */
const price = text(24).nullable();
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
    /** Key of a design in the template library (src/sites/designs.ts). Absent on legacy specs. */
    design: z.string().max(40).optional(),
    primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    mode: z.enum(["light", "dark"]),
    font: z.string().max(40),
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
    /** Short hand-written style note or sticker text; only some designs show it. */
    note: text(48).optional(),
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
          items: z.array(z.object({ title: text(60), description: text(220), icon: z.enum(ICONS), price: price.optional(), duration: text(24).nullable().optional() })).min(1).max(12),
        }),
        z.object({
          type: z.literal("menu"),
          id: text(30),
          title: text(80),
          intro: text(300),
          categories: z.array(z.object({ name: text(50), items: z.array(z.object({ name: text(60), description: text(160), price: price.optional(), tags: z.array(text(20)).max(3).optional() })).max(10) })).max(6),
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
        z.object({
          type: z.literal("packages"),
          id: text(30),
          title: text(80),
          intro: text(300),
          items: z.array(z.object({ name: text(50), price, unit: text(30), description: text(200), features: z.array(text(80)).max(8), featured: z.boolean() })).min(1).max(4),
          note: text(200),
        }),
        z.object({
          type: z.literal("team"),
          id: text(30),
          title: text(80),
          intro: text(300),
          members: z.array(z.object({ name: text(60), role: text(60), bio: text(240), image: imageRef })).min(1).max(6),
        }),
        z.object({
          type: z.literal("booking"),
          id: text(30),
          title: text(80),
          body: text(300),
          kind: z.enum(["reservation", "appointment", "quote", "order"]),
          options: z.array(text(60)).max(10),
        }),
        z.object({
          type: z.literal("beforeafter"),
          id: text(30),
          title: text(80),
          intro: text(300),
          pairs: z.array(z.object({ before: imageRef, after: imageRef, caption: text(120) })).min(1).max(4),
        }),
        z.object({
          type: z.literal("order"),
          id: text(30),
          title: text(80),
          body: text(300),
          channels: z.array(z.object({ label: text(40), description: text(160), href: text(300), icon: z.enum(ICONS) })).min(1).max(4),
        }),
        z.object({
          type: z.literal("testimonials"),
          id: text(30),
          title: text(80),
          /** Only genuine quotes: every item needs a public source and is dropped unless verified. */
          items: z.array(z.object({ quote: text(400), author: text(80), source: text(60), sourceUrl: text(400) })).min(1).max(6),
        }),
      ]),
    )
    .min(2)
    .max(14),
  footer: z.object({ blurb: text(240) }),
});

export type SiteSpec = z.infer<typeof siteSpecSchema>;
export type SiteSection = SiteSpec["sections"][number];

/** Words that suggest invented social proof or credentials. Flagged by QC content checks. */
export const INTEGRITY_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /★{3,}|\b[45](\.\d)?\s*\/\s*5\b|\b(5|five)[- ]star/i, label: "star rating claim" },
  { re: /\b(testimonial|review(s|ed)? (by|from)|klant(en)?beoordeling|recensie)/i, label: "review/testimonial" },
  { re: /\b(award[- ]?winning|bekroond|winnaar|award)\b/i, label: "award claim" },
  { re: /\b(certified|gecertificeerd|iso ?\d{3,5}|keurmerk)\b/i, label: "certification claim" },
  { re: /(€|eur|euro)\s?\d+|\d+[,.]\d{2}\s?(€|eur)/i, label: "price" },
  { re: /\b(#1|nummer 1|best(e)? (of|van) (the|de) (city|stad|netherlands|nederland))\b/i, label: "superlative ranking claim" },
];
