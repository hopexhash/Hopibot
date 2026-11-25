# Security & compliance model

## Authentication & authorisation

* Local provider: scrypt password hashes, 256-bit random session tokens stored as SHA-256
  hashes, `httpOnly` + `SameSite=Lax` (+ `Secure` in production) cookies, 14-day expiry.
  Supabase Auth is supported as an alternative (`AUTH_PROVIDER=supabase`).
* Login is rate-limited per IP and per email; failed logins are audit-logged; unknown
  emails take the same time as wrong passwords.
* Roles: `owner` > `admin` > `member` > `viewer`. Every server action goes through one
  wrapper (`src/server/actions/_util.ts`) that authenticates, checks the minimum role,
  rate-limits, validates input with Zod and writes the audit log. Approving outreach,
  publishing, budgets, integrations and deletions require `admin`.
* Next.js server actions are protected against CSRF by origin checks.

## Tenant isolation

* Every business table has `organization_id`; the data-access layer always filters by the
  session's organisation (including detail routes, exports and screenshots).
* Row Level Security is enabled on all tables with membership-based policies. Sessions and
  integration secrets have no client policy and are revoked from the client roles. The
  integration test suite verifies cross-organisation reads/writes are blocked.

## Secrets

* Integration keys are encrypted with AES-256-GCM (key derived from
  `APP_ENCRYPTION_KEY`), never returned to the browser after saving (only `••••last4`), and
  never logged. Webhook signing secrets in integration config are encrypted the same way.
* Server modules import a guard that throws if bundled into browser code.
* Platform environment variables are namespaced where collisions are likely
  (`AGENCYOS_GITHUB_TOKEN`).

## Untrusted input & AI safety

* All fetching of business websites goes through `safeFetch`: http(s) only, default
  ports, no credentials in URLs, DNS pinned inside the socket lookup (blocks DNS
  rebinding), private/loopback/link-local/CGNAT/multicast ranges blocked for IPv4 and IPv6,
  redirects re-validated hop by hop, size and time limits.
* Playwright QC applies the same rules to any external resource a generated page requests.
* External text is truncated and wrapped in `<untrusted_content>` delimiters (attempts to
  close the delimiter are neutralised); the system prompt instructs the model to treat it
  as data. Agents only ever request **structured output** — no tools are exposed to the
  model, so injected text cannot trigger actions.
* Model output is validated against Zod schemas, then passed through guardrails: business
  facts are overwritten from verified records, links restricted to safe schemes, images
  restricted to generated artwork or explicitly authorised HTTPS images.
* Generated sites are rendered by React (escaped) and served with a strict CSP
  (`default-src 'none'`), `noindex`, and a non-removable demonstration banner.

## Human approval gates

| Action | Gate |
|---|---|
| Sending any email | Admin approval with lawful-basis + recipient-type confirmation; suppression re-checked at send time |
| Publishing an official website / connecting a domain | Business must be Won, website approved, written authorisation confirmed, then admin approval |
| Exceeding spending limits | Task parks as `WAITING_FOR_APPROVAL`; admin may approve a single run |
| Purchases / external account changes | Not automated (Stripe payment links are created only on explicit admin action) |

## GDPR & Dutch e-marketing (Telecommunicatiewet art. 11.7)

* Contact research records only publicly published addresses with source URL, verification
  status/date and a lawful-basis note; addresses are never guessed.
* Every email identifies the agency (name, address, KvK) and includes an opt-out link;
  RFC 8058 one-click unsubscribe headers are set.
* Opt-outs, bounces and complaints are added to the suppression list automatically and
  cannot be removed. Suppressed addresses are never drafted, stored or sent to.
* GDPR erasure deletes contacts, research, emails and notes, keeping only a tombstone and
  suppression entry so the business is never contacted again.
* The approval dialog explains that unsolicited e-marketing to natural persons (including
  sole traders) requires prior consent.

## Other controls

* Security headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`, referrer and
  permissions policies) on all app routes.
* CSV exports are protected against formula injection.
* Audit log is append-only for client roles.
* Known gaps: no password-reset email flow or MFA for the local provider (use Supabase Auth
  for those), and no WAF — put the app behind Vercel/Cloudflare protections.
