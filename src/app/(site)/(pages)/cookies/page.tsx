import { CookiesPage, cookiesMetadata } from "@/components/site/pages/cookies";

export const generateMetadata = () => cookiesMetadata("nl");

export default function Page() {
  return <CookiesPage lang="nl" />;
}
