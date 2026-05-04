import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
    }
  }
}

export const correlationId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = (req.headers['x-correlation-id'] as string) || randomUUID();
  
  req.headers['x-correlation-id'] = id;

  req.correlationId = id;
  
  res.setHeader('x-correlation-id', id);

  next();
};