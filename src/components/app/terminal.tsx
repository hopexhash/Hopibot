"use client";

import { ArrowDownToLine, Copy, Download, Pause, Play, Search, X } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { cn } from "@/lib/utils";

export type LogLine = { id: number; agentKey: string; level: string; message: string; createdAt: string; taskId: string | null; runId: string | null };

const TAG: Record<string, string> = {
  orchestrator: "SYSTEM",
  lead_finder: "LEAD-FINDER",
  research: "RESEARCH",
  contact_research: "CONTACTS",
  website_builder: "BUILDER",
  quality_control: "QC",
  deployment: "DEPLOY",
  sales: "SALES",
};

function hhmmss(iso: string) {
  const d = new Date(iso);
  return [d.getHours(), d.getMinutes(), d.getSeconds()].map((v) => String(v).padStart(2, "0")).join(":");
}

/**
 * Streams real agent_logs rows (no synthetic lines). Newest at the bottom like a shell.
 * Auto-scroll follows new output unless paused or the user scrolled up.
 */
export function Terminal({ initial, initialAgent = "", height = 420, title = "LIVE TERMINAL", compact = false }: { initial: LogLine[]; initialAgent?: string; height?: number | string; title?: string; compact?: boolean }) {
  const [lines, setLines] = useState<LogLine[]>(() => [...initial].reverse());
  const [agent, setAgent] = useState(initialAgent);
  const [query, setQuery] = useState("");
  const [paused, setPaused] = useState(false);
  const [stick, setStick] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const lastId = useRef(initial[0]?.id ?? 0);
  const firstLoad = useRef(true);

  const params = useCallback((extra: Record<string, string>) => new URLSearchParams({ ...(agent ? { agent } : {}), ...(query ? { q: query } : {}), ...extra }).toString(), [agent, query]);

  // Reload when filters change.
  useEffect(() => {
    if (firstLoad.current && !initialAgent) {
      firstLoad.current = false;
      return;
    }
    firstLoad.current = false;
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/logs?${params({ limit: "200" })}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
        if (cancelled) return;
        const items = (json.items as LogLine[]).reverse();
        setLines(items);
        lastId.current = items.at(-1)?.id ?? 0;
        setStick(true);
        setError(null);
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [params, initialAgent]);

  // Stream new lines.
  useEffect(() => {
    if (paused) return;
    const iv = setInterval(async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(`/api/logs?${params({ after: String(lastId.current), limit: "100" })}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
        const fresh = (json.items as LogLine[]).reverse();
        if (fresh.length) {
          lastId.current = fresh.at(-1)!.id;
          setLines((cur) => [...cur, ...fresh].slice(-600));
        }
        setError(null);
      } catch (e) {
        setError((e as Error).message);
      }
    }, 2500);
    return () => clearInterval(iv);
  }, [paused, params]);

  useLayoutEffect(() => {
    if (stick && !paused && box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines, stick, paused]);

  const onScroll = () => {
    const el = box.current;
    if (!el) return;
    setStick(el.scrollHeight - el.scrollTop - el.clientHeight < 40);
  };

  const asText = () => lines.map((l) => `[${hhmmss(l.createdAt)}] ${(TAG[l.agentKey] ?? l.agentKey).padEnd(11)} ${l.message}`).join("\n");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText());
      toast.success(`Copied ${lines.length} lines`);
    } catch {
      toast.error("Clipboard unavailable");
    }
  };

  const live = !paused && !error;
  return (
    <div className="panel flex flex-col overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        </div>
        <span className="mono ml-1 text-[11px] font-semibold tracking-[0.16em] text-foreground">{title}</span>
        <span className={cn("mono flex items-center gap-1.5 text-[11px] tracking-[0.12em]", live ? "text-accent" : paused ? "text-warning" : "text-danger")}>
          <span className={cn("h-1.5 w-1.5 rounded-full bg-current", live && "animate-pulse-dot")} />
          {error ? "DISCONNECTED" : paused ? "PAUSED" : "STREAMING"}
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          <button onClick={() => setPaused((p) => !p)} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-accent-soft hover:text-accent" aria-label={paused ? "Resume streaming" : "Pause streaming"} title={paused ? "Resume" : "Pause"}>
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button onClick={copy} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-accent-soft hover:text-accent" aria-label="Copy logs" title="Copy">
            <Copy className="h-4 w-4" />
          </button>
          <a href={`/api/logs?${params({ format: "text" })}`} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-accent-soft hover:text-accent" aria-label="Download logs" title="Download">
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>

      {!compact && (
        <div className="flex flex-col gap-2 border-b border-border px-3 py-2.5 sm:flex-row sm:items-center">
          <div className="relative sm:w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="grep logs…"
              className="mono h-9 w-full rounded-lg border border-border bg-[#060b08] pl-8 pr-8 text-[16px] text-foreground placeholder:text-subtle focus:border-accent focus:outline-none sm:text-[12px]"
              aria-label="Search logs"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle" aria-label="Clear search">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-0.5 sm:mx-0 sm:px-0">
            {["", "orchestrator", ...AGENT_KEYS].map((k) => (
              <button
                key={k || "all"}
                onClick={() => setAgent(k)}
                className={cn(
                  "mono h-8 shrink-0 rounded-md border px-2.5 text-[11.5px] font-semibold tracking-[0.1em] transition-colors",
                  agent === k ? "border-[rgba(0,255,120,0.45)] bg-accent-soft text-accent" : "border-border text-subtle hover:text-foreground",
                )}
              >
                {k === "" ? "ALL" : (TAG[k] ?? k)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <div
          ref={box}
          onScroll={onScroll}
          className="mono overflow-y-auto bg-[#030604] px-3 py-3 text-[11.5px] leading-[1.7] sm:text-[12px]"
          style={{ height }}
          role="log"
          aria-live="polite"
          aria-label="Agent log output"
        >
          {lines.length === 0 ? (
            <p className="text-subtle">
              <span className="text-accent">$</span> waiting for agent activity… start an objective or discovery to see live output
              <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent animate-blink" />
            </p>
          ) : (
            lines.map((l) => {
              const color = AGENT_META[l.agentKey as AgentKey]?.color ?? "#00ff78";
              return (
                <div key={l.id} className="flex gap-2 break-words hover:bg-[rgba(0,255,120,0.04)]">
                  <span className="shrink-0 text-subtle">[{hhmmss(l.createdAt)}]</span>
                  <span className="shrink-0 font-semibold" style={{ color }}>
                    {(TAG[l.agentKey] ?? l.agentKey).padEnd(compact ? 0 : 11, " ")}
                  </span>
                  <span className={cn("min-w-0", l.level === "error" ? "text-danger" : l.level === "warn" ? "text-warning" : "text-[#b8d6c2]")}>{l.message}</span>
                </div>
              );
            })
          )}
          {lines.length > 0 && live && (
            <div className="mt-1 text-accent">
              <span>$</span>
              <span className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent animate-blink" />
            </div>
          )}
        </div>
        {!stick && (
          <button
            onClick={() => {
              setStick(true);
              if (box.current) box.current.scrollTop = box.current.scrollHeight;
            }}
            className="mono absolute bottom-3 right-3 flex h-9 items-center gap-1.5 rounded-lg border border-border-strong bg-[#08100c] px-3 text-[11.5px] font-semibold tracking-wider text-accent shadow-[0_0_16px_-4px_rgba(0,255,120,0.5)]"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" /> LATEST
          </button>
        )}
      </div>
      {error && <div className="mono border-t border-border px-3 py-1.5 text-[11.5px] text-danger">Stream error: {error}</div>}
    </div>
  );
}
