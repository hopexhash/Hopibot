import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, HeroAmbient, JsonLd, SiteFooter } from "@/components/site/parts";
import { SiteHeader } from "@/components/site/site-client";
import type { CategoryKey } from "@/lib/site/blog";
import { articlePath, articlesOf, categoriesOf } from "@/lib/site/content";
import type { Locale } from "@/lib/site/i18n";
import { abs, breadcrumbLd, ORG_ID } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { dateEn, dateNl } from "@/lib/site/text";
import { getSiteData } from "@/server/site";

const PATH = { nl: "/blog", en: "/en/blog" };

const T = {
  nl: {
    title: "Blog over websites, kosten en vindbaarheid | HOPI",
    description: "Praktische artikelen voor ondernemers: wat een website kost, waar een goede bedrijfswebsite aan voldoet en hoe je beter gevonden wordt in Google.",
    crumb: "Blog",
    eyebrow: "Blog",
    h1: ["Eerlijke antwoorden over ", "websites"],
    lead: "Geen vaktaal en geen verkooppraat: praktische artikelen over wat een website kost, waar je op moet letten en hoe je beter gevonden wordt.",
    topics: "Onderwerpen",
    minutes: "min lezen",
    readLabel: (title: string) => `Lees: ${title}`,
    read: "Lees het artikel",
    inLanguage: "nl-NL",
    date: dateNl,
  },
  en: {
    title: "Blog about websites, costs and getting found | HOPI",
    description: "Practical articles for business owners: what a website costs, what makes a good business website and how to get found more easily on Google.",
    crumb: "Blog",
    eyebrow: "Blog",
    h1: ["Honest answers about ", "websites"],
    lead: "No jargon and no sales talk: practical articles about what a website costs, what to look out for and how to get found more easily.",
    topics: "Topics",
    minutes: "min read",
    readLabel: (title: string) => `Read: ${title}`,
    read: "Read the article",
    inLanguage: "en",
    date: dateEn,
  },
};

export const blogIndexMetadata = (lang: Locale) => seoMeta({ title: T[lang].title, description: T[lang].description, path: PATH[lang] });

export async function BlogIndexPage({ lang }: { lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const path = PATH[lang];
  const crumbs = [{ name: t.crumb, path }];
  const categories = categoriesOf(lang);
  const articles = [...articlesOf(lang)].sort((a, b) => b.published.localeCompare(a.published));
  const topics = (Object.keys(categories) as CategoryKey[]).filter((k) => articles.some((a) => a.category === k));
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <section className="hero page-hero simple">
          <HeroAmbient />
          <div className="wrap">
            <Breadcrumbs crumbs={crumbs} lang={lang} />
            <span className="eyebrow enter">{t.eyebrow}</span>
            <h1 className="enter">
              {t.h1[0]}
              <em>{t.h1[1]}</em>
            </h1>
            <p className="lead enter">{t.lead}</p>
          </div>
        </section>
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <nav className="cats" aria-label={t.topics} data-reveal>
              {topics.map((k) => (
                <a key={k} href={`#${k}`}>
                  {categories[k].label}
                </a>
              ))}
            </nav>
          </div>
        </section>
        {topics.map((k) => (
          <section key={k} className="section blog-cat" id={k} style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="section-head" data-reveal>
                <h2>{categories[k].label}</h2>
                <p>{categories[k].text}</p>
              </div>
              <div className="posts">
                {articles
                  .filter((a) => a.category === k)
                  .map((a) => (
                    <article key={a.slug} className="post" data-reveal>
                      <p className="post-meta">
                        <time dateTime={a.published}>{t.date(a.published)}</time> · {a.readMinutes} {t.minutes}
                      </p>
                      <h3>
                        <Link href={articlePath(a.slug, lang)}>{a.title}</Link>
                      </h3>
                      <p>{a.excerpt}</p>
                      <Link href={articlePath(a.slug, lang)} className="post-more" aria-label={t.readLabel(a.title)}>
                        {t.read} <ArrowRight aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
              </div>
            </div>
          </section>
        ))}
        <ContactSection data={data} source={path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd data={breadcrumbLd(crumbs, { type: "CollectionPage" })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${abs(path)}#blog`,
          name: "HOPI blog",
          publisher: { "@id": ORG_ID },
          url: abs(path),
          inLanguage: t.inLanguage,
          blogPost: articles.map((a) => ({ "@type": "BlogPosting", headline: a.title, url: abs(articlePath(a.slug, lang)), datePublished: a.published })),
        }}
      />
    </>
  );
}
