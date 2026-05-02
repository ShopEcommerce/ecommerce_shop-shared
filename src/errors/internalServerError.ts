import { BaseError } from './baseError';

export class InternalServerError extends BaseError {
  statusCode = 500;

  constructor(public message: string = 'Internal Server Error') {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}