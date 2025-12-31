const jwt = require("jsonwebtoken");
const kirimEmail = require("../utils/emailService");

module.exports = function (io) {

  io.on("connection", (socket) => {

    console.log("🟢 SOCKET TERHUBUNG:", socket.id);

    // =====================================================
    // ======================== CHAT =======================
    // =====================================================
    socket.on("kirim_pesan", (data) => {

      const pesan = {
        dari: data.dari || "Pengguna",
        isi: data.isi,
        waktu: new Date()
      };

      io.emit("pesan_masuk", pesan);
      console.log("💬 PESAN:", pesan);
    });

    // =====================================================
    // ===================== MAP REALTIME ==================
    // =====================================================
    socket.on("kejadian_baru", (data) => {

      console.log("📍 KEJADIAN BARU:", data);

      // broadcast ke semua client (admin & user)
      io.emit("kejadian_baru", data);
    });

    // =====================================================
    // ================ PROTOKOL DARURAT ===================
    // =====================================================
    socket.on("protokol_darurat", async (data) => {

      console.log("🚨 PROTOKOL DARURAT:", data);

      try {

        await kirimEmail({
          ke: "ramjijunfaris28@gmail.com",
          subjek: "🚨 PROTOKOL DARURAT SIPACU",
          isi: `
            <h2>🚨 PROTOKOL DARURAT DIAKTIFKAN</h2>
            <p><b>Lokasi:</b> ${data.lokasi}</p>
            <p><b>Level:</b> ${data.level}</p>
            <p><b>Pesan:</b> ${data.pesan}</p>
            <hr>
            <small>Dikirim otomatis oleh sistem SIPACU</small>
          `
        });

        socket.emit("darurat_status", { sukses: true });

      } catch (err) {

        console.log("❌ GAGAL KIRIM EMAIL:", err);

        socket.emit("darurat_status", { sukses: false });
      }
    });

    // =====================================================
    // ===================== DISCONNECT ====================
    // =====================================================
    socket.on("disconnect", () => {
      console.log("🔴 SOCKET PUTUS:", socket.id);
    });

  });

};
