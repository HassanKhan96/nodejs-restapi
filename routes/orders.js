const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth');
const ordersdb = mongoose.model('orders');

router.get('/', (req, res, next) => {
    ordersdb.find()
        .populate("productId", "name")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        id: doc._id,
                        product: {
                            productId: doc.productId,
                            quantity: doc.quantity
                        },
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/orders/" + doc._id
                        }
                    }
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});

router.post('/', checkAuth,(req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    new ordersdb(order)
        .save()
        .then(order => {
            res.status(201).json({
                id: order._id,
                product: {
                    productId: order.productId,
                    quantity: order.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:5000/orders/" + order._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

router.get('/:orderId', checkAuth, (req, res, next) => {
    ordersdb.findById(req.params.orderId)
        .populate("productId", "name")
        .exec()
        .then(order => {
            res.status(201).json({
                id: order._id,
                product: {
                    productId: order.productId,
                    quantity: order.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:5000/orders/" + order._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: "Order not found",
                error: err
            })
        })
});

router.patch('/:orderId',checkAuth, (req, res, next) => {
    ordersdb.findById(req.params.orderId)
    .exec()
    .then(order => {
        const updateops = {};
        for(const ops of req.body){
            updateops[ops.propName] = ops.value;
        }
        ordersdb.update({_id: order._id}, {$set: updateops}, (error, result) => {
            if(error){
                throw error;
            }
            else{
                res.status(200).json({
                    id: order._id,
                    message: "Product successfully updated",
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/orders/"+order._id
                    }
                });
            }
        });
    })
    .catch(err => {
        res.status(404).json({
            message: "Order not found",
            error: err
        })
    })
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
    ordersdb.findById(req.params.orderId)
    .exec()
    .then(order => {
        ordersdb.remove({_id: order._id}, (error) => {
            if(error){
                throw error;
            }
            else{
                res.status(200).json({
                    message: "Order successfully deleted!"
                })
            }
        })
    })
    .catch(err => {
        res.status(404).json({
            message: "Order not found",
            error: err
        })
    })
});


module.exports = router;


