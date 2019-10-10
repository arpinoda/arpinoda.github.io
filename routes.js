const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const path = require('path');
const fs = require('fs');

const detailsRaw = fs.readFileSync('./src/data/projectDetail.json');
const projectDetails = JSON.parse(detailsRaw);

const { API_PATH } = process.env;

const jwtMW = exjwt({
  secret: process.env.JWT_SECRET,
});

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

module.exports = (app, express) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors);
  }

  // These unauthenticated routes are hit in BOTH dev and production
  app.get('/robots.txt', (req, res) =>
    res.sendFile(path.join(__dirname, 'robots.txt')),
  );

  app.post('/login', (req, res) => {
    const { passcode } = req.body;
    const IP = req.connection.remoteAddress;

    if (passcode === process.env.PASSCODE) {
      const token = jwt.sign({ IP }, process.env.JWT_SECRET, {
        expiresIn: 60 * 10,
      });
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
  });

  app.get(['/login'], (req, res) => res.redirect('/'));
  // --- end development AND production routes

  // These unauthenticated routes are hit in production ONLY
  app.get(['/static/favicon*', '/bundle.js', '/'], (req, res) =>
    res.sendFile(path.join(__dirname, 'dist/', req.path)),
  );

  app.use(
    '/project*',
    express.static(path.join(__dirname, 'dist', 'index.html')),
  ); // --- end production routes

  app.use(
    `${API_PATH}/video`,
    express.static(path.join(__dirname, 'src/static/videos')),
  );

  /*
    Protected Routes, used in DEV and PROD
  */
  app.use(jwtMW);

  app.use(
    `${API_PATH}/project`,
    express.static(path.join(__dirname, 'src/data', 'project.json')),
  );

  app.get(`${API_PATH}/project/:id`, (req, res) => {
    const { id } = req.params;
    const projectID = parseInt(id, 10);

    if (Number.isNaN(projectID)) {
      return res.sendStatus(400);
    }

    const project = projectDetails.find(x => x.projectID === projectID);

    if (!project) {
      return res.sendStatus(404);
    }

    const { media } = project;
    return res.json(media);
  });

  app.use(
    `${API_PATH}/category`,
    express.static(path.join(__dirname, 'src/data', 'category.json')),
  );

  app.use(
    `${API_PATH}/image`,
    express.static(path.join(__dirname, 'src/static/images/protected')),
  );
  // --- End protected routes
};
