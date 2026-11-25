# AgencyOS AI

An autonomous website agency platform. Seven specialised AI agents, coordinated by a
central orchestrator, discover local businesses, research them, build and test a
professional website preview for each prospect, deploy it, and draft a personalised,
compliant sales email — all reviewed by a human before anything leaves the building.

```
Objective ─► Lead Finder ─► Research ─► Contact Research ─► Website Builder ─► Quality Control ─► Deployment ─► Sales draft ─► Human approval ─► Send
                                                                 ▲                    │
                                                                 └──── fixes (<85) ◄──┘
```

* **Never sends, publishes or pays without approval.** Outreach, official publishing,
  customer domains and budget overrides all go through the approvals system.
* **Never invents facts.** Research separates verified facts from assumptions; the
  website schema has no testimonial section; QC flags unverified claims (reviews, awards,
  certifications, prices) and the builder must remove them.
* **Survives restarts.** Workflow state lives in Postgres; Redis/BullMQ only dispatches.
* **Stops spending at your limits.** Daily/monthly organisation limits and per-agent
  limits pause paid work instead of exceeding them.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the design,
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for production setup,
[`docs/SECURITY.md`](docs/SECURITY.md) for the security and compliance model and
[`docs/PROGRESS.md`](docs/PROGRESS.md) for the build log and current limitations.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Radix UI · Framer Motion ·
Recharts · Drizzle ORM · Supabase PostgreSQL (+ optional Supabase Auth) · BullMQ + Redis ·
Anthropic Claude (`@anthropic-ai/sdk`) · Playwright · Google Places API (New) · Hunter.io ·
Vercel API · GitHub (Octokit) · Resend · Stripe · PostHog · Vitest.

## Quick start (local)

Requirements: Node 22+, PostgreSQL 15+ (or a Supabase project), Redis 6+, Chromium for
Playwright (`npx playwright install chromium`).

```bash
npm install
cp .env.example .env        # set DATABASE_URL, REDIS_URL, APP_ENCRYPTION_KEY
npm run db:migrate          # applies schema, RLS policies and seeds design systems
npm run dev                 # web app on http://localhost:3000
npm run worker              # agent worker (separate terminal)
```

Open http://localhost:3000/signup to create your workspace.

### Development without API keys

Set `ALLOW_MOCK_MODE=true` (refused in production). Integrations without credentials then
return deterministic **mock** data so every workflow can be exercised end to end. Mock
rows are flagged `is_mock`, badged **MOCK** everywhere, excluded from KPIs/revenue, and
mock email addresses can never be sent to. Add real keys on the **Integrations** page (or
via environment variables) to switch each integration to live mode individually.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Web application |
| `npm run worker` | Agent worker (BullMQ consumers, recovery sweeper, scheduler) |
| `npm run db:migrate` | Apply migrations + seed design-system registry |
| `npm run db:generate` | Generate a migration from `src/server/db/schema.ts` |
| `npm test` | Unit + integration tests (integration tests need Postgres + Redis) |
| `npm run typecheck` / `lint` | Static checks |
| `npx tsx scripts/e2e-pipeline.ts` | Full pipeline smoke test against a running worker |
| `npx tsx scripts/render-sample.tsx` | Render all 8 design systems to `.samples/` |

## Project layout

```
src/
  app/(auth)            login & signup
  app/(dashboard)       the 14 dashboard sections
  app/p/[slug]          hosted website previews (always marked as demonstrations)
  app/u/[token]         unsubscribe page;  app/api/*  webhooks, exports, health
  components/           UI kit, charts, app shell
  lib/                  client-safe constants, SiteSpec schema, settings schema
  server/
    agents/             the seven agents
    orchestrator/       state machine, queue, executor, runs, planner, recovery
    integrations/       Anthropic, Google Places, Hunter, Vercel, GitHub, Resend, Stripe, PostHog
    qc/                 Playwright quality control
    website/, sites/    SiteSpec guardrails, design systems, static renderer
    db/                 Drizzle schema & client
  worker/index.ts       worker entry point
drizzle/                SQL migrations (incl. RLS)
tests/                  unit & integration tests
```
