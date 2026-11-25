"use client";

import { Check, CircleDollarSign, Globe, Mail, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button, EmptyState } from "@/components/ui";
import { timeAgo } from "@/lib/utils";
import { decideApprovalAction } from "@/server/actions/approvals";

type Approval = { id: string; kind: string; summary: string; subjectType: string; subjectId: string; createdAt: string };

const ICON: Record<string, React.ReactNode> = {
  send_email: <Mail />,
  publish_website: <Globe />,
  connect_domain: <Globe />,
  budget_override: <CircleDollarSign />,
};

export function ApprovalList({ approvals }: { approvals: Approval[] }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  if (!approvals.length) return <EmptyState className="py-6" icon={<ShieldCheck />} title="Nothing waiting" description="Outreach, publishing and budget overrides will appear here." />;
  const decide = (id: string, approve: boolean) =>
    start(async () => {
      const res = await decideApprovalAction(id, approve);
      if (!res.ok) return void toast.error(res.error);
      toast.success(approve ? "Approved" : "Rejected");
      router.refresh();
    });
  return (
    <ul className="space-y-1">
      {approvals.map((a) => (
        <li key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warning-soft text-warning [&_svg]:size-4">{ICON[a.kind] ?? <ShieldCheck />}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium">{a.summary}</p>
            <p className="text-[11px] text-muted">
              {a.kind.replace(/_/g, " ")} · {timeAgo(a.createdAt)}
            </p>
          </div>
          {a.kind === "send_email" ? (
            <Button asChild size="sm">
              <Link href={`/emails/${a.subjectId}`}>Review</Link>
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button size="icon-sm" variant="ghost" aria-label="Reject" disabled={pending} onClick={() => decide(a.id, false)}>
                <X />
              </Button>
              <Button size="icon-sm" variant="success" aria-label="Approve" disabled={pending} onClick={() => decide(a.id, true)}>
                <Check />
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
