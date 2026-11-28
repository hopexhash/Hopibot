import { describe, expect, it } from "vitest";
import { rate, THRESHOLDS } from "@/server/performance/vitals";

describe("Core Web Vitals rating", () => {
  it("uses Google's thresholds, inclusive at the good and poor boundaries", () => {
    expect(rate("LCP", 2500)).toBe("good");
    expect(rate("LCP", 2501)).toBe("needs-improvement");
    expect(rate("LCP", 4001)).toBe("poor");
    expect(rate("INP", 200)).toBe("good");
    expect(rate("INP", 600)).toBe("poor");
    expect(rate("CLS", 0.1)).toBe("good");
    expect(rate("CLS", 0.2)).toBe("needs-improvement");
    expect(rate("CLS", 0.3)).toBe("poor");
  });
  it("covers every metric the reporter sends", () => {
    expect(Object.keys(THRESHOLDS).sort()).toEqual(["CLS", "FCP", "INP", "LCP", "TTFB"]);
  });
});
