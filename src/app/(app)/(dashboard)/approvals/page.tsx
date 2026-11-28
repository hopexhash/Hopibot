import { and, desc, eq, inArray, ne } from "drizzle-orm";
import { ShieldCheck } from "lucide-react";
import { PageHeader, Section } from "@/components/app/page";
import { StatusBadge } from "@/components/app/status";
import { Card, EmptyState } from "@/components/ui";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { ApprovalQueue, type ApprovalDetail } from "./approval-queue";

export const metadata = { title: "Approvals" };

const KIND_LABEL: Record<string, string> = {
  send_email: "Send an email",
  publish_website: "Publish a website",
  connect_domain: "Connect a domain",
  budget_override: "Go over the spending limit",
  purchase: "Make a purchase",
  modify_external: "Change an external account",
  launch_campaign: "Launch a campaign",
};

export default async function ApprovalsPage() {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const [pending, decided] = await Promise.all([
    db().select().from(schema.approvals).where(and(eq(schema.approvals.organizationId, orgId), eq(schema.approvals.status, "pending"))).orderBy(desc(schema.approvals.createdAt)).limit(100),
    db()
      .select({ a: schema.approvals, by: schema.users.name, email: schema.users.email })
      .from(schema.approvals)
      .leftJoin(schema.users, eq(schema.users.id, schema.approvals.decidedBy))
      .where(and(eq(schema.approvals.organizationId, orgId), ne(schema.approvals.status, "pending")))
      .orderBy(desc(schema.approvals.decidedAt))
      .limit(20),
  ]);

  // Load exactly what each request would do, from the records it points at.
  const ids = (type: string) => pending.filter((p) => p.subjectType === type).map((p) => p.subjectId);
  const emailIds = [...ids("sales_email"), ...pending.filter((p) => p.kind === "send_email").map((p) => p.subjectId)];
  const projectIds = pending.filter((p) => ["publish_website", "connect_domain"].includes(p.kind)).map((p) => p.subjectId);
  const taskIds = pending.filter((p) => p.kind === "budget_override").map((p) => p.subjectId);
  const [emails, projects, tasks] = await Promise.all([
    emailIds.length
      ? db()
          .select({ e: schema.salesEmails, business: schema.businesses.name })
          .from(schema.salesEmails)
          .innerJoin(schema.businesses, eq(schema.businesses.id, schema.salesEmails.businessId))
          .where(and(eq(schema.salesEmails.organizationId, orgId), inArray(schema.salesEmails.id, emailIds)))
      : [],
    projectIds.length
      ? db()
          .select({ p: schema.websiteProjects, business: schema.businesses.name })
          .from(schema.websiteProjects)
          .innerJoin(schema.businesses, eq(schema.businesses.id, schema.websiteProjects.businessId))
          .where(and(eq(schema.websiteProjects.organizationId, orgId), inArray(schema.websiteProjects.id, projectIds)))
      : [],
    taskIds.length ? db().select().from(schema.agentTasks).where(and(eq(schema.agentTasks.organizationId, orgId), inArray(schema.agentTasks.id, taskIds))) : [],
  ]);

  const items: ApprovalDetail[] = pending.map((p) => {
    const base = { id: p.id, kind: p.kind, kindLabel: KIND_LABEL[p.kind] ?? p.kind.replace(/_/g, " "), summary: p.summary, createdAt: p.createdAt.toISOString() };
    if (p.kind === "send_email") {
      const row = emails.find((x) => x.e.id === p.subjectId);
      return {
        ...base,
        reviewHref: `/emails/${p.subjectId}`,
        facts: row
          ? [
              { label: "To", value: row.e.toEmail ?? "No recipient yet" },
              { label: "Business", value: row.business },
              { label: "Subject", value: row.e.subject },
            ]
          : [],
        preview: row?.e.bodyText.slice(0, 600) ?? null,
        consequence: "If you approve on the email page, this exact email is sent once to this address. It includes an unsubscribe link.",
        isMock: row?.e.isMock ?? false,
      };
    }
    if (p.kind === "publish_website" || p.kind === "connect_domain") {
      const row = projects.find((x) => x.p.id === p.subjectId);
      const domain = typeof p.payload.domain === "string" ? p.payload.domain : null;
      return {
        ...base,
        reviewHref: `/websites/${p.subjectId}`,
        facts: [
          ...(row ? [{ label: "Business", value: row.business }] : []),
          ...(domain ? [{ label: "Domain", value: domain }] : []),
          ...(row?.p.qualityScore != null ? [{ label: "Quality score", value: `${row.p.qualityScore}/100` }] : []),
          ...(row?.p.previewUrl ? [{ label: "Preview", value: row.p.previewUrl, href: row.p.previewUrl }] : []),
        ],
        preview: null,
        consequence: "If you approve, the Deployment agent publishes this website publicly" + (domain ? ` on ${domain}.` : "."),
        isMock: false,
      };
    }
    if (p.kind === "budget_override") {
      const t = tasks.find((x) => x.id === p.subjectId);
      const budget = (p.payload.budget ?? {}) as { reason?: string };
      return {
        ...base,
        reviewHref: "/costs",
        facts: [
          ...(t ? [{ label: "Agent", value: AGENT_META[t.agentKey as AgentKey]?.name ?? t.agentKey }, { label: "Task", value: t.type.replace(/_/g, " ") }] : []),
          ...(budget.reason ? [{ label: "Why it paused", value: budget.reason }] : []),
        ],
        preview: null,
        consequence: "If you approve, this one paused task runs now. Your limits stay in place for everything after it. If you reject, the task is cancelled.",
        isMock: false,
      };
    }
    if (p.kind === "launch_campaign") {
      return { ...base, reviewHref: `/campaigns/${p.subjectId}`, facts: typeof p.payload.dailyLimit === "number" ? [{ label: "Daily limit", value: `${p.payload.dailyLimit} emails` }] : [], preview: null, consequence: "Open the campaign to read the real email preview and confirm the compliance checks. Approving there starts the sending.", isMock: false };
    }
    return { ...base, reviewHref: null, facts: [], preview: null, consequence: "Review the request carefully before deciding.", isMock: false };
  });

  return (
    <>
      <PageHeader
        eyebrow="Approvals"
        title="Approval queue"
        description="Your agents never send emails, publish websites or go over budget by themselves. Anything like that waits here until you say yes."
      />
      {items.length === 0 ? (
        <Card>
          <EmptyState icon={<ShieldCheck />} title="Nothing is waiting for you" description="When an agent wants to send an email, publish a website or spend past a limit, it will ask here first." />
        </Card>
      ) : (
        <ApprovalQueue items={items} canDecide={hasRole(auth.role, "admin")} />
      )}

      <Section className="mt-10" title="Recently decided">
        <Card className="divide-y divide-border">
          {decided.length === 0 && <p className="px-4 py-8 text-center text-[13px] text-muted">No decisions yet.</p>}
          {decided.map(({ a, by, email }) => (
            <div key={a.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-medium">{a.summary}</p>
                <p className="mt-0.5 truncate text-[12px] text-subtle">
                  {KIND_LABEL[a.kind] ?? a.kind} · {by ?? email ?? "system"} · {timeAgo(a.decidedAt)}
                  {a.reason ? ` · “${a.reason}”` : ""}
                </p>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </Card>
      </Section>
    </>
  );
}
