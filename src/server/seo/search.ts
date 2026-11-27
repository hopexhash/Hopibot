import "../guard";
import { getCredential, markIntegrationResult } from "../integrations/credentials";
import { searchReport, type SearchReport } from "../integrations/google-search";

export type SearchState = { state: "off" } | { state: "error"; error: string } | { state: "ok"; report: SearchReport };

const cache = new Map<string, { at: number; value: SearchState }>();

/**
 * Search Console (and GA4) data for the SEO control center, kept for 15 minutes so opening
 * the page does not call Google every time. "off" when no service account is connected.
 */
export async function getSearchReport(organizationId: string): Promise<SearchState> {
  const hit = cache.get(organizationId);
  if (hit && Date.now() - hit.at < 15 * 60_000) return hit.value;
  const cred = await getCredential(organizationId, "google_search");
  if (!cred.secret || !cred.config.siteUrl) return { state: "off" };
  let value: SearchState;
  try {
    value = { state: "ok", report: await searchReport(cred.secret, cred.config) };
    await markIntegrationResult(organizationId, "google_search", true);
  } catch (err) {
    value = { state: "error", error: (err as Error).message.slice(0, 300) };
    await markIntegrationResult(organizationId, "google_search", false, value.error);
  }
  cache.set(organizationId, { at: Date.now(), value });
  return value;
}
