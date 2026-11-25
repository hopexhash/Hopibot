"use client";

import { Bot, ChevronsLeft, ChevronsRight, Cpu, HeartPulse, KanbanSquare, Menu, Search, TerminalSquare, X, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Tooltip } from "@/components/ui";
import { cn } from "@/lib/utils";
import { openCommandPalette } from "./command-palette";
import { activeHref, NAV_GROUPS, SUB_NAV } from "./nav";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4dffa0" />
          <stop offset="1" stopColor="#008f39" />
        </linearGradient>
      </defs>
      <path d="M16 2 29 9.5v13L16 30 3 22.5v-13Z" fill="none" stroke="url(#lg)" strokeWidth="1.6" />
      <path d="M16 8 23 12v8l-7 4-7-4v-8Z" fill="rgba(0,255,120,0.12)" stroke="#00ff78" strokeWidth="1.2" />
      <path d="M12.7 11.5v9M19.3 11.5v9M12.7 16h6.6" fill="none" stroke="#e8f5ec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="2" r="1.3" fill="#00ff78" />
      <circle cx="29" cy="22.5" r="1.3" fill="#00ff78" />
      <circle cx="3" cy="22.5" r="1.3" fill="#00ff78" />
    </svg>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1" aria-label="HOPI Bot — Command Center">
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_0_8px_rgba(0,255,120,0.45)]" />
      {!collapsed && (
        <div className="min-w-0 leading-none">
          <div className="text-[15px] font-semibold tracking-[0.16em] text-foreground">HOPI BOT</div>
          <div className="mt-1 text-[10.5px] font-medium tracking-[0.24em] text-accent/80">AI OPERATIONS</div>
        </div>
      )}
    </Link>
  );
}

function NavList({ collapsed, counts, onNavigate }: { collapsed?: boolean; counts: Record<string, number>; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = activeHref(pathname);
  return (
    <nav className="flex flex-col gap-4" aria-label="Main">
      {NAV_GROUPS.map((g) => (
        <div key={g.title}>
          {collapsed ? <div className="mx-auto mb-2 h-px w-6 bg-border" /> : <div className="mb-1.5 px-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">{g.title}</div>}
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
                    "group relative flex h-10 items-center gap-3 rounded-xl px-3 text-[13.5px] font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-accent-soft text-accent shadow-[inset_0_0_0_1px_rgba(0,255,120,0.2),0_0_18px_-8px_rgba(0,255,120,0.6)]"
                      : "text-muted hover:bg-[rgba(0,255,120,0.05)] hover:text-foreground",
                  )}
                >
                  {isActive && <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-accent shadow-[0_0_10px_#00ff78]" />}
                  <Icon className={cn("h-[18px] w-[18px] shrink-0 transition-colors", isActive ? "text-accent" : "text-subtle group-hover:text-accent/80")} strokeWidth={1.75} />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {count ? (
                    <span className={cn("tabular rounded-md bg-warning-soft px-1.5 text-[11px] font-semibold leading-[18px] text-warning", collapsed ? "absolute right-1 top-0.5 px-1" : "ml-auto")}>{count}</span>
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
            "-mb-px flex h-11 shrink-0 items-center whitespace-nowrap border-b-2 px-3 text-[13px] font-medium transition-colors",
            current === t.href ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground",
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
        "sticky top-0 z-20 hidden h-dvh shrink-0 flex-col border-r border-border bg-[linear-gradient(180deg,rgba(0,255,120,0.03),transparent_30%),rgba(3,8,6,0.9)] py-4 backdrop-blur-xl transition-[width] duration-300 lg:flex",
        collapsed ? "w-[72px] px-2" : "w-[248px] px-3",
      )}
    >
      <Brand collapsed={collapsed} />
      <button
        onClick={openCommandPalette}
        className={cn(
          "mt-5 flex h-10 items-center gap-2.5 rounded-xl border border-border bg-surface-2/70 text-[13px] text-muted transition-colors hover:border-border-strong hover:text-foreground",
          collapsed ? "justify-center" : "px-3",
        )}
        aria-label="Search and quick actions"
      >
        <Search className="h-4 w-4 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">Search…</span>
            <kbd className="rounded border border-border px-1.5 text-[11px] text-subtle">⌘K</kbd>
          </>
        )}
      </button>
      <div className="mt-4 flex-1 overflow-y-auto overflow-x-hidden pb-4 pl-1">
        <NavList collapsed={collapsed} counts={counts} />
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-9 items-center justify-center gap-2 rounded-xl border border-border text-[12px] font-medium text-muted transition-colors hover:border-border-strong hover:text-accent"
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
      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted active:bg-accent-soft lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setOpen(false)} />
            <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col border-r border-border-strong bg-[#040a07] px-4 pb-[calc(var(--safe-bottom)+16px)] pt-[calc(var(--safe-top)+16px)] shadow-[0_0_60px_-10px_rgba(0,255,120,0.25)] animate-fade-in">
              <div className="flex items-center justify-between">
                <Brand />
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted" onClick={() => setOpen(false)} aria-label="Close navigation">
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

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Command", icon: Cpu },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/terminal", label: "Terminal", icon: TerminalSquare },
  { href: "/pipeline", label: "CRM", icon: KanbanSquare },
  { href: "/health", label: "Health", icon: HeartPulse },
];

/** Thumb-reachable tab bar on phones (respects the home-indicator safe area). */
export function MobileTabBar() {
  const pathname = usePathname();
  const active = activeHref(pathname);
  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[rgba(3,8,6,0.94)] pb-[var(--safe-bottom)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const on = active === href;
          return (
            <Link key={href} href={href} aria-current={on ? "page" : undefined} className={cn("relative flex h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors", on ? "text-accent" : "text-muted")}>
              {on && <span className="absolute top-0 h-[2px] w-8 rounded-b bg-accent shadow-[0_0_10px_#00ff78]" />}
              <Icon className={cn("h-[21px] w-[21px]", on && "drop-shadow-[0_0_6px_rgba(0,255,120,0.7)]")} strokeWidth={1.75} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
