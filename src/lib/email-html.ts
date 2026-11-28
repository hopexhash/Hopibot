/**
 * Responsive HTML version of an outreach email (table layout, inline styles: works in
 * Gmail, Outlook and Apple Mail, light and dark). The plain-text version stays the
 * source of truth for wording; this adds the preview card, the buttons and the pricing line.
 */

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export type EmailHtmlInput = {
  lang: string;
  /** Message paragraphs (without the legal footer). URLs inside are linked automatically. */
  paragraphs: string[];
  /** Legal footer: sender identity, why they receive this, opt-out link. */
  footer: string;
  businessName: string;
  agencyName: string;
  demoUrl: string;
  unsubscribeUrl: string;
  design: { name: string; bg: string; ink: string; accent: string; onAccent: string; displayFont: string };
  /** Lowest package price in euros, shown as transparent "from" pricing. Null hides the line. */
  fromPriceEur: number | null;
  benefits: string[];
  /** Dutch with "je" instead of "u". */
  informal?: boolean;
};

const COPY = {
  nl: { view: "Bekijk uw nieuwe website", get: "Bestel deze website", customize: "Pas uw website aan", preview: "Uw websiteconcept", from: (p: number) => `Complete website vanaf €${p} eenmalig — alle prijzen staan op de demopagina.`, why: "Wat u krijgt", demo: "Ontwerpconcept — nog niet gepubliceerd" },
  /** Informal Dutch ("je"), for replies to people who asked through the website, which says "je" too. */
  je: { view: "Bekijk je nieuwe website", get: "Bestel deze website", customize: "Pas je website aan", preview: "Jouw websiteontwerp", from: (p: number) => `Complete website vanaf €${p} eenmalig — alle prijzen staan op de ontwerppagina.`, why: "Wat je krijgt", demo: "Ontwerp — nog niet gepubliceerd" },
  en: { view: "View Your New Website", get: "Get This Website", customize: "Customize Your Website", preview: "Your website concept", from: (p: number) => `Complete website from €${p} one-time — all prices are on the demo page.`, why: "What you get", demo: "Design concept — not published" },
};

export function renderEmailHtml(i: EmailHtmlInput): string {
  const t = i.lang === "nl" ? (i.informal ? COPY.je : COPY.nl) : COPY.en;
  const link = (text: string) => esc(text).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#1a1a1a;text-decoration:underline">$1</a>');
  const p = (text: string) => `<p style="margin:0 0 16px;font:16px/1.6 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2b2b2b">${link(text).replace(/\n/g, "<br>")}</p>`;
  const button = (label: string, href: string, primary: boolean) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px"><tr><td align="center" bgcolor="${primary ? i.design.accent : "#ffffff"}" style="border-radius:999px;border:1.5px solid ${primary ? i.design.accent : "#cfcfcf"}"><a href="${esc(href)}" style="display:inline-block;padding:14px 28px;font:600 16px/1 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${primary ? i.design.onAccent : "#1a1a1a"};text-decoration:none;border-radius:999px">${esc(label)}</a></td></tr></table>`;
  // The preview card is drawn in the colours of the prospect's own design (no remote image needed).
  const card = `<a href="${esc(i.demoUrl)}" style="text-decoration:none;display:block"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:14px;overflow:hidden;border:1px solid #e2e2e2"><tr><td bgcolor="#efefef" style="padding:9px 14px;font:11px/1 Arial,sans-serif;color:#8a8a8a;letter-spacing:.06em">&#9679; &#9679; &#9679; &nbsp; ${esc(t.preview)}</td></tr><tr><td bgcolor="${i.design.bg}" style="padding:44px 28px 40px"><p style="margin:0 0 10px;font:600 11px/1 Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:${i.design.accent}">${esc(t.demo)}</p><p style="margin:0;font:600 30px/1.15 ${esc(i.design.displayFont)},Georgia,serif;color:${i.design.ink}">${esc(i.businessName)}</p><p style="margin:20px 0 0"><span style="display:inline-block;padding:11px 20px;border-radius:999px;background:${i.design.accent};color:${i.design.onAccent};font:600 14px/1 Arial,sans-serif">${esc(t.view)} &rarr;</span></p></td></tr></table></a>`;
  const benefits = i.benefits.length
    ? `<p style="margin:26px 0 10px;font:600 12px/1 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#7a7a7a">${esc(t.why)}</p><table role="presentation" cellpadding="0" cellspacing="0" border="0">${i.benefits.slice(0, 5).map((b) => `<tr><td valign="top" style="padding:0 10px 8px 0;font:16px/1.4 Arial,sans-serif;color:${i.design.accent}">&#10003;</td><td style="padding:0 0 8px;font:15px/1.5 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2b2b2b">${esc(b)}</td></tr>`).join("")}</table>`
    : "";
  return `<!DOCTYPE html><html lang="${esc(i.lang)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(i.businessName)}</title></head><body style="margin:0;padding:0;background:#f4f3ef"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f3ef"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:18px"><tr><td style="padding:32px 28px 8px">${i.paragraphs.slice(0, 2).map(p).join("")}</td></tr><tr><td style="padding:4px 28px 8px">${card}</td></tr><tr><td style="padding:20px 28px 0">${i.paragraphs.slice(2).map(p).join("")}${benefits}${i.fromPriceEur !== null ? `<p style="margin:22px 0 18px;padding:14px 16px;background:#f6f5f1;border-radius:12px;font:15px/1.5 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#2b2b2b">${esc(t.from(i.fromPriceEur))}</p>` : ""}</td></tr><tr><td style="padding:6px 28px 26px">${button(t.view, i.demoUrl, true)}${button(t.get, `${i.demoUrl}#order`, false)}${button(t.customize, `${i.demoUrl}#pricing`, false)}</td></tr><tr><td style="padding:20px 28px 28px;border-top:1px solid #ececec"><p style="margin:0;font:12.5px/1.6 -apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#7a7a7a">${link(i.footer.replace(/^\s*--\s*/, "")).replace(/\n/g, "<br>")}</p></td></tr></table></td></tr></table></body></html>`;
}
