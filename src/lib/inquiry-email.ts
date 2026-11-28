/**
 * Website enquiries: someone asked for a free design through the website. The email they
 * get once the owner has approved that design is designReadyEmail() in
 * src/lib/email/templates.ts: fixed text on purpose (it answers a request, so it is not
 * written by a model and says nothing that has not been checked).
 */
export const INQUIRY_SOURCE = "website_inquiry";

/** Why the preview email cannot go out right now, in words for the owner; null when it can. */
export function inquirySendBlocker(i: { resendLive: boolean; agencyName: string; senderEmail: string; agencyAddress: string }): string | null {
  if (!i.resendLive) return "Email sending is not connected yet (Resend, under Integrations).";
  const missing = [!i.agencyName && "agency name", !i.senderEmail && "sender email", !i.agencyAddress && "agency address"].filter(Boolean);
  if (missing.length) return `Settings are incomplete (${missing.join(", ")}); every email must show who it is from.`;
  return null;
}
