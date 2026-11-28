import { BlogIndexPage, blogIndexMetadata } from "@/components/site/pages/blog-index";

export const generateMetadata = () => blogIndexMetadata("nl");

export default function Page() {
  return <BlogIndexPage lang="nl" />;
}
