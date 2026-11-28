/**
 * HOPI email design system: the components every email is built from.
 *
 * The look follows wearehopi.nl: warm off-white paper, charcoal ink, one electric orange
 * accent; Space Grotesk for headings, a clean sans for text and IBM Plex Mono for small
 * uppercase labels and buttons; square corners (2–4px), thin rules, generous whitespace.
 *
 * Email clients are not browsers: every component is a table with inline styles, images
 * have absolute https URLs, width/height and alt text, buttons are table cells (they work
 * in Outlook) and web fonts are a bonus with safe fallbacks (Gmail and Outlook use the
 * fallback). One small <style> block adds the phone layout for clients that read it.
 */

export const BRAND = {
  paper: "#f2eee6",
  paper2: "#e9e4d9",
  sheet: "#fbf9f5",
  ink: "#0c0c0d",
  ink2: "#29292b",
  muted: "#57554f",
  faint: "#8a8780",
  line: "#dcd6ca",
  accent: "#ff4d23",
  /** The accent for text on light backgrounds (the pure accent is too light to read there). */
  accentInk: "#bf320c",
  radius: "4px",
  display: "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif",
  text: "-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Helvetica,Arial,sans-serif",
  mono: "'IBM Plex Mono',SFMono-Regular,Menlo,Consolas,'Courier New',monospace",
} as const;

export const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Text with its web addresses turned into links. */
export function linkify(text: string, color: string = BRAND.ink) {
  return esc(text).replace(/(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, `<a href="$1" style="color:${color};text-decoration:underline;text-underline-offset:3px">$1</a>`);
}

const W = 600;
const PAD = 40;

/** The document: preheader, fonts, phone layout and the paper background around a 600px sheet. */
export function layout(o: { lang: string; title: string; preheader: string; body: string }) {
  return `<!DOCTYPE html>
<html lang="${esc(o.lang)}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${esc(o.title)}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}
  table,td{mso-table-lspace:0;mso-table-rspace:0}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none}
  a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
  u + #body a{color:inherit;text-decoration:none}
  @media (max-width:620px){
    .h-sheet{width:100%!important}
    .h-pad{padding-left:22px!important;padding-right:22px!important}
    .h-h1{font-size:28px!important;line-height:1.12!important}
    .h-btn,.h-btn td{width:100%!important}
    .h-btn a{display:block!important;box-sizing:border-box!important;text-align:center!important;padding-left:12px!important;padding-right:12px!important;letter-spacing:.06em!important}
    .h-col{display:block!important;width:100%!important;padding:0 0 18px!important}
    .h-hide{display:none!important}
  }
</style>
</head>
<body id="body" style="margin:0;padding:0;background:${BRAND.paper};word-spacing:normal">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${BRAND.paper};opacity:0">${esc(o.preheader)}${"&#847;&zwnj;&nbsp;".repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BRAND.paper}" style="background:${BRAND.paper}">
<tr><td align="center" style="padding:28px 12px 40px">
<!--[if mso]><table role="presentation" width="${W}" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" class="h-sheet" width="${W}" cellpadding="0" cellspacing="0" border="0" style="width:${W}px;max-width:${W}px">
${o.body}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr>
</table>
</body>
</html>`;
}

/** One row of the sheet. `tone`: the white sheet (default) or the dark brand panel. */
export function row(inner: string, o: { pad?: string; tone?: "sheet" | "ink" | "none"; first?: boolean; last?: boolean } = {}) {
  const bg = o.tone === "ink" ? BRAND.ink : o.tone === "none" ? "" : BRAND.sheet;
  const radius = o.first && o.last ? `border-radius:${BRAND.radius}` : o.first ? `border-radius:${BRAND.radius} ${BRAND.radius} 0 0` : o.last ? `border-radius:0 0 ${BRAND.radius} ${BRAND.radius}` : "";
  return `<tr><td class="h-pad" ${bg ? `bgcolor="${bg}"` : ""} style="${bg ? `background:${bg};` : ""}padding:${o.pad ?? `0 ${PAD}px`};${radius}">${inner}</td></tr>`;
}

/** Logo header: the HOPI wordmark (the image from wearehopi.nl) and an optional label on the right. */
export function header(o: { siteUrl: string; label?: string }) {
  const logo = `<a href="${esc(o.siteUrl)}" style="text-decoration:none"><img src="${esc(o.siteUrl)}/site/email/hopi-logo-ink.png" width="65" height="26" alt="HOPI" style="display:block;width:65px;height:26px;font:700 22px/26px ${BRAND.display};color:${BRAND.ink}"></a>`;
  return row(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="middle">${logo}</td>${o.label ? `<td valign="middle" align="right" style="font:500 11px/1 ${BRAND.mono};letter-spacing:.14em;text-transform:uppercase;color:${BRAND.muted}">${esc(o.label)}</td>` : ""}</tr></table>`,
    { pad: `30px ${PAD}px 26px`, first: true },
  ) + rule();
}

/** A thin full-width line. */
export function rule(o: { pad?: string } = {}) {
  return row(`<div style="height:1px;line-height:1px;font-size:1px;background:${BRAND.line}">&nbsp;</div>`, { pad: o.pad ?? `0 ${PAD}px` });
}

/** Space between sections. */
export const space = (px: number) => row(`<div style="height:${px}px;line-height:${px}px;font-size:1px">&nbsp;</div>`, { pad: "0" });

/** Small uppercase label above a heading, with the accent dot of the website. */
export function eyebrow(text: string) {
  return `<p style="margin:0 0 14px;font:500 11px/1.4 ${BRAND.mono};letter-spacing:.16em;text-transform:uppercase;color:${BRAND.accentInk}"><span style="color:${BRAND.accent}">&#9679;</span>&nbsp;&nbsp;${esc(text)}</p>`;
}

/** The heading of the email. `*word*` is set in the accent colour, like the headings on the website. */
export function heading(text: string) {
  const html = esc(text).replace(/\*([^*]+)\*/g, `<span style="color:${BRAND.accentInk}">$1</span>`);
  return `<h1 class="h-h1" style="margin:0 0 18px;font:700 34px/1.08 ${BRAND.display};letter-spacing:-.025em;color:${BRAND.ink};mso-line-height-rule:exactly">${html}</h1>`;
}

export function paragraph(text: string, o: { size?: number; color?: string; margin?: string } = {}) {
  return `<p style="margin:${o.margin ?? "0 0 16px"};font:400 ${o.size ?? 16}px/1.65 ${BRAND.text};color:${o.color ?? BRAND.ink2}">${linkify(text).replace(/\n/g, "<br>")}</p>`;
}

/** Several paragraphs as one block. */
export const prose = (paragraphs: string[]) => paragraphs.map((p) => paragraph(p)).join("");

/**
 * A button like the ones on the website: square corners, mono uppercase label. Primary is
 * the orange accent with dark text; secondary is outlined. Table-based, so Outlook shows it.
 */
export function button(label: string, href: string, kind: "primary" | "secondary" | "dark" = "primary") {
  const bg = kind === "primary" ? BRAND.accent : kind === "dark" ? BRAND.ink : BRAND.sheet;
  const color = kind === "dark" ? BRAND.paper : BRAND.ink;
  const border = kind === "secondary" ? `1px solid ${BRAND.ink}` : `1px solid ${bg}`;
  return `<table role="presentation" class="h-btn" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px"><tr><td bgcolor="${bg}" style="background:${bg};border:${border};border-radius:2px;mso-padding-alt:16px 26px"><a href="${esc(href)}" style="display:inline-block;padding:16px 26px;font:500 12.5px/1 ${BRAND.mono};letter-spacing:.08em;text-transform:uppercase;color:${color};text-decoration:none;mso-padding-alt:0">${esc(label)}&nbsp;&nbsp;&rarr;</a></td></tr></table>`;
}

/** Buttons under each other (they become full width on a phone). */
export const buttons = (items: { label: string; href: string; kind?: "primary" | "secondary" | "dark" }[]) => items.map((b) => button(b.label, b.href, b.kind)).join("");

/**
 * The website preview: a browser window with the screenshot of the customer's own design
 * (or, without a screenshot, a panel in the colours of that design), the business name and
 * a small WEBSITECONCEPT label. The whole card links to the preview.
 */
export function websitePreview(o: { href: string; image?: string | null; imageAlt: string; label: string; businessName: string; domain: string; caption: string; design?: { bg: string; ink: string; accent: string; displayFont: string } }) {
  const bar = `<tr><td bgcolor="${BRAND.ink2}" style="background:${BRAND.ink2};padding:10px 14px;font:500 10px/1 ${BRAND.mono};letter-spacing:.08em;color:#a9a59c"><span style="color:#5c5a55">&#9679;&nbsp;&#9679;&nbsp;&#9679;</span>&nbsp;&nbsp;&nbsp;${esc(o.domain)}</td></tr>`;
  const visual = o.image
    ? `<tr><td style="line-height:0;font-size:0"><a href="${esc(o.href)}"><img src="${esc(o.image)}" width="${W - PAD * 2}" alt="${esc(o.imageAlt)}" style="display:block;width:100%;max-width:${W - PAD * 2}px;height:auto;border:0;background:${BRAND.paper2}"></a></td></tr>`
    : // No screenshot: a panel in the colours and display type of the customer's own design.
      `<tr><td bgcolor="${o.design?.bg ?? BRAND.ink}" style="background:${o.design?.bg ?? BRAND.ink};padding:48px 30px 46px"><a href="${esc(o.href)}" style="text-decoration:none"><p style="margin:0 0 14px;font:500 10.5px/1 ${BRAND.mono};letter-spacing:.16em;text-transform:uppercase;color:${o.design?.accent ?? BRAND.accent}">${esc(o.label)}</p><p style="margin:0;font:600 32px/1.1 ${o.design?.displayFont ?? BRAND.display};color:${o.design?.ink ?? BRAND.paper}">${esc(o.businessName)}</p><p style="margin:18px 0 0;font:500 11px/1 ${BRAND.mono};letter-spacing:.14em;text-transform:uppercase;color:${o.design?.ink ?? BRAND.paper}">${esc(o.caption)} &rarr;</p></a></td></tr>`;
  const meta = o.image
    ? `<tr><td bgcolor="${BRAND.ink}" style="background:${BRAND.ink};padding:20px 22px 22px"><p style="margin:0 0 8px;font:500 10.5px/1 ${BRAND.mono};letter-spacing:.16em;text-transform:uppercase;color:${BRAND.accent}">${esc(o.label)}</p><p style="margin:0;font:600 22px/1.2 ${BRAND.display};letter-spacing:-.01em;color:${BRAND.paper}"><a href="${esc(o.href)}" style="color:${BRAND.paper};text-decoration:none">${esc(o.businessName)}</a></p></td></tr>`
    : "";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:${BRAND.radius};overflow:hidden;border:1px solid ${BRAND.ink}">${bar}${visual}${meta}</table>`;
}

/** A quiet bordered card with a label: for prices, next steps, details. */
export function infoCard(o: { label: string; body: string }) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${BRAND.line};border-radius:${BRAND.radius}"><tr><td style="padding:18px 20px 4px"><p style="margin:0 0 10px;font:500 10.5px/1 ${BRAND.mono};letter-spacing:.16em;text-transform:uppercase;color:${BRAND.muted}">${esc(o.label)}</p>${o.body}</td></tr></table>`;
}

/** Pricing line, from the catalogue (never a hardcoded amount). */
export function pricing(o: { label: string; text: string }) {
  return infoCard({ label: o.label, body: paragraph(o.text, { size: 15 }) });
}

/** A list with small accent ticks. */
export function featureList(items: string[]) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 8px">${items
    .map(
      (i) =>
        `<tr><td valign="top" style="padding:2px 12px 10px 0;font:700 14px/1.5 ${BRAND.text};color:${BRAND.accentInk}">&#10003;</td><td style="padding:0 0 10px;font:400 15px/1.55 ${BRAND.text};color:${BRAND.ink2}">${esc(i)}</td></tr>`,
    )
    .join("")}</table>`;
}

/** Numbered steps in a row (stacked on a phone): how working with HOPI goes. */
export function process(o: { label: string; steps: { title: string; text: string }[] }) {
  const cells = o.steps
    .map(
      (s, i) =>
        `<td class="h-col" valign="top" width="${Math.floor(100 / o.steps.length)}%" style="padding:0 ${i < o.steps.length - 1 ? 18 : 0}px 0 0"><p style="margin:0 0 8px;font:500 11px/1 ${BRAND.mono};letter-spacing:.1em;color:${BRAND.accent}">${String(i + 1).padStart(2, "0")}</p><p style="margin:0 0 6px;font:600 15px/1.3 ${BRAND.display};color:${BRAND.paper}">${esc(s.title)}</p><p style="margin:0;font:400 13.5px/1.55 ${BRAND.text};color:#b9b5ac">${esc(s.text)}</p></td>`,
    )
    .join("");
  return `<p style="margin:0 0 18px;font:500 10.5px/1 ${BRAND.mono};letter-spacing:.16em;text-transform:uppercase;color:#a9a59c">${esc(o.label)}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${cells}</tr></table>`;
}

/** Closing and name. */
export function signature(o: { closing: string; name: string; role?: string }) {
  return `<p style="margin:8px 0 0;font:400 16px/1.6 ${BRAND.text};color:${BRAND.ink2}">${esc(o.closing)}</p><p style="margin:2px 0 0;font:600 16px/1.5 ${BRAND.display};color:${BRAND.ink}">${esc(o.name)}</p>${o.role ? `<p style="margin:2px 0 0;font:500 11px/1.6 ${BRAND.mono};letter-spacing:.08em;text-transform:uppercase;color:${BRAND.muted}">${esc(o.role)}</p>` : ""}`;
}

export type Company = { name: string; address: string; kvk: string; website: string; email: string; phone: string };

/**
 * The footer: wordmark, who sends this (only details that are filled in, never a
 * placeholder), why the recipient gets it, privacy and unsubscribe links.
 */
export function footer(o: { siteUrl: string; company: Company; tagline: string; reason: string; links: { label: string; href: string }[]; note?: string; kvkLabel: string }) {
  const c = o.company;
  const details = [c.name, c.address, c.kvk ? `${o.kvkLabel} ${c.kvk}` : ""].filter(Boolean).map(esc).join("&nbsp;&middot; ");
  const contact = [c.email ? `<a href="mailto:${esc(c.email)}" style="color:${BRAND.muted};text-decoration:none">${esc(c.email)}</a>` : "", c.phone ? esc(c.phone) : ""].filter(Boolean).join("&nbsp;&middot; ");
  const links = o.links.map((l) => `<a href="${esc(l.href)}" style="color:${BRAND.ink2};text-decoration:underline;text-underline-offset:3px">${esc(l.label)}</a>`).join(`&nbsp;&nbsp;<span style="color:${BRAND.line}">|</span>&nbsp;&nbsp;`);
  const small = (html: string, margin = "0 0 6px") => `<p style="margin:${margin};font:400 12.5px/1.6 ${BRAND.text};color:${BRAND.muted}">${html}</p>`;
  return (
    rule() +
    row(
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td valign="middle"><a href="${esc(o.siteUrl)}" style="text-decoration:none"><img src="${esc(o.siteUrl)}/site/email/hopi-logo-ink.png" width="50" height="20" alt="HOPI" style="display:block;width:50px;height:20px;font:700 17px/20px ${BRAND.display};color:${BRAND.ink}"></a></td><td valign="middle" align="right" style="font:500 10.5px/1.4 ${BRAND.mono};letter-spacing:.12em;text-transform:uppercase;color:${BRAND.muted}">${esc(o.tagline)}</td></tr></table>` +
        `<div style="height:18px;line-height:18px;font-size:1px">&nbsp;</div>` +
        (details ? small(details) : "") +
        (contact ? small(contact) : "") +
        small(`<a href="${esc(o.siteUrl)}" style="color:${BRAND.muted};text-decoration:none">${esc(o.siteUrl.replace(/^https?:\/\//, ""))}</a>`, "0 0 16px") +
        small(linkify(o.reason, BRAND.ink2), "0 0 10px") +
        (o.note ? small(esc(o.note), "0 0 10px") : "") +
        small(links, "0"),
      { pad: `26px ${PAD}px 34px`, last: true },
    )
  );
}

/** A clearly marked banner above a test copy (sent only to the owner). */
export function testBanner(text: string) {
  return `<tr><td style="padding:0 0 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${BRAND.ink}" style="background:${BRAND.ink};border-radius:${BRAND.radius};padding:12px 16px;font:500 11px/1.5 ${BRAND.mono};letter-spacing:.08em;text-transform:uppercase;color:${BRAND.paper}"><span style="color:${BRAND.accent}">&#9679;</span>&nbsp;&nbsp;${esc(text)}</td></tr></table></td></tr>`;
}
