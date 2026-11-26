"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info" | "outline";

const MAP: Record<string, { label: string; tone: Tone; pulse?: boolean }> = {
  // task statuses
  PENDING: { label: "Pending", tone: "neutral" },
  RUNNING: { label: "Running", tone: "info", pulse: true },
  WAITING_FOR_APPROVAL: { label: "Awaiting approval", tone: "warning" },
  COMPLETED: { label: "Completed", tone: "success" },
  FAILED: { label: "Failed", tone: "danger" },
  CANCELLED: { label: "Cancelled", tone: "outline" },
  // website projects
  draft: { label: "Draft", tone: "neutral" },
  generating: { label: "Generating", tone: "info", pulse: true },
  testing: { label: "Testing", tone: "info", pulse: true },
  needs_fixes: { label: "Fixing issues", tone: "warning", pulse: true },
  ready: { label: "Ready", tone: "success" },
  failed: { label: "Failed", tone: "danger" },
  // approvals
  pending: { label: "Pending", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  // deployments
  queued: { label: "Queued", tone: "neutral" },
  building: { label: "Building", tone: "info", pulse: true },
  error: { label: "Error", tone: "danger" },
  cancelled: { label: "Cancelled", tone: "outline" },
  // emails
  awaiting_approval: { label: "Awaiting approval", tone: "warning" },
  sending: { label: "Sending", tone: "info", pulse: true },
  sent: { label: "Sent", tone: "success" },
  blocked: { label: "Blocked", tone: "danger" },
  // research
  not_started: { label: "Not started", tone: "neutral" },
  in_progress: { label: "In progress", tone: "info", pulse: true },
  done: { label: "Done", tone: "success" },
  // integrations
  connected: { label: "Connected", tone: "success" },
  untested: { label: "Not tested", tone: "neutral" },
  live: { label: "Live", tone: "success" },
  mock: { label: "Mock mode", tone: "warning" },
  unavailable: { label: "Not configured", tone: "neutral" },
};

export function StatusBadge({ status, className, label }: { status: string; className?: string; label?: string }) {
  const m = MAP[status] ?? { label: status.replace(/_/g, " ").toLowerCase(), tone: "neutral" as Tone };
  // Animate only a change seen while the page is open (for example Running → Completed),
  // never the first appearance: a table full of badges must not flicker on load.
  const previous = useRef(status);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (previous.current !== status) {
      previous.current = status;
      setChanged(true);
    }
  }, [status]);
  return (
    <Badge key={status} tone={m.tone} className={cn("capitalize-first", changed && "animate-badge-swap", className)}>
      <span
        className={cn("status-dot inline-block h-1.5 w-1.5 rounded-full bg-current", m.pulse && "animate-pulse-dot")}
        aria-hidden
      />
      {label ?? m.label}
    </Badge>
  );
}
