"use client";

import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  ChevronsLeft,
  ChevronsRight,
  CircleDollarSign,
  Cpu,
  Euro,
  HeartPulse,
  KanbanSquare,
  LayoutDashboard,
  ListTodo,
  Mail,
  Menu,
  Monitor,
  Network,
  Plug,
  Radar,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon };
export const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  { title: "Overview", items: [{ href: "/", label: "Command Center", icon: LayoutDashboard }] },
  {
    title: "AI Operations",
    items: [
      { href: "/agents", label: "Agent Monitor", icon: Bot },
      { href: "/activity", label: "Live Activity", icon: TerminalSquare },
      { href: "/network", label: "Workflow Network", icon: Network },
      { href: "/tasks", label: "Task Queue", icon: ListTodo },
    ],
  },
  {
    title: "Business Operations",
    items: [
      { href: "/discovery", label: "Lead Discovery", icon: Radar },
      { href: "/businesses", label: "Businesses", icon: Building2 },
      { href: "/websites", label: "Website Generator", icon: Sparkles },
      { href: "/previews", label: "Preview Deployments", icon: Monitor },
      { href: "/pipeline", label: "CRM & Sales", icon: KanbanSquare },
      { href: "/emails", label: "Email Campaigns", icon: Mail },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/revenue", label: "Revenue", icon: Euro },
      { href: "/costs", label: "AI Expenditure", icon: CircleDollarSign },
      { href: "/health", label: "System Health", icon: HeartPulse },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/integrations", label: "Integrations", icon: Plug },
      { href: "/agents/config", label: "Agent Configuration", icon: SlidersHorizontal },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];
const ALL_HREFS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.href));

/** Longest matching nav href wins (so /agents/config doesn't also light up /agents). */
function activeHref(pathname: string) {
  if (pathname === "/") return "/";
  return ALL_HREFS.filter((h) => h !== "/" && (pathname === h || pathname.startsWith(`${h}/`))).sort((a, b) => b.length - a.length)[0] ?? null;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#39ff88" />
          <stop offset="1" stopColor="#008f39" />
        </linearGradient>
      </defs>
      <path d="M16 2 29 9.5v13L16 30 3 22.5v-13Z" fill="none" stroke="url(#lg)" strokeWidth="1.6" />
      <path d="M16 8 23 12v8l-7 4-7-4v-8Z" fill="rgba(0,255,102,0.12)" stroke="#00ff66" strokeWidth="1.2" />
      <path d="M12.5 19.5 16 11l3.5 8.5M13.8 16.6h4.4" fill="none" stroke="#e8f5ec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="2" r="1.3" fill="#00ff66" />
      <circle cx="29" cy="22.5" r="1.3" fill="#00ff66" />
      <circle cx="3" cy="22.5" r="1.3" fill="#00ff66" />
    </svg>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1" aria-label="AgencyOS AI — Command Center">
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_0_8px_rgba(0,255,102,0.45)]" />
      {!collapsed && (
        <div className="min-w-0 leading-none">
          <div className="mono text-[14px] font-bold tracking-[0.22em] text-foreground">AGENCYOS</div>
          <div className="mono mt-1 text-[9.5px] tracking-[0.3em] text-accent/80">AI OPERATIONS</div>
        </div>
      )}
    </Link>
  );
}

function NavList({ collapsed, counts, onNavigate }: { collapsed?: boolean; counts: Record<string, number>; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = activeHref(pathname);
  return (
    <nav className="flex flex-col gap-5" aria-label="Main">
      {NAV_GROUPS.map((g) => (
        <div key={g.title}>
          {collapsed ? <div className="mx-auto mb-2 h-px w-6 bg-border" /> : <div className="hud-label mb-2 px-2.5 text-[9.5px] text-subtle">{g.title}</div>}
          <div className="flex flex-col gap-0.5">
            {g.items.map(({ href, label, icon: Icon }) => {
              const isActive = active === href;
              const count = counts[href];
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  title={collapsed ? label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition-all duration-200",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-accent-soft text-accent shadow-[inset_0_0_0_1px_rgba(0,255,102,0.22),0_0_18px_-8px_rgba(0,255,102,0.7)]"
                      : "text-muted hover:bg-[rgba(0,255,102,0.05)] hover:text-foreground",
                  )}
                >
                  {isActive && <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r bg-accent shadow-[0_0_10px_#00ff66]" />}
                  <Icon className={cn("h-[17px] w-[17px] shrink-0 transition-colors", isActive ? "text-accent" : "text-subtle group-hover:text-accent/80")} strokeWidth={1.75} />
                  {!collapsed && <span className="truncate">{label}</span>}
                  {count ? (
                    <span className={cn("mono rounded-md bg-warning-soft px-1.5 text-[10px] font-bold leading-4 text-warning", collapsed ? "absolute right-1 top-0.5 px-1" : "ml-auto")}>{count}</span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
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
        "sticky top-0 z-20 hidden h-dvh shrink-0 flex-col border-r border-border bg-[linear-gradient(180deg,rgba(0,255,102,0.03),transparent_30%),rgba(5,8,7,0.88)] py-4 backdrop-blur-xl transition-[width] duration-300 lg:flex",
        collapsed ? "w-[72px] px-2" : "w-[252px] px-3",
      )}
    >
      <Brand collapsed={collapsed} />
      <div className="mt-6 flex-1 overflow-y-auto overflow-x-hidden pb-4 pl-1">
        <NavList collapsed={collapsed} counts={counts} />
      </div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mono flex h-8 items-center justify-center gap-2 rounded-lg border border-border text-[11px] tracking-wider text-muted transition-colors hover:border-border-strong hover:text-accent"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="h-4 w-4" /> COLLAPSE</>}
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
            <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col border-r border-border-strong bg-[#060b08] px-4 pb-[calc(var(--safe-bottom)+16px)] pt-[calc(var(--safe-top)+16px)] shadow-[0_0_60px_-10px_rgba(0,255,102,0.25)] animate-fade-in">
              <div className="flex items-center justify-between">
                <Brand />
                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted" onClick={() => setOpen(false)} aria-label="Close navigation">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 flex-1 overflow-y-auto pl-1 [&_a]:h-11 [&_a]:text-[14px]">
                <NavList counts={counts} onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

const TABS: NavItem[] = [
  { href: "/", label: "Command", icon: Cpu },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/activity", label: "Terminal", icon: Activity },
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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[rgba(5,8,7,0.92)] pb-[var(--safe-bottom)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const on = active === href;
          return (
            <Link key={href} href={href} className={cn("relative flex h-[58px] flex-col items-center justify-center gap-1 text-[10px] font-medium", on ? "text-accent" : "text-subtle")}>
              {on && <span className="absolute top-0 h-[2px] w-8 rounded-b bg-accent shadow-[0_0_10px_#00ff66]" />}
              <Icon className={cn("h-[21px] w-[21px]", on && "drop-shadow-[0_0_6px_rgba(0,255,102,0.7)]")} strokeWidth={1.75} />
              <span className="mono tracking-wide">{label.toUpperCase()}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
