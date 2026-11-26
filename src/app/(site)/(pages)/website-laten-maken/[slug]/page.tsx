import { notFound } from "next/navigation";
import { LandingPage, landingMetadata } from "@/components/site/landing-page";
import { LANDINGS } from "@/lib/site/landing";

const PREFIX = "/website-laten-maken/";
const find = (slug: string) => LANDINGS.find((l) => l.path === PREFIX + slug);

// Only the pages we have written exist; any other address under here is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => LANDINGS.filter((l) => l.path.startsWith(PREFIX)).map((l) => ({ slug: l.path.slice(PREFIX.length) }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const landing = find((await params).slug);
  return landing ? landingMetadata(landing) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const landing = find((await params).slug);
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
