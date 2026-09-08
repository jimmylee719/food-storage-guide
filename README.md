# Food Storage Guide 食材保存指南

A multilingual reference for how long food keeps in the pantry, the
refrigerator and the freezer, and how to store it properly. Published in
Traditional Chinese, English, Japanese and Spanish.

Storage timelines are built on the [USDA FSIS FoodKeeper dataset][fk], which is
in the public domain. Food-safety principles follow published guidance from the
FDA, CDC, WHO, UK FSA, Taiwan's TFDA, Japan's Consumer Affairs Agency and
Spain's AESAN. Foods absent from FoodKeeper are researched separately and cite
their sources on the page.

[fk]: https://catalog.data.gov/dataset/fsis-foodkeeper-data

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · no runtime database. Every
page is statically generated at build time and deployed on Vercel.

## Getting started

```bash
npm install
npm run data     # generate src/data/generated/* and public/search/*
npm run dev      # http://localhost:3000
```

```bash
npm run build     # data generation + production build
npm run validate  # content, guide and internal-link checks
```

## Repository layout

| Path | What it holds |
|---|---|
| `src/data/base/` | Storage timelines: `foodkeeper.json` (generated from USDA data) and `extra.json` (curated additions with sources) |
| `src/data/content/` | One file per food, four languages: summary, storage prose, spoilage signs, tips, FAQ |
| `src/data/guides/` | One file per guide article, four languages, with cited sources |
| `src/data/generated/` | Build output. Do not edit by hand |
| `src/lib/` | Locale dictionaries, data access, SEO helpers, site configuration |
| `src/app/[locale]/` | Pages: home, food index, categories, food detail, guides, static pages |
| `scripts/` | Data conversion, generation and validation |
| `docs/` | AdSense application walkthrough and deployment notes |

Foods without a content file do not get their own page. They still appear with
their storage times in the category tables. This keeps thin pages out of the
index.

## Adding content

Write a new file following `scripts/CONTENT-SPEC.md` (foods) or
`scripts/GUIDE-SPEC.md` (guides), then:

```bash
npm run validate
npm run data
```

## Documentation

- [docs/ADSENSE.md](docs/ADSENSE.md) — AdSense application steps, common rejection reasons, payment setup
- [docs/DEPLOY.md](docs/DEPLOY.md) — Vercel configuration, environment variables, data pipeline

## Licence

The USDA FoodKeeper data underlying the storage timelines is a U.S. Government
Work in the public domain. The written explanations, guide articles,
translations and site code in this repository are not.
