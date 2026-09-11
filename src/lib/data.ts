import foodsRaw from '@/data/generated/foods.json';
import guidesRaw from '@/data/generated/guides.json';
import type { Food, Guide, Method, Span } from './types';
import { type Locale, t } from './i18n';
import { localiseTip } from './tips';

export const foods = foodsRaw as unknown as Food[];
export const guides = guidesRaw as unknown as Guide[];

const bySlug = new Map(foods.map((f) => [f.slug, f]));
const guideBySlug = new Map(guides.map((g) => [g.slug, g]));

export function getFood(slug: string): Food | undefined {
  return bySlug.get(slug);
}
export function getGuide(slug: string): Guide | undefined {
  return guideBySlug.get(slug);
}
/**
 * Every food has a page. A food whose article is still unwritten renders from
 * its storage data alone: a table row is a number, not an answer, and sending
 * a reader who searched for salmon to an anchor inside a long table is a dead
 * end.
 */
export function allFoods(): Food[] {
  return foods;
}
/** Only the foods with a full four-language article, for counting. */
export function foodsWithPages(): Food[] {
  return foods.filter((f) => f.hasPage);
}
export function foodsInCategory(category: string): Food[] {
  return foods.filter((f) => f.category === category);
}
export function categoryCounts(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const f of foods) out[f.category] = (out[f.category] || 0) + 1;
  return out;
}

/** Picks the most representative span for a storage method. */
export function primarySpan(method?: Method): Span | null {
  if (!method) return null;
  return method.base || method.fromPurchase || method.afterOpening || method.afterThawing || null;
}

/** "3–5 天" / "3–5 days" / "3〜5日" / "3–5 días" */
export function formatSpan(span: Span | null | undefined, locale: Locale): string | null {
  if (!span) return null;
  const d = t(locale);
  const { min, max, unit } = span;
  if (min == null && max == null) return null;
  if (!unit) return null;
  const forms = d.unit[unit];
  if (!forms) return null;
  const lo = min ?? max!;
  const hi = max ?? min!;
  const plural = hi > 1 || lo > 1;
  const word = plural ? forms[1] : forms[0];
  const num = lo === hi ? `${lo}` : `${lo}${d.rangeJoin}${hi}`;
  // CJK sets a number against its unit with no space.
  if (locale === 'zh' || (locale as string) === 'ja') return `${num}${word}`;
  return `${num} ${word}`;
}

export type MethodKey = 'pantry' | 'fridge' | 'freezer';
export const METHOD_KEYS: MethodKey[] = ['pantry', 'fridge', 'freezer'];

export type MethodRow = { key: string; label: string; value: string | null; tips: string | null };

/** All labelled rows for one storage method, in display order. */
export function methodRows(method: Method | undefined, locale: Locale): MethodRow[] {
  if (!method) return [];
  const d = t(locale);
  const order: [keyof Method, string][] = [
    ['base', d.generalTimeline],
    ['fromPurchase', d.fromPurchase],
    ['afterOpening', d.afterOpening],
    ['afterThawing', d.afterThawing],
  ];
  const rows: MethodRow[] = [];
  for (const [key, label] of order) {
    const span = method[key];
    if (!span) continue;
    const value = formatSpan(span, locale);
    if (!value && !span.tips) continue;
    const tips = localiseTip(span.tips, locale);
    // A tip that has no translation yet drops out; a row that existed only to
    // carry that tip drops with it rather than rendering empty.
    if (!value && !tips) continue;
    rows.push({ key, label, value, tips });
  }
  return rows;
}

/** Short headline value for a method, used in cards and tables. */
export function headline(food: Food, key: MethodKey, locale: Locale): string {
  const method = food.storage[key];
  const d = t(locale);
  if (!method) return '—';
  const span = primarySpan(method);
  const value = formatSpan(span, locale);
  if (value) return value;
  return span?.tips && localiseTip(span.tips, locale) ? d.seeNotes : '—';
}

/** Guides worth showing next to a given food, most relevant first. */
export function relatedGuides(food: Food, limit = 4): Guide[] {
  const perishable = ['meat', 'poultry', 'seafood', 'dairy-eggs', 'deli-prepared'].includes(food.category);
  const freezable = Boolean(food.storage.freezer);
  const pantryOnly = Boolean(food.storage.pantry) && !food.storage.fridge;

  const scored = guides.map((g) => {
    let score = 0;
    if (g.category === 'freezer' && freezable) score += 3;
    if (g.category === 'fridge' && food.storage.fridge) score += 3;
    if (g.category === 'pantry' && pantryOnly) score += 3;
    if (g.category === 'safety' && perishable) score += 2;
    if (g.category === 'basics') score += 1;
    if (food.category === 'deli-prepared' && g.slug.includes('leftovers')) score += 3;
    if (food.category === 'dairy-eggs' && g.slug.includes('egg')) score += 3;
    if (['fruits', 'vegetables'].includes(food.category) && g.slug.includes('ethylene')) score += 3;
    if (['fruits', 'vegetables'].includes(food.category) && g.slug.includes('blanching')) score += 2;
    if (food.category === 'grains-beans-pasta' && g.slug.includes('rice')) score += 3;
    if (food.category === 'shelf-stable' && g.slug.includes('canned')) score += 3;
    return { g, score };
  });

  return scored
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.g.slug.localeCompare(b.g.slug))
    .slice(0, limit)
    .map((x) => x.g);
}

export function relatedFoods(food: Food, limit = 8): Food[] {
  const sameCat = foods.filter((f) => f.category === food.category && f.slug !== food.slug);
  const stem = food.baseName.split(/[ ,(]/)[0].toLowerCase();
  const scored = sameCat
    .map((f) => ({ f, score: f.baseName.toLowerCase().startsWith(stem) ? 2 : 1 }))
    .sort((a, b) => b.score - a.score || a.f.slug.localeCompare(b.f.slug));
  return scored.slice(0, limit).map((x) => x.f);
}
