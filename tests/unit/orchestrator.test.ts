import { describe, expect, it } from "vitest";
import { parseObjectiveHeuristically } from "@/server/orchestrator/planner";
import { backoffMs, canTransition } from "@/server/orchestrator/state-machine";

describe("task state machine", () => {
  it("allows the documented lifecycle", () => {
    expect(canTransition("PENDING", "RUNNING")).toBe(true);
    expect(canTransition("RUNNING", "COMPLETED")).toBe(true);
    expect(canTransition("RUNNING", "WAITING_FOR_APPROVAL")).toBe(true);
    expect(canTransition("WAITING_FOR_APPROVAL", "PENDING")).toBe(true);
    expect(canTransition("FAILED", "PENDING")).toBe(true);
  });
  it("forbids leaving terminal states or skipping RUNNING", () => {
    expect(canTransition("COMPLETED", "PENDING")).toBe(false);
    expect(canTransition("CANCELLED", "RUNNING")).toBe(false);
    expect(canTransition("PENDING", "COMPLETED")).toBe(false);
  });
  it("backs off exponentially with a cap", () => {
    expect(backoffMs(1)).toBeGreaterThanOrEqual(12_000);
    expect(backoffMs(2)).toBeGreaterThan(backoffMs(1) * 2);
    expect(backoffMs(20)).toBeLessThanOrEqual(3_600_000 * 1.2);
  });
});

describe("objective planner (rule-based)", () => {
  it("parses the reference objective", () => {
    const plan = parseObjectiveHeuristically(
      "Find 50 restaurants in Rotterdam that have outdated websites. Research them, create professional website previews for the 10 best prospects and prepare personalised sales emails.",
    );
    expect(plan.discovery).toMatchObject({ city: "Rotterdam", category: "restaurant", limit: 50, country: "Netherlands" });
    expect(plan.topN).toBe(10);
    expect(plan.actions).toEqual(["research", "contacts", "generate_website", "qc", "deploy", "sales_email"]);
    expect(plan.discovery!.minScore).toBeGreaterThanOrEqual(50);
  });
  it("handles Dutch phrasing and missing steps", () => {
    const plan = parseObjectiveHeuristically("Zoek 20 tandartsen in Utrecht zonder website");
    expect(plan.discovery).toMatchObject({ city: "Utrecht", category: "dentist", limit: 20 });
    expect(plan.actions).toEqual([]);
  });
  it("never plans to send emails", () => {
    const plan = parseObjectiveHeuristically("Find 5 plumbers in Delft and email them all immediately");
    expect(plan.actions).not.toContain("send_email" as never);
  });
});
