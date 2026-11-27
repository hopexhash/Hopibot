# Demo websites

The portfolio of the public website (`/werk`) shows twelve demo websites. Each one is a complete
website that HOPI designed and built for a business that does not exist. They are a sales tool:
a visitor sees what a finished HOPI website looks like, on desktop and on a phone, and can click
through it.

## Honesty rules (do not relax these)

- A demo is never presented as client work. The portfolio list, every project page, the floating
  bar inside the demo and the demo's own footer all say that it is a demo for a fictional business.
- Names, people, prices and reviews inside a demo are example content. No real brands, people,
  companies, press, awards, certifications or review platforms. Phone numbers use zeros, e-mail
  addresses end in `.example`, addresses are a district or city without street and number.
- Forms never send anything: every form is a `DemoForm`, which says so before and after "sending".
- No external requests from a demo: no embeds, maps, remote images or scripts.
- Demos are not indexed (`robots: noindex` and an `X-Robots-Tag` header). The project pages under
  `/werk/<slug>` are indexed and say what they are.
- `tests/unit/site-seo.test.ts` checks most of this for every demo.

## Where things are

| What | Where |
| --- | --- |
| Catalogue (name, category, texts for the portfolio) | `src/demos/catalog.ts` |
| A demo website (`/demos/<slug>`) | `src/app/(demos)/demos/<slug>/page.tsx`, `ui.tsx`, `style.css` |
| Root layout of the demos (none of HOPI's own chrome) | `src/app/(demos)/layout.tsx` |
| Shared kit: scroll reveal, parallax, HOPI bar, `DemoForm`, `useMenu` | `src/demos/kit.tsx`, `kit.css` |
| Photo component and list of photos | `src/demos/pic.tsx`, `src/demos/images.ts` |
| Photos (two sizes each, WebP) | `public/demos/<slug>/` |
| Portfolio list and project page | `src/app/(site)/(pages)/werk/`, `src/components/site/demo-preview.tsx`, `work.css` |
| Portfolio screenshots | `public/site/work/`, made by `scripts/shoot-demos.mjs` |

Every demo has its own type, colours, layout and motion. The kit only supplies behaviour; all
styling of a demo sits in its own stylesheet, scoped under its own root class.

## Changing or adding a demo

1. Edit the demo's three files. For a new one, add an entry to `catalog.ts`, its photos to
   `public/demos/<slug>/` and `images.ts`, and a folder under `src/app/(demos)/demos/`.
2. Photos come from Unsplash (free licence) and are stored in the repository, so the site makes
   no third-party requests. Look at every photo before using it: no readable logos of real brands.
3. Retake the portfolio screenshots while the dev server runs:
   `node scripts/shoot-demos.mjs <slug>` (no slug = all).
4. `npm test` and `npm run lint`.

## Lessons

- Never clip or collapse an element that carries `data-rv` itself; it would never be seen entering
  the screen and stays hidden. Animate a child.
- Nothing in the first screen may depend on scripts or on `data-rv` to become visible.
- The floating HOPI bar sits at the bottom centre: a demo keeps its own fixed elements away from
  there and gives its footer room.
