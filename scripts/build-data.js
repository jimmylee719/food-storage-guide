// Merges base storage data (USDA FoodKeeper + curated extras) with the
// four-language editorial content into the generated files the app reads.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const D = (...p) => path.join(ROOT, 'src', 'data', ...p);
const OUT = D('generated');
const LOCALES = ['zh', 'en', 'ja', 'es'];

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

const base = readJson(D('base', 'foodkeeper.json'), []);
// Each research batch writes its own file so concurrent work never collides.
const extraDir = D('base', 'extra');
const extra = fs.existsSync(extraDir)
  ? fs.readdirSync(extraDir).filter((f) => f.endsWith('.json')).sort()
      .flatMap((f) => readJson(path.join(extraDir, f), []))
  : [];
// FoodKeeper records that bundle several foods are replaced by the individual
// foods generated in scripts/split-combined.js.
const split = readJson(D('base', 'split.json'), []);
const replaced = new Set(readJson(D('base', 'split-replaces.json'), []));
// A curated record may also replace a FoodKeeper record that arrived with no
// storage data at all. Leaving the stub in place would publish the same food
// twice, once with nothing to say.
for (const e of extra) for (const s of e.supersedes || []) replaced.add(s);
const all = [...base.filter((f) => !replaced.has(f.slug)), ...split, ...extra];

// Corrections to the source dataset. FoodKeeper is public domain and mostly
// excellent, but it has a handful of mis-slotted figures. Rather than silently
// editing the converted data — which would make the conversion irreproducible —
// each correction is recorded here with its reason and its evidence, applied at
// build time, and shown on the page so a reader can judge it.
const corrections = readJson(D('base', 'corrections.json'), []);
const correctionBySlug = new Map(corrections.map((c) => [c.slug, c]));
// A correction may retire a record outright rather than adjust its figures,
// when the dataset carried the same food twice. The retired slug keeps working:
// it resolves to the survivor and the page redirects, so no published link dies.
const retiredSlugs = new Map(
  corrections.filter((c) => c.supersededBy).map((c) => [c.slug, c.supersededBy]),
);

const contentDir = D('content');
const contentFiles = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')) : [];
const content = new Map();
for (const f of contentFiles) {
  const j = readJson(path.join(contentDir, f), null);
  if (j && j.slug) content.set(j.slug, j);
}

// Localised display names for foods that have no content file yet. Without
// these a Chinese, Japanese or Spanish reader sees an English name in the
// category tables and in search. See scripts/extract-names.js.
const displayNames = readJson(D('names.json'), {});

const guidesDir = D('guides');
const guideFiles = fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir).filter((f) => f.endsWith('.json')) : [];
const guides = guideFiles.map((f) => readJson(path.join(guidesDir, f), null)).filter(Boolean);

// ---- foods -------------------------------------------------------------
const foods = [];
for (const raw of all) {
  if (retiredSlugs.has(raw.slug)) continue;
  const correction = correctionBySlug.get(raw.slug) || null;
  const item = correction && correction.storage ? { ...raw, storage: correction.storage } : raw;
  const c = content.get(item.slug) || null;
  const names = {};
  const aliases = {};
  for (const L of LOCALES) {
    const override = displayNames[item.slug] && displayNames[item.slug][L];
    names[L] = (c && c[L] && c[L].name) || override
      || item.name + (item.subtitle ? ` (${item.subtitle})` : '');
    aliases[L] = c && c[L] && Array.isArray(c[L].aliases) ? c[L].aliases : [];
  }
  foods.push({
    slug: item.slug,
    category: item.category,
    source: item.source,
    sourceRefs: item.sources || null,
    analog: item.analog || null,
    correction: correction ? { reason: correction.reason, evidence: correction.evidence } : null, // per-locale prose
    derivedFrom: item.derivedFrom || null,
    derivedFromName: item.derivedFromName || null,
    baseName: item.name,
    subtitle: item.subtitle,
    keywords: item.keywords || [],
    storage: item.storage,
    names,
    aliases,
    hasPage: Boolean(c),
    content: c ? { zh: c.zh, en: c.en, ja: c.ja, es: c.es } : null,
  });
}
// Whether a food's numbers actually rest on the FoodKeeper dataset. A record
// read straight out of the dataset does; so does one split out of a dataset
// row, and one that borrowed its figures from a food that did. A curated
// record researched from agency guidance does NOT, and must not cite a dataset
// that has no row for it: doing so would put a false citation on every one of
// the 384 foods the dataset never covered.
const foodKeeperSlugs = new Set(base.map((f) => f.slug));
const bySlug = new Map(foods.map((f) => [f.slug, f]));
function restsOnFoodKeeper(f, seen) {
  if (!f) return false;
  seen = seen || new Set();
  if (seen.has(f.slug)) return false;
  seen.add(f.slug);
  if (f.source === 'usda-foodkeeper' || f.derivedFrom) return true;
  if (f.analog) {
    // An analog target missing from the list is a dataset row that was split
    // and retired, so it still counts as the dataset.
    if (!bySlug.has(f.analog)) return foodKeeperSlugs.has(f.analog);
    return restsOnFoodKeeper(bySlug.get(f.analog), seen);
  }
  return false;
}
for (const f of foods) f.usesFoodKeeper = restsOnFoodKeeper(f);

// A URL the reader can read. /zh/food/broccoli tells a Chinese reader nothing;
// /zh/food/青花菜 is the word they typed. The English slug never moves.
//
// Two foods whose Chinese names collide keep their English slugs. A collision
// here is not a naming problem: it means the site is carrying the same food
// twice, and minting 燈籠果-1 and 燈籠果-2 would bury that instead of surfacing
// it.
function localeSlugZh(name) {
  return String(name || "")
    .replace(/[（(]/g, "-")
    .replace(/[）)]/g, "")
    .replace(/[\s、，,。．·・\/／]+/g, "-")
    .replace(/[「」『』【】《》〈〉"'!?！？:：;；%％#＃*＊+＋=＝@＠~～^&]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const zhSlugCounts = new Map();
for (const f of foods) {
  const z = localeSlugZh(f.names.zh);
  if (z) zhSlugCounts.set(z, (zhSlugCounts.get(z) || 0) + 1);
}
let zhLocalised = 0;
const zhCollisions = new Set();
for (const f of foods) {
  const z = localeSlugZh(f.names.zh);
  const unique = Boolean(z) && zhSlugCounts.get(z) === 1;
  if (z && !unique) zhCollisions.add(z);
  f.slugs = { en: f.slug, zh: unique ? z : f.slug };
  if (unique) zhLocalised++;
}
console.log(`zh slugs: ${zhLocalised} localised, ${foods.length - zhLocalised} kept English`);
if (zhCollisions.size) {
  console.log(`  name collisions (the same food carried twice?): ${[...zhCollisions].join(", ")}`);
}

foods.sort((a, b) => a.slug.localeCompare(b.slug));

// ---- search indexes ----------------------------------------------------
const searchIndex = {};
for (const L of LOCALES) {
  searchIndex[L] = foods.map((f) => ({
    s: f.slugs[L] || f.slug,
    n: f.names[L],
    c: f.category,
    p: f.hasPage ? 1 : 0,
    // Keywords carry local-language names for curated foods, so they belong in
    // every locale's index, not just English.
    k: [...new Set([...(f.aliases[L] || []), ...f.keywords, f.baseName, f.subtitle || ''])]
      .filter(Boolean)
      .join('|')
      .toLowerCase(),
  }));
}

// ---- guides ------------------------------------------------------------
const guideList = guides
  .map((g) => ({ slug: g.slug, category: g.category, updated: g.updated, zh: g.zh, en: g.en, ja: g.ja, es: g.es }))
  .sort((a, b) => a.slug.localeCompare(b.slug));

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'retired.json'), JSON.stringify(Object.fromEntries(retiredSlugs), null, 1) + '\n');
fs.writeFileSync(path.join(OUT, 'foods.json'), JSON.stringify(foods));
fs.writeFileSync(path.join(OUT, 'guides.json'), JSON.stringify(guideList));

// Search indexes are fetched by the client on demand, so they live in /public.
const pub = path.join(ROOT, 'public', 'search');
fs.mkdirSync(pub, { recursive: true });
for (const L of LOCALES) fs.writeFileSync(path.join(pub, `${L}.json`), JSON.stringify(searchIndex[L]));

const withPage = foods.filter((f) => f.hasPage).length;
const byCat = {};
foods.forEach((f) => { byCat[f.category] = (byCat[f.category] || 0) + 1; });
const localised = {};
for (const L of LOCALES) localised[L] = foods.filter((f) => f.names[L] !== f.names.en).length;
console.log(`localised names: ${JSON.stringify(localised)}`);
console.log(`foods: ${foods.length} (${withPage} with full content, ${foods.length - withPage} listing-only)`);
console.log(`guides: ${guideList.length}`);
console.log(byCat);
