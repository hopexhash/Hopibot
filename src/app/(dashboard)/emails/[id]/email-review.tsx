"use client";

import { Check, FlaskConical, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, Field, Input, Textarea } from "@/components/ui";
import {
  approveAndSendAction,
  queueFollowUpAction,
  rejectEmailAction,
  sendEmailTestAction,
  updateEmailAction,
} from "@/server/actions/emails";

type Res = { ok: true } | { ok: false; error: string };

export function EmailReview({
  email,
  canAdmin,
  checks,
}: {
  email: {
    id: string;
    subject: string;
    bodyText: string;
    toEmail: string | null;
    status: string;
    kind: string;
    blockedReason: string | null;
  };
  canAdmin: boolean;
  checks: { label: string; ok: boolean }[];
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [subject, setSubject] = useState(email.subject);
  const [body, setBody] = useState(email.bodyText);
  const [to, setTo] = useState(email.toEmail ?? "");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [lawful, setLawful] = useState(false);
  const [isBusiness, setIsBusiness] = useState(false);
  const editable = ["draft", "awaiting_approval", "blocked"].includes(
    email.status,
  );
  const dirty =
    subject !== email.subject ||
    body !== email.bodyText ||
    to !== (email.toEmail ?? "");
  const run = (fn: () => Promise<Res>, msg: string, after?: () => void) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      after?.();
      router.refresh();
    });

  return (
    <div className="space-y-4">
      <Field label="To">
        <Input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          disabled={!editable}
          placeholder="Recipient (published business address)"
        />
      </Field>
      <Field label="Subject">
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={!editable}
        />
      </Field>
      <Field
        label="Message"
        hint="Plain text. The identification and opt-out footer is required and cannot be removed."
      >
        <Textarea
          rows={18}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={!editable}
          className="font-[inherit] leading-relaxed"
        />
      </Field>
      <div className="flex flex-wrap items-center justify-end gap-2">
        {editable && (
          <Button
            disabled={!dirty}
            loading={pending}
            onClick={() =>
              run(
                () =>
                  updateEmailAction(email.id, {
                    subject,
                    bodyText: body,
                    toEmail: to || null,
                  }) as Promise<Res>,
                "Saved",
              )
            }
          >
            Save changes
          </Button>
        )}
        {email.kind === "follow_up" && email.status === "draft" && (
          <Button
            variant="primary"
            loading={pending}
            onClick={() =>
              run(
                () => queueFollowUpAction(email.id) as Promise<Res>,
                "Follow-up queued for approval",
              )
            }
          >
            Queue for approval
          </Button>
        )}
        {["draft", "awaiting_approval", "blocked"].includes(email.status) && (
          <Button
            variant="danger-ghost"
            loading={pending}
            onClick={() =>
              run(
                () => rejectEmailAction(email.id) as Promise<Res>,
                "Email cancelled",
              )
            }
          >
            <X /> Reject
          </Button>
        )}
        {email.status === "awaiting_approval" && (
          <>
            <Button
              disabled={dirty || pending}
              onClick={() =>
                run(
                  () => sendEmailTestAction(email.id) as Promise<Res>,
                  "Test copy sent to your own address",
                )
              }
            >
              <FlaskConical /> Send test to myself
            </Button>
            <Button
              variant="success"
              disabled={
                !canAdmin ||
                dirty ||
                Boolean(email.blockedReason) ||
                checks.some((c) => !c.ok)
              }
              onClick={() => setConfirmOpen(true)}
            >
              <Send /> Approve & send
            </Button>
          </>
        )}
      </div>
      {email.status === "awaiting_approval" && !canAdmin && (
        <p className="text-right text-xs text-muted">
          Only administrators can approve outreach.
        </p>
      )}
      {dirty && email.status === "awaiting_approval" && (
        <p className="text-right text-xs text-muted">
          Save your edits before approving.
        </p>
      )}

      <Dialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Approve and send this email?"
        description="Once sent, an email cannot be recalled. Dutch law (Telecommunicatiewet art. 11.7) requires prior consent for unsolicited electronic marketing to natural persons, including sole traders (eenmanszaak)."
        footer={
          <Button
            variant="success"
            loading={pending}
            disabled={!lawful || !isBusiness}
            onClick={() =>
              run(
                () =>
                  approveAndSendAction(email.id, {
                    lawfulBasisConfirmed: lawful as true,
                    recipientIsBusiness: isBusiness as true,
                  }) as Promise<Res>,
                "Approved — sending now",
                () => setConfirmOpen(false),
              )
            }
          >
            <Check /> Approve & send
          </Button>
        }
      >
        <div className="space-y-3 text-[13px]">
          <p>
            Recipient: <b>{email.toEmail}</b>
          </p>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 accent-[var(--accent)]"
              checked={isBusiness}
              onChange={(e) => setIsBusiness(e.target.checked)}
            />
            The recipient is a legal entity (e.g. B.V., V.O.F., stichting) using
            a published business address — not a private individual or sole
            trader without consent.
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 accent-[var(--accent)]"
              checked={lawful}
              onChange={(e) => setLawful(e.target.checked)}
            />
            I have reviewed the content: it is accurate, not misleading,
            contains no fake urgency, and we have a lawful basis to send it.
          </label>
        </div>
      </Dialog>
    </div>
  );
}
