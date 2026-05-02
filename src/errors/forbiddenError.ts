import { BaseError } from './baseError';

export class ForbiddenError extends BaseError {
  statusCode = 403;

  constructor(public message: string = 'Access Forbidden') {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}