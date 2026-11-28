import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, HeroAmbient, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import type { Locale } from "@/lib/site/i18n";
import { breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

const PATH = { nl: "/contact", en: "/en/contact" };

const T = {
  nl: {
    title: "Contact: vraag je gratis ontwerp aan | HOPI",
    description: "Neem contact op met HOPI. Vraag een gratis ontwerp van je nieuwe website aan, of stel je vraag over een website voor je bedrijf.",
    crumb: "Contact",
    eyebrow: "Contact",
    h1: ["Contact met ", "HOPI"],
    lead: "Vertel kort over je bedrijf en wat je zoekt. We maken een gratis ontwerp van je nieuwe website en nemen contact met je op. Je zit nergens aan vast: je beslist pas als je het ontwerp hebt gezien.",
    whatsapp: "Stuur ons een WhatsApp",
    afterH: "Wat er gebeurt nadat je het formulier verstuurt",
    after: [
      "We lezen je aanvraag, kijken naar je bedrijf en je huidige website als je die hebt, en maken een eerste ontwerp. Dat sturen we je toe, met de pakketten die erbij passen. Wil je eerst weten wat een website kost? Kijk bij de ",
      "prijzen",
      ". Wil je eerst zien wat we maken? Klik door ",
      "ons werk",
      ".",
    ],
    pricing: "/prijzen",
    work: "/werk",
  },
  en: {
    title: "Contact: request your free design | HOPI",
    description: "Get in touch with HOPI. Request a free design of your new website, or ask your question about a website for your business.",
    crumb: "Contact",
    eyebrow: "Contact",
    h1: ["Contact ", "HOPI"],
    lead: "Tell us briefly about your business and what you are looking for. We make a free design of your new website and get in touch with you. You are not tied to anything: you only decide once you have seen the design.",
    whatsapp: "Send us a WhatsApp message",
    afterH: "What happens after you send the form",
    after: [
      "We read your request, look at your business and your current website if you have one, and make a first design. We send it to you, along with the packages that suit it. Want to know first what a website costs? Have a look at the ",
      "pricing",
      ". Want to see what we make first? Browse ",
      "our work",
      ".",
    ],
    pricing: "/en/pricing",
    work: "/en/work",
  },
};

export function contactMetadata(lang: Locale) {
  const t = T[lang];
  return seoMeta({ title: t.title, description: t.description, path: PATH[lang] });
}

/** Contact: the request form plus every way to reach HOPI that is filled in under Settings. */
export async function ContactPage({ lang }: { lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const path = PATH[lang];
  const crumbs = [{ name: t.crumb, path }];
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero simple">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={crumbs} lang={lang} />
            <span className="eyebrow enter">{t.eyebrow}</span>
            <h1 className="enter">
              {t.h1[0]}
              <em>{t.h1[1]}</em>
            </h1>
            <p className="lead enter">{t.lead}</p>
            {(data.email || data.phone || data.whatsapp) && (
              <ul className="ticks enter">
                {data.email && (
                  <li>
                    <Mail aria-hidden="true" /> <a href={`mailto:${data.email}`}>{data.email}</a>
                  </li>
                )}
                {data.phone && (
                  <li>
                    <Phone aria-hidden="true" /> <a href={`tel:${data.phone.replace(/[^\d+]/g, "")}`}>{data.phone}</a>
                  </li>
                )}
                {data.whatsapp && (
                  <li>
                    <a href={data.whatsapp} target="_blank" rel="noopener noreferrer">
                      {t.whatsapp}
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        </section>
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head" data-reveal>
              <h2>{t.afterH}</h2>
              <p>
                {t.after[0]}
                <Link href={t.pricing}>{t.after[1]}</Link>
                {t.after[2]}
                <Link href={t.work}>{t.after[3]}</Link>
                {t.after[4]}
              </p>
            </div>
          </div>
        </section>
        <ContactSection data={data} source={path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd
        data={breadcrumbLd(crumbs, {
          type: "ContactPage",
          description: t.description,
        })}
      />
    </>
  );
}
