import { AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageHeader, Section } from "@/components/app/page";
import { SubNav } from "@/components/app/sidebar";
import { Card } from "@/components/ui";
import { sampleEmails } from "@/lib/email/samples";
import type { Lang } from "@/lib/email/templates";
import { requireAuth } from "@/server/auth";
import { getOrgSettings } from "@/server/org";
import { emailContext } from "@/server/sales/email-html";
import { testRecipients } from "@/server/sales/test-recipients";
import { EmailFrames } from "./email-frames";

export const metadata = { title: "Email designs" };

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
  const emails = sampleEmails(ctx, lang);
  const recipients = await testRecipients(auth.org.id);
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
              <Link key={l} href={l === "nl" ? "/emails/designs" : "/emails/designs?lang=en"} className={`rounded-md border px-2.5 py-1 ${lang === l ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-fg"}`}>
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
          <EmailFrames subject={e.subject} html={e.html} test={e.key === "test" || !recipients.length ? undefined : { key: e.key, lang, recipients }} />
        </Section>
      ))}
    </>
  );
}
