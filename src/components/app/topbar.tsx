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
import { LogoMark, MobileNav } from "./sidebar";

type Notification = { id: string; kind: string; title: string; body: string | null; href: string | null; createdAt: string; readAt: string | null };

function Dot({ tone, pulse }: { tone: "green" | "amber" | "red" | "grey"; pulse?: boolean }) {
  const c = { green: "bg-accent text-accent", amber: "bg-warning text-warning", red: "bg-danger text-danger", grey: "bg-subtle text-subtle" }[tone];
  return <span className={cn("inline-block h-2 w-2 shrink-0 rounded-full", c, pulse && "animate-pulse-dot")} aria-hidden />;
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
    <header className="sticky top-0 z-30 border-b border-border bg-[rgba(3,8,6,0.85)] pt-[var(--safe-top)] backdrop-blur-xl">
      <div className="relative flex h-14 items-center gap-2 px-3 sm:px-6 lg:h-16">
        <MobileNav counts={counts} />
        <button onClick={openCommandPalette} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-border-strong hover:text-accent lg:hidden" aria-label="Search">
          <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
        {/* Phones: the logo alone, centred in the header. */}
        <Link href="/command" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden" aria-label="HOPI Bot — Command Center">
          <LogoMark animated className="h-11 w-11 drop-shadow-[0_0_10px_rgba(0,255,120,0.5)]" />
        </Link>
        <div className="hidden min-w-0 items-center gap-2 text-[13px] lg:flex">
          <span className="font-medium tracking-[0.14em] text-muted">HOPI BOT</span>
          <span className="text-accent/60">/</span>
          <span className="truncate font-medium text-foreground">{section}</span>
        </div>
        <div className="flex-1" />

        {/* Live system status (real health checks) */}
        <Link href="/health" className="flex h-10 min-w-10 items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/80 px-3 text-[12px] font-medium transition-colors hover:border-border-strong" aria-label={system.label}>
          <Dot tone={system.tone} pulse={system.tone === "green"} />
          <span className={cn("hidden sm:inline", system.tone === "green" ? "text-accent" : system.tone === "red" ? "text-danger" : "text-muted")}>{system.label}</span>
          <span className={cn("hidden", system.tone === "green" ? "text-accent" : system.tone === "red" ? "text-danger" : "text-muted")}>{system.short}</span>
        </Link>
        <Link href="/agents" className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-surface-2/80 px-3 text-[12px] font-medium text-muted transition-colors hover:border-border-strong md:flex">
          <Dot tone={cc?.activeAgents ? "green" : "grey"} pulse={Boolean(cc?.activeAgents)} />
          <span>
            <span className="tabular text-foreground">{cc ? cc.activeAgents : "–"}</span> working
            {workers && <span className={workers.online < workers.total ? "text-warning" : ""}> · <span className="tabular">{workers.online}/{workers.total}</span> online</span>}
          </span>
        </Link>
        <Link href="/integrations" className="hidden h-10 items-center gap-2 rounded-xl border border-border bg-surface-2/80 px-3 text-[12px] font-medium text-muted transition-colors hover:border-border-strong xl:flex">
          <Dot tone={apisError ? "red" : apisConnected ? "green" : "grey"} />
          <span>
            <span className="tabular text-foreground">{apis.length ? `${apisConnected}/${apis.length}` : "–"}</span> services connected
          </span>
        </Link>

        {pathname !== "/command" && (
          <Button asChild variant="primary" size="sm" className="hidden h-10 px-3.5 text-[13px] sm:inline-flex">
            <Link href="/command?objective=1">
              <Wand2 /> New objective
            </Link>
          </Button>
        )}
        {counts["/approvals"] > 0 && (
          <Link href="/approvals" className="relative hidden h-10 items-center gap-2 rounded-xl border border-warning/30 bg-warning-soft px-3 text-[12px] font-medium text-warning sm:flex">
            <ShieldCheck className="h-4 w-4" /> <span className="tabular">{counts["/approvals"]}</span> to approve
          </Link>
        )}
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-border-strong hover:text-accent" aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}>
              <Bell className="h-[17px] w-[17px]" strokeWidth={1.75} />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger shadow-[0_0_6px_#ff4d61]" />}
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
                      {!n.readAt && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />}
                    </Link>
                  </DropdownItem>
                );
              })}
            </div>
            <Link href="/notifications" className="flex h-11 items-center justify-center border-t border-border text-[12.5px] font-medium text-accent hover:bg-accent-soft">
              See all notifications
            </Link>
          </DropdownContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-accent-soft text-[12px] font-semibold text-accent" aria-label="Account menu">
              {initials}
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-56">
            <div className="px-2.5 py-2">
              <div className="truncate text-[13px] font-medium">{user.name ?? user.email}</div>
              <div className="truncate text-xs text-muted">{user.email}</div>
              <div className="mt-1 text-[11.5px] font-medium capitalize text-accent/80">{user.role}</div>
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
