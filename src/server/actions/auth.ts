"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";
import { audit } from "../audit";
import { clientIp, createSession, destroySession } from "../auth";
import { hashPassword, verifyPassword } from "../crypto";
import { db, schema } from "../db";
import { createOrganization } from "../org";
import { rateLimit, RateLimitError } from "../ratelimit";

export type AuthFormState = { error?: string; fields?: Record<string, string> } | undefined;

const signupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100),
  agency: z.string().trim().min(2, "Enter your agency name").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address").max(200),
  password: z
    .string()
    .min(10, "Use at least 10 characters")
    .max(200)
    .refine((p) => /[a-zA-Z]/.test(p) && /\d/.test(p), "Use letters and at least one number"),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
});

export async function signUpAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const fields = { name: raw.name ?? "", agency: raw.agency ?? "", email: raw.email ?? "" };
  if (process.env.ALLOW_SIGNUP === "false") return { error: "Sign-ups are disabled. Ask an administrator for an invite.", fields };
  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0].message, fields };
  const ip = await clientIp();
  try {
    await rateLimit(`signup:${ip ?? "unknown"}`, 5, 3600);
  } catch (e) {
    if (e instanceof RateLimitError) return { error: e.message, fields };
    throw e;
  }
  const { name, agency, email, password } = parsed.data;

  const existing = await db().select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, email));
  if (existing.length) return { error: "An account with this email already exists. Sign in instead.", fields };

  let userId: string;
  if (process.env.AUTH_PROVIDER === "supabase") {
    const { supabaseServerClient } = await import("../auth/supabase");
    const sb = await supabaseServerClient();
    const { data, error } = await sb.auth.signUp({ email, password, options: { data: { name } } });
    if (error || !data.user) return { error: error?.message ?? "Sign-up failed.", fields };
    userId = data.user.id;
    await db().insert(schema.users).values({ id: userId, email, name, authProvider: "supabase" });
  } else {
    const [u] = await db()
      .insert(schema.users)
      .values({ email, name, passwordHash: await hashPassword(password), authProvider: "local" })
      .returning({ id: schema.users.id });
    userId = u.id;
  }
  const org = await db().transaction(async (tx) => createOrganization(agency, userId, tx));
  if (process.env.AUTH_PROVIDER !== "supabase") await createSession(userId, org.id);
  await audit({ organizationId: org.id, userId, action: "auth.signup", ip });
  redirect("/command");
}

export async function signInAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const fields = { email: raw.email ?? "" };
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) return { error: parsed.error.issues[0].message, fields };
  const { email, password } = parsed.data;
  const ip = await clientIp();
  try {
    await Promise.all([rateLimit(`login:${ip ?? "unknown"}`, 20, 900), rateLimit(`login-email:${email}`, 8, 900)]);
  } catch (e) {
    if (e instanceof RateLimitError) return { error: e.message, fields };
    throw e;
  }
  const generic = "Incorrect email or password.";

  if (process.env.AUTH_PROVIDER === "supabase") {
    const { supabaseServerClient } = await import("../auth/supabase");
    const sb = await supabaseServerClient();
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error || !data.user) return { error: generic, fields };
    await db()
      .insert(schema.users)
      .values({ id: data.user.id, email, authProvider: "supabase", lastLoginAt: new Date() })
      .onConflictDoUpdate({ target: schema.users.id, set: { lastLoginAt: new Date() } });
    await audit({ organizationId: null, userId: data.user.id, action: "auth.login", ip });
    redirect("/command");
  }

  const [user] = await db().select().from(schema.users).where(eq(schema.users.email, email));
  // Always run a hash comparison to keep timing uniform for unknown emails.
  const ok = await verifyPassword(password, user?.passwordHash ?? "scrypt$AAAAAAAAAAAAAAAAAAAAAA$AAAA");
  if (!user || !ok) {
    await audit({ organizationId: null, userId: user?.id ?? null, action: "auth.login_failed", metadata: { email }, ip });
    return { error: generic, fields };
  }
  const [membership] = await db()
    .select({ organizationId: schema.organizationMembers.organizationId })
    .from(schema.organizationMembers)
    .where(eq(schema.organizationMembers.userId, user.id))
    .limit(1);
  await Promise.all([
    createSession(user.id, membership?.organizationId ?? null),
    db().update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, user.id)),
    audit({ organizationId: membership?.organizationId ?? null, userId: user.id, action: "auth.login", ip }),
  ]);
  redirect("/command");
}

export async function signOutAction() {
  await destroySession();
  redirect("/");
}

/**
 * Display code: signs a screen (a TV, a wall display) in to a read-only view. The code
 * belongs to a separate "display" user with the viewer role, so a screen that is signed in
 * this way can watch everything but cannot change settings, approve, send or spend. Only a
 * hash of the code is stored. Attempts are rate limited per address and overall.
 */
export async function signInWithCodeAction(_prev: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const code = String(formData.get("code") ?? "").trim();
  if (code.length < 8 || code.length > 64) return { error: "Enter your display code." };
  const ip = await clientIp();
  try {
    await Promise.all([rateLimit(`code-login:${ip ?? "unknown"}`, 8, 900), rateLimit("code-login:all", 60, 900)]);
  } catch (e) {
    if (e instanceof RateLimitError) return { error: e.message };
    throw e;
  }
  const displays = await db().select().from(schema.users).where(eq(schema.users.authProvider, "code")).limit(25);
  let match: (typeof displays)[number] | null = null;
  // Check every display user so the time taken does not reveal which one matched.
  for (const u of displays) if (u.passwordHash && (await verifyPassword(code, u.passwordHash))) match = u;
  if (!displays.length) await verifyPassword(code, "scrypt$AAAAAAAAAAAAAAAAAAAAAA$AAAA");
  if (!match) {
    await audit({ organizationId: null, userId: null, action: "auth.code_login_failed", ip });
    return { error: "That code is not valid." };
  }
  const [membership] = await db().select({ organizationId: schema.organizationMembers.organizationId }).from(schema.organizationMembers).where(eq(schema.organizationMembers.userId, match.id)).limit(1);
  if (!membership) return { error: "That code is not valid." };
  await Promise.all([db().update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, match.id)), createSession(match.id, membership.organizationId, 90)]);
  await audit({ organizationId: membership.organizationId, userId: match.id, action: "auth.code_login", ip });
  redirect("/command");
}
