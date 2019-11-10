var winston = require('winston'),
	Papertrail = require('winston-papertrail').Papertrail;

var logger,
	consoleLogger = new winston.transports.Console({
		level: 'debug',
		timestamp: function() {
			return new Date().toString();
		},
		colorize: true
	}),
	ptTransport = new Papertrail({
		host: process.env.PAPERTRAIL_HOST,
		port: process.env.PAPERTRAIL_PORT,
    level: 'debug',
		logFormat: function(level, message) {
			return '[' + level + '] ' + message;
		}
	});

ptTransport.on('error', function(err) {
	logger && logger.error(err);
});

ptTransport.on('connect', function(message) {
	logger && logger.info(message);
});

logger = new winston.Logger({
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3
  },
  transports: [
    ptTransport,
    consoleLogger
  ]
});

module.exports = logger;
