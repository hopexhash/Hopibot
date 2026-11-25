"use client";

import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { markNotificationsReadAction } from "@/server/actions/notifications";

export function MarkAllRead({ count }: { count: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <Button
      loading={pending}
      onClick={() =>
        start(async () => {
          const r = await markNotificationsReadAction();
          if (!r.ok) return void toast.error(r.error);
          router.refresh();
        })
      }
    >
      <CheckCheck /> Mark {count} as read
    </Button>
  );
}
