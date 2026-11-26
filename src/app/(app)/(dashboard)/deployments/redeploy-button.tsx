"use client";

import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { deployPreviewAction } from "@/server/actions/websites";

export function RedeployButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      size="sm"
      variant="ghost"
      loading={pending}
      onClick={() =>
        start(async () => {
          const r = await deployPreviewAction(projectId);
          if (!r.ok) return void toast.error(r.error);
          toast.success("Redeploy queued");
          router.refresh();
        })
      }
    >
      <RotateCcw /> Retry
    </Button>
  );
}
