const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/products');
const checkAuth = require('../middleware/checkAuth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null,  new Date().toISOString() + file.originalname);
    }
})
const uploads = multer({storage: storage})

router.get('/', productController.GET_ALL_PRODUCTS);

router.post('/', checkAuth,uploads.single('productImage'), productController.CREATE_PRODUCT);

router.get('/:productId', productController.GET_PRODUCT);

router.patch('/:productId', checkAuth, productController.UPDATE_PRODUCT);

router.delete('/:productId', checkAuth, productController.DELETE_PRODUCT);


module.exports = router;


