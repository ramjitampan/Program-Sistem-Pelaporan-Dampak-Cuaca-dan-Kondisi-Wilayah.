const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/statistik', adminController.getStatistikAdmin);

module.exports = router;
