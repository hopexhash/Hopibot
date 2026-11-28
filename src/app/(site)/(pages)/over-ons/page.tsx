import { AboutPage, aboutMetadata } from "@/components/site/pages/about";

export const generateMetadata = () => aboutMetadata("nl");

export default function Page() {
  return <AboutPage lang="nl" />;
}
