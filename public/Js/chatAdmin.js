document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⛔ Token belum ada, socket tidak dijalankan");
    return;
  }

  const socket = io({
    auth: { token }
  });

  socket.on("connect", () => {
    console.log("🟢 SOCKET CONNECTED");
  });

  socket.on("connect_error", (err) => {
    console.error("❌ SOCKET ERROR:", err.message);
  });

  // simpan socket ke global kalau perlu
  window.socket = socket;
});
