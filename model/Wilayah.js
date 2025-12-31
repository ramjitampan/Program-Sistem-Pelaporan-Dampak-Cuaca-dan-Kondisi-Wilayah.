const mongoose = require('mongoose');

const WilayahSchema = new mongoose.Schema({
    nama: String,
    provinsi: String
});

module.exports = mongoose.model('Wilayah', WilayahSchema);
