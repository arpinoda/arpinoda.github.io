/**
 * Error handling middleware for express.js app.
 * @param {Express} app The express.js app
 * @param {Winston.Logger} logger Our server-side logger
 */
module.exports = (app, logger) => {
  app.use(function (err, req, res, next) {
    // Set a default code if unset
    if (!err.statusCode) {
      err.statusCode = 400;
    }

    // Create our message to be logged
    const logItem = `${err.name} ${req.ip} ${req.originalUrl} ${err.message}`;

    // Determine if should be logged as warning or as an error.
    if (err.name === 'UnauthorizedError') {
      logger.warn(logItem);
      err.statusCode = 401;
    } else if (err.name === 'FailedLoginError') {
      logger.warn(logItem);
    }
    else {
      logger.error(logItem);
    }

    res.sendStatus(err.statusCode);
  });
};