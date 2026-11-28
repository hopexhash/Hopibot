/**
 * Sample emails for the Email designs page and for test sends: every template, filled with
 * an example customer and the real company details of the workspace.
 */
import { designReadyEmail, textFooter, writtenEmail, type EmailContext, type Lang } from "./templates";

/** Sample texts in the voice the agents and templates use (Dutch "je", English mirrors it). */
const SAMPLE = {
  nl: {
    contact: "Sanne de Vries",
    business: "Bakkerij De Molen",
    intro: ["Hoi,", "Ik kwam Bakkerij De Molen tegen en zag een kans om je bedrijf online sterker neer te zetten. Daarom heb ik, zonder dat je erom vroeg, een websiteconcept voor je gemaakt. Zo zie je meteen hoe een moderne website voor jouw bedrijf eruit kan zien.", "Op je telefoon zie je in één oogopslag je openingstijden en je assortiment, en met één tik bel je de winkel.", "Bevalt het ontwerp? Dan bespreken we graag of we er je officiële website van maken.", "Groet,"],
    followUp: ["Hoi,", "Ik wilde even nagaan of je het websiteconcept voor Bakkerij De Molen al hebt kunnen bekijken.", "Groet,"],
    message: ["Hoi,", "Fijn dat je eerder interesse toonde in een nieuwe website. Heb je nog vragen over de pakketten of de planning? Beantwoord deze e-mail gerust, dan bellen we je terug.", "Groet,"],
    subject: { intro: "Een websiteconcept voor Bakkerij De Molen", followUp: "Nog even over het websiteconcept voor Bakkerij De Molen", message: "Je vragen over een nieuwe website" },
  },
  en: {
    contact: "Sam Jones",
    business: "Jones Bakery",
    intro: ["Hi,", "I came across Jones Bakery and saw a chance to present your business more strongly online. So, without you asking, I made a website concept for you. That way you can see right away what a modern website for your business could look like.", "On a phone your opening hours and products are clear at a glance, and one tap calls the shop.", "Like the design? Then we would be happy to discuss turning it into your official website.", "Kind regards,"],
    followUp: ["Hi,", "Just checking whether you have had a chance to look at the website concept for Jones Bakery.", "Kind regards,"],
    message: ["Hi,", "Thanks for your earlier interest in a new website. Any questions about the packages or the timeline? Just reply to this email and we will call you back.", "Kind regards,"],
    subject: { intro: "A website concept for Jones Bakery", followUp: "A quick follow-up on the website concept for Jones Bakery", message: "Your questions about a new website" },
  },
};

const DESIGN = { bg: "#16110d", ink: "#efe6d6", accent: "#c9a36b", displayFont: "'Cormorant Garamond',Georgia,serif" };

export type SampleEmail = { key: string; name: string; when: string; subject: string; html: string; text: string };

export function sampleEmails(ctx: EmailContext, lang: Lang, test?: { to: string }): SampleEmail[] {
  const x = SAMPLE[lang];
  const previewUrl = `${ctx.siteUrl}/d/${lang === "en" ? "jones-bakery" : "bakkerij-de-molen"}`;
  // In real emails this is the screenshot of the customer's own design (served as JPEG).
  const previewImage = `${ctx.siteUrl}/site/work/restaurant-d-720.webp`;
  const unsub = `${ctx.siteUrl}/u/voorbeeld`;

  const ready = designReadyEmail({ ctx, contactName: x.contact, company: x.business, previewUrl, previewImage, design: DESIGN, unsubscribeUrl: unsub, test });
  const txt = (paragraphs: string[]) => paragraphs.join("\n\n") + textFooter(ctx, "outreach", unsub);
  const common = { ctx, audience: "outreach" as const, businessName: x.business, unsubscribeUrl: unsub, test };
  const emails: SampleEmail[] = [
    { key: "ready", name: lang === "en" ? "Website concept ready (requested through the website)" : "Websiteconcept klaar (aangevraagd via de website)", when: "Sent when you approve the design of someone who asked for one through the contact form.", subject: ready.subject, html: ready.html, text: ready.text },
    { key: "intro", name: lang === "en" ? "Website concept (first message)" : "Websiteconcept (eerste bericht)", when: "Outreach: written by the Sales agent for one business, sent only after your approval and the permission checks.", subject: x.subject.intro, html: writtenEmail({ ...common, kind: "intro", subject: x.subject.intro, paragraphs: x.intro, previewUrl, previewImage, design: DESIGN }), text: txt(x.intro) },
    { key: "follow", name: lang === "en" ? "Follow-up" : "Herinnering (follow-up)", when: "Sent once when there was no reply, if you approve it.", subject: x.subject.followUp, html: writtenEmail({ ...common, kind: "follow_up", subject: x.subject.followUp, paragraphs: x.followUp, previewUrl, previewImage, design: DESIGN }), text: txt(x.followUp) },
    { key: "message", name: lang === "en" ? "Campaign message without a concept" : "Campagnebericht zonder concept", when: "Email campaigns: your own text, in the same design.", subject: x.subject.message, html: writtenEmail({ ...common, kind: "message", subject: x.subject.message, paragraphs: x.message }), text: txt(x.message) },
  ];
  if (!test) {
    const t = designReadyEmail({ ctx, contactName: x.contact, company: x.business, previewUrl, previewImage, design: DESIGN, unsubscribeUrl: unsub, test: { to: "sanne@bakkerijdemolen.nl" } });
    emails.push({ key: "test", name: lang === "en" ? "Test copy (only to you)" : "Testversie (alleen naar jou)", when: "“Send test” in the Email Center: the real email with a banner, to your own address.", subject: `[TEST] ${t.subject}`, html: t.html, text: t.text });
  }
  return emails;
}
