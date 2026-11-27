import { FONT_VARIABLES } from "@/lib/site/fonts";
import { NotFoundStage } from "./not-found-stage";
import "./not-found.css";

/**
 * "Page not found" for everyone. It brings its own typefaces and stylesheet, so it looks the
 * same inside the website, inside the control room and on its own (an address that matches
 * no route renders it without any layout). Visitors who ask for a control-room address
 * without being signed in see exactly this page.
 */
export function NotFoundView() {
  return (
    <div className={`nf ${FONT_VARIABLES}`}>
      <NotFoundStage />
    </div>
  );
}
