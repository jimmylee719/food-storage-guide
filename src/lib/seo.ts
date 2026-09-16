import type { Metadata } from 'next';
import { HTML_LANG, LOCALES, type Locale } from './i18n';
import { absoluteUrl } from './site';

/**
 * Canonical plus hreflang alternates.
 *
 * Most paths are identical in every locale. Food pages are not: the Chinese
 * edition publishes 青花菜 where the English one publishes broccoli. Those pass
 * a per-locale map, because an hreflang link that points at a URL which
 * redirects is discarded, and the two editions would stop being connected.
 */
export function alternates(
  pathWithoutLocale: string | Partial<Record<Locale, string>>,
  locale: Locale,
): Metadata['alternates'] {
  const clean = (p: string) => (p === '/' ? '' : p.replace(/\/$/, ''));
  const pathFor = (l: Locale) =>
    typeof pathWithoutLocale === 'string'
      ? clean(pathWithoutLocale)
      : clean(pathWithoutLocale[l] ?? pathWithoutLocale.en ?? '');
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = absoluteUrl(`/${l}${pathFor(l)}`);
  languages['x-default'] = absoluteUrl(`/en${pathFor('en' as Locale)}`);
  return {
    canonical: absoluteUrl(`/${locale}${pathFor(locale)}`),
    languages,
  };
}

type MetaInput = {
  title: string;
  description: string;
  path: string | Partial<Record<Locale, string>>;
  locale: Locale;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path, locale, type = 'website', modifiedTime, noIndex }: MetaInput): Metadata {
  const ownPath = typeof path === 'string' ? path : (path[locale] ?? path.en ?? '');
  const url = absoluteUrl(`/${locale}${ownPath === '/' ? '' : ownPath}`);
  return {
    title,
    description,
    alternates: alternates(path, locale),
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      type,
      locale: HTML_LANG[locale].replace('-', '_'),
      siteName: title,
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
