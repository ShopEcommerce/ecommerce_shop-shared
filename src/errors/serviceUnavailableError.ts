import { BaseError } from './baseError';

export class ServiceUnavailableError extends BaseError {
  statusCode = 503;

  constructor(public message: string = 'Service temporarily unavailable') {
    super(message);
    Object.setPrototypeOf(this, ServiceUnavailableError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}