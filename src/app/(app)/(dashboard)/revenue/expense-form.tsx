"use client";

import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, ConfirmDialog, Field, Input, Select } from "@/components/ui";
import { addExpenseAction, deleteExpenseAction } from "@/server/actions/finance";

const CATEGORY_LABEL: Record<string, string> = { hosting: "Hosting & domains", email: "Email service", software: "Software & tools", contractor: "Freelancers", other: "Other" };

export function ExpenseForm({ canEdit }: { canEdit: boolean }) {
  const router = useRouter();
  const [f, setF] = useState({ category: "hosting", description: "", amount: "", date: new Date().toISOString().slice(0, 10) });
  const [pending, start] = useTransition();
  if (!canEdit) return <p className="text-[12.5px] text-subtle">Only admins and owners can add expenses.</p>;
  const save = () =>
    start(async () => {
      const r = await addExpenseAction({ category: f.category, description: f.description, amountEur: Number(f.amount), incurredOn: f.date });
      if (!r.ok) return void toast.error(r.error);
      toast.success("Expense added.");
      setF({ ...f, description: "", amount: "" });
      router.refresh();
    });
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[180px_1fr_130px_160px_auto] lg:items-end">
      <Field label="Type">
        <Select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}>
          {Object.entries(CATEGORY_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="What was it for?">
        <Input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="Vercel Pro, March" maxLength={200} />
      </Field>
      <Field label="Amount (€)">
        <Input type="number" inputMode="decimal" min={0} step={0.01} value={f.amount} onChange={(e) => setF({ ...f, amount: e.target.value })} />
      </Field>
      <Field label="Date">
        <Input type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
      </Field>
      <Button onClick={save} loading={pending} disabled={f.description.trim().length < 2 || !(Number(f.amount) > 0)} className="h-11 sm:col-span-2 sm:h-10 lg:col-span-1">
        <Plus /> Add
      </Button>
    </div>
  );
}

export function DeleteExpense({ id, label }: { id: string; label: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  return (
    <>
      <Button variant="ghost" size="icon-sm" aria-label={`Delete expense ${label}`} onClick={() => setOpen(true)}>
        <Trash2 />
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this expense?"
        description={`“${label}” will be removed from your profit calculation.`}
        confirmLabel="Delete"
        loading={pending}
        onConfirm={() =>
          start(async () => {
            const r = await deleteExpenseAction(id);
            setOpen(false);
            if (!r.ok) return void toast.error(r.error);
            router.refresh();
          })
        }
      />
    </>
  );
}


