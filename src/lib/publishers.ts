import type { Locale } from './i18n';

/**
 * Who published each cited document, named in the reader's own language.
 *
 * Citations are quoted as their authors wrote them — a Japanese ministry's
 * guidance keeps its Japanese title, an American extension bulletin keeps its
 * English one. That is what makes the citation checkable, and it must not
 * change with the reader.
 *
 * But a Chinese reader looking at 「Ohio State University Extension (Ohioline)
 * - Pantry Food Storage」 cannot tell whether that is a government body, a
 * university or a blog, and an English reader meets the same wall on
 * 「厚生労働省 / 日本豆腐協会」. This maps each publishing host to its name in
 * both languages so the reader is told who stands behind the figure, without
 * altering the citation itself.
 *
 * Which source is cited NEVER varies by locale. A Taiwanese reader looking up
 * abiu sees the University of Hawai'i, because that is who published the
 * research; substituting a Taiwanese body would be fabrication.
 */
type Publisher = { en: string; zh: string };

const PUBLISHERS: Record<string, Publisher> = {
  'ohioline.osu.edu': { en: 'Ohio State University Extension', zh: '美國俄亥俄州立大學推廣中心' },
  'www.cfs.gov.hk': { en: 'Centre for Food Safety, Hong Kong', zh: '香港食物環境衞生署食物安全中心' },
  'nchfp.uga.edu': { en: 'National Center for Home Food Preservation, University of Georgia', zh: '美國喬治亞大學國家家庭食品保存中心' },
  'www.fda.gov': { en: 'U.S. Food and Drug Administration', zh: '美國食品藥物管理局' },
  'pubs.nmsu.edu': { en: 'New Mexico State University Extension', zh: '美國新墨西哥州立大學推廣中心' },
  'www3.ctahr.hawaii.edu': { en: 'University of Hawaiʻi at Mānoa, CTAHR', zh: '美國夏威夷大學熱帶農業與人力資源學院' },
  'www.ctahr.hawaii.edu': { en: 'University of Hawaiʻi at Mānoa, CTAHR', zh: '美國夏威夷大學熱帶農業與人力資源學院' },
  'gms.ctahr.hawaii.edu': { en: 'University of Hawaiʻi at Mānoa, CTAHR', zh: '美國夏威夷大學熱帶農業與人力資源學院' },
  'www.maff.go.jp': { en: 'Japan Ministry of Agriculture, Forestry and Fisheries', zh: '日本農林水產省' },
  'kmweb.moa.gov.tw': { en: 'Ministry of Agriculture, Taiwan', zh: '中華民國農業部農業知識入口網' },
  'fae.moa.gov.tw': { en: 'Ministry of Agriculture, Taiwan', zh: '中華民國農業部食農教育資訊整合平臺' },
  'www.mhlw.go.jp': { en: 'Japan Ministry of Health, Labour and Welfare', zh: '日本厚生勞動省' },
  'www.canada.ca': { en: 'Government of Canada', zh: '加拿大政府' },
  'www.aesan.gob.es': { en: 'Spanish Agency for Food Safety and Nutrition', zh: '西班牙食品安全暨營養局' },
  'www.fda.gov.tw': { en: 'Taiwan Food and Drug Administration', zh: '中華民國衛生福利部食品藥物管理署' },
  'www.gov.uk': { en: 'UK Government', zh: '英國政府' },
  'pmc.ncbi.nlm.nih.gov': { en: 'PubMed Central, U.S. National Library of Medicine', zh: '美國國家醫學圖書館 PubMed Central' },
  'www.ars.usda.gov': { en: 'USDA Agricultural Research Service', zh: '美國農業部農業研究署' },
  'extension.usu.edu': { en: 'Utah State University Extension', zh: '美國猶他州立大學推廣中心' },
  'extension.umd.edu': { en: 'University of Maryland Extension', zh: '美國馬里蘭大學推廣中心' },
  'fssai.gov.in': { en: 'Food Safety and Standards Authority of India', zh: '印度食品安全標準局' },
  'www.nta.go.jp': { en: 'Japan National Tax Agency', zh: '日本國稅廳' },
  'www.kanmen.com': { en: 'Japan National Federation of Dried Noodle Cooperatives', zh: '日本全國乾麵協同組合聯合會' },
  'www.mapa.gob.es': { en: 'Spain Ministry of Agriculture, Fisheries and Food', zh: '西班牙農業、漁業暨食品部' },
  'aggie-horticulture.tamu.edu': { en: 'Texas A&M AgriLife Extension', zh: '美國德州農工大學 AgriLife 推廣中心' },
  'www.bar.gov.ph': { en: 'Bureau of Agricultural Research, Philippines', zh: '菲律賓農業部農業研究局' },
  'www.nissin.com': { en: 'Nissin Foods Group', zh: '日清食品集團' },
  'catalog.data.gov': { en: 'USDA Food Safety and Inspection Service', zh: '美國農業部食品安全檢驗局' },
};

const CJK = /[　-〿぀-ヿ㐀-䶿一-鿿＀-￯]/;

/**
 * The publisher's name in the reader's language, but only when the citation
 * itself is in a script the reader may not read. An English citation on an
 * English page already says who wrote it; repeating it would be noise.
 */
export function publisherGloss(url: string, citation: string, locale: Locale): string | null {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return null;
  }
  const publisher = PUBLISHERS[host];
  if (!publisher) return null;

  const citationIsCJK = CJK.test(citation);
  const readerReadsCJK = locale === 'zh' || (locale as string) === 'ja';
  // Show the gloss only when the citation is in the other script.
  if (readerReadsCJK === citationIsCJK) return null;

  const name = publisher[locale as 'en' | 'zh'] ?? publisher.en;
  return name || null;
}
