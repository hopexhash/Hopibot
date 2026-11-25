"use client";

import { motion } from "framer-motion";
import { SquareTerminal } from "lucide-react";
import Link from "next/link";
import { AGENT_META } from "@/lib/constants";
import { cn, timeAgo } from "@/lib/utils";
import type { AgentLiveState, CommandCenterState } from "@/server/queries/command-center";
import { useCommandCenter, useNow } from "./live";

const STATUS: Record<AgentLiveState["status"], { label: string; cls: string; dot: string; pulse?: boolean }> = {
  running: { label: "RUNNING", cls: "text-accent glow-text", dot: "bg-accent text-accent", pulse: true },
  queued: { label: "QUEUED", cls: "text-warning", dot: "bg-warning text-warning" },
  waiting: { label: "AWAITING APPROVAL", cls: "text-warning", dot: "bg-warning text-warning" },
  idle: { label: "IDLE", cls: "text-muted", dot: "bg-green-3 text-green-3" },
  disabled: { label: "DISABLED", cls: "text-subtle", dot: "bg-subtle text-subtle" },
  offline: { label: "NO WORKER", cls: "text-danger", dot: "bg-danger text-danger" },
};

function fmtRuntime(startIso: string | null, nowSec: number) {
  if (!startIso || !nowSec) return "--:--:--";
  const s = Math.max(0, nowSec - Math.floor(new Date(startIso).getTime() / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60].map((v) => String(v).padStart(2, "0")).join(":");
}

function Blocks({ pct }: { pct: number }) {
  const filled = Math.round(pct / 10);
  return (
    <span className="mono tracking-[-0.05em]" aria-hidden>
      <span className="text-accent drop-shadow-[0_0_4px_rgba(0,255,102,0.8)]">{"█".repeat(filled)}</span>
      <span className="text-[rgba(0,255,102,0.18)]">{"░".repeat(10 - filled)}</span>
    </span>
  );
}

export function AgentCard({ a, index, nowSec }: { a: AgentLiveState; index: number; nowSec: number }) {
  const st = STATUS[a.status];
  const pct = a.progress ? Math.round((a.progress.done / a.progress.total) * 100) : null;
  const running = a.status === "running";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={cn(
        "panel brackets panel-hover relative flex flex-col overflow-hidden p-4",
        running && "scanline border-[rgba(0,255,102,0.35)] shadow-[0_0_28px_-8px_rgba(0,255,102,0.45)]",
        a.status === "offline" && "border-[rgba(255,69,69,0.18)]",
      )}
      aria-label={`${a.name}: ${st.label}`}
    >
      <header className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="mono flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border-strong text-[11px] font-bold text-accent">{index + 1}</span>
          <h3 className="mono truncate text-[12.5px] font-bold uppercase tracking-[0.14em]">{a.name}</h3>
        </div>
        <span className={cn("mono shrink-0 rounded border px-1.5 py-0.5 text-[9.5px] font-bold tracking-[0.14em]", a.online && a.enabled ? "border-[rgba(0,255,102,0.35)] text-accent" : "border-[rgba(255,69,69,0.3)] text-danger")}>
          {!a.enabled ? "DISABLED" : a.online ? "ONLINE" : "OFFLINE"}
        </span>
      </header>

      <div className="mono mt-3 flex items-center gap-2 text-[12px] font-semibold tracking-[0.1em]">
        <span className={cn("h-2 w-2 rounded-full", st.dot, st.pulse && "animate-pulse-dot")} />
        <span className={st.cls}>{st.label}</span>
        {(a.pending > 0 || a.waiting > 0) && <span className="ml-auto text-[10.5px] font-normal tracking-normal text-subtle">{a.pending} queued{a.waiting ? ` · ${a.waiting} waiting` : ""}</span>}
      </div>

      <div className="mt-3 min-h-[52px] rounded-lg border border-border bg-[#060b08] px-3 py-2">
        <div className="hud-label text-[9px]">{running ? "Current operation" : "Last operation"}</div>
        <p className="mono mt-1 line-clamp-2 text-[11.5px] leading-snug text-foreground/90">
          {a.operation ?? <span className="text-subtle">No activity recorded yet</span>}
          {running && <span className="ml-0.5 inline-block h-3 w-[7px] translate-y-[2px] bg-accent animate-blink" />}
        </p>
        {a.operationAt && !running && <p className="mono mt-0.5 text-[10px] text-subtle">{timeAgo(a.operationAt)}</p>}
      </div>

      <div className="mono mt-3 flex items-center justify-between gap-2 text-[11.5px]">
        <span className="text-muted">Progress</span>
        {pct != null ? (
          <span className="flex items-center gap-2">
            <Blocks pct={pct} />
            <span className="w-9 text-right text-accent">{pct}%</span>
          </span>
        ) : (
          <span className="text-subtle">— no active run</span>
        )}
      </div>

      <dl className="mono mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center">
        <div>
          <dt className="text-[9.5px] tracking-[0.12em] text-subtle">DONE 30D</dt>
          <dd className="tabular text-[15px] font-semibold text-accent">{a.completed30d}</dd>
        </div>
        <div>
          <dt className="text-[9.5px] tracking-[0.12em] text-subtle">FAILED</dt>
          <dd className={cn("tabular text-[15px] font-semibold", a.failed30d ? "text-danger" : "text-foreground/70")}>{a.failed30d}</dd>
        </div>
        <div>
          <dt className="text-[9.5px] tracking-[0.12em] text-subtle">RUNTIME</dt>
          <dd className={cn("tabular text-[13px] font-semibold leading-[22px]", running ? "text-foreground" : "text-subtle")}>{running ? fmtRuntime(a.runtimeStartedAt, nowSec) : "--:--:--"}</dd>
        </div>
      </dl>

      <div className="mt-3 flex gap-2">
        <Link href={`/activity?agent=${a.key}`} className="mono flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-strong text-[11px] font-semibold tracking-[0.14em] text-accent transition-all hover:bg-accent-soft hover:shadow-[0_0_16px_-4px_rgba(0,255,102,0.5)]">
          <SquareTerminal className="h-3.5 w-3.5" /> VIEW TERMINAL
        </Link>
        <Link href={`/agents/${a.key}`} className="mono flex h-10 items-center justify-center rounded-lg border border-border px-3 text-[11px] tracking-[0.1em] text-muted transition-colors hover:border-border-strong hover:text-foreground" aria-label={`${a.name} details`}>
          CONFIG
        </Link>
      </div>
      <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-[0.08] blur-2xl" style={{ background: AGENT_META[a.key].color }} />
    </motion.article>
  );
}

export function AgentMonitor({ initial }: { initial: CommandCenterState }) {
  const { data, error } = useCommandCenter(initial);
  const state = data ?? initial;
  const anyRunning = state.agents.some((a) => a.status === "running");
  const nowSec = useNow(anyRunning);
  return (
    <div>
      {error && <p className="mono mb-2 text-[11px] text-danger">Live updates paused: {error}</p>}
      {state.workers.online === 0 && (
        <div className="mono mb-3 rounded-lg border border-[rgba(255,209,102,0.25)] bg-warning-soft px-3 py-2 text-[11px] leading-relaxed text-warning">
          NO WORKER CONNECTED — tasks will queue until a worker process is running (see docs/DEPLOYMENT.md §4).
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {state.agents.map((a, i) => (
          <AgentCard key={a.key} a={a} index={i} nowSec={nowSec} />
        ))}
      </div>
    </div>
  );
}
