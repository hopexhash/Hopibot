import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inline copy with [links](/pad), **bold**, *emphasis* and {price} placeholders. Site copy
 * lives in data files (src/lib/site), so pages stay free of hardcoded amounts and markup.
 */
export function rich(text: string, vars: Record<string, string> = {}): ReactNode[] {
  const t = text.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m);
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let i = 0;
  for (let m = re.exec(t); m; m = re.exec(t)) {
    if (m.index > last) out.push(t.slice(last, m.index));
    if (m[1]) out.push(m[2].startsWith("/") ? <Link key={i++} href={m[2]}>{m[1]}</Link> : <a key={i++} href={m[2]} rel="noopener noreferrer">{m[1]}</a>);
    else if (m[3]) out.push(<strong key={i++}>{m[3]}</strong>);
    else out.push(<em key={i++}>{m[4]}</em>);
    last = re.lastIndex;
  }
  if (last < t.length) out.push(t.slice(last));
  return out;
}

const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Headings of an article body, for the table of contents. */
export function headings(body: string) {
  return body.split("\n").filter((l) => l.startsWith("## ")).map((l) => ({ text: l.slice(3).trim(), id: slug(l.slice(3)) }));
}

/** Article body: ## h2, ### h3, - lists, | tables (first row is the header), > note. */
export function Markdown({ body, vars }: { body: string; vars: Record<string, string> }) {
  const lines = body.split("\n");
  const out: ReactNode[] = [];
  let k = 0;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l) continue;
    if (l.startsWith("## ")) out.push(<h2 key={k++} id={slug(l.slice(3))}>{rich(l.slice(3), vars)}</h2>);
    else if (l.startsWith("### ")) out.push(<h3 key={k++}>{rich(l.slice(4), vars)}</h3>);
    else if (l.startsWith("> ")) out.push(<p key={k++} className="callout">{rich(l.slice(2), vars)}</p>);
    else if (l.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) items.push(lines[i++].trim().slice(2));
      i--;
      out.push(<ul key={k++}>{items.map((it, j) => <li key={j}>{rich(it, vars)}</li>)}</ul>);
    } else if (l.startsWith("| ")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("| ")) rows.push(lines[i++].trim().replace(/^\|\s*|\s*\|$/g, "").split(" | ").map((c) => c.trim()));
      i--;
      const [head, ...rest] = rows;
      out.push(
        <div key={k++} className="table-wrap">
          <table>
            <thead>
              <tr>{head.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
            </thead>
            <tbody>
              {rest.map((r, j) => (
                <tr key={j}>{r.map((c, n) => (n === 0 ? <th key={n} scope="row">{rich(c, vars)}</th> : <td key={n}>{rich(c, vars)}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    } else out.push(<p key={k++}>{rich(l, vars)}</p>);
  }
  return <>{out}</>;
}
