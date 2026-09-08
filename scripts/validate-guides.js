const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'data', 'guides');
const LOCALES = ['en', 'zh', 'ja', 'es'];
const args = process.argv.slice(2);
const files = args.length ? args.map((s) => s.replace(/\.json$/, '') + '.json') : fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
let errors = 0;
for (const f of files) {
  const p = path.join(dir, f);
  const errs = [];
  if (!fs.existsSync(p)) { console.log(`MISSING ${f}`); errors++; continue; }
  let j;
  try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { console.log(`INVALID JSON ${f}: ${e.message}`); errors++; continue; }
  if (j.slug !== f.replace(/\.json$/, '')) errs.push('slug mismatch');
  if (!['safety', 'fridge', 'freezer', 'pantry', 'basics'].includes(j.category)) errs.push('bad category');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(j.updated || '')) errs.push('bad updated');
  for (const L of LOCALES) {
    const o = j[L];
    if (!o) { errs.push(`missing ${L}`); continue; }
    if (!o.title || o.title.length > 80) errs.push(`${L}.title missing/too long`);
    if (!o.description || o.description.length > 170) errs.push(`${L}.description missing/too long`);
    if (!o.intro || o.intro.length < 60) errs.push(`${L}.intro too short`);
    if (!Array.isArray(o.sections) || o.sections.length < 4) errs.push(`${L}.sections < 4`);
    else o.sections.forEach((s, i) => { if (!s.heading || !s.body || s.body.length < 150) errs.push(`${L}.sections[${i}] too short`); if (/^#{1,2}\s/m.test(s.body)) errs.push(`${L}.sections[${i}] has H1/H2 in body`); });
    if (!Array.isArray(o.keyTakeaways) || o.keyTakeaways.length < 3) errs.push(`${L}.keyTakeaways < 3`);
    if (!Array.isArray(o.faq) || o.faq.length < 3 || o.faq.some((x) => !x.q || !x.a)) errs.push(`${L}.faq < 3`);
    if (!Array.isArray(o.sources) || o.sources.length < 2 || o.sources.some((x) => !x.name || !/^https?:\/\//.test(x.url || ''))) errs.push(`${L}.sources < 2 or bad url`);
    const words = JSON.stringify(o).length;
    if (words < 2500) errs.push(`${L} content looks too short (${words} chars)`);
  }
  if (errs.length) { errors++; console.log(`ERR ${f}: ${errs.join('; ')}`); }
}
console.log(`${files.length} guides checked, ${errors} with errors`);
process.exit(errors ? 1 : 0);
