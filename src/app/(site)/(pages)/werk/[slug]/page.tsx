import { notFound } from "next/navigation";
import { WorkProjectPage, findProject, workProjectMetadata } from "@/components/site/pages/work-project";
import { PROJECTS } from "@/lib/site/projects";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.key }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = findProject((await params).slug, "nl");
  return p ? workProjectMetadata(p, "nl") : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = findProject((await params).slug, "nl");
  if (!p) notFound();
  return <WorkProjectPage project={p} lang="nl" />;
}
