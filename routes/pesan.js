const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Pengguna = require("../model/Pengguna");
const Pesan = require("../model/Pesan");

// ===============================
// ADMIN: AMBIL USER YANG PERNAH CHAT
// ===============================
router.get("/user-list", authMiddleware, async (req, res) => {
  try {
    const adminId = req.user.id;

    const daftarUser = await Pesan.aggregate([
      {
        $match: {
          $or: [
            { pengirim: adminId },
            { penerima: adminId }
          ]
        }
      },
      {
        $project: {
          lawanChat: {
            $cond: [
              { $eq: ["$pengirim", adminId] },
              "$penerima",
              "$pengirim"
            ]
          },
          isi: 1,
          createdAt: 1
        }
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$lawanChat",
          pesanTerakhir: { $first: "$isi" },
          waktu: { $first: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "penggunas",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          nama: "$user.nama",
          email: "$user.email",
          statusOnline: "$user.statusOnline",
          pesanTerakhir: 1,
          waktu: 1
        }
      }
    ]);

    res.json(daftarUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ pesan: "Gagal ambil user" });
  }
});


// routes/pesan.js
router.get("/admin-list", authMiddleware, async (req, res) => {
  try {
    const admins = await Pengguna.find(
      { peran: "admin" }, // ⬅️ JANGAN FILTER ONLINE DULU
      { password: 0 }
    );

    res.json(admins);
  } catch (err) {
    res.status(500).json({ pesan: "Gagal ambil admin" });
  }
});


router.get("/riwayat/:userId", authMiddleware, async (req, res) => {
  const adminId = req.user.id;
  const userId = req.params.userId;

  const pesan = await Pesan.find({
    $or: [
      { pengirim: adminId, penerima: userId },
      { pengirim: userId, penerima: adminId }
    ]
  }).sort({ createdAt: 1 });

  res.json(pesan);
});

module.exports = router;
