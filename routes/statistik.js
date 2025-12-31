const express = require("express");
const router = express.Router();
const Laporan = require("../model/LaporanCuaca");
const { generateInsightText } = require("../utils/statistik");

/*
====================================
   TREN LAPORAN MINGGUAN (GRAFIK)
====================================
*/
router.get("/tren-mingguan", async (req, res) => {
  try {

    const data = await Laporan.aggregate([
      {
        $addFields: {
          waktuWIB: {
            $dateAdd: {
              startDate: "$waktu",
              unit: "hour",
              amount: 7   // convert UTC ➜ WIB
            }
          }
        }
      },
      {
        $group: {
          _id: {
            hari: { $dayOfWeek: "$waktuWIB" }
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id.hari": 1 } }
    ]);

    res.json({
      status: "ok",
      range: "7_hari_terakhir",
      timezone: "WIB",
      data
    });

  } catch (err) {
    console.error("Tren Mingguan Error:", err);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data tren mingguan"
    });
  }
});

/*
====================================
      INSIGHT NARATIF AI (VERSI ANALITIS)
====================================
*/
router.get("/insight-naratif", async (req, res) => {
  try {

    const data = await Laporan.aggregate([

      // 7 hari terakhir
      {
        $match: {
          waktu: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      },

      // grup berdasarkan wilayah
      {
        $group: {
          _id: {
            provinsi: "$provinsi",
            wilayah: "$wilayah",
            kategori: "$kategori"
          },

          total: { $sum: 1 },

          sampleDeskripsi: { $first: "$deskripsi" }
        }
      },

      { $sort: { total: -1 } },
      { $limit: 6 }
    ]);


    const insight = data.map(item => {

      const wilayah =
        item._id.provinsi ||
        item._id.wilayah ||
        "tidak diketahui";

      const kategori =
        item._id.kategori ||
        "-";

      const deskripsi =
        item.sampleDeskripsi || "";


      return {
        wilayah,
        kategori,
        total: item.total,

        narasi: generateInsightText(
          kategori,
          wilayah,
          item.total,
          deskripsi
        ),

        contohDeskripsi: deskripsi // debugging — tidak ditampilkan ke user
      };
    });


    res.json({
      status: "ok",
      insight
    });

  } catch (err) {

    res.status(500).json({
      status: "error",
      message: "Gagal mengambil insight naratif"
    });
  }
});
module.exports = router;