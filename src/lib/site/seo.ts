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

const ORG_ID = `${SITE_URL}/#organization`;

/** The agency itself. Only facts that are filled in under Settings are published. */
export function organizationLd(o: Org) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: o.name,
    url: SITE_URL,
    logo: abs("/site/logo.png"),
    image: abs(OG_IMAGE),
    description: "Webdesignbureau voor ondernemers in Nederland en België. Je ziet eerst gratis een ontwerp van je nieuwe website en betaalt pas als het bevalt.",
    areaServed: [
      { "@type": "Country", name: "Nederland" },
      { "@type": "Country", name: "België" },
    ],
    knowsLanguage: "nl",
    ...(o.email ? { email: o.email } : {}),
    ...(o.phone ? { telephone: o.phone } : {}),
    ...(o.address ? { address: o.address } : {}),
    ...(o.kvk ? { identifier: { "@type": "PropertyValue", propertyID: "KvK", value: o.kvk } } : {}),
    ...(o.googleBusinessUrl ? { sameAs: [o.googleBusinessUrl] } : {}),
    ...(o.fromCents !== null ? { priceRange: `Vanaf €${Math.round(o.fromCents / 100)}` } : {}),
  };
}

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "HOPI",
  inLanguage: "nl-NL",
  publisher: { "@id": ORG_ID },
});

export type Crumb = { name: string; path: string };
export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
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

export function articleLd(a: { title: string; description: string; path: string; published: string; modified: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.modified,
    inLanguage: "nl-NL",
    mainEntityOfPage: abs(a.path),
    image: abs(OG_IMAGE),
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
