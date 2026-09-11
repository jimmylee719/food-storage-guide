import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    // "/" is handled by src/proxy.ts, which picks a locale from Accept-Language.
    // These are the URLs the previous single-page version of the site published,
    // kept so indexed links and backlinks land on the new equivalent.
    return [
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
