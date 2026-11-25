"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Search, WifiOff } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ACTIVITY_CATEGORIES, categoryTag } from "@/lib/activity";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { cn, formatDuration, timeAgo } from "@/lib/utils";
import type {
  AgentLiveState,
  CommandCenterState,
} from "@/server/queries/command-center";
import type { ActivityEntry } from "@/server/queries/metrics";
import { useCommandCenter, useNow } from "./live";

export type LiveEvent = ActivityEntry;

const POLL_MS = 2500;
const STALE_MS = 5 * 60_000;

/* Colour language: green = success, blue = information, yellow = in progress or waiting,
   red = failed, grey = idle or no longer current. */
const TONE = {
  completed: {
    label: "COMPLETED",
    text: "text-accent",
    dot: "bg-accent",
    pill: "border-[rgba(0,255,120,0.35)] text-accent",
  },
  info: {
    label: "INFO",
    text: "text-info",
    dot: "bg-info",
    pill: "border-[rgba(67,191,255,0.35)] text-info",
  },
  running: {
    label: "RUNNING",
    text: "text-warning",
    dot: "bg-warning",
    pill: "border-[rgba(255,191,71,0.4)] text-warning",
  },
  waiting: {
    label: "WAITING",
    text: "text-warning",
    dot: "bg-warning",
    pill: "border-[rgba(255,191,71,0.4)] text-warning",
  },
  warning: {
    label: "WARNING",
    text: "text-warning",
    dot: "bg-warning",
    pill: "border-[rgba(255,191,71,0.4)] text-warning",
  },
  failed: {
    label: "FAILED",
    text: "text-danger",
    dot: "bg-danger",
    pill: "border-[rgba(255,77,97,0.4)] text-danger",
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
  running: { label: "ACTIVE", tone: "completed" },
  queued: { label: "QUEUED", tone: "running" },
  waiting: { label: "WAITING FOR YOU", tone: "waiting" },
  failed: { label: "LAST TASK FAILED", tone: "failed" },
  idle: { label: "IDLE", tone: "done" },
  disabled: { label: "SWITCHED OFF", tone: "done" },
  offline: { label: "OFFLINE", tone: "failed" },
};

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
        className="flex min-h-[52px] min-w-0 items-center gap-3 border-b border-[rgba(0,255,120,0.06)] px-4 py-2 last:border-0 sm:hidden"
      >
        <span
          className={cn(
            "h-2 w-2 flex-none rounded-full",
            tone.dot,
            a.status === "running" && "animate-pulse-dot",
          )}
        />
        <span className="min-w-0 flex-1">
          <span className="flex items-baseline gap-2">
            <span className="truncate text-[12.5px] font-semibold uppercase tracking-[0.07em]">
              {AGENT_META[a.key].short}
            </span>
            <span
              className={cn(
                "flex-none text-[10.5px] font-semibold tracking-[0.06em]",
                tone.text,
              )}
            >
              {st.label}
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
          <span className="tabular block text-accent/90">
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
        className="group hidden min-w-0 flex-col rounded-xl border border-border bg-[rgba(3,8,6,0.55)] p-3 transition-colors hover:border-border-strong sm:flex"
      >
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[12px] font-semibold uppercase tracking-[0.08em]">
            {AGENT_META[a.key].short}
          </p>
          <ChevronRight className="h-3.5 w-3.5 flex-none text-subtle transition-transform group-hover:translate-x-0.5" />
        </div>
        <p
          className={cn(
            "mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em]",
            tone.text,
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 flex-none rounded-full",
              tone.dot,
              a.status === "running" && "animate-pulse-dot",
            )}
          />
          {st.label}
          {runtime && (
            <span className="tabular font-normal text-muted">· {runtime}</span>
          )}
        </p>
        <p className="mt-1.5 line-clamp-2 min-h-[2.5em] text-[12.5px] leading-snug text-muted">
          {agentLine(a)}
        </p>
        {a.status === "running" && a.subject && (
          <p className="mt-1 truncate text-[12px] text-foreground">
            {a.subject.name}
          </p>
        )}
        <p className="mt-2 flex items-center gap-2.5 border-t border-border pt-2 text-[11px] text-subtle">
          <span className="tabular text-accent/90">✓ {a.completed30d}</span>
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
  className,
}: {
  initial: LiveEvent[];
  initialState?: CommandCenterState;
  agent?: string;
  showAgents?: boolean;
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
      className={cn("panel relative mb-5 min-w-0 overflow-hidden", className)}
      aria-label="Live operations"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-border px-4 py-3.5 sm:px-5">
        <span className="relative flex h-2.5 w-2.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full rounded-full opacity-60",
              offline ? "bg-danger" : "animate-ping bg-accent",
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2.5 w-2.5 rounded-full",
              offline ? "bg-danger" : "bg-accent",
            )}
          />
        </span>
        <h2 className="text-[15px] font-semibold tracking-[0.12em]">
          LIVE OPERATIONS
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
                  <b className="tabular font-semibold text-accent">{working}</b>{" "}
                  agent{working === 1 ? "" : "s"} working now
                </>
              ) : agents.length > 0 &&
                agents.every((a) => a.status === "offline") ? (
                <span className="text-danger">No worker online</span>
              ) : (
                "All agents idle"
              )}
            </span>
          )
        )}
      </div>

      {showAgents && agents.length > 0 && (
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
                "min-h-10 flex-none rounded-lg border px-3 text-[11.5px] font-semibold uppercase tracking-[0.07em] transition-colors",
                category === c.key
                  ? "border-accent bg-accent-soft text-accent"
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
              className="h-10 w-full rounded-lg border border-border bg-[rgba(3,8,6,0.6)] pl-9 pr-3 text-[14px] outline-none placeholder:text-subtle focus:border-accent"
            />
          </label>
          {!fixedAgent && (
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              aria-label="Filter by agent"
              className="h-10 w-[42%] max-w-52 flex-none rounded-lg border border-border bg-[rgba(3,8,6,0.6)] px-2.5 text-[13px] outline-none focus:border-accent"
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
        className="max-h-[62vh] overflow-y-auto overscroll-contain bg-[rgba(1,4,3,0.55)] sm:max-h-[560px]"
        aria-live="polite"
      >
        {showAgents && !filtered && agents.length > 0 && working === 0 && (
          <p className="flex items-center gap-2.5 border-b border-[rgba(0,255,120,0.05)] px-4 py-3 font-mono text-[12.5px] text-subtle">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-subtle" />
            {agents.every((a) => a.status === "offline")
              ? "No worker is online. Nothing is running."
              : "All agents are idle. New activity appears here the moment an agent starts working."}
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
                      backgroundColor: "rgba(0,255,120,0.09)",
                    }}
                    animate={{
                      opacity: 1,
                      backgroundColor: "rgba(0,255,120,0)",
                    }}
                    transition={{ duration: 0.9 }}
                    className="border-b border-[rgba(0,255,120,0.05)] px-3.5 py-2.5 sm:px-5"
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
                          "min-w-0 truncate font-semibold tracking-[0.04em]",
                          dim ? "text-muted" : t.text,
                        )}
                      >
                        [{categoryTag(e.category)}]
                      </span>
                      <span className="flex-1" />
                      <span
                        className={cn(
                          "flex flex-none items-center gap-1.5 rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.08em]",
                          t.pill,
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            t.dot,
                            tone === "running" && "animate-pulse-dot",
                          )}
                        />
                        {t.label}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-1 break-words text-[13.5px] leading-snug",
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
                            className="text-accent/75 hover:text-accent"
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
            className="min-h-11 w-full px-4 py-3 text-[12.5px] font-medium text-accent hover:bg-[rgba(0,255,120,0.04)] disabled:opacity-60"
          >
            {loadingMore ? "Loading…" : "Load earlier activity"}
          </button>
        )}
      </div>
    </section>
  );
}
