import { NOT_FOUND_FONT_VARIABLES } from "@/lib/site/fonts-404";
import { NotFoundStageLazy } from "./not-found-lazy";

/**
 * "Page not found" for everyone. It brings its own typefaces and stylesheet, so it looks the
 * same inside the website, inside the control room and on its own (an address that matches
 * no route renders it without any layout). Visitors who ask for a control-room address
 * without being signed in see exactly this page.
 */
export function NotFoundView() {
  return (
    <div className={`nf ${NOT_FOUND_FONT_VARIABLES}`}>
      <NotFoundStageLazy />
    </div>
  );
}
