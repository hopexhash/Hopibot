"use client";

import { Bell, LogOut, Monitor, Moon, Sun, Wand2 } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button, DropdownContent, DropdownItem, DropdownMenu, DropdownSeparator, DropdownTrigger } from "@/components/ui";
import { signOutAction } from "@/server/actions/auth";
import { timeAgo } from "@/lib/utils";
import { MobileNav } from "./sidebar";

type Notification = { id: string; title: string; body: string | null; href: string | null; createdAt: string; readAt: string | null };

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // false during SSR, true after hydration — avoids a theme-icon mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const Icon = !mounted ? Monitor : theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Theme">
          <Icon />
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem onSelect={() => setTheme("light")}>
          <Sun /> Light
        </DropdownItem>
        <DropdownItem onSelect={() => setTheme("dark")}>
          <Moon /> Dark
        </DropdownItem>
        <DropdownItem onSelect={() => setTheme("system")}>
          <Monitor /> System
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}

export function Topbar({
  orgName,
  user,
  counts,
  notifications,
}: {
  orgName: string;
  user: { name: string | null; email: string; role: string };
  counts: Record<string, number>;
  notifications: Notification[];
}) {
  const unread = notifications.filter((n) => !n.readAt).length;
  const initials = (user.name ?? user.email)
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <MobileNav orgName={orgName} counts={counts} />
      <div className="flex-1" />
      <Button asChild variant="primary" size="sm" className="h-8">
        <Link href="/?objective=1">
          <Wand2 /> <span className="hidden sm:inline">New objective</span>
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`} className="relative">
            <Bell />
            {unread > 0 && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger ring-2 ring-background" />}
          </Button>
        </DropdownTrigger>
        <DropdownContent className="w-80 p-0">
          <div className="border-b border-border px-3 py-2.5 text-xs font-semibold">Notifications</div>
          <div className="max-h-80 overflow-y-auto p-1">
            {notifications.length === 0 && <p className="px-3 py-6 text-center text-xs text-muted">You are all caught up.</p>}
            {notifications.map((n) => (
              <DropdownItem key={n.id} asChild className="items-start">
                <Link href={n.href ?? "/"}>
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.readAt ? "bg-transparent" : "bg-accent"}`} />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium">{n.title}</span>
                    {n.body && <span className="block truncate text-xs text-muted">{n.body}</span>}
                    <span className="block text-[11px] text-subtle">{timeAgo(n.createdAt)}</span>
                  </span>
                </Link>
              </DropdownItem>
            ))}
          </div>
        </DropdownContent>
      </DropdownMenu>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownTrigger asChild>
          <button className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[11px] font-semibold text-accent" aria-label="Account menu">
            {initials}
          </button>
        </DropdownTrigger>
        <DropdownContent className="w-56">
          <div className="px-2.5 py-2">
            <div className="truncate text-[13px] font-medium">{user.name ?? user.email}</div>
            <div className="truncate text-xs text-muted">{user.email}</div>
            <div className="mt-1 text-[11px] capitalize text-subtle">
              {user.role} · {orgName}
            </div>
          </div>
          <DropdownSeparator />
          <DropdownItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownItem>
          <DropdownItem onSelect={() => void signOutAction()}>
            <LogOut /> Sign out
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    </header>
  );
}
