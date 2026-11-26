import { z } from "zod";
import { catalogSchema, DEFAULT_CATALOG } from "./catalog";
import { DEFAULT_SCORING_WEIGHTS } from "./constants";
import { MARKET_NAMES } from "./markets";

const AUTOPILOT_DEFAULT_CITIES = ["Rotterdam", "Amsterdam", "Utrecht", "Den Haag", "Eindhoven"];
const AUTOPILOT_DEFAULT_CATEGORIES = ["restaurant", "barbershop", "beauty_salon", "bakery", "car_detailing", "pizzeria", "coffee_shop", "hair_salon"];

/** Organisation settings stored in organizations.settings (validated on read and write). */
export const orgSettingsSchema = z.object({
  agencyName: z.string().max(120).default(""),
  agencyAddress: z.string().max(300).default(""),
  agencyWebsite: z.string().max(200).default(""),
  kvkNumber: z.string().max(40).default(""),
  senderName: z.string().max(120).default(""),
  senderEmail: z.string().max(200).default(""),
  replyToEmail: z.string().max(200).default(""),
  previewBaseDomain: z.string().max(200).default(""),
  /** Public website: contact details and Google services (Settings → Website). All optional. */
  site: z
    .object({
      phone: z.string().max(30).default(""),
      /** Google Analytics 4 measurement ID (G-XXXXXXX). Loaded only after cookie consent. */
      gaId: z.string().max(20).default(""),
      /** Google Tag Manager container ID (GTM-XXXXXX). Loaded only after cookie consent. */
      gtmId: z.string().max(20).default(""),
      /** Google Search Console verification code (the content of the meta tag). */
      googleVerification: z.string().max(100).default(""),
      /** Public link of the Google Business Profile. */
      googleBusinessUrl: z.string().max(300).default(""),
    })
    .default({ phone: "", gaId: "", gtmId: "", googleVerification: "", googleBusinessUrl: "" }),
  dailySpendLimitUsd: z.number().min(0).max(100000).default(25),
  monthlySpendLimitUsd: z.number().min(0).max(1000000).default(300),
  /** Warn (notification + banner) when spend reaches this share of a limit. */
  budgetWarnPct: z.number().int().min(10).max(100).default(80),
  /** API costs are billed in USD, revenue is in EUR: rate used to show profit in EUR. */
  usdToEurRate: z.number().min(0.1).max(10).default(0.92),
  minLeadScore: z.number().int().min(0).max(100).default(60),
  qcMaxRetries: z.number().int().min(0).max(10).default(3),
  defaultModel: z.string().default("claude-opus-5-5"),
  scoringWeights: z
    .object({
      noWebsite: z.number().int().min(0).max(100),
      outdatedWebsite: z.number().int().min(0).max(100),
      poorMobile: z.number().int().min(0).max(100),
      missingContactForm: z.number().int().min(0).max(100),
      poorSeo: z.number().int().min(0).max(100),
      incompleteInfo: z.number().int().min(0).max(100),
    })
    .default({ ...DEFAULT_SCORING_WEIGHTS }),
  defaultPricing: z
    .object({
      setupFeeEur: z.number().min(0).default(1250),
      monthlyFeeEur: z.number().min(0).default(49),
    })
    .default({ setupFeeEur: 1250, monthlyFeeEur: 49 }),
  /** Packages, care plans and add-ons offered on demo pages (Settings → Pricing). */
  catalog: catalogSchema.default(DEFAULT_CATALOG),
  /** Websites are only generated for leads with at least this opportunity score. */
  /** Only pursue businesses with a public email address (no demo website or outreach without one). */
  requireEmail: z.boolean().default(true),
  /** Which events create a notification (bell icon). */
  notifications: z
    .object({
      highQualityLead: z.boolean().default(true),
      contactFound: z.boolean().default(false),
      websiteGenerated: z.boolean().default(false),
      deployed: z.boolean().default(true),
      criticalError: z.boolean().default(true),
      dailyLimit: z.boolean().default(true),
    })
    .default({ highQualityLead: true, contactFound: false, websiteGenerated: false, deployed: true, criticalError: true, dailyLimit: true }),
  minOpportunityScore: z.number().int().min(0).max(100).default(40),
  /** Autopilot: the agency runs discovery → demo on its own within these limits. */
  autopilot: z
    .object({
      /** Autonomous mode: ACTIVE (true) or PAUSED (false). Active is the default operating mode. */
      enabled: z.boolean().default(true),
      /** Local working hours (Europe/Amsterdam). 0–24 on every day = around the clock. */
      startHour: z.number().int().min(0).max(23).default(0),
      endHour: z.number().int().min(1).max(24).default(24),
      days: z.array(z.number().int().min(0).max(6)).default([0, 1, 2, 3, 4, 5, 6]),
      country: z.enum(MARKET_NAMES).default("Netherlands"),
      cities: z.array(z.string().max(60)).max(30).default(AUTOPILOT_DEFAULT_CITIES),
      /** Cities in the other supported market (Belgium when the country above is the Netherlands, and the reverse). Empty = one country only. */
      otherCities: z.array(z.string().max(60)).max(30).default([]),
      categories: z.array(z.string().max(40)).max(30).default(AUTOPILOT_DEFAULT_CATEGORIES),
      dailyDiscoveryLimit: z.number().int().min(0).max(500).default(30),
      dailyWebsiteLimit: z.number().int().min(0).max(100).default(5),
    })
    .default({ enabled: true, startHour: 0, endHour: 24, days: [0, 1, 2, 3, 4, 5, 6], country: "Netherlands", cities: AUTOPILOT_DEFAULT_CITIES, otherCities: [], categories: AUTOPILOT_DEFAULT_CATEGORIES, dailyDiscoveryLimit: 30, dailyWebsiteLimit: 5 }),
});
export type OrgSettings = z.infer<typeof orgSettingsSchema>;

export function parseOrgSettings(raw: unknown): OrgSettings {
  const res = orgSettingsSchema.safeParse(raw ?? {});
  return res.success ? res.data : orgSettingsSchema.parse({});
}
