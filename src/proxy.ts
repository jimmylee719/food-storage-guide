import { NextResponse, type NextRequest } from 'next/server';

// Kept inline rather than imported so the edge bundle stays small.
const LOCALES = ['zh', 'en'] as const;
type Locale = (typeof LOCALES)[number];
const FALLBACK: Locale = 'en';

/**
 * Maps an Accept-Language header to one of our locales. Chinese of any script
 * or region goes to the Traditional Chinese edition, which is the only Chinese
 * edition we publish.
 */
function pickLocale(header: string | null): Locale {
  if (!header) return FALLBACK;
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { tag: tag.trim().toLowerCase(), q: q ? Number.parseFloat(q.split('=')[1]) || 0 : 1 };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const primary = tag.split('-')[0];
    if (primary === 'zh') return 'zh';
    if (primary === 'en') return 'en';
  }
  return FALLBACK;
}

export const config = { matcher: '/' };

export default function proxy(request: NextRequest) {
  const locale = pickLocale(request.headers.get('accept-language'));
  const url = new URL(`/${locale}`, request.url);
  url.search = request.nextUrl.search;
  // 307 rather than 308: the target depends on the visitor's language, so the
  // mapping must not be cached as permanent by browsers or crawlers.
  return NextResponse.redirect(url, 307);
}
