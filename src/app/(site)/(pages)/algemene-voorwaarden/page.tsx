import Link from "next/link";
import { seoMeta } from "@/lib/site/seo-meta";
import { ContactLine, identity, LegalPage } from "@/components/site/legal-page";
const PATH = "/algemene-voorwaarden";
export const generateMetadata = () =>
  seoMeta({ title: "Algemene voorwaarden | HOPI", description: "De algemene voorwaarden van HOPI: het gratis ontwerp, opdracht en prijzen, betaling, oplevering, hosting en onderhoud, eigendom en aansprakelijkheid.", path: PATH });

export default function TermsPage() {
  return (
    <LegalPage title="Algemene voorwaarden" path={PATH} updated="2026-11-26">
      {(d) => (
        <>
          <p>Deze voorwaarden gelden voor alle aanvragen, ontwerpen en opdrachten tussen {identity(d)}, hierna &quot;HOPI&quot;, en de ondernemer die een website bij ons aanvraagt of laat maken, hierna &quot;je&quot;. HOPI werkt uitsluitend voor ondernemers en organisaties, niet voor consumenten.</p>

          <h2>1. Het gratis ontwerp</h2>
          <p>Na je aanvraag maken wij een ontwerp van je website. Dat ontwerp is gratis en vrijblijvend: je bent niet verplicht een pakket af te nemen. Zolang je geen opdracht geeft, blijft het ontwerp van HOPI en mag je het niet (laten) gebruiken of namaken. Wij mogen een aanvraag zonder opgaaf van redenen afwijzen.</p>

          <h2>2. Opdracht en prijzen</h2>
          <p>
            Een opdracht komt tot stand zodra je een pakket kiest en wij dat schriftelijk of per e-mail bevestigen. De prijzen staan op de pagina <Link href="/prijzen">prijzen</Link> en in je orderbevestiging, en zijn in euro&apos;s en exclusief btw. Wat in je orderbevestiging staat, gaat voor op wat op de website staat. Werk dat niet in je pakket zit, voeren we alleen uit nadat je daarvoor akkoord hebt gegeven op de prijs.
          </p>

          <h2>3. Betaling</h2>
          <p>Voor de website betaal je een eenmalig bedrag. Abonnementen voor hosting en onderhoud betaal je per maand. De betaaltermijn en de wijze van betalen staan in je orderbevestiging of op de factuur. Betaal je niet op tijd, dan mogen wij de werkzaamheden opschorten en, na een herinnering, de website offline halen.</p>

          <h2>4. Wat wij van je nodig hebben</h2>
          <p>Je levert de informatie aan die nodig is om je website te maken, zoals bedrijfsgegevens, teksten en foto&apos;s, en je controleert het ontwerp op juistheid. Je staat ervoor in dat je de rechten hebt op het materiaal dat je aanlevert. Voor de juistheid van de inhoud van je website, zoals prijzen, openingstijden en wettelijk verplichte vermeldingen, ben je zelf verantwoordelijk.</p>

          <h2>5. Oplevering en wijzigingen</h2>
          <p>We spreken samen een planning af. Genoemde termijnen zijn een streven en geen harde deadlines, tenzij we dat uitdrukkelijk afspreken. Na je akkoord op het ontwerp verwerken we je opmerkingen binnen de afspraken uit je orderbevestiging. De website is opgeleverd zodra hij online staat of zodra je schriftelijk akkoord hebt gegeven.</p>

          <h2>6. Hosting en onderhoud</h2>
          <p>
            Met een abonnement zorgen wij voor hosting, beveiliging en het onderhoud dat bij het gekozen abonnement hoort; zie <Link href="/website-onderhoud">website onderhoud</Link>. We spannen ons in om je website bereikbaar te houden, maar kunnen geen ononderbroken beschikbaarheid garanderen. De looptijd en de manier van opzeggen staan in je orderbevestiging.
          </p>

          <h2>7. Eigendom</h2>
          <p>Na volledige betaling mag je de website gebruiken voor je eigen bedrijf. De teksten en foto&apos;s die je zelf hebt aangeleverd, blijven van jou. Onderdelen die wij voor meerdere klanten gebruiken, zoals onze eigen software en bouwstenen, blijven van HOPI. Een domeinnaam die wij voor je registreren, staat op jouw naam of wordt op verzoek aan je overgedragen.</p>

          <h2>8. Vindbaarheid en resultaten</h2>
          <p>Wij bouwen websites met een nette technische basis voor zoekmachines. We geven geen garanties over posities in zoekmachines, bezoekersaantallen of omzet.</p>

          <h2>9. Aansprakelijkheid</h2>
          <p>Wij voeren ons werk zorgvuldig uit. Onze aansprakelijkheid is beperkt tot directe schade en tot ten hoogste het bedrag dat je in de twaalf maanden voor de schade aan HOPI hebt betaald voor de opdracht waar de schade uit voortkomt. Voor indirecte schade, zoals gemiste omzet, zijn wij niet aansprakelijk. Deze beperkingen gelden niet bij opzet of bewuste roekeloosheid.</p>

          <h2>10. Privacy</h2>
          <p>
            Hoe wij met persoonsgegevens omgaan, lees je in onze <Link href="/privacy">privacyverklaring</Link>. Verwerken wij via je website persoonsgegevens van jouw klanten, bijvoorbeeld via een contactformulier, dan doen we dat alleen in jouw opdracht.
          </p>

          <h2>11. Toepasselijk recht</h2>
          <p>Op deze voorwaarden is Nederlands recht van toepassing. We lossen een meningsverschil het liefst samen op. Lukt dat niet, dan leggen we het voor aan de bevoegde rechter in Nederland.</p>

          <h2>Vragen</h2>
          <p>
            Heb je een vraag over deze voorwaarden? <ContactLine data={d} />
          </p>
        </>
      )}
    </LegalPage>
  );
}
