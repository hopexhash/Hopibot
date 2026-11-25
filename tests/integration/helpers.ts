import postgres from "postgres";
import { hashPassword } from "@/server/crypto";
import { db, schema } from "@/server/db";
import { createOrganization } from "@/server/org";

export async function canConnect() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1, connect_timeout: 3, onnotice: () => {} });
  try {
    await sql`select 1`;
    return true;
  } catch {
    return false;
  } finally {
    await sql.end();
  }
}

export async function makeOrg(name = "Test Agency", settings: Record<string, unknown> = {}) {
  const email = `t-${Date.now()}-${Math.random().toString(36).slice(2)}@example.test`;
  const [user] = await db().insert(schema.users).values({ email, name: "Tester", passwordHash: await hashPassword("password1234") }).returning();
  const org = await createOrganization(name, user.id);
  if (Object.keys(settings).length) {
    const { eq } = await import("drizzle-orm");
    await db()
      .update(schema.organizations)
      .set({ settings: { ...(org.settings as object), ...settings } })
      .where(eq(schema.organizations.id, org.id));
  }
  return { org, user };
}
