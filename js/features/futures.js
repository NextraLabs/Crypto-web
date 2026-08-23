// futures.js — NEXTRA Futures V2
// Funding + Open Interest + Volume + Market Bias + Risk

const FUTURES_STATE = {

  symbols: [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT",
    "BNBUSDT",
    "XRPUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "AVAXUSDT",
    "LINKUSDT",
    "SUIUSDT"
  ],

  data: [],

  loading: false,

  lastUpdate: null

};


/* =========================================
   ELEMENT
========================================= */

function futuresEl(id) {

  return document.getElementById(id);

}


/* =========================================
   LOAD
========================================= */

async function loadFutures() {

  const container =
    futuresEl("futures-content");

  if (!container) return;

  if (FUTURES_STATE.loading) return;

  FUTURES_STATE.loading = true;


  container.innerHTML = `
    <div class="loading">
      Memuat Futures...
    </div>
  `;


  try {

    const data =
      await NEXTRA_API.fetchFuturesMarkets(
        FUTURES_STATE.symbols
      );


    FUTURES_STATE.data =
      Array.isArray(data)
        ? data
        : [];


    FUTURES_STATE.lastUpdate =
      new Date();


    renderFutures();

  }

  catch (error) {

    console.error(
      "NEXTRA Futures:",
      error
    );


    container.innerHTML = `

      <div class="error-box">

        ⚠️ Gagal memuat Futures.

        <br>

        <button
          class="icon-btn"
          style="margin-top:10px;"
          onclick="NEXTRA_FUTURES.refresh()"
        >
          Coba lagi
        </button>

      </div>

    `;

  }

  finally {

    FUTURES_STATE.loading = false;

  }

}


/* =========================================
   RENDER
========================================= */

function renderFutures() {

  const container =
    futuresEl("futures-content");

  if (!container) return;


  if (!FUTURES_STATE.data.length) {

    container.innerHTML = `
      <div class="empty-state">
        Tidak ada data Futures.
      </div>
    `;

    return;

  }


  container.innerHTML =
    FUTURES_STATE.data
      .map(renderFuturesCard)
      .join("");


  updateFuturesTime();

}


/* =========================================
   CARD
========================================= */

function renderFuturesCard(item) {

  const change =
    Number(item.change24h) || 0;


  const funding =
    Number(item.fundingRate);


  const oiChange =
    Number(item.oiChange24h);


  const changeClass =
    change >= 0
      ? "up"
      : "down";


  const changeSign =
    change >= 0
      ? "+"
      : "";


  const fundingPercent =
    Number.isFinite(funding)
      ? funding * 100
      : null;


  const fundingClass =
    fundingPercent === null
      ? "dim"
      : fundingPercent >= 0
        ? "up"
        : "down";


  const signal =
    NEXTRA_API.getFuturesSignal(item);


  const bias =
    getMarketBias(
      item,
      signal
    );


  const risk =
    getRisk(
      item,
      signal
    );


  return `

    <article
      class="coin-card"
      style="
        display:block;
        margin-bottom:10px;
        cursor:default;
      "
    >

      <!-- HEADER -->

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          margin-bottom:14px;
        "
      >

        <div>

          <strong
            style="
              font-size:15px;
            "
          >
            ${formatSymbol(item.symbol)}
          </strong>

          <div
            class="dim"
            style="
              font-size:9px;
              margin-top:3px;
            "
          >
            Binance USDⓈ-M
          </div>

        </div>


        <div
          style="
            text-align:right;
          "
        >

          <div
            style="
              font-size:17px;
              font-weight:800;
            "
          >
            ${formatPrice(item.price)}
          </div>

          <div
            class="${changeClass}"
            style="
              font-size:10px;
              margin-top:3px;
            "
          >
            ${changeSign}${change.toFixed(2)}%
          </div>

        </div>

      </div>


      <!-- METRICS -->

      <div
        style="
          display:grid;
          grid-template-columns:
            repeat(2,1fr);
          gap:8px;
        "
      >

        ${metricBox(
          "FUNDING RATE",
          fundingPercent === null
            ? "-"
            : `${fundingPercent.toFixed(4)}%`,
          fundingClass
        )}


        ${metricBox(
          "OPEN INTEREST",
          formatOI(item.openInterest),
          ""
        )}


        ${metricBox(
          "OI CHANGE",
          Number.isFinite(oiChange)
            ? `${oiChange >= 0 ? "+" : ""}${oiChange.toFixed(2)}%`
            : "-",
          Number.isFinite(oiChange)
            ? oiChange >= 0
              ? "up"
              : "down"
            : "dim"
        )}


        ${metricBox(
          "24H VOLUME",
          formatLarge(item.quoteVolume),
          ""
        )}

      </div>


      <!-- SIGNAL -->

      <div
        style="
          margin-top:12px;
          padding:12px;
          border:1px solid var(--line);
          border-radius:11px;
          background:rgba(255,255,255,.018);
        "
      >

        <div
          class="dim"
          style="
            font-size:8px;
            margin-bottom:6px;
          "
        >
          MARKET SIGNAL
        </div>


        <div
          style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:10px;
          "
        >

          <strong
            class="${signalClass(signal.oiSignal)}"
            style="font-size:11px;"
          >
            ${signal.oiSignal}
          </strong>


          <span
            class="${signalClass(signal.fundingSignal)}"
            style="
              font-size:9px;
              font-weight:700;
            "
          >
            ${signal.fundingSignal}
          </span>

        </div>

      </div>


      <!-- BIAS / RISK -->

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:12px;
          padding-top:10px;
          border-top:1px solid var(--line);
        "
      >

        <div>

          <span
            class="dim"
            style="font-size:8px;"
          >
            MARKET BIAS
          </span>

          <strong
            class="${bias.className}"
            style="
              display:block;
              margin-top:3px;
              font-size:10px;
            "
          >
            ${bias.label}
          </strong>

        </div>


        <div
          style="
            text-align:right;
          "
        >

          <span
            class="dim"
            style="font-size:8px;"
          >
            RISK
          </span>

          <strong
            class="${risk.className}"
            style="
              display:block;
              margin-top:3px;
              font-size:10px;
            "
          >
            ${risk.label}
          </strong>

        </div>

      </div>

    </article>

  `;

}


/* =========================================
   METRIC BOX
========================================= */

function metricBox(
  label,
  value,
  className
) {

  return `

    <div
      style="
        padding:10px;
        border:1px solid var(--line);
        border-radius:10px;
      "
    >

      <div
        class="dim"
        style="font-size:8px;"
      >
        ${label}
      </div>

      <strong
        class="${className}"
        style="
          display:block;
          margin-top:4px;
          font-size:11px;
        "
      >
        ${value}
      </strong>

    </div>

  `;

}


/* =========================================
   SIGNAL CLASS
========================================= */

function signalClass(signal) {

  if (!signal) return "dim";


  if (
    signal.includes("LONG") ||
    signal.includes("BULL")
  ) {

    return "up";

  }


  if (
    signal.includes("SHORT") ||
    signal.includes("BEAR") ||
    signal.includes("CROWDED")
  ) {

    return "down";

  }


  return "dim";

}


/* =========================================
   MARKET BIAS
========================================= */

function getMarketBias(
  item,
  signal
) {

  let score = 0;


  const price =
    Number(item.change24h) || 0;


  const oi =
    Number(item.oiChange24h);


  if (price > 0) score += 1;

  if (price < 0) score -= 1;


  if (Number.isFinite(oi)) {

    if (oi > 0) score += 0.5;

    if (oi < 0) score -= 0.5;

  }


  if (
    signal.oiSignal ===
    "LONG CONFIRMATION"
  ) {

    score += 1;

  }


  if (
    signal.oiSignal ===
    "SHORT CONFIRMATION"
  ) {

    score -= 1;

  }


  if (score >= 1.5) {

    return {
      label: "BULLISH",
      className: "up"
    };

  }


  if (score <= -1.5) {

    return {
      label: "BEARISH",
      className: "down"
    };

  }


  return {
    label: "NEUTRAL",
    className: "dim"
  };

}


/* =========================================
   RISK
========================================= */

function getRisk(
  item,
  signal
) {

  const change =
    Math.abs(
      Number(item.change24h) || 0
    );


  const funding =
    Math.abs(
      Number(item.fundingRate) * 100 || 0
    );


  const oi =
    Math.abs(
      Number(item.oiChange24h) || 0
    );


  if (
    change >= 8 ||
    funding >= 0.10 ||
    oi >= 15
  ) {

    return {
      label: "HIGH",
      className: "down"
    };

  }


  if (
    change >= 4 ||
    funding >= 0.05 ||
    oi >= 8
  ) {

    return {
      label: "MODERATE",
      className: ""
    };

  }


  return {
    label: "LOW",
    className: "up"
  };

}


/* =========================================
   SYMBOL
========================================= */

function formatSymbol(symbol) {

  return String(symbol || "")
    .replace("USDT", "/USDT");

}


/* =========================================
   PRICE
========================================= */

function formatPrice(price) {

  price =
    Number(price);


  if (!Number.isFinite(price)) {

    return "-";

  }


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
   OPEN INTEREST
========================================= */

function formatOI(value) {

  value =
    Number(value);


  if (!Number.isFinite(value)) {

    return "-";

  }


  return value.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: 0
    }
  );

}


/* =========================================
   LARGE NUMBER
========================================= */

function formatLarge(value) {

  value =
    Number(value);


  if (!Number.isFinite(value)) {

    return "-";

  }


  if (value >= 1e12) {

    return "$" +
      (value / 1e12).toFixed(2) +
      "T";

  }


  if (value >= 1e9) {

    return "$" +
      (value / 1e9).toFixed(2) +
      "B";

  }


  if (value >= 1e6) {

    return "$" +
      (value / 1e6).toFixed(2) +
      "M";

  }


  if (value >= 1e3) {

    return "$" +
      (value / 1e3).toFixed(2) +
      "K";

  }


  return "$" +
    value.toFixed(0);

}


/* =========================================
   UPDATE TIME
========================================= */

function updateFuturesTime() {

  const element =
    futuresEl(
      "futures-update"
    );


  if (!element) return;


  if (!FUTURES_STATE.lastUpdate) {

    element.textContent =
      "Belum diperbarui";

    return;

  }


  element.textContent =
    "Updated " +
    FUTURES_STATE.lastUpdate
      .toLocaleTimeString(
        "id-ID",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }
      );

}


/* =========================================
   GLOBAL
========================================= */

window.NEXTRA_FUTURES = {

  state:
    FUTURES_STATE,

  load:
    loadFutures,

  refresh:
    loadFutures

};


/* =========================================
   AUTO INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      futuresEl(
        "futures-content"
      )
    ) {

      loadFutures();

    }

  }
);
