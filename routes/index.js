const express = require('express')
const router = express.Router();
const multer = require('multer');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth');
const bodyParser = require('body-parser');

const adminController = require('../controllers/admin');
const userController = require('../controllers/user');
const productController = require('../controllers/product');
const orderController = require('../controllers/order');
const recipientController = require('../controllers/recipient');
const imageController = require('../controllers/image');


const checkPermission = () => {

}

router.post('/adminLogin', adminController.handleLogin)

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne)
router.post('/products', adminAuth, productController.add)
router.patch('/products/:id', adminAuth, productController.update)


router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.get('/login', userController.handleLogin);
router.patch('/users/:id', userAuth, userController.handleUpdate)
// router.get('/me', userController.verify)

router.get('/orders', userAuth, orderController.getUserOrders);
router.get('/orders/:id', userAuth, orderController.getOne);


router.get('/recipients', userAuth, recipientController.getAll);
router.get('/recipients/:id', userAuth, recipientController.getOne);

// image upload
router.get('/upload', imageController.upload);

var upload = multer({});
router.post('/handleUpload', upload.single("file"), imageController.handleUpload);

router.get('/test', (req, res) => {
  res.render('test')
})


router.get('/', userAuth, (req, res) => {
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