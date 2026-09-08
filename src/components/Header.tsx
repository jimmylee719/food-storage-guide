import Link from 'next/link';
import { type Locale, t } from '@/lib/i18n';
import LanguageSwitch from './LanguageSwitch';

export default function Header({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href={`/${locale}`} className="brand">
          <span className="brand-mark" aria-hidden="true">❄</span>
          <span>{d.siteName}</span>
        </Link>
        <nav className="main-nav" aria-label={d.siteName}>
          <Link href={`/${locale}/foods`}>{d.allFoods}</Link>
          <Link href={`/${locale}/guides`}>{d.guides}</Link>
          <LanguageSwitch locale={locale} />
        </nav>
      </div>
    </header>
  );
}
