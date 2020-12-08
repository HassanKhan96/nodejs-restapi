const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productdb = mongoose.model('products');

router.get('/', (req, res, next) => {
    productdb.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err});
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }

    new productdb(product)
        .save()
        .then(newproduct => {
            console.log(newproduct)
            res.status(201).json({
                message: "product posted",
                createdProduct: newproduct
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
        });
    });

});

router.get('/:productId', (req, res, next) => {
    productdb.findById(req.params.productId)
    .then(product => {
        console.log(product)
        if(product){
            res.status(200).json({
                message: "product details",
                Product: product
            });
        }
        else{
            res.status(404).json({
                message: "data not found"
            });
        }        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
    
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateops = {};
    for(const ops of req.body){
        updateops[ops.propName] = ops.value
    }
    productdb.update({_id: id}, {$set: updateops}, (err, result)=> {
        if(err){
            res.status(500).json({error: err})
        }
        else{
            res.status(200).json(result);
        }
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    productdb.remove({_id: id}, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        }
        else{
            res.status(200).json(result);
        }
    });    
});


module.exports = router;


