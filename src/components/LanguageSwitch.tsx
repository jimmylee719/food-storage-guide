'use client';

import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, type Locale, isLocale, t } from '@/lib/i18n';

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const segments = pathname.split('/').filter(Boolean);
  const rest = isLocale(segments[0] ?? '') ? segments.slice(1) : segments;
  const suffix = rest.length ? `/${rest.join('/')}` : '';

  return (
    <nav className="lang-switch" aria-label={t(locale).languageLabel}>
      {LOCALES.map((l) => (
        <a
          key={l}
          href={`/${l}${suffix}`}
          hrefLang={l}
          className="lang-option"
          aria-current={l === locale ? 'true' : undefined}
          data-active={l === locale}
        >
          {LOCALE_NAMES[l]}
        </a>
      ))}
    </nav>
  );
}
