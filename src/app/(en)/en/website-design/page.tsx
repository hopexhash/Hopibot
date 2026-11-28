import { LandingPage, landingMetadata } from "@/components/site/landing-page";
import { PILLAR_EN } from "@/lib/site/landing.en";

export const generateMetadata = () => landingMetadata(PILLAR_EN);

export default function Page() {
  return <LandingPage landing={PILLAR_EN} />;
}
