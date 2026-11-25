"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Dialog, Field, Input, Select } from "@/components/ui";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { addLeadAction } from "@/server/actions/businesses";

const EMPTY = { name: "", category: "local_service", city: "", country: "Netherlands", address: "", phone: "", websiteUrl: "" };

/** Add one lead by hand. Its website (if any) is checked and scored like agent-found leads. */
export function AddLeadButton({ variant = "secondary" }: { variant?: "primary" | "secondary" }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(EMPTY);
  const [pending, start] = useTransition();
  const set = (patch: Partial<typeof EMPTY>) => setF((cur) => ({ ...cur, ...patch }));
  const save = () =>
    start(async () => {
      const r = await addLeadAction(f);
      if (!r.ok) return void toast.error(r.error);
      toast.success(`${f.name} added with lead score ${r.data.leadScore}.`);
      setOpen(false);
      setF(EMPTY);
      router.push(`/businesses/${r.data.id}`);
    });
  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>
        <Plus /> Add lead
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Add a lead"
        description="For a business you found yourself. If you enter its website, it is checked and scored automatically (this takes a few seconds)."
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={save} loading={pending} disabled={f.name.trim().length < 2 || !f.city.trim()}>
              Add lead
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Business name" className="sm:col-span-2">
            <Input autoFocus value={f.name} onChange={(e) => set({ name: e.target.value })} maxLength={160} />
          </Field>
          <Field label="Type of business">
            <Select value={f.category} onChange={(e) => set({ category: e.target.value })}>
              {BUSINESS_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="City">
            <Input value={f.city} onChange={(e) => set({ city: e.target.value })} maxLength={80} />
          </Field>
          <Field label="Website (optional)" className="sm:col-span-2" hint="Leave empty if the business has no website.">
            <Input type="url" inputMode="url" placeholder="https://" value={f.websiteUrl} onChange={(e) => set({ websiteUrl: e.target.value })} autoCapitalize="none" />
          </Field>
          <Field label="Address (optional)">
            <Input value={f.address} onChange={(e) => set({ address: e.target.value })} maxLength={240} />
          </Field>
          <Field label="Phone (optional)">
            <Input type="tel" inputMode="tel" value={f.phone} onChange={(e) => set({ phone: e.target.value })} maxLength={40} />
          </Field>
        </div>
      </Dialog>
    </>
  );
}
