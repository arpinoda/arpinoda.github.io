const winston = require('winston');
const	Papertrail = require('winston-papertrail').Papertrail;
const { config } = winston;
let logger;

/**
 * Formats the output consistently for every log entry.
 * i.e. 1/1/2019, 10:00:00 AM WARN FailedLoginError 127.0.0.1 /login 
 * @param {Object} options Contains customizations for formatting
 */
const getFormatter = (options) => new Date().toLocaleString() + ' ' +
    config.colorize(options.level, options.level.toUpperCase()) + ' ' +
    (options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );

let transport = null;

// Configure and use Papertrail transport if in production
if (process.env.NODE_ENV === 'production') {
  transport = new Papertrail({
    level: 'debug',
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    colorize:true,
    handleExceptions: true,
    formatter: getFormatter
  });
  
  transport.on('error', function(err) {
    logger && logger.error(err);
  });
  
  transport.on('connect', function(message) {
    logger && logger.info(message);
  });
} else {
  // Use Console transport if in development
  transport = new winston.transports.Console({
    level: 'debug',
    colorize: true,
    formatter: getFormatter
  });
}

logger = new winston.Logger({
  level: 'debug',
  transports: [
    transport
  ]
});

module.exports = logger;
