const express = require('express')
const router = express.Router();
const multer = require('multer');
const auth = require('../middlewares/auth');
const bodyParser = require('body-parser');


const userController = require('../controllers/user');
const productController = require('../controllers/product');
const orderController = require('../controllers/order');
const recipientController = require('../controllers/recipient');
const imageController = require('../controllers/image');


const checkPermission = () => {

}

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/register', userController.handleRegister);
router.post('/login', userController.handleLogin);
router.get('/login', userController.handleLogin);
router.patch('/users/:id', auth, userController.handleUpdate)
// router.get('/me', userController.verify)

router.get('/products', productController.get);
router.get('/products/:id', productController.getOne);

router.get('/orders', auth, orderController.getAll);
router.get('/orders/:id', auth, orderController.getOne);


router.get('/recipients', auth, recipientController.getAll);
router.get('/recipients/:id', auth, recipientController.getOne);

// router.get('/upload', imageController.upload)

// const upload = multer({dest: "../upload/"})
// router.post(
//   '/handleUpload',
//   // upload.single("image"),
//   upload.array(),
//   (req, res) => {
//     const { formData } = req.body;
//     res.status(200).send(formData);
//   });

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