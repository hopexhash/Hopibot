import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { SubNav } from "@/components/app/sidebar";
import { Card } from "@/components/ui";
import { designReadyEmail, writtenEmail, type Lang } from "@/lib/email/templates";
import { requireAuth } from "@/server/auth";
import { getOrgSettings } from "@/server/org";
import { emailContext } from "@/server/sales/email-html";
import { EmailFrames } from "./email-frames";

export const metadata = { title: "Email designs" };

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

/**
 * Every email HOPI sends, rendered with the company details from Settings and sample
 * customer data, on a desktop and a phone width. What you see here is exactly what the
 * templates produce; only the customer, the link and the screenshot are examples.
 */
export default async function EmailDesignsPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const auth = await requireAuth();
  const lang: Lang = (await searchParams).lang === "en" ? "en" : "nl";
  const s = await getOrgSettings(auth.org.id);
  const ctx = emailContext(s, lang);
  const x = SAMPLE[lang];
  const previewUrl = `${ctx.siteUrl}/d/${lang === "en" ? "jones-bakery" : "bakkerij-de-molen"}`;
  // In real emails this is the screenshot of the customer's own design (served as JPEG).
  const previewImage = `${ctx.siteUrl}/site/work/restaurant-d-720.webp`;
  const unsub = `${ctx.siteUrl}/u/voorbeeld`;

  const ready = designReadyEmail({ ctx, contactName: x.contact, company: x.business, previewUrl, previewImage, design: DESIGN, unsubscribeUrl: unsub });
  const emails = [
    { key: "ready", name: lang === "en" ? "Website concept ready (requested through the website)" : "Websiteconcept klaar (aangevraagd via de website)", when: "Sent when you approve the design of someone who asked for one through the contact form.", subject: ready.subject, html: ready.html },
    { key: "intro", name: lang === "en" ? "Website concept (first message)" : "Websiteconcept (eerste bericht)", when: "Outreach: written by the Sales agent for one business, sent only after your approval and the permission checks.", subject: x.subject.intro, html: writtenEmail({ ctx, kind: "intro", audience: "outreach", subject: x.subject.intro, paragraphs: x.intro, businessName: x.business, previewUrl, previewImage, design: DESIGN, unsubscribeUrl: unsub }) },
    { key: "follow", name: lang === "en" ? "Follow-up" : "Herinnering (follow-up)", when: "Sent once when there was no reply, if you approve it.", subject: x.subject.followUp, html: writtenEmail({ ctx, kind: "follow_up", audience: "outreach", subject: x.subject.followUp, paragraphs: x.followUp, businessName: x.business, previewUrl, previewImage, design: DESIGN, unsubscribeUrl: unsub }) },
    { key: "message", name: lang === "en" ? "Campaign message without a concept" : "Campagnebericht zonder concept", when: "Email campaigns: your own text, in the same design.", subject: x.subject.message, html: writtenEmail({ ctx, kind: "message", audience: "outreach", subject: x.subject.message, paragraphs: x.message, businessName: x.business, unsubscribeUrl: unsub }) },
    { key: "test", name: lang === "en" ? "Test copy (only to you)" : "Testversie (alleen naar jou)", when: "“Send test” in the Email Center: the real email with a banner, to your own address.", subject: `[TEST] ${ready.subject}`, html: designReadyEmail({ ctx, contactName: x.contact, company: x.business, previewUrl, previewImage, design: DESIGN, unsubscribeUrl: unsub, test: { to: "sanne@bakkerijdemolen.nl" } }).html },
  ];

  const checks = [
    { label: "Company name", ok: Boolean(s.agencyName), value: s.agencyName },
    { label: "Sender name (signature)", ok: Boolean(s.senderName), value: s.senderName || `not set: emails are signed “${ctx.senderName}”` },
    { label: "Sender email (required to send)", ok: Boolean(s.senderEmail), value: s.senderEmail || "not set: no email can be sent" },
    { label: "Business address (required in every email)", ok: Boolean(s.agencyAddress), value: s.agencyAddress || "not set" },
    { label: "KvK number", ok: Boolean(s.kvkNumber), value: s.kvkNumber || "not set (left out of the footer)" },
    { label: "Website", ok: Boolean(s.agencyWebsite), value: s.agencyWebsite || "not set" },
    { label: "Lowest package price", ok: Boolean(ctx.fromPrice), value: ctx.fromPrice ? `${ctx.fromPrice} excl. ${ctx.vat} VAT (from Settings → Pricing)` : "no fixed price: the price line is left out" },
  ];

  return (
    <>
      <SubNav section="/emails" />
      <PageHeader
        title="Email designs"
        description="Every email HOPI sends, exactly as the recipient sees it, on a computer and a phone. Your company details come from Settings; the customer, the link and the screenshot are examples."
        actions={
          <div className="flex gap-1 text-[13px]">
            {(["nl", "en"] as const).map((l) => (
              <Link key={l} href={l === "nl" ? "/emails/designs" : "/emails/designs?lang=en"} className={`rounded-md border px-2.5 py-1 ${lang === l ? "border-accent bg-accent-soft text-accent" : "border-border text-muted hover:text-fg"}`}>
                {l === "nl" ? "Nederlands" : "English"}
              </Link>
            ))}
          </div>
        }
      />
      <Section title="Sender details" description="What the footer and signature show. Missing details are left out of emails, never replaced by a placeholder; sending is blocked while a required one is missing.">
        <Card className="grid gap-2 p-4 text-[13px] sm:grid-cols-2">
          {checks.map((c) => (
            <p key={c.label} className="flex items-start gap-2">
              {c.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />}
              <span>
                <b className="font-medium">{c.label}:</b> <span className="text-muted">{c.value}</span>
              </span>
            </p>
          ))}
          <p className="text-muted sm:col-span-2">
            Change them under{" "}
            <Link href="/settings" className="text-accent hover:underline">
              Settings
            </Link>
            .
          </p>
        </Card>
      </Section>
      {emails.map((e) => (
        <Section key={e.key} title={e.name} description={e.when}>
          <EmailFrames subject={e.subject} html={e.html} />
        </Section>
      ))}
    </>
  );
}
