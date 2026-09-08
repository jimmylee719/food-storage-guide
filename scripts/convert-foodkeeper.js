// Converts USDA FSIS FoodKeeper JSON (public domain) into the site's base dataset.
// Source: https://catalog.data.gov/dataset/fsis-foodkeeper-data (FMA-Data-v128)
const fs = require('fs');
const path = require('path');
const src = process.argv[2];
const d = JSON.parse(fs.readFileSync(src, 'utf8'));
const rows = d.sheets.find((s) => s.name === 'Product').data.map((r) => Object.assign({}, ...r));

const catMap = {
  1: 'baby-food', 2: 'baked-goods', 3: 'baking-staples', 4: 'baked-goods', 5: 'beverages', 6: 'condiments-sauces',
  7: 'dairy-eggs', 8: 'frozen-foods', 9: 'grains-beans-pasta', 10: 'meat', 11: 'meat', 12: 'meat', 13: 'meat',
  14: 'poultry', 15: 'poultry', 16: 'poultry', 17: 'poultry', 18: 'fruits', 19: 'vegetables', 20: 'seafood',
  21: 'seafood', 22: 'seafood', 23: 'shelf-stable', 24: 'vegetarian-proteins', 25: 'deli-prepared',
};
const herbIds = new Set([288, 505, 506, 507, 508, 509, 510, 511, 512, 513, 611, 232, 233, 234, 236, 237, 238, 598, 468, 469, 470, 471, 472, 473, 474, 475, 476, 684]);
const snackIds = new Set([377, 378, 380, 381, 386, 389, 390, 391, 392, 394, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 503, 504, 555, 556, 573, 604, 605, 606, 607, 608, 609, 610, 613, 616, 653, 655, 658, 682, 379]);
const oilIds = new Set([454, 520, 521, 522, 523, 612, 668, 227, 228, 229, 230, 524, 525, 526]);

function slugify(s) {
  return s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
const STOP = /\b(such as|etc|or|and|with|the|of|in)\b/gi;
const slugOverride = {106:'raw-meat-kabobs-with-vegetables',132:'raw-poultry-kabobs-with-vegetables',112:'retort-pouches-meat',143:'retort-pouches-poultry',363:'baby-food-jars-pouches',364:'baby-food-fruit',365:'baby-food-vegetables',366:'baby-food-dinners',367:'baby-food-cereal',315:'frozen-fruits',331:'frozen-vegetables',310:'frozen-egg-substitutes',309:'frozen-dough-commercial',311:'frozen-fish-breaded',312:'frozen-fish-raw-headed-gutted',320:'frozen-lobster-tails',321:'frozen-pancakes-waffles',322:'frozen-sausages-uncooked',323:'frozen-sausages-precooked',325:'frozen-shrimp-shellfish',326:'frozen-soy-crumbles-hot-dogs',327:'frozen-soy-meat-substitutes',328:'frozen-tempeh',330:'frozen-entrees-prepared-meals'};
const seen = new Map();
const out = [];
for (const r of rows) {
  if (!r.Name) continue;
  let category = catMap[r.Category_ID];
  if (herbIds.has(r.ID)) category = 'herbs-spices';
  if (snackIds.has(r.ID)) category = 'snacks-nuts-seeds';
  if (oilIds.has(r.ID)) category = 'oils-fats';
  const name = r.Name.trim().replace(/\s+/g, ' ');
  const subtitle = (r.Name_subtitle || '').trim().replace(/\s+/g, ' ');
  let slug = slugify(name);
  if (subtitle) {
    const cleaned = subtitle.replace(/\(.*?\)/g, ' ').replace(STOP, ' ');
    const part = slugify(cleaned).split('-').filter(Boolean).slice(0, 6).join('-');
    if (part) slug += '-' + part;
  }
  if (slugOverride[r.ID]) slug = slugOverride[r.ID];
  if (seen.has(slug)) { let i = 2; while (seen.has(slug + '-' + i)) i++; slug = slug + '-' + i; }
  seen.set(slug, true);
  const span = (min, max, metric, tips) => (min == null && max == null && !tips) ? null : { min, max, unit: metric ? metric.toLowerCase() : null, tips: tips || null };
  const storage = {
    pantry: {
      base: span(r.Pantry_Min, r.Pantry_Max, r.Pantry_Metric, r.Pantry_tips),
      fromPurchase: span(r.DOP_Pantry_Min, r.DOP_Pantry_Max, r.DOP_Pantry_Metric, r.DOP_Pantry_tips),
      afterOpening: span(r.Pantry_After_Opening_Min, r.Pantry_After_Opening_Max, r.Pantry_After_Opening_Metric, null),
    },
    fridge: {
      base: span(r.Refrigerate_Min, r.Refrigerate_Max, r.Refrigerate_Metric, r.Refrigerate_tips),
      fromPurchase: span(r.DOP_Refrigerate_Min, r.DOP_Refrigerate_Max, r.DOP_Refrigerate_Metric, r.DOP_Refrigerate_tips),
      afterOpening: span(r.Refrigerate_After_Opening_Min, r.Refrigerate_After_Opening_Max, r.Refrigerate_After_Opening_Metric, null),
      afterThawing: span(r.Refrigerate_After_Thawing_Min, r.Refrigerate_After_Thawing_Max, r.Refrigerate_After_Thawing_Metric, null),
    },
    freezer: {
      base: span(r.Freeze_Min, r.Freeze_Max, r.Freeze_Metric, r.Freeze_Tips),
      fromPurchase: span(r.DOP_Freeze_Min, r.DOP_Freeze_Max, r.DOP_Freeze_Metric, r.DOP_Freeze_Tips),
    },
  };
  for (const k of Object.keys(storage)) {
    for (const kk of Object.keys(storage[k])) if (!storage[k][kk]) delete storage[k][kk];
    if (!Object.keys(storage[k]).length) delete storage[k];
  }
  out.push({ slug, category, source: 'usda-foodkeeper', sourceId: r.ID, name, subtitle: subtitle || null, keywords: (r.Keywords || '').split(',').map((s) => s.trim()).filter(Boolean), storage });
}
fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'base', 'foodkeeper.json'), JSON.stringify(out, null, 1));
console.log('wrote', out.length, 'items');
const cats = {}; out.forEach((o) => { cats[o.category] = (cats[o.category] || 0) + 1; }); console.log(cats);
