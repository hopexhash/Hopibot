"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Check, Loader2, Pause, Play, Settings2, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { categoryLabel } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { setAutonomousModeAction } from "@/server/actions/settings";
import type { AutonomyStatus } from "@/server/orchestrator/autopilot";
import { CountUp } from "./count-up";

type Tone = "live" | "ready" | "warning" | "danger" | "calm";
const STATE: Record<AutonomyStatus["state"], { title: string; tone: Tone; text: string }> = {
  working: { title: "Running", tone: "live", text: "Your agents are working through the pipeline right now." },
  standby: { title: "Standing by", tone: "ready", text: "Everything is ready. The next batch starts automatically within a few minutes." },
  limit_reached: { title: "Daily limit reached", tone: "warning", text: "Today's discovery limit is used up. Work resumes automatically tomorrow." },
  off_hours: { title: "Outside working hours", tone: "calm", text: "Autonomous work resumes at the start of the next working period." },
  blocked: { title: "Cannot run", tone: "danger", text: "Autonomous mode is on, but something is stopping it. Fix the items below." },
  paused: { title: "Paused", tone: "calm", text: "No new work is started. Tasks already running finish; manual objectives still work." },
};
const DOT: Record<Tone, string> = { live: "bg-brand text-brand", ready: "bg-success text-success", warning: "bg-warning text-warning", danger: "bg-danger text-danger", calm: "bg-subtle text-subtle" };

/** One figure of today's output: a label, the number and an optional limit, separated by hairlines rather than boxes. */
function Figure({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="min-w-0 bg-background px-4 py-4 sm:px-5">
      <p className="label-mono truncate !text-[10.5px]">{label}</p>
      <p className="tabular mt-2.5 font-display text-[26px] font-semibold leading-none tracking-[-0.03em] sm:text-[30px]">
        <CountUp value={value} />
      </p>
      {sub && <p className="mt-2 truncate text-[12px] text-subtle">{sub}</p>}
    </div>
  );
}

/**
 * Autonomous operations: the mode the admin set, what the engine is actually doing (from
 * real state), the controls, and today's output. A deep charcoal panel, like the dark
 * sections of the website.
 */
export function AutonomyPanel({ status, canAdmin, children }: { status: AutonomyStatus; canAdmin: boolean; children?: React.ReactNode }) {
  const router = useRouter();
  const reduce = useReducedMotion();
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
  const s = status.scope;
  const hours = s.startHour === 0 && s.endHour === 24 && s.days.length === 7 ? "24/7" : `${s.startHour}:00–${s.endHour}:00, ${s.days.length} days a week`;
  const cities = `${s.cities.slice(0, 3).join(", ")}${s.cities.length > 3 ? ` +${s.cities.length - 3}` : ""}`;
  const industries = `${s.categories.slice(0, 2).map(categoryLabel).join(", ")}${s.categories.length > 2 ? ` +${s.categories.length - 2}` : ""}`;

  return (
    <section className="theme-ink relative flex flex-col overflow-hidden rounded-xl" aria-label="Autonomous operations">
      {/* Only while agents are really executing: one slow line travels along the top edge. */}
      {status.state === "working" && <span className="ops-running pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden />}

      <div className="flex flex-col gap-6 p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="label-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-brand" aria-hidden />
            Autonomous operations
          </p>
          <p className="label-mono !text-[10.5px]">{active ? "Mode · on" : "Mode · off"}</p>
        </div>

        <div className="min-h-[104px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={status.state} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="flex items-center gap-3.5 font-display text-[30px] font-semibold leading-none tracking-[-0.03em] sm:text-[40px]">
                <span className={cn("status-dot h-2.5 w-2.5 shrink-0 rounded-full", DOT[st.tone], st.tone === "live" && "status-live")} aria-hidden />
                {st.title}
              </h2>
              <p className="mt-3.5 max-w-xl text-[14.5px] leading-relaxed text-muted">{st.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center [&>button]:whitespace-nowrap">
          {canAdmin && (
            <button
              type="button"
              onClick={toggle}
              disabled={pending}
              aria-busy={pending}
              className={cn(
                "btn-m btn-lift flex min-h-12 items-center justify-center gap-2.5 rounded-md px-6 text-[14.5px] font-semibold active:scale-[0.98] disabled:opacity-70",
                active ? "bg-[#f2eee6] text-[#0c0c0d] hover:bg-white" : "bg-brand text-[#0c0c0d] hover:bg-brand-hover",
              )}
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              {pending ? (active ? "Pausing…" : "Starting…") : active ? "Pause operations" : "Start autonomous operations"}
            </button>
          )}
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap sm:flex sm:flex-wrap sm:items-center [&>*]:w-full sm:[&>*]:w-auto [&_button]:min-h-12 [&_button]:w-full sm:[&_button]:w-auto">
            <Link href="/settings?tab=autopilot" className="btn-m flex min-h-12 items-center justify-center gap-2 rounded-md border border-border px-4 text-[13.5px] font-medium text-muted hover:border-border-strong hover:text-foreground">
              <Settings2 className="h-4 w-4" /> Limits &amp; scope
            </Link>
            {children}
          </div>
        </div>

        {active && status.blockers.length > 0 && (
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-[rgba(255,122,115,0.3)]">
            {status.blockers.map((b) => (
              <li key={b.key}>
                <Link href={b.href} className="group flex items-start gap-3 bg-danger-soft px-4 py-3 text-[13.5px] transition-colors hover:bg-[rgba(255,122,115,0.2)]">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-danger" />
                  <span className="min-w-0 flex-1 leading-snug">{b.text}</span>
                  <span className="flex flex-none items-center gap-1 font-medium text-foreground">
                    Fix <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto border-t border-border">
        <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
          <Figure label="Discovered · 24 h" value={t.discovered} sub={`limit ${status.limits.discovery} per day`} />
          <Figure label="Qualified · 24 h" value={t.qualified} />
          <Figure label="Websites · 24 h" value={t.websites} sub={`limit ${status.limits.websites} per day`} />
          <Figure label="Deployed · 24 h" value={t.deployed} />
          <Figure label="Cost today" value={`$${t.costUsd.toFixed(2)}`} sub={`limit $${status.limits.dailyUsd} per day`} />
          <Figure
            label="Open opportunities"
            value={status.opportunity.openDemos}
            sub={status.opportunity.openDemos && status.opportunity.packageName ? `≈ €${Math.round(status.opportunity.estimateCents / 100).toLocaleString("nl-NL")} at ${status.opportunity.packageName} (estimate)` : "demos ready, not yet sold"}
          />
        </div>
        <p className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border px-5 py-3.5 text-[12.5px] text-subtle sm:px-7">
          <span>
            <b className="tabular font-semibold text-foreground">{status.tasks.running}</b> executing
          </span>
          <span>
            <b className="tabular font-semibold text-foreground">{status.tasks.waiting}</b> queued
          </span>
          <span>
            <b className="tabular font-semibold text-foreground">{status.tasks.approval}</b> awaiting approval
          </span>
          <span className="min-w-0">
            {s.country} · {cities || "no cities"} · {industries || "no industries"} · {hours}
          </span>
        </p>
      </div>
    </section>
  );
}

const STAGE_LABEL: Record<string, string> = { discovery: "Discovery", contacts: "Contact discovery", inspection: "Website inspection", qualification: "Lead qualification", websites: "Generated websites", deployment: "Previews online" };
const when = (iso: string) => new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

/** The objective being pursued now, or the last one, with the stage counts the agents recorded for it. */
export function ObjectiveCard({ objective }: { objective: AutonomyStatus["objective"] }) {
  if (!objective) {
    return (
      <section className="panel flex flex-col justify-between gap-6 p-5 sm:p-7" aria-label="Last objective">
        <p className="label-mono">Last objective</p>
        <div>
          <p className="font-display text-[22px] font-semibold leading-tight tracking-[-0.02em]">No objectives yet</p>
          <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">Start autonomous operations or give your agents a manual objective. Its progress appears here, stage by stage.</p>
        </div>
      </section>
    );
  }
  const o = objective;
  const done = o.status === "COMPLETED";
  const failed = o.status === "FAILED" || o.status === "CANCELLED";
  const label = o.active ? (o.status === "WAITING_FOR_APPROVAL" ? "Waiting for your approval" : "In progress") : done ? "Completed" : o.status === "CANCELLED" ? "Cancelled" : failed ? "Failed" : o.status.toLowerCase().replace(/_/g, " ");
  const builds = o.stages.some((s) => s.key === "websites");
  return (
    <section className="panel flex flex-col p-5 sm:p-7" aria-label={o.active ? "Current objective" : "Last objective"}>
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono">{o.active ? "Current objective" : "Last objective"}</p>
        <span className={cn("flex items-center gap-1.5 text-[12.5px] font-medium", done ? "text-success" : failed ? "text-danger" : o.active ? "text-accent" : "text-muted")}>
          {done ? (
            <span className="grid h-4 w-4 place-items-center rounded-full bg-success text-white">
              <Check className="check-draw h-2.5 w-2.5" strokeWidth={3.5} />
            </span>
          ) : failed ? (
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          ) : (
            <span className={cn("h-1.5 w-1.5 rounded-full", o.active ? "status-live bg-brand text-brand" : "bg-subtle")} />
          )}
          {label}
        </span>
      </div>
      <p className="mt-4 font-display text-[19px] font-semibold leading-snug tracking-[-0.01em] first-letter:uppercase sm:text-[21px]">{o.text || "Untitled objective"}</p>
      <p className="mt-1.5 text-[12.5px] text-subtle">
        Started {when(o.startedAt)}
        {o.completedAt && !o.active ? ` · finished ${when(o.completedAt)}` : ""}
        {o.autonomous ? " · autonomous" : " · manual"}
      </p>

      {o.stages.length > 0 ? (
        <ol className="mt-6 space-y-3.5">
          {o.stages.map((s) => {
            const pct = s.target ? Math.min(100, Math.round((s.value / s.target) * 100)) : s.value > 0 ? 100 : 0;
            return (
              <li key={s.key}>
                <div className="flex items-baseline justify-between gap-3 text-[13px]">
                  <span className="text-muted">{STAGE_LABEL[s.key] ?? s.label}</span>
                  <span className="tabular whitespace-nowrap">
                    <b className="font-semibold">{s.value}</b>
                    {s.target ? <span className="text-subtle"> / {s.target}</span> : null}
                  </span>
                </div>
                <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-surface-3" role="img" aria-label={`${STAGE_LABEL[s.key] ?? s.label}: ${s.value}${s.target ? ` of ${s.target}` : ""} ${s.unit}`}>
                  <div className={cn("progress-fill h-full rounded-full", s.value > 0 ? (done ? "bg-foreground" : "bg-brand") : "bg-transparent")} data-active={o.active && s.value > 0 && pct < 100} style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
          {!builds && <li className="text-[12.5px] text-subtle">Website generation is not part of this objective.</li>}
        </ol>
      ) : (
        <p className="mt-6 text-[13px] text-muted">No stage activity was recorded for this objective.</p>
      )}

      <Link href={`/automations/runs/${o.runId}`} className="group mt-auto flex items-center gap-1.5 pt-6 text-[13px] font-medium text-foreground hover:text-accent">
        {o.active ? "Follow this objective" : "View details"} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}
