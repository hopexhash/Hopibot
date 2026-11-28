import Link from "next/link";
import { LegalPage } from "@/components/site/legal-page";
import { ConsentLink } from "@/components/site/site-client";
import type { Locale } from "@/lib/site/i18n";
import { seoMeta } from "@/lib/site/seo-meta";

const PATH = { nl: "/cookies", en: "/en/cookies" };

export function cookiesMetadata(lang: Locale) {
  return lang === "en"
    ? seoMeta({ title: "Cookie policy | HOPI", description: "Which cookies and similar technologies the HOPI website uses, what for, and how to change your choice.", path: PATH.en })
    : seoMeta({ title: "Cookiebeleid | HOPI", description: "Welke cookies en vergelijkbare technieken de website van HOPI gebruikt, waarvoor, en hoe je je keuze aanpast.", path: PATH.nl });
}

export function CookiesPage({ lang }: { lang: Locale }) {
  if (lang === "en")
    return (
      <LegalPage title="Cookies" path={PATH.en} updated="2026-11-26" lang="en">
        {(d) => {
          const tracking = Boolean(d.site.gaId || d.site.gtmId);
          return (
            <>
              <p>On this page you can read which cookies and similar technologies this website uses. We deliberately keep it to a minimum.</p>

              <h2>Necessary</h2>
              <p>The website works without cookies. If you close the cookie notice or make a choice about statistics, your browser remembers that in its local storage, so you do not see the notice again on every visit. No consent is needed for that.</p>

              <h2>Statistics</h2>
              {tracking ? (
                <>
                  <p>With your consent, we use Google Analytics to see how the website is used: which pages are visited and whether the request form is sent. This helps us improve the website. These cookies are only placed after you have clicked &quot;Accept&quot;. If you decline, nothing is loaded and the website works as normal.</p>
                  <p>
                    You can change your choice at any time: <ConsentLink />.
                  </p>
                </>
              ) : (
                <p>At the moment we do not use any statistics or tracking cookies. If that changes, we will ask for your consent first and update this page.</p>
              )}

              <h2>Loading speed</h2>
              <p>To keep the website fast, your browser measures how long a page takes to load and respond (the so-called Core Web Vitals). We send those figures anonymously to our own server: only the address of the page, the measured values, whether it is a phone or a computer and the type of network connection. No cookie is placed for this and nothing is stored in your browser, we do not keep an IP address and there is no identifier by which you can be recognised. The measurements are deleted after 90 days.</p>

              <h2>Advertising</h2>
              <p>We do not place advertising cookies and do not share data with advertising networks.</p>

              <h2>Demo websites</h2>
              <p>The demo designs you open from our examples do not place cookies. Forms on those demos do not send anything.</p>

              <h2>Find out more</h2>
              <p>
                You can read how we handle the data you share with us through the form in the <Link href="/en/privacy">privacy statement</Link>.
              </p>
            </>
          );
        }}
      </LegalPage>
    );
  return (
    <LegalPage title="Cookies" path={PATH.nl} updated="2026-11-26">
      {(d) => {
        const tracking = Boolean(d.site.gaId || d.site.gtmId);
        return (
          <>
            <p>Op deze pagina lees je welke cookies en vergelijkbare technieken deze website gebruikt. We houden het bewust beperkt.</p>

            <h2>Noodzakelijk</h2>
            <p>De website werkt zonder cookies. Sluit je de cookiemelding of geef je een keuze door over statistieken, dan onthoudt je browser dat in de lokale opslag, zodat je de melding niet bij elk bezoek opnieuw ziet. Daar is geen toestemming voor nodig.</p>

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

            <h2>Laadsnelheid</h2>
            <p>Om de website snel te houden meet je browser hoe lang een pagina erover doet om te laden en te reageren (de zogenoemde Core Web Vitals). Die getallen sturen we anoniem naar onze eigen server: alleen het adres van de pagina, de meetwaarden, of het om een telefoon of computer gaat en het type netwerkverbinding. Er wordt daarvoor geen cookie geplaatst en niets in je browser opgeslagen, we bewaren geen IP-adres en er is geen kenmerk waarmee je herkend kunt worden. De metingen worden na 90 dagen verwijderd.</p>

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
