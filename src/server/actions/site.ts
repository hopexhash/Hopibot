"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { clientIp } from "../auth";
import { db, schema } from "../db";
import { saveLead } from "../leads/save";
import { notify } from "../orchestrator/tasks";
import { rateLimit, RateLimitError } from "../ratelimit";
import { getSiteOrg } from "../site";

export type InquiryState = { ok: true } | { ok: false; error: string } | null;

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null);

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Vul uw naam in.").max(80),
  company: z.string().trim().min(2, "Vul de naam van uw bedrijf in.").max(120),
  email: z.string().trim().toLowerCase().email("Vul een geldig e-mailadres in.").max(160),
  phone: optional(30),
  city: optional(80),
  country: z.enum(["Netherlands", "Belgium"]),
  website: optional(200),
  package: optional(40),
  message: z.string().trim().max(2000).default(""),
  consent: z.literal("on", { message: "Geef toestemming om contact met u op te nemen." }),
});

const GENERIC = /^(info|contact|hallo|hello|mail|office|kantoor|post|welkom|receptie|sales|service|admin)@/i;

/**
 * Contact form of the public website. The enquiry becomes a business in the CRM with the
 * person's request recorded as the reason we may contact them, and a notification for the
 * agency. Automated outreach stays off for this business: a person answers.
 */
export async function submitInquiryAction(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  // Bots fill every field, people never see this one.
  if (String(form.get("bedrijfsfax") ?? "")) return { ok: true };
  const parsed = inquirySchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Controleer het formulier." };
  const p = parsed.data;
  try {
    await rateLimit(`inquiry:${(await clientIp()) ?? "unknown"}`, 5, 3600);
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: "U heeft al een paar aanvragen verstuurd. Probeer het later opnieuw." };
    throw err;
  }
  const org = await getSiteOrg();
  if (!org) return { ok: false, error: "Het formulier is tijdelijk niet beschikbaar. Probeer het later opnieuw." };

  const website = p.website ? (/^https?:\/\//i.test(p.website) ? p.website : `https://${p.website}`) : null;
  const saved = await saveLead(
    org.id,
    { name: p.company, category: "local_service", city: p.city, country: p.country, phone: p.phone, websiteUrl: website, source: "website_inquiry", sourceData: { contactName: p.name, package: p.package } },
    { weights: org.settings.scoringWeights, minScore: org.settings.minLeadScore, audit: false },
  );
  const businessId = saved.id;
  const now = new Date();
  await db()
    .insert(schema.businessContacts)
    .values({ organizationId: org.id, businessId, type: "email", value: p.email, isGeneric: GENERIC.test(p.email), source: "inquiry", sourceUrl: null, verificationStatus: "unverified", lawfulBasis: "own_request" })
    .onConflictDoNothing();
  await db()
    .update(schema.businesses)
    .set({
      contactPermission: "existing_customer",
      permissionSource: "Contact form on the HOPI website",
      permissionProof: `Submitted ${now.toISOString()} by ${p.name} <${p.email}> with consent to be contacted.`,
      permissionAt: now,
      pipelineStage: "INTERESTED",
      updatedAt: now,
    })
    .where(eq(schema.businesses.id, businessId));
  const lines = [`Aanvraag via de website van ${p.name} (${p.email}${p.phone ? `, ${p.phone}` : ""}).`, p.package ? `Pakket: ${p.package}.` : null, p.message ? `Bericht: ${p.message}` : null].filter(Boolean);
  await db().insert(schema.crmActivities).values({ organizationId: org.id, businessId, type: "note", content: lines.join("\n").slice(0, 2500), metadata: { source: "website_inquiry", package: p.package } });
  await notify(org.id, "New enquiry from the website", `${p.company} (${p.name})${p.package ? `, package ${p.package}` : ""}`, `/businesses/${businessId}`, "success");
  return { ok: true };
}
