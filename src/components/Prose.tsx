import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { getFood, getGuide } from '@/lib/data';

/**
 * Minimal, dependency-free renderer for the restricted Markdown used in guide
 * bodies: paragraphs, bullet/numbered lists, pipe tables, **bold**, and the
 * internal link syntax [[food:slug]] / [[guide:slug]].
 */

function inline(text: string, locale: Locale, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\[\[(food|guide):([a-z0-9-]+)\]\]|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] === 'food') {
      const food = getFood(m[2]);
      if (food && food.hasPage) {
        out.push(<Link key={`${keyBase}-${i}`} href={`/${locale}/food/${food.slug}`}>{food.names[locale]}</Link>);
      } else if (food) {
        out.push(food.names[locale]);
      }
    } else if (m[1] === 'guide') {
      const guide = getGuide(m[2]);
      if (guide) {
        out.push(<Link key={`${keyBase}-${i}`} href={`/${locale}/guides/${guide.slug}`}>{guide[locale].title}</Link>);
      }
    } else if (m[3]) {
      out.push(<strong key={`${keyBase}-${i}`}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function splitRow(line: string): string[] {
  return line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
}

export default function Prose({ body, locale }: { body: string; locale: Locale }) {
  const lines = body.split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    // table
    if (/^\s*\|/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '')) {
      const header = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(splitRow(lines[i])); i++; }
      blocks.push(
        <div className="table-scroll" key={key++}>
          <table>
            <thead><tr>{header.map((h, hi) => <th key={hi} scope="col">{inline(h, locale, `h${hi}`)}</th>)}</tr></thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, ci) => <td key={ci}>{inline(c, locale, `c${ri}-${ci}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    // unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s+/, '')); i++; }
      blocks.push(<ul key={key++}>{items.map((it, ii) => <li key={ii}>{inline(it, locale, `u${ii}`)}</li>)}</ul>);
      continue;
    }

    // ordered list
    if (/^\s*\d+[.)]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+[.)]\s+/, '')); i++; }
      blocks.push(<ol key={key++}>{items.map((it, ii) => <li key={ii}>{inline(it, locale, `o${ii}`)}</li>)}</ol>);
      continue;
    }

    // paragraph (join consecutive non-empty, non-block lines)
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^\s*([-*]|\d+[.)])\s+/.test(lines[i]) && !/^\s*\|/.test(lines[i])) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push(<p key={key++}>{inline(para.join(' '), locale, `p${key}`)}</p>);
  }

  return <Fragment>{blocks}</Fragment>;
}
