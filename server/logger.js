const winston = require('winston');
const	Papertrail = require('winston-papertrail').Papertrail;
const { config } = winston;
let logger;

const getFormatter = (options) => new Date().toLocaleString() + ' ' +
    config.colorize(options.level, options.level.toUpperCase()) + ' ' +
    (options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );

if (process.env.NODE_ENV === 'production') {
  const ptTransport = new Papertrail({
    level: 'debug',
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    colorize:true,
    handleExceptions: true,
    formatter: getFormatter
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
    colorize: true,
    formatter: getFormatter
  });

  logger = new winston.Logger({
    level: 'debug',
    transports: [
      consoleLogger
    ]
  });
}

module.exports = logger;
