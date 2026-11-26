import { NotFoundView } from "@/components/site/not-found-view";

export const metadata = { title: "Pagina niet gevonden", robots: { index: false, follow: true } };

export default function NotFound() {
  return <NotFoundView />;
}
