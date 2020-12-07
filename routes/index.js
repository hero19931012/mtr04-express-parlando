const express = require('express')
const router = express.Router();

const mainController = require('../controllers/main');
const recipientController = require('../controllers/recipient');
const productController = require('../controllers/product');

const checkPermission = () => {

}



router.get('/login', mainController.login);
router.post('/login', mainController.handleLogin);
router.get('/me', mainController.verify)

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne);


module.exports = router;