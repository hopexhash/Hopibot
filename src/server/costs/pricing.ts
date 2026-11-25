// USD prices. Model prices per 1M tokens (Anthropic first-party rates).
export const MODEL_PRICING: Record<string, { input: number; output: number; cacheRead: number }> = {
  "claude-fable-5-2": { input: 8, output: 40, cacheRead: 0.2 },
  "claude-opus-5-5": { input: 4, output: 20, cacheRead: 0.2 },
  "claude-opus-5": { input: 5, output: 25, cacheRead: 0.5 },
  "claude-sonnet-5-5": { input: 2, output: 10, cacheRead: 0.1 },
  "claude-haiku-5-5": { input: 0.1, output: 0.5, cacheRead: 0.01 },
};

export const SUPPORTED_MODELS = [
  { id: "claude-opus-5-5", label: "Claude Opus 5.5 (default)" },
  { id: "claude-sonnet-5-5", label: "Claude Sonnet 5.5" },
  { id: "claude-haiku-5-5", label: "Claude Haiku 5.5" },
  { id: "claude-fable-5-2", label: "Claude Fable 5.2 (most capable)" },
] as const;

/**
 * Current Claude models reject `temperature` (HTTP 400), so the setting is stored for
 * future models but never sent. The UI explains this instead of silently ignoring it.
 */
export function modelSupportsTemperature(_model: string) {
  return false;
}

// Unit prices for other paid APIs (estimates; adjust to your contract in Settings → Costs).
export const UNIT_PRICING = {
  google_places_text_search: 0.032, // Text Search Pro SKU per request
  hunter_domain_search: 0.049, // ~ Starter plan per request
  hunter_email_verifier: 0.0245,
  vercel_deployment: 0, // included in plan; hosting tracked separately
  resend_email: 0.0009,
  playwright_run: 0, // self-hosted compute
} as const;

export function claudeCost(model: string, usage: { input: number; output: number; cacheRead?: number; cacheWrite?: number }) {
  const p = MODEL_PRICING[model] ?? MODEL_PRICING["claude-opus-5-5"];
  const cacheWritePrice = p.input * 1.25;
  return (
    (usage.input * p.input + usage.output * p.output + (usage.cacheRead ?? 0) * p.cacheRead + (usage.cacheWrite ?? 0) * cacheWritePrice) /
    1_000_000
  );
}
