const { ResourceNotFoundError } = require('./errors');

// All routes not previously defined will be scooped
// up by this wild card route.
module.exports = (app) => {
  app.use('*', function(req, res, next) {
    let err = new ResourceNotFoundError('Http GET', req.originalUrl);
    next(err);
  });
}