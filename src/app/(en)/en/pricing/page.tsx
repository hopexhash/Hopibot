import { PricingPage, pricingMetadata } from "@/components/site/pages/pricing";

export const generateMetadata = () => pricingMetadata("en");

export default function Page() {
  return <PricingPage lang="en" />;
}
