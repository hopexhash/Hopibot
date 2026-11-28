import { ContactPage, contactMetadata } from "@/components/site/pages/contact";

export const generateMetadata = () => contactMetadata("nl");

export default function Page() {
  return <ContactPage lang="nl" />;
}
