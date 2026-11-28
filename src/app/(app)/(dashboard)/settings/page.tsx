import { desc, eq } from "drizzle-orm";
import { Bot, KeyRound, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LinkTabs, PageHeader } from "@/components/app/page";
import { AutopilotForm, PricingForm } from "./pricing-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { SUPPORTED_MODELS } from "@/server/costs/pricing";
import { db, schema } from "@/server/db";
import { AiSettingsForm } from "./ai-settings";
import { AgencyForm, MembersCard, ScoringForm, WebsiteForm } from "./settings-forms";

export const metadata = { title: "Settings" };

const TABS = [
  { key: "general", label: "General" },
  { key: "ai", label: "AI & spending" },
  { key: "leads", label: "Leads" },
  { key: "pricing", label: "Pricing" },
  { key: "autopilot", label: "Autopilot" },
  { key: "team", label: "Team" },
  { key: "security", label: "Security" },
];

const ROLES = [
  { role: "Owner", can: "Everything, including removing admins and deleting the workspace." },
  { role: "Admin", can: "Approve emails, campaigns and publishing; change settings, agents, limits and API keys." },
  { role: "Member", can: "Start objectives, manage leads and websites, prepare emails and campaigns. Cannot approve or change settings." },
  { role: "Viewer", can: "Look at everything. Cannot change anything." },
];

export default async function SettingsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const auth = await requireAuth();
  const sp = await searchParams;
  const tab = TABS.some((t) => t.key === sp.tab) ? (sp.tab as string) : "general";
  const canAdmin = hasRole(auth.role, "admin");
  const members =
    tab === "team"
      ? await db()
          .select({ userId: schema.users.id, name: schema.users.name, email: schema.users.email, role: schema.organizationMembers.role })
          .from(schema.organizationMembers)
          .innerJoin(schema.users, eq(schema.users.id, schema.organizationMembers.userId))
          .where(eq(schema.organizationMembers.organizationId, auth.org.id))
      : [];
  const auditRows =
    tab === "security" && canAdmin
      ? await db()
          .select({ log: schema.auditLogs, email: schema.users.email })
          .from(schema.auditLogs)
          .leftJoin(schema.users, eq(schema.users.id, schema.auditLogs.userId))
          .where(eq(schema.auditLogs.organizationId, auth.org.id))
          .orderBy(desc(schema.auditLogs.id))
          .limit(80)
      : [];

  return (
    <>
      <PageHeader eyebrow="Platform" title="Settings" description={`${auth.org.name} · you are signed in as ${auth.role}`} />
      <LinkTabs tabs={TABS} current={tab} href={(k) => (k === "general" ? "/settings" : `/settings?tab=${k}`)} />

      {tab === "general" && (
        <div className="space-y-4">
          <AgencyForm settings={auth.org.settings} canAdmin={canAdmin} />
          <WebsiteForm settings={auth.org.settings} canAdmin={canAdmin} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/integrations" className="panel panel-hover flex items-start gap-3 p-4">
              <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                <span className="block text-[14px] font-semibold">API keys and services</span>
                <span className="block text-[12.5px] leading-snug text-muted">Claude, Google Places, email sending, deployment and payments are connected on the Integrations page.</span>
              </span>
            </Link>
            <Link href="/agents/config" className="panel panel-hover flex items-start gap-3 p-4">
              <Bot className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>
                <span className="block text-[14px] font-semibold">Agent configuration</span>
                <span className="block text-[12.5px] leading-snug text-muted">Instructions, model and limits for each of the seven agents.</span>
              </span>
            </Link>
          </div>
        </div>
      )}

      {tab === "ai" && <AiSettingsForm settings={auth.org.settings} models={SUPPORTED_MODELS.map((m) => ({ id: m.id, label: m.label }))} canAdmin={canAdmin} />}

      {tab === "leads" && <ScoringForm settings={auth.org.settings} canAdmin={canAdmin} />}

      {tab === "pricing" && <PricingForm settings={auth.org.settings} canAdmin={canAdmin} />}

      {tab === "autopilot" && <AutopilotForm settings={auth.org.settings} canAdmin={canAdmin} />}

      {tab === "team" && (
        <div className="space-y-4">
          <MembersCard members={members} currentUserId={auth.user.id} isOwner={auth.role === "owner"} canAdmin={canAdmin} />
          <Card>
            <CardHeader>
              <div>
                <CardTitle>What each role can do</CardTitle>
                <CardDescription>Roles are checked on the server for every action.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                {ROLES.map((r) => (
                  <div key={r.role} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
                    <dt className="w-24 shrink-0 text-[13.5px] font-medium">{r.role}</dt>
                    <dd className="text-[13px] leading-relaxed text-muted">{r.can}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "security" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> How your workspace is protected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-[13.5px] leading-relaxed text-muted">
                <li>API keys are encrypted before they are stored and are never shown again or sent to your browser.</li>
                <li>Agents cannot send email, publish on a real domain or pass a spending limit without an approval from an admin.</li>
                <li>Everything an agent reads from a website is treated as data, never as instructions.</li>
                <li>Each workspace only ever sees its own data; this is enforced in the application and again in the database.</li>
                <li>Sign-ins, approvals and every settings change are recorded in the audit log below, which cannot be edited.</li>
              </ul>
            </CardContent>
          </Card>
          {canAdmin ? (
            <div>
              <h2 className="mb-3 text-[16px] font-semibold">Audit log</h2>
              <Table>
                <THead>
                  <tr>
                    <TH>When</TH>
                    <TH>Who</TH>
                    <TH>Action</TH>
                    <TH>Target</TH>
                    <TH>IP address</TH>
                  </tr>
                </THead>
                <tbody>
                  {auditRows.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-[13px] text-muted">
                        Nothing recorded yet.
                      </td>
                    </tr>
                  )}
                  {auditRows.map(({ log, email }) => (
                    <TR key={log.id}>
                      <TD className="whitespace-nowrap text-muted">{formatDateTime(log.createdAt)}</TD>
                      <TD className="text-muted">{email ?? "system"}</TD>
                      <TD className="term text-[12px]">{log.action}</TD>
                      <TD className="max-w-[220px] truncate text-[12.5px] text-muted">{[log.targetType, log.targetId].filter(Boolean).join(" ") || "—"}</TD>
                      <TD className="text-[12.5px] text-muted">{log.ip ?? "—"}</TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p className="text-[13px] text-muted">The audit log is visible to admins and owners.</p>
          )}
        </div>
      )}
    </>
  );
}
