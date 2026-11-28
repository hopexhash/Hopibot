"use client";

import { ScanSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Badge, Button } from "@/components/ui";
import { FEEDBACK_OPTIONS, QUALIFICATION_META, type FeedbackKey, type Qualification } from "@/lib/qualification";
import { cn } from "@/lib/utils";
import { inspectWebsitesAction, setWebsiteFeedbackAction } from "@/server/actions/qualification";

const TONE = { danger: "danger", warning: "warning", accent: "accent", success: "success", muted: "neutral" } as const;

export function QualificationBadge({ value, className }: { value: string | null | undefined; className?: string }) {
  const meta = value ? QUALIFICATION_META[value as Qualification] : null;
  if (!meta) return null;
  return (
    <Badge tone={TONE[meta.tone]} title={meta.help} className={cn("whitespace-nowrap font-semibold tracking-wide", className)}>
      {meta.badge}
    </Badge>
  );
}

/** Your own verdict on a website. Saved as a calibration example for future AI decisions. */
export function WebsiteFeedback({ businessId, current }: { businessId: string; current: FeedbackKey | null }) {
  const [pending, start] = useTransition();
  const [chosen, setChosen] = useState<FeedbackKey | null>(current);
  const router = useRouter();
  return (
    <div>
      <p className="text-[13px] font-medium">What do you think of this website?</p>
      <p className="mt-0.5 text-xs text-muted">Your answer overrides the decision for this business and teaches HOPI what you consider good or bad.</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {FEEDBACK_OPTIONS.map((o) => (
          <button
            key={o.key}
            type="button"
            disabled={pending}
            aria-pressed={chosen === o.key}
            onClick={() =>
              start(async () => {
                const res = await setWebsiteFeedbackAction(businessId, { classification: o.key });
                if (!res.ok) return void toast.error(res.error);
                setChosen(o.key);
                toast.success(o.key === "needs_redesign" ? "Saved. This business is now a qualified lead." : "Saved. This business is no longer a lead.");
                router.refresh();
              })
            }
            className={cn(
              "min-h-11 rounded-lg border px-3 py-2 text-left text-[13px] font-medium transition-colors disabled:opacity-60",
              chosen === o.key ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function InspectWebsiteButton({ businessIds, label = "Inspect website" }: { businessIds: string[]; label?: string }) {
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <Button
      size="sm"
      loading={pending}
      onClick={() =>
        start(async () => {
          const res = await inspectWebsitesAction(businessIds);
          if (!res.ok) return void toast.error(res.error);
          toast.success(`Inspection started for ${res.data.count} website${res.data.count === 1 ? "" : "s"}. This takes about a minute each.`);
          router.refresh();
        })
      }
    >
      <ScanSearch /> {label}
    </Button>
  );
}
