import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload as JwtPayloadType } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/unauthorizedError';
import { ForbiddenError } from '../errors/forbiddenError';
import pino from 'pino';

const logger = pino();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export interface JwtPayload extends JwtPayloadType {
  id: string;
  email: string;
  role: 'ADMIN' | 'SELLER' | 'CUSTOMER';
}

interface SessionWithJwt {
  jwt?: string;
}

interface RequestWithSession extends Request {
  session?: SessionWithJwt;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const request = req as RequestWithSession;
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } 
  else if (request.session?.jwt) {
    token = request.session.jwt;
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.currentUser = decoded;
    
    next();
  } catch (error) {
    logger.warn({
      msg: 'Invalid or Expired JWT token',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    next();
  }
};

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new UnauthorizedError();
  }

  next();
};

export const requireRole = (roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new UnauthorizedError();
    }

    if (!roles.includes(req.currentUser.role)) {
      throw new ForbiddenError(
        `Access denied. Required roles: ${roles.join(', ')}`
      );
    }

    next();
  };
};
