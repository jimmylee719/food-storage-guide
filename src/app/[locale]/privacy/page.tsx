import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { type Locale, isLocale, t } from '@/lib/i18n';
import { getStaticPage } from '@/lib/pages';
import { buildMetadata } from '@/lib/seo';

const KEY = 'privacy' as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const page = getStaticPage(KEY, locale);
  return buildMetadata({ title: page.title, description: page.description, path: `/${KEY}`, locale });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const d = t(l);
  const page = getStaticPage(KEY, l);

  return (
    <div className="wrap narrow">
      <Breadcrumbs items={[{ name: d.home, href: `/${l}` }, { name: page.title }]} />
      <h1>{page.title}</h1>
      <div className="prose">
        {page.sections.map((s, i) => (
          <section key={i}>
            {s.heading ? <h2>{s.heading}</h2> : null}
            {s.body.map((p, j) => <p key={j}>{p}</p>)}
          </section>
        ))}
      </div>
    </div>
  );
}
