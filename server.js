const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

require('dotenv').config();

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

// Setup express JWT middleware
const jwtMW = exjwt({
  secret: process.env.JWT_SECRET,
});

// Routes
const getFavicon = (req, res) =>
  res.sendFile(path.join(__dirname, 'dist/static/favicon', 'favicon.ico'));
const getIndexFile = (req, res) =>
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
const getRobotsFile = (req, res) =>
  res.sendFile(path.join(__dirname, 'robots.txt'));
const getProjectData = (req, res) =>
  res.sendFile(path.join(__dirname, 'src/data.json', 'project'));
const getCategoryData = (req, res) =>
  res.sendFile(path.join(__dirname, 'src/data.json', 'category'));
const login = (req, res) => {
  const { passcode } = req.body;
  if (passcode === process.env.PASSCODE) {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: 60 * 10 });
    res.status(200).json({
      success: true,
      err: null,
      token,
    });
  } else {
    res.status(401).json({
      success: false,
      token: null,
      err: 'Invalid passcode',
    });
  }
};
const cors = (req, res, next) => {
  let oneof = false;
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    oneof = true;
  }
  if (req.headers['access-control-request-method']) {
    res.header(
      'Access-Control-Allow-Methods',
      req.headers['access-control-request-method'],
    );
    oneof = true;
  }
  if (req.headers['access-control-request-headers']) {
    res.header(
      'Access-Control-Allow-Headers',
      req.headers['access-control-request-headers'],
    );
    oneof = true;
  }
  if (oneof) {
    res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};

// un-authenticated access
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors);
app.post('/login', login);
app.get('/robots.txt', getRobotsFile);
app.get('/favicon.ico', getFavicon);
app.get('/', getIndexFile);
app.get('/login', getIndexFile);

// authenticated access
app.use(jwtMW);
app.get('/project', getIndexFile);
app.get('/project*', getIndexFile);
app.get('/data.json/project', getProjectData);
app.get('/data.json/category', getCategoryData);

app.listen(PORT);
console.log('Listening on port:', PORT);
