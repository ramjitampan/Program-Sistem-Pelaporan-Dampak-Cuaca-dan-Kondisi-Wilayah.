# SIPACU - Sistem Pelaporan Dampak Cuaca & Kondisi Wilayah

<div align="center">

![SIPACU Logo](assets/placeholder-dashboard.png)

**Sistem Pelaporan Berbasis Web untuk Monitoring Dampak Cuaca dan Kondisi Wilayah**

[![Status](https://img.shields.io/badge/status-in%20development-yellow)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Tujuan Sistem](#-tujuan-sistem)
- [Fitur Utama](#-fitur-utama)
  - [Fitur User](#fitur-user)
  - [Fitur Admin](#fitur-admin)
- [Preview Aplikasi](#-preview-aplikasi)
- [Tim Pengembang](#-tim-pengembang)

---

## 🎯 Tentang Proyek

**SIPACU** (Sistem Pelaporan Dampak Cuaca & Kondisi Wilayah) adalah aplikasi berbasis web yang dirancang untuk memfasilitasi masyarakat dalam melaporkan dampak cuaca dan kondisi wilayah secara terstruktur. Sistem ini juga menyediakan informasi kesiapsiagaan bencana yang dapat diakses oleh seluruh pengguna.

Proyek ini dikembangkan sebagai bagian dari praktikum **Pemrograman Jaringan** dengan fokus pada:
- 🔄 Integrasi sistem pelaporan real-time
- 📊 Pengelolaan dan analisis data berbasis web
- 🎨 User interface yang responsif dan mudah digunakan

> **Catatan Penting:** Modul statistik menggunakan perhitungan manual berbasis data laporan, **tanpa menggunakan AI**, untuk menghasilkan analisis yang terukur dan relevan dengan kebutuhan praktikum.

---

## 🎯 Tujuan Sistem

| No | Tujuan | Deskripsi |
|:--:|--------|-----------|
| 1 | **Kemudahan Pelaporan** | Mempermudah masyarakat melaporkan kejadian terkait dampak cuaca dengan interface yang user-friendly |
| 2 | **Edukasi & Informasi** | Menyediakan informasi edukasi dan peringatan dini terkait bencana alam dan cuaca ekstrem |
| 3 | **Validasi Data** | Mendukung proses validasi dan verifikasi laporan oleh admin untuk memastikan akurasi informasi |
| 4 | **Monitoring Wilayah** | Menyajikan statistik dan rekap pelaporan sebagai bahan monitoring kondisi wilayah secara berkala |

---

## ✨ Fitur Utama

### Fitur User

<table>
<tr>
<th width="5%">No</th>
<th width="25%">Fitur</th>
<th width="50%">Deskripsi</th>
<th width="20%">Screenshot</th>
</tr>

<tr>
<td align="center">1</td>
<td><strong>Dashboard Informasi</strong></td>
<td>
Menampilkan ringkasan kondisi cuaca, lokasi pemantauan, tingkat risiko wilayah, serta informasi kesiapsiagaan yang relevan
</td>
<td align="center">
<img src="assets/dashboard-user.png" alt="Dashboard" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">2</td>
<td><strong>Edukasi Bencana</strong></td>
<td>
Materi edukasi komprehensif terkait:
<ul>
<li>Dampak bencana alam</li>
<li>Langkah pencegahan</li>
<li>Kesiapsiagaan masyarakat</li>
</ul>
</td>
<td align="center">
<img src="assets/edukasi.png" alt="Edukasi" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">3</td>
<td><strong>Ajukan Laporan</strong></td>
<td>
Form pelaporan yang mencakup:
<ul>
<li>Jenis kejadian</li>
<li>Lokasi kejadian</li>
<li>Deskripsi dampak</li>
<li>Upload dokumentasi (opsional)</li>
</ul>
</td>
<td align="center">
<img src="assets/form-laporan.png" alt="Form Laporan" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">4</td>
<td><strong>Statistik Laporan</strong></td>
<td>
Rekap laporan personal dengan status:
<ul>
<li>⏳ Pending</li>
<li>✅ Diverifikasi</li>
<li>❌ Ditolak</li>
</ul>
</td>
<td align="center">
<img src="assets/statistik-user.png" alt="Statistik User" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">5</td>
<td><strong>Berita & Informasi</strong></td>
<td>
Update terkini mengenai:
<ul>
<li>Kondisi cuaca</li>
<li>Isu lingkungan</li>
<li>Informasi kebencanaan</li>
</ul>
</td>
<td align="center">
<img src="assets/berita.png" alt="Berita" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">6</td>
<td><strong>Chat Admin</strong></td>
<td>
Fitur komunikasi untuk:
<ul>
<li>Klarifikasi laporan</li>
<li>Tindak lanjut kejadian</li>
<li>Konsultasi dan informasi</li>
</ul>
</td>
<td align="center">
<img src="assets/chat.png" alt="Chat" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

</table>

---

### Fitur Admin

<table>
<tr>
<th width="5%">No</th>
<th width="25%">Fitur</th>
<th width="50%">Deskripsi</th>
<th width="20%">Screenshot</th>
</tr>

<tr>
<td align="center">1</td>
<td><strong>Manajemen Laporan</strong></td>
<td>
Admin dapat melakukan:
<ul>
<li>Verifikasi laporan masuk</li>
<li>Update status tindak lanjut</li>
<li>Validasi keaslian data dan dokumentasi</li>
<li>Penolakan laporan dengan alasan</li>
</ul>
</td>
<td align="center">
<img src="assets/admin-laporan.png" alt="Admin Laporan" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">2</td>
<td><strong>Manajemen Konten</strong></td>
<td>
Pengelolaan konten informasi:
<ul>
<li>Publikasi berita terbaru</li>
<li>Update materi edukasi</li>
<li>Pengumuman penting</li>
<li>Peringatan dini</li>
</ul>
</td>
<td align="center">
<img src="assets/admin-konten.png" alt="Admin Konten" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

<tr>
<td align="center">3</td>
<td><strong>Statistik & Analisis</strong></td>
<td>
Dashboard analitik dengan filter:
<ul>
<li>📍 Berdasarkan lokasi</li>
<li>🔖 Jenis kejadian</li>
<li>📅 Rentang waktu</li>
<li>📊 Grafik dan visualisasi data</li>
</ul>
<br/>
<em>Tanpa AI - agregasi data manual</em>
</td>
<td align="center">
<img src="assets/admin-statistik.png" alt="Admin Statistik" width="150"/><br/>
<em>Akan ditambahkan</em>
</td>
</tr>

</table>

---

## 📸 Preview Aplikasi

### User Interface

| Halaman | Preview |
|---------|---------|
| **Landing Page** | ![Landing](assets/landing.png)<br/>*Akan ditambahkan* |
| **Dashboard User** | ![Dashboard](assets/dashboard-user.png)<br/>*Akan ditambahkan* |
| **Form Pelaporan** | ![Form](assets/form-laporan.png)<br/>*Akan ditambahkan* |

### Admin Panel

| Halaman | Preview |
|---------|---------|
| **Dashboard Admin** | ![Admin Dashboard](assets/admin-dashboard.png)<br/>*Akan ditambahkan* |
| **Verifikasi Laporan** | ![Verifikasi](assets/admin-verifikasi.png)<br/>*Akan ditambahkan* |
| **Analisis Data** | ![Analisis](assets/admin-analisis.png)<br/>*Akan ditambahkan* |

### Checklist Progres

- [x] ✅ Modul User - Dashboard & Edukasi
- [x] ✅ Modul User - Pengajuan Laporan
- [x] ✅ Modul User - Statistik Personal
- [x] ✅ Panel Admin Dasar
- [ ] ⏳ Dokumentasi Screenshot
- [ ] ⏳ Finalisasi Statistik Presentasi
- [ ] ⏳ Testing & Bug Fixing
- [ ] ⏳ Deployment Production

---

## 👥 Tim Pengembang

<table>
<tr>
<td align="center">
<img src="assets/avatar-1.png" width="100px;" alt="Developer 1"/><br />
<sub><b>Ramzy Junfaris</b></sub><br />
<sub>Full Stack Developer</sub>
</td>
<td align="center">
<img src="assets/avatar-2.png" width="100px;" alt="Desainger"/><br />
<sub><b>Tatia</b></sub><br />
<sub>Frontend Developer</sub>
</td>
</table>

---

## 📝 Lisensi

Proyek ini dikembangkan untuk keperluan akademik - Praktikum Pemrograman Jaringan.

---

<div align="center">

**SIPACU** - Sistem Pelaporan Dampak Cuaca & Kondisi Wilayah

Made with Tatia and ramzy Junfaris 

[⬆ Kembali ke atas](#sipacu---sistem-pelaporan-dampak-cuaca--kondisi-wilayah)

</div>
