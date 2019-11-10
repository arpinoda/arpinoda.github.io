const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('./cors');
const { API_PATH } = process.env;

/**
 * Retrieves pertinent unauthenticated routes
 * @param {app} arg The instantiated express application
 * @param {express} arg The required express library
 * @param {logger} arg The logging library
*/
module.exports = function(app, express, logger) {
  common(app, express, logger);

  if (process.env.NODE_ENV === 'development') {
    development(app);
  } else {
    production(app, express, logger);
  }
}

/**
 * Unauthenticated routes used within development AND production
 * @param {app} arg The instantiated express application
 * @param {express} arg The required express library
 * @param {logger} arg The logging library
*/
function common(app, express, logger) {
  /**
   * GET /robots.txt
   * Returns local robots.txt file
  */
  app.get('/robots.txt', (req, res) =>
    res.sendFile(path.join(__dirname, 'robots.txt')),
  );

  /**
   * GET /login
   * Redirects user to root react app
  */
  app.get(['/login'], (req, res) => res.redirect('/'));  

  /**
   * POST /login
   * Authenticates user by validating passcode
   * Returns a symmetrically signed JWT token if successful, else HTTP 401
  */
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

  /**
   * POST /log-client-errors
   * Obtains client-side errors or warnings.
   * Log items are sent to Papertrail via Winston.
  */
  app.post('/log-client-errors', (req, res) => {
    let type = req.body.error.type;
    let details = req.body.error.details;
    let message = req.body.error.message;
    let stack = req.body.error.stack;
    let clientDate = req.body.error.clientDate;
    let name = req.body.error.name;

    const logItem = 
    `
    -----
    Log received from client
    ${type}: ${message}
    Client Date: ${clientDate}
    Details: ${details}
    Stack: ${stack}
    -----
    `;
    
    // winston will log via console or papertrail transport
    // depending upon NODE_ENV
    if (name.toLowerCase().includes('warning')) {
      logger.warn(logItem);
    } else {
      logger.error(logItem);
    }
    
    res.sendStatus(200);
  });

   /**
   * USE /video/*
   * Returns static video file
  */
  app.use(
    `${API_PATH}/video`,
    express.static(path.join(__dirname, '/../client/src/static/videos')),
  );
};

/**
 * Unauthenticated routes used within production ONLY
 * @param {app} arg The instantiated express application
 * @param {express} arg The required express library
*/
function production(app, express, logger) {
  /**
   * GET /static*
   * Returns specific static assets from dist directory
  */
  app.get(
    ['/static/favicon*', '/static/images/public*', '/bundle.js', '/'],
    (req, res) => res.sendFile(path.join(__dirname, '/../client/dist/', req.path)),
  );

  /**
   * USE /project/*
   * Redirects user to React app when logged out.
   * React app parses URL and appends path as "next=" query string
  */
  app.use(
    '/project*',
    express.static(path.join(__dirname, '/../client/dist/', 'index.html')),
  );
}

/**
 * Unauthenticated routes used within development ONLY
 * @param {app} arg The instantiated express application
*/
function development(app) {
  app.use(cors);

  app.get('/project*', (req, res) => {
    res.redirect(`/?next=${req.path}`);
  });
}