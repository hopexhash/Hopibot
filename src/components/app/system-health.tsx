"use client";

import Link from "next/link";
import { cn, timeAgo } from "@/lib/utils";
import type { HealthCheck, HealthState } from "@/server/health";
import { useSystemHealth } from "./live";

const STATE: Record<HealthState, { label: string; cls: string; dot: string; pulse?: boolean }> = {
  operational: { label: "Operational", cls: "text-success", dot: "bg-success text-success", pulse: true },
  connected: { label: "Connected", cls: "text-success", dot: "bg-success text-success" },
  degraded: { label: "Degraded", cls: "text-warning", dot: "bg-warning text-warning" },
  offline: { label: "Offline", cls: "text-danger", dot: "bg-danger text-danger" },
  error: { label: "Error", cls: "text-danger", dot: "bg-danger text-danger" },
  untested: { label: "Not tested", cls: "text-warning", dot: "bg-warning text-warning" },
  mock: { label: "Mock mode", cls: "text-warning", dot: "bg-warning text-warning" },
  not_configured: { label: "Not connected", cls: "text-subtle", dot: "bg-subtle text-subtle" },
};

export function SystemHealth({ initial, detailed = false }: { initial: { checks: HealthCheck[]; checkedAt: string }; detailed?: boolean }) {
  const { data, error } = useSystemHealth(initial);
  const h = data ?? initial;
  const workers = h.checks.find((c) => c.key === "workers");
  return (
    <div className="panel flex h-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-[14px] font-semibold tracking-tight">System health</h3>
        <span className="text-[12px] text-subtle" suppressHydrationWarning>{error ? <span className="text-danger">stale</span> : timeAgo(h.checkedAt)}</span>
      </div>
      <ul className="flex-1 divide-y divide-border text-[13px]">
        {h.checks.map((c) => {
          const st = STATE[c.state];
          const label = c.key === "workers" ? `${(c.detail.match(/^\d+\/\d+/) ?? ["?"])[0]} online` : st.label;
          return (
            <li key={c.key} className="flex items-center gap-2.5 py-2.5" title={c.detail}>
              <span className={cn("h-2 w-2 shrink-0 rounded-full", st.dot, st.pulse && "status-live")} />
              <span className="min-w-0 flex-1 truncate text-foreground/90">{c.label}</span>
              {detailed && <span className="hidden max-w-[40%] truncate text-[12px] text-subtle sm:block">{c.detail}</span>}
              <span className={cn("shrink-0 text-[12.5px] font-medium", st.cls)}>{label}</span>
            </li>
          );
        })}
      </ul>
      {workers && workers.state !== "operational" && (
        <p className="mt-3 rounded-xl border border-[rgba(196,128,0,0.2)] bg-warning-soft px-3 py-2 text-[12.5px] leading-relaxed text-warning">
          {workers.state === "offline" ? "No agent worker is running — queued tasks wait until one connects." : "Some agents have no live worker."}
        </p>
      )}
      <Link href="/integrations" className="mt-3 inline-flex h-9 items-center text-[12.5px] font-medium text-accent/90 hover:text-accent">
        Test connections again →
      </Link>
    </div>
  );
}
