import { desc, eq, sql } from "drizzle-orm";
import { Megaphone } from "lucide-react";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/app/page";
import { Badge, Card, EmptyState } from "@/components/ui";
import { CAMPAIGN_STATUS } from "@/lib/campaign-template";
import { timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { NewCampaignButton } from "./campaign-forms";

export const metadata = { title: "Campaigns" };

export default async function CampaignsPage() {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const campaigns = await db().select().from(schema.emailCampaigns).where(eq(schema.emailCampaigns.organizationId, orgId)).orderBy(desc(schema.emailCampaigns.createdAt)).limit(100);
  // Real numbers per campaign from recipient rows and provider events.
  const stats = (await db().execute(sql`
    SELECT r.campaign_id AS id, count(*) AS recipients,
      count(*) FILTER (WHERE r.status = 'pending') AS pending,
      count(*) FILTER (WHERE r.status IN ('sent', 'follow_up_sent', 'replied')) AS contacted,
      count(*) FILTER (WHERE r.status = 'replied') AS replied
    FROM campaign_recipients r WHERE r.organization_id = ${orgId} GROUP BY r.campaign_id`)) as unknown as { id: string; recipients: string; pending: string; contacted: string; replied: string }[];
  const [totals] = (await db().execute(sql`
    WITH ids AS (
      SELECT intro_email_id AS id FROM campaign_recipients WHERE organization_id = ${orgId} AND intro_email_id IS NOT NULL
      UNION SELECT follow_up_email_id FROM campaign_recipients WHERE organization_id = ${orgId} AND follow_up_email_id IS NOT NULL)
    SELECT
      (SELECT count(*) FROM sales_emails e JOIN ids ON ids.id = e.id WHERE e.status = 'sent' AND NOT e.is_mock) AS sent,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'delivered') AS delivered,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'opened') AS opened,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'bounced') AS bounced,
      (SELECT count(DISTINCT ev.email_id) FROM email_events ev JOIN ids ON ids.id = ev.email_id WHERE ev.type = 'unsubscribed') AS unsubscribed`)) as unknown as Record<string, string>[];
  const n = (k: string) => Number(totals?.[k] ?? 0);
  const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");
  const by = (s: string[]) => campaigns.filter((c) => s.includes(c.status)).length;

  return (
    <>
      <PageHeader
        eyebrow="Business"
        title="Campaigns"
        description="Send one email to a group of leads, with a daily limit and an optional follow-up. A campaign never starts until you have read the preview and approved it."
        actions={<NewCampaignButton />}
      />
      <div className="mb-5 grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4">
        <StatCard label="Active campaigns" value={by(["active"])} sub={`${by(["draft", "awaiting_approval"])} draft · ${by(["completed"])} completed`} tone="neutral" />
        <StatCard label="Emails sent" value={n("sent")} sub="By campaigns, all time" tone="neutral" />
        <StatCard label="Delivery rate" value={pct(n("delivered"), n("sent"))} sub={`${n("bounced")} bounced`} tone="neutral" help="Emails the receiving server accepted, divided by emails sent. Needs the Resend webhook; shows “—” until there is data." />
        <StatCard label="Open rate" value={pct(n("opened"), n("sent"))} sub={`${n("unsubscribed")} unsubscribed`} tone="neutral" help="An estimate: many mail apps block open tracking, so the real number is usually higher." />
      </div>
      {campaigns.length === 0 ? (
        <Card>
          <EmptyState icon={<Megaphone />} title="No campaigns yet" description="When you have leads with a website preview, create a campaign to reach them all with one approved email." action={<NewCampaignButton />} />
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {campaigns.map((c) => {
            const s = stats.find((x) => x.id === c.id);
            const st = CAMPAIGN_STATUS[c.status] ?? CAMPAIGN_STATUS.draft;
            return (
              <Link key={c.id} href={`/campaigns/${c.id}`} className="panel panel-hover flex flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 truncate text-[15px] font-semibold">{c.name}</h3>
                  <Badge tone={st.tone}>{st.label}</Badge>
                </div>
                <p className="mt-1 truncate text-[12.5px] text-muted">{c.subjectTemplate}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[12px]">
                  <div>
                    <dt className="text-subtle">Recipients</dt>
                    <dd className="tabular mt-0.5 text-[14px] font-semibold">{Number(s?.recipients ?? 0)}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Contacted</dt>
                    <dd className="tabular mt-0.5 text-[14px] font-semibold">{Number(s?.contacted ?? 0)}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">Replied</dt>
                    <dd className="tabular mt-0.5 text-[14px] font-semibold text-accent">{Number(s?.replied ?? 0)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[12px] text-subtle">
                  Up to {c.dailyLimit}/day{c.followUpEnabled ? ` · follow-up after ${c.followUpAfterDays} days` : ""} · created {timeAgo(c.createdAt)}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
