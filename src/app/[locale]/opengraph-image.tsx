import { ImageResponse } from 'next/og';
import { LOCALES, isLocale, t } from '@/lib/i18n';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Food Storage Guide';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = t(isLocale(locale) ? locale : 'en');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#fbfaf7',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: '#1f7a4d',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
            }}
          >
            ❄
          </div>
          <div style={{ fontSize: 30, color: '#5f6560' }}>{d.tagline}</div>
        </div>
        <div style={{ fontSize: 82, fontWeight: 700, color: '#1a1c1a', lineHeight: 1.15 }}>{d.siteName}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
          {[d.pantry, d.fridge, d.freezer].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                padding: '12px 26px',
                borderRadius: 999,
                background: '#e7f3ec',
                color: '#14603b',
                fontSize: 30,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
