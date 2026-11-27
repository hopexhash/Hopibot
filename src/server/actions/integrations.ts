"use server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { INTEGRATIONS, type IntegrationKey } from "@/lib/integrations-meta";
import { encryptSecret, secretHint } from "../crypto";
import { db, schema } from "../db";
import { getCredential, markIntegrationResult } from "../integrations/credentials";
import { redisHealthy } from "../redis";
import { action, UserError } from "./_util";

const providerSchema = z.enum(INTEGRATIONS.map((i) => i.key) as [IntegrationKey, ...IntegrationKey[]]);

export async function saveIntegrationAction(provider: string, secret: string | null, config: Record<string, string>) {
  return action({ name: "integration.save", role: "admin", revalidate: ["/integrations"], auditTarget: () => ({ type: "integration", id: provider }) }, async (auth) => {
    const p = providerSchema.parse(provider);
    const meta = INTEGRATIONS.find((i) => i.key === p)!;
    if (!meta.secretLabel) throw new UserError(`${meta.name} is configured through environment variables.`);
    const [existing] = await db()
      .select({ config: schema.integrationCredentials.config })
      .from(schema.integrationCredentials)
      .where(and(eq(schema.integrationCredentials.organizationId, auth.org.id), eq(schema.integrationCredentials.provider, p)));
    const cleanConfig: Record<string, string> = {};
    for (const f of meta.configFields) {
      const raw = typeof config[f.key] === "string" ? config[f.key].trim().slice(0, 500) : "";
      const isSecret = /secret/i.test(f.key);
      if (raw) cleanConfig[f.key] = isSecret ? `enc:${encryptSecret(raw)}` : raw;
      else if (isSecret && existing?.config?.[f.key]) cleanConfig[f.key] = existing.config[f.key]; // keep stored secret
    }
    const s = secret?.trim();
    if (s != null && s.length > 0 && (s.length < 8 || s.length > 500)) throw new UserError("That key does not look valid.");
    const values: Partial<typeof schema.integrationCredentials.$inferInsert> = { config: cleanConfig, status: "untested", updatedAt: new Date() };
    if (s) {
      values.encryptedSecret = encryptSecret(s);
      values.secretHint = secretHint(s);
    }
    await db()
      .insert(schema.integrationCredentials)
      .values({ organizationId: auth.org.id, provider: p, ...values })
      .onConflictDoUpdate({ target: [schema.integrationCredentials.organizationId, schema.integrationCredentials.provider], set: values });
    return null;
  });
}

export async function removeIntegrationAction(provider: string) {
  return action({ name: "integration.remove", role: "admin", revalidate: ["/integrations"], auditTarget: () => ({ type: "integration", id: provider }) }, async (auth) => {
    const p = providerSchema.parse(provider);
    await db()
      .delete(schema.integrationCredentials)
      .where(and(eq(schema.integrationCredentials.organizationId, auth.org.id), eq(schema.integrationCredentials.provider, p)));
    return null;
  });
}

/** Makes a real, low-cost request to the provider and records the result. */
export async function testIntegrationAction(provider: string) {
  return action({ name: "integration.test", role: "admin", revalidate: ["/integrations"], limit: 20 }, async (auth) => {
    const p = providerSchema.parse(provider);
    let message: string;
    try {
      if (p === "supabase") {
        const started = Date.now();
        await db().execute(sql`select 1`);
        message = `Database reachable (${Date.now() - started} ms).`;
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (url) {
          const res = await fetch(`${url}/auth/v1/health`, { headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "" }, signal: AbortSignal.timeout(10000) });
          message += res.ok ? " Supabase Auth healthy." : ` Supabase Auth responded ${res.status}.`;
        } else message += " Supabase URL not set (database-only mode).";
      } else if (p === "redis") {
        const r = await redisHealthy();
        if (!r.ok) throw new Error(r.error ?? "Redis unreachable");
        message = `Redis reachable (${r.latencyMs} ms).`;
      } else {
        const cred = await getCredential(auth.org.id, p);
        if (!cred.secret) throw new UserError("No credentials saved yet.");
        switch (p) {
          case "anthropic":
            message = await (await import("../integrations/anthropic")).testAnthropic(cred.secret);
            break;
          case "google_maps":
            message = await (await import("../integrations/google-places")).testGooglePlaces(cred.secret);
            break;
          case "hunter":
            message = await (await import("../integrations/hunter")).testHunter(cred.secret);
            break;
          case "pexels":
            message = await (await import("../integrations/pexels")).testPexels(cred.secret);
            break;
          case "unsplash":
            message = await (await import("../integrations/unsplash")).testUnsplash(cred.secret);
            break;
          case "vercel":
            message = await (await import("../integrations/vercel")).testVercel(cred.secret, cred.config.teamId);
            break;
          case "github":
            message = await (await import("../integrations/github")).testGithub(cred.secret, cred.config.owner);
            break;
          case "resend":
            message = await (await import("../integrations/resend")).testResend(cred.secret);
            break;
          case "stripe":
            message = await (await import("../integrations/stripe")).testStripe(cred.secret);
            break;
          case "google_search":
            message = await (await import("../integrations/google-search")).testGoogleSearch(cred.secret, cred.config);
            break;
          case "posthog":
            message = await (await import("../integrations/posthog")).testPosthog(cred.secret, cred.config.host);
            break;
          default:
            throw new UserError("No test available.");
        }
      }
      await markIntegrationResult(auth.org.id, p, true);
      return { message };
    } catch (err) {
      const msg = (err as Error).message ?? "Connection failed";
      await markIntegrationResult(auth.org.id, p, false, msg);
      throw new UserError(`Connection failed: ${msg}`);
    }
  });
}
