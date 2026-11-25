import "../guard";
import { and, eq, ne } from "drizzle-orm";
import { extractEmails } from "../audit/website-audit";
import { db, schema } from "../db";
import { hunterDomainSearch, hunterVerify, mapVerification } from "../integrations/hunter";
import { safeFetch } from "../net/safe-fetch";
import { continuePipeline } from "../orchestrator/pipeline";
import { notifyEvent } from "../orchestrator/tasks";
import type { AgentHandler } from "../orchestrator/types";
import { domainOf } from "../scoring/lead-score";

const GENERIC_LOCAL_PARTS = ["info", "contact", "hallo", "hello", "mail", "office", "receptie", "reserveringen", "reservations", "bookings", "service", "sales", "admin", "post", "kantoor", "praktijk", "welkom"];

export function isGenericEmail(email: string) {
  const local = email.split("@")[0]?.toLowerCase() ?? "";
  return GENERIC_LOCAL_PARTS.some((g) => local === g || local.startsWith(`${g}.`) || local.startsWith(`${g}-`));
}

/** Emails must belong to the business's own domain (or a domain it publishes); never guessed. */
export function belongsToBusiness(email: string, businessDomain: string | null, foundOnBusinessSite: boolean) {
  const emailDomain = email.split("@")[1]?.toLowerCase() ?? "";
  if (businessDomain && (emailDomain === businessDomain || emailDomain.endsWith(`.${businessDomain}`))) return true;
  // Free-mail addresses are accepted only when the business itself publishes them on its site.
  return foundOnBusinessSite;
}

export const contactResearch: AgentHandler = async (ctx) => {
  const businessId = ctx.task.businessId!;
  const [b] = await db()
    .select()
    .from(schema.businesses)
    .where(and(eq(schema.businesses.id, businessId), eq(schema.businesses.organizationId, ctx.organizationId)));
  if (!b) throw new Error("Business not found");
  await ctx.log("info", `Searching for publicly listed contact details of ${b.name}: homepage, contact page${(await ctx.mode("hunter")) === "live" ? " and Hunter" : ""}`, { kind: "contact.searching", status: "running" });

  // Suppressed businesses are never researched further for outreach.
  const domain = domainOf(b.websiteUrl);
  const found: { email: string; source: string; sourceUrl: string | null; confidence: number | null; generic: boolean }[] = [];
  const hunterMode = await ctx.mode("hunter");

  if (b.isMock) {
    if (b.websiteUrl) {
      found.push({ email: `info@${domain}`, source: "mock", sourceUrl: b.websiteUrl, confidence: null, generic: true });
    }
  } else {
    // 1. Publicly listed on the business's own website (homepage + contact page).
    const audit = b.websiteAudit as { emails?: string[]; contactPageUrl?: string | null; finalUrl?: string } | null;
    const pages = [b.websiteUrl, audit?.contactPageUrl].filter(Boolean) as string[];
    if (b.websiteStatus === "has_website") {
      for (const url of pages) {
        try {
          const r = await safeFetch(url, { timeoutMs: 12000 });
          if (r.status >= 400) continue;
          for (const e of extractEmails(r.body)) {
            if (belongsToBusiness(e, domain, true)) found.push({ email: e, source: "website", sourceUrl: r.url, confidence: null, generic: isGenericEmail(e) });
          }
          if (/contact/i.test(url)) {
            await db()
              .insert(schema.businessContacts)
              .values({ organizationId: ctx.organizationId, businessId: b.id, type: "contact_form", value: r.url, source: "website", sourceUrl: r.url, lawfulBasis: "public_business_listing" })
              .onConflictDoNothing();
          }
        } catch (err) {
          await ctx.log("warn", `Could not read ${url}: ${(err as Error).message}`);
        }
      }
    }
    // 2. Hunter domain search (public sources only — Hunter returns the source URLs).
    if (domain && hunterMode === "live") {
      const emails = await hunterDomainSearch(ctx.usage, domain);
      for (const e of emails) {
        if (!belongsToBusiness(e.value, domain, false)) continue;
        found.push({
          email: e.value.toLowerCase(),
          source: "hunter",
          sourceUrl: e.sources?.[0]?.uri ?? null,
          confidence: e.confidence ?? null,
          generic: e.type === "generic" || isGenericEmail(e.value),
        });
      }
    } else if (!domain) {
      await ctx.log("info", "No website domain known — Hunter domain search skipped. No email will be guessed.");
    } else if (hunterMode !== "live") {
      await ctx.log("warn", "Hunter.io not configured — only emails published on the website are recorded (unverified).");
    }
  }

  // De-duplicate, keeping the strongest source.
  const unique = new Map<string, (typeof found)[number]>();
  for (const f of found) if (!unique.has(f.email) || f.source === "website") unique.set(f.email, f);

  const suppressed = await db()
    .select({ email: schema.suppressionList.email, domain: schema.suppressionList.domain })
    .from(schema.suppressionList)
    .where(eq(schema.suppressionList.organizationId, ctx.organizationId));
  const isSuppressed = (e: string) => suppressed.some((s) => s.email === e || (s.domain && e.endsWith(`@${s.domain}`)));

  let verified = 0;
  let stored = 0;
  for (const f of unique.values()) {
    if (isSuppressed(f.email)) {
      await ctx.log("info", `${f.email} is on the suppression list — not stored.`);
      continue;
    }
    let verificationStatus = "unverified";
    let verifiedAt: Date | null = null;
    if (hunterMode === "live" && !b.isMock) {
      try {
        const v = await hunterVerify(ctx.usage, f.email);
        verificationStatus = mapVerification(v.status);
        verifiedAt = new Date();
        verified++;
      } catch (err) {
        await ctx.log("warn", `Verification failed for ${f.email}: ${(err as Error).message}`);
      }
    }
    await db()
      .insert(schema.businessContacts)
      .values({
        organizationId: ctx.organizationId,
        businessId: b.id,
        type: "email",
        value: f.email,
        isGeneric: f.generic,
        source: f.source,
        sourceUrl: f.sourceUrl,
        verificationStatus,
        verifiedAt,
        confidence: f.confidence,
        lawfulBasis: f.generic ? "legitimate_interest_b2b_generic_address" : "legitimate_interest_b2b_review_required",
        isMock: b.isMock,
      })
      .onConflictDoUpdate({
        target: [schema.businessContacts.businessId, schema.businessContacts.type, schema.businessContacts.value],
        set: { verificationStatus, verifiedAt, confidence: f.confidence },
      });
    stored++;
  }
  if (stored) await notifyEvent(ctx.organizationId, "contactFound", `Contact information found for ${b.name}`, `${stored} email address${stored === 1 ? "" : "es"} saved.`, `/businesses/${b.id}`, "success");
  await ctx.log("info", stored ? `Contact information saved: ${stored} email address${stored === 1 ? "" : "es"}, ${verified} verified.` : "No new email address found.", { kind: stored ? "contact.found" : "contact.none", status: stored ? "completed" : "info" });
  // Without any usable email address the business cannot be contacted, so no demo website is built for it.
  if (ctx.settings.requireEmail) {
    const usable = await db()
      .select({ id: schema.businessContacts.id })
      .from(schema.businessContacts)
      .where(and(eq(schema.businessContacts.businessId, b.id), eq(schema.businessContacts.type, "email"), ne(schema.businessContacts.verificationStatus, "invalid")))
      .limit(1);
    if (!usable.length) {
      await ctx.log("info", `No public email address found for ${b.name} — stopped here (no website is generated without a way to contact them).`);
      await db().insert(schema.crmActivities).values({ organizationId: ctx.organizationId, businessId: b.id, type: "system", content: "No public email address found. Skipped: no demo website or outreach without an email address." });
      return { status: "completed", output: { emails: 0, verified: 0, skipped: "no_email", mock: b.isMock } };
    }
  }
  await continuePipeline(ctx, { businessId: b.id, next: (ctx.task.input.next as string[]) ?? [] });
  return { status: "completed", output: { emails: stored, verified, mock: b.isMock } };
};
