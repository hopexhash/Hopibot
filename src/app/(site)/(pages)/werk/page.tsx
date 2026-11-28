import { WorkIndexPage, workIndexMetadata } from "@/components/site/pages/work-index";

export const generateMetadata = () => workIndexMetadata("nl");

export default function Page() {
  return <WorkIndexPage lang="nl" />;
}
