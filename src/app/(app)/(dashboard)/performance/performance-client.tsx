"use client";

import { FlaskConical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Select } from "@/components/ui";
import { runLabTestAction } from "@/server/actions/performance";

/** Starts a lab test of one page through Google PageSpeed Insights (10 to 40 seconds). */
export function LabTestForm({ pages, canAdmin, connected }: { pages: { path: string; label: string }[]; canAdmin: boolean; connected: boolean }) {
  const router = useRouter();
  const [path, setPath] = useState("/");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [pending, start] = useTransition();
  const off = !canAdmin || !connected;
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <Select aria-label="Page" value={path} onChange={(e) => setPath(e.target.value)} disabled={off} className="sm:max-w-[320px]">
        {pages.map((p) => (
          <option key={p.path} value={p.path}>
            {p.path === "/" ? "Homepage" : p.path}
          </option>
        ))}
      </Select>
      <Select aria-label="Device" value={strategy} onChange={(e) => setStrategy(e.target.value as "mobile" | "desktop")} disabled={off} className="sm:max-w-[140px]">
        <option value="mobile">Phone</option>
        <option value="desktop">Desktop</option>
      </Select>
      <Button
        variant="primary"
        loading={pending}
        disabled={off}
        onClick={() =>
          start(async () => {
            const r = await runLabTestAction(path, strategy);
            if (!r.ok) return void toast.error(r.error);
            toast.success(`Lab test done: score ${r.data.score}, LCP ${(r.data.lcp / 1000).toFixed(1)} s.`);
            router.refresh();
          })
        }
      >
        <FlaskConical className="h-4 w-4" /> {pending ? "Testing (up to 40 s)…" : "Run lab test"}
      </Button>
    </div>
  );
}
