"use client";

import { AlertTriangle, CircleDollarSign, Globe, Loader2, Pause, Play, Radar, Rocket, Settings2, Target, UserCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { categoryLabel } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { setAutonomousModeAction } from "@/server/actions/settings";
import type { AutonomyStatus } from "@/server/orchestrator/autopilot";

const STATE: Record<AutonomyStatus["state"], { label: string; tone: "accent" | "warning" | "danger" | "muted"; text: string }> = {
  working: { label: "ACTIVE · WORKING", tone: "accent", text: "Your agents are working through the pipeline right now." },
  standby: { label: "ACTIVE · STANDING BY", tone: "accent", text: "Everything is ready. The next batch starts automatically within a few minutes." },
  limit_reached: { label: "ACTIVE · DAILY LIMIT REACHED", tone: "warning", text: "Today's discovery limit is used up. Work resumes automatically tomorrow." },
  off_hours: { label: "ACTIVE · OUTSIDE WORKING HOURS", tone: "muted", text: "Autonomous work resumes at the start of the next working period." },
  blocked: { label: "ACTIVE · CANNOT RUN", tone: "danger", text: "Autonomous mode is on, but something is stopping it. Fix the items below." },
  paused: { label: "PAUSED", tone: "muted", text: "No new work is started. Tasks already running finish; manual objectives still work." },
};
const TONE = { accent: "text-accent border-[rgba(0,255,120,0.4)] bg-accent-soft", warning: "text-warning border-[rgba(255,191,71,0.35)] bg-warning-soft", danger: "text-danger border-[rgba(255,77,97,0.35)] bg-danger-soft", muted: "text-muted border-border bg-surface-3" };
const DOT = { accent: "bg-accent", warning: "bg-warning", danger: "bg-danger", muted: "bg-subtle" };

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[rgba(3,8,6,0.5)] p-3.5">
      <div className="flex items-center gap-2 text-muted [&>svg]:h-4 [&>svg]:w-4">
        {icon}
        <span className="truncate text-[12px]">{label}</span>
      </div>
      <p className="tabular mt-2 text-[24px] font-semibold leading-none">{value}</p>
      {sub && <p className="mt-1.5 truncate text-[11.5px] text-subtle">{sub}</p>}
    </div>
  );
}

/** The agency's operating status: what autonomous mode is doing, why it may be stopped, and today's output. */
export function AutonomyPanel({ status, canAdmin, children }: { status: AutonomyStatus; canAdmin: boolean; children?: React.ReactNode }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const st = STATE[status.state];
  const active = status.mode === "active";
  const toggle = () =>
    start(async () => {
      const r = await setAutonomousModeAction(!active);
      if (!r.ok) return void toast.error(r.error);
      toast.success(active ? "Autonomous mode paused. Running tasks will finish." : "Autonomous mode is active.");
      router.refresh();
    });
  const t = status.today;
  const hours = status.scope.startHour === 0 && status.scope.endHour === 24 && status.scope.days.length === 7 ? "24/7" : `${status.scope.startHour}:00–${status.scope.endHour}:00, ${status.scope.days.length} days a week`;
  return (
    <section className="panel brackets relative mb-5 overflow-hidden p-5 sm:p-7">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="hud-label text-accent/80">Autonomous mode</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className={cn("inline-flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px] font-semibold tracking-wide", TONE[st.tone])}>
              <span className={cn("h-2.5 w-2.5 rounded-full", DOT[st.tone], status.state === "working" && "animate-pulse-dot")} />
              {st.label}
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted">{st.text}</p>
          {status.lastBatch && (
            <p className="mt-1.5 max-w-2xl truncate text-[13px] text-subtle">
              Last batch: {status.lastBatch.objective} · {status.lastBatch.status.toLowerCase().replace(/_/g, " ")}
            </p>
          )}
        </div>
        <div className="flex flex-none flex-wrap items-center gap-2">
          {canAdmin && (
            <button type="button" onClick={toggle} disabled={pending} className={cn("flex min-h-12 items-center gap-2 rounded-xl px-5 text-[14px] font-semibold transition disabled:opacity-60", active ? "border border-border-strong bg-surface-3 text-foreground hover:border-warning" : "bg-accent text-accent-foreground shadow-[var(--glow)] hover:bg-accent-hover")}>
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {active ? "Pause operations" : "Start autonomous operations"}
            </button>
          )}
          <Link href="/settings?tab=autopilot" className="flex min-h-12 items-center gap-2 rounded-xl border border-border px-4 text-[13.5px] font-medium text-muted hover:border-border-strong hover:text-foreground">
            <Settings2 className="h-4 w-4" /> Limits &amp; scope
          </Link>
          {children}
        </div>
      </div>

      {active && status.blockers.length > 0 && (
        <ul className="relative mt-5 space-y-2">
          {status.blockers.map((b) => (
            <li key={b.key}>
              <Link href={b.href} className="flex items-start gap-3 rounded-xl border border-[rgba(255,77,97,0.3)] bg-danger-soft p-3 text-[13.5px] hover:border-danger">
                <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-danger" />
                <span className="min-w-0 flex-1">{b.text}</span>
                <span className="flex-none font-medium text-accent">Fix →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="relative mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
        <Stat icon={<Radar />} label="Discovered (24 h)" value={t.discovered} sub={`limit ${status.limits.discovery} per day`} />
        <Stat icon={<UserCheck />} label="Qualified (24 h)" value={t.qualified} />
        <Stat icon={<Globe />} label="Websites generated (24 h)" value={t.websites} sub={`limit ${status.limits.websites} per day`} />
        <Stat icon={<Rocket />} label="Deployed (24 h)" value={t.deployed} />
        <Stat icon={<CircleDollarSign />} label="AI & API cost today" value={`$${t.costUsd.toFixed(2)}`} sub={`limit $${status.limits.dailyUsd} per day`} />
        <Stat icon={<Target />} label="Open opportunities" value={status.opportunity.openDemos} sub={status.opportunity.openDemos && status.opportunity.packageName ? `≈ €${Math.round(status.opportunity.estimateCents / 100).toLocaleString("nl-NL")} at ${status.opportunity.packageName} price (estimate)` : "demos ready, not yet sold"} />
      </div>

      <div className="relative mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-muted">
        <span>
          <b className="tabular font-semibold text-foreground">{status.workersOnline}</b> worker{status.workersOnline === 1 ? "" : "s"} online
        </span>
        <span>
          <b className="tabular font-semibold text-foreground">{status.tasks.running}</b> tasks executing
        </span>
        <span>
          <b className="tabular font-semibold text-foreground">{status.tasks.waiting}</b> waiting in queue
        </span>
        <span>
          <b className="tabular font-semibold text-foreground">{status.tasks.approval}</b> need your approval
        </span>
        <span className="min-w-0 truncate">
          Scope: {status.scope.country} · {status.scope.cities.slice(0, 3).join(", ")}
          {status.scope.cities.length > 3 ? ` +${status.scope.cities.length - 3}` : ""} · {status.scope.categories.slice(0, 2).map(categoryLabel).join(", ")}
          {status.scope.categories.length > 2 ? ` +${status.scope.categories.length - 2}` : ""} · {hours}
        </span>
      </div>
    </section>
  );
}
