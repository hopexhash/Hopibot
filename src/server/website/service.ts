import "../guard";
import { and, desc, eq, max } from "drizzle-orm";
import { INTEGRITY_PATTERNS, siteSpecSchema, TEMPLATE_INFO, type SiteSpec, type TemplateKey } from "@/lib/site-spec";
import { slugify } from "@/lib/utils";
import { renderSite } from "@/sites/render";
import { randomToken, sha1 } from "../crypto";
import { db, schema } from "../db";
import { getOrgSettings } from "../org";
import { templateFor } from "./mock-spec";

type Business = typeof schema.businesses.$inferSelect;

/** Removes protocol-relative/JS links; only in-page anchors, tel:, mailto: and https are allowed. */
function safeHref(href: string, sectionIds: Set<string>, fallback: string) {
  const h = href.trim();
  if (h.startsWith("#")) return sectionIds.has(h.slice(1)) || h === "#top" ? h : fallback;
  if (/^tel:\+?[\d\s()-]{6,}$/.test(h)) return h.replace(/\s/g, "");
  if (/^mailto:[^\s@]+@[^\s@]+$/.test(h)) return h;
  if (/^https:\/\/[^\s]+$/.test(h)) return h;
  return fallback;
}

/**
 * Guardrails applied to every spec, whoever produced it (Claude, a user edit or mock):
 * - business facts (phone, address, hours, maps link) always come from the verified record;
 * - links are restricted to safe schemes and existing anchors;
 * - section ids are unique and URL-safe;
 * - images are either generated artwork or explicitly authorised HTTPS images.
 */
export function enforceSpec(input: SiteSpec, b: Business, verifiedEmail: string | null): SiteSpec {
  const spec = siteSpecSchema.parse(structuredClone(input));
  spec.business = {
    ...spec.business,
    name: b.name,
    phone: b.phone,
    address: b.address,
    city: b.city,
    mapsUrl: b.googleMapsUrl && /^https:\/\//.test(b.googleMapsUrl) ? b.googleMapsUrl : null,
    openingHours: b.openingHours?.length ? b.openingHours : null,
    email: verifiedEmail,
  };
  const used = new Set<string>(["top", "main"]);
  for (const s of spec.sections) {
    let id = slugify(s.id || s.type, 30) || s.type;
    while (used.has(id)) id = `${id}-${used.size}`;
    used.add(id);
    s.id = id;
  }
  const contact = spec.sections.find((s) => s.type === "contact")?.id ?? spec.sections[spec.sections.length - 1].id;
  const fallback = `#${contact}`;
  spec.hero.primaryCta.href = safeHref(spec.hero.primaryCta.href, used, fallback);
  if (spec.hero.secondaryCta) spec.hero.secondaryCta.href = safeHref(spec.hero.secondaryCta.href, used, fallback);
  for (const s of spec.sections) if (s.type === "cta") s.cta.href = safeHref(s.cta.href, used, fallback);
  // tel: links must use the verified phone number only.
  const fixTel = (c: { href: string } | null) => {
    if (c && c.href.startsWith("tel:")) c.href = b.phone ? `tel:${b.phone.replace(/[^\d+]/g, "")}` : fallback;
  };
  fixTel(spec.hero.primaryCta);
  fixTel(spec.hero.secondaryCta);
  spec.images = spec.images.filter((i) => i.license === "generated" || (i.license === "authorised" && /^https:\/\//.test(i.src)));
  if (!spec.meta.description) spec.meta.description = `${b.name}${b.city ? ` — ${b.city}` : ""}`;
  return siteSpecSchema.parse(spec);
}

/** Text in the spec that looks like social proof, credentials or prices not backed by verified facts. */
export function contentIntegrityIssues(spec: SiteSpec, verifiedText: string): { label: string; excerpt: string }[] {
  const strings: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === "string") strings.push(v);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.entries(v).forEach(([k, x]) => k !== "images" && k !== "business" && walk(x));
  };
  walk({ ...spec, business: undefined, images: undefined });
  const issues: { label: string; excerpt: string }[] = [];
  const verified = verifiedText.toLowerCase();
  for (const s of strings) {
    for (const p of INTEGRITY_PATTERNS) {
      const m = s.match(p.re);
      if (m && !verified.includes(m[0].toLowerCase())) issues.push({ label: p.label, excerpt: s.slice(0, 120) });
    }
  }
  return issues;
}

export async function ensureProject(organizationId: string, b: Business) {
  const [existing] = await db()
    .select()
    .from(schema.websiteProjects)
    .where(and(eq(schema.websiteProjects.organizationId, organizationId), eq(schema.websiteProjects.businessId, b.id)))
    .orderBy(desc(schema.websiteProjects.createdAt))
    .limit(1);
  if (existing && !existing.deletedAt) return existing;
  const slug = `${slugify(b.name.replace(/\[MOCK\]/g, "mock"), 36) || "site"}-${randomToken(4).toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 5)}`;
  const [created] = await db()
    .insert(schema.websiteProjects)
    .values({ organizationId, businessId: b.id, templateKey: templateFor(b.category), slug, status: "generating" })
    .returning();
  return created;
}

export async function saveVersion(opts: {
  organizationId: string;
  projectId: string;
  spec: SiteSpec;
  changeSummary: string;
  instruction?: string | null;
  createdBy: string;
  isMock: boolean;
  qcAttempts?: number;
}) {
  const settings = await getOrgSettings(opts.organizationId);
  const [project] = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, opts.projectId));
  const files = renderSite(opts.spec, {
    agencyName: settings.agencyName || "our agency",
    agencyContact: settings.agencyWebsite || settings.senderEmail || undefined,
    seedKey: project.slug,
    assetBase: "assets/",
  });
  return db().transaction(async (tx) => {
    const [{ n }] = await tx
      .select({ n: max(schema.websiteVersions.versionNo) })
      .from(schema.websiteVersions)
      .where(eq(schema.websiteVersions.projectId, opts.projectId));
    const versionNo = (n ?? 0) + 1;
    const manifest = files.map((f) => ({ path: f.path, size: Buffer.byteLength(f.content), sha1: sha1(f.content) }));
    const [version] = await tx
      .insert(schema.websiteVersions)
      .values({
        organizationId: opts.organizationId,
        projectId: opts.projectId,
        versionNo,
        spec: opts.spec as unknown as Record<string, unknown>,
        changeSummary: opts.changeSummary,
        instruction: opts.instruction ?? null,
        files: manifest,
        storagePath: `db://website_files/${opts.projectId}/v${versionNo}`,
        isMock: opts.isMock,
        createdBy: opts.createdBy,
        qcAttempts: opts.qcAttempts ?? 0,
      })
      .returning();
    await tx.insert(schema.websiteFiles).values(
      files.map((f, i) => ({
        organizationId: opts.organizationId,
        versionId: version.id,
        path: f.path,
        content: f.content,
        contentType: f.contentType,
        sha1: manifest[i].sha1,
        size: manifest[i].size,
      })),
    );
    await tx
      .update(schema.websiteProjects)
      .set({ currentVersionId: version.id, status: "testing", qualityScore: null, approvalStatus: "pending", updatedAt: new Date() })
      .where(eq(schema.websiteProjects.id, opts.projectId));
    return version;
  });
}

export async function getVersionFile(versionId: string, path: string) {
  const [f] = await db()
    .select()
    .from(schema.websiteFiles)
    .where(and(eq(schema.websiteFiles.versionId, versionId), eq(schema.websiteFiles.path, path)));
  return f ?? null;
}

export function defaultTheme(category: string): SiteSpec["theme"] {
  const template = templateFor(category) as TemplateKey;
  const info = TEMPLATE_INFO[template];
  return { template, primary: info.primary, accent: info.accent, mode: info.mode, font: "Poppins", radius: info.radius };
}
