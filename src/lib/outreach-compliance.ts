import { resolveMarket } from "./markets";

/**
 * Permission-based outreach. An email may only be sent when a lawful basis is recorded
 * for the business; where the basis is uncertain a person has to decide and record why.
 * These rules are a conservative operational safeguard, not legal advice.
 */

export const CONTACT_PERMISSIONS = [
  { key: "unknown", label: "Not recorded yet", sendable: false },
  { key: "consent", label: "They gave consent", sendable: true },
  { key: "existing_customer", label: "Existing customer / they contacted us", sendable: true },
  { key: "legitimate_interest", label: "Published business address (reviewed by us)", sendable: true },
  { key: "not_allowed", label: "Not allowed to contact", sendable: false },
  { key: "opted_out", label: "Opted out", sendable: false },
] as const;
export type ContactPermission = (typeof CONTACT_PERMISSIONS)[number]["key"];

export const permissionLabel = (key: string) => CONTACT_PERMISSIONS.find((p) => p.key === key)?.label ?? key;
export const permissionSendable = (key: string) => CONTACT_PERMISSIONS.find((p) => p.key === key)?.sendable ?? false;

type CountryRule = { name: string; /** May a first email go to a published, non-personal business address without prior consent? */ genericAddressAllowed: boolean; note: string };

const RULES: Record<string, CountryRule> = {
  netherlands: { name: "Netherlands", genericAddressAllowed: true, note: "Dutch Telecommunications Act art. 11.7: without consent, only write to an address the business itself published for being contacted (such as info@), identify yourself and offer an opt-out in every message." },
  belgium: { name: "Belgium", genericAddressAllowed: true, note: "Belgian rules allow unsolicited email to impersonal addresses of legal persons (such as info@); personal addresses need prior consent." },
};

export function countryRule(country: string | null | undefined): CountryRule | null {
  const market = resolveMarket(country);
  return market ? RULES[market.name.toLowerCase()] : null;
}

export type OutreachAssessment = {
  /** send = basis recorded · review = a person must confirm and record the basis · blocked = must not be contacted */
  decision: "send" | "review" | "blocked";
  reason: string;
  /** What the operator should do next, in plain words. */
  action: string;
};

export function assessOutreach(input: { country: string | null; permission: string; contact: { isGeneric: boolean; source: string } | null }): OutreachAssessment {
  const { permission, contact } = input;
  if (permission === "opted_out") return { decision: "blocked", reason: "This business opted out of messages.", action: "Do not contact this business again." };
  if (permission === "not_allowed") return { decision: "blocked", reason: "This business is marked as not allowed to contact.", action: "Do not contact this business." };
  if (!contact) return { decision: "blocked", reason: "No business email address is known.", action: "Add a published business address, or reach out by phone." };
  if (permission === "consent" || permission === "existing_customer") return { decision: "send", reason: `Permission recorded: ${permissionLabel(permission).toLowerCase()}.`, action: "Review the text and approve." };

  const rule = countryRule(input.country);
  if (!rule) return { decision: "blocked", reason: `${input.country || "This country"} is outside the supported markets (Netherlands and Belgium).`, action: "Do not contact this business." };
  if (!rule.genericAddressAllowed) return { decision: "blocked", reason: `${rule.name}: prior consent is required. ${rule.note}`, action: "Get consent first (for example by phone) and record it, with proof, on the business page." };
  if (!contact.isGeneric) return { decision: "review", reason: `${rule.name}: this looks like a personal address, which needs consent. ${rule.note}`, action: "Use the business's general address instead, or record consent with proof." };
  if (permission === "legitimate_interest") return { decision: "send", reason: `${rule.name}: published business address, reviewed and recorded by your team.`, action: "Review the text and approve." };
  return {
    decision: "review",
    reason: `${rule.name}: the address appears to be a published general business address (source: ${contact.source}). ${rule.note}`,
    action: "Confirm on the business page that the address is published by the business for being contacted, and record where you found it.",
  };
}
