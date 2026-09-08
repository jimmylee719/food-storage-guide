import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { type Locale, isLocale, t } from '@/lib/i18n';
import { guides } from '@/lib/data';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return buildMetadata({ title: d.guidesTitle, description: d.guidesDescription, path: '/guides', locale });
}

export default async function GuidesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);

  const cats = [...new Set(guides.map((g) => g.category))];

  return (
    <div className="wrap">
      <Breadcrumbs items={[{ name: d.home, href: `/${l}` }, { name: d.guides }]} />
      <h1>{d.guidesTitle}</h1>
      <p className="hero-lead">{d.guidesDescription}</p>

      {guides.length === 0 ? (
        <p>{d.noData}</p>
      ) : (
        cats.map((cat) => (
          <section key={cat}>
            <div className="section-head"><h2>{d.guideCategoryNames[cat] ?? cat}</h2></div>
            <div className="grid grid-cards">
              {guides.filter((g) => g.category === cat).map((g) => (
                <Link key={g.slug} href={`/${l}/guides/${g.slug}`} className="card">
                  <h3>{g[l].title}</h3>
                  <p>{g[l].description}</p>
                  <p className="card-meta" style={{ marginTop: 8 }}>{d.updated}: {g.updated}</p>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
