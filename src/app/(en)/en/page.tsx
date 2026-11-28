import { Home } from "@/components/site/home/home";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return seoMeta({
    title: "Web design agency: see first, then pay | HOPI",
    description: `Web design agency for the Netherlands and Belgium. Website, online shop or web application: you see a free design first. Websites from ${prices.from}.`,
    path: "/en",
  });
}

export default async function HomePage() {
  return <Home data={await getSiteData()} lang="en" />;
}
