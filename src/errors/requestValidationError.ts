import { ValidationError } from 'express-validator';
import { BaseError } from './baseError';

export class RequestValidationError extends BaseError {
  statusCode = 400;

  constructor(public errors: ValidationError[], public message: string = 'Invalid request parameters') {
    super(message);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  
  serializeErrors() {
    return this.errors.map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
  }
}