const LaporanCuaca = require('../model/LaporanCuaca');

exports.getStatistikAdmin = async (req, res) => {
  try {
    const total = await LaporanCuaca.countDocuments();
    const menunggu = await LaporanCuaca.countDocuments({ status: 'pending' });
    const terverifikasi = await LaporanCuaca.countDocuments({ status: 'verified' });

    res.json({
      total,
      menunggu,
      terverifikasi,
      peringatan: 0
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
