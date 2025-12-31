const LaporanCuaca = require('../model/LaporanCuaca');

exports.ambilSemua = async (req, res) => {
  try {
    const data = await LaporanCuaca.find().sort({ waktu: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.tambahLaporan = async (req, res) => {
  try {
    const laporan = new LaporanCuaca(req.body);
    await laporan.save();
    res.status(201).json(laporan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
