import { LandingPage, landingMetadata } from "@/components/site/landing-page";
import { PILLAR } from "@/lib/site/landing";

export const generateMetadata = () => landingMetadata(PILLAR);

export default function Page() {
  return <LandingPage landing={PILLAR} />;
}
