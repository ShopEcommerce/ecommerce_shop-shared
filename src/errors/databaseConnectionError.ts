import { BaseError } from './baseError';

export class DatabaseConnectionError extends BaseError {
  statusCode = 500;

  constructor(public message: string = 'Error connecting to database') {
    super(message);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}