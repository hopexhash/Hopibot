"use client";

import { ShieldOff, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, Card, EmptyState, Input, Select } from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { addSuppressionAction, removeSuppressionAction } from "@/server/actions/emails";

export function SuppressionManager({ rows, canAdmin }: { rows: { id: string; value: string; reason: string; source: string | null; createdAt: string }[]; canAdmin: boolean }) {
  const [value, setValue] = useState("");
  const [reason, setReason] = useState("manual");
  const [pending, start] = useTransition();
  const router = useRouter();
  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-2 p-4 sm:flex-row">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="email@business.nl or business.nl" />
        <Select value={reason} onChange={(e) => setReason(e.target.value)} className="sm:w-48">
          <option value="manual">Manual</option>
          <option value="opt_out">Opt-out request</option>
          <option value="bounce">Bounce</option>
          <option value="complaint">Complaint</option>
        </Select>
        <Button
          variant="primary"
          loading={pending}
          onClick={() =>
            start(async () => {
              const r = await addSuppressionAction(value, reason);
              if (!r.ok) return void toast.error(r.error);
              toast.success("Added to suppression list");
              setValue("");
              router.refresh();
            })
          }
        >
          <ShieldOff /> Suppress
        </Button>
      </Card>
      {rows.length === 0 ? (
        <Card>
          <EmptyState icon={<ShieldOff />} title="Suppression list is empty" description="Unsubscribes, bounces, complaints and erasure requests are added automatically." />
        </Card>
      ) : (
        <Table>
          <THead>
            <tr>
              <TH>Email / domain</TH>
              <TH>Reason</TH>
              <TH>Source</TH>
              <TH>Added</TH>
              <TH />
            </tr>
          </THead>
          <tbody>
            {rows.map((r) => (
              <TR key={r.id}>
                <TD className="font-medium">{r.value}</TD>
                <TD className="text-muted">{r.reason.replace("_", " ")}</TD>
                <TD className="text-muted">{r.source ?? "—"}</TD>
                <TD className="text-muted">{formatDate(r.createdAt)}</TD>
                <TD className="text-right">
                  {canAdmin && ["manual", "bounce"].includes(r.reason) && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label="Remove"
                      onClick={() =>
                        start(async () => {
                          const res = await removeSuppressionAction(r.id);
                          if (!res.ok) return void toast.error(res.error);
                          router.refresh();
                        })
                      }
                    >
                      <Trash2 />
                    </Button>
                  )}
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
