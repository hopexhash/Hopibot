"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EmptyState, Select } from "@/components/ui";
import { AGENT_KEYS, AGENT_META, type AgentKey } from "@/lib/constants";
import { cn, formatTime } from "@/lib/utils";

export type ActivityItem = {
  id: number;
  agentKey: string;
  level: string;
  message: string;
  createdAt: string;
  taskId: string | null;
  runId: string | null;
  businessId?: string | null;
  businessName?: string | null;
};

function agentName(key: string) {
  return AGENT_META[key as AgentKey]?.name ?? (key === "orchestrator" ? "Orchestrator" : key === "custom" ? "Custom agent" : key);
}

type Kind = "success" | "info" | "warn" | "error";
/** Status derived from the real log line (level + whether it reports completion). */
function kindOf(it: ActivityItem): Kind {
  if (it.level === "error") return "error";
  if (it.level === "warn") return "warn";
  return /^(Completed|Run completed|Preview deployed|QC score .* passed|Saved|Recorded|Discovered|Drafted|Research complete)/i.test(it.message) ? "success" : "info";
}
const KIND: Record<Kind, { icon: typeof Info; cls: string; label: string }> = {
  success: { icon: CircleCheck, cls: "text-accent", label: "Done" },
  info: { icon: Info, cls: "text-info", label: "Info" },
  warn: { icon: TriangleAlert, cls: "text-warning", label: "Warning" },
  error: { icon: CircleAlert, cls: "text-danger", label: "Failed" },
};

/**
 * Live activity feed of real agent log entries. Polls for new entries every few seconds
 * (paused while the tab is hidden); filters are applied on the server.
 */
export function ActivityFeed({ initial, className, agent: fixedAgent, height = 440, filters = true }: { initial: ActivityItem[]; className?: string; agent?: string; height?: number; filters?: boolean }) {
  const [items, setItems] = useState(initial);
  const [agent, setAgent] = useState(fixedAgent ?? "");
  const [level, setLevel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const lastId = useRef(initial[0]?.id ?? 0);
  const first = useRef(true);

  useEffect(() => {
    let stop = false;
    const qs = (extra: string) => `/api/activity?${agent ? `agent=${agent}&` : ""}${level ? `level=${level}&` : ""}${extra}`;
    const load = async (reset: boolean) => {
      if (!reset && document.hidden) return;
      try {
        const res = await fetch(qs(reset ? "limit=60" : `after=${lastId.current}&limit=50`), { cache: "no-store" });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `HTTP ${res.status}`);
        const { items: fresh } = (await res.json()) as { items: ActivityItem[] };
        if (stop) return;
        if (reset) {
          setItems(fresh);
          lastId.current = fresh[0]?.id ?? lastId.current;
        } else if (fresh.length) {
          lastId.current = Math.max(lastId.current, ...fresh.map((f) => f.id));
          setItems((cur) => [...fresh, ...cur].slice(0, 200));
        }
        setError(null);
      } catch (e) {
        if (!stop) setError((e as Error).message);
      }
    };
    // The server-rendered list already matches the default filter; only refetch when filters change.
    if (!first.current) void load(true);
    first.current = false;
    const iv = setInterval(() => void load(false), 4000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, [agent, level]);

  return (
    <div className={cn("panel flex min-w-0 flex-col", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3">
        <span className="relative flex h-2 w-2">
          <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60", error ? "bg-danger" : "animate-ping bg-accent")} />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", error ? "bg-danger" : "bg-accent")} />
        </span>
        <h3 className="text-[14px] font-semibold tracking-tight">Activity feed</h3>
        {error && <span className="text-[12px] text-danger">Paused: {error}</span>}
        <div className="flex-1" />
        {filters && (
          <div className="flex w-full gap-2 sm:w-auto">
            {!fixedAgent && (
              <Select value={agent} onChange={(e) => setAgent(e.target.value)} aria-label="Filter by agent" className="h-9 min-w-0 flex-1 text-[13px] sm:h-9 sm:w-44 sm:flex-none">
                <option value="">All agents</option>
                <option value="orchestrator">Orchestrator</option>
                {AGENT_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {AGENT_META[k].name}
                  </option>
                ))}
              </Select>
            )}
            <Select value={level} onChange={(e) => setLevel(e.target.value)} aria-label="Filter by status" className="h-9 min-w-0 flex-1 text-[13px] sm:h-9 sm:w-40 sm:flex-none">
              <option value="">All activity</option>
              <option value="warn">Warnings & failures</option>
              <option value="error">Failures only</option>
            </Select>
          </div>
        )}
      </div>
      <div className="overflow-y-auto px-2 py-2" style={{ maxHeight: height }}>
        {items.length === 0 ? (
          <EmptyState
            icon={<Activity />}
            title={agent || level ? "Nothing matches these filters" : "No activity yet"}
            description={agent || level ? "Try a different agent or show all activity." : "When your agents start working, every step shows up here in real time."}
          />
        ) : (
          <ol>
            <AnimatePresence initial={false}>
              {items.map((it) => {
                const k = KIND[kindOf(it)];
                const Icon = k.icon;
                return (
                  <motion.li key={it.id} layout="position" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex gap-3 rounded-xl px-2 py-2 hover:bg-[rgba(0,255,120,0.035)]">
                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", k.cls)} strokeWidth={2} aria-label={k.label} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] leading-snug">
                        <span className="font-medium">{agentName(it.agentKey)}</span>{" "}
                        <span className={cn("text-muted", it.level === "error" && "text-danger", it.level === "warn" && "text-warning")}>{it.message}</span>
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[11.5px] text-subtle">
                        <time className="tabular" dateTime={it.createdAt} suppressHydrationWarning>
                          {formatTime(it.createdAt)}
                        </time>
                        {it.businessId && it.businessName && (
                          <Link href={`/businesses/${it.businessId}`} className="max-w-[55%] truncate text-muted underline-offset-2 hover:text-accent hover:underline">
                            {it.businessName}
                          </Link>
                        )}
                        {it.runId && (
                          <Link href={`/automations/runs/${it.runId}`} className="text-accent/80 hover:text-accent">
                            View run →
                          </Link>
                        )}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        )}
      </div>
    </div>
  );
}
