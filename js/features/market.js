// market.js — logika khusus halaman Markets.
// Alurnya: markets.html -> market.js -> api.js -> Binance
// Halaman HTML nggak pernah fetch API langsung, semua lewat sini.

import { fetchAllTickers, ALL_COINS } from "../api.js";

let cachedData = null;
let currentFilter = "all";
let currentQuery = "";

function formatPrice(n) {
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(6);
}
function formatVolume(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return n.toFixed(0);
}

function getFilteredList() {
  if (!cachedData) return [];
  let list = ALL_COINS.filter((c) => cachedData[c.symbol]);

  if (currentQuery.trim()) {
    list = list.filter((c) => c.symbol.toLowerCase().includes(currentQuery.trim().toLowerCase()));
  }

  if (currentFilter === "gainers") {
    list = [...list].sort((a, b) => cachedData[b.symbol].usd_24h_change - cachedData[a.symbol].usd_24h_change);
  } else if (currentFilter === "losers") {
    list = [...list].sort((a, b) => cachedData[a.symbol].usd_24h_change - cachedData[b.symbol].usd_24h_change);
  } else if (currentFilter === "trending") {
    list = [...list].sort((a, b) => cachedData[b.symbol].volume - cachedData[a.symbol].volume);
  }
  // "all" -> urutan default sesuai ALL_COINS (kurang lebih ranking populer)

  return list;
}

function renderTable() {
  const tbody = document.getElementById("marketsBody");
  const list = getFilteredList();

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Nggak ada koin yang cocok</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((c, i) => {
    const d = cachedData[c.symbol];
    const up = d.usd_24h_change >= 0;
    return `
      <tr class="market-row" data-symbol="${c.symbol}">
        <td class="rank-cell">${i + 1}</td>
        <td>
          <div class="coin-symbol">${c.symbol}</div>
          <div class="coin-pair">Vol ${formatVolume(d.volume)}</div>
        </td>
        <td class="price-cell">$${formatPrice(d.usd)}</td>
        <td class="change-cell ${up ? "up" : "down"}">${up ? "▲" : "▼"} ${Math.abs(d.usd_24h_change).toFixed(2)}%</td>
      </tr>`;
  }).join("");

  tbody.querySelectorAll(".market-row").forEach((row) => {
    row.addEventListener("click", () => {
      location.href = `coin.html?symbol=${row.dataset.symbol}`;
    });
  });
}

export async function initMarkets({ onLoading, onLoaded, onError }) {
  async function load() {
    onLoading();
    try {
      cachedData = await fetchAllTickers();
      onLoaded();
      renderTable();
    } catch (e) {
      onError(e, load);
    }
  }

  document.getElementById("marketSearch").addEventListener("input", (e) => {
    currentQuery = e.target.value;
    renderTable();
  });

  document.querySelectorAll(".filter-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderTable();
    });
  });

  await load();
  setInterval(load, 30000);
}
