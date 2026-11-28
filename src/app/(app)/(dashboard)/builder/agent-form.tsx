"use client";

import { Check, ChevronDown, CircleAlert, Save, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, HelpTip, Input, Select, Switch, Textarea } from "@/components/ui";
import { CUSTOM_AGENT_TOOLS, PERMISSION_INFO, type ToolPermission } from "@/lib/custom-agent-tools";
import { cn } from "@/lib/utils";
import { checkModelAction, draftCustomAgentAction, saveCustomAgentAction, type CustomAgentConfig } from "@/server/actions/custom-agents";

const EXAMPLE = "Create an agent that searches for dental clinics in Rotterdam, analyzes their websites and saves businesses with outdated designs to my CRM.";

type ModelInfo = { available: true; displayName: string; maxInputTokens: number | null; maxOutputTokens: number | null } | { available: false; reason: string };

export function AgentForm({ id, initial, models, canEdit, claudeConnected }: { id: string | null; initial: CustomAgentConfig; models: { id: string; label: string }[]; canEdit: boolean; claudeConnected: boolean }) {
  const router = useRouter();
  const [c, setC] = useState<CustomAgentConfig>(initial);
  const [describe, setDescribe] = useState("");
  const [source, setSource] = useState<"claude" | "heuristic" | null>(null);
  const [testPrompt, setTestPrompt] = useState<string | null>(null);
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState<ModelInfo | null>(null);
  const [pending, start] = useTransition();
  const [drafting, startDraft] = useTransition();
  const [checking, startCheck] = useTransition();
  const set = (patch: Partial<CustomAgentConfig>) => setC((cur) => ({ ...cur, ...patch }));

  const generate = () =>
    startDraft(async () => {
      const r = await draftCustomAgentAction(describe);
      if (!r.ok) return void toast.error(r.error);
      const d = r.data.draft;
      setC((cur) => ({ ...cur, name: d.name, description: d.description, instructions: d.instructions, tools: d.tools, permissions: d.permissions, memoryEnabled: d.memoryEnabled }));
      setSource(r.data.source);
      setTestPrompt(d.suggestedTestPrompt);
      toast.success("Configuration drafted — review it below before saving.");
    });

  const toggleTool = (name: string, permission: ToolPermission) => {
    const on = c.tools.includes(name);
    const tools = on ? c.tools.filter((t) => t !== name) : [...c.tools, name];
    // Switching a tool on also grants the permission it needs (shown right below, so it is visible).
    const permissions = !on && permission !== "read" ? { ...c.permissions, [permission]: true } : c.permissions;
    set({ tools, permissions, ...(name === "remember" && !on ? { memoryEnabled: true } : {}) });
  };

  const save = () =>
    start(async () => {
      const r = await saveCustomAgentAction(id, c);
      if (!r.ok) return void toast.error(r.error);
      toast.success(id ? (r.data.retest ? "Saved. The agent is back in draft — run a test before activating it again." : "Saved.") : "Agent created. Run a test next.");
      if (!id) router.push(`/builder/${r.data.id}${testPrompt ? `?prompt=${encodeURIComponent(testPrompt)}` : ""}`);
      else router.refresh();
    });

  const check = () =>
    startCheck(async () => {
      const r = await checkModelAction(c.model);
      if (!r.ok) return void toast.error(r.error);
      setModel(r.data.available ? { available: true, displayName: r.data.displayName, maxInputTokens: r.data.maxInputTokens, maxOutputTokens: r.data.maxOutputTokens } : { available: false, reason: r.data.reason });
    });

  const blockedTools = CUSTOM_AGENT_TOOLS.filter((t) => c.tools.includes(t.name) && t.permission !== "read" && !c.permissions[t.permission]);

  return (
    <div className="space-y-4">
      <Card className="border-border-strong">
        <CardHeader>
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" /> Describe the agent you want
            </CardTitle>
            <CardDescription>Write it like you would explain the job to a new employee. You review everything before it is saved.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea rows={3} value={describe} onChange={(e) => setDescribe(e.target.value)} placeholder={EXAMPLE} aria-label="Describe the agent" disabled={!canEdit} />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="primary" onClick={generate} loading={drafting} disabled={!canEdit || describe.trim().length < 15} className="h-11 sm:h-10">
              <Sparkles /> Generate configuration
            </Button>
            <button type="button" onClick={() => setDescribe(EXAMPLE)} className="h-9 text-left text-[12.5px] text-muted underline-offset-2 hover:text-accent hover:underline">
              Use the example
            </button>
          </div>
          {!claudeConnected && <p className="text-[12.5px] leading-relaxed text-warning">Claude is not connected, so the configuration is drafted with simple keyword rules instead of AI. Check it carefully. Custom agents also need Claude to run.</p>}
          {source && (
            <p className={cn("text-[12.5px]", source === "claude" ? "text-accent" : "text-warning")}>{source === "claude" ? "Drafted by Claude. Review each section below." : "Drafted by keyword rules (Claude not connected). Review each section carefully."}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>1 · Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Agent name">
              <Input value={c.name} onChange={(e) => set({ name: e.target.value })} placeholder="Dental Scout" maxLength={60} disabled={!canEdit} />
            </Field>
            <Field label="Short description" hint="One sentence so you recognise it later.">
              <Input value={c.description} onChange={(e) => set({ description: e.target.value })} maxLength={300} disabled={!canEdit} />
            </Field>
          </div>
          <Field label="Instructions" hint="What the agent should do, step by step, and what its final report should contain.">
            <Textarea rows={8} value={c.instructions} onChange={(e) => set({ instructions: e.target.value })} maxLength={6000} disabled={!canEdit} />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>2 · What the agent can use</CardTitle>
            <CardDescription>An agent can only do what its tools allow. Anything not ticked simply does not exist for it.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CUSTOM_AGENT_TOOLS.map((t) => {
              const on = c.tools.includes(t.name);
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    disabled={!canEdit}
                    onClick={() => toggleTool(t.name, t.permission)}
                    className={cn("flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors", on ? "border-accent/40 bg-accent-soft" : "border-border hover:border-border-strong")}
                  >
                    <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border", on ? "border-accent bg-accent text-accent-foreground" : "border-border-strong")}>{on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}</span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-medium">{t.label}</span>
                      <span className="block text-[12.5px] leading-snug text-muted">{t.description}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>3 · Permissions</CardTitle>
            <CardDescription>Checked again by the server on every single action. Agents can never send emails or publish websites.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {(Object.keys(PERMISSION_INFO) as (keyof typeof PERMISSION_INFO)[]).map((k) => (
            <div key={k} className="flex items-center justify-between gap-4 rounded-xl border border-border p-3">
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium">{PERMISSION_INFO[k].label}</p>
                <p className="text-[12.5px] leading-snug text-muted">{PERMISSION_INFO[k].description}</p>
              </div>
              <Switch checked={c.permissions[k]} onCheckedChange={(v) => set({ permissions: { ...c.permissions, [k]: v } })} disabled={!canEdit} label={PERMISSION_INFO[k].label} />
            </div>
          ))}
          {blockedTools.length > 0 && (
            <p className="flex items-start gap-2 text-[12.5px] leading-relaxed text-warning">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              {blockedTools.map((t) => `“${t.label}”`).join(", ")} {blockedTools.length === 1 ? "is" : "are"} ticked but the matching permission is off, so the agent will not get {blockedTools.length === 1 ? "it" : "them"}.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <button type="button" onClick={() => setAdvanced((v) => !v)} className="flex w-full items-center justify-between px-5 py-4 text-left" aria-expanded={advanced}>
          <span>
            <span className="block text-[14px] font-semibold">4 · Limits and model</span>
            <span className="block text-[12.5px] text-muted">
              Safe defaults are set: {`$${c.dailyBudgetUsd}`}/day, {Math.round(c.maxRunSeconds / 60)} min per run, {c.maxSteps} steps.
            </span>
          </span>
          <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform", advanced && "rotate-180")} />
        </button>
        {advanced && (
          <CardContent className="space-y-4 border-t border-border pt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Daily budget (USD)" hint="The agent stops for the day when this is spent.">
                <Input type="number" inputMode="decimal" min={0.05} max={100} step={0.05} value={c.dailyBudgetUsd} onChange={(e) => set({ dailyBudgetUsd: Number(e.target.value) })} disabled={!canEdit} />
              </Field>
              <Field label="Maximum run time (seconds)" hint="A run is stopped after this long.">
                <Input type="number" inputMode="numeric" min={30} max={1800} value={c.maxRunSeconds} onChange={(e) => set({ maxRunSeconds: Number(e.target.value) })} disabled={!canEdit} />
              </Field>
              <Field label="Maximum steps" hint="Each step is one round of thinking and acting.">
                <Input type="number" inputMode="numeric" min={1} max={40} value={c.maxSteps} onChange={(e) => set({ maxSteps: Number(e.target.value) })} disabled={!canEdit} />
              </Field>
              <Field label="Retries after a failure">
                <Input type="number" inputMode="numeric" min={0} max={3} value={c.maxRetries} onChange={(e) => set({ maxRetries: Number(e.target.value) })} disabled={!canEdit} />
              </Field>
              <Field label="Maximum tokens per answer" hint="Roughly: 1,000 tokens ≈ 750 words.">
                <Input type="number" inputMode="numeric" min={1000} max={32000} step={500} value={c.maxOutputTokens} onChange={(e) => set({ maxOutputTokens: Number(e.target.value) })} disabled={!canEdit} />
              </Field>
              <Field label="Thinking effort" hint="Higher = more careful, slower and more expensive.">
                <Select value={c.effort} onChange={(e) => set({ effort: e.target.value as CustomAgentConfig["effort"] })} disabled={!canEdit}>
                  {["low", "medium", "high", "xhigh", "max"].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Model">
                <div className="flex gap-2">
                  <Select
                    value={c.model}
                    onChange={(e) => {
                      set({ model: e.target.value });
                      setModel(null);
                    }}
                    disabled={!canEdit}
                    className="min-w-0 flex-1"
                  >
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </Select>
                  <Button onClick={check} loading={checking} className="shrink-0">
                    Check
                  </Button>
                </div>
                {model && (
                  <p className={cn("mt-1.5 text-[12.5px] leading-relaxed", model.available ? "text-accent" : "text-warning")}>
                    {model.available
                      ? `Available to your key: ${model.displayName}${model.maxInputTokens ? ` · reads up to ${model.maxInputTokens.toLocaleString("en-US")} tokens` : ""}${model.maxOutputTokens ? ` · writes up to ${model.maxOutputTokens.toLocaleString("en-US")}` : ""}.`
                      : model.reason}
                  </p>
                )}
              </Field>
              <Field label="Temperature">
                <Input value="Not adjustable" disabled aria-describedby="temp-help" />
                <p id="temp-help" className="mt-1 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-muted">
                  Current Claude models no longer accept a temperature setting. Use “Thinking effort” to trade care for speed.
                  <HelpTip>Older AI models had a “temperature” dial for randomness. The models used here reject that setting, so it is shown for clarity but cannot be changed.</HelpTip>
                </p>
              </Field>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-3">
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium">Memory between runs</p>
                <p className="text-[12.5px] leading-snug text-muted">Lets the agent keep short notes (for example which cities it already covered). You can read and clear them on the agent page.</p>
              </div>
              <Switch
                checked={c.memoryEnabled}
                onCheckedChange={(v) => set({ memoryEnabled: v, tools: v ? [...new Set([...c.tools, "remember"])] : c.tools.filter((t) => t !== "remember") })}
                disabled={!canEdit}
                label="Memory between runs"
              />
            </div>
          </CardContent>
        )}
      </Card>

      <div className="sticky bottom-[calc(var(--safe-bottom)+72px)] z-10 flex justify-end lg:bottom-4">
        <Button variant="primary" size="lg" onClick={save} loading={pending} disabled={!canEdit} className="w-full sm:w-auto">
          <Save /> {id ? "Save changes" : "Save agent"}
        </Button>
      </div>
      {!canEdit && <p className="text-[12.5px] text-subtle">Only admins and owners can create or change agents.</p>}
    </div>
  );
}
