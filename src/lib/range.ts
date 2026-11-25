// Date-range selection shared by the analytics pages (state lives in the URL).

export const RANGE_PRESETS = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
  { key: "year", label: "This year" },
] as const;

export type Range = { key: string; from: Date; to: Date; label: string; days: number };

const DAY = 86_400_000;
const isoDay = (d: Date) => d.toISOString().slice(0, 10);

/** Resolves ?range=…&from=…&to=… into concrete UTC dates. Invalid input falls back to 30 days. */
export function parseRange(sp: Record<string, string | string[] | undefined>, now = new Date()): Range {
  const get = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const key = get("range") ?? "30d";
  const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const mk = (k: string, from: Date, to: Date, label: string): Range => ({ key: k, from, to, label, days: Math.max(1, Math.round((to.getTime() - from.getTime()) / DAY)) });
  if (key === "today") return mk("today", startOfToday, now, "today");
  if (key === "7d") return mk("7d", new Date(now.getTime() - 7 * DAY), now, "the last 7 days");
  if (key === "90d") return mk("90d", new Date(now.getTime() - 90 * DAY), now, "the last 90 days");
  if (key === "year") return mk("year", new Date(Date.UTC(now.getUTCFullYear(), 0, 1)), now, "this year");
  if (key === "custom") {
    const from = new Date(`${get("from")}T00:00:00Z`);
    const to = new Date(`${get("to")}T23:59:59Z`);
    if (!Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime()) && from < to && to.getTime() - from.getTime() <= 3 * 366 * DAY) {
      return mk("custom", from, to > now ? now : to, `${isoDay(from)} to ${isoDay(to)}`);
    }
  }
  return mk("30d", new Date(now.getTime() - 30 * DAY), now, "the last 30 days");
}

/** The period of the same length immediately before `r` (for comparisons). */
export function previousRange(r: Range): { from: Date; to: Date } {
  const span = r.to.getTime() - r.from.getTime();
  return { from: new Date(r.from.getTime() - span), to: r.from };
}

export function rangeQuery(r: Range) {
  return r.key === "custom" ? `range=custom&from=${isoDay(r.from)}&to=${isoDay(r.to)}` : `range=${r.key}`;
}
