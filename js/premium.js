// js/premium.js
// Menghubungkan tombol "Upgrade" (id="planButton") di profile.html
// ke Supabase Edge Function `create-transaction` dan Midtrans Snap.

(() => {

  "use strict";

  const SUPABASE_FUNCTIONS_URL = "https://uvtbntwgooxqjbyjkvkd.supabase.co/functions/v1";

  const planButton = document.getElementById("planButton");
  const planTierText = document.getElementById("planTierText");
  const planDescText = document.getElementById("planDescText");

  async function checkPremiumStatus() {
    if (!window.supabaseClient) return null;

    const { data: { session } } = await window.supabaseClient.auth.getSession();
    if (!session) return null;

    const { data, error } = await window.supabaseClient
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
    return data;
  }

  async function handleUpgradeClick() {
    if (!window.supabaseClient) {
      alert("Sistem belum siap, coba muat ulang halaman.");
      return;
    }

    const { data: { session } } = await window.supabaseClient.auth.getSession();

    if (!session) {
      alert("Silakan login dulu untuk upgrade ke Premium.");
      window.location.href = "login.html";
      return;
    }

    planButton.disabled = true;
    const originalText = planButton.textContent;
    planButton.textContent = "Memproses...";

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
      planButton.disabled = false;
      planButton.textContent = originalText;
    }
  }

  async function renderPremiumStatus() {
    const premium = await checkPremiumStatus();
    if (!premium || !planButton) return;

    planButton.style.display = "none";

    if (planTierText) planTierText.textContent = "NEXTRA Premium";

    if (planDescText) {
      const expiry = new Date(premium.expires_at).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric",
      });
      planDescText.textContent = `Aktif sampai ${expiry}`;
    }
  }

  if (planButton) {
    planButton.addEventListener("click", handleUpgradeClick);
  }

  window.NEXTRA_PREMIUM = {
    render: renderPremiumStatus,
  };

})();
