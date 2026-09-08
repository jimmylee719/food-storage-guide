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
  const titles: Record<Locale, string> = {
    zh: `${name}保存方法與保鮮期限（常溫、冷藏、冷凍）`,
    en: `How long does ${name.toLowerCase()} last? Pantry, fridge and freezer times`,
    ja: `${name}の保存期間：常温・冷蔵・冷凍の目安`,
    es: `¿Cuánto duran ${name.toLowerCase()}? Despensa, nevera y congelador`,
  };
  const descs: Record<Locale, string> = {
    zh: `${items.length} 種${name}的常溫、冷藏與冷凍保存期限一覽，以美國農業部 FoodKeeper 資料為基礎，附保存訣竅與腐敗判斷。`,
    en: `Storage times for ${items.length} ${name.toLowerCase()} in the pantry, fridge and freezer, based on the USDA FoodKeeper dataset, with tips and spoilage signs.`,
    ja: `${name}${items.length} 品目の常温・冷蔵・冷凍の保存期間一覧。米国農務省 FoodKeeper データにもとづき、保存のコツと傷みのサインも掲載。`,
    es: `Tiempos de conservación de ${items.length} ${name.toLowerCase()} en despensa, nevera y congelador, según el conjunto de datos FoodKeeper del USDA.`,
  };
  return buildMetadata({ title: titles[locale], description: descs[locale], path: `/category/${cat}`, locale });
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; cat: string }> }) {
  const { locale, cat } = await params;
  if (!isLocale(locale) || !isCategory(cat)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const name = d.categoryNames[cat];
  const items = foodsInCategory(cat).sort((a, b) => a.names[l].localeCompare(b.names[l], l));
  if (!items.length) notFound();
  const detailed = items.filter((f) => f.hasPage);

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
