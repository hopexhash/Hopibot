import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, HeroAmbient, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

const PATH = "/contact";
const CRUMBS = [{ name: "Contact", path: PATH }];
const DESCRIPTION = "Neem contact op met HOPI. Vraag een gratis ontwerp van je nieuwe website aan, of stel je vraag over een website voor je bedrijf.";

export const generateMetadata = () =>
  seoMeta({
    title: "Contact: vraag je gratis ontwerp aan | HOPI",
    description: DESCRIPTION,
    path: PATH,
  });

/** Contact: the request form plus every way to reach HOPI that is filled in under Settings. */
export default async function ContactPage() {
  const data = await getSiteData();
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero simple">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={CRUMBS} />
            <span className="eyebrow enter">Contact</span>
            <h1 className="enter">
              Contact met <em>HOPI</em>
            </h1>
            <p className="lead enter">
              Vertel kort over je bedrijf en wat je zoekt. We maken een gratis ontwerp van je nieuwe website en nemen contact met je op. Je zit nergens aan vast: je beslist pas als je het ontwerp hebt
              gezien.
            </p>
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
                      Stuur ons een WhatsApp
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
              <h2>Wat er gebeurt nadat je het formulier verstuurt</h2>
              <p>
                We lezen je aanvraag, kijken naar je bedrijf en je huidige website als je die hebt, en maken een eerste ontwerp. Dat sturen we je toe, met de pakketten die erbij passen. Wil je eerst
                weten wat een website kost? Kijk bij de <Link href="/prijzen">prijzen</Link>. Wil je eerst zien wat we maken? Klik door <Link href="/werk">ons werk</Link>.
              </p>
            </div>
          </div>
        </section>
        <ContactSection data={data} source={PATH} />
      </main>
      <SiteFooter data={data} />
      <JsonLd
        data={breadcrumbLd(CRUMBS, {
          type: "ContactPage",
          description: DESCRIPTION,
        })}
      />
    </>
  );
}
