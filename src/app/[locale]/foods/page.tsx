import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBox from '@/components/SearchBox';
import FoodTable from '@/components/FoodTable';
import { CATEGORIES, type Locale, isLocale, t } from '@/lib/i18n';
import { foodsInCategory } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return buildMetadata({
    title: `${d.allFoods} — ${d.tagline}`,
    description: d.siteDescription,
    path: '/foods',
    locale,
  });
}

export default async function FoodsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ name: d.home, href: `/${l}` }, { name: d.allFoods }]} />
      <h1>{d.allFoods}</h1>
      <p className="hero-lead">{d.heroLead}</p>
      <SearchBox locale={l} />

      <ul className="chip-row">
        {CATEGORIES.map((c) => (
          <li key={c}><a className="pill" href={`#${c}`}>{d.categoryNames[c]}</a></li>
        ))}
      </ul>

      {CATEGORIES.map((c) => {
        const items = foodsInCategory(c).sort((a, b) => a.names[l].localeCompare(b.names[l], l));
        if (!items.length) return null;
        return (
          <section key={c} id={c}>
            <div className="section-head">
              <h2>{d.categoryNames[c]}</h2>
              <Link href={`/${l}/category/${c}`}>{d.itemsCount(items.length)} →</Link>
            </div>
            <FoodTable items={items} locale={l} />
          </section>
        );
      })}

      <p className="footer-note">{d.sourceNote}</p>
    </div>
  );
}
