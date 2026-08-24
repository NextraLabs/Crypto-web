// app.js — NEXTRA Global Core V5

const THEME_KEY = "nextra_theme";
const WATCHLIST_KEY = "nextra_watchlist";

const LEGACY_THEME_KEY = "pantau_theme";
const LEGACY_WATCHLIST_KEY = "pantau_favorites";


/* =========================================
   SAFE STORAGE
========================================= */

function safeStorageGet(key, fallback = null) {

  try {

    const value = localStorage.getItem(key);

    return value === null
      ? fallback
      : value;

  } catch (error) {

    console.warn(
      "NEXTRA storage read failed:",
      error
    );

    return fallback;

  }

}


function safeStorageSet(key, value) {

  try {

    localStorage.setItem(
      key,
      value
    );

    return true;

  } catch (error) {

    console.warn(
      "NEXTRA storage write failed:",
      error
    );

    return false;

  }

}


/* =========================================
   STORAGE MIGRATION
========================================= */

function migrateLegacyStorage() {

  try {

    /* THEME */

    if (
      !localStorage.getItem(
        THEME_KEY
      )
    ) {

      const oldTheme =
        localStorage.getItem(
          LEGACY_THEME_KEY
        );

      if (oldTheme) {

        localStorage.setItem(
          THEME_KEY,
          oldTheme
        );

      }

    }


    /* WATCHLIST */

    if (
      !localStorage.getItem(
        WATCHLIST_KEY
      )
    ) {

      const oldWatchlist =
        localStorage.getItem(
          LEGACY_WATCHLIST_KEY
        );

      if (oldWatchlist) {

        localStorage.setItem(
          WATCHLIST_KEY,
          oldWatchlist
        );

      }

    }

  } catch (error) {

    console.warn(
      "NEXTRA migration failed:",
      error
    );

  }

}


/* =========================================
   THEME
========================================= */

function initTheme() {

  migrateLegacyStorage();

  const saved =
    safeStorageGet(
      THEME_KEY,
      "dark"
    ) === "light"
      ? "light"
      : "dark";


  document.documentElement
    .setAttribute(
      "data-theme",
      saved
    );


  updateThemeButtons(
    saved
  );


  return saved;

}


function toggleTheme() {

  const current =
    document.documentElement
      .getAttribute(
        "data-theme"
      ) || "dark";


  const next =
    current === "dark"
      ? "light"
      : "dark";


  document.documentElement
    .setAttribute(
      "data-theme",
      next
    );


  safeStorageSet(
    THEME_KEY,
    next
  );


  updateThemeButtons(
    next
  );


  return next;

}


function updateThemeButtons(
  theme
) {

  const buttons =
    document.querySelectorAll(
      "#theme-toggle, [data-theme-toggle]"
    );


  buttons.forEach(
    button => {

      button.innerHTML =
        theme === "dark"

          ? `
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <circle
                cx="12"
                cy="12"
                r="4"
              />

              <path d="M12 2v2"/>
              <path d="M12 20v2"/>

              <path
                d="m4.93 4.93 1.41 1.41"
              />

              <path
                d="m17.66 17.66 1.41 1.41"
              />

              <path d="M2 12h2"/>
              <path d="M20 12h2"/>

              <path
                d="m6.34 17.66-1.41 1.41"
              />

              <path
                d="m19.07 4.93-1.41 1.41"
              />

            </svg>
          `

          : `
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >

              <path
                d="
                  M21 12.8
                  A8.5 8.5 0 1 1
                  11.2 3
                  A6.7 6.7 0 0 0
                  21 12.8Z
                "
              />

            </svg>
          `;


      button.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Aktifkan mode terang"
          : "Aktifkan mode gelap"
      );


      button.setAttribute(
        "title",
        theme === "dark"
          ? "Mode terang"
          : "Mode gelap"
      );

    }
  );

}


/* =========================================
   NUMBER FORMAT
========================================= */

function formatNum(
  n,
  currency
) {

  if (
    typeof n !== "number" ||
    Number.isNaN(n)
  ) {

    return "-";

  }


  if (
    currency === "IDR"
  ) {

    return n.toLocaleString(
      "id-ID",
      {
        maximumFractionDigits:
          n >= 1000
            ? 0
            : 2
      }
    );

  }


  if (n >= 1000) {

    return n.toLocaleString(
      "en-US",
      {
        maximumFractionDigits: 0
      }
    );

  }


  if (n >= 1) {

    return n.toFixed(2);

  }


  return n.toFixed(6);

}


/* =========================================
   ERROR HANDLER
========================================= */

function renderError(
  container,
  message,
  onRetry
) {

  if (!container) return;


  const retryId =
    `nextra-retry-${Date.now()}`;


  container.innerHTML = `

    <div
      class="error-box"
      role="alert"
    >

      <div>
        ⚠️ ${message}
      </div>

      ${
        onRetry

          ? `

            <button
              class="icon-btn"
              style="margin-top:10px;"
              id="${retryId}"
              type="button"
            >

              Coba lagi

            </button>

          `

          : ""

      }

    </div>

  `;


  if (onRetry) {

    const button =
      document.getElementById(
        retryId
      );


    if (button) {

      button.addEventListener(
        "click",
        onRetry,
        {
          once: true
        }
      );

    }

  }

}


/* =========================================
   DEBOUNCE
========================================= */

function debounce(
  callback,
  delay = 250
) {

  let timer;


  return function (...args) {

    clearTimeout(timer);


    timer =
      setTimeout(
        () => {

          callback.apply(
            this,
            args
          );

        },
        delay
      );

  };

}


/* =========================================
   DATA FRESHNESS
========================================= */

function formatUpdatedTime(
  timestamp = Date.now()
) {

  const date =
    new Date(timestamp);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "-";

  }


  return date.toLocaleTimeString(
    "id-ID",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }
  );

}


function setDataFreshness(
  timestamp = Date.now()
) {

  document
    .querySelectorAll(
      "[data-last-updated]"
    )
    .forEach(
      element => {

        element.textContent =
          `Diperbarui ${formatUpdatedTime(timestamp)}`;

        element.setAttribute(
          "datetime",
          new Date(
            timestamp
          ).toISOString()
        );

      }
    );

}


/* =========================================
   WATCHLIST
========================================= */

function loadWatchlist() {

  migrateLegacyStorage();


  try {

    const data =
      JSON.parse(
        safeStorageGet(
          WATCHLIST_KEY,
          "[]"
        )
      );


    if (
      !Array.isArray(data)
    ) {

      return [];

    }


    return [
      ...new Set(

        data

          .filter(
            value =>
              typeof value ===
              "string"
          )

          .map(
            value =>
              value
                .trim()
                .toUpperCase()
          )

          .filter(Boolean)

      )
    ];

  } catch {

    return [];

  }

}


function saveWatchlist(
  list
) {

  const clean = [

    ...new Set(

      (
        Array.isArray(list)
          ? list
          : []

      )

        .filter(
          value =>
            typeof value ===
            "string"
        )

        .map(
          value =>
            value
              .trim()
              .toUpperCase()
        )

        .filter(Boolean)

    )

  ];


  safeStorageSet(
    WATCHLIST_KEY,
    JSON.stringify(clean)
  );


  window.dispatchEvent(

    new CustomEvent(
      "nextra:watchlist-changed",
      {
        detail: {
          watchlist: clean
        }
      }
    )

  );


  return clean;

}


function toggleWatchlistItem(
  symbol
) {

  const normalized =
    String(symbol || "")
      .trim()
      .toUpperCase();


  if (!normalized) {

    return loadWatchlist();

  }


  const list =
    loadWatchlist();


  const next =
    list.includes(
      normalized
    )

      ? list.filter(
          item =>
            item !== normalized
        )

      : [
          ...list,
          normalized
        ];


  return saveWatchlist(
    next
  );

}


function isInWatchlist(
  symbol
) {

  const normalized =
    String(symbol || "")
      .trim()
      .toUpperCase();


  return loadWatchlist()
    .includes(
      normalized
    );

}


/* =========================================
   NAVIGATION
========================================= */

function renderNav() {

  const NAV_ITEMS = [

    {
      href: "index.html",
      label: "Home",

      icon: `
        <svg viewBox="0 0 24 24">

          <path
            d="
              M3.5 10.7
              12 3.8
              20.5 10.7
              v9.1
              a1.7 1.7 0 0 1-1.7 1.7
              H5.2
              a1.7 1.7 0 0 1-1.7-1.7Z
            "
          />

          <path
            d="
              M9 21.5
              v-6.8
              h6
              v6.8
            "
          />

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

          <path
            d="
              M12 20
              a8 8 0 1 0-8-8
            "
          />

          <path
            d="
              M12 16
              a4 4 0 1 0-4-4
            "
          />

          <path
            d="
              M12 12
              19.5 4.5
            "
          />

          <circle
            cx="12"
            cy="12"
            r="1.4"
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

          <circle
            cx="5"
            cy="12"
            r="1.5"
          />

          <circle
            cx="12"
            cy="12"
            r="1.5"
          />

          <circle
            cx="19"
            cy="12"
            r="1.5"
          />

        </svg>
      `
    }

  ];


  const mount =
    document.getElementById(
      "bottom-nav"
    );


  if (!mount) return;


  const current =
    location.pathname
      .split("/")
      .pop() ||
    "index.html";


  const nav =
    document.createElement(
      "nav"
    );


  nav.className =
    "bottom-nav";


  nav.setAttribute(
    "aria-label",
    "Main navigation"
  );


  nav.innerHTML =
    NAV_ITEMS
      .map(
        item => {

          const active =
            item.href === current
              ? "active"
              : "";


          return `

            <a
              href="${item.href}"
              class="nav-item ${active}"
              aria-label="${item.label}"

              ${
                active
                  ? 'aria-current="page"'
                  : ""
              }
            >

              <span
                class="nav-icon"
                aria-hidden="true"
              >

                ${item.icon}

              </span>


              <span
                class="nav-label"
              >

                ${item.label}

              </span>

            </a>

          `;

        }
      )
      .join("");


  mount.replaceWith(
    nav
  );

}


/* =========================================
   GLOBAL INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    migrateLegacyStorage();

    initTheme();

    renderNav();

  }
);