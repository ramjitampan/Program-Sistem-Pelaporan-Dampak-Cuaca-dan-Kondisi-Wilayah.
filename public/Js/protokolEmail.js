document.getElementById("tombolDarurat").addEventListener("click", async () => {
  const konfirmasi = confirm(
    "⚠️ PROTOKOL DARURAT\nEmail akan dikirim sekarang. Lanjutkan?"
  );

  if (!konfirmasi) return;

  try {
    const res = await fetch("/api/email/darurat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lokasi: "Sumatra Barat",
        pesan: "Banjir besar, warga butuh evakuasi segera"
      })
    });

    const hasil = await res.json();

    if (hasil.sukses) {
      alert("✅ Protokol darurat berhasil dikirim via email");
    } else {
      alert("❌ Gagal mengirim email");
    }
  } catch (err) {
    alert("❌ Server error");
  }
});
