const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number,
    productImage: { type: String, required: true}
});

mongoose.model('products', productSchema);