document.addEventListener("DOMContentLoaded", () => {

  const socket = io();

  // ==========================
  // PETA
  // ==========================
  const peta = L.map("petaSumatra").setView([-0.5, 101], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  minZoom: 5
}).addTo(peta);

  setTimeout(() => {
  peta.invalidateSize();
}, 300);

window.addEventListener("resize", () => {
  peta.invalidateSize();
});

  // ==========================
  // CLUSTER
  // ==========================
  const grupMarker = L.markerClusterGroup();
  peta.addLayer(grupMarker);

  // ==========================
  // COUNTER
  // ==========================
  const statistik = {
    total: 0,
    banjir: 0,
    hujan: 0,
    hujan_lebat: 0,
    longsor: 0,
    angin: 0
  };

  // ==========================
  // LOAD DATA AWAL
  // ==========================
  fetch("/api/kejadian")
    .then(res => res.json())
    .then(data => {
      data.forEach(tambahkanKejadian);
      perbaruiStatistik();
    });

  // ==========================
  // REALTIME
  // ==========================
  socket.on("kejadian_baru", (data) => {
    tambahkanKejadian(data);
    perbaruiStatistik();
  });

  // ==========================
  // TAMBAH MARKER
  // ==========================
  function tambahkanKejadian(k) {

    statistik.total++;
    statistik[k.jenisBencana]++;

    const ikon = L.divIcon({
      html: getIkon(k.jenisBencana),
      className: "text-2xl"
    });

    const marker = L.marker(
      [k.latitude, k.longitude],
      { icon: ikon }
    ).bindPopup(`
      <b>${k.namaLokasi}</b><br>
      ${k.keterangan}<br>
      <small>${k.jenisBencana}</small>
    `);

    grupMarker.addLayer(marker);
  }

  // ==========================
  // UPDATE ANGKA
  // ==========================
  function perbaruiStatistik() {
    document.getElementById("totalKejadian").innerText = statistik.total;
    document.getElementById("totalBanjir").innerText = statistik.banjir;
    document.getElementById("totalHujan").innerText = statistik.hujan;
    document.getElementById("totalHujanLebat").innerText = statistik.hujan_lebat;
    document.getElementById("totalLongsor").innerText = statistik.longsor;
    document.getElementById("totalAngin").innerText = statistik.angin;
  }

  // ==========================
  // IKON
  // ==========================
  function getIkon(jenis) {
    if (jenis === "banjir") return "🌊";
    if (jenis === "longsor") return "🪨";
    if (jenis === "angin") return "🌪️";
    if (jenis === "hujan_lebat") return "⛈️";
    return "🌧️";
  }

});
