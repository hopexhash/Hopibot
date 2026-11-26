import Link from "next/link";
import { LegalPage } from "@/components/site/legal-page";
import { ConsentLink } from "@/components/site/site-client";
import { pageMeta } from "@/lib/site/seo";

const PATH = "/cookies";
export const metadata = pageMeta({ title: "Cookies | HOPI", description: "Welke cookies en vergelijkbare technieken de website van HOPI gebruikt, waarvoor, en hoe je je keuze aanpast.", path: PATH });

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies" path={PATH} updated="2026-11-26">
      {(d) => {
        const tracking = Boolean(d.site.gaId || d.site.gtmId);
        return (
          <>
            <p>Op deze pagina lees je welke cookies en vergelijkbare technieken deze website gebruikt. We houden het bewust beperkt.</p>

            <h2>Noodzakelijk</h2>
            <p>De website werkt zonder cookies. Geef je een keuze door over statistieken, dan onthoudt je browser die keuze in de lokale opslag, zodat we het je niet bij elk bezoek opnieuw vragen. Daar is geen toestemming voor nodig.</p>

            <h2>Statistieken</h2>
            {tracking ? (
              <>
                <p>Met je toestemming gebruiken we Google Analytics om te zien hoe de website wordt gebruikt: welke pagina&apos;s worden bezocht en of het aanvraagformulier wordt verstuurd. Zo kunnen we de website verbeteren. Deze cookies worden pas geplaatst nadat je op &quot;Accepteren&quot; hebt geklikt. Weiger je, dan wordt er niets geladen en werkt de website gewoon.</p>
                <p>
                  Je keuze aanpassen kan altijd: <ConsentLink />.
                </p>
              </>
            ) : (
              <p>Op dit moment gebruiken we geen statistiek- of trackingcookies. Als dat verandert, vragen we je eerst om toestemming en passen we deze pagina aan.</p>
            )}

            <h2>Advertenties</h2>
            <p>We plaatsen geen advertentiecookies en delen geen gegevens met advertentienetwerken.</p>

            <h2>Demo-websites</h2>
            <p>De demo-ontwerpen die je vanaf onze voorbeelden opent, plaatsen geen cookies. Formulieren op die demo&apos;s versturen niets.</p>

            <h2>Meer weten</h2>
            <p>
              Hoe we omgaan met de gegevens die je via het formulier met ons deelt, lees je in de <Link href="/privacy">privacyverklaring</Link>.
            </p>
          </>
        );
      }}
    </LegalPage>
  );
}
