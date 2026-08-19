// NEXTRA Intelligence V2

const INTELLIGENCE_V2 = {

  symbols: [
    "BTCUSDT",
    "ETHUSDT",
    "SOLUSDT"
  ],

  data: [],

  updated: null

};


/* =========================================
   LOAD DATA
========================================= */

async function loadIntelligenceV2() {

  const container =
    document.getElementById(
      "intel-assets"
    );

  const status =
    document.getElementById(
      "intel-status"
    );


  if (status) {

    status.textContent =
      "SCANNING";

  }


  if (container) {

    container.innerHTML = `
      <div class="loading">
        NEXTRA sedang menganalisis
        market...
      </div>
    `;

  }


  try {

    const data =
      await NEXTRA_API
        .fetchFuturesMarkets(
          INTELLIGENCE_V2.symbols
        );


    INTELLIGENCE_V2.data =
      data || [];


    INTELLIGENCE_V2.updated =
      new Date();


    renderIntelligenceV2();


    if (status) {

      status.textContent =
        "LIVE";

    }

  } catch (error) {

    console.error(
      "Intelligence V2:",
      error
    );


    if (status) {

      status.textContent =
        "ERROR";

    }


    if (container) {

      container.innerHTML = `
        <div class="error-box">
          ⚠️ Gagal memuat Intelligence.
          <br><br>
          <button
            class="primary-btn"
            onclick="loadIntelligenceV2()"
          >
            Coba Lagi
          </button>
        </div>
      `;

    }

  }

}


/* =========================================
   SCORE ENGINE
========================================= */

function calculateAssetScore(item) {

  let score = 50;


  /* PRICE MOMENTUM */

  if (
    item.change24h >= 5
  ) {

    score += 20;

  }

  else if (
    item.change24h >= 2
  ) {

    score += 12;

  }

  else if (
    item.change24h > 0
  ) {

    score += 6;

  }

  else if (
    item.change24h <= -5
  ) {

    score -= 20;

  }

  else if (
    item.change24h <= -2
  ) {

    score -= 12;

  }

  else if (
    item.change24h < 0
  ) {

    score -= 6;

  }


  /* FUNDING */

  if (
    item.fundingRate > 0.001
  ) {

    score -= 8;

  }

  else if (
    item.fundingRate > 0
  ) {

    score += 3;

  }

  else if (
    item.fundingRate < -0.001
  ) {

    score += 8;

  }

  else if (
    item.fundingRate < 0
  ) {

    score -= 3;

  }


  return Math.max(
    0,
    Math.min(
      100,
      score
    )
  );

}


/* =========================================
   TREND
========================================= */

function getTrendV2(item) {

  const change =
    item.change24h;


  if (change >= 5) {

    return {
      label: "STRONG BULLISH",
      className: "up"
    };

  }


  if (change >= 2) {

    return {
      label: "BULLISH",
      className: "up"
    };

  }


  if (change <= -5) {

    return {
      label: "STRONG BEARISH",
      className: "down"
    };

  }


  if (change <= -2) {

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
   MOMENTUM
========================================= */

function getMomentum(item) {

  const change =
    Math.abs(
      item.change24h
    );


  if (change >= 5) {

    return {
      label: "VERY HIGH",
      className:
        item.change24h >= 0
          ? "up"
          : "down"
    };

  }


  if (change >= 2) {

    return {
      label: "HIGH",
      className:
        item.change24h >= 0
          ? "up"
          : "down"
    };

  }


  if (change >= 0.5) {

    return {
      label: "MODERATE",
      className:
        item.change24h >= 0
          ? "up"
          : "down"
    };

  }


  return {
    label: "LOW",
    className: "dim"
  };

}


/* =========================================
   FUNDING SENTIMENT
========================================= */

function getFundingSentiment(item) {

  const funding =
    item.fundingRate * 100;


  if (funding >= 0.05) {

    return {
      label: "LONG CROWDED",
      className: "down"
    };

  }


  if (funding > 0) {

    return {
      label: "LONG BIAS",
      className: "up"
    };

  }


  if (funding <= -0.05) {

    return {
      label: "SHORT CROWDED",
      className: "up"
    };

  }


  if (funding < 0) {

    return {
      label: "SHORT BIAS",
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

function getRiskV2(item) {

  const move =
    Math.abs(
      item.change24h
    );


  const funding =
    Math.abs(
      item.fundingRate * 100
    );


  if (
    move >= 8 ||
    funding >= 0.08
  ) {

    return {
      label: "HIGH",
      className: "down"
    };

  }


  if (
    move >= 4 ||
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
   REASONING
========================================= */

function generateReasoning(
  item,
  score
) {

  const reasons = [];


  if (
    item.change24h >= 2
  ) {

    reasons.push(
      "harga menunjukkan momentum positif"
    );

  }


  if (
    item.change24h <= -2
  ) {

    reasons.push(
      "harga menunjukkan tekanan bearish"
    );

  }


  if (
    item.fundingRate > 0.0005
  ) {

    reasons.push(
      "funding positif menunjukkan dominasi long"
    );

  }


  if (
    item.fundingRate < -0.0005
  ) {

    reasons.push(
      "funding negatif menunjukkan dominasi short"
    );

  }


  if (!reasons.length) {

    reasons.push(
      "momentum belum menunjukkan dominasi yang kuat"
    );

  }


  let conclusion;


  if (score >= 65) {

    conclusion =
      "Bias keseluruhan cenderung bullish.";

  }

  else if (score <= 35) {

    conclusion =
      "Bias keseluruhan cenderung bearish.";

  }

  else {

    conclusion =
      "Bias keseluruhan masih netral.";

  }


  return (
    reasons.join(". ") +
    ". " +
    conclusion
  );

}


/* =========================================
   MARKET SCORE
========================================= */

function calculateMarketScore(
  data
) {

  if (!data.length) {

    return 50;

  }


  const scores =
    data.map(
      calculateAssetScore
    );


  return (
    scores.reduce(
      (a, b) => a + b,
      0
    ) /
    scores.length
  );

}


/* =========================================
   RENDER MARKET
========================================= */

function renderMarketScoreV2() {

  const data =
    INTELLIGENCE_V2.data;


  const score =
    calculateMarketScore(
      data
    );


  const scoreElement =
    document.getElementById(
      "market-score"
    );


  const sentiment =
    document.getElementById(
      "market-sentiment"
    );


  const bar =
    document.getElementById(
      "sentiment-bar"
    );


  if (scoreElement) {

    scoreElement.textContent =
      `${Math.round(score)}/100`;

  }


  if (bar) {

    bar.style.width =
      `${score}%`;

  }


  if (sentiment) {

    sentiment.className = "";


    if (score >= 65) {

      sentiment.textContent =
        "BULLISH";

      sentiment.classList.add(
        "up"
      );

    }

    else if (score <= 35) {

      sentiment.textContent =
        "BEARISH";

      sentiment.classList.add(
        "down"
      );

    }

    else {

      sentiment.textContent =
        "NEUTRAL";

      sentiment.classList.add(
        "dim"
      );

    }

  }

}


/* =========================================
   RENDER ASSETS
========================================= */

function renderIntelligenceV2() {

  renderMarketScoreV2();


  const container =
    document.getElementById(
      "intel-assets"
    );


  if (!container) return;


  const data =
    INTELLIGENCE_V2.data;


  if (!data.length) {

    container.innerHTML = `
      <div class="empty-state">
        Tidak ada data.
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

}


/* =========================================
   CARD
========================================= */

function renderIntelligenceCard(
  item
) {

  const score =
    calculateAssetScore(
      item
    );


  const trend =
    getTrendV2(item);


  const momentum =
    getMomentum(item);


  const funding =
    getFundingSentiment(
      item
    );


  const risk =
    getRiskV2(item);


  const bullish =
    Math.round(
      score
    );


  const bearish =
    100 - bullish;


  return `

    <article
      class="coin-card"
      style="
        display:block;
        margin-bottom:12px;
      "
    >

      <div
        style="
          display:flex;
          justify-content:
            space-between;
          align-items:center;
        "
      >

        <div>

          <strong
            style="
              font-size:15px;
            "
          >
            ${item.symbol
              .replace(
                "USDT",
                "/USDT"
              )}
          </strong>

          <div
            class="dim"
            style="
              font-size:8px;
              margin-top:3px;
            "
          >
            Intelligence Score
          </div>

        </div>


        <div
          style="
            text-align:right;
          "
        >

          <strong
            style="
              font-size:20px;
            "
          >
            ${score}
          </strong>

          <div
            class="dim"
            style="
              font-size:7px;
            "
          >
            /100
          </div>

        </div>

      </div>


      <!-- BULL / BEAR -->

      <div
        style="
          display:flex;
          justify-content:
            space-between;
          margin-top:12px;
          font-size:8px;
        "
      >

        <span class="up">
          Bullish ${bullish}%
        </span>

        <span class="down">
          Bearish ${bearish}%
        </span>

      </div>


      <div
        style="
          display:flex;
          height:5px;
          margin-top:5px;
          background:
            var(--border);
          border-radius:10px;
          overflow:hidden;
        "
      >

        <div
          style="
            width:${bullish}%;
            background:
              var(--accent);
          "
        ></div>

      </div>


      <!-- METRICS -->

      <div
        style="
          display:grid;
          grid-template-columns:
            repeat(2,1fr);
          gap:7px;
          margin-top:12px;
        "
      >

        <div class="mini-stat">

          <span>Trend</span>

          <strong
            class="${trend.className}"
          >
            ${trend.label}
          </strong>

        </div>


        <div class="mini-stat">

          <span>Momentum</span>

          <strong
            class="${momentum.className}"
          >
            ${momentum.label}
          </strong>

        </div>


        <div class="mini-stat">

          <span>Funding</span>

          <strong
            class="${funding.className}"
          >
            ${funding.label}
          </strong>

        </div>


        <div class="mini-stat">

          <span>Risk</span>

          <strong
            class="${risk.className}"
          >
            ${risk.label}
          </strong>

        </div>

      </div>


      <!-- REASONING -->

      <div
        style="
          margin-top:11px;
          padding:10px;
          border:
            1px solid var(--border);
          border-radius:10px;
          font-size:8px;
          line-height:1.6;
        "
      >

        <strong>
          🧠 Reasoning
        </strong>

        <div
          class="dim"
          style="
            margin-top:4px;
          "
        >
          ${generateReasoning(
            item,
            score
          )}
        </div>

      </div>

    </article>

  `;

}


/* =========================================
   GLOBAL
========================================= */

window.NEXTRA_INTELLIGENCE = {

  load:
    loadIntelligenceV2,

  refresh:
    loadIntelligenceV2,

  state:
    INTELLIGENCE_V2

};


/* =========================================
   INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      document.getElementById(
        "intel-assets"
      )
    ) {

      loadIntelligenceV2();

    }

  }
);
