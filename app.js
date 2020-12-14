const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');
const port = process.env.PORT || 3000;
const morgan = require('morgan');

app.set('views', 'views'); // setting views directory
app.set('view engine', 'ejs'); // setting template engine

const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('dev'))











const multer = require('multer');
const imageController = require('./controllers/image')

app.get('/upload', imageController.upload)

// const upload = multer()
const upload = multer({dest: "../upload/"})
app.post(
  '/handleUpload',
  // upload.single("image"),
  upload.array(),
  (req, res) => {
    const { formData } = req.body;
    res.status(200).send(formData);
  });



  app.use('/', router);









app.listen(port, () => {
  console.log(`Listening on port:${port}!`);
});
