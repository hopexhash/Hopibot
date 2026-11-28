import { and, count, desc, eq, inArray } from "drizzle-orm";
import { TriangleAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CommandPalette } from "@/components/app/command-palette";
import { MobileTabBar, Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { mockModeAllowed } from "@/server/integrations/credentials";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { default: "HOPI Command", template: "%s · HOPI Command" },
  description: "Autonomous AI website agency — command center.",
  appleWebApp: { capable: true, title: "HOPI", statusBarStyle: "default" },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const [[approvals], [emails], [tasks], notifications] = await Promise.all([
    db()
      .select({ n: count() })
      .from(schema.approvals)
      .where(and(eq(schema.approvals.organizationId, orgId), eq(schema.approvals.status, "pending"))),
    db()
      .select({ n: count() })
      .from(schema.salesEmails)
      .where(and(eq(schema.salesEmails.organizationId, orgId), inArray(schema.salesEmails.status, ["awaiting_approval"]))),
    db()
      .select({ n: count() })
      .from(schema.agentTasks)
      .where(and(eq(schema.agentTasks.organizationId, orgId), inArray(schema.agentTasks.status, ["WAITING_FOR_APPROVAL", "FAILED"]))),
    db()
      .select()
      .from(schema.notifications)
      .where(eq(schema.notifications.organizationId, orgId))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(12),
  ]);
  const counts: Record<string, number> = { "/emails": emails.n, "/approvals": approvals.n, "/agents": tasks.n };
  const mock = mockModeAllowed();

  return (
    <div className="relative flex min-h-dvh">
      <Sidebar counts={counts} />
      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        {mock && (
          <div className="flex items-center justify-center gap-2 border-b border-warning/20 bg-warning-soft px-4 py-1.5 text-center text-[12px] font-medium text-warning">
            <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
            <span>
              Development mock mode — services without keys return data labelled MOCK.{" "}
              <Link href="/integrations" className="underline underline-offset-2">
                Connect
              </Link>
            </span>
          </div>
        )}
        <Topbar
          user={{ ...auth.user, role: auth.role }}
          counts={counts}
          notifications={notifications.map((n) => ({ ...n, createdAt: n.createdAt.toISOString(), readAt: n.readAt?.toISOString() ?? null }))}
        />
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-[calc(var(--safe-bottom)+92px)] pt-6 sm:px-6 lg:px-10 lg:pb-14 lg:pt-8">{children}</main>
      </div>
      <MobileTabBar />
      <CommandPalette />
    </div>
  );
}
