import type { Locale } from './i18n';
import { CONTACT_EMAIL } from './site';

export type StaticPage = {
  title: string;
  description: string;
  sections: { heading?: string; body: string[] }[];
};

type PageKey = 'about' | 'contact' | 'privacy' | 'terms' | 'methodology';

const P: Record<PageKey, Record<Locale, StaticPage>> = {
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
      description: '本站保存期限的資料來源、處理方式、更新頻率與已知限制。',
      sections: [
        { heading: '主要資料來源', body: ['保存期限的主幹是美國農業部食品安全檢驗局（USDA FSIS）發布的 FoodKeeper 資料集。這份資料由 USDA、康乃爾大學食品科學系與美國食品工業協會（FMI）共同編製，公開於 data.gov，屬於公眾領域（U.S. Government Work），可自由重製與改作。', '我們使用的版本為 FMA-Data-v128，收錄 660 餘項食品，每項包含常溫、冷藏、冷凍三種環境下的期限，並區分「一般期限」「自購買日起」「開封後」「解凍後」四種計算基準。'] },
        { heading: '安全原則的依據', body: ['溫度與時間的安全原則，採用各國食品安全主管機關的公開指引，主要包括：美國 FDA 與 FSIS、美國疾病管制與預防中心（CDC）、FoodSafety.gov、世界衛生組織「食品安全五要點」、英國食品標準局（FSA）、台灣衛生福利部食品藥物管理署、日本消費者庁與厚生労働省、西班牙 AESAN、香港食物安全中心。', '各國標準不完全一致時，我們會在該語言版本中明確說明差異，而不是只挑一個講。例如冷藏溫度，美國建議 4°C 以下，台灣食藥署慣用 7°C 以下，日本食品衛生法規對「冷蔵」的定義是 10°C 以下。'] },
        { heading: '額外收錄的食材', body: ['FoodKeeper 以美國飲食為主，缺少許多亞洲與西語地區的常見食材。這類食材我們另行查證，優先順序為：各國政府食品安全機關 → 大學推廣單位（如加州大學戴維斯分校採後技術中心）→ 同行審查文獻 → 具公信力的產業協會。每一項都在該食材頁面列出實際使用的來源連結。', '若確實找不到可靠來源，我們會採用性質最接近的 FoodKeeper 品項作為類比，並明確標示這是類比推估，而不是假裝有出處。'] },
        { heading: '期限代表什麼', body: ['除了少數例外，資料中的期限指的是「最佳品質」期間，不是安全的絕對界線。冷凍食品在 −18°C 下持續保存，就微生物安全而言可以無限期保存，期限反映的是風味與質地的下降。', '相對地，冷藏的生鮮肉品、海鮮與熟食，期限同時具有安全意義，超過建議天數就不應冒險食用。'] },
        { heading: '更新與勘誤', body: ['USDA 更新 FoodKeeper 資料集時，我們會重新匯入並比對差異。內容頁面若有修正，會更新頁面上的日期。', `如果你發現與官方資料不符之處，請寄信到 ${CONTACT_EMAIL}，附上你認為正確的來源，我們會核對後修正。`] },
        { heading: '已知限制', body: ['資料以家庭儲存情境為前提，假設冰箱維持在 4°C 以下、冷凍庫維持在 −18°C。頻繁開關冰箱、塞太滿、停電或運送過程的溫度波動，都會縮短實際可保存的時間。', '不同國家的加工方式、包裝與法規也會造成差異，例如蛋是否經過清洗會直接影響是否需要冷藏。這類差異我們會在相關頁面說明。'] },
      ],
    },
    en: {
      title: 'Sources & method',
      description: 'Where our storage times come from, how they are processed, how often they are updated and what the known limitations are.',
      sections: [
        { heading: 'Primary data source', body: ['Storage times are built on the FoodKeeper dataset published by the USDA Food Safety and Inspection Service. It was developed by the USDA with Cornell University\'s Department of Food Science and the Food Marketing Institute, is published on data.gov and is in the public domain as a U.S. Government Work, so it may be reused and adapted freely.', 'We use version FMA-Data-v128, which covers just over 660 products. Each carries pantry, refrigerator and freezer timelines, split into general, from date of purchase, after opening and after thawing.'] },
        { heading: 'Basis for the safety principles', body: ['Time and temperature principles follow published guidance from national food-safety authorities, chiefly: the US FDA and FSIS, the CDC, FoodSafety.gov, the WHO Five Keys to Safer Food, the UK Food Standards Agency, Taiwan\'s Food and Drug Administration, Japan\'s Consumer Affairs Agency and Ministry of Health, Spain\'s AESAN and the Hong Kong Centre for Food Safety.', 'Where national guidance differs, we say so in that language rather than silently picking one. Refrigeration is a good example: the US recommends 4 °C (40 °F) or below, Taiwan\'s TFDA commonly cites 7 °C, and Japanese food hygiene rules define 冷蔵 as 10 °C or below.'] },
        { heading: 'Foods we added ourselves', body: ['FoodKeeper reflects an American diet and omits many staples of Asian and Spanish-speaking kitchens. For those we research separately, in this order of preference: national food-safety agencies, then university extension services such as the UC Davis Postharvest Technology Center, then peer-reviewed literature, then established industry bodies. Each such food lists the sources actually used on its own page.', 'Where no reliable source exists, we fall back to the closest FoodKeeper analogue and label it as an analogue rather than pretending there is a citation.'] },
        { heading: 'What the timelines mean', body: ['With few exceptions the times indicate best quality, not an absolute safety cut-off. Food held continuously at −18 °C (0 °F) stays microbiologically safe indefinitely; the freezer timelines describe the decline in flavour and texture.', 'Refrigerated raw meat, seafood and prepared dishes are the exception: there the timeline carries a genuine safety meaning and should not be stretched.'] },
        { heading: 'Updates and corrections', body: ['When the USDA revises FoodKeeper we re-import the dataset and diff it against ours. Pages that change carry an updated date.', `If you find something that contradicts official guidance, email ${CONTACT_EMAIL} with the source you believe is correct and we will check and fix it.`] },
        { heading: 'Known limitations', body: ['The data assumes home storage with a refrigerator at or below 4 °C and a freezer at −18 °C. Frequent door opening, overpacking, power cuts and temperature swings in transport all shorten real-world shelf life.', 'Processing, packaging and regulation also differ by country. Whether eggs are washed, for instance, directly determines whether they need refrigerating. We flag differences like these on the relevant pages.'] },
      ],
    },
    ja: {
      title: '出典と作成方法',
      description: '保存期間データの出どころ、加工方法、更新頻度、既知の限界について説明します。',
      sections: [
        { heading: '主なデータソース', body: ['保存期間の土台は、米国農務省食品安全検査局（USDA FSIS）が公開する FoodKeeper データセットです。USDA、コーネル大学食品科学科、米国食品マーケティング協会（FMI）が共同で作成し、data.gov で公開されている米国政府著作物（パブリックドメイン）で、自由に再利用・改変できます。', '利用しているのは FMA-Data-v128 で、660 品目あまりを収録しています。各品目に常温・冷蔵・冷凍の期間があり、「目安」「購入日から」「開封後」「解凍後」の 4 つの基準に分かれています。'] },
        { heading: '安全に関する考え方の根拠', body: ['温度と時間の考え方は、各国の食品安全当局が公開する指針にもとづきます。主に米国 FDA・FSIS、CDC、FoodSafety.gov、WHO「食品をより安全にするための 5 つの鍵」、英国 FSA、台湾衛生福利部食品薬物管理署、日本の消費者庁・厚生労働省・農林水産省、スペイン AESAN、香港食物安全中心です。', '国によって基準が違う場合は、どれか一つを黙って採用するのではなく、その言語版で違いを明記します。たとえば冷蔵は、米国は 4°C 以下、台湾 TFDA は 7°C 以下、日本の食品衛生関係法令では「冷蔵」を 10°C 以下と定義しています。'] },
        { heading: '独自に追加した食材', body: ['FoodKeeper は米国の食生活が前提のため、アジアやスペイン語圏の定番食材が多く抜けています。それらは別途調べ、優先順位は、各国の食品安全機関 → 大学の普及部門（カリフォルニア大学デービス校の収穫後技術センターなど）→ 査読論文 → 定評ある業界団体、の順です。該当する食材のページに、実際に使った出典を掲載しています。', '信頼できる出典が見つからない場合は、性質が最も近い FoodKeeper の品目を類推の基準として使い、「類推」であることを明示します。出典があるふりはしません。'] },
        { heading: '期間が意味するもの', body: ['一部の例外を除き、記載の期間は「おいしく食べられる目安」であり、安全の絶対的な区切りではありません。−18°C を保って冷凍したままであれば、微生物学的には無期限に安全です。冷凍の期間は風味と食感の低下を示しています。', '例外は冷蔵の生肉、魚介、調理済み食品です。こちらは期間そのものが安全上の意味を持つため、延ばすべきではありません。'] },
        { heading: '更新と訂正', body: ['USDA が FoodKeeper を改訂した際は、データを取り込み直し、差分を確認します。内容が変わったページには更新日を表示します。', `公的な情報と food い違う点を見つけた場合は、正しいと思われる出典を添えて ${CONTACT_EMAIL} までご連絡ください。確認のうえ修正します。`] },
        { heading: '既知の限界', body: ['データは家庭での保存を前提とし、冷蔵庫は 4°C 以下、冷凍庫は −18°C に保たれていることを想定しています。扉の開閉が多い、詰め込みすぎ、停電、輸送中の温度変動などがあると、実際の保存可能期間は短くなります。', '加工方法、包装、法規制も国によって異なります。たとえば卵を洗浄しているかどうかで、冷蔵が必要かどうかが変わります。こうした違いは該当ページで説明しています。'] },
      ],
    },
    es: {
      title: 'Fuentes y método',
      description: 'De dónde salen nuestros plazos de conservación, cómo se procesan, con qué frecuencia se actualizan y qué limitaciones tienen.',
      sections: [
        { heading: 'Fuente principal', body: ['Los plazos de conservación parten del conjunto de datos FoodKeeper, publicado por el Servicio de Inocuidad e Inspección de los Alimentos del USDA. Lo desarrollaron el USDA, el Departamento de Ciencia de los Alimentos de la Universidad de Cornell y el Food Marketing Institute; está publicado en data.gov y es de dominio público como obra del Gobierno de EE. UU., por lo que puede reutilizarse y adaptarse libremente.', 'Usamos la versión FMA-Data-v128, con algo más de 660 productos. Cada uno incluye plazos de despensa, nevera y congelador, divididos en general, desde la compra, una vez abierto y tras descongelar.'] },
        { heading: 'Base de los principios de seguridad', body: ['Los principios de tiempo y temperatura siguen las guías publicadas por autoridades nacionales de seguridad alimentaria, sobre todo: la FDA y el FSIS de EE. UU., los CDC, FoodSafety.gov, las Cinco Claves de la OMS, la FSA británica, la AESAN española, la Administración de Alimentos y Medicamentos de Taiwán y el Centro de Seguridad Alimentaria de Hong Kong.', 'Cuando las guías nacionales difieren, lo decimos en ese idioma en lugar de elegir una en silencio. La refrigeración es un buen ejemplo: EE. UU. recomienda 4 °C o menos, la TFDA de Taiwán suele citar 7 °C y la normativa japonesa define 冷蔵 como 10 °C o menos.'] },
        { heading: 'Alimentos añadidos por nosotros', body: ['FoodKeeper refleja una dieta estadounidense y omite muchos básicos de las cocinas asiáticas e hispanohablantes. Esos los investigamos aparte, por este orden de preferencia: agencias nacionales de seguridad alimentaria, servicios de extensión universitaria como el Centro de Tecnología Poscosecha de UC Davis, literatura revisada por pares y, por último, organizaciones sectoriales acreditadas. Cada alimento así añadido cita sus fuentes en su propia ficha.', 'Si no existe una fuente fiable, recurrimos al producto equivalente más cercano de FoodKeeper y lo etiquetamos como analogía, en lugar de fingir que hay una cita.'] },
        { heading: 'Qué significan los plazos', body: ['Salvo excepciones, los plazos indican calidad óptima, no un límite absoluto de inocuidad. Un alimento mantenido de forma continua a −18 °C es microbiológicamente seguro de forma indefinida; los plazos del congelador describen la pérdida de sabor y textura.', 'La excepción son la carne cruda, el pescado y los platos preparados refrigerados: ahí el plazo sí tiene un sentido de seguridad y no conviene estirarlo.'] },
        { heading: 'Actualizaciones y correcciones', body: ['Cuando el USDA revisa FoodKeeper, volvemos a importar el conjunto de datos y comparamos las diferencias. Las páginas que cambian muestran una fecha de actualización.', `Si encuentras algo que contradiga las guías oficiales, escribe a ${CONTACT_EMAIL} con la fuente que consideres correcta y lo revisaremos.`] },
        { heading: 'Limitaciones conocidas', body: ['Los datos suponen conservación doméstica con la nevera a 4 °C o menos y el congelador a −18 °C. Abrir mucho la puerta, llenarla en exceso, los cortes de luz y las variaciones de temperatura en el transporte acortan la duración real.', 'El procesado, el envasado y la normativa también cambian según el país. Que los huevos estén lavados o no, por ejemplo, determina si necesitan refrigeración. Señalamos estas diferencias en las páginas correspondientes.'] },
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

export const STATIC_PAGE_KEYS: PageKey[] = ['about', 'contact', 'privacy', 'terms', 'methodology'];
export type { PageKey };
