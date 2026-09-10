import type { Locale } from './i18n';
import zh from '@/data/tips/zh.json';
import ja from '@/data/tips/ja.json';
import es from '@/data/tips/es.json';

/**
 * Storage tips are written once in English in the research data, because that
 * is the language the source agencies publish in. A Chinese page showing an
 * English sentence is a broken page, so every tip is translated and looked up
 * by its English text.
 *
 * Tips repeat heavily across foods — "Keep frozen. For safety, cook as
 * directed." appears on seventeen records — so the dictionary is keyed by the
 * sentence rather than by food, and one translation serves every food that
 * carries it.
 *
 * A tip with no translation yet is hidden rather than shown in English:
 * silence is better than the wrong language.
 */
const DICTS: Record<Exclude<Locale, 'en'>, Record<string, string>> = {
  zh: zh as Record<string, string>,
  ja: ja as Record<string, string>,
  es: es as Record<string, string>,
};

export function localiseTip(tip: string | null, locale: Locale): string | null {
  if (!tip) return null;
  if (locale === 'en') return tip;
  const key = tip.trim();
  return DICTS[locale][key] ?? null;
}

/** How many tips are still untranslated, for scripts/check-language.js. */
export function tipCoverage(tips: string[]): Record<string, { done: number; missing: string[] }> {
  const out: Record<string, { done: number; missing: string[] }> = {};
  for (const l of ['zh', 'ja', 'es'] as const) {
    const missing = tips.filter((tip) => !DICTS[l][tip.trim()]);
    out[l] = { done: tips.length - missing.length, missing };
  }
  return out;
}
