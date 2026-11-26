# Motion system

One set of timings and curves for the public website and the control room. The source of
truth is `src/lib/motion.ts`; the same values are CSS variables in `src/app/globals.css`
(control room) and `src/app/(site)/site.css` (website).

| Token | Value | Used for |
|---|---|---|
| `--dur-micro` | 180 ms | hover, press, focus, tooltips, status text |
| `--dur-base` | 260 ms | buttons, cards, menus, dialogs, page changes |
| `--dur-reveal` | 600–700 ms | sections entering, charts drawing, bars growing |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | things arriving |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | things moving, ambient loops |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | things leaving |

## Rules

- Animate `transform`, `translate`, `opacity` (and colour); never layout properties.
- Movement is small: 2–18 px. Nothing bounces, nothing spins for decoration.
- Every animation reflects a real state or event. A progress sheen runs only while work is
  under way (`<Progress active>`), a check draws only when a stage really finished, a row is
  highlighted only when it really appeared while the view was open, numbers count up to the
  real server value. Nothing waits for an animation and there are no artificial delays.
- Hover effects sit behind `@media (hover: hover)`; nothing depends on hover.
- `prefers-reduced-motion: reduce` switches everything off on both surfaces; content is
  simply there.
- The public website uses CSS and one small script (`Reveal`) only. Framer Motion is loaded
  in the control room alone, where it was already in use.

## Where things are

| What | Where |
|---|---|
| Website: hero ambient layer, entrances, buttons, float, menu, reveals, FAQ | `site.css` ("Motion" blocks), `HeroAmbient` in `components/site/parts.tsx`, `Reveal` in `site-client.tsx` |
| Control room keyframes and utilities (`page-enter`, `row-in`, `row-new`, `check-draw`, `progress-fill`, `bar-grow`, `status-live`, `tab-m`, `reveal-media`, `building-line`) | `globals.css` ("Motion system") |
| Page transition | `src/app/(app)/(dashboard)/template.tsx` |
| Buttons, fields, dialogs, menus, tooltips, tabs, progress, `CheckDraw` | `components/ui/index.tsx` |
| Count-up figures | `components/app/count-up.tsx` (used by `StatCard`) |
| Status change pulse | `components/app/status.tsx` |
| Sidebar marker, agent status and activity swap, feed entries | `sidebar.tsx`, `live-operations.tsx` |
| Leads, terminal, website builder, charts, toasts | `business-table.tsx`, `terminal-console.tsx`, `website-progress.tsx`, `website-manager.tsx`, `charts.tsx`, `providers.tsx` |

## Measured (production build, Lighthouse mobile, this machine)

Homepage after the motion work: performance 87–95, accessibility 100, best practices 100,
SEO 100; largest contentful paint 2.0–2.2 s with applied throttling; layout shift 0. The
headline and intro start partly visible on purpose, so the first screen is never empty and
the largest-content measurement is the real headline.
