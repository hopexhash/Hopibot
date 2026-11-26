import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs, ContactSection, JsonLd, Related, SiteFooter } from "@/components/site/parts";
import { headings, Markdown } from "@/components/site/rich";
import { SiteHeader } from "@/components/site/site-client";
import { ARTICLES, articleBySlug } from "@/lib/site/blog";
import { articleLd, breadcrumbLd, pageMeta } from "@/lib/site/seo";
import { dateNl } from "@/lib/site/text";
import { getSiteData } from "@/server/site";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) return {};
  return pageMeta({ title: a.seoTitle, description: a.description, path: `/blog/${a.slug}`, type: "article", published: a.published, modified: a.modified });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = articleBySlug((await params).slug);
  if (!a) notFound();
  const data = await getSiteData();
  const path = `/blog/${a.slug}`;
  const crumbs = [
    { name: "Blog", path: "/blog" },
    { name: a.title, path },
  ];
  const toc = headings(a.body);
  return (
    <>
      <SiteHeader />
      <main id="inhoud">
        <article className="wrap article">
          <header className="article-head">
            <Breadcrumbs crumbs={crumbs} />
            <h1>{a.title}</h1>
            <p className="post-meta">
              Door HOPI · <time dateTime={a.published}>{dateNl(a.published)}</time>
              {a.modified !== a.published && (
                <>
                  {" "}
                  · bijgewerkt <time dateTime={a.modified}>{dateNl(a.modified)}</time>
                </>
              )}{" "}
              · {a.readMinutes} min lezen
            </p>
          </header>
          <div className="article-grid">
            <nav className="toc" aria-label="In dit artikel">
              <h2>In dit artikel</h2>
              <ol>
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
              <a href="#contact" className="btn btn-dark" data-track="cta_click" data-track-label="article-toc" data-track-location={path}>
                Gratis ontwerp <ArrowRight aria-hidden="true" />
              </a>
            </nav>
            <div className="prose">
              <Markdown body={a.body} vars={data.prices} />
            </div>
          </div>
        </article>
        <Related paths={a.related} title="Lees ook" />
        <ContactSection data={data} source={path} />
      </main>
      <SiteFooter data={data} />
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={articleLd({ title: a.title, description: a.description, path, published: a.published, modified: a.modified })} />
    </>
  );
}
