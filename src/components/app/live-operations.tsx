"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Maximize2, Minimize2, Search, WifiOff } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ACTIVITY_CATEGORIES, categoryTag } from "@/lib/activity";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { EASE } from "@/lib/motion";
import { cn, formatDuration, timeAgo } from "@/lib/utils";
import type {
  AgentLiveState,
  CommandCenterState,
} from "@/server/queries/command-center";
import type { AutonomyStatus } from "@/server/orchestrator/autopilot";
import type { ActivityEntry } from "@/server/queries/metrics";
import { LogoMark } from "./sidebar";
import { useCommandCenter, useNow } from "./live";

export type LiveEvent = ActivityEntry;

const POLL_MS = 2500;
const STALE_MS = 5 * 60_000;

/* Colour language: green = success, blue = information, yellow = in progress or waiting,
   red = failed, grey = idle or no longer current. */
const TONE = {
  completed: {
    label: "COMPLETED",
    text: "text-success",
    dot: "bg-success",
    pill: "border-[color-mix(in_srgb,var(--success)_35%,transparent)] text-success",
  },
  info: {
    label: "INFO",
    text: "text-info",
    dot: "bg-info",
    pill: "border-[rgba(47,111,176,0.35)] text-info",
  },
  running: {
    label: "RUNNING",
    text: "text-accent",
    dot: "bg-brand",
    pill: "border-[rgba(255,77,35,0.4)] text-accent",
  },
  waiting: {
    label: "WAITING",
    text: "text-warning",
    dot: "bg-warning",
    pill: "border-[color-mix(in_srgb,var(--warning)_40%,transparent)] text-warning",
  },
  warning: {
    label: "WARNING",
    text: "text-warning",
    dot: "bg-warning",
    pill: "border-[rgba(196,128,0,0.4)] text-warning",
  },
  failed: {
    label: "FAILED",
    text: "text-danger",
    dot: "bg-danger",
    pill: "border-[rgba(180,42,37,0.4)] text-danger",
  },
  done: {
    label: "DONE",
    text: "text-subtle",
    dot: "bg-subtle",
    pill: "border-border text-subtle",
  },
  stale: {
    label: "NO UPDATE",
    text: "text-subtle",
    dot: "bg-subtle",
    pill: "border-border text-subtle",
  },
} as const;
type Tone = keyof typeof TONE;

const clock = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(iso));
const host = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/[/?#].*$/, "");

/**
 * A "running" event is only still running while it is the newest event of its task. Older
 * steps are done; a newest step without any update for five minutes is shown as such
 * instead of pretending the agent is still busy.
 */
function toneOf(
  e: LiveEvent,
  newestPerTask: Map<string, number>,
  nowMs: number,
): Tone {
  if (e.status !== "running")
    return (e.status in TONE ? e.status : "info") as Tone;
  if (e.taskId && newestPerTask.get(e.taskId) !== e.id) return "done";
  if (nowMs - new Date(e.createdAt).getTime() > STALE_MS) return "stale";
  return "running";
}

/* ─────────── Compact live agent overview ─────────── */

const AGENT_STATE: Record<
  AgentLiveState["status"],
  { label: string; tone: Tone }
> = {
  running: { label: "Active", tone: "running" },
  queued: { label: "Queued", tone: "info" },
  waiting: { label: "Waiting for you", tone: "waiting" },
  failed: { label: "Last task failed", tone: "failed" },
  idle: { label: "Idle", tone: "done" },
  disabled: { label: "Switched off", tone: "done" },
  offline: { label: "Offline", tone: "failed" },
};

/** "Idle" with dots that count 3 → 2 → 1 → 2 → 3 (static when reduced motion is preferred). */
export function Idle({ className }: { className?: string }) {
  return (
    <span className={className}>
      Idle
      <span className="idle-dots" aria-hidden="true">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </span>
  );
}

/** What each agent is waiting for when it has nothing to do (its place in the pipeline). */
const IDLE_REASON: Record<string, string> = {
  lead_finder: "Idle. Waiting for the next discovery batch",
  contact_research: "Idle. Waiting for a qualified lead",
  research: "Idle. Waiting for a qualified lead with contact details",
  website_builder: "Idle. Waiting for a researched lead",
  quality_control: "Idle. Waiting for a website to test",
  deployment: "Idle. Waiting for a website to pass quality control",
  sales: "Idle. Waiting for a deployed demo website",
};

function agentLine(a: AgentLiveState) {
  if (a.status === "running")
    return (
      a.operation ?? `Working on ${a.taskType?.replace(/_/g, " ") ?? "a task"}`
    );
  if (a.status === "queued")
    return `${a.pending} task${a.pending === 1 ? "" : "s"} waiting to start`;
  if (a.status === "waiting") return "Waiting for your approval";
  if (a.status === "offline") return "No worker is running this agent";
  if (a.status === "disabled") return "Switched off in agent settings";
  if (a.status === "failed") return a.operation ?? "The last task failed";
  return IDLE_REASON[a.key] ?? "Idle. Waiting for work";
}

/**
 * Text that changes because the agent's real state changed (Idle → Running, a new task):
 * the old value slips out, the new one settles in. First render is not animated.
 */
function Swap({ id, children, className = "inline-block" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={id} className={className} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.16, ease: EASE.out }}>
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

function AgentCard({ a, nowSec }: { a: AgentLiveState; nowSec: number }) {
  const st = AGENT_STATE[a.status];
  const tone = TONE[st.tone];
  const runtime =
    a.status === "running" && a.runtimeStartedAt && nowSec
      ? formatDuration(
          Math.max(0, nowSec * 1000 - new Date(a.runtimeStartedAt).getTime()),
        )
      : null;
  return (
    <>
      {/* Phone: one compact, tappable row per agent. */}
      <Link
        href={`/agents/${a.key}`}
        className="flex min-h-[56px] min-w-0 items-center gap-3 border-b border-border px-4 py-2.5 transition-colors last:border-0 active:bg-surface-2 sm:hidden"
      >
        <span
          className={cn(
            "status-dot h-2 w-2 flex-none rounded-full",
            tone.dot,
            tone.text,
            a.status === "running" && "status-live",
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="truncate font-display text-[14px] font-semibold tracking-[-0.01em]">
              {AGENT_META[a.key].short}
            </span>
            <span
              className={cn(
                "flex-none font-mono text-[10px] font-medium uppercase tracking-[0.1em]",
                tone.text,
              )}
            >
              <Swap id={a.status}>{st.label}</Swap>
            </span>
            {runtime && (
              <span className="tabular flex-none text-[11px] text-muted">
                {runtime}
              </span>
            )}
          </span>
          <span className="mt-0.5 block truncate text-[12.5px] text-muted">
            {a.status === "running" && a.subject ? `${a.subject.name}: ` : ""}
            {agentLine(a)}
          </span>
        </span>
        <span className="flex-none text-right text-[11px] leading-tight">
          <span className="tabular block text-success">
            ✓ {a.completed30d}
          </span>
          <span
            className={cn(
              "tabular block",
              a.failed30d ? "text-danger/90" : "text-subtle",
            )}
          >
            ✕ {a.failed30d}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 flex-none text-subtle" />
      </Link>
      <Link
        href={`/agents/${a.key}`}
        className="group hidden min-w-0 flex-col rounded-lg border border-border bg-surface p-3.5 transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)] sm:flex"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-display text-[14.5px] font-semibold tracking-[-0.01em]">
            {AGENT_META[a.key].short}
          </p>
          <ChevronRight className="h-3.5 w-3.5 flex-none text-subtle transition-transform group-hover:translate-x-0.5" />
        </div>
        <p
          className={cn(
            "mt-2 flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em]",
            tone.text,
          )}
        >
          <span
            className={cn(
              "status-dot h-1.5 w-1.5 flex-none rounded-full",
              tone.dot,
              tone.text,
              a.status === "running" && "status-live",
            )}
          />
          <Swap id={a.status}>{st.label}</Swap>
          {runtime && (
            <span className="tabular normal-case tracking-normal text-muted">· {runtime}</span>
          )}
        </p>
        <p className="mt-1.5 min-h-[2.5em] text-[12.5px] leading-snug text-muted">
          <Swap id={agentLine(a)} className="line-clamp-2">
            {agentLine(a)}
          </Swap>
        </p>
        {a.status === "running" && a.subject && (
          <p className="mt-1 truncate text-[12px] text-foreground">
            {a.subject.name}
          </p>
        )}
        <p className="mt-2 flex items-center gap-2.5 border-t border-border pt-2 text-[11px] text-subtle">
          <span className="tabular text-success">✓ {a.completed30d}</span>
          <span className={cn("tabular", a.failed30d ? "text-danger/90" : "")}>
            ✕ {a.failed30d}
          </span>
          <span
            className="min-w-0 flex-1 truncate text-right"
            suppressHydrationWarning
          >
            {a.operationAt ? timeAgo(a.operationAt) : "no activity yet"}
          </span>
        </p>
      </Link>
    </>
  );
}

/* ─────────── Live Operations ─────────── */

/**
 * The real-time operations terminal. Every line is an event recorded by the code that did
 * the work. The feed keeps a cursor (the newest event id): each update asks only for newer
 * events, so duplicates are impossible and nothing is lost after a dropped connection.
 */
export function LiveOperations({
  initial,
  initialState,
  agent: fixedAgent,
  showAgents = true,
  agentCards = true,
  tall = false,
  className,
}: {
  initial: LiveEvent[];
  initialState?: CommandCenterState;
  agent?: string;
  /** Show how many agents are working in the header and the idle line in the feed. */
  showAgents?: boolean;
  /** Show the agent overview inside this panel (false when it is rendered separately). */
  agentCards?: boolean;
  /** On wide screens, let the feed fill the height of the window (used beside the autonomy card). */
  tall?: boolean;
  className?: string;
}) {
  const [items, setItems] = useState<LiveEvent[]>(initial);
  const [category, setCategory] = useState("");
  const [agent, setAgent] = useState(fixedAgent ?? "");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [offline, setOffline] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initial.length >= 40);
  const [loadingMore, setLoadingMore] = useState(false);
  const lastId = useRef(initial[0]?.id ?? 0);
  const first = useRef(true);
  const cc = useCommandCenter(initialState);
  const now = useNow(true);

  // Full screen (desktop and TV): the browser's own full-screen mode when it has one,
  // otherwise the feed simply covers the whole window.
  const panel = useRef<HTMLElement>(null);
  const [full, setFull] = useState(false);
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFull(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  const toggleFull = async () => {
    if (full) {
      setFull(false);
      if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
      return;
    }
    setFull(true);
    try {
      await panel.current?.requestFullscreen?.();
    } catch {
      // No full-screen support (some TV browsers): the fixed overlay below is used instead.
    }
  };
  const agents = cc.data?.agents ?? [];

  const base = useMemo(() => {
    const p = new URLSearchParams();
    if (category) p.set("category", category);
    if (agent) p.set("agent", agent);
    if (search) p.set("q", search);
    return p.toString();
  }, [category, agent, search]);

  // Debounced search.
  useEffect(() => {
    const t = setTimeout(() => setSearch(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query]);

  const merge = useCallback(
    (fresh: LiveEvent[], mode: "prepend" | "append" | "replace") => {
      setItems((cur) => {
        if (mode === "replace") return fresh;
        const seen = new Set(cur.map((c) => c.id));
        const add = fresh.filter((f) => !seen.has(f.id));
        if (!add.length) return cur;
        return mode === "prepend"
          ? [...add, ...cur].slice(0, 400)
          : [...cur, ...add];
      });
    },
    [],
  );

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let failures = 0;
    const get = async (extra: string) => {
      const res = await fetch(
        `/api/activity?${base}${base ? "&" : ""}${extra}`,
        { cache: "no-store" },
      );
      if (!res.ok)
        throw new Error(
          (await res.json().catch(() => ({}))).error ?? `HTTP ${res.status}`,
        );
      return ((await res.json()) as { items: LiveEvent[] }).items;
    };
    const tick = async (reset = false) => {
      if (stopped) return;
      if (!reset && document.hidden) return schedule();
      try {
        if (reset) {
          const fresh = await get("limit=50");
          if (stopped) return;
          merge(fresh, "replace");
          lastId.current = fresh[0]?.id ?? 0;
          setHasMore(fresh.length >= 50);
        } else {
          // Catch up completely: after a long interruption there can be more than one page.
          for (let page = 0; page < 5; page++) {
            const fresh = await get(`after=${lastId.current}&limit=100`);
            if (stopped) return;
            if (!fresh.length) break;
            lastId.current = Math.max(
              lastId.current,
              ...fresh.map((f) => f.id),
            );
            merge(fresh, "prepend");
            if (fresh.length < 100) break;
          }
        }
        failures = 0;
        setOffline(null);
      } catch (e) {
        failures++;
        if (!stopped) setOffline((e as Error).message || "Connection lost");
      }
      schedule();
    };
    const schedule = () => {
      if (stopped) return;
      if (timer) clearTimeout(timer);
      timer = setTimeout(
        () => void tick(),
        failures ? Math.min(30_000, POLL_MS * 2 ** failures) : POLL_MS,
      );
    };
    const wake = () => {
      if (document.hidden) return;
      failures = 0;
      if (timer) clearTimeout(timer);
      void tick();
    };
    // The server-rendered list matches the default filters; refetch only when they change.
    if (first.current) schedule();
    else void tick(true);
    first.current = false;
    window.addEventListener("online", wake);
    document.addEventListener("visibilitychange", wake);
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
      window.removeEventListener("online", wake);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [base, merge]);

  const loadOlder = async () => {
    const oldest = items[items.length - 1]?.id;
    if (!oldest) return;
    setLoadingMore(true);
    try {
      const res = await fetch(
        `/api/activity?${base}${base ? "&" : ""}before=${oldest}&limit=50`,
        { cache: "no-store" },
      );
      const { items: older } = (await res.json()) as { items: LiveEvent[] };
      merge(older ?? [], "append");
      setHasMore((older ?? []).length >= 50);
    } catch {
      // Keep what is shown; the button stays available to try again.
    } finally {
      setLoadingMore(false);
    }
  };

  const newestPerTask = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of items)
      if (e.taskId && (m.get(e.taskId) ?? 0) < e.id) m.set(e.taskId, e.id);
    return m;
  }, [items]);
  const nowMs = now * 1000;
  const working = agents.filter((a) => a.status === "running").length;
  const filtered = Boolean(category || agent !== (fixedAgent ?? "") || search);
  const chips = [
    { key: "", label: "All activities" },
    ...ACTIVITY_CATEGORIES.map((c) => ({
      key: c.key as string,
      label: c.label,
    })),
  ];

  return (
    <section
      ref={panel}
      className={cn("panel relative mb-4 min-w-0 overflow-hidden", full ? "theme-ink fixed inset-0 z-[100] m-0 h-screen w-screen overflow-hidden rounded-none border-0 bg-background" : className)}
      aria-label="Live operations"
    >
      {full ? (
        <TvWall items={items} agents={agents} newestPerTask={newestPerTask} nowMs={nowMs} offline={Boolean(offline)} onExit={toggleFull} />
      ) : (
        <>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-4 py-3.5 sm:px-5">
        <span className={cn("status-dot h-2 w-2 rounded-full", offline ? "bg-danger text-danger" : working ? "status-live bg-brand text-brand" : "bg-success text-success")} aria-hidden />
        <h2 className="font-display text-[16px] font-semibold tracking-[-0.01em]">
          Live activity
        </h2>
        {offline ? (
          <span className="flex items-center gap-1.5 text-[12px] text-danger">
            <WifiOff className="h-3.5 w-3.5" /> Connection lost. Reconnecting…
          </span>
        ) : (
          showAgents && (
            <span className="text-[12px] text-muted">
              {working ? (
                <>
                  <b className="tabular font-semibold text-foreground">{working}</b>{" "}
                  agent{working === 1 ? "" : "s"} working now
                </>
              ) : agents.length > 0 &&
                agents.every((a) => a.status === "offline") ? (
                <span className="text-danger">No worker online</span>
              ) : (
                <Idle className="font-medium text-muted" />
              )}
            </span>
          )
        )}
        <span className="flex-1" />
        {/* Desktop and TV only: phones already show the feed full width. */}
        <button
          type="button"
          onClick={toggleFull}
          aria-pressed={full}
          className="hidden h-9 items-center gap-2 rounded-md border border-border px-3 text-[12.5px] font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground lg:flex"
        >
          {full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          {full ? "Exit full screen" : "Full screen"}
        </button>
      </div>

      {showAgents && agentCards && agents.length > 0 && (
        <div className="border-b border-border sm:grid sm:grid-cols-3 sm:gap-2 sm:p-4 lg:grid-cols-4 2xl:grid-cols-7">
          {agents.map((a) => (
            <AgentCard key={a.key} a={a} nowSec={now} />
          ))}
        </div>
      )}

      <div className="space-y-2.5 border-b border-border px-3 py-3 sm:px-4">
        <div
          className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-0.5 [scrollbar-width:none] sm:-mx-4 sm:px-4 [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter activities"
        >
          {chips.map((c) => (
            <button
              key={c.key || "all"}
              type="button"
              role="tab"
              aria-selected={category === c.key}
              onClick={() => setCategory(c.key)}
              className={cn(
                "min-h-9 flex-none rounded-md border px-3 text-[12.5px] font-medium transition-colors",
                category === c.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search activity history</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activity, business or website…"
              className="field-m h-10 w-full rounded-md border border-border bg-surface-2 pl-9 pr-3 text-[16px] outline-none placeholder:text-subtle focus:border-foreground/40 focus:shadow-[0_0_0_3px_var(--ring)] sm:text-[14px]"
            />
          </label>
          {!fixedAgent && (
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              aria-label="Filter by agent"
              className="field-m h-10 w-[42%] max-w-52 flex-none rounded-md border border-border bg-surface-2 px-2.5 text-[16px] outline-none focus:border-foreground/40 sm:text-[13px]"
            >
              <option value="">All agents</option>
              {AGENT_KEYS.map((k) => (
                <option key={k} value={k}>
                  {AGENT_META[k as AgentKey].name}
                </option>
              ))}
              <option value="orchestrator">System</option>
            </select>
          )}
        </div>
      </div>

      <div
        className={cn("overflow-y-auto overscroll-contain", full ? "min-h-0 flex-1" : "max-h-[62vh] sm:max-h-[560px]", !full && tall && "xl:max-h-[calc(100vh-19rem)] xl:min-h-[420px]")}
        aria-live="polite"
      >
        {showAgents && !filtered && agents.length > 0 && working === 0 && (
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border px-4 py-3.5 text-subtle sm:px-5">
            {agents.every((a) => a.status === "offline") ? (
              <span className="text-[12.5px]">No worker is online. Nothing is running.</span>
            ) : (
              <>
                <Idle className="font-display text-[15px] font-semibold text-foreground" />
                <span className="text-[12px]">New activity appears here the moment an agent starts working.</span>
              </>
            )}
          </p>
        )}
        {items.length === 0 ? (
          <p className="px-4 py-12 text-center text-[13.5px] text-muted">
            {filtered
              ? "No activity matches these filters."
              : "No activity recorded yet."}
          </p>
        ) : (
          <ol>
            <AnimatePresence initial={false}>
              {items.map((e) => {
                const tone = toneOf(
                  e,
                  newestPerTask,
                  nowMs || new Date(e.createdAt).getTime(),
                );
                const t = TONE[tone];
                const dim = tone === "done" || tone === "stale";
                return (
                  <motion.li
                    key={e.id}
                    initial={{
                      opacity: 0,
                      y: -8,
                      backgroundColor: "rgba(255,77,35,0.08)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      backgroundColor: "rgba(255,77,35,0)",
                    }}
                    transition={{ duration: 0.32, ease: EASE.out, backgroundColor: { duration: 1.6, ease: "easeOut" } }}
                    className="border-b border-border px-4 py-3 sm:px-5"
                  >
                    <div className="flex items-center gap-2 font-mono text-[11.5px]">
                      <time
                        className="tabular flex-none text-subtle"
                        dateTime={e.createdAt}
                        suppressHydrationWarning
                      >
                        {clock(e.createdAt)}
                      </time>
                      <span
                        className={cn(
                          "min-w-0 truncate font-medium uppercase tracking-[0.08em]",
                          dim ? "text-subtle" : "text-muted",
                        )}
                      >
                        [{categoryTag(e.category)}]
                      </span>
                      <span className="flex-1" />
                      <span
                        className={cn(
                          "flex flex-none items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-[9.5px] font-medium tracking-[0.1em]",
                          t.pill,
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            t.dot,
                            tone === "running" && "status-live",
                          )}
                        />
                        {t.label}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 break-words leading-snug",
                        full ? "text-[18px]" : "text-[13.5px]",
                        tone === "failed"
                          ? "text-danger"
                          : dim
                            ? "text-muted"
                            : "text-foreground",
                      )}
                    >
                      {e.message}
                    </p>
                    {(e.businessId || e.url || e.runId) && (
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-subtle">
                        {e.businessId && e.businessName && (
                          <Link
                            href={`/businesses/${e.businessId}`}
                            className="max-w-full truncate text-muted underline-offset-2 hover:text-accent hover:underline"
                          >
                            {e.businessName}
                          </Link>
                        )}
                        {e.url && /^https?:\/\//.test(e.url) && (
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="max-w-full truncate font-mono hover:text-accent"
                          >
                            {host(e.url)}
                          </a>
                        )}
                        {e.runId && (
                          <Link
                            href={`/automations/runs/${e.runId}`}
                            className="text-muted hover:text-accent"
                          >
                            objective →
                          </Link>
                        )}
                      </p>
                    )}
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        )}
        {hasMore && items.length > 0 && (
          <button
            type="button"
            onClick={loadOlder}
            disabled={loadingMore}
            className="min-h-11 w-full px-4 py-3 text-[12.5px] font-medium text-foreground hover:bg-surface-2 disabled:opacity-60"
          >
            {loadingMore ? "Loading…" : "Load earlier activity"}
          </button>
        )}
      </div>
        </>
      )}
    </section>
  );
}

/** The compact overview of all agents as its own panel (used beside the feed on wide screens). */
export function LiveAgents({ initialState, className }: { initialState?: CommandCenterState; className?: string }) {
  const cc = useCommandCenter(initialState);
  const now = useNow(true);
  const agents = cc.data?.agents ?? [];
  if (!agents.length) return null;
  return (
    <section className={cn("mb-4 min-w-0 overflow-hidden rounded-xl border border-border bg-surface sm:border-0 sm:bg-transparent", className)} aria-label="Agents">
      <div className="sm:grid sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-4">
        {agents.map((a) => (
          <AgentCard key={a.key} a={a} nowSec={now} />
        ))}
      </div>
    </section>
  );
}

/* ─────────── TV / wall display ─────────── */

const TV_W = 1920;
const TV_H = 1080;

/**
 * The full-screen wall view. It is laid out for a 1920×1080 canvas and scaled to the real
 * screen, so it fills a TV exactly whatever its resolution (HD, 4K) or browser zoom.
 */
function TvWall({ items, agents, newestPerTask, nowMs, offline, onExit }: { items: LiveEvent[]; agents: AgentLiveState[]; newestPerTask: Map<string, number>; nowMs: number; offline: boolean; onExit: () => void }) {
  const [scale, setScale] = useState(1);
  const [status, setStatus] = useState<AutonomyStatus | null>(null);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / TV_W, window.innerHeight / TV_H));
    fit();
    window.addEventListener("resize", fit);
    document.addEventListener("fullscreenchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      document.removeEventListener("fullscreenchange", fit);
    };
  }, []);
  useEffect(() => {
    let stop = false;
    const load = async () => {
      try {
        const res = await fetch("/api/autonomy", { cache: "no-store" });
        if (res.ok && !stop) setStatus((await res.json()) as AutonomyStatus);
      } catch {
        // Keep the last known numbers; the feed header shows the lost connection.
      }
    };
    void load();
    const iv = setInterval(load, 10_000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, []);

  const now = nowMs ? new Date(nowMs) : null;
  const time = now ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(now) : "--:--:--";
  const date = now ? new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(now) : "";
  const working = agents.filter((a) => a.status === "running").length;
  const allOffline = agents.length > 0 && agents.every((a) => a.status === "offline");
  const state = !status ? null : status.state === "working" ? { label: "Running", tone: "running" as Tone } : status.state === "paused" ? { label: "Paused", tone: "done" as Tone } : status.state === "blocked" ? { label: "Cannot run", tone: "failed" as Tone } : status.state === "limit_reached" ? { label: "Daily limit reached", tone: "waiting" as Tone } : status.state === "off_hours" ? { label: "Outside working hours", tone: "done" as Tone } : { label: "Standing by", tone: "completed" as Tone };
  const t = status?.today;
  const numbers = status && t
    ? [
        { label: "Discovered today", value: String(t.discovered), sub: `limit ${status.limits.discovery}` },
        { label: "Qualified leads", value: String(t.qualified), sub: "last 24 hours" },
        { label: "Websites built", value: String(t.websites), sub: `limit ${status.limits.websites}` },
        { label: "Deployed", value: String(t.deployed), sub: "last 24 hours" },
        { label: "Cost today", value: `$${t.costUsd.toFixed(2)}`, sub: `limit $${status.limits.dailyUsd}` },
        { label: "In queue", value: String(status.tasks.waiting), sub: `${status.tasks.approval} need approval` },
      ]
    : [];
  // As many events as fit: the newest are always at the top.
  const rows = items.slice(0, 10);

  return (
    <>
    <div className="absolute left-1/2 top-1/2 z-10" style={{ width: TV_W, height: TV_H, transform: `translate(-50%, -50%) scale(${scale})` }}>
      <div className="flex h-full w-full flex-col gap-6 p-9">
        <header className="flex flex-none items-center gap-6">
          <LogoMark animated className="h-[72px] w-[72px] flex-none" />
          <div className="min-w-0">
            <p className="font-mono text-[15px] font-medium uppercase tracking-[0.2em] text-muted">HOPI Command</p>
            <h2 className="mt-1 font-display text-[44px] font-semibold leading-none tracking-[-0.03em]">Live operations</h2>
          </div>
          {state && (
            <span className={cn("ml-6 flex items-center gap-3 font-display text-[24px] font-semibold tracking-[-0.01em]", TONE[state.tone].text)}>
              <span className={cn("status-dot h-3.5 w-3.5 rounded-full", TONE[state.tone].dot, TONE[state.tone].text, status?.state === "working" && "status-live")} />
              {state.label}
            </span>
          )}
          {offline && <span className="text-[20px] font-medium text-danger">Connection lost. Reconnecting…</span>}
          <span className="flex-1" />
          <div className="text-right">
            <p className="tabular font-mono text-[64px] font-semibold leading-none tracking-tight text-foreground" suppressHydrationWarning>
              {time}
            </p>
            <p className="mt-1.5 text-[19px] text-muted" suppressHydrationWarning>
              {date}
            </p>
          </div>
          <button type="button" onClick={onExit} className="flex h-14 flex-none items-center gap-2.5 rounded-md border border-border px-5 text-[17px] font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground">
            <Minimize2 className="h-5 w-5" /> Exit
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[800px_minmax(0,1fr)] gap-6">
          <div className="flex min-h-0 flex-col gap-5">
            <div className="panel tv-glass flex-none p-6">
              <p className="font-mono text-[14px] font-medium uppercase tracking-[0.16em] text-muted">{status?.objective ? (status.objective.active ? "Current objective" : "Last objective") : "Objective"}</p>
              <p className="mt-2 line-clamp-2 min-h-[2.6em] font-display text-[26px] font-semibold leading-snug tracking-[-0.01em] first-letter:uppercase">{status?.objective?.text ?? (status ? "No objective yet." : "Loading…")}</p>
              {status?.objective && status.objective.stages.length > 0 && (
                <ol className="mt-5 grid grid-cols-3 gap-x-6 gap-y-4">
                  {status.objective.stages.map((s) => {
                    const pct = s.target ? Math.min(100, Math.round((s.value / s.target) * 100)) : s.value > 0 ? 100 : 0;
                    return (
                      <li key={s.key} className="min-w-0">
                        <p className="truncate font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-muted">{s.label}</p>
                        <p className="mt-1 truncate text-[15px] text-muted">
                          <b className="tabular font-display text-[32px] font-semibold leading-none text-foreground">{s.value}</b>
                          {s.target ? <span className="tabular"> / {s.target}</span> : null}
                        </p>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
                          <div className={cn("h-full rounded-full transition-all duration-700", s.value > 0 ? "bg-brand" : "bg-transparent")} style={{ width: `${pct}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            <div className="grid flex-none grid-cols-3 gap-4">
              {numbers.map((n) => (
                <div key={n.label} className="panel tv-glass px-5 py-3">
                  <p className="truncate text-[14px] text-muted">{n.label}</p>
                  <p className="tabular mt-1 font-display text-[38px] font-semibold leading-none tracking-[-0.02em]">{n.value}</p>
                  <p className="mt-1.5 truncate text-[13px] text-subtle">{n.sub}</p>
                </div>
              ))}
            </div>

            <div className="panel tv-glass flex min-h-0 flex-1 flex-col overflow-hidden">
              <p className="flex-none border-b border-border px-6 py-3 font-mono text-[14px] font-medium uppercase tracking-[0.16em]">
                Agents <span className="ml-2 font-normal normal-case tracking-normal text-muted">{allOffline ? "no worker online" : working ? `${working} working now` : <Idle />}</span>
              </p>
              <ul className="flex min-h-0 flex-1 flex-col justify-between py-1">
                {agents.map((a) => {
                  const st = AGENT_STATE[a.status];
                  const tone = TONE[st.tone];
                  return (
                    <li key={a.key} className="flex min-h-0 flex-1 items-center gap-4 border-b border-border px-6 last:border-0">
                      <span className={cn("status-dot h-3 w-3 flex-none rounded-full", tone.dot, tone.text, a.status === "running" && "status-live")} />
                      <span className="w-[130px] flex-none truncate font-display text-[19px] font-semibold">{AGENT_META[a.key].short}</span>
                      <span className={cn("w-[150px] flex-none truncate font-mono text-[13px] font-medium uppercase tracking-[0.1em]", tone.text)}>{st.label}</span>
                      <span className="min-w-0 flex-1 truncate text-[16px] text-muted">
                        {a.status === "running" && a.subject ? <span className="text-foreground">{a.subject.name}: </span> : null}
                        {agentLine(a)}
                      </span>
                      <span className="tabular flex-none text-[15px] text-success">✓ {a.completed30d}</span>
                      <span className={cn("tabular w-[52px] flex-none text-[15px]", a.failed30d ? "text-danger/90" : "text-subtle")}>✕ {a.failed30d}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="panel tv-glass flex min-h-0 flex-col overflow-hidden">
            <p className="flex flex-none items-center gap-3 border-b border-border px-6 py-3 font-mono text-[14px] font-medium uppercase tracking-[0.16em]">
              <span className={cn("status-dot h-3 w-3 rounded-full", offline ? "bg-danger text-danger" : working ? "status-live bg-brand text-brand" : "bg-success text-success")} />
              Activity feed
              {!allOffline && !working && <Idle className="ml-1 font-normal normal-case tracking-[0.08em] text-muted" />}
            </p>
            <ol className="min-h-0 flex-1 overflow-hidden">
              {rows.length === 0 && <li className="px-6 py-10 text-[20px] text-muted">No activity recorded yet.</li>}
              <AnimatePresence initial={false}>
                {rows.map((e) => {
                  const tone = toneOf(e, newestPerTask, nowMs || new Date(e.createdAt).getTime());
                  const tn = TONE[tone];
                  const dim = tone === "done" || tone === "stale";
                  return (
                    <motion.li key={e.id} layout="position" initial={{ opacity: 0, backgroundColor: "rgba(255,77,35,0.1)" }} animate={{ opacity: 1, backgroundColor: "rgba(255,77,35,0)" }} transition={{ duration: 0.9 }} className="border-b border-border px-6 py-3">
                      <div className="flex items-center gap-3 font-mono text-[15px]">
                        <time className="tabular flex-none text-subtle" dateTime={e.createdAt} suppressHydrationWarning>
                          {clock(e.createdAt)}
                        </time>
                        <span className={cn("min-w-0 truncate font-medium uppercase tracking-[0.08em]", dim ? "text-subtle" : "text-muted")}>[{categoryTag(e.category)}]</span>
                        {e.businessName && <span className="min-w-0 truncate font-sans text-muted">{e.businessName}</span>}
                        <span className="flex-1" />
                        <span className={cn("flex flex-none items-center gap-2 rounded border px-2 py-0.5 text-[12px] font-semibold tracking-[0.08em]", tn.pill)}>
                          <span className={cn("h-2 w-2 rounded-full", tn.dot, tone === "running" && "status-live")} />
                          {tn.label}
                        </span>
                      </div>
                      <p className={cn("mt-1 truncate text-[19px] leading-snug", tone === "failed" ? "text-danger" : dim ? "text-muted" : "text-foreground")}>{e.message}</p>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
