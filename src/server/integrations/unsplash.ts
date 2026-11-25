import "../guard";
import { getCredential, IntegrationUnavailableError, touchIntegrationSuccess } from "./credentials";
import type { StockPhoto } from "./pexels";

/**
 * Unsplash: licensed stock photography for generated websites, as an alternative to Pexels.
 * The API terms ask for three things, all handled here or by the caller: photos are loaded
 * from Unsplash's own image URLs, the photographer and Unsplash are credited, and a
 * "download" is reported for every photo that is actually placed on a site.
 */
type Raw = {
  id: string;
  width: number;
  height: number;
  alt_description?: string | null;
  description?: string | null;
  urls: { raw: string; regular: string; small: string };
  links: { html: string; download_location: string };
  user: { name: string };
};

async function call(accessKey: string, url: string) {
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${accessKey}`, "Accept-Version": "v1" }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Unsplash error: HTTP ${res.status}${res.status === 401 ? " (invalid Access Key)" : res.status === 403 || res.status === 429 ? " (hourly limit reached)" : ""}`);
  return res.json();
}

const sized = (raw: string, w: number) => `${raw}${raw.includes("?") ? "&" : "?"}auto=format&fit=crop&q=75&w=${w}`;

export async function searchUnsplash(organizationId: string, q: { query: string; orientation?: "landscape" | "portrait" | "square"; count?: number }): Promise<StockPhoto[]> {
  const cred = await getCredential(organizationId, "unsplash");
  if (!cred.secret) throw new IntegrationUnavailableError("unsplash");
  const params = new URLSearchParams({ query: q.query, per_page: String(Math.min(30, q.count ?? 20)), content_filter: "high" });
  if (q.orientation) params.set("orientation", q.orientation === "square" ? "squarish" : q.orientation);
  const json = (await call(cred.secret, `https://api.unsplash.com/search/photos?${params}`)) as { results?: Raw[] };
  void touchIntegrationSuccess(organizationId, "unsplash");
  return (json.results ?? []).map((p) => ({
    id: p.id,
    src: sized(p.urls.raw, 1920),
    srcSmall: sized(p.urls.raw, 1100),
    alt: (p.alt_description ?? p.description ?? "").slice(0, 150),
    photographer: p.user.name,
    pageUrl: p.links.html,
    width: p.width,
    height: p.height,
    source: "Unsplash",
    downloadLocation: p.links.download_location,
  }));
}

/** Reports the photos that were placed on a site, as the Unsplash API terms require. Never blocks generation. */
export async function reportUnsplashUse(organizationId: string, photos: StockPhoto[]) {
  const cred = await getCredential(organizationId, "unsplash");
  if (!cred.secret) return;
  await Promise.allSettled(photos.filter((p) => p.downloadLocation?.startsWith("https://api.unsplash.com/")).map((p) => call(cred.secret as string, p.downloadLocation as string)));
}

export async function testUnsplash(accessKey: string) {
  const json = (await call(accessKey, "https://api.unsplash.com/search/photos?query=restaurant+interior&per_page=1")) as { total?: number };
  return `Connected. Photo search works (${json.total ?? 0} results for a test search).`;
}
