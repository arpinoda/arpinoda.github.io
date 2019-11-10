const winston = require('winston');
const	Papertrail = require('winston-papertrail').Papertrail;

var logger;

if (process.env.NODE_ENV === 'production') {
  const ptTransport = new Papertrail({
    level: 'debug',
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    colorize:true,
    handleExceptions: true
  });
  
  ptTransport.on('error', function(err) {
    logger && logger.error(err);
  });
  
  ptTransport.on('connect', function(message) {
    logger && logger.info(message);
  });

  logger = new winston.Logger({
    level: 'debug',
    transports: [
      ptTransport
    ]
  });
} else {
  const consoleLogger = new winston.transports.Console({
    level: 'debug',
    logFormat: function(level, message) {
      return '[' + level + '] ' + message;
    },
    timestamp: function() {
      return new Date().toString();
    },
    colorize: true
  });

  logger = new winston.Logger({
    level: 'debug',
    transports: [
      consoleLogger
    ]
  });
}

module.exports = logger;
