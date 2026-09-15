/**
 * Finds sentences that talk about the site's own data instead of answering the
 * question.
 *
 * A reader came to find out how long to keep something. They did not come to
 * read about which dataset a number sits in, or whether an agency published a
 * figure for their vegetable. Provenance belongs in the Sources section and in
 * the borrowed-figure note, both of which every page already renders; in the
 * prose it is noise that makes the answer sound hedged.
 *
 *   node scripts/check-meta-refs.js            # list offenders
 *   node scripts/check-meta-refs.js --files    # just the filenames
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'src', 'data', 'content');
const FIELDS = ['summary', 'pantry', 'fridge', 'freezer', 'thawing', 'spoilage', 'tips', 'faq'];

// Naming the dataset, the agency that published it, or the fact that a figure
// exists (or does not) is talking about the data rather than the food.
const EN = /\bUSDA\b|\bFoodKeeper\b|\bFSIS\b|published figures?\b|\bthe (?:dataset|data ?set|database)\b|\b(?:this|the) record(?:'s)?\b|\bthis entry\b|\bthe source data\b|\bthe figures? (?:given|published|quoted)\b|\bno (?:published|official) (?:figure|timeline)\b|\bthe published\b/i;
const ZH = /USDA|FoodKeeper|FSIS|美國農業部|這份資料|這筆資料|本資料|該資料|原始資料|資料上|資料裡|資料中|資料集|資料庫|資料顯示|資料給|來源資料|這份紀錄|紀錄上|公開資料|官方資料|公布的數字|公布數字|公布期限|公布數據|表上|表格上|這份表/;

// "at the table", "on the table" are a dining table, not a data table.
const FALSE_POSITIVE = /\b(?:at|on|to|from) the table\b/i;

function sentences(text, locale) {
  return locale === 'en' ? text.split(/(?<=[.!?])\s+/) : text.split(/(?<=[。！？])/);
}

function scan(value, locale, out) {
  if (typeof value === 'string') {
    for (const raw of sentences(value, locale)) {
      const s = raw.trim();
      if (!s) continue;
      const pattern = locale === 'en' ? EN : ZH;
      if (!pattern.test(s)) continue;
      if (locale === 'en' && FALSE_POSITIVE.test(s) && !/\bUSDA\b|FoodKeeper|published figure|record/i.test(s)) continue;
      out.push(s);
    }
  } else if (Array.isArray(value)) {
    for (const v of value) scan(typeof v === 'string' ? v : (v && v.a) || '', locale, out);
  }
}

const filesOnly = process.argv.includes('--files');
const results = [];
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort()) {
  const doc = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  for (const locale of ['en', 'zh']) {
    const body = doc[locale];
    if (!body) continue;
    const found = [];
    for (const field of FIELDS) scan(body[field], locale, found);
    if (found.length) results.push({ file, locale, found });
  }
}

if (filesOnly) {
  console.log([...new Set(results.map((r) => r.file))].join('\n'));
  process.exit(results.length ? 1 : 0);
}

let total = 0;
for (const { file, locale, found } of results) {
  total += found.length;
  console.log(`\n${file}  [${locale}]  (${found.length})`);
  for (const s of found) console.log(`  ${s.slice(0, 150)}`);
}
const files = new Set(results.map((r) => r.file)).size;
console.log(`\n${total} sentence${total === 1 ? '' : 's'} talk about the data rather than the food, in ${files} file${files === 1 ? '' : 's'}.`);
process.exit(total ? 1 : 0);
