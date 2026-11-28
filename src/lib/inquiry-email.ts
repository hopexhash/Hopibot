/**
 * The email someone gets after asking for a free design through the website, once the
 * owner has approved that design. Fixed text on purpose: it answers a request, so it is not
 * written by a model and says nothing that has not been checked.
 */
export const INQUIRY_SOURCE = "website_inquiry";

export function inquiryPreviewEmail(i: { contactName: string | null; company: string; previewUrl: string; senderName: string; agencyName: string; lang?: "nl" | "en" }) {
  const first = (i.contactName ?? "").trim().split(/\s+/)[0] ?? "";
  const sender = i.senderName.trim() || i.agencyName.trim();
  const signature = sender === i.agencyName.trim() ? sender : `${sender}\n${i.agencyName.trim()}`;
  if (i.lang === "en") {
    return {
      subject: `Your website design for ${i.company} is ready`,
      body: [
        first ? `Hi ${first},` : "Hi,",
        "",
        `Thank you for your request through our website. The design for ${i.company} is ready. You can view it here:`,
        "",
        i.previewUrl,
        "",
        "It is a first design: we adjust the copy, colours and photos together with you. Like it? Then choose a package on the same page, or reply to this email with your questions and wishes. If you don't like it, you are not committed to anything.",
        "",
        "Kind regards,",
        signature,
      ].join("\n"),
    };
  }
  return {
    subject: `Je websiteontwerp voor ${i.company} staat klaar`,
    body: [
      first ? `Hoi ${first},` : "Hoi,",
      "",
      `Bedankt voor je aanvraag via onze website. Het ontwerp voor ${i.company} staat klaar. Je bekijkt het hier:`,
      "",
      i.previewUrl,
      "",
      "Het is een eerste ontwerp: teksten, kleuren en foto's passen we samen met je aan. Bevalt het? Dan kies je op dezelfde pagina een pakket, of je beantwoordt deze e-mail met je vragen en wensen. Bevalt het niet, dan zit je nergens aan vast.",
      "",
      "Groet,",
      signature,
    ].join("\n"),
  };
}

/**
 * Footer of the reply to a website enquiry: who it is from and why they get it (they asked
 * for it), with an opt-out. Not the footer of unsolicited outreach: that one says the
 * details were public, which is not true here.
 */
export function inquiryFooter(lang: "nl" | "en", s: { agencyName: string; senderName: string; agencyAddress: string; kvkNumber: string; agencyWebsite: string }, unsubscribeUrl: string) {
  const id = [s.agencyName, s.agencyAddress, s.kvkNumber ? `KvK ${s.kvkNumber}` : null, s.agencyWebsite].filter(Boolean).join(" · ");
  return lang === "en"
    ? `\n\n--\n${s.senderName || s.agencyName}\n${id}\n\nYou are receiving this email because you requested a free website design through our website. Don't want any more emails from us? Unsubscribe: ${unsubscribeUrl}\nThe design is a concept and has not been published.`
    : `\n\n--\n${s.senderName || s.agencyName}\n${id}\n\nJe ontvangt deze e-mail omdat je via onze website een gratis websiteontwerp hebt aangevraagd. Wil je geen e-mails meer van ons? Meld je af: ${unsubscribeUrl}\nHet ontwerp is een concept en nog niet gepubliceerd.`;
}

/** Why the preview email cannot go out right now, in words for the owner; null when it can. */
export function inquirySendBlocker(i: { resendLive: boolean; agencyName: string; senderEmail: string; agencyAddress: string }): string | null {
  if (!i.resendLive) return "Email sending is not connected yet (Resend, under Integrations).";
  const missing = [!i.agencyName && "agency name", !i.senderEmail && "sender email", !i.agencyAddress && "agency address"].filter(Boolean);
  if (missing.length) return `Settings are incomplete (${missing.join(", ")}); every email must show who it is from.`;
  return null;
}
