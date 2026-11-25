import { and, count, desc, eq, inArray } from "drizzle-orm";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { mockModeAllowed } from "@/server/integrations/credentials";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = await requireAuth();
  const orgId = auth.org.id;
  const [[approvals], [emails], notifications] = await Promise.all([
    db()
      .select({ n: count() })
      .from(schema.approvals)
      .where(and(eq(schema.approvals.organizationId, orgId), eq(schema.approvals.status, "pending"))),
    db()
      .select({ n: count() })
      .from(schema.salesEmails)
      .where(and(eq(schema.salesEmails.organizationId, orgId), inArray(schema.salesEmails.status, ["awaiting_approval"]))),
    db()
      .select()
      .from(schema.notifications)
      .where(eq(schema.notifications.organizationId, orgId))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(12),
  ]);
  const counts: Record<string, number> = { "/emails": emails.n, "/": approvals.n };
  const mock = mockModeAllowed();

  return (
    <div className="flex min-h-dvh">
      <Sidebar orgName={auth.org.name} counts={counts} />
      <div className="flex min-w-0 flex-1 flex-col">
        {mock && (
          <div className="flex items-center justify-center gap-2 border-b border-warning/20 bg-warning-soft px-4 py-1.5 text-center text-xs font-medium text-warning">
            <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
            <span>
              Development mock mode is on: integrations without credentials return clearly labelled MOCK data.{" "}
              <Link href="/integrations" className="underline underline-offset-2">
                Connect integrations
              </Link>
            </span>
          </div>
        )}
        <Topbar
          orgName={auth.org.name}
          user={{ ...auth.user, role: auth.role }}
          counts={counts}
          notifications={notifications.map((n) => ({
            ...n,
            createdAt: n.createdAt.toISOString(),
            readAt: n.readAt?.toISOString() ?? null,
          }))}
        />
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
