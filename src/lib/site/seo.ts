import type { Metadata } from "next";

/** Canonical origin of the public website (APP_URL). */
export const SITE_URL = (process.env.APP_URL ?? "https://wearehopi.nl").replace(/\/+$/, "");
export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
export const OG_IMAGE = "/site/og.jpg";

/** Title, description, canonical URL and social cards for one page. */
export function pageMeta(p: { title: string; description: string; path: string; type?: "website" | "article"; published?: string; modified?: string; image?: string }): Metadata {
  const image = p.image ?? OG_IMAGE;
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: p.type ?? "website",
      locale: "nl_NL",
      siteName: "HOPI",
      url: p.path,
      title: p.title,
      description: p.description,
      images: [{ url: image, width: 1200, height: 630, alt: "HOPI: jouw nieuwe website, eerst zien, dan betalen" }],
      ...(p.type === "article" ? { publishedTime: p.published, modifiedTime: p.modified ?? p.published } : {}),
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: [image] },
  };
}

type Org = { name: string; email: string; phone: string; address: string; kvk: string; googleBusinessUrl: string; fromCents: number | null };

export const ORG_ID = `${SITE_URL}/#organization`;

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const pageId = (path: string) => `${abs(path)}#webpage`;

/** One sentence that describes HOPI the same way everywhere (structured data, About page, footer). */
export const BRAND_DESCRIPTION =
  "HOPI is een webdesignbureau voor ondernemers in Nederland en België. Je ziet eerst gratis een ontwerp van je eigen website en betaalt pas als het bevalt.";

/** What HOPI makes and for whom: the topics search engines may connect to the organisation. */
const KNOWS_ABOUT = ["Webdesign", "Website laten maken", "Responsive webdesign", "Zoekmachineoptimalisatie (SEO)", "Website onderhoud en hosting", "Websites voor restaurants en horeca", "Websites voor kappers en schoonheidssalons", "Websites voor bouwbedrijven en installateurs", "Websites voor zzp'ers en het mkb", "Webshops"];

/**
 * The agency itself. Only facts that are filled in under Settings are published. HOPI works
 * remotely and has no public business address, so it is an Organization, not a LocalBusiness.
 */
export function organizationLd(o: Org) {
  const contact = o.email || o.phone;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: o.name,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs("/site/logo.png") },
    image: abs(OG_IMAGE),
    slogan: "Eerst zien, dan betalen",
    description: BRAND_DESCRIPTION,
    knowsAbout: KNOWS_ABOUT,
    areaServed: [
      { "@type": "Country", name: "Nederland" },
      { "@type": "Country", name: "België" },
    ],
    knowsLanguage: "nl",
    ...(o.email ? { email: o.email } : {}),
    ...(o.phone ? { telephone: o.phone } : {}),
    ...(o.address ? { address: o.address } : {}),
    ...(contact ? { contactPoint: { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["nl"], ...(o.email ? { email: o.email } : {}), ...(o.phone ? { telephone: o.phone } : {}) } } : {}),
    ...(o.kvk ? { identifier: { "@type": "PropertyValue", propertyID: "KvK", value: o.kvk } } : {}),
    ...(o.googleBusinessUrl ? { sameAs: [o.googleBusinessUrl] } : {}),
  };
}

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  description: BRAND_DESCRIPTION,
  url: SITE_URL,
  name: "HOPI",
  inLanguage: "nl-NL",
  publisher: { "@id": ORG_ID },
});

export type Crumb = { name: string; path: string };
type PageType = "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" | "FAQPage";

/**
 * The page itself and its breadcrumb trail, connected to the website and the organisation by
 * @id, so search engines read one graph instead of loose blocks. The last crumb is the page.
 */
export function breadcrumbLd(crumbs: Crumb[], page: { description?: string; type?: PageType; image?: string } = {}) {
  const self = crumbs[crumbs.length - 1];
  const url = abs(self.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": page.type ?? "WebPage",
        "@id": pageId(self.path),
        url,
        name: self.name,
        ...(page.description ? { description: page.description } : {}),
        inLanguage: "nl-NL",
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORG_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(page.image ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(page.image) } } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
      },
    ],
  };
}

/** The homepage: about the organisation itself. */
export const homePageLd = (description: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": pageId("/"),
  url: SITE_URL,
  name: "HOPI",
  description,
  inLanguage: "nl-NL",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});

/** A service page. Offers are only attached when the catalogue has fixed prices for them. */
export function serviceLd(s: { name: string; description: string; path: string; serviceType: string; offers?: { name: string; priceCents: number }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(s.path)}#service`,
    name: s.name,
    serviceType: s.serviceType,
    description: s.description,
    url: abs(s.path),
    mainEntityOfPage: { "@id": pageId(s.path) },
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Nederland" },
      { "@type": "Country", name: "België" },
    ],
    ...(s.offers?.length
      ? {
          offers: s.offers.map((o) => ({
            "@type": "Offer",
            name: o.name,
            price: (o.priceCents / 100).toFixed(2),
            priceCurrency: "EUR",
            url: abs("/prijzen"),
            availability: "https://schema.org/InStock",
          })),
        }
      : {}),
  };
}

export const faqLd = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export function articleLd(a: { title: string; description: string; path: string; published: string; modified: string; image?: string; section?: string; words?: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${abs(a.path)}#article`,
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.modified,
    inLanguage: "nl-NL",
    mainEntityOfPage: { "@id": pageId(a.path) },
    isPartOf: { "@id": `${abs("/blog")}#blog` },
    image: abs(a.image ?? OG_IMAGE),
    ...(a.section ? { articleSection: a.section } : {}),
    ...(a.words ? { wordCount: a.words } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** Plain text of copy that uses *emphasis*, **bold**, [links](/x) and {price} placeholders. */
export function plain(text: string, vars: Record<string, string> = {}) {
  return text
    .replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*?([^*]+)\*\*?/g, "$1");
}
