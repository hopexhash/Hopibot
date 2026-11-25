"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, Input, Select, Switch } from "@/components/ui";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { DEFAULT_CATALOG, type Catalog } from "@/lib/catalog";
import type { OrgSettings } from "@/lib/settings";
import { updateSettingsAction } from "@/server/actions/settings";

type Row = { key: string; name: string; description: string; priceCents: number | null; enabled: boolean };
const euros = (c: number | null) => (c === null ? "" : String(c / 100));
const cents = (v: string) => (v.trim() === "" ? null : Math.max(0, Math.round(Number(v.replace(",", ".")) * 100) || 0));

function Rows<T extends Row>({ rows, onChange, suffix, disabled, allowCustom }: { rows: T[]; onChange: (rows: T[]) => void; suffix: string; disabled: boolean; allowCustom?: boolean }) {
  const set = (i: number, patch: Partial<Row>) => onChange(rows.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div key={r.key} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 rounded-xl border border-border bg-surface-2 p-3 sm:grid-cols-[1.2fr_2fr_150px_auto]">
          <Input aria-label="Name" value={r.name} disabled={disabled} onChange={(e) => set(i, { name: e.target.value })} />
          <Switch checked={r.enabled} disabled={disabled} onCheckedChange={(v) => set(i, { enabled: v })} label={`Offer ${r.name}`} />
          <Input aria-label="Description" value={r.description} disabled={disabled} onChange={(e) => set(i, { description: e.target.value })} className="col-span-2 sm:col-span-1" />
          <div className="col-span-2 flex items-center gap-2 sm:col-span-1">
            <span className="text-muted">€</span>
            <Input aria-label={`Price of ${r.name}`} inputMode="decimal" placeholder={allowCustom ? "on request" : "0"} value={euros(r.priceCents)} disabled={disabled} onChange={(e) => set(i, { priceCents: allowCustom ? cents(e.target.value) : (cents(e.target.value) ?? 0) })} />
            <span className="whitespace-nowrap text-xs text-muted">{suffix}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Packages, care plans and add-ons offered on every demo page. */
export function PricingForm({ settings, canAdmin }: { settings: OrgSettings; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [c, setC] = useState<Catalog>(settings.catalog);
  const save = (catalog: Catalog) =>
    start(async () => {
      const r = await updateSettingsAction({ catalog });
      if (!r.ok) return void toast.error(r.error);
      toast.success("Prices saved. New demo pages and orders use them immediately.");
      router.refresh();
    });
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Website packages</CardTitle>
            <CardDescription>One-time prices shown on every demo page, excluding VAT. Switch a package off to stop offering it.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Rows rows={c.packages} onChange={(packages) => setC({ ...c, packages })} suffix="one-time" disabled={!canAdmin} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Monthly care plans</CardTitle>
            <CardDescription>Recurring revenue. Customers pick one plan, or none.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Rows rows={c.plans} onChange={(plans) => setC({ ...c, plans })} suffix="per month" disabled={!canAdmin} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Add-ons</CardTitle>
            <CardDescription>Optional extras. Leave the price empty for “on request”: customers can ask for it, but it is never charged online.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Rows rows={c.addons} onChange={(addons) => setC({ ...c, addons })} suffix="one-time" disabled={!canAdmin} allowCustom />
          <Field label="VAT percentage" className="mt-4 max-w-[160px]" hint="Shown as a note under the totals.">
            <Input inputMode="decimal" value={String(c.vatPct)} disabled={!canAdmin} onChange={(e) => setC({ ...c, vatPct: Math.max(0, Math.min(30, Number(e.target.value) || 0)) })} />
          </Field>
        </CardContent>
      </Card>
      {canAdmin && (
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => save(c)} loading={pending}>
            Save prices
          </Button>
          <Button
            variant="secondary"
            disabled={pending}
            onClick={() => {
              setC(DEFAULT_CATALOG);
              save(DEFAULT_CATALOG);
            }}
          >
            Reset to defaults
          </Button>
        </div>
      )}
    </div>
  );
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Autopilot: lets the agency discover, analyse and build demos on its own, inside hard limits. */
export function AutopilotForm({ settings, canAdmin }: { settings: OrgSettings; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [a, setA] = useState(settings.autopilot);
  const [cities, setCities] = useState(settings.autopilot.cities.join(", "));
  const [minOpp, setMinOpp] = useState(String(settings.minOpportunityScore));
  const save = () =>
    start(async () => {
      const list = cities.split(",").map((x) => x.trim()).filter(Boolean).slice(0, 30);
      if (a.enabled && (!list.length || !a.categories.length)) return void toast.error("Add at least one city and one industry before switching Autopilot on.");
      const r = await updateSettingsAction({ autopilot: { ...a, cities: list }, minOpportunityScore: Math.max(0, Math.min(100, Number(minOpp) || 0)) });
      if (!r.ok) return void toast.error(r.error);
      toast.success(a.enabled ? "Autopilot is on. It starts work within the next few minutes during working hours." : "Saved. Autopilot is off.");
      router.refresh();
    });
  const toggleCat = (k: string) => setA({ ...a, categories: a.categories.includes(k) ? a.categories.filter((x) => x !== k) : [...a.categories, k] });
  const toggleDay = (d: number) => setA({ ...a, days: a.days.includes(d) ? a.days.filter((x) => x !== d) : [...a.days, d].sort() });
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Autopilot</CardTitle>
            <CardDescription>
              When on, your agents find businesses, analyse their websites and build demos by themselves — within the limits below and your spending limits. Emails are still only drafted: nothing is sent without your approval.
            </CardDescription>
          </div>
          <Switch checked={a.enabled} disabled={!canAdmin} onCheckedChange={(v) => setA({ ...a, enabled: v })} label="Autopilot" />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Country">
              <Select value={a.country} disabled={!canAdmin} onChange={(e) => setA({ ...a, country: e.target.value as "Netherlands" | "Belgium" })}>
                <option>Netherlands</option>
                <option>Belgium</option>
              </Select>
            </Field>
            <Field label="Cities" hint="Separate with commas. Autopilot works through them in turn.">
              <Input value={cities} placeholder="Rotterdam, Den Haag, Utrecht" disabled={!canAdmin} onChange={(e) => setCities(e.target.value)} />
            </Field>
          </div>
          <div>
            <p className="mb-2 text-[13px] font-medium">Industries to target</p>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_CATEGORIES.map((c) => (
                <button key={c.key} type="button" disabled={!canAdmin} aria-pressed={a.categories.includes(c.key)} onClick={() => toggleCat(c.key)} className={`min-h-10 rounded-full border px-3.5 text-[13px] transition ${a.categories.includes(c.key) ? "border-accent bg-accent-soft text-accent" : "border-border text-muted hover:border-border-strong"}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-[13px] font-medium">Working days</p>
              <div className="flex flex-wrap gap-1.5">
                {DAYS.map((d, i) => (
                  <button key={d} type="button" disabled={!canAdmin} aria-pressed={a.days.includes(i)} onClick={() => toggleDay(i)} className={`h-10 w-12 rounded-lg border text-[13px] ${a.days.includes(i) ? "border-accent bg-accent-soft text-accent" : "border-border text-muted"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="From (hour)" hint="Amsterdam time">
                <Input inputMode="numeric" value={String(a.startHour)} disabled={!canAdmin} onChange={(e) => setA({ ...a, startHour: Math.max(0, Math.min(23, Number(e.target.value) || 0)) })} />
              </Field>
              <Field label="Until (hour)">
                <Input inputMode="numeric" value={String(a.endHour)} disabled={!canAdmin} onChange={(e) => setA({ ...a, endHour: Math.max(1, Math.min(24, Number(e.target.value) || 0)) })} />
              </Field>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Businesses to discover per day" hint="Hard daily limit.">
              <Input inputMode="numeric" value={String(a.dailyDiscoveryLimit)} disabled={!canAdmin} onChange={(e) => setA({ ...a, dailyDiscoveryLimit: Math.max(0, Math.min(500, Number(e.target.value) || 0)) })} />
            </Field>
            <Field label="Demo websites per day" hint="Website generation is the main AI cost.">
              <Input inputMode="numeric" value={String(a.dailyWebsiteLimit)} disabled={!canAdmin} onChange={(e) => setA({ ...a, dailyWebsiteLimit: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })} />
            </Field>
            <Field label="Minimum opportunity score" hint="No website is generated below this score (0–100).">
              <Input inputMode="numeric" value={minOpp} disabled={!canAdmin} onChange={(e) => setMinOpp(e.target.value)} />
            </Field>
          </div>
          {canAdmin && (
            <Button onClick={save} loading={pending}>
              Save autopilot settings
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
