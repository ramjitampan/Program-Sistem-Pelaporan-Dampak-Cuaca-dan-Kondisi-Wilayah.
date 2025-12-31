// JavaScript
// ===================== GLOBAL VARIABLES =====================
const socket = io();
let dataCache = [];
let laporanAktif = null;
let jumlahKritisTerakhir = 0;

// ===================== LOAD STATISTIK UTAMA =====================
async function loadStatistik() {
    try {
        const res = await fetch("/api/admin/statistik");
        const data = await res.json();

        // Update kartu statistik
        document.getElementById('totalDiterima').innerText = data.total || 0;
        document.getElementById('menungguVerifikasi').innerText = data.menunggu || 0;
        document.getElementById('terverifikasi').innerText = data.terverifikasi || 0;
        
        // Hitung dan update peringatan waspada
        await hitungPeringatanWaspada();
        
    } catch (error) {
        console.error('Error loading statistics:', error);
        showNotification('Gagal memuat statistik', 'error');
    }
}

// ===================== HITUNG PERINGATAN WASPADA =====================
async function hitungPeringatanWaspada() {
    try {
        // Filter laporan dengan tingkat kritis
        const laporanKritis = dataCache.filter(l => {
            const tingkat = (l.tingkatDampak || '').toLowerCase();
            const kataKunciKritis = ['kritis', 'critical', 'tinggi', 'high', 'darurat'];
            return kataKunciKritis.some(kata => tingkat.includes(kata));
        });
        
        const jumlahKritis = laporanKritis.length;
        
        // Update kartu peringatan
        const peringatanCard = document.querySelector('.kartu-peringatan');
        const peringatanIndikator = document.getElementById('peringatanIndikator');
        const iconPeringatan = document.getElementById('iconPeringatan');
        const trendCount = document.getElementById('trendCount');
        const peringatanTrend = document.getElementById('peringatanTrend');
        const peringatanDetail = document.getElementById('peringatanDetail');
        const peringatanBreakdown = document.getElementById('peringatanBreakdown');
        
        // Update angka
        document.getElementById('peringatanAktif').innerText = jumlahKritis;
        document.getElementById('peringatanSatuan').innerText = jumlahKritis === 1 ? 'Status' : 'Status';
        
        if (jumlahKritis > 0) {
            // Ada laporan kritis - aktifkan animasi
            peringatanCard.style.animation = 'pulse-glow 2s infinite';
            peringatanIndikator.classList.add('animate-pulse');
            iconPeringatan.classList.add('animate-pulse');
            
            // Tampilkan trend jika ada peningkatan
            if (jumlahKritis > jumlahKritisTerakhir) {
                trendCount.innerText = jumlahKritis - jumlahKritisTerakhir;
                peringatanTrend.classList.remove('hidden');
            } else {
                peringatanTrend.classList.add('hidden');
            }
            
            // Update detail
            peringatanDetail.innerHTML = `
                <span class="text-red-300 font-semibold">${jumlahKritis} laporan kritis aktif</span>
            `;
            
            // Tampilkan breakdown detail
            peringatanBreakdown.innerHTML = '';
            
            // Kelompokkan berdasarkan jenis bencana
            const kelompok = {};
            laporanKritis.forEach(l => {
                const jenis = l.jenisBencana || 'Tidak diketahui';
                kelompok[jenis] = (kelompok[jenis] || 0) + 1;
            });
            
            // Tambahkan ke breakdown
            Object.entries(kelompok).forEach(([jenis, count]) => {
                peringatanBreakdown.innerHTML += `
                    <div class="flex justify-between items-center">
                        <span class="truncate">${jenis}</span>
                        <span class="font-bold ml-2">${count}</span>
                    </div>
                `;
            });
            
            peringatanBreakdown.classList.remove('hidden');
            
        } else {
            // Tidak ada laporan kritis - nonaktifkan animasi
            peringatanCard.style.animation = 'none';
            peringatanIndikator.classList.remove('animate-pulse');
            iconPeringatan.classList.remove('animate-pulse');
            peringatanTrend.classList.add('hidden');
            peringatanDetail.innerHTML = 'Status Respon Penting';
            peringatanBreakdown.classList.add('hidden');
        }
        
        // Simpan jumlah kritis untuk perbandingan
        jumlahKritisTerakhir = jumlahKritis;
        
    } catch (error) {
        console.error('Error menghitung peringatan:', error);
    }
}

// ===================== MUAT DATA LAPORAN =====================
async function muatLaporan() {
    try {
        // Tampilkan loading
        const loadingEl = document.getElementById('loadingLaporan');
        const tbody = document.getElementById('tabelLaporan');
        
        loadingEl.classList.remove('hidden');
        tbody.innerHTML = '';
        
        // Ambil data dari API
        const res = await fetch('/api/laporan');
        dataCache = await res.json();
        
        // Sembunyikan loading
        loadingEl.classList.add('hidden');
        
        // Tampilkan data
        dataCache.forEach(l => {
            // Tentukan warna badge berdasarkan tingkat
            let tingkatWarna, tingkatText;
            const tingkat = (l.tingkatDampak || '').toLowerCase();
            
            if (tingkat.includes('kritis') || tingkat.includes('critical') || tingkat.includes('tinggi')) {
                tingkatWarna = 'bg-red-500/20 text-red-400';
                tingkatText = 'Kritis';
            } else if (tingkat.includes('sedang') || tingkat.includes('moderate')) {
                tingkatWarna = 'bg-orange-500/20 text-orange-400';
                tingkatText = 'Sedang';
            } else {
                tingkatWarna = 'bg-yellow-500/20 text-yellow-400';
                tingkatText = 'Rendah';
            }
            
            // Tentukan warna badge berdasarkan status
            let statusWarna, statusText;
            const status = (l.status || '').toLowerCase();
            
            if (status === 'verified' || status === 'terverifikasi') {
                statusWarna = 'bg-green-500/20 text-green-400';
                statusText = 'Terverifikasi';
            } else if (status === 'rejected' || status === 'ditolak') {
                statusWarna = 'bg-red-500/20 text-red-400';
                statusText = 'Ditolak';
            } else {
                statusWarna = 'bg-yellow-500/20 text-yellow-400';
                statusText = 'Menunggu';
            }
            
            // Format waktu
            const waktu = new Date(l.waktu);
            const waktuFormatted = waktu.toLocaleDateString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Tambahkan baris ke tabel
            tbody.innerHTML += `
                <tr class="hover:bg-slate-700/20 transition">
                    <td class="px-6 py-4 font-medium">
                        ${l.jenisBencana || '-'}
                    </td>
                    <td class="px-6 py-4 text-slate-300">
                        ${l.wilayah || '-'}
                    </td>
                    <td class="px-6 py-4 text-slate-400 text-sm">
                        ${waktuFormatted}
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-xs ${tingkatWarna}">
                            ${tingkatText}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-xs ${statusWarna}">
                            ${statusText}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <button onclick="bukaDetail('${l._id}')" 
                                class="text-sky-400 hover:text-sky-300 transition hover:scale-110">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        // Hitung ulang peringatan
        await hitungPeringatanWaspada();
        
    } catch (error) {
        console.error('Error loading reports:', error);
        showNotification('Gagal memuat laporan', 'error');
    }
}

// ===================== MODAL DETAIL LAPORAN =====================
function bukaDetail(id) {
    laporanAktif = dataCache.find(x => x._id === id);
    
    if (!laporanAktif) {
        showNotification('Data laporan tidak ditemukan', 'error');
        return;
    }

    // Isi data ke modal
    document.getElementById("detailId").innerText = laporanAktif._id?.substring(0, 8) || '-';
    document.getElementById("detailJenis").innerText = laporanAktif.jenisBencana || '-';
    document.getElementById("detailWilayah").innerText = laporanAktif.wilayah || '-';
    
    // Tingkat dampak
    const tingkat = laporanAktif.tingkatDampak || 'rendah';
    document.getElementById("detailTingkat").innerText = tingkat;
    
    // Warna untuk tingkat dampak
    let tingkatWarna, tingkatText;
    if (tingkat.toLowerCase().includes('kritis') || tingkat.toLowerCase().includes('tinggi')) {
        tingkatWarna = 'bg-red-500/20 text-red-400';
        tingkatText = 'Kritis';
    } else if (tingkat.toLowerCase().includes('sedang')) {
        tingkatWarna = 'bg-orange-500/20 text-orange-400';
        tingkatText = 'Sedang';
    } else {
        tingkatWarna = 'bg-yellow-500/20 text-yellow-400';
        tingkatText = 'Rendah';
    }
    
    document.getElementById("detailTingkatBadge").className = `px-3 py-1 rounded-full text-xs ${tingkatWarna}`;
    document.getElementById("detailTingkatBadge").innerText = tingkatText;
    
    // Waktu laporan
    const waktu = new Date(laporanAktif.waktu);
    document.getElementById("detailWaktu").innerText = 
        waktu.toLocaleDateString('id-ID', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    
    // Hitung durasi
    const now = new Date();
    const diffMs = now - waktu;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    let durasiText = '';
    if (diffDays > 0) {
        durasiText = `${diffDays} hari yang lalu`;
    } else if (diffHours > 0) {
        durasiText = `${diffHours} jam yang lalu`;
    } else if (diffMins > 0) {
        durasiText = `${diffMins} menit yang lalu`;
    } else {
        durasiText = 'Baru saja';
    }
    document.getElementById("detailDurasi").innerText = durasiText;
    
    // Deskripsi
    const deskripsi = laporanAktif.deskripsi || laporanAktif.catatan || 
                      laporanAktif.detail || laporanAktif.keterangan || 
                      '(tidak ada deskripsi)';
    document.getElementById("detailDeskripsi").innerText = deskripsi;
    document.getElementById("detailPanjangKarakter").innerText = 
        `${deskripsi.length} karakter`;
    
    // Status
    const statusBadge = document.getElementById("detailStatus");
    const status = laporanAktif.status || 'pending';
    let statusText, statusColor;
    
    if (status === 'verified' || status === 'terverifikasi') {
        statusText = 'Terverifikasi';
        statusColor = 'bg-green-500/20 text-green-400 border border-green-500/30';
    } else if (status === 'rejected' || status === 'ditolak') {
        statusText = 'Ditolak';
        statusColor = 'bg-red-500/20 text-red-400 border border-red-500/30';
    } else {
        statusText = 'Menunggu';
        statusColor = 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    }
    
    statusBadge.className = `px-4 py-2 rounded-lg text-sm font-medium ${statusColor}`;
    statusBadge.innerText = statusText;

    // Tampilkan modal
    document.getElementById("modalDetail").classList.remove("hidden");
}

// ===================== UPDATE STATUS LAPORAN =====================
async function updateStatus(status) {
    if (!laporanAktif || !laporanAktif._id) {
        showNotification('Data laporan tidak valid', 'error');
        return;
    }

    const statusText = {
        'pending': 'Pending',
        'verified': 'Terverifikasi',
        'rejected': 'Ditolak'
    }[status];

    if (!confirm(`Ubah status laporan menjadi "${statusText}"?`)) {
        return;
    }

    try {
        const res = await fetch(`/api/laporan/${laporanAktif._id}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (res.ok) {
            // Close modal
            document.getElementById("modalDetail").classList.add("hidden");
            
            // Reload data
            await Promise.all([muatLaporan(), loadStatistik()]);
            
            // Show success notification
            showNotification(`Status berhasil diubah menjadi "${statusText}"`, 'success');
        } else {
            throw new Error('Gagal mengubah status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        showNotification('Gagal mengubah status', 'error');
    }
}


// ===================== FUNGSI BANTU =====================
function salinDeskripsi() {
    const deskripsi = document.getElementById("detailDeskripsi").innerText;
    navigator.clipboard.writeText(deskripsi).then(() => {
        showNotification("Deskripsi berhasil disalin ke clipboard!", "success");
    });
}

function lihatSemuaLaporan() {
    showNotification("Membuka halaman semua laporan...", "info");
    // Arahkan ke halaman laporan lengkap
    window.location.href = "/semua-laporan";
}

async function muatAktivitas() {
    try {
        const res = await fetch("/api/aktivitas");
        const aktivitas = await res.json();
        
        const container = document.getElementById("aktivitasTerkini");
        container.innerHTML = '';
        
        // Ambil 3 aktivitas terbaru
        aktivitas.slice(0, 3).forEach(aktif => {
            let iconColor, icon;
            if (aktif.type === 'verifikasi') {
                iconColor = 'bg-green-400';
                icon = 'fa-check-circle';
            } else if (aktif.type === 'laporan') {
                iconColor = 'bg-blue-400';
                icon = 'fa-file-import';
            } else if (aktif.type === 'chat') {
                iconColor = 'bg-yellow-400';
                icon = 'fa-comment';
            } else {
                iconColor = 'bg-slate-400';
                icon = 'fa-info-circle';
            }
            
            const waktu = new Date(aktif.time);
            const waktuText = waktu.toLocaleTimeString('id-ID', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            container.innerHTML += `
                <div class="flex gap-3">
                    <div class="w-2 h-2 ${iconColor} rounded-full mt-2"></div>
                    <div class="flex-1">
                        <p class="text-sm font-medium">${aktif.message}</p>
                        <p class="text-xs text-slate-400">${aktif.detail} - ${waktuText}</p>
                    </div>
                </div>
            `;
        });
        
    } catch (error) {
        console.error('Error loading activities:', error);
    }
}

function tambahAktivitas(aktivitas) {
    const container = document.getElementById("aktivitasTerkini");
    const now = new Date();
    
    let iconColor, icon;
    if (aktivitas.type === 'verifikasi' || aktivitas.type === 'verified') {
        iconColor = 'bg-green-400';
        icon = 'fa-check-circle';
    } else if (aktivitas.type === 'laporan' || aktivitas.type === 'report') {
        iconColor = 'bg-blue-400';
        icon = 'fa-file-import';
    } else if (aktivitas.type === 'darurat' || aktivitas.type === 'emergency') {
        iconColor = 'bg-red-400';
        icon = 'fa-exclamation-triangle';
    } else {
        iconColor = 'bg-slate-400';
        icon = 'fa-info-circle';
    }
    
    const waktuText = now.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const aktivitasHTML = `
        <div class="flex gap-3 animate-slide-in">
            <div class="w-2 h-2 ${iconColor} rounded-full mt-2"></div>
            <div class="flex-1">
                <p class="text-sm font-medium">${aktivitas.message}</p>
                <p class="text-xs text-slate-400">${aktivitas.detail || ''} - ${waktuText}</p>
            </div>
        </div>
    `;
    
    // Tambahkan di atas
    container.innerHTML = aktivitasHTML + container.innerHTML;
    
    // Hapus jika terlalu banyak
    const items = container.querySelectorAll('.flex.gap-3');
    if (items.length > 5) {
        items[items.length - 1].remove();
    }
}

// ===================== NOTIFICATION SYSTEM =====================
function showNotification(message, type = 'info') {
    // Hapus notifikasi sebelumnya
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300 animate-slide-in ${
        type === 'success' ? 'bg-green-600' :
        type === 'error' ? 'bg-red-600' :
        type === 'warning' ? 'bg-yellow-600' :
        'bg-blue-600'
    }`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${
                type === 'success' ? 'check-circle' : 
                type === 'error' ? 'exclamation-circle' : 
                type === 'warning' ? 'exclamation-triangle' : 
                'info-circle'
            }"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Hapus setelah 3 detik
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===================== EVENT LISTENERS =====================
document.getElementById("tutupModal").onclick = () => 
    document.getElementById("modalDetail").classList.add("hidden");

document.getElementById("btnPending").onclick = () => updateStatus("pending");
document.getElementById("btnVerifikasi").onclick = () => updateStatus("verified");
document.getElementById("btnTolak").onclick = () => updateStatus("rejected");

// ===================== SOCKET.IO REALTIME =====================
socket.on("laporan_baru", (data) => {
    showNotification(`📢 Laporan baru diterima: ${data.jenisBencana || 'Bencana'}`, "info");
    muatLaporan();
    loadStatistik();
    
    // Tambah aktivitas
    tambahAktivitas({
        type: 'laporan',
        message: 'Laporan baru masuk',
        detail: `${data.jenisBencana || 'Bencana'} di ${data.wilayah || 'lokasi tidak diketahui'}`,
        time: new Date()
    });
});

socket.on("status_update", (data) => {
    showNotification(`🔄 Status laporan diperbarui`, "info");
    muatLaporan();
    loadStatistik();
    
    // Tambah aktivitas
    tambahAktivitas({
        type: 'verifikasi',
        message: 'Status laporan diubah',
        detail: `Laporan ${data.jenisBencana} menjadi ${data.status}`,
        time: new Date()
    });
});

// ===================== PENCARIAN =====================
const searchInput = document.querySelector('input[placeholder="Cari laporan..."]');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('#tabelLaporan tr');
        let found = false;
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
                found = true;
            } else {
                row.style.display = 'none';
            }
        });
        
        // Tampilkan pesan jika tidak ditemukan
        const noResults = document.getElementById('noResults');
        if (!noResults && !found && searchTerm.length > 0) {
            const tbody = document.getElementById('tabelLaporan');
            const noResultsEl = document.createElement('tr');
            noResultsEl.id = 'noResults';
            noResultsEl.innerHTML = `
                <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                    <i class="fas fa-search text-2xl mb-2"></i>
                    <p>Tidak ditemukan laporan dengan kata kunci "${searchTerm}"</p>
                </td>
            `;
            tbody.appendChild(noResultsEl);
        } else if (noResults && (found || searchTerm.length === 0)) {
            noResults.remove();
        }
    });
}

// ===================== INITIAL LOAD =====================
document.addEventListener('DOMContentLoaded', () => {
    // Muat semua data
    muatLaporan();
    loadStatistik();
    muatAktivitas();
    
    // Auto-refresh setiap 30 detik
    setInterval(() => {
        muatLaporan();
        loadStatistik();
    }, 30000);
    
    // Tampilkan welcome message
    setTimeout(() => {
        showNotification("Selamat datang di SIPACU Admin Dashboard!", "info");
    }, 1000);
});

// ===================== KEYBOARD SHORTCUTS =====================
document.addEventListener('keydown', (e) => {
    // ESC untuk tutup modal
    if (e.key === 'Escape' && !document.getElementById('modalDetail').classList.contains('hidden')) {
        document.getElementById('modalDetail').classList.add('hidden');
    }
    
    // Ctrl + F untuk fokus pencarian
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInput?.focus();
    }
    
    // F5 untuk refresh data
    if (e.key === 'F5') {
        e.preventDefault();
        muatLaporan();
        loadStatistik();
        showNotification("Data diperbarui", "info");
    }
});