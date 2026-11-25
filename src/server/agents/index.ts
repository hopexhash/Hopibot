import type { RuntimeKey } from "@/lib/constants";
import type { AgentHandler } from "../orchestrator/types";
import { customAgentHandler } from "../custom-agents/runtime";
import { contactResearch } from "./contact-research";
import { deployment } from "./deployment";
import { leadFinder } from "./lead-finder";
import { qualityControl } from "./quality-control";
import { research } from "./research";
import { sales } from "./sales";
import { websiteBuilder } from "./website-builder";

export const AGENT_HANDLERS: Record<RuntimeKey, AgentHandler> = {
  lead_finder: leadFinder,
  research,
  contact_research: contactResearch,
  website_builder: websiteBuilder,
  quality_control: qualityControl,
  deployment,
  sales,
  custom: customAgentHandler,
};
