import "./guard";
import { and, eq, or } from "drizzle-orm";
import { db, schema } from "./db";

/** True if the address or its domain is on the organisation's suppression list. */
export async function isSuppressed(organizationId: string, email: string) {
  const e = email.toLowerCase();
  const domain = e.split("@")[1] ?? "";
  const rows = await db()
    .select({ id: schema.suppressionList.id })
    .from(schema.suppressionList)
    .where(and(eq(schema.suppressionList.organizationId, organizationId), or(eq(schema.suppressionList.email, e), eq(schema.suppressionList.domain, domain))))
    .limit(1);
  return rows.length > 0;
}
