
const unauthenticated = require('./routes.unauthenticated');
const authenticated = require('./routes.authenticated');

/**
 * Wrapper for authenticated and unauthenticated routes.
 * Ensures unauth routes are called before auth routes.
 * @param {app} arg The instantiated express application
 * @param {express} arg The required express library
 * @param {logger} arg The logging library
*/
module.exports = (app, express, logger) => {
  unauthenticated(app, express, logger);
  authenticated(app, express, logger);
};
