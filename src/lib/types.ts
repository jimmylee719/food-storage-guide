import type { Locale } from './i18n';

export type Unit = 'days' | 'weeks' | 'months' | 'years' | 'hours' | null;

export type Span = {
  min: number | null;
  max: number | null;
  unit: Unit;
  tips: string | null;
};

export type Method = {
  base?: Span;
  fromPurchase?: Span;
  afterOpening?: Span;
  afterThawing?: Span;
};

export type Storage = {
  pantry?: Method;
  fridge?: Method;
  freezer?: Method;
};

export type FoodContent = {
  name: string;
  aliases: string[];
  summary: string;
  pantry: string | null;
  fridge: string | null;
  freezer: string | null;
  thawing: string | null;
  spoilage: string[];
  tips: string[];
  faq: { q: string; a: string }[];
};

export type SourceRef = { name: string; url: string };

export type Food = {
  slug: string;
  /**
   * The slug this food is published under in each locale. English never
   * moves; Chinese uses the Chinese name so the URL is readable, except
   * where two foods share a Chinese name.
   */
  slugs: Record<Locale, string>;
  category: string;
  source: string;
  sourceRefs: SourceRef[] | null;
  /** Whether the storage figures actually rest on the FoodKeeper dataset. */
  usesFoodKeeper: boolean;
  /**
   * Whether the refrigerated figure is a discard date ('safety') or the
   * point where flavour falls off ('quality'). Freezer and pantry figures
   * are always about quality, so this speaks only for the fridge.
   */
  fridgeBasis: 'safety' | 'quality';
  analog: string | null;
  correction: { reason: Record<string, string>; evidence: Record<string, string> } | null;
  derivedFrom: string | null;
  derivedFromName: string | null;
  baseName: string;
  subtitle: string | null;
  keywords: string[];
  storage: Storage;
  names: Record<Locale, string>;
  aliases: Record<Locale, string[]>;
  hasPage: boolean;
  content: Record<Locale, FoodContent> | null;
};

export type GuideBody = {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
  faq: { q: string; a: string }[];
  sources: SourceRef[];
};

export type Guide = {
  slug: string;
  category: string;
  updated: string;
} & Record<Locale, GuideBody>;

export type SearchEntry = { s: string; n: string; c: string; p: 0 | 1; k: string };
