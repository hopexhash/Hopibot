"use client";

import "@xyflow/react/dist/style.css";
import { Background, BaseEdge, Controls, getBezierPath, Handle, Position, ReactFlow, type Edge, type EdgeProps, type Node, type NodeProps } from "@xyflow/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AGENT_META, type AgentKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { AgentLiveState, CommandCenterState } from "@/server/queries/command-center";
import { useCommandCenter } from "./live";

type AgentNodeData = { label: string; color: string; state: AgentLiveState | null; orchestrator?: { active: number; workersOnline: number; total: number } };
type FlowEdgeData = { active: boolean; failed: boolean };

const SIDES = [
  { id: "t", pos: Position.Top },
  { id: "b", pos: Position.Bottom },
  { id: "l", pos: Position.Left },
  { id: "r", pos: Position.Right },
];

function AgentNode({ data }: NodeProps<Node<AgentNodeData>>) {
  const s = data.state;
  const orch = data.orchestrator;
  const running = orch ? orch.active > 0 : s?.status === "running";
  const queued = !running && (s?.status === "queued" || s?.status === "waiting");
  const failed = (s?.failedLastHour ?? 0) > 0;
  const offline = s?.status === "offline";
  return (
    <div
      className={cn(
        "relative w-[188px] rounded-xl border bg-[#07100b]/95 px-3 py-2.5 backdrop-blur transition-all duration-500",
        running ? "border-[rgba(0,255,102,0.7)] shadow-[0_0_28px_-4px_rgba(0,255,102,0.6)]" : queued ? "border-[rgba(255,209,102,0.45)]" : "border-[rgba(0,255,102,0.18)]",
        failed && "ring-1 ring-[rgba(255,69,69,0.6)]",
      )}
    >
      {SIDES.map((h) => (
        <Handle key={`s-${h.id}`} id={`s-${h.id}`} type="source" position={h.pos} className="!h-1.5 !w-1.5 !border-0 !bg-[rgba(0,255,102,0.5)]" />
      ))}
      {SIDES.map((h) => (
        <Handle key={`t-${h.id}`} id={`t-${h.id}`} type="target" position={h.pos} className="!h-1.5 !w-1.5 !border-0 !bg-transparent" />
      ))}
      <div className="flex items-center gap-2">
        <span
          className={cn("h-2.5 w-2.5 shrink-0 rounded-full", running ? "bg-accent text-accent animate-pulse-dot" : queued ? "bg-warning" : offline ? "bg-danger" : "bg-[#1f3b2a]")}
          style={running ? undefined : { boxShadow: `0 0 0 3px ${data.color}22` }}
        />
        <span className="mono truncate text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">{data.label}</span>
      </div>
      <div className="mono mt-1.5 text-[10px] tracking-[0.08em]">
        {orch ? (
          <span className={running ? "text-accent" : "text-muted"}>
            {orch.active} ACTIVE · {orch.workersOnline}/{orch.total} WORKERS
          </span>
        ) : s ? (
          <span className={running ? "text-accent glow-text" : queued ? "text-warning" : offline ? "text-danger" : "text-muted"}>
            {running ? `RUNNING ×${s.running}` : queued ? `${s.pending} QUEUED${s.waiting ? ` · ${s.waiting} WAIT` : ""}` : offline ? "NO WORKER" : s.status.toUpperCase()}
          </span>
        ) : null}
      </div>
      {s && (
        <div className="mono mt-1 flex justify-between text-[9.5px] text-subtle">
          <span>✓ {s.completed30d}</span>
          <span className={s.failed30d ? "text-danger/80" : ""}>✕ {s.failed30d}</span>
        </div>
      )}
      {failed && (
        <span className="mono absolute -right-2 -top-2 rounded-md border border-[rgba(255,69,69,0.6)] bg-[#2a0d0d] px-1.5 py-0.5 text-[9px] font-bold text-danger shadow-[0_0_12px_-2px_rgba(255,69,69,0.7)]">
          {s!.failedLastHour} FAILED
        </span>
      )}
    </div>
  );
}

function FlowEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, label }: EdgeProps<Edge<FlowEdgeData>>) {
  const [path, lx, ly] = getBezierPath({ sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, curvature: 0.35 });
  const active = data?.active;
  const failed = data?.failed;
  const stroke = failed ? "rgba(255,69,69,0.7)" : active ? "#00ff66" : "rgba(0,255,102,0.22)";
  return (
    <>
      <BaseEdge id={id} path={path} style={{ stroke, strokeWidth: active ? 2 : 1.25, strokeDasharray: failed ? "4 5" : undefined, filter: active ? "drop-shadow(0 0 4px rgba(0,255,102,0.8))" : undefined }} />
      {active && (
        <>
          <path d={path} fill="none" stroke="#b9ffd4" strokeWidth={1.5} strokeDasharray="2 14" strokeLinecap="round" style={{ animation: "dashflow 0.9s linear infinite" }} />
          <circle r="3.5" fill="#00ff66" style={{ filter: "drop-shadow(0 0 6px #00ff66)" }}>
            <animateMotion dur="1.8s" repeatCount="indefinite" path={path} />
          </circle>
        </>
      )}
      {label && (
        <text x={lx} y={ly - 6} textAnchor="middle" className="mono" style={{ fontSize: 9, fill: "rgba(130,150,138,0.9)", letterSpacing: "0.1em" }}>
          {label}
        </text>
      )}
    </>
  );
}

const nodeTypes = { agent: AgentNode };
const edgeTypes = { flow: FlowEdge };

const PIPE: { from: string; to: AgentKey; label?: string }[] = [
  { from: "orchestrator", to: "lead_finder" },
  { from: "lead_finder", to: "research" },
  { from: "research", to: "contact_research" },
  { from: "contact_research", to: "website_builder" },
  { from: "website_builder", to: "quality_control" },
  { from: "quality_control", to: "website_builder", label: "FIX <85" },
  { from: "quality_control", to: "deployment" },
  { from: "deployment", to: "sales" },
];

function layout(vertical: boolean) {
  if (vertical) {
    const order = ["orchestrator", "lead_finder", "research", "contact_research", "website_builder", "quality_control", "deployment", "sales"];
    return Object.fromEntries(order.map((k, i) => [k, { x: 0, y: i * 118 }])) as Record<string, { x: number; y: number }>;
  }
  return {
    orchestrator: { x: 0, y: 120 },
    lead_finder: { x: 250, y: 20 },
    research: { x: 500, y: 20 },
    contact_research: { x: 750, y: 20 },
    website_builder: { x: 1000, y: 20 },
    quality_control: { x: 1000, y: 230 },
    deployment: { x: 750, y: 230 },
    sales: { x: 500, y: 230 },
  } as Record<string, { x: number; y: number }>;
}

function handlesFor(from: string, to: string, vertical: boolean): { sourceHandle: string; targetHandle: string } {
  if (from === "quality_control" && to === "website_builder") return vertical ? { sourceHandle: "s-r", targetHandle: "t-r" } : { sourceHandle: "s-l", targetHandle: "t-l" };
  if (vertical) return { sourceHandle: "s-b", targetHandle: "t-t" };
  if (from === "website_builder" && to === "quality_control") return { sourceHandle: "s-b", targetHandle: "t-t" };
  if (from === "quality_control" || from === "deployment") return { sourceHandle: "s-l", targetHandle: "t-r" };
  return { sourceHandle: "s-r", targetHandle: "t-l" };
}

export function WorkflowNetwork({ initial, height = 460 }: { initial: CommandCenterState; height?: number }) {
  const { data } = useCommandCenter(initial);
  const state = data ?? initial;
  const router = useRouter();
  const wrap = useRef<HTMLDivElement>(null);
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setVertical(e.contentRect.width < 720));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const byKey = useMemo(() => Object.fromEntries(state.agents.map((a) => [a.key, a])), [state.agents]);
  const pos = layout(vertical);
  const nodes: Node<AgentNodeData>[] = [
    {
      id: "orchestrator",
      type: "agent",
      position: pos.orchestrator,
      data: { label: "Orchestrator", color: "#00ff66", state: null, orchestrator: { active: state.activeAgents, workersOnline: state.workers.online, total: state.workers.total } },
      draggable: false,
    },
    ...state.agents.map((a) => ({ id: a.key, type: "agent", position: pos[a.key], data: { label: AGENT_META[a.key].name, color: AGENT_META[a.key].color, state: a }, draggable: false }) as Node<AgentNodeData>),
  ];
  const edges: Edge<FlowEdgeData>[] = PIPE.map((p) => {
    const target = byKey[p.to];
    const active = target ? target.status === "running" || target.status === "queued" : false;
    return {
      id: `${p.from}-${p.to}`,
      source: p.from,
      target: p.to,
      type: "flow",
      label: p.label,
      ...handlesFor(p.from, p.to, vertical),
      data: { active, failed: !active && (target?.failedLastHour ?? 0) > 0 },
    };
  });

  return (
    <div ref={wrap} className="panel relative overflow-hidden" style={{ height: vertical ? 1040 : height }}>
      <style>{`@keyframes dashflow { to { stroke-dashoffset: -32; } }`}</style>
      <div className="mono pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-3 text-[9.5px] tracking-[0.12em] text-subtle">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded bg-accent shadow-[0_0_6px_#00ff66]" /> ACTIVE</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded bg-[rgba(0,255,102,0.22)]" /> IDLE</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-4 rounded bg-danger/70" /> FAILED (1H)</span>
      </div>
      <ReactFlow
        key={vertical ? "v" : "h"}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: vertical ? 0.08 : 0.15 }}
        proOptions={{ hideAttribution: true }}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={false}
        zoomOnScroll={false}
        preventScrolling={false}
        minZoom={0.4}
        maxZoom={1.6}
        onNodeClick={(_, n) => router.push(n.id === "orchestrator" ? "/automations" : `/agents/${n.id}`)}
        style={{ background: "transparent" }}
      >
        <Background gap={22} size={1} color="rgba(0,255,102,0.09)" />
        {!vertical && <Controls showInteractive={false} position="bottom-right" />}
      </ReactFlow>
    </div>
  );
}
