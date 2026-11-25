"use client";

import { ArrowDownToLine, ChevronRight, Copy, Download, Eraser, Pause, Play, Search, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCommandCenter, useSystemHealth } from "./live";

type FeedLine = { key: string; at: string; tag: string; level: "info" | "warn" | "error" | "ok"; text: string };
type LocalLine = { key: string; local: true; kind: "cmd" | "out"; tone?: string; text: string };
type Line = FeedLine | LocalLine;
type Tab = "system" | "agents" | "executions" | "api" | "errors" | "security";

const TABS: { key: Tab; label: string; about: string }[] = [
  { key: "system", label: "System", about: "What the orchestrator decided: runs started, finished, cancelled." },
  { key: "agents", label: "Agents", about: "Every step your agents log while they work." },
  { key: "executions", label: "Executions", about: "One line per task: status, duration and cost." },
  { key: "api", label: "API", about: "Every call to a paid service, with tokens and cost." },
  { key: "errors", label: "Errors", about: "Only things that went wrong." },
  { key: "security", label: "Security", about: "Sign-ins, approvals and configuration changes (admins only)." },
];
const TAG: Record<string, string> = { orchestrator: "SYSTEM", lead_finder: "DISCOVERY", research: "RESEARCH", contact_research: "CONTACTS", website_builder: "BUILDER", quality_control: "QA", deployment: "DEPLOY", sales: "OUTREACH", custom: "CUSTOM" };
const LEVEL: Record<string, string> = { info: "text-[#b8d6c2]", ok: "text-accent", warn: "text-warning", error: "text-danger" };
const TONE: Record<string, string> = { ok: "text-accent", warn: "text-warning", error: "text-danger", muted: "text-subtle", head: "text-foreground font-semibold" };

function hhmmss(iso: string) {
  const d = new Date(iso);
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((v) => String(v).padStart(2, "0")).join(":");
}

let localSeq = 0;
const local = (kind: "cmd" | "out", text: string, tone?: string): LocalLine => ({ key: `x${++localSeq}`, local: true, kind, tone, text });

/**
 * The terminal. Tabs stream real records (logs, tasks, API calls, audit trail); the prompt
 * runs commands on the server. Nothing is simulated: every line is a database row or the
 * server's answer to a command.
 */
export function TerminalConsole({ initialTab = "agents", initialAgent = "", canSeeSecurity }: { initialTab?: Tab; initialAgent?: string; canSeeSecurity: boolean }) {
  const [tab, setTab] = useState<Tab>(initialTab);
  const [lines, setLines] = useState<Line[]>([]);
  const [agent, setAgent] = useState(initialAgent);
  const [query, setQuery] = useState("");
  const [paused, setPaused] = useState(false);
  const [follow, setFollow] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"command" | "ai">("command");
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState<{ message: string; command: string } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const since = useRef<string | null>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const { data: cc } = useCommandCenter();
  const { data: health } = useSystemHealth();

  const feedUrl = useCallback(
    (extra: Record<string, string>) => `/api/terminal/feed?${new URLSearchParams({ tab, ...(agent && tab !== "system" && tab !== "security" ? { agent } : {}), ...(query ? { q: query } : {}), ...extra })}`,
    [tab, agent, query],
  );

  // (Re)load when the tab or a filter changes, then stream new rows.
  useEffect(() => {
    let cancelled = false;
    since.current = null;
    const load = async (initial: boolean) => {
      if (!initial && document.hidden) return;
      try {
        const res = await fetch(feedUrl(initial || !since.current ? { limit: "200" } : { since: since.current, limit: "200" }), { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
        const fresh = json.lines as FeedLine[];
        if (fresh.length) since.current = fresh[fresh.length - 1].at;
        setLines((cur) => {
          if (initial) return fresh;
          if (!fresh.length) return cur;
          const seen = new Set(cur.map((l) => l.key));
          return [...cur, ...fresh.filter((l) => !seen.has(l.key))].slice(-800);
        });
        setError(null);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled && initial) setLoading(false);
      }
    };
    const t = setTimeout(() => void load(true), query ? 250 : 0);
    const iv = paused ? null : setInterval(() => void load(false), 2500);
    return () => {
      cancelled = true;
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [feedUrl, paused, query]);

  useLayoutEffect(() => {
    if (follow && box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines, follow]);

  const switchTab = (next: Tab) => {
    if (next === tab) return;
    setLoading(true);
    setLines([]);
    setFollow(true);
    setTab(next);
  };

  const append = (more: Line[]) => {
    setLines((cur) => [...cur, ...more].slice(-800));
    setFollow(true);
  };

  const execute = async (text: string, confirmed = false, runMode = mode) => {
    const cmd = text.trim();
    if (!cmd || busy) return;
    if (!confirmed) {
      history.current = [cmd, ...history.current.filter((h) => h !== cmd)].slice(0, 50);
      cursor.current = -1;
      append([local("cmd", `${runMode === "ai" ? "ai>" : "$"} ${cmd}`)]);
    }
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/terminal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ input: cmd, mode: confirmed ? "command" : runMode, confirmed }) });
      const json = (await res.json()) as { lines?: { text: string; tone?: string }[]; confirm?: { message: string; command: string }; clear?: boolean; error?: string };
      if (json.clear) setLines([]);
      else append((json.lines ?? [{ text: json.error ?? "No response", tone: "error" }]).map((l) => local("out", l.text, l.tone)));
      if (json.confirm) setConfirm(json.confirm);
    } catch {
      append([local("out", "Could not reach the server.", "error")]);
    } finally {
      setBusy(false);
      field.current?.focus();
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void execute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      cursor.current = Math.min(history.current.length - 1, cursor.current + 1);
      if (history.current[cursor.current]) setInput(history.current[cursor.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.max(-1, cursor.current - 1);
      setInput(cursor.current === -1 ? "" : history.current[cursor.current]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const asText = () => lines.map((l) => ("local" in l ? l.text : `[${hhmmss(l.at)}] ${(TAG[l.tag] ?? l.tag.toUpperCase()).padEnd(10)} ${l.text}`)).join("\n");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText());
      toast.success(`Copied ${lines.length} lines`);
    } catch {
      toast.error("Could not copy on this device");
    }
  };

  const infra = health?.checks ?? [];
  const state = (k: string) => infra.find((c) => c.key === k)?.state;
  const up = (k: string) => state(k) === "operational" || state(k) === "connected";
  const apis = infra.filter((c) => !["api", "database", "redis", "workers"].includes(c.key));
  const queued = cc?.agents.reduce((s, a) => s + a.pending, 0);
  const chips: { label: string; value: string; tone: "ok" | "warn" | "error" | "muted" }[] = [
    { label: "Backend", value: health ? (up("api") ? "up" : "down") : "…", tone: !health ? "muted" : up("api") ? "ok" : "error" },
    { label: "Database", value: health ? (up("database") ? "up" : "down") : "…", tone: !health ? "muted" : up("database") ? "ok" : "error" },
    { label: "Queue", value: health ? (up("redis") ? `${queued ?? 0} waiting` : "down") : "…", tone: !health ? "muted" : up("redis") ? "ok" : "error" },
    { label: "Workers", value: cc ? `${cc.workers.online}/${cc.workers.total}` : "…", tone: !cc ? "muted" : cc.workers.online === cc.workers.total ? "ok" : cc.workers.online ? "warn" : "error" },
    { label: "Executing", value: cc ? String(cc.activeAgents) : "…", tone: cc?.activeAgents ? "ok" : "muted" },
    { label: "Services", value: health ? `${apis.filter((c) => c.state === "connected").length}/${apis.length}` : "…", tone: apis.some((c) => c.state === "error") ? "error" : apis.some((c) => c.state === "connected") ? "ok" : "muted" },
  ];
  const visibleTabs = TABS.filter((t) => t.key !== "security" || canSeeSecurity);
  const showAgentFilter = tab === "agents" || tab === "executions" || tab === "errors";
  const streaming = !paused && !error;

  return (
    <div className="space-y-3">
      {/* Live system information from real health checks */}
      <div className="-mx-3.5 flex gap-2 overflow-x-auto px-3.5 pb-0.5 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((c) => (
          <div key={c.label} className="flex shrink-0 items-center gap-2 rounded-xl border border-border bg-surface-2/70 px-3 py-2 text-[12px]">
            <span className={cn("h-2 w-2 rounded-full", { ok: "bg-accent", warn: "bg-warning", error: "bg-danger", muted: "bg-subtle" }[c.tone])} />
            <span className="text-muted">{c.label}</span>
            <span className={cn("tabular font-medium", { ok: "text-foreground", warn: "text-warning", error: "text-danger", muted: "text-subtle" }[c.tone])}>{c.value}</span>
          </div>
        ))}
      </div>

      <div className="panel overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
          </div>
          <span className="term ml-1 hidden text-[12px] text-muted sm:inline">hopibot://terminal</span>
          <span className={cn("flex items-center gap-1.5 text-[12px] font-medium", streaming ? "text-accent" : paused ? "text-warning" : "text-danger")}>
            <span className={cn("h-1.5 w-1.5 rounded-full bg-current", streaming && "animate-pulse-dot")} />
            {error ? "Disconnected" : paused ? "Paused" : "Live"}
          </span>
          <div className="flex-1" />
          {[
            { label: paused ? "Resume live updates" : "Pause live updates", icon: paused ? Play : Pause, on: () => setPaused((p) => !p) },
            { label: follow ? "Auto-scroll is on" : "Turn auto-scroll on", icon: ArrowDownToLine, on: () => setFollow((f) => !f), active: follow },
            { label: "Clear screen", icon: Eraser, on: () => setLines([]) },
            { label: "Copy output", icon: Copy, on: copy },
          ].map(({ label, icon: Icon, on, active }) => (
            <button key={label} onClick={on} title={label} aria-label={label} aria-pressed={active} className={cn("flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent-soft hover:text-accent", active ? "text-accent" : "text-muted")}>
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <a href={feedUrl({ format: "text", limit: "500" })} title="Download this log" aria-label="Download this log" className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-accent-soft hover:text-accent">
            <Download className="h-4 w-4" />
          </a>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-border" role="tablist" aria-label="Log type">
          {visibleTabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              title={t.about}
              onClick={() => switchTab(t.key)}
              className={cn("-mb-px h-11 shrink-0 border-b-2 px-3.5 text-[13px] font-medium transition-colors", tab === t.key ? "border-accent text-accent" : "border-transparent text-muted hover:text-foreground")}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2 border-b border-border px-3 py-2 sm:flex-row sm:items-center">
          <p className="min-w-0 flex-1 truncate text-[12.5px] text-muted">{TABS.find((t) => t.key === tab)?.about}</p>
          <div className="flex gap-2">
            {showAgentFilter && (
              <select value={agent} onChange={(e) => setAgent(e.target.value)} aria-label="Filter by agent" className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-[#040a07] px-2 text-[16px] text-foreground focus:border-accent focus:outline-none sm:w-44 sm:flex-none sm:text-[12.5px]">
                <option value="">All agents</option>
                {AGENT_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {AGENT_META[k].name}
                  </option>
                ))}
                <option value="custom">Custom agents</option>
              </select>
            )}
            <div className="relative min-w-0 flex-1 sm:w-52 sm:flex-none">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-subtle" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" aria-label="Filter lines" className="term h-9 w-full rounded-lg border border-border bg-[#040a07] pl-8 pr-8 text-[16px] text-foreground placeholder:text-subtle focus:border-accent focus:outline-none sm:text-[12.5px]" />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-subtle" aria-label="Clear filter">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="relative">
          <div
            ref={box}
            onScroll={() => {
              const el = box.current;
              if (el) setFollow(el.scrollHeight - el.scrollTop - el.clientHeight < 48);
            }}
            onClick={() => window.getSelection()?.isCollapsed && field.current?.focus({ preventScroll: true })}
            className="term h-[min(52dvh,560px)] overflow-y-auto bg-[#020503] px-3 py-3 text-[12px] leading-[1.75] sm:text-[12.5px]"
            role="log"
            aria-live="polite"
            aria-label="Terminal output"
          >
            {loading ? (
              <p className="text-subtle">Loading…</p>
            ) : lines.length === 0 ? (
              <p className="text-subtle">
                <span className="text-accent">$</span> {error ? `cannot load this log: ${error}` : query || agent ? "no lines match this filter" : "nothing recorded here yet — type help below to see what you can do"}
              </p>
            ) : (
              lines.map((l) =>
                "local" in l ? (
                  <div key={l.key} className={cn("whitespace-pre-wrap break-words", l.kind === "cmd" ? "mt-1 text-accent" : (TONE[l.tone ?? ""] ?? "text-[#b8d6c2]"))}>
                    {l.text}
                  </div>
                ) : (
                  <div key={l.key} className="flex gap-2 hover:bg-[rgba(0,255,120,0.04)]">
                    <span className="shrink-0 text-subtle" suppressHydrationWarning>
                      [{hhmmss(l.at)}]
                    </span>
                    <span className="hidden w-[84px] shrink-0 truncate font-semibold sm:inline" style={{ color: AGENT_META[l.tag as AgentKey]?.color ?? "#00ff78" }}>
                      {TAG[l.tag] ?? l.tag.toUpperCase()}
                    </span>
                    <span className={cn("min-w-0 whitespace-pre-wrap break-words", LEVEL[l.level])}>
                      <span className="font-semibold sm:hidden" style={{ color: AGENT_META[l.tag as AgentKey]?.color ?? "#00ff78" }}>
                        {TAG[l.tag] ?? l.tag.toUpperCase()}{" "}
                      </span>
                      {l.text}
                    </span>
                  </div>
                ),
              )
            )}
          </div>
          {!follow && (
            <button
              onClick={() => {
                setFollow(true);
                if (box.current) box.current.scrollTop = box.current.scrollHeight;
              }}
              className="absolute bottom-3 right-3 flex h-10 items-center gap-1.5 rounded-xl border border-border-strong bg-[#06100b] px-3 text-[12px] font-medium text-accent shadow-[0_0_16px_-4px_rgba(0,255,120,0.5)]"
            >
              <ArrowDownToLine className="h-3.5 w-3.5" /> Latest
            </button>
          )}
        </div>

        {/* Prompt */}
        <div className="border-t border-border bg-[#030705]">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex shrink-0 rounded-lg border border-border p-0.5" role="group" aria-label="Input mode">
              <button onClick={() => setMode("command")} aria-pressed={mode === "command"} className={cn("term h-8 rounded-md px-2.5 text-[12px] font-semibold", mode === "command" ? "bg-accent-soft text-accent" : "text-muted")}>
                $
              </button>
              <button onClick={() => setMode("ai")} aria-pressed={mode === "ai"} title="Ask in plain language" className={cn("flex h-8 items-center gap-1 rounded-md px-2.5 text-[12px] font-semibold", mode === "ai" ? "bg-accent-soft text-accent" : "text-muted")}>
                <Sparkles className="h-3.5 w-3.5" /> AI
              </button>
            </div>
            <input
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              disabled={busy}
              placeholder={mode === "ai" ? "Ask: which agents failed today?" : "Type a command — try: help"}
              aria-label={mode === "ai" ? "Ask in plain language" : "Command"}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              enterKeyHint="send"
              className="term h-10 min-w-0 flex-1 bg-transparent text-[16px] text-accent caret-accent placeholder:text-subtle focus:outline-none sm:text-[13px]"
            />
            <button onClick={() => void execute(input)} disabled={busy || !input.trim()} aria-label="Run" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-opacity disabled:opacity-40">
              <ChevronRight className={cn("h-5 w-5", busy && "animate-pulse")} />
            </button>
          </div>
          <div className="flex gap-1.5 overflow-x-auto px-3 pb-2.5">
            {(mode === "ai" ? ["Which agents failed today?", "Show me the latest 20 leads", "How much have I spent this month?"] : ["help", "status", "agents list", "leads recent", "api usage", "system health"]).map((s) => (
              <button key={s} onClick={() => void execute(s)} disabled={busy} className={cn("h-8 shrink-0 rounded-lg border border-border px-2.5 text-[12px] text-muted transition-colors hover:border-border-strong hover:text-accent", mode === "command" && "term")}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirm)}
        onOpenChange={(v) => {
          if (!v) {
            if (confirm) append([local("out", "Cancelled.", "muted")]);
            setConfirm(null);
          }
        }}
        title={confirm?.message ?? ""}
        description={
          <>
            The terminal will run <span className="term text-accent">{confirm?.command}</span>.
          </>
        }
        confirmLabel="Yes, run it"
        tone="primary"
        onConfirm={() => {
          const c = confirm;
          setConfirm(null);
          if (c) void execute(c.command, true);
        }}
      />
    </div>
  );
}
