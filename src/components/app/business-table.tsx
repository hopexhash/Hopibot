"use client";

import {
  ArrowDown,
  ArrowUp,
  Building2,
  Download,
  ExternalLink,
  Play,
  ShieldOff,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Button,
  Dialog,
  EmptyState,
  MockBadge,
  ScoreRing,
} from "@/components/ui";
import { Table, TD, TH, THead, TR } from "@/components/ui/table";
import {
  categoryLabel,
  WEBSITE_STATUS_LABEL,
  WORKFLOW_ACTIONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  deleteBusinessesAction,
  suppressBusinessesAction,
} from "@/server/actions/businesses";
import { runPipelineAction } from "@/server/actions/orchestrator";
import { StatusBadge } from "./status";

export type BusinessTableRow = {
  id: string;
  name: string;
  category: string;
  city: string | null;
  websiteUrl: string | null;
  websiteStatus: string;
  websiteQuality: number | null;
  leadScore: number | null;
  researchStatus: string;
  pipelineStage: string;
  email: string | null;
  isMock: boolean;
};

function SortHeader({ label, k }: { label: string; k: string }) {
  const sp = useSearchParams();
  const pathname = usePathname();
  const active = sp.get("sort") === k;
  const dir = active && sp.get("dir") === "asc" ? "desc" : "asc";
  const next = new URLSearchParams(sp);
  next.set("sort", k);
  next.set("dir", dir);
  next.delete("page");
  return (
    <Link
      href={`${pathname}?${next}`}
      className={cn(
        "inline-flex items-center gap-1 hover:text-foreground",
        active && "text-foreground",
      )}
    >
      {label}
      {active &&
        (sp.get("dir") === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : (
          <ArrowDown className="h-3 w-3" />
        ))}
    </Link>
  );
}

export function BusinessTable({
  rows,
  total,
  page,
  pageSize,
  canAdmin,
}: {
  rows: BusinessTableRow[];
  total: number;
  page: number;
  pageSize: number;
  canAdmin: boolean;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [steps, setSteps] = useState<string[]>([
    "research",
    "contacts",
    "generate_website",
    "qc",
    "deploy",
  ]);
  const [pending, start] = useTransition();
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();
  const all = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggle = (id: string) =>
    setSelected((s) =>
      s.has(id) ? new Set([...s].filter((x) => x !== id)) : new Set(s).add(id),
    );
  const ids = [...selected];

  const runBulk = (
    fn: () => Promise<{ ok: boolean; error?: string }>,
    success: string,
  ) =>
    start(async () => {
      const res = await fn();
      if (!res.ok) return void toast.error(res.error);
      toast.success(success);
      setSelected(new Set());
      router.refresh();
    });

  const exportHref = `/api/businesses/export?${new URLSearchParams({ ...Object.fromEntries(sp), ...(ids.length ? { ids: ids.join(",") } : {}) })}`;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageHref = (p: number) => {
    const n = new URLSearchParams(sp);
    n.set("page", String(p));
    return `${pathname}?${n}`;
  };

  return (
    <div>
      <div className="mb-3 flex min-h-9 flex-wrap items-center gap-2">
        {ids.length > 0 ? (
          <>
            <span className="text-xs font-medium">{ids.length} selected</span>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setPipelineOpen(true)}
            >
              <Play /> Run agents
            </Button>
            <Button size="sm" asChild>
              <a href={exportHref}>
                <Download /> Export
              </a>
            </Button>
            <Button
              size="sm"
              onClick={() =>
                runBulk(
                  () => suppressBusinessesAction(ids),
                  "Added to suppression list",
                )
              }
              loading={pending}
            >
              <ShieldOff /> Suppress
            </Button>
            {canAdmin && (
              <Button
                size="sm"
                variant="danger-ghost"
                onClick={() =>
                  confirm(
                    `Delete ${ids.length} business(es) and all related data?`,
                  ) && runBulk(() => deleteBusinessesAction(ids), "Deleted")
                }
              >
                <Trash2 /> Delete
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelected(new Set())}
            >
              Clear
            </Button>
          </>
        ) : (
          <>
            <span className="text-xs text-muted">
              {total.toLocaleString()} businesses
            </span>
            <div className="flex-1" />
            <Button size="sm" asChild>
              <a href={exportHref}>
                <Download /> Export CSV
              </a>
            </Button>
          </>
        )}
      </div>
      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border">
          <EmptyState
            icon={<Building2 />}
            title="No businesses match"
            description="Adjust the filters or run a discovery campaign."
            action={
              <Button asChild variant="primary">
                <Link href="/discovery">Discover leads</Link>
              </Button>
            }
          />
        </div>
      ) : (
        <>
          {/* Phones: one card per business instead of a ten-column table that has to be scrolled sideways. */}
          <ul className="space-y-2 md:hidden">
            <li className="flex items-center gap-3 px-1 pb-1 text-xs text-muted">
              <label className="flex min-h-11 items-center gap-3">
                <input
                  type="checkbox"
                  checked={all}
                  onChange={() =>
                    setSelected(
                      all ? new Set() : new Set(rows.map((r) => r.id)),
                    )
                  }
                  className="h-5 w-5 accent-[var(--accent)]"
                />
                Select all
              </label>
            </li>
            {rows.map((r) => (
              <li
                key={r.id}
                className={cn(
                  "panel flex gap-3 p-3.5",
                  selected.has(r.id) && "bg-accent-soft/40",
                )}
              >
                <label className="-m-2 flex h-11 w-11 flex-none items-center justify-center">
                  <input
                    type="checkbox"
                    aria-label={`Select ${r.name}`}
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                    className="h-5 w-5 accent-[var(--accent)]"
                  />
                </label>
                <Link href={`/businesses/${r.id}`} className="min-w-0 flex-1">
                  <span className="flex items-start gap-2">
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[15px] font-medium">
                          {r.name}
                        </span>
                        {r.isMock && <MockBadge />}
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-muted">
                        {categoryLabel(r.category)}
                        {r.city ? ` · ${r.city}` : ""}
                      </span>
                    </span>
                    <ScoreRing score={r.leadScore} />
                  </span>
                  <span className="mt-2.5 block truncate text-[13px] text-muted">
                    {r.email ?? "No contact email"}
                  </span>
                  <span className="mt-1 block truncate text-[13px] text-muted">
                    {r.websiteUrl && r.websiteStatus === "has_website"
                      ? r.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")
                      : (WEBSITE_STATUS_LABEL[r.websiteStatus] ??
                        r.websiteStatus)}
                    {r.websiteQuality != null
                      ? ` · site quality ${r.websiteQuality}`
                      : ""}
                  </span>
                  <span className="mt-2.5 flex items-center gap-2 text-xs text-muted">
                    Research <StatusBadge status={r.researchStatus} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Table className="hidden md:block">
            <THead>
              <tr>
                <TH className="w-8">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={all}
                    onChange={() =>
                      setSelected(
                        all ? new Set() : new Set(rows.map((r) => r.id)),
                      )
                    }
                    className="accent-[var(--accent)]"
                  />
                </TH>
                <TH>
                  <SortHeader label="Business" k="name" />
                </TH>
                <TH>Category</TH>
                <TH>
                  <SortHeader label="Location" k="city" />
                </TH>
                <TH>Website</TH>
                <TH>Contact email</TH>
                <TH className="text-center">
                  <SortHeader label="Lead score" k="score" />
                </TH>
                <TH className="text-center">
                  <SortHeader label="Site quality" k="quality" />
                </TH>
                <TH>Research</TH>
                <TH className="text-right">Actions</TH>
              </tr>
            </THead>
            <tbody>
              {rows.map((r) => (
                <TR
                  key={r.id}
                  className={cn(selected.has(r.id) && "bg-accent-soft/40")}
                >
                  <TD>
                    <input
                      type="checkbox"
                      aria-label={`Select ${r.name}`}
                      checked={selected.has(r.id)}
                      onChange={() => toggle(r.id)}
                      className="accent-[var(--accent)]"
                    />
                  </TD>
                  <TD className="max-w-[240px]">
                    <Link
                      href={`/businesses/${r.id}`}
                      className="flex items-center gap-2 font-medium hover:text-accent"
                    >
                      <span className="truncate">{r.name}</span>
                      {r.isMock && <MockBadge />}
                    </Link>
                  </TD>
                  <TD className="whitespace-nowrap text-muted">
                    {categoryLabel(r.category)}
                  </TD>
                  <TD className="whitespace-nowrap text-muted">
                    {r.city ?? "—"}
                  </TD>
                  <TD className="max-w-[200px]">
                    {r.websiteUrl && r.websiteStatus === "has_website" ? (
                      <a
                        href={r.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex max-w-full items-center gap-1 text-muted hover:text-accent"
                      >
                        <span className="truncate">
                          {r.websiteUrl.replace(/^https?:\/\/(www\.)?/, "")}
                        </span>
                        <ExternalLink className="h-3 w-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted">
                        {WEBSITE_STATUS_LABEL[r.websiteStatus] ??
                          r.websiteStatus}
                      </span>
                    )}
                  </TD>
                  <TD className="max-w-[200px] truncate text-muted">
                    {r.email ?? "—"}
                  </TD>
                  <TD className="text-center">
                    <ScoreRing score={r.leadScore} />
                  </TD>
                  <TD className="tabular text-center text-muted">
                    {r.websiteQuality ?? "—"}
                  </TD>
                  <TD>
                    <StatusBadge status={r.researchStatus} />
                  </TD>
                  <TD className="text-right">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={`/businesses/${r.id}`}>Open</Link>
                    </Button>
                  </TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {pages > 1 && (
        <div className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>
            Page {page} of {pages}
          </span>
          <div className="flex gap-1">
            <Button size="sm" asChild disabled={page <= 1}>
              <Link
                href={pageHref(Math.max(1, page - 1))}
                aria-disabled={page <= 1}
              >
                Previous
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link
                href={pageHref(Math.min(pages, page + 1))}
                aria-disabled={page >= pages}
              >
                Next
              </Link>
            </Button>
          </div>
        </div>
      )}
      <Dialog
        open={pipelineOpen}
        onOpenChange={setPipelineOpen}
        title={`Run agents for ${ids.length} business(es)`}
        description="Steps run in order for each business. Emails are drafted for your approval — never sent automatically."
        footer={
          <Button
            variant="primary"
            loading={pending}
            disabled={!steps.length}
            onClick={() =>
              start(async () => {
                const res = await runPipelineAction(ids, steps);
                if (!res.ok) return void toast.error(res.error);
                toast.success(`Started for ${res.data.count} business(es)`);
                setPipelineOpen(false);
                setSelected(new Set());
                router.push(`/automations/runs/${res.data.runId}`);
              })
            }
          >
            <Play /> Start
          </Button>
        }
      >
        <div className="flex flex-wrap gap-2">
          {WORKFLOW_ACTIONS.map((a) => {
            const on = steps.includes(a.key);
            return (
              <button
                key={a.key}
                onClick={() =>
                  setSteps(
                    on
                      ? steps.filter((s) => s !== a.key)
                      : WORKFLOW_ACTIONS.map((w) => w.key).filter(
                          (k) => k === a.key || steps.includes(k),
                        ),
                  )
                }
                className={cn(
                  "rounded-lg border px-2.5 py-1.5 text-xs font-medium",
                  on
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-muted",
                )}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
}
