import type { Metadata } from "next";
import { NotFoundView } from "@/components/site/not-found-view";

export const metadata: Metadata = { title: "Pagina niet gevonden | HOPI", robots: { index: false, follow: true } };

/** The 404 for every URL that matches no route (it renders without any layout). */
export default function GlobalNotFound() {
  return (
    <html lang="nl">
      <body style={{ margin: 0 }}>
        <NotFoundView />
      </body>
    </html>
  );
}
