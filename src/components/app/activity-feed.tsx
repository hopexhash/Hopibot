"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EmptyState } from "@/components/ui";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { cn, formatTime } from "@/lib/utils";

export type ActivityItem = { id: number; agentKey: string; level: string; message: string; createdAt: string; taskId: string | null; runId: string | null };

function agentName(key: string) {
  return AGENT_META[key as AgentKey]?.name ?? (key === "orchestrator" ? "Orchestrator" : key);
}
function agentColor(key: string) {
  return AGENT_META[key as AgentKey]?.color ?? "var(--muted)";
}

/** Live feed: polls for new log entries every few seconds (pauses while the tab is hidden). */
export function ActivityFeed({ initial, className, agent, height = 420 }: { initial: ActivityItem[]; className?: string; agent?: string; height?: number }) {
  const [items, setItems] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const lastId = useRef(initial[0]?.id ?? 0);

  useEffect(() => {
    let stop = false;
    const tick = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(`/api/activity?after=${lastId.current}&limit=50`, { cache: "no-store" });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? `HTTP ${res.status}`);
        const { items: fresh } = (await res.json()) as { items: ActivityItem[] };
        const filtered = agent ? fresh.filter((f) => f.agentKey === agent) : fresh;
        if (fresh.length) lastId.current = Math.max(lastId.current, ...fresh.map((f) => f.id));
        if (!stop && filtered.length) setItems((cur) => [...filtered, ...cur].slice(0, 200));
        setError(null);
      } catch (e) {
        setError((e as Error).message);
      }
    };
    const iv = setInterval(tick, 4000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, [agent]);

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <h3 className="text-[13px] font-semibold tracking-tight">Live activity</h3>
        </div>
        {error && <span className="text-[11px] text-danger">Feed paused: {error}</span>}
      </div>
      <div className="overflow-y-auto pr-1" style={{ maxHeight: height }}>
        {items.length === 0 ? (
          <EmptyState icon={<Activity />} title="No agent activity yet" description="Start an objective or a discovery campaign — agent actions will stream in here." />
        ) : (
          <ol className="relative space-y-0.5">
            <AnimatePresence initial={false}>
              {items.map((it) => (
                <motion.li
                  key={it.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="group flex gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-2"
                >
                  <span className="tabular w-11 shrink-0 pt-px text-[11px] text-subtle">{formatTime(it.createdAt)}</span>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: it.level === "error" ? "var(--danger)" : it.level === "warn" ? "var(--warning)" : agentColor(it.agentKey) }} />
                  <span className="min-w-0 text-[12.5px] leading-snug">
                    <span className="font-medium">{agentName(it.agentKey)}</span>
                    <span className={cn("text-muted", it.level === "error" && "text-danger", it.level === "warn" && "text-warning")}> — {it.message}</span>
                    {it.runId && (
                      <Link href={`/automations/runs/${it.runId}`} className="ml-1.5 text-[11px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        run →
                      </Link>
                    )}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ol>
        )}
      </div>
    </div>
  );
}
