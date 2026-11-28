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

/** Everything the worker can execute: the seven built-in agents plus the custom-agent runtime. */
export const RUNTIME_KEYS = [...AGENT_KEYS, "custom"] as const;
export type RuntimeKey = (typeof RUNTIME_KEYS)[number];

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

/** What each built-in agent works with and where its limits are (shown on the agent page). */
export const AGENT_CAPABILITIES: Record<AgentKey, { tools: { name: string; about: string }[]; can: string[]; cannot: string[]; approval: string | null }> = {
  lead_finder: {
    tools: [
      { name: "Google Places", about: "Searches for real local businesses by city and type." },
      { name: "Website checker", about: "Opens a business's website to see if it exists and how good it is." },
      { name: "Lead scoring", about: "Scores each business 0–100 with the weights you set in Settings." },
    ],
    can: ["Save new leads to the CRM", "Skip duplicates automatically", "Start the next agents for qualified leads"],
    cannot: ["Contact a business", "Save private individuals"],
    approval: null,
  },
  research: {
    tools: [
      { name: "Claude (AI)", about: "Reads the collected material and writes the profile and website brief." },
      { name: "Website reader", about: "Fetches public pages of the business's current site." },
    ],
    can: ["Write a research profile on the lead", "Separate verified facts from assumptions"],
    cannot: ["Invent reviews, awards, prices or opening hours", "Follow instructions hidden in a web page"],
    approval: null,
  },
  contact_research: {
    tools: [
      { name: "Website contact pages", about: "Reads publicly listed emails, phone numbers and contact forms." },
      { name: "Hunter.io", about: "Looks up and verifies business email addresses (when connected)." },
    ],
    can: ["Record public contact details with their source"],
    cannot: ["Guess an email address", "Use private or personal addresses"],
    approval: null,
  },
  website_builder: {
    tools: [
      { name: "Claude (AI)", about: "Writes the content and chooses the structure of the site." },
      { name: "Template library", about: "Professional layouts per type of business." },
    ],
    can: ["Create and revise website versions", "Fix issues reported by Quality Assurance"],
    cannot: ["Publish a website", "Invent facts about the business"],
    approval: null,
  },
  quality_control: {
    tools: [{ name: "Test browser", about: "Opens each generated site on desktop, tablet and phone and checks links, forms, speed and accessibility." }],
    can: ["Score a website", "Send it back to be fixed", "Mark it ready"],
    cannot: ["Change the website itself"],
    approval: null,
  },
  deployment: {
    tools: [
      { name: "Preview hosting", about: "Puts a website online at a private preview link." },
      { name: "Vercel + GitHub", about: "Deploys through your own accounts when they are connected." },
    ],
    can: ["Publish private previews", "Verify that a deployment really loads"],
    cannot: ["Buy domains", "Publish on a customer's domain by itself"],
    approval: "Publishing on a real domain always waits for your approval.",
  },
  sales: {
    tools: [
      { name: "Claude (AI)", about: "Writes a personal email and offer from the research." },
      { name: "Resend", about: "Delivers an email, only after you approved it." },
      { name: "Suppression list", about: "Blocks anyone who unsubscribed or bounced." },
    ],
    can: ["Draft emails and offers", "Move leads through the CRM after a send"],
    cannot: ["Send anything without your approval", "Email someone who unsubscribed", "Use pressure or misleading subject lines"],
    approval: "Every email waits for your approval before it is sent.",
  },
};

/**
 * `design` is the industry: it decides the default content and structure of a site (the
 * blueprint) and what photographs to look for. `family` is the look: one of the demo designs
 * (src/sites/families) the site is rendered in.
 */
export const BUSINESS_CATEGORIES = [
  { key: "restaurant", label: "Restaurants", placesType: "restaurant", design: "luxury-restaurant", family: "vesper" },
  { key: "italian_restaurant", label: "Italian restaurants", placesType: "italian_restaurant", design: "modern-italian", family: "vesper" },
  { key: "turkish_restaurant", label: "Turkish restaurants", placesType: "turkish_restaurant", design: "turkish-restaurant", family: "vesper" },
  { key: "sushi_restaurant", label: "Sushi restaurants", placesType: "sushi_restaurant", design: "sushi", family: "vesper" },
  { key: "burger_restaurant", label: "Burger restaurants", placesType: "hamburger_restaurant", design: "burger", family: "brasa" },
  { key: "pizzeria", label: "Pizzerias", placesType: "pizza_restaurant", design: "pizzeria", family: "brasa" },
  { key: "bar", label: "Bars & cocktail bars", placesType: "bar", design: "luxury-restaurant", family: "skyline" },
  { key: "coffee_shop", label: "Coffee shops", placesType: "coffee_shop", design: "coffee-shop", family: "zondag" },
  { key: "bakery", label: "Bakeries & patisseries", placesType: "bakery", design: "bakery", family: "zondag" },
  { key: "street_food", label: "Street food & takeaway", placesType: "fast_food_restaurant", design: "street-food", family: "brasa" },
  { key: "asian_restaurant", label: "Asian fusion restaurants", placesType: "asian_restaurant", design: "asian-fusion", family: "vesper" },
  { key: "food_truck", label: "Food trucks", placesType: null, design: "food-truck", family: "brasa" },
  { key: "barbershop", label: "Barbershops", placesType: "barber_shop", design: "barbershop", family: "vesper" },
  { key: "hair_salon", label: "Hairdressers", placesType: "hair_salon", design: "hair-salon", family: "sage" },
  { key: "beauty_salon", label: "Beauty salons", placesType: "beauty_salon", design: "beauty-salon", family: "sage" },
  { key: "car_detailing", label: "Car detailing", placesType: "car_wash", design: "car-detailing", family: "obsidian" },
  { key: "car_repair", label: "Car garages", placesType: "car_repair", design: "garage", family: "obsidian" },
  { key: "construction", label: "Construction companies", placesType: "general_contractor", design: "construction", family: "kade" },
  { key: "cleaning", label: "Cleaning companies", placesType: null, design: "cleaning", family: "helder" },
  { key: "landscaping", label: "Landscapers & gardeners", placesType: null, design: "landscaping", family: "meridiaan" },
  { key: "dentist", label: "Dentists", placesType: "dentist", design: "clinic", family: "helder" },
  { key: "plumber", label: "Plumbers", placesType: "plumber", design: "local-service", family: "ambacht" },
  { key: "electrician", label: "Electricians", placesType: "electrician", design: "local-service", family: "ambacht" },
  { key: "real_estate", label: "Real estate agencies", placesType: "real_estate_agency", design: "estate", family: "meridiaan" },
  { key: "gym", label: "Gyms", placesType: "gym", design: "studio", family: "forge" },
  { key: "hotel", label: "Hotels", placesType: "hotel", design: "fine-dining", family: "ostara" },
  { key: "physiotherapist", label: "Physiotherapists", placesType: "physiotherapist", design: "clinic", family: "helder" },
  { key: "beauty_clinic", label: "Beauty & skin clinics", placesType: null, design: "beauty-salon", family: "sage" },
  { key: "lawyer", label: "Lawyers", placesType: "lawyer", design: "estate", family: "aerden" },
  { key: "accountant", label: "Accountants", placesType: "accounting", design: "estate", family: "aerden" },
  { key: "consultant", label: "Consultants", placesType: null, design: "studio", family: "aerden" },
  { key: "marketing_agency", label: "Marketing agencies", placesType: null, design: "studio", family: "antipode" },
  { key: "it_company", label: "IT companies", placesType: null, design: "studio", family: "veldwerk" },
  { key: "personal_trainer", label: "Personal trainers", placesType: null, design: "studio", family: "forge" },
  { key: "tattoo_studio", label: "Tattoo studios", placesType: null, design: "barbershop", family: "forge" },
  { key: "photographer", label: "Photography studios", placesType: null, design: "studio", family: "antipode" },
  { key: "car_dealer", label: "Car dealerships", placesType: "car_dealer", design: "garage", family: "obsidian" },
  { key: "roofing", label: "Roofing companies", placesType: "roofing_contractor", design: "construction", family: "kade" },
  { key: "architect", label: "Architects", placesType: null, design: "estate", family: "monolith" },
  { key: "interior_designer", label: "Interior designers", placesType: null, design: "estate", family: "meridiaan" },
  { key: "travel_agency", label: "Travel agencies", placesType: "travel_agency", design: "studio", family: "voyage" },
  { key: "wedding_planner", label: "Wedding planners", placesType: null, design: "studio", family: "vow" },
  { key: "event_business", label: "Event businesses", placesType: null, design: "studio", family: "antipode" },
  { key: "clothing_store", label: "Clothing stores", placesType: "clothing_store", design: "studio", family: "lune" },
  { key: "jewelry_store", label: "Jewellers & watchmakers", placesType: "jewelry_store", design: "studio", family: "aurum" },
  { key: "shop", label: "Shops & web shops", placesType: "store", design: "studio", family: "lune" },
  { key: "local_service", label: "Local service businesses", placesType: null, design: "local-service", family: "kade" },
] as const;
export type CategoryKey = (typeof BUSINESS_CATEGORIES)[number]["key"];

export function categoryLabel(key: string) {
  return BUSINESS_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export const PIPELINE_STAGES = [
  { key: "DISCOVERED", label: "Discovered" },
  { key: "ANALYSED", label: "Analysed" },
  { key: "QUALIFIED", label: "Qualified" },
  { key: "DEMO_GENERATED", label: "Demo Generated" },
  { key: "QUALITY_APPROVED", label: "Quality Approved" },
  { key: "CONTACT_PERMISSION_REQUIRED", label: "Permission Required" },
  { key: "CONTACT_READY", label: "Contact Ready" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "INTERESTED", label: "Interested" },
  { key: "DEMO_VIEWED", label: "Demo Viewed" },
  { key: "CHECKOUT_STARTED", label: "Checkout Started" },
  { key: "PURCHASED", label: "Purchased" },
  { key: "UPSELL_OPPORTUNITY", label: "Upsell Opportunity" },
  { key: "CUSTOMER", label: "Customer" },
  { key: "LOST", label: "Lost" },
] as const;
export type PipelineStage = (typeof PIPELINE_STAGES)[number]["key"];
/** Stages where the business has paid: they are customers, not leads. */
export const CUSTOMER_STAGES: string[] = ["PURCHASED", "UPSELL_OPPORTUNITY", "CUSTOMER"];
/** Stages where automated outreach must stop (the conversation is with a person now, or over). */
export const CLOSED_STAGES: string[] = ["INTERESTED", "DEMO_VIEWED", "CHECKOUT_STARTED", "PURCHASED", "UPSELL_OPPORTUNITY", "CUSTOMER", "LOST"];
export const isCustomerStage = (stage: string) => CUSTOMER_STAGES.includes(stage);

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
