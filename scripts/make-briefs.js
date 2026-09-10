/**
 * Generates writing briefs for every food that still has no content file.
 *
 * A brief is the food's own storage record, exactly as the site will render it,
 * plus its provenance: where the numbers came from, whether they were borrowed
 * from an analogous food, and any caveat the researcher left behind. A writer
 * who cannot see that provenance will state a borrowed number as fact.
 *
 * Briefs are written to scripts/briefs/auto-NN.json in priority order, so the
 * categories people actually search reach the site first.
 *
 *   node scripts/make-briefs.js            # write the files
 *   node scripts/make-briefs.js --dry-run  # just report what is missing
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const D = (...p) => path.join(ROOT, 'src', 'data', ...p);
const BRIEF_SIZE = 25;

// Search demand first, long tail last. Fruits, vegetables and sauces are both
// the largest gaps and the ones readers arrive looking for.
const PRIORITY = [
  'fruits', 'vegetables', 'condiments-sauces',
  'dairy-eggs', 'seafood', 'meat', 'poultry',
  'grains-beans-pasta', 'shelf-stable', 'deli-prepared',
  'snacks-nuts-seeds', 'beverages', 'herbs-spices', 'baked-goods',
  'frozen-foods', 'baking-staples', 'oils-fats', 'vegetarian-proteins', 'baby-food',
];

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
const all = [...base.filter((f) => !replaced.has(f.slug)), ...split, ...extra];

const contentDir = D('content');
const withContent = new Set(
  fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')) : [],
);

const missing = all.filter((f) => !withContent.has(f.slug));
const rank = (c) => { const i = PRIORITY.indexOf(c); return i === -1 ? PRIORITY.length : i; };
missing.sort((a, b) => rank(a.category) - rank(b.category) || a.slug.localeCompare(b.slug));

const briefs = missing.map((f) => ({
  slug: f.slug,
  category: f.category,
  source: f.source,
  sourceId: f.sourceId ?? null,
  name: f.name,
  subtitle: f.subtitle ?? null,
  keywords: f.keywords || [],
  storage: f.storage,
  // Provenance. A curated record may carry numbers borrowed from another food;
  // the writer must not present those as if an agency published them.
  sources: f.sources || null,
  analog: f.analog || null,
  notes: f.notes || null,
}));

const dryRun = process.argv.includes('--dry-run');
const byCat = {};
missing.forEach((f) => { byCat[f.category] = (byCat[f.category] || 0) + 1; });
const borrowed = briefs.filter((b) => b.analog).length;

console.log(`${all.length} foods, ${withContent.size} with content, ${missing.length} still to write`);
console.log(`${borrowed} of those carry numbers borrowed from an analogous food`);
console.log(byCat);

if (dryRun) {
  const order = [...new Set(missing.map((f) => f.category))];
  console.log(`\nWould write ${Math.ceil(briefs.length / BRIEF_SIZE)} briefs of ${BRIEF_SIZE}, in this order:`);
  console.log(order.join(' → '));
  process.exit(0);
}

const outDir = path.join(ROOT, 'scripts', 'briefs');
fs.mkdirSync(outDir, { recursive: true });
// Clear previous auto briefs so a re-run after new content lands does not leave
// stale files describing foods that now have pages.
for (const f of fs.readdirSync(outDir).filter((x) => /^auto-\d+\.json$/.test(x))) {
  fs.unlinkSync(path.join(outDir, f));
}

let n = 0;
for (let i = 0; i < briefs.length; i += BRIEF_SIZE) {
  n++;
  const chunk = briefs.slice(i, i + BRIEF_SIZE);
  const name = `auto-${String(n).padStart(2, '0')}.json`;
  fs.writeFileSync(path.join(outDir, name), JSON.stringify(chunk, null, 1) + '\n');
  const cats = [...new Set(chunk.map((c) => c.category))].join(', ');
  console.log(`  ${name}  ${chunk.length} foods  (${cats})`);
}
console.log(`\n${n} brief files written to scripts/briefs/`);
