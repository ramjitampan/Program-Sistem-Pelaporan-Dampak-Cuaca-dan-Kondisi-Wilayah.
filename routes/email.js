const express = require("express");
const router = express.Router();
const kirimEmail = require("../utils/emailService");

router.post("/darurat", async (req, res) => {
  try {
    console.log("🔥 PROTOKOL DARURAT DIAKTIFKAN");

    await kirimEmail({
  ke: process.env.EMAIL_DARURAT,
  subjek: "🚨 PROTOKOL DARURAT SIPACU",
  isi: `
    <h2>🚨 PROTOKOL DARURAT AKTIF</h2>
    <p>Sistem SIPACU mendeteksi kondisi darurat.</p>
    <p><b>Waktu:</b> ${new Date().toLocaleString("id-ID")}</p>
    <p>Segera lakukan koordinasi.</p>
  `
});


    res.json({ sukses: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ sukses: false });
  }
});

module.exports = router;
