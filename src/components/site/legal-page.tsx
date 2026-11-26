import Link from "next/link";
import { getSiteData, type SiteData } from "@/server/site";
import { Breadcrumbs, JsonLd, SiteFooter } from "./parts";
import { SiteHeader } from "./site-client";
import { breadcrumbLd } from "@/lib/site/seo";
import { dateNl } from "@/lib/site/text";

/** Shell of the legal pages: same header and footer, a narrow readable column. */
export async function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: (data: SiteData) => React.ReactNode }) {
  const data = await getSiteData();
  const crumbs = [{ name: title, path }];
  return (
    <>
      <SiteHeader />
      <main id="inhoud" className="wrap">
        <article className="doc prose">
          <Breadcrumbs crumbs={crumbs} />
          <h1>{title}</h1>
          <p className="post-meta">
            Laatst bijgewerkt op <time dateTime={updated}>{dateNl(updated)}</time>
          </p>
          {children(data)}
          <p style={{ marginTop: 40 }}>
            <Link href="/" className="btn btn-line">
              Terug naar de homepage
            </Link>
          </p>
        </article>
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}

/** "HOPI, Straat 1, Plaats (KvK 123)" from the details filled in under Settings. */
export const identity = (d: SiteData) => `${d.name}${d.address ? `, ${d.address}` : ""}${d.kvk ? ` (KvK ${d.kvk})` : ""}`;

export function ContactLine({ data }: { data: SiteData }) {
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
