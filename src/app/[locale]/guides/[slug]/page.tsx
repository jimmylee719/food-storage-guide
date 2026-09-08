import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Faq from '@/components/Faq';
import Prose from '@/components/Prose';
import AdSlot from '@/components/AdSlot';
import { HTML_LANG, LOCALES, type Locale, isLocale, t } from '@/lib/i18n';
import { getGuide, guides } from '@/lib/data';
import { buildMetadata, jsonLdScript } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => guides.map((g) => ({ locale, slug: g.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const guide = getGuide(slug);
  if (!guide) return {};
  const g = guide[locale];
  return buildMetadata({
    title: g.title,
    description: g.description,
    path: `/guides/${slug}`,
    locale,
    type: 'article',
    modifiedTime: guide.updated,
  });
}

function anchor(i: number) {
  return `s${i + 1}`;
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const guide = getGuide(slug);
  if (!guide) notFound();
  const g = guide[l];

  const others = guides.filter((x) => x.slug !== slug).slice(0, 6);

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.description,
    inLanguage: HTML_LANG[l],
    dateModified: guide.updated,
    datePublished: guide.updated,
    mainEntityOfPage: absoluteUrl(`/${l}/guides/${slug}`),
    publisher: { '@type': 'Organization', name: d.siteName, url: absoluteUrl(`/${l}`) },
    citation: g.sources.map((s) => ({ '@type': 'CreativeWork', name: s.name, url: s.url })),
  };

  const faqLd = g.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: g.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <article className="wrap narrow">
      <Breadcrumbs
        items={[
          { name: d.home, href: `/${l}` },
          { name: d.guides, href: `/${l}/guides` },
          { name: g.title },
        ]}
      />

      <span className="pill accent">{d.guideCategoryNames[guide.category] ?? guide.category}</span>
      <h1 style={{ marginTop: 12 }}>{g.title}</h1>
      <p className="card-meta">{d.updated}: {guide.updated}</p>

      <div className="callout"><p>{g.intro}</p></div>

      {g.sections.length > 3 && (
        <nav className="toc" aria-label={d.toc}>
          <strong>{d.toc}</strong>
          <ol>
            {g.sections.map((s, i) => (
              <li key={i}><a href={`#${anchor(i)}`}>{s.heading}</a></li>
            ))}
          </ol>
        </nav>
      )}

      <div className="prose">
        {g.sections.map((s, i) => (
          <section key={i}>
            <h2 id={anchor(i)}>{s.heading}</h2>
            <Prose body={s.body} locale={l} />
            {i === 1 ? <AdSlot label="Advertisement" /> : null}
          </section>
        ))}
      </div>

      {g.keyTakeaways?.length ? (
        <aside className="takeaways">
          <h2>{d.keyTakeaways}</h2>
          <ul>{g.keyTakeaways.map((k, i) => <li key={i}>{k}</li>)}</ul>
        </aside>
      ) : null}

      <Faq items={g.faq} heading={d.faq} />

      <section>
        <h2 id="sources">{d.sources}</h2>
        <ul className="source-list">
          {g.sources.map((s) => (
            <li key={s.url}>
              {s.name} — <a href={s.url} rel="noopener nofollow" target="_blank">{new URL(s.url).hostname}</a>
            </li>
          ))}
        </ul>
        <p className="footer-note"><strong>{d.disclaimer}:</strong> {d.disclaimerBody}</p>
      </section>

      {others.length > 0 && (
        <section>
          <div className="section-head"><h2>{d.relatedGuides}</h2></div>
          <div className="grid grid-cards">
            {others.map((o) => (
              <Link key={o.slug} href={`/${l}/guides/${o.slug}`} className="card">
                <h3>{o[l].title}</h3>
                <p>{o[l].description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleLd)} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqLd)} /> : null}
    </article>
  );
}
