import { cn } from "@/lib/utils";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { HelpTip } from "@/components/ui";
import { CountUp } from "./count-up";

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  eyebrow?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <div className="label-mono mb-2.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-brand" aria-hidden />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[32px]">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">{actions}</div>}
    </div>
  );
}

type Tone = "accent" | "success" | "warning" | "danger" | "neutral";
const ICON_TONE: Record<Tone, string> = {
  accent: "text-subtle",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  neutral: "text-subtle",
};
const VALUE_TONE: Record<Tone, string> = { accent: "text-foreground", success: "text-foreground", warning: "text-foreground", danger: "text-danger", neutral: "text-foreground" };

export type Delta = { pct: number | null; direction: "up" | "down" | "flat"; good: boolean; label: string };

/**
 * Compares this period with the previous one. `pct` is null when there is nothing to
 * compare against (no fake percentages from a zero baseline).
 */
export function makeDelta(current: number, previous: number, opts: { label?: string; higherIsBetter?: boolean } = {}): Delta {
  const higherIsBetter = opts.higherIsBetter ?? true;
  const label = opts.label ?? "vs previous 30 days";
  if (current === previous) return { pct: previous === 0 ? null : 0, direction: "flat", good: true, label };
  const direction = current > previous ? "up" : "down";
  return { pct: previous === 0 ? null : ((current - previous) / Math.abs(previous)) * 100, direction, good: (direction === "up") === higherIsBetter, label };
}

export function DeltaBadge({ delta }: { delta: Delta }) {
  // Nothing in either period: a "no change" badge would only be noise.
  if (delta.direction === "flat" && delta.pct == null) return null;
  const Icon = delta.direction === "up" ? ArrowUpRight : delta.direction === "down" ? ArrowDownRight : Minus;
  const tone = delta.direction === "flat" ? "text-subtle" : delta.good ? "text-success" : "text-danger";
  const text = delta.direction === "flat" ? "No change" : delta.pct == null ? "New" : `${delta.pct > 0 ? "+" : ""}${Math.abs(delta.pct) >= 100 ? Math.round(delta.pct) : delta.pct.toFixed(1)}%`;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[12px] font-medium", tone)} title={delta.label}>
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      <span className="tabular">{text}</span>
    </span>
  );
}

/** KPI tile: real metric, comparison with the previous period, plain-language help, optional drill-down. */
export function StatCard({
  label,
  value,
  sub,
  icon,
  className,
  tone = "accent",
  delta,
  help,
  href,
}: {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  tone?: Tone;
  delta?: Delta;
  help?: React.ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="flex min-w-0 items-center gap-1.5 text-[12.5px] font-medium leading-tight text-muted">
          <span className="line-clamp-2">{label}</span>
          {help && <HelpTip label={`About ${label}`}>{help}</HelpTip>}
        </p>
        {icon && <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center [&_svg]:size-4 [&_svg]:stroke-[1.6]", ICON_TONE[tone])}>{icon}</div>}
      </div>
      <p className={cn("tabular mt-3 font-display text-[28px] font-semibold leading-none tracking-[-0.03em] sm:text-[32px]", VALUE_TONE[tone])}>{typeof value === "string" || typeof value === "number" ? <CountUp value={value} /> : value}</p>
      <div className="mt-2 flex min-h-[18px] flex-wrap items-center gap-x-2 gap-y-0.5">
        {delta && <DeltaBadge delta={delta} />}
        {sub && <span className="min-w-0 truncate text-[12px] text-muted">{sub}</span>}
      </div>
    </>
  );
  // The whole tile is the link target, but the "?" stays a separate control (no nested interactive elements).
  return (
    <div className={cn("panel panel-hover relative p-4 animate-fade-in", className)}>
      {href && <Link href={href} className="absolute inset-0 z-0 rounded-xl" aria-label={`${label}: open details`} />}
      <div className={cn("relative", href && "pointer-events-none [&_button]:pointer-events-auto")}>{body}</div>
    </div>
  );
}

export function Section({ title, description, actions, children, className }: { title: string; description?: string; actions?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("mb-8 min-w-0", className)}>
      <div className="mb-3.5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-[-0.01em] text-foreground">
            <span className="h-1.5 w-1.5 bg-brand" aria-hidden />
            {title}
          </h2>
          {description && <p className="mt-1 text-[13px] text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

/** Tabs that are plain links (work without JavaScript, keep state in the URL, scroll sideways on phones). */
export function LinkTabs({ tabs, current, href }: { tabs: { key: string; label: string; count?: number }[]; current: string; href: (key: string) => string }) {
  return (
    <div className="-mx-3.5 mb-5 flex gap-1 overflow-x-auto border-b border-border px-3.5 sm:mx-0 sm:px-0" role="tablist">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={href(t.key)}
          role="tab"
          aria-selected={current === t.key}
          scroll={false}
          className={cn(
            "tab-m -mb-px flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[13px] font-medium transition-colors duration-200",
            current === t.key ? "text-accent" : "text-muted hover:text-foreground",
          )}
        >
          {t.label}
          {t.count ? <span className="tabular rounded-md bg-surface-3 px-1.5 text-[11px] text-muted">{t.count}</span> : null}
        </Link>
      ))}
    </div>
  );
}

/** Period selector for analytics pages. Plain links and a GET form, so it works without JavaScript. */
export function RangePicker({ path, current, from, to }: { path: string; current: string; from: string; to: string }) {
  const presets = [
    { key: "today", label: "Today" },
    { key: "7d", label: "7 days" },
    { key: "30d", label: "30 days" },
    { key: "90d", label: "90 days" },
    { key: "year", label: "This year" },
  ];
  return (
    <div className="mb-5 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="-mx-3.5 flex gap-1.5 overflow-x-auto px-3.5 sm:mx-0 sm:px-0" role="group" aria-label="Period">
        {presets.map((p) => (
          <Link
            key={p.key}
            href={`${path}?range=${p.key}`}
            aria-current={current === p.key ? "true" : undefined}
            className={cn(
              "flex h-10 shrink-0 items-center rounded-xl border px-3.5 text-[13px] font-medium transition-colors",
              current === p.key ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-foreground",
            )}
          >
            {p.label}
          </Link>
        ))}
      </div>
      <form method="get" action={path} className="flex items-center gap-2">
        <input type="hidden" name="range" value="custom" />
        <input type="date" name="from" defaultValue={from} aria-label="From date" required className={cn("h-10 min-w-0 flex-1 rounded-xl border bg-surface-2 px-2.5 text-[16px] text-foreground focus:border-accent focus:outline-none sm:text-[13px] lg:w-[150px] lg:flex-none", current === "custom" ? "border-accent/40" : "border-border-strong")} />
        <span className="text-[12px] text-subtle">to</span>
        <input type="date" name="to" defaultValue={to} aria-label="To date" required className={cn("h-10 min-w-0 flex-1 rounded-xl border bg-surface-2 px-2.5 text-[16px] text-foreground focus:border-accent focus:outline-none sm:text-[13px] lg:w-[150px] lg:flex-none", current === "custom" ? "border-accent/40" : "border-border-strong")} />
        <button type="submit" className="h-10 shrink-0 rounded-xl border border-border bg-surface-2 px-3.5 text-[13px] font-medium hover:border-border-strong hover:text-accent">
          Apply
        </button>
      </form>
    </div>
  );
}
