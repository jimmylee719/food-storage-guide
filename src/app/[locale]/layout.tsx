import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HTML_LANG, LOCALES, type Locale, isLocale, t } from '@/lib/i18n';
import { ADSENSE_CLIENT, GA_ID, GOOGLE_SITE_VERIFICATION, SITE_URL, absoluteUrl } from '@/lib/site';
import { jsonLdScript } from '@/lib/seo';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${d.siteName} — ${d.tagline}`, template: `%s | ${d.siteName}` },
    description: d.siteDescription,
    applicationName: d.siteName,
    formatDetection: { telephone: false },
    other: { 'google-adsense-account': ADSENSE_CLIENT },
    ...(GOOGLE_SITE_VERIFICATION ? { verification: { google: GOOGLE_SITE_VERIFICATION } } : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: d.siteName,
    alternateName: 'Food Storage Guide',
    url: absoluteUrl(`/${l}`),
    inLanguage: HTML_LANG[l],
    description: d.siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: absoluteUrl(`/${l}/foods?q={search_term_string}`) },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: d.siteName,
      url: absoluteUrl(`/${l}`),
    },
  };

  return (
    <html lang={HTML_LANG[l]}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(websiteLd)} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header locale={l} />
        <main id="main">{children}</main>
        <Footer locale={l} />
        <Script
          id="adsbygoogle"
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
