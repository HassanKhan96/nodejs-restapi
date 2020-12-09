const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const orderSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    quantity: { type: Number, default: 1}
});

mongoose.model('orders', orderSchema);