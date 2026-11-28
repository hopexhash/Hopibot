"use client";

import { Bot, ChevronsLeft, ChevronsRight, Cpu, HeartPulse, KanbanSquare, Menu, MessageSquare, Search, X, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "@/components/ui";
import { cn } from "@/lib/utils";
import { openCommandPalette } from "./command-palette";
import { activeHref, NAV_GROUPS, SUB_NAV } from "./nav";

/**
 * The HOPI mark for small places (collapsed rail, app icon): the H of the wordmark with its
 * orange dot on charcoal, the same drawing as the favicon. `animated` is accepted for older
 * call sites; the dot settles in once, it does not loop.
 */
export function LogoMark({ className, animated }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={cn(className, animated && "logo-settle")} aria-hidden>
      <rect width="64" height="64" rx="14" fill="#0c0c0d" />
      <path fill="#f2eee6" d="M13 16h9v12.5h12V16h9v32h-9V35.5H22V48h-9z" />
      <circle className="logo-dot" cx="52" cy="43" r="5" fill="#ff4d23" />
    </svg>
  );
}

/** The HOPI wordmark as on wearehopi.nl: "HOPI" in Space Grotesk with the orange dot. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[3px] font-display text-[22px] font-bold leading-none tracking-[-0.04em] text-foreground", className)}>
      HOPI
      <i className="mt-[7px] inline-block h-[6px] w-[6px] rounded-full bg-brand" aria-hidden />
    </span>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link href="/console" className="flex h-10 items-center gap-2.5 px-1.5" aria-label="HOPI, chat with the agents">
      {collapsed ? (
        <LogoMark className="mx-auto h-9 w-9 shrink-0" />
      ) : (
        <>
          <Wordmark />
          <span className="label-mono mt-0.5 !text-[10px] !tracking-[0.16em]">Command</span>
        </>
      )}
    </Link>
  );
}

function NavList({ collapsed, counts, onNavigate }: { collapsed?: boolean; counts: Record<string, number>; onNavigate?: () => void }) {
  const pathname = usePathname();
  const markerId = useId();
  const active = activeHref(pathname);
  return (
    <nav className="flex flex-col gap-4" aria-label="Main">
      {NAV_GROUPS.map((g) => (
        <div key={g.title}>
          {collapsed ? <div className="mx-auto mb-2 h-px w-6 bg-border" /> : <div className="label-mono mb-2 px-3 !text-[10px] !text-subtle">{g.title}</div>}
          <div className="flex flex-col gap-0.5">
            {g.items.map(({ href, label, icon: Icon, hint }) => {
              const isActive = active === href;
              const count = counts[href];
              const link = (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={collapsed ? label : undefined}
                  className={cn(
                    "group relative flex h-10 items-center gap-3 rounded-md px-3 text-[13.5px] font-medium transition-colors duration-200",
                    collapsed && "justify-center px-0",
                    isActive ? "bg-surface text-foreground shadow-[0_1px_2px_rgba(12,12,13,0.06)]" : "text-muted hover:bg-surface/70 hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      // One marker per list (desktop rail, phone drawer): it slides to the page you open.
                      layoutId={`nav-marker-${markerId}`}
                      transition={{ type: "tween", duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute -left-3 top-1/2 -mt-2.5 h-5 w-[3px] rounded-r bg-brand"
                    />
                  )}
                  <Icon className={cn("h-[18px] w-[18px] shrink-0 transition-[color,transform] duration-200 group-hover:scale-105", isActive ? "text-foreground" : "text-subtle group-hover:text-foreground")} strokeWidth={1.6} />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {count ? (
                    <span className={cn("tabular rounded-[4px] bg-brand px-1.5 text-[11px] font-semibold leading-[18px] text-[#0c0c0d]", collapsed ? "absolute right-1 top-0.5 px-1" : "ml-auto")}>{count}</span>
                  ) : null}
                </Link>
              );
              return collapsed ? (
                <Tooltip key={href} side="right" content={<><span className="font-medium">{label}</span><span className="block text-muted">{hint}</span></>}>
                  {link}
                </Tooltip>
              ) : (
                link
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

/** Secondary tabs for sections that span several pages (e.g. Agents → Workflow map / Task queue). */
export function SubNav({ section }: { section: keyof typeof SUB_NAV }) {
  const pathname = usePathname();
  const tabs = SUB_NAV[section];
  const current = [...tabs].sort((a, b) => b.href.length - a.href.length).find((t) => pathname === t.href || pathname.startsWith(`${t.href}/`))?.href;
  return (
    <div className="-mx-3.5 mb-5 flex gap-1 overflow-x-auto border-b border-border px-3.5 sm:mx-0 sm:px-0" role="tablist" aria-label="Section pages">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          role="tab"
          aria-selected={current === t.href}
          className={cn(
            "tab-m -mb-px flex h-11 shrink-0 items-center whitespace-nowrap px-3 text-[13px] font-medium transition-colors duration-200",
            current === t.href ? "text-foreground" : "text-muted hover:text-foreground",
          )}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}

const COLLAPSE_KEY = "agencyos:sidebar-collapsed";
const COLLAPSE_EVENT = "agencyos:sidebar";
function useCollapsed() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(COLLAPSE_EVENT, cb);
      return () => window.removeEventListener(COLLAPSE_EVENT, cb);
    },
    () => {
      try {
        return localStorage.getItem(COLLAPSE_KEY) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}
function setCollapsed(v: boolean) {
  try {
    localStorage.setItem(COLLAPSE_KEY, v ? "1" : "0");
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(COLLAPSE_EVENT));
}

export function Sidebar({ counts }: { counts: Record<string, number> }) {
  const collapsed = useCollapsed();
  return (
    <aside
      className={cn(
        "sticky top-0 z-20 hidden h-dvh shrink-0 flex-col border-r border-border bg-[#ece7dc]/60 py-5 transition-[width] duration-300 lg:flex",
        collapsed ? "w-[72px] px-2" : "w-[248px] px-3",
      )}
    >
      <Brand collapsed={collapsed} />
      <button
        onClick={openCommandPalette}
        className={cn(
          "mt-6 flex h-10 items-center gap-2.5 rounded-md border border-border bg-surface text-[13px] text-muted transition-colors hover:border-border-strong hover:text-foreground",
          collapsed ? "justify-center" : "px-3",
        )}
        aria-label="Search and quick actions"
      >
        <Search className="h-4 w-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">Search…</span>
            <kbd className="rounded-[3px] border border-border px-1.5 font-mono text-[10.5px] text-subtle">⌘K</kbd>
          </>
        )}
      </button>
      <div className="mt-4 flex-1 overflow-y-auto overflow-x-hidden pb-4 pl-1">
        <NavList collapsed={collapsed} counts={counts} />
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-9 items-center justify-center gap-2 rounded-md text-[12px] font-medium text-muted transition-colors hover:bg-surface/70 hover:text-foreground"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="h-4 w-4" /> Collapse</>}
      </button>
    </aside>
  );
}

export function MobileNav({ counts }: { counts: Record<string, number> }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground active:bg-surface-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 animate-overlay-in bg-[#0c0c0d]/40 backdrop-blur-[3px]" onClick={() => setOpen(false)} />
            <div className="drawer-in absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col border-r border-border bg-background px-4 pb-[calc(var(--safe-bottom)+16px)] pt-[calc(var(--safe-top)+16px)] animate-fade-in">
              <div className="flex items-center justify-between">
                <Brand />
                <button className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground" onClick={() => setOpen(false)} aria-label="Close navigation">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex-1 overflow-y-auto pl-1 [&_a]:h-12 [&_a]:text-[15px]">
                <NavList counts={counts} onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

const TABS: { href: string; label: string; icon: LucideIcon; hub?: boolean }[] = [
  { href: "/command", label: "Command", icon: Cpu },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/console", label: "Chat", icon: MessageSquare, hub: true },
  { href: "/pipeline", label: "CRM", icon: KanbanSquare },
  { href: "/health", label: "Health", icon: HeartPulse },
];

/**
 * Thumb-reachable tab bar on phones (respects the home-indicator safe area). Paper glass with a
 * hairline; the active tab carries the orange marker. The Command Center sits in the middle as
 * a small charcoal tile, a quiet emphasis rather than a raised circle.
 */
export function MobileTabBar() {
  const pathname = usePathname();
  const active = activeHref(pathname);
  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#f6f3ed]/95 pb-[var(--safe-bottom)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {TABS.map(({ href, label, icon: Icon, hub }) => {
          const on = active === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={on ? "page" : undefined}
              className={cn("group relative flex h-[62px] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors duration-200", on ? "text-foreground" : "text-muted")}
            >
              {on && <motion.span layoutId="tab-marker" transition={{ type: "tween", duration: 0.26, ease: [0.16, 1, 0.3, 1] }} className="absolute top-0 h-[2px] w-7 rounded-b bg-brand" />}
              {hub ? (
                <span className="relative grid h-8 w-8 place-items-center rounded-md bg-foreground text-background transition-transform duration-200 group-active:scale-95">
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} />
                  <span className={cn("absolute -right-[3px] -top-[3px] h-2 w-2 rounded-full bg-brand ring-2 ring-[#f6f3ed] transition-transform duration-200", on ? "scale-100" : "scale-0")} aria-hidden />
                </span>
              ) : (
                <Icon className="h-[21px] w-[21px] transition-transform duration-200 group-active:scale-90" strokeWidth={1.6} />
              )}
              <span className={cn(hub && "font-semibold")}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
