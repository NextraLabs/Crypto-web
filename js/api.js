// api.js — NEXTRA Market + Futures API V6
// DUAL-PHASE MARKET LOADING
// Phase 1: Binance Futures → FAST
// Phase 2: CoinGecko → Background enrichment
// Futures: Binance Futures
// Coin Detail: Chart / History


const COINGECKO_API =
  "https://api.coingecko.com/api/v3";

const BINANCE_FUTURES_API =
  "https://fapi.binance.com";

const MARKET_CURRENCY =
  "usd";


/* =========================================
   GENERIC FETCH — COINGECKO
========================================= */

async function apiFetch(
  endpoint,
  options = {}
) {

  const response =
    await fetch(
      `${COINGECKO_API}${endpoint}`,
      {
        ...options,

        headers: {
          Accept:
            "application/json",

          ...(options.headers || {})
        }
      }
    );


  if (!response.ok) {

    throw new Error(
      `CoinGecko API error: ${response.status}`
    );

  }


  return response.json();

}


/* =========================================
   BINANCE FETCH
========================================= */

async function binanceFetch(
  endpoint
) {

  const response =
    await fetch(
      `${BINANCE_FUTURES_API}${endpoint}`
    );


  if (!response.ok) {

    throw new Error(
      `Binance API error: ${response.status}`
    );

  }


  return response.json();

}


/* =========================================
   COINGECKO MARKETS
========================================= */

async function fetchMarkets({

  page = 1,

  perPage = 100,

  currency =
    MARKET_CURRENCY,

  order =
    "market_cap_desc",

  sparkline = false

} = {}) {

  const params =
    new URLSearchParams({

      vs_currency:
        currency,

      order,

      per_page:
        Math.min(
          Number(perPage) || 100,
          250
        ),

      page,

      sparkline:
        sparkline
          ? "true"
          : "false",

      price_change_percentage:
        "1h,24h,7d"

    });


  return apiFetch(
    `/coins/markets?${params}`
  );

}


/* =========================================
   COINGECKO FAST MARKET LOADER
========================================= */

async function fetchFastMarkets({

  currency =
    MARKET_CURRENCY,

  total = 250,

  perPage = 100

} = {}) {

  const safeTotal =
    Math.min(
      Math.max(
        Number(total) || 250,
        1
      ),
      250
    );


  const safePerPage =
    Math.min(
      Math.max(
        Number(perPage) || 100,
        1
      ),
      250
    );


  const pages =
    Math.ceil(
      safeTotal /
      safePerPage
    );


  const requests =
    Array.from(
      {
        length:
          pages
      },
      (_, index) => {

        return fetchMarkets({

          page:
            index + 1,

          perPage:
            safePerPage,

          currency,

          order:
            "market_cap_desc",

          sparkline:
            false

        });

      }
    );


  const responses =
    await Promise.all(
      requests
    );


  return responses
    .flat()
    .slice(
      0,
      safeTotal
    );

}


/* =========================================
   LEGACY 1000 COINS
========================================= */

async function fetch1000Markets({

  currency =
    MARKET_CURRENCY,

  total = 1000,

  perPage = 100,

  delay = 0

} = {}) {

  const safeTotal =
    Math.min(
      Number(total) || 1000,
      1000
    );


  const pages =
    Math.ceil(
      safeTotal /
      perPage
    );


  const results = [];


  const batchSize = 3;


  for (
    let start = 1;
    start <= pages;
    start += batchSize
  ) {

    const batchPages =
      Array.from(
        {
          length:
            Math.min(
              batchSize,
              pages - start + 1
            )
        },
        (_, index) =>
          start + index
      );


    const batchResults =
      await Promise.all(
        batchPages.map(
          page =>
            fetchMarkets({

              page,

              perPage,

              currency,

              order:
                "market_cap_desc",

              sparkline:
                false

            })
        )
      );


    batchResults.forEach(
      data => {

        if (
          Array.isArray(data)
        ) {

          results.push(
            ...data
          );

        }

      }
    );


    if (
      delay > 0 &&
      start + batchSize <= pages
    ) {

      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            delay
          )
      );

    }

  }


  return results.slice(
    0,
    safeTotal
  );

}


/* =========================================
   TRENDING
========================================= */

async function fetchTrending() {

  return apiFetch(
    "/search/trending"
  );

}


/* =========================================
   GLOBAL MARKET
========================================= */

async function fetchGlobalMarket() {

  return apiFetch(
    "/global"
  );

}


/* =========================================
   COIN DETAIL
========================================= */

async function fetchCoin(
  coinId
) {

  if (!coinId) {

    throw new Error(
      "Coin ID tidak ditemukan"
    );

  }


  const params =
    new URLSearchParams({

      localization:
        "false",

      tickers:
        "false",

      market_data:
        "true",

      community_data:
        "false",

      developer_data:
        "false",

      sparkline:
        "true"

    });


  return apiFetch(
    `/coins/${encodeURIComponent(
      coinId
    )}?${params}`
  );

}


/* =========================================
   COIN CHART / HISTORY
========================================= */

async function fetchCoinChart(
  coinId,
  days = 7
) {

  if (!coinId) {

    throw new Error(
      "Coin ID untuk chart tidak ditemukan"
    );

  }


  const params =
    new URLSearchParams({

      vs_currency:
        MARKET_CURRENCY,

      days,

      interval:
        days <= 1
          ? "hourly"
          : "daily",

      precision:
        "full"

    });


  return apiFetch(
    `/coins/${encodeURIComponent(
      coinId
    )}/market_chart?${params}`
  );

}


/* =========================================
   SEARCH
========================================= */

async function searchCoins(
  query
) {

  if (!query) {

    return {
      coins: []
    };

  }


  return apiFetch(
    `/search?query=${encodeURIComponent(
      query
    )}`
  );

}


/* =========================================
   NORMALIZE MARKET COIN
========================================= */

function normalizeMarketCoin(
  coin
) {

  return {

    id:
      coin.id,

    rank:
      coin.market_cap_rank ?? "-",

    name:
      coin.name ?? "-",

    symbol:
      (
        coin.symbol || ""
      ).toUpperCase(),

    image:
      coin.image ?? "",

    price:
      coin.current_price ?? 0,

    marketCap:
      coin.market_cap ?? 0,

    volume:
      coin.total_volume ?? 0,

    change1h:
      coin
        .price_change_percentage_1h_in_currency
      ?? 0,

    change24h:
      coin
        .price_change_percentage_24h_in_currency
      ?? 0,

    change7d:
      coin
        .price_change_percentage_7d_in_currency
      ?? 0,

    high24h:
      coin.high_24h ?? 0,

    low24h:
      coin.low_24h ?? 0,

    circulatingSupply:
      coin.circulating_supply ?? 0,

    totalSupply:
      coin.total_supply ?? 0,

    maxSupply:
      coin.max_supply ?? 0,

    sparkline: []

  };

}


/* =========================================
   BINANCE — FAST MARKET DATA
========================================= */

async function fetchBinanceMarkets({

  total = 100

} = {}) {

  const data =
    await binanceFetch(
      "/fapi/v1/ticker/24hr"
    );


  if (
    !Array.isArray(data)
  ) {

    throw new Error(
      "Binance market data tidak valid"
    );

  }


  const markets =
    data
      .filter(item => {

        return (

          item &&

          typeof item.symbol ===
            "string" &&

          item.symbol.endsWith(
            "USDT"
          ) &&

          Number(
            item.lastPrice
          ) > 0

        );

      })


      /*
       * Volume terbesar
       * supaya market yang muncul
       * paling relevan.
       */

      .sort(
        (a, b) =>
          Number(
            b.quoteVolume || 0
          ) -
          Number(
            a.quoteVolume || 0
          )
      )


      .slice(
        0,
        Math.min(
          Number(total) || 100,
          250
        )
      );


  return markets.map(
    item => {

      const symbol =
        item.symbol
          .replace(
            /USDT$/,
            ""
          )
          .toUpperCase();


      return {

        /*
         * Temporary ID.
         *
         * Akan diganti dengan
         * CoinGecko ID saat
         * enrichment selesai.
         */

        id:
          `binance-${symbol.toLowerCase()}`,

        rank:
          "-",

        name:
          symbol,

        symbol,

        image:
          "",

        price:
          Number(
            item.lastPrice
          ) || 0,

        marketCap:
          0,

        volume:
          Number(
            item.quoteVolume
          ) || 0,

        change1h:
          0,

        change24h:
          Number(
            item.priceChangePercent
          ) || 0,

        change7d:
          0,

        high24h:
          Number(
            item.highPrice
          ) || 0,

        low24h:
          Number(
            item.lowPrice
          ) || 0,

        circulatingSupply:
          0,

        totalSupply:
          0,

        maxSupply:
          0,

        sparkline: [],

        source:
          "binance",

        enriched:
          false

      };

    }
  );

}


/* =========================================
   COINGECKO ENRICHMENT
========================================= */

async function enrichMarketsWithCoinGecko(
  coins,
  {
    currency =
      MARKET_CURRENCY,

    limit = 250

  } = {}
) {

  if (
    !Array.isArray(coins) ||
    !coins.length
  ) {

    return coins;

  }


  try {

    /*
     * Ambil 250 coin berdasarkan
     * market cap dari CoinGecko.
     */

    const data =
      await fetchMarkets({

        page: 1,

        perPage:
          Math.min(
            Number(limit) || 250,
            250
          ),

        currency,

        order:
          "market_cap_desc",

        sparkline:
          false

      });


    if (
      !Array.isArray(data)
    ) {

      return coins;

    }


    const bySymbol =
      new Map();


    data.forEach(
      coin => {

        const symbol =
          String(
            coin.symbol || ""
          )
            .trim()
            .toUpperCase();


        if (!symbol) return;


        /*
         * Hindari duplicate symbol.
         */

        if (
          !bySymbol.has(symbol)
        ) {

          bySymbol.set(
            symbol,
            coin
          );

        }

      }
    );


    return coins.map(
      coin => {

        const symbol =
          String(
            coin.symbol || ""
          )
            .trim()
            .toUpperCase();


        const cg =
          bySymbol.get(
            symbol
          );


        if (!cg) {

          return coin;

        }


        const normalized =
          normalizeMarketCoin(
            cg
          );


        return {

          ...coin,

          ...normalized,

          /*
           * Binance tetap menjadi
           * sumber realtime.
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
            coin.low24h,

          source:
            "binance+coingecko",

          enriched:
            true

        };

      }
    );

  }

  catch (error) {

    console.warn(
      "NEXTRA: CoinGecko enrichment gagal:",
      error
    );


    /*
     * SANGAT PENTING:
     *
     * Jangan throw error.
     *
     * Binance data tetap
     * dikembalikan.
     */

    return coins;

  }

}


/* =========================================
   NORMALIZED MARKETS
   =========================================
   PHASE 1:
   Binance first.
========================================= */

async function fetchNormalizedMarkets(
  options = {}
) {

  return fetchBinanceMarkets({

    total:
      options.total ||
      100

  });

}


/* =========================================
   MARKET CHANGE
========================================= */

function getMarketChange(
  coin,
  timeframe = "24h"
) {

  if (!coin) return 0;


  if (
    timeframe === "1h"
  ) {

    return (
      coin
        .price_change_percentage_1h_in_currency
      ??
      coin.change1h
      ??
      0
    );

  }


  if (
    timeframe === "7d"
  ) {

    return (
      coin
        .price_change_percentage_7d_in_currency
      ??
      coin.change7d
      ??
      0
    );

  }


  return (
    coin
      .price_change_percentage_24h_in_currency
    ??
    coin.change24h
    ??
    0
  );

}


/* =========================================
   FUTURES — 24H TICKER
========================================= */

async function fetchFuturesTicker(
  symbol
) {

  const data =
    await binanceFetch(
      `/fapi/v1/ticker/24hr?symbol=${symbol}`
    );


  return {

    symbol:
      data.symbol,

    price:
      Number(
        data.lastPrice
      ),

    change24h:
      Number(
        data.priceChangePercent
      ),

    volume:
      Number(
        data.volume
      ),

    quoteVolume:
      Number(
        data.quoteVolume
      ),

    high24h:
      Number(
        data.highPrice
      ),

    low24h:
      Number(
        data.lowPrice
      )

  };

}


/* =========================================
   FUTURES — FUNDING
========================================= */

async function fetchFundingRate(
  symbol
) {

  const data =
    await binanceFetch(
      `/fapi/v1/premiumIndex?symbol=${symbol}`
    );


  return {

    symbol:
      data.symbol,

    fundingRate:
      Number(
        data.lastFundingRate
      ),

    markPrice:
      Number(
        data.markPrice
      ),

    indexPrice:
      Number(
        data.indexPrice
      ),

    nextFundingTime:
      data.nextFundingTime

  };

}


/* =========================================
   FUTURES — OPEN INTEREST
========================================= */

async function fetchOpenInterest(
  symbol
) {

  const data =
    await binanceFetch(
      `/fapi/v1/openInterest?symbol=${symbol}`
    );


  return {

    symbol:
      data.symbol,

    openInterest:
      Number(
        data.openInterest
      ),

    time:
      data.time

  };

}


/* =========================================
   FUTURES — OI HISTORY
========================================= */

async function fetchOpenInterestHistory(
  symbol
) {

  try {

    const data =
      await binanceFetch(
        `/futures/data/openInterestHist?symbol=${symbol}&period=1h&limit=25`
      );


    if (
      !Array.isArray(data) ||
      data.length < 2
    ) {

      return {

        current: null,

        previous: null,

        change: null

      };

    }


    const current =
      Number(
        data[
          data.length - 1
        ].sumOpenInterestValue
      );


    const previous =
      Number(
        data[0]
          .sumOpenInterestValue
      );


    if (
      !Number.isFinite(
        current
      ) ||
      !Number.isFinite(
        previous
      ) ||
      previous === 0
    ) {

      return {

        current: null,

        previous: null,

        change: null

      };

    }


    const change =
      (
        (
          current -
          previous
        ) /
        previous
      ) * 100;


    return {

      current,

      previous,

      change

    };

  }

  catch (error) {

    console.warn(
      `OI history unavailable for ${symbol}`,
      error
    );


    return {

      current: null,

      previous: null,

      change: null

    };

  }

}


/* =========================================
   FUTURES — COMPLETE DATA
========================================= */

async function fetchFuturesData(
  symbol
) {

  const [
    ticker,

    funding,

    oi,

    oiHistory

  ] = await Promise.all([

    fetchFuturesTicker(
      symbol
    ),

    fetchFundingRate(
      symbol
    ),

    fetchOpenInterest(
      symbol
    ),

    fetchOpenInterestHistory(
      symbol
    )

  ]);


  return {

    ...ticker,

    ...funding,

    ...oi,

    oiCurrent:
      oiHistory.current,

    oiPrevious:
      oiHistory.previous,

    oiChange24h:
      oiHistory.change

  };

}


/* =========================================
   FUTURES — BATCH
========================================= */

async function fetchFuturesMarkets(
  symbols = [

    "BTCUSDT",

    "ETHUSDT",

    "SOLUSDT"

  ]
) {

  const results =
    await Promise.all(

      symbols.map(
        async symbol => {

          try {

            return await fetchFuturesData(
              symbol
            );

          }

          catch (error) {

            console.warn(
              `Failed ${symbol}:`,
              error
            );

            return null;

          }

        }
      )

    );


  return results.filter(
    Boolean
  );

}


/* =========================================
   FUTURES — OI INTERPRETATION
========================================= */

function interpretOIChange(
  priceChange,
  oiChange
) {

  if (
    priceChange === null ||
    oiChange === null
  ) {

    return "INSUFFICIENT DATA";

  }


  const priceUp =
    priceChange > 0;

  const oiUp =
    oiChange > 0;


  if (
    priceUp &&
    oiUp
  ) {

    return "LONG CONFIRMATION";

  }


  if (
    !priceUp &&
    oiUp
  ) {

    return "SHORT CONFIRMATION";

  }


  if (
    priceUp &&
    !oiUp
  ) {

    return "SHORT COVERING";

  }


  if (
    !priceUp &&
    !oiUp
  ) {

    return "LONG REDUCTION";

  }


  return "NEUTRAL";

}


/* =========================================
   FUTURES — MARKET SIGNAL
========================================= */

function getFuturesSignal(
  data
) {

  const priceChange =
    Number.isFinite(
      Number(
        data?.change24h
      )
    )
      ? Number(
          data.change24h
        )
      : null;


  const oiChange =
    Number.isFinite(
      Number(
        data?.oiChange24h
      )
    )
      ? Number(
          data.oiChange24h
        )
      : null;


  const funding =
    Number.isFinite(
      Number(
        data?.fundingRate
      )
    )
      ? Number(
          data.fundingRate
        )
      : null;


  const oiSignal =
    interpretOIChange(
      priceChange,
      oiChange
    );


  let fundingSignal =
    "BALANCED";


  if (
    funding !== null
  ) {

    const percent =
      funding * 100;


    if (
      percent >= 0.10
    ) {

      fundingSignal =
        "CROWDED LONG";

    }

    else if (
      percent >= 0.05
    ) {

      fundingSignal =
        "LONG HEAVY";

    }

    else if (
      percent <= -0.10
    ) {

      fundingSignal =
        "CROWDED SHORT";

    }

    else if (
      percent <= -0.05
    ) {

      fundingSignal =
        "SHORT HEAVY";

    }

  }


  return {

    oiSignal,

    fundingSignal,

    priceChange,

    oiChange,

    fundingRate:
      funding

  };

}


/* =========================================
   GLOBAL API
========================================= */

window.NEXTRA_API = {

  fetchMarkets,

  fetchFastMarkets,

  fetch1000Markets,

  fetchTrending,

  fetchGlobalMarket,

  fetchCoin,

  fetchCoinChart,

  searchCoins,

  fetchNormalizedMarkets,

  fetchBinanceMarkets,

  enrichMarketsWithCoinGecko,

  normalizeMarketCoin,

  getMarketChange,

  fetchFuturesTicker,

  fetchFundingRate,

  fetchOpenInterest,

  fetchOpenInterestHistory,

  fetchFuturesData,

  fetchFuturesMarkets,

  interpretOIChange,

  getFuturesSignal

};