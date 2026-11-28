import { TermsPage, termsMetadata } from "@/components/site/pages/terms";

export const generateMetadata = () => termsMetadata("en");

export default function Page() {
  return <TermsPage lang="en" />;
}
