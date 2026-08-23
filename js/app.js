// app.js — Global helpers NEXTRA
// Tidak pakai ES module, langsung global namespace

const THEME_KEY = "pantau_theme";
const WATCHLIST_KEY = "pantau_favorites";

/* =========================================
   THEME
========================================= */

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || "dark";

  document.documentElement.setAttribute(
    "data-theme",
    saved
  );

  return saved;
}

function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme");

  const next =
    current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute(
    "data-theme",
    next
  );

  localStorage.setItem(
    THEME_KEY,
    next
  );

  return next;
}


/* =========================================
   NUMBER FORMAT
========================================= */

function formatNum(n, currency) {

  if (typeof n !== "number" || Number.isNaN(n)) {
    return "-";
  }

  if (currency === "IDR") {

    return n.toLocaleString("id-ID", {
      maximumFractionDigits:
        n >= 1000 ? 0 : 2
    });

  }

  if (n >= 1000) {

    return n.toLocaleString("en-US", {
      maximumFractionDigits: 0
    });

  }

  if (n >= 1) {
    return n.toFixed(2);
  }

  return n.toFixed(6);
}


/* =========================================
   ERROR
========================================= */

function renderError(
  container,
  message,
  onRetry
) {

  if (!container) return;

  container.innerHTML = `
    <div class="error-box">

      <div>
        ⚠️ ${message}
      </div>

      ${
        onRetry
          ? `
            <button
              class="icon-btn"
              style="margin-top:10px;"
              id="retryBtn"
            >
              Coba lagi
            </button>
          `
          : ""
      }

    </div>
  `;

  if (onRetry) {

    const retryBtn =
      document.getElementById("retryBtn");

    if (retryBtn) {
      retryBtn.addEventListener(
        "click",
        onRetry
      );
    }

  }
}

/* =========================================
   NEXTRA NAVIGATION — PREMIUM
========================================= */

function renderNav() {

  const NAV_ITEMS = [

    {
      href: "index.html",
      label: "Home",
      icon: `
        <svg viewBox="0 0 24 24">
          <path d="M3.5 10.7 12 3.8l8.5 6.9v9.1
                   a1.7 1.7 0 0 1-1.7 1.7H5.2
                   a1.7 1.7 0 0 1-1.7-1.7z"/>
          <path d="M9 21.5v-6.8h6v6.8"/>
        </svg>
      `
    },

    {
      href: "markets.html",
      label: "Markets",
      icon: `
        <svg viewBox="0 0 24 24">
          <path d="M4 19V9"/>
          <path d="M9.3 19V5"/>
          <path d="M14.7 19v-8"/>
          <path d="M20 19V3"/>
          <path d="M2.5 19.5h19"/>
        </svg>
      `
    },

    {
      href: "radar.html",
      label: "Radar",
      icon: `
        <svg viewBox="0 0 24 24">
          <path d="M12 20a8 8 0 1 0-8-8"/>
          <path d="M12 16a4 4 0 1 0-4-4"/>
          <path d="M12 12 19.5 4.5"/>
          <circle
            cx="12"
            cy="12"
            r="1.3"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      `
    },

    {
      href: "futures.html",
      label: "Futures",
      icon: `
        <svg viewBox="0 0 24 24">
          <path d="M5 18 18.5 4.5"/>
          <path d="M10 4.5h8.5V13"/>
          <path d="M4 9.5V19h9.5"/>
        </svg>
      `
    },

    {
      href: "more.html",
      label: "More",
      icon: `
        <svg viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="19" cy="12" r="1.5"/>
        </svg>
      `
    }

  ];


  const mount =
    document.getElementById("bottom-nav");


  if (!mount) return;


  const current =
    location.pathname
      .split("/")
      .pop() || "index.html";


  const nav =
    document.createElement("nav");


  nav.className =
    "bottom-nav";


  nav.setAttribute(
    "aria-label",
    "Main navigation"
  );


  nav.innerHTML =
    NAV_ITEMS
      .map(item => {

        const active =
          item.href === current
            ? "active"
            : "";


        return `

          <a
            href="${item.href}"
            class="nav-item ${active}"
            aria-label="${item.label}"
          >

            <span class="nav-icon">
              ${item.icon}
            </span>

            <span class="nav-label">
              ${item.label}
            </span>

          </a>

        `;

      })
      .join("");


  mount.replaceWith(nav);

}

/* =========================================
   WATCHLIST
========================================= */

function loadWatchlist() {

  try {

    return JSON.parse(
      localStorage.getItem(
        WATCHLIST_KEY
      ) || "[]"
    );

  } catch {

    return [];

  }
}


function saveWatchlist(list) {

  try {

    localStorage.setItem(
      WATCHLIST_KEY,
      JSON.stringify(list)
    );

  } catch {}

}


function toggleWatchlistItem(symbol) {

  const list =
    loadWatchlist();

  const next =
    list.includes(symbol)

      ? list.filter(
          s => s !== symbol
        )

      : [
          ...list,
          symbol
        ];

  saveWatchlist(next);

  return next;
}


/* =========================================
   AUTO INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initTheme();
    renderNav();

  }
);
