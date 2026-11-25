import "../guard";
import { and, eq, gt } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { Role } from "@/lib/constants";
import { parseOrgSettings, type OrgSettings } from "@/lib/settings";
import { randomToken, sha256 } from "../crypto";
import { db, schema } from "../db";

export const SESSION_COOKIE = "aos_session";
const SESSION_DAYS = 14;
const ROLE_RANK: Record<Role, number> = { viewer: 0, member: 1, admin: 2, owner: 3 };

export type AuthContext = {
  user: { id: string; email: string; name: string | null };
  org: { id: string; name: string; slug: string; settings: OrgSettings };
  role: Role;
};

export class AuthError extends Error {
  constructor(
    public status: 401 | 403,
    message: string,
  ) {
    super(message);
  }
}

export function hasRole(role: Role, min: Role) {
  return ROLE_RANK[role] >= ROLE_RANK[min];
}

export async function clientIp(): Promise<string | null> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? null;
}

// ───────────── Local provider sessions ─────────────

export async function createSession(userId: string, organizationId: string | null) {
  const token = randomToken(32);
  const h = await headers();
  await db()
    .insert(schema.sessions)
    .values({
      userId,
      organizationId,
      tokenHash: sha256(token),
      expiresAt: new Date(Date.now() + SESSION_DAYS * 86400_000),
      ip: await clientIp(),
      userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
    });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await db().delete(schema.sessions).where(eq(schema.sessions.tokenHash, sha256(token)));
  jar.delete(SESSION_COOKIE);
  if (process.env.AUTH_PROVIDER === "supabase") {
    const { supabaseServerClient } = await import("./supabase");
    const sb = await supabaseServerClient();
    await sb.auth.signOut();
  }
}

async function resolveUserId(): Promise<{ userId: string; preferredOrg: string | null } | null> {
  if (process.env.AUTH_PROVIDER === "supabase") {
    const { supabaseServerClient } = await import("./supabase");
    const sb = await supabaseServerClient();
    const { data } = await sb.auth.getUser();
    if (!data.user) return null;
    return { userId: data.user.id, preferredOrg: null };
  }
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const [s] = await db()
    .select({ userId: schema.sessions.userId, organizationId: schema.sessions.organizationId })
    .from(schema.sessions)
    .where(and(eq(schema.sessions.tokenHash, sha256(token)), gt(schema.sessions.expiresAt, new Date())))
    .limit(1);
  return s ? { userId: s.userId, preferredOrg: s.organizationId } : null;
}

/** Current user + organisation + role, or null. Cached per request. */
export const getAuth = cache(async (): Promise<AuthContext | null> => {
  const resolved = await resolveUserId();
  if (!resolved) return null;
  const rows = await db()
    .select({
      user: { id: schema.users.id, email: schema.users.email, name: schema.users.name },
      org: {
        id: schema.organizations.id,
        name: schema.organizations.name,
        slug: schema.organizations.slug,
        settings: schema.organizations.settings,
      },
      role: schema.organizationMembers.role,
    })
    .from(schema.organizationMembers)
    .innerJoin(schema.users, eq(schema.users.id, schema.organizationMembers.userId))
    .innerJoin(schema.organizations, eq(schema.organizations.id, schema.organizationMembers.organizationId))
    .where(eq(schema.organizationMembers.userId, resolved.userId));
  if (rows.length === 0) return null;
  const row = rows.find((r) => r.org.id === resolved.preferredOrg) ?? rows[0];
  return { user: row.user, org: { ...row.org, settings: parseOrgSettings(row.org.settings) }, role: row.role };
});

/** For pages: redirects to /login when unauthenticated. */
export async function requireAuth(minRole: Role = "viewer"): Promise<AuthContext> {
  const auth = await getAuth();
  if (!auth) redirect("/login");
  if (!hasRole(auth.role, minRole)) redirect("/?forbidden=1");
  return auth;
}

/** For server actions and route handlers: throws AuthError instead of redirecting. */
export async function requireApiAuth(minRole: Role = "viewer"): Promise<AuthContext> {
  const auth = await getAuth();
  if (!auth) throw new AuthError(401, "You are not signed in.");
  if (!hasRole(auth.role, minRole)) throw new AuthError(403, `This action requires the ${minRole} role.`);
  return auth;
}
