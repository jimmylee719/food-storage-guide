import type { Metadata } from 'next';
import { HTML_LANG, LOCALES, type Locale } from './i18n';
import { absoluteUrl } from './site';

/** Builds canonical + hreflang alternates for a path that exists in every locale. */
export function alternates(pathWithoutLocale: string, locale: Locale): Metadata['alternates'] {
  const clean = pathWithoutLocale === '/' ? '' : pathWithoutLocale.replace(/\/$/, '');
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HTML_LANG[l]] = absoluteUrl(`/${l}${clean}`);
  languages['x-default'] = absoluteUrl(`/en${clean}`);
  return {
    canonical: absoluteUrl(`/${locale}${clean}`),
    languages,
  };
}

type MetaInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({ title, description, path, locale, type = 'website', modifiedTime, noIndex }: MetaInput): Metadata {
  const url = absoluteUrl(`/${locale}${path === '/' ? '' : path}`);
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
