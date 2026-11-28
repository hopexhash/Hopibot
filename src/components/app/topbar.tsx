"use client";

import { Bell, LogOut, Search, Settings, ShieldCheck, Wand2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, DropdownContent, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger } from "@/components/ui";
import { cn, timeAgo } from "@/lib/utils";
import { signOutAction } from "@/server/actions/auth";
import { markNotificationsReadAction } from "@/server/actions/notifications";
import { NOTIFICATION_KIND } from "./notification-meta";
import { useCommandCenter, useSystemHealth } from "./live";
import { openCommandPalette } from "./command-palette";
import { activeHref, NAV_ITEMS } from "./nav";
import { MobileNav, Wordmark } from "./sidebar";

type Notification = { id: string; kind: string; title: string; body: string | null; href: string | null; createdAt: string; readAt: string | null };

function Dot({ tone, pulse }: { tone: "green" | "amber" | "red" | "grey"; pulse?: boolean }) {
  const c = { green: "bg-success text-success", amber: "bg-warning text-warning", red: "bg-danger text-danger", grey: "bg-subtle text-subtle" }[tone];
  // A live state gets one soft halo (status-live), never a glowing pulse.
  return <span className={cn("status-dot inline-block h-[7px] w-[7px] shrink-0 rounded-full", c, pulse && "status-live")} aria-hidden />;
}

/** Real system status: infrastructure checks + live agent/API state. */
function useStatus() {
  const { data: health } = useSystemHealth();
  const { data: cc } = useCommandCenter();
  const infra = health?.checks.filter((c) => ["api", "database", "redis"].includes(c.key)) ?? [];
  const infraOk = infra.length === 3 && infra.every((c) => c.state === "operational" || c.state === "connected");
  const system: { label: string; short: string; tone: "green" | "amber" | "red" | "grey" } = !health
    ? { label: "Checking…", short: "…", tone: "grey" }
    : infraOk
      ? { label: "System online", short: "Online", tone: "green" }
      : { label: "System degraded", short: "Issue", tone: "red" };
  const apis = health?.checks.filter((c) => !["api", "database", "redis", "workers"].includes(c.key)) ?? [];
  const apisConnected = apis.filter((c) => c.state === "connected").length;
  const apisError = apis.some((c) => c.state === "error");
  return { system, cc, apis, apisConnected, apisError, workers: cc?.workers };
}

export function Topbar({ user, counts, notifications }: { user: { name: string | null; email: string; role: string }; counts: Record<string, number>; notifications: Notification[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { system, cc, apis, apisConnected, apisError, workers } = useStatus();
  const unread = notifications.filter((n) => !n.readAt).length;
  const section = NAV_ITEMS.find((n) => n.href === activeHref(pathname))?.label ?? "Command Center";
  const initials = (user.name ?? user.email)
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 pt-[var(--safe-top)] backdrop-blur-xl">
      <div className="relative flex h-14 items-center gap-2 px-3 sm:px-6 lg:h-16">
        <MobileNav counts={counts} />
        <button onClick={openCommandPalette} className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-border-strong lg:hidden" aria-label="Search">
          <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
        {/* Phones: the logo alone, centred in the header. */}
        <Link href="/command" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden" aria-label="HOPI, Command Center">
          <Wordmark className="text-[21px]" />
        </Link>
        <div className="hidden min-w-0 items-center gap-2.5 lg:flex">
          <span className="label-mono !text-[10.5px]">Command</span>
          <span className="text-subtle">/</span>
          <span className="truncate font-display text-[15px] font-semibold tracking-tight text-foreground">{section}</span>
        </div>
        <div className="flex-1" />

        {/* Live system status (real health checks and agents), as one quiet strip. */}
        <div className="flex h-10 items-center divide-x divide-border rounded-md border border-border bg-surface text-[12.5px]">
          <Link href="/health" className="flex h-full items-center gap-2 px-3 font-medium transition-colors hover:bg-surface-2" aria-label={system.label}>
            <Dot tone={system.tone} pulse={system.tone === "green"} />
            <span className={cn("hidden sm:inline", system.tone === "red" ? "text-danger" : "text-foreground")}>{system.tone === "green" ? "Operational" : system.label}</span>
          </Link>
          <Link href="/agents" className="hidden h-full items-center gap-1.5 px-3 text-muted transition-colors hover:bg-surface-2 md:flex">
            <span className="tabular font-semibold text-foreground">{cc ? cc.activeAgents : "–"}</span> working
            {workers && (
              <span className={workers.online < workers.total ? "text-warning" : ""}>
                · <span className="tabular">{workers.online}/{workers.total}</span> online
              </span>
            )}
          </Link>
          <Link href="/integrations" className="hidden h-full items-center gap-1.5 px-3 text-muted transition-colors hover:bg-surface-2 xl:flex">
            <Dot tone={apisError ? "red" : apisConnected ? "green" : "grey"} />
            <span className="tabular font-semibold text-foreground">{apis.length ? `${apisConnected}/${apis.length}` : "–"}</span> services
          </Link>
        </div>

        {pathname !== "/command" && (
          <Button asChild variant="primary" size="sm" className="hidden h-10 px-3.5 text-[13px] sm:inline-flex">
            <Link href="/command?objective=1">
              <Wand2 /> New objective
            </Link>
          </Button>
        )}
        {counts["/approvals"] > 0 && (
          <Link href="/approvals" className="relative hidden h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 text-[12.5px] font-medium text-foreground transition-colors hover:border-border-strong sm:flex">
            <ShieldCheck className="h-4 w-4 text-accent" /> <span className="tabular rounded-[3px] bg-brand px-1.5 font-semibold leading-[18px] text-[#0c0c0d]">{counts["/approvals"]}</span> to approve
          </Link>
        )}
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground transition-colors hover:border-border-strong" aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}>
              <Bell className="h-[17px] w-[17px]" strokeWidth={1.75} />
              {unread > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand ring-2 ring-surface" />}
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-[min(20rem,calc(100vw-1.5rem))] p-0">
            <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 text-[13.5px] font-medium">
              Notifications
              {unread > 0 && (
                <button onClick={() => void markNotificationsReadAction().then(() => router.refresh())} className="text-[12px] font-normal text-accent hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[min(24rem,60dvh)] overflow-y-auto p-1">
              {notifications.length === 0 && <p className="px-3 py-8 text-center text-[13px] text-muted">Nothing new.</p>}
              {notifications.map((n) => {
                const k = NOTIFICATION_KIND[n.kind] ?? NOTIFICATION_KIND.info;
                const Icon = k.icon;
                return (
                  <DropdownItem key={n.id} asChild className="items-start">
                    <Link href={n.href ?? "/notifications"}>
                      <Icon className="mt-0.5 shrink-0" style={{ color: k.color }} />
                      <span className="min-w-0 flex-1">
                        <span className={cn("block truncate text-[13px]", n.readAt ? "text-muted" : "font-medium")}>{n.title}</span>
                        {n.body && <span className="block truncate text-[12px] text-muted">{n.body}</span>}
                        <span className="block text-[11.5px] text-subtle" suppressHydrationWarning>
                          {timeAgo(n.createdAt)}
                        </span>
                      </span>
                      {!n.readAt && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />}
                    </Link>
                  </DropdownItem>
                );
              })}
            </div>
            <Link href="/notifications" className="flex h-11 items-center justify-center border-t border-border text-[12.5px] font-medium text-foreground hover:bg-surface-2">
              See all notifications
            </Link>
          </DropdownContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground font-display text-[12.5px] font-semibold text-background transition-opacity hover:opacity-85" aria-label="Account menu">
              {initials}
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-56">
            <div className="px-2.5 py-2">
              <div className="truncate text-[13px] font-medium">{user.name ?? user.email}</div>
              <div className="truncate text-xs text-muted">{user.email}</div>
              <div className="label-mono mt-1.5 !text-[10px]">{user.role}</div>
            </div>
            <DropdownSeparator />
            <DropdownItem asChild>
              <Link href="/settings">
                <Settings /> Settings
              </Link>
            </DropdownItem>
            <DropdownItem onSelect={() => void signOutAction()}>
              <LogOut /> Sign out
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
