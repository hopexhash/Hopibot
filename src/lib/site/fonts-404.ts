import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

/**
 * The typefaces of the website (see fonts.ts) for the "page not found" view, without
 * preloading. Every route carries a not-found boundary, the demo websites too, and Next.js
 * preloads the fonts of every font module a route imports. With the normal module, visitors
 * of a demo would download HOPI's fonts before the demo's own. The files are the same, so a
 * visitor of the website who hits a 404 already has them.
 */
const display = Space_Grotesk({ variable: "--f-display", subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", preload: false });
const body = localFont({ src: "../../fonts/GeneralSans-Variable.woff2", variable: "--f-body", weight: "200 700", style: "normal", display: "swap", preload: false });
const mono = IBM_Plex_Mono({ variable: "--f-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap", preload: false });
const zero = localFont({ src: "../../fonts/PlexSansZero.woff2", variable: "--f-zero", weight: "400 500", style: "normal", display: "swap", preload: false, declarations: [{ prop: "unicode-range", value: "U+0030" }] });

export const NOT_FOUND_FONT_VARIABLES = `${display.variable} ${body.variable} ${mono.variable} ${zero.variable}`;
