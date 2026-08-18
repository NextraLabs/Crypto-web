// app.js — global helpers dipakai semua halaman
// Tidak pakai ES module, langsung global namespace

const THEME_KEY = "pantau_theme";

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  return saved;
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
  return next;
}

function formatNum(n, currency) {
  if (currency === "IDR") {
    return n.toLocaleString("id-ID", { maximumFractionDigits: n >= 1000 ? 0 : 2 });
  }
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(6);
}

function renderError(container, message, onRetry) {
  container.innerHTML = `
    <div class="error-box">
      <div>⚠️ ${message}</div>
      <button class="icon-btn" style="margin-top:10px;" id="retryBtn">Coba lagi</button>
    </div>`;
  if (onRetry) {
    document.getElementById("retryBtn").addEventListener("click", onRetry);
  }
}

function renderNav() {
  const NAV_ITEMS = [
    { href: "index.html", icon: "🏠", label: "Home" },
    { href: "markets.html", icon: "🪙", label: "Markets" },
    { href: "trending.html", icon: "🔥", label: "Trending" },
    { href: "tools.html", icon: "🧮", label: "Tools" },
    { href: "education.html", icon: "📚", label: "Edukasi" },
  ];
  const mount = document.getElementById("bottom-nav");
  if (!mount) return;
  const current = location.pathname.split("/").pop() || "index.html";
  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.innerHTML = NAV_ITEMS.map((item) => {
    const active = item.href === current ? "active" : "";
    return `<a href="${item.href}" class="nav-item ${active}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a>`;
  }).join("");
  mount.replaceWith(nav);
}

const WATCHLIST_KEY = "pantau_favorites";
function loadWatchlist() {
  try { return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]"); } catch { return []; }
}
function saveWatchlist(list) {
  try { localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list)); } catch {}
}
function toggleWatchlistItem(symbol) {
  const list = loadWatchlist();
  const next = list.includes(symbol) ? list.filter(s => s !== symbol) : [...list, symbol];
  saveWatchlist(next);
  return next;
}
