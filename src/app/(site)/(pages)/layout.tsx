import { Poppins } from "next/font/google";

// Every public page except the homepage is set in Poppins. Declared here, not in the site
// layout, so the homepage does not load it and these pages do not load the homepage's Geist.
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

/**
 * The typeface is handed to the shared stylesheet as a variable on the body, and the
 * display sizes are tuned for it (Poppins runs wider than Geist and has no variable weight).
 * It is a style element, not a stylesheet import, so it goes away again on the homepage.
 */
const CSS = `
.hopi.v3{--font-ui:${poppins.style.fontFamily};letter-spacing:0}
.hopi.v3 .disp{font-size:clamp(36px,7.2vw,128px);letter-spacing:-.042em;line-height:.94}
.hopi.v3 .hero h1,.hopi.v3 .page-hero h1{font-size:clamp(33px,5.1vw,84px);letter-spacing:-.035em;line-height:1}
.hopi.v3 .article-head h1{font-size:clamp(30px,4.4vw,68px);letter-spacing:-.03em;line-height:1.04}
.hopi.v3 .section-head h2,.hopi.v3 .h2{font-size:clamp(30px,4.5vw,70px);letter-spacing:-.035em;line-height:1.02}
.hopi.v3 .contact-copy .h2{font-size:clamp(34px,5.4vw,88px);letter-spacing:-.04em;line-height:.96}
.hopi.v3 .band h2{font-size:clamp(32px,6vw,100px);letter-spacing:-.04em;line-height:.96}
.hopi.v3 h3{letter-spacing:-.02em}
.hopi.v3 .mn-link{font-size:clamp(38px,min(9vw,calc(var(--vh0,100vh)*.115)),128px);letter-spacing:-.04em}
.hopi.v3 .ft-band span{letter-spacing:-.045em}
.hopi.v3 .ft-close h2{font-size:clamp(31px,4.8vw,80px);letter-spacing:-.035em;line-height:1.04}
.hopi.v3 .ft-logo{letter-spacing:-.04em}
.hopi.v3 .nv-logo{letter-spacing:-.04em}
.hopi.v3 .wk-row h2{font-size:clamp(27px,4.8vw,84px);font-weight:600;letter-spacing:-.04em;line-height:1}
.hopi.v3 .wk-row:hover h2{font-weight:700}
.hopi.v3 .pj-sum{font-size:clamp(24px,3.2vw,52px);letter-spacing:-.03em;line-height:1.12}
.hopi.v3 .pj-dec h2{letter-spacing:-.03em}
.hopi.v3 .pt b{letter-spacing:-.04em}
.hopi.v3 .price .amount b{letter-spacing:-.04em}
`;

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </>
  );
}
