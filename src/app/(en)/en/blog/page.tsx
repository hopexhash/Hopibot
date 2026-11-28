import { BlogIndexPage, blogIndexMetadata } from "@/components/site/pages/blog-index";

export const generateMetadata = () => blogIndexMetadata("en");

export default function Page() {
  return <BlogIndexPage lang="en" />;
}
