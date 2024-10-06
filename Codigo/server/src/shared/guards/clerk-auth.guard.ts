import { verifyToken } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private logger: Logger = new Logger();
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const sessToken = request.cookies.__session;

      const bearerToken = request.headers.authorization?.replace('Bearer ', '');
      const token = sessToken || bearerToken;

      const a = await verifyToken(token, {
        jwtKey: process.env.CLERK_JWT_KEY,
        authorizedParties: ['http://localhost:3001'],
      });

      console.log(a);
    } catch (error) {
      this.logger.error(error);
      return false;
    }
    return true;
  }
}
