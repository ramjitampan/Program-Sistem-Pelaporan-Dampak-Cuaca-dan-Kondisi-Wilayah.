const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Pengguna = require("../model/Pengguna");

const router = express.Router();

// ======================
// REGISTER
// ======================
router.post("/register", async (req, res) => {
  try {
    const { nama, email, password, peran } = req.body;

    if (!nama || !email || !password || !peran) {
      return res.status(400).json({ pesan: "Data tidak lengkap" });
    }

    const cek = await Pengguna.findOne({ email });
    if (cek) {
      return res.status(400).json({ pesan: "Email sudah terdaftar" });
    }

    const hash = await bcrypt.hash(password, 10);

    await Pengguna.create({
      nama,
      email,
      password: hash,
      peran,
      statusOnline: false
    });

    res.status(201).json({ pesan: "Registrasi berhasil" });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ pesan: "Server error" });
  }
});

// ======================
// LOGIN
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Pengguna.findOne({ email });
    if (!user) {
      return res.status(401).json({ pesan: "Email atau password salah" });
    }

    const cocok = await bcrypt.compare(password, user.password);
    if (!cocok) {
      return res.status(401).json({ pesan: "Email atau password salah" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET belum diset");
    }

    const token = jwt.sign(
      { id: user._id, peran: user.peran },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // UPDATE STATUS ONLINE
    user.statusOnline = true;
    await user.save();

    res.json({
      token,
      peran: user.peran,
      nama: user.nama
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ pesan: "Server error" });
  }
});

module.exports = router;
