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
