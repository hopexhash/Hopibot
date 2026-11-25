"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Field, Input } from "@/components/ui";
import { updateSettingsAction } from "@/server/actions/settings";

export function LimitsForm({ daily, monthly, canAdmin }: { daily: number; monthly: number; canAdmin: boolean }) {
  const [d, setD] = useState(String(daily));
  const [m, setM] = useState(String(monthly));
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const r = await updateSettingsAction({ dailySpendLimitUsd: Number(d), monthlySpendLimitUsd: Number(m) });
          if (!r.ok) return void toast.error(r.error);
          toast.success("Limits updated");
          router.refresh();
        });
      }}
    >
      <div className="grid grid-cols-2 gap-2">
        <Field label="Daily (USD)">
          <Input type="number" min={0} step={1} value={d} onChange={(e) => setD(e.target.value)} disabled={!canAdmin} />
        </Field>
        <Field label="Monthly (USD)">
          <Input type="number" min={0} step={1} value={m} onChange={(e) => setM(e.target.value)} disabled={!canAdmin} />
        </Field>
      </div>
      {canAdmin && (
        <Button type="submit" size="sm" variant="primary" loading={pending} className="w-full">
          Save limits
        </Button>
      )}
    </form>
  );
}
