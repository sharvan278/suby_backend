const Firm = require('../models/Firm');
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addProduct = async(req, res)=>{
const {productName,price,category,bestseller,description} = req.body;
const image = req.file? req.file.filename: undefined;
const firmId = req.params.fid;
const firm = await Firm.findById(firmId);
const product = new Product({
    productName,
    price,
    category,
    image,bestseller,description,firm:firm._id
})
const savedProduct = await product.save();
firm.product.push(savedProduct);
await firm.save();
return res.json({message: 'Product added successfully', product: savedProduct});
}

const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.fid;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }
        const rname = firm.firmName;
        const products = await Product.find({ firm: firmId });

        res.status(200).json({rname,products});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteProduct = async(req,res)=>{
    const productId = req.params.pid;
    const product = await Product.findById(productId);
    if(!product){
        return res.status(404).json({error: "Product not found"});
        }
        await product.remove();
        return res.json({message: "Product deleted successfully"});  
}

module.exports = {addProduct : [upload.single('image'),addProduct],getProductByFirm,deleteProduct};