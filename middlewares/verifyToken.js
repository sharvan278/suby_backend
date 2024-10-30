const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');
// const bcrypt = require('bcryptjs');

const verifyToken = async(req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }
    try {
        const decoded = jwt.verify(token,'jwtPass');
        const vendor = await Vendor.findById(decoded.vendorId);
            if (!vendor) {
                return res.status(401).json({ message: 'Vendor not found' });
            }
            req.vendorId = vendor._id;
            next();
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = verifyToken;
