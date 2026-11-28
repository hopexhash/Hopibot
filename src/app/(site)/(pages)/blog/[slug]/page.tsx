import { notFound } from "next/navigation";
import { BlogArticlePage, blogArticleMetadata, findArticle } from "@/components/site/pages/blog-article";
import { ARTICLES } from "@/lib/site/blog";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = findArticle((await params).slug, "nl");
  return a ? blogArticleMetadata(a, "nl") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = findArticle((await params).slug, "nl");
  if (!a) notFound();
  return <BlogArticlePage article={a} lang="nl" />;
}
