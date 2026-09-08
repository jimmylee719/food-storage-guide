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
  category: string;
  source: string;
  sourceRefs: SourceRef[] | null;
  analog: string | null;
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
