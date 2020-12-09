const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');
const port = process.env.PORT || 3000;

app.set('views', 'views'); // setting views directory
app.set('view engine', 'ejs'); // setting template engine

const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port:${port}!`);
});
