export class CustomError extends Error {
    public code;

    constructor(statusCode: number, message: string) {
    super(message);
    this.code = statusCode;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(403, message);
  }
}

export class UnexpectedError extends CustomError {
  constructor(message: string) {
    super(500, message);
  }
}

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(422, message);
  }
}

export class NotAuthorizedError extends CustomError {
  constructor(message: string) {
    super(401, message);
  }
}
