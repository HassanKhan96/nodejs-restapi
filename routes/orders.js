const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const ordersController = require('../controllers/orders');

router.get('/', ordersController.GET_ALL_ORDERS);

router.post('/', checkAuth, ordersController.CREATE_ORDER);

router.get('/:orderId', checkAuth, ordersController.GET_ORDER);

router.patch('/:orderId',checkAuth, ordersController.UPDATE_ORDER);

router.delete('/:orderId', checkAuth, ordersController.DELETE_ORDER);


module.exports = router;


