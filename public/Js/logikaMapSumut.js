
// Script utama untuk peta
    // Inisialisasi variabel global untuk peta
    let petaSumatra = null;
    let batasSumatra = null;
    let markerCluster = null;
    
    // Koordinat batas wilayah Sumatra (approximate bounding box)
    const BATAS_SUMATRA = {
      utara: 6.5,    // Latitude maksimum (utara)
      selatan: -6.0, // Latitude minimum (selatan)
      barat: 95.0,   // Longitude minimum (barat)
      timur: 106.0   // Longitude maksimum (timur)
    };

    // Titik tengah Sumatra untuk inisialisasi peta
    const PUSAT_SUMATRA = [0.5, 100.5];
    
    // Inisialisasi JavaScript ketika DOM siap
    document.addEventListener('DOMContentLoaded', function() {
      // Deklarasi variabel UI
      const tombolLegenda = document.getElementById('tombolLegenda');
      const panelLegenda = document.getElementById('panelLegenda');
      const tombolTutupLegenda = document.getElementById('tombolTutupLegenda');
      const indikatorLoading = document.getElementById('indikatorLoading');
      const statusKoneksi = document.getElementById('statusKoneksi');
      const tombolResetZoom = document.getElementById('tombolResetZoom');
      const tombolLokasiSaya = document.getElementById('tombolLokasiSaya');
      const tombolZoomIn = document.getElementById('tombolZoomIn');
      const tombolZoomOut = document.getElementById('tombolZoomOut');
      const levelZoom = document.getElementById('levelZoom');
      const displayKoordinat = document.getElementById('displayKoordinat');
      
      // Fungsi untuk inisialisasi peta Sumatra
      function inisialisasiPeta() {
        console.log('Menginisialisasi peta Sumatra...');
        
        // Buat peta dengan fokus ke Sumatra
        petaSumatra = L.map('petaSumatra', {
          center: PUSAT_SUMATRA,
          zoom: 7,
          minZoom: 6,  // Batas zoom minimum
          maxZoom: 12, // Batas zoom maksimum
          maxBounds: [  // Batas wilayah peta
            [BATAS_SUMATRA.selatan, BATAS_SUMATRA.barat], // Barat daya
            [BATAS_SUMATRA.utara, BATAS_SUMATRA.timur]     // Timur laut
          ],
          maxBoundsViscosity: 1.0 // Mencegah peta keluar dari bounds
        });
        
        // Tambahkan tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(petaSumatra);
        
        // Inisialisasi marker cluster
        markerCluster = L.markerClusterGroup({
          maxClusterRadius: 50,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
          zoomToBoundsOnClick: true
        });
        
        // Tambahkan event listener untuk pergerakan peta
        petaSumatra.on('move', function() {
          perbaruiLevelZoom();
          perbaruiKoordinatTengah();
        });
        
        petaSumatra.on('zoom', function() {
          perbaruiLevelZoom();
        });
        
        petaSumatra.on('click', function(e) {
          tampilkanKoordinatDiklik(e.latlng);
        });
        
        // Tambahkan marker cluster ke peta
        petaSumatra.addLayer(markerCluster);
        
        // Tambahkan kontrol skala
        L.control.scale({imperial: false}).addTo(petaSumatra);
        
        console.log('Peta Sumatra berhasil diinisialisasi');
        
        // Sembunyikan loading setelah peta siap
        setTimeout(() => {
          sembunyikanLoading();
          // Tampilkan contoh marker (ini nanti diganti dengan data real)
          tambahkanContohMarker();
        }, 1500);
      }
      
      // Fungsi untuk menambahkan contoh marker (untuk testing)
      function tambahkanContohMarker() {
        // Contoh lokasi di berbagai provinsi Sumatra
        const contohLokasi = [
          {nama: "Banjir di Aceh", lat: 5.5480, lng: 95.3195, jenis: "banjir"},
          {nama: "Hujan Lebat di Medan", lat: 3.5952, lng: 98.6722, jenis: "hujan_lebat"},
          {nama: "Longsor di Bukittinggi", lat: -0.3056, lng: 100.3692, jenis: "longsor"},
          {nama: "Angin Kencang di Palembang", lat: -2.9761, lng: 104.7759, jenis: "angin"},
          {nama: "Banjir di Jambi", lat: -1.6101, lng: 103.6071, jenis: "banjir"},
          {nama: "Hujan di Padang", lat: -0.9471, lng: 100.4172, jenis: "hujan"},
          {nama: "Posko Bantuan di Pekanbaru", lat: 0.5071, lng: 101.4478, jenis: "posko"},
          {nama: "Rumah Sakit di Bengkulu", lat: -3.7956, lng: 102.2592, jenis: "rs"},
        ];
        
        contohLokasi.forEach(lokasi => {
          let warnaMarker;
          let ikonMarker;
          
          // Tentukan warna dan ikon berdasarkan jenis
          switch(lokasi.jenis) {
            case 'banjir':
              warnaMarker = 'red';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-water text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
            case 'hujan':
              warnaMarker = 'blue';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-cloud-rain text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
            case 'hujan_lebat':
              warnaMarker = 'purple';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-cloud-showers-heavy text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
            case 'longsor':
              warnaMarker = 'yellow';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-mountain text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
            case 'angin':
              warnaMarker = 'cyan';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-wind text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
            case 'posko':
              warnaMarker = 'green';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-first-aid text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
            case 'rs':
              warnaMarker = 'orange';
              ikonMarker = L.divIcon({
                html: `<div class="w-6 h-6 bg-${warnaMarker}-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-hospital text-white text-xs"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              });
              break;
          }
          
          const marker = L.marker([lokasi.lat, lokasi.lng], {icon: ikonMarker});
          
          // Tambahkan popup informasi
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${lokasi.nama}</h3>
              <p class="text-sm">Jenis: ${lokasi.jenis.replace('_', ' ').toUpperCase()}</p>
              <p class="text-xs text-gray-600">Lat: ${lokasi.lat.toFixed(4)}, Lng: ${lokasi.lng.toFixed(4)}</p>
              <div class="mt-2">
                <button class="bg-blue-500 text-white px-3 py-1 rounded text-xs">Detail</button>
              </div>
            </div>
          `);
          
          markerCluster.addLayer(marker);
        });
        
        console.log('Contoh marker berhasil ditambahkan');
      }
      
      // Fungsi untuk memperbarui level zoom yang ditampilkan
      function perbaruiLevelZoom() {
        if (petaSumatra && levelZoom) {
          levelZoom.textContent = petaSumatra.getZoom();
        }
      }
      
      // Fungsi untuk memperbarui koordinat tengah peta
      function perbaruiKoordinatTengah() {
        if (petaSumatra && displayKoordinat) {
          const tengah = petaSumatra.getCenter();
          document.getElementById('latDisplay').textContent = tengah.lat.toFixed(4);
          document.getElementById('lngDisplay').textContent = tengah.lng.toFixed(4);
          
          // Tampilkan display koordinat
          displayKoordinat.classList.remove('hidden');
        }
      }
      
      // Fungsi untuk menampilkan koordinat ketika peta diklik
      function tampilkanKoordinatDiklik(latlng) {
        alert(`Koordinat yang diklik:\nLatitude: ${latlng.lat.toFixed(4)}\nLongitude: ${latlng.lng.toFixed(4)}`);
      }
      
      // Fungsi untuk reset zoom ke tampilan penuh Sumatra
      function resetZoomKeSumatra() {
        if (petaSumatra) {
          petaSumatra.setView(PUSAT_SUMATRA, 7);
          console.log('Zoom direset ke tampilan Sumatra');
        }
      }
      
      // Fungsi untuk menampilkan lokasi pengguna
      function tampilkanLokasiSaya() {
        if (!navigator.geolocation) {
          alert("Geolocation tidak didukung oleh browser Anda");
          return;
        }
        
        // Tampilkan indikator loading
        const loadingLokasi = document.createElement('div');
        loadingLokasi.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        loadingLokasi.innerHTML = `
          <div class="bg-slate-800 p-6 rounded-xl text-center">
            <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div class="font-medium">Mencari lokasi Anda...</div>
          </div>
        `;
        document.body.appendChild(loadingLokasi);
        
        navigator.geolocation.getCurrentPosition(
          function(position) {
            // Hapus loading
            document.body.removeChild(loadingLokasi);
            
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // Cek apakah lokasi berada dalam batas Sumatra
            if (lat >= BATAS_SUMATRA.selatan && lat <= BATAS_SUMATRA.utara && 
                lng >= BATAS_SUMATRA.barat && lng <= BATAS_SUMATRA.timur) {
              
              // Zoom ke lokasi pengguna
              petaSumatra.setView([lat, lng], 10);
              
              // Tambahkan marker untuk lokasi pengguna
              const ikonLokasiSaya = L.divIcon({
                html: `<div class="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              });
              
              const markerLokasiSaya = L.marker([lat, lng], {icon: ikonLokasiSaya})
                .bindPopup(`<b>Lokasi Anda</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`)
                .addTo(petaSumatra);
              
              // Buka popup secara otomatis
              markerLokasiSaya.openPopup();
              
              console.log(`Lokasi pengguna ditemukan: ${lat}, ${lng}`);
            } else {
              alert("Lokasi Anda berada di luar wilayah Sumatra. Tetap ditampilkan di peta.");
              
              // Tetap tampilkan lokasi meski di luar Sumatra
              petaSumatra.setView([lat, lng], 10);
              
              // Tambahkan marker dengan peringatan
              const ikonLokasiSaya = L.divIcon({
                html: `<div class="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <i class="fas fa-exclamation text-white"></i>
                      </div>`,
                className: 'custom-div-icon',
                iconSize: [32, 32],
                iconAnchor: [16, 16]
              });
              
              const markerLokasiSaya = L.marker([lat, lng], {icon: ikonLokasiSaya})
                .bindPopup(`<b>Lokasi Anda (DI LUAR SUMATRA)</b><br>Lat: ${lat.toFixed(4)}<br>Lng: ${lng.toFixed(4)}`)
                .addTo(petaSumatra);
              
              markerLokasiSaya.openPopup();
            }
          },
          function(error) {
            // Hapus loading
            document.body.removeChild(loadingLokasi);
            
            switch(error.code) {
              case error.PERMISSION_DENIED:
                alert("Akses lokasi ditolak. Izinkan akses lokasi di pengaturan browser.");
                break;
              case error.POSITION_UNAVAILABLE:
                alert("Informasi lokasi tidak tersedia.");
                break;
              case error.TIMEOUT:
                alert("Permintaan lokasi timeout.");
                break;
              default:
                alert("Error tidak diketahui saat mengambil lokasi.");
                break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      }
      
      // Fungsi untuk toggle panel legenda
      if (tombolLegenda && panelLegenda) {
        tombolLegenda.addEventListener('click', function() {
          panelLegenda.classList.toggle('hidden');
          
          // Ganti ikon chevron berdasarkan status
          const ikon = this.querySelector('.fa-chevron-down');
          if (ikon) {
            if (panelLegenda.classList.contains('hidden')) {
              ikon.classList.remove('fa-chevron-up');
              ikon.classList.add('fa-chevron-down');
            } else {
              ikon.classList.remove('fa-chevron-down');
              ikon.classList.add('fa-chevron-up');
            }
          }
        });
      }
      
      // Fungsi untuk menutup panel legenda
      if (tombolTutupLegenda) {
        tombolTutupLegenda.addEventListener('click', function() {
          panelLegenda.classList.add('hidden');
          
          // Reset ikon chevron
          const ikon = tombolLegenda.querySelector('.fa-chevron-up, .fa-chevron-down');
          if (ikon) {
            ikon.classList.remove('fa-chevron-up');
            ikon.classList.add('fa-chevron-down');
          }
        });
      }
      
      // Event listener untuk tombol reset zoom
      if (tombolResetZoom) {
        tombolResetZoom.addEventListener('click', resetZoomKeSumatra);
      }
      
      // Event listener untuk tombol lokasi saya
      if (tombolLokasiSaya) {
        tombolLokasiSaya.addEventListener('click', tampilkanLokasiSaya);
      }
      
      // Event listener untuk tombol zoom in/out di panel legenda
      if (tombolZoomIn) {
        tombolZoomIn.addEventListener('click', function() {
          if (petaSumatra) {
            petaSumatra.zoomIn();
          }
        });
      }
      
      if (tombolZoomOut) {
        tombolZoomOut.addEventListener('click', function() {
          if (petaSumatra) {
            petaSumatra.zoomOut();
          }
        });
      }
      
      // Fungsi untuk menampilkan status koneksi
      function tampilkanStatusKoneksi(terhubung) {
        if (statusKoneksi) {
          if (terhubung) {
            statusKoneksi.classList.remove('hidden');
            statusKoneksi.classList.remove('from-red-900', 'to-rose-900');
            statusKoneksi.classList.add('from-green-900', 'to-emerald-900');
            statusKoneksi.querySelector('.font-medium').textContent = 'Terhubung ke server';
          } else {
            statusKoneksi.classList.remove('hidden');
            statusKoneksi.classList.remove('from-green-900', 'to-emerald-900');
            statusKoneksi.classList.add('from-red-900', 'to-rose-900');
            statusKoneksi.querySelector('.font-medium').textContent = 'Koneksi terputus';
          }
        }
      }
      
      // Fungsi untuk menyembunyikan indikator loading
      function sembunyikanLoading() {
        if (indikatorLoading) {
          indikatorLoading.classList.add('hidden');
        }
      }
      
      // Fungsi untuk memperbarui statistik
      function perbaruiStatistik(data) {
        // Contoh data statistik
        document.getElementById('totalKejadian').textContent = data.total || 0;
        document.getElementById('totalBanjir').textContent = data.banjir || 0;
        document.getElementById('totalHujan').textContent = data.hujan || 0;
        document.getElementById('totalHujanLebat').textContent = data.hujanLebat || 0;
        document.getElementById('totalLongsor').textContent = data.longsor || 0;
        document.getElementById('totalAngin').textContent = data.angin || 0;
        
        // Perbarui waktu update
        const waktuUpdate = document.getElementById('waktuUpdate');
        if (waktuUpdate) {
          const sekarang = new Date();
          waktuUpdate.textContent = `Diperbarui: ${sekarang.toLocaleTimeString('id-ID')}`;
        }
      }
      
      // Inisialisasi WebSocket
      let socket = null;
      
      function koneksiKeWebSocket() {
        try {
          // Koneksi ke server WebSocket
          socket = io();
          
          // Event listener untuk koneksi berhasil
          socket.on('connect', function() {
            console.log('Terhubung ke server WebSocket');
            tampilkanStatusKoneksi(true);
          });
          
          // Event listener untuk koneksi terputus
          socket.on('disconnect', function() {
            console.log('Koneksi terputus dari server');
            tampilkanStatusKoneksi(false);
          });
          
          // Event listener untuk data real-time
          socket.on('dataBaru', function(data) {
            console.log('Data baru diterima:', data);
            // Panggil fungsi untuk memproses data
            prosesDataRealTime(data);
          });
          
          // Event listener untuk data statistik
          socket.on('statistikUpdate', function(statistik) {
            console.log('Statistik diperbarui:', statistik);
            perbaruiStatistik(statistik);
          });
          
        } catch (error) {
          console.error('Error koneksi WebSocket:', error);
          tampilkanStatusKoneksi(false);
        }
      }
      
      // Fungsi untuk memproses data real-time
      function prosesDataRealTime(data) {
        // Implementasi pemrosesan data
        console.log('Memproses data real-time:', data);
        
        // TODO: Tambahkan marker berdasarkan data real-time
        // tambahkanMarkerBerdasarkanData(data);
      }
      
      // Mulai inisialisasi
      inisialisasiPeta();
      koneksiKeWebSocket();
      
      // Ekspos fungsi ke global scope untuk digunakan di file lain
      window.PetaSumatra = {
        peta: petaSumatra,
        markerCluster: markerCluster,
        resetZoomKeSumatra: resetZoomKeSumatra,
        tampilkanLokasiSaya: tampilkanLokasiSaya,
        perbaruiStatistik: perbaruiStatistik,
        prosesDataRealTime: prosesDataRealTime
      };
    });