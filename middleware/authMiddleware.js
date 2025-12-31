const jwt = require("jsonwebtoken");
const Pengguna = require("../model/Pengguna");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ Tidak ada header
    if (!authHeader) {
      return res.status(401).json({ pesan: "Token tidak ada" });
    }

    // ❌ Format salah
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ pesan: "Format token salah" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ pesan: "Token kosong" });
    }

    // 🔓 Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Cari user
    const user = await Pengguna.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ pesan: "User tidak ditemukan" });
    }

    // ✅ Inject user ke request
    req.user = {
      id: user._id.toString(),
      peran: user.peran,
      nama: user.nama
    };

    next();
  } catch (err) {
    console.error("AuthMiddleware Error:", err.message);
    return res.status(401).json({ pesan: "Token tidak valid" });
  }
};
