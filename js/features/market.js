// market.js — NEXTRA Markets V8
// DUAL-PHASE LOADING
// BINANCE FIRST + COINGECKO BACKGROUND
// SEARCH + FILTER + SORT + WATCHLIST + XP


const MARKET_STATE = {

  coins: [],

  filtered: [],

  page: 1,

  perPage: 25,

  dataLimit: 100,

  search: "",

  filter: "all",

  sort: "market_cap",

  sortDirection: "desc",

  watchlistOnly: false,

  loading: false,

  enriching: false

};


/* =========================================
   ELEMENTS
========================================= */

function marketEl(
  id
) {

  return document.getElementById(
    id
  );

}


/* =========================================
   WATCHLIST HELPERS
========================================= */

function getNormalizedWatchlist() {

  if (
    typeof loadWatchlist !==
    "function"
  ) {

    return [];

  }


  const list =
    loadWatchlist();


  if (
    !Array.isArray(list)
  ) {

    return [];

  }


  return list
    .map(
      symbol =>
        String(
          symbol || ""
        )
          .trim()
          .toUpperCase()
    )
    .filter(Boolean);

}


function isCoinInWatchlist(
  symbol
) {

  const normalized =
    String(
      symbol || ""
    )
      .trim()
      .toUpperCase();


  return getNormalizedWatchlist()
    .includes(
      normalized
    );

}


/* =========================================
   WATCHLIST SYNC EVENT
========================================= */

function emitWatchlistChanged(
  symbol,
  action
) {

  window.dispatchEvent(

    new CustomEvent(
      "nextra:watchlist-changed",
      {

        detail: {

          symbol:
            String(
              symbol || ""
            )
              .trim()
              .toUpperCase(),

          action:
            action || "toggle",

          timestamp:
            Date.now()

        }

      }

    )

  );

}


/* =========================================
   LOAD MARKETS
========================================= */

async function loadMarkets() {

  const container =
    marketEl(
      "market-list"
    );


  MARKET_STATE.loading =
    true;


  MARKET_STATE.enriching =
    false;


  if (container) {

    container.innerHTML = `

      <div class="loading">
        Memuat market...
      </div>

    `;

  }


  try {

    /*
     * =====================================
     * PHASE 1
     * BINANCE FIRST
     * =====================================
     *
     * Hanya tunggu Binance.
     *
     * Tidak ada CoinGecko di sini.
     */

    const coins =
      await NEXTRA_API
        .fetchNormalizedMarkets({

          total:
            MARKET_STATE.dataLimit

        });


    if (
      !Array.isArray(coins)
    ) {

      throw new Error(
        "Data market tidak valid"
      );

    }


    MARKET_STATE.coins =
      coins;


    MARKET_STATE.page =
      1;


    MARKET_STATE.loading =
      false;


    /*
     * RENDER SEKARANG.
     *
     * User tidak perlu menunggu
     * CoinGecko.
     */

    applyMarketFilters();


    /*
     * =====================================
     * PHASE 2
     * COINGECKO BACKGROUND
     * =====================================
     */

    enrichMarketsInBackground();


  }

  catch (error) {

    console.error(
      "NEXTRA Markets:",
      error
    );


    MARKET_STATE.loading =
      false;


    if (container) {

      renderError(

        container,

        "Gagal memuat market. Coba lagi.",

        loadMarkets

      );

    }

  }

}


/* =========================================
   COINGECKO BACKGROUND ENRICHMENT
========================================= */

async function enrichMarketsInBackground() {

  if (
    MARKET_STATE.enriching
  ) {

    return;

  }


  if (
    !MARKET_STATE.coins.length
  ) {

    return;

  }


  MARKET_STATE.enriching =
    true;


  /*
   * Berikan browser waktu untuk
   * menyelesaikan first render.
   */

  await new Promise(
    resolve =>
      setTimeout(
        resolve,
        50
      )
  );


  try {

    const currentCoins =
      MARKET_STATE.coins;


    const enriched =
      await NEXTRA_API
        .enrichMarketsWithCoinGecko(

          currentCoins,

          {

            limit:
              250

          }

        );


    if (
      !Array.isArray(
        enriched
      )
    ) {

      return;

    }


    /*
     * Buat map berdasarkan symbol.
     */

    const enrichedMap =
      new Map();


    enriched.forEach(
      coin => {

        const symbol =
          String(
            coin.symbol || ""
          )
            .trim()
            .toUpperCase();


        if (!symbol) {
          return;
        }


        enrichedMap.set(
          symbol,
          coin
        );

      }
    );


    /*
     * Merge ke state.
     */

    MARKET_STATE.coins =
      MARKET_STATE.coins.map(
        coin => {

          const symbol =
            String(
              coin.symbol || ""
            )
              .trim()
              .toUpperCase();


          const updated =
            enrichedMap.get(
              symbol
            );


          if (!updated) {

            return coin;

          }


          return {

            ...coin,

            ...updated,

            /*
             * Harga realtime tetap
             * dari Binance.
             */

            price:
              coin.price,

            change24h:
              coin.change24h,

            volume:
              coin.volume,

            high24h:
              coin.high24h,

            low24h:
              coin.low24h

          };

        }

      );


    /*
     * Render ulang setelah
     * CoinGecko selesai.
     */

    applyMarketFilters();

  }

  catch (error) {

    /*
     * CoinGecko error tidak boleh
     * merusak Markets.
     */

    console.warn(
      "NEXTRA CoinGecko enrichment skipped:",
      error
    );

  }

  finally {

    MARKET_STATE.enriching =
      false;

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
      data.filter(
        coin => {

          const name =
            String(
              coin.name || ""
            )
              .toLowerCase();


          const symbol =
            String(
              coin.symbol || ""
            )
              .toLowerCase();


          return (

            name.includes(
              query
            ) ||

            symbol.includes(
              query
            )

          );

        }

      );

  }


  /* WATCHLIST */

  if (
    MARKET_STATE.watchlistOnly
  ) {

    const watchlist =
      getNormalizedWatchlist();


    data =
      data.filter(
        coin =>
          watchlist.includes(

            String(
              coin.symbol || ""
            )
              .trim()
              .toUpperCase()

          )

      );

  }


  /* FILTER */

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
            Number(
              b.change24h
            )
          ) -

          Math.abs(
            Number(
              a.change24h
            )
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
            Number(
              a.price
            ) || 0;

          valueB =
            Number(
              b.price
            ) || 0;

          break;


        case "change1h":

          valueA =
            Number(
              a.change1h
            ) || 0;

          valueB =
            Number(
              b.change1h
            ) || 0;

          break;


        case "change24h":

          valueA =
            Number(
              a.change24h
            ) || 0;

          valueB =
            Number(
              b.change24h
            ) || 0;

          break;


        case "change7d":

          valueA =
            Number(
              a.change7d
            ) || 0;

          valueB =
            Number(
              b.change7d
            ) || 0;

          break;


        case "volume":

          valueA =
            Number(
              a.volume
            ) || 0;

          valueB =
            Number(
              b.volume
            ) || 0;

          break;


        case "market_cap":

        default:

          valueA =
            Number(
              a.marketCap
            ) || 0;

          valueB =
            Number(
              b.marketCap
            ) || 0;

      }


      return (
        valueA -
        valueB
      ) * direction;

    }

  );


  MARKET_STATE.filtered =
    data;


  /* PAGE SAFETY */

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
    marketEl(
      "market-list"
    );


  if (!container) {
    return;
  }


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


  if (
    !visible.length
  ) {

    container.innerHTML = `

      <div class="empty-state">

        Tidak ada coin atau token
        ditemukan.

      </div>

    `;


    renderPagination(
      0
    );


    return;

  }


  container.innerHTML =
    visible
      .map(
        renderMarketCard
      )
      .join("");


  renderPagination(
    total
  );

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


  const isFavorite =
    isCoinInWatchlist(
      coin.symbol
    );


  const enriched =
    coin.enriched === true;


  return `

    <article
      class="coin-card market-card"
      data-coin-id="${coin.id}"
      data-enriched="${
        enriched
          ? "true"
          : "false"
      }"
      role="link"
      tabindex="0"
      style="cursor:pointer;"
    >

      <div
        class="market-rank"
        style="
          width:30px;
          flex-shrink:0;
          color:var(--muted);
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
          class="
            coin-change
            ${changeClass}
          "
        >

          ${sign}${change24.toFixed(2)}%

        </div>

      </div>


      <button
        type="button"
        class="watch-btn"
        data-symbol="${coin.symbol}"
        title="${
          isFavorite
            ? "Hapus dari Watchlist"
            : "Tambah ke Watchlist"
        }"
        aria-label="${
          isFavorite
            ? "Hapus "
            : "Tambah "
        }${coin.symbol} ${
          isFavorite
            ? "dari"
            : "ke"
        } Watchlist"
        aria-pressed="${
          isFavorite
            ? "true"
            : "false"
        }"
        style="
          border:0;
          background:none;
          color:${
            isFavorite
              ? "var(--green)"
              : "var(--muted)"
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


  if (
    price >= 1000
  ) {

    return "$" +

      price.toLocaleString(
        "en-US",
        {
          maximumFractionDigits:
            0
        }
      );

  }


  if (
    price >= 1
  ) {

    return "$" +
      price.toFixed(2);

  }


  if (
    price >= 0.01
  ) {

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


  if (!container) {
    return;
  }


  const pages =
    Math.ceil(
      total /
      MARKET_STATE.perPage
    );


  if (
    pages <= 1
  ) {

    container.innerHTML =
      "";

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
        color:var(--muted);
        font-size:12px;
        font-weight:700;
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


  /* SEARCH */

  if (search) {

    search.addEventListener(
      "input",
      event => {

        MARKET_STATE.search =
          event.target.value;


        MARKET_STATE.page =
          1;


        applyMarketFilters();

      }
    );

  }


  /* CLICK EVENTS */

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
          String(
            watch.dataset.symbol ||
            ""
          )
            .trim()
            .toUpperCase();


        if (!symbol) {
          return;
        }


        const beforeWatchlist =
          getNormalizedWatchlist();


        const wasFavorite =
          beforeWatchlist.includes(
            symbol
          );


        toggleWatchlistItem(
          symbol
        );


        const afterWatchlist =
          getNormalizedWatchlist();


        const isFavoriteNow =
          afterWatchlist.includes(
            symbol
          );


        if (
          !wasFavorite &&
          isFavoriteNow &&
          window.NEXTRA_XP &&
          typeof
            window.NEXTRA_XP.add ===
            "function"
        ) {

          window.NEXTRA_XP.add(
            25
          );

        }


        emitWatchlistChanged(

          symbol,

          isFavoriteNow
            ? "added"
            : "removed"

        );


        applyMarketFilters();

        return;

      }


      /* COIN CLICK */

      const card =
        event.target.closest(
          ".market-card"
        );


      if (card) {

        const coinId =
          card.dataset.coinId;


        const enriched =
          card.dataset.enriched ===
          "true";


        /*
         * Sebelum CoinGecko selesai,
         * jangan buka Coin Detail
         * dengan temporary Binance ID.
         */

        if (
          coinId &&
          enriched
        ) {

          window.location.href =
            "coin.html?id=" +
            encodeURIComponent(
              coinId
            );

        }

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
          Math.max(

            1,

            Math.ceil(

              MARKET_STATE
                .filtered
                .length /
              MARKET_STATE.perPage

            )

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

        return;

      }

    }

  );


  /* KEYBOARD COIN CLICK */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {

        return;

      }


      const card =
        event.target.closest(
          ".market-card"
        );


      if (!card) {
        return;
      }


      if (
        event.target.closest(
          ".watch-btn"
        )
      ) {

        return;

      }


      if (
        card.dataset.enriched !==
        "true"
      ) {

        return;

      }


      event.preventDefault();


      const coinId =
        card.dataset.coinId;


      if (coinId) {

        window.location.href =
          "coin.html?id=" +
          encodeURIComponent(
            coinId
          );

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


      if (!button) {
        return;
      }


      const filter =
        button.dataset
          .marketFilter;


      if (
        filter ===
        "watchlist"
      ) {

        MARKET_STATE.watchlistOnly =
          !MARKET_STATE.watchlistOnly;

      }

      else {

        MARKET_STATE.watchlistOnly =
          false;

      }


      MARKET_STATE.filter =
        filter;


      MARKET_STATE.page =
        1;


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


      if (!button) {
        return;
      }


      const sort =
        button.dataset
          .marketSort;


      if (
        MARKET_STATE.sort ===
        sort
      ) {

        MARKET_STATE.sortDirection =

          MARKET_STATE
            .sortDirection ===
          "asc"

            ? "desc"

            : "asc";

      }

      else {

        MARKET_STATE.sort =
          sort;

        MARKET_STATE.sortDirection =
          "desc";

      }


      MARKET_STATE.page =
        1;


      applyMarketFilters();

    }

  );


  /* =========================================
     WATCHLIST EXTERNAL SYNC
  ========================================= */

  window.addEventListener(
    "nextra:watchlist-changed",
    event => {

      const detail =
        event.detail || {};


      const symbol =
        String(
          detail.symbol || ""
        )
          .trim()
          .toUpperCase();


      if (
        symbol ||
        MARKET_STATE.watchlistOnly
      ) {

        applyMarketFilters();

      }

    }

  );

}


/* =========================================
   INIT
========================================= */

function initMarkets() {

  initMarketEvents();


  /*
   * Home search:
   *
   * markets.html?search=bitcoin
   */

  const params =
    new URLSearchParams(
      window.location.search
    );


  const searchParam =
    params.get(
      "search"
    );


  if (searchParam) {

    MARKET_STATE.search =
      searchParam.trim();


    const searchInput =
      marketEl(
        "market-search"
      );


    if (searchInput) {

      searchInput.value =
        MARKET_STATE.search;

    }

  }


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