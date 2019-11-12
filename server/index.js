const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config({ 
  path: path.resolve(__dirname, '../config/.env'),
});

const logger = require('./logger');
const app = express();
const PORT = process.env.PORT || 5000;

// Let server know to expect content-type "Authorization" within header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

// Setup ability to parse requests and responses
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.enable('trust proxy');

require('./routes')(app, express, logger);
require('./errorHandlers')(app, logger);

app.listen(PORT);
logger.info(`Listening on port: ${PORT}`);
