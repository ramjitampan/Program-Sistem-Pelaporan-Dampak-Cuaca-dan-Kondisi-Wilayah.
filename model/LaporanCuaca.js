const mongoose = require('mongoose');

const LaporanCuacaSchema = new mongoose.Schema({
  wilayah: String,
  jenisBencana: String,
  tingkatDampak: String,
  deskripsi: String,
  waktu: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "pending" // ⬅️ INI PENTING
  }
}, {
  collection: "laporancuacas" // ⬅️ WAJIB SAMA
});

module.exports = mongoose.model("LaporanCuaca", LaporanCuacaSchema);
