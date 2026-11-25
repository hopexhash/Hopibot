import "./guard";
import { z } from "zod";

/**
 * Server environment, validated once at first access. Integration keys are optional:
 * a missing key puts that integration in "not configured" state (or mock mode in
 * development) instead of crashing the whole application.
 */
const schema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    APP_URL: z.string().url().default("http://localhost:3000"),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    REDIS_URL: z.string().default("redis://localhost:6379"),
    APP_ENCRYPTION_KEY: z
      .string()
      .min(32, "APP_ENCRYPTION_KEY must be at least 32 characters (use `openssl rand -base64 32`)"),
    AUTH_PROVIDER: z.enum(["local", "supabase"]).default("local"),
    ALLOW_MOCK_MODE: z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
    ALLOW_SIGNUP: z
      .enum(["true", "false"])
      .default("true")
      .transform((v) => v === "true"),

    NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

    ANTHROPIC_API_KEY: z.string().optional(),
    GOOGLE_MAPS_API_KEY: z.string().optional(),
    HUNTER_API_KEY: z.string().optional(),
    VERCEL_TOKEN: z.string().optional(),
    VERCEL_TEAM_ID: z.string().optional(),
    AGENCYOS_GITHUB_TOKEN: z.string().optional(),
    AGENCYOS_GITHUB_OWNER: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    RESEND_WEBHOOK_SECRET: z.string().optional(),
    STRIPE_SECRET_KEY: z.string().optional(),
    STRIPE_WEBHOOK_SECRET: z.string().optional(),
    POSTHOG_API_KEY: z.string().optional(),
    POSTHOG_HOST: z.string().url().default("https://eu.i.posthog.com"),

    WORKER_CONCURRENCY: z.coerce.number().int().min(1).max(50).default(4),
    QC_BASE_URL: z.string().url().optional(),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV === "production" && env.ALLOW_MOCK_MODE) {
      ctx.addIssue({
        code: "custom",
        path: ["ALLOW_MOCK_MODE"],
        message: "Mock mode is development-only and cannot be enabled in production.",
      });
    }
    if (env.AUTH_PROVIDER === "supabase" && (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
      ctx.addIssue({
        code: "custom",
        path: ["AUTH_PROVIDER"],
        message: "AUTH_PROVIDER=supabase requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      });
    }
  });

export type Env = z.infer<typeof schema>;

let cached: Env | null = null;

export function env(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}

/** For tests only. */
export function resetEnvCache() {
  cached = null;
}
