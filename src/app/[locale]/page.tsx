import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SearchBox from '@/components/SearchBox';
import Faq from '@/components/Faq';
import { CATEGORIES, type Locale, isLocale, t } from '@/lib/i18n';
import { categoryCounts, foods, foodsWithPages, guides } from '@/lib/data';
import { buildMetadata, jsonLdScript } from '@/lib/seo';

/** One glyph per category, so the grid is scannable before it is read. */
const CATEGORY_ICON: Record<string, string> = {
  vegetables: '🥬', fruits: '🍊', meat: '🥩', poultry: '🍗', seafood: '🐟',
  'dairy-eggs': '🥛', 'grains-beans-pasta': '🌾', 'baked-goods': '🍞',
  'baking-staples': '🧁', 'condiments-sauces': '🧂', 'herbs-spices': '🌿',
  'oils-fats': '🫒', 'shelf-stable': '🥫', 'snacks-nuts-seeds': '🥜',
  beverages: '🧃', 'frozen-foods': '🧊', 'deli-prepared': '🍱',
  'vegetarian-proteins': '🫘', 'baby-food': '🍼',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    ...buildMetadata({ title: `${d.siteName} — ${d.tagline}`, description: d.siteDescription, path: '/', locale }),
    title: `${d.siteName} — ${d.tagline}`,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const counts = categoryCounts();
  const featured = guides.slice(0, 6);
  const withPages = foodsWithPages();

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.homeFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <section className="hero-banner">
        <div className="hero-banner-inner wrap">
          <h1>{d.siteName}</h1>
          <p className="hero-lead">{d.heroLead}</p>
          <SearchBox locale={l} autoFocus />
          <ul className="hero-points">
            {d.heroPoints.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </section>

      <div className="wrap">
      <section>
        <div className="section-head">
          <h2>{d.browseByCategory}</h2>
          <Link href={`/${l}/foods`}>{d.browseAll} →</Link>
        </div>
        <div className="grid grid-cats">
          {CATEGORIES.map((c) => (
            <Link key={c} href={`/${l}/category/${c}`} className="card cat-card" data-cat={c}>
              <span className="cat-icon" aria-hidden="true">{CATEGORY_ICON[c]}</span>
              <h3>{d.categoryNames[c]}</h3>
              <p>{d.itemsCount(counts[c] ?? 0)}</p>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section>
          <div className="section-head">
            <h2>{d.popularGuides}</h2>
            <Link href={`/${l}/guides`}>{d.guides} →</Link>
          </div>
          <div className="grid grid-cards">
            {featured.map((g) => (
              <Link key={g.slug} href={`/${l}/guides/${g.slug}`} className="card">
                <span className="pill accent">{d.guideCategoryNames[g.category] ?? g.category}</span>
                <h3 style={{ marginTop: 10 }}>{g[l].title}</h3>
                <p>{g[l].description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Faq items={d.homeFaq} heading={d.homeFaqHeading} />

      <section className="callout">
        <p>{d.dataNote(foods.length, withPages.length, guides.length)}</p>
        <p>{d.sourceNote}</p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqLd)} />
      </div>
    </>
  );
}
