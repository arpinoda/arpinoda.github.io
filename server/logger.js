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
		host: 'logs.papertrailapp.com',
		port: 12345,
    level: 'debug',
    handleExceptions: true,
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

logger = new winston.createLogger({
	levels: {
		debug: 0,
		info: 1,
		warn: 2,
		error: 3
	}
});

logger.add(ptTransport);
logger.add(consoleLogger);

module.exports = logger;
