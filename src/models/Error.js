class ClientError extends Error {
  constructor(type = null, details = null, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }

    this.name = 'ClientError';
    // Custom debugging information
    this.date = new Date();
    this.type = type;
    this.details = details;
  }
}

const ErrorTypes = {
  HttpError: 'HttpError',
  Json: 'Json',
  Image: 'Image',
  Video: 'Video',
  BlobURL: 'BlobURL',
};

module.exports = {
  ClientError,
  ErrorTypes,
};
