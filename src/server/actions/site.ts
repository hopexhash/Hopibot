"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { clientIp } from "../auth";
import { db, schema } from "../db";
import { saveLead } from "../leads/save";
import { notify } from "../orchestrator/tasks";
import { rateLimit, RateLimitError } from "../ratelimit";
import { startInquiryBuild } from "../sales/inquiry";
import { getSiteOrg } from "../site";

export type InquiryState = { ok: true } | { ok: false; error: string } | null;

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => v || null);

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in.").max(80),
  company: z.string().trim().min(2, "Vul de naam van je bedrijf in.").max(120),
  email: z.string().trim().toLowerCase().email("Vul een geldig e-mailadres in.").max(160),
  phone: optional(30),
  city: optional(80),
  country: z.enum(["Netherlands", "Belgium"]),
  website: optional(200),
  package: optional(40),
  message: z.string().trim().max(2000).default(""),
  /** Page the form was sent from (for knowing which pages bring in enquiries). */
  source: z.string().trim().max(120).regex(/^\/[a-z0-9\-/]*$/).catch("/"),
  consent: z.literal("on", { message: "Geef toestemming om contact met je op te nemen." }),
  /** Language of the page the form was on; the owner answers in that language. */
  lang: z.enum(["nl", "en"]).catch("nl"),
});

/** Messages for visitors of the English pages (the Dutch ones are in the schema above). */
const EN: Record<string, string> = {
  name: "Please enter your name.",
  company: "Please enter the name of your business.",
  email: "Please enter a valid email address.",
  consent: "Please agree to being contacted about your request.",
  check: "Please check the form.",
  rate: "You have already sent a few requests. Please try again later.",
  unavailable: "The form is temporarily unavailable. Please try again later.",
};

const GENERIC = /^(info|contact|hallo|hello|mail|office|kantoor|post|welkom|receptie|sales|service|admin)@/i;

/**
 * Contact form of the public website. The enquiry becomes a qualified lead in the CRM with
 * the person's request recorded as the reason we may contact them, and the bot starts on
 * their design straight away (research, build, test). Nothing is sent to them until the
 * owner has approved that design.
 */
export async function submitInquiryAction(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  // Bots fill every field, people never see this one.
  if (String(form.get("bedrijfsfax") ?? "")) return { ok: true };
  const en = form.get("lang") === "en";
  const parsed = inquirySchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    const field = String(issue?.path[0] ?? "");
    return { ok: false, error: en ? (EN[field] ?? EN.check!) : (issue?.message ?? "Controleer het formulier.") };
  }
  const p = parsed.data;
  try {
    await rateLimit(`inquiry:${(await clientIp()) ?? "unknown"}`, 5, 3600);
  } catch (err) {
    if (err instanceof RateLimitError) return { ok: false, error: en ? EN.rate! : "Je hebt al een paar aanvragen verstuurd. Probeer het later opnieuw." };
    throw err;
  }
  const org = await getSiteOrg();
  if (!org) return { ok: false, error: en ? EN.unavailable! : "Het formulier is tijdelijk niet beschikbaar. Probeer het later opnieuw." };

  const website = p.website ? (/^https?:\/\//i.test(p.website) ? p.website : `https://${p.website}`) : null;
  const saved = await saveLead(
    org.id,
    { name: p.company, category: "local_service", city: p.city, country: p.country, phone: p.phone, websiteUrl: website, source: "website_inquiry", sourceData: { contactName: p.name, package: p.package, page: p.source, language: p.lang } },
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
  const lines = [`Aanvraag via de website van ${p.name} (${p.email}${p.phone ? `, ${p.phone}` : ""}).`, p.package ? `Pakket: ${p.package}.` : null, p.lang === "en" ? "Taal: Engels (via de Engelse website). Antwoord in het Engels." : null, `Pagina: ${p.source}`, p.message ? `Bericht: ${p.message}` : null].filter(Boolean);
  await db().insert(schema.crmActivities).values({ organizationId: org.id, businessId, type: "note", content: lines.join("\n").slice(0, 2500), metadata: { source: "website_inquiry", package: p.package, page: p.source, language: p.lang } });
  // They asked for it themselves: a lead, whatever the score of their current website says.
  await db().update(schema.leads).set({ qualified: true, status: "qualified" }).where(eq(schema.leads.businessId, businessId));
  let build: Awaited<ReturnType<typeof startInquiryBuild>> | "failed" = "failed";
  try {
    build = await startInquiryBuild(org.id, businessId, p.company);
  } catch (err) {
    // The request itself is safe in the CRM; a person can start the design by hand.
    console.error("Could not start the design for an enquiry", err);
  }
  const next =
    build === "started"
      ? "The bot has started on their design; you will be asked to approve it."
      : build === "exists"
        ? "They already have a design or one in progress."
        : build === "capped"
          ? "Today's limit of automatic designs is reached: start this one yourself from the business page."
          : "The design could not be started automatically: start it from the business page.";
  await notify(org.id, "New enquiry from the website", `${p.company} (${p.name})${p.package ? `, package ${p.package}` : ""}${p.lang === "en" ? ", wrote in English (reply in English)" : ""}. ${next}`, `/businesses/${businessId}`, build === "started" || build === "exists" ? "success" : "warning");
  return { ok: true };
}
