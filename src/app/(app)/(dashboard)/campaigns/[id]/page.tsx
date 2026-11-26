import { and, asc, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { StatCard } from "@/components/app/page";
import { Badge } from "@/components/ui";
import { CAMPAIGN_STATUS } from "@/lib/campaign-template";
import { hasRole, requireAuth } from "@/server/auth";
import { campaignStats } from "@/server/campaigns/service";
import { db, schema } from "@/server/db";
import { integrationMode } from "@/server/integrations/credentials";
import { AudiencePanel, CampaignEditor, LaunchPanel } from "../campaign-forms";

export const metadata = { title: "Campaign" };

export default async function CampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  const id = z.string().uuid().safeParse((await params).id);
  if (!id.success) notFound();
  const [c] = await db().select().from(schema.emailCampaigns).where(and(eq(schema.emailCampaigns.id, id.data), eq(schema.emailCampaigns.organizationId, auth.org.id)));
  if (!c) notFound();
  const [stats, recipients, resend] = await Promise.all([
    campaignStats(c.id),
    db()
      .select({ r: schema.campaignRecipients, business: schema.businesses.name, city: schema.businesses.city })
      .from(schema.campaignRecipients)
      .innerJoin(schema.businesses, eq(schema.businesses.id, schema.campaignRecipients.businessId))
      .where(eq(schema.campaignRecipients.campaignId, c.id))
      .orderBy(asc(schema.campaignRecipients.createdAt))
      .limit(500),
    integrationMode(auth.org.id, "resend"),
  ]);
  const editable = ["draft", "paused"].includes(c.status);
  const st = CAMPAIGN_STATUS[c.status] ?? CAMPAIGN_STATUS.draft;
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");

  return (
    <>
      <Link href="/campaigns" className="mb-3 inline-flex h-9 items-center gap-1.5 text-[13px] text-muted hover:text-accent">
        <ArrowLeft className="h-4 w-4" /> Campaigns
      </Link>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h1 className="min-w-0 text-[24px] font-semibold leading-tight tracking-tight sm:text-[28px]">{c.name}</h1>
        <Badge tone={st.tone}>{st.label}</Badge>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Recipients" value={stats.recipients} sub={`${stats.pending} waiting · ${stats.skipped} skipped`} tone="neutral" />
        <StatCard label="Emails sent" value={stats.sent} sub={stats.failed ? `${stats.failed} failed` : "Confirmed by the provider"} tone="neutral" />
        <StatCard label="Delivery rate" value={pct(stats.delivered, stats.sent)} sub={`${stats.bounced} bounced`} tone="neutral" />
        <StatCard label="Open rate" value={pct(stats.opened, stats.sent)} sub="Estimate" tone="neutral" help="Many mail apps block open tracking, so this is a lower bound." />
        <StatCard label="In conversation" value={stats.replied} sub="Replied or further" tone="success" />
        <StatCard label="Unsubscribed" value={stats.unsubscribed} sub="Never contacted again" tone={stats.unsubscribed ? "warning" : "neutral"} />
      </div>
      <div className="space-y-4">
        <LaunchPanel id={c.id} name={c.name} status={c.status} canApprove={hasRole(auth.role, "admin")} waiting={stats.pending} dailyLimit={c.dailyLimit} resendConnected={resend === "live"} />
        <CampaignEditor
          id={c.id}
          editable={editable}
          initial={{ name: c.name, subjectTemplate: c.subjectTemplate, bodyTemplate: c.bodyTemplate, followUpEnabled: c.followUpEnabled, followUpAfterDays: c.followUpAfterDays, followUpSubject: c.followUpSubject, followUpBody: c.followUpBody, dailyLimit: c.dailyLimit, startAt: c.startAt?.toISOString() ?? null }}
        />
        <AudiencePanel id={c.id} editable={editable} recipients={recipients.map(({ r, business, city }) => ({ id: r.id, business, city, toEmail: r.toEmail, status: r.status, skipReason: r.skipReason }))} />
      </div>
    </>
  );
}
