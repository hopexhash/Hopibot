"use client";

import { Bell, LogOut, Settings, Wand2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, DropdownContent, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger } from "@/components/ui";
import { cn, timeAgo } from "@/lib/utils";
import { signOutAction } from "@/server/actions/auth";
import { useCommandCenter, useSystemHealth } from "./live";
import { LogoMark, MobileNav } from "./sidebar";

type Notification = { id: string; title: string; body: string | null; href: string | null; createdAt: string; readAt: string | null };

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
  const system: { label: string; tone: "green" | "amber" | "red" | "grey" } = !health ? { label: "CHECKING", tone: "grey" } : infraOk ? { label: "SYSTEM ONLINE", tone: "green" } : { label: "SYSTEM DEGRADED", tone: "red" };
  const apis = health?.checks.filter((c) => !["api", "database", "redis", "workers"].includes(c.key)) ?? [];
  const apisConnected = apis.filter((c) => c.state === "connected").length;
  const apisError = apis.some((c) => c.state === "error");
  return { system, cc, apis, apisConnected, apisError, workers: cc?.workers };
}

export function Topbar({ user, counts, notifications }: { user: { name: string | null; email: string; role: string }; counts: Record<string, number>; notifications: Notification[] }) {
  const pathname = usePathname();
  const { system, cc, apis, apisConnected, apisError, workers } = useStatus();
  const unread = notifications.filter((n) => !n.readAt).length;
  const initials = (user.name ?? user.email)
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-[rgba(5,8,7,0.82)] pt-[var(--safe-top)] backdrop-blur-xl">
      <div className="flex h-14 items-center gap-2 px-3 sm:px-6">
        <MobileNav counts={counts} />
        <Link href="/" className="flex min-w-0 items-center gap-2 lg:hidden">
          <LogoMark className="h-7 w-7 shrink-0" />
          <span className="mono truncate text-[12.5px] font-bold tracking-[0.18em]">AGENCYOS</span>
        </Link>
        <div className="mono hidden min-w-0 truncate text-[12px] font-semibold tracking-[0.2em] text-muted lg:block">
          <span className="text-foreground">AGENCYOS AI</span> <span className="text-accent/70">{"//"}</span> COMMAND CENTER
        </div>
        <div className="flex-1" />

        {/* System status chips */}
        <Link href="/health" className="mono flex h-9 items-center gap-2 rounded-lg border border-border bg-surface-2/80 px-2.5 text-[10.5px] font-semibold tracking-[0.12em] transition-colors hover:border-border-strong" aria-label={system.label}>
          <Dot tone={system.tone} pulse={system.tone === "green"} />
          <span className={cn("hidden sm:inline", system.tone === "green" ? "text-accent glow-text" : system.tone === "red" ? "text-danger" : "text-muted")}>{system.label}</span>
          <span className={cn("sm:hidden", system.tone === "green" ? "text-accent" : "text-muted")}>{system.tone === "green" ? "ONLINE" : system.tone === "red" ? "ERR" : "…"}</span>
        </Link>
        <Link href="/agents" className="mono hidden h-9 items-center gap-2 rounded-lg border border-border bg-surface-2/80 px-2.5 text-[10.5px] font-semibold tracking-[0.12em] text-muted transition-colors hover:border-border-strong md:flex">
          <Dot tone={cc?.activeAgents ? "green" : "grey"} pulse={Boolean(cc?.activeAgents)} />
          AGENTS <span className="text-foreground">{cc ? `${cc.activeAgents}/7` : "–"}</span> ACTIVE
          {workers && workers.online < workers.total && <span className="text-warning">· {workers.online}/7 ONLINE</span>}
        </Link>
        <Link href="/integrations" className="mono hidden h-9 items-center gap-2 rounded-lg border border-border bg-surface-2/80 px-2.5 text-[10.5px] font-semibold tracking-[0.12em] text-muted transition-colors hover:border-border-strong xl:flex">
          <Dot tone={apisError ? "red" : apisConnected ? "green" : "grey"} />
          APIS <span className="text-foreground">{apis.length ? `${apisConnected}/${apis.length}` : "–"}</span>
        </Link>

        {pathname !== "/" && (
          <Button asChild variant="primary" size="sm" className="hidden h-9 sm:inline-flex">
            <Link href="/?objective=1">
              <Wand2 /> New objective
            </Link>
          </Button>
        )}
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-border-strong hover:text-accent" aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}>
              <Bell className="h-[17px] w-[17px]" strokeWidth={1.75} />
              {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger shadow-[0_0_6px_#ff4545]" />}
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-[min(20rem,calc(100vw-1.5rem))] p-0">
            <div className="hud-label border-b border-border px-3 py-2.5">Notifications</div>
            <div className="max-h-80 overflow-y-auto p-1">
              {notifications.length === 0 && <p className="px-3 py-6 text-center text-xs text-muted">All clear.</p>}
              {notifications.map((n) => (
                <DropdownItem key={n.id} asChild className="items-start">
                  <Link href={n.href ?? "/"}>
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-accent"}`} />
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium">{n.title}</span>
                      {n.body && <span className="block truncate text-xs text-muted">{n.body}</span>}
                      <span className="mono block text-[10.5px] text-subtle">{timeAgo(n.createdAt)}</span>
                    </span>
                  </Link>
                </DropdownItem>
              ))}
            </div>
          </DropdownContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="mono flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-accent-soft text-[11px] font-bold text-accent" aria-label="Account menu">
              {initials}
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-56">
            <div className="px-2.5 py-2">
              <div className="truncate text-[13px] font-medium">{user.name ?? user.email}</div>
              <div className="truncate text-xs text-muted">{user.email}</div>
              <div className="mono mt-1 text-[10.5px] uppercase tracking-wider text-accent/80">{user.role}</div>
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
