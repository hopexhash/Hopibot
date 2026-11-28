"use client";

import { Check, Eye, FlaskConical, Pause, Play, Plus, Save, Send, ShieldCheck, Trash2, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, ConfirmDialog, Dialog, Field, HelpTip, Input, Select, Switch, Textarea } from "@/components/ui";
import { DEFAULT_CAMPAIGN, TEMPLATE_VARIABLES, unknownVariables } from "@/lib/campaign-template";
import { BUSINESS_CATEGORIES, PIPELINE_STAGES, CLOSED_STAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { addAudienceAction, decideCampaignAction, previewCampaignAction, removeRecipientAction, saveCampaignAction, sendCampaignTestAction, setCampaignStateAction, submitCampaignAction, type CampaignInput } from "@/server/actions/campaigns";

export function NewCampaignButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pending, start] = useTransition();
  const create = () =>
    start(async () => {
      const r = await saveCampaignAction(null, { name, subjectTemplate: DEFAULT_CAMPAIGN.subject, bodyTemplate: DEFAULT_CAMPAIGN.body, followUpEnabled: false, followUpAfterDays: 5, followUpSubject: DEFAULT_CAMPAIGN.followUpSubject, followUpBody: DEFAULT_CAMPAIGN.followUpBody, dailyLimit: 20, startAt: null });
      if (!r.ok) return void toast.error(r.error);
      router.push(`/campaigns/${r.data.id}`);
    });
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Plus /> New campaign
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="New campaign"
        description="Start with a name. You get a ready-made email to edit; nothing is sent until you approve it."
        size="sm"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={create} loading={pending} disabled={name.trim().length < 2}>
              Create draft
            </Button>
          </>
        }
      >
        <Field label="Campaign name">
          <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Restaurants in Amsterdam — March" maxLength={80} onKeyDown={(e) => e.key === "Enter" && name.trim().length >= 2 && create()} />
        </Field>
      </Dialog>
    </>
  );
}

/** Textarea with tap-to-insert variables (inserted at the cursor). */
function TemplateField({ label, value, onChange, rows, disabled, single }: { label: string; value: string; onChange: (v: string) => void; rows?: number; disabled?: boolean; single?: boolean }) {
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  const insert = (key: string) => {
    const el = ref.current;
    const token = `{{${key}}}`;
    const at = el?.selectionStart ?? value.length;
    onChange(value.slice(0, at) + token + value.slice(el?.selectionEnd ?? at));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(at + token.length, at + token.length);
    });
  };
  const unknown = unknownVariables(value);
  return (
    <Field label={label} error={unknown.length ? `Unknown variable: ${unknown.map((u) => `{{${u}}}`).join(", ")}` : null}>
      {single ? <Input ref={ref} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} maxLength={150} /> : <Textarea ref={ref} rows={rows ?? 10} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />}
      {!disabled && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {TEMPLATE_VARIABLES.map((v) => (
            <button key={v.key} type="button" onClick={() => insert(v.key)} className="h-8 rounded-lg border border-border px-2.5 text-[12px] text-muted transition-colors hover:border-accent/50 hover:text-accent">
              + {v.label}
            </button>
          ))}
        </div>
      )}
    </Field>
  );
}

export function CampaignEditor({ id, initial, editable }: { id: string; initial: CampaignInput; editable: boolean }) {
  const router = useRouter();
  const [c, setC] = useState(initial);
  const [pending, start] = useTransition();
  const set = (patch: Partial<CampaignInput>) => setC((cur) => ({ ...cur, ...patch }));
  const save = () =>
    start(async () => {
      const r = await saveCampaignAction(id, c);
      if (!r.ok) return void toast.error(r.error);
      toast.success("Campaign saved.");
      router.refresh();
    });
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>1 · The email</CardTitle>
          <CardDescription>
            Write it once; the green buttons insert details that are filled in per business. Your signature block, address and unsubscribe link are added automatically.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Campaign name">
          <Input value={c.name} onChange={(e) => set({ name: e.target.value })} disabled={!editable} maxLength={80} />
        </Field>
        <TemplateField single label="Subject" value={c.subjectTemplate} onChange={(v) => set({ subjectTemplate: v })} disabled={!editable} />
        <TemplateField label="Message" value={c.bodyTemplate} onChange={(v) => set({ bodyTemplate: v })} disabled={!editable} rows={12} />

        <div className="rounded-xl border border-border">
          <div className="flex items-center justify-between gap-4 p-3.5">
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium">Send one follow-up</p>
              <p className="text-[12.5px] leading-snug text-muted">Only to businesses that have not replied. Never more than one.</p>
            </div>
            <Switch checked={c.followUpEnabled} onCheckedChange={(v) => set({ followUpEnabled: v })} disabled={!editable} label="Send one follow-up" />
          </div>
          {c.followUpEnabled && (
            <div className="space-y-4 border-t border-border p-3.5">
              <Field label="Days to wait before the follow-up" className="max-w-[220px]">
                <Input type="number" inputMode="numeric" min={2} max={30} value={c.followUpAfterDays} onChange={(e) => set({ followUpAfterDays: Number(e.target.value) })} disabled={!editable} />
              </Field>
              <TemplateField single label="Follow-up subject" value={c.followUpSubject ?? ""} onChange={(v) => set({ followUpSubject: v })} disabled={!editable} />
              <TemplateField label="Follow-up message" value={c.followUpBody ?? ""} onChange={(v) => set({ followUpBody: v })} disabled={!editable} rows={7} />
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Most emails per day"
            hint={
              <span className="inline-flex items-center gap-1.5">
                A low number protects your sender reputation. <HelpTip>Sending many cold emails at once makes mail providers treat you as spam. 20–40 per day from a new address is a safe pace.</HelpTip>
              </span>
            }
          >
            <Input type="number" inputMode="numeric" min={1} max={200} value={c.dailyLimit} onChange={(e) => set({ dailyLimit: Number(e.target.value) })} disabled={!editable} />
          </Field>
          <Field label="Start sending on" hint="Leave empty to start as soon as it is approved.">
            <Input type="datetime-local" value={c.startAt ? new Date(new Date(c.startAt).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""} onChange={(e) => set({ startAt: e.target.value ? new Date(e.target.value).toISOString() : null })} disabled={!editable} />
          </Field>
        </div>
        {editable ? (
          <div className="flex justify-end">
            <Button variant="primary" onClick={save} loading={pending} className="h-11 w-full sm:h-10 sm:w-auto">
              <Save /> Save email
            </Button>
          </div>
        ) : (
          <p className="text-[12.5px] text-subtle">Pause the campaign to edit it. Changing the text of an approved campaign means it must be approved again.</p>
        )}
      </CardContent>
    </Card>
  );
}

type Recipient = { id: string; business: string; city: string | null; toEmail: string | null; status: string; skipReason: string | null };
const REC: Record<string, { label: string; tone: "success" | "warning" | "neutral" | "info" | "danger" | "accent" }> = {
  pending: { label: "Waiting", tone: "neutral" },
  sent: { label: "Emailed", tone: "success" },
  follow_up_sent: { label: "Followed up", tone: "success" },
  replied: { label: "In conversation", tone: "accent" },
  skipped: { label: "Skipped", tone: "warning" },
  failed: { label: "Failed", tone: "danger" },
};

export function AudiencePanel({ id, recipients, editable }: { id: string; recipients: Recipient[]; editable: boolean }) {
  const router = useRouter();
  const [f, setF] = useState<{ stage: string; category: string; city: string; minScore: string }>({ stage: "", category: "", city: "", minScore: "" });
  const [pending, start] = useTransition();
  const add = () =>
    start(async () => {
      const r = await addAudienceAction(id, { stage: f.stage || undefined, category: f.category || undefined, city: f.city || undefined, minScore: f.minScore ? Number(f.minScore) : undefined });
      if (!r.ok) return void toast.error(r.error);
      toast.success(`${r.data.added} recipient(s) added${r.data.skipped ? ` · ${r.data.skipped} cannot be contacted (see reasons below)` : ""}.`);
      router.refresh();
    });
  const remove = (rid: string) =>
    start(async () => {
      const r = await removeRecipientAction(id, rid);
      if (!r.ok) return void toast.error(r.error);
      router.refresh();
    });
  const waiting = recipients.filter((r) => r.status === "pending").length;
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted" /> 2 · Who receives it
          </CardTitle>
          <CardDescription>
            {recipients.length ? `${waiting} waiting · ${recipients.length} in total.` : "Pick leads with the filter. Test records, unsubscribed addresses and leads without a public business email are skipped automatically."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {editable && (
          <div className="grid gap-3 rounded-xl border border-border p-3.5 sm:grid-cols-2 lg:grid-cols-5">
            <Field label="CRM stage">
              <Select value={f.stage} onChange={(e) => setF({ ...f, stage: e.target.value })}>
                <option value="">Any stage</option>
                {PIPELINE_STAGES.filter((s) => !CLOSED_STAGES.includes(s.key)).map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Type of business">
              <Select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
                <option value="">Any type</option>
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="City">
              <Input value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })} placeholder="Any city" />
            </Field>
            <Field label="Minimum lead score">
              <Input type="number" inputMode="numeric" min={0} max={100} value={f.minScore} onChange={(e) => setF({ ...f, minScore: e.target.value })} placeholder="Any" />
            </Field>
            <div className="flex items-end">
              <Button onClick={add} loading={pending} className="h-11 w-full sm:h-10">
                <Plus /> Add matching leads
              </Button>
            </div>
          </div>
        )}
        {recipients.length > 0 && (
          <ul className="max-h-[420px] divide-y divide-border overflow-y-auto rounded-xl border border-border">
            {recipients.map((r) => {
              const st = REC[r.status] ?? REC.pending;
              return (
                <li key={r.id} className="flex items-center gap-3 px-3.5 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium">
                      {r.business}
                      {r.city && <span className="font-normal text-muted"> · {r.city}</span>}
                    </p>
                    <p className={cn("truncate text-[12.5px]", r.skipReason ? "text-warning" : "text-muted")}>{r.skipReason ?? r.toEmail ?? "No email"}</p>
                  </div>
                  <Badge tone={st.tone}>{st.label}</Badge>
                  {editable && ["pending", "skipped"].includes(r.status) && (
                    <Button variant="ghost" size="icon-sm" aria-label={`Remove ${r.business}`} onClick={() => remove(r.id)} disabled={pending}>
                      <X />
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

type Preview = { to: string; business: string; subject: string; body: string; missing: string[] };

export function LaunchPanel({ id, name, status, canApprove, waiting, dailyLimit, resendConnected }: { id: string; name: string; status: string; canApprove: boolean; waiting: number; dailyLimit: number; resendConnected: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [previews, setPreviews] = useState<{ sample: boolean; previews: Preview[] } | null>(null);
  const [confirm, setConfirm] = useState({ lawfulBasisConfirmed: false, recipientsAreBusinesses: false, reviewedPreview: false });
  const [cancel, setCancel] = useState(false);
  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, msg: string) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      router.refresh();
    });
  const preview = () =>
    start(async () => {
      const r = await previewCampaignAction(id);
      if (!r.ok) return void toast.error(r.error);
      setPreviews(r.data);
    });
  const test = () =>
    start(async () => {
      const r = await sendCampaignTestAction(id);
      if (!r.ok) return void toast.error(r.error);
      toast.success(`Test sent to ${r.data.to}.`);
    });
  const days = waiting ? Math.ceil(waiting / Math.max(1, dailyLimit)) : 0;
  const allConfirmed = Object.values(confirm).every(Boolean);

  return (
    <Card className="border-border-strong">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" /> 3 · Check and launch
          </CardTitle>
          <CardDescription>
            {status === "draft" && "Preview the real emails, send yourself a test, then ask for approval."}
            {status === "awaiting_approval" && "Waiting for an admin to read the preview and approve."}
            {status === "active" && `Sending up to ${dailyLimit} per day. About ${days} day(s) left for the ${waiting} waiting recipient(s).`}
            {status === "paused" && "Paused. Nothing is being sent."}
            {["completed", "cancelled"].includes(status) && "This campaign is finished."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button onClick={preview} loading={pending && !previews} className="h-11 sm:h-10">
            <Eye /> Preview emails
          </Button>
          <Button onClick={test} disabled={pending || !resendConnected} title={resendConnected ? undefined : "Connect Resend in Integrations first"} className="h-11 sm:h-10">
            <FlaskConical /> Send a test to myself
          </Button>
          {status === "draft" && (
            <Button variant="primary" onClick={() => run(() => submitCampaignAction(id), "Sent for approval.")} disabled={pending || waiting === 0} className="h-11 sm:h-10">
              <Send /> Ask for approval
            </Button>
          )}
          {status === "active" && canApprove && (
            <Button onClick={() => run(() => setCampaignStateAction(id, "paused"), "Campaign paused.")} disabled={pending} className="h-11 sm:h-10">
              <Pause /> Pause
            </Button>
          )}
          {status === "paused" && canApprove && (
            <Button variant="primary" onClick={() => run(() => setCampaignStateAction(id, "active"), "Campaign resumed.")} disabled={pending} className="h-11 sm:h-10">
              <Play /> Resume
            </Button>
          )}
          <div className="flex-1" />
          {canApprove && !["completed", "cancelled"].includes(status) && (
            <Button variant="danger-ghost" onClick={() => setCancel(true)} disabled={pending} className="h-11 sm:h-10">
              <Trash2 /> Cancel campaign
            </Button>
          )}
        </div>
        {!resendConnected && <p className="text-[12.5px] leading-relaxed text-warning">Resend (the email service) is not connected. You can prepare and approve the campaign, but emails are only really delivered once Resend is connected in Integrations.</p>}
        {status === "draft" && waiting === 0 && <p className="text-[12.5px] text-muted">Add at least one contactable recipient in step 2 before asking for approval.</p>}

        {previews && (
          <div className="space-y-3">
            <p className="text-[12.5px] text-muted">{previews.sample ? "No recipients yet, so this shows sample values." : `Exactly what the first ${previews.previews.length} recipient(s) would receive:`}</p>
            {previews.previews.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border">
                <div className="border-b border-border bg-surface-2 px-3.5 py-2.5 text-[12.5px]">
                  <p>
                    <span className="text-muted">To:</span> {p.to} <span className="text-subtle">({p.business})</span>
                  </p>
                  <p className="mt-0.5 font-medium">
                    <span className="font-normal text-muted">Subject:</span> {p.subject}
                  </p>
                </div>
                <pre className="max-h-72 overflow-y-auto whitespace-pre-wrap px-3.5 py-3 font-sans text-[13px] leading-relaxed">{p.body}</pre>
                {p.missing.length > 0 && <p className="border-t border-border px-3.5 py-2 text-[12.5px] text-warning">This business has no {p.missing.join(", ").replace(/_/g, " ")}, so it would be skipped.</p>}
              </div>
            ))}
          </div>
        )}

        {status === "awaiting_approval" &&
          (canApprove ? (
            <div className="space-y-3 rounded-xl border border-[rgba(196,128,0,0.3)] bg-warning-soft p-4">
              <p className="text-[13.5px] font-semibold text-warning">Approve “{name}”</p>
              <p className="text-[12.5px] leading-relaxed text-foreground/90">
                Approving lets the system send this email to {waiting} business(es), at most {dailyLimit} per day{days > 1 ? ` (about ${days} days)` : ""}. Each address is checked against the unsubscribe list again right before sending.
              </p>
              {(
                [
                  ["reviewedPreview", "I have read the preview and it is what I want to send."],
                  ["recipientsAreBusinesses", "The recipients are business addresses, not private individuals."],
                  ["lawfulBasisConfirmed", "I have a lawful basis to contact them (for example legitimate interest for business contacts)."],
                ] as const
              ).map(([k, label]) => (
                <label key={k} className="flex cursor-pointer items-start gap-3 text-[13px] leading-snug">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={confirm[k]}
                    onClick={() => setConfirm({ ...confirm, [k]: !confirm[k] })}
                    className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border", confirm[k] ? "border-accent bg-accent text-accent-foreground" : "border-border-strong bg-surface-2")}
                  >
                    {confirm[k] && <Check className="h-4 w-4" strokeWidth={3} />}
                  </button>
                  <span onClick={() => setConfirm({ ...confirm, [k]: !confirm[k] })}>{label}</span>
                </label>
              ))}
              <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                <Button onClick={() => run(() => decideCampaignAction(id, false), "Sent back to draft.")} disabled={pending} className="h-11 flex-1 sm:h-10">
                  <X /> Send back to draft
                </Button>
                <Button variant="primary" onClick={() => run(() => decideCampaignAction(id, true, confirm), "Approved — the campaign is live.")} disabled={pending || !allConfirmed} className="h-11 flex-1 sm:h-10">
                  <Check /> Approve and start
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-[12.5px] text-muted">Only admins and owners can approve a campaign.</p>
          ))}
      </CardContent>
      <ConfirmDialog
        open={cancel}
        onOpenChange={setCancel}
        title={`Cancel “${name}”?`}
        description="No more emails will be sent by this campaign. Emails that already went out are not affected. This cannot be undone."
        confirmLabel="Cancel campaign"
        loading={pending}
        onConfirm={() => {
          setCancel(false);
          run(() => setCampaignStateAction(id, "cancelled"), "Campaign cancelled.");
        }}
      />
    </Card>
  );
}
