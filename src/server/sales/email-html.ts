import "../guard";
import { eq } from "drizzle-orm";
import { renderEmailHtml } from "@/lib/email-html";
import { parseOrgSettings } from "@/lib/settings";
import { getDesign } from "@/sites/designs";
import { fontStack } from "@/sites/fonts";
import { contrast, ensureContrast } from "@/sites/theme";
import { db, schema } from "../db";

type Email = typeof schema.salesEmails.$inferSelect;

export const demoUrl = (slug: string) => `${process.env.APP_URL ?? "http://localhost:3000"}/d/${slug}`;

/** Builds the HTML alternative for a stored outreach email (same words as the text version). */
export async function buildEmailHtml(email: Email): Promise<string | null> {
  if (!email.projectId) return null;
  const [project] = await db().select().from(schema.websiteProjects).where(eq(schema.websiteProjects.id, email.projectId));
  const [business] = await db().select({ name: schema.businesses.name }).from(schema.businesses).where(eq(schema.businesses.id, email.businessId));
  const [org] = await db().select({ settings: schema.organizations.settings }).from(schema.organizations).where(eq(schema.organizations.id, email.organizationId));
  if (!project || !business) return null;
  const settings = parseOrgSettings(org?.settings);
  const design = getDesign(project.templateKey);
  const [text, ...rest] = email.bodyText.split("\n\n--\n");
  const url = demoUrl(project.slug);
  // The link is carried by the preview card and buttons, so a bare URL line is dropped from the prose.
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter((p) => p && !/^https?:\/\/\S+$/.test(p));
  const accent = ensureContrast(design.palette.accent, design.palette.bg, 3);
  const prices = settings.catalog.packages.filter((p) => p.enabled && p.priceCents !== null).map((p) => p.priceCents as number);
  const proposal = (email.proposal ?? {}) as { lang?: string; informal?: boolean };
  const lang = proposal.lang ?? "nl";
  const informal = proposal.informal === true;
  return renderEmailHtml({
    lang,
    paragraphs,
    footer: rest.join("\n\n--\n"),
    businessName: business.name.replace(/\[MOCK\]\s*/g, ""),
    agencyName: settings.agencyName,
    demoUrl: url,
    unsubscribeUrl: `${process.env.APP_URL ?? "http://localhost:3000"}/u/${email.unsubscribeToken}`,
    design: { name: design.name, bg: design.palette.bg, ink: design.palette.ink, accent, onAccent: contrast("#ffffff", accent) >= contrast("#111111", accent) ? "#ffffff" : "#111111", displayFont: fontStack(design.fonts.display).replace(/"/g, "'") },
    fromPriceEur: prices.length ? Math.min(...prices) / 100 : null,
    informal,
    benefits:
      lang === "nl"
        ? ["Ontworpen voor telefoons en computers", "Snel, veilig en vindbaar in Google", "Direct contact of reserveren vanaf elke pagina", informal ? "Jij beslist: aanpassen kan altijd" : "U beslist: aanpassen kan altijd"]
        : ["Designed for phones and computers", "Fast, secure and findable in Google", "Contact or booking from every page", "You decide: everything can be adjusted"],
  });
}
