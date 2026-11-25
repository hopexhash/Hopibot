import type Anthropic from "@anthropic-ai/sdk";
import { describe, expect, it } from "vitest";
import { draftHeuristically } from "@/server/custom-agents/draft";
import { buildSystemPrompt, runAgentLoop, type LoopDeps } from "@/server/custom-agents/runtime";
import { permitted, toolParams, toolsFor } from "@/server/custom-agents/tools";

type Msg = Anthropic.Beta.Messages.BetaMessage;
const msg = (content: unknown[], stop_reason: string): Msg => ({ id: "m", type: "message", role: "assistant", model: "claude-opus-5-5", content, stop_reason, usage: { input_tokens: 1, output_tokens: 1 } }) as unknown as Msg;
const text = (t: string) => ({ type: "text", text: t });
const call = (id: string, name: string, input: unknown) => ({ type: "tool_use", id, name, input });

const opts = { model: "claude-opus-5-5", effort: "medium" as const, maxOutputTokens: 4000, system: "s", prompt: "go", tools: [], maxSteps: 5, deadlineMs: Date.now() + 60_000 };

function deps(turns: Msg[], over: Partial<LoopDeps> = {}): LoopDeps & { sent: unknown[][]; ran: string[] } {
  const sent: unknown[][] = [];
  const ran: string[] = [];
  let i = 0;
  return {
    sent,
    ran,
    turn: async (p) => {
      sent.push(structuredClone(p.messages));
      return turns[Math.min(i++, turns.length - 1)];
    },
    runTool: async (name) => {
      ran.push(name);
      return { ok: true, content: `{"tool":"${name}"}` };
    },
    mayContinue: async () => null,
    ...over,
  };
}

describe("custom agent loop", () => {
  it("returns the final text when the model finishes without tools", async () => {
    const d = deps([msg([text("All done.")], "end_turn")]);
    const r = await runAgentLoop(d, opts);
    expect(r).toMatchObject({ text: "All done.", stopped: "done", turns: 1, steps: [] });
  });

  it("runs tool calls and sends every result back in one user message", async () => {
    const d = deps([msg([text("Looking."), call("a", "list_leads", {}), call("b", "analyze_website", { url: "https://x.nl" })], "tool_use"), msg([text("Found 2.")], "end_turn")]);
    const r = await runAgentLoop(d, opts);
    expect(d.ran).toEqual(["list_leads", "analyze_website"]);
    expect(r.steps).toHaveLength(2);
    expect(r.text).toBe("Found 2.");
    const second = d.sent[1] as { role: string; content: { type: string; tool_use_id: string }[] }[];
    expect(second).toHaveLength(3); // user prompt, assistant turn, one user message with both results
    expect(second[2].role).toBe("user");
    expect(second[2].content.map((c) => c.tool_use_id)).toEqual(["a", "b"]);
  });

  it("marks failed tool calls as errors for the model", async () => {
    const d = deps([msg([call("a", "save_lead", {})], "tool_use"), msg([text("Could not save.")], "end_turn")], { runTool: async () => ({ ok: false, content: "Invalid input" }) });
    const r = await runAgentLoop(d, opts);
    expect(r.steps[0].ok).toBe(false);
    const results = (d.sent[1] as { content: { is_error?: boolean }[] }[])[2].content;
    expect(results[0].is_error).toBe(true);
  });

  it("stops at the step limit instead of looping forever", async () => {
    const d = deps([msg([call("a", "list_leads", {})], "tool_use")]);
    const r = await runAgentLoop(d, { ...opts, maxSteps: 3 });
    expect(r.stopped).toBe("max_steps");
    expect(r.turns).toBe(3);
  });

  it("stops when the time limit has passed", async () => {
    let now = 1000;
    const d = deps([msg([call("a", "list_leads", {})], "tool_use")], { now: () => (now += 40_000) });
    const r = await runAgentLoop(d, { ...opts, deadlineMs: 60_000 });
    expect(r.stopped).toBe("timeout");
  });

  it("stops before the next model call when the budget is used up", async () => {
    let checks = 0;
    const d = deps([msg([call("a", "list_leads", {})], "tool_use")], { mayContinue: async () => (++checks > 1 ? "budget used up" : null) });
    const r = await runAgentLoop(d, opts);
    expect(r.stopped).toBe("budget");
    expect(r.turns).toBe(1);
    expect(r.text).toContain("budget used up");
  });

  it("never runs tools from a refused turn", async () => {
    const d = deps([{ ...msg([call("a", "save_lead", {})], "refusal"), stop_details: { type: "refusal", category: "cyber" } } as unknown as Msg]);
    await expect(runAgentLoop(d, opts)).rejects.toThrow(/declined/);
    expect(d.ran).toEqual([]);
  });

  it("fails clearly when the answer is cut off", async () => {
    const d = deps([msg([call("a", "save_lead", {})], "max_tokens")]);
    await expect(runAgentLoop(d, opts)).rejects.toThrow(/cut off/);
    expect(d.ran).toEqual([]);
  });
});

describe("custom agent permissions", () => {
  const agent = (tools: string[], permissions = { writeCrm: false, usePaidApis: false, startAgents: false }, memoryEnabled = false) => ({ tools, permissions, memoryEnabled });

  it("only offers tools that are both selected and permitted", () => {
    const names = toolsFor(agent(["list_leads", "save_lead", "search_businesses", "start_pipeline"])).map((t) => t.name);
    expect(names).toEqual(["list_leads"]);
    expect(toolsFor(agent(["save_lead"], { writeCrm: true, usePaidApis: false, startAgents: false })).map((t) => t.name)).toEqual(["save_lead"]);
  });

  it("drops unknown tool names and memory when memory is off", () => {
    expect(toolsFor(agent(["delete_everything", "remember"]))).toEqual([]);
    expect(toolsFor(agent(["remember"], undefined, true)).map((t) => t.name)).toEqual(["remember"]);
    expect(permitted(agent([]), "delete_everything")).toBe(false);
  });

  it("produces JSON-schema tool definitions for the API", () => {
    const [def] = toolParams(toolsFor(agent(["analyze_website"])));
    expect(def.name).toBe("analyze_website");
    expect(def.input_schema.type).toBe("object");
    expect(def.input_schema).not.toHaveProperty("$schema");
  });

  it("explains test mode and memory in the system prompt", () => {
    const base = { name: "Scout", instructions: "Find dentists.", memoryEnabled: true, memory: "[2026-01-01] covered Rotterdam" };
    expect(buildSystemPrompt(base, true)).toContain("TEST RUN");
    expect(buildSystemPrompt(base, false)).toContain("covered Rotterdam");
    expect(buildSystemPrompt({ ...base, memoryEnabled: false }, false)).not.toContain("covered Rotterdam");
  });
});

describe("keyword agent drafting (fallback without Claude)", () => {
  it("grants only what the description asks for", () => {
    const d = draftHeuristically("Create an agent that searches for dental clinics in Rotterdam, analyzes their websites and saves businesses with outdated designs to my CRM.");
    expect(d.tools).toEqual(expect.arrayContaining(["search_businesses", "analyze_website", "save_lead"]));
    expect(d.permissions).toEqual({ writeCrm: true, usePaidApis: true, startAgents: false });
    const readOnly = draftHeuristically("Summarise which leads in my CRM have the highest score and tell me.");
    expect(readOnly.permissions).toEqual({ writeCrm: false, usePaidApis: false, startAgents: false });
  });
});
