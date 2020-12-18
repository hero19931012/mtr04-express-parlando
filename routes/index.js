const express = require('express')
const multer = require('multer');

const adminController = require('../controllers/admin');
const userController = require('../controllers/user');
const productController = require('../controllers/product');
const orderController = require('../controllers/order');
const recipientController = require('../controllers/recipient');
const imageController = require('../controllers/image');

const router = express.Router();

const checkPermission = (roles = []) => (req, res, next) => {
  if (
    roles.indexOf('user') >= 0 && roles.indexOf('user') >= 0
    && (req.user.role === 'user' || req.user.role === 'admin')
    ) {
    return next()
  }
  if (roles.indexOf('admin') >= 0 && req.user.role === 'admin') {
    return next()
  }
  if (roles.indexOf('user') >= 0 && req.user.role === 'user') {
    return next()
  }
  res.status(401).end()
}

const onlyAdmin = checkPermission(['admin'])
const onlyUser = checkPermission(['user'])
const adminAndUser = checkPermission(['admin', 'user'])

router.post('/adminLogin', adminController.handleLogin)

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne)
router.post('/products', onlyAdmin, productController.add)
router.patch('/products/:id', onlyAdmin, productController.update)
router.patch('/products/:id', onlyAdmin, productController.delete)

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.patch('/users/:id', userController.handleUpdate)
// router.get('/me', userController.verify)

router.get('/orders', adminAndUser, orderController.getAll);
router.get('/orders/:id', adminAndUser, orderController.getOne);
router.post('/orders', adminAndUser, orderController.add)
router.delete('/orders/:id', adminAndUser, orderController.delete)

router.get('/recipients', adminAndUser, recipientController.getAll);
router.get('/recipients/:id', adminAndUser, recipientController.getOne);
router.patch('/recipients/:id', onlyAdmin, recipientController.edit)

// image upload
const upload = multer({});
router.post('/images', upload.single("file"), imageController.handleUpload);
router.get('/images', onlyAdmin, imageController.upload);

// 404 not found
router.use((req, res) => {
  res.status(404).send("404: File not found")
})

module.exports = router;