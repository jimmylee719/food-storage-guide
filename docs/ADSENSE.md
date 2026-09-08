# Google AdSense 申請與上線流程

本專案已經預先接好 AdSense 需要的所有技術件。這份文件說明「還要做什麼」以及「按什麼順序做」。

---

## 一、目前程式碼已經完成的部分

| 項目 | 位置 | 說明 |
|---|---|---|
| AdSense 主程式碼 | `src/app/[locale]/layout.tsx` | 每一頁都會載入 `adsbygoogle.js`，帶你的 publisher ID |
| 網站驗證 meta 標籤 | 同上，`google-adsense-account` | 新版 AdSense 用這個驗證網站擁有權 |
| `ads.txt` | `public/ads.txt` | 已填入 `pub-8149364037190716`，部署後可從 `/ads.txt` 取得 |
| 廣告版位元件 | `src/components/AdSlot.tsx` | 沒填 slot ID 時不渲染任何東西，審核期間版面乾淨 |
| 隱私權政策 | `/[locale]/privacy` | 四語系，已包含 Cookie、第三方廣告、選擇退出說明 |
| 關於我們 | `/[locale]/about` | 四語系 |
| 聯絡方式 | `/[locale]/contact` | 四語系，含 email |
| 使用條款 | `/[locale]/terms` | 四語系 |
| 資料來源與方法 | `/[locale]/methodology` | 四語系，說明資料出處，對 E-E-A-T 很重要 |

**publisher ID 換人時**：改環境變數 `NEXT_PUBLIC_ADSENSE_CLIENT`，並同步改 `public/ads.txt`。

---

## 二、申請前必須先做的事

AdSense 2025 年後審核明顯變嚴，重點在「內容是否有獨立價值」。以下三件事建議做完再送審。

### 1. 綁定自己的網域（強烈建議）
`*.vercel.app` 的子網域申請 AdSense 常被打回，因為它不是你擁有的網域。

1. 去 Namecheap / Cloudflare / GoDaddy 買一個網域，`.com` 一年約 10–15 美元。
2. Vercel 專案 → Settings → Domains → Add，輸入網域。
3. 依 Vercel 指示到網域商後台設定 DNS（通常是加一筆 A record 指向 `76.76.21.21`，以及 `CNAME` 的 `www` 指向 `cname.vercel-dns.com`）。
4. 在 Vercel 專案的 Environment Variables 加上 `NEXT_PUBLIC_SITE_URL=https://你的網域`，重新部署。這一步很重要，canonical 與 sitemap 都靠它。

### 2. 內容量與品質
- 目標：**至少 30 篇以上有實質內容的頁面**再送審。本專案的食材頁與指南文章都算。
- 每個食材頁約 250–400 字 × 4 語系，指南文章約 900–1400 字 × 4 語系，內容深度足夠。
- 避免只有表格沒有文字的頁面。程式已經處理：沒有文案的食材不會產生獨立頁面，只出現在分類表格裡。

### 3. 網站要能被 Google 索引
先做 Google Search Console，再送 AdSense。理由是 AdSense 審核時會看網站是否已被 Google 認識。

---

## 三、Google Search Console 設定（先做這個）

1. 前往 https://search.google.com/search-console
2. 選「網址前置字元」，輸入 `https://你的網域`
3. 驗證方式選 **HTML 標記**，複製 `content=` 裡的字串
4. 加到 Vercel 環境變數，或直接寫進 `src/app/[locale]/layout.tsx` 的 `metadata.verification`：
   ```ts
   verification: { google: '你的驗證碼' }
   ```
5. 重新部署後回 Search Console 按驗證
6. 驗證成功後，到「Sitemap」提交：`sitemap.xml`
7. 用「網址審查」工具，手動送出首頁與 3–5 個重要頁面要求建立索引

Search Console 通常 3–14 天開始出現資料。

---

## 四、AdSense 申請步驟

1. 前往 https://www.google.com/adsense/start/ ，用你的 Google 帳號登入
2. 填寫：
   - 網站網址：`https://你的網域`（不要填 vercel.app）
   - 國家/地區：台灣
   - 付款收款人姓名：**必須與你銀行帳戶名稱完全一致**，之後很難改
3. 選擇廣告顯示方式，先選「自動廣告」即可
4. Google 會給你一段程式碼要你貼到 `<head>`。**本專案已經內建**，只要確認 publisher ID 一致即可
   - 若 Google 給的 ID 與 `ca-pub-8149364037190716` 不同，去 Vercel 設 `NEXT_PUBLIC_ADSENSE_CLIENT` 為新 ID，並更新 `public/ads.txt`
5. 回 AdSense 按「我已貼上程式碼」
6. 等待審核。官方說 1–2 週，實際上 1 天到 4 週都有可能

### 審核期間不要做的事
- 不要頻繁改網域或大改網站結構
- 不要自己點廣告，也不要請朋友點
- 不要在審核中途把網站下線

---

## 五、審核通過之後

### 1. 建立廣告單元並填入 slot ID
1. AdSense → 廣告 → 依廣告單元 → 建立「多媒體廣告」
2. 複製 `data-ad-slot` 的數字
3. 填進頁面裡的 `<AdSlot />`，例如：
   ```tsx
   <AdSlot slot="1234567890" label="Advertisement" />
   ```
   目前有三個位置預留：食材頁（儲存面板下方）、分類頁（表格下方）、指南文章（第二節之後）。
4. 沒填 slot 的 `AdSlot` 完全不渲染，所以可以一個一個慢慢開。

### 2. 驗證 ads.txt
AdSense 首頁若出現 ads.txt 警告，檢查 `https://你的網域/ads.txt` 能否打開，內容應為一行：
```
google.com, pub-8149364037190716, DIRECT, f08c47fec0942fa0
```

### 3. 歐盟同意聲明（重要）
如果會有歐洲流量（西班牙文版一定會有），AdSense 會要求你使用經 Google 認證的 CMP（同意管理平台）。
- 最簡單：AdSense → 隱私權與訊息 → 歐盟使用者同意聲明 → 啟用 Google 自家的 CMP，不用寫程式碼
- 沒設定的話，歐洲流量的廣告會停止投放

### 4. 付款設定
- 收入累積到 10 美元時，Google 會寄一張 PIN 碼明信片到你填的地址，需要輸入驗證
- 累積到 100 美元才會付款，每月 21 日左右匯出
- 台灣可用電匯到本地銀行，需要填銀行代碼與帳號
- 需要填美國稅務資訊（W-8BEN），在 AdSense 付款設定裡線上填即可

---

## 六、常見被拒原因與對應

| 拒絕理由 | 白話意思 | 怎麼修 |
|---|---|---|
| Low value content | 內容太薄或太像資料表 | 增加食材頁數量與文字深度，補齊指南文章 |
| Site does not comply with policies | 缺少必要頁面 | 本專案已有隱私權/關於/聯絡/條款，確認四語系都能打開 |
| Under construction | 有空頁面或壞連結 | 部署後跑一次連結檢查 |
| Cannot verify site ownership | 程式碼沒被偵測到 | 確認 `/` 頁原始碼含 `adsbygoogle.js` 與 `google-adsense-account` meta |
| Scraped content | 內容像抄的 | 本站文案為原創撰寫，資料來源為公眾領域的 USDA 資料並已標註出處 |

被拒後可以修改再送審，沒有次數限制，但建議每次間隔至少兩週並確實有改進。

---

## 七、收益現實面

先講實話，避免期待落差。

- 台灣中文流量的 RPM（每千次瀏覽收益）大約 0.5–2 美元，英文與西班牙文較高，日文中等
- 食物保存屬於生活類，廣告單價中等偏低，但搜尋量大且長尾多
- 粗估：每月 10,000 次瀏覽約 10–30 美元；要到每月 100 美元門檻，大概需要每月 3–10 萬次瀏覽
- 真正的槓桿在 **內容數量 × 語系數量**。661 種食材 × 4 語系 = 2,644 個潛在頁面，這是這個專案的核心優勢

---

## 八、檢查清單

送審前逐項確認：

- [ ] 已綁定自有網域，`https://` 正常
- [ ] `NEXT_PUBLIC_SITE_URL` 已設為正式網域
- [ ] `/ads.txt` 可以打開且內容正確
- [ ] 四語系的 about / contact / privacy / terms 都能打開
- [ ] `/sitemap.xml` 可以打開，且網址都是正式網域
- [ ] Search Console 已驗證並提交 sitemap
- [ ] 至少 30 個以上有實質內容的頁面
- [ ] 首頁原始碼可以搜到 `adsbygoogle.js`
- [ ] 沒有壞連結、沒有空白頁
