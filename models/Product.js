const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type: String, required: true},
    price: { type: String, required: true },
    category: [
        { 
            type: String,
            enum: ['veg', 'non-veg']
        }
    ],
    image: {
        type: String,
    },
    bestseller: {
        type: String,
    },
    description: {
        type: String,
    },
    firm:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
});

module.exports = mongoose.model('Product', productSchema);
