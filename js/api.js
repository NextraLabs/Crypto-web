// api.js — NEXTRA Market + Futures API V3
// Market: sampai 1.000 coins
// Futures: Binance Futures

const COINGECKO_API =
  "https://api.coingecko.com/api/v3";

const BINANCE_FUTURES_API =
  "https://fapi.binance.com";

const MARKET_CURRENCY = "usd";


/* =========================================
   GENERIC FETCH — COINGECKO
========================================= */

async function apiFetch(
  endpoint,
  options = {}
) {

  const response = await fetch(
    `${COINGECKO_API}${endpoint}`,
    {
      ...options,

      headers: {
        Accept: "application/json",
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

  currency = MARKET_CURRENCY,

  order = "market_cap_desc"

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

      sparkline: "true",

      price_change_percentage:
        "1h,24h,7d"

    });


  return apiFetch(
    `/coins/markets?${params}`
  );

}


/* =========================================
   FETCH 1.000 COINS
========================================= */

async function fetch1000Markets({

  currency = MARKET_CURRENCY,

  total = 1000,

  perPage = 100,

  delay = 350

} = {}) {

  const results = [];

  const pages =
    Math.ceil(
      total / perPage
    );


  for (
    let page = 1;
    page <= pages;
    page++
  ) {

    try {

      const data =
        await fetchMarkets({

          page,

          perPage,

          currency,

          order:
            "market_cap_desc"

        });


      if (
        Array.isArray(data)
      ) {

        results.push(
          ...data
        );

      }


      /*
        Delay kecil supaya
        request tidak terlalu agresif
        terhadap CoinGecko.
      */

      if (
        page < pages
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

    catch (error) {

      console.warn(
        `Gagal mengambil market page ${page}:`,
        error
      );

      /*
        Kalau satu halaman gagal,
        kita lanjutkan halaman berikutnya.
      */

    }

  }


  /*
    Pastikan maksimal sesuai
    jumlah yang diminta.
  */

  return results.slice(
    0,
    total
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

    sparkline:
      coin.sparkline_in_7d?.price
      ?? []

  };

}


/* =========================================
   NORMALIZED MARKETS
========================================= */

async function fetchNormalizedMarkets(
  options = {}
) {

  const data =
    await fetch1000Markets({

      currency:
        options.currency ||
        MARKET_CURRENCY,

      total:
        options.total ||
        1000,

      perPage:
        options.perPage ||
        100,

      delay:
        options.delay ??
        350

    });


  return data.map(
    normalizeMarketCoin
  );

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
      ?? 0
    );

  }


  if (
    timeframe === "7d"
  ) {

    return (
      coin
        .price_change_percentage_7d_in_currency
      ?? 0
    );

  }


  return (
    coin
      .price_change_percentage_24h_in_currency
    ?? 0
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
      !Number.isFinite(current) ||
      !Number.isFinite(previous) ||
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

  const results = [];


  for (
    const symbol of symbols
  ) {

    try {

      const data =
        await fetchFuturesData(
          symbol
        );


      results.push(
        data
      );

    }

    catch (error) {

      console.warn(
        `Failed ${symbol}:`,
        error
      );

    }

  }


  return results;

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

  fetch1000Markets,

  fetchTrending,

  fetchGlobalMarket,

  fetchCoin,

  searchCoins,

  fetchNormalizedMarkets,

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
