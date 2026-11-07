const pageType = location.pathname.endsWith("creatures.html") ? "creatures" :
                 location.pathname.endsWith("blocks.html") ? "blocks" : null;

const rootPrefix = pageType ? "../" : "";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}

function cardMarkup(item, type) {
  const icon = type === "creatures" ? "◈" : "▧";
  const summary = type === "creatures"
    ? `<p><strong>出現環境</strong>${escapeHTML(item.environment)}</p><p><strong>行為特徵</strong>${escapeHTML(item.behavior)}</p><p><strong>觀察筆記</strong>${escapeHTML(item.observation)}</p>`
    : `<p><strong>取得方式</strong>${escapeHTML(item.source)}</p><p><strong>主要用途</strong>${escapeHTML(item.usage)}</p><p><strong>設計想法</strong>${escapeHTML(item.design)}</p>`;
  return `<article class="entry-card"><div class="entry-top"><span class="entry-icon">${icon}</span><span class="entry-category">${escapeHTML(item.category)}</span></div><h2>${escapeHTML(item.name)}</h2>${summary}<div class="tag-row">${item.tags.map(tag => `<span class="tag">#${escapeHTML(tag)}</span>`).join("")}</div></article>`;
}

async function loadEntries() {
  if (!pageType) return;
  const grid = document.getElementById("entryGrid");
  const count = document.getElementById("resultCount");
  const search = document.getElementById("searchInput");
  const filters = document.getElementById("filterGroup");
  try {
    const response = await fetch(`${rootPrefix}data/${pageType}.json`);
    if (!response.ok) throw new Error("資料讀取失敗");
    const entries = await response.json();
    let activeFilter = "全部";
    function render() {
      const keyword = search.value.trim().toLowerCase();
      const visible = entries.filter(item => {
        const categoryMatch = activeFilter === "全部" || item.category === activeFilter;
        const searchable = [item.name, item.category, ...item.tags,
          item.environment || "", item.behavior || "", item.observation || "",
          item.source || "", item.usage || "", item.design || ""].join(" ").toLowerCase();
        return categoryMatch && searchable.includes(keyword);
      });
      count.textContent = `目前顯示 ${visible.length} / ${entries.length} 筆資料`;
      grid.innerHTML = visible.length
        ? visible.map(item => cardMarkup(item, pageType)).join("")
        : `<div class="empty-state"><span>⌕</span><h2>找不到符合的資料</h2><p>試試其他關鍵字或切換分類。</p></div>`;
    }
    search.addEventListener("input", render);
    filters.addEventListener("click", event => {
      const button = event.target.closest("button[data-filter]");
      if (!button) return;
      activeFilter = button.dataset.filter;
      filters.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button));
      render();
    });
    render();
  } catch (error) {
    count.textContent = "資料載入失敗";
    grid.innerHTML = `<p class="error-state">無法讀取資料。請使用本機伺服器或 GitHub Pages 開啟網站。</p>`;
  }
}
loadEntries();