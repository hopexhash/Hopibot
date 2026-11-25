import { z } from "zod";
import { DEFAULT_SCORING_WEIGHTS } from "./constants";

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
  dailySpendLimitUsd: z.number().min(0).max(100000).default(25),
  monthlySpendLimitUsd: z.number().min(0).max(1000000).default(300),
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
});
export type OrgSettings = z.infer<typeof orgSettingsSchema>;

export function parseOrgSettings(raw: unknown): OrgSettings {
  const res = orgSettingsSchema.safeParse(raw ?? {});
  return res.success ? res.data : orgSettingsSchema.parse({});
}
