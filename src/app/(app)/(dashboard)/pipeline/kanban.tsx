"use client";

import { DndContext, PointerSensor, KeyboardSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { ArrowRightLeft, CalendarClock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { DropdownContent, DropdownItem, DropdownMenu, DropdownTrigger, MockBadge } from "@/components/ui";
import { PIPELINE_STAGES } from "@/lib/constants";
import { cn, formatDate, formatEur } from "@/lib/utils";
import { updateBusinessAction } from "@/server/actions/businesses";

export type Deal = { id: string; name: string; city: string | null; category: string; stage: string; valueCents: number | null; followUpAt: string | null; leadScore: number | null; isMock: boolean };

function Card({ deal, onMove }: { deal: Deal; onMove: (id: string, to: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: deal.id });
  const overdue = deal.followUpAt && new Date(deal.followUpAt) < new Date();
  return (
    <div
      ref={setNodeRef}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={cn("rounded-xl border border-border bg-surface p-3 transition-shadow", isDragging && "z-50 rotate-1 border-border-strong shadow-[0_0_30px_-8px_rgba(0,255,120,0.5)]")}
    >
      <div className="flex items-start justify-between gap-2">
        <Link href={`/businesses/${deal.id}`} className="line-clamp-2 min-w-0 text-[13.5px] font-medium hover:text-accent">
          {deal.name}
        </Link>
        {deal.isMock && <MockBadge />}
      </div>
      <p className="mt-0.5 text-[12px] text-muted">
        {deal.city ?? "—"}
        {deal.leadScore != null && <span className="text-subtle"> · score {deal.leadScore}</span>}
      </p>
      <div className="mt-2 flex items-center justify-between text-[12px]">
        <span className="tabular font-medium">{deal.valueCents ? formatEur(deal.valueCents) : <span className="font-normal text-subtle">No value yet</span>}</span>
        {deal.followUpAt && (
          <span className={cn("inline-flex items-center gap-1", overdue ? "text-danger" : "text-muted")}>
            <CalendarClock className="h-3.5 w-3.5" /> {formatDate(deal.followUpAt)}
          </span>
        )}
      </div>
      <div className="mt-2.5 flex items-center gap-2 border-t border-border pt-2">
        {/* Drag handle for mouse and keyboard; the menu is the touch-friendly way to move a lead. */}
        <button {...listeners} {...attributes} className="hidden h-8 flex-1 cursor-grab touch-none items-center rounded-lg px-2 text-left text-[12px] text-subtle hover:bg-accent-soft hover:text-accent active:cursor-grabbing md:flex" aria-label={`Drag ${deal.name}`}>
          Drag to move
        </button>
        <DropdownMenu>
          <DropdownTrigger asChild>
            <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-border text-[12.5px] font-medium text-muted hover:border-border-strong hover:text-accent md:h-8 md:flex-none md:px-2.5" aria-label={`Move ${deal.name} to another stage`}>
              <ArrowRightLeft className="h-3.5 w-3.5" /> Move
            </button>
          </DropdownTrigger>
          <DropdownContent className="max-h-72 w-56 overflow-y-auto">
            {PIPELINE_STAGES.filter((s) => s.key !== deal.stage).map((s) => (
              <DropdownItem key={s.key} onSelect={() => onMove(deal.id, s.key)}>
                {s.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function Column({ stage, label, deals, onMove }: { stage: string; label: string; deals: Deal[]; onMove: (id: string, to: string) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const value = deals.reduce((s, d) => s + (d.valueCents ?? 0), 0);
  return (
    <div className="flex w-[78vw] max-w-[290px] shrink-0 snap-start flex-col sm:w-64">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-[13px] font-semibold">
          {label} <span className="tabular ml-1 rounded-md bg-surface-3 px-1.5 text-[11.5px] font-normal text-muted">{deals.length}</span>
        </span>
        {value > 0 && <span className="tabular text-[12px] text-muted">{formatEur(value)}</span>}
      </div>
      <div ref={setNodeRef} className={cn("flex min-h-40 flex-1 flex-col gap-2 rounded-2xl border border-dashed border-border bg-surface-2/60 p-2 transition-colors", isOver && "border-accent bg-accent-soft")}>
        {deals.map((d) => (
          <Card key={d.id} deal={d} onMove={onMove} />
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

  const move = (id: string, to: string) => {
    const deal = deals.find((d) => d.id === id);
    if (!deal || deal.stage === to) return;
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
  const onDragEnd = (e: DragEndEvent) => {
    if (e.over?.id) move(String(e.active.id), String(e.over.id));
  };

  return (
    <DndContext id="crm-board" sensors={sensors} onDragEnd={onDragEnd}>
      <div className="-mx-3.5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-3.5 px-3.5 pb-4 sm:-mx-6 sm:snap-none sm:px-6 lg:-mx-8 lg:px-8">
        {PIPELINE_STAGES.map((s) => (
          <Column key={s.key} stage={s.key} label={s.label} deals={deals.filter((d) => d.stage === s.key)} onMove={move} />
        ))}
      </div>
    </DndContext>
  );
}
