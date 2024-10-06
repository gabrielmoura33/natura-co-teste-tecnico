// src/shared/middleware/clerk-auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { getAuth } from '@clerk/express';

export interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

@Injectable()
export class ClerkAuthMiddleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    const auth = getAuth(req);

    if (auth.userId) {
      req.user = { id: auth.userId };
    } else {
      req.user = null;
    }

    next();
  }
}
