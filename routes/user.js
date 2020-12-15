const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user');

router.post('/signup', userController.CREATE_USER);

router.post('/login', userController.USER_LOGIN);

router.delete('/:uid', userController.DELETE_USER);

module.exports = router;