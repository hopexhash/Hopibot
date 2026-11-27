"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { orgSettingsSchema } from "@/lib/settings";
import { SITE_URL } from "@/lib/site/seo";
import { db, schema } from "../db";
import { getOrgSettings } from "../org";
import { getSiteOrg } from "../site";
import { runAudit, type AuditReport } from "../seo/audit";
import { publicPages } from "../seo/pages";
import { action, UserError } from "./_util";

/** The public website belongs to one workspace; only that workspace can change its SEO. */
async function assertSiteOrg(orgId: string) {
  const site = await getSiteOrg();
  if (site?.id !== orgId) throw new UserError("The public website belongs to another workspace; its SEO is managed there.");
}

async function saveSettings(orgId: string, patch: Record<string, unknown>) {
  const current = await getOrgSettings(orgId);
  const merged = orgSettingsSchema.parse({ ...current, ...patch });
  await db().update(schema.organizations).set({ settings: merged, updatedAt: new Date() }).where(eq(schema.organizations.id, orgId));
}

/** Crawls the public website now and keeps the report (shown in the SEO control center). */
export async function runSeoAuditAction() {
  return action({ name: "seo.audit", role: "admin", revalidate: ["/seo"], limit: 6 }, async (auth): Promise<Pick<AuditReport, "score" | "counts">> => {
    const report = await runAudit(SITE_URL);
    if (!report.pages.length) throw new UserError(`The sitemap of ${SITE_URL} lists no pages. Is the website reachable at that address?`);
    await saveSettings(auth.org.id, { seoAudit: report });
    return { score: report.score, counts: report.counts };
  });
}

const overrideSchema = z.object({
  title: z.string().trim().max(120),
  description: z.string().trim().max(320),
  canonical: z.string().trim().max(300),
  noindex: z.boolean(),
});

/** Saves the SEO overrides of one public page. Empty fields fall back to the page's own value. */
export async function saveSeoPageAction(path: string, input: z.infer<typeof overrideSchema>) {
  return action({ name: "seo.page", role: "admin", revalidate: ["/seo"], auditTarget: () => ({ type: "page", id: path }) }, async (auth) => {
    await assertSiteOrg(auth.org.id);
    const known = await publicPages();
    if (!known.some((p) => p.path === path)) throw new UserError("Unknown page.");
    const o = overrideSchema.parse(input);
    if (o.title && o.title.length > 60) throw new UserError(`Keep the title at most 60 characters (now ${o.title.length}); Google cuts longer titles off.`);
    if (o.canonical && !o.canonical.startsWith("/") && !o.canonical.startsWith(SITE_URL)) throw new UserError(`A canonical URL must be a path ("/prijzen") or an address on ${SITE_URL}.`);
    const current = await getOrgSettings(auth.org.id);
    const pages = { ...current.seo.pages };
    if (!o.title && !o.description && !o.canonical && !o.noindex) delete pages[path];
    else pages[path] = o;
    await saveSettings(auth.org.id, { seo: { ...current.seo, pages } });
    // The page, the sitemap and the layout (shared metadata) are rebuilt with the new values.
    revalidatePath(path);
    revalidatePath("/sitemap.xml");
    return null;
  });
}

/** Bing Webmaster Tools verification code (Google's lives under Settings → Website). */
export async function saveSeoVerificationAction(bingVerification: string) {
  return action({ name: "seo.verification", role: "admin", revalidate: ["/seo", "/"] }, async (auth) => {
    await assertSiteOrg(auth.org.id);
    const code = bingVerification.trim();
    if (code && !/^[A-Za-z0-9]{16,64}$/.test(code)) throw new UserError('Paste only the code from the msvalidate.01 tag (the part inside content="…").');
    const current = await getOrgSettings(auth.org.id);
    await saveSettings(auth.org.id, { seo: { ...current.seo, bingVerification: code } });
    return null;
  });
}
