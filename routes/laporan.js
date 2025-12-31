const express = require('express');
const router = express.Router();
const LaporanCuaca = require('../model/LaporanCuaca');

// GET semua laporan
router.get("/", async (req, res) => {
  try {
    const data = await LaporanCuaca.find().sort({ waktu: -1 });
    res.json(data);
  } 
  catch (err) {
    res.status(500).json({ pesan: "Gagal memuat data" });
  }
});


// UPDATE STATUS LAPORAN
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    // status yang diizinkan
    const allowed = ["pending", "verified", "rejected"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ pesan: "Status tidak valid" });
    }

    await LaporanCuaca.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ pesan: "Status diperbarui", status });
  } 
  catch (err) {
    res.status(500).json({ pesan: "Gagal update status" });
  }
});

// POST laporan baru
router.post("/", async (req, res) => {
  try {
    const laporanBaru = new LaporanCuaca({
      wilayah: req.body.wilayah,
      jenisBencana: req.body.jenisBencana,
      tingkatDampak: req.body.tingkatDampak,
      deskripsi: req.body.deskripsi,
      status: "pending"
    });

    await laporanBaru.save();

    console.log("🟢 LAPORAN MASUK:", req.body);

    res.status(201).json({
      pesan: "Laporan tersimpan",
      data: laporanBaru
    });
  } 
  catch (err) {
    console.error("❌ Gagal simpan laporan:", err);
    res.status(500).json({ pesan: "Gagal simpan", error: err });
  }
});


module.exports = router;
