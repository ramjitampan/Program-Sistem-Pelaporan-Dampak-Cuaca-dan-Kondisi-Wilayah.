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
- [Lisensi](#-lisensi)

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

## ✨ Fitur Utama SIPACU

Halaman utama SIPACU berfungsi sebagai portal pengenalan sistem sekaligus
gerbang masuk menuju dashboard pelaporan dan pemantauan bencana.

Tampilan dirancang dengan pendekatan modern, responsif, dan informatif sehingga
pengguna langsung memahami tujuan sistem serta alur penggunaan sebelum masuk ke dashboard.

---

### 🌍 Halaman Beranda (Landing Page Utama)

<table>
<tr>
<td width="50%">

#### 🖥️ Tampilan Halaman Utama

Halaman ini berfungsi sebagai pengantar sistem dengan menampilkan:

**Informasi yang ditampilkan:**
- Nama sistem & deskripsi fungsi utama
- Penjelasan singkat tujuan platform
- Tombol akses menuju dashboard
- Struktur layout responsif & user–friendly

**Peran halaman:**
- Memberikan gambaran sistem secara ringkas
- Menjadi halaman pembuka sebelum user masuk aplikasi
- Menjadi identitas dan branding sistem SIPACU

</td>
<td width="50%">

<div align="center">

![Landing 1](screenshot/dashbord%20(1).png)
![Landing 2](screenshot/dashbord%20(2).png)
![Landing 3](screenshot/dashbord%20(3).png)

*Halaman beranda SIPACU — halaman portal sebelum masuk dashboard*

</div>

</td>
</tr>

<tr>
<td width="50%">

#### ⚙️ Seksi "Fitur Utama SIPACU"

Bagian ini menjelaskan inti kemampuan sistem secara ringkas agar mudah dipahami pengguna sebelum menggunakan aplikasi.

**Fitur yang diperkenalkan:**
- Pemantauan Real-time kondisi cuaca & wilayah
- Pelaporan cepat berbasis form digital
- Analisis data berbasis laporan masyarakat

**Tujuan section ini:**
- Memberikan edukasi fungsi sistem
- Mengarahkan pengguna ke fitur inti
- Menjadi informasi ringkas non-teknis

</td>
<td width="50%">

<div align="center">

![Section Fitur](screenshot/dashbord%20(2).png)

*Bagian penjelasan fitur utama SIPACU*

</div>

</td>
</tr>

<tr>
<td width="50%">

#### 🔎 Seksi "Bagaimana SIPACU Bekerja?"

Bagian ini menjelaskan alur penggunaan sistem secara bertahap.

**Alur sistem yang ditampilkan:**
1️⃣ Pantau kondisi cuaca & status wilayah  
2️⃣ Laporkan kejadian melalui form pelaporan  
3️⃣ Data dikumpulkan untuk analisis & evaluasi

**Manfaat untuk pengguna:**
- Memudahkan pemahaman alur sistem
- Mengarahkan pengguna ke proses yang benar
- Memberikan gambaran workflow aplikasi

</td>
<td width="50%">

<div align="center">

![How it Works](screenshot/dashbord%20(3).png)

*Visualisasi alur kerja sistem SIPACU*

</div>

</td>
</tr>
</table>

---


### Fitur Admin

<table>
<tr>
<td width="50%">

#### 🔐 Login Administrator
Sistem autentikasi khusus untuk admin dengan keamanan berlapis dan session management.

**Keamanan:**
- Encrypted password
- Two-factor authentication
- Session timeout
- Login attempt limit
- Activity logging

</td>
<td width="50%">

<div align="center">

![Login Admin](screenshots/login_Admin.png)

*Halaman login dengan validasi keamanan*

</div>

</td>
</tr>

<tr>
<td width="50%">

<div align="center">

![Dashboard Admin](screenshots/halamanUtama_admin.png)

*Control panel admin dengan overview sistem*

</div>

</td>
<td width="50%">

#### 🎛️ Dashboard Administrator
Panel kontrol lengkap dengan overview statistik sistem, pending reports, dan quick actions.

**Fitur dashboard:**
- 📊 Total reports overview
- ⚠️ Pending verification alerts
- 👥 Active users count
- 📈 Trend analysis
- 🔔 Real-time notifications
- ⚡ Quick action buttons

</td>
</tr>

<tr>
<td width="50%">

#### ✅ Manajemen Verifikasi
Sistem verifikasi laporan dengan workflow yang terstruktur untuk memastikan validitas data.

**Workflow verifikasi:**
1. Review laporan baru
2. Validasi dokumentasi
3. Cross-check lokasi
4. Approve/reject dengan alasan
5. Notifikasi ke user
6. Archive & analytics

</td>
<td width="50%">

<div align="center">

![Halaman Utama Admin](screenshots/halamanUtama_admin.png)

*Interface verifikasi dengan filter advanced*

</div>

</td>
</tr>

<tr>
<td width="50%">

<div align="center">

![Simulasi Chat](screenshots/SimulasiPesan_AdminToUser_danSebaliknya.png)

*Sistem chat real-time dua arah*

</div>

</td>
<td width="50%">

#### 💬 Komunikasi Real-time
Fitur chat untuk komunikasi langsung antara admin dan user untuk klarifikasi laporan atau follow-up.

**Fitur chat:**
- Real-time messaging
- Read receipts
- Typing indicators
- File attachment
- Message history
- Quick reply templates
- Multi-user support

</td>
</tr>
</table>

---

## 📸 Preview Aplikasi

<div align="center">

### 🖥️ User Interface Journey

```
Landing Page → Dashboard → Ajukan Laporan → Track Status → View Analytics
```

### 🛠️ Admin Panel Workflow

```
Login → Dashboard → Verify Reports → Manage Content → Analytics → User Communication
```

</div>

---

## 🚀 Progress Pengembangan

<div align="center">

| Module | Status | Completion |
|:------:|:------:|:----------:|
| 🎨 **User Interface** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 📝 **Form Pelaporan** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 🗺️ **Integrasi Peta** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 📊 **Dashboard User** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 🔐 **Admin Panel** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 💬 **Chat System** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 📈 **Analytics** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 📰 **News Portal** | ![Complete](https://img.shields.io/badge/status-complete-success) | 100% |
| 🧪 **Testing** | ![In Progress](https://img.shields.io/badge/status-in%20progress-yellow) | 75% |
| 🚀 **Deployment** | ![Planned](https://img.shields.io/badge/status-planned-blue) | 0% |

</div>

---

## 💻 Tech Stack

<div align="center">

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

### Backend
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Libraries & Tools
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

</div>

---

## 👥 Tim Pengembang

<div align="center">

<table>
<tr>
<td align="center" width="50%">
<img src="https://via.placeholder.com/150" width="150" style="border-radius: 50%"/><br>
<b>Ramzy Junfaris</b><br>
<i>Full Stack Developer</i><br><br>
🔹 System Architecture<br>
🔹 Backend Development<br>
🔹 Database Design<br>
🔹 API Integration
</td>
<td align="center" width="50%">
<img src="https://via.placeholder.com/150" width="150" style="border-radius: 50%"/><br>
<b>Tatia</b><br>
<i>Frontend Developer</i><br><br>
🔹 UI/UX Design<br>
🔹 Frontend Development<br>
🔹 Responsive Design<br>
🔹 User Experience
</td>
</tr>
</table>

</div>

---

## 📝 Lisensi

<div align="center">

Proyek ini dikembangkan untuk keperluan akademik - **Praktikum Pemrograman Jaringan**

📚 Universitas | 🎓 Program Studi Teknik Informatika

</div>

---

<div align="center">

### ⭐ SIPACU - Sistem Pelaporan Dampak Cuaca & Kondisi Wilayah ⭐

**Made with ❤️ by Tatia & Ramzy Junfaris**

---

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=sipacu.readme)
![Last Commit](https://img.shields.io/badge/last%20commit-january%202025-brightgreen)
![Platform](https://img.shields.io/badge/platform-web-blue)

[⬆ Kembali ke atas](#sipacu---sistem-pelaporan-dampak-cuaca--kondisi-wilayah)

</div>
