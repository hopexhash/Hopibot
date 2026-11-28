import { AboutPage, aboutMetadata } from "@/components/site/pages/about";

export const generateMetadata = () => aboutMetadata("en");

export default function Page() {
  return <AboutPage lang="en" />;
}
