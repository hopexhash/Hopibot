import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

/**
 * The three typefaces of the public website. Each is handed to the stylesheets as a variable
 * (see the type tokens at the top of v3.css):
 *   Space Grotesk  headings and everything set large            --f-display
 *   General Sans   text (variable, so weights such as 450 exist) --f-body
 *   IBM Plex Mono  small uppercase labels and numbers            --f-mono
 * Put `FONT_VARIABLES` on the element that needs them: the body of the website, and the
 * "page not found" view, which also renders outside every layout.
 */
const display = Space_Grotesk({ variable: "--f-display", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap" });
const body = localFont({ src: "../../fonts/GeneralSans-Variable.woff2", variable: "--f-body", weight: "200 700", style: "normal", display: "swap" });
const mono = IBM_Plex_Mono({ variable: "--f-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });

export const FONT_VARIABLES = `${display.variable} ${body.variable} ${mono.variable}`;
