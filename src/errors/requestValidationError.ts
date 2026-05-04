import { BaseError } from './baseError';

export interface SerializedValidationError {
  message: string;
  field?: string;
}

export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(
    public errors: SerializedValidationError[],
    public message: string = 'Invalid request parameters'
  ) {
    super(message);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  
  serializeErrors() {
    return this.errors;
  }
}