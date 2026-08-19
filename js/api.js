// api.js — NEXTRA Market Data API
// CoinGecko public API

const COINGECKO_API =
  "https://api.coingecko.com/api/v3";

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
   MARKET LIST
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
   GLOBAL MARKET DATA
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
   SEARCH COIN
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
   MARKET HELPERS
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
   FORMAT MARKET COIN
========================================= */

function normalizeMarketCoin(
  coin
) {

  return {

    id: coin.id,

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
   API EXPORT GLOBAL
========================================= */

window.NEXTRA_API = {

  fetchMarkets,

  fetchTrending,

  fetchGlobalMarket,

  fetchCoin,

  searchCoins,

  fetchNormalizedMarkets,

  normalizeMarketCoin,

  getMarketChange

};
