/**
 * Central site configuration.
 * Set NEXT_PUBLIC_SITE_URL in Vercel to your production domain (no trailing slash).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://food-storage-guide.vercel.app').replace(/\/$/, '');

export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-8149364037190716';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
/** The content value of Search Console's HTML-tag verification method. */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '';

export const CONTACT_EMAIL = 'getvanture@gmail.com';
export const SITE_LAUNCH_YEAR = 2025;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
