"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Field, HelpTip, Input, Select } from "@/components/ui";
import type { OrgSettings } from "@/lib/settings";
import { updateSettingsAction } from "@/server/actions/settings";

/** Global AI model and spending limits (apply to every agent, on top of their own limits). */
export function AiSettingsForm({ settings, models, canAdmin }: { settings: OrgSettings; models: { id: string; label: string }[]; canAdmin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [s, setS] = useState({
    defaultModel: settings.defaultModel,
    dailySpendLimitUsd: String(settings.dailySpendLimitUsd),
    monthlySpendLimitUsd: String(settings.monthlySpendLimitUsd),
    budgetWarnPct: String(settings.budgetWarnPct),
    usdToEurRate: String(settings.usdToEurRate),
  });
  const save = () =>
    start(async () => {
      const r = await updateSettingsAction({
        defaultModel: s.defaultModel,
        dailySpendLimitUsd: Number(s.dailySpendLimitUsd),
        monthlySpendLimitUsd: Number(s.monthlySpendLimitUsd),
        budgetWarnPct: Number(s.budgetWarnPct),
        usdToEurRate: Number(s.usdToEurRate),
      });
      if (!r.ok) return void toast.error(r.error);
      toast.success("Saved.");
      router.refresh();
    });
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Default AI model</CardTitle>
            <CardDescription>Used for planning objectives and as the starting point for new agents. Each agent can use a different model on its own page.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Field label="Model" className="max-w-md" hint="More capable models think better but cost more per task.">
            <Select value={s.defaultModel} onChange={(e) => setS({ ...s, defaultModel: e.target.value })} disabled={!canAdmin}>
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </Select>
          </Field>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Spending limits</CardTitle>
            <CardDescription>The most your agents may spend on paid services. When a limit is reached, paid agents pause and ask you before every task.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Per day (USD)">
              <Input type="number" inputMode="decimal" min={0} step={1} value={s.dailySpendLimitUsd} onChange={(e) => setS({ ...s, dailySpendLimitUsd: e.target.value })} disabled={!canAdmin} />
            </Field>
            <Field label="Per month (USD)">
              <Input type="number" inputMode="decimal" min={0} step={1} value={s.monthlySpendLimitUsd} onChange={(e) => setS({ ...s, monthlySpendLimitUsd: e.target.value })} disabled={!canAdmin} />
            </Field>
            <Field label="Warn me at (%)" hint="You get a notification at this share of a limit.">
              <Input type="number" inputMode="numeric" min={10} max={100} step={5} value={s.budgetWarnPct} onChange={(e) => setS({ ...s, budgetWarnPct: e.target.value })} disabled={!canAdmin} />
            </Field>
            <Field
              label="Dollar to euro rate"
              hint={
                <span className="inline-flex items-center gap-1.5">
                  For profit in euros. <HelpTip>API services bill in US dollars while your revenue is in euros. This rate is only used to show profit; it does not change what you are charged.</HelpTip>
                </span>
              }
            >
              <Input type="number" inputMode="decimal" min={0.1} max={10} step={0.01} value={s.usdToEurRate} onChange={(e) => setS({ ...s, usdToEurRate: e.target.value })} disabled={!canAdmin} />
            </Field>
          </div>
        </CardContent>
      </Card>
      {canAdmin ? (
        <div className="flex justify-end">
          <Button variant="primary" onClick={save} loading={pending} className="h-11 w-full sm:h-10 sm:w-auto">
            Save
          </Button>
        </div>
      ) : (
        <p className="text-[12.5px] text-subtle">Only admins and owners can change these settings.</p>
      )}
    </div>
  );
}
