import type { AnyLocale, Locale } from './i18n';
import { CONTACT_EMAIL } from './site';

export type StaticPage = {
  title: string;
  description: string;
  sections: { heading?: string; body: string[]; bullets?: string[] }[];
};

type PageKey = 'about' | 'contact' | 'privacy' | 'terms' | 'methodology' | 'food-safety';

const P: Record<PageKey, Record<AnyLocale, StaticPage>> = {
  about: {
    zh: {
      title: '關於本站',
      description: '食材保存指南是一個免費的多語系食物保存資料庫，整理常溫、冷藏與冷凍的保存期限與方法。',
      sections: [
        { body: ['「食材保存指南」是一個免費、無需註冊的食物保存查詢工具。輸入任何食材名稱，就能看到它在常溫、冷藏與冷凍三種環境下能放多久，以及正確的保存做法。', '網站目前提供繁體中文、English、日本語與 Español 四種語言，所有內容都是針對各語言重新撰寫，而不是機器翻譯。'] },
        { heading: '我們為什麼做這個網站', body: ['聯合國環境規劃署估計，全球每年約有 10 億份餐點等級的食物在家庭、零售與餐飲端被浪費掉。其中很大一部分，只是因為大家不確定東西還能不能吃。', '網路上關於保存期限的說法很多，但大多缺乏出處，彼此矛盾。我們希望做一個相反的東西：每一個數字都能追溯到官方資料來源，而且四種語言看到的是同一套標準。'] },
        { heading: '內容怎麼來的', body: ['保存期限的主幹來自美國農業部食品安全檢驗局（USDA FSIS）發布的 FoodKeeper 資料集，屬於公眾領域資料。安全原則參考美國 FDA、疾病管制與預防中心（CDC）、世界衛生組織、英國 FSA、台灣衛生福利部食品藥物管理署等機關的公開指引。', '亞洲與西語地區常見但 FoodKeeper 未收錄的食材，我們另外查找當地主管機關、大學推廣單位或學術文獻的資料，並在該食材頁面標註來源。詳細做法寫在「資料來源與方法」頁。'] },
        { heading: '這不是什麼', body: ['本站提供的是一般性的保存與食品安全資訊，不是醫療建議，也不能取代你自己的判斷。保存期限指的是「最佳品質」的參考範圍，不是安全保證。食材只要有異味、變色、發霉或包裝膨脹，請直接丟棄。'] },
        { heading: '聯絡', body: [`發現錯誤、想補充某種食材，或有合作提案，歡迎來信：${CONTACT_EMAIL}。收到指正我們會核對來源後更新。`] },
      ],
    },
    en: {
      title: 'About',
      description: 'Food Storage Guide is a free multilingual database of pantry, fridge and freezer storage times for everyday foods.',
      sections: [
        { body: ['Food Storage Guide is a free, no-signup reference for how long food keeps. Type in a food and you get how long it lasts in the pantry, the fridge and the freezer, plus how to store it properly.', 'The site is published in Traditional Chinese, English, Japanese and Spanish. Every language is written for its own readers rather than machine-translated.'] },
        { heading: 'Why this site exists', body: ['The UN Environment Programme estimates that around one billion meals worth of food is wasted in households, retail and food service every year. A large share of that is thrown away simply because nobody was sure whether it was still good.', 'Storage advice online is plentiful but often unsourced and contradictory. We wanted the opposite: every number traceable to an official dataset, and the same standard across all four languages.'] },
        { heading: 'Where the data comes from', body: ['Storage times are built on the FoodKeeper dataset published by the USDA Food Safety and Inspection Service, which is in the public domain. Safety principles follow published guidance from the FDA, the CDC, the World Health Organization, the UK Food Standards Agency and Taiwan\'s Food and Drug Administration, among others.', 'For foods that are common in Asia or the Spanish-speaking world but missing from FoodKeeper, we look for guidance from local authorities, university extension services or academic literature, and cite the source on that food\'s page. The full approach is described on the Sources & method page.'] },
        { heading: 'What this is not', body: ['This site is general storage and food-safety information. It is not medical advice and it does not replace your own judgement. Storage times indicate best quality, not a safety guarantee. If food smells off, looks discoloured, shows mould or the package is swollen, throw it out.'] },
        { heading: 'Contact', body: [`Found an error, want a food added, or have a partnership enquiry? Email ${CONTACT_EMAIL}. Corrections are checked against sources and applied.`] },
      ],
    },
    ja: {
      title: 'このサイトについて',
      description: '食品保存ガイドは、常温・冷蔵・冷凍の保存期間をまとめた無料の多言語データベースです。',
      sections: [
        { body: ['「食品保存ガイド」は、登録不要で使える無料の食品保存データベースです。食材名を入力すると、常温・冷蔵・冷凍それぞれの保存期間と、正しい保存のしかたが分かります。', '繁体字中国語・英語・日本語・スペイン語の 4 言語で公開しています。いずれも機械翻訳ではなく、その言語の読者に向けて書き下ろしています。'] },
        { heading: 'なぜ作ったのか', body: ['国連環境計画（UNEP）の推計では、家庭・小売・外食で毎年およそ 10 億食分の食料が捨てられています。その多くは「まだ食べられるか分からない」という理由で捨てられたものです。', 'ネット上の保存情報は多いものの、出典がなく、内容が食い違うこともよくあります。このサイトはその逆を目指しました。数値はすべて公的データにさかのぼれること、そして 4 言語で同じ基準を示すことです。'] },
        { heading: 'データの出どころ', body: ['保存期間の土台は、米国農務省食品安全検査局（USDA FSIS）が公開している FoodKeeper データセット（パブリックドメイン）です。安全に関する考え方は、FDA、CDC、世界保健機関、英国 FSA、日本の消費者庁・厚生労働省・農林水産省などの公開情報にもとづいています。', 'FoodKeeper に収録がなく、アジアやスペイン語圏でよく使われる食材については、各国の行政機関、大学の普及部門、学術文献などを調べ、その食材のページに出典を明記しています。詳しい方法は「出典と作成方法」のページに記載しています。'] },
        { heading: '注意していただきたいこと', body: ['本サイトは一般的な保存・食品安全の情報提供であり、医学的な助言ではありません。保存期間は「おいしく食べられる目安」であって、安全の保証ではありません。異臭、変色、カビ、容器のふくらみがある場合は、味見をせずに廃棄してください。'] },
        { heading: 'お問い合わせ', body: [`誤りのご指摘、掲載してほしい食材、協業のご相談は ${CONTACT_EMAIL} までご連絡ください。ご指摘は出典を確認のうえ反映します。`] },
      ],
    },
    es: {
      title: 'Sobre el sitio',
      description: 'Guía de Conservación de Alimentos es una base de datos multilingüe y gratuita sobre cuánto duran los alimentos en despensa, nevera y congelador.',
      sections: [
        { body: ['Guía de Conservación de Alimentos es una referencia gratuita y sin registro sobre cuánto duran los alimentos. Escribe un alimento y verás cuánto aguanta en la despensa, la nevera y el congelador, además de cómo conservarlo bien.', 'El sitio se publica en chino tradicional, inglés, japonés y español. Cada idioma se redacta para sus propios lectores, no es traducción automática.'] },
        { heading: 'Por qué existe este sitio', body: ['El Programa de las Naciones Unidas para el Medio Ambiente calcula que cada año se desperdician unos mil millones de comidas en hogares, comercios y hostelería. Buena parte se tira simplemente porque nadie sabía si todavía estaba en buen estado.', 'En internet abundan los consejos de conservación, pero muchas veces sin fuente y contradictorios entre sí. Queríamos lo contrario: que cada dato se pueda rastrear hasta una fuente oficial y que los cuatro idiomas sigan el mismo criterio.'] },
        { heading: 'De dónde salen los datos', body: ['Los plazos de conservación parten del conjunto de datos FoodKeeper del Servicio de Inocuidad e Inspección de los Alimentos del USDA, que es de dominio público. Los principios de seguridad siguen las guías publicadas por la FDA, los CDC, la Organización Mundial de la Salud, la FSA británica y la AESAN española, entre otras.', 'Para alimentos habituales en Asia o en el mundo hispanohablante que no figuran en FoodKeeper, buscamos guías de autoridades locales, servicios de extensión universitaria o literatura académica, y citamos la fuente en la ficha del alimento. El método completo está en la página de Fuentes y método.'] },
        { heading: 'Lo que no es', body: ['Este sitio ofrece información general de conservación y seguridad alimentaria. No es consejo médico ni sustituye tu propio criterio. Los plazos indican calidad óptima, no una garantía de inocuidad. Si un alimento huele mal, cambia de color, tiene moho o el envase está hinchado, tíralo.'] },
        { heading: 'Contacto', body: [`¿Has visto un error, quieres que añadamos un alimento o tienes una propuesta? Escribe a ${CONTACT_EMAIL}. Verificamos las correcciones con las fuentes y las aplicamos.`] },
      ],
    },
  },

  methodology: {
    zh: {
      title: '資料來源與方法',
      description: '本站每一個保存期限的出處、轉換流程、類比推估政策、內部查核機制與已知限制，全部公開說明。',
      sections: [
        { body: ['這一頁的目的不是宣稱本站正確，而是讓你有辦法自己檢查。以下說明資料從哪裡來、怎麼處理、哪些數字是推估的、我們用什麼方式抓自己的錯，以及哪些事情這份資料做不到。', '本站目前收錄 1,051 種食材。其中 704 種來自美國農業部的 FoodKeeper 資料集，347 種是我們自行查證後新增的。'] },

        { heading: '主幹：USDA FSIS FoodKeeper 資料集', body: ['保存期限的主幹是美國農業部食品安全檢驗局（USDA FSIS）發布的 FoodKeeper 資料集。這份資料由 USDA 與康乃爾大學食品科學系、美國食品行銷協會（FMI）共同編製，公開於 data.gov，屬於美國政府著作（U.S. Government Work），為公眾領域資料，可自由重製與改作。', '我們使用的版本是 FMA-Data-v128，經轉換後得到 661 筆記錄。每筆包含常溫、冷藏、冷凍三種環境的期限，並區分「一般期限」「自購買日起」「開封後」「解凍後」四種計算基準，同時保留原始資料附帶的保存提示。其中少數涵蓋範圍過寬的品項（例如把好幾種不同的乳酪合併成一筆），我們拆成更細的條目，共拆出 65 筆並取代原本的 22 筆，因此源自 FoodKeeper 的條目最終為 704 種。'] },

        { heading: '轉換是可重現的', body: ['轉換由 scripts/convert-foodkeeper.js 完成。這支程式沒有任何隨機或依賴時間的成分：分類對照、slug 產生規則、欄位對應與輸出順序全部寫死在程式裡。', '也就是說，任何人取得公開來源的原始 JSON，執行同一支程式，會得到與本站 src/data/base/foodkeeper.json 位元組完全相同的檔案。這一點已於今日重新驗證。我們這樣做的理由很單純：如果你懷疑我們動過 USDA 的數字，你不需要相信我們的說法，你可以自己跑一次。'] },

        { heading: 'FoodKeeper 沒有收錄的食材', body: ['FoodKeeper 以美國飲食為前提，缺少大量亞洲、拉丁美洲與伊比利地區的常見食材。這 347 種食材我們逐一查證，取材優先順序為：各國食品安全主管機關 → 大學推廣單位與農政單位 → 同行審查的採後生理與食品科學文獻 → 具公信力的產業或標準機構。實際引用的來源以香港食物安全中心、俄亥俄州立大學推廣中心、美國國家家庭食品保存中心、新墨西哥州立大學推廣中心、夏威夷大學 CTAHR、美國 FDA、台灣農業部與食藥署、日本農林水產省與厚生労働省、加拿大衛生部、西班牙 AESAN 為主。', '我們對這些來源設了兩條硬規則。第一，每一個引用的網址都必須實際取得過內容，不能只憑搜尋結果的摘要。第二，該頁必須真的寫出那個數字——如果一份資料只說「應冷藏」而沒有給天數，它就不能拿來當天數的出處。', '因此，有些在網路上流傳很廣的數字，我們選擇不採用，因為回到可取得的原始出處時，那個數字並不存在。少一個數字，比多一個查不到出處的數字好。'] },

        { heading: '類比推估政策', body: ['這一條我們公開講清楚，因為它影響的範圍不小。有些食材，任何主管機關都沒有發布過保存期限。遇到這種情況，我們不會編造，也不會硬掛一個看起來像官方的連結；我們採用性質最接近的食材的數字，並在該食材頁面明白標示這是類比推估，同時寫出類比的對象是什麼，以及為什麼選它（含水量、pH、脂肪含量、加工方式或結構相近）。', '本站約有 250 種食材的數字屬於這一類。我們認為，一位食品安全專業人員看到「這個數字是從某某食材類推而來，理由如下」，會比看到一個查不到出處的精確天數更能作出判斷。這一段不打算寫得比較好看。'] },

        { heading: '有規則但沒有數字時', body: ['另一種常見情況是，來源給了明確的保存規則，卻沒有給時間。例如某份官方指引要求某種發酵製品「全程冷藏」，但沒有寫可放幾天。', '這種情況我們照登規則，不補數字。食材頁面上會出現「應冷藏保存」這樣的敘述，而對應的期限欄位留白。空白代表沒有可靠來源，不代表可以無限期存放。'] },

        { heading: '內部交叉檢查', body: ['資料進入網站之前與之後，會通過幾道自動檢查。這些檢查只回報問題，不會自動修改內容——每一個發現都需要人去判斷哪一邊才是對的。'], bullets: [
          'scripts/validate-extra.js 與 scripts/validate-content.js：檢查資料結構與文章欄位是否符合規格，四種語言是否齊備。',
          'scripts/validate-guides.js：檢查指南文章的結構與內部連結目標是否存在。',
          'scripts/check-links.js：檢查站內連結與來源連結的格式與可解析性。',
          'scripts/qa-pages.js：建置後對產生的頁面做一次爬取，檢查標題長度、meta description 長度、是否重複，以及基本的 SEO 與可用性項目。',
          'scripts/audit-data.js：交叉比對文章內文與同一頁的保存表格。如果文章寫「大約可放五天」而表格只允許三天，它會標記出來。除此之外也會標記不合理的排序（例如常溫比冷藏還長）與數量級異常（例如生鮮肉品的冷藏期限以月計）。',
        ] },

        { heading: '各國標準不一致時', body: ['各國主管機關的建議並不完全一致，我們不會只挑一個講。例如冷藏溫度，美國 FDA 建議 4°C 以下，台灣食藥署慣用 7°C 以下，英國 FSA 給 0 至 5°C，日本食品衛生相關法規對「冷蔵」的定義是 10°C 以下。這類差異我們會在相關頁面直接寫出來，並在各語言版本中採用該地讀者實際會遇到的說法。'] },

        { heading: '已知限制', body: ['以下幾點請務必理解，否則很容易把這份資料用錯。'], bullets: [
          '除少數例外，期限指的是「最佳品質」的參考範圍，不是安全保證。反過來說，冷藏的生鮮肉品、海鮮與熟食，期限同時具有安全意義，不應延長。',
          '資料以家庭儲存情境為前提，假設冷藏維持在 4°C 以下、冷凍維持在 −18°C。頻繁開關冰箱、塞太滿、停電，或購買後在車上放了兩小時，都會縮短實際可保存的時間。這些條件我們無從得知。',
          '商業冷鏈的數字不等於家庭數字。文獻中的採後保存期限通常來自控溫、控濕、有時控氣的專業倉儲環境，直接套到家用冰箱會高估。我們在採用這類數字時會下修並說明理由，但這仍是判斷，不是量測。',
          '不同國家的加工方式、包裝與法規也會造成差異。蛋是否經過清洗會直接影響是否需要冷藏；同一個名字的發酵品，做法可能完全不同。',
          '本站提供一般性的保存與食品安全資訊，不是醫療建議，也不能取代你自己的判斷與當地主管機關的規定。',
        ] },

        { heading: '更新與勘誤', body: ['USDA 更新 FoodKeeper 資料集時，我們會重新匯入並比對差異。內容頁面若有修正，會更新頁面上的日期。', `如果你發現與官方資料不符之處，請寄信到 ${CONTACT_EMAIL}，附上你認為正確的來源連結，以及該頁面實際寫出那個數字的段落。我們會回到原始出處核對後才修改；如果來源查不到該數字，我們會回覆說明為什麼沒有採用。指正一律歡迎，包括指出我們的類比選得不好。`] },
      ],
    },
    en: {
      title: 'Sources & method',
      description: 'Where every storage time comes from, how the conversion is reproduced, our analogue policy stated openly, the internal checks we run, and the known limitations.',
      sections: [
        { body: ['The point of this page is not to assert that the site is correct. It is to give you enough detail to check. Below: where the data comes from, how it is processed, which numbers are estimates, how we catch our own mistakes, and what this dataset cannot do.', 'The site currently publishes 1,051 foods. 704 derive from the USDA FoodKeeper dataset; 347 were researched and added by us.'] },

        { heading: 'The backbone: the USDA FSIS FoodKeeper dataset', body: ['Storage times are built on the FoodKeeper dataset published by the USDA Food Safety and Inspection Service. It was developed by the USDA with Cornell University\'s Department of Food Science and the Food Marketing Institute, is published on data.gov, and is in the public domain as a U.S. Government Work, so it may be reused and adapted freely.', 'We use version FMA-Data-v128, which converts to 661 records. Each carries pantry, refrigerator and freezer timelines split into general, from date of purchase, after opening and after thawing, along with the storage tips the original dataset attaches to them. A small number of entries cover too broad a range to be useful on a single page — several distinct cheeses collapsed into one row, for example — so we split those into finer entries: 65 new records replacing 22 originals, which brings the FoodKeeper-derived total to 704.'] },

        { heading: 'The conversion is reproducible', body: ['The conversion is done by scripts/convert-foodkeeper.js. Nothing in it is random or time-dependent: the category mapping, the slug rules, the field mapping and the output ordering are all fixed in the script.', 'The consequence is that anyone who obtains the raw JSON from the public source and runs that script gets a byte-identical copy of our src/data/base/foodkeeper.json. That was re-verified today. The reason for building it this way is simple: if you suspect we have adjusted the USDA\'s numbers, you do not have to take our word for it. You can run it yourself.'] },

        { heading: 'Foods FoodKeeper does not cover', body: ['FoodKeeper reflects an American diet and omits a great deal of what is normal in Asian, Latin American and Iberian kitchens. Those 347 foods were researched individually, in this order of preference: national food safety agencies, then university extension services and agriculture ministries, then peer-reviewed postharvest and food-science literature, then established standards or industry bodies. In practice the sources actually cited are dominated by the Hong Kong Centre for Food Safety, Ohio State University Extension, the National Center for Home Food Preservation, New Mexico State University Extension, the University of Hawai\'i CTAHR, the US FDA, Taiwan\'s Ministry of Agriculture and TFDA, Japan\'s MAFF and MHLW, Health Canada and Spain\'s AESAN.', 'Two hard rules govern that research. First, every URL cited was actually retrieved — never a figure taken from a search-result snippet. Second, the retrieved page had to state the figure. A document that says a product "must be refrigerated" without giving a number cannot be cited as the source of a number.', 'As a result there are figures that circulate widely online which we declined to publish, because going back to the retrievable source showed the number was not there. One fewer number is better than one more number nobody can check.'] },

        { heading: 'The analogue policy, stated openly', body: ['We are explicit about this one because it covers a meaningful share of the site. For some foods no authority anywhere publishes a storage time. When that happens we do not invent one, and we do not attach an official-looking link that does not actually support it. We use the number for the closest comparable food, say on the page that this is what we have done, and name both the analogue and the reason for choosing it — similar water activity, pH, fat content, structure or processing.', 'Roughly 250 of the site\'s foods carry a number of this kind. Our view is that a food safety professional reading "this figure is carried over from X, for the following reason" is better served than by a precise-looking number with a citation that does not check out. We are not going to dress this section up.'] },

        { heading: 'When a source gives a rule but no duration', body: ['The other common case is a source that states a clear storage rule and no time at all — an official guidance document requiring that a fermented product be kept refrigerated throughout, without saying for how many days.', 'We publish the rule and no number. The food page will say that the item must be kept refrigerated, and the corresponding timeline field stays empty. Empty means no reliable source, not indefinite storage.'] },

        { heading: 'Internal cross-checks', body: ['Data passes several automated checks before and after it reaches the site. They report; they never silently fix. Every finding needs a person to decide which side of the contradiction is right.'], bullets: [
          'scripts/validate-extra.js and scripts/validate-content.js — schema validation for the data records and article fields, and a check that all four languages are present.',
          'scripts/validate-guides.js — structure of the guide articles and existence of every internal link target.',
          'scripts/check-links.js — format and resolvability of internal links and source links.',
          'scripts/qa-pages.js — a crawl of the built pages checking title length, meta description length, duplicates, and basic SEO and usability items.',
          'scripts/audit-data.js — cross-checks the prose of an article against the storage table on the same page. If the article says "keeps about five days" while the table allows three, it is flagged. It also flags impossible orderings, such as a perishable that supposedly keeps longer on the counter than in the fridge, and implausible magnitudes, such as fresh meat with a refrigerator life in months.',
        ] },

        { heading: 'Where national guidance differs', body: ['National authorities do not fully agree, and we do not quietly pick one. Refrigeration is the clearest case: the US FDA recommends 4 °C (40 °F) or below, Taiwan\'s TFDA commonly cites 7 °C, the UK FSA gives 0–5 °C, and Japanese food hygiene rules define 冷蔵 as 10 °C or below. We state such differences on the relevant pages and use, in each language, the framing that reader will actually encounter.'] },

        { heading: 'Known limitations', body: ['These matter. Without them it is easy to use this data for something it cannot support.'], bullets: [
          'With few exceptions the times indicate best quality, not a safety guarantee. The exception runs the other way for refrigerated raw meat, seafood and prepared dishes, where the timeline does carry a safety meaning and should not be stretched.',
          'The figures assume home storage with a refrigerator at or below 4 °C and a freezer at −18 °C. Frequent door opening, an overpacked shelf, a power cut, or two hours in a warm car after shopping all shorten the real figure, and we have no way of knowing about any of them.',
          'Commercial cold-chain figures are not home figures. Postharvest storage lives in the literature usually come from temperature-, humidity- and sometimes atmosphere-controlled facilities. Applying them directly to a domestic fridge overstates them. Where we use such a figure we shorten it and say why, but that remains a judgement, not a measurement.',
          'Processing, packaging and regulation differ by country. Whether eggs are washed determines whether they need refrigerating at all; two fermented products sharing a name may be made quite differently.',
          'This site provides general storage and food safety information. It is not medical advice, and it does not replace your own judgement or the rules of your local authority.',
        ] },

        { heading: 'Updates and corrections', body: ['When the USDA revises FoodKeeper we re-import the dataset and diff it against ours. Pages that change carry an updated date.', `If you find something that contradicts official guidance, email ${CONTACT_EMAIL} with a link to the source you believe is correct and, ideally, the passage where it actually states the figure. We go back to the original source and check before changing anything; if the source turns out not to contain the number, we will reply explaining why we did not use it. Corrections are always welcome, including the argument that we chose a poor analogue.`] },
      ],
    },
    ja: {
      title: '出典と作成方法',
      description: '保存期間の出どころ、変換の再現性、類推推定の方針、内部チェックの仕組み、そして既知の限界をすべて公開しています。',
      sections: [
        { body: ['このページの目的は、本サイトが正しいと主張することではありません。あなたが自分で確かめられるだけの材料を出すことです。データがどこから来て、どう処理され、どの数字が推定で、どうやって自分の誤りを見つけ、このデータに何ができないのかを以下に書きます。', '現在、本サイトは 1,051 品目を掲載しています。うち 704 品目は米国農務省の FoodKeeper データセットに由来し、347 品目は独自に調査して追加したものです。'] },

        { heading: '土台：USDA FSIS の FoodKeeper データセット', body: ['保存期間の土台は、米国農務省食品安全検査局（USDA FSIS）が公開する FoodKeeper データセットです。USDA、コーネル大学食品科学科、米国食品マーケティング協会（FMI）が共同で作成し、data.gov で公開されている米国政府著作物（パブリックドメイン）であり、自由に再利用・改変できます。', '使用しているのは FMA-Data-v128 で、変換すると 661 件になります。各件に常温・冷蔵・冷凍の期間があり、「目安」「購入日から」「開封後」「解凍後」の四つの基準に分かれ、元データが付している保存のヒントもそのまま保持しています。ごく一部、一件にまとめられた範囲が広すぎる項目（性質の異なる複数のチーズが一行になっているなど）は細かい項目に分割しました。65 件を追加して 22 件を置き換えており、FoodKeeper 由来の最終的な品目数は 704 になります。'] },

        { heading: '変換は再現できる', body: ['変換は scripts/convert-foodkeeper.js が行います。このスクリプトには乱数も時刻依存の処理もありません。分類の対応表、slug の生成規則、項目の対応、出力の順序はすべてコードに固定されています。', 'したがって、公開元から生の JSON を入手して同じスクリプトを実行すれば、本サイトの src/data/base/foodkeeper.json とバイト単位で同一のファイルが得られます。この点は本日あらためて検証しました。こうしている理由は単純です。USDA の数字に手を加えたのではないかと疑うなら、こちらの説明を信じる必要はありません。ご自身で実行して確かめられます。'] },

        { heading: 'FoodKeeper にない食材', body: ['FoodKeeper は米国の食生活を前提としており、アジア、ラテンアメリカ、イベリア半島の台所で当たり前のものが大量に抜けています。この 347 品目は一件ずつ調べました。優先順位は、各国の食品安全機関 → 大学の普及部門と農政官庁 → 査読を経た収穫後生理学・食品科学の文献 → 定評ある標準化機関や業界団体、の順です。実際に引用している出典は、香港食物安全中心、オハイオ州立大学エクステンション、米国国立家庭食品保存センター、ニューメキシコ州立大学エクステンション、ハワイ大学 CTAHR、米国 FDA、台湾の農業部と食品薬物管理署、日本の農林水産省と厚生労働省、カナダ保健省、スペイン AESAN が中心です。', 'この調査には二つの厳しい規則を課しています。第一に、引用したすべての URL は実際に取得したものであること。検索結果の抜粋から数字を取ることはしません。第二に、取得したページにその数字が実際に書かれていること。「要冷蔵」とだけ書いて日数を示していない資料は、日数の出典にはできません。', 'その結果、ネット上で広く流通している数字のいくつかは採用しませんでした。取得できる一次資料に戻ると、その数字がどこにも書かれていなかったからです。数字がひとつ少ないほうが、誰も確かめられない数字がひとつ多いよりましだと考えています。'] },

        { heading: '類推推定の方針（明示）', body: ['この項目は隠さずに書きます。対象がそれなりの数にのぼるからです。食材によっては、どの当局も保存期間を公表していません。その場合、私たちは数字を創作しませんし、実際には裏づけにならない「official に見えるリンク」を貼ることもしません。性質が最も近い食材の数字を用い、そのページに類推であることを明記し、何を類推の相手にしたか、なぜそれを選んだか（水分活性、pH、脂質含量、構造、加工法が近いなど）を書きます。', '本サイトの約 250 品目がこの種の数字を持っています。食品安全の専門家にとっては、「この数字は◯◯から類推した、理由はこうだ」と書いてあるほうが、裏の取れない正確そうな日数よりも判断しやすいはずだ、というのが私たちの考えです。ここを見栄えよく書くつもりはありません。'] },

        { heading: '規則はあるが期間がない場合', body: ['もうひとつよくあるのは、明確な保存の規則を示しながら期間をまったく書いていない資料です。ある発酵製品について「全工程で冷蔵すること」とだけ定め、何日もつかは書かれていない、というような場合です。', 'その場合は規則をそのまま載せ、数字は補いません。食材ページには「冷蔵が必要」と書かれ、対応する期間の欄は空白のままになります。空白は信頼できる出典がないという意味であって、無期限に保存できるという意味ではありません。'] },

        { heading: '内部の相互チェック', body: ['データはサイトに載る前後で、いくつかの自動チェックを通ります。これらは報告するだけで、黙って修正することはありません。どちらが正しいかは、必ず人が判断します。'], bullets: [
          'scripts/validate-extra.js と scripts/validate-content.js — データと記事のスキーマ検証、および四言語がそろっているかの確認。',
          'scripts/validate-guides.js — ガイド記事の構造と、内部リンク先が実在するかの確認。',
          'scripts/check-links.js — 内部リンクと出典リンクの形式および解決可能性の確認。',
          'scripts/qa-pages.js — ビルド後のページを巡回し、タイトルの長さ、meta description の長さ、重複、基本的な SEO とユーザビリティの項目を確認。',
          'scripts/audit-data.js — 記事本文と同じページの保存期間表を突き合わせます。本文に「五日ほどもつ」とあるのに表が三日しか認めていなければ、そこを指摘します。常温のほうが冷蔵より長いといったあり得ない順序や、生鮮肉の冷蔵期間が月単位になっているような桁違いの値も指摘します。',
        ] },

        { heading: '国によって基準が違う場合', body: ['各国当局の助言は完全には一致しません。どれかを黙って採用することはしません。冷蔵温度が分かりやすい例で、米国 FDA は 4°C 以下、台湾 TFDA は 7°C 以下を慣用し、英国 FSA は 0〜5°C、日本の食品衛生関係法令は「冷蔵」を 10°C 以下と定義しています。こうした違いは該当ページに明記し、各言語版ではその読者が実際に目にする言い方を採ります。'] },

        { heading: '既知の限界', body: ['ここは重要です。これを踏まえないと、このデータを支えられない用途に使ってしまいます。'], bullets: [
          '一部の例外を除き、期間は「おいしく食べられる目安」であって安全の保証ではありません。逆の例外もあります。冷蔵の生肉、魚介、調理済み食品では期間そのものが安全上の意味を持ち、延ばすべきではありません。',
          'データは家庭での保存を前提とし、冷蔵は 4°C 以下、冷凍は −18°C を想定しています。扉の開閉が多い、詰め込みすぎ、停電、買い物のあと二時間車内に置いた——いずれも実際の期間を短くしますが、私たちには知りようがありません。',
          '商業的なコールドチェーンの数字は家庭の数字ではありません。文献にある収穫後の保存期間は、たいてい温度・湿度、ときには気相まで制御された施設のものです。家庭用の冷蔵庫にそのまま当てはめると過大評価になります。こうした数字を使う場合は短めに調整し理由を書きますが、それは測定ではなく判断です。',
          '加工、包装、法規制は国によって異なります。卵を洗浄しているかどうかで冷蔵の要否が変わりますし、同じ名前の発酵食品でも製法がまったく違うことがあります。',
          '本サイトは一般的な保存と食品安全の情報を提供します。医療上の助言ではなく、あなた自身の判断やお住まいの地域の規定に取って代わるものでもありません。',
        ] },

        { heading: '更新と訂正', body: ['USDA が FoodKeeper を改訂した際は、データを取り込み直し、差分を確認します。内容が変わったページには更新日を表示します。', `公的な情報と食い違う点を見つけた場合は、正しいと思われる出典のリンクと、できればその数字が実際に書かれている箇所を添えて ${CONTACT_EMAIL} までご連絡ください。必ず一次資料に戻って確認してから修正します。出典にその数字が見当たらない場合は、採用しなかった理由をご返信します。ご指摘はいつでも歓迎します。類推の選び方が悪いというご指摘も含めてです。`] },
      ],
    },
    es: {
      title: 'Fuentes y método',
      description: 'De dónde sale cada plazo, cómo se reproduce la conversión, nuestra política de analogías declarada abiertamente, las comprobaciones internas y las limitaciones.',
      sections: [
        { body: ['El objetivo de esta página no es afirmar que el sitio acierta. Es darle material suficiente para comprobarlo usted. A continuación: de dónde salen los datos, cómo se procesan, qué cifras son estimaciones, cómo detectamos nuestros propios errores y qué cosas este conjunto de datos no puede hacer.', 'El sitio publica actualmente 1.051 alimentos. 704 proceden del conjunto de datos FoodKeeper del USDA; 347 los investigamos y añadimos nosotros.'] },

        { heading: 'La columna vertebral: el conjunto de datos FoodKeeper del USDA FSIS', body: ['Los plazos de conservación parten del conjunto de datos FoodKeeper, publicado por el Servicio de Inocuidad e Inspección de los Alimentos del USDA. Lo desarrollaron el USDA, el Departamento de Ciencia de los Alimentos de la Universidad de Cornell y el Food Marketing Institute; está publicado en data.gov y es de dominio público como obra del Gobierno de EE. UU., por lo que puede reutilizarse y adaptarse libremente.', 'Usamos la versión FMA-Data-v128, que al convertirse da 661 registros. Cada uno incluye plazos de despensa, nevera y congelador divididos en general, desde la compra, una vez abierto y tras descongelar, junto con los consejos de conservación que el conjunto original les asocia. Unas pocas entradas abarcan un rango demasiado amplio para una sola ficha —varios quesos distintos reunidos en una fila, por ejemplo—, así que las dividimos en entradas más finas: 65 registros nuevos que sustituyen a 22 originales, con lo que el total derivado de FoodKeeper queda en 704.'] },

        { heading: 'La conversión es reproducible', body: ['La conversión la hace scripts/convert-foodkeeper.js. No hay en él nada aleatorio ni dependiente de la fecha: la correspondencia de categorías, las reglas de slug, la asignación de campos y el orden de salida están fijados en el propio código.', 'La consecuencia es que cualquiera que obtenga el JSON original de la fuente pública y ejecute ese script obtiene una copia byte a byte idéntica de nuestro src/data/base/foodkeeper.json. Se ha vuelto a verificar hoy. La razón de construirlo así es sencilla: si sospecha que hemos retocado las cifras del USDA, no tiene por qué creernos. Puede ejecutarlo usted.'] },

        { heading: 'Alimentos que FoodKeeper no cubre', body: ['FoodKeeper refleja una dieta estadounidense y deja fuera buena parte de lo que es normal en las cocinas asiáticas, latinoamericanas e ibéricas. Esos 347 alimentos se investigaron uno a uno, con este orden de preferencia: agencias nacionales de seguridad alimentaria, después servicios de extensión universitaria y ministerios de agricultura, después literatura poscosecha y de ciencia de los alimentos revisada por pares, y por último organismos de normalización o sectoriales acreditados. En la práctica, las fuentes efectivamente citadas están dominadas por el Centro de Seguridad Alimentaria de Hong Kong, la Extensión de la Universidad Estatal de Ohio, el National Center for Home Food Preservation, la Extensión de la Universidad Estatal de Nuevo México, el CTAHR de la Universidad de Hawái, la FDA estadounidense, el Ministerio de Agricultura y la TFDA de Taiwán, el MAFF y el MHLW japoneses, Salud Canadá y la AESAN.', 'Esa investigación se rige por dos reglas duras. Primera: toda URL citada se descargó de verdad; nunca una cifra tomada del extracto de un buscador. Segunda: la página descargada tenía que enunciar la cifra. Un documento que dice que un producto «debe conservarse refrigerado» sin dar un número no puede citarse como fuente de un número.', 'Por eso hay cifras que circulan mucho por internet y que hemos preferido no publicar: al volver a la fuente recuperable, el número no estaba allí. Es mejor un número menos que un número más que nadie puede comprobar.'] },

        { heading: 'La política de analogías, dicha con todas las letras', body: ['Sobre esto somos explícitos, porque afecta a una parte apreciable del sitio. Para algunos alimentos no hay ninguna autoridad en el mundo que publique un plazo. Cuando ocurre, no lo inventamos, ni colgamos un enlace de aspecto oficial que en realidad no lo respalda. Tomamos la cifra del alimento comparable más próximo, lo decimos en la ficha y nombramos tanto el análogo como el motivo de la elección: actividad de agua, pH, contenido graso, estructura o procesado similares.', 'Unos 250 alimentos del sitio llevan una cifra de este tipo. Nuestra opinión es que a un profesional de la seguridad alimentaria le sirve más leer «esta cifra se traslada desde X, por este motivo» que un número de aspecto preciso con una cita que no resiste la comprobación. No vamos a maquillar este apartado.'] },

        { heading: 'Cuando la fuente da una regla pero no un plazo', body: ['El otro caso frecuente es una fuente que enuncia una regla clara de conservación y ningún tiempo: una guía oficial que exige que un fermentado se mantenga refrigerado en todo momento, sin decir cuántos días aguanta.', 'Publicamos la regla y ningún número. La ficha dirá que el producto debe mantenerse refrigerado, y el campo del plazo correspondiente se queda vacío. Vacío significa que no hay fuente fiable, no que se pueda guardar indefinidamente.'] },

        { heading: 'Comprobaciones internas cruzadas', body: ['Los datos pasan varias comprobaciones automáticas antes y después de llegar al sitio. Informan; nunca corrigen en silencio. Cada hallazgo necesita que una persona decida qué lado de la contradicción tiene razón.'], bullets: [
          'scripts/validate-extra.js y scripts/validate-content.js — validación de esquema de los registros y de los campos de los artículos, y comprobación de que están los cuatro idiomas.',
          'scripts/validate-guides.js — estructura de las guías y existencia de todos los destinos de enlace interno.',
          'scripts/check-links.js — formato y resolubilidad de los enlaces internos y de los enlaces a fuentes.',
          'scripts/qa-pages.js — un rastreo de las páginas generadas que comprueba la longitud del título y de la meta descripción, los duplicados y elementos básicos de SEO y usabilidad.',
          'scripts/audit-data.js — coteja el texto del artículo con la tabla de conservación de la misma página. Si el artículo dice «aguanta unos cinco días» y la tabla solo permite tres, lo señala. También marca ordenaciones imposibles, como un perecedero que supuestamente dura más en la despensa que en la nevera, y magnitudes inverosímiles, como carne fresca con una vida en nevera medida en meses.',
        ] },

        { heading: 'Cuando las guías nacionales difieren', body: ['Las autoridades nacionales no coinciden del todo, y no elegimos una en silencio. La refrigeración es el caso más claro: la FDA estadounidense recomienda 4 °C o menos, la TFDA de Taiwán suele citar 7 °C, la FSA británica da 0-5 °C y la normativa japonesa define 冷蔵 como 10 °C o menos. Señalamos estas diferencias en las páginas correspondientes y usamos, en cada idioma, la formulación que ese lector se va a encontrar de verdad.'] },

        { heading: 'Limitaciones conocidas', body: ['Esto importa. Sin tenerlo presente es fácil usar estos datos para algo que no pueden sostener.'], bullets: [
          'Salvo excepciones, los plazos indican calidad óptima, no una garantía de inocuidad. La excepción va en sentido contrario para la carne cruda, el pescado y los platos preparados refrigerados: ahí el plazo sí tiene un sentido de seguridad y no conviene estirarlo.',
          'Las cifras suponen conservación doméstica con la nevera a 4 °C o menos y el congelador a −18 °C. Abrir mucho la puerta, un estante abarrotado, un corte de luz o dos horas en un coche caliente después de la compra acortan el plazo real, y no tenemos manera de saberlo.',
          'Las cifras de la cadena de frío comercial no son cifras domésticas. Las vidas poscosecha de la literatura suelen proceder de instalaciones con temperatura, humedad y a veces atmósfera controladas. Aplicarlas tal cual a una nevera de casa las sobreestima. Cuando usamos una cifra así, la acortamos y explicamos por qué, pero eso sigue siendo un juicio, no una medición.',
          'El procesado, el envasado y la normativa cambian según el país. Que los huevos estén lavados determina si necesitan refrigeración; dos fermentados que comparten nombre pueden elaborarse de forma muy distinta.',
          'Este sitio ofrece información general de conservación y seguridad alimentaria. No es consejo médico ni sustituye a su propio criterio ni a las normas de su autoridad local.',
        ] },

        { heading: 'Actualizaciones y correcciones', body: ['Cuando el USDA revisa FoodKeeper, volvemos a importar el conjunto de datos y comparamos las diferencias. Las páginas que cambian muestran una fecha de actualización.', `Si encuentra algo que contradiga las guías oficiales, escriba a ${CONTACT_EMAIL} con el enlace a la fuente que considere correcta y, a ser posible, el pasaje donde esa fuente enuncia la cifra. Volvemos al original y lo comprobamos antes de cambiar nada; si resulta que la fuente no contiene el número, le responderemos explicando por qué no lo usamos. Las correcciones son siempre bienvenidas, incluida la de que hemos elegido mal una analogía.`] },
      ],
    },
  },

  'food-safety': {
    zh: {
      title: '食品安全與危害',
      description: '依 HACCP 的生物性、化學性與物理性危害分類，說明食物保存為什麼會出問題、哪些保存錯誤真正危險，以及家庭能掌握的溫度與時間。',
      sections: [
        { body: ['食物在保存過程中變得危險，幾乎從來不是「放太久」這種抽象理由，而是某一種具體的危害在你沒注意的時候長大了。這一頁按照 HACCP 的分類，把這些危害一項一項講清楚：它是什麼、從哪裡來、哪些保存做法會養大它，以及你在家裡真正能做的是什麼。', '美國食品藥物管理局（FDA）把 HACCP 定義為「透過分析與控制生物性、化學性與物理性危害來處理食品安全的管理系統」，涵蓋範圍從原料生產一路到成品的消費。同樣的三分法用在家庭廚房一樣成立，只是能用的手段少得多——你手上真正有的，是溫度、時間、分隔與加熱這四件事。'] },

        { heading: '危害的三種分類', body: ['生物性危害是活的、或曾經是活的東西：細菌、寄生蟲、病毒、黴菌，以及它們留下的毒素。化學性危害包含食物本身就有的天然毒素、保存或清潔過程混進去的物質，以及對特定人來說等同毒物的過敏原。物理性危害則是不該出現在食物裡的硬物。', 'FDA 在 HACCP 應用指引中舉的例子相當直白：生物性列出腸道致病菌（如沙門氏菌、產志賀毒素大腸桿菌）與金黃色葡萄球菌；化學性列出黃麴毒素、抗生素與農藥殘留；物理性列出石頭、玻璃與金屬。家庭保存出問題的絕大多數落在第一類，但第二類的天然毒素一旦在特定食材上出事，後果往往更嚴重。'] },

        { heading: '生物性危害：致病細菌', body: ['以下每一項的常見食物與潛伏期，取自 FDA〈What You Need to Know About Foodborne Illnesses〉。潛伏期值得記，因為它幾乎是事後唯一能拿來回推「是哪一餐」的線索。'], bullets: [
          '沙門氏菌（Salmonella）：蛋、禽肉、肉類、未殺菌乳品或果汁、乳酪，以及受污染的生鮮蔬果。潛伏期 6 至 48 小時。',
          '曲狀桿菌（Campylobacter jejuni）：生的或未煮熟的禽肉、未殺菌乳品、受污染的水。潛伏期 2 至 5 天。',
          '腸道出血性大腸桿菌 O157:H7：未煮熟的牛肉（尤其絞肉）、未殺菌乳品與果汁、生鮮蔬果（如芽菜）與受污染的水。潛伏期 1 至 8 天。',
          '單核球增多性李斯特菌（Listeria monocytogenes）：未殺菌乳品、以生乳製作的軟質乳酪、即食熟食肉品、冰淇淋、生的或煙燻水產。FDA 特別點出，它「不像多數細菌，能在冷藏溫度下生長，而冷凍不會消滅或減少這種病原菌」。',
          '產氣莢膜梭菌（Clostridium perfringens）：肉類、禽肉、肉汁與醬汁、乾燥或預煮食品，以及經歷過時間或溫度不當的食物。潛伏期 8 至 16 小時。',
          '肉毒桿菌（Clostridium botulinum）：處理不當的罐頭，尤其是自家製的蔬菜罐頭、發酵魚，以及用鋁箔包著放涼的烤馬鈴薯。潛伏期 12 至 72 小時。',
          '仙人掌桿菌（Bacillus cereus）：肉類、燉煮菜餚、肉汁與香草醬。香港食物安全中心指出，其嘔吐型毒素「可耐受 126°C 加熱 90 分鐘」。',
          '金黃色葡萄球菌（Staphylococcus aureus）：未冷藏或冷藏不當的肉類、馬鈴薯沙拉與蛋沙拉、奶油餡點心。潛伏期 1 至 6 小時，是常見致病菌裡最短的。',
          '弧菌（Vibrio）：未煮熟或生食的水產，尤其是貝類。腸炎弧菌潛伏期 4 至 96 小時；創傷弧菌 1 至 7 天，牡蠣是最常被指認的來源。',
        ] },

        { heading: '感染型與毒素型：為什麼再加熱有時救不回來', body: ['這是家庭料理最該記住的一條區分。感染型是你吃進活菌，菌在腸道裡繁殖才發病；毒素型（中毒型）則是細菌在食物裡已經先把毒素做好了，你吃進去的是化學物質，菌本身死不死已經無關緊要。', '這條區分直接決定「重新加熱有沒有用」。沙門氏菌、曲狀桿菌、李斯特菌屬於感染型，徹底加熱（台灣食藥署的說法是食品中心溫度超過 70°C）確實救得回來。仙人掌桿菌的嘔吐型毒素與金黃色葡萄球菌的腸毒素則不行——香港食物安全中心說得很明白，這類毒素「在細菌繁殖過程中形成，無法藉由再加熱去除」。', '實務上的結論是：一鍋在室溫放了整個下午的炒飯或滷肉，再怎麼滾都不算安全了。你煮沸的是細菌，不是它已經留在鍋裡的毒素。'] },

        { heading: '寄生蟲與病毒', body: ['寄生蟲的代表是海獸胃線蟲（アニサキス，Anisakis）。日本農林水產省列出的常見宿主包括鯖魚、秋刀魚、竹筴魚、沙丁魚、比目魚、鰹魚與烏賊等海產，並指出「−20°C 冷凍 24 小時以上」或「加熱調理（中心溫度 60°C 一分鐘以上）」可以殺死牠，而「醋、鹽、醬油、山葵等調味料無法殺死牠」。這一句值得記住：醃漬不是殺蟲。', '弓形蟲（Toxoplasma gondii）主要來自生的或未煮熟的豬肉、羊肉與鹿肉。FDA 指出肉的中心溫度應達 71°C（160°F），並提醒處理過生肉的刀具、器皿與砧板同樣會傳播；懷孕者的風險特別高。', '病毒不會在食物裡繁殖，但也不需要——極少量就足以致病。諾羅病毒與 A 型肝炎病毒在 FDA 的整理中來源幾乎相同：生鮮蔬果、受污染的飲用水、經帶原調理者接觸後未再加熱的食物，以及來自污染水域的貝類。諾羅病毒潛伏期 12 至 48 小時，A 型肝炎平均 28 天。這一類危害靠冰箱擋不住，靠的是洗手與生熟分開。'] },

        { heading: '黴菌與黴菌毒素', body: ['看得見的黴只是問題的一部分。世界衛生組織指出「多數黴菌毒素化學性質穩定，能在食品加工過程中存活」，所以把發霉的部分挖掉再煮，並不會讓剩下的部分變安全。', 'FDA 說明黃麴毒素由特定的麴菌（Aspergillus）產生，最容易受影響的是花生、玉米、樹堅果（如巴西堅果、開心果）與部分小型穀物；棒麴毒素（patulin）則由青黴菌、麴菌與 Byssochlamys 產生，長在水果、穀物與乳酪上，最受關注的是蘋果汁——FDA 明講「殺菌無法去除棒麴毒素」。家庭端能做的只有源頭控制：一次買少一點、存放乾燥通風、看到黴就整份丟掉，不要只挖掉一角。'] },

        { heading: '化學性危害：食物本身的天然毒素', body: ['有些毒素不是外來污染，是食物本來就有。以下取自世界衛生組織〈食品中的天然毒素〉與香港食物安全中心。'], bullets: [
          '氰苷：WHO 指出木薯、高粱、核果類、竹筍與杏仁是特別重要的含氰苷食物。這類食材必須經過正確處理（削皮、浸泡、發酵、充分煮熟）才能食用，生食或處理不足會中毒。',
          '龍葵鹼等配醣生物鹼：WHO 指出馬鈴薯的芽、發苦的皮與變綠的部分含量最高，並建議存放在「陰暗、涼爽、乾燥」的地方以減少生成。發芽或變綠的部分應削除，苦味明顯就整顆丟掉。',
          '毒菇：WHO 明確指出「烹調或去皮都不會使毒素失活」。野外採集的菇類不要憑外觀判斷。',
          '組織胺（鯖魚毒）：香港食物安全中心指出鯖魚、沙丁魚、鮪魚與鯷魚等富含組胺酸的魚種，在溫度控制不當時，細菌酶會把組胺酸轉成組織胺；充分加熱可以殺死細菌並使酶失活，卻「無法破壞已生成的組織胺」。控制方式只有全程 4°C 以下的冷鏈，冷凍則在 −18°C 以下。',
          '米酵菌酸（邦克列酸）：香港食物安全中心指出它是唐菖蒲伯克氏菌椰毒亞型（Burkholderia gladioli pathovar cocovenenans）產生的耐熱毒素，細菌生長溫度為 30 至 37°C、產毒溫度為 22 至 30°C；近年案例涉及浸泡超過兩天的黑木耳，以及在室溫放置超過 24 小時的濕米麵製品。泡發菌菇要放冰箱，濕的粿條、河粉、米苔目要全程冷藏。',
          '水產生物毒素：WHO 指出貽貝、扇貝與牡蠣比魚類更容易含有這類毒素，而且它們「沒有味道也沒有氣味，加熱或冷凍都無法消除」。',
          '生豆類的凝集素：WHO 指出「僅 4 到 5 顆生的四季豆就足以引起嚴重腹痛、嘔吐與腹瀉」，處理方式是乾豆浸泡至少 12 小時，再劇烈煮沸至少 10 分鐘。低溫慢燉反而危險。',
        ] },

        { heading: '化學性危害：過敏原、清潔劑與容器', body: ['過敏原對絕大多數人無害，對特定的人卻是最直接的化學性危害。美國認定的九大過敏原為牛奶、蛋、魚、甲殼類、樹堅果、花生、小麥、大豆與芝麻。FDA 把「交叉接觸」定義為「過敏原在非預期的情況下被帶入產品中」，並指出成因包括共用設備、清潔不徹底，以及含過敏原的粉塵或氣霧。家裡的版本就是同一把刀、同一張砧板、同一個保鮮盒，以及冰箱上層沒蓋好的容器滴到下層。', '另外兩類容易被忽略：清潔劑與消毒水的殘留，以及容器本身。FDA 在 HACCP 指引中把農藥與抗生素殘留列為化學性危害的例子，同樣的邏輯適用於任何不該進到食物裡的化學品。實務做法是——清潔劑絕不分裝到食品容器裡，洗過的容器要沖乾淨晾乾，並且只用標示可接觸食品的容器盛裝食物，不要拿來路不明的塑膠桶、油漆桶或裝過非食品的瓶罐來存放。'] },

        { heading: '物理性危害', body: ['物理性危害是不該在食物裡的硬物。FDA 把它概分為銳利物體與噎嗆風險，可能造成「口腔損傷（如牙齒受損或口腔、咽喉撕裂）、消化道撕裂或穿孔，以及哽噎」，並在 HACCP 指引中舉出石頭、玻璃與金屬為例。在家庭保存的情境裡，最常見的來源是冰箱裡破掉的玻璃罐、開罐時掉入的金屬碎片、包裝的塑膠碎片與封口鐵絲、沒挑乾淨的骨頭與魚刺，以及被蟲鼠啃咬過的乾貨。', '處理方式沒有巧妙之處：玻璃容器破掉時，附近未包覆的食物一律丟棄，不要試圖挑出碎片；乾貨用密封容器存放，並定期檢查有無蟲蛀或齧咬痕跡。'] },

        { heading: '真正高風險的保存錯誤', body: ['以下每一項都不是「品質會變差」的層級，而是真的會讓人生病的層級。'], bullets: [
          '大批熟食慢慢放涼。這是產氣莢膜梭菌最典型的劇本：香港食物安全中心指出它的芽孢「不會被一般烹調溫度殺死」，烹調的熱反而活化芽孢發芽，同時殺光競爭菌；接著慢速冷卻「讓細菌有時間繁殖到很大的數量」。一大鍋滷肉、咖哩或肉汁在室溫慢慢降溫，就是在替它鋪路。做法是分裝成小份、用淺容器、必要時用冰水浴——香港食物安全中心給的界限是從 60°C 降到 20°C 要在兩小時內，再從 20°C 降到 4°C 要在四小時內。',
          '冰箱溫度高於 4°C。FDA 建議冷藏維持在 4°C（40°F）以下、冷凍 −18°C（0°F）以下，並強調多數冰箱的旋鈕不顯示實際溫度，應該另外放一支獨立的冰箱溫度計。台灣食藥署的慣用數字是冷藏低於 7°C，並把 7 至 60°C 稱為危險溫度帶；英國 FSA 給的區間是 0 至 5°C。差幾度不是小事：李斯特菌正是在冷藏溫度下仍能生長的那一種。',
          '生食與即食食品交叉污染。FDA 的「分開」原則要求生的肉類、禽肉、水產與蛋，在購物車、購物袋與冰箱裡就要與其他食物分開，而且熟食不可放回盛裝過生食、未經徹底清洗的容器或表面。西班牙 AESAN 的做法是把生鮮肉品與水產放在冰箱最下層，避免滴液污染下方的食物。',
          '在流理臺上解凍。FDA 只承認三種安全解凍方式：冷藏室、冷水，以及微波（微波解凍後必須立刻烹調）。放在室溫解凍時，外層早已進入危險溫度帶，中心卻還是硬的。英國 FSA 補充，完全解凍後應在 24 小時內烹調。',
          '完全解凍後又冰回冷凍庫。FDA 的判準很清楚：食物若「仍含有冰晶，或在 4°C（40°F）以下」，可以重新冷凍或直接烹調；已經完全解凍並回溫的則不行。英國 FSA 的說法是可以「煮熟之後再冷凍一次，但之後只能再加熱一次」。',
          '真空包裝與其他無氧環境。香港食物安全中心指出，真空與氣調包裝排除氧氣後，會抑制許多需氧的腐敗菌與病原菌，但這正是肉毒桿菌喜歡的條件，而且「部分菌株在低至 3°C 仍能生長並產生毒素」。換句話說，抽真空並不會自動延長冷藏期限；它改變的是風險的種類——腐敗的警訊被拿掉了，危險卻還在。家用真空機不是保存期限的許可證，仍應遵守製造商標示的儲存條件與期限。',
          '蒜頭或香草泡油放在室溫。俄亥俄州立大學推廣中心指出，「當香草、大蒜或番茄被放進油裡，植物材料上的芽孢就能在這種無氧的調味油混合物中產生毒素」，而肉毒桿菌毒素「看不到、聞不到、也嚐不出來」。美國國家家庭食品保存中心的規定很硬：蒜頭泡油應現做，冷藏在 4°C（40°F）以下且不超過 4 天；需要久放就冷凍。',
          '低酸性食物用水浴法自製罐頭。美國國家家庭食品保存中心指出，酸性食品的 pH 在 4.6 以下，低酸性食品高於 4.6；肉毒桿菌需要「潮濕的低酸性食物」「4 至 49°C（40 至 120°F）的溫度」與「低於 2% 的氧氣」才能生長，而密封的罐子正好同時滿足這三項。低酸性食品必須在 240 至 250°F（約 116 至 121°C）殺菌，只有以 10 至 15 PSIG 操作的壓力式殺菌罐達得到；用沸水殺菌罐要達到同樣效果需要 7 至 11 小時，並不實際。俄亥俄州立大學推廣中心建議自製的低酸性罐頭食用前先煮沸，海拔 1000 英尺以下煮 10 分鐘，其餘 20 分鐘。',
          '相信標示日期，而不看溫度歷程。英國政府的說明是：有效日期（use by）關乎安全，最佳賞味期限（best before）關乎品質，「在有效日期之後食用可能會讓你生病」。反過來也成立——日期沒到，不代表這盒東西沒有在運送途中或你的購物袋裡待過兩小時。FDA 的兩小時原則是：需冷藏的食物在室溫下不得超過 2 小時，氣溫高於 32°C（90°F）時縮短為 1 小時。',
          '停電後憑外觀判斷。FDA 給的數字是：門不打開的話，冷藏室大約可維持 4 小時，滿載的冷凍庫約 48 小時（半滿約 24 小時）。冷藏的易腐食品若在 4°C（40°F）以上超過 4 小時，應該丟棄。',
        ] },

        { heading: '溫度與時間：實際的數字', body: ['各國的數字不完全一致。我們把差異講明，而不是只挑一個講。'], bullets: [
          '危險溫度帶：台灣食藥署用 7 至 60°C，西班牙 AESAN 用 5 至 60°C。兩者的意思相同——這個區間裡致病菌繁殖得最快。',
          '冷藏：FDA 與加拿大衛生部為 4°C（40°F）以下，英國 FSA 為 0 至 5°C，台灣食藥署為 7°C 以下。歐盟法規下的 AESAN 對特定品項更嚴：絞肉 2°C 以下、內臟 3°C 以下、禽肉 4°C 以下、生鮮水產接近融冰溫度（0 至 4°C）。',
          '冷凍：FDA、加拿大衛生部與 AESAN 均為 −18°C（0°F）以下；英國 FSA 的說法是「大約 −18°C」。',
          '熱藏：香港食物安全中心與台灣食藥署均為 60°C 以上。',
          '加熱：台灣食藥署要求食品中心溫度超過 70°C；香港食物安全中心對剩食再加熱要求中心至少 75°C；FDA 對有弓形蟲風險的肉類給 71°C（160°F）。',
          '兩小時原則：FDA——需冷藏的食品在室溫下不超過 2 小時，氣溫高於 32°C（90°F）時為 1 小時。英國 FSA 的說法是煮好的食物在 1 至 2 小時內放進冰箱。',
        ] },

        { heading: '冷凍不等於殺菌', body: ['FDA 說「食物在冷凍庫裡可以無限期保持安全，只是品質與風味會受影響」。這句話常被誤讀成冷凍能殺菌。英國 FSA 講得更完整：冷凍庫是暫停鍵，「細菌並沒有被殺死，解凍時可能會恢復活性」。', '兩個例外值得記住：冷凍確實能殺死魚肉中的寄生蟲（日本農林水產省的條件是 −20°C 24 小時以上），但 FDA 提醒「冷凍不會殺死所有有害微生物」；而李斯特菌連冷凍都消滅不了。因此本站冷凍欄位的期限，除少數例外之外，講的是品質，不是安全界線。'] },

        { heading: 'HACCP 在家裡能用到什麼', body: ['HACCP 的七項原則出自 FDA 的應用指引：進行危害分析；決定重要管制點（CCP）；建立管制界限；建立監測程序；建立矯正措施；建立驗證程序；建立紀錄與文件程序。FDA 對重要管制點的定義是「可施加控制、且為預防或消除食品安全危害、或將其降至可接受程度所必需的步驟」，管制界限則是「在該管制點上必須加以控制的生物、化學或物理參數的最大值與／或最小值」。', '前五項在家庭廚房都有對應版本，後兩項（驗證與紀錄）基本上是產業做法。誠實一點說：家裡沒有第三方稽核，也不需要保存三年份的紀錄；把力氣放在前面五項就夠了。'], bullets: [
          '危害分析：買回來的東西裡，哪幾樣是生鮮肉品、水產、即食熟食或泡發的菌菇——這些就是你的高風險項目。',
          '重要管制點與管制界限：在家裡就是四件事——冷藏 4°C 以下、冷凍 −18°C 以下、室溫不超過 2 小時、加熱到中心 70°C 以上。世界衛生組織的「食品安全五要點」是同一套東西的口語版：保持清潔、生熟分開、徹底煮熟、在安全溫度下存放食物、使用安全的水與食材。日本厚生勞動省的三原則更短：不沾染、不增殖、殺滅。台灣食藥署的「五要」則是要洗手、要新鮮、要生熟食分開、要徹底加熱、要注意保存溫度。',
          '監測：一支冰箱溫度計。FDA 直說多數冰箱的旋鈕不顯示實際溫度，只有獨立溫度計才知道現在幾度。再加一支食品中心溫度計，你的監測就完整了。',
          '矯正措施：先想好溫度不對時要怎麼辦。停電超過 4 小時、冷藏室在 4°C 以上待了超過 4 小時，答案是丟棄，不是「先聞聞看」。',
        ] },

        { heading: '有疑慮就丟掉', body: ['本站列出的保存期限，多數指的是最佳品質，不是安全的絕對界線。但這一頁講的危害不同——肉毒桿菌毒素看不到也聞不到，組織胺與米酵菌酸耐熱，李斯特菌在冷藏下照樣生長。這些都不是感官能判斷的。', '所以判斷順序應該是：先看溫度歷程（它在幾度、待了多久），再看外觀與氣味，而不是反過來。真空包裝鼓起、罐頭膨罐、密封容器有異味或開封噴氣，一律直接丟棄，不要試吃。本頁為一般性食品安全資訊，不構成醫療建議。'] },

        { heading: '資料來源', body: ['本頁的每一項事實都對應到以下實際查閱過的官方文件。'], bullets: [
          '世界衛生組織〈Food safety〉fact sheet — https://www.who.int/news-room/fact-sheets/detail/food-safety',
          '世界衛生組織〈Natural toxins in food〉fact sheet — https://www.who.int/news-room/fact-sheets/detail/natural-toxins-in-food',
          '世界衛生組織《Five Keys to Safer Food Manual》 — https://www.who.int/publications/i/item/9789241594639',
          'FDA〈What You Need to Know About Foodborne Illnesses〉 — https://www.fda.gov/food/consumers/what-you-need-know-about-foodborne-illnesses',
          'FDA〈Refrigerator Thermometers: Cold Facts about Food Safety〉 — https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety',
          'FDA〈Safe Food Handling〉 — https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling',
          'FDA〈Listeria (Listeriosis)〉 — https://www.fda.gov/food/foodborne-pathogens/listeria-listeriosis',
          'FDA〈Selecting and Serving Fresh and Frozen Seafood Safely〉 — https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely',
          'FDA〈Toxoplasma (Food Safety for Moms-to-Be)〉 — https://www.fda.gov/food/people-risk-foodborne-illness/toxoplasma-food-safety-moms-be',
          'FDA〈Mycotoxins〉 — https://www.fda.gov/food/natural-toxins-food/mycotoxins',
          'FDA〈Food Allergies〉 — https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies',
          'FDA〈Food and Water Safety During Power Outages and Floods〉 — https://www.fda.gov/food/buy-store-serve-safe-food/food-and-water-safety-during-power-outages-and-floods',
          'FDA〈HACCP Principles & Application Guidelines〉 — https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/haccp-principles-application-guidelines',
          'FDA〈Physical Contaminants〉 — https://www.fda.gov/animal-veterinary/biological-chemical-and-physical-contaminants-animal-food/physical-contaminants',
          '美國國家家庭食品保存中心（NCHFP）〈Ensuring Safe Canned Foods〉 — https://nchfp.uga.edu/how/can/general-information/ensuring-safe-canned-foods/',
          '美國國家家庭食品保存中心（NCHFP）〈Freezing Garlic-in-Oil〉 — https://nchfp.uga.edu/how/freeze/vegetable/freezing-garlic-in-oil/',
          '俄亥俄州立大學推廣中心 HYG-5567〈Botulism: What You Don\'t See or Smell Can Still Hurt You〉 — https://ohioline.osu.edu/factsheet/HYG-5567-11',
          '香港食物安全中心〈Heat-stable Toxins from Bacillus cereus and Staphylococcus aureus〉 — https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_193_01.html',
          '香港食物安全中心〈Bacillus cereus in Processed Food〉 — https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_97_01.html',
          '香港食物安全中心〈Clostridium perfringens – A Threat to Food Safety〉 — https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_212_02.html',
          '香港食物安全中心〈Histamine in Fish and Fish Products〉 — https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_150_02.html',
          '香港食物安全中心〈Botulism and Vacuum Packed Food〉 — https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_46_01.html',
          '香港食物安全中心《食物安全焦點》第 98 期（邦克列酸） — https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsb_202403.html',
          '英國 FSA／GOV.UK〈How to chill, freeze and defrost food safely〉 — https://www.gov.uk/government/publications/how-to-chill-freeze-and-defrost-food-safely/how-to-chill-freeze-and-defrost-food-safely',
          'GOV.UK〈Understanding food labelling: best before and use-by dates〉 — https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates',
          '加拿大衛生部〈Safe food storage〉 — https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-food-storage.html',
          '衛生福利部食品藥物管理署〈食品中毒常見問與答〉 — https://www.fda.gov.tw/TC/sitecontent.aspx?sid=2572',
          '衛生福利部〈落實「五要」原則〉 — https://www.mohw.gov.tw/cp-16-27406-1.html',
          '日本農林水産省〈アニサキス〉 — https://www.maff.go.jp/j/syouan/seisaku/foodpoisoning/f_encyclopedia/anisakis.html',
          '日本厚生労働省〈食中毒〉 — https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/syokuchu/index.html',
          '西班牙 AESAN〈Higiene de los alimentos〉 — https://www.aesan.gob.es/seguridad-alimentaria/higiene-alimentos',
        ] },
      ],
    },
    en: {
      title: 'Food safety',
      description: 'What actually makes stored food dangerous, organised on the HACCP hazard classification, and which storage mistakes carry real risk rather than just lost quality.',
      sections: [
        { body: ['Food almost never becomes dangerous in storage for the vague reason that it was "kept too long". It becomes dangerous because one specific hazard grew while nobody was watching. This page works through those hazards using the HACCP classification: what each one is, where it comes from, which storage habits feed it, and what you can actually do about it at home.', 'The US Food and Drug Administration defines HACCP as "a management system in which food safety is addressed through the analysis and control of biological, chemical, and physical hazards from raw material production, procurement and handling, to manufacturing, distribution and consumption of the finished product." The same three-way split works in a home kitchen. You simply have fewer levers: temperature, time, separation and heat.'] },

        { heading: 'Three kinds of hazard', body: ['Biological hazards are things that are alive, or were: bacteria, parasites, viruses, moulds, and the toxins they leave behind. Chemical hazards cover toxins the food itself contains, substances introduced during storage or cleaning, and allergens, which for the person affected behave exactly like a poison. Physical hazards are hard objects that should not be in food at all.', 'The examples FDA gives in its HACCP guidance are plain enough: for biological hazards, "enteric pathogens (e.g., Salmonella, verotoxin-producing Escherichia coli)" and Staphylococcus aureus; for chemical, "aflatoxin, antibiotic or pesticide residues"; for physical, "stones, glass, metal". Almost everything that goes wrong in home storage falls in the first group, but when the second group goes wrong on a particular ingredient, the consequences tend to be worse.'] },

        { heading: 'Biological hazards: bacterial pathogens', body: ['The food sources and onset times below come from the FDA\'s summary in "What You Need to Know About Foodborne Illnesses". The onset time is worth knowing because it is usually the only clue you have afterwards for working out which meal was responsible.'], bullets: [
          'Salmonella — "Eggs, poultry, meat, unpasteurized milk or juice, cheese, contaminated raw fruits and vegetables". Onset 6 to 48 hours.',
          'Campylobacter jejuni — "Raw and undercooked poultry, unpasteurized milk, contaminated water". Onset 2 to 5 days.',
          'E. coli O157:H7 — "Undercooked beef (especially hamburger), unpasteurized milk and juice, raw fruits and vegetables (e.g. sprouts), and contaminated water". Onset 1 to 8 days.',
          'Listeria monocytogenes — unpasteurized milk, soft cheeses made from it, ready-to-eat deli meats, ice cream, raw or smoked fish. The FDA singles it out: "Unlike most bacteria, L. monocytogenes can grow at refrigeration temperatures and freezing will not eliminate or reduce the pathogen."',
          'Clostridium perfringens — "Meats, poultry, gravy, dried or precooked foods, time and/or temperature-abused foods". Onset 8 to 16 hours.',
          'Clostridium botulinum — "Improperly canned foods, especially home-canned vegetables, fermented fish, baked potatoes in aluminum foil". Onset 12 to 72 hours.',
          'Bacillus cereus — "Meats, stews, gravies, vanilla sauce". Hong Kong\'s Centre for Food Safety notes that its emetic toxin "can resist heating at 126°C for 90 minutes".',
          'Staphylococcus aureus — "Unrefrigerated or improperly refrigerated meats, potato and egg salads, cream pastries". Onset 1 to 6 hours, the shortest of the common pathogens.',
          'Vibrio — undercooked or raw seafood, especially shellfish. V. parahaemolyticus has an onset of 4 to 96 hours; V. vulnificus 1 to 7 days, with oysters the usual source.',
        ] },

        { heading: 'Infection versus intoxication, and why reheating sometimes fails', body: ['This is the single distinction most worth carrying into a home kitchen. In an infection you swallow live organisms and fall ill because they multiply in your gut. In an intoxication the bacteria have already manufactured a toxin in the food; what you swallow is a chemical, and whether the organism is still alive has stopped mattering.', 'The distinction decides whether reheating rescues the situation. Salmonella, Campylobacter and Listeria cause infections, and thorough cooking genuinely helps — Taiwan\'s Food and Drug Administration puts the target at a core temperature above 70 °C. The emetic toxin of Bacillus cereus and the enterotoxin of Staphylococcus aureus do not play along. Hong Kong\'s Centre for Food Safety states it flatly: these toxins "will be formed during multiplication of these bacteria, which cannot be eliminated by reheating".', 'The practical consequence: a pan of fried rice or braised meat that sat out all afternoon is not made safe by bringing it back to the boil. Boiling kills the bacteria; it does not touch the toxin they already left in the pan.'] },

        { heading: 'Parasites and viruses', body: ['The parasite most people meet is Anisakis. Japan\'s Ministry of Agriculture, Forestry and Fisheries lists mackerel, saury, horse mackerel, sardine, flounder, bonito and squid among the usual hosts, and states that freezing at −20 °C for 24 hours or more kills it, as does cooking to a core temperature of 60 °C for at least a minute. It also states plainly that vinegar, salt, soy sauce and wasabi do not kill it. Curing is not a parasite control.', 'Toxoplasma gondii comes mainly from raw or undercooked pork, lamb and venison. The FDA gives a target internal temperature of 71 °C (160 °F) and warns that contaminated knives, utensils and cutting boards spread it just as effectively. Risk in pregnancy is the reason the agency treats it separately at all.', 'Viruses do not multiply in food, and they do not need to — a very small dose is enough. The FDA lists near-identical sources for norovirus and hepatitis A: raw produce, contaminated drinking water, uncooked foods and cooked foods that are not reheated after contact with an infected food handler, and shellfish from contaminated waters. Norovirus has an onset of 12 to 48 hours; hepatitis A averages 28 days. A refrigerator does nothing against either. Handwashing and separation do.'] },

        { heading: 'Moulds and mycotoxins', body: ['Visible mould is only part of the problem. The World Health Organization states that "most mycotoxins are chemically stable and survive food processing", so cutting the mouldy part away and cooking the rest does not make the rest safe.', 'The FDA describes aflatoxins as "mycotoxins produced by certain Aspergillus molds", with peanuts, corn, tree nuts such as Brazil nuts and pistachios, and some small grains the most susceptible. Patulin is "produced by Penicillium, Aspergillus and Byssochylamys molds that grow on fruit, grains, and cheese", with apple juice the main concern — and the agency is explicit that "pasteurization won\'t get rid of patulin". At home the only real control is upstream: buy smaller quantities, store dry and ventilated, and discard the whole item when mould appears rather than trimming a corner off it.'] },

        { heading: 'Chemical hazards: toxins the food already contains', body: ['Some toxins are not contamination at all. They are part of the plant or the fish. The following are drawn from the WHO fact sheet on natural toxins in food and from Hong Kong\'s Centre for Food Safety.'], bullets: [
          'Cyanogenic glycosides — the WHO names "cassava, sorghum, stone fruits, bamboo roots and almonds" as especially important foods containing them. These need correct processing (peeling, soaking, fermenting, thorough cooking) before they are edible; eaten raw or under-processed they cause poisoning.',
          'Solanine and related glycoalkaloids — the WHO notes that "higher concentrations are found in potato sprouts and bitter-tasting peel and green parts", and recommends storing potatoes in "a dark, cool and dry place" to limit their formation. Cut away sprouts and green areas; discard the potato entirely if it tastes bitter.',
          'Poisonous mushrooms — the WHO is unambiguous: "cooking or peeling does not inactivate the toxins". Never identify foraged mushrooms by appearance alone.',
          'Histamine (scombrotoxin) — Hong Kong\'s Centre for Food Safety names mackerel, sardine, tuna and anchovy as species naturally high in histidine. Under poor temperature control, bacterial histidine decarboxylase converts it to histamine, and while heat "can kill histamine-producing bacteria and inactivate HDC enzymes", it "cannot destroy pre-formed histamine". The only control is an unbroken cold chain at or below 4 °C, or −18 °C frozen.',
          'Bongkrekic acid — the same agency describes it as "a heat-stable toxin produced by the bacterium Burkholderia gladioli pathovar cocovenenans", with growth between 30 °C and 37 °C and toxin production between 22 °C and 30 °C. Recent outbreaks involved black fungus soaked for over two days and wet rice noodle products held at room temperature for more than 24 hours. Soak dried fungus in the fridge, and keep fresh rice noodles refrigerated throughout.',
          'Aquatic biotoxins — the WHO notes that "shellfish such as mussels, scallops and oysters are more likely to contain these toxins than fish", and that "they have no taste or smell, and are not eliminated by cooking or freezing".',
          'Lectins in raw beans — the WHO states that "as few as 4 or 5 raw beans can cause severe stomachache, vomiting and diarrhoea", and that lectins "are destroyed when the dried beans are soaked for at least 12 hours and then boiled vigorously for at least 10 minutes". A long, low-temperature simmer is the dangerous option here, not the safe one.',
        ] },

        { heading: 'Chemical hazards: allergens, cleaning agents and the wrong container', body: ['Allergens are harmless to most people and the most immediate chemical hazard there is to the person affected. The nine major food allergens recognised in the US are "milk, eggs, fish, Crustacean shellfish, tree nuts, peanuts, wheat, soybeans, and sesame". The FDA defines cross-contact as "the inadvertent introduction of a major food allergen into a product", arising from shared equipment, ineffective cleaning, or dust and aerosols carrying an allergen. The domestic version is the same knife, the same board, the same reused container, and an uncovered dish on the top shelf dripping onto the one below.', 'Two more chemical routes get overlooked. The first is residue from detergents and sanitisers: never decant cleaning products into food containers, and rinse and dry anything that has held them. The second is the container itself. FDA\'s hazard analysis guidance lists pesticide and antibiotic residues as chemical hazards, and the same logic applies to anything migrating into food that was never meant to be there — so store food only in containers intended for food contact, not in buckets, drums or bottles that previously held something else.'] },

        { heading: 'Physical hazards', body: ['Physical hazards are foreign objects in food. The FDA classifies them broadly as "sharp objects, choking hazards", capable of causing "oral cavity damage (e.g., tooth damage or laceration of the mouth or throat), laceration or perforation of the gastrointestinal tract, and choking", and its HACCP guidance gives stones, glass and metal as examples. In home storage the usual sources are a jar broken in the fridge, metal shavings from a can opener, fragments of packaging and wire ties, bone and pin bones missed during preparation, and dry goods that pests have got into.', 'There is no clever handling here. If a glass container breaks, discard unwrapped food nearby rather than picking fragments out of it, and store dry goods in sealed containers that you check periodically for insect or rodent damage.'] },

        { heading: 'The storage mistakes that carry real risk', body: ['None of the following is a matter of quality. Each is a route to actual illness.'], bullets: [
          'Cooling a large batch of cooked food slowly. This is the classic Clostridium perfringens scenario. Hong Kong\'s Centre for Food Safety notes that its spores "are not destroyed by normal cooking temperature", that the heat of cooking activates their germination while killing off competing organisms, and that "slow cooling of cooked food allows time for the growing of bacteria to a large number". A stockpot of curry, stew or gravy cooling gently on the hob is exactly that scenario. Divide into small, shallow containers, use an ice bath if you need to, and work to the agency\'s limits: from 60 °C to 20 °C in two hours or less, then from 20 °C to 4 °C in four hours or less.',
          'A fridge running above 4 °C. The FDA recommends 40 °F (4 °C) or below for the refrigerator and 0 °F (−18 °C) for the freezer, and points out that "few refrigerator controls show actual temperatures", so a standalone appliance thermometer is the only way to know. Taiwan\'s TFDA works to below 7 °C and calls 7–60 °C the danger zone; the UK FSA says "your fridge should be between 0 and 5°C". A few degrees is not a rounding error — Listeria is precisely the organism that keeps growing at refrigeration temperature.',
          'Cross-contamination between raw and ready-to-eat food. The FDA\'s "separate" rule asks you to "separate raw meat, poultry, seafood, and eggs from other foods in your grocery shopping cart, grocery bags, and refrigerator", and never to place cooked food back onto a surface that held raw items unless it has been thoroughly washed. Spain\'s AESAN takes the same idea into the fridge itself: raw meat and fish on the bottom shelf, packaged, so that drip cannot reach anything below.',
          'Thawing on the counter. The FDA recognises three safe methods only: "in the refrigerator, in cold water, and in the microwave", with microwave-thawed food cooked immediately. Left on the worktop, the outside of the joint is deep into the danger zone long before the middle has softened. The UK FSA adds that fully defrosted food should be used within 24 hours.',
          'Refreezing after a full thaw. The FDA\'s test is specific: if food "still contains ice crystals or is 40° F or below, it is safe to refreeze or cook". Food that has thawed completely and warmed up is not. The FSA\'s version is that "you can freeze food again once cooked, but you\'ll only be able to reheat it once after that".',
          'Vacuum packing and other anaerobic environments. Hong Kong\'s Centre for Food Safety explains that "by excluding or greatly reducing oxygen levels, these packaging methods can prevent the growth of many spoilage microorganisms and pathogens that require oxygen to grow" — which is exactly the condition Clostridium botulinum prefers, and "some strains can grow and produce toxins at temperature as low as 3°C". Vacuum sealing therefore does not by itself extend a refrigerated shelf life. It changes the kind of risk: the spoilage warning is removed while the hazard is not. A domestic vacuum sealer is not a licence to keep food longer, and the manufacturer\'s stated storage conditions still apply.',
          'Garlic or herbs in oil at room temperature. Ohio State University Extension puts it directly: "when herbs, garlic, or tomatoes are placed in oils, the spores on the plant material can produce the toxin in the anaerobic mixture of flavored oils", and "botulinum toxin cannot be seen, smelled, or tasted". The National Center for Home Food Preservation is strict about the remedy: garlic-in-oil "should be made fresh and stored in the refrigerator at 40°F or lower for no more than 4 days", and frozen if you want to keep it longer.',
          'Home canning low-acid food without pressure. The NCHFP draws the line at pH: "acid foods have a pH of 4.6 or lower", low-acid foods above it. C. botulinum needs a moist, low-acid food, a temperature between 40 °F and 120 °F and less than 2 percent oxygen — a sealed jar of vegetables supplies all three at once. Low-acid foods must therefore be processed "at temperatures of 240° to 250°F, attainable with pressure canners operated at 10 to 15 PSIG"; achieving the same lethality in a boiling-water canner "ranges from 7 to 11 hours" and is not a practical option. OSU Extension advises boiling home-canned low-acid foods before eating — 10 minutes below 1,000 feet, 20 minutes otherwise.',
          'Trusting the date label instead of the temperature history. UK government guidance is clear that "use-by dates relate to the safety of food, whereas best before dates relate to quality", and that "eating food after the use-by date could make you ill". The converse also holds: a date that has not passed says nothing about whether the pack spent two hours in a warm car. The FDA\'s two-hour rule is the counterweight — never leave food that needs refrigeration at room temperature for more than two hours, or one hour above 90 °F (32 °C).',
          'Judging by appearance after a power cut. The FDA gives numbers: an unopened refrigerator "will keep food cold for about 4 hours", a full freezer "approximately 48 hours (24 hours if it is half full)". Discard refrigerated perishables "that has been at refrigerator temperatures above 40°F for 4 hours or more".',
        ] },

        { heading: 'Time and temperature: the actual numbers', body: ['National figures do not agree exactly. We would rather set out the differences than quietly pick one.'], bullets: [
          'Danger zone — Taiwan\'s TFDA uses 7–60 °C; Spain\'s AESAN uses 5–60 °C. Both mean the same thing: this is the band in which pathogens multiply fastest.',
          'Refrigeration — FDA and Health Canada: 4 °C (40 °F) or below. UK FSA: 0–5 °C. Taiwan TFDA: below 7 °C. Under EU rules AESAN is stricter for particular products: minced meat at or below 2 °C, offal 3 °C, poultry 4 °C, and fresh fishery products close to the temperature of melting ice (0–4 °C).',
          'Freezing — FDA, Health Canada and AESAN all give −18 °C (0 °F) or below; the FSA says a freezer "should be around -18°C".',
          'Hot holding — Hong Kong\'s CFS and Taiwan\'s TFDA both give above 60 °C.',
          'Cooking — Taiwan\'s TFDA asks for a core temperature above 70 °C; Hong Kong\'s CFS asks for at least 75 °C at the core when reheating leftovers; the FDA gives 71 °C (160 °F) for meat carrying a Toxoplasma risk.',
          'The two-hour rule — FDA: no more than two hours at room temperature for food that needs refrigeration, one hour above 90 °F (32 °C). The FSA\'s equivalent is to "cool cooked food at room temperature and place in the fridge within one to two hours".',
        ] },

        { heading: 'Freezing is not sterilisation', body: ['The FDA writes that "foods will stay safe indefinitely in the freezer, but quality/taste of the food may be affected". That sentence is often read as though freezing kills things. The FSA completes the picture: a freezer "acts as a pause button", and "the bacteria haven\'t been killed, and they may be revived as the food defrosts".', 'Two exceptions are worth holding on to. Freezing does kill parasites in fish — Japan\'s MAFF gives −20 °C for 24 hours or more — though the FDA cautions that "freezing doesn\'t kill all harmful germs". And Listeria survives freezing outright. This is why, with a handful of exceptions, the freezer figures on this site describe quality rather than a safety boundary.'] },

        { heading: 'What a household can actually apply from HACCP', body: ['The seven principles, as the FDA states them, are: conduct a hazard analysis; determine the critical control points; establish critical limits; establish monitoring procedures; establish corrective actions; establish verification procedures; and establish record-keeping and documentation procedures. A critical control point is "a step at which control can be applied and is essential to prevent or eliminate a food safety hazard or reduce it to an acceptable level"; a critical limit is "a maximum and/or minimum value to which a biological, chemical or physical parameter must be controlled at a CCP".', 'The first five have honest domestic equivalents. The last two — formal verification and record-keeping — are industry practice, and it would be silly to pretend otherwise: nobody audits your kitchen and you do not need three years of logs. Put the effort into the first five.'], bullets: [
          'Hazard analysis — work out which of the things you just bought are raw meat, seafood, ready-to-eat food or rehydrated fungus. Those are your high-risk items.',
          'Critical control points and limits — at home this reduces to four numbers: fridge at or below 4 °C, freezer at or below −18 °C, no more than two hours at room temperature, and a core temperature above 70 °C when cooking. The WHO\'s Five Keys to Safer Food is the same idea in plain language: keep clean; separate raw and cooked; cook thoroughly; keep food at safe temperatures; use safe water and raw materials. Japan\'s Ministry of Health, Labour and Welfare compresses it further still — do not attach, do not multiply, eliminate. Taiwan\'s five rules are: wash your hands, buy fresh, separate raw from cooked, cook thoroughly, and watch the storage temperature.',
          'Monitoring — one fridge thermometer. The FDA says outright that few refrigerator controls show the actual temperature, so a standalone thermometer is the only way to know. Add a probe thermometer for cooking and your monitoring is complete.',
          'Corrective action — decide in advance what happens when a temperature is wrong. After a power cut of more than four hours, or a fridge that spent more than four hours above 4 °C, the answer is to discard, not to smell it and hope.',
        ] },

        { heading: 'When in doubt, throw it out', body: ['Most of the storage times on this site indicate best quality rather than an absolute safety limit. The hazards on this page are a different matter. Botulinum toxin cannot be seen or smelled, histamine and bongkrekic acid survive cooking, and Listeria keeps growing in the fridge. None of these is detectable by your senses.', 'So take the questions in the right order: first the temperature history — how cold, and for how long — and only then the look and the smell. A bulging vacuum pack, a swollen can, or a sealed container that hisses or smells wrong when opened goes in the bin without a taste test. This page is general food safety information and is not medical advice.'] },

        { heading: 'Sources', body: ['Every factual claim on this page traces to one of the following documents, each of which was retrieved and read.'], bullets: [
          'WHO — Food safety fact sheet: https://www.who.int/news-room/fact-sheets/detail/food-safety',
          'WHO — Natural toxins in food fact sheet: https://www.who.int/news-room/fact-sheets/detail/natural-toxins-in-food',
          'WHO — Five Keys to Safer Food Manual: https://www.who.int/publications/i/item/9789241594639',
          'FDA — What You Need to Know About Foodborne Illnesses: https://www.fda.gov/food/consumers/what-you-need-know-about-foodborne-illnesses',
          'FDA — Refrigerator Thermometers: Cold Facts about Food Safety: https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety',
          'FDA — Safe Food Handling: https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling',
          'FDA — Listeria (Listeriosis): https://www.fda.gov/food/foodborne-pathogens/listeria-listeriosis',
          'FDA — Selecting and Serving Fresh and Frozen Seafood Safely: https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely',
          'FDA — Toxoplasma (Food Safety for Moms-to-Be): https://www.fda.gov/food/people-risk-foodborne-illness/toxoplasma-food-safety-moms-be',
          'FDA — Mycotoxins: https://www.fda.gov/food/natural-toxins-food/mycotoxins',
          'FDA — Food Allergies: https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies',
          'FDA — Food and Water Safety During Power Outages and Floods: https://www.fda.gov/food/buy-store-serve-safe-food/food-and-water-safety-during-power-outages-and-floods',
          'FDA — HACCP Principles & Application Guidelines: https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/haccp-principles-application-guidelines',
          'FDA — Physical Contaminants: https://www.fda.gov/animal-veterinary/biological-chemical-and-physical-contaminants-animal-food/physical-contaminants',
          'National Center for Home Food Preservation — Ensuring Safe Canned Foods: https://nchfp.uga.edu/how/can/general-information/ensuring-safe-canned-foods/',
          'National Center for Home Food Preservation — Freezing Garlic-in-Oil: https://nchfp.uga.edu/how/freeze/vegetable/freezing-garlic-in-oil/',
          'Ohio State University Extension HYG-5567 — Botulism: What You Don\'t See or Smell Can Still Hurt You: https://ohioline.osu.edu/factsheet/HYG-5567-11',
          'Centre for Food Safety, Hong Kong — Heat-stable Toxins from Bacillus cereus and Staphylococcus aureus: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_193_01.html',
          'Centre for Food Safety, Hong Kong — Bacillus cereus in Processed Food: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_97_01.html',
          'Centre for Food Safety, Hong Kong — Clostridium perfringens: A Threat to Food Safety: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_212_02.html',
          'Centre for Food Safety, Hong Kong — Histamine in Fish and Fish Products: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_150_02.html',
          'Centre for Food Safety, Hong Kong — Botulism and Vacuum Packed Food: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_46_01.html',
          'Centre for Food Safety, Hong Kong — Food Safety Bulletin 98th issue, on bongkrekic acid: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsb_202403.html',
          'Food Standards Agency / GOV.UK — How to chill, freeze and defrost food safely: https://www.gov.uk/government/publications/how-to-chill-freeze-and-defrost-food-safely/how-to-chill-freeze-and-defrost-food-safely',
          'GOV.UK — Understanding food labelling: best before and use-by dates: https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates',
          'Health Canada — Safe food storage: https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-food-storage.html',
          'Taiwan Food and Drug Administration — Food poisoning FAQ: https://www.fda.gov.tw/TC/sitecontent.aspx?sid=2572',
          'Taiwan Ministry of Health and Welfare — the five rules for preventing food poisoning: https://www.mohw.gov.tw/cp-16-27406-1.html',
          'Japan Ministry of Agriculture, Forestry and Fisheries — Anisakis: https://www.maff.go.jp/j/syouan/seisaku/foodpoisoning/f_encyclopedia/anisakis.html',
          'Japan Ministry of Health, Labour and Welfare — Food poisoning: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/syokuchu/index.html',
          'AESAN, Spain — Higiene de los alimentos: https://www.aesan.gob.es/seguridad-alimentaria/higiene-alimentos',
        ] },
      ],
    },
    ja: {
      title: '食品の危害と安全',
      description: 'HACCP の生物的・化学的・物理的危害の区分にそって、保存中の食品が危険になる仕組みと、本当にリスクの高い保存の失敗を解説します。',
      sections: [
        { body: ['保存した食品が危険になるのは、「置きすぎた」という漠然とした理由ではありません。気づかないうちに、特定の危害がひとつ育っただけです。このページでは HACCP の分類にそって、その危害を一つずつ整理します。何であり、どこから来て、どんな保存のしかたが育ててしまい、家庭では何ができるのか。', '米国食品医薬品局（FDA）は HACCP を「原材料の生産・調達・取扱いから、製造、流通、最終製品の消費に至るまで、生物的・化学的・物理的危害の分析と管理によって食品安全に対処する管理システム」と定義しています。この三分類は家庭の台所でもそのまま成り立ちます。違うのは使える手段の数だけで、家庭にあるのは温度・時間・区分・加熱の四つです。'] },

        { heading: '危害は三つに分かれる', body: ['生物的危害は、生きているもの、あるいはかつて生きていたものです。細菌、寄生虫、ウイルス、カビ、そしてそれらが残した毒素。化学的危害には、食品そのものが持つ天然毒素、保存や清掃の過程で混入する物質、そして該当する人にとっては毒物そのものであるアレルゲンが含まれます。物理的危害は、そもそも食品に入っていてはならない異物です。', 'FDA が HACCP の指針で挙げる例は率直です。生物的危害には「腸管系病原菌（サルモネラ、ベロ毒素産生大腸菌など）」と黄色ブドウ球菌、化学的危害には「アフラトキシン、抗生物質または農薬の残留」、物理的危害には「石、ガラス、金属」。家庭の保存で起きる問題はほとんどが一つ目に入りますが、二つ目の天然毒素は、特定の食材で起きたときの結果がより重くなりがちです。'] },

        { heading: '生物的危害：病原細菌', body: ['以下の原因食品と潜伏期間は、FDA の「What You Need to Know About Foodborne Illnesses」の一覧によります。潜伏期間は覚えておく価値があります。あとから「どの食事だったか」をたどれる、ほぼ唯一の手がかりだからです。'], bullets: [
          'サルモネラ属菌：卵、家禽肉、食肉、殺菌していない牛乳やジュース、チーズ、汚染された生鮮野菜・果物。潜伏期間 6〜48 時間。',
          'カンピロバクター・ジェジュニ：生または加熱不十分な鶏肉、殺菌していない牛乳、汚染された水。潜伏期間 2〜5 日。',
          '腸管出血性大腸菌 O157:H7：加熱不十分な牛肉（とくにひき肉）、殺菌していない牛乳やジュース、生鮮野菜・果物（もやしなど）、汚染された水。潜伏期間 1〜8 日。',
          'リステリア・モノサイトゲネス：殺菌していない牛乳、それで作った軟質チーズ、そのまま食べる食肉加工品、アイスクリーム、生または燻製の魚介。FDA はこの菌を特記しています——「大部分の細菌と異なり、L. monocytogenes は冷蔵温度でも増殖し、冷凍してもこの病原体は死滅も減少もしない」。',
          'ウエルシュ菌（Clostridium perfringens）：食肉、家禽肉、グレービーやたれ、乾燥品や調理済み食品、時間や温度の管理を誤った食品。潜伏期間 8〜16 時間。',
          'ボツリヌス菌（Clostridium botulinum）：不適切に製造された缶詰、とくに家庭で瓶詰めした野菜、発酵魚、アルミホイルに包んだまま放置した焼きじゃがいも。潜伏期間 12〜72 時間。',
          'セレウス菌（Bacillus cereus）：食肉、煮込み料理、グレービー、バニラソース。香港食物安全中心は、嘔吐型の毒素が「126℃で 90 分の加熱にも耐える」としています。',
          '黄色ブドウ球菌（Staphylococcus aureus）：冷蔵していない、または冷蔵が不適切だった食肉、ポテトサラダや卵サラダ、クリーム入り菓子。潜伏期間 1〜6 時間で、主な病原体のなかで最短です。',
          '腸炎ビブリオなどビブリオ属：加熱不十分または生の魚介、とくに貝類。腸炎ビブリオの潜伏期間は 4〜96 時間、ビブリオ・バルニフィカスは 1〜7 日で、牡蠣が代表的な原因食品です。',
        ] },

        { heading: '感染型と毒素型：再加熱で助かる場合と助からない場合', body: ['家庭の調理で最も覚えておく価値のある区別です。感染型は生きた菌を食べ、腸内で増えることで発症します。毒素型（食物中毒型）は、細菌が食品のなかですでに毒素を作り終えており、口に入るのは化学物質です。菌が生きているかどうかは、もはや関係ありません。', 'この区別が「再加熱が効くかどうか」を決めます。サルモネラ、カンピロバクター、リステリアは感染型で、十分な加熱（台湾 TFDA は中心温度 70℃超を目安としています）は実際に効きます。一方、セレウス菌の嘔吐毒素と黄色ブドウ球菌のエンテロトキシンには効きません。香港食物安全中心は明確です——これらの毒素は「細菌の増殖中に生成され、再加熱では除去できない」。', '実務的な結論は単純です。午後じゅう室温に置いたチャーハンや煮物は、煮返しても安全にはなりません。煮沸で死ぬのは細菌であって、鍋にすでに残っている毒素ではありません。'] },

        { heading: '寄生虫とウイルス', body: ['寄生虫の代表はアニサキスです。農林水産省は「サバ、サンマ、アジ、イワシ、ヒラメ、カツオ、イカ等の海産魚介類」を挙げ、「十分に冷凍（−20℃で 24 時間以上）された生鮮魚介類を購入した場合は、アニサキスは死んでいます」「加熱調理（中心温度 60℃で 1 分以上）でアニサキスは死にます」と述べています。同時に「酢や塩、しょうゆ、わさびなどの調味料では、アニサキスは死にません」とも明記しています。締めることは殺虫ではありません。', 'トキソプラズマ（Toxoplasma gondii）は主に生または加熱不十分な豚肉、羊肉、鹿肉から来ます。FDA は肉の中心温度 71℃（160°F）を示し、生肉を扱った包丁、器具、まな板も同じように媒介すると注意しています。妊娠中のリスクが高いことが、この寄生虫を別扱いにしている理由です。', 'ウイルスは食品のなかで増えません。増える必要もなく、ごく少量で発症します。FDA の一覧では、ノロウイルスと A 型肝炎ウイルスの原因はほぼ同じです——生鮮野菜・果物、汚染された飲料水、感染した調理従事者が触れたあと再加熱されなかった食品、汚染水域の貝類。潜伏期間はノロウイルスが 12〜48 時間、A 型肝炎が平均 28 日。この種の危害に冷蔵庫は無力で、効くのは手洗いと生食・加熱済みの区分です。'] },

        { heading: 'カビとカビ毒', body: ['目に見えるカビは問題の一部にすぎません。世界保健機関（WHO）は「大部分のカビ毒は化学的に安定しており、食品加工を経ても残る」と述べています。カビた部分を切り落として加熱しても、残りが安全になるわけではありません。', 'FDA によれば、アフラトキシンは「特定のアスペルギルス属のカビが産生するカビ毒」で、落花生、とうもろこし、ブラジルナッツやピスタチオなどの木の実、一部の雑穀が影響を受けやすいとされます。パツリンは「果物、穀物、チーズに生えるペニシリウム属、アスペルギルス属、Byssochylamys 属のカビが産生」し、とくにりんごジュースが問題になります。FDA は「殺菌処理ではパツリンは除去できない」と明言しています。家庭でできるのは入口の管理だけです——少量ずつ買い、乾燥した風通しのよい場所に置き、カビが出たらその一角を削るのではなく全量を捨てる。'] },

        { heading: '化学的危害：食品そのものが持つ天然毒素', body: ['汚染ではなく、もともと食材に含まれている毒素があります。以下は WHO「食品中の天然毒素」と香港食物安全中心によります。'], bullets: [
          '青酸配糖体：WHO は「キャッサバ、ソルガム、核果類、たけのこ、アーモンド」をとくに重要な含有食品として挙げています。皮むき、浸漬、発酵、十分な加熱といった正しい処理を経て初めて食べられるもので、生食や処理不足は中毒につながります。',
          'ソラニンなどの配糖体アルカロイド：WHO は「じゃがいもの芽、苦味のある皮、緑色の部分に高濃度で含まれる」とし、生成を抑えるため「暗く、涼しく、乾燥した場所」での保管を勧めています。芽と緑色の部分は取り除き、苦味がはっきりするものは丸ごと捨ててください。',
          '毒きのこ：WHO は明確です——「加熱しても皮をむいても毒素は不活化しない」。野生のきのこを見た目で判断してはいけません。',
          'ヒスタミン（スコンブロイド）：香港食物安全中心は、ヒスチジンを多く含む魚種として「サバ、イワシ、マグロ、カタクチイワシ」を挙げています。温度管理が悪いと細菌のヒスチジン脱炭酸酵素がヒスチジンをヒスタミンに変えます。加熱は「ヒスタミン産生菌を殺し酵素を失活させることはできる」ものの、「すでに生成したヒスタミンを破壊することはできない」。対策は 4℃以下の途切れないコールドチェーン、冷凍なら −18℃以下だけです。',
          'ボンクレキン酸（米酵菌酸）：同センターは「バークホルデリア・グラジオリ pathovar cocovenenans が産生する耐熱性の毒素」と説明しています。菌の増殖温度は 30〜37℃、毒素の産生温度は 22〜30℃。近年の事例では、二日以上戻したキクラゲや、室温で 24 時間を超えて置かれた生の米麺製品が関与しました。乾燥きのこは冷蔵庫で戻し、生の米麺類は最後まで冷蔵してください。',
          '魚介類の生物毒素：WHO は「ムール貝、ホタテ、カキなどの二枚貝は魚よりもこれらの毒素を含みやすい」とし、「味も匂いもなく、加熱や冷凍では除去できない」と述べています。',
          '生の豆に含まれるレクチン：WHO は「生の豆をわずか 4〜5 粒食べただけでも激しい腹痛、嘔吐、下痢を起こしうる」とし、「乾燥豆を 12 時間以上浸漬したうえで 10 分以上激しく沸騰させれば破壊される」と述べています。低温でことこと煮るのは、ここでは安全側ではなく危険側の選択です。',
        ] },

        { heading: '化学的危害：アレルゲン、洗剤、容器', body: ['アレルゲンは大多数の人には無害でありながら、該当する人にとっては最も直接的な化学的危害です。米国が定める主要アレルゲンは「牛乳、卵、魚類、甲殻類、木の実類、落花生、小麦、大豆、ごま」の九品目。FDA は交差接触を「主要アレルゲンが意図せず製品に持ち込まれること」と定義し、設備の共用、不十分な洗浄、アレルゲンを含む粉じんやエアロゾルを原因として挙げています。家庭版はそのまま、同じ包丁、同じまな板、使い回しの保存容器、そして上の棚の蓋のない器から下へ落ちる汁です。', '見落とされがちな経路がもう二つあります。ひとつは洗剤や消毒液の残留です。洗剤を食品用の容器に小分けしない、洗ったあとはよくすすいで乾かす、それだけのことです。もうひとつは容器そのもの。FDA は HACCP の指針で農薬や抗生物質の残留を化学的危害の例として挙げていますが、同じ理屈は本来入るはずのないあらゆる物質に当てはまります。食品には食品用と表示された容器だけを使い、出所の分からないポリバケツや塗料缶、以前に非食品を入れていた瓶を保存に使わないでください。'] },

        { heading: '物理的危害', body: ['物理的危害は食品に入り込んだ異物です。FDA はこれを大きく「鋭利な物体、窒息の危険となるもの」に分類し、「口腔内の損傷（歯の破損、口やのどの裂傷など）、消化管の裂傷や穿孔、窒息」を起こしうるとしています。HACCP の指針では石、ガラス、金属を例に挙げています。家庭の保存では、冷蔵庫のなかで割れた瓶、缶切りから落ちた金属片、包装の破片や結束用の針金、取り残した骨や小骨、そして虫や鼠が入り込んだ乾物が主な発生源です。', '対処に工夫の余地はありません。ガラス容器が割れたら、周囲の包装されていない食品は破片を探して取り除くのではなく廃棄する。乾物は密閉容器に入れ、虫食いやかじり跡がないか定期的に確認する。それだけです。'] },

        { heading: '本当にリスクの高い保存の失敗', body: ['以下はいずれも「品質が落ちる」という水準の話ではなく、実際に人が病気になる水準の話です。'], bullets: [
          '大量に作った料理をゆっくり冷ます。ウエルシュ菌の典型的な筋書きです。香港食物安全中心は、この菌の芽胞が「通常の加熱温度では死滅しない」こと、加熱の熱がむしろ芽胞の発芽を促し同時に競合菌を殺してしまうこと、そして「調理済み食品をゆっくり冷ますことは、細菌が大量に増えるための時間を与える」ことを指摘しています。大鍋のカレーや煮物、肉汁をコンロの上でそのまま冷ますのが、まさにこの筋書きです。小分けにし、浅い容器を使い、必要なら氷水で冷やす。同センターの基準は、60℃から 20℃までを 2 時間以内、20℃から 4℃までを 4 時間以内です。',
          '冷蔵庫が 4℃より高い。FDA は冷蔵 4℃（40°F）以下、冷凍 −18℃（0°F）を推奨し、「冷蔵庫のつまみで実際の温度が分かるものはほとんどない」として庫内温度計の設置を勧めています。台湾 TFDA は 7℃未満を目安とし、7〜60℃を危険温度帯と呼びます。英国 FSA は「冷蔵庫は 0〜5℃であるべき」としています。数度の差は誤差ではありません。リステリアはまさに冷蔵温度でも増える菌です。',
          '生食用と加熱済み食品の交差汚染。FDA の「分ける」原則は、「生の食肉、家禽肉、魚介、卵を、買い物カート、買い物袋、冷蔵庫のなかで他の食品と分ける」ことを求め、生の食材を載せた面に十分な洗浄なしに加熱済み食品を戻さないよう求めています。スペイン AESAN は同じ考えを庫内に持ち込み、生の食肉と魚は包装したうえで最下段に置き、ドリップが下の食品にかからないようにします。',
          '調理台の上で解凍する。FDA が安全と認める解凍方法は三つだけです——「冷蔵庫内、冷水中、電子レンジ」。電子レンジで解凍したものは直ちに加熱します。室温に出しておくと、中心がまだ凍っているうちに表面はとうに危険温度帯に入っています。英国 FSA は、完全に解凍したものは 24 時間以内に使うよう補足しています。',
          '完全に解凍したものを冷凍庫に戻す。FDA の判定は具体的です——食品に「まだ氷の結晶が残っている、または 40°F 以下であれば、再冷凍または調理しても安全」。完全に解けて温度が上がったものは対象外です。FSA の言い方では「加熱調理したうえでもう一度冷凍することはできるが、そのあと再加熱できるのは一度だけ」となります。',
          '真空包装などの嫌気環境。香港食物安全中心は、真空包装やガス置換包装が「酸素を排除または大幅に減らすことで、酸素を必要とする多くの腐敗微生物や病原菌の増殖を防ぐ」と説明します。それはボツリヌス菌が好む条件そのものであり、「一部の菌株は 3℃という低温でも増殖し毒素を産生しうる」。つまり真空にすること自体が冷蔵の期限を延ばすわけではありません。変わるのはリスクの種類で、腐敗という警告が消える一方、危険は残ります。家庭用の真空機は保存期間の許可証ではなく、製造者が表示する保存条件と期限に従う必要があります。',
          'にんにくやハーブを油に漬けて常温に置く。オハイオ州立大学エクステンションは端的です——「ハーブ、にんにく、トマトを油に入れると、植物の表面にあった芽胞が、その嫌気的な風味油の混合物のなかで毒素を作りうる」。そして「ボツリヌス毒素は見ることも、嗅ぐことも、味わうこともできない」。米国国立家庭食品保存センターの指示は厳格で、にんにくの油漬けは「作りたてを 40°F（4℃）以下で冷蔵し、4 日を超えて保存しない」、長く置きたいなら冷凍します。',
          '低酸性食品を加圧せずに家庭で瓶詰めする。同センターは pH で線を引きます——「酸性食品は pH 4.6 以下」、低酸性食品はそれより高い。ボツリヌス菌は湿った低酸性の食品、40〜120°F（約 4〜49℃）の温度、2％未満の酸素で増殖しますが、密封した野菜の瓶はこの三つを同時に満たします。したがって低酸性食品は「240〜250°F の温度で殺菌する必要があり、これは 10〜15 PSIG で運転する加圧殺菌器で到達できる」。沸騰水では同じ効果に「7〜11 時間」かかり、現実的ではありません。オハイオ州立大学エクステンションは、家庭で瓶詰めした低酸性食品は食べる前に煮沸するよう勧めています（標高 1,000 フィート未満で 10 分、それ以外は 20 分）。',
          '温度の履歴ではなく日付表示を信じる。英国政府の説明では「use by（消費期限）は食品の安全性に、best before（賞味期限）は品質に関わる」もので、「消費期限を過ぎた食品を食べると体調を崩すおそれがある」。逆も成り立ちます。期限内であることは、そのパックが暖かい車内で 2 時間過ごさなかったことを何も保証しません。FDA の 2 時間ルールがその対になります——要冷蔵の食品を室温に 2 時間を超えて置かない、気温が 90°F（32℃）を超えるときは 1 時間。',
          '停電のあと見た目で判断する。FDA は数字を示しています。扉を開けなければ冷蔵室は「約 4 時間」、満杯の冷凍庫は「およそ 48 時間（半分なら 24 時間）」もちます。冷蔵の傷みやすい食品が「40°F を超える温度に 4 時間以上」置かれていたら廃棄します。',
        ] },

        { heading: '時間と温度：実際の数字', body: ['各国の数字は完全には一致しません。ひとつだけ選んで黙っているより、違いをそのまま示します。'], bullets: [
          '危険温度帯：台湾 TFDA は 7〜60℃、スペイン AESAN は 5〜60℃。意味は同じで、病原菌が最も速く増える帯域です。',
          '冷蔵：FDA とカナダ保健省は 4℃（40°F）以下、英国 FSA は 0〜5℃、台湾 TFDA は 7℃未満。EU 規則下の AESAN は品目ごとにより厳しく、ひき肉 2℃以下、内臓 3℃以下、家禽肉 4℃以下、生鮮水産物は氷の融解温度に近い 0〜4℃です。',
          '冷凍：FDA、カナダ保健省、AESAN はいずれも −18℃（0°F）以下。英国 FSA は「おおむね −18℃」としています。',
          '温蔵：香港食物安全中心と台湾 TFDA はいずれも 60℃超。',
          '加熱：台湾 TFDA は中心温度 70℃超、香港食物安全中心は残り物の再加熱で中心 75℃以上、FDA はトキソプラズマのリスクがある食肉に 71℃（160°F）を示しています。',
          '2 時間ルール：FDA は要冷蔵食品を室温に 2 時間を超えて置かない、気温 90°F（32℃）超では 1 時間。英国 FSA の対応する表現は「調理した食品は室温で冷まし、1〜2 時間以内に冷蔵庫に入れる」です。',
        ] },

        { heading: '冷凍は殺菌ではない', body: ['FDA は「食品は冷凍庫のなかでは無期限に安全に保たれるが、品質や風味は影響を受けうる」と書いています。この一文は、冷凍が菌を殺すかのように読まれがちです。英国 FSA が補ってくれます——冷凍庫は「一時停止ボタン」であり、「細菌は死んでおらず、解凍にともなって再び活動しはじめることがある」。', '例外は二つ覚えておく価値があります。魚の寄生虫については冷凍は実際に有効で、農林水産省の条件は −20℃で 24 時間以上です。ただし FDA は「冷凍しても有害な微生物がすべて死ぬわけではない」と注意しています。そしてリステリアは冷凍でも生き延びます。だからこそ本サイトの冷凍欄の期間は、ごく一部の例外を除いて、安全の境界線ではなく品質の目安を示しています。'] },

        { heading: 'HACCP のうち家庭で使える部分', body: ['FDA が示す七原則は、危害要因分析を行うこと、重要管理点（CCP）を決定すること、管理基準を設定すること、モニタリング手順を設定すること、改善措置を設定すること、検証手順を設定すること、記録と文書化の手順を設定すること、です。重要管理点は「管理を加えることができ、かつ食品安全上の危害を防止・除去し、または許容水準まで低減するために不可欠な工程」、管理基準は「その CCP において生物的、化学的または物理的パラメータを管理すべき最大値および／または最小値」と定義されています。', '前の五つには家庭版があります。後の二つ、正式な検証と記録は産業側の実務であり、そのふりをする意味はありません。台所を監査する人はいませんし、三年分の記録も要りません。前の五つに力を注げば十分です。'], bullets: [
          '危害要因分析：買ってきたもののうち、生の食肉、魚介、そのまま食べる惣菜、戻したきのこはどれか。それがあなたの高リスク品目です。',
          '重要管理点と管理基準：家庭では四つの数字に落ちます——冷蔵 4℃以下、冷凍 −18℃以下、室温は 2 時間まで、加熱は中心 70℃超。WHO の「食品をより安全にするための五つの鍵」は同じことを平易に言ったものです——清潔に保つ、生鮮食品と調理済み食品を分ける、よく加熱する、安全な温度に保つ、安全な水と原材料を使う。厚生労働省の三原則はさらに短く、「つけない、増やさない、やっつける」。台湾の「五要」は、手を洗う、新鮮なものを選ぶ、生食と加熱済みを分ける、十分に加熱する、保存温度に注意する、です。',
          'モニタリング：冷蔵庫用の温度計を一本。FDA は冷蔵庫のつまみで実際の温度が分かるものはほとんどないと明言しています。独立した温度計だけが今の庫内温度を教えてくれます。調理用の中心温度計を足せば、家庭のモニタリングは完成です。',
          '改善措置：温度が外れたときにどうするかを先に決めておくこと。4 時間を超える停電、冷蔵室が 4℃を超えたまま 4 時間、いずれも答えは廃棄であって、「匂いを嗅いでみる」ではありません。',
        ] },

        { heading: '迷ったら捨てる', body: ['本サイトの保存期間の多くは、安全の絶対的な境界ではなく、おいしく食べられる目安です。ただしこのページで扱った危害は別です。ボツリヌス毒素は見えも匂いもせず、ヒスタミンとボンクレキン酸は加熱に耐え、リステリアは冷蔵庫のなかでも増えます。どれも感覚では判断できません。', 'ですから順番を逆にしないでください。まず温度の履歴——何度で、どれだけの時間置かれたか。見た目と匂いはそのあとです。真空パックがふくらんでいる、缶が膨張している、密閉容器を開けたときに音がしたり異臭がする——いずれも味見せずに廃棄します。このページは一般的な食品安全の情報であり、医療上の助言ではありません。'] },

        { heading: '出典', body: ['このページの事実はすべて、実際に取得して確認した以下の資料にもとづいています。'], bullets: [
          'WHO「Food safety」ファクトシート：https://www.who.int/news-room/fact-sheets/detail/food-safety',
          'WHO「Natural toxins in food」ファクトシート：https://www.who.int/news-room/fact-sheets/detail/natural-toxins-in-food',
          'WHO『Five Keys to Safer Food Manual』：https://www.who.int/publications/i/item/9789241594639',
          'FDA「What You Need to Know About Foodborne Illnesses」：https://www.fda.gov/food/consumers/what-you-need-know-about-foodborne-illnesses',
          'FDA「Refrigerator Thermometers: Cold Facts about Food Safety」：https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety',
          'FDA「Safe Food Handling」：https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling',
          'FDA「Listeria (Listeriosis)」：https://www.fda.gov/food/foodborne-pathogens/listeria-listeriosis',
          'FDA「Selecting and Serving Fresh and Frozen Seafood Safely」：https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely',
          'FDA「Toxoplasma (Food Safety for Moms-to-Be)」：https://www.fda.gov/food/people-risk-foodborne-illness/toxoplasma-food-safety-moms-be',
          'FDA「Mycotoxins」：https://www.fda.gov/food/natural-toxins-food/mycotoxins',
          'FDA「Food Allergies」：https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies',
          'FDA「Food and Water Safety During Power Outages and Floods」：https://www.fda.gov/food/buy-store-serve-safe-food/food-and-water-safety-during-power-outages-and-floods',
          'FDA「HACCP Principles & Application Guidelines」：https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/haccp-principles-application-guidelines',
          'FDA「Physical Contaminants」：https://www.fda.gov/animal-veterinary/biological-chemical-and-physical-contaminants-animal-food/physical-contaminants',
          '米国国立家庭食品保存センター（NCHFP）「Ensuring Safe Canned Foods」：https://nchfp.uga.edu/how/can/general-information/ensuring-safe-canned-foods/',
          '米国国立家庭食品保存センター（NCHFP）「Freezing Garlic-in-Oil」：https://nchfp.uga.edu/how/freeze/vegetable/freezing-garlic-in-oil/',
          'オハイオ州立大学エクステンション HYG-5567「Botulism: What You Don\'t See or Smell Can Still Hurt You」：https://ohioline.osu.edu/factsheet/HYG-5567-11',
          '香港食物安全中心「Heat-stable Toxins from Bacillus cereus and Staphylococcus aureus」：https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_193_01.html',
          '香港食物安全中心「Bacillus cereus in Processed Food」：https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_97_01.html',
          '香港食物安全中心「Clostridium perfringens – A Threat to Food Safety」：https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_212_02.html',
          '香港食物安全中心「Histamine in Fish and Fish Products」：https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_150_02.html',
          '香港食物安全中心「Botulism and Vacuum Packed Food」：https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_46_01.html',
          '香港食物安全中心『食物安全焦点』第 98 号（ボンクレキン酸）：https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsb_202403.html',
          '英国 FSA／GOV.UK「How to chill, freeze and defrost food safely」：https://www.gov.uk/government/publications/how-to-chill-freeze-and-defrost-food-safely/how-to-chill-freeze-and-defrost-food-safely',
          'GOV.UK「Understanding food labelling: best before and use-by dates」：https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates',
          'カナダ保健省「Safe food storage」：https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-food-storage.html',
          '台湾 衛生福利部食品薬物管理署「食品中毒常見問與答」：https://www.fda.gov.tw/TC/sitecontent.aspx?sid=2572',
          '台湾 衛生福利部「五要原則」：https://www.mohw.gov.tw/cp-16-27406-1.html',
          '農林水産省「アニサキス」：https://www.maff.go.jp/j/syouan/seisaku/foodpoisoning/f_encyclopedia/anisakis.html',
          '厚生労働省「食中毒」：https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/syokuchu/index.html',
          'スペイン AESAN「Higiene de los alimentos」：https://www.aesan.gob.es/seguridad-alimentaria/higiene-alimentos',
        ] },
      ],
    },
    es: {
      title: 'Seguridad alimentaria',
      description: 'Qué hace peligroso un alimento almacenado, ordenado según la clasificación de peligros del APPCC, y qué errores de conservación suponen un riesgo real.',
      sections: [
        { body: ['Un alimento casi nunca se vuelve peligroso por la razón vaga de que «llevaba mucho tiempo guardado». Se vuelve peligroso porque un peligro concreto creció mientras nadie miraba. Esta página recorre esos peligros con la clasificación del APPCC (HACCP): qué es cada uno, de dónde viene, qué costumbres de conservación lo alimentan y qué puede hacer usted realmente en casa.', 'La Administración de Alimentos y Medicamentos de EE. UU. define el APPCC como «un sistema de gestión en el que la seguridad alimentaria se aborda mediante el análisis y el control de peligros biológicos, químicos y físicos, desde la producción, la compra y la manipulación de las materias primas hasta la fabricación, la distribución y el consumo del producto terminado». La misma división de tres funciona en una cocina doméstica. Lo que cambia es el número de palancas: en casa usted tiene temperatura, tiempo, separación y calor.'] },

        { heading: 'Tres clases de peligro', body: ['Los peligros biológicos son cosas vivas, o que lo fueron: bacterias, parásitos, virus, mohos y las toxinas que dejan tras de sí. Los peligros químicos abarcan las toxinas que el propio alimento contiene, las sustancias que se cuelan durante la conservación o la limpieza, y los alérgenos, que para la persona afectada se comportan exactamente como un veneno. Los peligros físicos son objetos duros que nunca deberían estar en la comida.', 'Los ejemplos que da la FDA en su guía de APPCC son directos: entre los biológicos, «patógenos entéricos (por ejemplo, Salmonella, Escherichia coli productora de verotoxina)» y Staphylococcus aureus; entre los químicos, «aflatoxina, residuos de antibióticos o de plaguicidas»; entre los físicos, «piedras, vidrio, metal». Casi todo lo que sale mal en la conservación doméstica cae en el primer grupo, pero cuando falla el segundo en un ingrediente concreto, las consecuencias suelen ser peores.'] },

        { heading: 'Peligros biológicos: bacterias patógenas', body: ['Los alimentos implicados y los periodos de incubación proceden del resumen de la FDA «What You Need to Know About Foodborne Illnesses». Conviene retener el periodo de incubación: suele ser la única pista que queda después para reconstruir de qué comida se trataba.'], bullets: [
          'Salmonella: huevos, aves, carne, leche o zumo sin pasteurizar, queso y frutas y hortalizas crudas contaminadas. Incubación de 6 a 48 horas.',
          'Campylobacter jejuni: aves crudas o poco hechas, leche sin pasteurizar y agua contaminada. Incubación de 2 a 5 días.',
          'E. coli O157:H7: carne de vacuno poco hecha (sobre todo picada), leche y zumos sin pasteurizar, frutas y hortalizas crudas (por ejemplo, brotes) y agua contaminada. Incubación de 1 a 8 días.',
          'Listeria monocytogenes: leche sin pasteurizar, quesos blandos elaborados con ella, embutidos y fiambres listos para consumo, helados, pescado crudo o ahumado. La FDA la señala aparte: «a diferencia de la mayoría de las bacterias, L. monocytogenes puede crecer a temperaturas de refrigeración y la congelación no elimina ni reduce el patógeno».',
          'Clostridium perfringens: carnes, aves, salsas y jugos de cocción, alimentos secos o precocinados y alimentos que han sufrido abusos de tiempo o temperatura. Incubación de 8 a 16 horas.',
          'Clostridium botulinum: conservas mal elaboradas, sobre todo verduras envasadas en casa, pescado fermentado y patatas asadas envueltas en papel de aluminio. Incubación de 12 a 72 horas.',
          'Bacillus cereus: carnes, guisos, salsas y crema de vainilla. El Centro de Seguridad Alimentaria de Hong Kong señala que su toxina emética «resiste un calentamiento a 126 °C durante 90 minutos».',
          'Staphylococcus aureus: carnes sin refrigerar o mal refrigeradas, ensaladilla de patata y de huevo, pasteles con crema. Incubación de 1 a 6 horas, la más corta de los patógenos habituales.',
          'Vibrio: marisco y pescado crudos o poco hechos, sobre todo bivalvos. V. parahaemolyticus incuba de 4 a 96 horas; V. vulnificus de 1 a 7 días, y las ostras son la fuente más citada.',
        ] },

        { heading: 'Infección o intoxicación: por qué recalentar a veces no sirve', body: ['Es la distinción que más merece la pena llevarse a la cocina. En una infección usted ingiere microorganismos vivos y enferma porque se multiplican en el intestino. En una intoxicación las bacterias ya han fabricado la toxina dentro del alimento; lo que usted ingiere es una sustancia química, y que el microorganismo siga vivo ha dejado de importar.', 'De esa distinción depende que recalentar salve la situación. Salmonella, Campylobacter y Listeria causan infecciones, y cocinar a fondo sirve de verdad: la Administración de Alimentos y Medicamentos de Taiwán fija el objetivo en una temperatura en el centro superior a 70 °C. La toxina emética de Bacillus cereus y la enterotoxina de Staphylococcus aureus no se dejan. El Centro de Seguridad Alimentaria de Hong Kong lo dice sin rodeos: estas toxinas «se forman durante la multiplicación de estas bacterias y no pueden eliminarse recalentando».', 'La consecuencia práctica: una sartén de arroz frito o un guiso que han pasado la tarde entera fuera de la nevera no se vuelven seguros por hervirlos otra vez. El hervor mata a la bacteria; no toca la toxina que ya dejó en la cazuela.'] },

        { heading: 'Parásitos y virus', body: ['El parásito con el que más gente se encuentra es Anisakis. El Ministerio de Agricultura, Silvicultura y Pesca de Japón cita entre los hospedadores habituales la caballa, el sanma, el jurel, la sardina, el lenguado, el bonito y el calamar, y afirma que congelar a −20 °C durante 24 horas o más lo mata, igual que cocinar hasta 60 °C en el centro durante al menos un minuto. Añade con claridad que «el vinagre, la sal, la salsa de soja y el wasabi no lo matan». Marinar no es un control de parásitos.', 'Toxoplasma gondii llega sobre todo por carne cruda o poco hecha de cerdo, cordero y caza. La FDA indica una temperatura interna de 71 °C (160 °F) y advierte de que los cuchillos, utensilios y tablas que han tocado carne cruda la transmiten igual de bien. El riesgo durante el embarazo es la razón por la que se trata aparte.', 'Los virus no se multiplican en los alimentos, y no lo necesitan: basta una dosis muy pequeña. La FDA da fuentes casi idénticas para el norovirus y la hepatitis A: frutas y hortalizas crudas, agua de bebida contaminada, alimentos crudos y alimentos cocinados que no se recalientan tras el contacto con un manipulador infectado, y bivalvos de aguas contaminadas. El norovirus incuba de 12 a 48 horas; la hepatitis A, 28 días de media. Contra esto la nevera no hace nada. Lo que hace algo es lavarse las manos y separar.'] },

        { heading: 'Mohos y micotoxinas', body: ['El moho visible es solo una parte del problema. La Organización Mundial de la Salud afirma que «la mayoría de las micotoxinas son químicamente estables y sobreviven al procesado de los alimentos», de modo que cortar la parte enmohecida y cocinar el resto no vuelve seguro el resto.', 'La FDA describe las aflatoxinas como «micotoxinas producidas por determinados mohos del género Aspergillus», y señala los cacahuetes, el maíz, los frutos secos de árbol —nueces de Brasil, pistachos— y algunos cereales menores como los más susceptibles. La patulina la producen «mohos de los géneros Penicillium, Aspergillus y Byssochylamys que crecen en frutas, cereales y quesos», con el zumo de manzana como principal preocupación, y la agencia es explícita: «la pasteurización no elimina la patulina». En casa el único control real está en la entrada: comprar cantidades pequeñas, guardar en seco y ventilado, y tirar la pieza entera cuando aparece moho en lugar de recortar una esquina.'] },

        { heading: 'Peligros químicos: las toxinas que el alimento ya trae', body: ['Algunas toxinas no son contaminación: forman parte de la planta o del pescado. Lo que sigue procede de la ficha de la OMS sobre toxinas naturales y del Centro de Seguridad Alimentaria de Hong Kong.'], bullets: [
          'Glucósidos cianogénicos: la OMS cita «la yuca, el sorgo, las frutas de hueso, las raíces de bambú y las almendras» como alimentos especialmente relevantes. Necesitan un procesado correcto —pelado, remojo, fermentación, cocción completa— antes de ser comestibles; crudos o mal procesados provocan intoxicaciones.',
          'Solanina y otros glicoalcaloides: la OMS indica que «se encuentran concentraciones más altas en los brotes de la patata y en la piel amarga y las partes verdes», y recomienda guardarlas en un lugar «oscuro, fresco y seco» para limitar su formación. Elimine brotes y zonas verdes, y deseche la patata entera si sabe amarga.',
          'Setas venenosas: la OMS no deja lugar a dudas: «cocinar o pelar no inactiva las toxinas». Nunca identifique setas silvestres solo por su aspecto.',
          'Histamina (escombrotoxina): el Centro de Seguridad Alimentaria de Hong Kong cita la caballa, la sardina, el atún y la anchoa como especies ricas en histidina. Con mal control de temperatura, la histidina descarboxilasa bacteriana la convierte en histamina, y aunque el calor «puede matar las bacterias productoras de histamina e inactivar las enzimas», «no puede destruir la histamina ya formada». El único control es una cadena de frío ininterrumpida a 4 °C o menos, o −18 °C en congelación.',
          'Ácido bongkrékico: la misma agencia lo describe como «una toxina termoestable producida por la bacteria Burkholderia gladioli pathovar cocovenenans», con crecimiento entre 30 y 37 °C y producción de toxina entre 22 y 30 °C. Los brotes recientes se relacionan con hongo negro en remojo durante más de dos días y con fideos de arroz frescos mantenidos a temperatura ambiente más de 24 horas. Remoje los hongos secos en la nevera y mantenga refrigerados los fideos de arroz frescos.',
          'Biotoxinas marinas: la OMS señala que «los moluscos como mejillones, vieiras y ostras tienen más probabilidades de contenerlas que los peces» y que «no tienen sabor ni olor y no se eliminan al cocinar ni al congelar».',
          'Lectinas de las legumbres crudas: la OMS advierte de que «bastan 4 o 5 alubias crudas para provocar dolor abdominal intenso, vómitos y diarrea», y de que las lectinas «se destruyen cuando las alubias secas se remojan al menos 12 horas y después se hierven vigorosamente al menos 10 minutos». Aquí la cocción larga a baja temperatura es la opción peligrosa, no la prudente.',
        ] },

        { heading: 'Peligros químicos: alérgenos, productos de limpieza y el envase equivocado', body: ['Los alérgenos son inofensivos para la mayoría y el peligro químico más inmediato que existe para quien los padece. Los nueve alérgenos principales reconocidos en EE. UU. son «leche, huevos, pescado, crustáceos, frutos secos de árbol, cacahuetes, trigo, soja y sésamo». La FDA define el contacto cruzado como «la introducción involuntaria de un alérgeno alimentario principal en un producto», por equipos compartidos, limpieza ineficaz o polvo y aerosoles que arrastran el alérgeno. La versión doméstica es el mismo cuchillo, la misma tabla, el mismo táper reutilizado y el recipiente destapado del estante de arriba goteando sobre el de abajo.', 'Hay dos vías químicas que se pasan por alto. La primera son los restos de detergentes y desinfectantes: no trasvase nunca productos de limpieza a envases de alimentos, y aclare y seque bien lo que los haya contenido. La segunda es el propio envase. La guía de análisis de peligros de la FDA cita los residuos de plaguicidas y antibióticos como peligros químicos, y la misma lógica vale para cualquier sustancia que migre al alimento sin tener por qué estar ahí: guarde la comida solo en recipientes aptos para uso alimentario, nunca en cubos, bidones o botellas que antes contuvieron otra cosa.'] },

        { heading: 'Peligros físicos', body: ['Los peligros físicos son cuerpos extraños en el alimento. La FDA los clasifica en términos amplios como «objetos afilados y riesgos de atragantamiento», capaces de causar «daños en la cavidad oral (por ejemplo, rotura de dientes o laceración de la boca o la garganta), laceración o perforación del tracto gastrointestinal y atragantamiento», y su guía de APPCC pone como ejemplos piedras, vidrio y metal. En la conservación doméstica las fuentes habituales son un tarro roto dentro de la nevera, virutas metálicas del abrelatas, fragmentos de envase y alambres de cierre, huesos y espinas que se pasaron por alto, y productos secos en los que han entrado plagas.', 'Aquí no hay finura posible. Si se rompe un recipiente de vidrio, deseche los alimentos sin envolver que estén cerca en lugar de intentar sacar las esquirlas, y guarde los productos secos en envases herméticos que revise de vez en cuando en busca de insectos o roeduras.'] },

        { heading: 'Los errores de conservación que sí son de riesgo', body: ['Ninguno de los siguientes es una cuestión de calidad. Todos son un camino hacia una enfermedad real.'], bullets: [
          'Enfriar despacio una tanda grande de comida cocinada. Es el guion clásico de Clostridium perfringens. El Centro de Seguridad Alimentaria de Hong Kong señala que sus esporas «no se destruyen a la temperatura normal de cocción», que el calor de la cocción activa su germinación mientras elimina a los competidores, y que «el enfriamiento lento de la comida cocinada da tiempo a que las bacterias crezcan hasta alcanzar un número elevado». Una olla grande de guiso, curri o salsa enfriándose tranquilamente en la encimera es exactamente ese guion. Reparta en recipientes pequeños y poco profundos, use un baño de hielo si hace falta y trabaje con los límites de esa agencia: de 60 °C a 20 °C en dos horas o menos, y de 20 °C a 4 °C en cuatro horas o menos.',
          'Una nevera por encima de 4 °C. La FDA recomienda 40 °F (4 °C) o menos en el frigorífico y 0 °F (−18 °C) en el congelador, y recuerda que «pocos mandos de frigorífico muestran la temperatura real», por lo que un termómetro independiente es la única forma de saberlo. La TFDA de Taiwán trabaja con menos de 7 °C y llama zona de peligro al intervalo de 7 a 60 °C; la FSA británica dice que «la nevera debe estar entre 0 y 5 °C». Unos grados no son un redondeo: Listeria es justamente el microorganismo que sigue creciendo a temperatura de refrigeración.',
          'Contaminación cruzada entre crudos y listos para consumo. La regla «separar» de la FDA pide «separar la carne, las aves, el pescado y los huevos crudos del resto de alimentos en el carro de la compra, en las bolsas y en el frigorífico», y no devolver nunca comida cocinada a una superficie que haya tenido productos crudos sin lavarla a fondo. La AESAN lleva la misma idea al interior de la nevera: la carne y el pescado crudos, envasados y en el estante inferior, para que el exudado no caiga sobre nada.',
          'Descongelar en la encimera. La FDA reconoce solo tres métodos seguros: «en el frigorífico, en agua fría y en el microondas», y lo descongelado en microondas debe cocinarse de inmediato. Sobre la encimera, la superficie de la pieza lleva mucho rato en la zona de peligro cuando el centro todavía está duro. La FSA británica añade que lo descongelado por completo debe usarse en 24 horas.',
          'Volver a congelar después de una descongelación completa. El criterio de la FDA es preciso: si el alimento «todavía contiene cristales de hielo o está a 40 °F o menos, es seguro volver a congelarlo o cocinarlo». Lo que se ha descongelado del todo y ha subido de temperatura, no. La versión de la FSA es que «puede volver a congelar el alimento una vez cocinado, pero después solo podrá recalentarlo una vez».',
          'Envasado al vacío y otros ambientes anaerobios. El Centro de Seguridad Alimentaria de Hong Kong explica que «al excluir o reducir mucho el oxígeno, estos métodos de envasado pueden impedir el crecimiento de muchos microorganismos alterantes y patógenos que necesitan oxígeno», que es justo la condición que prefiere Clostridium botulinum, y que «algunas cepas pueden crecer y producir toxinas a temperaturas tan bajas como 3 °C». Envasar al vacío no alarga por sí solo la vida útil refrigerada: cambia el tipo de riesgo, porque desaparece el aviso de alteración pero no el peligro. Una envasadora doméstica no es un permiso para guardar más tiempo, y siguen valiendo las condiciones y los plazos que indica el fabricante.',
          'Ajo o hierbas en aceite a temperatura ambiente. La Extensión de la Universidad Estatal de Ohio lo dice sin adornos: «cuando se ponen hierbas, ajo o tomate en aceite, las esporas presentes en el material vegetal pueden producir la toxina en la mezcla anaerobia de aceites aromatizados», y «la toxina botulínica no se ve, no se huele y no se saborea». El Centro Nacional de Conservación Doméstica de Alimentos de EE. UU. es tajante en el remedio: el ajo en aceite «debe prepararse en el momento y guardarse en el frigorífico a 40 °F o menos durante no más de 4 días», y congelarse si se quiere conservar más tiempo.',
          'Hacer conservas caseras de alimentos poco ácidos sin presión. Ese mismo centro traza la línea en el pH: «los alimentos ácidos tienen un pH de 4,6 o inferior», y los poco ácidos están por encima. C. botulinum necesita un alimento húmedo y poco ácido, una temperatura entre 40 y 120 °F y menos del 2 % de oxígeno, y un tarro cerrado de verduras ofrece las tres cosas a la vez. Por eso los alimentos poco ácidos deben procesarse «a temperaturas de 240 a 250 °F, alcanzables con autoclaves domésticas que operen a 10-15 PSIG»; conseguir la misma letalidad en un baño de agua hirviendo «lleva de 7 a 11 horas» y no es una opción practicable. La Extensión de Ohio recomienda hervir las conservas caseras poco ácidas antes de comerlas: 10 minutos por debajo de los 1.000 pies de altitud y 20 minutos en el resto de los casos.',
          'Fiarse de la fecha en lugar del historial de temperatura. La guía del Gobierno británico es clara: «las fechas de caducidad se refieren a la seguridad del alimento, mientras que las de consumo preferente se refieren a la calidad», y «comer alimentos después de la fecha de caducidad puede hacerle enfermar». Lo contrario también vale: que la fecha no haya pasado no dice nada sobre si el paquete estuvo dos horas en un coche caliente. La regla de las dos horas de la FDA es el contrapeso: nunca deje más de dos horas a temperatura ambiente un alimento que necesita refrigeración, o una hora si se superan los 90 °F (32 °C).',
          'Juzgar por el aspecto después de un corte de luz. La FDA da cifras: un frigorífico sin abrir «mantiene la comida fría unas 4 horas»; un congelador lleno, «aproximadamente 48 horas (24 horas si está a media carga)». Deseche los alimentos perecederos refrigerados «que hayan estado a más de 40 °F durante 4 horas o más».',
        ] },

        { heading: 'Tiempo y temperatura: las cifras reales', body: ['Las cifras nacionales no coinciden exactamente. Preferimos exponer las diferencias antes que elegir una en silencio.'], bullets: [
          'Zona de peligro: la TFDA de Taiwán usa 7-60 °C; la AESAN, 5-60 °C. Significan lo mismo: es la franja en la que los patógenos se multiplican más deprisa.',
          'Refrigeración: FDA y Salud Canadá, 4 °C (40 °F) o menos; FSA británica, 0-5 °C; TFDA de Taiwán, por debajo de 7 °C. Bajo la normativa europea la AESAN es más estricta por producto: carne picada a 2 °C o menos, despojos a 3 °C, aves a 4 °C y productos de la pesca frescos a una temperatura próxima a la de fusión del hielo (0-4 °C).',
          'Congelación: FDA, Salud Canadá y AESAN coinciden en −18 °C (0 °F) o menos; la FSA dice que el congelador «debe estar en torno a −18 °C».',
          'Mantenimiento en caliente: tanto el CFS de Hong Kong como la TFDA de Taiwán indican más de 60 °C.',
          'Cocción: la TFDA de Taiwán pide más de 70 °C en el centro; el CFS de Hong Kong, al menos 75 °C en el centro al recalentar sobras; la FDA, 71 °C (160 °F) para la carne con riesgo de Toxoplasma.',
          'La regla de las dos horas: FDA, no más de dos horas a temperatura ambiente para alimentos que necesitan frío, y una hora por encima de 90 °F (32 °C). El equivalente de la FSA es «enfriar la comida cocinada a temperatura ambiente y meterla en la nevera en una o dos horas».',
        ] },

        { heading: 'Congelar no es esterilizar', body: ['La FDA escribe que «los alimentos se mantendrán seguros indefinidamente en el congelador, aunque su calidad y sabor puedan verse afectados». Esa frase se lee a menudo como si congelar matara algo. La FSA completa el cuadro: el congelador «funciona como un botón de pausa» y «las bacterias no han muerto y pueden reactivarse a medida que el alimento se descongela».', 'Merece la pena guardar dos excepciones. Congelar sí mata los parásitos del pescado —el ministerio japonés fija −20 °C durante 24 horas o más—, aunque la FDA advierte de que «congelar no mata todos los gérmenes dañinos». Y Listeria sobrevive a la congelación sin más. Por eso, salvo un puñado de excepciones, las cifras de congelador de este sitio describen calidad, no un límite de seguridad.'] },

        { heading: 'Qué parte del APPCC sirve en casa', body: ['Los siete principios, tal como los enuncia la FDA, son: realizar un análisis de peligros; determinar los puntos críticos de control; establecer límites críticos; establecer procedimientos de vigilancia; establecer medidas correctoras; establecer procedimientos de verificación; y establecer procedimientos de registro y documentación. Un punto crítico de control es «una fase en la que puede aplicarse un control y que es esencial para prevenir o eliminar un peligro para la seguridad alimentaria o reducirlo a un nivel aceptable»; un límite crítico es «un valor máximo y/o mínimo al que debe controlarse un parámetro biológico, químico o físico en un PCC».', 'Los cinco primeros tienen equivalente doméstico honesto. Los dos últimos —verificación formal y registros— son práctica industrial, y no tiene sentido fingir lo contrario: nadie audita su cocina y usted no necesita tres años de hojas de control. El esfuerzo va en los cinco primeros.'], bullets: [
          'Análisis de peligros: mire lo que acaba de comprar y decida qué es carne cruda, pescado, comida lista para consumo u hongo rehidratado. Eso es lo de alto riesgo.',
          'Puntos críticos y límites: en casa se reducen a cuatro cifras —nevera a 4 °C o menos, congelador a −18 °C o menos, no más de dos horas a temperatura ambiente y más de 70 °C en el centro al cocinar. Las Cinco Claves de la OMS son lo mismo en lenguaje llano: mantener la limpieza; separar alimentos crudos y cocinados; cocinar completamente; mantener los alimentos a temperaturas seguras; usar agua y materias primas seguras. El ministerio japonés lo comprime aún más: no contaminar, no dejar que se multipliquen, eliminarlas. Las cinco reglas de Taiwán son: lavarse las manos, comprar fresco, separar crudo de cocinado, cocinar a fondo y vigilar la temperatura de conservación.',
          'Vigilancia: un termómetro de frigorífico. La FDA dice sin rodeos que casi ningún mando muestra la temperatura real, de modo que solo un termómetro independiente se la dirá. Añada una sonda para la cocción y su vigilancia está completa.',
          'Medidas correctoras: decida de antemano qué hará cuando la temperatura falle. Tras un corte de luz de más de cuatro horas, o una nevera que ha pasado más de cuatro horas por encima de 4 °C, la respuesta es tirar, no olerlo y confiar.',
        ] },

        { heading: 'Ante la duda, tírelo', body: ['La mayoría de los plazos de este sitio indican calidad óptima, no un límite absoluto de inocuidad. Los peligros de esta página son otra cosa. La toxina botulínica no se ve ni se huele, la histamina y el ácido bongkrékico resisten la cocción, y Listeria sigue creciendo dentro de la nevera. Nada de esto lo detectan los sentidos.', 'Así que haga las preguntas en el orden correcto: primero el historial de temperatura —a cuántos grados y durante cuánto tiempo— y solo después el aspecto y el olor. Un envase al vacío hinchado, una lata abombada o un recipiente hermético que silba o huele mal al abrirse van a la basura sin cata previa. Esta página ofrece información general de seguridad alimentaria y no constituye consejo médico.'] },

        { heading: 'Fuentes', body: ['Cada afirmación de esta página procede de alguno de los documentos siguientes, todos ellos consultados directamente.'], bullets: [
          'OMS — ficha informativa «Food safety»: https://www.who.int/news-room/fact-sheets/detail/food-safety',
          'OMS — ficha informativa «Natural toxins in food»: https://www.who.int/news-room/fact-sheets/detail/natural-toxins-in-food',
          'OMS — «Five Keys to Safer Food Manual»: https://www.who.int/publications/i/item/9789241594639',
          'FDA — What You Need to Know About Foodborne Illnesses: https://www.fda.gov/food/consumers/what-you-need-know-about-foodborne-illnesses',
          'FDA — Refrigerator Thermometers: Cold Facts about Food Safety: https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety',
          'FDA — Safe Food Handling: https://www.fda.gov/food/buy-store-serve-safe-food/safe-food-handling',
          'FDA — Listeria (Listeriosis): https://www.fda.gov/food/foodborne-pathogens/listeria-listeriosis',
          'FDA — Selecting and Serving Fresh and Frozen Seafood Safely: https://www.fda.gov/food/buy-store-serve-safe-food/selecting-and-serving-fresh-and-frozen-seafood-safely',
          'FDA — Toxoplasma (Food Safety for Moms-to-Be): https://www.fda.gov/food/people-risk-foodborne-illness/toxoplasma-food-safety-moms-be',
          'FDA — Mycotoxins: https://www.fda.gov/food/natural-toxins-food/mycotoxins',
          'FDA — Food Allergies: https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/food-allergies',
          'FDA — Food and Water Safety During Power Outages and Floods: https://www.fda.gov/food/buy-store-serve-safe-food/food-and-water-safety-during-power-outages-and-floods',
          'FDA — HACCP Principles & Application Guidelines: https://www.fda.gov/food/hazard-analysis-critical-control-point-haccp/haccp-principles-application-guidelines',
          'FDA — Physical Contaminants: https://www.fda.gov/animal-veterinary/biological-chemical-and-physical-contaminants-animal-food/physical-contaminants',
          'National Center for Home Food Preservation — Ensuring Safe Canned Foods: https://nchfp.uga.edu/how/can/general-information/ensuring-safe-canned-foods/',
          'National Center for Home Food Preservation — Freezing Garlic-in-Oil: https://nchfp.uga.edu/how/freeze/vegetable/freezing-garlic-in-oil/',
          'Ohio State University Extension HYG-5567 — Botulism: What You Don\'t See or Smell Can Still Hurt You: https://ohioline.osu.edu/factsheet/HYG-5567-11',
          'Centro de Seguridad Alimentaria de Hong Kong — Heat-stable Toxins from Bacillus cereus and Staphylococcus aureus: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_193_01.html',
          'Centro de Seguridad Alimentaria de Hong Kong — Bacillus cereus in Processed Food: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_97_01.html',
          'Centro de Seguridad Alimentaria de Hong Kong — Clostridium perfringens: A Threat to Food Safety: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_212_02.html',
          'Centro de Seguridad Alimentaria de Hong Kong — Histamine in Fish and Fish Products: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_150_02.html',
          'Centro de Seguridad Alimentaria de Hong Kong — Botulism and Vacuum Packed Food: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsf_46_01.html',
          'Centro de Seguridad Alimentaria de Hong Kong — Boletín de seguridad alimentaria n.º 98, sobre el ácido bongkrékico: https://www.cfs.gov.hk/english/multimedia/multimedia_pub/multimedia_pub_fsb_202403.html',
          'Food Standards Agency / GOV.UK — How to chill, freeze and defrost food safely: https://www.gov.uk/government/publications/how-to-chill-freeze-and-defrost-food-safely/how-to-chill-freeze-and-defrost-food-safely',
          'GOV.UK — Understanding food labelling: best before and use-by dates: https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates',
          'Salud Canadá — Safe food storage: https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-food-storage.html',
          'Administración de Alimentos y Medicamentos de Taiwán — preguntas frecuentes sobre intoxicaciones alimentarias: https://www.fda.gov.tw/TC/sitecontent.aspx?sid=2572',
          'Ministerio de Salud y Bienestar de Taiwán — las cinco reglas para prevenir intoxicaciones alimentarias: https://www.mohw.gov.tw/cp-16-27406-1.html',
          'Ministerio de Agricultura, Silvicultura y Pesca de Japón — Anisakis: https://www.maff.go.jp/j/syouan/seisaku/foodpoisoning/f_encyclopedia/anisakis.html',
          'Ministerio de Salud, Trabajo y Bienestar de Japón — intoxicaciones alimentarias: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/syokuchu/index.html',
          'AESAN — Higiene de los alimentos: https://www.aesan.gob.es/seguridad-alimentaria/higiene-alimentos',
        ] },
      ],
    },
  },

  privacy: {
    zh: {
      title: '隱私權政策',
      description: '本站如何處理你的資料、使用哪些第三方服務，以及你可以如何選擇。',
      sections: [
        { body: ['最後更新：2026 年 9 月。'] },
        { heading: '我們收集什麼', body: ['本站不要求註冊，也不會請你填寫姓名、電子郵件或任何個人身分資訊。搜尋功能完全在你的瀏覽器中執行，搜尋內容不會傳送到我們的伺服器，也不會被記錄。'] },
        { heading: 'Cookie 與第三方服務', body: ['本站使用 Google AdSense 投放廣告。Google 及其合作夥伴可能會使用 Cookie 或類似技術，根據你先前造訪本站或其他網站的紀錄，向你顯示廣告。第三方供應商使用 Cookie 的行為，適用其各自的隱私權政策。', '本站可能使用 Google Analytics 了解流量狀況（例如哪些頁面較常被閱讀）。這類資料為彙總統計，不用於識別個人。', '網站託管於 Vercel，伺服器基於安全與維運目的可能保留標準存取紀錄，例如 IP 位址與瀏覽器類型。'] },
        { heading: '你的選擇', body: ['你可以造訪 Google 廣告設定（adssettings.google.com）停用個人化廣告，或造訪 aboutads.info 停用參與該計畫的第三方供應商 Cookie。', '你也可以在瀏覽器中封鎖或刪除 Cookie。這麼做不影響本站主要功能的使用。', '若你位於歐洲經濟區、英國或其他適用地區，我們會透過符合規範的同意管理機制取得廣告 Cookie 的同意。'] },
        { heading: '兒童隱私', body: ['本站並非以未滿 13 歲的兒童為對象，也不會刻意收集其個人資料。'] },
        { heading: '政策變更與聯絡', body: [`本政策如有更新，會直接修改本頁內容與更新日期。有任何隱私相關問題，請聯絡 ${CONTACT_EMAIL}。`] },
      ],
    },
    en: {
      title: 'Privacy policy',
      description: 'How this site handles your data, which third-party services it uses and what choices you have.',
      sections: [
        { body: ['Last updated: September 2026.'] },
        { heading: 'What we collect', body: ['This site requires no account and never asks for your name, email address or any other personally identifying information. Search runs entirely in your browser; what you type is not sent to us and is not logged.'] },
        { heading: 'Cookies and third-party services', body: ['We use Google AdSense to serve advertising. Google and its partners may use cookies or similar technologies to show ads based on your prior visits to this or other websites. Third-party vendors\' use of cookies is governed by their own privacy policies.', 'We may use Google Analytics to understand traffic, for example which pages are read most. That data is aggregated and is not used to identify individuals.', 'The site is hosted on Vercel, whose servers may retain standard access logs such as IP address and browser type for security and operational purposes.'] },
        { heading: 'Your choices', body: ['You can opt out of personalised advertising at Google Ads Settings (adssettings.google.com), or opt out of third-party vendor cookies at aboutads.info.', 'You can also block or delete cookies in your browser. Doing so does not affect the main functions of this site.', 'If you are in the European Economic Area, the UK or another applicable region, consent for advertising cookies is collected through a compliant consent management mechanism.'] },
        { heading: 'Children\'s privacy', body: ['This site is not directed at children under 13 and we do not knowingly collect personal information from them.'] },
        { heading: 'Changes and contact', body: [`If this policy changes we will update this page and its date. For privacy questions, contact ${CONTACT_EMAIL}.`] },
      ],
    },
    ja: {
      title: 'プライバシーポリシー',
      description: '当サイトでの情報の扱い、利用している第三者サービス、利用者が選べる設定について説明します。',
      sections: [
        { body: ['最終更新：2026 年 9 月'] },
        { heading: '取得する情報', body: ['当サイトは会員登録を必要とせず、氏名・メールアドレスなどの個人を特定できる情報をお尋ねすることはありません。検索機能はすべてブラウザ内で動作し、入力内容が当方のサーバーに送信されることも、記録されることもありません。'] },
        { heading: 'Cookie と第三者サービス', body: ['当サイトは広告配信に Google AdSense を利用しています。Google および提携事業者は、Cookie などの技術を用いて、利用者の当サイトや他サイトへの過去のアクセス情報にもとづく広告を表示することがあります。第三者事業者による Cookie の利用には、各社のプライバシーポリシーが適用されます。', 'アクセス状況の把握（よく読まれているページなど）のため、Google Analytics を利用する場合があります。取得するのは統計的な情報で、個人の特定には使用しません。', 'サイトは Vercel でホスティングしており、セキュリティおよび運用のため、IP アドレスやブラウザの種類といった標準的なアクセスログが保存されることがあります。'] },
        { heading: '利用者の選択', body: ['Google の広告設定（adssettings.google.com）でパーソナライズ広告を無効にできます。また aboutads.info から、参加事業者の Cookie を無効にできます。', 'ブラウザの設定で Cookie を拒否・削除することもできます。その場合でも当サイトの主な機能はご利用いただけます。', '欧州経済領域、英国など対象地域からのアクセスについては、規制に適合した同意取得の仕組みを通じて広告 Cookie の同意を取得します。'] },
        { heading: '子どものプライバシー', body: ['当サイトは 13 歳未満の子どもを対象としておらず、意図的に個人情報を取得することはありません。'] },
        { heading: '変更と連絡先', body: [`本ポリシーを変更する場合は、このページと更新日を改めます。プライバシーに関するお問い合わせは ${CONTACT_EMAIL} までご連絡ください。`] },
      ],
    },
    es: {
      title: 'Política de privacidad',
      description: 'Cómo trata este sitio tus datos, qué servicios de terceros utiliza y qué opciones tienes.',
      sections: [
        { body: ['Última actualización: septiembre de 2026.'] },
        { heading: 'Qué recogemos', body: ['Este sitio no requiere cuenta y nunca pide tu nombre, correo electrónico ni ningún otro dato que te identifique. La búsqueda funciona íntegramente en tu navegador: lo que escribes no se envía a nuestros servidores ni se registra.'] },
        { heading: 'Cookies y servicios de terceros', body: ['Usamos Google AdSense para mostrar publicidad. Google y sus socios pueden usar cookies o tecnologías similares para mostrar anuncios basados en tus visitas anteriores a este u otros sitios. El uso de cookies por parte de proveedores externos se rige por sus propias políticas de privacidad.', 'Podemos usar Google Analytics para conocer el tráfico, por ejemplo qué páginas se leen más. Esos datos son agregados y no se usan para identificar a personas.', 'El sitio está alojado en Vercel, cuyos servidores pueden conservar registros de acceso estándar, como la dirección IP y el tipo de navegador, por motivos de seguridad y operación.'] },
        { heading: 'Tus opciones', body: ['Puedes desactivar la publicidad personalizada en la configuración de anuncios de Google (adssettings.google.com) o rechazar las cookies de proveedores externos en aboutads.info.', 'También puedes bloquear o borrar cookies desde tu navegador. Hacerlo no afecta a las funciones principales del sitio.', 'Si te encuentras en el Espacio Económico Europeo, el Reino Unido u otra región aplicable, el consentimiento para las cookies publicitarias se recoge mediante un mecanismo de gestión del consentimiento conforme a la normativa.'] },
        { heading: 'Privacidad de menores', body: ['Este sitio no se dirige a menores de 13 años y no recogemos conscientemente su información personal.'] },
        { heading: 'Cambios y contacto', body: [`Si esta política cambia, actualizaremos esta página y su fecha. Para consultas de privacidad, escribe a ${CONTACT_EMAIL}.`] },
      ],
    },
  },

  terms: {
    zh: {
      title: '使用條款',
      description: '使用本站內容的條件、免責聲明與資料授權說明。',
      sections: [
        { body: ['最後更新：2026 年 9 月。使用本網站即表示你同意以下條款。'] },
        { heading: '內容性質', body: ['本站提供一般性的食物保存與食品安全資訊，供教育與參考用途。內容不構成醫療、營養或法律建議，也不能取代專業人員的判斷。', '所有保存期限均為在良好保存條件下的品質參考範圍，不是安全保證。實際可食用與否，取決於食材本身的狀態、你的冰箱溫度、包裝方式與處理過程。'] },
        { heading: '免責聲明', body: ['我們盡力確保資料正確並標示來源，但不對內容的完整性、即時性或適用性作出保證。對於因使用或依賴本站內容而產生的任何損失或損害，本站不承擔責任。', '若你對某項食材是否安全有疑慮，請遵循一個簡單原則：有疑慮就丟掉（When in doubt, throw it out）。'] },
        { heading: '資料授權', body: ['本站的保存期限資料主要衍生自 USDA FSIS FoodKeeper 資料集，該資料為美國政府著作，屬公眾領域。', '本站自行撰寫的說明文字、指南文章、翻譯與網站程式碼，著作權歸本站所有。歡迎在標示出處並連結回本站的前提下引用少量內容；未經同意，請勿大量重製或建立鏡像站。'] },
        { heading: '第三方連結與廣告', body: ['本站包含指向第三方網站的連結與由 Google 提供的廣告。我們無法控制這些外部內容，對其正確性或做法不負責任。'] },
        { heading: '條款變更', body: [`本條款可能不定期更新，更新後即時生效。有疑問請聯絡 ${CONTACT_EMAIL}。`] },
      ],
    },
    en: {
      title: 'Terms of use',
      description: 'The conditions for using this site, the disclaimer and how the underlying data is licensed.',
      sections: [
        { body: ['Last updated: September 2026. By using this site you agree to the terms below.'] },
        { heading: 'Nature of the content', body: ['This site provides general food-storage and food-safety information for education and reference. It is not medical, nutritional or legal advice and does not replace professional judgement.', 'All storage times are quality guidance for food held in good conditions, not a safety guarantee. Whether something is actually still good depends on the food itself, your refrigerator temperature, the packaging and how it has been handled.'] },
        { heading: 'Disclaimer', body: ['We work to keep the data accurate and sourced, but make no warranty as to completeness, currency or fitness for a particular purpose. We accept no liability for loss or damage arising from use of or reliance on this site.', 'If you are unsure whether a food is safe, follow the simple rule: when in doubt, throw it out.'] },
        { heading: 'Data licensing', body: ['The storage timelines are largely derived from the USDA FSIS FoodKeeper dataset, a U.S. Government Work in the public domain.', 'The explanatory text, guide articles, translations and site code are our copyright. You are welcome to quote short passages with attribution and a link back. Please do not bulk-copy the content or create mirror sites without permission.'] },
        { heading: 'Third-party links and advertising', body: ['This site contains links to third-party websites and advertising served by Google. We do not control that external content and are not responsible for its accuracy or practices.'] },
        { heading: 'Changes to these terms', body: [`These terms may be updated from time to time and take effect when published. Questions: ${CONTACT_EMAIL}.`] },
      ],
    },
    ja: {
      title: '利用規約',
      description: '当サイトの利用条件、免責事項、データのライセンスについて。',
      sections: [
        { body: ['最終更新：2026 年 9 月。当サイトを利用された時点で、以下の条件に同意したものとみなします。'] },
        { heading: 'コンテンツの性質', body: ['当サイトは、教育および参考を目的とした一般的な食品保存・食品安全の情報を提供します。医学的、栄養学的、法的な助言ではなく、専門家の判断に代わるものではありません。', '掲載している保存期間は、良好な条件で保存した場合の品質の目安であり、安全の保証ではありません。実際に食べられるかどうかは、食材の状態、冷蔵庫の温度、包装、取り扱いによって変わります。'] },
        { heading: '免責事項', body: ['正確な情報と出典の明示に努めていますが、内容の完全性、最新性、特定目的への適合性を保証するものではありません。当サイトの利用または情報への依拠によって生じた損害について、当方は責任を負いません。', '安全かどうか判断に迷う場合は、シンプルな原則に従ってください。迷ったら捨てる、です。'] },
        { heading: 'データのライセンス', body: ['保存期間データの大部分は、米国政府著作物であるパブリックドメインの USDA FSIS FoodKeeper データセットに由来します。', '解説文、ガイド記事、翻訳、サイトのソースコードの著作権は当サイトに帰属します。出典の明示と当サイトへのリンクを条件に、短い引用は歓迎します。無断での大量複製やミラーサイトの作成はご遠慮ください。'] },
        { heading: '外部リンクと広告', body: ['当サイトには外部サイトへのリンクと、Google が配信する広告が含まれます。これらの外部コンテンツを当方は管理しておらず、その正確性や運用について責任を負いません。'] },
        { heading: '規約の変更', body: [`本規約は随時更新されることがあり、掲載時点から効力を生じます。ご不明な点は ${CONTACT_EMAIL} までお問い合わせください。`] },
      ],
    },
    es: {
      title: 'Términos de uso',
      description: 'Condiciones de uso del sitio, aviso de responsabilidad y licencia de los datos.',
      sections: [
        { body: ['Última actualización: septiembre de 2026. Al usar este sitio aceptas las condiciones siguientes.'] },
        { heading: 'Naturaleza del contenido', body: ['Este sitio ofrece información general de conservación y seguridad alimentaria con fines educativos y de consulta. No es consejo médico, nutricional ni jurídico, y no sustituye el criterio profesional.', 'Todos los plazos son orientaciones de calidad para alimentos conservados en buenas condiciones, no una garantía de inocuidad. Que algo siga estando bien depende del propio alimento, de la temperatura de tu nevera, del envase y de cómo se haya manipulado.'] },
        { heading: 'Aviso de responsabilidad', body: ['Trabajamos para mantener los datos exactos y con fuentes, pero no garantizamos su exhaustividad, actualidad ni idoneidad para un fin concreto. No asumimos responsabilidad por pérdidas o daños derivados del uso de este sitio o de la confianza en su contenido.', 'Si dudas de si un alimento es seguro, aplica la regla sencilla: ante la duda, tíralo.'] },
        { heading: 'Licencia de los datos', body: ['Los plazos de conservación derivan en gran parte del conjunto de datos FoodKeeper del USDA FSIS, obra del Gobierno de EE. UU. en dominio público.', 'Los textos explicativos, las guías, las traducciones y el código del sitio son propiedad intelectual nuestra. Puedes citar fragmentos breves indicando la fuente y enlazando de vuelta. No copies el contenido de forma masiva ni crees sitios espejo sin permiso.'] },
        { heading: 'Enlaces externos y publicidad', body: ['Este sitio contiene enlaces a webs de terceros y publicidad servida por Google. No controlamos ese contenido externo ni respondemos de su exactitud o de sus prácticas.'] },
        { heading: 'Cambios en los términos', body: [`Estos términos pueden actualizarse y entran en vigor al publicarse. Para consultas: ${CONTACT_EMAIL}.`] },
      ],
    },
  },

  contact: {
    zh: {
      title: '聯絡我們',
      description: '回報錯誤、建議新增食材或洽談合作。',
      sections: [
        { body: [`最直接的方式是寄信到 ${CONTACT_EMAIL}，我們通常會在幾個工作天內回覆。`] },
        { heading: '回報資料錯誤', body: ['如果你發現某個保存期限與官方資料不符，請在信中附上食材頁面的網址，以及你認為正確的來源連結（政府機關、大學或學術文獻優先）。我們會核對後更新，並在該頁面標示更新日期。'] },
        { heading: '建議新增食材', body: ['我們特別歡迎台灣、日本與西語地區的在地食材建議，這正是既有國際資料庫最缺的部分。如果你知道有可靠的官方保存指引，一併附上會加快處理速度。'] },
        { heading: '合作與授權', body: ['關於內容授權、資料引用或商業合作，請來信說明用途與規模。'] },
      ],
    },
    en: {
      title: 'Contact',
      description: 'Report an error, suggest a food to add, or discuss working together.',
      sections: [
        { body: [`The most direct route is email: ${CONTACT_EMAIL}. We usually reply within a few working days.`] },
        { heading: 'Reporting a data error', body: ['If a storage time contradicts official guidance, include the URL of the food page and a link to the source you believe is correct. Government agencies, universities and academic literature carry the most weight. We check, update and date the page.'] },
        { heading: 'Suggesting a food', body: ['Suggestions for foods common in Taiwan, Japan and the Spanish-speaking world are especially welcome, since that is exactly where existing international databases are thinnest. If you know of official storage guidance for it, sending the link speeds things up a lot.'] },
        { heading: 'Licensing and partnerships', body: ['For content licensing, data reuse or commercial enquiries, write in with the intended use and scale.'] },
      ],
    },
    ja: {
      title: 'お問い合わせ',
      description: '誤りのご指摘、掲載してほしい食材のご提案、協業のご相談。',
      sections: [
        { body: [`もっとも確実なのはメールです。${CONTACT_EMAIL} までご連絡ください。通常、数営業日以内に返信します。`] },
        { heading: 'データの誤りについて', body: ['保存期間が公的な情報と異なる場合は、該当する食材ページの URL と、正しいと思われる出典のリンクを添えてご連絡ください。行政機関、大学、学術文献の情報を優先して確認します。確認後にページを更新し、更新日を表示します。'] },
        { heading: '食材の追加リクエスト', body: ['台湾、日本、スペイン語圏でよく使われる食材のご提案は特に歓迎します。既存の国際データベースがもっとも手薄な領域だからです。公的な保存の目安をご存じであれば、リンクを添えていただけると対応が早くなります。'] },
        { heading: '利用許諾・協業', body: ['コンテンツの利用許諾、データの二次利用、商業的なご相談は、用途と規模を添えてご連絡ください。'] },
      ],
    },
    es: {
      title: 'Contacto',
      description: 'Informa de un error, sugiere un alimento o propón una colaboración.',
      sections: [
        { body: [`La vía más directa es el correo: ${CONTACT_EMAIL}. Solemos responder en unos días laborables.`] },
        { heading: 'Informar de un error', body: ['Si un plazo contradice las guías oficiales, incluye la dirección de la ficha del alimento y un enlace a la fuente que consideres correcta. Damos más peso a organismos públicos, universidades y literatura académica. Lo verificamos, lo actualizamos y fechamos la página.'] },
        { heading: 'Sugerir un alimento', body: ['Nos interesan especialmente los alimentos habituales en Taiwán, Japón y el mundo hispanohablante, que es justo donde las bases de datos internacionales flojean. Si conoces una guía oficial de conservación, enviar el enlace acelera mucho el proceso.'] },
        { heading: 'Licencias y colaboraciones', body: ['Para licencias de contenido, reutilización de datos o consultas comerciales, escríbenos indicando el uso previsto y su alcance.'] },
      ],
    },
  },
};

export function getStaticPage(key: PageKey, locale: Locale): StaticPage {
  return P[key][locale];
}

export const STATIC_PAGE_KEYS: PageKey[] = ['about', 'contact', 'privacy', 'terms', 'methodology', 'food-safety'];
export type { PageKey };
