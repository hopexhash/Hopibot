import { HomeC } from "@/components/site/home/direction-c";
import { pageMeta } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return pageMeta({
    title: "HOPI | Jouw nieuwe website. Eerst zien, dan betalen",
    description: `Webdesignbureau voor ondernemers in Nederland en België. Je ziet eerst gratis een ontwerp van je website en betaalt pas als het bevalt. Vanaf ${prices.from}.`,
    path: "/",
  });
}

/**
 * The homepage is design direction C ("Podium"). The other two directions stay viewable on
 * /ontwerp/a and /ontwerp/b; swapping the component here switches the homepage.
 */
export default async function HomePage() {
  return <HomeC data={await getSiteData()} />;
}
