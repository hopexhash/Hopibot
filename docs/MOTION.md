# Motion system (public website)

The public website has one motion engine, `src/components/site/fx.tsx`, mounted once in the
site layout. It runs a single animation-frame loop and writes values that the CSS reads; the
look of every effect lives in the stylesheets (`src/app/(site)/v3.css`, `components/site/home/home.css`,
`components/site/work.css`). There is no animation framework on the website: the only
library is Lenis (smooth scrolling, about 4 KB), loaded on demand for mouse and trackpad users.
GSAP and three.js were considered and left out to protect loading speed; the hero sculpture is
a hand-written WebGL shader (`components/site/home/hero-sculpture.tsx`).

## What the engine provides

| Mark-up | Effect |
|---|---|
| `[data-in]` | gets `.is-in` once it scrolls into view (masked words and letters, clipped images) |
| `[data-p]` | gets `--p`, progress through the screen from 0 to 1 (parallax, scrubbed type) |
| `[data-p="pin"]` + `[data-hscroll]` | progress through a pinned section; the work section travels sideways |
| `[data-steps]` / `[data-step-item]` | `data-step` = the item being read (the process numeral) |
| `[data-cursor="word"]` | the cursor follower grows and shows the word |
| `[data-peek="/image"]` | a picture follows the pointer over that element |
| `[data-magnetic]` | the element leans towards the pointer |
| any internal link | curtain between pages; smooth scroll for in-page anchors |

Text is cut into words or letters on the server (`components/site/split.tsx`), so the markup
never changes after load and search engines read ordinary text.

## Rules

- Phones and tablets: no cursor effects, no smooth-scroll library, no pinned sideways section
  (the work row swipes natively).
- "Reduce motion": the engine adds no effects; nothing starts hidden, links navigate normally,
  the WebGL sculpture draws one still frame.
- No WebGL: a CSS stand-in stays in place of the sculpture.
- The sculpture draws to a pixel budget, lowers it when frames are slow, and pauses when it is
  off screen or the tab is hidden.
- An element the engine watches must not clip itself away (`clip-path` on the watched element
  hides it from the observer): clip a child instead.
- Nothing fakes activity: there are no artificial loading delays and no pre-loader.

The dashboard keeps its own motion classes in `src/app/globals.css` and `src/lib/motion.ts`.
