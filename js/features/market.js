// market.js — NEXTRA Markets V3
// 250 COINS / TOKENS + SEARCH + FILTER + SORT + WATCHLIST

const MARKET_STATE = {

  coins: [],

  filtered: [],

  page: 1,

  // Jumlah yang tampil setiap halaman
  perPage: 25,

  // Jumlah data yang diambil dari CoinGecko
  dataLimit: 250,

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
        Memuat market...
      </div>
    `;

  }


  try {

    const coins =
      await NEXTRA_API.fetchNormalizedMarkets({

        page: 1,

        perPage:
          MARKET_STATE.dataLimit

      });


    if (!Array.isArray(coins)) {

      throw new Error(
        "Data market tidak valid"
      );

    }


    MARKET_STATE.coins =
      coins;


    MARKET_STATE.page = 1;


    applyMarketFilters();


  } catch (error) {

    console.error(
      "NEXTRA Markets:",
      error
    );


    if (container) {

      renderError(
        container,
        "Gagal memuat market. Coba refresh.",
        loadMarkets
      );

    }


  } finally {

    MARKET_STATE.loading = false;

  }

}


/* =========================================
   FILTER + SEARCH + SORT
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
      data.filter(coin => {

        const name =
          String(
            coin.name || ""
          ).toLowerCase();


        const symbol =
          String(
            coin.symbol || ""
          ).toLowerCase();


        return (
          name.includes(query) ||
          symbol.includes(query)
        );

      });

  }


  /* WATCHLIST */

  if (
    MARKET_STATE.watchlistOnly
  ) {

    const watchlist =
      loadWatchlist();


    data =
      data.filter(
        coin =>
          watchlist.includes(
            coin.symbol
          )
      );

  }


  /* GAINERS */

  if (
    MARKET_STATE.filter ===
    "gainers"
  ) {

    data =
      data.filter(
        coin =>
          Number(
            coin.change24h
          ) > 0
      );

  }


  /* LOSERS */

  if (
    MARKET_STATE.filter ===
    "losers"
  ) {

    data =
      data.filter(
        coin =>
          Number(
            coin.change24h
          ) < 0
      );

  }


  /* TRENDING */

  if (
    MARKET_STATE.filter ===
    "trending"
  ) {

    data =
      [...data].sort(
        (a, b) =>
          Math.abs(
            Number(b.change24h)
          ) -
          Math.abs(
            Number(a.change24h)
          )
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

          valueA =
            Number(a.price) || 0;

          valueB =
            Number(b.price) || 0;

          break;


        case "change1h":

          valueA =
            Number(a.change1h) || 0;

          valueB =
            Number(b.change1h) || 0;

          break;


        case "change24h":

          valueA =
            Number(a.change24h) || 0;

          valueB =
            Number(b.change24h) || 0;

          break;


        case "change7d":

          valueA =
            Number(a.change7d) || 0;

          valueB =
            Number(b.change7d) || 0;

          break;


        case "volume":

          valueA =
            Number(a.volume) || 0;

          valueB =
            Number(b.volume) || 0;

          break;


        case "market_cap":

        default:

          valueA =
            Number(a.marketCap) || 0;

          valueB =
            Number(b.marketCap) || 0;

      }


      return (
        valueA - valueB
      ) * direction;

    }
  );


  MARKET_STATE.filtered =
    data;


  /* SAFETY */

  const maxPage =
    Math.max(
      1,
      Math.ceil(
        data.length /
        MARKET_STATE.perPage
      )
    );


  if (
    MARKET_STATE.page >
    maxPage
  ) {

    MARKET_STATE.page =
      maxPage;

  }


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
    (
      MARKET_STATE.page - 1
    ) *
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
        Tidak ada coin atau token ditemukan.
      </div>
    `;


    renderPagination(0);

    return;

  }


  container.innerHTML =
    visible
      .map(
        renderMarketCard
      )
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
    Number(
      coin.change24h
    ) || 0;


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
          width:30px;
          flex-shrink:0;
          color:var(--faint);
          font-size:10px;
          text-align:center;
        "
      >
        #${coin.rank}
      </div>


      ${
        coin.image
          ? `
            <img
              src="${coin.image}"
              alt="${coin.name}"
              width="36"
              height="36"
              style="
                width:36px;
                height:36px;
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
          min-width:95px;
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
        aria-label="Watchlist ${coin.symbol}"
        style="
          border:0;
          background:none;
          color:${
            isFavorite
              ? "var(--accent)"
              : "var(--faint)"
          };
          font-size:19px;
          cursor:pointer;
          padding:7px;
        "
      >

        ${
          isFavorite
            ? "★"
            : "☆"
        }

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

  price =
    Number(price);


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
    price.toPrecision(5);

}


/* =========================================
   MARKET STATS
========================================= */

function renderMarketStats() {

  const total =
    marketEl(
      "market-total"
    );


  const gainers =
    marketEl(
      "market-gainers"
    );


  const losers =
    marketEl(
      "market-losers"
    );


  if (total) {

    total.textContent =
      MARKET_STATE
        .filtered
        .length;

  }


  if (gainers) {

    gainers.textContent =
      MARKET_STATE
        .filtered
        .filter(
          coin =>
            Number(
              coin.change24h
            ) > 0
        )
        .length;

  }


  if (losers) {

    losers.textContent =
      MARKET_STATE
        .filtered
        .filter(
          coin =>
            Number(
              coin.change24h
            ) < 0
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
        padding:0 14px;
        color:var(--dim);
        font-size:12px;
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

        event.stopPropagation();


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


  /* FILTER */

  document.addEventListener(
    "click",
    event => {

      const button =
        event.target.closest(
          "[data-market-filter]"
        );


      if (!button) return;


      MARKET_STATE.filter =
        button.dataset
          .marketFilter;


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
        button.dataset
          .marketSort;


      if (
        MARKET_STATE.sort ===
        sort
      ) {

        MARKET_STATE.sortDirection =
          MARKET_STATE.sortDirection ===
          "asc"
            ? "desc"
            : "asc";

      } else {

        MARKET_STATE.sort =
          sort;

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
      marketEl(
        "market-list"
      )
    ) {

      initMarkets();

    }

  }
);
