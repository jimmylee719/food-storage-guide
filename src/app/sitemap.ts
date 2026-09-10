import type { MetadataRoute } from 'next';
import { CATEGORIES, HTML_LANG, LOCALES } from '@/lib/i18n';
import { allFoods, guides } from '@/lib/data';
import { STATIC_PAGE_KEYS } from '@/lib/pages';
import { absoluteUrl } from '@/lib/site';

/** Every URL is emitted once per locale with full hreflang alternates. */
function entry(path: string, opts: { priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; lastModified?: string }) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = absoluteUrl(`/${l}${path}`);
  languages['x-default'] = absoluteUrl(`/en${path}`);
  return LOCALES.map((l) => ({
    url: absoluteUrl(`/${l}${path}`),
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
  for (const f of allFoods()) out.push(...entry(`/food/${f.slug}`, { priority: 0.7, changeFrequency: 'monthly' }));
  for (const g of guides) out.push(...entry(`/guides/${g.slug}`, { priority: 0.8, changeFrequency: 'monthly', lastModified: g.updated }));
  for (const k of STATIC_PAGE_KEYS) out.push(...entry(`/${k}`, { priority: 0.3, changeFrequency: 'yearly' }));
  return out;
}
