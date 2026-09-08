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

// Local-language names, so search finds these before their translated
// content files exist.
const LOCAL_NAMES = {
 "mango": [
  "芒果",
  "マンゴー",
  "mango"
 ],
 "papaya": [
  "木瓜",
  "パパイヤ",
  "papaya"
 ],
 "passionfruit": [
  "百香果",
  "パッションフルーツ",
  "maracuyá",
  "fruta de la pasión"
 ],
 "feijoa": [
  "斐濟果",
  "フェイジョア",
  "feijoa"
 ],
 "casaba-melon": [
  "卡薩巴甜瓜",
  "カサバメロン",
  "melón casaba"
 ],
 "lychee": [
  "荔枝",
  "ライチ",
  "lichi"
 ],
 "gooseberries": [
  "醋栗",
  "グーズベリー",
  "grosella espinosa"
 ],
 "blackberries": [
  "黑莓",
  "ブラックベリー",
  "mora"
 ],
 "boysenberries": [
  "波森莓",
  "ボイセンベリー",
  "baya de Boysen"
 ],
 "currants": [
  "醋栗",
  "カラント",
  "grosella"
 ],
 "peaches": [
  "桃子",
  "桃",
  "もも",
  "melocotón",
  "durazno"
 ],
 "nectarines": [
  "油桃",
  "ネクタリン",
  "nectarina"
 ],
 "plums": [
  "李子",
  "梅",
  "プラム",
  "ciruela"
 ],
 "pears": [
  "西洋梨",
  "梨",
  "洋なし",
  "pera"
 ],
 "sapote": [
  "人心果",
  "サポテ",
  "zapote"
 ],
 "lemons": [
  "檸檬",
  "レモン",
  "limón"
 ],
 "limes": [
  "萊姆",
  "ライム",
  "lima"
 ],
 "oranges": [
  "柳橙",
  "柳丁",
  "オレンジ",
  "naranja"
 ],
 "grapefruit": [
  "葡萄柚",
  "グレープフルーツ",
  "pomelo",
  "toronja"
 ],
 "tangerines": [
  "橘子",
  "柑橘",
  "みかん",
  "mandarina",
  "clementina"
 ],
 "carrots": [
  "紅蘿蔔",
  "胡蘿蔔",
  "にんじん",
  "zanahoria"
 ],
 "parsnips": [
  "歐防風",
  "パースニップ",
  "chirivía"
 ],
 "green-beans": [
  "四季豆",
  "敏豆",
  "いんげん",
  "judía verde",
  "ejote"
 ],
 "fava-beans": [
  "蠶豆",
  "そら豆",
  "haba"
 ],
 "lima-beans": [
  "皇帝豆",
  "ライマメ",
  "haba de Lima"
 ],
 "wax-beans": [
  "黃四季豆",
  "黄いんげん",
  "judía amarilla"
 ],
 "snow-peas": [
  "豌豆莢",
  "荷蘭豆",
  "さやえんどう",
  "tirabeque"
 ],
 "sugar-snap-peas": [
  "甜豆",
  "スナップえんどう",
  "guisante dulce"
 ],
 "broccoli": [
  "青花菜",
  "綠花椰菜",
  "ブロッコリー",
  "brócoli"
 ],
 "broccoli-rabe": [
  "蕪菁葉花菜",
  "菜心",
  "ブロッコリーラーブ",
  "grelo"
 ],
 "iceberg-lettuce": [
  "結球萵苣",
  "美生菜",
  "レタス",
  "lechuga iceberg"
 ],
 "romaine-lettuce": [
  "蘿蔓",
  "ロメインレタス",
  "lechuga romana"
 ],
 "leaf-lettuce": [
  "葉萵苣",
  "リーフレタス",
  "lechuga de hoja"
 ],
 "spinach": [
  "菠菜",
  "ほうれん草",
  "espinaca"
 ],
 "summer-squash": [
  "夏南瓜",
  "ズッキーニ",
  "calabacín",
  "calabaza de verano"
 ],
 "onions": [
  "洋蔥",
  "たまねぎ",
  "cebolla"
 ],
 "bell-peppers": [
  "甜椒",
  "彩椒",
  "青椒",
  "ピーマン",
  "パプリカ",
  "pimiento"
 ],
 "cod": [
  "鱈魚",
  "たら",
  "bacalao"
 ],
 "flounder": [
  "比目魚",
  "ひらめ",
  "かれい",
  "platija"
 ],
 "haddock": [
  "黑線鱈",
  "ハドック",
  "eglefino"
 ],
 "halibut": [
  "大比目魚",
  "おひょう",
  "fletán"
 ],
 "sole": [
  "鰈魚",
  "舌鰨",
  "したびらめ",
  "lenguado"
 ],
 "pollock": [
  "明太魚",
  "狹鱈",
  "すけとうだら",
  "abadejo"
 ],
 "ocean-perch": [
  "赤鮭",
  "紅魚",
  "あかうお",
  "gallineta"
 ],
 "rockfish": [
  "石斑",
  "岩魚",
  "めばる",
  "cabracho"
 ],
 "sea-trout": [
  "海鱒",
  "うみます",
  "trucha marina"
 ],
 "salmon": [
  "鮭魚",
  "三文魚",
  "さけ",
  "サーモン",
  "salmón"
 ],
 "tuna-fresh": [
  "鮪魚",
  "生鮪魚",
  "まぐろ",
  "ツナ",
  "atún"
 ],
 "mackerel": [
  "鯖魚",
  "さば",
  "caballa"
 ],
 "catfish": [
  "鯰魚",
  "なまず",
  "bagre"
 ],
 "bluefish": [
  "扁鰺",
  "青魚",
  "あおざかな",
  "anjova"
 ],
 "mullet": [
  "烏魚",
  "ぼら",
  "mújol",
  "lisa"
 ],
 "shrimp": [
  "蝦子",
  "蝦",
  "えび",
  "海老",
  "gamba",
  "camarón"
 ],
 "crayfish": [
  "淡水螯蝦",
  "小龍蝦",
  "ザリガニ",
  "cangrejo de río"
 ],
 "clams-shucked": [
  "蛤蜊肉",
  "去殼蛤蜊",
  "むき身あさり",
  "almeja sin concha"
 ],
 "mussels-shucked": [
  "淡菜肉",
  "去殼淡菜",
  "むき身ムール貝",
  "mejillón sin concha"
 ],
 "oysters-shucked": [
  "蚵仔",
  "牡蠣肉",
  "むき身かき",
  "ostra sin concha"
 ],
 "cheddar-cheese": [
  "切達起司",
  "チェダーチーズ",
  "queso cheddar"
 ],
 "swiss-cheese": [
  "瑞士起司",
  "スイスチーズ",
  "queso suizo"
 ],
 "parmesan-block": [
  "帕瑪森起司",
  "パルメザンチーズ",
  "queso parmesano"
 ],
 "brie": [
  "布里起司",
  "カマンベール",
  "ブリー",
  "queso brie"
 ],
 "goat-cheese": [
  "山羊起司",
  "羊奶起司",
  "シェーブル",
  "queso de cabra"
 ],
 "liver": [
  "肝臟",
  "豬肝",
  "レバー",
  "肝",
  "hígado"
 ],
 "tongue": [
  "舌",
  "牛舌",
  "たん",
  "lengua"
 ],
 "collard-greens": [
  "羽衣甘藍葉",
  "芥菜葉",
  "コラードグリーン",
  "berza"
 ]
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
      keywords: [...new Set([...(child.keywords || []), ...(LOCAL_NAMES[child.slug] || []), ...parent.keywords])],
      storage: parent.storage,
    });
  }
}

fs.writeFileSync(path.join(ROOT, 'src', 'data', 'base', 'split.json'), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(ROOT, 'src', 'data', 'base', 'split-replaces.json'), JSON.stringify([...replaced], null, 1));

console.log(`wrote ${out.length} split items, replacing ${replaced.size} combined records`);
if (problems.length) { console.log('problems:'); problems.forEach((p) => console.log('  ' + p)); }
