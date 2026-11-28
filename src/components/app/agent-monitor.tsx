"use client";

import { motion } from "framer-motion";
import { Pause, Play, Square, SquareTerminal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, ConfirmDialog, Progress, Tooltip } from "@/components/ui";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { cn, formatUsd, timeAgo } from "@/lib/utils";
import { stopAgentAction, toggleAgentAction } from "@/server/actions/agents";
import type { AgentLiveState, CommandCenterState } from "@/server/queries/command-center";
import { AgentMascot, mascotName } from "./agent-mascot";
import { AGENT_STATUS } from "./agent-meta";
import { useCommandCenter, useNow } from "./live";

function fmtRuntime(startIso: string | null, nowSec: number) {
  if (!startIso || !nowSec) return null;
  const s = Math.max(0, nowSec - Math.floor(new Date(startIso).getTime() / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m ${String(s % 60).padStart(2, "0")}s`;
}

function Stat({ label, value, tone }: { label: string; value: React.ReactNode; tone?: string }) {
  return (
    <div className="min-w-0">
      <dt className="truncate text-[11px] text-subtle">{label}</dt>
      <dd className={cn("tabular mt-0.5 truncate text-[14px] font-semibold", tone ?? "text-foreground")}>{value}</dd>
    </div>
  );
}

export function AgentCard({ a, index, nowSec, canControl }: { a: AgentLiveState; index: number; nowSec: number; canControl: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [confirmStop, setConfirmStop] = useState(false);
  const st = AGENT_STATUS[a.status];
  const running = a.status === "running";
  const pct = a.progress ? Math.round((a.progress.done / a.progress.total) * 100) : null;
  const remaining = a.progress ? a.progress.total - a.progress.done : a.pending + a.running;
  const runtime = running ? fmtRuntime(a.runtimeStartedAt, nowSec) : null;

  const toggle = (enabled: boolean) =>
    start(async () => {
      const r = await toggleAgentAction(a.key, enabled);
      if (!r.ok) return void toast.error(r.error);
      toast.success(enabled ? `${a.name} resumed${r.data.resumed ? ` · ${r.data.resumed} task(s) continue` : ""}` : `${a.name} paused — queued tasks will wait`);
      router.refresh();
    });
  const stop = () =>
    start(async () => {
      const r = await stopAgentAction(a.key);
      setConfirmStop(false);
      if (!r.ok) return void toast.error(r.error);
      toast.success(`${a.name} stopped · ${r.data.cancelled} queued task(s) cancelled${r.data.stillRunning ? ` · ${r.data.stillRunning} finishing its current step` : ""}`);
      router.refresh();
    });

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04 }}
      className={cn(
        "panel panel-hover relative flex flex-col overflow-hidden p-4",
        running && "border-[rgba(255,77,35,0.35)]",
        (a.status === "offline" || a.status === "failed") && "border-[rgba(180,42,37,0.2)]",
      )}
      aria-label={`${a.name}: ${st.label}`}
    >
      <header className="flex items-start gap-3">
        <div className="relative -mt-1 shrink-0" title={`${mascotName(a.key)} — ${st.label}`}>
          <AgentMascot agent={a.key} status={a.status} size={60} />
          <span
            className={cn("absolute bottom-0.5 right-0 h-3 w-3 rounded-full border-2 border-surface", a.online && a.enabled ? "bg-accent" : a.enabled ? "bg-danger" : "bg-subtle", a.online && a.enabled && "status-live text-accent")}
            title={a.online ? "Worker online" : "No worker connected"}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-semibold tracking-tight">{a.name}</h3>
          <p className="mt-0.5 truncate text-[12px] text-muted">{AGENT_META[a.key].short} agent{a.model ? ` · ${a.model.replace("claude-", "")}` : ""}</p>
        </div>
        <Tooltip content={st.explain}>
          <span className={cn("inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-[11.5px] font-medium", st.pill)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", st.dot, st.pulse && "status-live")} />
            {st.label}
          </span>
        </Tooltip>
      </header>

      <div className="mt-3.5 rounded-xl sm:min-h-[76px] border border-border-strong bg-surface-2 px-3 py-2.5">
        {running && a.objective && (
          <p className="mb-1 line-clamp-1 text-[11.5px] text-subtle">
            Objective:{" "}
            {a.runId ? (
              <Link href={`/automations/runs/${a.runId}`} className="text-muted underline-offset-2 hover:text-accent hover:underline">
                {a.objective}
              </Link>
            ) : (
              a.objective
            )}
          </p>
        )}
        <p className="text-[11.5px] font-medium text-subtle">{running ? "Doing now" : "Last activity"}</p>
        <p className={cn("mt-0.5 line-clamp-2 text-[13px] leading-snug", running ? "text-foreground" : "text-muted")}>
          {a.operation ?? <span className="text-subtle">Nothing yet — this agent has not run a task.</span>}
        </p>
      </div>

      {/* Phones show progress only while there is a run, to keep the list short. */}
      <div className={cn("mt-3", pct == null && "hidden sm:block")}>
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          <span className="text-muted">{pct != null ? "Progress in current run" : "No active run"}</span>
          {pct != null && (
            <span className="tabular font-medium text-accent">
              {a.progress!.done}/{a.progress!.total} · {pct}%
            </span>
          )}
        </div>
        <Progress value={pct ?? 0} active={pct != null && pct < 100} />
      </div>

      <dl className="mt-3.5 grid grid-cols-4 gap-2 border-t border-border pt-3">
        <Stat label="Done (30d)" value={a.completed30d} tone="text-accent" />
        <Stat label="Remaining" value={remaining} />
        <Stat label="Success" value={a.successRate == null ? "—" : `${Math.round(a.successRate * 100)}%`} tone={a.successRate != null && a.successRate < 0.8 ? "text-warning" : undefined} />
        <Stat label="API cost (30d)" value={formatUsd(a.cost30d)} />
      </dl>

      <p className="mt-2.5 text-[12px] text-subtle">
        {running && runtime ? (
          <>
            Running for <span className="tabular text-accent">{runtime}</span>
          </>
        ) : a.lastFinishedAt ? (
          <>
            Last run {timeAgo(a.lastFinishedAt)} · <span className={a.lastOutcome === "failed" ? "text-danger" : "text-muted"}>{a.lastOutcome === "failed" ? "failed" : "completed"}</span>
          </>
        ) : (
          "Never run"
        )}
        {a.failed30d > 0 && <span className="text-danger/80"> · {a.failed30d} failed (30d)</span>}
      </p>

      <footer className="mt-3.5 flex items-center gap-2">
        <Button asChild variant="secondary" size="sm" className="h-10 flex-1">
          <Link href={`/agents/${a.key}`}>View agent</Link>
        </Button>
        <Tooltip content="View logs">
          <Button asChild variant="secondary" size="icon" aria-label={`View ${a.name} logs`}>
            <Link href={`/terminal?agent=${a.key}`}>
              <SquareTerminal />
            </Link>
          </Button>
        </Tooltip>
        {canControl && (
          <>
            <Tooltip content={a.enabled ? "Pause — queued tasks wait" : "Resume"}>
              <Button variant="secondary" size="icon" aria-label={a.enabled ? `Pause ${a.name}` : `Resume ${a.name}`} disabled={pending} onClick={() => toggle(!a.enabled)}>
                {a.enabled ? <Pause /> : <Play className="text-accent" />}
              </Button>
            </Tooltip>
            <Tooltip content="Stop — pause and cancel queued tasks">
              <Button variant="secondary" size="icon" aria-label={`Stop ${a.name}`} disabled={pending || (!a.enabled && a.pending + a.waiting === 0)} onClick={() => setConfirmStop(true)} className="hover:border-danger/40 hover:text-danger">
                <Square />
              </Button>
            </Tooltip>
          </>
        )}
      </footer>

      <ConfirmDialog
        open={confirmStop}
        onOpenChange={setConfirmStop}
        title={`Stop ${a.name}?`}
        description={
          <>
            This pauses the agent and cancels its <strong className="text-foreground">{a.pending + a.waiting}</strong> queued task(s). A task that is already executing finishes its current step. You can resume the agent at any time, but cancelled tasks do not restart by themselves.
          </>
        }
        confirmLabel="Stop agent"
        loading={pending}
        onConfirm={stop}
      />
    </motion.article>
  );
}

export function AgentMonitor({ initial, canControl = false }: { initial: CommandCenterState; canControl?: boolean }) {
  const { data, error } = useCommandCenter(initial);
  const state = data ?? initial;
  const anyRunning = state.agents.some((a) => a.status === "running");
  const nowSec = useNow(anyRunning);
  return (
    <div>
      {state.workers.online === 0 && (
        <div className="mb-3 flex items-start gap-3 rounded-xl border border-[rgba(196,128,0,0.25)] bg-warning-soft px-4 py-3 text-[13px] leading-relaxed text-warning">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-warning" />
          <span>
            <strong className="font-semibold">No worker is connected.</strong> Agents are the “brains”; the worker is the machine that runs them. Until one is online, new tasks wait in the queue.{" "}
            <Link href="/health" className="underline underline-offset-2">
              See system health
            </Link>
          </span>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
        {state.agents.map((a, i) => (
          <AgentCard key={a.key} a={a} index={i} nowSec={nowSec} canControl={canControl} />
        ))}
      </div>
      {error && <p className="mt-2 text-[12px] text-danger">Live updates interrupted: {error}. Showing the last known state.</p>}
    </div>
  );
}
