const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
require('dotenv').config({ 
  path: path.resolve(__dirname, '../config/.env'),
});

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

require('./routes')(app, express);

app.listen(PORT);
console.log('Listening on port:', PORT);
