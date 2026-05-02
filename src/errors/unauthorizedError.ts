import { BaseError } from './baseError';

export class UnauthorizedError extends BaseError {
  statusCode = 401;

  constructor(public message: string = 'Unauthorized') {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}