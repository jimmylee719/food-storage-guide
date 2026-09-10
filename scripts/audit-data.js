/**
 * Cross-checks the published storage data for internal contradictions.
 *
 * Three classes of problem, in descending order of how badly they mislead a
 * reader:
 *
 *  1. PROSE CONTRADICTS THE TABLE. An article says "keeps about five days" while
 *     the table on the same page says three. The reader has no way to tell which
 *     to believe, and the article is usually the one they act on.
 *  2. IMPOSSIBLE ORDERING. A perishable that supposedly keeps longer on the
 *     counter than in the fridge, or longer in the fridge than in the freezer.
 *     Almost always a unit or a field that was mapped wrong.
 *  3. IMPLAUSIBLE MAGNITUDE. Fresh meat with a fridge life in months, dried
 *     goods with a pantry life in hours. Worth a human look.
 *
 * Findings are reported, never auto-fixed: every one needs a person to decide
 * which side is right.
 *
 *   node scripts/audit-data.js
 *   node scripts/audit-data.js --prose-only
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const D = (...p) => path.join(ROOT, 'src', 'data', ...p);
const LOCALES = ['en', 'zh', 'ja', 'es'];

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

const foods = readJson(D('generated', 'foods.json'), []);
if (!foods.length) {
  console.log('src/data/generated/foods.json is empty — run npm run data first.');
  process.exit(1);
}

// Hours are the unit of the two-hour rule, not of shelf life, so a span in
// hours is compared on its own scale.
const TO_HOURS = { hours: 1, days: 24, weeks: 168, months: 730, years: 8766 };
const toHours = (n, unit) => (n == null ? null : n * (TO_HOURS[unit] || 0));

// Numbers that appear in safety prose in every language and mean a temperature
// or a holding rule rather than a shelf life.
const SAFETY_NUMBERS = new Set([0, 1, 2, 4, 5, 8, 10, 18, 20, 24, 32, 35, 40, 60, 63, 70, 90, 100, 140, 165]);

const problems = { prose: [], ordering: [], magnitude: [] };

function spans(food) {
  const out = [];
  for (const method of Object.keys(food.storage || {})) {
    for (const span of Object.keys(food.storage[method] || {})) {
      const s = food.storage[method][span];
      if (s && (s.min != null || s.max != null)) out.push({ method, span, ...s });
    }
  }
  return out;
}

// ---- 1. prose against the table -----------------------------------------
// Every duration the record permits, as "<number> <unit>" pairs.
function permitted(food) {
  const set = new Set();
  for (const s of spans(food)) {
    for (const n of [s.min, s.max]) if (n != null) set.add(`${n}|${s.unit}`);
    // A range written as prose often rounds to a value inside it.
    if (s.min != null && s.max != null) {
      for (let n = s.min; n <= s.max && n - s.min < 24; n++) set.add(`${n}|${s.unit}`);
    }
  }
  return set;
}

const UNIT_WORDS = {
  hours: /\b(hours?|horas?)\b|時間|小時/,
  days: /\b(days?|d[ií]as?)\b|日間|天|日/,
  weeks: /\b(weeks?|semanas?)\b|週間|週|周/,
  months: /\b(months?|meses|mes)\b|か月|ヶ月|カ月|個月|月/,
  years: /\b(years?|años?|ano)\b|年/,
};

function proseDurations(text) {
  const found = [];
  // The unit must follow the number directly. Allowing filler characters between
  // them made Japanese phrases such as "1個が数日" parse as "1 day".
  const re = /(\d+)\s*(?:[–—~〜-]\s*(\d+))?\s*(hours?|horas?|days?|d[ií]as?|weeks?|semanas?|months?|meses|mes|years?|años?|小時|時間|天|日|週間|週|周|か月|ヶ月|カ月|個月|月|年)/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const word = m[3];
    let unit = null;
    for (const [u, rx] of Object.entries(UNIT_WORDS)) if (rx.test(word)) { unit = u; break; }
    if (!unit) continue;
    for (const raw of [m[1], m[2]]) {
      if (raw == null) continue;
      found.push({ n: Number(raw), unit, text: m[0].trim() });
    }
  }
  return found;
}

for (const food of foods) {
  if (!food.content) continue;
  const allow = permitted(food);
  if (!allow.size) continue;
  for (const L of LOCALES) {
    const c = food.content[L];
    if (!c) continue;
    // Only the storage narrative. Spoilage signs, tips and FAQ answers legitimately
    // discuss other timescales, such as how long a dish may sit out.
    const text = [c.summary, c.pantry, c.fridge, c.freezer].filter(Boolean).join(' ');
    for (const d of proseDurations(text)) {
      if (SAFETY_NUMBERS.has(d.n) && d.unit === 'hours') continue;
      if (allow.has(`${d.n}|${d.unit}`)) continue;
      // A prose figure inside any permitted range of the same unit is fine.
      const inRange = spans(food).some((s) => s.unit === d.unit && s.min != null && s.max != null && d.n >= s.min && d.n <= s.max);
      if (inRange) continue;
      problems.prose.push({ slug: food.slug, locale: L, said: d.text, allowed: [...allow].join(', ') });
    }
  }
}

if (!process.argv.includes('--prose-only')) {
  // ---- 2. impossible ordering -------------------------------------------
  const PERISHABLE = new Set(['meat', 'poultry', 'seafood', 'dairy-eggs', 'deli-prepared']);
  // Only ever compare like with like. An unopened can is shelf-stable for years
  // and lasts days once opened and refrigerated; comparing its pantry span
  // against its afterOpening span says nothing except that the two describe
  // different situations.
  for (const food of foods) {
    const best = {};
    for (const s of spans(food)) {
      const h = toHours(s.max ?? s.min, s.unit);
      if (h == null) continue;
      best[s.span] = best[s.span] || {};
      best[s.span][s.method] = Math.max(best[s.span][s.method] || 0, h);
    }
    for (const [span, m] of Object.entries(best)) {
      if (m.pantry && m.fridge && m.pantry > m.fridge && PERISHABLE.has(food.category)) {
        problems.ordering.push({ slug: food.slug, why: `${span}: pantry (${m.pantry}h) outlasts fridge (${m.fridge}h)` });
      }
      if (m.fridge && m.freezer && m.fridge > m.freezer) {
        problems.ordering.push({ slug: food.slug, why: `${span}: fridge (${m.fridge}h) outlasts freezer (${m.freezer}h)` });
      }
    }
  }

  // ---- 3. implausible magnitude -----------------------------------------
  // Curing, drying, smoking, ageing and canning all exist precisely to make a
  // perishable keep for months, so a long fridge life is expected there and
  // flagging it only buries the real findings.
  const PRESERVED = /cured|dried|dry|smoked|jerky|cheese|ham|salami|sausage|canned|pickled|brined|parmesan|cheddar|gouda|edam|comte|manchego|cotija|halloumi|butter|ghee|margarine|prosciutto|bresaola|coppa|jamon|pastrami|chorizo|floss|anchovies|scallop|shrimp|pate|hummus|herring|bacon|pepperoni|speck|mortadella|salchichon|lomo|confit|caviar|roe|bottarga|katsuobushi|bonito/i;
  for (const food of foods) {
    const preserved = PRESERVED.test(food.slug) || PRESERVED.test(food.baseName || '') || PRESERVED.test(food.subtitle || '');
    for (const s of spans(food)) {
      const h = toHours(s.max ?? s.min, s.unit);
      if (h == null) continue;
      if (!preserved && PERISHABLE.has(food.category) && s.method === 'fridge' && h > 24 * 30) {
        problems.magnitude.push({ slug: food.slug, why: `fridge ${s.min}-${s.max} ${s.unit} for a perishable` });
      }
      if (s.method === 'freezer' && h > 8766 * 3) {
        problems.magnitude.push({ slug: food.slug, why: `freezer ${s.min}-${s.max} ${s.unit}` });
      }
    }
  }
}

function report(title, rows, render) {
  console.log(`\n${title}: ${rows.length}`);
  for (const r of rows.slice(0, 40)) console.log('  ' + render(r));
  if (rows.length > 40) console.log(`  … and ${rows.length - 40} more`);
}

report('Prose contradicts the storage table', problems.prose,
  (r) => `${r.slug} [${r.locale}] says "${r.said}" — table allows ${r.allowed}`);
if (!process.argv.includes('--prose-only')) {
  report('Impossible ordering', problems.ordering, (r) => `${r.slug}: ${r.why}`);
  report('Implausible magnitude', problems.magnitude, (r) => `${r.slug}: ${r.why}`);
}

const total = problems.prose.length + problems.ordering.length + problems.magnitude.length;
console.log(`\n${foods.length} foods audited, ${total} finding${total === 1 ? '' : 's'}.`);
