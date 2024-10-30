const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const express = require('express');

const router = express.Router();
router.post('/add-firm',verifyToken, firmController.addFirm);
// router.post('/login', vendorController.vendorLogin);
router.delete('/:fid',firmController.deleteFirm);

module.exports = router;