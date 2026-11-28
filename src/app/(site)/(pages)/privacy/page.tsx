import { PrivacyPage, privacyMetadata } from "@/components/site/pages/privacy";

export const generateMetadata = () => privacyMetadata("nl");

export default function Page() {
  return <PrivacyPage lang="nl" />;
}
