// api.js — semua fungsi buat ambil data dari luar (Binance, kurs IDR)
// dikumpulkan di sini biar file lain tinggal "import" tanpa perlu tau
// detail URL/format API-nya.

export const ALL_COINS = [
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

// Ambil harga + perubahan 24 jam buat semua koin di ALL_COINS
export async function fetchAllTickers() {
  const symbols = JSON.stringify(ALL_COINS.map((c) => c.pair));
  const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbols)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arr = await res.json();
  const mapped = {};
  arr.forEach((row) => {
    const coin = ALL_COINS.find((c) => c.pair === row.symbol);
    if (coin) {
      mapped[coin.symbol] = {
        usd: parseFloat(row.lastPrice),
        usd_24h_change: parseFloat(row.priceChangePercent),
        high24h: parseFloat(row.highPrice),
        low24h: parseFloat(row.lowPrice),
        volume: parseFloat(row.quoteVolume),
      };
    }
  });
  return mapped;
}

// Ambil data historis (candlestick) satu koin — dipakai buat chart di coin.html
export async function fetchKlines(pair, interval = "1h", limit = 24) {
  const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&limit=${limit}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const arr = await res.json();
  return arr.map((k) => ({
    time: k[0],
    open: parseFloat(k[1]),
    high: parseFloat(k[2]),
    low: parseFloat(k[3]),
    close: parseFloat(k[4]),
  }));
}

// Kurs USD -> IDR, di-cache 5 menit biar nggak spam API
let idrCache = { rate: 16300, fetchedAt: 0 };
export async function fetchIdrRate() {
  const fiveMin = 5 * 60 * 1000;
  if (Date.now() - idrCache.fetchedAt < fiveMin) return idrCache.rate;
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const json = await res.json();
    if (json?.rates?.IDR) {
      idrCache = { rate: json.rates.IDR, fetchedAt: Date.now() };
    }
  } catch {}
  return idrCache.rate;
}
