import Link from "next/link";
import { notFound } from "next/navigation";
import { Geist, Manrope, Sora, Space_Grotesk } from "next/font/google";
import { HomeA } from "@/components/site/home/direction-a";
import { HomeB } from "@/components/site/home/direction-b";
import { HomeC } from "@/components/site/home/direction-c";
import { getSiteData } from "@/server/site";

/**
 * The homepage design directions side by side, for the owner to compare. Not linked from the
 * website, not in the sitemap and not indexable. The chosen direction is what "/" shows.
 */
const grotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const geist = Geist({ variable: "--font-text", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const manrope = Manrope({ variable: "--font-text", subsets: ["latin"], display: "swap" });

const DIRECTIONS = {
  a: { name: "Atelier", Component: HomeA, fontClass: `${sora.variable} ${manrope.variable}` },
  b: { name: "Nachtlicht", Component: HomeB, fontClass: `${grotesk.variable} ${geist.variable}` },
  c: { name: "Podium", Component: HomeC, fontClass: "" },
} as const;
type Dir = keyof typeof DIRECTIONS;

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(DIRECTIONS).map((dir) => ({ dir }));

export async function generateMetadata({ params }: { params: Promise<{ dir: string }> }) {
  const d = DIRECTIONS[(await params).dir as Dir];
  return { title: d ? `Ontwerprichting ${d.name}` : "Ontwerprichting", robots: { index: false, follow: false } };
}

export default async function DirectionPage({ params }: { params: Promise<{ dir: string }> }) {
  const key = (await params).dir as Dir;
  const d = DIRECTIONS[key];
  if (!d) notFound();
  const data = await getSiteData();
  return (
    <>
      <d.Component data={data} fontClass={d.fontClass} />
      <nav className="dir-switch" aria-label="Ontwerprichtingen">
        <span>Ontwerp</span>
        {(Object.keys(DIRECTIONS) as Dir[]).map((k) => (
          <Link key={k} href={`/ontwerp/${k}`} aria-current={k === key ? "true" : undefined} title={DIRECTIONS[k].name}>
            {k.toUpperCase()}
          </Link>
        ))}
      </nav>
    </>
  );
}
