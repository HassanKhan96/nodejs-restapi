const express = require('express');
const app = express();
const products = require('./routes/products');
const orders = require('./routes/orders');
const morgan = require('morgan');
const bodyparser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === "OPTIONS"){
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PATCH, DELETE'
        );
        return res.status(200).json({});
    }
    next();
})

app.use('/products', products);
app.use('/orders', orders);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);