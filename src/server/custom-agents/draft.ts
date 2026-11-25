import "../guard";
import { z } from "zod";
import { CUSTOM_AGENT_TOOLS, DEFAULT_CUSTOM_AGENT } from "@/lib/custom-agent-tools";
import { claudeStructured } from "../integrations/anthropic";
import { integrationMode } from "../integrations/credentials";

const TOOL_ENUM = CUSTOM_AGENT_TOOLS.map((t) => t.name) as [string, ...string[]];

export const draftSchema = z.object({
  name: z.string().min(2).max(60),
  description: z.string().max(300),
  instructions: z.string().min(20).max(6000),
  tools: z.array(z.enum(TOOL_ENUM)).max(TOOL_ENUM.length),
  permissions: z.object({ writeCrm: z.boolean(), usePaidApis: z.boolean(), startAgents: z.boolean() }),
  memoryEnabled: z.boolean(),
  suggestedTestPrompt: z.string().max(400),
});
export type AgentDraft = z.infer<typeof draftSchema>;

/** Keyword-based fallback used when Claude is not connected. Clearly labelled in the UI. */
export function draftHeuristically(description: string): AgentDraft {
  const t = description.toLowerCase();
  const tools = new Set<string>(["list_leads", "notify_me"]);
  const wantsSearch = /\b(search|find|discover|looks? for|zoek|vind)/.test(t);
  const wantsSite = /\b(website|site|design|outdated|verouderd|analy[sz])/.test(t);
  const wantsSave = /\b(sav(e|es|ing)|add(s|ing)? |stor(e|es|ing)|opslaan|bewaar)/.test(t);
  const wantsPipeline = /\b(research|preview|generate|build|email|outreach)\b/.test(t) && /\b(then|and|after|vervolgens)\b/.test(t);
  if (wantsSearch) tools.add("search_businesses");
  if (wantsSite) tools.add("analyze_website");
  if (wantsSave) tools.add("save_lead").add("add_note");
  if (wantsPipeline) tools.add("start_pipeline").add("get_lead");
  const first = description.trim().split(/[.!?\n]/)[0].replace(/^create (an )?agent (that|to)\s*/i, "");
  const name = first.split(/\s+/).slice(0, 4).join(" ").replace(/[^\p{L}\p{N} &-]/gu, "").trim() || "Custom agent";
  return {
    name: name.charAt(0).toUpperCase() + name.slice(1, 60),
    description: description.trim().slice(0, 300),
    instructions: `${description.trim()}\n\nWork step by step. Only save businesses that clearly match the request, and explain your reasons in the final report.`,
    tools: CUSTOM_AGENT_TOOLS.map((x) => x.name).filter((n) => tools.has(n)),
    permissions: { writeCrm: wantsSave, usePaidApis: wantsSearch, startAgents: wantsPipeline },
    memoryEnabled: false,
    suggestedTestPrompt: "Do a small trial run with at most 3 businesses and report what you would do.",
  };
}

/** Turns a plain-language description into a reviewable agent configuration. */
export async function draftAgent(organizationId: string, description: string): Promise<{ draft: AgentDraft; source: "claude" | "heuristic" }> {
  if ((await integrationMode(organizationId, "anthropic")) !== "live") return { draft: draftHeuristically(description), source: "heuristic" };
  const res = await claudeStructured({
    ctx: { organizationId },
    operation: "draft_custom_agent",
    schema: draftSchema,
    effort: "medium",
    maxTokens: 6000,
    system: `You design configurations for custom agents inside HOPI Bot, a platform that runs an AI web design agency (it finds local businesses with weak websites, builds website previews and drafts outreach emails).
Given the operator's description, produce a configuration they will review before saving.

Available tools (choose only what the job needs):
${CUSTOM_AGENT_TOOLS.map((t) => `- ${t.name}: ${t.description} [needs: ${t.permission}]`).join("\n")}

Rules:
- instructions: written to the agent in the second person. State the goal, the steps, clear criteria for what counts as a match, sensible limits (how many businesses per run) and what the final report must contain. Do not mention tool names the agent does not have.
- permissions: grant writeCrm / usePaidApis / startAgents only if a chosen tool needs it. Least privilege.
- memoryEnabled: true only if the agent benefits from remembering between runs (e.g. which cities it covered); then include the "remember" tool.
- Agents can never send emails or publish websites; if the description asks for that, design the agent to prepare the work and hand it to the built-in agents, and say in the description that sending still needs approval.
- name: 2-4 words. description: one sentence a non-technical person understands.
- suggestedTestPrompt: a small, cheap trial task (a handful of businesses at most).`,
    prompt: description.slice(0, 3000),
  });
  // Keep the draft internally consistent regardless of what the model returned.
  const d = res.data;
  const needs = (perm: string) => d.tools.some((n) => CUSTOM_AGENT_TOOLS.find((t) => t.name === n)?.permission === perm);
  return {
    draft: { ...d, tools: [...new Set(d.tools)], permissions: { writeCrm: d.permissions.writeCrm && needs("writeCrm"), usePaidApis: d.permissions.usePaidApis && needs("usePaidApis"), startAgents: d.permissions.startAgents && needs("startAgents") } },
    source: "claude",
  };
}

export const DEFAULTS = DEFAULT_CUSTOM_AGENT;
