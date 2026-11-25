"use client";

import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn, formatUsd } from "@/lib/utils";

export type ValueFormat = "number" | "usd" | "eur";
const FORMATTERS: Record<ValueFormat, (v: number) => string> = {
  number: (v) => new Intl.NumberFormat("en-US").format(v),
  usd: (v) => formatUsd(v),
  eur: (v) => `€${Math.round(v).toLocaleString("nl-NL")}`,
};

export const SERIES = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

type Datum = Record<string, string | number | null>;
type Series = { key: string; label: string };

const axisProps = {
  stroke: "var(--chart-axis)",
  tickLine: false,
  axisLine: false,
  fontSize: 11,
  tick: { fill: "var(--chart-axis)" },
} as const;

function ChartTooltip({
  active,
  payload,
  label,
  format,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string; dataKey: string }[];
  label?: string;
  format?: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="mono rounded-lg border border-border-strong bg-[#08100c] px-3 py-2 text-xs shadow-[0_0_24px_-6px_rgba(0,255,102,0.4)]">
      <div className="mono mb-1 font-medium text-foreground">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span>{p.name}</span>
          <span className="tabular ml-auto pl-3 font-medium text-foreground">{format ? format(Number(p.value)) : p.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Legend is shown only for 2+ series (a single series is named by the card title). */
function Legend({ series }: { series: Series[] }) {
  if (series.length < 2) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-3 text-xs text-muted">
      {series.map((s, i) => (
        <span key={s.key} className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: SERIES[i] }} />
          {s.label}
        </span>
      ))}
    </div>
  );
}

function TableView({ data, xKey, series, format }: { data: Datum[]; xKey: string; series: Series[]; format?: (v: number) => string }) {
  return (
    <div className="max-h-56 overflow-auto rounded-lg border border-border">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-surface-2 text-muted">
          <tr>
            <th className="px-3 py-1.5 text-left font-medium">{xKey}</th>
            {series.map((s) => (
              <th key={s.key} className="px-3 py-1.5 text-right font-medium">
                {s.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-3 py-1.5">{String(d[xKey])}</td>
              {series.map((s) => (
                <td key={s.key} className="tabular px-3 py-1.5 text-right">
                  {format ? format(Number(d[s.key] ?? 0)) : (d[s.key] ?? 0)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChartCard({
  title,
  description,
  data,
  xKey,
  series,
  kind = "area",
  height = 220,
  format,
  className,
  empty,
}: {
  title: string;
  description?: string;
  data: Datum[];
  xKey: string;
  series: Series[];
  kind?: "area" | "bar" | "line";
  height?: number;
  format?: ValueFormat;
  className?: string;
  empty?: string;
}) {
  const [table, setTable] = useState(false);
  const fmt = format ? FORMATTERS[format] : undefined;
  const hasData = data.some((d) => series.some((s) => Number(d[s.key] ?? 0) !== 0));
  return (
    <div className={cn("panel p-4 animate-fade-in sm:p-5", className)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="mono text-[11.5px] font-semibold uppercase tracking-[0.14em]">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
        </div>
        <button onClick={() => setTable((t) => !t)} className="shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-muted hover:bg-surface-2 hover:text-foreground">
          {table ? "Chart" : "Table"}
        </button>
      </div>
      <Legend series={series} />
      {!hasData ? (
        <div className="flex items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted" style={{ height }}>
          {empty ?? "No data yet"}
        </div>
      ) : table ? (
        <TableView data={data} xKey={xKey} series={series} format={fmt} />
      ) : (
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            {kind === "bar" ? (
              <BarChart data={data} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barCategoryGap="28%">
                <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey={xKey} {...axisProps} interval="preserveStartEnd" minTickGap={12} />
                <YAxis {...axisProps} allowDecimals={false} tickFormatter={fmt ? (v) => fmt(Number(v)) : undefined} width={56} />
                <Tooltip cursor={{ fill: "var(--surface-2)" }} content={<ChartTooltip format={fmt} />} />
                {series.map((s, i) => (
                  <Bar key={s.key} dataKey={s.key} name={s.label} fill={SERIES[i]} radius={[4, 4, 0, 0]} stackId={series.length > 1 ? "s" : undefined} stroke="var(--surface)" strokeWidth={series.length > 1 ? 2 : 0} maxBarSize={28} />
                ))}
              </BarChart>
            ) : kind === "line" ? (
              <LineChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey={xKey} {...axisProps} interval="preserveStartEnd" minTickGap={16} />
                <YAxis {...axisProps} tickFormatter={fmt ? (v) => fmt(Number(v)) : undefined} width={56} />
                <Tooltip cursor={{ stroke: "var(--border-strong)" }} content={<ChartTooltip format={fmt} />} />
                {series.map((s, i) => (
                  <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={SERIES[i]} strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--surface)" }} />
                ))}
              </LineChart>
            ) : (
              <AreaChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  {series.map((s, i) => (
                    <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={SERIES[i]} stopOpacity={0.28} />
                      <stop offset="100%" stopColor={SERIES[i]} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                <XAxis dataKey={xKey} {...axisProps} interval="preserveStartEnd" minTickGap={16} />
                <YAxis {...axisProps} allowDecimals={false} tickFormatter={fmt ? (v) => fmt(Number(v)) : undefined} width={56} />
                <Tooltip cursor={{ stroke: "var(--border-strong)" }} content={<ChartTooltip format={fmt} />} />
                {series.map((s, i) => (
                  <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={SERIES[i]} strokeWidth={2} fill={`url(#fill-${s.key})`} activeDot={{ r: 4, strokeWidth: 2, stroke: "var(--surface)" }} />
                ))}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/** Horizontal funnel / ranked bars with direct value labels. */
export function FunnelCard({ title, description, steps, className }: { title: string; description?: string; steps: { label: string; value: number }[]; className?: string }) {
  const maxV = Math.max(1, ...steps.map((s) => s.value));
  return (
    <div className={cn("panel p-4 sm:p-5", className)}>
      <h3 className="mono text-[11.5px] font-semibold uppercase tracking-[0.14em]">{title}</h3>
      {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
      <div className="mt-4 space-y-2.5">
        {steps.map((s, i) => {
          const prev = i > 0 ? steps[i - 1].value : null;
          const rate = prev ? Math.round((s.value / prev) * 100) : null;
          return (
            <div key={s.label} title={`${s.label}: ${s.value}`}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted">{s.label}</span>
                <span className="mono tabular font-medium text-accent">
                  {s.value}
                  {rate != null && <span className="ml-1.5 font-normal text-subtle">{rate}%</span>}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(0,255,102,0.7)]" style={{ width: `${(s.value / maxV) * 100}%`, background: "linear-gradient(90deg, #008f39, #00ff66)" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MiniBars({ data, className }: { data: { label: string; value: number; color?: string }[]; className?: string }) {
  return (
    <div className={cn("h-40", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12, top: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="label" {...axisProps} width={110} />
          <Tooltip cursor={{ fill: "var(--surface-2)" }} content={<ChartTooltip />} />
          <Bar dataKey="value" name="Value" radius={[0, 4, 4, 0]} maxBarSize={14}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color ?? "var(--chart-1)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
