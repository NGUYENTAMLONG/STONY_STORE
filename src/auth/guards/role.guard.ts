import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest();
    const token = context.switchToHttp().getRequest().headers
      .authorization as string;
    const userJwt = this.authService.decode(token);
    if (!userJwt || !token) {
      throw new UnauthorizedException();
    }
    const { userId, isAdministrator, role: roleFromJwt, username } = userJwt;
    if (isAdministrator && roleFromJwt === UserType.ADMIN) {
      return true;
    }
    return requiredRoles.some((role) => role === roleFromJwt);
  }
}
