import "../guard";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";

/**
 * Pexels: licensed stock photography for generated websites. The Pexels licence allows
 * free commercial use; we still store the photographer and source page with every photo.
 */
export type StockPhoto = { id: number; src: string; srcSmall: string; alt: string; photographer: string; pageUrl: string; width: number; height: number };

type Raw = { id: number; width: number; height: number; url: string; alt?: string; photographer: string; src: { large2x: string; large: string; medium: string } };

async function call(apiKey: string, params: Record<string, string>) {
  const res = await fetch(`https://api.pexels.com/v1/search?${new URLSearchParams(params)}`, { headers: { Authorization: apiKey }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Pexels error: HTTP ${res.status}${res.status === 401 ? " (invalid API key)" : res.status === 429 ? " (rate limit reached)" : ""}`);
  return (await res.json()) as { photos?: Raw[]; total_results?: number };
}

export async function searchPhotos(organizationId: string, q: { query: string; orientation?: "landscape" | "portrait" | "square"; count?: number }): Promise<StockPhoto[]> {
  const cred = await getCredential(organizationId, "pexels");
  if (!cred.secret) throw new IntegrationUnavailableError("pexels");
  const json = await call(cred.secret, { query: q.query, per_page: String(Math.min(40, q.count ?? 20)), ...(q.orientation ? { orientation: q.orientation } : {}) });
  void touchIntegrationSuccess(organizationId, "pexels");
  return (json.photos ?? []).map((p) => ({ id: p.id, src: p.src.large2x || p.src.large, srcSmall: p.src.large || p.src.medium, alt: (p.alt ?? "").slice(0, 150), photographer: p.photographer, pageUrl: p.url, width: p.width, height: p.height }));
}

export async function testPexels(apiKey: string) {
  const json = await call(apiKey, { query: "restaurant interior", per_page: "1" });
  return `Connected. Photo search works (${json.total_results ?? 0} results for a test search).`;
}
