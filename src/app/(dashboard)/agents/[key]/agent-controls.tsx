"use client";

import { FlaskConical, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Field, Input, Select, Switch, Textarea } from "@/components/ui";
import { cancelTaskAction, retryTaskAction } from "@/server/actions/orchestrator";
import { testAgentAction, toggleAgentAction, updateAgentConfigAction } from "@/server/actions/agents";

type Config = {
  instructions: string;
  model: string | null;
  effort: string | null;
  temperature: number | null;
  concurrency: number;
  maxTasksPerRun: number;
  dailySpendLimitUsd: number | null;
  maxRetries: number;
};

export function AgentToggle({ agentKey, enabled, canAdmin }: { agentKey: string; enabled: boolean; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted">{enabled ? "Enabled" : "Disabled"}</span>
      <Switch
        checked={enabled}
        disabled={!canAdmin || pending}
        label="Enable agent"
        onCheckedChange={(v) =>
          start(async () => {
            const r = await toggleAgentAction(agentKey, v);
            if (!r.ok) return void toast.error(r.error);
            toast.success(v ? `Agent enabled${r.data.resumed ? ` — ${r.data.resumed} parked task(s) resumed` : ""}` : "Agent disabled — new tasks will wait until it is enabled again");
            router.refresh();
          })
        }
      />
    </div>
  );
}

export function TestAgentButton({ agentKey }: { agentKey: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      loading={pending}
      onClick={() =>
        start(async () => {
          const r = await testAgentAction(agentKey);
          if (!r.ok) return void toast.error(r.error);
          toast.success("Test task queued — watch the console below.");
          router.refresh();
        })
      }
    >
      <FlaskConical /> Test agent
    </Button>
  );
}

export function AgentConfigForm({ agentKey, config, models, usesLlm, canAdmin }: { agentKey: string; config: Config; models: { id: string; label: string }[]; usesLlm: boolean; canAdmin: boolean }) {
  const router = useRouter();
  const [c, setC] = useState(config);
  const [pending, start] = useTransition();
  const set = <K extends keyof Config>(k: K, v: Config[K]) => setC((x) => ({ ...x, [k]: v }));
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await updateAgentConfigAction(agentKey, c);
          if (!r.ok) return void toast.error(r.error);
          toast.success("Configuration saved");
          router.refresh();
        });
      }}
    >
      <Field label="Agent instructions" hint="Added to the agent's system prompt. Cannot override the built-in safety and honesty rules.">
        <Textarea rows={5} value={c.instructions} onChange={(e) => set("instructions", e.target.value)} disabled={!canAdmin} />
      </Field>
      {usesLlm && (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Model">
            <Select value={c.model ?? ""} onChange={(e) => set("model", e.target.value || null)} disabled={!canAdmin}>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Effort" hint="Higher effort = better quality, more tokens.">
            <Select value={c.effort ?? "medium"} onChange={(e) => set("effort", e.target.value)} disabled={!canAdmin}>
              {["low", "medium", "high", "xhigh", "max"].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </Select>
          </Field>
          <Field label="Temperature" hint="Not supported by current Claude models — stored for future models, never sent." className="col-span-2">
            <Input type="number" step={0.1} min={0} max={1} value={c.temperature ?? ""} placeholder="Not supported" onChange={(e) => set("temperature", e.target.value === "" ? null : Number(e.target.value))} disabled={!canAdmin} />
          </Field>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Concurrent tasks">
          <Input type="number" min={1} max={20} value={c.concurrency} onChange={(e) => set("concurrency", Number(e.target.value))} disabled={!canAdmin} />
        </Field>
        <Field label="Max tasks per run">
          <Input type="number" min={1} value={c.maxTasksPerRun} onChange={(e) => set("maxTasksPerRun", Number(e.target.value))} disabled={!canAdmin} />
        </Field>
        <Field label="Daily spend limit (USD)">
          <Input type="number" min={0} step={0.5} value={c.dailySpendLimitUsd ?? ""} placeholder="No agent limit" onChange={(e) => set("dailySpendLimitUsd", e.target.value === "" ? null : Number(e.target.value))} disabled={!canAdmin} />
        </Field>
        <Field label="Retry limit">
          <Input type="number" min={0} max={10} value={c.maxRetries} onChange={(e) => set("maxRetries", Number(e.target.value))} disabled={!canAdmin} />
        </Field>
      </div>
      {canAdmin && (
        <div className="flex justify-end">
          <Button type="submit" variant="primary" loading={pending}>
            Save configuration
          </Button>
        </div>
      )}
    </form>
  );
}

export function TaskActions({ taskId, status }: { taskId: string; status: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, msg: string) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      router.refresh();
    });
  return (
    <div className="flex justify-end gap-1">
      {["FAILED", "WAITING_FOR_APPROVAL"].includes(status) && (
        <Button size="icon-sm" variant="ghost" title="Retry" aria-label="Retry" disabled={pending} onClick={() => run(() => retryTaskAction(taskId), "Task re-queued")}>
          <RotateCcw />
        </Button>
      )}
      {["PENDING", "WAITING_FOR_APPROVAL", "FAILED"].includes(status) && (
        <Button size="icon-sm" variant="ghost" title="Cancel" aria-label="Cancel" disabled={pending} onClick={() => run(() => cancelTaskAction(taskId), "Task cancelled")}>
          <X />
        </Button>
      )}
    </div>
  );
}
