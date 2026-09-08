// Reports [[food:slug]] / [[guide:slug]] references in guide articles that the
// site cannot render as a proper link, so no sentence ends up with a hole in it.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const guidesDir = path.join(ROOT, 'src', 'data', 'guides');
const contentDir = path.join(ROOT, 'src', 'data', 'content');

const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'base', 'foodkeeper.json'), 'utf8'));
let extra = [];
const extraDir = path.join(ROOT, 'src', 'data', 'base', 'extra');
if (fs.existsSync(extraDir)) {
  for (const f of fs.readdirSync(extraDir).filter((x) => x.endsWith('.json'))) {
    try { extra.push(...JSON.parse(fs.readFileSync(path.join(extraDir, f), 'utf8'))); } catch { /* reported by validate-extra */ }
  }
}
let split = [];
try { split = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'base', 'split.json'), 'utf8')); } catch { /* optional */ }
let replaced = [];
try { replaced = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'base', 'split-replaces.json'), 'utf8')); } catch { /* optional */ }
const gone = new Set(replaced);
// A bundled record that was split no longer exists in the built data, so a
// reference to it renders as nothing at all.
const knownFoods = new Set([...base, ...split, ...extra].filter((f) => !gone.has(f.slug)).map((f) => f.slug));
const withContent = new Set(
  fs.existsSync(contentDir) ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')) : [],
);
const guideSlugs = new Set(
  fs.existsSync(guidesDir) ? fs.readdirSync(guidesDir).filter((f) => f.endsWith('.json')).map((f) => f.replace(/\.json$/, '')) : [],
);

const unknownFood = new Map();
const untranslatedFood = new Map();
const missingGuide = new Map();

function note(map, slug, where) {
  if (!map.has(slug)) map.set(slug, new Set());
  map.get(slug).add(where);
}

for (const file of guideSlugs) {
  const j = JSON.parse(fs.readFileSync(path.join(guidesDir, file + '.json'), 'utf8'));
  const text = JSON.stringify(j);
  // Matches both [[kind:slug]] and the labelled [[kind:slug|label]] form.
  // Group 3 is the optional label. A labelled reference renders its label even
  // when the target is missing, so only bare references are a real problem.
  const re = /\[\[(food|guide):([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const [, kind, slug, label] = m;
    if (kind === 'guide') {
      if (!guideSlugs.has(slug) && !label) note(missingGuide, slug, file);
    } else if (!knownFoods.has(slug)) {
      note(unknownFood, slug, file);
    } else if (!withContent.has(slug) && !label) {
      note(untranslatedFood, slug, file);
    }
  }
}

function report(title, map, hint) {
  if (!map.size) return 0;
  console.log(`\n${title} (${map.size})`);
  for (const [slug, where] of [...map].sort()) {
    console.log(`  ${slug}  ← ${[...where].join(', ')}`);
  }
  if (hint) console.log(`  → ${hint}`);
  return map.size;
}

let problems = 0;
problems += report('Referenced food slug does not exist at all', unknownFood, 'Fix the reference in the guide, or add the food to extra.json.');
problems += report('Bare reference to a food with no translated content, so the link renders as its English name', untranslatedFood, 'Write src/data/content/<slug>.json, or give the reference a label: [[food:slug|label]]. scripts/label-food-links.js does this in bulk.');
problems += report('Bare reference to a guide that does not exist, so the link is dropped and the sentence breaks', missingGuide, 'Write the guide, remove the reference, or give it a label.');

console.log(`\n${guideSlugs.size} guides scanned, ${problems} unresolved reference${problems === 1 ? '' : 's'}.`);
process.exit(problems ? 1 : 0);
