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
* (Resolved) Profit now converts API costs with a configurable USD to EUR rate.

## Platform expansion (command-center release)

Built in six phases, each verified in a browser at iPhone (440 px), Android (360 px) and
desktop widths before it was committed.

1. **Design system and navigation** — new palette, Poppins throughout (monospace only in
   the terminal), bottom-sheet dialogs on phones, grouped sidebar with tooltips, section
   tabs, command palette (Cmd/Ctrl+K) with global search, Command Center with 13 KPI tiles
   compared with the previous period, live agent cards with pause / resume / stop.
2. **Agents** — Agent Builder (custom agents with a server-validated tool registry, hard
   limits on steps, time and budget, test runs that never write), terminal with real
   commands and log tabs, agent detail pages.
3. **Business** — outreach campaigns (templates, audience, preview, approval, daily limit,
   one follow-up), manual leads, CRM tasks, touch-friendly board.
4. **Intelligence** — date ranges, profit with expenses and currency conversion, budget
   warnings, cost per run / website / customer, health summary and incidents.
5. **Platform** — integrations only show "Connected" after a real test, notification kinds
   and page, settings sections.
6. **Polish** — every page checked for horizontal overflow and console errors.

### Verified only with a stand-in (needs real keys to confirm end to end)

* Custom-agent runs and the terminal's AI mode call the Claude API. The loop, limits and
  permission checks are unit-tested with a fake model client; no real API call was made
  in development because no Anthropic key is configured there.
* Campaign delivery uses the same send path as single emails; rules are covered by
  database tests, but no real email was sent (Resend is not configured in development).

### Still not built

* Inbound reply detection (replies are logged by hand), so "customer replied" cannot
  trigger an automation.
* Automations support three triggers (manual, new qualified lead, schedule) and a fixed
  list of steps; conditions and delays are not supported.
* OpenAI, Gmail and Cloudflare integrations.
* Profit converts API costs with one configurable USD to EUR rate, not daily rates.

## HOPEXBOT upgrade (website engine, sales, markets)

**Built and verified locally (104 tests, browser QC 100/100 on all 64 page variations, phone + desktop screenshots reviewed)**
- Template library: 24 designs (12 food, 8 services, 4 general), each with its own typography (28 self-hosted families), palette and layout; 20 industry designs have 3 layout variations each (primary + 2), including monumental wordmark heroes, collage heroes, service strips and info tickers. Library page: `/websites/templates`.
- New sections: packages, team, booking/reservation/quote/order forms, before/after slider, order channels, source-verified testimonials, optional verified prices. Accent-phrase headlines.
- Design selection engine (category + name/research signals), fact-safe Dutch blueprints, French UI strings for generated sites.
- Demo page `/d/<slug>`: device preview, measured opportunity report, packages (€299/€499/€799), care plans (€49/€79/€149), add-ons, order form. Prices editable in Settings → Pricing and always computed server-side.
- 15-stage sales pipeline; demo-view and order tracking; orders table.
- Permission-based outreach: basis/source/proof per business, re-checked at send time; rules for NL and BE; HTML email version.
- Market restriction: Netherlands and Belgium only, enforced in planning, discovery (region code + per-result country check), lead saving, agent tools, settings and outreach.
- Autopilot (Settings → Autopilot): hours, days, cities, industries, daily discovery/website limits; runs from the worker tick; drafts emails only.

**Implemented but NOT verified against the live service from the build sandbox**
- Pexels stock photography (Integrations → Pexels photos). The sandbox cannot reach pexels.com, so photo search was never exercised live. Use the Test button after adding a key. Without a key, sites use illustrations.
- Stripe Checkout sessions for demo-page orders (order → checkout → webhook marks paid). Without Stripe, orders are stored as requests and the agency is notified.
- Autopilot end to end (needs the hosted worker and Google Maps key).

**Not built yet**
- Country filter and per-country reporting in the dashboard; Belgian-specific legal/consumer texts and cookie notices on demo pages; French blueprint copy (French sites rely on the AI writer) and French demo-page strings.
- Model routing to cheaper models per task, cost estimate before each generation, screenshot comparison in QC, single-section regeneration.
- Multi-page websites (sites are rich single pages), real booking/ordering back-ends (forms are demonstrations until an add-on is sold).

## Website redesign qualification (lead quality engine)

Businesses with a website only become leads when the site genuinely needs a redesign.

- `src/server/inspection/inspect-site.ts` — real browser (Playwright) at 1440px and 390px: screenshots plus measurements (viewport, sideways overflow, small text, menu button, load time, copyright year, placeholder text, broken images and nav links, HTTPS, contact options).
- `src/lib/qualification.ts` — redesign score 0–100 (mobile 25, visual 25, structure 15, freshness 10, technical 10, conversion 10, performance 5), fixed thresholds, hard exclusion for professional-looking sites, decision rules.
- `src/server/inspection/assess.ts` — visual assessment of the screenshots, and an independent verification that must name two concrete problems. Owner feedback is included as calibration examples.
- `src/server/inspection/qualify.ts` — order of work: owner feedback (free) → browser (free) → assessment → verification only from 55 points. Every decision is stored in `website_inspections` and logged.
- Integrated in the Lead Discovery agent (autopilot included). Existing leads are inspected by the worker (`backfill.ts`); "Inspect website" re-runs it on request.
- Dashboard: qualification badge, "Leads only / Rejected / Everything" filter, inspection card with screenshots, scores, problems, explanation and the four feedback buttons.

Verified: scoring and decision rules (unit tests), browser inspection against local test pages, mock pipeline end to end.
Not verified in the sandbox: the two AI calls with a live key, and inspection of real external websites.
Not built: screenshots as calibration examples (feedback is text-only), a settings screen for thresholds (fixed on purpose).
