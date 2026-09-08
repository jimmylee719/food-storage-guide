/**
 * Adds a localised label to bare [[food:slug]] references in guide articles.
 *
 * A bare reference to a food that has no translated content yet renders its
 * English name in the middle of Chinese, Japanese or Spanish prose. Giving the
 * reference an explicit label fixes that permanently, whether or not the food
 * later gets a page.
 *
 * Labels come from the food's own content file when one exists, and otherwise
 * from the table below. Run again after new content lands to pick up better
 * names automatically.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const guidesDir = path.join(ROOT, 'src', 'data', 'guides');
const contentDir = path.join(ROOT, 'src', 'data', 'content');
const LOCALES = ['en', 'zh', 'ja', 'es'];

// Hand-written fallbacks for foods that have no content file yet.
const FALLBACK = {
  'soup-stews': { en: 'soups and stews', zh: '湯品與燉菜', ja: 'スープや煮込み', es: 'sopas y guisos' },
  potatoes: { en: 'potatoes', zh: '馬鈴薯', ja: 'じゃがいも', es: 'patatas' },
  tomatoes: { en: 'tomatoes', zh: '番茄', ja: 'トマト', es: 'tomates' },
  'egg-salad': { en: 'egg salad', zh: '雞蛋沙拉', ja: '卵サラダ', es: 'ensalada de huevo' },
  'potato-salad': { en: 'potato salad', zh: '馬鈴薯沙拉', ja: 'ポテトサラダ', es: 'ensalada de patata' },
  'chicken-salad': { en: 'chicken salad', zh: '雞肉沙拉', ja: 'チキンサラダ', es: 'ensalada de pollo' },
  'pizza-frozen': { en: 'frozen pizza', zh: '冷凍披薩', ja: '冷凍ピザ', es: 'pizza congelada' },
  'iceberg-lettuce': { en: 'iceberg lettuce', zh: '結球萵苣', ja: 'レタス', es: 'lechuga iceberg' },
  'leftovers-meat-fish-poultry-egg': { en: 'leftovers containing meat, fish, poultry or egg', zh: '含肉、魚、禽或蛋的剩菜', ja: '肉・魚・鶏肉・卵を含む残りもの', es: 'sobras con carne, pescado, ave o huevo' },
  'bagged-greens-leaf-spinach-lettuce': { en: 'bagged salad greens', zh: '袋裝生菜', ja: '袋入りサラダ野菜', es: 'ensalada en bolsa' },
};

function labelFor(slug, locale) {
  const p = path.join(contentDir, `${slug}.json`);
  if (fs.existsSync(p)) {
    try {
      const j = JSON.parse(fs.readFileSync(p, 'utf8'));
      if (j[locale] && j[locale].name) return j[locale].name;
    } catch { /* fall through */ }
  }
  return FALLBACK[slug] ? FALLBACK[slug][locale] : null;
}

const dryRun = process.argv.includes('--dry-run');
let changed = 0;
const unlabelled = new Set();

for (const file of fs.readdirSync(guidesDir).filter((f) => f.endsWith('.json'))) {
  const p = path.join(guidesDir, file);
  const guide = JSON.parse(fs.readFileSync(p, 'utf8'));
  let touched = false;

  for (const locale of LOCALES) {
    if (!guide[locale]) continue;
    const walk = (node) => {
      if (typeof node === 'string') {
        return node.replace(/\[\[food:([a-z0-9-]+)\]\]/g, (whole, slug) => {
          const label = labelFor(slug, locale);
          if (!label) { unlabelled.add(slug); return whole; }
          touched = true;
          return `[[food:${slug}|${label}]]`;
        });
      }
      if (Array.isArray(node)) return node.map(walk);
      if (node && typeof node === 'object') {
        const out = {};
        for (const k of Object.keys(node)) out[k] = walk(node[k]);
        return out;
      }
      return node;
    };
    guide[locale] = walk(guide[locale]);
  }

  if (touched) {
    changed++;
    if (!dryRun) fs.writeFileSync(p, JSON.stringify(guide, null, 1) + '\n');
    console.log(`${dryRun ? 'would update' : 'updated'} ${file}`);
  }
}

console.log(`\n${changed} guide file(s) ${dryRun ? 'would be' : ''} updated`);
if (unlabelled.size) {
  console.log(`No label available for: ${[...unlabelled].sort().join(', ')}`);
  console.log('Add them to FALLBACK in this script, or write their content files.');
}
