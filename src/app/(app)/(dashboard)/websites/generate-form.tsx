"use client";

import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Select } from "@/components/ui";
import { generateWebsiteAction } from "@/server/actions/websites";

export function GenerateForm({ businesses }: { businesses: { id: string; name: string; city: string; score: number | null; research: string }[] }) {
  const [id, setId] = useState("");
  const [pending, start] = useTransition();
  const router = useRouter();
  const selected = businesses.find((b) => b.id === id);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <p className="mb-1.5 text-xs font-medium">Generate a website for a business</p>
        <Select value={id} onChange={(e) => setId(e.target.value)} aria-label="Business">
          <option value="">{businesses.length ? "Choose a business without a website project…" : "All businesses already have a website project"}</option>
          {businesses.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name} — {b.city} {b.score != null ? `(score ${b.score})` : ""}
            </option>
          ))}
        </Select>
        {selected && selected.research !== "done" && <p className="mt-1 text-xs text-muted">Research runs first so the website uses verified information.</p>}
      </div>
      <Button
        variant="primary"
        disabled={!id}
        loading={pending}
        onClick={() =>
          start(async () => {
            const res = await generateWebsiteAction(id, { withResearch: true });
            if (!res.ok) return void toast.error(res.error);
            toast.success("Queued — the builder will create, test and version the site.");
            setId("");
            router.refresh();
          })
        }
      >
        <Sparkles /> Generate website
      </Button>
    </div>
  );
}
