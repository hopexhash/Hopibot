import "../guard";
import dns from "node:dns";
import net from "node:net";
import { Agent, ProxyAgent, fetch as undiciFetch, type Dispatcher } from "undici";

/**
 * SSRF-safe HTTP client for fetching untrusted URLs (business websites, contact pages).
 *
 * - Only http/https on default ports.
 * - Every resolved address is checked against private, loopback, link-local, CGNAT,
 *   multicast and reserved ranges (IPv4 + IPv6, incl. IPv4-mapped IPv6).
 * - The check happens inside the socket's DNS lookup, so DNS rebinding cannot swap in a
 *   private address between validation and connection.
 * - Redirects are followed manually and each hop is re-validated.
 * - Response size and time are bounded.
 */

export class SsrfBlockedError extends Error {
  code = "SSRF_BLOCKED";
}

function ipv4ToInt(ip: string) {
  return ip.split(".").reduce((acc, oct) => (acc << 8) + Number(oct), 0) >>> 0;
}

const V4_BLOCKED: [string, number][] = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.88.99.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

export function isBlockedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const n = ipv4ToInt(ip);
    return V4_BLOCKED.some(([base, bits]) => {
      const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
      return (n & mask) === (ipv4ToInt(base) & mask);
    });
  }
  if (net.isIPv6(ip)) {
    const lower = ip.toLowerCase();
    const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isBlockedIp(mapped[1]);
    if (lower === "::" || lower === "::1") return true;
    if (/^f[cd]/.test(lower)) return true; // unique local fc00::/7
    if (/^fe[89ab]/.test(lower)) return true; // link-local fe80::/10
    if (/^ff/.test(lower)) return true; // multicast
    if (lower.startsWith("2001:db8")) return true; // documentation
    if (lower.startsWith("64:ff9b")) return true; // NAT64
    return false;
  }
  return true;
}

export function validateUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new SsrfBlockedError(`Invalid URL: ${raw.slice(0, 100)}`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new SsrfBlockedError("Only http(s) URLs are allowed.");
  if (url.username || url.password) throw new SsrfBlockedError("Credentials in URLs are not allowed.");
  if (url.port && url.port !== "80" && url.port !== "443") throw new SsrfBlockedError("Non-standard ports are not allowed.");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new SsrfBlockedError("Internal hostnames are not allowed.");
  }
  if (net.isIP(host) && isBlockedIp(host)) throw new SsrfBlockedError("Private or reserved IP addresses are not allowed.");
  if (!net.isIP(host) && !host.includes(".")) throw new SsrfBlockedError("Single-label hostnames are not allowed.");
  return url;
}

type LookupCb = (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void;

function safeLookup(hostname: string, options: dns.LookupOptions, cb: LookupCb) {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return cb(err, "", 0);
    const list = addresses as dns.LookupAddress[];
    const bad = list.find((a) => isBlockedIp(a.address));
    if (bad || list.length === 0) {
      return cb(new SsrfBlockedError(`${hostname} resolves to a blocked address.`) as NodeJS.ErrnoException, "", 0);
    }
    if ((options as { all?: boolean }).all) return cb(null, list);
    cb(null, list[0].address, list[0].family);
  });
}

let dispatcher: Dispatcher | null = null;
function getDispatcher(): Dispatcher {
  if (dispatcher) return dispatcher;
  const proxy = process.env.SAFE_FETCH_PROXY;
  dispatcher = proxy
    ? new ProxyAgent({ uri: proxy, connect: { timeout: 8000 } })
    : new Agent({ connect: { lookup: safeLookup as never, timeout: 8000 }, headersTimeout: 15000, bodyTimeout: 15000 });
  return dispatcher;
}

async function preResolve(url: URL) {
  // With a forward proxy the proxy resolves DNS; we still pre-check resolution here.
  if (!process.env.SAFE_FETCH_PROXY) return;
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (net.isIP(host)) return;
  const addrs = await dns.promises.lookup(host, { all: true });
  if (addrs.some((a) => isBlockedIp(a.address))) throw new SsrfBlockedError(`${host} resolves to a blocked address.`);
}

export type SafeResponse = {
  url: string;
  status: number;
  headers: Record<string, string>;
  body: string;
  bytes: number;
  truncated: boolean;
  redirects: string[];
  timingMs: number;
};

export async function safeFetch(
  rawUrl: string,
  opts: { maxBytes?: number; timeoutMs?: number; maxRedirects?: number; method?: "GET" | "HEAD" } = {},
): Promise<SafeResponse> {
  const maxBytes = opts.maxBytes ?? 1_500_000;
  const maxRedirects = opts.maxRedirects ?? 5;
  const started = Date.now();
  const redirects: string[] = [];
  let current = validateUrl(rawUrl);

  for (let hop = 0; hop <= maxRedirects; hop++) {
    await preResolve(current);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? 15000);
    try {
      const res = await undiciFetch(current.toString(), {
        method: opts.method ?? "GET",
        redirect: "manual",
        dispatcher: getDispatcher(),
        signal: controller.signal,
        headers: {
          "user-agent": "AgencyOS-AuditBot/1.0 (+website quality audit)",
          accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
          "accept-language": "nl,en;q=0.8",
        },
      });
      if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
        const next = new URL(res.headers.get("location")!, current);
        redirects.push(next.toString());
        current = validateUrl(next.toString());
        await res.body?.cancel();
        continue;
      }
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => (headers[k] = v));
      let body = "";
      let bytes = 0;
      let truncated = false;
      if (res.body && opts.method !== "HEAD") {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > maxBytes) {
            truncated = true;
            await reader.cancel();
            break;
          }
          body += decoder.decode(value, { stream: true });
        }
      }
      return { url: current.toString(), status: res.status, headers, body, bytes, truncated, redirects, timingMs: Date.now() - started };
    } catch (err) {
      if (err instanceof SsrfBlockedError) throw err;
      const cause = (err as { cause?: unknown }).cause;
      if (cause instanceof SsrfBlockedError) throw cause;
      if ((err as Error).name === "AbortError") throw new Error(`Timed out fetching ${current.hostname}`);
      throw new Error(`Could not fetch ${current.hostname}: ${(cause as Error)?.message ?? (err as Error).message}`);
    } finally {
      clearTimeout(timer);
    }
  }
  throw new Error(`Too many redirects for ${rawUrl}`);
}
