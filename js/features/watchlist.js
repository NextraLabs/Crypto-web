// watchlist.js — NEXTRA Watchlist V2

const WATCHLIST_STATE = {
  coins: [],
  loading: false
};


/* =========================================
   ELEMENTS
========================================= */

function watchlistEl(id) {
  return document.getElementById(id);
}


/* =========================================
   LOAD DATA
========================================= */

async function loadWatchlistPage() {

  if (WATCHLIST_STATE.loading) return;

  WATCHLIST_STATE.loading = true;

  showWatchlistLoading(true);
  hideWatchlistError();

  try {

    const symbols = loadWatchlist();

    updateWatchlistCount(symbols.length);


    if (!symbols.length) {

      WATCHLIST_STATE.coins = [];

      renderWatchlist();

      return;

    }


    /*
      Ambil market data dari API yang
      sudah dipakai NEXTRA Markets.
    */

    const markets =
      await NEXTRA_API.fetchNormalizedMarkets({
        total: 250,
        perPage: 100,
        delay: 350
      });


    if (!Array.isArray(markets)) {

      throw new Error(
        "Data market tidak valid"
      );

    }


    const wanted =
      symbols.map(
        symbol =>
          String(symbol)
            .trim()
            .toUpperCase()
      );


    WATCHLIST_STATE.coins =
      markets.filter(
        coin =>
          wanted.includes(
            String(
              coin.symbol || ""
            )
              .trim()
              .toUpperCase()
          )
      );


    /*
      Pertahankan urutan sesuai
      watchlist user.
    */

    WATCHLIST_STATE.coins.sort(
      (a, b) => {

        const indexA =
          wanted.indexOf(
            String(a.symbol)
              .toUpperCase()
          );

        const indexB =
          wanted.indexOf(
            String(b.symbol)
              .toUpperCase()
          );

        return indexA - indexB;

      }
    );


    renderWatchlist();

    updateWatchlistTime();


  } catch (error) {

    console.error(
      "NEXTRA Watchlist:",
      error
    );


    showWatchlistError(
      "Gagal memuat watchlist. Coba lagi."
    );

  } finally {

    WATCHLIST_STATE.loading = false;

    showWatchlistLoading(false);

  }

}


/* =========================================
   RENDER
========================================= */

function renderWatchlist() {

  const container =
    watchlistEl(
      "watchlist-list"
    );

  const empty =
    watchlistEl(
      "watchlist-empty"
    );


  if (!container) return;


  const coins =
    WATCHLIST_STATE.coins;


  if (!coins.length) {

    container.innerHTML = "";


    if (empty) {

      empty.style.display =
        "block";

    }


    return;

  }


  if (empty) {

    empty.style.display =
      "none";

  }


  container.innerHTML =
    coins
      .map(
        renderWatchlistCard
      )
      .join("");

}


/* =========================================
   CARD
========================================= */

function renderWatchlistCard(
  coin
) {

  const price =
    Number(
      coin.price
    ) || 0;


  const change =
    Number(
      coin.change24h
    ) || 0;


  const changeClass =
    change >= 0
      ? "up"
      : "down";


  const sign =
    change >= 0
      ? "+"
      : "";


  const symbol =
    String(
      coin.symbol || ""
    )
      .toUpperCase();


  return `

    <article
      class="coin-card watchlist-card"
      data-symbol="${symbol}"
      style="
        display:flex;
        align-items:center;
        gap:12px;
        padding:14px;
      "
    >


      <!-- COIN -->

      ${
        coin.image

          ? `

            <img
              src="${coin.image}"
              alt="${coin.name || symbol}"
              width="42"
              height="42"
              loading="lazy"
              style="
                width:42px;
                height:42px;
                border-radius:50%;
                flex-shrink:0;
              "
            >

          `

          : `

            <div
              style="
                width:42px;
                height:42px;
                border-radius:50%;
                display:flex;
                align-items:center;
                justify-content:center;
                background:var(--panel);
                color:var(--green);
                font-weight:900;
                flex-shrink:0;
              "
            >
              ${symbol.slice(0,1)}
            </div>

          `
      }


      <div
        style="
          min-width:0;
          flex:1;
        "
      >

        <div
          style="
            font-size:14px;
            font-weight:900;
          "
        >
          ${symbol}
        </div>


        <div
          style="
            color:var(--muted);
            font-size:11px;
            margin-top:3px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          "
        >
          ${coin.name || "-"}
        </div>

      </div>


      <!-- PRICE -->

      <div
        style="
          text-align:right;
          min-width:100px;
        "
      >

        <div
          style="
            font-size:14px;
            font-weight:900;
          "
        >
          ${formatWatchlistPrice(price)}
        </div>


        <div
          class="coin-change ${changeClass}"
          style="
            margin-top:4px;
            font-size:11px;
            font-weight:800;
          "
        >

          ${sign}${change.toFixed(2)}%

        </div>

      </div>


      <!-- REMOVE -->

      <button
        type="button"
        class="watchlist-remove"
        data-symbol="${symbol}"
        aria-label="Hapus ${symbol} dari watchlist"
        title="Hapus dari watchlist"
        style="
          border:0;
          background:none;
          color:var(--muted);
          cursor:pointer;
          font-size:18px;
          padding:7px;
          flex-shrink:0;
        "
      >
        ★
      </button>


    </article>

  `;

}


/* =========================================
   PRICE FORMAT
========================================= */

function formatWatchlistPrice(
  price
) {

  if (
    !Number.isFinite(price)
  ) {

    return "-";

  }


  if (price >= 1000) {

    return "$" +
      price.toLocaleString(
        "en-US",
        {
          maximumFractionDigits: 0
        }
      );

  }


  if (price >= 1) {

    return "$" +
      price.toFixed(2);

  }


  if (price >= 0.01) {

    return "$" +
      price.toFixed(4);

  }


  return "$" +
    price.toPrecision(6);

}


/* =========================================
   COUNT
========================================= */

function updateWatchlistCount(
  count
) {

  const element =
    watchlistEl(
      "watchlist-count"
    );


  if (!element) return;


  element.textContent =
    `${count} coin${count === 1 ? "" : "s"}`;

}


/* =========================================
   UPDATED TIME
========================================= */

function updateWatchlistTime() {

  const element =
    watchlistEl(
      "watchlist-updated"
    );


  if (!element) return;


  element.textContent =
    `Diperbarui ${formatUpdatedTime()}`;

}


/* =========================================
   LOADING
========================================= */

function showWatchlistLoading(
  visible
) {

  const element =
    watchlistEl(
      "watchlist-loading"
    );


  if (!element) return;


  element.style.display =
    visible
      ? "block"
      : "none";

}


/* =========================================
   ERROR
========================================= */

function showWatchlistError(
  message
) {

  const container =
    watchlistEl(
      "watchlist-error"
    );


  if (!container) return;


  container.style.display =
    "block";


  renderError(
    container,
    message,
    loadWatchlistPage
  );

}


function hideWatchlistError() {

  const container =
    watchlistEl(
      "watchlist-error"
    );


  if (!container) return;


  container.style.display =
    "none";


  container.innerHTML =
    "";

}


/* =========================================
   REMOVE COIN
========================================= */

function removeFromWatchlist(
  symbol
) {

  const normalized =
    String(symbol || "")
      .trim()
      .toUpperCase();


  if (!normalized) return;


  const current =
    loadWatchlist();


  const next =
    current.filter(
      item =>
        item !== normalized
    );


  saveWatchlist(next);


  loadWatchlistPage();

}


/* =========================================
   EVENTS
========================================= */

function initWatchlistEvents() {

  const refresh =
    watchlistEl(
      "watchlist-refresh"
    );


  if (refresh) {

    refresh.addEventListener(
      "click",
      () => {

        loadWatchlistPage();

      }
    );

  }


  document.addEventListener(
    "click",
    event => {

      const remove =
        event.target.closest(
          ".watchlist-remove"
        );


      if (!remove) return;


      event.preventDefault();


      const symbol =
        remove.dataset.symbol;


      removeFromWatchlist(
        symbol
      );

    }
  );


  /*
    Kalau watchlist berubah
    dari halaman Markets,
    halaman ini ikut refresh.
  */

  window.addEventListener(
    "nextra:watchlist-changed",
    () => {

      loadWatchlistPage();

    }
  );

}


/* =========================================
   INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initWatchlistEvents();

    loadWatchlistPage();

  }
);