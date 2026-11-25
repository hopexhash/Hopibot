import { describe, expect, it } from "vitest";
import { parseRange, previousRange, rangeQuery } from "@/lib/range";

const now = new Date("2026-06-15T12:00:00Z");

describe("analytics date ranges", () => {
  it("defaults to 30 days and resolves presets", () => {
    expect(parseRange({}, now)).toMatchObject({ key: "30d", days: 30 });
    expect(parseRange({ range: "7d" }, now).from.toISOString()).toBe("2026-06-08T12:00:00.000Z");
    expect(parseRange({ range: "today" }, now).from.toISOString()).toBe("2026-06-15T00:00:00.000Z");
    expect(parseRange({ range: "year" }, now).from.toISOString()).toBe("2026-01-01T00:00:00.000Z");
  });
  it("accepts a valid custom range and never looks into the future", () => {
    const r = parseRange({ range: "custom", from: "2026-01-01", to: "2026-12-31" }, now);
    expect(r.key).toBe("custom");
    expect(r.to).toEqual(now);
    expect(rangeQuery(parseRange({ range: "custom", from: "2026-01-01", to: "2026-03-31" }, now))).toBe("range=custom&from=2026-01-01&to=2026-03-31");
  });
  it("falls back to 30 days on garbage, reversed or absurd ranges", () => {
    for (const sp of [{ range: "custom", from: "nope", to: "2026-01-01" }, { range: "custom", from: "2026-05-01", to: "2026-01-01" }, { range: "custom", from: "1990-01-01", to: "2026-01-01" }, { range: "'; drop table" }]) {
      expect(parseRange(sp, now).key).toBe("30d");
    }
  });
  it("compares with the period of the same length right before", () => {
    const r = parseRange({ range: "7d" }, now);
    const p = previousRange(r);
    expect(p.to).toEqual(r.from);
    expect(r.from.getTime() - p.from.getTime()).toBe(7 * 86_400_000);
  });
});
