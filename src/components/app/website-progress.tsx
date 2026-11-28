import { and, desc, eq } from "drizzle-orm";
import { Check, CircleAlert, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CheckDraw } from "@/components/ui";
import { WEBSITE_STAGES } from "@/lib/website-stages";
import { cn, formatDateTime } from "@/lib/utils";
import { db, schema } from "@/server/db";
import { AutoRefresh } from "./auto-refresh";

type Visual = { overall: number; passed: boolean; scores: Record<string, number>; weaknesses?: { area: string; problem: string; fix: string }[]; verdict?: string; round?: number };

const SCORE_LABEL: Record<string, string> = { visualDesign: "Visual design", industryRelevance: "Industry relevance", typography: "Typography", layout: "Layout quality", mobile: "Mobile experience", functionality: "Functionality", brandIdentity: "Brand identity" };

/**
 * How this website was made: the eleven stages with what each one actually did, taken from
 * the events the agents recorded, plus the scores of the visual review.
 */
export async function WebsiteProgress({ businessId, organizationId, status, visual }: { businessId: string; organizationId: string; status: string; visual: Visual | null }) {
  const l = schema.agentLogs;
  const rows = await db()
    .select({ id: l.id, message: l.message, status: l.status, data: l.data, createdAt: l.createdAt })
    .from(l)
    .where(and(eq(l.organizationId, organizationId), eq(l.businessId, businessId), eq(l.kind, "website.stage")))
    .orderBy(desc(l.id))
    .limit(120);
  if (!rows.length && !visual) return null;
  // Only the most recent generation: everything from its research (stage 1) or its start (stage 2) onwards.
  const stageOf = (r: (typeof rows)[number]) => Number((r.data as { stage?: number } | null)?.stage ?? 0);
  const startIdx = rows.findIndex((r) => stageOf(r) === 2);
  let current = startIdx >= 0 ? rows.slice(0, startIdx + 1) : rows;
  const before = startIdx >= 0 ? rows.slice(startIdx + 1).find((r) => stageOf(r) === 1) : undefined;
  if (before && startIdx >= 0 && rows[startIdx].createdAt.getTime() - before.createdAt.getTime() < 3 * 3600_000) current = [...current, ...rows.slice(startIdx + 1).filter((r) => stageOf(r) === 1).slice(0, 2)];
  const latest = new Map<number, (typeof rows)[number]>();
  for (const r of current) if (!latest.has(stageOf(r))) latest.set(stageOf(r), r);
  const working = ["generating", "needs_fixes", "testing"].includes(status);
  const reached = Math.max(0, ...latest.keys());

  return (
    <Card className={cn("mb-4", working && "building-line")}>
      <CardHeader>
        <div>
          <CardTitle>How this website was made</CardTitle>
          <CardDescription>Each stage as the agents reported it. {working ? "Updating while the agents work." : rows[0] ? `Last activity ${formatDateTime(rows[0].createdAt)}.` : ""}</CardDescription>
        </div>
        {working && <AutoRefresh seconds={5} />}
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ol className="space-y-1">
          {WEBSITE_STAGES.map((s) => {
            const e = latest.get(s.n);
            const state = !e ? (s.n < reached ? "skipped" : "pending") : e.status === "running" ? (working ? "running" : "done") : e.status === "warning" ? "warning" : "done";
            const detail = e ? e.message.replace(/^[^:]+:\s*/, "") : state === "skipped" ? "Did not run for this version." : "";
            return (
              <li key={s.n} className={cn("flex gap-3 rounded-lg px-2 py-2 transition-colors duration-300", state === "running" && "bg-[rgba(255,196,61,0.05)]")}>
                <span
                  className={cn(
                    "mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full border text-[11px] font-semibold tabular transition-colors duration-300",
                    // While the site is being built, a stage that finishes gets one ring; a finished site is shown calmly.
                    state === "done" && cn("border-foreground bg-foreground text-background", working && "done-ring"),
                    state === "running" && "border-warning text-warning",
                    state === "warning" && "border-warning bg-warning-soft text-warning",
                    (state === "pending" || state === "skipped") && "border-border text-subtle",
                  )}
                >
                  {state === "done" ? working ? <CheckDraw className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" /> : state === "running" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : state === "warning" ? <CircleAlert className="h-3.5 w-3.5" /> : String(s.n).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className={cn("block text-[13.5px] font-medium", (state === "pending" || state === "skipped") && "text-muted")}>
                    <span className="tabular text-subtle">{String(s.n).padStart(2, "0")}</span> {s.label}
                  </span>
                  {detail && <span className="mt-0.5 block break-words text-[12.5px] leading-snug text-muted">{detail}</span>}
                </span>
              </li>
            );
          })}
        </ol>
        {visual && (
          <div>
            <p className="text-[13px] font-medium">Visual quality review{visual.round ? " (after one improvement round)" : ""}</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className={cn("tabular text-[40px] font-semibold leading-none", visual.passed ? "text-accent" : "text-warning")}>{visual.overall}</span>
              <span className="text-[13px] text-muted">/ 100 {visual.passed ? "· meets the bar" : "· below the bar"}</span>
            </p>
            <ul className="mt-4 space-y-2.5">
              {Object.entries(visual.scores).map(([k, v]) => (
                <li key={k}>
                  <div className="flex justify-between text-[12.5px]">
                    <span>{SCORE_LABEL[k] ?? k}</span>
                    <span className="tabular text-muted">{v}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3">
                    <div className={cn("bar-grow h-full rounded-full", v >= 75 ? "bg-accent" : v >= 60 ? "bg-warning" : "bg-danger")} style={{ width: `${v}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            {visual.verdict && <p className="mt-4 text-[13px] leading-relaxed text-muted">{visual.verdict}</p>}
            {visual.weaknesses && visual.weaknesses.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {visual.weaknesses.slice(0, 4).map((w) => (
                  <li key={w.problem} className="text-[12.5px] leading-snug text-muted">
                    <b className="font-medium text-foreground">{w.area}:</b> {w.problem}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
