"use client";

import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge, Button, Dialog, Field, Input, Select, Textarea } from "@/components/ui";
import { BUSINESS_CATEGORIES, WORKFLOW_ACTIONS } from "@/lib/constants";
import { planObjectiveAction, startObjectiveAction } from "@/server/actions/orchestrator";
import type { RunPlan } from "@/server/orchestrator/runs";

const EXAMPLES = [
  "Find 50 restaurants in Rotterdam that have outdated websites. Research them, create professional website previews for the 10 best prospects and prepare personalised sales emails.",
  "Find 20 dentists in Utrecht without a website and build previews for the best 5.",
  "Discover 30 plumbers in Den Haag and research the top 10.",
];

export function ObjectiveDialog() {
  const params = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(params.get("objective") === "1");
  const [objective, setObjective] = useState("");
  const [plan, setPlan] = useState<RunPlan | null>(null);
  const [source, setSource] = useState<string>("");
  const [pending, start] = useTransition();

  const close = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setPlan(null);
      if (params.get("objective")) router.replace("/");
    }
  };

  const makePlan = () =>
    start(async () => {
      const res = await planObjectiveAction(objective);
      if (!res.ok) return void toast.error(res.error);
      setPlan(res.data.plan);
      setSource(res.data.source);
    });

  const run = () =>
    start(async () => {
      if (!plan) return;
      const res = await startObjectiveAction(objective, plan);
      if (!res.ok) return void toast.error(res.error);
      toast.success("Run started — the agents are on it.");
      close(false);
      router.push(`/automations/runs/${res.data.runId}`);
    });

  const d = plan?.discovery;
  const setD = (patch: Partial<NonNullable<RunPlan["discovery"]>>) => plan && d && setPlan({ ...plan, discovery: { ...d, ...patch } });
  const toggleAction = (a: RunPlan["actions"][number]) =>
    plan && setPlan({ ...plan, actions: plan.actions.includes(a) ? plan.actions.filter((x) => x !== a) : [...plan.actions, a].sort((x, y) => WORKFLOW_ACTIONS.findIndex((w) => w.key === x) - WORKFLOW_ACTIONS.findIndex((w) => w.key === y)) });

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Wand2 /> New objective
      </Button>
      <Dialog
        open={open}
        onOpenChange={close}
        size="lg"
        title={plan ? "Review the plan" : "Give the agency an objective"}
        description={plan ? "Nothing is sent or published automatically — emails and publishing always wait for your approval." : "Describe what you want in plain language. The orchestrator turns it into a plan you can review before anything runs."}
        footer={
          plan ? (
            <>
              <Button variant="ghost" onClick={() => setPlan(null)}>
                Back
              </Button>
              <Button variant="primary" onClick={run} loading={pending}>
                Start run <ArrowRight />
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={makePlan} loading={pending} disabled={objective.trim().length < 8}>
              <Sparkles /> Plan objective
            </Button>
          )
        }
      >
        {!plan ? (
          <div className="space-y-3">
            <Textarea autoFocus rows={4} value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Find 50 restaurants in Rotterdam that have outdated websites…" />
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted">Examples</p>
              {EXAMPLES.map((ex) => (
                <button key={ex} onClick={() => setObjective(ex)} className="block w-full rounded-lg border border-border px-3 py-2 text-left text-xs text-muted transition-colors hover:border-accent hover:text-foreground">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-start gap-2 rounded-lg bg-surface-2 p-3 text-[13px]">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div>
                {plan.summary}
                <div className="mt-1">
                  <Badge tone={source === "claude" ? "accent" : "warning"}>{source === "claude" ? "Planned by Claude" : "Planned by rule-based parser (Claude not configured)"}</Badge>
                </div>
              </div>
            </div>
            {d && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Field label="City">
                  <Input value={d.city} onChange={(e) => setD({ city: e.target.value })} />
                </Field>
                <Field label="Country">
                  <Input value={d.country} onChange={(e) => setD({ country: e.target.value })} />
                </Field>
                <Field label="Category">
                  <Select value={d.category} onChange={(e) => setD({ category: e.target.value })}>
                    {BUSINESS_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Businesses to discover">
                  <Input type="number" min={1} max={200} value={d.limit} onChange={(e) => setD({ limit: Number(e.target.value) })} />
                </Field>
                <Field label="Minimum lead score">
                  <Input type="number" min={0} max={100} value={d.minScore} onChange={(e) => setD({ minScore: Number(e.target.value) })} />
                </Field>
                <Field label="Top prospects to process">
                  <Input type="number" min={0} max={d.limit} value={plan.topN} onChange={(e) => setPlan({ ...plan, topN: Number(e.target.value) })} />
                </Field>
              </div>
            )}
            <div>
              <p className="mb-2 text-xs font-medium">Steps for the top prospects</p>
              <div className="flex flex-wrap gap-2">
                {WORKFLOW_ACTIONS.map((a) => {
                  const on = plan.actions.includes(a.key);
                  return (
                    <button
                      key={a.key}
                      onClick={() => toggleAction(a.key)}
                      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${on ? "border-accent bg-accent-soft text-accent" : "border-border text-muted hover:border-border-strong"}`}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
