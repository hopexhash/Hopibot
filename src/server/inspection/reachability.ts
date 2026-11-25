import "../guard";
import { safeFetch } from "../net/safe-fetch";

export type Reachability = { down: boolean; reason: string };

/** Hard failures that a visitor would also run into. Timeouts and blocked bots are not among them. */
export function classifyFailure(err: unknown): { hard: boolean; reason: string } {
  const e = err as { message?: string; code?: string; cause?: { code?: string; message?: string } };
  const text = `${e?.code ?? ""} ${e?.cause?.code ?? ""} ${e?.message ?? ""} ${e?.cause?.message ?? ""}`;
  if (/ENOTFOUND|EAI_NODATA|ERR_NAME_NOT_RESOLVED/i.test(text)) return { hard: true, reason: "the domain name does not exist any more" };
  if (/ECONNREFUSED|ERR_CONNECTION_REFUSED/i.test(text)) return { hard: true, reason: "the server refuses connections" };
  if (/CERT_|certificate|self.signed|ERR_TLS|ERR_SSL|SSL routines/i.test(text)) return { hard: true, reason: "the security certificate is invalid, so browsers show a warning instead of the site" };
  return { hard: false, reason: (e?.message ?? "unknown error").slice(0, 120) };
}

function variants(raw: string): string[] {
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = u.hostname.replace(/^www\./, "");
    return [...new Set([u.origin + "/", `https://${host}/`, `https://www.${host}/`, `http://${host}/`])];
  } catch {
    return [];
  }
}

async function attempt(url: string): Promise<{ ok: boolean; hard: boolean; reason: string }> {
  try {
    const r = await safeFetch(url, { timeoutMs: 12000, maxBytes: 200_000 });
    if (r.status < 400) return { ok: true, hard: false, reason: "" };
    if (r.status === 404 || r.status === 410) return { ok: false, hard: true, reason: `the homepage answers "page not found" (HTTP ${r.status})` };
    if (r.status >= 500) return { ok: false, hard: true, reason: `the server answers with an error (HTTP ${r.status})` };
    // 401/403/429: the site refuses automated visitors but may work for people.
    return { ok: false, hard: false, reason: `the site refuses automated visitors (HTTP ${r.status})` };
  } catch (err) {
    return { ok: false, ...classifyFailure(err) };
  }
}

/**
 * Is this website really down for visitors? Every address variant (https/http, with and
 * without www) must fail with a hard error, twice, a little apart. One working variant, a
 * timeout or a blocked bot means "not confirmed": we never tell a business its site is down
 * on a guess.
 */
export async function confirmUnreachable(url: string, opts: { pauseMs?: number } = {}): Promise<Reachability> {
  const urls = variants(url);
  if (!urls.length) return { down: false, reason: "the address is not a valid URL" };
  let reason = "";
  for (let round = 0; round < 2; round++) {
    if (round) await new Promise((r) => setTimeout(r, opts.pauseMs ?? 15000));
    const results = await Promise.all(urls.map(attempt));
    if (results.some((r) => r.ok)) return { down: false, reason: "the website opens" };
    const soft = results.find((r) => !r.hard);
    if (soft) return { down: false, reason: soft.reason };
    reason = results[0].reason;
  }
  return { down: true, reason };
}
