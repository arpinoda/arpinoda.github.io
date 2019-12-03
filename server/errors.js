/**
 * Thrown by the React.js app, which then is logged by ErrorBoundary and POSTed to the API
 */
class ClientError extends Error {
  constructor(
    showErrorPage = false,
    statusCode = 0,
    ...params
  ) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }

    this.name = this.constructor.name;

    // Custom debugging information
    this.showErrorPage = showErrorPage;
    this.statusCode = statusCode;
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
