"use client";

import { DndContext, PointerSensor, KeyboardSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { CalendarClock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { MockBadge } from "@/components/ui";
import { PIPELINE_STAGES } from "@/lib/constants";
import { cn, formatDate, formatEur } from "@/lib/utils";
import { updateBusinessAction } from "@/server/actions/businesses";

export type Deal = { id: string; name: string; city: string | null; category: string; stage: string; valueCents: number | null; followUpAt: string | null; leadScore: number | null; isMock: boolean };

function Card({ deal }: { deal: Deal }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: deal.id });
  const overdue = deal.followUpAt && new Date(deal.followUpAt) < new Date();
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={cn(
        "cursor-grab touch-none rounded-lg border border-border bg-surface p-3 shadow-[var(--shadow-sm)] transition-shadow active:cursor-grabbing",
        isDragging && "z-50 rotate-1 shadow-[var(--shadow-lg)]",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <Link href={`/businesses/${deal.id}`} className="line-clamp-2 text-[13px] font-medium hover:text-accent" onPointerDown={(e) => e.stopPropagation()}>
          {deal.name}
        </Link>
        {deal.isMock && <MockBadge />}
      </div>
      <p className="mt-0.5 text-[11px] text-muted">{deal.city ?? "—"}</p>
      <div className="mt-2 flex items-center justify-between text-[11px]">
        <span className="tabular font-medium">{deal.valueCents ? formatEur(deal.valueCents) : <span className="text-subtle">No value</span>}</span>
        {deal.followUpAt && (
          <span className={cn("inline-flex items-center gap-1", overdue ? "text-danger" : "text-muted")}>
            <CalendarClock className="h-3 w-3" /> {formatDate(deal.followUpAt)}
          </span>
        )}
      </div>
    </div>
  );
}

function Column({ stage, label, deals }: { stage: string; label: string; deals: Deal[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const value = deals.reduce((s, d) => s + (d.valueCents ?? 0), 0);
  return (
    <div className="flex w-64 shrink-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-semibold">
          {label} <span className="font-normal text-muted">{deals.length}</span>
        </span>
        {value > 0 && <span className="tabular text-[11px] text-muted">{formatEur(value)}</span>}
      </div>
      <div ref={setNodeRef} className={cn("flex min-h-40 flex-1 flex-col gap-2 rounded-xl border border-dashed border-transparent bg-surface-2/70 p-2 transition-colors", isOver && "border-accent bg-accent-soft/50")}>
        {deals.map((d) => (
          <Card key={d.id} deal={d} />
        ))}
      </div>
    </div>
  );
}

export function Kanban({ deals: initial }: { deals: Deal[] }) {
  const [deals, setDeals] = useState(initial);
  const [, start] = useTransition();
  const router = useRouter();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor));

  const onDragEnd = (e: DragEndEvent) => {
    const id = String(e.active.id);
    const to = e.over?.id ? String(e.over.id) : null;
    const deal = deals.find((d) => d.id === id);
    if (!to || !deal || deal.stage === to) return;
    const prev = deals;
    setDeals((ds) => ds.map((d) => (d.id === id ? { ...d, stage: to } : d)));
    start(async () => {
      const r = await updateBusinessAction(id, { pipelineStage: to });
      if (!r.ok) {
        setDeals(prev);
        return void toast.error(r.error);
      }
      toast.success(`${deal.name} → ${PIPELINE_STAGES.find((s) => s.key === to)?.label}`);
      router.refresh();
    });
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {PIPELINE_STAGES.map((s) => (
          <Column key={s.key} stage={s.key} label={s.label} deals={deals.filter((d) => d.stage === s.key)} />
        ))}
      </div>
    </DndContext>
  );
}
