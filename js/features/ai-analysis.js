// js/features/ai-analysis.js
// Smart AI Analysis — khusus user Premium.

async function nextraGetSupabaseForAI() {
  let attempts = 0;
  while (!window.supabaseClient && attempts < 20) {
    await new Promise((r) => setTimeout(r, 300));
    attempts++;
  }
  return window.supabaseClient || null;
}

async function nextraCheckPremiumForAI(sb, userId) {
  const { data } = await sb
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();
  return !!data;
}

async function nextraRunAIAnalysis() {
  const sb = await nextraGetSupabaseForAI();
  const resultBox = document.getElementById("ai-analysis-result");
  const button = document.getElementById("ai-analysis-btn");

  if (!sb) {
    alert("Sistem belum siap, coba lagi.");
    return;
  }

  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    alert("Silakan login dulu untuk menggunakan AI Analysis.");
    window.location.href = "login.html";
    return;
  }

  const premium = await nextraCheckPremiumForAI(sb, session.user.id);
  if (!premium) {
    alert("Fitur Smart AI Analysis khusus untuk NEXTRA Premium. Upgrade dulu di halaman Profile.");
    return;
  }

  const coinData = window.NEXTRA_COIN?.state?.data;
  if (!coinData?.id) {
    alert("Data coin belum siap.");
    return;
  }

  const market = coinData.market_data || {};

  button.disabled = true;
  button.textContent = "Menganalisis...";
  resultBox.style.display = "none";

  try {
    const res = await fetch(
      "https://uvtbntwgooxqjbyjkvkd.supabase.co/functions/v1/ai-analysis",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          coin_name: coinData.name,
          coin_symbol: (coinData.symbol || "").toUpperCase(),
          price: market.current_price?.usd,
          change_1h: market.price_change_percentage_1h_in_currency?.usd,
          change_24h: market.price_change_percentage_24h_in_currency?.usd,
          change_7d: market.price_change_percentage_7d_in_currency?.usd,
          volume_24h: market.total_volume?.usd,
          market_cap: market.market_cap?.usd,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Gagal mendapatkan analisis");
    }

    resultBox.textContent = data.analysis;
    resultBox.style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Gagal menjalankan AI Analysis: " + err.message);
  } finally {
    button.disabled = false;
    button.textContent = "🧠 Generate AI Analysis";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ai-analysis-btn")?.addEventListener("click", nextraRunAIAnalysis);
});
