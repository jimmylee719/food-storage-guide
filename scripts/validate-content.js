// Validates src/data/content/*.json against CONTENT-SPEC.md
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data', 'content');
const LOCALES = ['en', 'zh', 'ja', 'es'];
const KEYS = ['name', 'aliases', 'summary', 'pantry', 'fridge', 'freezer', 'thawing', 'spoilage', 'tips', 'faq'];
const args = process.argv.slice(2);
const files = args.length ? args.map((s) => s.replace(/\.json$/, '') + '.json') : fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
let errors = 0;
for (const f of files) {
  const p = path.join(dir, f);
  const errs = [];
  if (!fs.existsSync(p)) { console.log(`MISSING ${f}`); errors++; continue; }
  let j;
  try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { console.log(`INVALID JSON ${f}: ${e.message}`); errors++; continue; }
  if (j.slug !== f.replace(/\.json$/, '')) errs.push(`slug mismatch (${j.slug})`);
  for (const L of LOCALES) {
    const o = j[L];
    if (!o) { errs.push(`missing locale ${L}`); continue; }
    for (const k of KEYS) if (!(k in o)) errs.push(`${L}.${k} missing`);
    if (typeof o.name !== 'string' || !o.name.trim()) errs.push(`${L}.name empty`);
    if (o.name && o.name.length > 60) errs.push(`${L}.name too long`);
    if (!Array.isArray(o.aliases)) errs.push(`${L}.aliases not array`);
    if (typeof o.summary !== 'string' || o.summary.length < 40) errs.push(`${L}.summary too short`);
    for (const k of ['pantry', 'fridge', 'freezer', 'thawing']) if (o[k] !== null && typeof o[k] !== 'string') errs.push(`${L}.${k} must be string|null`);
    if (!Array.isArray(o.spoilage) || o.spoilage.length < 2) errs.push(`${L}.spoilage needs ≥2 items`);
    if (!Array.isArray(o.tips) || o.tips.length < 2) errs.push(`${L}.tips needs ≥2 items`);
    if (!Array.isArray(o.faq) || o.faq.length < 2 || o.faq.some((x) => !x || typeof x.q !== 'string' || typeof x.a !== 'string')) errs.push(`${L}.faq needs ≥2 {q,a}`);
    const all = JSON.stringify(o);
    if (/[*#_`]{2}/.test(all)) errs.push(`${L}: markdown detected`);
  }
  if (j.zh && /[一-鿿]/.test(j.zh.name) === false) errs.push('zh.name has no CJK');
  if (j.ja && /[぀-ヿ一-鿿]/.test(j.ja.name) === false) errs.push('ja.name has no Japanese');
  if (errs.length) { errors++; console.log(`ERR ${f}: ${errs.join('; ')}`); }
}
// A content file whose slug no longer exists in the built data renders nowhere:
// build-data.js keys content by slug, so the article is silently dropped. This
// happens when a bundled FoodKeeper record is split into individual foods after
// its article was written.
const baseDir = path.join(__dirname, '..', 'src', 'data', 'base');
const readOpt = (p, d) => { try { return JSON.parse(fs.readFileSync(path.join(baseDir, p), 'utf8')); } catch { return d; } };
const replaced = new Set(readOpt('split-replaces.json', []));
const orphans = files.map((f) => f.replace(/\.json$/, '')).filter((s) => replaced.has(s));
if (orphans.length) {
  console.log(`\n${orphans.length} content file(s) written for records that scripts/split-combined.js has since replaced.`);
  console.log('They render nowhere. Rewrite them for the individual foods, or delete them:');
  for (const s of orphans) console.log(`  ${s}`);
}

console.log(`${files.length} files checked, ${errors} with errors`);
process.exit(errors ? 1 : 0);
