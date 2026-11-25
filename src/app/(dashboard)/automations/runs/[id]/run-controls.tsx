"use client";

import { Square } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { cancelRunAction } from "@/server/actions/orchestrator";

export function RunAutoRefresh({ active }: { active: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => !document.hidden && router.refresh(), 3000);
    return () => clearInterval(iv);
  }, [active, router]);
  return null;
}

export function CancelRunButton({ runId }: { runId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      size="sm"
      variant="danger-ghost"
      loading={pending}
      onClick={() =>
        confirm("Cancel this run? Running tasks finish; pending ones are cancelled.") &&
        start(async () => {
          const r = await cancelRunAction(runId);
          if (!r.ok) return void toast.error(r.error);
          toast.success("Run cancelled");
          router.refresh();
        })
      }
    >
      <Square /> Cancel run
    </Button>
  );
}
