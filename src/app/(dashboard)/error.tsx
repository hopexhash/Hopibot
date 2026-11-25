"use client";

import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { Button, Card } from "@/components/ui";

export default function DashboardError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Card className="mx-auto mt-10 max-w-lg p-8 text-center">
      <TriangleAlert className="mx-auto mb-3 h-8 w-8 text-danger" />
      <h2 className="text-lg font-semibold">This page failed to load</h2>
      <p className="mt-2 text-sm text-muted">{error.message || "An unexpected error occurred."}</p>
      {error.digest && <p className="mt-1 font-mono text-xs text-subtle">Reference: {error.digest}</p>}
      <Button className="mt-5" variant="primary" onClick={reset}>
        Try again
      </Button>
    </Card>
  );
}
