// Crawls a running server and checks the SEO essentials on a sample of pages.
// Usage: node scripts/qa-pages.js [baseUrl]
const base = process.argv[2] || 'http://localhost:3000';
const LOCALES = ['zh', 'en'];

const foods = require('../src/data/generated/foods.json');
const guides = require('../src/data/generated/guides.json');
const { CATEGORIES } = { CATEGORIES: ['vegetables', 'fruits', 'meat', 'poultry', 'seafood', 'dairy-eggs', 'grains-beans-pasta', 'baked-goods', 'baking-staples', 'condiments-sauces', 'herbs-spices', 'oils-fats', 'shelf-stable', 'snacks-nuts-seeds', 'beverages', 'frozen-foods', 'deli-prepared', 'vegetarian-proteins', 'baby-food'] };

const withPages = foods.filter((f) => f.hasPage);
function sample(arr, n) {
  if (arr.length <= n) return arr;
  const step = arr.length / n;
  return Array.from({ length: n }, (_, i) => arr[Math.floor(i * step)]);
}

const paths = [];
for (const l of LOCALES) {
  paths.push(`/${l}`, `/${l}/foods`, `/${l}/guides`, `/${l}/about`, `/${l}/privacy`, `/${l}/terms`, `/${l}/contact`, `/${l}/methodology`, `/${l}/food-safety`);
  for (const c of sample(CATEGORIES, 4)) paths.push(`/${l}/category/${c}`);
  for (const f of sample(withPages, 8)) paths.push(`/${l}/food/${f.slug}`);
  for (const g of sample(guides, 4)) paths.push(`/${l}/guides/${g.slug}`);
}

const pick = (html, re) => { const m = html.match(re); return m ? m[1].trim() : null; };
const titles = new Map();
const descriptions = new Map();
let problems = 0;

function fail(path, msg) { problems++; console.log(`  ${path}\n    ${msg}`); }

(async () => {
  console.log(`Checking ${paths.length} pages on ${base}\n`);
  for (const p of paths) {
    let res, html;
    try {
      res = await fetch(base + p);
      html = await res.text();
    } catch (e) {
      fail(p, `request failed: ${e.message}`);
      continue;
    }
    if (res.status !== 200) { fail(p, `HTTP ${res.status}`); continue; }

    const title = pick(html, /<title>([^<]*)<\/title>/);
    const desc = pick(html, /<meta name="description" content="([^"]*)"/);
    const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/);
    const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
    // React emits the camelCase form; HTML attribute names are case-insensitive.
    const hreflangs = [...html.matchAll(/hreflang="([^"]+)"/gi)].map((m) => m[1]);
    const lang = pick(html, /<html lang="([^"]+)"/);

    if (!title) fail(p, 'no <title>');
    else if (title.length > 70) fail(p, `title is ${title.length} chars: ${title}`);
    if (!desc) fail(p, 'no meta description');
    else if (desc.length > 170) fail(p, `description is ${desc.length} chars`);
    if (!h1) fail(p, 'no <h1>');
    if (!canonical) fail(p, 'no canonical');
    if (!lang) fail(p, 'no html lang');
    for (const need of ['zh-Hant-TW', 'en', 'x-default']) {
      if (!hreflangs.includes(need)) fail(p, `missing hreflang ${need}`);
    }
    if (title) {
      if (!titles.has(title)) titles.set(title, []);
      titles.get(title).push(p);
    }
    if (desc) {
      if (!descriptions.has(desc)) descriptions.set(desc, []);
      descriptions.get(desc).push(p);
    }
  }

  for (const [title, where] of titles) {
    if (where.length > 1) fail(where.join(', '), `duplicate title: ${title}`);
  }
  for (const [, where] of descriptions) {
    if (where.length > 1) fail(where.join(', '), 'duplicate meta description');
  }

  console.log(`\n${paths.length} pages checked, ${problems} problem${problems === 1 ? '' : 's'}.`);
  process.exit(problems ? 1 : 0);
})();
