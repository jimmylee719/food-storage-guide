'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type Locale, t } from '@/lib/i18n';
import type { SearchEntry } from '@/lib/types';

type Props = { locale: Locale; autoFocus?: boolean };

export default function SearchBox({ locale, autoFocus }: Props) {
  const d = t(locale);
  const router = useRouter();
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let cancelled = false;
    if (index) return;
    fetch(`/search/${locale}.json`)
      .then((r) => r.json())
      .then((data: SearchEntry[]) => { if (!cancelled) setIndex(data); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [index, locale]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !index) return [];
    const starts: SearchEntry[] = [];
    const contains: SearchEntry[] = [];
    const alias: SearchEntry[] = [];
    for (const e of index) {
      const n = e.n.toLowerCase();
      if (n.startsWith(q)) starts.push(e);
      else if (n.includes(q)) contains.push(e);
      else if (e.k.includes(q)) alias.push(e);
      if (starts.length > 40) break;
    }
    const rank = (a: SearchEntry, b: SearchEntry) => b.p - a.p || a.n.length - b.n.length;
    return [...starts.sort(rank), ...contains.sort(rank), ...alias.sort(rank)].slice(0, 12);
  }, [query, index]);

  useEffect(() => { setActive(0); }, [query]);

  function go(entry: SearchEntry) {
    setOpen(false);
    router.push(`/${locale}/food/${entry.s}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!hits.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => (i + 1) % hits.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((i) => (i - 1 + hits.length) % hits.length); }
    else if (e.key === 'Enter') { e.preventDefault(); go(hits[active]); }
    else if (e.key === 'Escape') setOpen(false);
  }

  function submit() {
    if (hits.length) { go(hits[active] ?? hits[0]); return; }
    // No match yet — send them somewhere useful rather than nowhere.
    if (query.trim()) router.push(`/${locale}/foods`);
  }

  return (
    <form
      className="search"
      ref={boxRef}
      role="search"
      onSubmit={(e) => { e.preventDefault(); submit(); }}
    >
      <input
        className="search-input"
        type="search"
        role="combobox"
        aria-expanded={open && hits.length > 0}
        aria-controls="search-results"
        aria-label={d.searchLabel}
        placeholder={d.searchPlaceholder}
        value={query}
        autoFocus={autoFocus}
        onFocus={() => setOpen(true)}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onKeyDown={onKeyDown}
        enterKeyHint="search"
      />
      <button className="search-go" type="submit" aria-label={d.searchLabel}>
        <span className="search-go-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
        </span>
        <span className="search-go-label">{d.searchLabel}</span>
      </button>
      {open && query.trim() && (
        <div className="search-results" id="search-results" role="listbox">
          {hits.length === 0 ? (
            <p className="search-empty">{index ? d.noResults : '…'}</p>
          ) : (
            hits.map((h, i) => (
              <Link
                key={h.s}
                className="search-hit"
                role="option"
                aria-selected={i === active}
                data-active={i === active}
                href={h.p ? `/${locale}/food/${h.s}` : `/${locale}/category/${h.c}#${h.s}`}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setActive(i)}
              >
                <span>{h.n}</span>
                <span className="cat">{d.categoryNames[h.c as keyof typeof d.categoryNames] ?? h.c}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </form>
  );
}
