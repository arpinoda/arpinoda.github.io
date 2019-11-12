module.exports = (app, logger) => {
  /**
   * Error handling middleware
  */
  app.use(function (err, req, res, next) {
    if (!err.statusCode) {
      err.statusCode = 400;
    }

    const logItem = `${err.name} ${req.ip} ${req.originalUrl} ${err.message}`;

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