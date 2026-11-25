// Client-safe: template variables for outreach campaigns.

export const TEMPLATE_VARIABLES = [
  { key: "business_name", label: "Business name", sample: "Bakkerij De Molen" },
  { key: "city", label: "City", sample: "Rotterdam" },
  { key: "category", label: "Type of business", sample: "bakery" },
  { key: "preview_url", label: "Website preview link", sample: "https://preview.example/bakkerij-de-molen" },
  { key: "agency_name", label: "Your agency name", sample: "Your Agency" },
  { key: "sender_name", label: "Your name", sample: "Your Name" },
] as const;
export type TemplateVars = Partial<Record<(typeof TEMPLATE_VARIABLES)[number]["key"], string>>;

const KNOWN = new Set<string>(TEMPLATE_VARIABLES.map((v) => v.key));

/** Variables used in a template that the system does not know (typos like {{bussiness}}). */
export function unknownVariables(template: string) {
  return [...new Set([...template.matchAll(/\{\{\s*([a-z_]+)\s*\}\}/gi)].map((m) => m[1].toLowerCase()).filter((k) => !KNOWN.has(k)))];
}

export function usesVariable(template: string, key: string) {
  return new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "i").test(template);
}

/** Fills in the variables. Returns the names of variables that had no value for this recipient. */
export function renderTemplate(template: string, vars: TemplateVars): { text: string; missing: string[] } {
  const missing: string[] = [];
  const text = template.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (whole, raw: string) => {
    const key = raw.toLowerCase() as keyof TemplateVars;
    if (!KNOWN.has(key)) return whole;
    const value = vars[key];
    if (!value) {
      missing.push(key);
      return "";
    }
    return value;
  });
  return { text, missing: [...new Set(missing)] };
}

export const DEFAULT_CAMPAIGN = {
  subject: "A website concept for {{business_name}}",
  body: `Hello,

I came across {{business_name}} in {{city}} and made a website concept specifically for your business, so you can see what a modern, mobile-friendly site could look like.

You can view it here:
{{preview_url}}

If you like it, I would be glad to talk about making it your official website. If not, no problem at all.

Kind regards,
{{sender_name}}
{{agency_name}}`,
  followUpSubject: "Following up on the website concept for {{business_name}}",
  followUpBody: `Hello,

A short follow-up on the website concept I made for {{business_name}}:
{{preview_url}}

If the timing is not right, just let me know and I will not write again.

Kind regards,
{{sender_name}}`,
};

export const CAMPAIGN_STATUS: Record<string, { label: string; tone: "success" | "warning" | "neutral" | "info" | "danger" }> = {
  draft: { label: "Draft", tone: "neutral" },
  awaiting_approval: { label: "Waiting for approval", tone: "warning" },
  active: { label: "Sending", tone: "success" },
  paused: { label: "Paused", tone: "warning" },
  completed: { label: "Completed", tone: "info" },
  cancelled: { label: "Cancelled", tone: "neutral" },
};

