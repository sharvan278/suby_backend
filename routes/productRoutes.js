const productController = require('../controllers/productController');
const express = require('express');

const router = express.Router();
router.post('/add-product/:fid', productController.addProduct);
router.get('/:fid/products', productController.getProductByFirm);
router.delete('/:pid',productController.deleteProduct);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'../uploads',imageName));

});
module.exports = router;