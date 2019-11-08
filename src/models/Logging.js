class CustomError extends Error {
  constructor(
    name = '',
    type = null,
    details = null,
    isCritical = false,
    ...params
  ) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = name;
    // Custom debugging information
    this.clientDate = new Date();
    this.type = type;
    this.details = details;
    this.isCritical = isCritical;
  }
}

class ClientError extends CustomError {
  constructor(type = null, details = null, isCritical = false, ...params) {
    super('ClientError', type, details, isCritical, ...params);
  }
}

class ClientWarning extends CustomError {
  constructor(type = null, details = null, ...params) {
    super('ClientWarning', type, details, false, ...params);
  }
}

const ErrorTypes = {
  HttpError: 'HttpError',
  JsonError: 'JsonError',
  ImageError: 'ImageError',
  VideoError: 'VideoError',
  BlobURLError: 'BlobURLError',
};

const WarningTypes = {
  LoginFailureWarning: 'LoginFailureWarning',
  TokenExpiredWarning: 'TokenExpiredWarning',
};

module.exports = {
  ClientError,
  ErrorTypes,
  ClientWarning,
  WarningTypes,
};
