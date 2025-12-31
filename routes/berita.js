const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: "banjir OR hujan OR longsor OR cuaca OR gempa OR Indonesia OR Sumatra",
          language: "id",
          pageSize: 6,
          sortBy: "publishedAt",
          apiKey: "81b1050bc4e94d8c8876ae57136320da"
        }
      }
    );

    res.json(response.data.articles || []);
  } catch (err) {
    console.error("❌ ERROR BERITA:", err.message);
    res.status(500).json({ pesan: "Gagal memuat berita" });
  }
});

module.exports = router;
