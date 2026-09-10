/**
 * Collects everything still shown in English on a non-English page, and writes
 * it out as translation work files.
 *
 * Two sources feed the leak:
 *
 *  - **Names.** A food with no article falls back to its English name. Curated
 *    foods carry researched names in their keywords; FoodKeeper records carry
 *    nothing but English.
 *  - **Tips.** The storage tips in the research data are written in English,
 *    because the agencies publish in English. They repeat heavily across foods,
 *    so they are translated once per sentence, not once per food.
 *
 * Output: scripts/i18n/names-NN.json and scripts/i18n/tips-NN.json, each a flat
 * list a translator can fill in and hand back.
 *
 *   node scripts/i18n-todo.js
 *   node scripts/i18n-todo.js --report
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const D = (...p) => path.join(ROOT, 'src', 'data', ...p);
const CHUNK = 120;

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

const foods = readJson(D('generated', 'foods.json'), []);
if (!foods.length) { console.log('run npm run data first'); process.exit(1); }

const names = readJson(D('names.json'), {});
const tipDicts = {
  zh: readJson(D('tips', 'zh.json'), {}),
  ja: readJson(D('tips', 'ja.json'), {}),
  es: readJson(D('tips', 'es.json'), {}),
};

// ---- names still English ------------------------------------------------
const nameWork = [];
for (const f of foods) {
  if (f.hasPage) continue; // an article supplies its own names
  const have = names[f.slug] || {};
  const missing = ['zh', 'ja', 'es'].filter((l) => !have[l]);
  if (!missing.length) continue;
  nameWork.push({
    slug: f.slug,
    category: f.category,
    english: f.baseName + (f.subtitle ? ` (${f.subtitle})` : ''),
    // The research keywords often already contain the local name.
    keywords: f.keywords,
    missing,
    zh: have.zh || '',
    ja: have.ja || '',
    es: have.es || '',
  });
}

// ---- tips still English -------------------------------------------------
const tipUses = new Map();
for (const f of foods) {
  for (const m of Object.keys(f.storage || {})) {
    for (const sp of Object.keys(f.storage[m] || {})) {
      const tip = f.storage[m][sp] && f.storage[m][sp].tips;
      if (!tip) continue;
      const key = tip.trim();
      if (!tipUses.has(key)) tipUses.set(key, { count: 0, example: f.baseName });
      tipUses.get(key).count++;
    }
  }
}
const tipWork = [];
for (const [tip, use] of [...tipUses].sort((a, b) => b[1].count - a[1].count)) {
  const missing = ['zh', 'ja', 'es'].filter((l) => !tipDicts[l][tip]);
  if (!missing.length) continue;
  tipWork.push({
    en: tip,
    usedBy: use.count,
    example: use.example,
    missing,
    zh: tipDicts.zh[tip] || '',
    ja: tipDicts.ja[tip] || '',
    es: tipDicts.es[tip] || '',
  });
}

console.log(`names still English: ${nameWork.length} foods`);
console.log(`tips still English:  ${tipWork.length} distinct sentences, covering ${tipWork.reduce((a, t) => a + t.usedBy, 0)} uses`);

if (process.argv.includes('--report')) process.exit(0);

const outDir = path.join(ROOT, 'scripts', 'i18n');
fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) fs.unlinkSync(path.join(outDir, f));

function write(prefix, rows) {
  let n = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    n++;
    const name = `${prefix}-${String(n).padStart(2, '0')}.json`;
    fs.writeFileSync(path.join(outDir, name), JSON.stringify(rows.slice(i, i + CHUNK), null, 1) + '\n');
  }
  if (n) console.log(`  ${n} × ${prefix}-NN.json`);
  return n;
}

write('names', nameWork);
write('tips', tipWork);
console.log(`\nwritten to scripts/i18n/`);
