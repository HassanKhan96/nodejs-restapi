const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./models/productmodel');
require('./models/ordermodel');
require('./models/usermodel');
const products = require('./routes/products');
const orders = require('./routes/orders');
const user = require('./routes/user');
const morgan = require('morgan');
const bodyparser = require('body-parser');


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("connected!"))
.catch(e => console.log(e))

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
app.use('/user', user);

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