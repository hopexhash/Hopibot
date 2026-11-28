import { notFound } from "next/navigation";
import { LandingPage, landingMetadata } from "@/components/site/landing-page";
import { ALL_LANDINGS_EN } from "@/lib/site/landing.en";

const landing = ALL_LANDINGS_EN.find((l) => l.path === "/en/website-redesign");

export const generateMetadata = async () => (landing ? landingMetadata(landing) : {});

export default function Page() {
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
