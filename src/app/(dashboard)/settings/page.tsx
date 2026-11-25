import { desc, eq } from "drizzle-orm";
import { PageHeader, Section } from "@/components/app/page";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { hasRole, requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { AgencyForm, InterfaceCard, MembersCard, ScoringForm } from "./settings-forms";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const auth = await requireAuth();
  const [members, auditRows] = await Promise.all([
    db()
      .select({ userId: schema.users.id, name: schema.users.name, email: schema.users.email, role: schema.organizationMembers.role })
      .from(schema.organizationMembers)
      .innerJoin(schema.users, eq(schema.users.id, schema.organizationMembers.userId))
      .where(eq(schema.organizationMembers.organizationId, auth.org.id)),
    hasRole(auth.role, "admin")
      ? db()
          .select({ log: schema.auditLogs, email: schema.users.email })
          .from(schema.auditLogs)
          .leftJoin(schema.users, eq(schema.users.id, schema.auditLogs.userId))
          .where(eq(schema.auditLogs.organizationId, auth.org.id))
          .orderBy(desc(schema.auditLogs.id))
          .limit(60)
      : Promise.resolve([]),
  ]);
  const canAdmin = hasRole(auth.role, "admin");
  return (
    <>
      <PageHeader eyebrow="SYSTEM // SETTINGS" title="Settings" description={`${auth.org.name} · you are ${auth.role}`} />
      <div className="space-y-4">
        <InterfaceCard />
        <AgencyForm settings={auth.org.settings} canAdmin={canAdmin} />
        <ScoringForm settings={auth.org.settings} canAdmin={canAdmin} />
        <MembersCard members={members} currentUserId={auth.user.id} isOwner={auth.role === "owner"} canAdmin={canAdmin} />
      </div>
      {canAdmin && (
        <Section className="mt-8" title="Audit log" description="Security-relevant actions in this workspace. Entries cannot be modified.">
          <Table>
            <THead>
              <tr>
                <TH>When</TH>
                <TH>User</TH>
                <TH>Action</TH>
                <TH>Target</TH>
                <TH>IP</TH>
              </tr>
            </THead>
            <tbody>
              {auditRows.map(({ log, email }) => (
                <TR key={log.id}>
                  <TD className="whitespace-nowrap text-muted">{formatDateTime(log.createdAt)}</TD>
                  <TD className="text-muted">{email ?? "system"}</TD>
                  <TD className="font-mono text-xs">{log.action}</TD>
                  <TD className="max-w-[200px] truncate text-xs text-muted">{[log.targetType, log.targetId].filter(Boolean).join(" ") || "—"}</TD>
                  <TD className="text-xs text-muted">{log.ip ?? "—"}</TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </Section>
      )}
    </>
  );
}
