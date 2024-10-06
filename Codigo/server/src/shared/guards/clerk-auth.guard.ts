import { getAuth } from '@clerk/express';
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

    const auth = getAuth(request);

    if (!auth.userId) {
      return false;
    }
    return true;
  }
}
