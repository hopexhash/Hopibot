import "../guard";
import { eq } from "drizzle-orm";
import { eur } from "@/lib/catalog";
import { INQUIRY_SOURCE } from "@/lib/inquiry-email";
import { parseOrgSettings, type OrgSettings } from "@/lib/settings";
import { designReadyEmail, writtenEmail, type EmailContext, type Lang } from "@/lib/email/templates";
import { getDesign } from "@/sites/designs";
import { fontStack } from "@/sites/fonts";
import { ensureContrast } from "@/sites/theme";
import { db, schema } from "../db";

type Email = typeof schema.salesEmails.$inferSelect;

const appUrl = () => (process.env.APP_URL ?? "http://localhost:3000").replace(/\/+$/, "");
export const demoUrl = (slug: string) => `${appUrl()}/d/${slug}`;
export const unsubscribeLink = (token: string) => `${appUrl()}/u/${token}`;

/** Everything an email needs to know about the sender, from Settings (missing details stay empty). */
export function emailContext(s: OrgSettings, lang: Lang): EmailContext {
  const prices = s.catalog.packages.filter((p) => p.enabled && p.priceCents !== null).map((p) => p.priceCents as number);
  return {
    lang,
    siteUrl: appUrl(),
    company: { name: s.agencyName || "HOPI", address: s.agencyAddress, kvk: s.kvkNumber, website: s.agencyWebsite, email: s.replyToEmail || s.senderEmail, phone: s.site.phone },
    senderName: s.senderName || s.agencyName || "HOPI",
    replyTo: s.replyToEmail || s.senderEmail,
    fromPrice: prices.length ? eur(Math.min(...prices)) : null,
    vat: `${s.catalog.vatPct}%`,
  };
}

/** The colours of a design, for the preview panel when there is no screenshot. */
export function designColours(templateKey: string) {
  const d = getDesign(templateKey);
  const accent = ensureContrast(d.palette.accent, d.palette.bg, 3);
  return { bg: d.palette.bg, ink: d.palette.ink, accent, displayFont: fontStack(d.fonts.display).replace(/"/g, "'") };
}

/** Address of the screenshot of a project's current design (served by /api/preview-image), when one exists. */
async function previewImageFor(project: typeof schema.websiteProjects.$inferSelect) {
  if (!project.currentVersionId) return null;
  const [v] = await db().select({ qc: schema.websiteVersions.qcReport }).from(schema.websiteVersions).where(eq(schema.websiteVersions.id, project.currentVersionId));
  const shots = (v?.qc as { screenshots?: Record<string, string> } | null)?.screenshots;
  return shots?.desktop?.startsWith("data:image/") ? `${appUrl()}/api/preview-image/${project.slug}` : null;
}

/**
 * The HTML version of a stored email, in the HOPI email design. The words are the stored
 * plain text (what was approved); a test copy gets a banner and a dead unsubscribe link.
 */
export async function buildEmailHtml(email: Email, opts: { test?: { to: string } } = {}): Promise<string | null> {
  const [project] = email.projectId ? await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, email.projectId)) : [];
  const [business] = await db().select({ name: schema.businesses.name, source: schema.businesses.source }).from(schema.businesses).where(eq(schema.businesses.id, email.businessId));
  const [org] = await db().select({ settings: schema.organizations.settings }).from(schema.organizations).where(eq(schema.organizations.id, email.organizationId));
  if (!business) return null;
  const settings = parseOrgSettings(org?.settings);
  const proposal = (email.proposal ?? {}) as { lang?: string; template?: string; contactName?: string | null };
  const lang: Lang = proposal.lang === "en" ? "en" : "nl";
  const ctx = emailContext(settings, lang);
  const unsubscribeUrl = opts.test ? `${appUrl()}/u/test-link-disabled` : unsubscribeLink(email.unsubscribeToken);
  const businessName = business.name.replace(/\[MOCK\]\s*/g, "");
  const previewUrl = project ? demoUrl(project.slug) : null;
  const previewImage = project ? await previewImageFor(project) : null;
  const design = project ? designColours(project.templateKey) : undefined;

  if (proposal.template === "design_ready" && previewUrl) {
    return designReadyEmail({ ctx, contactName: proposal.contactName ?? null, company: businessName, previewUrl, previewImage, design, unsubscribeUrl, test: opts.test }).html;
  }
  const [text] = email.bodyText.split("\n\n--\n");
  return writtenEmail({
    ctx,
    kind: !previewUrl ? "message" : email.kind === "follow_up" ? "follow_up" : "intro",
    audience: business.source === INQUIRY_SOURCE ? "request" : "outreach",
    subject: email.subject,
    paragraphs: text.split(/\n{2,}/),
    businessName,
    previewUrl,
    previewImage,
    design,
    unsubscribeUrl,
    test: opts.test,
  });
}
