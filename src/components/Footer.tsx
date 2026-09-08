import Link from 'next/link';
import { CATEGORIES, type Locale, t } from '@/lib/i18n';
import { CONTACT_EMAIL, SITE_LAUNCH_YEAR } from '@/lib/site';

export default function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const year = new Date().getFullYear();
  const span = year > SITE_LAUNCH_YEAR ? `${SITE_LAUNCH_YEAR}–${year}` : `${SITE_LAUNCH_YEAR}`;
  const topCats = CATEGORIES.slice(0, 6);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>{d.siteName}</h4>
            <ul>
              <li><Link href={`/${locale}/foods`}>{d.allFoods}</Link></li>
              <li><Link href={`/${locale}/guides`}>{d.guides}</Link></li>
              <li><Link href={`/${locale}/methodology`}>{d.methodology}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{d.categories}</h4>
            <ul>
              {topCats.map((c) => (
                <li key={c}><Link href={`/${locale}/category/${c}`}>{d.categoryNames[c]}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{d.about}</h4>
            <ul>
              <li><Link href={`/${locale}/about`}>{d.about}</Link></li>
              <li><Link href={`/${locale}/contact`}>{d.contact}</Link></li>
              <li><Link href={`/${locale}/privacy`}>{d.privacy}</Link></li>
              <li><Link href={`/${locale}/terms`}>{d.terms}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{d.contact}</h4>
            <ul>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-note">
          <p>{d.sourceNote}</p>
          <p>© {span} {d.siteName}</p>
        </div>
      </div>
    </footer>
  );
}
