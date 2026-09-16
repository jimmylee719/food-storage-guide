/**
 * Finds articles that read like each other.
 *
 * The site deliberately carries foods whose storage figures are identical,
 * because the source dataset groups records by storage behaviour: ham, turkey
 * and chicken deli meat all get 2 weeks unopened and 3-5 days after opening.
 * Identical numbers are correct. Identical prose is not — it means the article
 * never said what this particular food is, how it actually behaves, or what
 * goes wrong with it, and a reader who arrived searching for one of the three
 * learns nothing the other two pages would not have told them.
 *
 * Worse, near-identical prose hides real differences. Frozen soy crumbles keep
 * 1-2 months in the freezer and soy meat substitutes 12-18 — a tenfold gap that
 * two interchangeable articles bury.
 *
 * Similarity is Jaccard over shingles of the storage narrative: word trigrams
 * for English, character 4-grams for Chinese.
 *
 *   node scripts/check-near-duplicates.js            # both locales
 *   node scripts/check-near-duplicates.js --locale zh
 *   node scripts/check-near-duplicates.js --threshold 0.35
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'src', 'data', 'content');
const FIELDS = ['summary', 'pantry', 'fridge', 'freezer', 'thawing'];

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : process.argv[i + 1];
};
const THRESHOLD = Number(arg('--threshold', '0.30'));
const LOCALES = arg('--locale', null) ? [arg('--locale', null)] : ['en', 'zh'];

function shingles(text, locale) {
  if (locale === 'en') {
    const w = text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
    const out = new Set();
    for (let i = 0; i + 3 <= w.length; i++) out.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`);
    return out;
  }
  // Chinese has no word boundaries, so shingle over characters. Four is long
  // enough that ordinary shared vocabulary does not register as similarity.
  const c = text.replace(/[^一-鿿]/g, '');
  const out = new Set();
  for (let i = 0; i + 4 <= c.length; i++) out.add(c.slice(i, i + 4));
  return out;
}

function load(locale) {
  const docs = [];
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.json'))) {
    const doc = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
    const body = doc[locale];
    if (!body) continue;
    const text = FIELDS.map((f) => body[f]).filter(Boolean).join(' ');
    const sh = shingles(text, locale);
    if (sh.size >= 20) docs.push({ slug: file.replace(/\.json$/, ''), sh });
  }
  return docs;
}

function pairs(docs) {
  // Invert the shingle index so only documents that share rare shingles are
  // ever compared; comparing all 1,100 against each other is needless.
  const inverted = new Map();
  for (const d of docs) {
    for (const s of d.sh) {
      if (!inverted.has(s)) inverted.set(s, []);
      inverted.get(s).push(d);
    }
  }
  const candidates = new Map();
  for (const [, ds] of inverted) {
    if (ds.length > 8) continue; // boilerplate shingle, tells us nothing
    for (let i = 0; i < ds.length; i++) {
      for (let j = i + 1; j < ds.length; j++) {
        const [a, b] = ds[i].slug < ds[j].slug ? [ds[i], ds[j]] : [ds[j], ds[i]];
        const k = `${a.slug}|${b.slug}`;
        candidates.set(k, (candidates.get(k) || 0) + 1);
      }
    }
  }
  const byslug = new Map(docs.map((d) => [d.slug, d]));
  const out = [];
  for (const [k, shared] of candidates) {
    if (shared < 20) continue;
    const [a, b] = k.split('|');
    const da = byslug.get(a);
    const db = byslug.get(b);
    let inter = 0;
    for (const s of da.sh) if (db.sh.has(s)) inter++;
    const jaccard = inter / (da.sh.size + db.sh.size - inter);
    if (jaccard > THRESHOLD) out.push({ a, b, jaccard });
  }
  return out.sort((x, y) => y.jaccard - x.jaccard);
}

let total = 0;
for (const locale of LOCALES) {
  const found = pairs(load(locale));
  total += found.length;
  console.log(`\n${locale}: ${found.length} pair${found.length === 1 ? '' : 's'} above ${THRESHOLD}`);
  for (const { a, b, jaccard } of found) {
    console.log(`  ${jaccard.toFixed(2)}  ${a}  ${b}`);
  }
}

console.log(`\n${total} near-duplicate pair${total === 1 ? '' : 's'} across ${LOCALES.join(' and ')}.`);
process.exit(total ? 1 : 0);
