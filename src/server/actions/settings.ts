"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { orgSettingsSchema } from "@/lib/settings";
import { hashPassword } from "../crypto";
import { db, schema } from "../db";
import { getOrgSettings } from "../org";
import { action, UserError } from "./_util";

export async function updateSettingsAction(patch: Record<string, unknown>) {
  return action({ name: "settings.update", role: "admin", revalidate: ["/settings", "/costs", "/command", "/(site)"], auditTarget: () => ({ type: "organization", metadata: { keys: Object.keys(patch) } }) }, async (auth) => {
    const current = await getOrgSettings(auth.org.id);
    const merged = orgSettingsSchema.parse({ ...current, ...patch });
    if (merged.senderEmail && !z.string().email().safeParse(merged.senderEmail).success) throw new UserError("Sender email is not a valid address.");
    const site = merged.site;
    if (site.whatsapp && !/^\+[1-9]\d{7,14}$/.test(site.whatsapp.replace(/[\s().-]/g, ""))) throw new UserError("Write the WhatsApp number with the country code, for example +31612345678.");
    if (site.gaId && !/^G-[A-Z0-9]{4,}$/.test(site.gaId)) throw new UserError("The Google Analytics ID looks like G-XXXXXXXXXX.");
    if (site.gtmId && !/^GTM-[A-Z0-9]{4,}$/.test(site.gtmId)) throw new UserError("The Tag Manager ID looks like GTM-XXXXXXX.");
    if (site.googleVerification && !/^[A-Za-z0-9_-]{10,}$/.test(site.googleVerification)) throw new UserError("Paste only the verification code from Search Console (the part inside content=\"…\").");
    if (site.googleBusinessUrl && !/^https:\/\/[^\s]+$/.test(site.googleBusinessUrl)) throw new UserError("The Google Business Profile link must start with https://");
    if (merged.seo.bingVerification && !/^[A-Za-z0-9]{16,64}$/.test(merged.seo.bingVerification)) throw new UserError("Paste only the Bing verification code (the part inside content=\"…\" of the msvalidate.01 tag).");
    if (merged.previewBaseDomain && !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(merged.previewBaseDomain)) throw new UserError("Preview domain must look like previews.youragency.nl");
    await db().update(schema.organizations).set({ settings: merged, updatedAt: new Date() }).where(eq(schema.organizations.id, auth.org.id));
    return null;
  });
}

export async function renameOrganizationAction(name: string) {
  return action({ name: "org.rename", role: "owner", revalidate: ["/settings"] }, async (auth) => {
    const n = z.string().trim().min(2).max(100).parse(name);
    await db().update(schema.organizations).set({ name: n, updatedAt: new Date() }).where(eq(schema.organizations.id, auth.org.id));
    return null;
  });
}

const memberSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().min(1).max(100),
  role: z.enum(["admin", "member", "viewer"]),
  password: z.string().min(10, "Temporary password: at least 10 characters").max(200),
});

/** Adds a team member (local auth: creates the account with a temporary password). */
export async function addMemberAction(input: z.input<typeof memberSchema>) {
  return action({ name: "member.add", role: "admin", revalidate: ["/settings"], auditTarget: () => ({ type: "user", metadata: { email: input.email, role: input.role } }) }, async (auth) => {
    const m = memberSchema.parse(input);
    if (process.env.AUTH_PROVIDER === "supabase") throw new UserError("With Supabase Auth, invite users from the Supabase dashboard; they join after their first sign-in.");
    let [user] = await db().select().from(schema.users).where(eq(schema.users.email, m.email));
    if (!user) [user] = await db().insert(schema.users).values({ email: m.email, name: m.name, passwordHash: await hashPassword(m.password) }).returning();
    const [exists] = await db().select().from(schema.organizationMembers).where(and(eq(schema.organizationMembers.organizationId, auth.org.id), eq(schema.organizationMembers.userId, user.id)));
    if (exists) throw new UserError("This person is already a member.");
    await db().insert(schema.organizationMembers).values({ organizationId: auth.org.id, userId: user.id, role: m.role });
    return null;
  });
}

export async function changeRoleAction(userId: string, role: string) {
  return action({ name: "member.change_role", role: "owner", revalidate: ["/settings"], auditTarget: () => ({ type: "user", id: userId, metadata: { role } }) }, async (auth) => {
    const r = z.enum(["owner", "admin", "member", "viewer"]).parse(role);
    if (userId === auth.user.id) throw new UserError("You cannot change your own role.");
    await db().update(schema.organizationMembers).set({ role: r }).where(and(eq(schema.organizationMembers.organizationId, auth.org.id), eq(schema.organizationMembers.userId, z.string().uuid().parse(userId))));
    return null;
  });
}

export async function removeMemberAction(userId: string) {
  return action({ name: "member.remove", role: "admin", revalidate: ["/settings"], auditTarget: () => ({ type: "user", id: userId }) }, async (auth) => {
    if (userId === auth.user.id) throw new UserError("You cannot remove yourself.");
    const [m] = await db().select().from(schema.organizationMembers).where(and(eq(schema.organizationMembers.organizationId, auth.org.id), eq(schema.organizationMembers.userId, z.string().uuid().parse(userId))));
    if (!m) throw new UserError("Member not found.");
    if (m.role === "owner" && auth.role !== "owner") throw new UserError("Only owners can remove owners.");
    await db().delete(schema.organizationMembers).where(eq(schema.organizationMembers.id, m.id));
    await db().delete(schema.sessions).where(and(eq(schema.sessions.userId, m.userId), eq(schema.sessions.organizationId, auth.org.id)));
    return null;
  });
}

/** Switches autonomous mode between ACTIVE and PAUSED. Running tasks finish; no new batches start while paused. */
export async function setAutonomousModeAction(enabled: boolean) {
  return action({ name: enabled ? "autonomy.resume" : "autonomy.pause", role: "admin", revalidate: ["/command", "/settings"], auditTarget: () => ({ type: "organization", metadata: { enabled } }) }, async (auth) => {
    const current = await getOrgSettings(auth.org.id);
    const merged = orgSettingsSchema.parse({ ...current, autopilot: { ...current.autopilot, enabled } });
    await db().update(schema.organizations).set({ settings: merged, updatedAt: new Date() }).where(eq(schema.organizations.id, auth.org.id));
    return null;
  });
}
