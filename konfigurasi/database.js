// konfigurasi/database.js
const mongoose = require('mongoose');

// Fungsi koneksi ke MongoDB
module.exports = async function koneksiDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database MongoDB terhubung');
    } catch (error) {
        console.error('Gagal koneksi database:', error.message);
        process.exit(1);
    }
};

