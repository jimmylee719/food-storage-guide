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

/**
 * The company that operates this site, as registered in Taiwan. These details
 * are what make the About and Privacy pages name a real, identifiable operator
 * rather than an anonymous "we", which is both a trust signal and what a data
 * protection notice is required to state.
 */
export const OPERATOR = {
  nameZh: '凡圖有限公司',
  nameEn: 'Vanture Co., Ltd.',
  taxId: '62073421',
  addressZh: '桃園市中壢區青峰路一段 49 號 5 樓',
  addressEn: '5F, No. 49, Sec. 1, Qingfeng Rd., Zhongli Dist., Taoyuan City, Taiwan',
  siteZh: 'https://getvanture.com/zh-Hant',
  siteEn: 'https://getvanture.com/en',
} as const;
export const SITE_LAUNCH_YEAR = 2025;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
