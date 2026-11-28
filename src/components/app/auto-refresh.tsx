"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Re-reads the server data of the current page every few seconds (paused while the tab is hidden). */
export function AutoRefresh({ seconds = 5 }: { seconds?: number }) {
  const router = useRouter();
  useEffect(() => {
    const iv = setInterval(() => {
      if (!document.hidden) router.refresh();
    }, seconds * 1000);
    return () => clearInterval(iv);
  }, [router, seconds]);
  return <span className="h-2 w-2 flex-none status-live rounded-full bg-brand text-brand" aria-label="Live" />;
}
