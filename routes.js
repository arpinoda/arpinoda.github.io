const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const path = require('path');

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

module.exports = app => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors);
  }
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
  app.get(['/static/favicon*', '/bundle.js', '/'], (req, res) =>
    res.sendFile(path.join(__dirname, 'dist/', req.path)),
  );
  app.get(['/login'], (req, res) => res.redirect('/'));
  app.get(['/project*'], (req, res) =>
    res.sendFile(path.join(__dirname, 'dist/', 'index.html')),
  );

  /*
    Protected Routes
  */
  app.use(jwtMW);
  const { API_PATH } = process.env;

  app.get(`${API_PATH}/project`, (req, res) => {
    res.sendFile(path.join(__dirname, 'src/data.json', 'project'));
  });

  app.get(`${API_PATH}/category`, (req, res) => {
    res.sendFile(path.join(__dirname, 'src/data.json', 'category'));
  });

  app.get(`${API_PATH}/image/:id`, (req, res) => {
    const { id } = req.params;
    res.sendFile(path.join(__dirname, 'src/static/images/protected', id));
  });

  // --- End protected routes
};
