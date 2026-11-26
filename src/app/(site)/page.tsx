import { Geist } from "next/font/google";
import { Home } from "@/components/site/home/home";
import { pageMeta } from "@/lib/site/seo";
import { getSiteData } from "@/server/site";

// The homepage keeps Geist (a variable font: its weight can animate). Declared here so only
// this page loads it; the other pages are set in Poppins (see (pages)/layout.tsx).
const geist = Geist({ subsets: ["latin"], display: "swap" });

export async function generateMetadata() {
  const { prices } = await getSiteData();
  return pageMeta({
    title: "HOPI | Webdesign bureau: website laten maken die blijft hangen",
    description: `Webdesign bureau voor Nederland en België. Website, webshop of webapplicatie laten maken: je ziet eerst gratis een ontwerp. Websites vanaf ${prices.from}.`,
    path: "/",
  });
}

export default async function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `.hopi.v3{--font-ui:${geist.style.fontFamily}}` }} />
      <Home data={await getSiteData()} />
    </>
  );
}
