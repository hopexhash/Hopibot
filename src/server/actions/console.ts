"use server";

import { z } from "zod";
import { mockModeAllowed } from "../integrations/credentials";
import { findTemplate, findWebsite, pipelineStatus, readBusinessFromWebsite, startSiteSchema, startWebsiteFromSite } from "../console/intake";
import { estimatePlan, type PlanAction } from "../orchestrator/estimate";
import { planObjective } from "../orchestrator/planner";
import { planSchema, startRun, type RunPlan } from "../orchestrator/runs";
import { action, UserError } from "./_util";

export type ConsoleProposal =
  | { kind: "website"; url: string; reachable: boolean; title: string | null; source: string; name: string; city: string; category: string; country: "Netherlands" | "Belgium"; designKey: string | null; designName: string | null }
  | { kind: "objective"; objective: string; plan: RunPlan; summary: string; costEstimate: string | null };

/**
 * One chat message to the agents. Nothing starts here: the reply is a proposal the operator
 * checks (and can correct) before any agent runs.
 */
export async function consoleMessageAction(message: string) {
  return action({ name: "console.message", limit: 60 }, async (auth): Promise<{ reply: string; proposal: ConsoleProposal | null }> => {
    const text = z.string().trim().min(2, "Type a message.").max(2000).parse(message);
    const url = findWebsite(text);
    const template = findTemplate(text);
    if (url) {
      const host = new URL(url).hostname;
      const g = await readBusinessFromWebsite(auth.org.id, url, text);
      const read = g.reachable ? `I opened ${host}${g.title ? ` (“${g.title.slice(0, 80)}”)` : ""}.` : `I could not open ${host}; the research agent will try again.`;
      const missing = [!g.city && "the city", !g.category && "the sector"].filter(Boolean).join(" and ");
      return {
        reply: `${read} ${missing ? `Fill in ${missing}, then press Start.` : "Check the details and press Start."} The research agent reads the current website, the website builder makes a new one${template ? ` in ${template.name}` : ""} and quality control tests it. Nothing is sent to the business.`,
        proposal: { kind: "website", url, reachable: g.reachable, title: g.title, source: g.source, name: g.name ?? "", city: g.city ?? "", category: g.category ?? "", country: g.country, designKey: template?.key ?? null, designName: template?.name ?? null },
      };
    }
    if (text.length < 8) return { reply: "Tell me what you need, for example “Make a website for restaurantolijfje.nl” or “Find 20 hairdressers in Utrecht with an outdated website”.", proposal: null };
    const [planned, estimate] = await Promise.all([planObjective(auth.org.id, text), estimatePlan(auth.org.id).catch(() => null)]);
    const plan = planned.plan;
    if (!plan.discovery && !plan.businessIds?.length) {
      return { reply: "I did not find a website address or a search in that. Add the website (for example bakkerijdevries.nl), or say which businesses to look for: a sector and a city in the Netherlands or Belgium.", proposal: null };
    }
    let cost: string | null = null;
    if (estimate && !estimate.mock) {
      const per = plan.actions.filter((a): a is Exclude<PlanAction, "notify"> => a !== "notify").reduce((n, a) => n + (estimate.steps[a]?.costUsd ?? 0), 0);
      const d = plan.discovery;
      const search = d ? estimate.discovery.costPerRequest * Math.ceil((d.limit ?? 20) / Math.max(1, estimate.discovery.resultsPerRequest)) : 0;
      const total = search + per * (plan.actions.length ? Math.max(1, plan.topN) : 0);
      cost = total > 0 ? `estimated $${total.toFixed(2)} in API costs (${estimate.steps.generate_website?.basis === "history" ? "from your own history" : "rule of thumb"})` : null;
    }
    return { reply: `Here is the plan${planned.source === "heuristic" ? " (read without Claude, so check it)" : ""}. Press Start to run it.`, proposal: { kind: "objective", objective: text, plan, summary: plan.summary, costEstimate: cost } };
  });
}

export async function consoleStartWebsiteAction(input: z.input<typeof startSiteSchema>) {
  return action({ name: "console.start_website", revalidate: ["/websites", "/businesses"], limit: 30, auditTarget: (r: { businessId: string }) => ({ type: "business", id: r.businessId }) }, async (auth) => {
    try {
      return await startWebsiteFromSite(auth.org.id, auth.org.settings, input);
    } catch (err) {
      if (err instanceof z.ZodError) throw err;
      throw new UserError((err as Error).message);
    }
  });
}

export async function consoleStartObjectiveAction(objective: string, plan: RunPlan) {
  return action({ name: "console.start_run", revalidate: ["/command"], auditTarget: (r: { runId: string }) => ({ type: "workflow_run", id: r.runId }) }, async (auth) => {
    const run = await startRun({ organizationId: auth.org.id, plan: planSchema.parse(plan), objective: objective.slice(0, 2000), createdBy: auth.user.id, isMock: mockModeAllowed() });
    return { runId: run.id };
  });
}

/** Live progress of what was started from the console, read from the task and project tables. */
export async function consoleStatusAction(businessIds: string[]) {
  return action({ name: "console.status", limit: 900 }, async (auth) => pipelineStatus(auth.org.id, z.array(z.string().uuid()).max(20).parse(businessIds)));
}
