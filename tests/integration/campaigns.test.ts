import { and, eq } from "drizzle-orm";
import { afterAll, describe, expect, it } from "vitest";
import { renderTemplate, unknownVariables } from "@/lib/campaign-template";
import { addRecipients, processCampaigns, templateProblems } from "@/server/campaigns/service";
import { closeDb, db, schema } from "@/server/db";
import { saveLead } from "@/server/leads/save";
import { publishedAddressReview } from "@/server/sales/outreach-review";
import { canConnect, makeOrg } from "./helpers";

const ok = await canConnect();
const SENDER = { agencyName: "Test Agency", senderEmail: "hi@agency.test", agencyAddress: "Street 1, Rotterdam", senderName: "Tess" };
const WEIGHTS = { noWebsite: 35, outdatedWebsite: 20, poorMobile: 15, missingContactForm: 10, poorSeo: 10, incompleteInfo: 10 };

async function lead(orgId: string, name: string, email: string | null) {
  const [b] = await db().insert(schema.businesses).values({ organizationId: orgId, name, category: "restaurant", city: "Rotterdam", country: "Netherlands", dedupeKey: `${name}-${Math.random()}` }).returning();
  if (email) await db().insert(schema.businessContacts).values({ organizationId: orgId, businessId: b.id, type: "email", value: email, source: "website", verificationStatus: "valid", isGeneric: true });
  return b;
}
async function campaign(orgId: string, userId: string, over: Partial<typeof schema.emailCampaigns.$inferInsert> = {}) {
  const [c] = await db()
    .insert(schema.emailCampaigns)
    .values({ organizationId: orgId, name: "Test", subjectTemplate: "Hello {{business_name}}", bodyTemplate: "A message for {{business_name}} in {{city}} that is long enough to send.", dailyLimit: 2, status: "active", approvedBy: userId, approvedAt: new Date(), ...over })
    .returning();
  return c;
}
const recipients = (id: string) => db().select().from(schema.campaignRecipients).where(eq(schema.campaignRecipients.campaignId, id));
const emailsOf = (orgId: string) => db().select().from(schema.salesEmails).where(eq(schema.salesEmails.organizationId, orgId));

describe("campaign templates", () => {
  it("fills variables and reports the ones without a value", () => {
    const r = renderTemplate("Hi {{business_name}} — see {{ preview_url }}", { business_name: "De Molen" });
    expect(r.text).toBe("Hi De Molen — see ");
    expect(r.missing).toEqual(["preview_url"]);
  });
  it("flags typos and pressure tactics", () => {
    expect(unknownVariables("Hi {{bussiness}}")).toEqual(["bussiness"]);
    const base = { bodyTemplate: "x".repeat(60), followUpEnabled: false, followUpSubject: null, followUpBody: null };
    expect(templateProblems({ ...base, subjectTemplate: "Last chance for {{business_name}}" })[0]).toMatch(/urgency/);
    expect(templateProblems({ ...base, subjectTemplate: "Re: your website" })[0]).toMatch(/prefix/);
    expect(templateProblems({ ...base, subjectTemplate: "A concept for {{business_name}}" })).toEqual([]);
  });
});

describe.skipIf(!ok)("campaign sending (Postgres)", () => {
  afterAll(closeDb);

  it("stores uncontactable leads as skipped with the reason", async () => {
    const { org, user } = await makeOrg("Skip Co", SENDER);
    const good = await lead(org.id, "Good Cafe", "info@good.test");
    const noMail = await lead(org.id, "No Mail Cafe", null);
    const optedOut = await lead(org.id, "Opted Out Cafe", "info@optout.test");
    await db().insert(schema.suppressionList).values({ organizationId: org.id, email: "info@optout.test", reason: "opt_out", source: "test" });
    const c = await campaign(org.id, user.id, { status: "draft" });
    const res = await addRecipients(org.id, c, [good.id, noMail.id, optedOut.id]);
    expect(res).toMatchObject({ added: 1, skipped: 2 });
    const rows = await recipients(c.id);
    expect(rows.find((r) => r.businessId === noMail.id)?.skipReason).toMatch(/No public business email/);
    expect(rows.find((r) => r.businessId === optedOut.id)?.skipReason).toMatch(/suppression/);
    // Adding the same lead twice never duplicates it.
    expect((await addRecipients(org.id, c, [good.id])).added).toBe(0);
  });

  it("sends at most the daily limit and never the same recipient twice", async () => {
    const { org, user } = await makeOrg("Limit Co", SENDER);
    const leads = await Promise.all([1, 2, 3, 4].map((i) => lead(org.id, `Cafe ${i}`, `info@cafe${i}.test`)));
    const c = await campaign(org.id, user.id, { dailyLimit: 2 });
    await addRecipients(org.id, c, leads.map((l) => l.id));
    await processCampaigns();
    await processCampaigns(); // a second scheduler pass on the same day must not exceed the limit
    const mine = await emailsOf(org.id);
    expect(mine).toHaveLength(2);
    expect(new Set(mine.map((e) => e.toEmail)).size).toBe(2);
    expect(mine.every((e) => e.status === "approved" && e.approvedBy === user.id && e.bodyText.includes("/u/"))).toBe(true);
    expect(mine[0].subject).toMatch(/^Hello Cafe \d$/);
    const rows = await recipients(c.id);
    expect(rows.filter((r) => r.status === "sent")).toHaveLength(2);
    expect(rows.filter((r) => r.status === "pending")).toHaveLength(2);
    const tasks = await db().select().from(schema.agentTasks).where(and(eq(schema.agentTasks.organizationId, org.id), eq(schema.agentTasks.type, "send_email")));
    expect(tasks).toHaveLength(2);
  });

  it("re-checks unsubscribes and conversations at send time", async () => {
    const { org, user } = await makeOrg("Recheck Co", SENDER);
    const a = await lead(org.id, "Late Optout", "a@late.test");
    const b = await lead(org.id, "Already Talking", "b@talk.test");
    const c = await campaign(org.id, user.id, { dailyLimit: 10 });
    await addRecipients(org.id, c, [a.id, b.id]);
    // Both change after being added but before the scheduler runs.
    await db().insert(schema.suppressionList).values({ organizationId: org.id, email: "a@late.test", reason: "opt_out", source: "test" });
    await db().update(schema.businesses).set({ pipelineStage: "INTERESTED" }).where(eq(schema.businesses.id, b.id));
    await processCampaigns();
    expect(await emailsOf(org.id)).toHaveLength(0);
    const rows = await recipients(c.id);
    expect(rows.find((r) => r.businessId === a.id)).toMatchObject({ status: "skipped" });
    expect(rows.find((r) => r.businessId === b.id)).toMatchObject({ status: "replied" });
    const [after] = await db().select().from(schema.emailCampaigns).where(eq(schema.emailCampaigns.id, c.id));
    expect(after.status).toBe("completed");
  });

  it("does not send without approval, sender details, or to a recently emailed business", async () => {
    const { org, user } = await makeOrg("Guard Co"); // no sender details
    const a = await lead(org.id, "Guarded", "a@guard.test");
    const unapproved = await campaign(org.id, user.id, { approvedBy: null, approvedAt: null });
    await addRecipients(org.id, unapproved, [a.id]);
    await processCampaigns();
    expect(await emailsOf(org.id)).toHaveLength(0);
    await db().update(schema.emailCampaigns).set({ approvedBy: user.id, approvedAt: new Date() }).where(eq(schema.emailCampaigns.id, unapproved.id));
    await processCampaigns();
    expect(await emailsOf(org.id)).toHaveLength(0);
    const [paused] = await db().select().from(schema.emailCampaigns).where(eq(schema.emailCampaigns.id, unapproved.id));
    expect(paused.status).toBe("paused"); // missing agency name / sender / address

    const second = await makeOrg("Recent Co", SENDER);
    const r = await lead(second.org.id, "Recent", "r@recent.test");
    await db().insert(schema.salesEmails).values({ organizationId: second.org.id, businessId: r.id, subject: "Earlier", bodyText: "Earlier email", toEmail: "r@recent.test", status: "sent", sentAt: new Date(), unsubscribeToken: `tok-${Math.random()}` });
    const c = await campaign(second.org.id, second.user.id);
    await addRecipients(second.org.id, c, [r.id]);
    await processCampaigns();
    expect((await recipients(c.id))[0]).toMatchObject({ status: "skipped", skipReason: expect.stringMatching(/last 30 days/) });
  });

  it("sends one follow-up when it is due and the business has not replied", async () => {
    const { org, user } = await makeOrg("Follow Co", SENDER);
    const a = await lead(org.id, "Quiet Cafe", "a@quiet.test");
    const c = await campaign(org.id, user.id, { dailyLimit: 5, followUpEnabled: true, followUpAfterDays: 3, followUpSubject: "Following up, {{business_name}}", followUpBody: "A short follow-up for {{business_name}} that is long enough to be sent." });
    await addRecipients(org.id, c, [a.id]);
    await processCampaigns();
    await processCampaigns();
    expect(await emailsOf(org.id)).toHaveLength(1); // not due yet
    await db().update(schema.campaignRecipients).set({ followUpDueAt: new Date(Date.now() - 1000) }).where(eq(schema.campaignRecipients.campaignId, c.id));
    await processCampaigns();
    await processCampaigns();
    const mine = await emailsOf(org.id);
    expect(mine.map((e) => e.kind).sort()).toEqual(["follow_up", "intro"]);
    expect((await recipients(c.id))[0].status).toBe("follow_up_sent");
  });
});

describe.skipIf(!ok)("saving leads", () => {
  it("detects duplicates by name and address", async () => {
    const { org } = await makeOrg();
    const input = { name: "Tandarts Jansen", category: "dentist", city: "Rotterdam", country: "Nederland", address: "Coolsingel 1", source: "manual" };
    const first = await saveLead(org.id, input, { weights: WEIGHTS, minScore: 60, audit: false });
    expect(first.status).toBe("created");
    const again = await saveLead(org.id, { ...input, name: "tandarts jansen " }, { weights: WEIGHTS, minScore: 60, audit: false });
    // Market restriction: a business outside the Netherlands and Belgium is never stored.
    await expect(saveLead(org.id, { ...input, name: "Zahnarzt Müller", country: "Germany" }, { weights: WEIGHTS, minScore: 60, audit: false })).rejects.toThrow(/supported markets/);
    expect(again).toMatchObject({ status: "duplicate", id: first.status === "created" ? first.id : "" });
  });
});

describe.skipIf(!ok)("confirming a published address while approving", () => {
  it("only offers it for a general address the business published, with permission not yet recorded", async () => {
    const { org } = await makeOrg();
    const b = await lead(org.id, "Garage Noord", null);
    const add = async (value: string, isGeneric: boolean, sourceUrl: string | null) =>
      (await db().insert(schema.businessContacts).values({ organizationId: org.id, businessId: b.id, type: "email", value, source: "website", sourceUrl, verificationStatus: "unverified", isGeneric }).returning())[0];
    const general = await add("info@garagenoord.nl", true, "https://garagenoord.nl/contact");
    const personal = await add("jan@garagenoord.nl", false, "https://garagenoord.nl/team");
    const noSource = await add("post@garagenoord.nl", true, null);
    const blocked = "Permission needed — check the address.";
    expect((await publishedAddressReview({ blockedReason: blocked, contactId: general.id, businessId: b.id }))?.sourceUrl).toBe("https://garagenoord.nl/contact");
    // Personal addresses, addresses without a page to check and other block reasons stay blocked.
    expect(await publishedAddressReview({ blockedReason: blocked, contactId: personal.id, businessId: b.id })).toBeNull();
    expect(await publishedAddressReview({ blockedReason: blocked, contactId: noSource.id, businessId: b.id })).toBeNull();
    expect(await publishedAddressReview({ blockedReason: "Recipient is on the suppression list.", contactId: general.id, businessId: b.id })).toBeNull();
    // Once a business is marked as not to be contacted, approving cannot override it.
    await db().update(schema.businesses).set({ contactPermission: "not_allowed" }).where(eq(schema.businesses.id, b.id));
    expect(await publishedAddressReview({ blockedReason: blocked, contactId: general.id, businessId: b.id })).toBeNull();
  });
});
