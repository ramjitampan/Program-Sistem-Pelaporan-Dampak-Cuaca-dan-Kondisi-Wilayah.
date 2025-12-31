const mongoose = require("mongoose");

const PenggunaSchema = new mongoose.Schema({
  nama: String,
  email: { type: String, unique: true },
  password: String,
  peran: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  statusOnline: {
    type: Boolean,
    default: false
  }
}, {
  collection: "Auth" // ⬅️ INI PENTING BIAR MASUK KE Auth
});

module.exports = mongoose.model("Pengguna", PenggunaSchema);
