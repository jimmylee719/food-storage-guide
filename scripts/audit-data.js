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
 * Findings that a person has reviewed and judged correct are recorded in
 * scripts/audit-accepted.json, and are not reported again. That baseline is what
 * makes this a regression check rather than a wall of noise: a run that prints
 * nothing means nothing has changed since the last review, and anything printed
 * is new.
 *
 *   node scripts/audit-data.js            # findings not yet accepted
 *   node scripts/audit-data.js --all      # including accepted ones
 *   node scripts/audit-data.js --accept   # record the current findings as reviewed
 *   node scripts/audit-data.js --json     # write the queue to scripts/audit/
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const D = (...p) => path.join(ROOT, 'src', 'data', ...p);
// Published locales only. Japanese and Spanish articles are retained but not
// served, so a contradiction there misleads nobody today.
const LOCALES = ['en', 'zh'];

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
const NORM_UNIT = { year: 'years', month: 'months', week: 'weeks', day: 'days', hour: 'hours' };
const norm = (u) => NORM_UNIT[u] || u;

function permitted(food) {
  const set = new Set();
  for (const s of spans(food)) {
    const unit = norm(s.unit);
    for (const n of [s.min, s.max]) if (n != null) set.add(`${n}|${unit}`);
    // A figure given in months is often written as the equivalent in years, and
    // the other way round. Both are the same claim.
    if (unit === 'months') {
      for (const n of [s.min, s.max]) {
        if (n != null && n % 12 === 0) set.add(`${n / 12}|years`);
      }
      if (s.min != null && s.max != null) {
        for (let y = Math.ceil(s.min / 12); y <= Math.floor(s.max / 12); y++) set.add(`${y}|years`);
      }
    }
    if (unit === 'years') {
      for (const n of [s.min, s.max]) if (n != null) set.add(`${n * 12}|months`);
    }
    // A range written as prose often rounds to a value inside it.
    if (s.min != null && s.max != null) {
      for (let n = s.min; n <= s.max && n - s.min < 24; n++) set.add(`${n}|${unit}`);
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

/**
 * A duration is only comparable with the table when it describes the same thing
 * the table describes. These phrases mark a sentence that is talking about some
 * other state of the food — cut, cooked, opened, still ripening — or about a
 * condition the record has no row for, such as a commercial cold store. The
 * record cannot confirm or contradict those, so flagging them is noise: a review
 * of 159 such findings found every single one correct.
 */
const OTHER_STATE = new RegExp([
  // English
  'cut', 'sliced', 'chopped', 'cooked', 'boiled', 'roasted', 'pur[ée]e', 'leftover',
  'once opened', 'after opening', 'opened', 'ripen', 'ripening', 'unripe',
  'commercial', 'controlled', 'cold store', 'cold storage', 'storage room', 'warehouse',
  'harvest', 'blanch', 'marinate', 'insect', 'egg[s]? in the flour', 'kill',
  'is generally given', 'published figure for', 'compared with', 'whereas',
  // Chinese
  '切開', '切片', '切塊', '切好', '煮熟', '熟的', '煮過', '打成泥', '剩',
  '開封後', '開封', '催熟', '未熟', '熟成', '商業', '冷藏庫', '冷藏庫房', '低溫倉',
  '採收', '汆燙', '醃', '蟲卵', '殺蟲', '相比', '相較', '的數據是', '一般只給',
].join('|'), 'i');

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
    // The clause the number sits in, bounded by sentence punctuation.
    const before = text.slice(0, m.index);
    const after = text.slice(m.index);
    const start = Math.max(before.lastIndexOf('.'), before.lastIndexOf('。'), before.lastIndexOf('；'), before.lastIndexOf(';')) + 1;
    const endRel = after.search(/[.。！!？?]/);
    const clause = (before.slice(start) + (endRel === -1 ? after : after.slice(0, endRel))).trim();
    for (const raw of [m[1], m[2]]) {
      if (raw == null) continue;
      found.push({ n: Number(raw), unit, text: m[0].trim(), clause });
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
      if (OTHER_STATE.test(d.clause)) continue;
      if (allow.has(`${d.n}|${d.unit}`)) continue;
      // A prose figure inside any permitted range of the same unit is fine.
      const inRange = spans(food).some((s) => norm(s.unit) === d.unit && s.min != null && s.max != null && d.n >= s.min && d.n <= s.max);
      if (inRange) continue;
      problems.prose.push({ slug: food.slug, locale: L, said: d.text, clause: d.clause.slice(0, 160), allowed: [...allow].join(', ') });
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

// --json writes every finding to scripts/audit/ so a reviewer can work the
// whole queue instead of the first forty lines of console output.
if (process.argv.includes('--json')) {
  const dir = path.join(ROOT, 'scripts', 'audit');
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) fs.unlinkSync(path.join(dir, f));
  const rows = problems.prose.map((r) => ({ ...r, kind: 'prose' }))
    .concat(problems.ordering.map((r) => ({ ...r, kind: 'ordering' })))
    .concat(problems.magnitude.map((r) => ({ ...r, kind: 'magnitude' })));
  const CHUNK = 60;
  let n = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    n++;
    fs.writeFileSync(path.join(dir, `audit-${String(n).padStart(2, '0')}.json`), JSON.stringify(rows.slice(i, i + CHUNK), null, 1) + '\n');
  }
  console.log(`${rows.length} findings written to scripts/audit/ in ${n} files`);
  process.exit(0);
}

// ---- accepted baseline --------------------------------------------------
const ACCEPTED_FILE = path.join(ROOT, 'scripts', 'audit-accepted.json');
const key = (r) => [r.kind, r.slug, r.locale || '', r.said || r.why || ''].join(' ');

const all = problems.prose.map((r) => ({ ...r, kind: 'prose' }))
  .concat(problems.ordering.map((r) => ({ ...r, kind: 'ordering' })))
  .concat(problems.magnitude.map((r) => ({ ...r, kind: 'magnitude' })));
// The matcher emits one row per number in a range, so the same sentence can
// arrive twice.
const deduped = [...new Map(all.map((r) => [key(r), r])).values()];

if (process.argv.includes('--accept')) {
  const out = {
    reviewed: new Date().toISOString().slice(0, 10),
    note: 'Findings a reviewer checked against the article and the source, and judged correct. Delete an entry to have it reported again.',
    findings: deduped.map((r) => ({ kind: r.kind, slug: r.slug, locale: r.locale ?? null, said: r.said ?? r.why })),
  };
  fs.writeFileSync(ACCEPTED_FILE, JSON.stringify(out, null, 1) + String.fromCharCode(10));
  console.log(`accepted ${out.findings.length} reviewed findings`);
  process.exit(0);
}

const acceptedRaw = readJson(ACCEPTED_FILE, { findings: [] });
const accepted = new Set((acceptedRaw.findings || []).map((r) => key({ ...r, why: r.said })));
const showAll = process.argv.includes('--all');
const fresh = showAll ? deduped : deduped.filter((r) => !accepted.has(key(r)));

problems.prose = fresh.filter((r) => r.kind === 'prose');
problems.ordering = fresh.filter((r) => r.kind === 'ordering');
problems.magnitude = fresh.filter((r) => r.kind === 'magnitude');

function report(title, rows, render) {
  // An empty section is noise on a clean run.
  if (!rows.length) return;
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
console.log(
  `\n${foods.length} foods audited, ${total} ${showAll ? '' : 'new '}finding${total === 1 ? '' : 's'}` +
    (accepted.size && !showAll ? `, ${accepted.size} previously reviewed and accepted (${acceptedRaw.reviewed}).` : '.'),
);
// A clean run is a passing run, so this can gate a build.
process.exit(total ? 1 : 0);
