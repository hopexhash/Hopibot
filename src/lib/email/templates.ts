/**
 * Every email HOPI sends, built from the components in kit.ts. Dutch uses "je" throughout,
 * like the website; English mirrors it. Amounts come from the price catalogue (never
 * written here) and company details from Settings (missing details are left out, never
 * replaced by a placeholder).
 *
 * The plain-text version stays the source of truth for the words of outreach emails (it is
 * what the owner approves); these functions add the HTML around it. The "design ready"
 * email for someone who asked through the website is fixed text and is built here in both
 * versions.
 */
import { BRAND, buttons, featureList, footer, header, heading, layout, paragraph, pricing, process, prose, row, rule, signature, space, testBanner, websitePreview, type Company } from "./kit";

export type Lang = "nl" | "en";

export type EmailContext = {
  lang: Lang;
  siteUrl: string;
  company: Company;
  /** Who signs: the sender's name, or the agency name. */
  senderName: string;
  /** Where replies and "I want changes" go. */
  replyTo: string;
  /** Lowest one-off package price, formatted (e.g. "€ 299"), or null when there is none. */
  fromPrice: string | null;
  /** VAT percentage, e.g. "21%". */
  vat: string;
};

type Design = { bg: string; ink: string; accent: string; displayFont: string };

export type Built = { subject: string; preheader: string; text: string; html: string };

const T = {
  nl: {
    conceptLabel: "Websiteconcept",
    viewConcept: "Bekijk je websiteconcept",
    viewCaption: "Bekijk het ontwerp",
    order: "Ik wil deze website bestellen",
    changes: "Ik wil aanpassingen doorgeven",
    pricesAndOrder: "Bekijk pakketten en prijzen",
    priceLabel: "Prijs",
    price: (from: string, vat: string) => `Een complete website kost vanaf ${from} eenmalig, exclusief ${vat} btw. Alle pakketten en prijzen staan bij je ontwerp.`,
    tagline: "Webdesign · Nederland & België",
    kvk: "KvK",
    privacy: "Privacy",
    unsubscribe: "Afmelden",
    website: "Website",
    role: "Webdesign",
    closing: "Groet,",
    processLabel: "Zo werkt het",
    steps: [
      { title: "Je bekijkt het ontwerp", text: "Gratis en vrijblijvend, op je eigen telefoon of computer." },
      { title: "We maken het samen af", text: "Teksten, foto's en details stemmen we met je af." },
      { title: "Je website gaat live", text: "Op je eigen domein. Wij regelen hosting en onderhoud." },
    ],
    reasonRequest: "Je ontvangt deze e-mail omdat je via onze website een gratis websiteontwerp hebt aangevraagd. Wil je geen e-mails meer van ons? Meld je af via de link hieronder.",
    reasonOutreach: "Je ontvangt dit eenmalige bericht omdat de contactgegevens van je bedrijf openbaar vermeld staan. Wil je geen berichten meer van ons ontvangen? Meld je direct af via de link hieronder.",
    demoNote: "Het websiteconcept is een demonstratie en niet gepubliceerd als je officiële website.",
    designNote: "Het ontwerp is een concept en nog niet gepubliceerd.",
    test: (to: string) => `Testversie, alleen naar jou verstuurd. Echte ontvanger: ${to}. De afmeldlink werkt hier niet.`,
  },
  en: {
    conceptLabel: "Website concept",
    viewConcept: "View your website concept",
    viewCaption: "View the design",
    order: "I want to order this website",
    changes: "I want to request changes",
    pricesAndOrder: "View packages and prices",
    priceLabel: "Price",
    price: (from: string, vat: string) => `A complete website costs from ${from} one-off, excluding ${vat} VAT. All packages and prices are listed with your design.`,
    tagline: "Web design · Netherlands & Belgium",
    kvk: "Chamber of Commerce (KvK)",
    privacy: "Privacy",
    unsubscribe: "Unsubscribe",
    website: "Website",
    role: "Web design",
    closing: "Kind regards,",
    processLabel: "How it works",
    steps: [
      { title: "You view the design", text: "Free and without obligation, on your own phone or computer." },
      { title: "We finish it together", text: "We fine-tune the copy, photos and details with you." },
      { title: "Your website goes live", text: "On your own domain. We take care of hosting and maintenance." },
    ],
    reasonRequest: "You are receiving this email because you requested a free website design through our website. Don't want any more emails from us? Unsubscribe with the link below.",
    reasonOutreach: "You are receiving this one-off message because your business contact details are publicly listed. To stop receiving messages from us, unsubscribe instantly with the link below.",
    demoNote: "The website concept is a demonstration and has not been published as your official website.",
    designNote: "The design is a concept and has not been published.",
    test: (to: string) => `Test copy, sent only to you. Real recipient: ${to}. The unsubscribe link does not work here.`,
  },
};

const domainOf = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
const firstName = (name: string | null) => (name ?? "").trim().split(/\s+/)[0] ?? "";

function footerFor(ctx: EmailContext, kind: "request" | "outreach", unsubscribeUrl: string, concept = true) {
  const t = T[ctx.lang];
  return footer({
    siteUrl: ctx.siteUrl,
    company: ctx.company,
    tagline: t.tagline,
    kvkLabel: t.kvk,
    reason: kind === "request" ? t.reasonRequest : t.reasonOutreach,
    // The note about the concept only where there is one.
    note: concept ? (kind === "request" ? t.designNote : t.demoNote) : undefined,
    links: [
      { label: t.website, href: ctx.siteUrl },
      { label: t.privacy, href: `${ctx.siteUrl}${ctx.lang === "en" ? "/en/privacy" : "/privacy"}` },
      { label: t.unsubscribe, href: unsubscribeUrl },
    ],
  });
}

/** Plain-text footer matching the HTML one (only details that are filled in). */
export function textFooter(ctx: EmailContext, kind: "request" | "outreach", unsubscribeUrl: string) {
  const t = T[ctx.lang];
  const c = ctx.company;
  const id = [c.name, c.address, c.kvk ? `${t.kvk} ${c.kvk}` : "", c.website].filter(Boolean).join(" · ");
  const reason = (kind === "request" ? t.reasonRequest : t.reasonOutreach).replace(/ (via de|with the) link (hieronder|below)\./, ":");
  const who = ctx.senderName === c.name ? "" : `${ctx.senderName}\n`;
  return `\n\n--\n${who}${id}\n\n${reason} ${unsubscribeUrl}\n${kind === "request" ? t.designNote : t.demoNote}`;
}

/**
 * "Your website concept is ready": the reply to someone who asked for a free design through
 * the website, sent once the owner has approved the design.
 */
export function designReadyEmail(o: {
  ctx: EmailContext;
  contactName: string | null;
  company: string;
  previewUrl: string;
  previewImage?: string | null;
  design?: Design;
  unsubscribeUrl: string;
  test?: { to: string };
}): Built {
  const { ctx } = o;
  const t = T[ctx.lang];
  const nl = ctx.lang === "nl";
  const first = firstName(o.contactName);
  const greeting = nl ? (first ? `Hoi ${first},` : "Hoi,") : first ? `Hi ${first},` : "Hi,";
  const subject = nl ? `Je websiteconcept voor ${o.company} is klaar` : `Your website concept for ${o.company} is ready`;
  const preheader = nl ? `Bekijk het ontwerp voor ${o.company} op je telefoon of computer. Gratis en vrijblijvend.` : `View the design for ${o.company} on your phone or computer. Free and without obligation.`;
  const title = nl ? "Je websiteconcept is *klaar*." : "Your website concept is *ready*.";
  const intro = nl
    ? `Bedankt voor je aanvraag. We hebben een eerste ontwerp gemaakt voor ${o.company}, met je eigen naam en diensten. Je bekijkt het op je telefoon of computer.`
    : `Thank you for your request. We have made a first design for ${o.company}, with your own name and services. You can view it on your phone or computer.`;
  const explain = nl
    ? "Dit is een eerste ontwerp. Teksten, foto's en kleuren passen we samen met je aan, tot alles klopt. Je zit nergens aan vast: pas als je tevreden bent, kies je een pakket."
    : "This is a first design. We adjust the copy, photos and colours together with you until everything is right. You are not committed to anything: you only choose a package once you are happy.";
  const reply = nl ? "Heb je een vraag of bel je liever even? Beantwoord deze e-mail, dan reageren we persoonlijk." : "Have a question, or would you rather talk it through? Reply to this email and we will get back to you personally.";
  const changesHref = `mailto:${ctx.replyTo}?subject=${encodeURIComponent(nl ? `Aanpassingen voor ${o.company}` : `Changes for ${o.company}`)}`;
  const orderHref = `${o.previewUrl}#order`;

  const body = [
    o.test ? testBanner(t.test(o.test.to)) : "",
    header({ siteUrl: ctx.siteUrl, label: t.conceptLabel }),
    row(`${paragraph(greeting, { margin: "0 0 22px" })}${heading(title)}${paragraph(intro)}`, { pad: `34px 40px 10px` }),
    row(websitePreview({ href: `${o.previewUrl}#preview`, image: o.previewImage, imageAlt: nl ? `Voorbeeld van het websiteconcept voor ${o.company}` : `Preview of the website concept for ${o.company}`, label: t.conceptLabel, businessName: o.company, domain: domainOf(o.previewUrl), caption: t.viewCaption, design: o.design }), { pad: "14px 40px 22px" }),
    row(buttons([{ label: t.viewConcept, href: `${o.previewUrl}#preview`, kind: "primary" }]), { pad: "0 40px 14px" }),
    row(`${paragraph(explain)}${ctx.fromPrice ? `<div style="height:6px;line-height:6px;font-size:1px">&nbsp;</div>${pricing({ label: t.priceLabel, text: t.price(ctx.fromPrice, ctx.vat) })}<div style="height:22px;line-height:22px;font-size:1px">&nbsp;</div>` : ""}`, { pad: "10px 40px 4px" }),
    row(buttons([{ label: t.order, href: orderHref, kind: "dark" }, { label: t.changes, href: changesHref, kind: "secondary" }]), { pad: "4px 40px 12px" }),
    row(`${paragraph(reply)}${signature({ closing: t.closing, name: ctx.senderName, role: ctx.senderName === ctx.company.name ? undefined : `${ctx.company.name} · ${t.role}` })}`, { pad: "10px 40px 34px" }),
    row(process({ label: t.processLabel, steps: t.steps }), { tone: "ink", pad: "30px 40px 32px" }),
    footerFor(ctx, "request", o.unsubscribeUrl),
  ].join("");

  const text = [
    greeting,
    "",
    nl ? "Je websiteconcept is klaar." : "Your website concept is ready.",
    "",
    intro,
    "",
    `${t.viewConcept}: ${o.previewUrl}`,
    "",
    explain,
    ...(ctx.fromPrice ? ["", t.price(ctx.fromPrice, ctx.vat)] : []),
    "",
    `${t.order}: ${orderHref}`,
    `${t.changes}: ${nl ? "beantwoord deze e-mail" : "reply to this email"}`,
    "",
    reply,
    "",
    t.closing,
    ctx.senderName,
  ].join("\n") + textFooter(ctx, "request", o.unsubscribeUrl);

  return { subject, preheader, text, html: layout({ lang: ctx.lang, title: subject, preheader, body }) };
}

/** Splits the closing ("Groet,", "Kind regards,") off the end of a written body, if there is one. */
function splitClosing(paragraphs: string[]) {
  const last = paragraphs.at(-1) ?? "";
  if (/^(groet|met vriendelijke groet|vriendelijke groet|hartelijke groet|kind regards|best regards|regards|best),?$/i.test(last.trim())) return { body: paragraphs.slice(0, -1), closing: last.trim() };
  return { body: paragraphs, closing: null };
}

/**
 * An email whose words were written for one business (outreach intro, follow-up or a
 * campaign message), with the website concept when there is one.
 */
export function writtenEmail(o: {
  ctx: EmailContext;
  kind: "intro" | "follow_up" | "message";
  audience: "request" | "outreach";
  subject: string;
  paragraphs: string[];
  businessName: string;
  previewUrl?: string | null;
  previewImage?: string | null;
  design?: Design;
  unsubscribeUrl: string;
  test?: { to: string };
}): string {
  const { ctx } = o;
  const t = T[ctx.lang];
  const nl = ctx.lang === "nl";
  // The link is carried by the preview and the buttons, so a bare address line is dropped from the prose.
  // A line that is only the preview address goes, and so does the sentence that only
  // introduced it ("Je bekijkt het concept hier:"): the preview and its button replace both.
  const clean = o.paragraphs
    .map((p) =>
      p
        .split("\n")
        .filter((line) => !(o.previewUrl && line.trim() === o.previewUrl) && !/^https?:\/\/\S+$/.test(line.trim()))
        .join("\n")
        .trim(),
    )
    .filter((p) => p && !(o.previewUrl && /:$/.test(p) && p.length < 90));
  const { body, closing } = splitClosing(clean);
  const [greet, ...rest] = /^(hoi|hallo|beste|hello|hi|dear)\b/i.test(body[0] ?? "") ? body : ["", ...body];
  const lead = rest.slice(0, 1);
  const after = rest.slice(1);
  const title =
    o.kind === "intro" ? (nl ? `Een websiteconcept voor *${o.businessName}*` : `A website concept for *${o.businessName}*`) : o.kind === "follow_up" ? (nl ? "Nog even over je *websiteconcept*" : "A quick follow-up on your *website concept*") : "";
  const preheader = (lead[0] ?? o.subject).slice(0, 140);
  const preview = o.previewUrl
    ? row(websitePreview({ href: `${o.previewUrl}#preview`, image: o.previewImage, imageAlt: nl ? `Voorbeeld van het websiteconcept voor ${o.businessName}` : `Preview of the website concept for ${o.businessName}`, label: t.conceptLabel, businessName: o.businessName, domain: domainOf(o.previewUrl), caption: t.viewCaption, design: o.design }), { pad: "8px 40px 22px" }) +
      row(buttons([{ label: t.viewConcept, href: `${o.previewUrl}#preview`, kind: "primary" }, { label: t.pricesAndOrder, href: `${o.previewUrl}#order`, kind: "secondary" }]), { pad: "0 40px 14px" })
    : "";
  const html = [
    o.test ? testBanner(t.test(o.test.to)) : "",
    header({ siteUrl: ctx.siteUrl, label: o.previewUrl ? t.conceptLabel : undefined }),
    row(`${greet ? paragraph(greet, { margin: "0 0 22px" }) : ""}${title ? heading(title) : ""}${prose(lead)}`, { pad: "34px 40px 6px" }),
    preview,
    after.length || closing ? row(`${prose(after)}${o.kind !== "message" && o.previewUrl && ctx.fromPrice ? `${pricing({ label: t.priceLabel, text: t.price(ctx.fromPrice, ctx.vat) })}<div style="height:20px;line-height:20px;font-size:1px">&nbsp;</div>` : ""}${signature({ closing: closing ?? t.closing, name: ctx.senderName, role: ctx.senderName === ctx.company.name ? undefined : `${ctx.company.name} · ${t.role}` })}`, { pad: "10px 40px 34px" }) : row(signature({ closing: t.closing, name: ctx.senderName }), { pad: "10px 40px 34px" }),
    footerFor(ctx, o.audience, o.unsubscribeUrl, Boolean(o.previewUrl)),
  ].join("");
  return layout({ lang: ctx.lang, title: o.subject, preheader, body: html });
}

/** For the preview page: the three building blocks shown on their own. */
export const parts = { featureList, rule, space, BRAND };
