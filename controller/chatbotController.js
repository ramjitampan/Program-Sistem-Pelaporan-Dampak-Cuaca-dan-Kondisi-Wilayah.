// Logika ChatBot user biasa
function prosesPesanChatbot(pesan) {
    pesan = pesan.toLowerCase();

    if (pesan.includes('banjir')) {
        return 'Waspada banjir. Hindari daerah rendah dan segera lapor jika terdampak.';
    }

    if (pesan.includes('cuaca')) {
        return 'Silakan sebutkan wilayah untuk informasi peringatan cuaca.';
    }

    if (pesan.includes('lapor')) {
        return 'Gunakan menu Lapor Dampak Cuaca untuk mengirim laporan.';
    }

    return 'Maaf, saya belum memahami pesan Anda.';
}

module.exports = { prosesPesanChatbot };
