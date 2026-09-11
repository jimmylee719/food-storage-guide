/**
 * Builds src/data/names.json — localised display names for foods that have no
 * content file yet.
 *
 * A food without a content file falls back to its English name everywhere: in
 * the category tables, in search results, in the site's own internal links. On
 * the Chinese, Japanese and Spanish sites that is close to useless, and it is
 * the single most visible gap while the long editorial pass runs.
 *
 * The research batches already put Traditional Chinese, Japanese and Spanish
 * names into each curated food's `keywords`, so most of those names exist
 * already and were simply never displayed. This script harvests them.
 *
 * The output is a plain, hand-editable map. A name written into it by a person
 * or a later translation pass is never overwritten:
 *
 *   node scripts/extract-names.js              # fill gaps, keep existing
 *   node scripts/extract-names.js --report     # show what is still missing
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const D = (...p) => path.join(ROOT, 'src', 'data', ...p);
const OUT = D('names.json');

const HAN = /[一-鿿]/;
const KANA = /[぀-ヿ]/;

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

const base = readJson(D('base', 'foodkeeper.json'), []);
const split = readJson(D('base', 'split.json'), []);
const replaced = new Set(readJson(D('base', 'split-replaces.json'), []));
const extraDir = D('base', 'extra');
const extra = fs.existsSync(extraDir)
  ? fs.readdirSync(extraDir).filter((f) => f.endsWith('.json')).sort()
      .flatMap((f) => readJson(path.join(extraDir, f), []))
  : [];
// A curated record can retire a FoodKeeper record that had no storage data.
for (const e of extra) for (const s of e.supersedes || []) replaced.add(s);
const all = [...base.filter((f) => !replaced.has(f.slug)), ...split, ...extra];

const contentDir = D('content');
const withContent = new Set(
  fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, ''))
    : [],
);

// Japanese first: a string containing kana is unambiguously Japanese, while a
// kanji-only string could belong to either language. Chinese then takes the
// Han-only candidates that Japanese did not claim.
function pickJa(keywords) {
  const cands = keywords.filter((k) => KANA.test(k));
  return cands.sort((a, b) => a.length - b.length)[0] || null;
}
function pickZh(keywords, ja) {
  const cands = keywords.filter((k) => HAN.test(k) && !KANA.test(k) && k !== ja);
  return cands.sort((a, b) => a.length - b.length)[0] || null;
}

const existing = readJson(OUT, {});
const names = {};
let filled = 0;
const missing = { zh: [], ja: [], es: [] };

for (const f of all) {
  if (withContent.has(f.slug)) continue; // a content file already supplies names
  const kw = (f.keywords || []).map((k) => String(k).trim()).filter(Boolean);
  const prev = existing[f.slug] || {};
  const ja = prev.ja || pickJa(kw);
  const zh = prev.zh || pickZh(kw, ja);
  // Spanish cannot be told apart from English by script, so it is only ever
  // taken from a name someone wrote deliberately.
  const es = prev.es || null;
  if (zh || ja || es) {
    names[f.slug] = {};
    if (zh) names[f.slug].zh = zh;
    if (ja) names[f.slug].ja = ja;
    if (es) names[f.slug].es = es;
    filled++;
  }
  if (!zh) missing.zh.push(f.slug);
  if (!ja) missing.ja.push(f.slug);
  if (!es) missing.es.push(f.slug);
}

const total = all.filter((f) => !withContent.has(f.slug)).length;
console.log(`${total} foods have no content file`);
console.log(`  zh name available: ${total - missing.zh.length}   still English: ${missing.zh.length}`);
console.log(`  ja name available: ${total - missing.ja.length}   still English: ${missing.ja.length}`);
console.log(`  es name available: ${total - missing.es.length}   still English: ${missing.es.length}`);

if (process.argv.includes('--report')) {
  for (const L of ['zh']) {
    console.log(`\n--- missing ${L} (${missing[L].length}) ---`);
    console.log(missing[L].join('\n'));
  }
  process.exit(0);
}

const sorted = {};
for (const k of Object.keys(names).sort()) sorted[k] = names[k];
fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1) + '\n');
console.log(`\nwrote ${filled} entries to src/data/names.json`);
