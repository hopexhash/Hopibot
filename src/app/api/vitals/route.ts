import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { recordVitals } from "@/server/performance/vitals";
import { rateLimit, RateLimitError } from "@/server/ratelimit";

export const dynamic = "force-dynamic";

/** Robots, lab tools and automated browsers: their timings say nothing about real visitors. */
const AUTOMATED = /bot|crawl|spider|slurp|lighthouse|pagespeed|headless|playwright|puppeteer|selenium|phantom|chrome-lighthouse|gtmetrix|preview/i;

const path = z
  .string()
  .max(160)
  .transform((p) => p.split(/[?#]/)[0]!.replace(/\/+$/, "") || "/")
  .refine((p) => /^\/[a-z0-9\-/]*$/.test(p), "bad path");
const short = z.string().max(160).optional();

const metric = z.object({
  n: z.enum(["LCP", "INP", "CLS", "FCP", "TTFB"]),
  v: z.number().finite().min(0).max(120_000),
  r: z.enum(["good", "needs-improvement", "poor"]),
  p: path,
  t: z.string().max(24).optional(),
  el: short,
  u: short,
});
const beacon = z.object({
  d: z.enum(["mobile", "desktop"]),
  c: z.string().max(12).optional(),
  m: z.array(metric).min(1).max(12),
  a: z
    .array(z.object({ u: z.string().max(160), s: z.number().int().min(0).max(50_000_000), k: z.string().max(16) }))
    .max(6)
    .optional(),
});

/**
 * Receives Core Web Vitals from real visits to the public website (sent with sendBeacon when
 * a page is hidden). Anonymous: the address is used only, hashed, to rate-limit, and is not
 * stored. Always answers 204 so a visitor's browser never retries or shows an error.
 */
export async function POST(req: Request) {
  const ok = new NextResponse(null, { status: 204 });
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || AUTOMATED.test(ua)) return ok;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  try {
    await rateLimit(`vitals:${createHash("sha256").update(ip).digest("hex").slice(0, 16)}`, 40, 60);
  } catch (err) {
    if (err instanceof RateLimitError) return ok;
  }
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 8_000) return ok;
    body = JSON.parse(text);
  } catch {
    return ok;
  }
  const parsed = beacon.safeParse(body);
  if (!parsed.success) return ok;
  try {
    await recordVitals(parsed.data);
  } catch {
    // Monitoring must never break the website; a lost measurement is acceptable.
  }
  return ok;
}
