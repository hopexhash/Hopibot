import { Check, Gauge, Lock } from "lucide-react";
import "./care-visual.css";

const STATUS = [
  ["Website", "Online"],
  ["SSL-beveiliging", "Actief"],
  ["Dagelijkse back-ups", "Actief"],
  ["Beveiliging", "Beschermd"],
  ["Updates", "Bijgewerkt"],
] as const;

/**
 * Hero visual of the maintenance page: a website in a browser window with the things HOPI
 * looks after around it. It is an illustration drawn in HTML and CSS (no image, no device
 * mock-up); screen readers get one sentence that says so instead of the loose labels.
 */
export function CareVisual() {
  return (
    <div className="hero-visual care" role="img" aria-label="Illustratie van HOPI Website Care: de website is online, SSL-beveiliging en dagelijkse back-ups zijn actief, de website is beveiligd en bijgewerkt.">
      <div className="care-browser" aria-hidden="true">
        <div className="care-bar">
          <i />
          <i />
          <i />
          <span>
            <Lock strokeWidth={2.4} /> jouwbedrijf.nl
          </span>
        </div>
        <div className="care-site">
          <div className="cs-nav">
            <span className="cs-logo">
              <i /> Jouw Bedrijf
            </span>
            <span className="cs-links">
              <b>Diensten</b>
              <b>Projecten</b>
              <b>Over ons</b>
              <b>Contact</b>
            </span>
            <span className="cs-btn">Offerte aanvragen</span>
          </div>
          <div className="cs-hero">
            <div>
              <span className="cs-kicker">Vakmanschap uit de regio</span>
              <p className="cs-h">
                Vakwerk waar je op kunt <em>bouwen.</em>
              </p>
              <p className="cs-p">Van eerste advies tot oplevering. Persoonlijk, helder en met oog voor detail.</p>
              <span className="cs-cta">
                <b>Plan een afspraak</b>
                <i>Bekijk projecten</i>
              </span>
            </div>
            <div className="cs-art">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="cs-cards">
            {["Advies", "Uitvoering", "Onderhoud"].map((c) => (
              <span key={c}>
                <i />
                <b>{c}</b>
                <small />
                <small />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="care-card care-score" aria-hidden="true">
        <div className="care-ring">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="27" />
            <circle cx="32" cy="32" r="27" pathLength="100" />
          </svg>
          <Gauge strokeWidth={2.2} />
        </div>
        <p>
          Website performance
          <b>
            <span className="care-num" />
            <small>/100</small>
          </b>
        </p>
      </div>

      <div className="care-card care-status" aria-hidden="true">
        <p className="care-title">Website status</p>
        <ul>
          {STATUS.map(([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <b>
                <i /> {value}
              </b>
            </li>
          ))}
        </ul>
      </div>

      <div className="care-card care-note" aria-hidden="true">
        <span>
          <Check strokeWidth={3} />
        </span>
        <p>
          <b>Website bijgewerkt</b>
          Alle systemen werken optimaal.
        </p>
      </div>
    </div>
  );
}
