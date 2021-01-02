const express = require('express')
const multer = require('multer');

const adminController = require('../controllers/admin');
const userController = require('../controllers/user');
const productController = require('../controllers/product');
const modelController = require('../controllers/model');
const orderController = require('../controllers/order');
const recipientController = require('../controllers/recipient');
const photoController = require('../controllers/photo');
const imageController = require('../controllers/image');
const paymentController = require('../controllers/payment');

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
router.get('/upload', (req, res) => {
  res.render('upload')
})
router.get('/photos', onlyAdmin, photoController.getAll);
router.post('/photos', onlyAdmin, upload.array("files"), photoController.upload);
router.patch('/photos', onlyAdmin, photoController.update)

// upload article images
router.post('/images', onlyAdmin, upload.array("files"), imageController.upload)

router.get('/orders', adminAndUser, orderController.getAll);
router.get('/orders/:id', adminAndUser, orderController.getOne);
router.post('/orders', onlyUser, orderController.add);
router.patch('/orders/:id', onlyAdmin, orderController.update); // 完成訂單
router.delete('/orders/:id', onlyAdmin, orderController.delete); // 刪除訂單

router.get('/recipients', adminAndUser, recipientController.getAll);
router.get('/recipients/:id', adminAndUser, recipientController.getOne);
router.post('/recipients/', onlyUser, recipientController.add);
router.patch('/recipients/:id', onlyAdmin, recipientController.update);

router.get('/date', (req, res) => {
  const date = new Date().toLocaleDateString('zh-TW', { timeZone: 'Asia/Taipei' })
  const time = new Date().toLocaleTimeString('zh-TW', { hour12: false, timeZone: 'Asia/Taipei' })

  const [day, month, year] = date.split('/')
  month = Number(month) > 10 ? month : "0" + month
  day = Number(day) > 10 ? day : "0" + day

  function getDate() {
    const date = new Date().toLocaleString()
    let [Day, Time] = date.split(', ')
    let [month, day, year] = Day.split('/')
    let [time, noon] = Time.split(' ')
    let [hr, min, sec] = time.split(':')
    if (noon === 'PM') { hr = Number(hr) + 12 }
  
    month = Number(month) > 10 ? month : "0" + month
    day = Number(day) > 10 ? day : "0" + day
    hr = Number(hr) > 10 ? hr : "0" + hr
  
    const dateString = `${year}/${month}/${day} ${hr}:${min}:${sec}`
    console.log(dateString);
    return dateString
  }

  console.log(date);
  console.log("time", `${year}/${month}/${day} ${time}`);
  console.log(getDate());
})

// payment-test
router.get('/payment', (req, res) => {
  res.render('paymentIndex')
})
router.get('/payment/:uuid', paymentController.handlePayment)
router.post('/payment', paymentController.handlePaymentResult)
router.post('/payment_result', (req, res) => {
  console.log(req);
  console.log(req.data);
  res.status(204).end()
})

// 404 not found
router.use((req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = router;