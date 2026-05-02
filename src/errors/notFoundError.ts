import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  statusCode = 404;

  constructor(public message: string = 'Resource not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}