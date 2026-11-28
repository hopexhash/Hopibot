import { notFound } from "next/navigation";
import { LandingPage, landingMetadata } from "@/components/site/landing-page";
import { LANDINGS_EN } from "@/lib/site/landing.en";

const PREFIX = "/en/website-design/";
const find = (slug: string) => LANDINGS_EN.find((l) => l.path === PREFIX + slug);

// Only the pages we have written exist; any other address under here is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => LANDINGS_EN.filter((l) => l.path.startsWith(PREFIX)).map((l) => ({ slug: l.path.slice(PREFIX.length) }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const landing = find((await params).slug);
  return landing ? landingMetadata(landing) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const landing = find((await params).slug);
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
