/**
 * FoodKeeper groups several foods into one record — "Papaya, mango, feijoa,
 * passionfruit, casaba melon" is a single entry, and salmon lives inside
 * "Fatty fish". People search for the individual food, so this splits those
 * records into standalone items that inherit the parent's timelines.
 *
 * This is not invention: every name below is one the USDA record explicitly
 * covers. Each derived item records the parent it came from so the page can
 * say so.
 *
 * Output: src/data/base/split.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'base', 'foodkeeper.json'), 'utf8'));
const bySlug = new Map(base.map((f) => [f.slug, f]));

// parent slug -> the foods that record explicitly covers
const SPLITS = {
  'papaya-mango-feijoa-passionfruit-casaha-melon': [
    { slug: 'mango', name: 'Mango', keywords: ['mango', 'mangoes'] },
    { slug: 'papaya', name: 'Papaya', keywords: ['papaya', 'pawpaw'] },
    { slug: 'passionfruit', name: 'Passionfruit', keywords: ['passionfruit', 'passion fruit', 'maracuya'] },
    { slug: 'feijoa', name: 'Feijoa', keywords: ['feijoa', 'pineapple guava'] },
    { slug: 'casaba-melon', name: 'Casaba melon', keywords: ['casaba', 'melon'] },
  ],
  'berries-cherries-goose-berries-lychee': [
    { slug: 'lychee', name: 'Lychee', keywords: ['lychee', 'litchi', 'lichee'] },
    { slug: 'gooseberries', name: 'Gooseberries', keywords: ['gooseberry', 'gooseberries'] },
  ],
  'berries-blackberries-boysenberries-currant': [
    { slug: 'blackberries', name: 'Blackberries', keywords: ['blackberry', 'blackberries'] },
    { slug: 'boysenberries', name: 'Boysenberries', keywords: ['boysenberry'] },
    { slug: 'currants', name: 'Currants', keywords: ['currant', 'redcurrant', 'blackcurrant'] },
  ],
  'peaches-nectarines-plums-pears-sapote': [
    { slug: 'peaches', name: 'Peaches', keywords: ['peach', 'peaches'] },
    { slug: 'nectarines', name: 'Nectarines', keywords: ['nectarine'] },
    { slug: 'plums', name: 'Plums', keywords: ['plum', 'plums'] },
    { slug: 'pears', name: 'Pears', keywords: ['pear', 'pears'] },
    { slug: 'sapote', name: 'Sapote', keywords: ['sapote', 'mamey'] },
  ],
  'citrus-fruit-lemon-lime-orange-grapefruit-tangerines-clementines': [
    { slug: 'lemons', name: 'Lemons', keywords: ['lemon', 'lemons'] },
    { slug: 'limes', name: 'Limes', keywords: ['lime', 'limes'] },
    { slug: 'oranges', name: 'Oranges', keywords: ['orange', 'oranges'] },
    { slug: 'grapefruit', name: 'Grapefruit', keywords: ['grapefruit', 'pomelo'] },
    { slug: 'tangerines', name: 'Tangerines and clementines', keywords: ['tangerine', 'clementine', 'mandarin'] },
  ],
  'carrots-parsnips': [
    { slug: 'carrots', name: 'Carrots', keywords: ['carrot', 'carrots'] },
    { slug: 'parsnips', name: 'Parsnips', keywords: ['parsnip'] },
  ],
  'beans-and-peas-green-fava-lima-soybean-wax-snow': [
    { slug: 'green-beans', name: 'Green beans', keywords: ['green bean', 'string bean', 'french bean'] },
    { slug: 'fava-beans', name: 'Fava beans', keywords: ['fava', 'broad bean'] },
    { slug: 'lima-beans', name: 'Lima beans', keywords: ['lima bean', 'butter bean'] },
    { slug: 'wax-beans', name: 'Wax beans', keywords: ['wax bean', 'yellow bean'] },
    { slug: 'snow-peas', name: 'Snow peas', keywords: ['snow pea', 'mangetout'] },
    { slug: 'sugar-snap-peas', name: 'Sugar snap peas', keywords: ['sugar snap', 'snap pea'] },
  ],
  'broccoli-and-broccoli-raab-rapini': [
    { slug: 'broccoli', name: 'Broccoli', keywords: ['broccoli'] },
    { slug: 'broccoli-rabe', name: 'Broccoli rabe', keywords: ['broccoli raab', 'rapini', 'broccoli rabe'] },
  ],
  'lettuce-iceberg-romaine': [
    { slug: 'iceberg-lettuce', name: 'Iceberg lettuce', keywords: ['iceberg', 'lettuce'] },
    { slug: 'romaine-lettuce', name: 'Romaine lettuce', keywords: ['romaine', 'cos lettuce'] },
  ],
  'lettuce-leaf-spinach': [
    { slug: 'leaf-lettuce', name: 'Leaf lettuce', keywords: ['leaf lettuce', 'loose leaf'] },
    { slug: 'spinach', name: 'Spinach', keywords: ['spinach'] },
  ],
  'squash-summer-zucchini': [
    { slug: 'summer-squash', name: 'Summer squash', keywords: ['summer squash', 'yellow squash', 'pattypan'] },
  ],
  'onions-yellow-white-red': [
    { slug: 'onions', name: 'Onions', keywords: ['onion', 'yellow onion', 'red onion', 'white onion'] },
  ],
  'peppers': [
    { slug: 'bell-peppers', name: 'Bell peppers', keywords: ['bell pepper', 'capsicum', 'sweet pepper'] },
  ],
  'lean-fish-cod-flounder-haddock-halibut-sole': [
    { slug: 'cod', name: 'Cod', keywords: ['cod', 'codfish'] },
    { slug: 'flounder', name: 'Flounder', keywords: ['flounder', 'plaice'] },
    { slug: 'haddock', name: 'Haddock', keywords: ['haddock'] },
    { slug: 'halibut', name: 'Halibut', keywords: ['halibut'] },
    { slug: 'sole', name: 'Sole', keywords: ['sole', 'dover sole'] },
  ],
  'lean-fish-pollock-ocean-perch-rockfish-sea-trout': [
    { slug: 'pollock', name: 'Pollock', keywords: ['pollock', 'pollack'] },
    { slug: 'ocean-perch', name: 'Ocean perch', keywords: ['ocean perch', 'redfish'] },
    { slug: 'rockfish', name: 'Rockfish', keywords: ['rockfish'] },
    { slug: 'sea-trout', name: 'Sea trout', keywords: ['sea trout'] },
  ],
  'fatty-fish-bluefish-catfish-mackerel-mullet-salmon-tuna': [
    { slug: 'salmon', name: 'Salmon', keywords: ['salmon'] },
    { slug: 'tuna-fresh', name: 'Tuna', subtitle: 'fresh', keywords: ['tuna', 'ahi', 'bluefin'] },
    { slug: 'mackerel', name: 'Mackerel', keywords: ['mackerel'] },
    { slug: 'catfish', name: 'Catfish', keywords: ['catfish'] },
    { slug: 'bluefish', name: 'Bluefish', keywords: ['bluefish'] },
    { slug: 'mullet', name: 'Mullet', keywords: ['mullet'] },
  ],
  'shrimp-crayfish': [
    { slug: 'shrimp', name: 'Shrimp', keywords: ['shrimp', 'prawn', 'prawns'] },
    { slug: 'crayfish', name: 'Crayfish', keywords: ['crayfish', 'crawfish'] },
  ],
  'shucked-clams-mussels-and-oysters': [
    { slug: 'clams-shucked', name: 'Clams', subtitle: 'shucked', keywords: ['clam', 'clams'] },
    { slug: 'mussels-shucked', name: 'Mussels', subtitle: 'shucked', keywords: ['mussel', 'mussels'] },
    { slug: 'oysters-shucked', name: 'Oysters', subtitle: 'shucked', keywords: ['oyster', 'oysters'] },
  ],
  'cheese-hard-cheddar-swiss-block-parmesan': [
    { slug: 'cheddar-cheese', name: 'Cheddar', keywords: ['cheddar'] },
    { slug: 'swiss-cheese', name: 'Swiss cheese', keywords: ['swiss', 'emmental', 'gruyere'] },
    { slug: 'parmesan-block', name: 'Parmesan', subtitle: 'block', keywords: ['parmesan', 'parmigiano'] },
  ],
  'cheese-soft-brie-bel-paese-goat': [
    { slug: 'brie', name: 'Brie', keywords: ['brie', 'camembert'] },
    { slug: 'goat-cheese', name: 'Goat cheese', keywords: ['goat cheese', 'chevre'] },
  ],
  'variety-meats-liver-tongue-chitterlings': [
    { slug: 'liver', name: 'Liver', keywords: ['liver', 'offal'] },
    { slug: 'tongue', name: 'Tongue', keywords: ['tongue', 'offal'] },
  ],
  'greens': [
    { slug: 'collard-greens', name: 'Collard and mustard greens', keywords: ['collard', 'mustard greens', 'turnip greens'] },
  ],
};

const out = [];
const replaced = new Set();
const problems = [];

for (const [parentSlug, children] of Object.entries(SPLITS)) {
  const parent = bySlug.get(parentSlug);
  if (!parent) { problems.push(`parent not found: ${parentSlug}`); continue; }
  replaced.add(parentSlug);
  for (const child of children) {
    if (bySlug.get(child.slug)) { problems.push(`slug already exists in base: ${child.slug}`); continue; }
    out.push({
      slug: child.slug,
      category: parent.category,
      source: 'usda-foodkeeper',
      sourceId: parent.sourceId,
      derivedFrom: parentSlug,
      derivedFromName: parent.name + (parent.subtitle ? `, ${parent.subtitle}` : ''),
      name: child.name,
      subtitle: child.subtitle || null,
      keywords: [...new Set([...(child.keywords || []), ...parent.keywords])],
      storage: parent.storage,
    });
  }
}

fs.writeFileSync(path.join(ROOT, 'src', 'data', 'base', 'split.json'), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(ROOT, 'src', 'data', 'base', 'split-replaces.json'), JSON.stringify([...replaced], null, 1));

console.log(`wrote ${out.length} split items, replacing ${replaced.size} combined records`);
if (problems.length) { console.log('problems:'); problems.forEach((p) => console.log('  ' + p)); }
