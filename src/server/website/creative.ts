import "../guard";
import { and, desc, eq, gt } from "drizzle-orm";
import { z } from "zod";
import { industryProfile, type IndustryProfile } from "@/lib/industry-intel";
import { DESIGNS } from "@/sites/designs";
import { FONT_FAMILIES } from "@/sites/fonts";
import { DIRECTIONS, finalizeIdentity, fingerprintOf, identitySchema, pickDirection, presetIdentity, seedOf, type Fingerprint, type Identity } from "@/sites/identity";
import type { UsageContext } from "../costs/usage";
import { db, schema } from "../db";
import { claudeStructured, untrusted } from "../integrations/anthropic";

/**
 * Creative direction: the stage between research and writing the site. It decides, for
 * this one business, the brand strategy, the visual identity, which sections the page
 * needs (and in what order) and what the photographs should show. The website builder
 * then writes the site inside these decisions.
 */

export const SECTION_TYPES = ["about", "services", "menu", "features", "process", "gallery", "hours", "faq", "cta", "statement", "showcase", "contact", "packages", "team", "booking", "order", "testimonials"] as const;

const text = (n: number) => z.string().trim().max(n);
export const creativeBriefSchema = z.object({
  positioning: text(260),
  audience: text(220),
  /** How a customer should feel and what they should do. */
  experience: text(220),
  identity: identitySchema,
  architecture: z.array(z.object({ type: z.enum(SECTION_TYPES), purpose: text(140) })).min(4).max(10),
  /** English stock-photo search phrases (2–5 words) that fit THIS business. */
  imagery: z.object({ hero: text(60), about: text(60), gallery: text(60), detail: text(60) }),
  rationale: text(320),
});
export type CreativeBrief = z.infer<typeof creativeBriefSchema>;

/** What the most recent sites of this workspace looked like, newest first. */
export async function recentFingerprints(organizationId: string, limit = 8): Promise<Fingerprint[]> {
  const rows = await db()
    .select({ spec: schema.websiteVersions.spec, projectId: schema.websiteVersions.projectId })
    .from(schema.websiteVersions)
    .where(eq(schema.websiteVersions.organizationId, organizationId))
    .orderBy(desc(schema.websiteVersions.createdAt))
    .limit(40);
  const seen = new Set<string>();
  const out: Fingerprint[] = [];
  // Sites being generated right now have no saved version yet: their decisions are read from
  // the events they recorded, so two sites built at the same moment still differ.
  const live = await db()
    .select({ data: schema.agentLogs.data })
    .from(schema.agentLogs)
    .where(and(eq(schema.agentLogs.organizationId, organizationId), eq(schema.agentLogs.kind, "website.stage"), gt(schema.agentLogs.createdAt, new Date(Date.now() - 2 * 3600_000))))
    .orderBy(desc(schema.agentLogs.id))
    .limit(60);
  for (const l of live) {
    const fp = (l.data as { fingerprint?: Fingerprint } | null)?.fingerprint;
    if (fp?.direction && fp.hero && !out.some((o) => o.direction === fp.direction && o.hero === fp.hero && o.display === fp.display)) out.push(fp);
  }
  for (const r of rows) {
    if (seen.has(r.projectId)) continue;
    seen.add(r.projectId);
    const theme = (r.spec as { theme?: { identity?: Identity; design?: string } } | null)?.theme;
    if (theme?.identity) out.push(fingerprintOf(theme.identity, theme.design));
    if (out.length >= limit) break;
  }
  return out;
}

/** A sensible page structure for an industry when no AI is available. */
function defaultArchitecture(profile: IndustryProfile, seed: number, photos: boolean): CreativeBrief["architecture"] {
  const extras = profile.optional.filter((t) => photos || (t !== "gallery" && t !== "showcase"));
  // Two or three optional sections, chosen per business so pages do not share one skeleton.
  const chosen = extras.filter((_, i) => (seed >> i) % 2 === 0).slice(0, 3);
  const body = [...new Set([...profile.essentials, ...chosen])];
  // Vary what follows the hero: sometimes the offer first, sometimes the story or a statement.
  const lead = seed % 3 === 0 && body.includes("statement") ? "statement" : seed % 3 === 1 && body.includes("about") ? "about" : body[0];
  const ordered = [lead, ...body.filter((t) => t !== lead)];
  if (!ordered.includes("contact")) ordered.push("contact");
  return ordered.slice(0, 9).map((type) => ({ type: type as CreativeBrief["architecture"][number]["type"], purpose: "" }));
}

/** Brief without AI: deterministic, industry-aware and steered away from recent work. */
export function fallbackBrief(b: { name: string; category: string }, baseDesign: string, recent: Fingerprint[], photos: boolean): CreativeBrief {
  const profile = industryProfile(b.category);
  const seed = seedOf(b.name);
  const direction = pickDirection(profile.directions, seed, recent);
  const identity = finalizeIdentity(presetIdentity(direction, seed, seed % 2 ? "plain" : baseDesign, recent, { photos }), seed, recent, { photos, category: baseDesign });
  return {
    positioning: "",
    audience: profile.audience,
    experience: profile.goal,
    identity,
    architecture: defaultArchitecture(profile, seed, photos),
    imagery: { hero: profile.imagery.split(",")[0].slice(0, 60), about: "people at work", gallery: profile.label, detail: `${profile.label} detail` },
    rationale: `${DIRECTIONS.find((d) => d.key === direction)!.label} direction chosen for a ${profile.label}, avoiding what recent sites used.`,
  };
}

const SKINS = DESIGNS.map((d) => `${d.key} (${d.description.slice(0, 70)})`).join("; ");

/**
 * Asks Claude, acting as creative director, for the brief. The result is validated, its
 * identity is sanitised and checked against recent work; on any failure the deterministic
 * brief is used, so a site is never blocked by this stage.
 */
export async function planCreative(
  usage: UsageContext,
  input: { business: { name: string; category: string; city: string | null }; baseDesign: string; research: { profile: unknown; brief: unknown } | null; recent: Fingerprint[]; photos: boolean; model?: string | null },
): Promise<{ brief: CreativeBrief; costUsd: number; source: "ai" | "fallback"; note?: string }> {
  const profile = industryProfile(input.business.category);
  const seed = seedOf(input.business.name);
  const recentLines = input.recent.slice(0, 6).map((r, i) => `${i + 1}. ${r.direction}, hero "${r.hero}", display font ${r.display}, ${r.dark ? "dark" : "light"}${r.category ? ` (${r.category})` : ""}`);
  try {
    const res = await claudeStructured({
      ctx: usage,
      operation: "creative_direction",
      schema: creativeBriefSchema,
      model: input.model,
      effort: "medium",
      maxTokens: 6000,
      system: `You are the creative director of a premium web design agency. For ONE business you decide the brand strategy, the visual identity and the structure of its website. A designer will then build exactly what you specify, so be decisive and specific.

Principles
- Design for this business, not for its industry. Two barbershops must not get the same site. Read the research: positioning, price level, audience and character decide the direction.
- Avoid the predictable look of the industry (given below). The obvious choice is only right when the business really is that.
- Be distinct from the agency's recent sites (listed below): choose another direction, another hero composition and another display typeface.
- Every section must earn its place. Do not add a gallery, FAQ, booking form or card grid by habit. Fewer, stronger sections beat a long generic page. The order follows what this visitor needs first; do not default to about → services → gallery → contact.
- Never plan content that needs facts the research does not contain (team members, prices, reviews, awards, certifications, statistics).

Identity
- direction: one of ${DIRECTIONS.map((d) => `${d.key} (${d.traits})`).join(" | ")}.
- colors: five hex colours designed together for this brand: background, surface (cards/panels, close to background), ink (headings; strong contrast on background), primary (a deep brand colour used for large coloured areas), accent (buttons and highlights; must stand out on the background). Choose an original palette that fits the brand; do not default to black+gold, blush pink or navy+orange.
- fonts: display and body from this list only: ${FONT_FAMILIES.join(", ")}. Pair deliberately (a characterful display with a quiet body, or one family for both). weight 300–800, italic only for serif display faces, uppercase only for condensed or geometric display faces.
- layout: choose every variant deliberately so the page has rhythm (do not use the same pattern for everything):
  nav: bar | stacked (logo centred above links) | pill (floating rounded bar) | block (solid bar, uppercase) | minimal
  hero: cinema (full-screen photo, text over it) | split (text + photo side by side) | centered | editorial (magazine layout, side column) | poster (bold type + tilted photo) | frame (arched photo trio) | minimal (huge type, small round photo) | panel (photo fills one half edge to edge) | card (photo with booking form card) | wordmark (the business name set across the full width) | collage (three overlapping photos) | stack (giant headline, wide photo underneath) | offset (tall photo with a second overlapping, copy set low)
  head (section headings): left | center | ornament | number (large outlined numerals) | tape (label on tape)
  services: cards | pricelist (dotted price list) | rows (lined rows) | tiles (photo tiles) | index (large numbered typographic list) | bento (mixed tiles, first one large with a photo)
  menu: list | cards | board | rows | courses
  gallery: mosaic | strip | grid | polaroid | scroller (horizontal run, mixed sizes) | bento (asymmetric grid)
  about: split | overlap (two photos) | centered | statement (large opening sentence)
  cta: band | full (over a photo) | card;  footer: columns | centered | big;  button: solid | outline | hard (offset shadow) | pill | underline
- skin: decorative detailing. Use "plain" unless one of these clearly suits the brand: ${SKINS}.
- radius sharp | soft | round, density airy | balanced | compact: follow the direction.
${input.photos ? "- Real photographs are available: use them with intent (a showcase band, a scroller gallery, a photo-led hero) where they tell the story." : "- NO photographs are available for this site. Plan a typography-led site: no gallery, no showcase, no photo tiles; let type, colour and structure carry the design."}

Architecture
- 4 to 9 sections after the hero, each with a one-line purpose. Types: ${SECTION_TYPES.join(", ")}.
- "statement" is one large sentence of the brand's point of view (use at most once). "showcase" is a full-width photograph with a caption (only with photographs). "menu" only for food. "contact" is always last.

Imagery: four English stock-photo search phrases of 2–5 words that fit this business's actual offer and mood (for example "espresso bar counter morning", not "coffee").`,
      prompt: [
        `Business: ${input.business.name}${input.business.city ? `, ${input.business.city}` : ""}`,
        `Industry: ${profile.label}. Typical audience: ${profile.audience}. What visitors want: ${profile.goal}.`,
        `Sections that usually matter: ${profile.essentials.join(", ")}. Only with real material: ${profile.optional.join(", ")}.`,
        `Photography that fits: ${profile.imagery}.`,
        `Directions that tend to suit this industry (not a rule): ${profile.directions.join(", ")}.`,
        `The predictable look to avoid: ${profile.cliche}.`,
        recentLines.length ? `The agency's most recent sites (be different):\n${recentLines.join("\n")}` : "No recent sites yet.",
        "Research on this business (facts are marked verified; treat the rest as unconfirmed):",
        untrusted("business research", JSON.stringify(input.research ?? {}), 9000),
      ].join("\n\n"),
    });
    const brief = res.data;
    brief.identity = finalizeIdentity(brief.identity, seed, input.recent, { photos: input.photos, category: input.baseDesign });
    // The page always ends with a way to get in touch, and never plans photo sections without photos.
    brief.architecture = brief.architecture.filter((s) => input.photos || (s.type !== "gallery" && s.type !== "showcase"));
    if (!brief.architecture.some((s) => s.type === "contact")) brief.architecture.push({ type: "contact", purpose: "Get in touch" });
    return { brief, costUsd: res.costUsd, source: "ai" };
  } catch (err) {
    return { brief: fallbackBrief(input.business, input.baseDesign, input.recent, input.photos), costUsd: 0, source: "fallback", note: (err as Error).message.slice(0, 160) };
  }
}
