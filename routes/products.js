const express = require('express');
const router = express.Router();


router.get('/', (req,res,next) => {
    res.status(200).json({
        message: "handling get products"
    });
});

router.post('/', (req,res,next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(201).json({
        message: "product posted",
        createdProduct: product
    });
});

router.get('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "product details",
        ProductId: req.params.productId
    });
});

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "product updated",
        ProductId: req.params.productId
    });
});

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message: "product deleted",
        ProductId: req.params.productId
    });
});


module.exports = router;


