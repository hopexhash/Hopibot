# AgencyOS AI — Architecture

## 1. Starting point

The repository was empty (no commits) when this work began, so there was no existing
functionality to reuse. Everything below is new.

## 2. Topology

```
┌──────────────────────────── Next.js 16 app (UI + API) ─────────────────────────────┐
│  App Router pages (dashboard)   Route handlers (/api/*)   Server actions            │
│  /p/[slug] internal preview     Webhooks (Resend, Stripe)  /u/[token] opt-out        │
└──────────────┬──────────────────────────────┬──────────────────────────────────────┘
               │ Drizzle (DATABASE_URL)        │ BullMQ producer
               ▼                               ▼
     ┌──────────────────┐            ┌──────────────────┐
     │ Supabase Postgres│◄───────────│      Redis       │
     │ (source of truth)│            │ (queues, limits) │
     └──────────────────┘            └────────┬─────────┘
               ▲                              │ BullMQ consumer
               │                              ▼
     ┌─────────┴───────────────── Worker process (npm run worker) ──────────────────┐
     │ Orchestrator · 7 agents · Playwright QC · static site export · scheduler ·    │
     │ recovery sweeper (stale RUNNING tasks re-queued after restart)                │
     └───────────────────────────────────────────────────────────────────────────────┘
```

* **One codebase, two processes.** The web app never runs long agent work inline; it
  writes tasks to Postgres and enqueues a BullMQ job. The worker executes them.
* **Postgres is the source of truth for workflow state.** Redis only carries "please run
  task X" messages. If Redis is flushed or the worker restarts, the recovery sweeper
  re-enqueues every `PENDING`/stale `RUNNING` task from the database, so progress
  survives restarts.

## 3. Orchestrator and state machine

* `workflow_runs` — one objective ("Find 50 restaurants in Rotterdam…") or one
  automation execution. Its `plan` is the structured interpretation of the objective.
* `agent_tasks` — the unit of work. Columns: id, agent, business, status, attempts,
  max_attempts, depends_on[], idempotency_key, heartbeat, timings, error, logs (in
  `agent_logs`), cost.
* Statuses: `PENDING → RUNNING → COMPLETED | FAILED | WAITING_FOR_APPROVAL | CANCELLED`,
  with `FAILED → PENDING` on retry and `WAITING_FOR_APPROVAL → PENDING` on approval.
  Transitions are validated in `src/server/orchestrator/state-machine.ts` and applied with
  a compare-and-set `UPDATE … WHERE status = <expected>` so two workers can never both
  start the same task.
* **Idempotency:** `(organization_id, idempotency_key)` is unique, e.g.
  `research:<businessId>:<runId>`; re-submitting a plan never duplicates work. BullMQ
  job ids equal `taskId:attempt`.
* **Dependencies:** when a task completes, the orchestrator promotes dependents whose
  dependencies are all `COMPLETED` and enqueues them; it also lets agents fan out new
  tasks (Lead Finder → one Research task per qualified lead, etc.).
* **Budget guard:** before any paid call the cost service checks the organisation's daily
  and monthly limits plus the per-agent limit. If exceeded, the task moves to
  `WAITING_FOR_APPROVAL` (reason `BUDGET_EXCEEDED`) instead of spending.

## 4. Agents

| Agent | Input | Output | External services |
|---|---|---|---|
| Lead Finder | city/country/category/radius/keywords | `businesses`, `lead_scores` | Google Places API (New), SSRF-safe website audit |
| Research | business | `business_research` (verified facts vs assumptions, brief) | Claude |
| Contact Research | business | `business_contacts` with source URL + verification | Hunter.io, business website |
| Website Builder | research brief | `website_versions` (SiteSpec JSON + exported files) | Claude |
| Quality Control | website version | QC report + score; loops back to the builder < 85 | Playwright |
| Deployment | approved/ready version | `deployments` | GitHub, Vercel |
| Sales | ready preview | `sales_emails` drafts → approval → send | Claude, Resend |

External content is always treated as untrusted: it is fetched through `safeFetch`
(SSRF protection), truncated, wrapped in `<untrusted_content>` delimiters, and the models
are only ever asked for **structured output** — no agent has tools that external text could
trigger.

## 5. Website generation

Instead of generating unrelated codebases, the builder produces a validated **SiteSpec**
(JSON: sections, copy, theme tokens, imagery references). SiteSpecs are rendered by a
library of React templates with one design system per category (restaurant, dental,
construction, automotive, beauty, real estate, corporate, service). The same components
render:

1. the internal preview at `/p/<slug>` (always carries a "demonstration" banner), and
2. a self-contained static export (`index.html`, `styles.css`, `robots.txt`) used for
   GitHub/Vercel deployments.

AI improvements ("make it more premium") send the current SiteSpec plus the instruction
and receive a modified SiteSpec — a new version, never a from-scratch regeneration.

## 6. Data model and isolation

Supabase Postgres, schema in `src/server/db/schema.ts`, SQL migrations in `drizzle/`.
Every business table carries `organization_id`. Isolation is enforced twice:

* the server data-access layer always scopes queries by the session's organisation;
* Row Level Security is enabled on every table with membership-based policies
  (`auth.uid()`), so any direct Supabase client access is also isolated.

## 7. Authentication

`AUTH_PROVIDER=supabase` uses Supabase Auth (cookies via `@supabase/ssr`).
`AUTH_PROVIDER=local` uses the built-in provider (scrypt password hashes, random session
tokens stored hashed, httpOnly cookies). Both map to the same `users` row so RLS and
roles (`owner`, `admin`, `member`, `viewer`) behave identically.

## 8. Integrations, secrets and mock mode

Credentials come from environment variables or the Integrations page (stored AES-256-GCM
encrypted with `APP_ENCRYPTION_KEY`; only the last four characters are ever returned to
the browser). When an integration is missing and `ALLOW_MOCK_MODE=true` (development
only — refused in production), the agent uses a deterministic mock. Every row produced in
mock mode has `is_mock = true` and is badged **MOCK** in the UI; mock data never feeds
revenue or KPI numbers presented as real.

## 9. Why `cacheComponents` is disabled

Next.js 16 enables Cache Components by default. Every dashboard route here is
authenticated and organisation-specific, so there is no static shell worth prerendering;
the classic dynamic model is simpler and avoids per-route Suspense validation. This can be
revisited per route later.

## 10. Scaling from 10 to 10,000 businesses

* Work is queue-based with per-agent concurrency, so throughput scales by adding workers.
* All lists are server-paginated and indexed on `(organization_id, …)`.
* Long-running steps (QC, deployment) are isolated per task; failures retry with backoff.
* Cost limits stop runaway spend before it happens.
