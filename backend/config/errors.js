const Codes = {
  BadRequest: 'bad_request',
  Unauthorized: 'unauthorized',
  Expired: 'expired',
  Unconfirmed: 'unconfirmed',
  Disabled: 'disabled',
  Forbidden: 'forbidden',
  NotFound: 'not_found',
  Conflict: 'conflict',
  InternalServer: 'internal_server',
  UnprocessableEntityError: 'unprocessable_entity',
};

class BaseError extends Error {
  constructor(code) {
    super();
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
    };
  }
}

class BadRequestError extends BaseError {
  constructor(code = Codes.BadRequest) {
    super(code);
  }
}

class AuthorizationError extends BaseError {
  constructor(code = Codes.Unauthorized) {
    super(code);
  }
}

class ForbiddenError extends BaseError {
  constructor(code = Codes.Forbidden) {
    super(code);
  }
}

class NotFoundError extends BaseError {
  constructor(code = Codes.NotFound) {
    super(code);
  }
}

class ConflictError extends BaseError {
  constructor(code = Codes.Conflict) {
    super(code);
  }
}

class UnprocessableEntityError extends BaseError {
  constructor(errors = []) {
    super(Codes.UnprocessableEntityError);
    this.errors = errors;
  }

  toJSON() {
    return {
      code: this.code,
      errors: this.errors,
    };
  }
}

class InternalServerError extends BaseError {
  constructor(code = Codes.InternalServer) {
    super(code);
  }
}

module.exports = {
  Codes,
  BadRequestError,
  AuthorizationError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  UnprocessableEntityError,
  InternalServerError,
};
