import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, HeroAmbient, ContactSection, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import { ARTICLES, CATEGORIES, type CategoryKey } from "@/lib/site/blog";
import { abs, breadcrumbLd, ORG_ID } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { dateNl } from "@/lib/site/text";
import { getSiteData } from "@/server/site";

const PATH = "/blog";
const CRUMBS = [{ name: "Blog", path: PATH }];

export const generateMetadata = () =>
  seoMeta({
  title: "Blog over websites, kosten en vindbaarheid | HOPI",
  description: "Praktische artikelen voor ondernemers: wat een website kost, waar een goede bedrijfswebsite aan voldoet en hoe je beter gevonden wordt in Google.",
  path: PATH,
});

export default async function BlogIndex() {
  const data = await getSiteData();
  const articles = [...ARTICLES].sort((a, b) => b.published.localeCompare(a.published));
  const topics = (Object.keys(CATEGORIES) as CategoryKey[]).filter((k) => articles.some((a) => a.category === k));
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero simple">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={CRUMBS} />
            <span className="eyebrow enter">Blog</span>
            <h1 className="enter">
              Eerlijke antwoorden over <em>websites</em>
            </h1>
            <p className="lead enter">Geen vaktaal en geen verkooppraat: praktische artikelen over wat een website kost, waar je op moet letten en hoe je beter gevonden wordt.</p>
          </div>
        </section>
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <nav className="cats" aria-label="Onderwerpen" data-reveal>
              {topics.map((k) => (
                <a key={k} href={`#${k}`}>
                  {CATEGORIES[k].label}
                </a>
              ))}
            </nav>
          </div>
        </section>
        {topics.map((k) => (
          <section key={k} className="section blog-cat" id={k} style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head" data-reveal>
                <h2>{CATEGORIES[k].label}</h2>
                <p>{CATEGORIES[k].text}</p>
              </div>
            <div className="posts">
              {articles.filter((a) => a.category === k).map((a) => (
                <article key={a.slug} className="post" data-reveal>
                  <p className="post-meta">
                    <time dateTime={a.published}>{dateNl(a.published)}</time> · {a.readMinutes} min lezen
                  </p>
                  <h3>
                    <Link href={`/blog/${a.slug}`}>{a.title}</Link>
                  </h3>
                  <p>{a.excerpt}</p>
                  <Link href={`/blog/${a.slug}`} className="post-more" aria-label={`Lees: ${a.title}`}>
                    Lees het artikel <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
            </div>
          </section>
        ))}
        <ContactSection data={data} source={PATH} />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd(CRUMBS, { type: "CollectionPage" })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${abs(PATH)}#blog`,
          name: "HOPI blog",
          publisher: { "@id": ORG_ID },
          url: abs(PATH),
          inLanguage: "nl-NL",
          blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: abs(`/blog/${a.slug}`), datePublished: a.published })),
        }}
      />
    </>
  );
}
