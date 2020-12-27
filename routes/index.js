const express = require('express')
const multer = require('multer');

const adminController = require('../controllers/admin');
const userController = require('../controllers/user');
const productController = require('../controllers/product');
const modelController = require('../controllers/model');
const orderController = require('../controllers/order');
const recipientController = require('../controllers/recipient');
const photoController = require('../controllers/photo');

const router = express.Router();

const checkPermission = (roles = []) => (req, res, next) => {
  const role = req.user !== undefined ? req.user.role : null
  if (
    roles.indexOf('admin') >= 0 && roles.indexOf('user') >= 0
    && (role === 'admin' || role === 'user')
  ) {
    return next();
  }
  if (roles.indexOf('admin') >= 0 && role === 'admin') {
    return next();
  }
  if (roles.indexOf('user') >= 0 && role === 'user') {
    return next();
  }
  res.status(401).end();
}

const onlyAdmin = checkPermission(['admin'])
const onlyUser = checkPermission(['user'])
const adminAndUser = checkPermission(['admin', 'user'])

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.get('/users', adminAndUser, userController.getOne);
router.patch('/users', onlyUser, userController.update);

router.post('/admin', adminController.handleLogin);

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getOne);
router.post('/products', onlyAdmin, productController.add);
router.patch('/products/:id', onlyAdmin, productController.update);
router.delete('/products/:id', onlyAdmin, productController.delete);

router.get('/models/:id', onlyAdmin, modelController.getOne);
router.post('/models', onlyAdmin, modelController.add);
router.patch('/models/:id', onlyAdmin, modelController.update);
router.delete('/models/:id', onlyAdmin, modelController.delete);

// image upload
const upload = multer({});
router.get('/photos', onlyAdmin, photoController.getAll);
router.post('/photos', upload.array("files"), photoController.upload);
router.patch('/photos', onlyAdmin, photoController.update)

router.get('/orders', adminAndUser, orderController.getAll);
router.get('/orders/:id', adminAndUser, orderController.getOne);
router.post('/orders', onlyUser, orderController.add);
router.patch('/orders/:id', onlyAdmin, orderController.update); // 完成訂單
router.delete('/orders/:id', onlyAdmin, orderController.delete); // 刪除訂單

router.get('/recipients', adminAndUser, recipientController.getAll);
router.get('/recipients/:id', adminAndUser, recipientController.getOne);
router.post('/recipients/', onlyUser, recipientController.add);
router.patch('/recipients/:id', onlyAdmin, recipientController.update);

// payment-test
const paymentController = require('../controllers/payment')
router.get('/payment', (req, res) => {
  res.render('paymentIndex')
})
router.post('/payment/:id', paymentController.handlePayment)
router.post('/payment-result', paymentController.handlePaymentResult)

// 404 not found
router.use((req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = router;