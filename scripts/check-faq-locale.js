/**
 * Measures how far the Chinese FAQs have drifted from being a translation of
 * the English ones.
 *
 * A reader in Taipei and a reader in Ohio do not ask the same questions about
 * the same food. Their kitchens differ (a 電鍋 left on 保溫 all afternoon), their
 * climate differs (a "room-temperature pantry" that sits at 32 °C and 80%
 * humidity for four months of the year), their shopping differs (meat bought
 * unrefrigerated at a 傳統市場 and carried home in the heat), and their labels
 * differ (有效日期 rather than best-before).
 *
 * When every Chinese article carries exactly the same number of FAQs as its
 * English twin, asking exactly the same things in the same order, the pair
 * looks like one template rendered in two languages — which is both what a
 * reviewer notices first and, more importantly, a worse page for the reader.
 *
 * This script does not judge writing. It reports two numbers:
 *   - mirrored: files where the two locales have the same FAQ count
 *   - localised: files whose Chinese FAQs raise a genuinely local situation
 *
 *   node scripts/check-faq-locale.js
 *   node scripts/check-faq-locale.js --list      # files with no local question
 */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'src', 'data', 'content');

// Situations that only arise for a reader in Taiwan, Hong Kong or a comparable
// subtropical kitchen. Matching one of these is evidence the question was
// written for that reader rather than translated for them.
const LOCAL = new RegExp([
  '電鍋', '大同電鍋', '保溫', '燜燒', '悶燒', '電子鍋',
  '傳統市場', '菜市場', '早市', '黃昏市場', '攤販', '散裝',
  '梅雨', '回南天', '潮濕', '受潮', '除濕', '濕氣', '夏天', '夏季', '氣溫', '室溫超過',
  '便當', '帶便當', '外帶', '自助餐', '滷味', '手搖',
  '有效日期', '有效期限', '保存期限', '賞味期限',
  '騎車', '機車', '車上', '通勤',
  '小冰箱', '套房', '宿舍',
  '台灣', '亞熱帶', '生蟲', '米蟲',
].join('|'));

// Once the whole set is mirrored there is nothing left to measure; allow a
// little genuine parity, since some foods really have no local angle.
const MIRRORED_CEILING = 0.95;

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort();
let withFaq = 0;
let mirrored = 0;
let localised = 0;
const plain = [];

for (const file of files) {
  const doc = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
  const en = doc.en && doc.en.faq;
  const zh = doc.zh && doc.zh.faq;
  if (!Array.isArray(en) || !Array.isArray(zh)) continue;
  withFaq++;
  if (en.length === zh.length) mirrored++;
  const text = zh.map((q) => `${q.q} ${q.a}`).join(' ');
  if (LOCAL.test(text)) localised++;
  else plain.push(file.replace(/\.json$/, ''));
}

const pct = (n) => `${((n / withFaq) * 100).toFixed(1)}%`;

if (process.argv.includes('--list')) {
  console.log(plain.join('\n'));
  process.exit(0);
}

console.log(`${withFaq} files carry FAQs in both languages.`);
console.log(`  same FAQ count in both locales: ${mirrored}  (${pct(mirrored)})`);
console.log(`  Chinese FAQs raising a local situation: ${localised}  (${pct(localised)})`);
console.log(`  no local question at all: ${plain.length}`);

const ratio = mirrored / withFaq;
if (ratio > MIRRORED_CEILING) {
  console.log(
    `\nFAIL: ${pct(mirrored)} of files have identical FAQ counts in both languages.` +
    `\nThat is the signature of one template rendered twice rather than two articles` +
    `\nwritten for two readerships. Run with --list to see which files have no local question.`,
  );
  process.exit(1);
}
console.log('\nOK: the two locales diverge.');
