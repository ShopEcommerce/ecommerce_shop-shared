import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/baseError';
import pino from 'pino';

const logger = pino();

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    type: err.constructor.name,
  });

  if (err instanceof BaseError) {
    const errors = err.serializeErrors();
    return res.status(err.statusCode).send(errors);
  }

  res.status(500).send([
    {
      message: 'Internal server error',
      statusCode: 500,
    },
  ]);
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
