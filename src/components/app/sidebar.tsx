"use client";

import {
  BarChart3,
  Bot,
  Building2,
  CircleDollarSign,
  Globe,
  KanbanSquare,
  LayoutDashboard,
  Mail,
  Menu,
  Monitor,
  Plug,
  Rocket,
  Search,
  Settings,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export const NAV = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/agents", label: "AI Agents", icon: Bot },
  { href: "/discovery", label: "Lead Discovery", icon: Search },
  { href: "/businesses", label: "Businesses", icon: Building2 },
  { href: "/websites", label: "Website Builder", icon: Sparkles },
  { href: "/previews", label: "Preview Websites", icon: Monitor },
  { href: "/pipeline", label: "Sales Pipeline", icon: KanbanSquare },
  { href: "/emails", label: "Email Campaigns", icon: Mail },
  { href: "/deployments", label: "Deployments", icon: Rocket },
  { href: "/automations", label: "Automations", icon: Workflow },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/costs", label: "Costs & Usage", icon: CircleDollarSign },
  { href: "/integrations", label: "Integrations", icon: Plug },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

function NavList({ counts, onNavigate }: { counts: Record<string, number>; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5" aria-label="Main">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        const count = counts[href];
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-[13px] font-medium transition-colors",
              active ? "bg-surface-3 text-foreground" : "text-muted hover:bg-surface-2 hover:text-foreground",
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "text-subtle group-hover:text-muted")} />
            <span className="truncate">{label}</span>
            {count ? (
              <span className="tabular ml-auto rounded-md bg-warning-soft px-1.5 text-[10px] font-semibold leading-4 text-warning">{count}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ orgName }: { orgName: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 px-1.5">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white shadow-sm">
        <Globe className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 leading-tight">
        <div className="text-[13px] font-semibold tracking-tight">AgencyOS AI</div>
        <div className="truncate text-[11px] text-muted">{orgName}</div>
      </div>
    </Link>
  );
}

export function Sidebar({ orgName, counts }: { orgName: string; counts: Record<string, number> }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface/60 px-3 py-4 backdrop-blur lg:flex">
      <Brand orgName={orgName} />
      <div className="mt-6 flex-1 overflow-y-auto">
        <NavList counts={counts} />
      </div>
    </aside>
  );
}

export function MobileNav({ orgName, counts }: { orgName: string; counts: Record<string, number> }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2 lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-4 w-4" />
      </button>
      {open &&
        createPortal(
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-border bg-surface px-3 py-4 shadow-[var(--shadow-lg)] animate-fade-in">
            <div className="flex items-center justify-between">
              <Brand orgName={orgName} />
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2" onClick={() => setOpen(false)} aria-label="Close navigation">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">
              <NavList counts={counts} onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
