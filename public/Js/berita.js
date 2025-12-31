// Data berita dapat
const beritaContoh = [
  {
    id: 1,
    title: "Peringatan Hujan Lebat di Sumatra Barat",
    description: "BMKG mengeluarkan peringatan dini hujan lebat disertai petir dan angin kencang di wilayah Sumatra Barat dalam 24 jam ke depan.",
    category: "peringatan",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "#",
    source: "BMKG"
  },
  {
    id: 2,
    title: "Banjir Rendam Permukiman di Aceh",
    description: "Curah hujan tinggi menyebabkan banjir di beberapa kecamatan di Aceh, ratusan warga mengungsi.",
    category: "bencana",
    date: "2024-03-14",
    image: "https://images.unsplash.com/photo-1589652043056-ba1a2c4830a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "#",
    source: "BNPB"
  },
  {
    id: 3,
    title: "Pola Cuaca Ekstrem Terus Meningkat",
    description: "Peneliti memprediksi peningkatan frekuensi cuaca ekstrem di wilayah Indonesia akibat perubahan iklim.",
    category: "cuaca",
    date: "2024-03-13",
    image: "https://images.unsplash.com/photo-1599045118108-bf9954418b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "#",
    source: "LIPI"
  },
  {
    id: 4,
    title: "Longsor Timbun Jalan di Sumsel",
    description: "Material tanah longsor menutup akses jalan nasional di Sumatera Selatan, perbaikan diperkirakan 3 hari.",
    category: "bencana",
    date: "2024-03-12",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "#",
    source: "Kemenhub"
  },
  {
    id: 5,
    title: "Prakiraan Cuaca Sumatra Hari Ini",
    description: "Cuaca cerah berawan di sebagian besar wilayah Sumatra, waspadai hujan lokal di pesisir barat.",
    category: "cuaca",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "#",
    source: "BMKG"
  },
  {
    id: 6,
    title: "Sistem Peringatan Dini Banjir Diperkuat",
    description: "Pemerintah meningkatkan sistem peringatan dini banjir di 15 daerah rawan di Sumatra.",
    category: "sumatra",
    date: "2024-03-11",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    url: "#",
    source: "Kemen PUPR"
  }
];

let semuaBerita = [];
let kategoriAktif = 'semua';
let halamanSekarang = 1;
const beritaPerHalaman = 6;

// Format tanggal
function formatTanggal(tanggal) {
  const date = new Date(tanggal);
  const options = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('id-ID', options);
}

// Hitung hari yang lalu
function hitungHariLalu(tanggal) {
  const date = new Date(tanggal);
  const sekarang = new Date();
  const selisih = Math.floor((sekarang - date) / (1000 * 60 * 60 * 24));
  return selisih === 0 ? 'Hari ini' : `${selisih} hari lalu`;
}

// Tampilkan berita
function tampilkanBerita(beritaList) {
  const list = document.getElementById('listBerita');
  const noResults = document.getElementById('noResults');
  
  if (!beritaList || beritaList.length === 0) {
    list.classList.add('hidden');
    noResults.classList.remove('hidden');
    document.getElementById('loadMore').classList.add('hidden');
    return;
  }
  
  list.classList.remove('hidden');
  noResults.classList.add('hidden');
  
  // Reset untuk halaman pertama
  if (halamanSekarang === 1) {
    list.innerHTML = '';
  }
  
  // Hitung berita untuk halaman ini
  const mulai = (halamanSekarang - 1) * beritaPerHalaman;
  const beritaHalamanIni = beritaList.slice(mulai, mulai + beritaPerHalaman);
  
  beritaHalamanIni.forEach(b => {
    const warnaKategori = {
      'peringatan': 'bg-red-500',
      'bencana': 'bg-amber-500', 
      'cuaca': 'bg-blue-500',
      'sumatra': 'bg-green-500'
    };
    
    const iconKategori = {
      'peringatan': 'fa-bullhorn',
      'bencana': 'fa-exclamation-triangle',
      'cuaca': 'fa-cloud-sun-rain',
      'sumatra': 'fa-map-marker-alt'
    };
    
    const warnaBadge = warnaKategori[b.category] || 'bg-slate-600';
    const iconBadge = iconKategori[b.category] || 'fa-newspaper';
    
    const card = document.createElement('div');
    card.className = 'berita-card bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden card-hover';
    card.innerHTML = `
      <!-- Gambar -->
      <div class="relative overflow-hidden">
        <img src="${b.image}" 
             alt="${b.title}"
             class="w-full berita-img">
        <div class="absolute top-3 left-3 ${warnaBadge} text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <i class="fas ${iconBadge}"></i>
          <span>${b.category.charAt(0).toUpperCase() + b.category.slice(1)}</span>
        </div>
        <div class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
          ${formatTanggal(b.date)}
        </div>
      </div>
      
      <!-- Konten -->
      <div class="p-5">
        <!-- Judul -->
        <h3 class="font-bold text-lg mb-3 line-clamp-2" style="min-height: 56px;">
          ${b.title}
        </h3>
        
        <!-- Deskripsi -->
        <p class="text-slate-400 text-sm mb-4 line-clamp-3" style="min-height: 60px;">
          ${b.description}
        </p>
        
        <!-- Footer -->
        <div class="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
          <div class="text-xs text-slate-500">
            <i class="fas fa-source mr-1"></i>
            Sumber: ${b.source}
          </div>
          <a href="${b.url}" target="_blank"
            class="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-700 hover:to-blue-800 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
            <span>Baca</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
    `;
    
    list.appendChild(card);
  });
  
  // Tampilkan tombol load more jika masih ada berita
  const totalTampil = halamanSekarang * beritaPerHalaman;
  if (totalTampil < beritaList.length) {
    document.getElementById('loadMore').classList.remove('hidden');
  } else {
    document.getElementById('loadMore').classList.add('hidden');
  }
}

// Filter berita
function filterBerita(kategori) {
  kategoriAktif = kategori;
  halamanSekarang = 1;
  
  let beritaFilter;
  if (kategori === 'semua') {
    beritaFilter = semuaBerita;
  } else {
    beritaFilter = semuaBerita.filter(b => b.category === kategori);
  }
  
  // Update statistik
  document.getElementById('totalBerita').textContent = beritaFilter.length;
  document.getElementById('totalPeringatan').textContent = semuaBerita.filter(b => b.category === 'peringatan').length;
  document.getElementById('totalCuaca').textContent = semuaBerita.filter(b => b.category === 'cuaca').length;
  
  // Cari berita terbaru untuk "latestUpdate"
  if (beritaFilter.length > 0) {
    const dates = beritaFilter.map(b => new Date(b.date));
    const latest = new Date(Math.max(...dates));
    const daysAgo = hitungHariLalu(latest);
    document.getElementById('latestUpdate').textContent = daysAgo.includes('Hari') ? '0' : daysAgo.split(' ')[0];
  }
  
  tampilkanBerita(beritaFilter);
}

// Load more berita
document.getElementById('loadMore').addEventListener('click', () => {
  halamanSekarang++;
  
  let beritaFilter;
  if (kategoriAktif === 'semua') {
    beritaFilter = semuaBerita;
  } else {
    beritaFilter = semuaBerita.filter(b => b.category === kategoriAktif);
  }
  
  tampilkanBerita(beritaFilter);
});

// Pencarian
document.getElementById('searchBerita').addEventListener('input', (e) => {
  const keyword = e.target.value.toLowerCase();
  
  let beritaFilter;
  if (kategoriAktif === 'semua') {
    beritaFilter = semuaBerita;
  } else {
    beritaFilter = semuaBerita.filter(b => b.category === kategoriAktif);
  }
  
  if (keyword) {
    beritaFilter = beritaFilter.filter(b => 
      b.title.toLowerCase().includes(keyword) || 
      b.description.toLowerCase().includes(keyword) ||
      b.source.toLowerCase().includes(keyword)
    );
  }
  
  halamanSekarang = 1;
  tampilkanBerita(beritaFilter);
});

// Inisialisasi
async function muatBerita() {
  try {
    // Untuk demo, gunakan data contoh
    // Untuk produksi, ganti dengan: const response = await fetch("/api/berita");
    // const data = await response.json();
    
    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    semuaBerita = beritaContoh;
    
    // Update statistik
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB';
    
    // Tampilkan semua berita
    filterBerita('semua');
    
  } catch (error) {
    console.error('Gagal memuat berita:', error);
    document.getElementById('listBerita').innerHTML = `
      <div class="col-span-3 text-center py-12">
        <div class="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-exclamation-triangle text-2xl text-red-400"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-300 mb-2">Gagal Memuat Berita</h3>
        <p class="text-slate-500">Terjadi kesalahan saat mengambil data berita. Silakan coba lagi.</p>
        <button onclick="muatBerita()" class="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg">
          <i class="fas fa-redo mr-2"></i>Coba Lagi
        </button>
      </div>
    `;
  }
}

// Muat berita saat halaman dimuat
document.addEventListener('DOMContentLoaded', muatBerita);