import Link from "next/link";
import { ContactLine, identity, LegalPage } from "@/components/site/legal-page";
import { pageMeta } from "@/lib/site/seo";

const PATH = "/privacy";
export const metadata = pageMeta({ title: "Privacyverklaring | HOPI", description: "Welke persoonsgegevens HOPI verwerkt als je het contactformulier invult, waarvoor we ze gebruiken, hoe lang we ze bewaren en welke rechten je hebt.", path: PATH });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacyverklaring" path={PATH} updated="2026-11-26">
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
            Deze website plaatst geen tracking- of advertentiecookies zonder je toestemming. Wat we wel en niet gebruiken, lees je op de pagina over <Link href="/cookies">cookies</Link>.
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
