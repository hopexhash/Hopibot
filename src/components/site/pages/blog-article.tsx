import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Breadcrumbs, ContactSection, JsonLd, Related, SiteFooter } from "@/components/site/parts";
import { headings, Markdown } from "@/components/site/rich";
import { SiteHeader } from "@/components/site/site-client";
import type { Article } from "@/lib/site/blog";
import { articleBySlug } from "@/lib/site/blog";
import { articleBySlugEn } from "@/lib/site/blog.en";
import { articlePath, categoriesOf } from "@/lib/site/content";
import { href, type Locale } from "@/lib/site/i18n";
import { articleLd, breadcrumbLd } from "@/lib/site/seo";
import { seoMeta } from "@/lib/site/seo-meta";
import { dateEn, dateNl } from "@/lib/site/text";
import { getSiteData } from "@/server/site";

const T = {
  nl: {
    blog: "Blog",
    by: "Door",
    team: "de redactie van HOPI",
    updated: "bijgewerkt",
    minutes: "min lezen",
    toc: "In dit artikel",
    cta: "Gratis ontwerp",
    sources: "Bronnen",
    sourcesId: "bronnen",
    related: "Lees ook",
    date: dateNl,
  },
  en: {
    blog: "Blog",
    by: "By",
    team: "the HOPI editorial team",
    updated: "updated",
    minutes: "min read",
    toc: "In this article",
    cta: "Free design",
    sources: "Sources",
    sourcesId: "sources",
    related: "Read next",
    date: dateEn,
  },
};

/** The article with this slug in the given language. */
export const findArticle = (slug: string, lang: Locale): Article | undefined => (lang === "en" ? articleBySlugEn(slug) : articleBySlug(slug));

export function blogArticleMetadata(a: Article, lang: Locale) {
  return seoMeta({ title: a.seoTitle, description: a.description, path: articlePath(a.slug, lang), type: "article", published: a.published, modified: a.modified, image: a.image?.src });
}

export async function BlogArticlePage({ article: a, lang }: { article: Article; lang: Locale }) {
  const data = await getSiteData();
  const t = T[lang];
  const blog = href("/blog", lang);
  const category = categoriesOf(lang)[a.category];
  const path = articlePath(a.slug, lang);
  const crumbs = [
    { name: t.blog, path: blog },
    { name: a.title, path },
  ];
  const toc = headings(a.body);
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <article className="wrap article">
          <header className="article-head">
            <Breadcrumbs crumbs={crumbs} lang={lang} />
            <p className="eyebrow">
              <Link href={`${blog}#${a.category}`}>{category.label}</Link>
            </p>
            <h1>{a.title}</h1>
            <p className="post-meta">
              {t.by} <Link href={href("/over-ons", lang)}>{t.team}</Link> · <time dateTime={a.published}>{t.date(a.published)}</time>
              {a.modified !== a.published && (
                <>
                  {" "}
                  · {t.updated} <time dateTime={a.modified}>{t.date(a.modified)}</time>
                </>
              )}{" "}
              · {a.readMinutes} {t.minutes}
            </p>
          </header>
          {a.image && (
            <figure className="article-cover">
              {/* The cover is the largest element on the first screen: loaded first, never lazily. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.image.src}
                // Portfolio screenshots exist in a 720px version too: phones load that one.
                srcSet={a.image.src.endsWith("-d-1440.webp") ? `${a.image.src.replace("-d-1440.webp", "-d-720.webp")} 720w, ${a.image.src} 1440w` : undefined}
                sizes="(min-width: 1000px) 880px, 100vw"
                alt={a.image.alt}
                width={a.image.width}
                height={a.image.height}
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          )}
          <div className="article-grid">
            <nav className="toc" aria-label={t.toc}>
              <h2>{t.toc}</h2>
              <ol>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
              <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="article-toc" data-track-location={path}>
                {t.cta} <ArrowRight aria-hidden="true" />
              </a>
            </nav>
            <div className="prose">
              <Markdown body={a.body} vars={data.prices} />
              {a.sources && a.sources.length > 0 && (
                <section className="sources" aria-labelledby={t.sourcesId}>
                  <h2 id={t.sourcesId}>{t.sources}</h2>
                  <ul>
                    {a.sources.map((x) => (
                      <li key={x.url}>
                        <a href={x.url} rel="noopener noreferrer" target="_blank">
                          {x.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </article>
        <Related paths={a.related} title={t.related} lang={lang} />
        <ContactSection data={data} source={path} lang={lang} />
      </main>
      <SiteFooter data={data} lang={lang} />
      <JsonLd data={breadcrumbLd(crumbs, { description: a.description, image: a.image?.src })} />
      <JsonLd data={articleLd({ title: a.title, description: a.description, path, published: a.published, modified: a.modified, image: a.image?.src, section: category.label, words: a.body.split(/\s+/).length })} />
    </>
  );
}
