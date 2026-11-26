import { desc, eq } from "drizzle-orm";
import { BellOff } from "lucide-react";
import Link from "next/link";
import { NOTIFICATION_KIND } from "@/components/app/notification-meta";
import { PageHeader } from "@/components/app/page";
import { Card, EmptyState } from "@/components/ui";
import { cn, timeAgo } from "@/lib/utils";
import { requireAuth } from "@/server/auth";
import { db, schema } from "@/server/db";
import { MarkAllRead } from "./mark-read";

export const metadata = { title: "Notifications" };

export default async function NotificationsPage() {
  const auth = await requireAuth();
  const rows = await db().select().from(schema.notifications).where(eq(schema.notifications.organizationId, auth.org.id)).orderBy(desc(schema.notifications.createdAt)).limit(150);
  const unread = rows.filter((r) => !r.readAt).length;
  return (
    <>
      <PageHeader
        eyebrow="Command"
        title="Notifications"
        description="What happened while you were away: finished objectives, new leads, previews that are ready, failures and spending warnings."
        actions={unread > 0 ? <MarkAllRead count={unread} /> : undefined}
      />
      {rows.length === 0 ? (
        <Card>
          <EmptyState icon={<BellOff />} title="No notifications yet" description="When your agents finish something or need you, it shows up here and in the bell at the top." />
        </Card>
      ) : (
        <Card className="divide-y divide-[rgba(0,255,120,0.06)]">
          {rows.map((n) => {
            const k = NOTIFICATION_KIND[n.kind] ?? NOTIFICATION_KIND.info;
            const Icon = k.icon;
            const body = (
              <>
                <Icon className={cn("mt-0.5 h-[18px] w-[18px] shrink-0", k.cls)} strokeWidth={1.9} aria-label={k.label} />
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-[14px]", n.readAt ? "text-muted" : "font-medium")}>{n.title}</span>
                  {n.body && <span className="mt-0.5 block break-words text-[13px] leading-snug text-muted">{n.body}</span>}
                  <span className="mt-1 block text-[12px] text-subtle">{timeAgo(n.createdAt)}</span>
                </span>
                {!n.readAt && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
              </>
            );
            return n.href ? (
              <Link key={n.id} href={n.href} className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-[rgba(0,255,120,0.035)]">
                {body}
              </Link>
            ) : (
              <div key={n.id} className="flex items-start gap-3 px-4 py-3.5">
                {body}
              </div>
            );
          })}
        </Card>
      )}
    </>
  );
}
