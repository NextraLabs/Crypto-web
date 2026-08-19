// market.js — NEXTRA Markets V2

const MARKET_STATE = {
  coins: [],
  filtered: [],
  page: 1,
  perPage: 25,
  search: "",
  filter: "all",
  sort: "market_cap",
  sortDirection: "desc",
  watchlistOnly: false,
  loading: false
};


/* =========================================
   ELEMENTS
========================================= */

function marketEl(id) {
  return document.getElementById(id);
}


/* =========================================
   LOAD MARKETS
========================================= */

async function loadMarkets() {

  const container =
    marketEl("market-list");

  MARKET_STATE.loading = true;

  if (container) {

    container.innerHTML = `
      <div class="loading">
        Memuat data market...
      </div>
    `;

  }

  try {

    const coins =
      await NEXTRA_API.fetchNormalizedMarkets({
        page: 1,
        perPage: 100
      });

    MARKET_STATE.coins = coins;

    MARKET_STATE.page = 1;

    applyMarketFilters();

  } catch (error) {

    console.error(
      "Markets error:",
      error
    );

    if (container) {

      renderError(
        container,
        "Gagal mengambil data market.",
        loadMarkets
      );

    }

  } finally {

    MARKET_STATE.loading = false;

  }

}


/* =========================================
   FILTER
========================================= */

function applyMarketFilters() {

  let data = [
    ...MARKET_STATE.coins
  ];


  /* SEARCH */

  const query =
    MARKET_STATE.search
      .trim()
      .toLowerCase();

  if (query) {

    data =
      data.filter(coin =>

        coin.name
          .toLowerCase()
          .includes(query)

        ||

        coin.symbol
          .toLowerCase()
          .includes(query)

      );

  }


  /* WATCHLIST */

  if (
    MARKET_STATE.watchlistOnly
  ) {

    const watchlist =
      loadWatchlist();

    data =
      data.filter(coin =>
        watchlist.includes(
          coin.symbol
        )
      );

  }


  /* CATEGORY FILTER */

  if (
    MARKET_STATE.filter ===
    "gainers"
  ) {

    data =
      data.filter(
        coin =>
          coin.change24h > 0
      );

  }


  if (
    MARKET_STATE.filter ===
    "losers"
  ) {

    data =
      data.filter(
        coin =>
          coin.change24h < 0
      );

  }


  if (
    MARKET_STATE.filter ===
    "trending"
  ) {

    data =
      [...data]
        .sort(
          (a, b) =>
            Math.abs(b.change24h) -
            Math.abs(a.change24h)
        );

  }


  /* SORT */

  const direction =
    MARKET_STATE.sortDirection ===
    "asc"
      ? 1
      : -1;


  data.sort(
    (a, b) => {

      let valueA = 0;
      let valueB = 0;


      switch (
        MARKET_STATE.sort
      ) {

        case "price":

          valueA = a.price;
          valueB = b.price;

          break;


        case "change1h":

          valueA = a.change1h;
          valueB = b.change1h;

          break;


        case "change24h":

          valueA = a.change24h;
          valueB = b.change24h;

          break;


        case "change7d":

          valueA = a.change7d;
          valueB = b.change7d;

          break;


        case "volume":

          valueA = a.volume;
          valueB = b.volume;

          break;


        case "market_cap":

        default:

          valueA =
            a.marketCap;

          valueB =
            b.marketCap;

      }


      return (
        valueA - valueB
      ) * direction;

    }
  );


  MARKET_STATE.filtered = data;

  renderMarkets();

  renderMarketStats();

}


/* =========================================
   RENDER MARKETS
========================================= */

function renderMarkets() {

  const container =
    marketEl("market-list");

  if (!container) return;


  const total =
    MARKET_STATE.filtered.length;


  const start =
    (MARKET_STATE.page - 1) *
    MARKET_STATE.perPage;


  const end =
    start +
    MARKET_STATE.perPage;


  const visible =
    MARKET_STATE.filtered.slice(
      start,
      end
    );


  if (!visible.length) {

    container.innerHTML = `
      <div class="empty-state">
        Tidak ada coin ditemukan.
      </div>
    `;

    renderPagination(0);

    return;

  }


  container.innerHTML =
    visible
      .map(renderMarketCard)
      .join("");


  renderPagination(total);

}


/* =========================================
   MARKET CARD
========================================= */

function renderMarketCard(
  coin
) {

  const change24 =
    coin.change24h;


  const changeClass =
    change24 >= 0
      ? "up"
      : "down";


  const sign =
    change24 >= 0
      ? "+"
      : "";


  const watchlist =
    loadWatchlist();


  const isFavorite =
    watchlist.includes(
      coin.symbol
    );


  return `
    <article
      class="coin-card market-card"
      data-coin-id="${coin.id}"
    >

      <div
        class="market-rank"
        style="
          width:28px;
          color:var(--faint);
          font-size:10px;
        "
      >
        ${coin.rank}
      </div>


      ${
        coin.image
          ? `
            <img
              src="${coin.image}"
              alt="${coin.name}"
              width="34"
              height="34"
              style="
                border-radius:50%;
                flex-shrink:0;
              "
              loading="lazy"
            >
          `
          : ""
      }


      <div
        style="
          min-width:0;
          flex:1;
        "
      >

        <div class="coin-symbol">
          ${coin.symbol}
        </div>

        <div class="coin-pair">
          ${coin.name}
        </div>

      </div>


      <div
        style="
          text-align:right;
          min-width:90px;
        "
      >

        <div class="coin-price">
          ${formatMarketPrice(
            coin.price
          )}
        </div>

        <div
          class="coin-change ${changeClass}"
        >
          ${sign}${change24.toFixed(2)}%
        </div>

      </div>


      <button
        class="watch-btn"
        data-symbol="${coin.symbol}"
        title="Watchlist"
        style="
          border:0;
          background:none;
          color:${
            isFavorite
              ? "var(--accent)"
              : "var(--faint)"
          };
          font-size:18px;
          cursor:pointer;
          padding:6px;
        "
      >
        ${isFavorite ? "★" : "☆"}
      </button>

    </article>
  `;

}


/* =========================================
   PRICE FORMAT
========================================= */

function formatMarketPrice(
  price
) {

  if (!Number.isFinite(price)) {
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
    price.toPrecision(5);

}


/* =========================================
   MARKET STATS
========================================= */

function renderMarketStats() {

  const total =
    marketEl("market-total");

  const gainers =
    marketEl("market-gainers");

  const losers =
    marketEl("market-losers");


  if (total) {

    total.textContent =
      MARKET_STATE.filtered.length;

  }


  if (gainers) {

    gainers.textContent =
      MARKET_STATE.filtered
        .filter(
          coin =>
            coin.change24h > 0
        )
        .length;

  }


  if (losers) {

    losers.textContent =
      MARKET_STATE.filtered
        .filter(
          coin =>
            coin.change24h < 0
        )
        .length;

  }

}


/* =========================================
   PAGINATION
========================================= */

function renderPagination(
  total
) {

  const container =
    marketEl(
      "market-pagination"
    );

  if (!container) return;


  const pages =
    Math.ceil(
      total /
      MARKET_STATE.perPage
    );


  if (pages <= 1) {

    container.innerHTML = "";

    return;

  }


  container.innerHTML = `

    <button
      class="icon-btn"
      data-page-action="prev"
      ${
        MARKET_STATE.page <= 1
          ? "disabled"
          : ""
      }
    >
      ‹
    </button>

    <span
      style="
        padding:0 12px;
        color:var(--dim);
        font-size:11px;
      "
    >
      ${MARKET_STATE.page}
      /
      ${pages}
    </span>

    <button
      class="icon-btn"
      data-page-action="next"
      ${
        MARKET_STATE.page >= pages
          ? "disabled"
          : ""
      }
    >
      ›
    </button>

  `;

}


/* =========================================
   EVENTS
========================================= */

function initMarketEvents() {

  const search =
    marketEl(
      "market-search"
    );


  if (search) {

    search.addEventListener(
      "input",
      event => {

        MARKET_STATE.search =
          event.target.value;

        MARKET_STATE.page = 1;

        applyMarketFilters();

      }
    );

  }


  document.addEventListener(
    "click",
    event => {


      /* WATCHLIST */

      const watch =
        event.target.closest(
          ".watch-btn"
        );


      if (watch) {

        event.preventDefault();

        const symbol =
          watch.dataset.symbol;

        toggleWatchlistItem(
          symbol
        );

        applyMarketFilters();

        return;

      }


      /* PAGINATION */

      const pageButton =
        event.target.closest(
          "[data-page-action]"
        );


      if (pageButton) {

        const action =
          pageButton.dataset
            .pageAction;


        const maxPage =
          Math.ceil(
            MARKET_STATE.filtered.length /
            MARKET_STATE.perPage
          );


        if (
          action === "prev" &&
          MARKET_STATE.page > 1
        ) {

          MARKET_STATE.page--;

        }


        if (
          action === "next" &&
          MARKET_STATE.page < maxPage
        ) {

          MARKET_STATE.page++;

        }


        renderMarkets();

      }

    }
  );


  /* FILTER BUTTONS */

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-market-filter]"
        );

      if (!button) return;


      MARKET_STATE.filter =
        button.dataset.marketFilter;


      MARKET_STATE.page = 1;


      document
        .querySelectorAll(
          "[data-market-filter]"
        )
        .forEach(
          item =>
            item.classList.remove(
              "active"
            )
        );


      button.classList.add(
        "active"
      );


      applyMarketFilters();

    }
  );


  /* SORT */

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-market-sort]"
        );

      if (!button) return;


      const sort =
        button.dataset.marketSort;


      if (
        MARKET_STATE.sort === sort
      ) {

        MARKET_STATE.sortDirection =
          MARKET_STATE.sortDirection ===
          "asc"
            ? "desc"
            : "asc";

      } else {

        MARKET_STATE.sort = sort;

        MARKET_STATE.sortDirection =
          "desc";

      }


      applyMarketFilters();

    }
  );

}


/* =========================================
   INIT
========================================= */

function initMarkets() {

  initMarketEvents();

  loadMarkets();

}


/* =========================================
   GLOBAL
========================================= */

window.NEXTRA_MARKETS = {

  state:
    MARKET_STATE,

  load:
    loadMarkets,

  filter:
    applyMarketFilters

};


/* =========================================
   AUTO INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      marketEl("market-list")
    ) {

      initMarkets();

    }

  }
);
