# HOPI email design system

Every email HOPI sends uses one design, matching wearehopi.nl: warm off-white paper
(#f2eee6), charcoal ink (#0c0c0d), one orange accent (#ff4d23, #bf320c for text), Space Grotesk
headings, a clean sans for text, IBM Plex Mono for labels and buttons, square corners.

- Components: `src/lib/email/kit.ts` (layout, logo header, heading, paragraphs, buttons,
  website preview, info/pricing card, feature list, process steps, signature, footer, test
  banner). Tables and inline styles only; buttons are table cells (Outlook); one `<style>`
  block for phones.
- Templates: `src/lib/email/templates.ts`
  - `designReadyEmail`: "Je websiteconcept is klaar" for someone who asked through the
    website (fixed text, NL/EN, plain text + HTML).
  - `writtenEmail`: outreach intro, follow-up and campaign messages (the words are the
    approved plain text; the HTML adds header, preview, buttons, price line and footer).
- Server glue: `src/server/sales/email-html.ts` (`buildEmailHtml` for a stored email,
  `emailContext` from Settings). Test copies use the same HTML with a TEST banner and a dead
  unsubscribe link.
- Logo: `public/site/email/hopi-logo-ink.png` / `-paper.png` (the wordmark rendered in Space
  Grotesk with the orange dot, 4x for sharp screens).
- Concept screenshot: `/api/preview-image/<slug>` serves the QC desktop screenshot of a ready
  design as a 1040px JPEG; without one the preview is drawn in the design's own colours.
- Preview: Control room → Email Center → **Email designs** shows every email with the current
  Settings on a computer and a phone width, in Dutch and English, and flags missing sender
  details.

Rules: Dutch always uses "je". Amounts come from the price catalogue; company details from
Settings, and a missing detail is left out, never replaced by a placeholder. Sending stays
blocked while the sender email or business address is missing.

Emails that exist today: the design-ready reply to website enquiries, outreach intro and
follow-up (Sales agent, approval required), campaign emails, and test copies. Sign-in emails
are sent by Supabase Auth and are styled in the Supabase dashboard, not here.
