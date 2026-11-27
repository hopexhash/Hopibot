import "../guard";
import { createSign } from "node:crypto";

/**
 * Google Search Console and Google Analytics 4 through a Google Cloud service account
 * (read-only scopes). The account's e-mail address must be added as a user of the Search
 * Console property and as a Viewer of the GA4 property. The key never leaves the server.
 */

type ServiceAccount = { client_email: string; private_key: string; token_uri?: string };

export function parseServiceAccount(json: string): ServiceAccount {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    throw new Error("The key is not valid JSON. Paste the whole JSON key file of the service account.");
  }
  const sa = raw as Partial<ServiceAccount> & { type?: string };
  if (sa.type !== "service_account" || !sa.client_email || !sa.private_key) throw new Error("This is not a service-account key (it needs type, client_email and private_key).");
  return { client_email: sa.client_email, private_key: sa.private_key, token_uri: sa.token_uri };
}

const b64url = (b: Buffer | string) => Buffer.from(b).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

/** A signed JWT assertion for the OAuth 2.0 service-account flow. Exported for tests. */
export function signedAssertion(sa: ServiceAccount, scopes: string[], now = Math.floor(Date.now() / 1000)) {
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({ iss: sa.client_email, scope: scopes.join(" "), aud: sa.token_uri ?? "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  return `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;
}

const tokens = new Map<string, { token: string; until: number }>();

async function accessToken(sa: ServiceAccount, scopes: string[]) {
  const key = `${sa.client_email}|${scopes.join(" ")}`;
  const hit = tokens.get(key);
  if (hit && hit.until > Date.now() + 60_000) return hit.token;
  const res = await fetch(sa.token_uri ?? "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: signedAssertion(sa, scopes) }),
    signal: AbortSignal.timeout(15000),
  });
  const j = (await res.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error_description?: string; error?: string };
  if (!res.ok || !j.access_token) throw new Error(`Google sign-in failed: ${j.error_description ?? j.error ?? res.status}`);
  tokens.set(key, { token: j.access_token, until: Date.now() + (j.expires_in ?? 3600) * 1000 });
  return j.access_token;
}

const GSC = "https://www.googleapis.com/auth/webmasters.readonly";
const GA = "https://www.googleapis.com/auth/analytics.readonly";

async function call<T>(token: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { authorization: `Bearer ${token}`, ...(body ? { "content-type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  const j = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(j.error?.message ?? `HTTP ${res.status}`);
  return j;
}

const site = (siteUrl: string) => `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`;
const day = (d: Date) => d.toISOString().slice(0, 10);

/** Connection test: lists the properties the service account can read and checks the configured ones. */
export async function testGoogleSearch(secret: string, config: Record<string, string>) {
  const sa = parseServiceAccount(secret);
  const token = await accessToken(sa, [GSC, ...(config.ga4PropertyId ? [GA] : [])]);
  const list = await call<{ siteEntry?: { siteUrl: string; permissionLevel: string }[] }>(token, "https://www.googleapis.com/webmasters/v3/sites");
  const sites = list.siteEntry ?? [];
  const parts = [`Signed in as ${sa.client_email}.`];
  if (!config.siteUrl) parts.push(`Search Console properties visible: ${sites.map((s) => s.siteUrl).join(", ") || "none"}. Enter one as the property.`);
  else if (!sites.some((s) => s.siteUrl === config.siteUrl)) throw new Error(`The service account has no access to ${config.siteUrl}. Add ${sa.client_email} as a user of that property in Search Console.`);
  else parts.push(`Search Console property ${config.siteUrl} is readable.`);
  if (config.ga4PropertyId) {
    await call(token, `https://analyticsdata.googleapis.com/v1beta/properties/${config.ga4PropertyId}:runReport`, { dateRanges: [{ startDate: "7daysAgo", endDate: "today" }], metrics: [{ name: "sessions" }], limit: 1 });
    parts.push(`GA4 property ${config.ga4PropertyId} is readable.`);
  }
  return parts.join(" ");
}

export type SearchRow = { key: string; clicks: number; impressions: number; ctr: number; position: number };
export type SearchReport = {
  range: { start: string; end: string };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  previous: { clicks: number; impressions: number; ctr: number; position: number };
  queries: SearchRow[];
  pages: SearchRow[];
  /** Pages with at least 10 clicks in the previous period that lost a third or more. */
  declining: (SearchRow & { previousClicks: number })[];
  sitemaps: { path: string; submitted: number; lastDownloaded: string | null; errors: number; warnings: number }[];
  organic?: { sessions: number; keyEvents: number; byPage: { page: string; sessions: number; keyEvents: number }[] };
};

/** The last 28 days of Search Console (with the 28 before for comparison) and, when configured, GA4 organic traffic. */
export async function searchReport(secret: string, config: Record<string, string>): Promise<SearchReport> {
  const sa = parseServiceAccount(secret);
  if (!config.siteUrl) throw new Error("No Search Console property configured.");
  const token = await accessToken(sa, [GSC, ...(config.ga4PropertyId ? [GA] : [])]);
  // Search Console data lags about two days.
  const end = new Date(Date.now() - 2 * 864e5);
  const start = new Date(end.getTime() - 27 * 864e5);
  const pEnd = new Date(start.getTime() - 864e5);
  const pStart = new Date(pEnd.getTime() - 27 * 864e5);
  type Q = { rows?: { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }[] };
  const q = (s: Date, e: Date, dimensions: string[], rowLimit = 25) => call<Q>(token, `${site(config.siteUrl)}/searchAnalytics/query`, { startDate: day(s), endDate: day(e), dimensions, rowLimit, dataState: "final" });
  const [tot, prevTot, queries, pages, prevPages, maps] = await Promise.all([
    q(start, end, []),
    q(pStart, pEnd, []),
    q(start, end, ["query"]),
    q(start, end, ["page"], 250),
    q(pStart, pEnd, ["page"], 250),
    call<{ sitemap?: { path: string; lastDownloaded?: string; errors?: string; warnings?: string; contents?: { submitted?: string }[] }[] }>(token, `${site(config.siteUrl)}/sitemaps`),
  ]);
  const row = (r: NonNullable<Q["rows"]>[number]): SearchRow => ({ key: r.keys?.[0] ?? "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });
  const totals = (x: Q) => {
    const r = x.rows?.[0];
    return r ? { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position } : { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  };
  const now = (pages.rows ?? []).map(row);
  const before = new Map((prevPages.rows ?? []).map((r) => [r.keys?.[0] ?? "", r.clicks]));
  const declining = [...before.entries()]
    .filter(([, c]) => c >= 10)
    .map(([key, previousClicks]) => {
      const cur = now.find((p) => p.key === key) ?? { key, clicks: 0, impressions: 0, ctr: 0, position: 0 };
      return { ...cur, previousClicks };
    })
    .filter((p) => p.clicks <= p.previousClicks * (2 / 3))
    .sort((a, b) => b.previousClicks - b.clicks - (a.previousClicks - a.clicks))
    .slice(0, 10);
  const report: SearchReport = {
    range: { start: day(start), end: day(end) },
    totals: totals(tot),
    previous: totals(prevTot),
    queries: (queries.rows ?? []).map(row),
    pages: now.slice(0, 25),
    declining,
    sitemaps: (maps.sitemap ?? []).map((m) => ({
      path: m.path,
      submitted: Number(m.contents?.[0]?.submitted ?? 0),
      lastDownloaded: m.lastDownloaded ?? null,
      errors: Number(m.errors ?? 0),
      warnings: Number(m.warnings ?? 0),
    })),
  };
  if (config.ga4PropertyId) {
    type G = { rows?: { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }[] };
    const g = await call<G>(token, `https://analyticsdata.googleapis.com/v1beta/properties/${config.ga4PropertyId}:runReport`, {
      dateRanges: [{ startDate: day(start), endDate: day(end) }],
      dimensions: [{ name: "landingPage" }],
      metrics: [{ name: "sessions" }, { name: "keyEvents" }],
      dimensionFilter: { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Organic Search" } } },
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 25,
    });
    const total = await call<G>(token, `https://analyticsdata.googleapis.com/v1beta/properties/${config.ga4PropertyId}:runReport`, {
      dateRanges: [{ startDate: day(start), endDate: day(end) }],
      metrics: [{ name: "sessions" }, { name: "keyEvents" }],
      dimensionFilter: { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Organic Search" } } },
    });
    const byPage = (g.rows ?? []).map((r) => ({ page: r.dimensionValues?.[0]?.value ?? "", sessions: Number(r.metricValues?.[0]?.value ?? 0), keyEvents: Number(r.metricValues?.[1]?.value ?? 0) }));
    const t = total.rows?.[0]?.metricValues ?? [];
    report.organic = { sessions: Number(t[0]?.value ?? 0), keyEvents: Number(t[1]?.value ?? 0), byPage };
  }
  return report;
}
