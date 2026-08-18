// api.js — satu-satunya pintu ke API luar
const ALL_COINS = [
  { symbol: "BTC", pair: "BTCUSDT" }, { symbol: "ETH", pair: "ETHUSDT" },
  { symbol: "SOL", pair: "SOLUSDT" }, { symbol: "BNB", pair: "BNBUSDT" },
  { symbol: "XRP", pair: "XRPUSDT" }, { symbol: "DOGE", pair: "DOGEUSDT" },
  { symbol: "ADA", pair: "ADAUSDT" }, { symbol: "AVAX", pair: "AVAXUSDT" },
  { symbol: "LINK", pair: "LINKUSDT" }, { symbol: "DOT", pair: "DOTUSDT" },
  { symbol: "LTC", pair: "LTCUSDT" }, { symbol: "TRX", pair: "TRXUSDT" },
  { symbol: "MATIC", pair: "MATICUSDT" }, { symbol: "SHIB", pair: "SHIBUSDT" },
  { symbol: "UNI", pair: "UNIUSDT" }, { symbol: "ATOM", pair: "ATOMUSDT" },
  { symbol: "ETC", pair: "ETCUSDT" }, { symbol: "NEAR", pair: "NEARUSDT" },
  { symbol: "APT", pair: "APTUSDT" }, { symbol: "ARB", pair: "ARBUSDT" },
  { symbol: "OP", pair: "OPUSDT" }, { symbol: "FIL", pair: "FILUSDT" },
  { symbol: "ICP", pair: "ICPUSDT" }, { symbol: "ALGO", pair: "ALGOUSDT" },
];

async function fetchAllTickers() {
  const symbols = JSON.stringify(ALL_COINS.map(c => c.pair));
  const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbols)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arr = await res.json();
  const mapped = {};
  arr.forEach(row => {
    const coin = ALL_COINS.find(c => c.pair === row.symbol);
    if (coin) mapped[coin.symbol] = {
      usd: parseFloat(row.lastPrice),
      usd_24h_change: parseFloat(row.priceChangePercent),
      volume: parseFloat(row.quoteVolume),
    };
  });
  return mapped;
}

async function fetchKlines(pair, interval = "1h", limit = 24) {
  const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()).map(k => ({ time: k[0], close: parseFloat(k[4]) }));
}

let idrCache = { rate: 16300, at: 0 };
async function fetchIdrRate() {
  if (Date.now() - idrCache.at < 300000) return idrCache.rate;
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const json = await res.json();
    if (json?.rates?.IDR) idrCache = { rate: json.rates.IDR, at: Date.now() };
  } catch {}
  return idrCache.rate;
}
