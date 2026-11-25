# Progress log

## Status at a glance

| Phase | Status | Verified by |
|---|---|---|
| 1 Foundation — schema (33 tables, RLS), auth, design system, dashboard shell | Done | Migrations on Postgres 16; RLS integration test; browser walkthrough |
| 2 Lead discovery — Places adapter, website verification & audit, dedupe, scoring | Done | Unit tests (scoring, dedupe, audit); pipeline integration test (mock Places) |
| 3 Agents & orchestrator — research, contacts, state machine, BullMQ, logs, costs | Done | Integration tests: idempotency, CAS race, crash recovery, budget guard, disabled agents |
| 4 Website generation — SiteSpec, 8 design systems, renderer, Playwright QC loop | Done | Unit tests (render, contrast, guardrails, integrity); QC scores 100/100 on generated sites |
| 5 Deployment — GitHub + Vercel + built-in hosted preview, history, retries | Done (built-in host verified; GitHub/Vercel untested live) | Pipeline test deploys to built-in host |
| 6 Sales — CRM kanban, sales drafts, approvals, Resend, suppression, webhooks | Done (Resend untested live) | Browser test; compliance gating verified |
| 7 Automation — workflow builder, scheduled campaigns, triggers, cost controls, reports | Done | Run reports verified end to end |
| 8 Production — security review, tests, docs, CI, worker container | Done | 60 tests passing; `next build` succeeds; CI workflow added |

## Integration verification

No third-party credentials were available while building, so live calls could not be
exercised. Each adapter is written against the provider's official API/SDK, has a real
"Test connection" request, maps errors to clear messages, and records usage/cost — but
should be smoke-tested with real keys before production use.

| Integration | Implementation | Tested live? |
|---|---|---|
| Anthropic Claude | Official SDK, streaming, structured outputs (Zod), refusal fallbacks, usage → cost | No (mock mode exercised) |
| Google Places (New) | Text Search with field masks, location bias, pagination | No |
| Hunter.io | Domain search + email verifier | No |
| Vercel | Deployments API (inline files), status polling, domain attach | No |
| GitHub | Octokit: private repo per site, single-commit tree push | No |
| Resend | Official SDK, List-Unsubscribe headers, Svix webhook verification | Webhook signature verification unit-tested |
| Stripe | Payment links, webhook verification, subscriptions → MRR | No |
| PostHog | posthog-node capture | No |
| Supabase Postgres | Drizzle + postgres.js, RLS | Yes (Postgres 16, same SQL) |
| Supabase Auth | `@supabase/ssr` provider + proxy session refresh | No (local auth provider tested) |
| Redis / BullMQ | Queues per agent, recovery sweeper | Yes |
| Playwright | QC across desktop/tablet/mobile | Yes |

## Log

1. **Repository inspected** — empty repository; greenfield architecture documented in
   `docs/ARCHITECTURE.md`.
2. **Foundation** — Next.js 16 (Cache Components disabled deliberately, see architecture
   §9), Drizzle schema, RLS migration with Supabase-compatible shims, local + Supabase auth,
   encrypted integration credentials, audit log, Redis rate limiting.
3. **Orchestrator** — Postgres-backed task state machine with compare-and-set claims,
   idempotency keys, continuation pipelines, retries with exponential backoff, budget and
   agent-enabled guards, recovery sweeper and cron scheduler.
4. **Agents** — all seven implemented. Bugs found and fixed while testing: a `__name`
   transpiler helper broke `page.evaluate`; an explicit `qc` step caused duplicate QC
   tasks; the sandbox's own `GITHUB_TOKEN` was picked up as the agency's key (env vars
   namespaced).
5. **Design systems** — 8 category templates with generated, licence-free artwork and
   self-hosted fonts (GDPR-friendly, no third-party requests). Visual review at desktop and
   mobile; nav wrapping, image aspect and art scale issues fixed.
6. **Dashboard** — all 14 sections plus detail pages; zero console/page errors in a full
   browser walkthrough. Fixed: date parameters in raw SQL, function props across the
   server/client boundary, mobile drawer clipped by `backdrop-filter`, mock deployments
   leaking into KPIs.
7. **Tests** — 53 unit + 7 integration tests. The planner test caught "without a website"
   being read as a request to build one (fixed).
8. **Security pass** — QC external requests now SSRF-filtered, secrets in integration
   config encrypted, bulk-action ownership check made O(selected).

## Known limitations / next steps

* Live-test every integration with real keys (table above).
* Stock photography: previews use generated artwork or images the agency marks as
  authorised; an Unsplash/Pexels integration with licence tracking would improve imagery.
* Email replies are logged manually ("Log reply"); inbound email parsing is not built.
* Local auth has no password-reset or MFA flow (Supabase Auth provides both).
* Places returns at most 60 results per query; very large campaigns need multiple runs.
* Revenue (EUR) and API cost (USD) margins are computed without currency conversion.
