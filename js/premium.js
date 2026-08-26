// js/premium.js
// Asumsi: supabaseClient sudah diinisialisasi di file lain (mis. js/supabase-client.js)
// dan tersedia secara global sebelum file ini dimuat.

const SUPABASE_FUNCTIONS_URL = "https://uvtbntwgooxqjbyjkvkd.supabase.co/functions/v1";

async function checkPremiumStatus() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabaseClient
    .from("subscriptions")
    .select("tier, status, expires_at")
    .eq("user_id", session.user.id)
    .eq("status", "active")
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Gagal cek status premium:", error);
    return null;
  }
  return data; // null kalau belum ada langganan aktif
}

async function handleUpgradeClick() {
  const btn = document.getElementById("btn-upgrade-premium");
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    alert("Silakan login dulu untuk upgrade ke Premium.");
    window.location.href = "login.html";
    return;
  }

  btn.disabled = true;
  btn.textContent = "Memproses...";

  try {
    const res = await fetch(`${SUPABASE_FUNCTIONS_URL}/create-transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Gagal membuat transaksi");
    }

    // Buka popup Snap Midtrans
    window.snap.pay(data.token, {
      onSuccess: function () {
        alert("Pembayaran berhasil! Status Premium kamu akan aktif sebentar lagi.");
        window.location.reload();
      },
      onPending: function () {
        alert("Pembayaran kamu sedang diproses. Cek status di halaman Profile.");
      },
      onError: function () {
        alert("Terjadi kesalahan saat pembayaran. Silakan coba lagi.");
      },
      onClose: function () {
        console.log("Popup pembayaran ditutup sebelum selesai.");
      },
    });
  } catch (err) {
    console.error(err);
    alert("Gagal memulai proses upgrade: " + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = "Upgrade ke Premium — Rp49.000/bulan";
  }
}

async function renderPremiumStatus() {
  const statusText = document.getElementById("premium-status-text");
  const btn = document.getElementById("btn-upgrade-premium");
  const premium = await checkPremiumStatus();

  if (premium) {
    btn.style.display = "none";
    statusText.style.display = "block";
    const expiry = new Date(premium.expires_at).toLocaleDateString("id-ID", {
      day: "numeric", month: "long", year: "numeric",
    });
    statusText.textContent = `✅ Kamu sudah Premium, aktif sampai ${expiry}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-upgrade-premium");
  if (btn) {
    btn.addEventListener("click", handleUpgradeClick);
    renderPremiumStatus();
  }
});
