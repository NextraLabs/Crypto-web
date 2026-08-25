/* =====================================================
   NEXTRA FUTURES V100
   Funding + OI + Volume + Bias + Score + Risk
===================================================== */

const FUTURES_STATE = {

  symbols: [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "XRPUSDT",
    "SOLUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "AVAXUSDT",
    "LINKUSDT",
    "SUIUSDT",
    "TONUSDT"
  ],

  data: [],

  loading: false,

  lastUpdate: null

};


window.NEXTRA_FUTURES_FILTER =
  "all";


function fnum(value) {

  const n = Number(value);

  return Number.isFinite(n)
    ? n
    : 0;

}


function fprice(value) {

  const n = fnum(value);

  if (n >= 1000) {

    return "$" +
      n.toLocaleString(
        "en-US",
        {
          maximumFractionDigits:2
        }
      );

  }

  if (n >= 1) {

    return "$" +
      n.toFixed(2);

  }

  return "$" +
    n.toPrecision(6);

}


function fpercent(value) {

  const n = fnum(value);

  return (
    n >= 0 ? "+" : ""
  ) +
  n.toFixed(2) +
  "%";

}


function flarge(value) {

  const n = fnum(value);

  if (n >= 1e12)
    return "$" +
      (n / 1e12).toFixed(2) +
      "T";

  if (n >= 1e9)
    return "$" +
      (n / 1e9).toFixed(2) +
      "B";

  if (n >= 1e6)
    return "$" +
      (n / 1e6).toFixed(2) +
      "M";

  if (n >= 1e3)
    return "$" +
      (n / 1e3).toFixed(2) +
      "K";

  return "$" +
    n.toFixed(0);

}


function fsymbol(symbol) {

  return String(symbol || "")
    .replace("USDT","/USDT");

}


function futureSignal(item) {

  const change =
    fnum(item.change24h);

  const oi =
    fnum(item.oiChange24h);

  const funding =
    fnum(item.fundingRate) * 100;

  let score = 50;

  let bias = "NEUTRAL";

  let signal = "WAIT";


  /* PRICE */

  if (change >= 5)
    score += 15;

  else if (change >= 3)
    score += 10;

  else if (change >= 1)
    score += 5;

  else if (change <= -5)
    score -= 15;

  else if (change <= -3)
    score -= 10;

  else if (change <= -1)
    score -= 5;


  /* OI */

  if (
    change > 0 &&
    oi > 0
  ) {

    score += 15;

    bias = "BULLISH";

    signal =
      "LONG CONFIRMATION";

  }

  else if (
    change < 0 &&
    oi > 0
  ) {

    score -= 15;

    bias = "BEARISH";

    signal =
      "SHORT CONFIRMATION";

  }

  else if (
    change > 0 &&
    oi < 0
  ) {

    score += 5;

    bias = "BULLISH";

    signal =
      "SHORT COVERING";

  }

  else if (
    change < 0 &&
    oi < 0
  ) {

    score -= 5;

    bias = "BEARISH";

    signal =
      "LONG REDUCTION";

  }


  /* FUNDING */

  if (
    funding >= 0.10
  ) {

    score -= 7;

  }

  else if (
    funding <= -0.10
  ) {

    score += 7;

  }


  score =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(score)
      )
    );


  if (
    score >= 65 &&
    bias === "NEUTRAL"
  ) {

    bias = "BULLISH";
    signal = "BULLISH";

  }

  if (
    score <= 35 &&
    bias === "NEUTRAL"
  ) {

    bias = "BEARISH";
    signal = "BEARISH";

  }


  /* RISK */

  let risk = "LOW";

  if (
    Math.abs(change) >= 8 ||
    Math.abs(funding) >= 0.10 ||
    Math.abs(oi) >= 15
  ) {

    risk = "HIGH";

  }

  else if (
    Math.abs(change) >= 4 ||
    Math.abs(funding) >= 0.05 ||
    Math.abs(oi) >= 8
  ) {

    risk = "MODERATE";

  }


  return {

    ...item,

    score,

    bias,

    signal,

    risk

  };

}


function renderFuturesV100() {

  const container =
    document.getElementById(
      "futures-content"
    );

  if (!container)
    return;


  let data =
    FUTURES_STATE.data;


  const filter =
    window.NEXTRA_FUTURES_FILTER ||
    "all";


  if (filter === "bullish") {

    data =
      data.filter(
        item =>
          item.bias === "BULLISH"
      );

  }

  if (filter === "bearish") {

    data =
      data.filter(
        item =>
          item.bias === "BEARISH"
      );

  }

  if (filter === "score") {

    data =
      data.filter(
        item =>
          item.score >= 80
      );

  }

  if (filter === "risk") {

    data =
      data.filter(
        item =>
          item.risk === "HIGH"
      );

  }


  data =
    [...data]
      .sort(
        (a,b) =>
          b.score - a.score
      );


  if (!data.length) {

    container.innerHTML = `
      <div class="fv-empty">
        Tidak ada data untuk filter ini.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data.map(
      renderFuturesCard
    ).join("");


  updateFuturesSummary();

}


function renderFuturesCard(item) {

  const change =
    fnum(item.change24h);

  const funding =
    fnum(item.fundingRate) * 100;

  const oi =
    fnum(item.oiChange24h);


  const biasClass =
    item.bias === "BULLISH"
      ? "up"
      : item.bias === "BEARISH"
        ? "down"
        : "dim";


  const riskClass =
    item.risk === "HIGH"
      ? "down"
      : item.risk === "LOW"
        ? "up"
        : "";


  return `

    <article class="fv-card">

      <div class="fv-head">

        <div>

          <div class="fv-symbol">
            ${fsymbol(item.symbol)}
          </div>

          <div class="fv-price">
            ${fprice(item.price)}
          </div>

          <div
            class="
              fv-change
              ${change >= 0 ? "up" : "down"}
            "
          >
            ${fpercent(change)}
          </div>

        </div>


        <div
          class="
            fv-badge
            ${biasClass}
          "
        >
          ${item.bias}
          <br>
          ${item.score}/100
        </div>

      </div>


      <div class="fv-score">

        <div class="fv-score-row">

          <span>
            FUTURES SCORE
          </span>

          <strong>
            ${item.score}/100
          </strong>

        </div>

        <div class="fv-bar">

          <div
            class="fv-fill"
            style="width:${item.score}%"
          ></div>

        </div>

      </div>


      <div class="fv-metrics">

        <div class="fv-metric">

          <div class="fv-metric-label">
            FUNDING RATE
          </div>

          <div
            class="
              fv-metric-value
              ${funding >= 0 ? "up" : "down"}
            "
          >
            ${funding.toFixed(4)}%
          </div>

        </div>


        <div class="fv-metric">

          <div class="fv-metric-label">
            OPEN INTEREST
          </div>

          <div class="fv-metric-value">
            ${flarge(item.openInterest)}
          </div>

        </div>


        <div class="fv-metric">

          <div class="fv-metric-label">
            OI CHANGE
          </div>

          <div
            class="
              fv-metric-value
              ${oi >= 0 ? "up" : "down"}
            "
          >
            ${fpercent(oi)}
          </div>

        </div>


        <div class="fv-metric">

          <div class="fv-metric-label">
            24H VOLUME
          </div>

          <div class="fv-metric-value">
            ${flarge(item.quoteVolume)}
          </div>

        </div>

      </div>


      <div class="fv-bottom">

        <span class="${biasClass}">
          🎯 ${item.signal}
        </span>

        <span class="${riskClass}">
          RISK: ${item.risk}
        </span>

      </div>

    </article>

  `;

}


function updateFuturesSummary() {

  const data =
    FUTURES_STATE.data;


  const bullish =
    data.filter(
      x =>
        x.bias === "BULLISH"
    ).length;


  const bearish =
    data.filter(
      x =>
        x.bias === "BEARISH"
    ).length;


  const high =
    data.filter(
      x =>
        x.score >= 80
    ).length;


  const risk =
    data.filter(
      x =>
        x.risk === "HIGH"
    ).length;


  document.getElementById(
    "fv-bullish"
  ).textContent =
    bullish;


  document.getElementById(
    "fv-bearish"
  ).textContent =
    bearish;


  document.getElementById(
    "fv-high"
  ).textContent =
    high;


  document.getElementById(
    "fv-risk"
  ).textContent =
    risk;


  document.getElementById(
    "futures-update"
  ).textContent =
    FUTURES_STATE.lastUpdate
      ?.toLocaleTimeString(
        "id-ID"
      ) ||
      "--";

}


async function loadFutures() {

  if (
    FUTURES_STATE.loading
  )
    return;


  const container =
    document.getElementById(
      "futures-content"
    );


  const status =
    document.getElementById(
      "futures-status"
    );


  if (!container)
    return;


  FUTURES_STATE.loading =
    true;


  status.textContent =
    "SCANNING...";


  container.innerHTML = `
    <div class="fv-empty">
      🔎 Scanning Futures Market...
    </div>
  `;


  try {

    let data = [];


    if (
      window.NEXTRA_API &&
      typeof
      NEXTRA_API.fetchFuturesMarkets ===
      "function"
    ) {

      data =
        await NEXTRA_API.fetchFuturesMarkets(
          FUTURES_STATE.symbols
        );

    }


    FUTURES_STATE.data =
      Array.isArray(data)
        ? data.map(
            futureSignal
          )
        : [];


    FUTURES_STATE.lastUpdate =
      new Date();


    renderFuturesV100();


    status.textContent =
      "LIVE";

  }

  catch(error) {

    console.error(
      "NEXTRA Futures V100:",
      error
    );


    status.textContent =
      "ERROR";


    container.innerHTML = `
      <div class="fv-error">
        ⚠️ Gagal memuat Futures.
        <br><br>
        Coba refresh kembali.
      </div>
    `;

  }

  finally {

    FUTURES_STATE.loading =
      false;

  }

}


window.NEXTRA_FUTURES = {

  state:
    FUTURES_STATE,

  load:
    loadFutures,

  refresh:
    loadFutures

};


document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadFutures();

    setInterval(
      loadFutures,
      60000
    );

  }
);