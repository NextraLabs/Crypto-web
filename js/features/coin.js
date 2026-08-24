// coin.js — NEXTRA Coin Detail V4
// Coin Detail + Chart + Watchlist Sync + ATH/ATL + Market Data

const COIN_STATE = {
  id: null,
  data: null,
  loading: false,
  watchlisted: false
};


/* =========================================
   HELPERS
========================================= */

function coinEl(id) {
  return document.getElementById(id);
}


function getCoinId() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  return (
    params.get("id") ||
    params.get("coin") ||
    ""
  ).trim();

}


function safeNumber(value) {

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : null;

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatCoinPrice(value) {

  const price =
    safeNumber(value);

  if (price === null) return "-";


  if (price >= 1000) {

    return "$" +
      price.toLocaleString(
        "en-US",
        {
          maximumFractionDigits: 2
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
   FORMAT LARGE NUMBER
========================================= */

function formatLargeNumber(value) {

  const number =
    safeNumber(value);

  if (number === null) return "-";


  const absolute =
    Math.abs(number);


  if (absolute >= 1e12) {

    return (
      number / 1e12
    ).toFixed(2) + "T";

  }


  if (absolute >= 1e9) {

    return (
      number / 1e9
    ).toFixed(2) + "B";

  }


  if (absolute >= 1e6) {

    return (
      number / 1e6
    ).toFixed(2) + "M";

  }


  if (absolute >= 1e3) {

    return (
      number / 1e3
    ).toFixed(2) + "K";

  }


  return number.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0
    }
  );

}


/* =========================================
   FORMAT CHANGE
========================================= */

function formatChange(value) {

  const change =
    safeNumber(value);

  if (change === null) return "-";


  return (
    change >= 0
      ? "+"
      : ""
  ) +
  change.toFixed(2) +
  "%";

}


function changeClass(value) {

  const change =
    safeNumber(value);

  if (change === null) {
    return "dim";
  }


  return change >= 0
    ? "up"
    : "down";

}


/* =========================================
   WATCHLIST
   -----------------------------------------
   IMPORTANT:
   Watchlist utama menggunakan COINGECKO ID.
   Markets akan disinkronkan melalui ID
   jika tersedia.
========================================= */

function getWatchlist() {

  try {

    const saved =
      localStorage.getItem(
        "nextra_watchlist"
      );


    if (!saved) return [];


    const parsed =
      JSON.parse(saved);


    return Array.isArray(parsed)
      ? parsed
      : [];

  }

  catch (error) {

    console.warn(
      "NEXTRA Watchlist:",
      error
    );

    return [];

  }

}


function saveWatchlist(list) {

  try {

    localStorage.setItem(
      "nextra_watchlist",
      JSON.stringify(list)
    );

  }

  catch (error) {

    console.warn(
      "Gagal menyimpan watchlist:",
      error
    );

  }

}


/* =========================================
   WATCHLIST STATUS
========================================= */

function checkWatchlistStatus() {

  const data =
    COIN_STATE.data;

  if (!data?.id) {

    COIN_STATE.watchlisted =
      false;

    return;

  }


  const watchlist =
    getWatchlist();


  /*
   * Primary:
   * CoinGecko ID
   */

  if (
    watchlist.includes(
      data.id
    )
  ) {

    COIN_STATE.watchlisted =
      true;

    return;

  }


  /*
   * Compatibility:
   * Jika watchlist lama menggunakan
   * symbol.
   */

  const symbol =
    (
      data.symbol ||
      ""
    ).toUpperCase();


  COIN_STATE.watchlisted =
    watchlist.some(
      item =>
        String(item)
          .toUpperCase() ===
        symbol
    );

}


/* =========================================
   UPDATE WATCH BUTTON
========================================= */

function updateCoinWatchButton() {

  const button =
    coinEl(
      "coin-watch"
    );


  if (!button) return;


  button.textContent =
    COIN_STATE.watchlisted
      ? "★"
      : "☆";


  button.style.color =
    COIN_STATE.watchlisted
      ? "var(--accent)"
      : "";


  button.title =
    COIN_STATE.watchlisted
      ? "Hapus dari Watchlist"
      : "Tambah ke Watchlist";


  button.setAttribute(
    "aria-label",
    COIN_STATE.watchlisted
      ? "Hapus dari Watchlist"
      : "Tambah dari Watchlist"
  );

}


/* =========================================
   TOGGLE WATCHLIST
========================================= */

function toggleCoinWatchlist() {

  const data =
    COIN_STATE.data;


  if (!data?.id) return;


  let watchlist =
    getWatchlist();


  const id =
    data.id;


  const symbol =
    (
      data.symbol ||
      ""
    ).toUpperCase();


  /*
   * Cari berdasarkan ID
   */

  let index =
    watchlist.indexOf(
      id
    );


  /*
   * Kalau tidak ditemukan,
   * cek format lama symbol.
   */

  if (index < 0) {

    index =
      watchlist.findIndex(
        item =>
          String(item)
            .toUpperCase() ===
          symbol
      );

  }


  /* REMOVE */

  if (index >= 0) {

    watchlist.splice(
      index,
      1
    );


    COIN_STATE.watchlisted =
      false;

  }


  /* ADD */

  else {

    watchlist.push(
      id
    );


    COIN_STATE.watchlisted =
      true;


    /*
     * XP +25 hanya ketika
     * benar-benar menambahkan.
     */

    if (
      window.NEXTRA_XP &&
      typeof
        window.NEXTRA_XP.add ===
        "function"
    ) {

      window.NEXTRA_XP.add(
        25
      );

    }

  }


  saveWatchlist(
    watchlist
  );


  updateCoinWatchButton();

}


/* =========================================
   LOAD COIN
========================================= */

async function loadCoin() {

  if (
    COIN_STATE.loading
  ) {

    return;

  }


  const id =
    COIN_STATE.id ||
    getCoinId();


  if (!id) {

    showCoinError(
      "Coin ID tidak ditemukan."
    );

    return;

  }


  COIN_STATE.id =
    id;


  COIN_STATE.loading =
    true;


  showCoinLoading();


  try {

    if (
      typeof NEXTRA_API ===
      "undefined"
    ) {

      throw new Error(
        "NEXTRA_API tidak tersedia"
      );

    }


    const data =
      await NEXTRA_API.fetchCoin(
        id
      );


    if (
      !data ||
      !data.id
    ) {

      throw new Error(
        "Data coin tidak valid"
      );

    }


    COIN_STATE.data =
      data;


    checkWatchlistStatus();


    renderCoin();

  }

  catch (error) {

    console.error(
      "NEXTRA Coin:",
      error
    );


    showCoinError(
      "Gagal memuat data coin."
    );

  }

  finally {

    COIN_STATE.loading =
      false;

  }

}


/* =========================================
   LOADING
========================================= */

function showCoinLoading() {

  const loading =
    coinEl(
      "coin-loading"
    );


  const content =
    coinEl(
      "coin-content"
    );


  const error =
    coinEl(
      "coin-error"
    );


  if (loading) {

    loading.style.display =
      "block";

  }


  if (content) {

    content.style.display =
      "none";

  }


  if (error) {

    error.style.display =
      "none";

  }

}


/* =========================================
   ERROR
========================================= */

function showCoinError(
  message
) {

  const loading =
    coinEl(
      "coin-loading"
    );


  const content =
    coinEl(
      "coin-content"
    );


  const error =
    coinEl(
      "coin-error"
    );


  if (loading) {

    loading.style.display =
      "none";

  }


  if (content) {

    content.style.display =
      "none";

  }


  if (!error) return;


  error.style.display =
    "block";


  const box =
    error.querySelector(
      ".error-box"
    );


  if (!box) return;


  box.innerHTML = `

    ⚠️ ${escapeHTML(
      message
    )}

    <br><br>

    <button
      class="primary-btn"
      id="coin-retry"
    >
      Coba Lagi
    </button>

  `;


  coinEl(
    "coin-retry"
  )?.addEventListener(
    "click",
    loadCoin
  );

}


/* =========================================
   RENDER COIN
========================================= */

function renderCoin() {

  const data =
    COIN_STATE.data;


  if (!data) return;


  const market =
    data.market_data || {};


  const currentPrice =
    market
      .current_price
      ?.usd;


  const change1h =
    market
      .price_change_percentage_1h_in_currency
      ?.usd;


  const change24h =
    market
      .price_change_percentage_24h_in_currency
      ?.usd;


  const change7d =
    market
      .price_change_percentage_7d_in_currency
      ?.usd;


  const marketCap =
    market
      .market_cap
      ?.usd;


  const fullyDiluted =
    market
      .fully_diluted_valuation
      ?.usd;


  const volume =
    market
      .total_volume
      ?.usd;


  const high24h =
    market
      .high_24h
      ?.usd;


  const low24h =
    market
      .low_24h
      ?.usd;


  const circulating =
    market
      .circulating_supply;


  const totalSupply =
    market
      .total_supply;


  const maxSupply =
    market
      .max_supply;


  const ath =
    market
      .ath
      ?.usd;


  const athChange =
    market
      .ath_change_percentage
      ?.usd;


  const atl =
    market
      .atl
      ?.usd;


  const atlChange =
    market
      .atl_change_percentage
      ?.usd;


  /* =====================================
     HEADER
  ===================================== */

  setHTML(
    "coin-title",
    `${escapeHTML(
      data.name ||
      "Coin"
    )}<span class="dot">.</span>`
  );


  setText(
    "coin-subtitle",
    (
      data.symbol ||
      ""
    ).toUpperCase()
  );


  /* =====================================
     HERO
  ===================================== */

  const image =
    coinEl(
      "coin-image"
    );


  if (image) {

    image.src =
      data.image?.large ||
      data.image?.small ||
      data.image?.thumb ||
      "";


    image.alt =
      data.name ||
      "";

  }


  setText(
    "coin-name",
    data.name ||
    "-"
  );


  setText(
    "coin-symbol",
    (
      data.symbol ||
      "-"
    ).toUpperCase()
  );


  setText(
    "coin-price",
    formatCoinPrice(
      currentPrice
    )
  );


  setChange(
    "coin-change",
    change24h
  );


  /* =====================================
     PERFORMANCE
  ===================================== */

  setChange(
    "change-1h",
    change1h
  );


  setChange(
    "change-24h",
    change24h
  );


  setChange(
    "change-7d",
    change7d
  );


  /* =====================================
     MARKET DATA
  ===================================== */

  setText(
    "market-cap",
    formatLargeNumber(
      marketCap
    )
  );


  setText(
    "volume",
    formatLargeNumber(
      volume
    )
  );


  setText(
    "high-24h",
    formatCoinPrice(
      high24h
    )
  );


  setText(
    "low-24h",
    formatCoinPrice(
      low24h
    )
  );


  /* =====================================
     OPTIONAL FDV
  ===================================== */

  setText(
    "fdv",
    formatLargeNumber(
      fullyDiluted
    )
  );


  /* =====================================
     SUPPLY
  ===================================== */

  setText(
    "circulating",
    formatLargeNumber(
      circulating
    )
  );


  setText(
    "total-supply",
    formatLargeNumber(
      totalSupply
    )
  );


  setText(
    "max-supply",
    maxSupply === null ||
    maxSupply === undefined
      ? "∞ / N/A"
      : formatLargeNumber(
          maxSupply
        )
  );


  /* =====================================
     ATH / ATL
  ===================================== */

  setText(
    "ath",
    formatCoinPrice(
      ath
    )
  );


  setChange(
    "ath-change",
    athChange
  );


  setText(
    "atl",
    formatCoinPrice(
      atl
    )
  );


  setChange(
    "atl-change",
    atlChange
  );


  /* =====================================
     RANK
  ===================================== */

  setText(
    "coin-rank",
    data.market_cap_rank
      ? "#" +
        data.market_cap_rank
      : "-"
  );


  /* =====================================
     CHART
  ===================================== */

  renderChart(
    market
      .sparkline_7d
      ?.price ||
    []
  );


  /* =====================================
     WATCHLIST
  ===================================== */

  updateCoinWatchButton();


  /* =====================================
     SHOW CONTENT
  ===================================== */

  const loading =
    coinEl(
      "coin-loading"
    );


  const content =
    coinEl(
      "coin-content"
    );


  const error =
    coinEl(
      "coin-error"
    );


  if (loading) {

    loading.style.display =
      "none";

  }


  if (error) {

    error.style.display =
      "none";

  }


  if (content) {

    content.style.display =
      "block";

  }

}


/* =========================================
   SETTERS
========================================= */

function setText(
  id,
  value
) {

  const element =
    coinEl(id);


  if (!element) return;


  element.textContent =
    value;

}


function setHTML(
  id,
  value
) {

  const element =
    coinEl(id);


  if (!element) return;


  element.innerHTML =
    value;

}


function setChange(
  id,
  value
) {

  const element =
    coinEl(id);


  if (!element) return;


  element.textContent =
    formatChange(
      value
    );


  element.className =
    changeClass(
      value
    );

}


/* =========================================
   CHART
========================================= */

function renderChart(
  prices
) {

  const container =
    coinEl(
      "coin-chart"
    );


  if (!container) return;


  const values =
    Array.isArray(prices)
      ? prices
          .map(Number)
          .filter(
            Number.isFinite
          )
      : [];


  if (
    values.length < 2
  ) {

    container.innerHTML = `

      <div
        class="dim"
        style="
          text-align:center;
          padding-top:70px;
          font-size:8px;
        "
      >
        Chart tidak tersedia.
      </div>

    `;

    return;

  }


  const width =
    Math.max(
      container.clientWidth,
      300
    );


  const height =
    170;


  const padding =
    8;


  const min =
    Math.min(
      ...values
    );


  const max =
    Math.max(
      ...values
    );


  const range =
    max - min || 1;


  const points =
    values
      .map(
        (
          value,
          index
        ) => {

          const x =
            padding +
            (
              index /
              (
                values.length -
                1
              )
            ) *
            (
              width -
              padding * 2
            );


          const y =
            height -
            padding -
            (
              (
                value -
                min
              ) /
              range
            ) *
            (
              height -
              padding * 2
            );


          return (
            `${x},${y}`
          );

        }
      )
      .join(" ");


  const first =
    values[0];


  const last =
    values[
      values.length - 1
    ];


  const accent =
    getComputedStyle(
      document.documentElement
    )
      .getPropertyValue(
        "--accent"
      )
      .trim() ||
    "#42f5a7";


  const gradientId =
    "coinGradient";


  container.innerHTML = `

    <svg
      width="100%"
      height="${height}"
      viewBox="
        0 0
        ${width}
        ${height}
      "
      preserveAspectRatio="none"
      style="
        display:block;
        overflow:visible;
      "
    >

      <defs>

        <linearGradient
          id="${gradientId}"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >

          <stop
            offset="0%"
            stop-color="${accent}"
            stop-opacity="0.28"
          />

          <stop
            offset="100%"
            stop-color="${accent}"
            stop-opacity="0"
          />

        </linearGradient>

      </defs>


      <polygon
        points="
          ${padding},${height - padding}
          ${points}
          ${width - padding},${height - padding}
        "
        fill="url(#${gradientId})"
      />


      <polyline
        points="${points}"
        fill="none"
        stroke="${accent}"
        stroke-width="2"
        vector-effect="
          non-scaling-stroke
        "
      />

    </svg>


    <div
      class="dim"
      style="
        position:absolute;
        left:8px;
        bottom:2px;
        font-size:7px;
      "
    >
      ${formatCoinPrice(min)}
    </div>


    <div
      class="dim"
      style="
        position:absolute;
        right:8px;
        top:2px;
        font-size:7px;
      "
    >
      ${formatCoinPrice(max)}
    </div>

  `;


  container.dataset.direction =
    last >= first
      ? "up"
      : "down";

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(
  value
) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================
   EVENTS
========================================= */

function initCoinEvents() {

  coinEl(
    "coin-back"
  )?.addEventListener(
    "click",
    () => {

      if (
        document.referrer &&
        document.referrer.includes(
          location.host
        )
      ) {

        history.back();

      }

      else {

        window.location.href =
          "markets.html";

      }

    }
  );


  coinEl(
    "coin-refresh"
  )?.addEventListener(
    "click",
    () => {

      /*
       * Paksa reload data.
       */

      loadCoin();

    }
  );


  coinEl(
    "coin-watch"
  )?.addEventListener(
    "click",
    () => {

      toggleCoinWatchlist();

    }
  );

}


/* =========================================
   INIT
========================================= */

function initCoin() {

  COIN_STATE.id =
    getCoinId();


  initCoinEvents();


  loadCoin();

}


/* =========================================
   GLOBAL
========================================= */

window.NEXTRA_COIN = {

  state:
    COIN_STATE,

  load:
    loadCoin

};


/* =========================================
   AUTO INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      coinEl(
        "coin-content"
      )
    ) {

      initCoin();

    }

  }
);