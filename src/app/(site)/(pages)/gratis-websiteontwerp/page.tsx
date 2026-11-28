import { notFound } from "next/navigation";
import { LandingPage, landingMetadata } from "@/components/site/landing-page";
import { landingByPath } from "@/lib/site/landing";

const landing = landingByPath("/gratis-websiteontwerp");

export const generateMetadata = async () => (landing ? landingMetadata(landing) : {});

export default function Page() {
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
