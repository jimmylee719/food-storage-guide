# Guide article spec

One file per guide: `src/data/guides/<slug>.json`. Valid JSON, UTF-8.

```json
{
  "slug": "danger-zone-two-hour-rule",
  "category": "safety",            // one of: safety | fridge | freezer | pantry | basics
  "updated": "2026-09-08",
  "en": {
    "title": "≤ 65 chars, search-intent title",
    "description": "≤ 155 chars meta description that answers the question directly",
    "intro": "1 paragraph (2–4 sentences) giving the direct answer first (AEO: answer up-front).",
    "sections": [
      { "heading": "H2 text", "body": "Markdown allowed inside: paragraphs, **bold**, bullet lists (- item), numbered lists, simple tables (| a | b |). No H1/H2 markers inside body — headings come from the `heading` field. 80–220 words per section." }
      // 5–8 sections
    ],
    "keyTakeaways": ["3–5 one-line takeaways"],
    "faq": [ { "q": "...", "a": "..." } ],   // 4–6 items, phrased as real search queries
    "sources": [ { "name": "USDA FSIS – 'Danger Zone' (40 °F – 140 °F)", "url": "https://www.fsis.usda.gov/..." } ]
  },
  "zh": { ... same keys, Traditional Chinese (Taiwan usage) ... },
  "ja": { ... Japanese ... },
  "es": { ... Spanish ... }
}
```

Rules
1. Sources must be REAL and VERIFIED (fetch each URL; keep only those that load and actually say what you cite). Prefer: USDA FSIS, FDA, CDC, FoodSafety.gov, WHO, UK FSA, EFSA, Taiwan TFDA (食藥署) / 農業部, Japan 消費者庁 / 厚生労働省 / 農林水産省, Spain AESAN, Hong Kong CFS. 3–6 sources per guide. The same source list may be reused across the 4 languages (translate the `name`, keep the `url`), plus add local-language official sources where they exist (e.g. TFDA page for zh, 消費者庁 page for ja, AESAN page for es).
2. Numbers: °C first; add °F in parentheses in en/es. Fridge ≤ 4 °C (40 °F), freezer −18 °C (0 °F), danger zone 4–60 °C (40–140 °F), 2-hour rule (1 hour above 32 °C / 90 °F). Where regional guidance differs (e.g. Taiwan TFDA 7 °C for refrigeration, Japan 10 °C 以下 for 冷蔵 by law), say so explicitly in that language's version — do not silently pick one.
3. Total length per language ≈ 900–1400 words. Native, natural writing in each language; not literal translation. Traditional Chinese uses Taiwan terms (冷藏、冷凍、常溫、保鮮盒、夾鏈袋、殺菁).
4. No medical claims, no "guaranteed", no fear-mongering. Practical, specific, honest about uncertainty.
5. Internal linking hints: where relevant mention foods in the form `[[food:slug|讀者看到的文字]]`. **Always supply the label after the pipe, written in that section's language** — the label is what renders if the target page does not exist yet, so a sentence never ends up with a hole in it. The bare form `[[food:slug]]` still works but is discouraged. Same for guides: `[[guide:slug|label]]`. Example: `[[food:beef-ground|牛絞肉]]`, `[[guide:how-to-thaw-food-safely|安全解凍的方法]]`.
   Older hint (still valid): foods can be referenced as `[[food:slug]]` (e.g. `[[food:beef-ground]]`, `[[food:cooked-rice]]`, `[[food:eggs-in-shell]]`) and other guides as `[[guide:slug]]`. The site will render these as links. Use only slugs that exist in `src/data/base/foodkeeper.json` or the guide list you were given.
6. Write with the Write tool. Then run `node scripts/validate-guides.js <slug>` and fix errors.
