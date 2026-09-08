import Link from 'next/link';
import { jsonLdScript } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export type Crumb = { name: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        {items.map((c, i) => (
          <span key={i}>
            {i > 0 && <span aria-hidden="true"> / </span>}
            {c.href ? <Link href={c.href}>{c.name}</Link> : <span>{c.name}</span>}
          </span>
        ))}
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(ld)} />
    </>
  );
}
