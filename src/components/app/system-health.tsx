"use client";

import Link from "next/link";
import { cn, timeAgo } from "@/lib/utils";
import type { HealthCheck, HealthState } from "@/server/health";
import { useSystemHealth } from "./live";

const STATE: Record<HealthState, { label: string; cls: string; dot: string; pulse?: boolean }> = {
  operational: { label: "OPERATIONAL", cls: "text-accent", dot: "bg-accent text-accent", pulse: true },
  connected: { label: "CONNECTED", cls: "text-accent", dot: "bg-accent text-accent" },
  degraded: { label: "DEGRADED", cls: "text-warning", dot: "bg-warning text-warning" },
  offline: { label: "OFFLINE", cls: "text-danger", dot: "bg-danger text-danger" },
  error: { label: "ERROR", cls: "text-danger", dot: "bg-danger text-danger" },
  untested: { label: "UNTESTED", cls: "text-warning", dot: "bg-warning text-warning" },
  mock: { label: "MOCK MODE", cls: "text-warning", dot: "bg-warning text-warning" },
  not_configured: { label: "NOT SET", cls: "text-subtle", dot: "bg-subtle text-subtle" },
};

export function SystemHealth({ initial, detailed = false }: { initial: { checks: HealthCheck[]; checkedAt: string }; detailed?: boolean }) {
  const { data, error } = useSystemHealth(initial);
  const h = data ?? initial;
  const workers = h.checks.find((c) => c.key === "workers");
  return (
    <div className="panel flex h-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="mono text-[11.5px] font-semibold uppercase tracking-[0.16em]">
          <span className="text-accent">›</span> HOPI Bot System Health
        </h3>
        <span className="mono text-[10px] text-subtle">{error ? <span className="text-danger">stale</span> : timeAgo(h.checkedAt)}</span>
      </div>
      <ul className="mono flex-1 divide-y divide-[rgba(0,255,102,0.06)] text-[11.5px]">
        {h.checks.map((c) => {
          const st = STATE[c.state];
          const label = c.key === "workers" ? `${(c.detail.match(/^\d+\/\d+/) ?? ["?"])[0]} ONLINE` : st.label;
          return (
            <li key={c.key} className="flex items-center gap-2.5 py-2" title={c.detail}>
              <span className={cn("h-2 w-2 shrink-0 rounded-full", st.dot, st.pulse && "animate-pulse-dot")} />
              <span className="min-w-0 flex-1 truncate uppercase tracking-[0.08em] text-foreground/85">{c.label}</span>
              {detailed && <span className="hidden max-w-[40%] truncate text-[10.5px] text-subtle sm:block">{c.detail}</span>}
              <span className={cn("shrink-0 text-[10.5px] font-semibold tracking-[0.1em]", c.key === "workers" ? STATE[c.state].cls : st.cls)}>{label}</span>
            </li>
          );
        })}
      </ul>
      {workers && workers.state !== "operational" && (
        <p className="mono mt-3 rounded-lg border border-[rgba(255,209,102,0.2)] bg-warning-soft px-3 py-2 text-[10.5px] leading-relaxed text-warning">
          {workers.state === "offline" ? "No agent worker is running — queued tasks wait until one connects." : "Some agents have no live worker."}
        </p>
      )}
      <Link href="/integrations" className="mono mt-3 text-[10.5px] tracking-[0.1em] text-accent/80 hover:text-accent">
        RE-TEST API CONNECTIONS →
      </Link>
    </div>
  );
}
