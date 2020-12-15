
const mongoose = require('mongoose');
const productdb = mongoose.model('products');

exports.GET_ALL_PRODUCTS = (req, res, next) => {
    productdb.find()
    .select("name price id productImage")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => (
                {
                    id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET',
                        url: "http://localhost:5000/products/"+doc._id
                    }
                }
            ))
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err});
    });
}

exports.CREATE_PRODUCT = (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    }
    productdb.find({name: product.name, price: product.price})
    .then(result => {
        if(result.length !== 0){
            return res.status(500).json({
                error: {
                    message: "product already exists"
                }
            });
        }
        new productdb(product)
        .save()
        .then(newproduct => {
            res.status(201).json({
                message: "product posted",
                createdProduct: {
                    id: newproduct._id,
                    name: newproduct.name,
                    price: newproduct.price,
                    productImage: newproduct.productImage,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/"+newproduct._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
        });
    });

    })
    
}

exports.GET_PRODUCT = (req, res, next) => {
    productdb.findById(req.params.productId)
    .then(product => {
        if(product){
            res.status(200).json({
                message: "product details",
                Product: {
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    productImage: product.productImage,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/"
                    }
                }
            });
        }
        else{
            res.status(404).json({
                message: "Product not found"
            });
        }        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
    
}

exports.UPDATE_PRODUCT = (req, res, next) => {
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
            res.status(200).json({
                message: "Product successfully updated",
                Product: {
                    id,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/products/"+id
                    }
                }
            });
        }
    });
}

exports.DELETE_PRODUCT = (req, res, next) => {
    const id = req.params.productId;
    productdb.remove({_id: id}, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({error: err});
        }
        else{
            res.status(200).json({
                message: "product successfully deleted"
            });
        }
    });    
}