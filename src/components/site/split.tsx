import { Fragment, type CSSProperties } from "react";

/**
 * Text cut into pieces for the motion system, on the server, so the markup never changes
 * after load. Words stay real words (search engines and screen readers read them normally).
 * Letters are for display lines only: the line is given once as hidden text for screen
 * readers and the letter pieces are hidden from them.
 */
export function Words({ text, from = 0, total }: { text: string; from?: number; total?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className="wi" style={{ "--i": from + i, "--n": total ?? words.length } as CSSProperties}>
              {w}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}

export function CharLines({ lines, accentLast = false }: { lines: readonly string[]; accentLast?: boolean }) {
  let n = 0;
  return (
    <>
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, li) => (
        <span key={li} className={`l${accentLast && li === lines.length - 1 ? " l-accent" : ""}`} aria-hidden="true">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="cw">
              {[...word].map((ch, ci) => (
                <span key={ci} className="c" style={{ "--i": n++ } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
