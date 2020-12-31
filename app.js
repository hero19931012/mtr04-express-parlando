require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https')
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors')
const checkAuth = require('./middlewares/auth')

const v0 = require('./routes/v0');
const v1 = require('./routes/v1');
const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

// setting ssl
app.use(express.static('static'));
const privateKey  = fs.readFileSync(__dirname + '/ssl/private.key');
const certificate = fs.readFileSync(__dirname + '/ssl/certificate.crt');
const credentials = { key: privateKey, cert: certificate };

const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkAuth)
app.use('/', v0)
app.use('/v1', v1)

const httpPort = process.env.PORT || 3000;
const httpsPort = 3001;

server.listen(httpPort, () => {
  console.log(`Listening http on port: ${httpPort}!`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`Listening https on port: ${httpsPort}!`);
});
