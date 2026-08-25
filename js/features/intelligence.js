/* =====================================================
   NEXTRA INTELLIGENCE V100
   Market Intelligence Engine
===================================================== */

const INTELLIGENCE_STATE = {

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


window.NEXTRA_INTELLIGENCE_FILTER =
  "all";


function inum(value) {

  const n = Number(value);

  return Number.isFinite(n)
    ? n
    : 0;

}


function iprice(value) {

  const n = inum(value);

  if (n >= 1000)
    return "$" +
      n.toLocaleString(
        "en-US",
        {
          maximumFractionDigits:2
        }
      );

  if (n >= 1)
    return "$" +
      n.toFixed(2);

  return "$" +
    n.toPrecision(6);

}


function ipercent(value) {

  const n = inum(value);

  return (
    n >= 0 ? "+" : ""
  ) +
  n.toFixed(2) +
  "%";

}


function ilarge(value) {

  const n = inum(value);

  if (n >= 1e12)
    return (
      n / 1e12
    ).toFixed(2) + "T";

  if (n >= 1e9)
    return (
      n / 1e9
    ).toFixed(2) + "B";

  if (n >= 1e6)
    return (
      n / 1e6
    ).toFixed(2) + "M";

  return (
    n / 1e3
  ).toFixed(1) + "K";

}


function analyzeIntelligence(item) {

  const change =
    inum(item.change24h);

  const oi =
    inum(item.oiChange);

  const funding =
    inum(item.fundingRate) * 100;

  const volume =
    inum(item.volumeSpike);


  let score = 50;


  /* MOMENTUM */

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


  /* OPEN INTEREST */

  if (
    change > 0 &&
    oi > 0
  ) {

    score += 12;

  }

  else if (
    change < 0 &&
    oi > 0
  ) {

    score -= 12;

  }


  /* VOLUME */

  if (volume >= 3) {

    if (change > 0)
      score += 10;

    else if (change < 0)
      score -= 10;

  }

  else if (volume >= 2) {

    if (change > 0)
      score += 6;

    else if (change < 0)
      score -= 6;

  }


  /* FUNDING */

  if (funding >= 0.10)
    score -= 6;

  else if (funding <= -0.10)
    score += 6;


  score =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(score)
      )
    );


  let bias =
    "NEUTRAL";


  if (score >= 60)
    bias = "BULLISH";

  else if (score <= 40)
    bias = "BEARISH";


  /* MARKET REGIME */

  let regime =
    "RANGE";


  if (
    Math.abs(change) >= 5 &&
    volume >= 2
  ) {

    regime =
      change > 0
        ? "BULL TREND"
        : "BEAR TREND";

  }

  else if (
    Math.abs(change) <= 1
  ) {

    regime =
      "LOW VOLATILITY";

  }


  /* RISK */

  let risk =
    "LOW";


  if (
    Math.abs(change) >= 8 ||
    Math.abs(funding) >= 0.10 ||
    volume >= 4
  ) {

    risk =
      "HIGH";

  }

  else if (
    Math.abs(change) >= 4 ||
    Math.abs(funding) >= 0.05 ||
    volume >= 2
  ) {

    risk =
      "MODERATE";

  }


  /* SIGNAL */

  let signal =
    "WAIT";


  if (
    bias === "BULLISH" &&
    score >= 80
  ) {

    signal =
      "STRONG BULLISH";

  }

  else if (
    bias === "BEARISH" &&
    score <= 20
  ) {

    signal =
      "STRONG BEARISH";

  }

  else if (
    bias === "BULLISH"
  ) {

    signal =
      "BULLISH";

  }

  else if (
    bias === "BEARISH"
  ) {

    signal =
      "BEARISH";

  }


  /* INSIGHT */

  let insight =
    "Market masih membutuhkan konfirmasi.";


  if (
    bias === "BULLISH" &&
    oi > 0 &&
    volume >= 2
  ) {

    insight =
      "Momentum bullish mendapat konfirmasi dari Open Interest dan aktivitas volume.";

  }

  else if (
    bias === "BEARISH" &&
    oi > 0 &&
    volume >= 2
  ) {

    insight =
      "Tekanan bearish mendapat konfirmasi dari kenaikan Open Interest dan volume.";

  }

  else if (
    volume >= 3
  ) {

    insight =
      "Volume mengalami lonjakan. Perhatikan potensi pergerakan besar.";

  }

  else if (
    Math.abs(funding) >= 0.10
  ) {

    insight =
      "Funding berada pada level ekstrem. Positioning market mulai crowded.";

  }

  else if (
    regime === "LOW VOLATILITY"
  ) {

    insight =
      "Volatilitas rendah. Breakout dapat terjadi setelah periode konsolidasi.";

  }


  return {

    ...item,

    score,

    bias,

    regime,

    risk,

    signal,

    insight

  };

}


function renderIntelligenceV100() {

  const container =
    document.getElementById(
      "intelligence-content"
    );

  if (!container)
    return;


  let data =
    INTELLIGENCE_STATE.data;


  const filter =
    window.NEXTRA_INTELLIGENCE_FILTER ||
    "all";


  if (filter === "bullish") {

    data =
      data.filter(
        x =>
          x.bias === "BULLISH"
      );

  }

  else if (filter === "bearish") {

    data =
      data.filter(
        x =>
          x.bias === "BEARISH"
      );

  }

  else if (filter === "strong") {

    data =
      data.filter(
        x =>
          x.score >= 80
      );

  }

  else if (filter === "risk") {

    data =
      data.filter(
        x =>
          x.risk === "HIGH"
      );

  }


  data =
    [...data].sort(
      (a,b) =>
        b.score - a.score
    );


  if (!data.length) {

    container.innerHTML = `
      <div class="intel-empty">
        Tidak ada intelligence
        untuk filter ini.
      </div>
    `;

    return;

  }


  container.innerHTML =
    data
      .map(
        renderIntelligenceCard
      )
      .join("");


  updateIntelligenceSummary();

}


function renderIntelligenceCard(item) {

  const biasClass =
    item.bias === "BULLISH"
      ? "up"
      : item.bias === "BEARISH"
        ? "down"
        : "neutral";


  const riskClass =
    item.risk === "HIGH"
      ? "down"
      : item.risk === "LOW"
        ? "up"
        : "neutral";


  const change =
    inum(item.change24h);


  const funding =
    inum(item.fundingRate) * 100;


  return `

    <article class="intel-card">

      <div class="intel-card-head">

        <div>

          <div class="intel-symbol">
            ${String(item.symbol)
              .replace(
                "USDT",
                "/USDT"
              )}
          </div>

          <div class="intel-price">
            ${iprice(item.price)}
          </div>

          <div
            class="
              intel-change
              ${change >= 0
                ? "up"
                : "down"}
            "
          >
            ${ipercent(change)}
          </div>

        </div>


        <div
          class="
            intel-badge
            ${biasClass}
          "
        >

          ${item.bias}

          <br>

          ${item.score}/100

        </div>

      </div>


      <div class="intel-score">

        <div class="intel-score-row">

          <span>
            INTELLIGENCE SCORE
          </span>

          <strong>
            ${item.score}/100
          </strong>

        </div>


        <div class="intel-bar">

          <div
            class="intel-fill"
            style="
              width:${item.score}%
            "
          ></div>

        </div>

      </div>


      <div class="intel-metrics">

        <div class="intel-metric">

          <div class="intel-metric-label">
            MARKET REGIME
          </div>

          <div class="intel-metric-value">
            ${item.regime}
          </div>

        </div>


        <div class="intel-metric">

          <div class="intel-metric-label">
            OI CHANGE
          </div>

          <div class="intel-metric-value">
            ${ipercent(item.oiChange)}
          </div>

        </div>


        <div class="intel-metric">

          <div class="intel-metric-label">
            FUNDING
          </div>

          <div class="intel-metric-value">
            ${funding.toFixed(4)}%
          </div>

        </div>


        <div class="intel-metric">

          <div class="intel-metric-label">
            VOLUME
          </div>

          <div class="intel-metric-value">
            ${ilarge(item.quoteVolume)}
          </div>

        </div>

      </div>


      <div class="intel-insight">

        🧠
        ${item.insight}

      </div>


      <div class="intel-bottom">

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


function updateIntelligenceSummary() {

  const data =
    INTELLIGENCE_STATE.data;


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


  const strong =
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
    "intel-bullish"
  ).textContent =
    bullish;


  document.getElementById(
    "intel-bearish"
  ).textContent =
    bearish;


  document.getElementById(
    "intel-strong"
  ).textContent =
    strong;


  document.getElementById(
    "intel-risk"
  ).textContent =
    risk;


  document.getElementById(
    "intel-update"
  ).textContent =
    INTELLIGENCE_STATE
      .lastUpdate
      ?.toLocaleTimeString(
        "id-ID"
      ) ||
      "--";

}


async function loadIntelligence() {

  if (
    INTELLIGENCE_STATE.loading
  )
    return;


  const container =
    document.getElementById(
      "intelligence-content"
    );


  const status =
    document.getElementById(
      "intel-status"
    );


  if (!container)
    return;


  INTELLIGENCE_STATE.loading =
    true;


  status.textContent =
    "ANALYZING...";


  container.innerHTML = `
    <div class="intel-empty">
      🧠 Analyzing market data...
    </div>
  `;


  try {

    let raw = [];


    /*
      Pakai API NEXTRA jika tersedia.
      Fallback langsung ke Binance Futures.
    */

    if (
      window.NEXTRA_API &&
      typeof
      NEXTRA_API.fetchFuturesMarkets ===
      "function"
    ) {

      raw =
        await NEXTRA_API.fetchFuturesMarkets(
          INTELLIGENCE_STATE.symbols
        );

    }


    /*
      Jika API utama tidak menghasilkan data,
      ambil data dasar Binance.
    */

    if (
      !Array.isArray(raw) ||
      !raw.length
    ) {

      const responses =
        await Promise.all(
          INTELLIGENCE_STATE
            .symbols
            .map(
              async symbol => {

                try {

                  const response =
                    await fetch(
                      "https://fapi.binance.com" +
                      "/fapi/v1/ticker/24hr?symbol=" +
                      symbol
                    );


                  const data =
                    await response.json();


                  return {

                    symbol,

                    price:
                      inum(
                        data.lastPrice
                      ),

                    change24h:
                      inum(
                        data.priceChangePercent
                      ),

                    quoteVolume:
                      inum(
                        data.quoteVolume
                      ),

                    oiChange: 0,

                    fundingRate: 0,

                    volumeSpike: 1

                  };

                }

                catch {

                  return null;

                }

              }
            )
        );


      raw =
        responses.filter(
          Boolean
        );

    }


    INTELLIGENCE_STATE.data =
      raw
        .map(
          analyzeIntelligence
        );


    INTELLIGENCE_STATE.lastUpdate =
      new Date();


    renderIntelligenceV100();


    status.textContent =
      "LIVE";

  }

  catch(error) {

    console.error(
      "NEXTRA Intelligence V100:",
      error
    );


    status.textContent =
      "ERROR";


    container.innerHTML = `
      <div class="intel-empty">
        ⚠️ Intelligence gagal
        memuat data.
        <br><br>
        Coba refresh kembali.
      </div>
    `;

  }

  finally {

    INTELLIGENCE_STATE.loading =
      false;

  }

}


window.NEXTRA_INTELLIGENCE = {

  state:
    INTELLIGENCE_STATE,

  load:
    loadIntelligence,

  refresh:
    loadIntelligence

};


document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadIntelligence();

    setInterval(
      loadIntelligence,
      60000
    );

  }
);