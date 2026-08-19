// radar.js — NEXTRA Radar V1

const RADAR_STATE = {
  coins: [],
  trending: [],
  loading: false,
  lastUpdate: null
};


/* =========================================
   LOAD RADAR
========================================= */

async function loadRadar() {

  RADAR_STATE.loading = true;

  const container =
    document.getElementById(
      "radar-content"
    );

  if (container) {

    container.innerHTML = `
      <div class="loading">
        Menganalisis market...
      </div>
    `;

  }


  try {

    const [
      markets,
      trending
    ] = await Promise.all([

      NEXTRA_API.fetchNormalizedMarkets({
        page: 1,
        perPage: 100
      }),

      NEXTRA_API.fetchTrending()

    ]);


    RADAR_STATE.coins =
      markets || [];


    RADAR_STATE.trending =
      trending?.coins || [];


    RADAR_STATE.lastUpdate =
      new Date();


    renderRadar();


  } catch (error) {

    console.error(
      "Radar error:",
      error
    );


    if (container) {

      container.innerHTML = `

        <div class="error-box">

          ⚠️ Gagal memuat Radar.

          <br>

          <button
            class="icon-btn"
            style="margin-top:10px;"
            onclick="loadRadar()"
          >
            Coba lagi
          </button>

        </div>

      `;

    }

  } finally {

    RADAR_STATE.loading = false;

  }

}


/* =========================================
   RENDER RADAR
========================================= */

function renderRadar() {

  const container =
    document.getElementById(
      "radar-content"
    );

  if (!container) return;


  const gainers =
    [...RADAR_STATE.coins]
      .sort(
        (a, b) =>
          b.change24h -
          a.change24h
      )
      .slice(0, 5);


  const losers =
    [...RADAR_STATE.coins]
      .sort(
        (a, b) =>
          a.change24h -
          b.change24h
      )
      .slice(0, 5);


  const volumeLeaders =
    [...RADAR_STATE.coins]
      .sort(
        (a, b) =>
          b.volume -
          a.volume
      )
      .slice(0, 5);


  const momentum =
    [...RADAR_STATE.coins]
      .map(coin => ({

        ...coin,

        momentumScore:
          calculateMomentum(
            coin
          )

      }))
      .sort(
        (a, b) =>
          b.momentumScore -
          a.momentumScore
      )
      .slice(0, 5);


  container.innerHTML = `

    <section>

      ${renderRadarSection(
        "🔥",
        "Trending",
        renderTrending()
      )}

    </section>


    <section>

      ${renderRadarSection(
        "🟢",
        "Top Gainers",
        renderCoinRows(
          gainers
        )
      )}

    </section>


    <section>

      ${renderRadarSection(
        "🔴",
        "Top Losers",
        renderCoinRows(
          losers
        )
      )}

    </section>


    <section>

      ${renderRadarSection(
        "⚡",
        "Momentum",
        renderMomentumRows(
          momentum
        )
      )}

    </section>


    <section>

      ${renderRadarSection(
        "💧",
        "Volume Leaders",
        renderCoinRows(
          volumeLeaders
        )
      )}

    </section>

  `;


  updateRadarTime();

}


/* =========================================
   SECTION
========================================= */

function renderRadarSection(
  icon,
  title,
  content
) {

  return `

    <div
      class="coin-card"
      style="
        display:block;
        margin-bottom:10px;
        cursor:default;
      "
    >

      <div
        style="
          display:flex;
          align-items:center;
          gap:7px;
          margin-bottom:12px;
        "
      >

        <span>
          ${icon}
        </span>

        <strong>
          ${title}
        </strong>

      </div>


      ${content}

    </div>

  `;

}


/* =========================================
   TRENDING
========================================= */

function renderTrending() {

  if (
    !RADAR_STATE.trending.length
  ) {

    return `
      <div class="empty-state">
        Tidak ada data trending.
      </div>
    `;

  }


  return RADAR_STATE.trending
    .slice(0, 5)
    .map(
      (item, index) => {

        const coin =
          item.item;


        return `

          <div
            style="
              display:flex;
              align-items:center;
              gap:10px;
              padding:8px 0;
              border-bottom:
                1px solid var(--border);
            "
          >

            <span
              class="faint"
              style="
                width:18px;
                font-size:10px;
              "
            >
              ${index + 1}
            </span>


            ${
              coin.thumb
                ? `
                  <img
                    src="${coin.thumb}"
                    width="28"
                    height="28"
                    style="
                      border-radius:50%;
                    "
                      alt="${coin.name}"
                  >
                `
                : ""
            }


            <div
              style="
                flex:1;
              "
            >

              <strong
                style="
                  font-size:11px;
                "
              >
                ${coin.symbol}
              </strong>

              <div
                class="dim"
                style="
                  font-size:9px;
                "
              >
                ${coin.name}
              </div>

            </div>


            <div
              style="
                font-size:10px;
                color:var(--accent);
              "
            >
              Rank #${coin.market_cap_rank || "-"}
            </div>

          </div>

        `;

      }
    )
    .join("");

}


/* =========================================
   COIN ROWS
========================================= */

function renderCoinRows(
  coins
) {

  if (!coins.length) {

    return `
      <div class="empty-state">
        Tidak ada data.
      </div>
    `;

  }


  return coins
    .map(
      (coin, index) => {

        const change =
          coin.change24h;


        const sign =
          change >= 0
            ? "+"
            : "";


        const cls =
          change >= 0
            ? "up"
            : "down";


        return `

          <a
            href="coin.html?id=${coin.id}"
            style="
              display:flex;
              align-items:center;
              gap:10px;
              padding:8px 0;
              border-bottom:
                1px solid var(--border);
            "
          >

            <span
              class="faint"
              style="
                width:18px;
                font-size:10px;
              "
            >
              ${index + 1}
            </span>


            ${
              coin.image
                ? `
                  <img
                    src="${coin.image}"
                    width="28"
                    height="28"
                    style="
                      border-radius:50%;
                    "
                    alt="${coin.name}"
                  >
                `
                : ""
            }


            <div
              style="
                flex:1;
                min-width:0;
              "
            >

              <strong
                style="
                  font-size:11px;
                "
              >
                ${coin.symbol}
              </strong>

              <div
                class="dim"
                style="
                  font-size:9px;
                "
              >
                ${coin.name}
              </div>

            </div>


            <div
              style="
                text-align:right;
              "
            >

              <div
                style="
                  font-size:11px;
                "
              >
                ${formatRadarPrice(
                  coin.price
                )}
              </div>

              <div
                class="${cls}"
                style="
                  font-size:9px;
                  margin-top:2px;
                "
              >
                ${sign}${change.toFixed(2)}%
              </div>

            </div>

          </a>

        `;

      }
    )
    .join("");

}


/* =========================================
   MOMENTUM
========================================= */

function calculateMomentum(
  coin
) {

  let score = 50;


  if (coin.change1h > 0) {
    score += 10;
  } else {
    score -= 10;
  }


  if (coin.change24h > 0) {
    score += 15;
  } else {
    score -= 15;
  }


  if (coin.change7d > 0) {
    score += 20;
  } else {
    score -= 20;
  }


  const volumeScore =
    Math.min(
      10,
      Math.log10(
        Math.max(
          coin.volume,
          1
        )
      )
    );


  score +=
    volumeScore;


  return Math.max(
    0,
    Math.min(
      100,
      score
    )
  );

}


function renderMomentumRows(
  coins
) {

  if (!coins.length) {

    return `
      <div class="empty-state">
        Tidak ada data momentum.
      </div>
    `;

  }


  return coins
    .map(
      (coin, index) => {

        const score =
          Math.round(
            coin.momentumScore
          );


        return `

          <a
            href="coin.html?id=${coin.id}"
            style="
              display:flex;
              align-items:center;
              gap:10px;
              padding:8px 0;
              border-bottom:
                1px solid var(--border);
            "
          >

            <span
              class="faint"
              style="
                width:18px;
                font-size:10px;
              "
            >
              ${index + 1}
            </span>


            ${
              coin.image
                ? `
                  <img
                    src="${coin.image}"
                    width="28"
                    height="28"
                    style="
                      border-radius:50%;
                    "
                    alt="${coin.name}"
                  >
                `
                : ""
            }


            <div
              style="
                flex:1;
              "
            >

              <strong
                style="
                  font-size:11px;
                "
              >
                ${coin.symbol}
              </strong>

              <div
                class="dim"
                style="
                  font-size:9px;
                "
              >
                Momentum score
              </div>

            </div>


            <div
              style="
                min-width:45px;
                text-align:right;
              "
            >

              <strong
                style="
                  color:var(--accent);
                  font-size:13px;
                "
              >
                ${score}
              </strong>

              <div
                class="dim"
                style="
                  font-size:8px;
                "
              >
                / 100
              </div>

            </div>

          </a>

        `;

      }
    )
    .join("");

}


/* =========================================
   PRICE
========================================= */

function formatRadarPrice(
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
    price.toPrecision(5);

}


/* =========================================
   LAST UPDATE
========================================= */

function updateRadarTime() {

  const element =
    document.getElementById(
      "radar-update"
    );

  if (!element) return;


  if (
    !RADAR_STATE.lastUpdate
  ) {

    element.textContent =
      "Belum diperbarui";

    return;

  }


  element.textContent =
    "Updated " +
    RADAR_STATE.lastUpdate
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

window.NEXTRA_RADAR = {

  state:
    RADAR_STATE,

  load:
    loadRadar,

  refresh:
    loadRadar

};


/* =========================================
   AUTO INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      document.getElementById(
        "radar-content"
      )
    ) {

      loadRadar();

    }

  }
);
