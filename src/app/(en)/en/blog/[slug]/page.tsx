import { notFound } from "next/navigation";
import { BlogArticlePage, blogArticleMetadata, findArticle } from "@/components/site/pages/blog-article";
import { ARTICLES_EN } from "@/lib/site/blog.en";

export const dynamicParams = false;
export const generateStaticParams = () => ARTICLES_EN.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = findArticle((await params).slug, "en");
  return a ? blogArticleMetadata(a, "en") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = findArticle((await params).slug, "en");
  if (!a) notFound();
  return <BlogArticlePage article={a} lang="en" />;
}
