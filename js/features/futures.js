// futures.js — NEXTRA Futures V1

const FUTURES_STATE = {
  symbols: [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT"
  ],
  data: [],
  loading: false,
  lastUpdate: null
};


/* =========================================
   LOAD FUTURES
========================================= */

async function loadFutures() {

  const container =
    document.getElementById(
      "futures-content"
    );

  FUTURES_STATE.loading = true;


  if (container) {

    container.innerHTML = `
      <div class="loading">
        Memuat Futures...
      </div>
    `;

  }


  try {

    const data =
      await NEXTRA_API
        .fetchFuturesMarkets(
          FUTURES_STATE.symbols
        );


    FUTURES_STATE.data =
      data || [];


    FUTURES_STATE.lastUpdate =
      new Date();


    renderFutures();


  } catch (error) {

    console.error(
      "Futures error:",
      error
    );


    if (container) {

      container.innerHTML = `

        <div class="error-box">

          ⚠️ Gagal memuat Futures.

          <br>

          <button
            class="icon-btn"
            style="
              margin-top:10px;
            "
            onclick="loadFutures()"
          >
            Coba lagi
          </button>

        </div>

      `;

    }

  } finally {

    FUTURES_STATE.loading =
      false;

  }

}


/* =========================================
   RENDER
========================================= */

function renderFutures() {

  const container =
    document.getElementById(
      "futures-content"
    );

  if (!container) return;


  if (
    !FUTURES_STATE.data.length
  ) {

    container.innerHTML = `
      <div class="empty-state">
        Tidak ada data Futures.
      </div>
    `;

    return;

  }


  container.innerHTML =
    FUTURES_STATE.data
      .map(
        renderFuturesCard
      )
      .join("");


  updateFuturesTime();

}


/* =========================================
   FUTURES CARD
========================================= */

function renderFuturesCard(
  item
) {

  const change =
    item.change24h;


  const changeClass =
    change >= 0
      ? "up"
      : "down";


  const sign =
    change >= 0
      ? "+"
      : "";


  const fundingPercent =
    item.fundingRate *
    100;


  const fundingClass =
    fundingPercent >= 0
      ? "up"
      : "down";


  const bias =
    getBias(
      item
    );


  const risk =
    getRisk(
      item
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
          align-items:center;
          justify-content:space-between;
          margin-bottom:14px;
        "
      >

        <div>

          <strong
            style="
              font-size:14px;
            "
          >
            ${formatSymbol(
              item.symbol
            )}
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
            ${formatPrice(
              item.price
            )}
          </div>

          <div
            class="${changeClass}"
            style="
              font-size:10px;
              margin-top:2px;
            "
          >
            ${sign}${change.toFixed(2)}%
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

        <div
          style="
            padding:10px;
            border:
              1px solid var(--border);
            border-radius:10px;
          "
        >

          <div
            class="dim"
            style="font-size:8px;"
          >
            FUNDING RATE
          </div>

          <strong
            class="${fundingClass}"
            style="
              display:block;
              margin-top:4px;
              font-size:11px;
            "
          >
            ${fundingPercent.toFixed(4)}%
          </strong>

        </div>


        <div
          style="
            padding:10px;
            border:
              1px solid var(--border);
            border-radius:10px;
          "
        >

          <div
            class="dim"
            style="font-size:8px;"
          >
            OPEN INTEREST
          </div>

          <strong
            style="
              display:block;
              margin-top:4px;
              font-size:11px;
            "
          >
            ${formatOI(
              item.openInterest
            )}
          </strong>

        </div>


        <div
          style="
            padding:10px;
            border:
              1px solid var(--border);
            border-radius:10px;
          "
        >

          <div
            class="dim"
            style="font-size:8px;"
          >
            24H VOLUME
          </div>

          <strong
            style="
              display:block;
              margin-top:4px;
              font-size:11px;
            "
          >
            ${formatLarge(
              item.quoteVolume
            )}
          </strong>

        </div>


        <div
          style="
            padding:10px;
            border:
              1px solid var(--border);
            border-radius:10px;
          "
        >

          <div
            class="dim"
            style="font-size:8px;"
          >
            MARKET BIAS
          </div>

          <strong
            class="${bias.className}"
            style="
              display:block;
              margin-top:4px;
              font-size:11px;
            "
          >
            ${bias.label}
          </strong>

        </div>

      </div>


      <!-- RISK -->

      <div
        style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-top:12px;
          padding-top:10px;
          border-top:
            1px solid var(--border);
        "
      >

        <span
          class="dim"
          style="font-size:9px;"
        >
          Risk Level
        </span>

        <strong
          class="${risk.className}"
          style="font-size:10px;"
        >
          ${risk.label}
        </strong>

      </div>

    </article>

  `;

}


/* =========================================
   SYMBOL
========================================= */

function formatSymbol(
  symbol
) {

  return symbol
    .replace(
      "USDT",
      "/USDT"
    );

}


/* =========================================
   PRICE
========================================= */

function formatPrice(
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
          maximumFractionDigits:2
        }
      );

  }


  if (price >= 1) {

    return "$" +
      price.toFixed(2);

  }


  return "$" +
    price.toPrecision(6);

}


/* =========================================
   OPEN INTEREST
========================================= */

function formatOI(
  value
) {

  if (
    !Number.isFinite(value)
  ) {

    return "-";

  }


  return Number(value)
    .toLocaleString(
      "en-US",
      {
        maximumFractionDigits:0
      }
    );

}


/* =========================================
   LARGE NUMBER
========================================= */

function formatLarge(
  value
) {

  if (
    !Number.isFinite(value)
  ) {

    return "-";

  }


  if (value >= 1e9) {

    return (
      "$" +
      (
        value / 1e9
      ).toFixed(2) +
      "B"
    );

  }


  if (value >= 1e6) {

    return (
      "$" +
      (
        value / 1e6
      ).toFixed(2) +
      "M"
    );

  }


  if (value >= 1e3) {

    return (
      "$" +
      (
        value / 1e3
      ).toFixed(2) +
      "K"
    );

  }


  return "$" +
    value.toFixed(0);

}


/* =========================================
   MARKET BIAS
========================================= */

function getBias(
  item
) {

  let score = 0;


  if (
    item.change24h > 0
  ) {

    score += 1;

  } else {

    score -= 1;

  }


  if (
    item.fundingRate > 0
  ) {

    score += 0.5;

  } else {

    score -= 0.5;

  }


  if (score >= 1) {

    return {

      label: "BULLISH",

      className: "up"

    };

  }


  if (score <= -1) {

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
  item
) {

  const change =
    Math.abs(
      item.change24h
    );


  const funding =
    Math.abs(
      item.fundingRate *
      100
    );


  if (
    change >= 8 ||
    funding >= 0.08
  ) {

    return {

      label: "HIGH",

      className: "down"

    };

  }


  if (
    change >= 4 ||
    funding >= 0.04
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
   UPDATE TIME
========================================= */

function updateFuturesTime() {

  const element =
    document.getElementById(
      "futures-update"
    );

  if (!element) return;


  if (
    !FUTURES_STATE.lastUpdate
  ) {

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
      document.getElementById(
        "futures-content"
      )
    ) {

      loadFutures();

    }

  }
);
