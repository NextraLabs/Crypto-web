// api.js — NEXTRA Market + Futures API

const COINGECKO_API =
  "https://api.coingecko.com/api/v3";

const BINANCE_FUTURES_API =
  "https://fapi.binance.com";

const MARKET_CURRENCY = "usd";


/* =========================================
   GENERIC FETCH
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
      `API error: ${response.status}`
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

  perPage = 50,

  currency = MARKET_CURRENCY,

  order = "market_cap_desc"

} = {}) {

  const params =
    new URLSearchParams({

      vs_currency: currency,

      order,

      per_page: perPage,

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
   TRENDING
========================================= */

async function fetchTrending() {

  return apiFetch(
    "/search/trending"
  );

}


/* =========================================
   GLOBAL
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

      localization: "false",

      tickers: "false",

      market_data: "true",

      community_data: "false",

      developer_data: "false",

      sparkline: "true"

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
   NORMALIZE MARKET
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
      (coin.symbol || "")
        .toUpperCase(),

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
    await fetchMarkets(options);


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


  if (timeframe === "1h") {

    return (
      coin
        .price_change_percentage_1h_in_currency
      ?? 0
    );

  }


  if (timeframe === "7d") {

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
      Number(data.lastPrice),

    change24h:
      Number(
        data.priceChangePercent
      ),

    volume:
      Number(data.volume),

    quoteVolume:
      Number(data.quoteVolume),

    high24h:
      Number(data.highPrice),

    low24h:
      Number(data.lowPrice)

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
      Number(data.lastFundingRate),

    markPrice:
      Number(data.markPrice),

    indexPrice:
      Number(data.indexPrice),

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
      Number(data.openInterest),

    time:
      data.time

  };

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
    oi
  ] = await Promise.all([

    fetchFuturesTicker(
      symbol
    ),

    fetchFundingRate(
      symbol
    ),

    fetchOpenInterest(
      symbol
    )

  ]);


  return {

    ...ticker,

    ...funding,

    ...oi

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

  return Promise.all(

    symbols.map(
      symbol =>
        fetchFuturesData(
          symbol
        )
    )

  );

}


/* =========================================
   GLOBAL API
========================================= */

window.NEXTRA_API = {

  fetchMarkets,

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

  fetchFuturesData,

  fetchFuturesMarkets

};
