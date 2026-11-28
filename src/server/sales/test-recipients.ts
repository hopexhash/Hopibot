import "../guard";
import { eq } from "drizzle-orm";
import { db, schema } from "../db";

/** Addresses a test can go to: the members of this workspace, without placeholder addresses (owner first). */
export async function testRecipients(organizationId: string) {
  const rows = await db()
    .select({ email: schema.users.email, role: schema.organizationMembers.role })
    .from(schema.organizationMembers)
    .innerJoin(schema.users, eq(schema.users.id, schema.organizationMembers.userId))
    .where(eq(schema.organizationMembers.organizationId, organizationId));
  const rank = { owner: 0, admin: 1, member: 2, viewer: 3 } as const;
  return rows
    .filter((r) => /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(r.email) && !/\.(invalid|test|example|local)$/i.test(r.email))
    .sort((a, b) => rank[a.role] - rank[b.role])
    .map((r) => r.email);
}

