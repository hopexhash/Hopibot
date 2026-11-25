# Deployment

HOPI Bot runs as **two processes from one codebase**: the Next.js web app and the agent
worker. Both connect to the same Postgres and Redis.

| Component | Recommended host | Notes |
|---|---|---|
| Web app | Vercel (or any Node host) | Stateless; scale freely |
| Worker | Container host with long-running processes (Railway, Fly.io, Render, ECS, a VM) | Needs Chromium for Playwright QC; see `Dockerfile.worker` |
| Database | Supabase PostgreSQL | Use the direct connection or the session pooler for the worker |
| Redis | Upstash / Railway / ElastiCache | `maxRetriesPerRequest: null` is set by the app |

The worker cannot run on serverless functions: QC launches Chromium and long agent tasks
need minutes.

## 1. Database (Supabase)

1. Create a project. Copy the connection string (Project Settings → Database).
2. `DATABASE_URL=… npm run db:migrate` — creates 33 tables, indexes, RLS policies and the
   design-system registry. Migrations are idempotent and tracked in `drizzle.__drizzle_migrations`.
3. Optional Supabase Auth: set `AUTH_PROVIDER=supabase`, `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Users are mirrored into `users` with the same id, so
   the RLS policies (`auth.uid()`) apply to direct client access.

**Backups:** enable Supabase Point-in-Time Recovery (Pro plan) or schedule daily
`pg_dump` to object storage. Website files are stored in Postgres (`website_files`), so a
database backup is a complete backup. Test a restore quarterly.

## 2. Environment variables

See `.env.example`. Required in production:

| Variable | |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `REDIS_URL` | `rediss://…` for TLS providers |
| `APP_ENCRYPTION_KEY` | 32+ random chars (`openssl rand -base64 32`). **Back it up** — losing it makes stored integration keys unreadable. |
| `APP_URL` | Public URL of the web app (used in preview and unsubscribe links) |
| `NODE_ENV=production` | Mock mode is refused in production |

Integration keys may be set as env vars or per organisation on the Integrations page.

## 3. Web app on Vercel

* Import the repository; build command `npm run build`, output default.
* Set the environment variables above.
* Point `APP_URL` at the production domain.

## 4. Worker

```bash
docker build -f Dockerfile.worker -t hopibot-worker .
docker run --env-file .env hopibot-worker
```

* Scale by running more replicas; tasks are claimed with a compare-and-set, so replicas
  never run the same task twice.
* `WORKER_AGENTS=quality_control,deployment` lets you dedicate replicas (e.g. QC on
  larger machines).
* On start (and every 30 s) the worker re-queues pending tasks and recovers tasks whose
  heartbeat stopped, so deploys and crashes don't lose progress.
* Graceful shutdown on SIGTERM drains active jobs.

## 5. Webhooks

On the Integrations page each organisation sees its webhook URLs:

* **Resend** → `https://APP_URL/api/webhooks/resend/<orgId>`; events: sent, delivered,
  delivery_delayed, bounced, complained, opened, clicked. Paste the signing secret into the
  Resend integration settings.
* **Stripe** → `https://APP_URL/api/webhooks/stripe/<orgId>`; events:
  `checkout.session.completed`, `invoice.paid`, `customer.subscription.*`.

## 6. Email sending prerequisites

* Verify the sending domain in Resend (SPF, DKIM, DMARC).
* Fill in Settings → Agency identity (name, address, KvK, sender). Sending is blocked
  until they are set; they are included in every email.

## 7. Preview domains

Set Settings → Preview base domain (e.g. `previews.youragency.nl`) and add a wildcard DNS
record pointing to Vercel. The Deployment agent attaches `<slug>.previews.youragency.nl`
to each preview project. Without it, previews use the Vercel URL or the built-in
`/p/<slug>` host.

## 8. Monitoring

* `GET /api/health` → 200 when Postgres and Redis are reachable (use for uptime checks).
* Agent errors are visible in each agent's execution console and as notifications;
  server errors are logged to stdout with a request digest. Forward logs to your log
  platform (Vercel Log Drains, Datadog, Better Stack).

## 9. Scaling notes (10 → 10,000 businesses)

* All list pages paginate server-side and use `(organization_id, …)` indexes.
* Throughput scales with worker replicas and per-agent concurrency settings.
* The Places API caps each search at 60 results; larger campaigns are split by
  neighbourhood/keyword via separate discovery runs or scheduled automations.
* Keep `DATABASE_POOL_SIZE` × replicas below your Postgres connection limit (use the
  Supabase pooler for the web app).

## Region

`vercel.json` pins serverless functions to `fra1` (Frankfurt) so they sit next to the
Supabase database in `eu-central-1`. If your database lives elsewhere, change the region to
match: every page render makes several database round trips, and a cross-ocean hop adds
roughly 90 ms to each. Put Redis (Upstash/Vercel KV) in the same region too.
