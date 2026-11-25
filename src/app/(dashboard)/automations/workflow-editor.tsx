"use client";

import { ArrowDown, ArrowUp, Pencil, Play, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, Field, Input, Select, Switch, Textarea } from "@/components/ui";
import { BUSINESS_CATEGORIES, WORKFLOW_ACTIONS } from "@/lib/constants";
import { deleteWorkflowAction, runWorkflowNowAction, saveWorkflowAction, toggleWorkflowAction } from "@/server/actions/automations";

export type WorkflowDraft = {
  id: string | null;
  name: string;
  description: string;
  triggerType: "manual" | "new_qualified_lead" | "schedule";
  cron: string;
  discovery: { country: string; city: string; category: string; radiusKm: number; limit: number; minScore: number; keywords: string; businessName: string; websiteStatus: "any" | "no_website" | "has_website" } | null;
  topN: number;
  maxRunsPerDay: number;
  enabled: boolean;
  steps: { action: string; enabled: boolean }[];
};

const BLANK: WorkflowDraft = {
  id: null,
  name: "Weekly discovery campaign",
  description: "",
  triggerType: "schedule",
  cron: "0 8 * * 1",
  discovery: { country: "Netherlands", city: "Rotterdam", category: "restaurant", radiusKm: 10, limit: 25, minScore: 60, keywords: "", businessName: "", websiteStatus: "any" },
  topN: 5,
  maxRunsPerDay: 2,
  enabled: true,
  steps: WORKFLOW_ACTIONS.map((a) => ({ action: a.key, enabled: true })),
};

const CRON_PRESETS = [
  { cron: "0 8 * * 1", label: "Every Monday 08:00" },
  { cron: "0 7 * * 1-5", label: "Weekdays 07:00" },
  { cron: "0 9 1 * *", label: "1st of the month 09:00" },
];

export function WorkflowEditor({ initial, trigger }: { initial?: WorkflowDraft; trigger: "new" | "edit" }) {
  const [open, setOpen] = useState(false);
  const [w, setW] = useState<WorkflowDraft>(initial ?? BLANK);
  const [pending, start] = useTransition();
  const router = useRouter();
  const set = <K extends keyof WorkflowDraft>(k: K, v: WorkflowDraft[K]) => setW((x) => ({ ...x, [k]: v }));
  const setD = (patch: Partial<NonNullable<WorkflowDraft["discovery"]>>) => setW((x) => ({ ...x, discovery: { ...(x.discovery ?? BLANK.discovery!), ...patch } }));
  const move = (i: number, dir: -1 | 1) =>
    setW((x) => {
      const steps = [...x.steps];
      const j = i + dir;
      if (j < 0 || j >= steps.length) return x;
      [steps[i], steps[j]] = [steps[j], steps[i]];
      return { ...x, steps };
    });

  return (
    <>
      {trigger === "new" ? (
        <Button variant="primary" onClick={() => setOpen(true)}>
          <Plus /> New automation
        </Button>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
          <Pencil /> Edit
        </Button>
      )}
      <Dialog
        open={open}
        onOpenChange={setOpen}
        size="lg"
        title={w.id ? "Edit automation" : "New automation"}
        description="Safeguards: steps are idempotent per business, each workflow has a daily run cap, and spending limits pause paid agents."
        footer={
          <Button
            variant="primary"
            loading={pending}
            onClick={() =>
              start(async () => {
                const r = await saveWorkflowAction(w.id, { ...w, discovery: w.triggerType === "new_qualified_lead" ? null : w.discovery });
                if (!r.ok) return void toast.error(r.error);
                toast.success("Automation saved");
                setOpen(false);
                router.refresh();
              })
            }
          >
            Save automation
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name">
              <Input value={w.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <Field label="Trigger">
              <Select value={w.triggerType} onChange={(e) => set("triggerType", e.target.value as WorkflowDraft["triggerType"])}>
                <option value="new_qualified_lead">New qualified lead discovered</option>
                <option value="schedule">Scheduled discovery campaign</option>
                <option value="manual">Manual (run now)</option>
              </Select>
            </Field>
            <Field label="Description" className="sm:col-span-2">
              <Textarea rows={2} value={w.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </div>
          {w.triggerType === "schedule" && (
            <Field label="Schedule (cron, Europe/Amsterdam)" hint="At most hourly.">
              <div className="flex flex-wrap gap-2">
                <Input value={w.cron} onChange={(e) => set("cron", e.target.value)} className="w-40 font-mono" />
                {CRON_PRESETS.map((p) => (
                  <button key={p.cron} type="button" onClick={() => set("cron", p.cron)} className="rounded-md border border-border px-2 text-xs text-muted hover:border-accent">
                    {p.label}
                  </button>
                ))}
              </div>
            </Field>
          )}
          {w.triggerType !== "new_qualified_lead" && w.discovery && (
            <div className="grid grid-cols-2 gap-3 rounded-lg border border-border p-3 sm:grid-cols-4">
              <Field label="City">
                <Input value={w.discovery.city} onChange={(e) => setD({ city: e.target.value })} />
              </Field>
              <Field label="Category">
                <Select value={w.discovery.category} onChange={(e) => setD({ category: e.target.value })}>
                  {BUSINESS_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Businesses">
                <Input type="number" min={1} max={200} value={w.discovery.limit} onChange={(e) => setD({ limit: Number(e.target.value) })} />
              </Field>
              <Field label="Top N processed">
                <Input type="number" min={0} max={200} value={w.topN} onChange={(e) => set("topN", Number(e.target.value))} />
              </Field>
            </div>
          )}
          <div>
            <p className="mb-2 text-xs font-medium">Actions (in order)</p>
            <ol className="space-y-1.5">
              {w.steps.map((s, i) => (
                <li key={s.action} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2">
                  <span className="tabular w-5 text-xs text-subtle">{i + 1}</span>
                  <span className="flex-1 text-[13px]">{WORKFLOW_ACTIONS.find((a) => a.key === s.action)?.label}</span>
                  <Button size="icon-sm" variant="ghost" aria-label="Move up" onClick={() => move(i, -1)}>
                    <ArrowUp />
                  </Button>
                  <Button size="icon-sm" variant="ghost" aria-label="Move down" onClick={() => move(i, 1)}>
                    <ArrowDown />
                  </Button>
                  <Switch checked={s.enabled} label={`Enable ${s.action}`} onCheckedChange={(v) => setW((x) => ({ ...x, steps: x.steps.map((y) => (y.action === s.action ? { ...y, enabled: v } : y)) }))} />
                </li>
              ))}
            </ol>
            <p className="mt-1.5 text-[11px] text-muted">Sales email drafts always wait for approval; nothing is sent automatically.</p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Field label="Max runs per day">
              <Input type="number" min={1} max={500} value={w.maxRunsPerDay} onChange={(e) => set("maxRunsPerDay", Number(e.target.value))} className="w-28" />
            </Field>
            <label className="flex items-center gap-2 text-xs">
              Enabled <Switch checked={w.enabled} onCheckedChange={(v) => set("enabled", v)} label="Enabled" />
            </label>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export function WorkflowRowActions({ id, enabled, canRun }: { id: string; enabled: boolean; canRun: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center gap-1">
      <Switch
        checked={enabled}
        disabled={pending}
        label="Enable automation"
        onCheckedChange={(v) =>
          start(async () => {
            const r = await toggleWorkflowAction(id, v);
            if (!r.ok) return void toast.error(r.error);
            toast.success(v ? "Automation enabled" : "Automation paused");
            router.refresh();
          })
        }
      />
      {canRun && (
        <Button
          size="sm"
          variant="ghost"
          loading={pending}
          onClick={() =>
            start(async () => {
              const r = await runWorkflowNowAction(id);
              if (!r.ok) return void toast.error(r.error);
              toast.success("Run started");
              router.push(`/automations/runs/${r.data.runId}`);
            })
          }
        >
          <Play /> Run now
        </Button>
      )}
      <Button
        size="icon-sm"
        variant="ghost"
        aria-label="Delete"
        onClick={() =>
          confirm("Delete this automation?") &&
          start(async () => {
            const r = await deleteWorkflowAction(id);
            if (!r.ok) return void toast.error(r.error);
            router.refresh();
          })
        }
      >
        <Trash2 />
      </Button>
    </div>
  );
}
