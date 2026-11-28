import Link from "next/link";
import { ContactLine, identity, LegalPage } from "@/components/site/legal-page";
import type { Locale } from "@/lib/site/i18n";
import { seoMeta } from "@/lib/site/seo-meta";

const PATH = { nl: "/privacy", en: "/en/privacy" };

export function privacyMetadata(lang: Locale) {
  return lang === "en"
    ? seoMeta({ title: "Privacy statement | HOPI", description: "Which personal data HOPI processes when you fill in the contact form, what we use it for, how long we keep it and what rights you have.", path: PATH.en })
    : seoMeta({ title: "Privacyverklaring | HOPI", description: "Welke persoonsgegevens HOPI verwerkt als je het contactformulier invult, waarvoor we ze gebruiken, hoe lang we ze bewaren en welke rechten je hebt.", path: PATH.nl });
}

export function PrivacyPage({ lang }: { lang: Locale }) {
  if (lang === "en")
    return (
      <LegalPage title="Privacy statement" path={PATH.en} updated="2026-11-26" lang="en">
        {(d) => (
          <>
            <p>{identity(d, "en")} is responsible for processing the personal data you share with us through this website.</p>

            <h2>What data</h2>
            <p>When you fill in the contact form, we receive your name, company name and email address and, if you fill them in, your phone number, town, current website and your message. We also record which page you sent the form from.</p>

            {d.whatsapp && <p>If you send us a message via WhatsApp, we receive your phone number, your profile name and your message. WhatsApp is a service of Meta; the terms and privacy policy of WhatsApp also apply to its use.</p>}

            <h2>What for</h2>
            <p>We only use this data to answer your request, make a design for your website and make you an offer. We do not sell your data to others.</p>

            <h2>Legal basis and retention period</h2>
            <p>We process your data because you ask us to (steps prior to a possible agreement) and with your consent. We do not keep it longer than necessary for that purpose, or for as long as the law requires if you become a client.</p>

            <h2>Who helps us</h2>
            <p>To host this website and store data, we use carefully chosen service providers. They may only use your data to provide that service to us.</p>

            <h2>Cookies and statistics</h2>
            <p>
              This website does not place tracking or advertising cookies without your consent. We do measure anonymously how fast the pages load, without a cookie and without an IP address or any other identifier. You can read what we do and do not use on the page about <Link href="/en/cookies">cookies</Link>.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us to see, correct or delete your data, and you can withdraw your consent at any time. <ContactLine data={d} lang="en" /> If you do not agree with how we handle your data, you can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
            </p>
          </>
        )}
      </LegalPage>
    );
  return (
    <LegalPage title="Privacyverklaring" path={PATH.nl} updated="2026-11-26">
      {(d) => (
        <>
          <p>{identity(d)} is verantwoordelijk voor de verwerking van de persoonsgegevens die je via deze website met ons deelt.</p>

          <h2>Welke gegevens</h2>
          <p>Als je het contactformulier invult, ontvangen wij je naam, bedrijfsnaam, e-mailadres en, als je die invult, je telefoonnummer, plaats, huidige website en je bericht. We leggen ook vast vanaf welke pagina je het formulier hebt verstuurd.</p>

          {d.whatsapp && <p>Stuur je ons een bericht via WhatsApp, dan ontvangen wij je telefoonnummer, je profielnaam en je bericht. WhatsApp is een dienst van Meta; op het gebruik daarvan zijn ook de voorwaarden en het privacybeleid van WhatsApp van toepassing.</p>}

          <h2>Waarvoor</h2>
          <p>We gebruiken deze gegevens alleen om je aanvraag te beantwoorden, een ontwerp voor je website te maken en je een aanbod te doen. We verkopen je gegevens niet aan anderen.</p>

          <h2>Grondslag en bewaartermijn</h2>
          <p>We verwerken je gegevens omdat je ons daarom vraagt (stappen voorafgaand aan een mogelijke overeenkomst) en met je toestemming. We bewaren ze niet langer dan nodig is voor dat doel, of zolang de wet dat voorschrijft als je klant wordt.</p>

          <h2>Wie helpt ons</h2>
          <p>Voor het hosten van deze website en het opslaan van gegevens gebruiken we zorgvuldig gekozen dienstverleners. Zij mogen je gegevens alleen gebruiken om die dienst voor ons te leveren.</p>

          <h2>Cookies en statistieken</h2>
          <p>
            Deze website plaatst geen tracking- of advertentiecookies zonder je toestemming. We meten wel anoniem hoe snel de pagina&apos;s laden, zonder cookie en zonder IP-adres of ander kenmerk. Wat we wel en niet gebruiken, lees je op de pagina over <Link href="/cookies">cookies</Link>.
          </p>

          <h2>Je rechten</h2>
          <p>
            Je kunt ons vragen om je gegevens in te zien, te verbeteren of te verwijderen, en je kunt je toestemming altijd intrekken. <ContactLine data={d} /> Ben je het niet eens met hoe wij met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.
          </p>
        </>
      )}
    </LegalPage>
  );
}
