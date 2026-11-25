"use client";

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Field, Input, Select, Textarea } from "@/components/ui";
import { CONTACT_PERMISSIONS, permissionSendable, type OutreachAssessment } from "@/lib/outreach-compliance";
import { setContactPermissionAction } from "@/server/actions/businesses";

/** Shows whether this business may be emailed, why, and lets an admin record the basis. */
export function ContactPermission({ businessId, permission, source, proof, decidedAt, assessment, canAdmin }: { businessId: string; permission: string; source: string; proof: string; decidedAt: string | null; assessment: OutreachAssessment; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [f, setF] = useState({ permission, source, proof });
  const ok = assessment.decision === "send";
  const save = () =>
    start(async () => {
      const r = await setContactPermissionAction(businessId, f as never);
      if (!r.ok) return void toast.error(r.error);
      toast.success("Contact permission recorded.");
      router.refresh();
    });
  return (
    <div className="space-y-3">
      <div className={`flex gap-2.5 rounded-xl border p-3 text-[13px] ${ok ? "border-success/25 bg-success-soft" : assessment.decision === "blocked" ? "border-danger/30 bg-danger-soft" : "border-warning/30 bg-warning-soft"}`}>
        {ok ? <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-success" /> : <ShieldAlert className={`mt-0.5 h-4 w-4 flex-none ${assessment.decision === "blocked" ? "text-danger" : "text-warning"}`} />}
        <div className="min-w-0">
          <p className="font-medium">{ok ? "Emails may be sent after your approval" : assessment.decision === "blocked" ? "This business must not be emailed" : "Your decision is needed before any email"}</p>
          <p className="mt-0.5 text-muted">{assessment.reason}</p>
          {!ok && <p className="mt-1 text-foreground">{assessment.action}</p>}
        </div>
      </div>
      {canAdmin && (
        <>
          <Field label="Basis for contacting">
            <Select value={f.permission} onChange={(e) => setF({ ...f, permission: e.target.value })}>
              {CONTACT_PERMISSIONS.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </Select>
          </Field>
          {permissionSendable(f.permission) && (
            <>
              <Field label="Where does it come from?" hint="For example: info@ address published on their own contact page.">
                <Input value={f.source} maxLength={300} onChange={(e) => setF({ ...f, source: e.target.value })} />
              </Field>
              <Field label={f.permission === "consent" ? "Proof of consent" : "Proof or note (optional)"} hint="Who agreed, when and how — or a link to the evidence.">
                <Textarea rows={2} value={f.proof} maxLength={1000} onChange={(e) => setF({ ...f, proof: e.target.value })} />
              </Field>
            </>
          )}
          <Button size="sm" onClick={save} loading={pending} disabled={f.permission === permission && f.source === source && f.proof === proof}>
            Save permission
          </Button>
        </>
      )}
      {decidedAt && <p className="text-xs text-subtle">Last recorded {new Date(decidedAt).toLocaleDateString("en-GB")}. Not legal advice — when in doubt, ask for consent first.</p>}
    </div>
  );
}
