const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');
const checkAuth = require('./middlewares/auth')
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = process.env.PORT || 3000;


app.set('views', 'views'); // setting views directory
app.set('view engine', 'ejs'); // setting template engine

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(checkAuth)
app.use('/', router)

app.listen(port, () => {
  console.log(`Listening on port:${port}!`);
});
