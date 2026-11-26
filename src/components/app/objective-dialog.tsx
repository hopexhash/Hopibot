"use client";

import { ArrowRight, ChevronDown, CircleDollarSign, Clock, ShieldCheck, Sparkles, TriangleAlert, Wand2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, Field, HelpTip, Input, Select, Textarea } from "@/components/ui";
import { AGENT_META, BUSINESS_CATEGORIES, WORKFLOW_ACTIONS, type AgentKey } from "@/lib/constants";
import { cn, formatUsd } from "@/lib/utils";
import { planObjectiveAction, startObjectiveAction } from "@/server/actions/orchestrator";
import type { PlanEstimate } from "@/server/orchestrator/estimate";
import type { RunPlan } from "@/server/orchestrator/runs";
import { AGENT_ICON } from "./agent-meta";

const EXAMPLES = [
  "Find 50 restaurants in Amsterdam with outdated websites, analyze their online presence, generate professional website previews for the 10 best and prepare personalized outreach emails.",
  "Find 20 dentists in Utrecht without a website and build previews for the best 5.",
  "Discover 30 plumbers in Den Haag and research the top 10.",
];

const STEP_TEXT: Record<string, string> = {
  research: "Studies each business and its current website",
  contacts: "Looks up public contact details",
  generate_website: "Designs and writes a new website",
  qc: "Tests the site on phone, tablet and desktop",
  deploy: "Puts a private preview online",
  sales_email: "Drafts a personal email — waits for your approval",
  notify: "Sends you a notification when done",
};

function fmtDuration(seconds: number) {
  if (seconds < 90) return `about ${Math.max(1, Math.round(seconds / 10) * 10)} seconds`;
  const m = Math.round(seconds / 60);
  if (m < 90) return `about ${m} minutes`;
  return `about ${(m / 60).toFixed(1)} hours`;
}

/** Totals for the plan as currently edited. Agents work in parallel, so wall-clock time is a range. */
function totals(plan: RunPlan, est: PlanEstimate) {
  const d = plan.discovery;
  const discoveryCost = d ? Math.ceil(d.limit / est.discovery.resultsPerRequest) * est.discovery.costPerRequest : 0;
  const discoverySeconds = d ? d.limit * est.discovery.secondsPerBusiness : 0;
  const n = d ? plan.topN : (plan.businessIds?.length ?? plan.topN);
  const perProspect = plan.actions.reduce((a, k) => ({ cost: a.cost + est.steps[k].costUsd, seconds: a.seconds + est.steps[k].seconds }), { cost: 0, seconds: 0 });
  const basis = plan.actions.some((k) => est.steps[k].basis === "typical") ? "typical" : plan.actions.some((k) => est.steps[k].basis === "history") ? "history" : "free";
  return {
    cost: discoveryCost + perProspect.cost * n,
    // Lower bound: two prospects in parallel (default agent concurrency); upper bound: one at a time.
    secondsMin: discoverySeconds + (perProspect.seconds * n) / 2,
    secondsMax: discoverySeconds + perProspect.seconds * n,
    basis,
    prospects: n,
  };
}

export function ObjectiveDialog({ label = "New objective", size = "md", variant = "primary" }: { label?: string; size?: "md" | "lg"; variant?: "primary" | "secondary" }) {
  const params = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(params.get("objective") === "1");
  const [objective, setObjective] = useState("");
  const [plan, setPlan] = useState<RunPlan | null>(null);
  const [estimate, setEstimate] = useState<PlanEstimate | null>(null);
  const [source, setSource] = useState<string>("");
  const [adjust, setAdjust] = useState(false);
  const [pending, start] = useTransition();

  const close = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setPlan(null);
      setAdjust(false);
      if (params.get("objective")) router.replace("/command");
    }
  };

  const makePlan = () =>
    start(async () => {
      const res = await planObjectiveAction(objective);
      if (!res.ok) return void toast.error(res.error);
      setPlan(res.data.plan);
      setEstimate(res.data.estimate);
      setSource(res.data.source);
    });

  const run = () =>
    start(async () => {
      if (!plan) return;
      const res = await startObjectiveAction(objective, plan);
      if (!res.ok) return void toast.error(res.error);
      toast.success("Started — your agents are on it.");
      close(false);
      router.push(`/automations/runs/${res.data.runId}`);
    });

  const d = plan?.discovery;
  const setD = (patch: Partial<NonNullable<RunPlan["discovery"]>>) => plan && d && setPlan({ ...plan, discovery: { ...d, ...patch } });
  const toggleAction = (a: RunPlan["actions"][number]) =>
    plan && setPlan({ ...plan, actions: plan.actions.includes(a) ? plan.actions.filter((x) => x !== a) : [...plan.actions, a].sort((x, y) => WORKFLOW_ACTIONS.findIndex((w) => w.key === x) - WORKFLOW_ACTIONS.findIndex((w) => w.key === y)) });

  const t = plan && estimate ? totals(plan, estimate) : null;
  const overBudget = t && estimate ? t.cost > estimate.budget.dailyRemaining : false;
  const blocked = estimate && plan ? (!estimate.ready.googlePlaces && Boolean(plan.discovery)) || (!estimate.ready.anthropic && plan.actions.some((a) => ["research", "generate_website", "sales_email"].includes(a))) : false;
  const steps: { key: string; agent: AgentKey | null; text: string; count: string }[] = plan
    ? [
        ...(d ? [{ key: "discover", agent: "lead_finder" as AgentKey, text: `Finds ${d.limit} ${BUSINESS_CATEGORIES.find((c) => c.key === d.category)?.label.toLowerCase() ?? "businesses"} in ${d.city} and scores them`, count: `${d.limit} businesses` }] : []),
        ...plan.actions.map((a) => ({ key: a, agent: (WORKFLOW_ACTIONS.find((w) => w.key === a)?.agent ?? null) as AgentKey | null, text: STEP_TEXT[a], count: `top ${t?.prospects ?? plan.topN}` })),
      ]
    : [];

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setOpen(true)} className={size === "lg" ? "w-full sm:w-auto" : undefined}>
        <Wand2 /> {label}
      </Button>
      <Dialog
        open={open}
        onOpenChange={close}
        size="lg"
        title={plan ? "Review the plan" : "What should your agency do?"}
        description={plan ? "Check the steps, cost and time. Nothing starts until you press Start." : "Describe it in your own words. You will see a plan with cost and time before anything runs."}
        footer={
          plan ? (
            <>
              <Button variant="ghost" onClick={() => setPlan(null)}>
                Back
              </Button>
              <Button variant="primary" onClick={run} loading={pending} disabled={blocked || steps.length === 0}>
                Start <ArrowRight />
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={makePlan} loading={pending} disabled={objective.trim().length < 8}>
              <Sparkles /> Create plan
            </Button>
          )
        }
      >
        {!plan ? (
          <div className="space-y-4">
            <Textarea autoFocus rows={4} value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Find 50 restaurants in Amsterdam with outdated websites…" aria-label="Objective" />
            <div className="space-y-2">
              <p className="text-[12.5px] font-medium text-muted">Try an example</p>
              {EXAMPLES.map((ex) => (
                <button key={ex} onClick={() => setObjective(ex)} className="block w-full rounded-xl border border-border px-3.5 py-2.5 text-left text-[13px] leading-snug text-muted transition-colors hover:border-accent/50 hover:text-foreground">
                  {ex}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-surface-2 p-3.5">
              <p className="text-[14px] leading-relaxed">{plan.summary}</p>
              <p className={cn("mt-1.5 text-[12px]", source === "claude" ? "text-accent" : "text-warning")}>
                {source === "claude" ? "Planned by Claude" : "Planned by the built-in keyword parser because Claude is not connected — double-check the details below."}
              </p>
            </div>

            {/* Who does what */}
            <div>
              <p className="mb-2 text-[13px] font-semibold">Who does what</p>
              <ol className="space-y-1.5">
                {steps.map((s, i) => {
                  const Icon = s.agent ? AGENT_ICON[s.agent] : Sparkles;
                  return (
                    <li key={s.key} className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5">
                      <span className="tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[11.5px] font-semibold text-accent">{i + 1}</span>
                      <Icon className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium">{s.agent ? AGENT_META[s.agent].name : "System"}</span>
                        <span className="block text-[12px] leading-snug text-muted">{s.text}</span>
                      </span>
                      <span className="shrink-0 text-[11.5px] text-subtle">{s.count}</span>
                    </li>
                  );
                })}
                {steps.length === 0 && <li className="text-[13px] text-warning">This plan has no steps. Go back and describe what should happen.</li>}
              </ol>
            </div>

            {/* Cost, time, approvals */}
            {t && estimate && (
              <div className="grid gap-2.5 sm:grid-cols-3">
                <div className="rounded-xl border border-border p-3">
                  <p className="flex items-center gap-1.5 text-[12px] text-muted">
                    <CircleDollarSign className="h-3.5 w-3.5" /> Estimated API cost
                    <HelpTip>
                      {t.basis === "history"
                        ? "Based on what the same steps actually cost in your recent runs."
                        : "A rule-of-thumb estimate (you have no history yet). The real cost is recorded per call while the run executes and is visible under Analytics → AI costs."}
                    </HelpTip>
                  </p>
                  <p className="tabular mt-1 text-[20px] font-semibold">{estimate.mock && t.cost === 0 ? "$0.00" : `≈ ${formatUsd(t.cost)}`}</p>
                  <p className="text-[11.5px] text-subtle">{estimate.mock ? "Mock mode: no real AI calls" : `${formatUsd(estimate.budget.dailyRemaining)} left of today's limit`}</p>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <p className="flex items-center gap-1.5 text-[12px] text-muted">
                    <Clock className="h-3.5 w-3.5" /> Expected time
                    <HelpTip>Agents work on several businesses at once, so the real time depends on how many run in parallel and how fast the services respond.</HelpTip>
                  </p>
                  <p className="mt-1 text-[15px] font-semibold leading-tight">{fmtDuration(t.secondsMin)}</p>
                  <p className="text-[11.5px] text-subtle">up to {fmtDuration(t.secondsMax).replace("about ", "")}</p>
                </div>
                <div className="rounded-xl border border-border p-3">
                  <p className="flex items-center gap-1.5 text-[12px] text-muted">
                    <ShieldCheck className="h-3.5 w-3.5" /> Needs your approval
                  </p>
                  <ul className="mt-1 space-y-0.5 text-[12.5px] leading-snug">
                    {plan.actions.includes("sales_email") && <li>Every email, before it is sent</li>}
                    <li>Publishing on a customer domain</li>
                    {overBudget && <li className="text-warning">Going over today&apos;s budget</li>}
                  </ul>
                </div>
              </div>
            )}

            {estimate && blocked && (
              <div className="flex items-start gap-2.5 rounded-xl border border-[rgba(255,77,97,0.3)] bg-danger-soft px-3.5 py-3 text-[13px] leading-relaxed text-danger">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {!estimate.ready.googlePlaces && plan.discovery ? "Google Places is not connected, so businesses cannot be discovered. " : ""}
                  {!estimate.ready.anthropic ? "Claude is not connected, so research, websites and emails cannot be generated. " : ""}
                  <Link href="/integrations" className="underline underline-offset-2">
                    Connect them in Integrations
                  </Link>
                  .
                </span>
              </div>
            )}
            {overBudget && !blocked && estimate && (
              <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-warning">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                This is more than what is left of today&apos;s spending limit ({formatUsd(estimate.budget.dailyLimit)}). Agents will pause and ask you when the limit is reached.
              </p>
            )}

            {/* Details (collapsed by default) */}
            <div className="rounded-xl border border-border">
              <button onClick={() => setAdjust((v) => !v)} className="flex h-11 w-full items-center justify-between px-3.5 text-[13px] font-medium" aria-expanded={adjust}>
                Adjust details
                <ChevronDown className={cn("h-4 w-4 text-muted transition-transform", adjust && "rotate-180")} />
              </button>
              {adjust && (
                <div className="space-y-4 border-t border-border p-3.5">
                  {d && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <Field label="City">
                        <Input value={d.city} onChange={(e) => setD({ city: e.target.value })} />
                      </Field>
                      <Field label="Country">
                        <Select value={d.country} onChange={(e) => setD({ country: e.target.value as "Netherlands" | "Belgium" })}>
                          <option>Netherlands</option>
                          <option>Belgium</option>
                        </Select>
                      </Field>
                      <Field label="Type of business">
                        <Select value={d.category} onChange={(e) => setD({ category: e.target.value })}>
                          {BUSINESS_CATEGORIES.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="How many to find">
                        <Input type="number" inputMode="numeric" min={1} max={200} value={d.limit} onChange={(e) => setD({ limit: Number(e.target.value) })} />
                      </Field>
                      <Field label="Minimum lead score" hint="0–100. Higher = worse current website.">
                        <Input type="number" inputMode="numeric" min={0} max={100} value={d.minScore} onChange={(e) => setD({ minScore: Number(e.target.value) })} />
                      </Field>
                      <Field label="Best prospects to work on">
                        <Input type="number" inputMode="numeric" min={0} max={d.limit} value={plan.topN} onChange={(e) => setPlan({ ...plan, topN: Number(e.target.value) })} />
                      </Field>
                    </div>
                  )}
                  <div>
                    <p className="mb-2 text-[12.5px] font-medium">Steps for the best prospects</p>
                    <div className="flex flex-wrap gap-2">
                      {WORKFLOW_ACTIONS.map((a) => {
                        const on = plan.actions.includes(a.key);
                        return (
                          <button
                            key={a.key}
                            onClick={() => toggleAction(a.key)}
                            aria-pressed={on}
                            className={cn("h-9 rounded-lg border px-3 text-[12.5px] font-medium transition-colors", on ? "border-accent/60 bg-accent-soft text-accent" : "border-border text-muted hover:border-border-strong")}
                          >
                            {a.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
