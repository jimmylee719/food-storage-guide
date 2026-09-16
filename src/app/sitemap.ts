import type { MetadataRoute } from 'next';
import { CATEGORIES, HTML_LANG, LOCALES } from '@/lib/i18n';
import { allFoods, foodSlug, guides } from '@/lib/data';
import { STATIC_PAGE_KEYS } from '@/lib/pages';
import { absoluteUrl } from '@/lib/site';

/**
 * Every URL is emitted once per locale with full hreflang alternates.
 *
 * `path` may be one string used by every locale, or a per-locale map for pages
 * whose slug is localised — a food is /en/food/broccoli and /zh/food/青花菜.
 */
function entry(
  path: string | Record<string, string>,
  opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: string },
) {
  const pathFor = (l: string) => (typeof path === 'string' ? path : path[l] ?? '');
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = absoluteUrl(`/${l}${pathFor(l)}`);
  languages['x-default'] = absoluteUrl(`/en${pathFor('en')}`);
  return LOCALES.map((l) => ({
    url: absoluteUrl(`/${l}${pathFor(l)}`),
    lastModified: opts.lastModified ? new Date(opts.lastModified) : new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  out.push(...entry('', { priority: 1, changeFrequency: 'weekly' }));
  out.push(...entry('/foods', { priority: 0.9, changeFrequency: 'weekly' }));
  out.push(...entry('/guides', { priority: 0.9, changeFrequency: 'weekly' }));
  for (const c of CATEGORIES) out.push(...entry(`/category/${c}`, { priority: 0.8, changeFrequency: 'weekly' }));
  for (const f of allFoods()) {
    const paths = Object.fromEntries(LOCALES.map((l) => [l, `/food/${encodeURIComponent(foodSlug(f, l))}`]));
    out.push(...entry(paths, { priority: 0.7, changeFrequency: 'monthly' }));
  }
  for (const g of guides) out.push(...entry(`/guides/${g.slug}`, { priority: 0.8, changeFrequency: 'monthly', lastModified: g.updated }));
  // The corrections log is the site's own contribution to the data rather than a
  // notice page, so it ranks with the guides, not with the legal boilerplate.
  out.push(...entry('/corrections', { priority: 0.6, changeFrequency: 'monthly' }));
  for (const k of STATIC_PAGE_KEYS) out.push(...entry(`/${k}`, { priority: 0.3, changeFrequency: 'yearly' }));
  return out;
}
