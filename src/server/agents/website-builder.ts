import "../guard";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { selectIndustry, selectLook } from "@/lib/design-select";
import { industryProfile } from "@/lib/industry-intel";
import { stageEvent, stageLabel } from "@/lib/website-stages";
import { DIRECTIONS, finalizeIdentity, fingerprintOf, seedOf } from "@/sites/identity";
import { fallbackBrief, planCreative, recentFingerprints, type CreativeBrief } from "../website/creative";
import { siteSpecSchema, type SiteSpec } from "@/lib/site-spec";
import { DESIGN_KEYS, getDesign } from "@/sites/designs";
import { familyOf } from "@/sites/families";
import { FONT_FAMILIES } from "@/sites/fonts";
import { db, schema } from "../db";
import { claudeStructured } from "../integrations/anthropic";
import { IntegrationUnavailableError } from "../integrations/credentials";
import { advanceStage, notifyEvent } from "../orchestrator/tasks";
import type { AgentContext, AgentHandler } from "../orchestrator/types";
import { usedLooks } from "../website/looks";
import { buildMockSpec } from "../website/mock-spec";
import { attachStockPhotos } from "../website/photos";
import { enforceSpec, ensureProject, saveVersion, siteLanguage } from "../website/service";

const SPEC_GUIDE = `You produce a SiteSpec JSON document that our design system renders into a website.
- The creative brief decides the brand identity and the page structure. Build exactly the sections it lists, in that order (you may drop one when the verified data cannot fill it honestly). Do not add sections by habit.
- theme: copy the values given under "Theme to use". The identity is applied by the system.
- Image references: "art:hero" for the hero, "art:about" for an about section, "art:g1".."art:g6" in a gallery, "art:show" for a showcase. Only reference keys from "images" if they are already present.
- Headlines: short, specific and concrete, max ~8 words; emphasis with *asterisks* is allowed in the hero headline and in at most one other headline on the whole page, never in every heading. Write like a good copywriter for this exact business, not like a template: no "Welcome to", no "Quality and service", no filler.
- "statement": one confident sentence (max ~16 words) expressing what this business stands for, grounded in the research. "showcase": a short caption for a full-width photograph.
- Sections available: about, services, menu, features, process, gallery, hours, faq, cta, statement, showcase, contact, packages, team, booking, beforeafter, order, testimonials.
- "menu" only for food businesses. "booking" kinds: reservation (restaurants), appointment (salons, garages, clinics), quote (trades), order (takeaway).
- Prices (menu price, service price, package price): ONLY when the exact price appears in the verified data; otherwise null. Never estimate.
- "team": only real people named in the verified data; otherwise omit the section.
- "testimonials": only verbatim quotes that appear in the verified research, with their public source URL; otherwise omit the section. They are removed automatically if they cannot be verified.
- Section ids: short, lowercase, in the site language (e.g. "diensten", "contact").
- CTA hrefs must be in-page anchors to section ids ("#contact"), or "tel:" with the verified phone.
- Write all copy in the business's language. Be concrete and warm, avoid clichés, avoid filler and superlatives.
- NEVER invent reviews, ratings, awards, certifications, prices, years of experience, team names, guarantees, statistics or opening hours. Describe services in general terms when unverified.
- Business contact details are filled in by the system from verified data; you may leave them null.`;

async function loadBusinessAndResearch(ctx: AgentContext) {
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, ctx.task.businessId!), eq(schema.businesses.organizationId, ctx.organizationId)));
  if (!b) throw new Error("Business not found");
  const [research] = await db()
    .select()
    .from(schema.businessResearch)
    .where(eq(schema.businessResearch.businessId, b.id))
    .orderBy(desc(schema.businessResearch.createdAt))
    .limit(1);
  const [email] = await db()
    .select({ value: schema.businessContacts.value })
    .from(schema.businessContacts)
    .where(and(eq(schema.businessContacts.businessId, b.id), eq(schema.businessContacts.type, "email"), eq(schema.businessContacts.source, "website")))
    .limit(1);
  return { b, research: research ?? null, verifiedEmail: email?.value ?? null };
}

async function currentSpec(projectId: string): Promise<{ spec: SiteSpec; versionId: string; qcAttempts: number } | null> {
  const [p] = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, projectId));
  if (!p?.currentVersionId) return null;
  const [v] = await db().select().from(schema.websiteVersions).where(eq(schema.websiteVersions.id, p.currentVersionId));
  return v ? { spec: siteSpecSchema.parse(v.spec), versionId: v.id, qcAttempts: v.qcAttempts } : null;
}

const improveSchema = z.object({ spec: siteSpecSchema, changeSummary: z.string().max(400) });

function mockImprove(spec: SiteSpec, instruction: string): { spec: SiteSpec; changeSummary: string } {
  const s = structuredClone(spec);
  const i = instruction.toLowerCase();
  const changes: string[] = [];
  if (/premium|luxury|luxe|elegant/.test(i)) {
    s.theme.mode = "dark";
    s.theme.radius = "sharp";
    s.hero.layout = "fullbleed";
    changes.push("switched to a dark, sharp, full-bleed premium look");
  }
  if (/hero|modern/.test(i)) {
    s.hero.layout = s.hero.layout === "split" ? "centered" : "split";
    changes.push(`changed hero layout to ${s.hero.layout}`);
  }
  if (/light|bright|licht/.test(i)) {
    s.theme.mode = "light";
    changes.push("switched to light mode");
  }
  if (/round|soft|friendly/.test(i)) {
    s.theme.radius = "round";
    changes.push("softened corners");
  }
  if (!changes.length) changes.push("no deterministic change matched the instruction (MOCK mode — connect Anthropic for real edits)");
  return { spec: s, changeSummary: `MOCK improvement: ${changes.join("; ")}.` };
}

/** Deterministic fixes for mechanical QC findings; content issues go to Claude when available. */
export function autoFix(spec: SiteSpec, issues: { code: string; detail?: string }[]): { spec: SiteSpec; fixed: string[] } {
  const s = structuredClone(spec);
  const fixed: string[] = [];
  for (const issue of issues) {
    if (issue.code === "meta_title" && (s.meta.title.length < 10 || s.meta.title.length > 70)) {
      s.meta.title = `${s.business.name}${s.business.city ? ` | ${s.business.city}` : ""}`.slice(0, 70);
      fixed.push("meta title");
    }
    if (issue.code === "meta_description" && (s.meta.description.length < 50 || s.meta.description.length > 170)) {
      s.meta.description = `${s.business.name}${s.business.city ? ` in ${s.business.city}` : ""}. ${s.hero.subheadline}`.slice(0, 160);
      fixed.push("meta description");
    }
    if (issue.code === "no_contact_section" && !s.sections.some((x) => x.type === "contact")) {
      s.sections.push({ type: "contact", id: "contact", title: "Contact", body: "", showForm: true, showMap: Boolean(s.business.mapsUrl) });
      fixed.push("added contact section");
    }
    if (issue.code === "content_integrity" && issue.detail) {
      // Remove whole sentences containing an unverified claim.
      const strip = (t: string) =>
        t
          .split(/(?<=[.!?])\s+/)
          .filter((sentence) => !sentence.includes(issue.detail!.slice(0, 40)))
          .join(" ");
      const walk = (o: Record<string, unknown>) => {
        for (const [k, v] of Object.entries(o)) {
          if (typeof v === "string" && v.includes(issue.detail!.slice(0, 40))) o[k] = strip(v) || "";
          else if (v && typeof v === "object") walk(v as Record<string, unknown>);
        }
      };
      walk(s as unknown as Record<string, unknown>);
      fixed.push("removed unverified claim");
    }
  }
  return { spec: s, fixed };
}

async function spawnQc(ctx: AgentContext, businessId: string, projectId: string, versionId: string, next: string[], iteration: number, visualRound = 0) {
  const runKey = ctx.task.runId ?? `adhoc-${ctx.task.id}`;
  await ctx.spawn({
    agentKey: "quality_control",
    type: "test_website",
    businessId,
    projectId,
    input: { versionId, next, iteration, visualRound },
    idempotencyKey: `${runKey}:qc:${businessId}:${versionId}`,
    priority: 4,
  });
}

export const websiteBuilder: AgentHandler = async (ctx) => {
  const type = ctx.task.type;
  const input = ctx.task.input as { next?: string[]; iteration?: number; instruction?: string; spec?: unknown; issues?: { code: string; message: string; detail?: string }[]; weaknesses?: { area: string; problem: string; fix: string }[]; visualRound?: number; variation?: number; summary?: string };
  // The builder always triggers QC itself, so an explicit "qc" step is consumed here.
  const next = (input.next ?? []).filter((a) => a !== "qc");
  const iteration = input.iteration ?? 0;
  const { b, research, verifiedEmail } = await loadBusinessAndResearch(ctx);
  const mode = await ctx.mode("anthropic");
  if (mode === "unavailable" && type !== "apply_edit") throw new IntegrationUnavailableError("anthropic");
  const isMock = mode === "mock";
  const project = ctx.task.projectId
    ? (await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, ctx.task.projectId)))[0]
    : await ensureProject(ctx.organizationId, b);
  if (!project) throw new Error("Website project not found");
  await db().update(schema.websiteProjects).set({ status: "generating", updatedAt: new Date() }).where(eq(schema.websiteProjects.id, project.id));
  // Design selection: an operator's/previous choice on the project wins, else category + research signals.
  const researchText = research ? JSON.stringify(research.profile).slice(0, 4000) : "";
  const lang = siteLanguage(b, researchText);
  const langRule = `\nLanguage: write every word of the website in ${lang === "fr" ? "French" : "Dutch"} and set meta.lang to "${lang}", also when the research, reviews or the business's own listing are in another language (for example English).`;
  // A new site is always built in one of the demo designs; later versions of a site keep the design they have.
  const current = DESIGN_KEYS.includes(project.templateKey) ? getDesign(project.templateKey) : null;
  // A new site gets the best-fitting look (design + colourway) that no other business of the same
  // kind has, nearby first; a site that already has a design keeps it, colours included.
  const keep = Boolean(current && (type !== "generate_website" || current.demo));
  const look = keep ? null : selectLook({ category: b.category, name: b.name, city: b.city, text: researchText }, await usedLooks(ctx.organizationId, project.id));
  const chosen = look ?? { design: current!, reason: "kept from the project" };
  // A template chosen by hand ("use this template") brings its colourway along in the task.
  const keptVariation = keep ? (typeof input.variation === "number" ? input.variation : ((await currentSpec(project.id))?.spec.theme.variation ?? 0)) : 0;
  // A demo design without its family (one that is still being built) falls back to the classic design of the industry.
  const design = chosen.design.demo && !familyOf(chosen.design.key) ? selectIndustry({ category: b.category, name: b.name, text: researchText }).design : chosen.design;
  // A demo design has one fixed look: no identity is planned for it. The industry still decides content and photographs.
  const fixedLook = Boolean(design.demo);
  const industry = selectIndustry({ category: b.category, name: b.name, text: researchText }).design;
  if (project.templateKey !== design.key) await db().update(schema.websiteProjects).set({ templateKey: design.key }).where(eq(schema.websiteProjects.id, project.id));

  let spec: SiteSpec;
  let changeSummary: string;
  let instruction: string | null = null;
  let createdBy = "agent";
  let qcAttempts = 0;

  let brief: CreativeBrief | null = null;
  const stage = (n: number, detail: string, status: "running" | "completed" | "warning" = "running") => ctx.log("info", `${stageLabel(n)}: ${detail}`, stageEvent(n, status));
  const photoProvider = type !== "generate_website" && type !== "refine_design" ? null : (await ctx.mode("pexels")) === "live" ? "pexels" : (await ctx.mode("unsplash")) === "live" ? "unsplash" : null;

  if (type === "generate_website") {
    const profile = industryProfile(b.category);
    await stage(2, `${b.name} is a ${profile.label}. Visitors want to ${profile.goal}.`, "completed");
    let plannedByAi = false;
    const recent = fixedLook ? [] : await recentFingerprints(ctx.organizationId);
    if (fixedLook) await stage(3, `${design.name} design (${chosen.reason}). ${design.description}`.slice(0, 400), "completed");
    else await stage(3, recent.length ? `comparing with the ${recent.length} most recent sites so this one looks different` : "first site with a brand identity");
    if (isMock || !research) {
      if (!research) await ctx.log("warn", "No research found — building from verified listing data only.");
      brief = fallbackBrief(b, industry.key, recent, Boolean(photoProvider));
    } else {
      await ctx.heartbeat();
      const planned = await planCreative(ctx.usage, { business: b, baseDesign: industry.key, research, recent, photos: Boolean(photoProvider), model: ctx.config.model, look: fixedLook ? { name: design.name, description: design.description } : undefined });
      brief = planned.brief;
      if (planned.source === "fallback") await ctx.log("warn", `Creative direction could not be generated (${planned.note}); using the built-in direction for this industry.`);
      else plannedByAi = true;
    }
    let id = brief.identity;
    if (fixedLook) {
      // Only a plan that was really made for this business is reported; the built-in one says nothing about it.
      if (plannedByAi && brief.rationale) await stage(4, brief.rationale.slice(0, 400), "completed");
    } else {
      // Decide against the very latest state: another site may have been planned in the meantime.
      const latest = await recentFingerprints(ctx.organizationId);
      id = brief.identity = finalizeIdentity(brief.identity, seedOf(b.name), latest, { photos: Boolean(photoProvider), category: design.key });
      await ctx.log("debug", "identity decided", { kind: "website.stage", stage: 4, status: "info", fingerprint: fingerprintOf(id, design.key) });
      await stage(3, `${id.personality || "identity defined"} — ${id.fonts.display} with ${id.fonts.body}, accent ${id.colors.accent} on ${id.colors.background}`, "completed");
      await stage(4, `${DIRECTIONS.find((d) => d.key === id.direction)?.label ?? id.direction}, "${id.layout.hero}" opening. ${brief.rationale}`.slice(0, 400), "completed");
    }
    await stage(5, brief.architecture.map((s) => s.type).join(" → "), "completed");

    if (isMock || !research) {
      // Without Claude the copy comes from the fact-safe blueprint, arranged as the brief planned it.
      const base = buildMockSpec(b, design.key);
      const order = brief.architecture.map((s) => s.type as string);
      const kept = order.map((t) => base.sections.find((s) => s.type === t)).filter((s): s is SiteSpec["sections"][number] => Boolean(s));
      spec = { ...base, sections: kept.length >= 2 ? kept : base.sections };
      changeSummary = isMock ? "Initial version (MOCK — copy from templates, identity from the built-in direction engine)." : "Initial version from listing data.";
    } else {
      await stage(7, fixedLook ? `writing ${brief.architecture.length} sections for the ${design.name} design` : `writing ${brief.architecture.length} sections for the "${id.layout.hero}" composition`);
      const res = await claudeStructured({
        ctx: ctx.usage,
        operation: "generate_website",
        schema: siteSpecSchema,
        model: ctx.config.model,
        effort: (ctx.config.effort as "high") ?? "high",
        maxTokens: 32000,
        system: `You are the senior designer and copywriter of a premium web design agency, building one website from a creative brief.\n${SPEC_GUIDE}\nOperator instructions: ${ctx.config.instructions || "(none)"}${langRule}`,
        prompt: [
          "Creative brief (decided by the creative director; follow it):",
          JSON.stringify(
            fixedLook
              ? { positioning: brief.positioning, audience: brief.audience, experience: brief.experience, design: `${design.name}: ${design.description}`, sections: brief.architecture }
              : { positioning: brief.positioning, audience: brief.audience, experience: brief.experience, direction: id.direction, personality: id.personality, heroComposition: id.layout.hero, sections: brief.architecture },
            null,
            2,
          ),
          fixedLook
            ? `Theme to use: design "${design.key}", template "${design.legacy}", primary ${design.palette.primary}, accent ${design.palette.accent}, mode ${design.mode}, font "${design.fonts.display}", radius ${design.radius}.`
            : `Theme to use: design "${design.key}", template "${design.legacy}", primary ${id.colors.primary}, accent ${id.colors.accent}, mode ${design.mode}, font "${id.fonts.display}", radius ${id.radius}.`,
          `Industry context (${profile.label}): the usual booking kind is "${profile.booking}". ${photoProvider ? "Real photographs will be placed in the image slots." : "No photographs are available: do not create gallery or showcase sections."}`,
          fixedLook
            ? "The opening sets the headline very large: keep it to 3–7 words and mark the one phrase that carries the feeling with *asterisks*. Section titles are set large too: keep them under 6 words."
            : `Hero composition "${id.layout.hero}": ${["wordmark", "stack", "minimal", "poster"].includes(id.layout.hero) ? "the headline is set very large, keep it to 3–6 words" : "keep the headline under 8 words"}.`,
          "Verified business record:",
          JSON.stringify({ name: b.name, category: b.category, city: b.city, address: b.address, phone: b.phone, openingHours: b.openingHours }, null, 2),
          "Research profile (verified facts are marked; treat assumptions as unconfirmed):",
          JSON.stringify(research.profile, null, 2),
          "Website brief:",
          JSON.stringify(research.brief, null, 2),
        ].join("\n"),
      });
      spec = res.data;
      changeSummary = fixedLook ? `Initial version generated by ${res.model} in the ${design.name} design.` : `Initial version generated by ${res.model} in the ${DIRECTIONS.find((d) => d.key === id.direction)?.label ?? id.direction} direction.`;
      await stage(7, `${spec.sections.length} sections written`, "completed");
    }
    if (!fixedLook) spec.theme.identity = id;
  } else if (type === "refine_design") {
    // Visual refinement: the reviewer looked at real screenshots; apply its concrete findings once.
    const cur = await currentSpec(project.id);
    if (!cur) throw new Error("No version to refine");
    qcAttempts = cur.qcAttempts;
    const weaknesses = (input.weaknesses ?? []).slice(0, 6);
    await stage(10, `applying ${weaknesses.length} finding(s) from the visual review`);
    if (isMock || !weaknesses.length) {
      spec = cur.spec;
      changeSummary = "Visual review: no changes applied.";
    } else {
      const res = await claudeStructured({
        ctx: ctx.usage,
        operation: "refine_website",
        schema: improveSchema,
        model: ctx.config.model,
        effort: "medium",
        maxTokens: 32000,
        system: `You are the senior designer of a premium web design agency. A reviewer looked at screenshots of the rendered site and listed its weakest points. Fix exactly those points by editing the spec: copy, section order or choice${fixedLook ? ". The visual design is a fixed, hand-designed template: do not change the theme" : ", and theme.identity (layout variants, fonts, colours, density)"}. Keep everything that works. Never add unverified claims.\n${SPEC_GUIDE}\nLayout variants available — hero: cinema, split, centered, editorial, poster, frame, minimal, panel, card, wordmark, collage, stack, offset; services: cards, pricelist, rows, tiles, index, bento; gallery: mosaic, strip, grid, polaroid, scroller, bento; about: split, overlap, centered, statement; head: left, center, ornament, number, tape; cta: band, full, card.${langRule}`,
        prompt: `Current SiteSpec:\n${JSON.stringify(cur.spec)}\n\nFindings from the visual review of the rendered site:\n${JSON.stringify(weaknesses, null, 2)}\n\nReturn the improved spec and a one-sentence change summary.`,
      });
      spec = res.data.spec;
      if (!spec.theme.identity) spec.theme.identity = cur.spec.theme.identity;
      // Photographs already chosen stay with the site.
      spec.images = cur.spec.images;
      changeSummary = `Visual refinement: ${res.data.changeSummary}`;
    }
    await stage(10, changeSummary.slice(0, 300), "completed");
  } else if (type === "fix_issues") {
    const cur = await currentSpec(project.id);
    if (!cur) throw new Error("No version to fix");
    qcAttempts = cur.qcAttempts;
    const issues = input.issues ?? [];
    const auto = autoFix(cur.spec, issues);
    spec = auto.spec;
    const remaining = issues.filter((i) => !["meta_title", "meta_description", "no_contact_section"].includes(i.code));
    if (remaining.length && !isMock) {
      const res = await claudeStructured({
        ctx: ctx.usage,
        operation: "fix_website",
        schema: improveSchema,
        model: ctx.config.model,
        effort: "medium",
        maxTokens: 32000,
        system: `You are the Website Builder Agent fixing quality-control findings. Make the smallest changes that resolve each issue and keep everything else identical.\n${SPEC_GUIDE}${langRule}`,
        prompt: `Current SiteSpec:\n${JSON.stringify(spec)}\n\nQuality-control issues to fix:\n${JSON.stringify(remaining, null, 2)}\n\nReturn the corrected spec and a one-sentence change summary.`,
      });
      spec = res.data.spec;
      spec.theme.identity = cur.spec.theme.identity;
      changeSummary = `QC fixes: ${[...auto.fixed, res.data.changeSummary].join("; ")}`;
    } else {
      changeSummary = `QC fixes${isMock ? " (MOCK, deterministic)" : ""}: ${auto.fixed.join(", ") || "no automatic fix available"}.`;
    }
  } else if (type === "improve_website") {
    const cur = await currentSpec(project.id);
    if (!cur) throw new Error("No version to improve");
    instruction = String(input.instruction ?? "").slice(0, 1000);
    createdBy = "user_request";
    if (isMock) {
      ({ spec, changeSummary } = mockImprove(cur.spec, instruction));
    } else {
      const res = await claudeStructured({
        ctx: ctx.usage,
        operation: "improve_website",
        schema: improveSchema,
        model: ctx.config.model,
        effort: (ctx.config.effort as "high") ?? "high",
        maxTokens: 32000,
        system: `You are the Website Builder Agent applying a design change requested by the agency. Modify the existing spec to satisfy the request; keep content, structure and anything not mentioned intact unless the request requires changing it. Do not regenerate from scratch.\n${SPEC_GUIDE}${langRule}`,
        prompt: `Current SiteSpec:\n${JSON.stringify(cur.spec)}\n\nRequested change (from the agency operator):\n${instruction}\n\nReturn the modified spec and a short change summary.`,
      });
      spec = res.data.spec;
      if (!spec.theme.identity) spec.theme.identity = cur.spec.theme.identity;
      changeSummary = res.data.changeSummary;
    }
  } else if (type === "apply_edit") {
    spec = siteSpecSchema.parse(input.spec);
    changeSummary = typeof input.summary === "string" ? input.summary.slice(0, 200) : "Manual content edit.";
    createdBy = "user_edit";
  } else {
    throw new Error(`Unknown builder task type ${type}`);
  }

  // The design identity is fixed by the selection engine; guardrails restore verified facts and safe links.
  spec.theme = fixedLook
    ? { template: design.legacy, design: design.key, variation: design.key === chosen.design.key ? (look?.variation ?? keptVariation) : 0, primary: design.palette.primary, accent: design.palette.accent, mode: design.mode, font: design.fonts.display, radius: design.radius }
    : { ...spec.theme, design: design.key, template: design.legacy, mode: design.mode, radius: design.radius, font: FONT_FAMILIES.includes(spec.theme.font as never) ? spec.theme.font : design.fonts.display };
  // Real photography: with Pexels or Unsplash connected, image slots get licensed photos chosen for this business.
  if (photoProvider && type === "generate_website") {
    await stage(6, `searching ${photoProvider === "pexels" ? "Pexels" : "Unsplash"} for ${brief ? Object.values(brief.imagery).filter(Boolean).slice(0, 2).join(", ") : "matching photographs"}`);
    try {
      const r = await attachStockPhotos(ctx.organizationId, spec, industry.art, project.slug, photoProvider, brief?.imagery);
      spec = r.spec;
      await stage(6, `${r.added} licensed photograph(s) placed`, "completed");
    } catch (err) {
      await stage(6, `photographs could not be loaded (${(err as Error).message.slice(0, 120)}); the site is built typography-led`, "warning");
    }
  } else if (type === "generate_website") {
    await stage(6, "no photo source is connected, so this site is designed with typography and colour only", "completed");
  }
  const finalSpec = enforceSpec(spec, b, verifiedEmail, researchText);
  const version = await saveVersion({
    organizationId: ctx.organizationId,
    projectId: project.id,
    spec: finalSpec,
    changeSummary,
    instruction,
    createdBy,
    isMock,
    qcAttempts,
  });
  await db().update(schema.agentTasks).set({ projectId: project.id }).where(eq(schema.agentTasks.id, ctx.task.id));
  await advanceStage(b.id, "DEMO_GENERATED", ctx.organizationId);
  if (type === "generate_website") await notifyEvent(ctx.organizationId, "websiteGenerated", `Website generated for ${b.name}`, changeSummary.slice(0, 200), `/websites/${project.id}`, "success");
  await ctx.log("info", `Website version ${version.versionNo} built: ${changeSummary}`, { projectId: project.id, versionId: version.id, kind: "website.generated", status: "completed" });

  if (type === "generate_website" || type === "refine_design") await stage(8, `version ${version.versionNo} rendered for phone, tablet and desktop`, "completed");

  // Every new version is tested before it can be marked ready.
  await spawnQc(ctx, b.id, project.id, version.id, next, iteration, type === "refine_design" ? (input.visualRound ?? 1) : (input.visualRound ?? 0));
  return { status: "completed", output: { projectId: project.id, versionId: version.id, versionNo: version.versionNo, mock: isMock } };
};
