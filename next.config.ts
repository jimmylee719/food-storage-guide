import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  async redirects() {
    return [
      { source: '/', destination: '/zh', permanent: false },
      // Legacy single-page URLs from the previous version of the site.
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
