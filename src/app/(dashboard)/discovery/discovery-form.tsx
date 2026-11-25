"use client";

import { Loader2, Radar, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { StatusBadge } from "@/components/app/status";
import { Button, Card, Field, Input, MockBadge, Progress, Select } from "@/components/ui";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { formatTime } from "@/lib/utils";
import { startDiscoveryAction } from "@/server/actions/orchestrator";

type CampaignState = {
  campaign: { id: string; status: string; found: number; qualified: number; duplicates: number; params: { limit: number }; isMock: boolean; error: string | null };
  logs: { id: number; level: string; message: string; createdAt: string }[];
  task: { status: string; error: { message: string } | null } | null;
};

export function DiscoveryForm({ defaultMinScore, activeCampaignId }: { defaultMinScore: number; activeCampaignId?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [form, setForm] = useState({
    country: "Netherlands",
    city: "Rotterdam",
    category: "restaurant",
    radiusKm: 10,
    limit: 25,
    minScore: defaultMinScore,
    websiteStatus: "any",
    keywords: "",
    businessName: "",
  });
  const [campaignId, setCampaignId] = useState<string | undefined>(activeCampaignId);
  const [state, setState] = useState<CampaignState | null>(null);
  const set = (k: keyof typeof form, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!campaignId) return;
    let stop = false;
    const poll = async () => {
      try {
        const res = await fetch(`/api/campaigns/${campaignId}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as CampaignState;
        if (stop) return;
        setState(data);
        const finished = data.campaign.status === "COMPLETED" || data.task?.status === "FAILED";
        if (finished) {
          stop = true;
          router.refresh();
        }
      } catch {
        /* transient */
      }
    };
    void poll();
    const iv = setInterval(() => !stop && void poll(), 2000);
    return () => {
      stop = true;
      clearInterval(iv);
    };
  }, [campaignId, router]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    start(async () => {
      const res = await startDiscoveryAction({ ...form, radiusKm: Number(form.radiusKm), limit: Number(form.limit), minScore: Number(form.minScore) });
      if (!res.ok) return void toast.error(res.error);
      toast.success("Discovery started");
      setState(null);
      setCampaignId(res.data.campaignId);
      router.replace(`/discovery?campaign=${res.data.campaignId}`);
    });
  };

  const c = state?.campaign;
  const failed = state?.task?.status === "FAILED";
  const running = c && !failed && c.status !== "COMPLETED";
  const pct = c ? (c.status === "COMPLETED" ? 100 : Math.min(95, Math.round(((c.found + c.duplicates) / Math.max(1, c.params.limit)) * 100) || 8)) : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="p-5 lg:col-span-3">
        <form onSubmit={submit} className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <Field label="Country">
            <Input value={form.country} onChange={(e) => set("country", e.target.value)} required />
          </Field>
          <Field label="City">
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} required />
          </Field>
          <Field label="Business category">
            <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
              {BUSINESS_CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Search radius (km)">
            <Input type="number" min={1} max={50} value={form.radiusKm} onChange={(e) => set("radiusKm", e.target.value)} />
          </Field>
          <Field label="Number of businesses">
            <Input type="number" min={1} max={200} value={form.limit} onChange={(e) => set("limit", e.target.value)} />
          </Field>
          <Field label="Minimum lead score">
            <Input type="number" min={0} max={100} value={form.minScore} onChange={(e) => set("minScore", e.target.value)} />
          </Field>
          <Field label="Website status">
            <Select value={form.websiteStatus} onChange={(e) => set("websiteStatus", e.target.value)}>
              <option value="any">Any</option>
              <option value="no_website">No website found</option>
              <option value="has_website">Has a website</option>
            </Select>
          </Field>
          <Field label="Keywords (optional)">
            <Input value={form.keywords} placeholder="e.g. italian, family" onChange={(e) => set("keywords", e.target.value)} />
          </Field>
          <Field label="Business name (optional)">
            <Input value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
          </Field>
          <div className="col-span-2 flex items-center justify-between gap-3 md:col-span-3">
            <p className="text-xs text-muted">Business size isn&apos;t exposed by Google Places, so it can&apos;t be filtered reliably.</p>
            <Button type="submit" variant="primary" size="lg" loading={pending} disabled={Boolean(running)}>
              <Search /> START DISCOVERY
            </Button>
          </div>
        </form>
      </Card>
      <Card className="p-5 lg:col-span-2">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-semibold">Live progress</h3>
          {c && (
            <div className="flex items-center gap-2">
              {c.isMock && <MockBadge />}
              <StatusBadge status={failed ? "FAILED" : c.status} />
            </div>
          )}
        </div>
        {!c ? (
          <div className="flex flex-col items-center py-10 text-center text-xs text-muted">
            <Radar className="mb-2 h-6 w-6 text-subtle" />
            Configure a search and press Start discovery.
          </div>
        ) : (
          <>
            <Progress value={pct} tone={failed ? "danger" : c.status === "COMPLETED" ? "success" : "accent"} />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["Found", c.found],
                ["Qualified", c.qualified],
                ["Duplicates", c.duplicates],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-surface-2 py-2">
                  <div className="tabular text-lg font-semibold">{v}</div>
                  <div className="text-[11px] text-muted">{l}</div>
                </div>
              ))}
            </div>
            {failed && <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">{state?.task?.error?.message}</p>}
            <ol className="mt-4 max-h-56 space-y-1 overflow-y-auto text-xs">
              {running && (
                <li className="flex items-center gap-2 text-muted">
                  <Loader2 className="h-3 w-3 animate-spin" /> Working…
                </li>
              )}
              {state?.logs.map((l) => (
                <li key={l.id} className="flex gap-2">
                  <span className="tabular shrink-0 text-subtle">{formatTime(l.createdAt)}</span>
                  <span className={l.level === "error" ? "text-danger" : l.level === "warn" ? "text-warning" : "text-muted"}>{l.message}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </Card>
    </div>
  );
}
