import { PricingPage, pricingMetadata } from "@/components/site/pages/pricing";

export const generateMetadata = () => pricingMetadata("nl");

export default function Page() {
  return <PricingPage lang="nl" />;
}
