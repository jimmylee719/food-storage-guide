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
const extra = readJson(D('base', 'extra.json'), []);
// FoodKeeper records that bundle several foods are replaced by the individual
// foods generated in scripts/split-combined.js.
const split = readJson(D('base', 'split.json'), []);
const replaced = new Set(readJson(D('base', 'split-replaces.json'), []));
const all = [...base.filter((f) => !replaced.has(f.slug)), ...split, ...extra];

const contentDir = D('content');
const contentFiles = fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')) : [];
const content = new Map();
for (const f of contentFiles) {
  const j = readJson(path.join(contentDir, f), null);
  if (j && j.slug) content.set(j.slug, j);
}

const guidesDir = D('guides');
const guideFiles = fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir).filter((f) => f.endsWith('.json')) : [];
const guides = guideFiles.map((f) => readJson(path.join(guidesDir, f), null)).filter(Boolean);

// ---- foods -------------------------------------------------------------
const foods = [];
for (const item of all) {
  const c = content.get(item.slug) || null;
  const names = {};
  const aliases = {};
  for (const L of LOCALES) {
    names[L] = c && c[L] && c[L].name ? c[L].name : item.name + (item.subtitle ? ` (${item.subtitle})` : '');
    aliases[L] = c && c[L] && Array.isArray(c[L].aliases) ? c[L].aliases : [];
  }
  foods.push({
    slug: item.slug,
    category: item.category,
    source: item.source,
    sourceRefs: item.sources || null,
    analog: item.analog || null,
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
foods.sort((a, b) => a.slug.localeCompare(b.slug));

// ---- search indexes ----------------------------------------------------
const searchIndex = {};
for (const L of LOCALES) {
  searchIndex[L] = foods.map((f) => ({
    s: f.slug,
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
fs.writeFileSync(path.join(OUT, 'foods.json'), JSON.stringify(foods));
fs.writeFileSync(path.join(OUT, 'guides.json'), JSON.stringify(guideList));

// Search indexes are fetched by the client on demand, so they live in /public.
const pub = path.join(ROOT, 'public', 'search');
fs.mkdirSync(pub, { recursive: true });
for (const L of LOCALES) fs.writeFileSync(path.join(pub, `${L}.json`), JSON.stringify(searchIndex[L]));

const withPage = foods.filter((f) => f.hasPage).length;
const byCat = {};
foods.forEach((f) => { byCat[f.category] = (byCat[f.category] || 0) + 1; });
console.log(`foods: ${foods.length} (${withPage} with full content, ${foods.length - withPage} listing-only)`);
console.log(`guides: ${guideList.length}`);
console.log(byCat);
