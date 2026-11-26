"use client";

import { ArrowRight, Building2, CornerDownLeft, Globe, Mail, PlayCircle, Search, Wand2, Bot, CircleDollarSign, TriangleAlert, type LucideIcon } from "lucide-react";
import { Dialog as RDialog } from "radix-ui";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AGENT_KEYS, AGENT_META } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav";

const OPEN_EVENT = "hopibot:command-palette";
/** Opens the palette from anywhere (sidebar search box, mobile search button). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

type Entry = { key: string; group: string; title: string; subtitle?: string; href: string; icon: LucideIcon; keywords?: string };
type Hit = { type: "lead" | "website" | "run" | "email"; id: string; title: string; subtitle: string; href: string };

const HIT_ICON: Record<Hit["type"], LucideIcon> = { lead: Building2, website: Globe, run: PlayCircle, email: Mail };
const HIT_GROUP: Record<Hit["type"], string> = { lead: "Leads & customers", website: "Websites", run: "Executions", email: "Emails" };

const ACTIONS: Entry[] = [
  { key: "a-objective", group: "Quick actions", title: "Create new objective", subtitle: "Tell your agents what to do", href: "/command?objective=1", icon: Wand2, keywords: "start run launch new" },
  { key: "a-discover", group: "Quick actions", title: "Find new leads", subtitle: "Start a lead discovery", href: "/discovery", icon: Search, keywords: "search businesses discovery" },
  { key: "a-failed", group: "Quick actions", title: "Show failed tasks", subtitle: "Anything that needs a retry", href: "/tasks?status=FAILED", icon: TriangleAlert, keywords: "errors failed agents" },
  { key: "a-spend", group: "Quick actions", title: "View API spending", subtitle: "What the AI has cost so far", href: "/costs", icon: CircleDollarSign, keywords: "cost budget money usage" },
];

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const onQuery = (value: string) => {
    setQ(value);
    setIndex(0);
    const searching = value.trim().length >= 2;
    setLoading(searching);
    if (!searching) setHits([]);
  };

  // Server search (debounced). Stale responses are ignored.
  useEffect(() => {
    const term = q.trim();
    if (!open || term.length < 2) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      let found: Hit[] = [];
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`, { cache: "no-store" });
        const json = await res.json();
        if (res.ok) found = json.hits as Hit[];
      } catch {
        /* network error: show no remote results */
      }
      if (cancelled) return;
      setHits(found);
      setIndex(0);
      setLoading(false);
    }, 180);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [q, open]);

  const entries = useMemo<Entry[]>(() => {
    const term = q.trim().toLowerCase();
    const matches = (e: Entry) => !term || `${e.title} ${e.subtitle ?? ""} ${e.keywords ?? ""}`.toLowerCase().includes(term);
    const pages: Entry[] = NAV_ITEMS.map((n) => ({ key: `p-${n.href}`, group: "Go to", title: n.label, subtitle: n.hint, href: n.href, icon: n.icon }));
    const agents: Entry[] = AGENT_KEYS.map((k) => ({ key: `g-${k}`, group: "Agents", title: `${AGENT_META[k].name} agent`, subtitle: AGENT_META[k].short, href: `/agents/${k}`, icon: Bot, keywords: "agent" }));
    const found: Entry[] = hits.map((h) => ({ key: `h-${h.type}-${h.id}`, group: HIT_GROUP[h.type], title: h.title, subtitle: h.subtitle, href: h.href, icon: HIT_ICON[h.type] }));
    return [...found, ...ACTIONS.filter(matches), ...pages.filter(matches), ...(term ? agents.filter(matches) : [])];
  }, [q, hits]);

  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const go = (e: Entry | undefined) => {
    if (!e) return;
    setOpen(false);
    onQuery("");
    router.push(e.href);
  };

  let lastGroup = "";
  return (
    <RDialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) onQuery("");
      }}
    >
      <RDialog.Portal>
        <RDialog.Overlay className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm data-[state=open]:animate-fade-in" />
        <RDialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[calc(var(--safe-top)+12px)] z-[70] flex max-h-[min(78dvh,620px)] w-[calc(100vw-1.5rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-border-strong bg-[#06100b] shadow-[0_0_70px_-12px_rgba(0,255,120,0.35)] data-[state=open]:animate-fade-in sm:top-[14vh]"
        >
          <RDialog.Title className="sr-only">Search and quick actions</RDialog.Title>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className={cn("h-[18px] w-[18px] shrink-0", loading ? "animate-pulse text-accent" : "text-muted")} />
            <input
              autoFocus
              value={q}
              onChange={(e) => onQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setIndex((i) => Math.min(entries.length - 1, i + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setIndex((i) => Math.max(0, i - 1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  go(entries[index]);
                }
              }}
              placeholder="Search leads, websites, agents… or type an action"
              className="h-14 min-w-0 flex-1 bg-transparent text-[16px] text-foreground outline-none placeholder:text-subtle focus-visible:outline-none"
              aria-label="Search"
              role="combobox"
              aria-expanded
              aria-controls="palette-results"
            />
            <RDialog.Close className="rounded-md border border-border px-2 py-1 text-[11px] text-muted hover:text-foreground">Esc</RDialog.Close>
          </div>
          <div ref={list} id="palette-results" role="listbox" className="flex-1 overflow-y-auto p-2">
            {entries.length === 0 && (
              <p className="px-3 py-10 text-center text-[13px] text-muted">{loading ? "Searching…" : `Nothing found for “${q.trim()}”.`}</p>
            )}
            {entries.map((e, i) => {
              const header = e.group !== lastGroup ? e.group : null;
              lastGroup = e.group;
              const Icon = e.icon;
              return (
                <div key={e.key}>
                  {header && <div className="px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-subtle">{header}</div>}
                  <button
                    data-i={i}
                    role="option"
                    aria-selected={i === index}
                    onMouseMove={() => setIndex(i)}
                    onClick={() => go(e)}
                    className={cn("flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors", i === index ? "bg-accent-soft" : "hover:bg-[rgba(0,255,120,0.04)]")}
                  >
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border", i === index ? "text-accent" : "text-muted")}>
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate text-[14px] font-medium", i === index && "text-accent")}>{e.title}</span>
                      {e.subtitle && <span className="block truncate text-[12px] text-muted">{e.subtitle}</span>}
                    </span>
                    {i === index ? <CornerDownLeft className="h-4 w-4 shrink-0 text-accent/70" /> : <ArrowRight className="h-4 w-4 shrink-0 text-subtle/50" />}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="hidden items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-subtle sm:flex">
            <span>↑↓ to move</span>
            <span>↵ to open</span>
            <span className="ml-auto">⌘K / Ctrl K to toggle</span>
          </div>
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}
