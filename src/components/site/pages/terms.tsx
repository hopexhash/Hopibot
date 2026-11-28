import Link from "next/link";
import { ContactLine, identity, LegalPage } from "@/components/site/legal-page";
import type { Locale } from "@/lib/site/i18n";
import { seoMeta } from "@/lib/site/seo-meta";

const PATH = { nl: "/algemene-voorwaarden", en: "/en/terms" };

export function termsMetadata(lang: Locale) {
  return lang === "en"
    ? seoMeta({ title: "Terms and conditions | HOPI", description: "The terms and conditions of HOPI: the free design, assignment and prices, payment, delivery, hosting and maintenance, ownership and liability.", path: PATH.en })
    : seoMeta({ title: "Algemene voorwaarden | HOPI", description: "De algemene voorwaarden van HOPI: het gratis ontwerp, opdracht en prijzen, betaling, oplevering, hosting en onderhoud, eigendom en aansprakelijkheid.", path: PATH.nl });
}

export function TermsPage({ lang }: { lang: Locale }) {
  if (lang === "en")
    return (
      <LegalPage title="Terms and conditions" path={PATH.en} updated="2026-11-26" lang="en">
        {(d) => (
          <>
            <p>These terms apply to all requests, designs and assignments between {identity(d, "en")}, hereinafter &quot;HOPI&quot;, and the business that requests a website from us or has one made, hereinafter &quot;you&quot;. HOPI works exclusively for businesses and organisations, not for consumers.</p>

            <h2>1. The free design</h2>
            <p>After your request, we make a design of your website. That design is free and without obligation: you are not required to take a package. As long as you have not given us an assignment, the design remains the property of HOPI and you may not use or copy it, or have it used or copied. We may reject a request without giving reasons.</p>

            <h2>2. Assignment and prices</h2>
            <p>
              An assignment is formed as soon as you choose a package and we confirm it in writing or by email. The prices are on the <Link href="/en/pricing">pricing</Link> page and in your order confirmation, and are in euros and excluding VAT. What is in your order confirmation takes precedence over what is on the website. We only carry out work that is not included in your package after you have agreed to the price for it.
            </p>

            <h2>3. Payment</h2>
            <p>You pay a one-off amount for the website. Subscriptions for hosting and maintenance are paid monthly. The payment term and method of payment are in your order confirmation or on the invoice. If you do not pay on time, we may suspend the work and, after a reminder, take the website offline.</p>

            <h2>4. What we need from you</h2>
            <p>You provide the information needed to make your website, such as company details, texts and photos, and you check the design for accuracy. You guarantee that you hold the rights to the material you provide. You are responsible for the accuracy of the content of your website, such as prices, opening hours and legally required information.</p>

            <h2>5. Delivery and changes</h2>
            <p>We agree on a schedule together. Stated timeframes are a target and not hard deadlines, unless we explicitly agree otherwise. After you approve the design, we process your comments within the arrangements in your order confirmation. The website is delivered as soon as it is online or as soon as you have given your approval in writing.</p>

            <h2>6. Hosting and maintenance</h2>
            <p>
              With a subscription, we take care of hosting, security and the maintenance that comes with the chosen subscription; see <Link href="/en/website-maintenance">website maintenance</Link>. We do our best to keep your website available, but cannot guarantee uninterrupted availability. The duration and how to cancel are in your order confirmation.
            </p>

            <h2>7. Ownership</h2>
            <p>After full payment, you may use the website for your own business. The texts and photos you provided yourself remain yours. Components we use for several clients, such as our own software and building blocks, remain the property of HOPI. A domain name we register for you is in your name or is transferred to you on request.</p>

            <h2>8. Findability and results</h2>
            <p>We build websites with a sound technical foundation for search engines. We give no guarantees about positions in search engines, visitor numbers or turnover.</p>

            <h2>9. Liability</h2>
            <p>We carry out our work with care. Our liability is limited to direct damage and to no more than the amount you paid HOPI in the twelve months before the damage for the assignment the damage arises from. We are not liable for indirect damage, such as lost turnover. These limitations do not apply in the case of intent or deliberate recklessness.</p>

            <h2>10. Privacy</h2>
            <p>
              You can read how we handle personal data in our <Link href="/en/privacy">privacy statement</Link>. If we process personal data of your customers through your website, for example via a contact form, we only do so on your instructions.
            </p>

            <h2>11. Applicable law</h2>
            <p>These terms are governed by Dutch law. We prefer to resolve a disagreement together. If that does not work, we will submit it to the competent court in the Netherlands.</p>

            <h2>Questions</h2>
            <p>
              Do you have a question about these terms? <ContactLine data={d} lang="en" />
            </p>
          </>
        )}
      </LegalPage>
    );
  return (
    <LegalPage title="Algemene voorwaarden" path={PATH.nl} updated="2026-11-26">
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
