# Spec for `src/data/base/extra/*.json`

Storage records for foods the USDA FoodKeeper dataset does not cover.

**Write your own file**, named for your batch, e.g.
`src/data/base/extra/a-tropical-fruit.json`. Each file is a JSON array. Never
edit a file another batch owns — several batches are researched in parallel and
the build merges every file in the directory.

```json
{
  "slug": "durian",
  "category": "fruits",
  "source": "curated",
  "sourceId": null,
  "name": "Durian",
  "subtitle": "whole, ripe",
  "keywords": ["durian", "榴槤"],
  "storage": {
    "pantry": { "base": { "min": 2, "max": 5, "unit": "days", "tips": "Whole, uncut fruit at room temperature; the smell intensifies as it ripens." } },
    "fridge": { "base": { "min": 3, "max": 5, "unit": "days", "tips": "Sealed in an airtight container so the aroma does not transfer." } },
    "freezer": { "base": { "min": 3, "max": 6, "unit": "months", "tips": "Freeze the flesh, not the whole fruit." } }
  },
  "sources": [
    { "name": "Agency or institution – page title", "url": "https://…" }
  ],
  "analog": null,
  "notes": null
}
```

## Field rules

- **slug** — kebab-case English, unique across `foodkeeper.json`, `split.json`
  and every file already in `extra/`. Grep all of them before writing.
- **category** — exactly one of: `meat`, `poultry`, `seafood`, `dairy-eggs`,
  `vegetables`, `fruits`, `herbs-spices`, `grains-beans-pasta`, `baked-goods`,
  `baking-staples`, `condiments-sauces`, `shelf-stable`, `snacks-nuts-seeds`,
  `oils-fats`, `beverages`, `frozen-foods`, `deli-prepared`,
  `vegetarian-proteins`, `baby-food`.
- **name / subtitle** — English. `subtitle` qualifies the form (`"dried"`,
  `"cooked"`, `"whole, ripe"`) or is `null`.
- **keywords** — English plus the local-language names, and this matters: the
  search index is built from these, so a Traditional Chinese, Japanese or
  Spanish reader finds nothing unless their name for the food is in here.
  Include Traditional Chinese, Japanese and Spanish names for every item.
- **storage** — omit a method entirely when there is no reliable timeline for
  it. Inside a method use `base` unless a source distinguishes opened from
  unopened, in which case use `afterOpening` as well. `unit` is one of `hours`,
  `days`, `weeks`, `months`, `years`. `tips` is a short English sentence or
  `null`. A method may carry `tips` with `min`/`max` set to `null` when the
  honest answer is "no fixed timeline, here is the caveat".
- **sources** — 1 to 3 entries. Every URL must have been fetched successfully
  and must actually state what you are citing. No guessed URLs.
- **analog** — the FoodKeeper slug you based the numbers on when no direct
  source exists, otherwise `null`. When set, `notes` must say so plainly.
- **notes** — anything a reader or a later editor should know, or `null`.

## Preferred sources

Taiwan 食藥署 (TFDA) and 農業部; Japan 消費者庁, 農林水産省, 厚生労働省; Hong Kong
CFS; Singapore SFA; UK FSA; EU EFSA; Spain AESAN; Mexico COFEPRIS; US FDA and
USDA; Health Canada; FAO; university extension services, especially UC Davis
Postharvest Technology Center for fresh produce; peer-reviewed postharvest
literature.

`fsis.usda.gov`, `foodsafety.gov` and some CDC paths return 403 to the fetch
tools. Cite something you could actually fetch.

## After writing

```bash
node scripts/validate-extra.js
node scripts/build-data.js
```
