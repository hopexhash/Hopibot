import "../guard";
import { eq } from "drizzle-orm";
import { assessOutreach } from "@/lib/outreach-compliance";
import { db, schema } from "../db";

/**
 * Whether the only thing holding this email back is the recorded permission, and the
 * operator can resolve it while approving: a general (info@-style) address the business
 * published itself, in a market whose rules allow a first email to such an address.
 */
export async function publishedAddressReview(e: { blockedReason: string | null; contactId: string | null; businessId: string }) {
  if (!e.blockedReason?.startsWith("Permission needed") || !e.contactId) return null;
  const [c] = await db().select().from(schema.businessContacts).where(eq(schema.businessContacts.id, e.contactId));
  const [b] = await db().select({ country: schema.businesses.country, permission: schema.businesses.contactPermission }).from(schema.businesses).where(eq(schema.businesses.id, e.businessId));
  if (!c || !b || c.isMock || b.permission !== "unknown") return null;
  const verdict = assessOutreach({ country: b.country, permission: "unknown", contact: { isGeneric: c.isGeneric, source: c.source } });
  // Only the "published general address, needs a person to confirm" case; personal addresses
  // and markets without such an allowance stay blocked.
  if (verdict.decision !== "review" || !c.isGeneric || !c.sourceUrl) return null;
  return { contact: c, sourceUrl: c.sourceUrl };
}
