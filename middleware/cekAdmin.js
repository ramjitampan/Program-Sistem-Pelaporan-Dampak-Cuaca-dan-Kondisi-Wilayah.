// middleware/cekAdmin.js
module.exports = function cekAdmin(req, res, next) {
    const sandi = req.headers['x-sandi-admin'];

    if (sandi !== process.env.SANDI_ADMIN) {
        return res.status(403).json({ pesan: 'Akses admin ditolak' });
    }

    next();
};
