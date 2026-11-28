import { PrivacyPage, privacyMetadata } from "@/components/site/pages/privacy";

export const generateMetadata = () => privacyMetadata("en");

export default function Page() {
  return <PrivacyPage lang="en" />;
}
