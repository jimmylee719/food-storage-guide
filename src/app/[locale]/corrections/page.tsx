import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { LOCALES, type Locale, isLocale, t } from '@/lib/i18n';
import { getFood } from '@/lib/data';
import { buildMetadata, jsonLdScript } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';
import corrections from '@/data/base/corrections.json';

type Correction = {
  slug: string;
  reason: Record<string, string>;
  evidence: Record<string, string>;
};

const LIST = corrections as unknown as Correction[];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return buildMetadata({
    title: d.correctionsTitle,
    description: d.correctionsDescription,
    path: '/corrections',
    locale,
  });
}

export default async function CorrectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);

  // Generated from the corrections file rather than written by hand, so the page
  // cannot drift out of step with what the site actually publishes.
  const items = LIST.map((c) => ({ ...c, food: getFood(c.slug) })).filter((c) => c.food);

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.correctionsTitle,
    description: d.correctionsDescription,
    mainEntityOfPage: absoluteUrl(`/${l}/corrections`),
    publisher: { '@type': 'Organization', name: d.siteName, url: absoluteUrl(`/${l}`) },
  };

  return (
    <div className="wrap narrow">
      <Breadcrumbs items={[{ name: d.home, href: `/${l}` }, { name: d.correctionsTitle }]} />
      <h1>{d.correctionsTitle}</h1>

      <p className="hero-lead">{d.correctionsLead}</p>

      <div className="prose">
        <section>
          <h2>{d.correctionsWhenHeading}</h2>
          <p>{d.correctionsWhenBody}</p>
          <ul>
            {d.correctionsTests.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
          <p>{d.correctionsWhenClose}</p>
        </section>

        <section>
          <h2>{d.correctionsLogHeading(items.length)}</h2>
          {items.length === 0 ? (
            <p>{d.correctionsNone}</p>
          ) : (
            items.map((c) => (
              <article key={c.slug} className="correction-entry">
                <h3>
                  <Link href={`/${l}/food/${c.slug}`}>{c.food!.names[l]}</Link>
                </h3>
                <p>
                  <strong>{d.correctionsWhy}</strong> {c.reason[l] ?? c.reason.en}
                </p>
                <p>
                  <strong>{d.correctionsEvidence}</strong> {c.evidence[l] ?? c.evidence.en}
                </p>
              </article>
            ))
          )}
        </section>

        <section>
          <h2>{d.correctionsReportHeading}</h2>
          <p>{d.correctionsReportBody}</p>
        </section>
      </div>

      <p className="footer-note">
        <Link href={`/${l}/methodology`}>{d.methodology}</Link>
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(ld)} />
    </div>
  );
}
