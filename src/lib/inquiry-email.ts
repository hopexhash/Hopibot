/**
 * The email someone gets after asking for a free design through the website, once the
 * owner has approved that design. Fixed text on purpose: it answers a request, so it is not
 * written by a model and says nothing that has not been checked.
 */
export const INQUIRY_SOURCE = "website_inquiry";

export function inquiryPreviewEmail(i: { contactName: string | null; company: string; previewUrl: string; senderName: string; agencyName: string }) {
  const first = (i.contactName ?? "").trim().split(/\s+/)[0] ?? "";
  const sender = i.senderName.trim() || i.agencyName.trim();
  const signature = sender === i.agencyName.trim() ? sender : `${sender}\n${i.agencyName.trim()}`;
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

/** Why the preview email cannot go out right now, in words for the owner; null when it can. */
export function inquirySendBlocker(i: { resendLive: boolean; agencyName: string; senderEmail: string; agencyAddress: string }): string | null {
  if (!i.resendLive) return "Email sending is not connected yet (Resend, under Integrations).";
  const missing = [!i.agencyName && "agency name", !i.senderEmail && "sender email", !i.agencyAddress && "agency address"].filter(Boolean);
  if (missing.length) return `Settings are incomplete (${missing.join(", ")}); every email must show who it is from.`;
  return null;
}
