import { CookiesPage, cookiesMetadata } from "@/components/site/pages/cookies";

export const generateMetadata = () => cookiesMetadata("en");

export default function Page() {
  return <CookiesPage lang="en" />;
}
