import { BaseError } from './baseError';

export class BadRequestError extends BaseError {
  statusCode = 400;

  constructor(public message: string = 'Bad Request') {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}