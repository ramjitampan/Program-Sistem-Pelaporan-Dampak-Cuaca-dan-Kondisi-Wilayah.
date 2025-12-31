document.addEventListener("DOMContentLoaded", () => {

  const socket = io();

  // ==========================
  // INISIALISASI PETA
  // ==========================
  const peta = L.map("petaAdmin").setView([-0.5, 101], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(peta);

  let markerAktif = null;

  // ==========================
  // KLIK PETA → PASANG MARKER
  // ==========================
  peta.on("click", (e) => {
    pasangMarker(e.latlng.lat, e.latlng.lng);
  });

  function pasangMarker(lat, lng) {
    if (markerAktif) peta.removeLayer(markerAktif);
    markerAktif = L.marker([lat, lng]).addTo(peta);
    peta.setView([lat, lng], 12);
  }

  // ==========================
  // CARI LOKASI (OSM NOMINATIM)
  // ==========================
  window.cariLokasi = function () {
    const lokasi = document.getElementById("inputLokasi").value;
    if (!lokasi) {
      alert("Isi nama lokasi dulu");
      return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${lokasi}`)
      .then(res => res.json())
      .then(data => {
        if (!data.length) {
          alert("Lokasi tidak ditemukan");
          return;
        }

        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        pasangMarker(lat, lon);
      })
      .catch(() => alert("Gagal mencari lokasi"));
  };

  // ==========================
  // HAPUS MARKER
  // ==========================
  window.hapusMarker = function () {
    if (markerAktif) {
      peta.removeLayer(markerAktif);
      markerAktif = null;
    }
  };

  // ==========================
  // SIMPAN KEJADIAN
  // ==========================
  window.simpanKejadian = function () {
    if (!markerAktif) {
      alert("Tentukan lokasi dulu");
      return;
    }

    const data = {
      namaLokasi: document.getElementById("inputLokasi").value,
      jenisBencana: document.getElementById("jenisBencana").value,
      keterangan: document.getElementById("keterangan").value,
      latitude: markerAktif.getLatLng().lat,
      longitude: markerAktif.getLatLng().lng
    };

    fetch("/api/kejadian", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    socket.emit("kejadian_baru", data);

    alert("Kejadian berhasil dikirim");
  };

});
