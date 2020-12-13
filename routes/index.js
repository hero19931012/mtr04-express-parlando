const express = require('express')
const router = express.Router();

const auth = require('../middlewares/auth');

const userController = require('../controllers/user');
const productController = require('../controllers/product');
const orderController = require('../controllers/order');
const recipientController = require('../controllers/recipient');

const checkPermission = () => {

}

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.get('/login', userController.handleLogin);
router.patch('/users/:id', userController.handleUpdate)
router.get('/me', userController.verify)

router.get('/products', productController.get);
router.get('/products/:id', productController.getOne);

router.get('/orders', orderController.getAll);
router.get('/orders/:id', orderController.getOne);


router.get('/recipients', recipientController.getAll);
router.get('/recipients/:id', recipientController.getOne);

router.get('/', auth, (req, res) => {
  res.status(200).send({
    message: "user authorized",
    user: req.user
  })
})

// 404 not found
router.use((req, res) => {
  res.send("404: File not found")
})

module.exports = router;