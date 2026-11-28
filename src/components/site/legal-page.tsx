import Link from "next/link";
import { getSiteData, type SiteData } from "@/server/site";
import { Breadcrumbs, JsonLd, SiteFooter } from "./parts";
import { SiteHeader } from "./site-client";
import { counterpart, type Locale } from "@/lib/site/i18n";
import { breadcrumbLd } from "@/lib/site/seo";
import { dateNl } from "@/lib/site/text";

const dateEn = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" }).format(new Date(`${iso}T12:00:00Z`));

/**
 * Shell of the legal pages: same header and footer, a narrow readable column. The English
 * versions say at the top that the Dutch text is the binding one, with a link to it.
 */
export async function LegalPage({ title, path, updated, lang = "nl", children }: { title: string; path: string; updated: string; lang?: Locale; children: (data: SiteData) => React.ReactNode }) {
  const data = await getSiteData();
  const crumbs = [{ name: title, path }];
  const en = lang === "en";
  return (
    <>
      <SiteHeader />
      <main id="inhoud" className="wrap">
        <article className="doc prose">
          <Breadcrumbs crumbs={crumbs} lang={lang} />
          <h1>{title}</h1>
          {en ? (
            <p className="post-meta">
              Last updated on <time dateTime={updated}>{dateEn(updated)}</time>
            </p>
          ) : (
            <p className="post-meta">
              Laatst bijgewerkt op <time dateTime={updated}>{dateNl(updated)}</time>
            </p>
          )}
          {en && (
            <p>
              <em>
                This is a translation for convenience; the{" "}
                <Link href={counterpart(path, "nl")} hrefLang="nl">
                  Dutch version
                </Link>{" "}
                is the binding text.
              </em>
            </p>
          )}
          {children(data)}
          <p style={{ marginTop: 40 }}>
            <Link href={en ? "/en" : "/"} className="btn btn-line">
              {en ? "Back to the homepage" : "Terug naar de homepage"}
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}

/** "HOPI, Straat 1, Plaats (KvK 123)" from the details filled in under Settings. */
export const identity = (d: SiteData, lang: Locale = "nl") =>
  lang === "en"
    ? `${d.name}${d.address ? `, ${d.address}` : ""}${d.kvk ? `, Chamber of Commerce (KvK) number ${d.kvk}` : ""}`
    : `${d.name}${d.address ? `, ${d.address}` : ""}${d.kvk ? ` (KvK ${d.kvk})` : ""}`;

export function ContactLine({ data, lang = "nl" }: { data: SiteData; lang?: Locale }) {
  if (lang === "en")
    return data.email ? (
      <>
        Send an email to <a href={`mailto:${data.email}`}>{data.email}</a>.
      </>
    ) : (
      <>
        Get in touch through the <Link href="/en#contact">contact form</Link>.
      </>
    );
  return data.email ? (
    <>
      Stuur een e-mail naar <a href={`mailto:${data.email}`}>{data.email}</a>.
    </>
  ) : (
    <>
      Neem contact met ons op via het <Link href="/#contact">contactformulier</Link>.
    </>
  );
}
