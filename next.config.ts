import type { NextConfig } from 'next';
import { readFileSync } from 'node:fs';

/**
 * Records retired as duplicates, redirected at the router rather than in the
 * page.
 *
 * The page already redirects an older slug to the one its locale publishes,
 * and for the ~1,070 English-to-Chinese food slugs that works. For this
 * handful it did not: the responses came back 308 with no Location header at
 * all, inconsistently — /en/food/yuca-cassava carried one while
 * /en/food/whole-wheat-flour, with an equally plain ASCII target, did not. A
 * 308 without a Location is a dead end for the reader.
 *
 * This set is small, fixed and known at build time, so it belongs in the
 * router where nothing has to render for the redirect to exist.
 */
function retiredRedirects() {
  const retired: Record<string, string> = JSON.parse(
    readFileSync('./src/data/generated/retired.json', 'utf8'),
  );
  const foods: { slug: string; slugs: Record<string, string> }[] = JSON.parse(
    readFileSync('./src/data/generated/foods.json', 'utf8'),
  );
  const bySlug = new Map(foods.map((f) => [f.slug, f]));
  const out: { source: string; destination: string; permanent: true }[] = [];
  for (const [from, to] of Object.entries(retired)) {
    const survivor = bySlug.get(to);
    if (!survivor) continue;
    for (const locale of ['zh', 'en']) {
      const slug = survivor.slugs?.[locale] ?? survivor.slug;
      out.push({
        source: `/${locale}/food/${from}`,
        destination: `/${locale}/food/${encodeURIComponent(slug)}`,
        permanent: true,
      });
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Windows only: build static pages on a single worker.
  //
  // With the default worker pool the build dies here before emitting a single
  // page — the worker process is killed outright, with a different native crash
  // code each run (ACCESS_VIOLATION, STACK_BUFFER_OVERRUN, BREAKPOINT), which is
  // a crash below the JS layer rather than a fault in any page. One worker builds
  // all 2,247.
  //
  // Vercel and Linux CI build on every core, so deployment is not slowed by a
  // local toolchain bug. Drop the whole block once the upstream issue is fixed.
  ...(process.platform === 'win32' ? { experimental: { cpus: 1 } } : {}),
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    // "/" is handled by src/proxy.ts, which picks a locale from Accept-Language.
    // These are the URLs the previous single-page version of the site published,
    // kept so indexed links and backlinks land on the new equivalent.
    return [
      ...retiredRedirects(),
      { source: '/index.html', destination: '/zh', permanent: true },
      { source: '/about.html', destination: '/zh/about', permanent: true },
      { source: '/privacy-policy.html', destination: '/zh/privacy', permanent: true },
      // Japanese and Spanish were published earlier. Their URLs keep working
      // rather than 404ing, and land on the same page in English.
      { source: '/ja', destination: '/en', permanent: true },
      { source: '/es', destination: '/en', permanent: true },
      { source: '/ja/:path*', destination: '/en/:path*', permanent: true },
      // FoodKeeper records that arrived with no storage data were replaced by
      // curated ones. Their pages were published, so they move rather than vanish.
      { source: '/:locale(zh|en)/food/sour-cream', destination: '/:locale/food/sour-cream-fresh', permanent: true },
      { source: '/:locale(zh|en)/food/apple-cider-vinegar', destination: '/:locale/food/apple-cider-vinegar-bottled', permanent: true },
      { source: '/:locale(zh|en)/food/capers-jar', destination: '/:locale/food/capers-in-brine', permanent: true },
      { source: '/:locale(zh|en)/food/cooking-wine', destination: '/:locale/food/cooking-wine-bottled', permanent: true },
      { source: '/:locale(zh|en)/food/hard-liquors', destination: '/:locale/food/spirits-distilled', permanent: true },
      { source: '/:locale(zh|en)/food/salt-table-plain-iodized', destination: '/:locale/food/table-salt', permanent: true },
      { source: '/:locale(zh|en)/food/biscuits-refrigerated', destination: '/:locale/food/refrigerated-dough-tube', permanent: true },
      { source: '/:locale(zh|en)/food/cinnamon-rolls-unbaked-tube', destination: '/:locale/food/refrigerated-dough-tube', permanent: true },
      { source: '/:locale(zh|en)/food/tube-cans-biscuits-rolls-pizza-dough', destination: '/:locale/food/refrigerated-dough-tube', permanent: true },
      { source: '/:locale(zh|en)/food/nutrition-supplement-drinks-bottled', destination: '/:locale/food/nutrition-drinks-bottled', permanent: true },
      { source: '/es/:path*', destination: '/en/:path*', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
