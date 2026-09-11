/**
 * Finds English text left on the Chinese, Japanese and Spanish pages.
 *
 * A reader on the Chinese site should never meet an English sentence. The site
 * is assembled from four sources — translated articles, research data written
 * in English, generated names and UI strings — and any of them can leak.
 *
 * Run against a built site:
 *   npx next build && npx next start -p 3000
 *   node scripts/check-language.js http://localhost:3000
 */
const base = process.argv[2] || 'http://localhost:3000';

// Text that is correct in any language: proper names of agencies and datasets,
// units, and the site's own citations.
const ALLOWED = [
  'FoodKeeper', 'USDA', 'FSIS', 'FDA', 'CDC', 'WHO', 'OMS', 'EFSA', 'AESAN', 'NCHFP', 'HACCP', 'APPCC',
  'Vercel', 'Google', 'AdSense', 'Analytics', 'Vanture', 'MAFF', 'MHLW', 'CFS', 'FSA', 'SFA', 'FSSAI',
  'Listeria', 'Salmonella', 'Campylobacter', 'Clostridium', 'botulinum', 'perfringens', 'Bacillus',
  'cereus', 'Staphylococcus', 'aureus', 'Vibrio', 'Anisakis', 'Toxoplasma', 'coli', 'monocytogenes',
  'norovirus', 'Norovirus', 'aflatoxin', 'patulin', 'lox', 'Espa', 'English', 'llms', 'txt', 'https',
];

const SKIP_TAGS = /<(script|style|code|pre)[\s\S]*?<\/\1>/gi;

function textOf(html) {
  return html
    .replace(SKIP_TAGS, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

// A run of three or more Latin words is a sentence, not a borrowed term. This
// only identifies a leak on a page whose own script is not Latin.
const SENTENCE = /\b[A-Za-z][A-Za-z'’-]{1,}(?:\s+[A-Za-z][A-Za-z'’-]{1,}){2,}/g;

// Spanish is written in the same alphabet as English, so a leak there has to be
// recognised by vocabulary. These words are common in English storage prose and
// are not Spanish words.
const ENGLISH_MARKERS = /\b(the|and|with|from|keep|keeps|store|stored|storage|fridge|freezer|pantry|days?|weeks?|months?|years?|before|after|until|about|through|should|until|wrap|wrapped|thaw|thawed|frozen|fresh|dry|dried|cooked|opened|unopened|refrigerat\w*|recommended|discard|use-by|best|quality|safety)\b/gi;

function leaks(html, locale) {
  const text = textOf(html);
  const found = [];

  if (locale === 'es') {
    // Two or more English marker words close together is a sentence in the
    // wrong language; one on its own is usually a coincidence or a citation.
    for (const m of text.matchAll(/[^.。!?¡¿]{15,220}/g)) {
      const clause = m[0].trim();
      if (ALLOWED.some((a) => clause.includes(a))) continue;
      const markers = clause.match(ENGLISH_MARKERS);
      if (markers && new Set(markers.map((x) => x.toLowerCase())).size >= 3) found.push(clause);
    }
    return [...new Set(found)];
  }

  for (const m of text.matchAll(SENTENCE)) {
    const phrase = m[0].trim();
    if (ALLOWED.some((a) => phrase.includes(a))) continue;
    // A URL or a file path caught by the word matcher.
    if (/^(www|http)/i.test(phrase)) continue;
    found.push(phrase);
  }
  return [...new Set(found)];
}

async function main() {
  // Sample every kind of page in the three non-English locales.
  const paths = [
    '', '/foods', '/guides', '/food-safety', '/methodology', '/about', '/privacy', '/terms', '/contact',
    '/category/seafood', '/category/vegetables', '/category/herbs-spices', '/category/condiments-sauces',
    '/food/salmon', '/food/mackerel', '/food/pandan', '/food/durian', '/food/natto', '/food/queso-fresco',
    '/guides/how-to-freeze-food',
  ];
  const locales = ['zh'];
  let checked = 0;
  const byPage = [];

  for (const l of locales) {
    for (const p of paths) {
      const url = `${base}/${l}${p}`;
      let html;
      try {
        const res = await fetch(url);
        if (!res.ok) { console.log(`  ${url} → HTTP ${res.status}`); continue; }
        html = await res.text();
      } catch (e) {
        console.log(`  ${url} → ${e.message}`);
        continue;
      }
      checked++;
      const found = leaks(html, l);
      if (found.length) byPage.push({ url, found });
    }
  }

  let total = 0;
  for (const { url, found } of byPage) {
    total += found.length;
    console.log(`\n${url}  (${found.length})`);
    for (const f of found.slice(0, 6)) console.log(`  "${f.slice(0, 100)}"`);
    if (found.length > 6) console.log(`  … and ${found.length - 6} more`);
  }

  console.log(`\n${checked} pages checked, ${total} English phrase${total === 1 ? '' : 's'} on non-English pages.`);
  process.exit(total ? 1 : 0);
}

main();
