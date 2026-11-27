import { Home } from "@/components/site/home/home";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return seoMeta({
    title: "Webdesign bureau: eerst zien, dan betalen | HOPI",
    description: `Webdesign bureau voor Nederland en België. Website, webshop of webapplicatie laten maken: je ziet eerst gratis een ontwerp. Websites vanaf ${prices.from}.`,
    path: "/",
  });
}

export default async function HomePage() {
  return <Home data={await getSiteData()} />;
}
