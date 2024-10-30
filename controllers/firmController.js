const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async(req, res)=>{
const {firmName, area, category, region, offer} = req.body;
const image = req.file? req.file.filename: undefined;
const vendor = await Vendor.findById(req.vendorId);
const firm = new Firm({
    firmName,
    area,
    category,
    region,offer,image,vendor:vendor._id
})
const savedFirm = await firm.save();
vendor.firm.push(savedFirm);
await vendor.save();
return res.json({message: 'Firm added successfully', firm: firm});
}

const deleteFirm = async(req,res)=>{
    const firmId = req.params.fid;
    const firm = await Firm.findById(firmId);
    if(!firm){
        return res.status(404).json({error: "Firm not found"});
        }
        await firm.remove();
        return res.json({message: "Firm deleted successfully"});
        
}

module.exports = {addFirm : [upload.single('image'),addFirm],deleteFirm};