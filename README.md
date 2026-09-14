# 和美高中 115-1 專題寫作指導

這是「專題寫作指導」課程的長期教材 repo。各次上課的投影片、講義原稿與單元圖片放在 `lessons/`，由課程首頁集中列出入口；後續單元沿用同一套樣式與投影片引擎。

目前單元：

- 2026-09-09「問題意識」再探，38 張
- 2026-09-15「研究動機」（502），32 張；無圖片，`styles.css` 末尾新增 `.quote-block`、`.contrast`、`.premises .sub`、`.prose`、`.sample-tag` 五組版面

## 目錄結構

```text
research-writing-class/
├── index.html                    # 課程首頁與單元列表
├── styles.css                    # 首頁與各單元共用樣式
├── app.js                        # 各單元共用投影片引擎
├── favicon.svg
├── .nojekyll
├── .gitignore
├── README.md
└── lessons/
    ├── 2026-09-09-問題意識再探/
    │   ├── index.html            # 本次投影片
    │   ├── 講義原稿.md            # 保留原始內容，不由程式覆寫
    │   └── assets/
    │       ├── worldview-crystallization.png
    │       └── accumulated-knowledge.png
    └── 2026-09-15-研究動機/
        ├── index.html
        └── 講義原稿.md
```

## 本地預覽

在專案根目錄執行：

```bash
python3 -m http.server 8000
```

以瀏覽器開啟 <http://localhost:8000>，從課程首頁進入單元。結束預覽時，在 Terminal 按 `Ctrl+C`。

全站是純靜態 HTML／CSS／JavaScript，不需要套件安裝或建置步驟，不依賴外部 CDN。字型使用 macOS 內建的 PingFang TC、Heiti TC，以及其他常見系統字型 Microsoft JhengHei、system-ui。站內檔案採相對路徑，可直接用於 GitHub Pages 的 repository 子路徑；只有原稿的外部參考文章使用完整 HTTPS 網址。首次載入後，換頁不需要網路；外部閱讀連結仍需連線。

## 操作方式

| 按鍵／操作 | 功能 |
| --- | --- |
| `←`／`→`、`PageUp`／`PageDown` | 上一張／下一張 |
| `Space`／`Enter` | 下一張 |
| `Home`／`End` | 第一張／最後一張 |
| `F` | 進入或離開全螢幕（依瀏覽器支援） |
| `N` | 開啟或關閉講者備註 |
| `Esc` | 關閉備註或操作說明；全螢幕時依瀏覽器行為離開全螢幕 |
| 左右滑動 | 觸控換頁；上下捲動與多指手勢不觸發換頁 |
| 底部控制列 | 換頁、備註、全螢幕、操作說明與返回課程首頁 |

焦點在連結或按鈕上時，`Enter`／`Space` 會啟用該元件。講者備註顯示在同一個畫面，投影時觀眾也看得到。手機窄螢幕保留換頁與備註按鈕，全螢幕可用支援的瀏覽器功能。網址末尾的 `#slide-12` 可直接連到第 12 張，重新整理後保留頁碼。未啟用 JavaScript 時，投影片會以連續頁面顯示。

## 日後新增單元

1. 在 `lessons/` 建立 `YYYY-MM-DD-單元名稱/`，把新原稿存成 `講義原稿.md`，圖片放進該資料夾的 `assets/`。
2. 複製既有單元的 `index.html` 作為骨架，更改頁面 `<title>`、description、日期與 `.deck` 的 `data-title`，替換 `<main>` 內的投影片內容。維持 `lang="zh-Hant-TW"`。
3. 每張投影片依序使用唯一的 `id="slide-1"`、`id="slide-2"` 等，以及對應的標題 ID／`aria-labelledby`。保留 `class="slide"`、`data-section` 和 `data-theme`。頁數與進度由引擎自動計算，不必修改 `app.js`。
4. 依內容選用 `title-slide`、`section-slide`、`statement-slide`、`question-slide`；主題色可用 `navy`、`slate`、`mist`、`paper`。長句可用 `display-copy` 或 `reading-title`，優先拆頁。整段文章用 `.prose`（示範稿）、三欄對照用 `.contrast.three`、字多的清單用 `.premises.compact`、引文用 `.quote-block`、兩欄對照用 `.contrast`、`.premises` 內的子項用 `<ul class="sub">`；在 `ol`／`blockquote`／`p` 這類容器上設 `max-width` 一律用 `rem`，用 `em` 會依容器 16px 字級計算而把內容擠成直排。講者提示放在 `<aside class="speaker-notes">`，不擴寫原稿正文；沒有實質提示就不要放空泛的罐頭備註。
5. 保留頁面底部控制列、講者備註面板與操作說明 dialog。共用檔案繼續引用 `../../styles.css`、`../../app.js`、`../../favicon.svg`；單元圖片用 `assets/圖片.png`。
6. 在根目錄 `index.html` 的 `.lesson-list` 複製一個 `<li>`，更新入口相對路徑、日期與名稱。
7. 本地預覽，檢查正文、投影畫面、手機、換頁與連結，並在 README 補上新增圖片的來源與授權說明。

`data-source-line` 僅是本單元對照原稿的行號，不參與投影片引擎運作；新單元可依新原稿更新或移除。修改講義不會自動更新 HTML，須同步整理投影片。

## 文字與設計

- 正文逐字取自本單元 `講義原稿.md`，保留口語、標點、【考考男】與「中年說教男」等用詞；只調整分頁、換行、標題層級與重點字級。封面課程資訊及介面文字依本次需求加入。
- 保留中選會、環境資訊中心、報導者與科技新報的原始連結與連結文字，點擊後在新分頁閱讀。原稿末尾的 AI 標注屬於筆記層的修訂史，不進投影片。
- 技術與視覺節奏延續 `folldark/sustainable-food-class` 的原生 HTML／CSS／JS 寫法、`data-section`／`data-theme`、講者備註、深淺底色交替與大字提問；本課改採墨藍、霧藍、灰白。
- 制服與核電段落的前提仍是待檢驗假設，授課提示保留在講者備註。
- 2026-09-15 單元第 18–22 張「示範稿」是依原稿「to AI agent」的要求，把電梯例子依三步驟範本寫成的完整研究動機，內容只用原稿既有的觀察與假設；第 4 張把「對別人來說」拆成讀者要做的三個判斷，是依原稿「to AI agent」的討論整理、經授課老師同意加入正文。

## 圖片來源與產生方式

兩張圖片均於 2026-09-09 使用 **OpenAI ImageGen 內建產圖工具**產生，與 `sustainable-food-class` README 記載的產圖方式相同。未使用外部圖庫素材、CDN 或 API CLI。PNG 原圖尺寸皆為 1536 × 1024，存於本單元 `assets/`。

| 檔案 | 投影片 | 概念 |
| --- | --- | --- |
| `worldview-crystallization.png` | 第 12 張 | 世界觀固化：發散細線凝結成封閉結晶 |
| `accumulated-knowledge.png` | 第 27 張 | 積沙成塔：微小顆粒逐層累積成結構 |

兩張圖各使用一次，沒有在其他章節重複配圖。`favicon.svg` 是手寫的問號介面圖示，不計入教材插圖。

### 產圖提示詞

`worldview-crystallization.png`：

```text
Use case: stylized-concept. Asset type: abstract illustration for an academic research-methods HTML slide. Primary request: branching, exploratory fine lines gradually condense into a closed, rigid crystalline shell, evoking a worldview becoming fixed. Style: restrained editorial abstraction, geometry and subtle paper grain with soft gradients, no representational illustration. Color palette: ink navy #182e46 background, slate blue, mist blue #a8c9df, tiny pale silver highlights. Composition: landscape 3:2; the entire abstract structure occupies the right two-thirds, left third quiet dark negative space; airy and precise, not busy. Text: none. Constraints: no people, no faces, no objects, no symbols, no letters, no logos, no watermark. Output PNG.
```

`accumulated-knowledge.png`：

```text
Use case: stylized-concept. Asset type: abstract illustration for an academic research-methods HTML slide. Primary request: innumerable tiny grains and short geometric strokes accumulate layer upon layer into one coherent rising structure, evoking research built on prior work, accumulation of knowledge. Style: restrained editorial abstraction, delicate geometry, tactile paper grain, subtle gradients. Color palette: cool paper white #f6f7f8 background, ink navy #182e46, slate blue, mist blue #a8c9df. Composition: landscape 3:2; abstract layered structure on right two-thirds, left third calm negative space. No literal tower or building, no scenery, no people, no objects. Text: none. No letters, logos or watermark. Output PNG.
```

## 授權

課程文字與投影片設計保留所有權利。未經授權，請勿重製或另行散布。外部文章及相關內容的權利歸原作者與網站所有。
