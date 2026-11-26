import { Home } from "@/components/site/home/home";
import { pageMeta } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return pageMeta({
    title: "HOPI | Webdesign bureau: website laten maken die blijft hangen",
    description: `Webdesign bureau voor Nederland en België. Website, webshop of webapplicatie laten maken: je ziet eerst gratis een ontwerp. Websites vanaf ${prices.from}.`,
    path: "/",
  });
}

export default async function HomePage() {
  return <Home data={await getSiteData()} />;
}
