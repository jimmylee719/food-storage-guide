# 部署與維運

## Vercel

**不需要取消現有部署。** 舊版是純靜態 HTML，新版是 Next.js，push 上去後 Vercel 會自動偵測並改用 Next.js 的建置流程。

### 第一次部署新版本要確認的事

1. **Framework Preset**
   Vercel 專案 → Settings → General → Framework Preset，確認是 **Next.js**。
   舊專案如果被鎖成 "Other" 或 "Static"，要手動改成 Next.js，否則不會執行建置。

2. **Build Command**
   預設 `npm run build` 即可。本專案的 `build` 指令會先跑 `scripts/build-data.js` 產生資料檔，再跑 `next build`。

3. **環境變數**（Settings → Environment Variables）

   | 變數 | 值 | 必要性 |
   |---|---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://你的正式網域` | **必要**，影響 canonical、hreflang、sitemap |
   | `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-...` | 選填，預設已內建現有 ID |
   | `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | 選填，填了才會載入 Google Analytics |

4. **舊網址的處理**
   `next.config.ts` 已設定 301 轉址：
   - `/index.html` → `/zh`
   - `/about.html` → `/zh/about`
   - `/privacy-policy.html` → `/zh/privacy`
   - `/` → `/zh`（暫時轉址，保留日後改成語言自動偵測的彈性）

---

## 本機開發

```bash
npm install
npm run data     # 產生 src/data/generated/* 與 public/search/*
npm run dev      # http://localhost:3000
```

```bash
npm run build    # 產生資料 + 正式建置
npm run validate # 檢查所有食材內容與指南文章的格式
```

---

## 資料流程

```
USDA FoodKeeper JSON
    │  scripts/convert-foodkeeper.js
    ▼
src/data/base/foodkeeper.json        661 筆保存期限（公眾領域）
src/data/base/extra.json             亞洲／西語區補充食材（自行查證，附來源）
    │
    │  + src/data/content/<slug>.json   四語系文案（一食材一檔）
    │  + src/data/guides/<slug>.json    四語系指南文章
    │
    │  scripts/build-data.js
    ▼
src/data/generated/foods.json        網站讀取的合併資料
src/data/generated/guides.json
public/search/{zh,en,ja,es}.json     前端搜尋索引（點擊搜尋框才下載）
```

**重要規則**：`src/data/generated/` 與 `public/search/` 是產生出來的，不要手動編輯。要改內容請改 `src/data/content/` 或 `src/data/guides/`，然後重跑 `npm run data`。

**沒有文案的食材不會有獨立頁面**，只會出現在分類表格中。這是刻意的，避免產生大量薄內容頁面影響 AdSense 審核與 SEO。

---

## 新增食材內容

1. 在 `src/data/base/foodkeeper.json` 或 `extra.json` 找到該食材的 slug
2. 依 `scripts/CONTENT-SPEC.md` 的 schema 建立 `src/data/content/<slug>.json`
3. `node scripts/validate-content.js <slug>` 檢查
4. `npm run data && npm run build`

## 新增指南文章

1. 依 `scripts/GUIDE-SPEC.md` 建立 `src/data/guides/<slug>.json`
2. `node scripts/validate-guides.js <slug>`
3. 文章內可用 `[[food:slug]]` 與 `[[guide:slug]]` 建立內部連結，網站會自動轉成正確語系的連結

---

## SEO 技術檢查點

- 每頁都有 canonical 與四語系 hreflang，另含 `x-default` 指向英文版
- `sitemap.xml` 由 `src/app/sitemap.ts` 動態產生，每個 URL 都帶 hreflang alternates
- 結構化資料：WebSite + SearchAction（全站）、BreadcrumbList（每頁）、Article（食材與指南）、FAQPage（有 FAQ 的頁面）、ItemList（分類頁）
- `robots.ts` 明確允許 GPTBot、ClaudeBot、PerplexityBot 等 AI 檢索器，這是 AEO 策略的一部分
- `public/llms.txt` 提供給大型語言模型的網站摘要與關鍵數據
