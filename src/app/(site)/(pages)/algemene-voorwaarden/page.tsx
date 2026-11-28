import { TermsPage, termsMetadata } from "@/components/site/pages/terms";

export const generateMetadata = () => termsMetadata("nl");

export default function Page() {
  return <TermsPage lang="nl" />;
}
