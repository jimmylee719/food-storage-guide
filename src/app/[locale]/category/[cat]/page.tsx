import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import FoodTable from '@/components/FoodTable';
import AdSlot from '@/components/AdSlot';
import { CATEGORIES, LOCALES, type Category, type Locale, isLocale, t } from '@/lib/i18n';
import { foodsInCategory } from '@/lib/data';
import { buildMetadata, jsonLdScript } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CATEGORIES.map((cat) => ({ locale, cat })));
}

function isCategory(v: string): v is Category {
  return (CATEGORIES as readonly string[]).includes(v);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; cat: string }> }): Promise<Metadata> {
  const { locale, cat } = await params;
  if (!isLocale(locale) || !isCategory(cat)) return {};
  const d = t(locale);
  const name = d.categoryNames[cat];
  const items = foodsInCategory(cat);
  // CJK titles read better without the colon separator.
  const cjk = locale === 'zh' || (locale as string) === 'ja';
  const title = cjk ? `${name}${d.categoryTitleSuffix}` : `${name}: ${d.categoryTitleSuffix}`;
  const description = d.categoryDescLead(items.length, name);
  return buildMetadata({ title, description, path: `/category/${cat}`, locale });
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; cat: string }> }) {
  const { locale, cat } = await params;
  if (!isLocale(locale) || !isCategory(cat)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const name = d.categoryNames[cat];
  const items = foodsInCategory(cat).sort((a, b) => a.names[l].localeCompare(b.names[l], l));
  if (!items.length) notFound();
  // Every food has a page now, so the list schema covers the whole category.
  const detailed = items;

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: detailed.length,
    itemListElement: detailed.slice(0, 100).map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: f.names[l],
      url: absoluteUrl(`/${l}/food/${f.slug}`),
    })),
  };

  const others = CATEGORIES.filter((c) => c !== cat);

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ name: d.home, href: `/${l}` }, { name: d.allFoods, href: `/${l}/foods` }, { name }]} />
      <h1>{name}</h1>
      <p className="hero-lead">{d.itemsCount(items.length)}</p>

      <FoodTable items={items} locale={l} />

      <AdSlot label="Advertisement" />

      {detailed.length > 0 && (
        <section>
          <div className="section-head"><h2>{d.detailPageCta}</h2></div>
          <div className="grid grid-cards">
            {detailed.slice(0, 24).map((f) => (
              <Link key={f.slug} href={`/${l}/food/${f.slug}`} className="card">
                <h3>{f.names[l]}</h3>
                <p>{f.content?.[l]?.summary?.slice(0, 90)}…</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="section-head"><h2>{d.categories}</h2></div>
        <ul className="chip-row">
          {others.map((c) => (
            <li key={c}><Link className="pill" href={`/${l}/category/${c}`}>{d.categoryNames[c]}</Link></li>
          ))}
        </ul>
      </section>

      <p className="footer-note">{d.sourceNote}</p>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(ld)} />
    </div>
  );
}
