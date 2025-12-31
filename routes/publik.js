const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ sistem: 'SIPACU aktif' });
});

module.exports = router;
