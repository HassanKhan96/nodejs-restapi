const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number
});

mongoose.model('products', productSchema);