function generateInsightText(kategori, wilayah, total, deskripsiSample = "") {

  const capitalize = text =>
    text?.toLowerCase()
      .replace(/_/g, " ")
      .split(" ")
      .map(t => t.charAt(0).toUpperCase() + t.slice(1))
      .join(" ");

  const format = num => new Intl.NumberFormat("id-ID").format(num);


  /*
  ======================================================
     NLP SEDERHANA — DETEKSI KATEGORI OTOMATIS
  ======================================================
  */
  const detectKategoriFromText = (text = "") => {

    text = text.toLowerCase();

    if (/makan|sembako|logistik|pangan|bantuan/.test(text))
      return "pangan";

    if (/air|kering|haus|pdam|sumur/.test(text))
      return "air";

    if (/jalan|akses|evakuasi|tertutup|runtuh|puing/.test(text))
      return "jalan";

    if (/banjir|genangan|air naik|terendam/.test(text))
      return "banjir";

    if (/angin|kencang|roboh|atap|hancur/.test(text))
      return "kerusakan";

    return "umum";
  };


  // Jika kategori kosong → AI tentukan otomatis
  if (!kategori || kategori === "undefined" || kategori === "-") {
    kategori = detectKategoriFromText(deskripsiSample);
  }


  /*
  ======================================================
            TEMPLATE ANALISIS KONTEKSTUAL
  ======================================================
  */

  const templates = {

    pangan: `Prioritas distribusi logistik pangan diperlukan di ${capitalize(wilayah)}.
${format(total)} laporan masyarakat menyebut kekurangan makanan & paket bantuan.`,

    air: `Gangguan akses air bersih terindikasi di ${capitalize(wilayah)}.
${format(total)} laporan warga melaporkan kebutuhan suplai air.`,

    jalan: `Akses jalan menuju pemukiman terhambat di ${capitalize(wilayah)}.
${format(total)} laporan menunjukkan hambatan evakuasi & mobilitas warga.`,

    banjir: `Risiko banjir meningkat di ${capitalize(wilayah)}.
${format(total)} laporan menunjukkan area permukiman terdampak genangan.`,

    kerusakan: `Kerusakan infrastruktur dilaporkan di ${capitalize(wilayah)}.
${format(total)} laporan menyebut bangunan & fasilitas umum terdampak.`,

    umum: `Evaluasi lanjutan diperlukan di ${capitalize(wilayah)}.
${format(total)} laporan masyarakat terekam.`
  };


  let narasi = templates[kategori] || templates.umum;


  /*
  ======================================================
        ANALISIS KONTEKS TAMBAHAN (BERBASIS TEKS)
  ======================================================
  */

  const text = deskripsiSample.toLowerCase();

  if (text.includes("belum menerima paket"))
    narasi += `\nSebagian warga melaporkan distribusi bantuan belum merata.`;

  if (text.includes("puing") || text.includes("rusak"))
    narasi += `\nWarga melaporkan area sekitar dipenuhi material reruntuhan.`;

  if (text.includes("jalan") || text.includes("akses"))
    narasi += `\nHambatan akses berpotensi mengganggu proses evakuasi.`;


  return narasi;
}

module.exports = {
  generateInsightText
};
