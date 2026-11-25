import { and, desc, eq } from "drizzle-orm";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, CardContent, CardHeader, CardTitle, MockBadge } from "@/components/ui";
import { formatDateTime, formatEur } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { isSuppressed } from "@/server/suppression";
import { EmailReview } from "./email-review";

export const metadata = { title: "Email" };

export default async function EmailPage({ params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const [row] = await db()
    .select({ email: schema.salesEmails, business: schema.businesses })
    .from(schema.salesEmails)
    .innerJoin(schema.businesses, eq(schema.businesses.id, schema.salesEmails.businessId))
    .where(and(eq(schema.salesEmails.id, id), eq(schema.salesEmails.organizationId, auth.org.id)));
  if (!row) notFound();
  const { email: e, business: b } = row;
  const [events, contact] = await Promise.all([
    db().select().from(schema.emailEvents).where(eq(schema.emailEvents.emailId, e.id)).orderBy(desc(schema.emailEvents.occurredAt)),
    e.contactId ? db().select().from(schema.businessContacts).where(eq(schema.businessContacts.id, e.contactId)) : Promise.resolve([]),
  ]);
  const s = auth.org.settings;
  const suppressed = e.toEmail ? await isSuppressed(auth.org.id, e.toEmail) : false;
  const checks = [
    { label: "Recipient address present", ok: Boolean(e.toEmail) },
    { label: "Recipient not on suppression list", ok: !suppressed },
    { label: "Not a mock/placeholder address", ok: !e.toEmail?.endsWith(".invalid") },
    { label: "Agency identity configured (name, address, sender)", ok: Boolean(s.agencyName && s.agencyAddress && s.senderEmail) },
    { label: "Opt-out link included", ok: e.bodyText.includes(e.unsubscribeToken) },
    { label: "Preview marked as demonstration", ok: true },
  ];
  const proposal = e.proposal as { summary?: string; includes?: string[]; setupFeeEur?: number; monthlyFeeEur?: number; rationale?: string; previewDescription?: string } | null;
  const c = contact[0];

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/emails" className="hover:text-foreground">← Email Campaigns</Link>}
        title={
          <span className="flex items-center gap-2">
            {e.kind === "intro" ? "Introduction email" : e.kind === "follow_up" ? "Follow-up email" : "Proposal"} {e.isMock && <MockBadge />}
          </span>
        }
        description={
          <>
            To <Link href={`/businesses/${b.id}`} className="hover:text-accent">{b.name}</Link>
            {e.sentAt ? ` · sent ${formatDateTime(e.sentAt)}` : ""}
          </>
        }
        actions={<StatusBadge status={e.status} label={e.status === "sent" && e.isMock ? "Simulated (not sent)" : undefined} />}
      />
      {e.blockedReason && <div className="mb-4 rounded-xl border border-danger/20 bg-danger-soft px-4 py-3 text-[13px] text-danger">{e.blockedReason}</div>}
      {e.status === "sent" && e.isMock && <div className="mb-4 rounded-xl border border-warning/20 bg-warning-soft px-4 py-3 text-[13px] text-warning">Mock mode: this email was not actually sent. Configure Resend to send real email.</div>}
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <EmailReview email={{ id: e.id, subject: e.subject, bodyText: e.bodyText, toEmail: e.toEmail, status: e.status, kind: e.kind, blockedReason: e.blockedReason }} canAdmin={hasRole(auth.role, "admin")} checks={checks} />
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {checks.map((ch) => (
                <div key={ch.label} className="flex items-center gap-2 text-xs">
                  {ch.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <XCircle className="h-4 w-4 text-danger" />}
                  {ch.label}
                </div>
              ))}
              {!s.agencyAddress && (
                <Link href="/settings" className="block pt-1 text-xs text-accent hover:underline">
                  Complete agency details in Settings →
                </Link>
              )}
            </CardContent>
          </Card>
          {c && (
            <Card>
              <CardHeader>
                <CardTitle>Recipient source</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-xs text-muted">
                <p>
                  {c.value} · {c.isGeneric ? "generic business address" : "personal address — review carefully"}
                </p>
                <p>
                  Source: {c.source}
                  {c.sourceUrl && (
                    <>
                      {" "}
                      (<a href={c.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-accent hover:underline">page</a>)
                    </>
                  )}
                </p>
                <p>Verification: {c.verificationStatus}</p>
              </CardContent>
            </Card>
          )}
          {proposal && (
            <Card>
              <CardHeader>
                <CardTitle>Proposal & pricing suggestion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                {proposal.previewDescription && <p className="text-muted">{proposal.previewDescription}</p>}
                <p>{proposal.summary}</p>
                <ul className="list-inside list-disc text-muted">{proposal.includes?.map((i) => <li key={i}>{i}</li>)}</ul>
                <p className="text-[13px] font-semibold">
                  {formatEur((proposal.setupFeeEur ?? 0) * 100)} setup · {formatEur((proposal.monthlyFeeEur ?? 0) * 100)}/month
                </p>
                {proposal.rationale && <p className="text-muted">{proposal.rationale}</p>}
              </CardContent>
            </Card>
          )}
          {e.crmNotes && (
            <Card>
              <CardHeader>
                <CardTitle>CRM notes</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted">{e.crmNotes}</CardContent>
            </Card>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5">
              {events.length === 0 && <p className="text-xs text-muted">No delivery events yet.</p>}
              {events.map((ev) => (
                <div key={ev.id} className="flex justify-between text-xs">
                  <span className="capitalize">{ev.type.replace("_", " ")}</span>
                  <span className="text-muted">{formatDateTime(ev.occurredAt)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
