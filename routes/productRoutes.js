const productController = require('../controllers/productController');
const express = require('express');

const router = express.Router();
router.post('/add-product/:fid', productController.addProduct);
router.get('/:fid/products', productController.getProductByFirm);
router.delete('/:pid',productController.deleteProduct);
module.exports = router;