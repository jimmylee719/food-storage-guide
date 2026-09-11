import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBox from '@/components/SearchBox';
import { CATEGORIES, type Locale, isLocale, t } from '@/lib/i18n';
import { categoryCounts, foods, foodsInCategory, headline } from '@/lib/data';
import { CATEGORY_ICON } from '@/lib/icons';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return buildMetadata({
    title: `${d.allFoods} — ${d.tagline}`,
    description: d.allFoodsDescription,
    path: '/foods',
    locale,
  });
}

export default async function FoodsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const counts = categoryCounts();

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ name: d.home, href: `/${l}` }, { name: d.allFoods }]} />
      <h1>{d.allFoods}</h1>
      <p className="hero-lead">{d.itemsCount(foods.length)}</p>
      <SearchBox locale={l} />

      <section>
        <div className="section-head"><h2>{d.browseByCategory}</h2></div>
        <div className="grid grid-cats">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/${l}/category/${c}`} className="card cat-card" data-cat={c}>
              <span className="cat-icon" aria-hidden="true">{CATEGORY_ICON[c]}</span>
              <span className="cat-card-text">
                <h3>{d.categoryNames[c]}</h3>
                <p>{d.itemsCount(counts[c] ?? 0)}</p>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {CATEGORIES.map((c) => {
        const items = foodsInCategory(c).sort((a, b) => a.names[l].localeCompare(b.names[l], l));
        if (!items.length) return null;
        return (
          <section key={c} id={c}>
            <div className="section-head">
              <h2>{d.categoryNames[c]}</h2>
              <Link href={`/${l}/category/${c}`}>{d.pantry} · {d.fridge} · {d.freezer} →</Link>
            </div>
            <ul className="food-tiles" data-cat={c}>
              {items.map((f) => (
                <li key={f.slug}>
                  <Link href={`/${l}/food/${f.slug}`} className="food-tile">
                    <span className="food-tile-icon" aria-hidden="true">{CATEGORY_ICON[c]}</span>
                    <span className="food-tile-name">{f.names[l]}</span>
                    <span className="food-tile-time">{headline(f, 'fridge', l)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <p className="footer-note">{d.sourceNote}</p>
    </div>
  );
}
