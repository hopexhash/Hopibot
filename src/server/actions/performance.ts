"use server";

import { eq } from "drizzle-orm";
import { orgSettingsSchema } from "@/lib/settings";
import { db, schema } from "../db";
import { getCredential, markIntegrationResult } from "../integrations/credentials";
import { getOrgSettings } from "../org";
import { runPageSpeed, type LabResult } from "../performance/pagespeed";
import { publicPages } from "../seo/pages";
import { getSiteOrg } from "../site";
import { action, UserError } from "./_util";

/** Runs a lab test (Google PageSpeed Insights) on one public page and keeps the result. */
export async function runLabTestAction(path: string, strategy: "mobile" | "desktop") {
  return action({ name: "performance.lab", role: "admin", revalidate: ["/performance"], limit: 6 }, async (auth): Promise<Pick<LabResult, "score" | "lcp">> => {
    const site = await getSiteOrg();
    if (site?.id !== auth.org.id) throw new UserError("The public website belongs to another workspace; its performance is measured there.");
    if (strategy !== "mobile" && strategy !== "desktop") throw new UserError("Unknown device.");
    const known = await publicPages();
    if (!known.some((p) => p.path === path)) throw new UserError("Unknown page.");
    const cred = await getCredential(auth.org.id, "pagespeed");
    if (!cred.secret) throw new UserError("Add a PageSpeed Insights API key under Integrations first.");
    let result: LabResult;
    try {
      result = await runPageSpeed(cred.secret, path, strategy);
      await markIntegrationResult(auth.org.id, "pagespeed", true);
    } catch (err) {
      const msg = (err as Error).message;
      await markIntegrationResult(auth.org.id, "pagespeed", false, msg);
      throw new UserError(`The lab test failed: ${msg}`);
    }
    const current = await getOrgSettings(auth.org.id);
    const history = Array.isArray(current.perfLab) ? (current.perfLab as LabResult[]) : [];
    const merged = orgSettingsSchema.parse({ ...current, perfLab: [result, ...history].slice(0, 40) });
    await db().update(schema.organizations).set({ settings: merged, updatedAt: new Date() }).where(eq(schema.organizations.id, auth.org.id));
    return { score: result.score, lcp: result.lcp };
  });
}
