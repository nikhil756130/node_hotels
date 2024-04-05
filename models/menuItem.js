const mongoose = require('mongoose');


const menuItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    taste: {
        type: String,
        enum: ['sweet', 'spice', 'sour'],
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default: [],
    },
    num_sales: {
        type: Number,
        default: 0,
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemsSchema);
module.exports = MenuItem;