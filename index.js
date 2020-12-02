

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// set controller
// const blogController = require('./controllers/blog-controller');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', './views'); // setting views directory
app.set('view engine', 'ejs'); // setting template engine







////////////////////
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    // 這邊會是你的api文件網頁描述
    info: {
      title: 'ec_web_demo API',
      version: '1.0.0',
      description: 'Generate ec_web_demo API document with swagger'
    }
  },
  // 這邊會是你想要產生的api文件檔案，我是直接讓swagger去列出所有controllers
  apis: ['./controllers/*.js']
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
///////////////////////







// middlewares
app.use(express.static('./styles')); // css static directory
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
  // 設定 global 可存取的物件
  res.locals.username = req.session.username;
  res.locals.errorMsg = req.flash('errorMsg');
  next();
});

// 設定路由
function redirectBack(req, res) {
  res.redirect('back');
}

// app.get('/', blogController.index);
// app.get('/register', blogController.register);
// app.post('/register', blogController.handleRegister, redirectBack);
// app.get('/login', blogController.login);
// app.post('/login', blogController.handleLogin, redirectBack);
// app.get('/logout', blogController.logout);
// app.get('/list', blogController.list);
// app.get('/post/:id', blogController.post);
// app.get('/edit/:id', blogController.edit);
// app.post('/edit/:id', blogController.update, redirectBack);
// app.get('/add', blogController.add);
// app.post('/add', blogController.handleAdd);
// app.get('/delete/:id', blogController.delete);

app.listen(port, () => {
  console.log(`Listening on port:${port}!`);
});
