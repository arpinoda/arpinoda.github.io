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

// Will be thrown by server-side code
// and logged by server-side middleware (errorHandlers.js)
class ServerError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = this.constructor.name;
  }
}

class FailedLoginError extends ServerError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class BadRequestError extends ServerError {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

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
};
