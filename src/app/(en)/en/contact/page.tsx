import { ContactPage, contactMetadata } from "@/components/site/pages/contact";

export const generateMetadata = () => contactMetadata("en");

export default function Page() {
  return <ContactPage lang="en" />;
}
