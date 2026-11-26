"use client";

import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button, Card } from "@/components/ui";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Card className="mx-auto mt-10 max-w-lg p-6 text-center sm:p-8">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-danger-soft text-danger">
        <TriangleAlert className="h-6 w-6" />
      </div>
      <h2 className="text-[18px] font-semibold">This page could not be loaded</h2>
      <p className="mt-2 text-[14px] leading-relaxed text-muted">
        Something went wrong while loading it. Your data is safe. Try again; if it keeps happening, the System Health page shows whether a service is down.
      </p>
      {error.digest && <p className="term mt-2 text-[12px] text-subtle">Reference: {error.digest}</p>}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button variant="primary" onClick={reset} className="h-11 sm:h-10">
          Try again
        </Button>
        <Button asChild className="h-11 sm:h-10">
          <Link href="/health">Open System Health</Link>
        </Button>
      </div>
    </Card>
  );
}
