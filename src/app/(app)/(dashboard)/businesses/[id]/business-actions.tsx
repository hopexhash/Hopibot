"use client";

import { Check, CreditCard, Eraser, MailPlus, MessageSquareReply, Plus, ShieldOff, Sparkles, StickyNote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, Field, Input, Select, Textarea } from "@/components/ui";
import { PIPELINE_STAGES } from "@/lib/constants";
import { addContactAction, addCrmTaskAction, addNoteAction, toggleCrmTaskAction, createPaymentLinkAction, eraseBusinessAction, markRepliedAction, recordPaymentAction, suppressBusinessesAction, updateBusinessAction } from "@/server/actions/businesses";
import { generateWebsiteAction } from "@/server/actions/websites";

type Res = { ok: true } | { ok: false; error: string };

function useRun() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const run = (fn: () => Promise<Res>, msg: string, after?: () => void) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      after?.();
      router.refresh();
    });
  return { pending, run };
}

export function StageControls({ id, stage, valueEur, followUpAt }: { id: string; stage: string; valueEur: number | null; followUpAt: string | null }) {
  const { pending, run } = useRun();
  const [value, setValue] = useState(valueEur?.toString() ?? "");
  const [follow, setFollow] = useState(followUpAt?.slice(0, 10) ?? "");
  return (
    <div className="space-y-3">
      <Field label="Pipeline stage">
        <Select value={stage} disabled={pending} onChange={(e) => run(() => updateBusinessAction(id, { pipelineStage: e.target.value }), "Stage updated")}>
          {PIPELINE_STAGES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Deal value (€)">
          <Input type="number" min={0} value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => run(() => updateBusinessAction(id, { salesValueEur: value === "" ? null : Number(value) }), "Value saved")} />
        </Field>
        <Field label="Follow-up">
          <Input type="date" value={follow} onChange={(e) => setFollow(e.target.value)} onBlur={() => run(() => updateBusinessAction(id, { followUpAt: follow ? new Date(follow).toISOString() : null }), "Follow-up saved")} />
        </Field>
      </div>
    </div>
  );
}

export function QuickActions({ id, name, hasResearch, canAdmin, isMock }: { id: string; name: string; hasResearch: boolean; canAdmin: boolean; isMock: boolean }) {
  const { pending, run } = useRun();
  const [dialog, setDialog] = useState<null | "note" | "reply" | "payment" | "contact" | "erase">(null);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [recurring, setRecurring] = useState(false);
  const close = () => {
    setDialog(null);
    setText("");
    setEmail("");
    setAmount("");
  };
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="primary" size="sm" loading={pending} onClick={() => run(() => generateWebsiteAction(id, { withResearch: !hasResearch }) as Promise<Res>, hasResearch ? "Website generation queued" : "Research + website generation queued")}>
        <Sparkles /> Generate website
      </Button>
      <Button size="sm" onClick={() => setDialog("note")}>
        <StickyNote /> Add note
      </Button>
      <Button size="sm" onClick={() => setDialog("reply")}>
        <MessageSquareReply /> Log reply
      </Button>
      <Button size="sm" onClick={() => setDialog("contact")}>
        <MailPlus /> Add email
      </Button>
      {canAdmin && !isMock && (
        <Button size="sm" onClick={() => setDialog("payment")}>
          <CreditCard /> Record payment
        </Button>
      )}
      <Button size="sm" variant="ghost" onClick={() => confirm(`Add ${name} to the suppression list? Pending outreach will be cancelled.`) && run(() => suppressBusinessesAction([id], "opt_out") as Promise<Res>, "Suppressed")}>
        <ShieldOff /> Suppress
      </Button>
      {canAdmin && (
        <Button size="sm" variant="danger-ghost" onClick={() => setDialog("erase")}>
          <Eraser /> GDPR erase
        </Button>
      )}

      <Dialog open={dialog === "note"} onOpenChange={(v) => !v && close()} title="Add note" footer={<Button variant="primary" loading={pending} onClick={() => run(() => addNoteAction(id, text) as Promise<Res>, "Note added", close)}>Save note</Button>}>
        <Textarea autoFocus rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Called the owner, interested in a quote…" />
      </Dialog>
      <Dialog open={dialog === "reply"} onOpenChange={(v) => !v && close()} title="Log a reply" description="Moves the business to Replied and cancels pending follow-ups." footer={<Button variant="primary" loading={pending} onClick={() => run(() => markRepliedAction(id, text) as Promise<Res>, "Reply logged", close)}>Log reply</Button>}>
        <Textarea autoFocus rows={5} value={text} onChange={(e) => setText(e.target.value)} placeholder="Summary of their reply (optional)" />
      </Dialog>
      <Dialog open={dialog === "contact"} onOpenChange={(v) => !v && close()} title="Add a published email address" description="Only record addresses the business publishes itself. Never guess addresses." footer={<Button variant="primary" loading={pending} onClick={() => run(() => addContactAction(id, email, text) as Promise<Res>, "Contact added", close)}>Add</Button>}>
        <div className="space-y-3">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Source URL" hint="The public page where the address is listed.">
            <Input type="url" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://…/contact" />
          </Field>
        </div>
      </Dialog>
      <Dialog open={dialog === "payment"} onOpenChange={(v) => !v && close()} title="Payment" description="Create a Stripe payment link (recorded automatically via webhook when paid), or record a payment received outside Stripe." footer={
          <>
            <Button
              loading={pending}
              onClick={() =>
                run(
                  async () => {
                    const r = await createPaymentLinkAction(id, { amountEur: Number(amount), description: text || undefined, recurring });
                    if (r.ok) {
                      await navigator.clipboard?.writeText(r.data.url).catch(() => {});
                      window.open(r.data.url, "_blank", "noopener");
                    }
                    return r as Res;
                  },
                  "Stripe payment link created and copied",
                  close,
                )
              }
            >
              Create Stripe payment link
            </Button>
            <Button variant="primary" loading={pending} onClick={() => run(() => recordPaymentAction(id, { amountEur: Number(amount), description: text || undefined, recurring }) as Promise<Res>, "Recorded", close)}>
              Record manual payment
            </Button>
          </>
        }>
        <div className="space-y-3">
          <Field label="Amount (€)">
            <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label="Description">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Website setup" />
          </Field>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="accent-[var(--accent)]" /> Monthly recurring subscription
          </label>
        </div>
      </Dialog>
      <Dialog
        open={dialog === "erase"}
        onOpenChange={(v) => !v && close()}
        title={`Erase ${name}'s data?`}
        description="GDPR erasure: contacts, research, emails and notes are deleted permanently. A suppression entry and a minimal tombstone are kept so the business is never contacted again."
        footer={
          <Button variant="danger" loading={pending} onClick={() => run(() => eraseBusinessAction(id) as Promise<Res>, "Data erased", close)}>
            Erase permanently
          </Button>
        }
      />
    </div>
  );
}


export type CrmTask = { id: string; title: string; dueAt: string | null; doneAt: string | null };

/** To-dos for this lead (follow-up calls, things to send). Stored per lead. */
export function TaskList({ businessId, tasks }: { businessId: string; tasks: CrmTask[] }) {
  const { pending, run } = useRun();
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const add = () => run(() => addCrmTaskAction(businessId, title, due ? new Date(due).toISOString() : null) as Promise<Res>, "Task added", () => (setTitle(""), setDue("")));
  const open = tasks.filter((t) => !t.doneAt);
  const done = tasks.filter((t) => t.doneAt);
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Call back about the quote…" maxLength={200} onKeyDown={(e) => e.key === "Enter" && title.trim().length >= 2 && add()} aria-label="New task" className="min-w-0 flex-1" />
        <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} aria-label="Due date" className="sm:w-40" />
        <Button onClick={add} loading={pending} disabled={title.trim().length < 2} className="h-11 shrink-0 sm:h-10">
          <Plus /> Add
        </Button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-[13px] text-muted">No tasks. Add a reminder for yourself above.</p>
      ) : (
        <ul className="space-y-1">
          {[...open, ...done].map((t) => {
            const overdue = !t.doneAt && t.dueAt && new Date(t.dueAt) < new Date();
            return (
              <li key={t.id} className="flex items-center gap-3 rounded-xl px-1 py-1.5">
                <button
                  role="checkbox"
                  aria-checked={Boolean(t.doneAt)}
                  aria-label={t.doneAt ? `Reopen: ${t.title}` : `Complete: ${t.title}`}
                  disabled={pending}
                  onClick={() => run(() => toggleCrmTaskAction(t.id, !t.doneAt) as Promise<Res>, t.doneAt ? "Task reopened" : "Task done")}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${t.doneAt ? "border-accent bg-accent text-accent-foreground" : "border-border-strong"}`}
                >
                  {t.doneAt && <Check className="h-4 w-4" strokeWidth={3} />}
                </button>
                <span className={`min-w-0 flex-1 text-[13.5px] ${t.doneAt ? "text-subtle line-through" : ""}`}>{t.title}</span>
                {t.dueAt && <span className={`shrink-0 text-[12px] ${overdue ? "text-danger" : "text-muted"}`}>{overdue ? "Overdue · " : ""}{new Date(t.dueAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
