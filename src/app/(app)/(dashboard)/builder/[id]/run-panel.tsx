"use client";

import { CircleCheck, CircleX, FlaskConical, Loader2, Pause, Play, Rocket, Trash2, Wrench } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ConfirmDialog, Textarea } from "@/components/ui";
import { cn, formatUsd } from "@/lib/utils";
import { deleteCustomAgentAction, runCustomAgentAction, setCustomAgentStatusAction } from "@/server/actions/custom-agents";

type Step = { tool: string; ok: boolean; result: string };
type TaskState = {
  id: string;
  status: string;
  output: { result?: string; steps?: Step[]; stopped?: string; test?: boolean } | null;
  error: string | null;
  costUsd: number;
  logs: { id: number; level: string; message: string; createdAt: string }[];
};

const DONE = ["COMPLETED", "FAILED", "CANCELLED"];

export function RunPanel({
  agent,
  canEdit,
  claudeConnected,
  workerOnline,
  initialPrompt,
}: {
  agent: { id: string; name: string; status: string; tested: boolean };
  canEdit: boolean;
  claudeConnected: boolean;
  workerOnline: boolean;
  initialPrompt: string;
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(initialPrompt);
  const [task, setTask] = useState<TaskState | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isTest, setIsTest] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, start] = useTransition();
  const refreshed = useRef<string | null>(null);

  // Follow the run until it finishes (real task status and log lines from the server).
  useEffect(() => {
    if (!taskId) return;
    let stop = false;
    const poll = async () => {
      try {
        const res = await fetch(`/api/tasks/${taskId}`, { cache: "no-store" });
        if (!res.ok) return;
        const t = (await res.json()) as TaskState;
        if (stop) return;
        setTask(t);
        if (DONE.includes(t.status) && refreshed.current !== t.id) {
          refreshed.current = t.id;
          router.refresh();
        }
      } catch {
        /* keep polling */
      }
    };
    void poll();
    const iv = setInterval(() => {
      if (!document.hidden) void poll();
    }, 2000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, [taskId, router]);

  const run = (test: boolean) =>
    start(async () => {
      const r = await runCustomAgentAction(agent.id, prompt, test);
      if (!r.ok) return void toast.error(r.error);
      setIsTest(test);
      setTask(null);
      setTaskId(r.data.taskId);
      toast.success(test ? "Test started — nothing will be written." : "Run started.");
    });
  const setStatus = (status: "active" | "paused") =>
    start(async () => {
      const r = await setCustomAgentStatusAction(agent.id, status);
      if (!r.ok) return void toast.error(r.error);
      toast.success(status === "active" ? `${agent.name} is active.` : `${agent.name} is paused.`);
      router.refresh();
    });
  const remove = () =>
    start(async () => {
      const r = await deleteCustomAgentAction(agent.id);
      if (!r.ok) return void toast.error(r.error);
      toast.success("Agent deleted.");
      router.push("/builder");
    });

  const running = Boolean(taskId) && (!task || !DONE.includes(task.status));
  const waitingForWorker = running && task?.status === "PENDING" && !workerOnline;
  const blocked = !claudeConnected ? "Claude is not connected. Add your Anthropic key in Integrations to run custom agents." : !workerOnline ? "No worker is online, so runs will wait in the queue until one connects." : null;

  return (
    <Card className="border-border-strong">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-accent" /> Test and run
          </CardTitle>
          <CardDescription>A test uses the real AI and real searches, but anything that would change your data is only simulated.</CardDescription>
        </div>
        <Badge tone={agent.status === "active" ? "success" : agent.status === "paused" ? "warning" : "neutral"}>{agent.status === "active" ? "Active" : agent.status === "paused" ? "Paused" : agent.tested ? "Draft · tested" : "Draft · not tested"}</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Optional: a specific task for this run. Leave empty to just follow the instructions." maxLength={4000} aria-label="Task for this run" />
        {blocked && <p className="text-[12.5px] leading-relaxed text-warning">{blocked}</p>}
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button variant={agent.status === "active" ? "secondary" : "primary"} onClick={() => run(true)} loading={pending && isTest} disabled={running || !claudeConnected} className="h-11 sm:h-10">
            <FlaskConical /> Run a test
          </Button>
          {agent.status === "active" && (
            <Button variant="primary" onClick={() => run(false)} disabled={running || pending || !canEdit || !claudeConnected} className="h-11 sm:h-10">
              <Rocket /> Run for real
            </Button>
          )}
          {canEdit && agent.status !== "active" && (
            <Button onClick={() => setStatus("active")} disabled={pending || !agent.tested} title={agent.tested ? undefined : "Finish a successful test first"} className="h-11 sm:h-10">
              <Play /> Activate
            </Button>
          )}
          {canEdit && agent.status === "active" && (
            <Button onClick={() => setStatus("paused")} disabled={pending} className="h-11 sm:h-10">
              <Pause /> Pause
            </Button>
          )}
          <div className="flex-1" />
          {canEdit && (
            <Button variant="danger-ghost" onClick={() => setConfirmDelete(true)} disabled={pending} className="h-11 sm:h-10">
              <Trash2 /> Delete
            </Button>
          )}
        </div>
        {!agent.tested && agent.status === "draft" && <p className="text-[12.5px] text-muted">Activation unlocks after one test finishes successfully.</p>}

        {taskId && (
          <div className="term overflow-hidden rounded-xl border border-border bg-surface-2">
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-[12px]">
              <span className="flex items-center gap-2 font-sans font-medium">
                {running ? <Loader2 className="h-4 w-4 animate-spin text-accent" /> : task?.status === "COMPLETED" ? <CircleCheck className="h-4 w-4 text-accent" /> : <CircleX className="h-4 w-4 text-danger" />}
                {running ? (waitingForWorker ? "Waiting for a worker…" : isTest ? "Test running…" : "Running…") : task?.status === "COMPLETED" ? (isTest ? "Test finished" : "Run finished") : `Run ${task?.status.toLowerCase()}`}
              </span>
              {task && <span className="tabular text-muted">cost so far {formatUsd(task.costUsd)}</span>}
            </div>
            <div className="max-h-64 overflow-y-auto px-3 py-2 text-[12px] leading-[1.7]" role="log" aria-live="polite">
              {(task?.logs ?? []).map((l) => (
                <div key={l.id} className={cn("break-words", l.level === "error" ? "text-danger" : l.level === "warn" ? "text-warning" : "text-[#b8d6c2]")}>
                  <span className="text-subtle">[{new Date(l.createdAt).toLocaleTimeString("en-GB")}]</span> {l.message}
                </div>
              ))}
              {running && (
                <div className="text-accent">
                  $<span className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] bg-accent animate-blink" />
                </div>
              )}
            </div>
          </div>
        )}

        {task && DONE.includes(task.status) && (
          <div className="space-y-3">
            {task.error && <p className="rounded-xl border border-[rgba(180,42,37,0.3)] bg-danger-soft px-3.5 py-3 text-[13px] leading-relaxed text-danger">{task.error}</p>}
            {task.output?.result && (
              <div className="rounded-lg border border-border bg-surface-2 p-3.5">
                <p className="mb-1.5 text-[12px] font-medium text-accent">Agent report{task.output.test ? " (test run — nothing was written)" : ""}</p>
                <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed">{task.output.result}</p>
              </div>
            )}
            {task.output?.steps && task.output.steps.length > 0 && (
              <details className="rounded-xl border border-border">
                <summary className="flex h-11 cursor-pointer items-center gap-2 px-3.5 text-[13px] font-medium">
                  <Wrench className="h-4 w-4 text-muted" /> {task.output.steps.length} action(s) taken
                </summary>
                <ol className="space-y-2 border-t border-border p-3.5">
                  {task.output.steps.map((s, i) => (
                    <li key={i} className="text-[12.5px]">
                      <span className={cn("font-medium", s.ok ? "text-foreground" : "text-danger")}>
                        {i + 1}. {s.tool.replace(/_/g, " ")}
                        {s.ok ? "" : " — failed"}
                      </span>
                      <span className="term mt-0.5 block max-h-24 overflow-y-auto break-words rounded-lg bg-surface-2 p-2 text-[11.5px] text-muted">{s.result}</span>
                    </li>
                  ))}
                </ol>
              </details>
            )}
          </div>
        )}
      </CardContent>
      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={`Delete ${agent.name}?`}
        description="The agent stops immediately and disappears from the builder. Its past runs stay in the logs and cost reports."
        confirmLabel="Delete agent"
        loading={pending}
        onConfirm={remove}
      />
    </Card>
  );
}
