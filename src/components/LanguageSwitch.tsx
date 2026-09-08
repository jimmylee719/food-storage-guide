'use client';

import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, type Locale, isLocale, t } from '@/lib/i18n';

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const segments = pathname.split('/').filter(Boolean);
  const rest = isLocale(segments[0] ?? '') ? segments.slice(1) : segments;
  const suffix = rest.length ? `/${rest.join('/')}` : '';

  return (
    <details className="lang-switch">
      <summary aria-label={t(locale).languageLabel}>{LOCALE_NAMES[locale]}</summary>
      <nav className="lang-menu">
        {LOCALES.map((l) => (
          <a key={l} href={`/${l}${suffix}`} hrefLang={l} aria-current={l === locale ? 'true' : undefined}>
            {LOCALE_NAMES[l]}
          </a>
        ))}
      </nav>
    </details>
  );
}
