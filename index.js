const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// set controller
const mainController = require('./controllers/main');
const recipientController = require('./controllers/recipient');
const productController = require('./controllers/product');


const app = express();
const port = process.env.PORT || 3000;

app.set('views', 'views'); // setting views directory
app.set('view engine', 'ejs'); // setting template engine

const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  // 放 env
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMsg = req.flash('errorMsg');
  next();
});

// router
function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/login', mainController.login);
app.post('/login', mainController.handleLogin);
app.get('/me', mainController.verify)
app.get('/products', productController.getAll);
app.get('/products/:id', productController.getOne);

app.listen(port, () => {
  console.log(`Listening on port:${port}!`);
});
