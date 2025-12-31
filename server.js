// server.js
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

// ROUTES
const ruteLaporan = require("./routes/laporan");
const ruteAdmin = require("./routes/admin");
const rutePesan = require("./routes/pesan");
const rutePublik = require("./routes/publik");
const ruteAuth = require("./routes/auth");
const ruteStatistik = require("./routes/statistik");

// SOCKET
const initSocket = require("./konfigurasi/socket");

// DB
const koneksiDatabase = require("./konfigurasi/database");

// APP
const app = express();
const server = http.createServer(app);

//protocol email
const ruteEmail = require("./routes/email");
app.use("/api/email", ruteEmail);

// =====================
// SOCKET.IO (SATU KALI SAJA)
// =====================
const io = new Server(server, {
  cors: { origin: "*" }
});

// INISIALISASI SOCKET
initSocket(io);

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// DATABASE
// =====================
koneksiDatabase();

// =====================
// API ROUTES
// =====================
app.use("/api/laporan", ruteLaporan);
app.use("/api/admin", ruteAdmin);
app.use("/api/chat", rutePesan);
app.use("/api", rutePublik);
app.use("/api/auth", ruteAuth);
app.use("/api/statistik", ruteStatistik);

app.use("/api/berita", require("./routes/berita"));

// =====================
// STATIC FILES
// =====================
app.use(express.static("public"));

// =====================
// HALAMAN USER
// =====================
app.get("/Dashbord_user", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/dashboard.html"));
});

app.get("/ajuan", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/ajuan.html"));
});

app.get("/Pesan_denganAdmin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/chat_dengan_admin.html"));
});

app.get("/MapSumatra", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/map_sumatra.html"));
});

app.get("/Berita", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/berita.html"));
});

app.get("/Statistik", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/Statistik.html"));
});

// =====================
// HALAMAN ADMIN
// =====================
app.get("/Dashbord_admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Admin/dashboard.html"));
});

app.get("/PesanUser", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Admin/chat_dengan_User.html"));
});

app.get("/PetaAdmin", (req, res) => {
  res.sendFile(path.join(__dirname, "public/Admin/mapKejadian.html"));
});

// =====================
// AUTH
// =====================
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/auth/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public/auth/register.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/User/rumah_halaman.html"));
});

// =====================
// START SERVER (SATU KALI)
// =====================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ SIPACU berjalan di port ${PORT}`);
});
