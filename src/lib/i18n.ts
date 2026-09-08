export const LOCALES = ['zh', 'en', 'ja', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh';

export const HTML_LANG: Record<Locale, string> = {
  zh: 'zh-Hant-TW',
  en: 'en',
  ja: 'ja',
  es: 'es',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  zh: '繁體中文',
  en: 'English',
  ja: '日本語',
  es: 'Español',
};

export const CATEGORIES = [
  'vegetables', 'fruits', 'meat', 'poultry', 'seafood', 'dairy-eggs',
  'grains-beans-pasta', 'baked-goods', 'baking-staples', 'condiments-sauces',
  'herbs-spices', 'oils-fats', 'shelf-stable', 'snacks-nuts-seeds',
  'beverages', 'frozen-foods', 'deli-prepared', 'vegetarian-proteins', 'baby-food',
] as const;
export type Category = (typeof CATEGORIES)[number];

type Dict = {
  siteName: string;
  tagline: string;
  siteDescription: string;
  searchPlaceholder: string;
  searchLabel: string;
  noResults: string;
  browseAll: string;
  categories: string;
  guides: string;
  guidesTitle: string;
  guidesDescription: string;
  allFoods: string;
  home: string;
  pantry: string;
  fridge: string;
  freezer: string;
  pantryLong: string;
  fridgeLong: string;
  freezerLong: string;
  notRecommended: string;
  noData: string;
  fromPurchase: string;
  afterOpening: string;
  afterThawing: string;
  generalTimeline: string;
  summary: string;
  howToStore: string;
  thawing: string;
  spoilageSigns: string;
  tips: string;
  faq: string;
  relatedFoods: string;
  relatedGuides: string;
  sources: string;
  sourceNote: string;
  updated: string;
  keyTakeaways: string;
  about: string;
  privacy: string;
  terms: string;
  contact: string;
  methodology: string;
  disclaimer: string;
  disclaimerBody: string;
  backTo: string;
  itemsCount: (n: number) => string;
  categoryNames: Record<Category, string>;
  guideCategoryNames: Record<string, string>;
  unit: Record<string, [string, string]>;
  rangeJoin: string;
  heroLead: string;
  heroPoints: string[];
  popularGuides: string;
  browseByCategory: string;
  dataScope: string;
  detailPageCta: string;
  listingOnly: string;
  quickAnswer: string;
  seeNotes: string;
  categoryTitleSuffix: string;
  categoryDescLead: (n: number, name: string) => string;
  seeGuide: string;
  languageLabel: string;
  toc: string;
};

const zh: Dict = {
  siteName: '食材保存指南',
  tagline: '常溫、冷藏、冷凍保存期限查詢',
  siteDescription: '查詢 700 多種食材的常溫、冷藏與冷凍保存期限，資料以美國農業部 FoodKeeper、FDA 與各國食品安全機關指引為基礎，並附上保存訣竅、腐敗判斷與安全解凍方法。',
  searchPlaceholder: '搜尋食材，例如：雞肉、高麗菜、鮭魚…',
  searchLabel: '搜尋食材',
  noResults: '找不到符合的食材，換個關鍵字試試。',
  browseAll: '瀏覽全部食材',
  categories: '分類',
  guides: '保存知識',
  guidesTitle: '食物保存與食品安全指南',
  guidesDescription: '從冰箱溫度、危險溫度帶到解凍與剩菜保存，依據官方指引整理的完整食物保存知識庫。',
  allFoods: '全部食材',
  home: '首頁',
  pantry: '常溫',
  fridge: '冷藏',
  freezer: '冷凍',
  pantryLong: '常溫保存（陰涼乾燥處）',
  fridgeLong: '冷藏保存（4°C 以下）',
  freezerLong: '冷凍保存（−18°C）',
  notRecommended: '不建議',
  noData: '無資料',
  fromPurchase: '自購買日起',
  afterOpening: '開封後',
  afterThawing: '解凍後',
  generalTimeline: '一般期限',
  summary: '重點摘要',
  howToStore: '保存方法',
  thawing: '安全解凍',
  spoilageSigns: '壞掉的徵兆',
  tips: '實用訣竅',
  faq: '常見問題',
  relatedFoods: '相關食材',
  relatedGuides: '延伸閱讀',
  sources: '資料來源',
  sourceNote: '保存期限以美國農業部 FSIS FoodKeeper 資料集（公眾領域）為基礎，並參考各國食品安全機關指引。期限為「最佳品質」參考值，實際狀況仍以食材外觀、氣味與你的保存條件為準。',
  updated: '更新日期',
  keyTakeaways: '重點整理',
  about: '關於本站',
  privacy: '隱私權政策',
  terms: '使用條款',
  contact: '聯絡我們',
  methodology: '資料來源與方法',
  disclaimer: '免責聲明',
  disclaimerBody: '本站內容僅供一般參考，不構成醫療或專業建議。食材若有異味、變色、發霉或包裝膨脹，請直接丟棄，不要試吃。',
  backTo: '返回',
  itemsCount: (n) => `${n} 種食材`,
  categoryNames: {
    vegetables: '蔬菜', fruits: '水果', meat: '肉類', poultry: '禽肉', seafood: '海鮮',
    'dairy-eggs': '乳製品與蛋', 'grains-beans-pasta': '穀物、豆類與麵食', 'baked-goods': '烘焙食品',
    'baking-staples': '烘焙原料', 'condiments-sauces': '調味料與醬料', 'herbs-spices': '香草與香料',
    'oils-fats': '油脂', 'shelf-stable': '常溫食品', 'snacks-nuts-seeds': '零食、堅果與種子',
    beverages: '飲料', 'frozen-foods': '冷凍食品', 'deli-prepared': '熟食與即食',
    'vegetarian-proteins': '素食蛋白', 'baby-food': '嬰兒食品',
  },
  guideCategoryNames: { safety: '食品安全', fridge: '冷藏', freezer: '冷凍', pantry: '常溫', basics: '基礎知識' },
  unit: { days: ['天', '天'], weeks: ['週', '週'], months: ['個月', '個月'], years: ['年', '年'], hours: ['小時', '小時'] },
  rangeJoin: '–',
  heroLead: '輸入食材名稱，立刻知道能放多久、怎麼放最好。',
  heroPoints: ['以美國農業部 FoodKeeper 官方資料集為基礎', '常溫、冷藏、冷凍三種方式一次比較', '附腐敗判斷、解凍方法與實用訣竅'],
  popularGuides: '熱門保存知識',
  browseByCategory: '依分類瀏覽',
  dataScope: '收錄食材',
  detailPageCta: '查看完整保存方法',
  listingOnly: '此食材目前提供保存期限資料，完整說明整理中。',
  quickAnswer: '快速解答',
  seeNotes: '見說明',
  categoryTitleSuffix: '保存方法與保鮮期限（常溫、冷藏、冷凍）',
  categoryDescLead: (n, name) => `${n} 種${name}的常溫、冷藏與冷凍保存期限一覽，以美國農業部 FoodKeeper 資料為基礎，並附保存訣竅與腐敗判斷。`,
  seeGuide: '閱讀完整指南',
  languageLabel: '語言',
  toc: '本文目錄',
};

const en: Dict = {
  siteName: 'Food Storage Guide',
  tagline: 'Pantry, fridge and freezer storage times',
  siteDescription: 'Look up how long 700+ foods keep in the pantry, fridge and freezer. Built on the USDA FoodKeeper dataset and food-safety guidance from the FDA, WHO and national agencies, with storage tips, spoilage signs and safe thawing.',
  searchPlaceholder: 'Search a food, e.g. chicken, cabbage, salmon…',
  searchLabel: 'Search foods',
  noResults: 'No matching food. Try another word.',
  browseAll: 'Browse all foods',
  categories: 'Categories',
  guides: 'Guides',
  guidesTitle: 'Food storage and food safety guides',
  guidesDescription: 'Fridge temperatures, the danger zone, safe thawing, leftovers and more, written from official food-safety guidance.',
  allFoods: 'All foods',
  home: 'Home',
  pantry: 'Pantry',
  fridge: 'Fridge',
  freezer: 'Freezer',
  pantryLong: 'Pantry (cool, dry place)',
  fridgeLong: 'Refrigerator (≤ 4 °C / 40 °F)',
  freezerLong: 'Freezer (−18 °C / 0 °F)',
  notRecommended: 'Not recommended',
  noData: 'No data',
  fromPurchase: 'From date of purchase',
  afterOpening: 'After opening',
  afterThawing: 'After thawing',
  generalTimeline: 'General timeline',
  summary: 'Summary',
  howToStore: 'How to store it',
  thawing: 'Safe thawing',
  spoilageSigns: 'Signs it has gone bad',
  tips: 'Practical tips',
  faq: 'Frequently asked questions',
  relatedFoods: 'Related foods',
  relatedGuides: 'Related guides',
  sources: 'Sources',
  sourceNote: 'Storage times are based on the USDA FSIS FoodKeeper dataset (public domain) and guidance from national food-safety agencies. They indicate best quality; always judge by smell, look and your own storage conditions.',
  updated: 'Updated',
  keyTakeaways: 'Key takeaways',
  about: 'About',
  privacy: 'Privacy policy',
  terms: 'Terms of use',
  contact: 'Contact',
  methodology: 'Sources & method',
  disclaimer: 'Disclaimer',
  disclaimerBody: 'This site is general information, not medical or professional advice. If food smells off, looks discoloured, shows mould or the package is swollen, throw it out. Do not taste it.',
  backTo: 'Back to',
  itemsCount: (n) => `${n} foods`,
  categoryNames: {
    vegetables: 'Vegetables', fruits: 'Fruits', meat: 'Meat', poultry: 'Poultry', seafood: 'Seafood',
    'dairy-eggs': 'Dairy & eggs', 'grains-beans-pasta': 'Grains, beans & pasta', 'baked-goods': 'Baked goods',
    'baking-staples': 'Baking staples', 'condiments-sauces': 'Condiments & sauces', 'herbs-spices': 'Herbs & spices',
    'oils-fats': 'Oils & fats', 'shelf-stable': 'Shelf-stable foods', 'snacks-nuts-seeds': 'Snacks, nuts & seeds',
    beverages: 'Beverages', 'frozen-foods': 'Frozen foods', 'deli-prepared': 'Deli & prepared',
    'vegetarian-proteins': 'Vegetarian proteins', 'baby-food': 'Baby food',
  },
  guideCategoryNames: { safety: 'Food safety', fridge: 'Refrigeration', freezer: 'Freezing', pantry: 'Pantry', basics: 'Basics' },
  unit: { days: ['day', 'days'], weeks: ['week', 'weeks'], months: ['month', 'months'], years: ['year', 'years'], hours: ['hour', 'hours'] },
  rangeJoin: '–',
  heroLead: 'Type a food and see how long it keeps, and how to store it properly.',
  heroPoints: ['Built on the USDA FoodKeeper dataset', 'Pantry, fridge and freezer side by side', 'Spoilage signs, thawing and practical tips'],
  popularGuides: 'Popular guides',
  browseByCategory: 'Browse by category',
  dataScope: 'Foods covered',
  detailPageCta: 'See full storage guide',
  listingOnly: 'Storage times are available for this food. The full write-up is in progress.',
  quickAnswer: 'Quick answer',
  seeNotes: 'See notes',
  categoryTitleSuffix: 'storage times in the pantry, fridge and freezer',
  categoryDescLead: (n, name) => `Storage times for ${n} ${name.toLowerCase()} in the pantry, fridge and freezer, based on the USDA FoodKeeper dataset, with tips and spoilage signs.`,
  seeGuide: 'Read the full guide',
  languageLabel: 'Language',
  toc: 'On this page',
};

const ja: Dict = {
  siteName: '食品保存ガイド',
  tagline: '常温・冷蔵・冷凍の保存期間がすぐ分かる',
  siteDescription: '700 種類以上の食材について、常温・冷蔵・冷凍の保存期間を検索できます。米国農務省 FoodKeeper データセットと各国food safety機関の指針をもとに、保存のコツ、傷みのサイン、安全な解凍方法をまとめました。',
  searchPlaceholder: '食材を検索（例：鶏肉、キャベツ、鮭…）',
  searchLabel: '食材を検索',
  noResults: '該当する食材が見つかりません。別のことばで試してください。',
  browseAll: 'すべての食材を見る',
  categories: 'カテゴリー',
  guides: '保存の知識',
  guidesTitle: '食品保存と食品安全のガイド',
  guidesDescription: '冷蔵庫の温度、危険温度帯、安全な解凍、作りおきの保存まで。公的機関の指針にもとづく保存の知識をまとめています。',
  allFoods: 'すべての食材',
  home: 'ホーム',
  pantry: '常温',
  fridge: '冷蔵',
  freezer: '冷凍',
  pantryLong: '常温保存（冷暗所）',
  fridgeLong: '冷蔵保存（4°C 以下）',
  freezerLong: '冷凍保存（−18°C）',
  notRecommended: '推奨されません',
  noData: 'データなし',
  fromPurchase: '購入日から',
  afterOpening: '開封後',
  afterThawing: '解凍後',
  generalTimeline: '目安の期間',
  summary: '要点',
  howToStore: '保存方法',
  thawing: '安全な解凍',
  spoilageSigns: '傷んだサイン',
  tips: '保存のコツ',
  faq: 'よくある質問',
  relatedFoods: '関連する食材',
  relatedGuides: '関連ガイド',
  sources: '出典',
  sourceNote: '保存期間は米国農務省 FSIS FoodKeeper データセット（パブリックドメイン）と各国の食品安全機関の指針にもとづく「おいしさの目安」です。実際にはにおい・見た目・保存状態で判断してください。',
  updated: '更新日',
  keyTakeaways: 'この記事の要点',
  about: 'このサイトについて',
  privacy: 'プライバシーポリシー',
  terms: '利用規約',
  contact: 'お問い合わせ',
  methodology: '出典と作成方法',
  disclaimer: '免責事項',
  disclaimerBody: '本サイトは一般的な情報提供であり、医学的・専門的な助言ではありません。異臭、変色、カビ、容器の膨張がある場合は、味見せずに廃棄してください。',
  backTo: '戻る：',
  itemsCount: (n) => `${n} 品目`,
  categoryNames: {
    vegetables: '野菜', fruits: '果物', meat: '肉類', poultry: '鶏肉・鳥肉', seafood: '魚介類',
    'dairy-eggs': '乳製品・卵', 'grains-beans-pasta': '穀物・豆・麺', 'baked-goods': 'パン・焼き菓子',
    'baking-staples': '製菓・製パン材料', 'condiments-sauces': '調味料・ソース', 'herbs-spices': 'ハーブ・スパイス',
    'oils-fats': '油脂', 'shelf-stable': '常温保存食品', 'snacks-nuts-seeds': 'スナック・ナッツ・種子',
    beverages: '飲みもの', 'frozen-foods': '冷凍食品', 'deli-prepared': '惣菜・調理済み',
    'vegetarian-proteins': '大豆・植物性たんぱく', 'baby-food': 'ベビーフード',
  },
  guideCategoryNames: { safety: '食品安全', fridge: '冷蔵', freezer: '冷凍', pantry: '常温', basics: '基本' },
  unit: { days: ['日', '日'], weeks: ['週間', '週間'], months: ['か月', 'か月'], years: ['年', '年'], hours: ['時間', '時間'] },
  rangeJoin: '〜',
  heroLead: '食材名を入れるだけで、保存期間と正しい保存方法が分かります。',
  heroPoints: ['米国農務省 FoodKeeper データセットがベース', '常温・冷蔵・冷凍をひと目で比較', '傷みのサイン、解凍方法、保存のコツつき'],
  popularGuides: 'よく読まれているガイド',
  browseByCategory: 'カテゴリーから探す',
  dataScope: '収録食材',
  detailPageCta: '詳しい保存方法を見る',
  listingOnly: 'この食材は保存期間のデータを掲載しています。詳しい解説は準備中です。',
  quickAnswer: '結論',
  seeNotes: '備考あり',
  categoryTitleSuffix: 'の保存期間：常温・冷蔵・冷凍の目安',
  categoryDescLead: (n, name) => `${name}${n} 品目の常温・冷蔵・冷凍の保存期間一覧。米国農務省 FoodKeeper データにもとづき、保存のコツと傷みのサインも掲載。`,
  seeGuide: 'ガイドを読む',
  languageLabel: '言語',
  toc: '目次',
};

const es: Dict = {
  siteName: 'Guía de Conservación de Alimentos',
  tagline: 'Cuánto duran los alimentos a temperatura ambiente, en nevera y congelador',
  siteDescription: 'Consulta cuánto duran más de 700 alimentos en la despensa, la nevera y el congelador. Basado en el conjunto de datos FoodKeeper del USDA y en las guías de seguridad alimentaria de la FDA, la OMS y agencias nacionales, con consejos, señales de deterioro y descongelación segura.',
  searchPlaceholder: 'Busca un alimento: pollo, repollo, salmón…',
  searchLabel: 'Buscar alimentos',
  noResults: 'No hay resultados. Prueba con otra palabra.',
  browseAll: 'Ver todos los alimentos',
  categories: 'Categorías',
  guides: 'Guías',
  guidesTitle: 'Guías de conservación y seguridad alimentaria',
  guidesDescription: 'Temperatura de la nevera, zona de peligro, descongelación segura, sobras y mucho más, con base en guías oficiales.',
  allFoods: 'Todos los alimentos',
  home: 'Inicio',
  pantry: 'Despensa',
  fridge: 'Nevera',
  freezer: 'Congelador',
  pantryLong: 'Despensa (lugar fresco y seco)',
  fridgeLong: 'Nevera (≤ 4 °C / 40 °F)',
  freezerLong: 'Congelador (−18 °C / 0 °F)',
  notRecommended: 'No recomendado',
  noData: 'Sin datos',
  fromPurchase: 'Desde la compra',
  afterOpening: 'Una vez abierto',
  afterThawing: 'Tras descongelar',
  generalTimeline: 'Plazo general',
  summary: 'Resumen',
  howToStore: 'Cómo conservarlo',
  thawing: 'Descongelación segura',
  spoilageSigns: 'Señales de que está en mal estado',
  tips: 'Consejos prácticos',
  faq: 'Preguntas frecuentes',
  relatedFoods: 'Alimentos relacionados',
  relatedGuides: 'Guías relacionadas',
  sources: 'Fuentes',
  sourceNote: 'Los plazos se basan en el conjunto de datos FoodKeeper del USDA FSIS (dominio público) y en guías de agencias nacionales de seguridad alimentaria. Indican calidad óptima; guíate siempre por el olor, el aspecto y tus condiciones de conservación.',
  updated: 'Actualizado',
  keyTakeaways: 'Ideas clave',
  about: 'Sobre el sitio',
  privacy: 'Política de privacidad',
  terms: 'Términos de uso',
  contact: 'Contacto',
  methodology: 'Fuentes y método',
  disclaimer: 'Aviso',
  disclaimerBody: 'Este sitio ofrece información general, no consejo médico ni profesional. Si un alimento huele mal, cambia de color, tiene moho o el envase está hinchado, tíralo. No lo pruebes.',
  backTo: 'Volver a',
  itemsCount: (n) => `${n} alimentos`,
  categoryNames: {
    vegetables: 'Verduras', fruits: 'Frutas', meat: 'Carne', poultry: 'Aves', seafood: 'Pescado y marisco',
    'dairy-eggs': 'Lácteos y huevos', 'grains-beans-pasta': 'Cereales, legumbres y pasta', 'baked-goods': 'Panadería y bollería',
    'baking-staples': 'Ingredientes de repostería', 'condiments-sauces': 'Condimentos y salsas', 'herbs-spices': 'Hierbas y especias',
    'oils-fats': 'Aceites y grasas', 'shelf-stable': 'Productos de despensa', 'snacks-nuts-seeds': 'Snacks, frutos secos y semillas',
    beverages: 'Bebidas', 'frozen-foods': 'Congelados', 'deli-prepared': 'Charcutería y platos preparados',
    'vegetarian-proteins': 'Proteínas vegetales', 'baby-food': 'Alimentación infantil',
  },
  guideCategoryNames: { safety: 'Seguridad alimentaria', fridge: 'Refrigeración', freezer: 'Congelación', pantry: 'Despensa', basics: 'Fundamentos' },
  unit: { days: ['día', 'días'], weeks: ['semana', 'semanas'], months: ['mes', 'meses'], years: ['año', 'años'], hours: ['hora', 'horas'] },
  rangeJoin: '–',
  heroLead: 'Escribe un alimento y descubre cuánto dura y cómo guardarlo bien.',
  heroPoints: ['Basado en el conjunto de datos FoodKeeper del USDA', 'Despensa, nevera y congelador comparados', 'Señales de deterioro, descongelación y consejos'],
  popularGuides: 'Guías destacadas',
  browseByCategory: 'Explorar por categoría',
  dataScope: 'Alimentos incluidos',
  detailPageCta: 'Ver la guía completa',
  listingOnly: 'Este alimento tiene datos de conservación. La ficha completa está en preparación.',
  quickAnswer: 'Respuesta rápida',
  seeNotes: 'Ver notas',
  categoryTitleSuffix: 'cuánto duran en despensa, nevera y congelador',
  categoryDescLead: (n, name) => `Tiempos de conservación de ${n} ${name.toLowerCase()} en despensa, nevera y congelador, según el conjunto de datos FoodKeeper del USDA.`,
  seeGuide: 'Leer la guía completa',
  languageLabel: 'Idioma',
  toc: 'En esta página',
};

const DICTS: Record<Locale, Dict> = { zh, en, ja, es };

export function t(locale: Locale): Dict {
  return DICTS[locale] ?? DICTS[DEFAULT_LOCALE];
}

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}
