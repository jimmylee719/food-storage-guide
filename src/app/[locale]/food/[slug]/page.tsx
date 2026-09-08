import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import StoragePanels from '@/components/StoragePanels';
import Faq from '@/components/Faq';
import AdSlot from '@/components/AdSlot';
import { HTML_LANG, LOCALES, type Locale, isLocale, t } from '@/lib/i18n';
import { foodsWithPages, getFood, guides, headline, relatedFoods } from '@/lib/data';
import { buildMetadata, jsonLdScript } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => foodsWithPages().map((f) => ({ locale, slug: f.slug })));
}

function titleFor(locale: Locale, name: string): string {
  switch (locale) {
    case 'zh': return `${name}可以放多久？常溫、冷藏與冷凍保存方法`;
    case 'ja': return `${name}の保存期間と保存方法（常温・冷蔵・冷凍）`;
    case 'es': return `¿Cuánto dura ${name.toLowerCase()}? Conservación en despensa, nevera y congelador`;
    default: return `How long does ${name.toLowerCase()} last? Pantry, fridge and freezer storage`;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const food = getFood(slug);
  if (!food?.hasPage) return {};
  const c = food.content![locale];
  return buildMetadata({
    title: titleFor(locale, c.name),
    description: c.summary.slice(0, 155),
    path: `/food/${slug}`,
    locale,
    type: 'article',
  });
}

export default async function FoodPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const food = getFood(slug);
  if (!food?.hasPage) notFound();
  const c = food.content![l];

  const sections: { id: string; heading: string; body: string }[] = [];
  if (c.pantry) sections.push({ id: 'pantry', heading: d.pantryLong, body: c.pantry });
  if (c.fridge) sections.push({ id: 'fridge', heading: d.fridgeLong, body: c.fridge });
  if (c.freezer) sections.push({ id: 'freezer', heading: d.freezerLong, body: c.freezer });
  if (c.thawing) sections.push({ id: 'thawing', heading: d.thawing, body: c.thawing });

  const related = relatedFoods(food);
  const relatedGuideList = guides.slice(0, 4);

  const faqLd = c.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: c.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: titleFor(l, c.name),
    description: c.summary,
    inLanguage: HTML_LANG[l],
    mainEntityOfPage: absoluteUrl(`/${l}/food/${slug}`),
    about: { '@type': 'Thing', name: c.name, alternateName: c.aliases },
    isBasedOn: 'https://catalog.data.gov/dataset/fsis-foodkeeper-data',
    publisher: { '@type': 'Organization', name: d.siteName, url: absoluteUrl(`/${l}`) },
  };

  return (
    <div className="wrap narrow">
      <Breadcrumbs
        items={[
          { name: d.home, href: `/${l}` },
          { name: d.allFoods, href: `/${l}/foods` },
          { name: d.categoryNames[food.category as keyof typeof d.categoryNames] ?? food.category, href: `/${l}/category/${food.category}` },
          { name: c.name },
        ]}
      />

      <h1>{c.name}</h1>
      {c.aliases?.length ? <p className="alias">{c.aliases.join(' · ')}</p> : null}

      <div className="callout">
        <p><strong>{d.quickAnswer}</strong></p>
        <p>{c.summary}</p>
      </div>

      <StoragePanels food={food} locale={l} />

      <AdSlot label="Advertisement" />

      <div className="prose">
        {sections.map((s) => (
          <section key={s.id}>
            <h2 id={s.id}>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        {c.spoilage?.length ? (
          <section>
            <h2 id="spoilage">{d.spoilageSigns}</h2>
            <ul>{c.spoilage.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </section>
        ) : null}

        {c.tips?.length ? (
          <section>
            <h2 id="tips">{d.tips}</h2>
            <ul>{c.tips.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </section>
        ) : null}
      </div>

      <Faq items={c.faq} heading={d.faq} />

      {related.length > 0 && (
        <section>
          <div className="section-head"><h2>{d.relatedFoods}</h2></div>
          <ul className="chip-row">
            {related.map((f) => (
              <li key={f.slug}>
                <Link className="pill" href={`/${l}/food/${f.slug}`}>
                  {f.names[l]} · {headline(f, 'fridge', l)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {relatedGuideList.length > 0 && (
        <section>
          <div className="section-head"><h2>{d.relatedGuides}</h2></div>
          <ul>
            {relatedGuideList.map((g) => (
              <li key={g.slug}><Link href={`/${l}/guides/${g.slug}`}>{g[l].title}</Link></li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 id="sources">{d.sources}</h2>
        <ul className="source-list">
          <li>
            USDA FSIS FoodKeeper —{' '}
            <a href="https://catalog.data.gov/dataset/fsis-foodkeeper-data" rel="noopener nofollow" target="_blank">
              catalog.data.gov
            </a>
          </li>
          {food.sourceRefs?.map((s) => (
            <li key={s.url}>
              {s.name} — <a href={s.url} rel="noopener nofollow" target="_blank">{new URL(s.url).hostname}</a>
            </li>
          ))}
        </ul>
        <p className="footer-note">{d.sourceNote}</p>
        <p className="footer-note"><strong>{d.disclaimer}:</strong> {d.disclaimerBody}</p>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(articleLd)} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqLd)} /> : null}
    </div>
  );
}
