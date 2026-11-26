"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { demoHref } from "@/lib/site/work";
import { track } from "../site-client";
import type { PortfolioItem } from "./shared";

/**
 * Interactive portfolio: choose an industry, see its demo. The same component serves two
 * directions ("tabs": chips above a wide stage; "list": a large list beside a sticky stage).
 * All previews are in the HTML, so the content is there without JavaScript; the script only
 * decides which one is in front.
 */
export function PortfolioExplorer({ items, variant }: { items: PortfolioItem[]; variant: "tabs" | "list" }) {
  const [active, setActive] = useState(0);
  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    track("portfolio_click", { label: items[i].work.key, location: "explorer" });
  };
  return (
    <div className={`px px-${variant}`}>
      <div className="px-nav" role="tablist" aria-label="Branches">
        {items.map((it, i) => (
          <button
            key={it.work.key}
            type="button"
            role="tab"
            id={`px-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`px-panel-${i}`}
            className="px-tab"
            onClick={() => pick(i)}
            // With a mouse, pointing is enough in the list layout.
            onPointerEnter={variant === "list" ? (e) => e.pointerType === "mouse" && pick(i) : undefined}
          >
            <span className="px-num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="px-cat">{it.category}</span>
            <span className="px-name">{it.work.name}</span>
          </button>
        ))}
      </div>
      <div className="px-stage">
        {items.map((it, i) => (
          <div key={it.work.key} role="tabpanel" id={`px-panel-${i}`} aria-labelledby={`px-tab-${i}`} className="px-panel" data-active={i === active} hidden={i !== active}>
            <a className="frame scroll-frame" href={demoHref(it.work.key)} target="_blank" rel="noopener nofollow" aria-label={`Demo-ontwerp ${it.work.name}: bekijk de live demo (opent in een nieuw tabblad)`} data-track="portfolio_click" data-track-label={it.work.key}>
              <div className="frame-bar" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>Demo-ontwerp · {it.work.name}</span>
              </div>
              <div className="scroll-view">
                <img src={`/site/work/${it.work.key}-tall-960.webp`} alt={`Demo-ontwerp: de website van ${it.work.name}`} width={960} height={1800} loading="lazy" decoding="async" />
              </div>
            </a>
            <div className="px-info">
              <div>
                <p className="px-kicker">
                  {it.category} · {it.work.type}
                </p>
                <h3>{it.work.name}</h3>
                <p>{it.work.note}</p>
              </div>
              <div className="px-links">
                <a href={demoHref(it.work.key)} target="_blank" rel="noopener nofollow" className="btn btn-dark" data-track="portfolio_click" data-track-label={it.work.key}>
                  Bekijk live demo <ArrowUpRight aria-hidden="true" />
                </a>
                <Link href={it.industry} className="btn btn-line">
                  Meer over deze branche <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
