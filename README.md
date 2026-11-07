# 方塊觀察所｜Minecraft 生物與方塊研究筆記

一個以 Minecraft 生物與方塊為主題的繁體中文靜態網站。這份作業的重點是建立可重複使用的專案規則，讓 AI 之後能依照相同的目錄、資料格式與視覺規範擴充網站。

## 專案簡介
目前網站包含：
- 首頁：專案目的、內容分類與設計原則。
- 生物圖鑑：生物環境、行為、觀察筆記，可搜尋與分類篩選。
- 方塊筆記：取得方式、用途、設計想法，可搜尋與分類篩選。
- `AGENTS.md`：定義 AI 新增頁面、資料與修改程式時必須遵守的規範。

## 技術
原生 HTML、CSS、JavaScript、JSON，無需安裝套件或建置。可直接部署至 GitHub Pages。

## 本機預覽
建議在專案根目錄啟動簡易伺服器（因為頁面會透過 `fetch()` 讀取 JSON）：

```bash
python -m http.server 8000
```

瀏覽器開啟 `http://localhost:8000`。

## GitHub Pages 部署
1. 建立 GitHub Repository，例如 `block-observatory`。
2. 將本資料夾內所有檔案推送到 Repository 的根目錄。
3. 進入 Repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. Branch 選 `main`，資料夾選 `/(root)`，按 Save。
6. 等待部署完成，網址通常為 `https://<你的GitHub帳號>.github.io/block-observatory/`。

## 之後如何請 AI 擴充
請先要求 AI 閱讀 `AGENTS.md`，再描述要新增的生物或方塊。既有分類只需新增 JSON 資料，不必重新製作頁面；新主題則依規範新增 HTML 與 JSON，沿用共用 CSS/JS 與頁面結構。

## 專案結構
```text
AGENTS.md
README.md
index.html
data/
pages/
assets/css/
assets/js/
```

## 免責聲明
本網站為個人學習與整理專案，非 Minecraft 官方網站。Minecraft 為 Mojang/Microsoft 相關商標與作品。
