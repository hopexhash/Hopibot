import { Home } from "@/components/site/home/home";
import { seoMeta } from "@/lib/site/seo-meta";
import { getSiteData } from "@/server/site";

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return seoMeta({
    title: "Website laten maken? Bekijk eerst je gratis ontwerp | HOPI",
    description: `Een professionele website laten maken? Bij HOPI zie je eerst gratis jouw websiteontwerp. Tevreden? Dan betaal je pas. Websites vanaf ${prices.from} voor ondernemers in Nederland en België.`,
    path: "/",
  });
}

export default async function HomePage() {
  return <Home data={await getSiteData()} />;
}
