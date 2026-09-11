// Validates src/data/base/extra.json against EXTRA-SPEC.md
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CATEGORIES = ['meat', 'poultry', 'seafood', 'dairy-eggs', 'vegetables', 'fruits', 'herbs-spices',
  'grains-beans-pasta', 'baked-goods', 'baking-staples', 'condiments-sauces', 'shelf-stable',
  'snacks-nuts-seeds', 'oils-fats', 'beverages', 'frozen-foods', 'deli-prepared',
  'vegetarian-proteins', 'baby-food'];
const UNITS = ['hours', 'days', 'weeks', 'months', 'years'];
const METHODS = ['pantry', 'fridge', 'freezer'];
const SPANS = ['base', 'fromPurchase', 'afterOpening', 'afterThawing'];

function read(p, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'base', p), 'utf8')); } catch { return fallback; }
}

const base = read('foodkeeper.json', []);
const split = read('split.json', []);
const taken = new Map();
for (const f of [...base, ...split]) taken.set(f.slug, f.source === 'usda-foodkeeper' ? 'foodkeeper/split' : 'base');

const extraDir = path.join(ROOT, 'src', 'data', 'base', 'extra');
if (!fs.existsSync(extraDir)) { console.log('src/data/base/extra/ does not exist'); process.exit(1); }
const files = fs.readdirSync(extraDir).filter((f) => f.endsWith('.json')).sort();
const extra = [];
const fileOf = new Map();
let fatal = 0;
for (const f of files) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(path.join(extraDir, f), 'utf8')); } catch (e) {
    console.log(`INVALID JSON ${f}: ${e.message}`); fatal++; continue;
  }
  if (!Array.isArray(arr)) { console.log(`${f} must be a JSON array`); fatal++; continue; }
  for (const item of arr) { extra.push(item); fileOf.set(item, f); }
}
if (fatal) process.exit(1);

let errors = 0;
const seen = new Set();
const err = (slug, msg) => { errors++; console.log(`ERR ${slug}: ${msg}`); };

for (const item of extra) {
  const slug = item.slug || '(no slug)';
  if (!/^[a-z0-9-]+$/.test(item.slug || '')) err(slug, 'slug must be kebab-case a-z0-9-');
  if (taken.has(item.slug)) err(slug, `slug collides with ${taken.get(item.slug)}`);
  if (seen.has(item.slug)) err(slug, 'duplicate slug within extra.json');
  seen.add(item.slug);
  if (!CATEGORIES.includes(item.category)) err(slug, `bad category: ${item.category}`);
  if (item.source !== 'curated') err(slug, 'source must be "curated"');
  if (!item.name || typeof item.name !== 'string') err(slug, 'name missing');
  if (item.subtitle !== null && typeof item.subtitle !== 'string') err(slug, 'subtitle must be string|null');
  if (!Array.isArray(item.keywords) || !item.keywords.length) err(slug, 'keywords must be a non-empty array');

  const storage = item.storage;
  if (!storage || typeof storage !== 'object' || !Object.keys(storage).length) {
    err(slug, 'storage must describe at least one method');
  } else {
    for (const m of Object.keys(storage)) {
      if (!METHODS.includes(m)) { err(slug, `unknown storage method: ${m}`); continue; }
      const spans = storage[m];
      if (!spans || !Object.keys(spans).length) { err(slug, `${m} is empty`); continue; }
      for (const k of Object.keys(spans)) {
        if (!SPANS.includes(k)) { err(slug, `unknown span: ${m}.${k}`); continue; }
        const s = spans[k];
        if (!s || typeof s !== 'object') { err(slug, `${m}.${k} must be an object`); continue; }
        const hasRange = s.min != null || s.max != null;
        if (hasRange && !UNITS.includes(s.unit)) err(slug, `${m}.${k}.unit must be one of ${UNITS.join('/')}`);
        if (!hasRange && !s.tips) err(slug, `${m}.${k} has neither a range nor tips`);
        if (s.min != null && s.max != null && s.min > s.max) err(slug, `${m}.${k}: min > max`);
        for (const n of ['min', 'max']) {
          if (s[n] != null && (typeof s[n] !== 'number' || s[n] <= 0)) err(slug, `${m}.${k}.${n} must be a positive number or null`);
        }
        if (s.tips != null && typeof s.tips !== 'string') err(slug, `${m}.${k}.tips must be string|null`);
      }
    }
  }

  const hasSources = Array.isArray(item.sources) && item.sources.length > 0;
  if (!hasSources && !item.analog) err(slug, 'needs either sources or an analog');
  if (hasSources) {
    for (const s of item.sources) {
      if (!s || !s.name || !/^https?:\/\//.test(s.url || '')) err(slug, `bad source entry: ${JSON.stringify(s)}`);
    }
  }
  if (item.supersedes !== undefined) {
    if (!Array.isArray(item.supersedes) || !item.supersedes.length) err(slug, 'supersedes must be a non-empty array');
    else for (const s of item.supersedes) {
      if (!taken.has(s)) err(slug, `supersedes "${s}" is not a known food slug`);
      if (!item.notes) err(slug, 'a superseding record must explain itself in notes');
    }
  }
  if (item.analog) {
    if (!taken.has(item.analog)) err(slug, `analog "${item.analog}" is not a known food slug`);
    if (!item.notes) err(slug, 'an analog must be explained in notes');
  }
}

const byCat = {};
extra.forEach((i) => { byCat[i.category] = (byCat[i.category] || 0) + 1; });
const sourced = extra.filter((i) => Array.isArray(i.sources) && i.sources.length).length;
console.log(`\n${extra.length} extra foods, ${sourced} with direct sources, ${extra.length - sourced} by analogue`);
console.log(byCat);
console.log(`${errors} error${errors === 1 ? '' : 's'}`);
process.exit(errors ? 1 : 0);
