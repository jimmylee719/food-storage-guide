import type { Category } from './i18n';

/**
 * One glyph per category. They carry the "this is food" signal at a glance and
 * let the grids be scanned before they are read.
 */
export const CATEGORY_ICON: Record<Category, string> = {
  vegetables: '🥬', fruits: '🍊', meat: '🥩', poultry: '🍗', seafood: '🐟',
  'dairy-eggs': '🥛', 'grains-beans-pasta': '🌾', 'baked-goods': '🍞',
  'baking-staples': '🧁', 'condiments-sauces': '🧂', 'herbs-spices': '🌿',
  'oils-fats': '🫒', 'shelf-stable': '🥫', 'snacks-nuts-seeds': '🥜',
  beverages: '🧃', 'frozen-foods': '🧊', 'deli-prepared': '🍱',
  'vegetarian-proteins': '🫘', 'baby-food': '🍼',
};
