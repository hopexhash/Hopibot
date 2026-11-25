import "../guard";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { siteSpecSchema, TEMPLATE_INFO, type SiteSpec } from "@/lib/site-spec";
import { db, schema } from "../db";
import { claudeStructured } from "../integrations/anthropic";
import { IntegrationUnavailableError } from "../integrations/credentials";
import { advanceStage } from "../orchestrator/tasks";
import type { AgentContext, AgentHandler } from "../orchestrator/types";
import { buildMockSpec, templateFor } from "../website/mock-spec";
import { enforceSpec, ensureProject, saveVersion } from "../website/service";

const SPEC_GUIDE = `You produce a SiteSpec JSON document that our React templates render into a website.
- theme.template is fixed by the business category (you will be told which). Pick primary/accent hex colours that suit the brand (keep the template defaults unless the brand suggests otherwise), mode light/dark, font Poppins or Inter, radius.
- Image references: use "art:hero", "art:about", "art:g1".."art:g6" for generated artwork. Only reference keys from "images" if they are already present with license "authorised".
- hero.layout: "split", "fullbleed" or "centered". Headlines: short, specific, benefit-led, max ~10 words.
- Sections: choose 6–9 that serve the brief. Always include a "contact" section (showForm true) and an "about" section. Use "menu" only for food businesses and never include prices. Use "hours" when opening hours exist.
- Section ids: short, lowercase, in the site language (e.g. "diensten", "contact").
- CTA hrefs must be in-page anchors to section ids ("#contact"), or "tel:" with the verified phone.
- Write all copy in the business's language. Be concrete and warm, avoid clichés, avoid filler.
- NEVER invent testimonials, reviews, ratings, awards, certifications, prices, years of experience, team names, guarantees or opening hours. Do not claim facts that are not in the verified data; describe services in general terms when unverified.
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

async function spawnQc(ctx: AgentContext, businessId: string, projectId: string, versionId: string, next: string[], iteration: number) {
  const runKey = ctx.task.runId ?? `adhoc-${ctx.task.id}`;
  await ctx.spawn({
    agentKey: "quality_control",
    type: "test_website",
    businessId,
    projectId,
    input: { versionId, next, iteration },
    idempotencyKey: `${runKey}:qc:${businessId}:${versionId}`,
    priority: 4,
  });
}

export const websiteBuilder: AgentHandler = async (ctx) => {
  const type = ctx.task.type;
  const input = ctx.task.input as { next?: string[]; iteration?: number; instruction?: string; spec?: unknown; issues?: { code: string; message: string; detail?: string }[] };
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
  const template = templateFor(b.category);

  let spec: SiteSpec;
  let changeSummary: string;
  let instruction: string | null = null;
  let createdBy = "agent";
  let qcAttempts = 0;

  if (type === "generate_website") {
    if (isMock || !research) {
      if (!research) await ctx.log("warn", "No research found — building from verified listing data only.");
      spec = buildMockSpec(b);
      changeSummary = isMock ? "Initial version (MOCK — generated from templates without Claude)." : "Initial version from listing data.";
    } else {
      await ctx.log("info", `Generating website with the "${TEMPLATE_INFO[template].name}" design system.`);
      const res = await claudeStructured({
        ctx: ctx.usage,
        operation: "generate_website",
        schema: siteSpecSchema,
        model: ctx.config.model,
        effort: (ctx.config.effort as "high") ?? "high",
        maxTokens: 32000,
        system: `You are the Website Builder Agent of a premium web design agency.\n${SPEC_GUIDE}\nOperator instructions: ${ctx.config.instructions || "(none)"}`,
        prompt: [
          `Template (fixed): ${template} — ${TEMPLATE_INFO[template].description}`,
          `Template default colours: primary ${TEMPLATE_INFO[template].primary}, accent ${TEMPLATE_INFO[template].accent}, mode ${TEMPLATE_INFO[template].mode}.`,
          "Verified business record:",
          JSON.stringify({ name: b.name, category: b.category, city: b.city, address: b.address, phone: b.phone, openingHours: b.openingHours }, null, 2),
          "Research profile (verified facts are marked; treat assumptions as unconfirmed):",
          JSON.stringify(research.profile, null, 2),
          "Website brief:",
          JSON.stringify(research.brief, null, 2),
        ].join("\n"),
      });
      spec = res.data;
      changeSummary = `Initial version generated by ${res.model}.`;
    }
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
        system: `You are the Website Builder Agent fixing quality-control findings. Make the smallest changes that resolve each issue and keep everything else identical.\n${SPEC_GUIDE}`,
        prompt: `Current SiteSpec:\n${JSON.stringify(spec)}\n\nQuality-control issues to fix:\n${JSON.stringify(remaining, null, 2)}\n\nReturn the corrected spec and a one-sentence change summary.`,
      });
      spec = res.data.spec;
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
        system: `You are the Website Builder Agent applying a design change requested by the agency. Modify the existing spec to satisfy the request; keep content, structure and anything not mentioned intact unless the request requires changing it. Do not regenerate from scratch.\n${SPEC_GUIDE}`,
        prompt: `Current SiteSpec:\n${JSON.stringify(cur.spec)}\n\nRequested change (from the agency operator):\n${instruction}\n\nReturn the modified spec and a short change summary.`,
      });
      spec = res.data.spec;
      changeSummary = res.data.changeSummary;
    }
  } else if (type === "apply_edit") {
    spec = siteSpecSchema.parse(input.spec);
    changeSummary = "Manual content edit.";
    createdBy = "user_edit";
  } else {
    throw new Error(`Unknown builder task type ${type}`);
  }

  // Template is tied to the category; guardrails restore verified facts and safe links.
  spec.theme.template = template;
  const finalSpec = enforceSpec(spec, b, verifiedEmail);
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
  await advanceStage(b.id, "WEBSITE_GENERATED", ctx.organizationId);
  await ctx.log("info", `Saved version ${version.versionNo}: ${changeSummary}`, { projectId: project.id, versionId: version.id });

  // Every new version is tested before it can be marked ready.
  await spawnQc(ctx, b.id, project.id, version.id, next, iteration);
  return { status: "completed", output: { projectId: project.id, versionId: version.id, versionNo: version.versionNo, mock: isMock } };
};
