/**
 * Thrown by the React.js app, which then is logged by ErrorBoundary and POSTed to the API
 */
const ErrorClass = Error; // <-- https://github.com/babel/babel/issues/8061

class ClientError extends ErrorClass {
  constructor(
    error
  ) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(error);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }

    this.name = this.constructor.name;

    this.send = function() {
      const body = {
        error: {
          message: this.message,
          stack: this.stack,
        },
      };

      fetch('/log-client-errors', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .catch(err => console.error(err));
    };
  }
}

/**
 * Base class for errors thrown by the express.js app
 */
class ServerError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = this.constructor.name;
  }
}

/**
 * Thrown when a user submits the wrong passcode
 */
class FailedLoginError extends ServerError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

/**
 * Thrown if a url parameter is an unexpected type
 */
class BadRequestError extends ServerError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

/**
 * Thrown during pipelining stream of an image file
 */
class StreamImageError extends ServerError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

/**
 * Thrown if a requested resource does not exist
 */
class ResourceNotFoundError extends ServerError {
  constructor(resource, query) {
    super(`Resource '${resource}' was not found. Query: ${query}`);
    this.statusCode = 404;
  }
}

module.exports = {
  ClientError,
  FailedLoginError,
  BadRequestError,
  ResourceNotFoundError,
  StreamImageError,
};
