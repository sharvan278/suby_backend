const mongoose = require('mongoose');
// const { Schema } = mongoose;

const vendorSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
})

module.exports = mongoose.model('Vendor',vendorSchema);