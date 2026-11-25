// Client-safe shared constants. No secrets here.

export const AGENT_KEYS = [
  "lead_finder",
  "research",
  "contact_research",
  "website_builder",
  "quality_control",
  "deployment",
  "sales",
] as const;
export type AgentKey = (typeof AGENT_KEYS)[number];

export const AGENT_META: Record<AgentKey, { name: string; short: string; description: string; color: string }> = {
  lead_finder: {
    name: "Lead Discovery",
    short: "Discovery",
    description: "Finds local businesses, checks whether they have a website and scores how promising they are. Skips duplicates.",
    color: "#6366f1",
  },
  research: {
    name: "Research",
    short: "Research",
    description: "Studies each business and its current website, then writes a fact-checked profile and a brief for the new site.",
    color: "#0ea5e9",
  },
  contact_research: {
    name: "Contact Finder",
    short: "Contacts",
    description: "Looks up publicly listed contact details with their source. Never guesses an address.",
    color: "#14b8a6",
  },
  website_builder: {
    name: "Website Generation",
    short: "Builder",
    description: "Designs and writes a professional website for the business from the research brief.",
    color: "#8b5cf6",
  },
  quality_control: {
    name: "Quality Assurance",
    short: "QA",
    description: "Opens every generated site on desktop, tablet and phone, checks links, forms, speed and accessibility, and sends problems back to be fixed.",
    color: "#f59e0b",
  },
  deployment: {
    name: "Deployment",
    short: "Deploy",
    description: "Puts approved websites online as previews, verifies they load and reports any failure.",
    color: "#10b981",
  },
  sales: {
    name: "Email Outreach & Sales",
    short: "Outreach",
    description: "Writes personal outreach emails and offers from the research. Nothing is ever sent without your approval.",
    color: "#ec4899",
  },
};

export const BUSINESS_CATEGORIES = [
  { key: "restaurant", label: "Restaurants", placesType: "restaurant", template: "restaurant" },
  { key: "dentist", label: "Dentists", placesType: "dentist", template: "dental" },
  { key: "hair_salon", label: "Hairdressers", placesType: "hair_salon", template: "beauty" },
  { key: "construction", label: "Construction companies", placesType: "general_contractor", template: "construction" },
  { key: "plumber", label: "Plumbers", placesType: "plumber", template: "service" },
  { key: "electrician", label: "Electricians", placesType: "electrician", template: "service" },
  { key: "car_repair", label: "Car garages", placesType: "car_repair", template: "automotive" },
  { key: "real_estate", label: "Real estate agencies", placesType: "real_estate_agency", template: "realestate" },
  { key: "cleaning", label: "Cleaning companies", placesType: null, template: "service" },
  { key: "beauty_salon", label: "Beauty salons", placesType: "beauty_salon", template: "beauty" },
  { key: "gym", label: "Gyms", placesType: "gym", template: "corporate" },
  { key: "hotel", label: "Hotels", placesType: "hotel", template: "restaurant" },
  { key: "local_service", label: "Local service businesses", placesType: null, template: "service" },
] as const;
export type CategoryKey = (typeof BUSINESS_CATEGORIES)[number]["key"];

export function categoryLabel(key: string) {
  return BUSINESS_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export const PIPELINE_STAGES = [
  { key: "NEW_LEAD", label: "New lead" },
  { key: "RESEARCHED", label: "Researched" },
  { key: "QUALIFIED", label: "Qualified" },
  { key: "WEBSITE_GENERATED", label: "Website generated" },
  { key: "PREVIEW_READY", label: "Preview ready" },
  { key: "AWAITING_APPROVAL", label: "Awaiting approval" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "REPLIED", label: "Replied" },
  { key: "NEGOTIATION", label: "Negotiation" },
  { key: "WON", label: "Won" },
  { key: "LOST", label: "Lost" },
] as const;
export type PipelineStage = (typeof PIPELINE_STAGES)[number]["key"];

export const TASK_STATUSES = ["PENDING", "RUNNING", "WAITING_FOR_APPROVAL", "COMPLETED", "FAILED", "CANCELLED"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const ROLES = ["owner", "admin", "member", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const WEBSITE_STATUS_LABEL: Record<string, string> = {
  none_found: "None found",
  verified_none: "No website (verified)",
  has_website: "Has website",
  unreachable: "Unreachable",
  unknown: "Unknown",
};

export const QC_PASS_SCORE = 85;

export const DEFAULT_SCORING_WEIGHTS = {
  noWebsite: 35,
  outdatedWebsite: 20,
  poorMobile: 15,
  missingContactForm: 10,
  poorSeo: 10,
  incompleteInfo: 10,
} as const;
export type ScoringWeights = { [K in keyof typeof DEFAULT_SCORING_WEIGHTS]: number };

export const WORKFLOW_ACTIONS = [
  { key: "research", label: "Research business", agent: "research" },
  { key: "contacts", label: "Find contact channels", agent: "contact_research" },
  { key: "generate_website", label: "Generate website", agent: "website_builder" },
  { key: "qc", label: "Test website", agent: "quality_control" },
  { key: "deploy", label: "Deploy preview", agent: "deployment" },
  { key: "sales_email", label: "Create sales email draft", agent: "sales" },
  { key: "notify", label: "Notify administrator", agent: null },
] as const;
export type WorkflowAction = (typeof WORKFLOW_ACTIONS)[number]["key"];
