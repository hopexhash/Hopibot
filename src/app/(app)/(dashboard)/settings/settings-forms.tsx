"use client";

import { setRainEnabled, useRainEnabled } from "@/components/app/matrix-rain";
import { Trash2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Dialog, Field, Input, Select, Switch } from "@/components/ui";
import { DEFAULT_SCORING_WEIGHTS } from "@/lib/constants";
import type { OrgSettings } from "@/lib/settings";
import { addMemberAction, changeRoleAction, removeMemberAction, updateSettingsAction } from "@/server/actions/settings";

function useSave() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const save = (patch: Record<string, unknown>, msg = "Settings saved") =>
    start(async () => {
      const r = await updateSettingsAction(patch);
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      router.refresh();
    });
  return { pending, save };
}

/** Contact details and Google services of the public website. Everything here is optional. */
export function WebsiteForm({ settings, canAdmin }: { settings: OrgSettings; canAdmin: boolean }) {
  const { pending, save } = useSave();
  const [s, setS] = useState(settings.site);
  const f = (k: keyof OrgSettings["site"], label: string, hint: string, placeholder = "") => (
    <Field label={label} hint={hint}>
      <Input value={s[k]} placeholder={placeholder} onChange={(e) => setS({ ...s, [k]: e.target.value.trim() === "" ? "" : e.target.value })} disabled={!canAdmin} />
    </Field>
  );
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Public website & Google</CardTitle>
          <CardDescription>Shown on the HOPI website. The agency name, address, KvK number and reply-to email above appear in its footer and legal pages. Google services stay off until you paste an ID; visitors are then asked for cookie consent first.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {f("phone", "Phone number on the website", "Shown in the contact section and footer. Leave empty to show no number.", "+31 6 12345678")}
          {f("googleBusinessUrl", "Google Business Profile link", "The public link of your profile. Used to tell Google the website and the profile belong together.", "https://g.page/…")}
          {f("googleVerification", "Search Console verification code", "In Search Console choose the HTML tag method and paste only the code inside content=\"…\".")}
          {f("gaId", "Google Analytics 4 ID", "Measures visits and form submissions, only after a visitor accepts cookies.", "G-XXXXXXXXXX")}
          {f("gtmId", "Google Tag Manager ID", "Optional. If filled in, Tag Manager is loaded instead of the Analytics ID above.", "GTM-XXXXXXX")}
        </div>
        {canAdmin && (
          <div className="mt-4 flex justify-end">
            <Button variant="primary" loading={pending} onClick={() => save({ site: { ...s, phone: s.phone.trim(), gaId: s.gaId.trim().toUpperCase(), gtmId: s.gtmId.trim().toUpperCase(), googleVerification: s.googleVerification.trim(), googleBusinessUrl: s.googleBusinessUrl.trim() } }, "Website settings saved")}>
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AgencyForm({ settings, canAdmin }: { settings: OrgSettings; canAdmin: boolean }) {
  const { pending, save } = useSave();
  const [s, setS] = useState(settings);
  const f = (k: keyof OrgSettings, label: string, hint?: string, type = "text") => (
    <Field label={label} hint={hint}>
      <Input type={type} value={String(s[k] ?? "")} onChange={(e) => setS({ ...s, [k]: e.target.value })} disabled={!canAdmin} />
    </Field>
  );
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Agency identity & sender</CardTitle>
          <CardDescription>Shown in every outreach email and on preview footers. Required before any email can be sent.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          {f("agencyName", "Agency name")}
          {f("agencyWebsite", "Agency website")}
          {f("agencyAddress", "Business address", "Required for identification in commercial email.")}
          {f("kvkNumber", "KvK number (Chamber of Commerce)")}
          {f("senderName", "Sender name")}
          {f("senderEmail", "Sender email", "Must be on a domain verified in Resend.", "email")}
          {f("replyToEmail", "Reply-to email", undefined, "email")}
          {f("previewBaseDomain", "Preview base domain", "Agency-owned, e.g. previews.youragency.nl → business.previews.youragency.nl")}
        </div>
        {canAdmin && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="primary"
              loading={pending}
              onClick={() => save({ agencyName: s.agencyName, agencyWebsite: s.agencyWebsite, agencyAddress: s.agencyAddress, kvkNumber: s.kvkNumber, senderName: s.senderName, senderEmail: s.senderEmail, replyToEmail: s.replyToEmail, previewBaseDomain: s.previewBaseDomain })}
            >
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const WEIGHT_LABELS: Record<keyof typeof DEFAULT_SCORING_WEIGHTS, string> = {
  noWebsite: "No website",
  outdatedWebsite: "Outdated website",
  poorMobile: "Poor mobile experience",
  missingContactForm: "Missing contact form",
  poorSeo: "Poor SEO fundamentals",
  incompleteInfo: "Incomplete business information",
};

export function ScoringForm({ settings, canAdmin }: { settings: OrgSettings; canAdmin: boolean }) {
  const { pending, save } = useSave();
  const [w, setW] = useState(settings.scoringWeights);
  const [minScore, setMin] = useState(settings.minLeadScore);
  const [qc, setQc] = useState(settings.qcMaxRetries);
  const [setup, setSetup] = useState(settings.defaultPricing.setupFeeEur);
  const [monthly, setMonthly] = useState(settings.defaultPricing.monthlyFeeEur);
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Lead scoring, quality & pricing</CardTitle>
          <CardDescription>Weights apply to newly discovered businesses. Totals above 100 are normalised.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3">
          {(Object.keys(WEIGHT_LABELS) as (keyof typeof WEIGHT_LABELS)[]).map((k) => (
            <Field key={k} label={WEIGHT_LABELS[k]}>
              <Input type="number" min={0} max={100} value={w[k]} onChange={(e) => setW({ ...w, [k]: Number(e.target.value) })} disabled={!canAdmin} />
            </Field>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">Total weight: {total}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Field label="Qualified when score ≥">
            <Input type="number" min={0} max={100} value={minScore} onChange={(e) => setMin(Number(e.target.value))} disabled={!canAdmin} />
          </Field>
          <Field label="QC correction retries">
            <Input type="number" min={0} max={10} value={qc} onChange={(e) => setQc(Number(e.target.value))} disabled={!canAdmin} />
          </Field>
          <Field label="Default setup fee (€)">
            <Input type="number" min={0} value={setup} onChange={(e) => setSetup(Number(e.target.value))} disabled={!canAdmin} />
          </Field>
          <Field label="Default monthly fee (€)">
            <Input type="number" min={0} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} disabled={!canAdmin} />
          </Field>
        </div>
        {canAdmin && (
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setW({ ...DEFAULT_SCORING_WEIGHTS })}>
              Reset weights
            </Button>
            <Button variant="primary" loading={pending} onClick={() => save({ scoringWeights: w, minLeadScore: minScore, qcMaxRetries: qc, defaultPricing: { setupFeeEur: setup, monthlyFeeEur: monthly } })}>
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MembersCard({ members, currentUserId, isOwner, canAdmin }: { members: { userId: string; name: string | null; email: string; role: string }[]; currentUserId: string; isOwner: boolean; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [open, setOpen] = useState(false);
  const [m, setM] = useState({ name: "", email: "", role: "member", password: "" });
  const run = (fn: () => Promise<{ ok: boolean; error?: string }>, msg: string, after?: () => void) =>
    start(async () => {
      const r = await fn();
      if (!r.ok) return void toast.error(r.error);
      toast.success(msg);
      after?.();
      router.refresh();
    });
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Team</CardTitle>
          <CardDescription>Owners manage roles; admins approve outreach, publishing and budgets; members run agents; viewers read.</CardDescription>
        </div>
        {canAdmin && (
          <Button size="sm" onClick={() => setOpen(true)}>
            <UserPlus /> Add member
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-1">
        {members.map((u) => (
          <div key={u.userId} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium">
                {u.name ?? u.email} {u.userId === currentUserId && <span className="text-xs text-muted">(you)</span>}
              </p>
              <p className="truncate text-xs text-muted">{u.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <Select className="h-8 w-28" value={u.role} disabled={!isOwner || u.userId === currentUserId || pending} onChange={(e) => run(() => changeRoleAction(u.userId, e.target.value), "Role updated")}>
                {["owner", "admin", "member", "viewer"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Select>
              {canAdmin && u.userId !== currentUserId && (
                <Button size="icon-sm" variant="ghost" aria-label="Remove member" onClick={() => confirm(`Remove ${u.email}?`) && run(() => removeMemberAction(u.userId), "Member removed")}>
                  <Trash2 />
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Add a team member"
        description="Creates an account with a temporary password. Share it securely and ask them to change it."
        footer={
          <Button variant="primary" loading={pending} onClick={() => run(() => addMemberAction(m as never), "Member added", () => setOpen(false))}>
            Add member
          </Button>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <Input value={m.name} onChange={(e) => setM({ ...m, name: e.target.value })} />
          </Field>
          <Field label="Email">
            <Input type="email" value={m.email} onChange={(e) => setM({ ...m, email: e.target.value })} />
          </Field>
          <Field label="Role">
            <Select value={m.role} onChange={(e) => setM({ ...m, role: e.target.value })}>
              <option value="admin">admin</option>
              <option value="member">member</option>
              <option value="viewer">viewer</option>
            </Select>
          </Field>
          <Field label="Temporary password">
            <Input type="password" value={m.password} onChange={(e) => setM({ ...m, password: e.target.value })} />
          </Field>
        </div>
      </Dialog>
    </Card>
  );
}

export function InterfaceCard() {
  const rain = useRainEnabled();
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Interface</CardTitle>
          <CardDescription>Stored on this device only.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[14px] font-medium">Matrix rain background</p>
            <p className="text-[12.5px] text-muted">Subtle animated code rain behind the dashboard. Automatically off when your device asks for reduced motion.</p>
          </div>
          <Switch checked={rain} onCheckedChange={setRainEnabled} label="Matrix rain background" />
        </div>
      </CardContent>
    </Card>
  );
}
