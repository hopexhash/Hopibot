import Link from "next/link";
import { getSiteOrg } from "@/server/site";
import { SiteHeader } from "@/components/site/site-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Privacyverklaring" };

export default async function PrivacyPage() {
  const org = await getSiteOrg();
  const s = org?.settings;
  const name = s?.agencyName || "HOPI";
  const email = s?.replyToEmail || s?.senderEmail || "";
  return (
    <>
      <SiteHeader />
      <main className="wrap">
        <article className="doc">
          <span className="eyebrow">Privacy</span>
          <h1>Privacyverklaring</h1>
          <p>
            {name}
            {s?.agencyAddress ? `, ${s.agencyAddress}` : ""}
            {s?.kvkNumber ? ` (KvK ${s.kvkNumber})` : ""} is verantwoordelijk voor de verwerking van de persoonsgegevens die u via deze website met ons deelt.
          </p>

          <h2>Welke gegevens</h2>
          <p>Als u het contactformulier invult, ontvangen wij uw naam, bedrijfsnaam, e-mailadres en, als u die invult, uw telefoonnummer, plaats, huidige website en uw bericht.</p>

          <h2>Waarvoor</h2>
          <p>We gebruiken deze gegevens alleen om uw aanvraag te beantwoorden, een ontwerp voor uw website te maken en u een aanbod te doen. We verkopen uw gegevens niet aan anderen.</p>

          <h2>Grondslag en bewaartermijn</h2>
          <p>We verwerken uw gegevens omdat u ons daarom vraagt (stappen voorafgaand aan een mogelijke overeenkomst) en met uw toestemming. We bewaren ze niet langer dan nodig is voor dat doel, of zolang de wet dat voorschrijft als u klant wordt.</p>

          <h2>Wie helpt ons</h2>
          <p>Voor het hosten van deze website en het opslaan van gegevens gebruiken we zorgvuldig gekozen dienstverleners. Zij mogen uw gegevens alleen gebruiken om die dienst voor ons te leveren.</p>

          <h2>Cookies</h2>
          <p>Deze website plaatst geen tracking- of advertentiecookies.</p>

          <h2>Uw rechten</h2>
          <p>
            U kunt ons vragen om uw gegevens in te zien, te verbeteren of te verwijderen, en u kunt uw toestemming altijd intrekken.{" "}
            {email ? (
              <>
                Stuur daarvoor een e-mail naar <a href={`mailto:${email}`}>{email}</a>.
              </>
            ) : (
              <>
                Neem daarvoor contact met ons op via het <Link href="/#contact">contactformulier</Link>.
              </>
            )}{" "}
            Bent u het niet eens met hoe wij met uw gegevens omgaan, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.
          </p>
          <p style={{ marginTop: 40 }}>
            <Link href="/" className="btn btn-line">
              Terug naar de homepage
            </Link>
          </p>
        </article>
      </main>
    </>
  );
}
