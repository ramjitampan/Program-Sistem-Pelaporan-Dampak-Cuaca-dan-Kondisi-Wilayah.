const mongoose = require("mongoose");

const pesanSchema = new mongoose.Schema({
  pengirim: { type: mongoose.Schema.Types.ObjectId, ref: "Pengguna" },
  penerima: { type: mongoose.Schema.Types.ObjectId, ref: "Pengguna" },
  isi: String,
  dibaca: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Pesan", pesanSchema);
