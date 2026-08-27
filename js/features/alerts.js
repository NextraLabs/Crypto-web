// js/features/alerts.js
// Fitur Price Alert: buat alert, cek limit Free (3), tampilkan alert aktif per coin.

const NEXTRA_ALERTS_FREE_LIMIT = 3;

async function nextraGetSupabase() {
  let attempts = 0;
  while (!window.supabaseClient && attempts < 20) {
    await new Promise((r) => setTimeout(r, 300));
    attempts++;
  }
  return window.supabaseClient || null;
}

async function nextraIsPremium(sb, userId) {
  const { data } = await sb
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();
  return !!data;
}

async function nextraCountActiveAlerts(sb, userId) {
  const { count } = await sb
    .from("price_alerts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", "active");
  return count || 0;
}

function openAlertModal() {
  const modal = document.getElementById("alert-modal");
  if (!modal) return;
  modal.classList.add("show");
}

function closeAlertModal() {
  const modal = document.getElementById("alert-modal");
  if (!modal) return;
  modal.classList.remove("show");
  const priceInput = document.getElementById("alert-price");
  if (priceInput) priceInput.value = "";
}

async function nextraCreateAlert() {
  const sb = await nextraGetSupabase();
  if (!sb) {
    alert("Sistem belum siap, coba lagi sebentar.");
    return;
  }

  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    alert("Silakan login dulu untuk membuat alert.");
    window.location.href = "login.html";
    return;
  }

  const coinData = window.NEXTRA_COIN?.state?.data;
  if (!coinData?.id) {
    alert("Data coin belum siap.");
    return;
  }

  const targetPrice = parseFloat(document.getElementById("alert-price")?.value);
  const direction = document.getElementById("alert-direction")?.value || "above";

  if (!targetPrice || targetPrice <= 0) {
    alert("Masukkan target harga yang valid.");
    return;
  }

  const submitBtn = document.getElementById("alert-submit");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Memproses...";
  }

  try {
    const premium = await nextraIsPremium(sb, session.user.id);

    if (!premium) {
      const count = await nextraCountActiveAlerts(sb, session.user.id);
      if (count >= NEXTRA_ALERTS_FREE_LIMIT) {
        alert(
          `Akun Free dibatasi maksimal ${NEXTRA_ALERTS_FREE_LIMIT} alert aktif.\n\nUpgrade ke NEXTRA Premium untuk alert unlimited.`
        );
        return;
      }
    }

    const { error } = await sb.from("price_alerts").insert({
      user_id: session.user.id,
      coin_id: coinData.id,
      coin_symbol: (coinData.symbol || "").toUpperCase(),
      coin_name: coinData.name || "",
      target_price: targetPrice,
      direction: direction,
    });

    if (error) throw error;

    alert("✅ Alert berhasil dibuat! Kamu akan bisa lihat statusnya di sini.");
    closeAlertModal();
    nextraRenderAlertList();
  } catch (err) {
    console.error(err);
    alert("Gagal membuat alert: " + err.message);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Buat Alert";
    }
  }
}

async function nextraDeleteAlert(alertId) {
  const sb = await nextraGetSupabase();
  if (!sb) return;

  const confirmed = confirm("Hapus alert ini?");
  if (!confirmed) return;

  const { error } = await sb.from("price_alerts").delete().eq("id", alertId);

  if (error) {
    alert("Gagal menghapus alert: " + error.message);
    return;
  }

  nextraRenderAlertList();
}

async function nextraRenderAlertList() {
  const section = document.getElementById("alert-list-section");
  const listEl = document.getElementById("alert-list");
  if (!section || !listEl) return;

  const sb = await nextraGetSupabase();
  if (!sb) return;

  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    section.style.display = "none";
    return;
  }

  const coinData = window.NEXTRA_COIN?.state?.data;
  if (!coinData?.id) return;

  const { data: alerts, error } = await sb
    .from("price_alerts")
    .select("id, target_price, direction, status")
    .eq("user_id", session.user.id)
    .eq("coin_id", coinData.id)
    .in("status", ["active", "triggered"])
    .order("created_at", { ascending: false });

  if (error || !alerts || alerts.length === 0) {
    section.style.display = "none";
    return;
  }

  section.style.display = "block";
  listEl.innerHTML = "";

  alerts.forEach((a) => {
    const row = document.createElement("div");
    row.className = "alert-list-item";

    const arrow = a.direction === "above" ? "≥" : "≤";
    const statusLabel = a.status === "triggered" ? " (Terpenuhi ✅)" : "";

    row.innerHTML = `
      <span>${arrow} $${Number(a.target_price).toLocaleString("en-US")}${statusLabel}</span>
      <button data-alert-id="${a.id}">Hapus</button>
    `;

    row.querySelector("button")?.addEventListener("click", () => {
      nextraDeleteAlert(a.id);
    });

    listEl.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("coin-alert")?.addEventListener("click", openAlertModal);
  document.getElementById("alert-cancel")?.addEventListener("click", closeAlertModal);
  document.getElementById("alert-submit")?.addEventListener("click", nextraCreateAlert);

  const modal = document.getElementById("alert-modal");
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeAlertModal();
  });

  let tries = 0;
  const waitForCoin = setInterval(() => {
    tries++;
    if (window.NEXTRA_COIN?.state?.data?.id) {
      nextraRenderAlertList();
      clearInterval(waitForCoin);
    }
    if (tries > 20) clearInterval(waitForCoin);
  }, 500);
});
