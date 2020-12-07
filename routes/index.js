const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');
const recipientController = require('../controllers/recipient');
const productController = require('../controllers/product');

const checkPermission = () => {

}

router.get('/login', userController.login);
router.post('/login', userController.handleLogin);
router.get('/me', userController.verify)

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne);

router.get('/recipients', recipientController.getAll);
router.get('/recipients/:id', recipientController.getOne);



module.exports = router;