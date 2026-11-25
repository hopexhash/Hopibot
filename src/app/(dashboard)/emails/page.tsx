import { and, desc, eq, inArray } from "drizzle-orm";
import { Mail } from "lucide-react";
import Link from "next/link";
import { PageHeader, StatCard } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, EmptyState, MockBadge } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { cn, formatDate, timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { SuppressionManager } from "./suppression-manager";

export const metadata = { title: "Email Campaigns" };

const TABS = [
  { key: "awaiting", label: "Awaiting approval", statuses: ["awaiting_approval"] },
  { key: "drafts", label: "Follow-up drafts", statuses: ["draft"] },
  { key: "sent", label: "Sent", statuses: ["approved", "sending", "sent"] },
  { key: "closed", label: "Blocked & cancelled", statuses: ["blocked", "cancelled", "failed"] },
  { key: "suppression", label: "Suppression list", statuses: [] },
] as const;

export default async function EmailsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const auth = await requireAuth();
  const { tab = "awaiting" } = await searchParams;
  const active = TABS.find((t) => t.key === tab) ?? TABS[0];
  const all = await db()
    .select({ status: schema.salesEmails.status, isMock: schema.salesEmails.isMock })
    .from(schema.salesEmails)
    .where(eq(schema.salesEmails.organizationId, auth.org.id));
  const count = (st: readonly string[]) => all.filter((e) => st.includes(e.status)).length;
  const rows =
    active.key === "suppression"
      ? []
      : await db()
          .select({ email: schema.salesEmails, business: schema.businesses.name })
          .from(schema.salesEmails)
          .innerJoin(schema.businesses, eq(schema.businesses.id, schema.salesEmails.businessId))
          .where(and(eq(schema.salesEmails.organizationId, auth.org.id), inArray(schema.salesEmails.status, [...active.statuses])))
          .orderBy(desc(schema.salesEmails.updatedAt))
          .limit(200);
  const suppression = active.key === "suppression" ? await db().select().from(schema.suppressionList).where(eq(schema.suppressionList.organizationId, auth.org.id)).orderBy(desc(schema.suppressionList.createdAt)).limit(500) : [];
  const sentReal = all.filter((e) => e.status === "sent" && !e.isMock).length;

  return (
    <>
      <PageHeader title="Email Campaigns" description="Every outreach email is drafted by the Sales agent and waits for human approval. Opt-outs are honoured immediately and permanently." />
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Awaiting approval" value={count(["awaiting_approval"])} tone="warning" />
        <StatCard label="Sent" value={sentReal} sub={`${all.filter((e) => e.status === "sent" && e.isMock).length} simulated (mock)`} tone="success" />
        <StatCard label="Follow-up drafts" value={count(["draft"])} />
        <StatCard label="Blocked / cancelled" value={count(["blocked", "cancelled", "failed"])} tone="danger" />
      </div>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-border">
        {TABS.map((t) => (
          <Link key={t.key} href={`/emails?tab=${t.key}`} className={cn("-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-[13px] font-medium", t.key === active.key ? "border-accent text-foreground" : "border-transparent text-muted hover:text-foreground")}>
            {t.label}
            {t.statuses.length > 0 && <span className="ml-1.5 text-xs text-subtle">{count(t.statuses)}</span>}
          </Link>
        ))}
      </div>
      {active.key === "suppression" ? (
        <SuppressionManager
          canAdmin={hasRole(auth.role, "admin")}
          rows={suppression.map((s) => ({ id: s.id, value: s.email ?? s.domain ?? "", reason: s.reason, source: s.source, createdAt: s.createdAt.toISOString() }))}
        />
      ) : rows.length === 0 ? (
        <Card>
          <EmptyState icon={<Mail />} title="Nothing here" description="Sales drafts appear once a business has a QC-approved preview website." />
        </Card>
      ) : (
        <Table>
          <THead>
            <tr>
              <TH>Subject</TH>
              <TH>Business</TH>
              <TH>Recipient</TH>
              <TH>Kind</TH>
              <TH>Status</TH>
              <TH>{active.key === "sent" ? "Sent" : "Updated"}</TH>
            </tr>
          </THead>
          <tbody>
            {rows.map(({ email: e, business }) => (
              <TR key={e.id}>
                <TD className="max-w-[320px]">
                  <Link href={`/emails/${e.id}`} className="flex items-center gap-2 font-medium hover:text-accent">
                    <span className="truncate">{e.subject}</span> {e.isMock && <MockBadge />}
                  </Link>
                  {e.blockedReason && <p className="truncate text-[11px] text-danger">{e.blockedReason}</p>}
                </TD>
                <TD className="text-muted">{business}</TD>
                <TD className="max-w-[200px] truncate text-muted">{e.toEmail ?? "—"}</TD>
                <TD className="text-muted">{e.kind.replace("_", " ")}</TD>
                <TD>
                  <StatusBadge status={e.status} label={e.status === "sent" && e.isMock ? "Simulated" : undefined} />
                </TD>
                <TD className="text-muted">{e.sentAt ? formatDate(e.sentAt) : timeAgo(e.updatedAt)}</TD>
              </TR>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
