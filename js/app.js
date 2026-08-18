// app.js — hal-hal yang dipakai bersama di SEMUA halaman:
// tema gelap/terang, format angka, dan penanda halaman aktif di bottom nav.

const THEME_KEY = "pantau_theme";

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  return saved;
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
  return next;
}

export function formatNum(n, currency = "USD") {
  if (currency === "IDR") {
    return n.toLocaleString("id-ID", { maximumFractionDigits: n >= 1000 ? 0 : 2 });
  }
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(6);
}

export function currencySymbol(currency) {
  return currency === "IDR" ? "Rp" : "$";
}

// Highlight menu bottom-nav sesuai file HTML yang lagi dibuka
export function markActiveNav() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item").forEach((el) => {
    const target = el.getAttribute("data-page");
    if (target === current || (target === "index.html" && current === "")) {
      el.classList.add("active");
    }
  });
}

// Watchlist tersimpan lokal di HP, dipakai bareng di semua halaman
const WATCHLIST_KEY = "pantau_favorites";
export function loadWatchlist() {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
export function saveWatchlist(list) {
  try { localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list)); } catch {}
}
export function toggleWatchlistItem(symbol) {
  const list = loadWatchlist();
  const next = list.includes(symbol) ? list.filter((s) => s !== symbol) : [...list, symbol];
  saveWatchlist(next);
  return next;
}
