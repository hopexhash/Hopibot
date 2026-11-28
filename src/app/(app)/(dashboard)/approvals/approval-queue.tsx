"use client";

import { Check, CircleDollarSign, ExternalLink, Globe, Mail, Megaphone, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, MockBadge, Textarea } from "@/components/ui";
import { timeAgo } from "@/lib/utils";
import { decideApprovalAction } from "@/server/actions/approvals";

export type ApprovalDetail = {
  id: string;
  kind: string;
  kindLabel: string;
  summary: string;
  createdAt: string;
  reviewHref: string | null;
  facts: { label: string; value: string; href?: string }[];
  preview: string | null;
  consequence: string;
  isMock: boolean;
};

const ICON: Record<string, React.ReactNode> = {
  send_email: <Mail />,
  publish_website: <Globe />,
  connect_domain: <Globe />,
  budget_override: <CircleDollarSign />,
  launch_campaign: <Megaphone />,
};

export function ApprovalQueue({ items, canDecide }: { items: ApprovalDetail[]; canDecide: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [rejecting, setRejecting] = useState<ApprovalDetail | null>(null);
  const [reason, setReason] = useState("");

  const decide = (id: string, approve: boolean, why?: string) =>
    start(async () => {
      const res = await decideApprovalAction(id, approve, why);
      if (!res.ok) return void toast.error(res.error);
      toast.success(approve ? "Approved — the agent continues." : "Rejected.");
      setRejecting(null);
      setReason("");
      router.refresh();
    });

  return (
    <>
      <ul className="grid gap-3 lg:grid-cols-2">
        {items.map((a) => (
          <li key={a.id} className="panel flex flex-col p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning-soft text-warning [&_svg]:size-[18px]">{ICON[a.kind] ?? <ShieldCheck />}</div>
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-warning">
                  {a.kindLabel} {a.isMock && <MockBadge />}
                </p>
                <p className="mt-0.5 text-[14.5px] font-semibold leading-snug">{a.summary}</p>
                <p className="mt-0.5 text-[12px] text-subtle">Requested {timeAgo(a.createdAt)}</p>
              </div>
            </div>

            {a.facts.length > 0 && (
              <dl className="mt-4 space-y-1.5 rounded-xl border border-border bg-surface-2 p-3 text-[13px]">
                {a.facts.map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <dt className="w-24 shrink-0 text-muted">{f.label}</dt>
                    <dd className="min-w-0 flex-1 break-words">
                      {f.href ? (
                        <a href={f.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                          Open <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        f.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {a.preview && <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-surface-2 p-3 text-[13px] leading-relaxed text-muted">{a.preview}</p>}

            <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{a.consequence}</p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {a.kind === "send_email" || a.kind === "launch_campaign" ? (
                <Button asChild variant="primary" className="h-11 flex-1 sm:h-10">
                  <Link href={a.reviewHref ?? "/emails"}>{a.kind === "send_email" ? "Review and approve email" : "Review and approve campaign"}</Link>
                </Button>
              ) : (
                <>
                  {a.reviewHref && (
                    <Button asChild variant="secondary" className="h-11 sm:h-10">
                      <Link href={a.reviewHref}>View details</Link>
                    </Button>
                  )}
                  <div className="flex flex-1 gap-2">
                    <Button variant="secondary" className="h-11 flex-1 hover:border-danger/40 hover:text-danger sm:h-10" disabled={!canDecide || pending} onClick={() => setRejecting(a)}>
                      <X /> Reject
                    </Button>
                    <Button variant="primary" className="h-11 flex-1 sm:h-10" disabled={!canDecide || pending} onClick={() => decide(a.id, true)}>
                      <Check /> Approve
                    </Button>
                  </div>
                </>
              )}
            </div>
            {!canDecide && a.kind !== "send_email" && a.kind !== "launch_campaign" && <p className="mt-2 text-[12px] text-subtle">Only admins and owners can approve or reject.</p>}
          </li>
        ))}
      </ul>

      <Dialog
        open={Boolean(rejecting)}
        onOpenChange={(v) => !v && setRejecting(null)}
        title="Reject this request?"
        description={rejecting?.summary}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setRejecting(null)}>
              Cancel
            </Button>
            <Button variant="danger" loading={pending} onClick={() => rejecting && decide(rejecting.id, false, reason.trim() || undefined)}>
              Reject
            </Button>
          </>
        }
      >
        <Textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (optional) — saved in the audit log" aria-label="Reason" maxLength={500} />
      </Dialog>
    </>
  );
}
